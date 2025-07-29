import React, { useState } from 'react';
import { Artifact } from '../data/artifacts';

interface TimelineVisualizationProps {
  artifacts: Artifact[];
  onArtifactClick: (artifact: Artifact) => void;
}

export const TimelineVisualization: React.FC<TimelineVisualizationProps> = ({ 
  artifacts, 
  onArtifactClick 
}) => {
  const [hoveredArtifact, setHoveredArtifact] = useState<string | null>(null);

  // Sort artifacts by year for proper timeline positioning
  const sortedArtifacts = [...artifacts].sort((a, b) => a.year - b.year);
  
  // Calculate positions along the timeline (0-100%)
  const minYear = Math.min(...sortedArtifacts.map(a => a.year));
  const maxYear = Math.max(...sortedArtifacts.map(a => a.year));
  const yearRange = maxYear - minYear || 1; // Prevent division by zero

  const getPosition = (year: number) => {
    // Add padding to prevent artifacts from being too close to edges
    const padding = 5; // 5% padding on each side
    const usableWidth = 100 - (padding * 2);
    return padding + ((year - minYear) / yearRange) * usableWidth;
  };

  const formatYear = (year: number) => {
    return year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 overflow-x-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Timeline of Indian Artifacts</h2>
        <p className="text-gray-600">Hover over artifacts to preview, click to explore in detail</p>
      </div>

      <div className="relative min-w-[1200px] h-96">
        {/* Main timeline line */}
        <div className="absolute top-1/2 h-1 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 transform -translate-y-1/2 rounded-full shadow-sm" 
             style={{ left: '5%', right: '5%' }}></div>

        {/* Year markers */}
        <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2">
          {sortedArtifacts.map((artifact) => (
            <div
              key={`marker-${artifact.id}`}
              className="absolute transform -translate-x-1/2"
              style={{ left: `${getPosition(artifact.year)}%` }}
            >
              <div className="w-2 h-2 bg-gray-300 rounded-full transform -translate-y-1/2"></div>
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 font-medium whitespace-nowrap">
                {formatYear(artifact.year)}
              </div>
            </div>
          ))}
        </div>

        {/* Artifacts */}
        {sortedArtifacts.map((artifact, index) => {
          const position = getPosition(artifact.year);
          // Better alternating pattern - group closer artifacts
          const isAbove = Math.floor(index / 2) % 2 === 0 ? index % 2 === 0 : index % 2 === 1;
          const isHovered = hoveredArtifact === artifact.id;

          return (
            <div
              key={artifact.id}
              className="absolute transform -translate-x-1/2"
              style={{ left: `${position}%` }}
            >
              {/* Connection line */}
              <div
                className={`absolute left-1/2 w-0.5 bg-gray-300 transform -translate-x-1/2 ${
                  isAbove ? 'top-1/2 h-16' : 'bottom-1/2 h-16'
                }`}
                style={{ 
                  top: isAbove ? '50%' : 'auto',
                  bottom: isAbove ? 'auto' : '50%'
                }}
              ></div>

              {/* Artifact marker */}
              <div
                className={`absolute left-1/2 w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full transform -translate-x-1/2 cursor-pointer transition-all duration-300 hover:scale-150 hover:shadow-lg ${
                  isAbove ? 'top-1/2 -translate-y-1/2' : 'top-1/2 -translate-y-1/2'
                } ${isHovered ? 'scale-150 shadow-lg' : ''}`}
                onMouseEnter={() => setHoveredArtifact(artifact.id)}
                onMouseLeave={() => setHoveredArtifact(null)}
                onClick={() => onArtifactClick(artifact)}
              ></div>

              {/* Artifact card */}
              <div
                className={`absolute left-1/2 transform -translate-x-1/2 w-64 transition-all duration-300 cursor-pointer ${
                  isAbove 
                    ? 'bottom-full mb-20' 
                    : 'top-full mt-20'
                } ${
                  isHovered 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-95' + (isAbove ? ' translate-y-2' : ' -translate-y-2')
                }`}
                onMouseEnter={() => setHoveredArtifact(artifact.id)}
                onMouseLeave={() => setHoveredArtifact(null)}
                onClick={() => onArtifactClick(artifact)}
              >
                <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                  {/* Image with hover effect */}
                  <div className="relative overflow-hidden">
                    <img
                      src={artifact.imageUrl}
                      alt={artifact.title}
                      className={`w-full h-32 object-cover transition-transform duration-500 ${
                        isHovered ? 'scale-110' : 'scale-100'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 text-sm mb-1 line-clamp-1">
                      {artifact.title}
                    </h3>
                    <p className="text-xs text-orange-600 font-medium mb-2">
                      {artifact.period}
                    </p>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {artifact.description}
                    </p>
                    <div className="mt-2 text-xs text-blue-600 font-medium">
                      Click to explore →
                    </div>
                  </div>
                </div>

                {/* Arrow pointing to timeline */}
                <div
                  className={`absolute left-1/2 transform -translate-x-1/2 w-0 h-0 ${
                    isAbove
                      ? 'top-full border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white'
                      : 'bottom-full border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white'
                  }`}
                ></div>
              </div>

              {/* Artifact title below/above timeline */}
              <div
                className={`absolute left-1/2 transform -translate-x-1/2 text-center ${
                  isAbove ? 'top-full mt-4' : 'bottom-full mb-4'
                }`}
              >
                <div className="text-xs font-semibold text-gray-700 whitespace-nowrap max-w-32 truncate">
                  {artifact.title}
                </div>
                <div className="text-xs text-gray-500">
                  {formatYear(artifact.year)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-8 flex justify-center">
        <div className="bg-gray-50 rounded-lg p-6 text-center max-w-2xl">
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-semibold">How to use:</span> Hover over timeline markers to preview artifacts, click to view detailed information
          </p>
          <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
              <span>Artifact</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-12 h-0.5 bg-gradient-to-r from-orange-400 to-pink-500"></div>
              <span>Timeline</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <span>Year Marker</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};