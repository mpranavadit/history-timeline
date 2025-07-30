import React, { useState, useMemo } from 'react';
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

  // Sort and process artifacts for timeline positioning
  const processedArtifacts = useMemo(() => {
    if (!artifacts || artifacts.length === 0) return [];
    
    const sorted = [...artifacts].sort((a, b) => a.year - b.year);
    const minYear = Math.min(...sorted.map(a => a.year));
    const maxYear = Math.max(...sorted.map(a => a.year));
    const yearRange = maxYear - minYear || 1;

    return sorted.map((artifact, index) => {
      const padding = 8; // Increased padding
      const usableWidth = 100 - (padding * 2);
      const position = padding + ((artifact.year - minYear) / yearRange) * usableWidth;
      
      // Improved alternating pattern to reduce overlaps
      const groupSize = 3; // Group artifacts for better distribution
      const groupIndex = Math.floor(index / groupSize);
      const positionInGroup = index % groupSize;
      
      let isAbove;
      if (groupIndex % 2 === 0) {
        isAbove = positionInGroup === 0 || positionInGroup === 2;
      } else {
        isAbove = positionInGroup === 1;
      }

      return { ...artifact, position, isAbove };
    });
  }, [artifacts]);

  const formatYear = (year: number) => {
    return year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`;
  };

  if (!artifacts || artifacts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <p className="text-gray-500">No artifacts to display</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 overflow-x-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Timeline of Indian Artifacts</h2>
        <p className="text-gray-600">
          Journey through {Math.abs(processedArtifacts[processedArtifacts.length - 1]?.year - processedArtifacts[0]?.year)} years of Indian heritage
        </p>
        <div className="text-sm text-gray-500 mt-2">
          <span className="font-medium">Hover</span> over artifacts to preview • <span className="font-medium">Click</span> to explore in detail
        </div>
      </div>

      <div className="relative min-w-[1400px] h-[500px]"> {/* Increased height */}
        {/* Era background bands */}
        <div className="absolute top-0 left-0 right-0 h-full opacity-10">
          <div className="absolute left-[8%] w-[15%] h-full bg-blue-500"></div>
          <div className="absolute left-[23%] w-[20%] h-full bg-green-500"></div>
          <div className="absolute left-[43%] w-[25%] h-full bg-orange-500"></div>
          <div className="absolute left-[68%] w-[24%] h-full bg-purple-500"></div>
        </div>

        {/* Era labels */}
        <div className="absolute top-4 left-0 right-0 text-xs text-gray-400 font-medium">
          <div className="absolute left-[15%] transform -translate-x-1/2">Ancient Period</div>
          <div className="absolute left-[33%] transform -translate-x-1/2">Classical Era</div>
          <div className="absolute left-[55%] transform -translate-x-1/2">Medieval Period</div>
          <div className="absolute left-[80%] transform -translate-x-1/2">Modern Era</div>
        </div>

        {/* Main timeline line */}
        <div className="absolute top-1/2 h-2 bg-gradient-to-r from-blue-400 via-green-500 via-orange-500 to-purple-500 transform -translate-y-1/2 rounded-full shadow-lg" 
             style={{ left: '8%', right: '8%' }}></div>

        {/* Timeline scale markers */}
        {processedArtifacts.filter((_, index) => index % 3 === 0).map((artifact) => (
          <div
            key={`scale-${artifact.id}`}
            className="absolute top-1/2 transform -translate-x-1/2"
            style={{ left: `${artifact.position}%` }}
          >
            <div className="w-1 h-8 bg-gray-400 transform -translate-y-1/2"></div>
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 font-medium whitespace-nowrap">
              {formatYear(artifact.year)}
            </div>
          </div>
        ))}

        {/* Artifacts */}
        {processedArtifacts.map((artifact) => {
          const isHovered = hoveredArtifact === artifact.id;

          return (
            <div
              key={artifact.id}
              className="absolute transform -translate-x-1/2"
              style={{ left: `${artifact.position}%` }}
            >
              {/* Connection line */}
              <div
                className={`absolute left-1/2 w-1 bg-gradient-to-t from-gray-400 to-gray-300 transform -translate-x-1/2 transition-all duration-300 ${
                  isHovered ? 'bg-gradient-to-t from-orange-500 to-red-500' : ''
                } ${
                  artifact.isAbove ? 'top-1/2 h-20' : 'bottom-1/2 h-20'
                }`}
                style={{ 
                  top: artifact.isAbove ? '50%' : 'auto',
                  bottom: artifact.isAbove ? 'auto' : '50%'
                }}
              ></div>

              {/* Artifact marker */}
              <div
                className={`absolute left-1/2 w-5 h-5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full transform -translate-x-1/2 cursor-pointer transition-all duration-300 hover:scale-150 hover:shadow-xl hover:z-30 border-2 border-white shadow-lg ${
                  artifact.isAbove ? 'top-1/2 -translate-y-1/2' : 'top-1/2 -translate-y-1/2'
                } ${isHovered ? 'scale-150 shadow-xl z-30' : 'z-10'}`}
                onMouseEnter={() => setHoveredArtifact(artifact.id)}
                onMouseLeave={() => setHoveredArtifact(null)}
                onClick={() => onArtifactClick(artifact)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onArtifactClick(artifact);
                  }
                }}
              >
                {/* Pulsing animation for interactive feedback */}
                <div className={`absolute inset-0 rounded-full bg-orange-400 animate-ping ${isHovered ? 'opacity-75' : 'opacity-0'}`}></div>
              </div>

              {/* Artifact preview card */}
              <div
                className={`absolute left-1/2 transform -translate-x-1/2 w-72 transition-all duration-500 cursor-pointer z-20 ${
                  artifact.isAbove 
                    ? 'bottom-full mb-24' 
                    : 'top-full mt-24'
                } ${
                  isHovered 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-95 pointer-events-none' + (artifact.isAbove ? ' translate-y-3' : ' -translate-y-3')
                }`}
                onMouseEnter={() => setHoveredArtifact(artifact.id)}
                onMouseLeave={() => setHoveredArtifact(null)}
                onClick={() => onArtifactClick(artifact)}
              >
                <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden transform hover:scale-105 transition-transform duration-300">
                  {/* Image with category badge */}
                  <div className="relative overflow-hidden">
                    <img
                      src={artifact.imageUrl}
                      alt={artifact.title}
                      className={`w-full h-36 object-cover transition-transform duration-700 ${
                        isHovered ? 'scale-110' : 'scale-100'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute top-3 right-3">
                      <span className="bg-white/90 text-gray-800 text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm">
                        {artifact.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-bold text-gray-800 text-base mb-1 line-clamp-1">
                      {artifact.title}
                    </h3>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-sm text-orange-600 font-semibold">
                        {artifact.period}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-sm text-blue-600 font-medium">
                        {artifact.culture}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-3 mb-3 leading-relaxed">
                      {artifact.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        📍 {artifact.location}
                      </div>
                      <div className="text-xs text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                        Explore →
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced arrow pointing to timeline */}
                <div
                  className={`absolute left-1/2 transform -translate-x-1/2 ${
                    artifact.isAbove
                      ? 'top-full -mt-1'
                      : 'bottom-full -mb-1'
                  }`}
                >
                  <div className={`w-0 h-0 ${
                    artifact.isAbove
                      ? 'border-l-[12px] border-r-[12px] border-t-[12px] border-l-transparent border-r-transparent border-t-white'
                      : 'border-l-[12px] border-r-[12px] border-b-[12px] border-l-transparent border-r-transparent border-b-white'
                  } filter drop-shadow-lg`}></div>
                </div>
              </div>

              {/* Compact artifact label */}
              <div
                className={`absolute left-1/2 transform -translate-x-1/2 text-center transition-opacity duration-300 ${
                  isHovered ? 'opacity-0' : 'opacity-100'
                } ${
                  artifact.isAbove ? 'top-full mt-6' : 'bottom-full mb-6'
                }`}
              >
                <div className="bg-white px-3 py-2 rounded-lg shadow-md border border-gray-200 max-w-40">
                  <div className="text-xs font-bold text-gray-800 truncate">
                    {artifact.title}
                  </div>
                  <div className="text-xs text-orange-600 font-medium">
                    {formatYear(artifact.year)}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {artifact.culture}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enhanced legend and instructions */}
      <div className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-8">
        <div className="text-center mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Interactive Timeline Guide</h3>
          <p className="text-sm text-gray-600 max-w-3xl mx-auto leading-relaxed">
            This timeline spans over 4,000 years of Indian cultural heritage. Each artifact marker represents 
            a significant historical piece that shaped India's rich cultural landscape.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-2">
            <div className="flex justify-center">
              <div className="w-5 h-5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-lg"></div>
            </div>
            <div className="text-xs font-semibold text-gray-700">Artifact Marker</div>
            <div className="text-xs text-gray-500">Click to explore</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-center">
              <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
            </div>
            <div className="text-xs font-semibold text-gray-700">Timeline</div>
            <div className="text-xs text-gray-500">4,500+ years</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-center">
              <div className="w-3 h-8 bg-gray-400 rounded-sm"></div>
            </div>
            <div className="text-xs font-semibold text-gray-700">Era Markers</div>
            <div className="text-xs text-gray-500">Historical periods</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-center">
              <div className="w-12 h-8 bg-white border border-gray-200 rounded shadow-sm"></div>
            </div>
            <div className="text-xs font-semibold text-gray-700">Preview Cards</div>
            <div className="text-xs text-gray-500">Hover to view</div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 flex flex-wrap justify-center gap-4 text-xs text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 opacity-20 rounded"></div>
            <span>Ancient Period (3000-500 BCE)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 opacity-20 rounded"></div>
            <span>Classical Era (500 BCE-500 CE)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 opacity-20 rounded"></div>
            <span>Medieval Period (500-1500 CE)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 opacity-20 rounded"></div>
            <span>Modern Era (1500+ CE)</span>
          </div>
        </div>
      </div>
    </div>
  );
};