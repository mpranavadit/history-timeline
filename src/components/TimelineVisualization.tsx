import React, { useState, useMemo } from 'react';
import { Calendar, MapPin, Users, Clock, Star, ChevronRight, Eye, Info, Zap } from 'lucide-react';
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
  const [selectedArtifact, setSelectedArtifact] = useState<string | null>(null);

  // Process artifacts for timeline positioning
  const processedArtifacts = useMemo(() => {
    if (!artifacts || artifacts.length === 0) return [];
    
    const sorted = [...artifacts].sort((a, b) => a.year - b.year);
    const minYear = Math.min(...sorted.map(a => a.year));
    const maxYear = Math.max(...sorted.map(a => a.year));
    const yearRange = maxYear - minYear || 1;

    return sorted.map((artifact, index) => {
      const position = ((artifact.year - minYear) / yearRange) * 100;
      return { ...artifact, position, index };
    });
  }, [artifacts]);

  const formatYear = (year: number) => {
    return year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Architecture': 'bg-blue-500',
      'Sculpture': 'bg-emerald-500',
      'Painting': 'bg-purple-500',
      'Religious Art': 'bg-orange-500',
      'Cave Art': 'bg-amber-500',
      'Administrative': 'bg-slate-500',
      'Pottery': 'bg-rose-500',
      'Literature': 'bg-teal-500',
      'Traditional Art': 'bg-yellow-500',
      'Colonial Art': 'bg-indigo-500',
      'Military': 'bg-red-500'
    };
    return colors[category as keyof typeof colors] || 'bg-slate-500';
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      'Architecture': '🏛️',
      'Sculpture': '🗿',
      'Painting': '🎨',
      'Religious Art': '🕉️',
      'Cave Art': '🕳️',
      'Administrative': '📜',
      'Pottery': '🏺',
      'Literature': '📚',
      'Traditional Art': '🖼️',
      'Colonial Art': '🖼️',
      'Military': '⚔️'
    };
    return icons[category as keyof typeof icons] || '🏛️';
  };

  const getEraInfo = (year: number) => {
    if (year < -1500) return { name: "Ancient Period", color: "bg-blue-500", textColor: "text-blue-700" };
    if (year < 0) return { name: "Vedic Era", color: "bg-green-500", textColor: "text-green-700" };
    if (year < 500) return { name: "Classical Period", color: "bg-orange-500", textColor: "text-orange-700" };
    if (year < 1000) return { name: "Early Medieval", color: "bg-purple-500", textColor: "text-purple-700" };
    if (year < 1500) return { name: "Medieval Period", color: "bg-pink-500", textColor: "text-pink-700" };
    return { name: "Modern Era", color: "bg-indigo-500", textColor: "text-indigo-700" };
  };

  if (!artifacts || artifacts.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100">
        <div className="text-gray-400 mb-4">
          <Clock className="mx-auto h-16 w-16" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">No artifacts to display</h3>
        <p className="text-gray-600">Add some artifacts to see the timeline</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
      {/* Modern Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
              <Zap className="h-8 w-8 text-yellow-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Heritage Timeline</h2>
              <p className="text-slate-300 text-lg">Interactive journey through Indian cultural history</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{artifacts.length}</div>
              <div className="text-sm text-slate-300">Artifacts</div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <Calendar className="h-5 w-5 text-blue-400 mb-2" />
            <div className="text-sm text-slate-300">Time Span</div>
            <div className="font-bold">4,500+ Years</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <Users className="h-5 w-5 text-green-400 mb-2" />
            <div className="text-sm text-slate-300">Cultures</div>
            <div className="font-bold">{new Set(artifacts.map(a => a.culture)).size}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <Star className="h-5 w-5 text-yellow-400 mb-2" />
            <div className="text-sm text-slate-300">Categories</div>
            <div className="font-bold">{new Set(artifacts.map(a => a.category)).size}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <MapPin className="h-5 w-5 text-purple-400 mb-2" />
            <div className="text-sm text-slate-300">Locations</div>
            <div className="font-bold">{new Set(artifacts.map(a => a.location.split(',')[0])).size}+</div>
          </div>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="p-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="relative">
          {/* Timeline Track */}
          <div className="relative h-2 bg-gradient-to-r from-blue-200 via-purple-200 via-orange-200 to-pink-200 rounded-full mb-16 shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 via-orange-400 to-pink-400 rounded-full opacity-60"></div>
          </div>

          {/* Artifacts */}
          <div className="relative">
            {processedArtifacts.map((artifact) => {
              const isHovered = hoveredArtifact === artifact.id;
              const isSelected = selectedArtifact === artifact.id;
              const isActive = isHovered || isSelected;
              const era = getEraInfo(artifact.year);

              return (
                <div
                  key={artifact.id}
                  className="absolute transform -translate-x-1/2"
                  style={{ left: `${artifact.position}%`, top: '-2rem' }}
                >
                  {/* Artifact Dot */}
                  <div
                    className={`relative w-6 h-6 rounded-full cursor-pointer transition-all duration-300 border-4 border-white shadow-lg hover:scale-125 ${
                      getCategoryColor(artifact.category)
                    } ${isActive ? 'scale-150 shadow-2xl' : ''}`}
                    onMouseEnter={() => setHoveredArtifact(artifact.id)}
                    onMouseLeave={() => setHoveredArtifact(null)}
                    onClick={() => {
                      setSelectedArtifact(isSelected ? null : artifact.id);
                      onArtifactClick(artifact);
                    }}
                  >
                    {/* Pulse Animation */}
                    {isActive && (
                      <div className={`absolute inset-0 rounded-full ${getCategoryColor(artifact.category)} animate-ping opacity-75`}></div>
                    )}
                    
                    {/* Icon */}
                    <div className="absolute inset-0 flex items-center justify-center text-xs">
                      {getCategoryIcon(artifact.category)}
                    </div>
                  </div>

                  {/* Year Label */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                    <div className={`bg-white rounded-lg px-3 py-1 shadow-md border transition-all duration-300 ${
                      isActive ? 'border-orange-300 bg-orange-50' : 'border-gray-200'
                    }`}>
                      <div className="text-xs font-bold text-gray-800 whitespace-nowrap">
                        {formatYear(artifact.year)}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Preview Card */}
                  {isActive && (
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-50">
                      <div className="w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
                        {/* Card Header */}
                        <div className={`${getCategoryColor(artifact.category)} p-4 text-white`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl">{getCategoryIcon(artifact.category)}</span>
                              <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                                {artifact.category}
                              </div>
                            </div>
                            <div className={`${era.color} px-3 py-1 rounded-full text-xs font-bold text-white`}>
                              {era.name}
                            </div>
                          </div>
                          <h3 className="text-xl font-bold leading-tight">{artifact.title}</h3>
                        </div>

                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={artifact.imageUrl}
                            alt={artifact.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                          <div className="absolute bottom-3 right-3">
                            <div className="bg-black/70 text-white p-2 rounded-full backdrop-blur-sm">
                              <Eye className="h-4 w-4" />
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          {/* Info Grid */}
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-orange-500" />
                              <div>
                                <div className="text-xs text-gray-500">Period</div>
                                <div className="text-sm font-medium text-gray-800 truncate">{artifact.period}</div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4 text-green-500" />
                              <div>
                                <div className="text-xs text-gray-500">Culture</div>
                                <div className="text-sm font-medium text-gray-800 truncate">{artifact.culture}</div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 mb-4">
                            <MapPin className="h-4 w-4 text-blue-500" />
                            <div>
                              <div className="text-xs text-gray-500">Location</div>
                              <div className="text-sm font-medium text-gray-800">{artifact.location}</div>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-sm text-gray-700 leading-relaxed mb-4 line-clamp-3">
                            {artifact.description}
                          </p>

                          {/* Significance */}
                          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-3 mb-4">
                            <div className="flex items-start space-x-2">
                              <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                              <div>
                                <div className="text-xs font-medium text-yellow-700 mb-1">Historical Significance</div>
                                <p className="text-xs text-gray-700 line-clamp-2 leading-relaxed">
                                  {artifact.significance}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Action Button */}
                          <button
                            onClick={() => onArtifactClick(artifact)}
                            className={`w-full ${getCategoryColor(artifact.category)} text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2`}
                          >
                            <span>Explore Details</span>
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Arrow */}
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                          <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-white filter drop-shadow-lg"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Compact Label (when not active) */}
                  {!isActive && (
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
                      <div className="bg-white rounded-xl px-4 py-3 shadow-lg border border-gray-200 max-w-48 text-center">
                        <div className="text-sm font-bold text-gray-900 truncate mb-1">
                          {artifact.title}
                        </div>
                        <div className="text-xs text-gray-600 truncate">
                          {artifact.culture}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-gradient-to-r from-slate-100 to-blue-100 p-6 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Info className="h-5 w-5 text-blue-600" />
            <h4 className="text-lg font-bold text-gray-800">How to Use</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              </div>
              <div className="font-semibold text-gray-800 mb-1">Hover to Preview</div>
              <div className="text-gray-600">Move your cursor over any artifact dot to see a detailed preview card</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-3 rounded-full mb-3">
                <Eye className="h-4 w-4 text-green-600" />
              </div>
              <div className="font-semibold text-gray-800 mb-1">Click to Explore</div>
              <div className="text-gray-600">Click on any artifact to open the detailed information panel</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-100 p-3 rounded-full mb-3">
                <Clock className="h-4 w-4 text-orange-600" />
              </div>
              <div className="font-semibold text-gray-800 mb-1">Navigate Time</div>
              <div className="text-gray-600">Scroll horizontally to explore different time periods</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};