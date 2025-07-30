import React, { useState, useMemo } from 'react';
import { Calendar, MapPin, Users, Clock, Star, ChevronRight, Eye } from 'lucide-react';
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
  const [focusedArtifact, setFocusedArtifact] = useState<string | null>(null);

  // Sort and process artifacts for timeline positioning
  const processedArtifacts = useMemo(() => {
    if (!artifacts || artifacts.length === 0) return [];
    
    const sorted = [...artifacts].sort((a, b) => a.year - b.year);
    const minYear = Math.min(...sorted.map(a => a.year));
    const maxYear = Math.max(...sorted.map(a => a.year));
    const yearRange = maxYear - minYear || 1;

    return sorted.map((artifact, index) => {
      const padding = 5;
      const usableWidth = 100 - (padding * 2);
      const position = padding + ((artifact.year - minYear) / yearRange) * usableWidth;
      
      // Smart positioning to avoid overlaps
      const isAbove = index % 2 === 0;

      return { ...artifact, position, isAbove };
    });
  }, [artifacts]);

  const formatYear = (year: number) => {
    return year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Architecture': 'from-blue-500 to-blue-600',
      'Sculpture': 'from-green-500 to-green-600',
      'Painting': 'from-purple-500 to-purple-600',
      'Religious Art': 'from-orange-500 to-orange-600',
      'Cave Art': 'from-amber-500 to-amber-600',
      'Administrative': 'from-gray-500 to-gray-600',
      'Pottery': 'from-rose-500 to-rose-600',
      'Literature': 'from-teal-500 to-teal-600',
      'Traditional Art': 'from-yellow-500 to-yellow-600',
      'Colonial Art': 'from-indigo-500 to-indigo-600',
      'Military': 'from-red-500 to-red-600'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
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

  if (!artifacts || artifacts.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
        <div className="text-gray-400 mb-4">
          <Clock className="mx-auto h-16 w-16" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">No artifacts to display</h3>
        <p className="text-gray-600">Add some artifacts to see the timeline</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-2xl overflow-hidden">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Interactive Heritage Timeline
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed max-w-2xl">
              Journey through {Math.abs(processedArtifacts[processedArtifacts.length - 1]?.year - processedArtifacts[0]?.year)} years 
              of Indian cultural heritage. Hover over artifacts to preview, click to explore in detail.
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
              <div className="text-center">
                <div className="text-3xl font-bold">{artifacts.length}</div>
                <div className="text-sm text-blue-100">Artifacts</div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-200" />
              <div>
                <div className="text-sm text-blue-100">Time Span</div>
                <div className="font-bold">4,500+ Years</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-200" />
              <div>
                <div className="text-sm text-blue-100">Cultures</div>
                <div className="font-bold">{new Set(artifacts.map(a => a.culture)).size}</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-blue-200" />
              <div>
                <div className="text-sm text-blue-100">Categories</div>
                <div className="font-bold">{new Set(artifacts.map(a => a.category)).size}</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-200" />
              <div>
                <div className="text-sm text-blue-100">Locations</div>
                <div className="font-bold">{new Set(artifacts.map(a => a.location.split(',')[0])).size}+</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="p-8">
        <div className="relative min-w-full overflow-x-auto">
          <div className="relative min-w-[1200px] h-[600px]">
            
            {/* Era Background Bands */}
            <div className="absolute top-0 left-0 right-0 h-full">
              <div className="absolute left-[5%] w-[20%] h-full bg-gradient-to-b from-blue-100/30 to-blue-200/30 rounded-t-lg"></div>
              <div className="absolute left-[25%] w-[25%] h-full bg-gradient-to-b from-green-100/30 to-green-200/30 rounded-t-lg"></div>
              <div className="absolute left-[50%] w-[25%] h-full bg-gradient-to-b from-orange-100/30 to-orange-200/30 rounded-t-lg"></div>
              <div className="absolute left-[75%] w-[20%] h-full bg-gradient-to-b from-purple-100/30 to-purple-200/30 rounded-t-lg"></div>
            </div>

            {/* Era Labels */}
            <div className="absolute top-6 left-0 right-0 text-sm font-bold text-gray-600">
              <div className="absolute left-[15%] transform -translate-x-1/2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-blue-200">
                Ancient Period
              </div>
              <div className="absolute left-[37.5%] transform -translate-x-1/2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-green-200">
                Classical Era
              </div>
              <div className="absolute left-[62.5%] transform -translate-x-1/2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-orange-200">
                Medieval Period
              </div>
              <div className="absolute left-[85%] transform -translate-x-1/2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-purple-200">
                Modern Era
              </div>
            </div>

            {/* Main Timeline Line */}
            <div className="absolute top-1/2 transform -translate-y-1/2 h-3 bg-gradient-to-r from-blue-500 via-green-500 via-orange-500 to-purple-500 rounded-full shadow-lg" 
                 style={{ left: '5%', right: '5%' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-green-400 via-orange-400 to-purple-400 rounded-full animate-pulse opacity-50"></div>
            </div>

            {/* Timeline Scale Markers */}
            {processedArtifacts.filter((_, index) => index % 3 === 0).map((artifact) => (
              <div
                key={`scale-${artifact.id}`}
                className="absolute top-1/2 transform -translate-x-1/2"
                style={{ left: `${artifact.position}%` }}
              >
                <div className="w-1 h-12 bg-gray-400 transform -translate-y-1/2 rounded-full shadow-sm"></div>
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-lg shadow-md border border-gray-200">
                  <div className="text-xs font-bold text-gray-800 whitespace-nowrap">
                    {formatYear(artifact.year)}
                  </div>
                </div>
              </div>
            ))}

            {/* Artifacts */}
            {processedArtifacts.map((artifact) => {
              const isHovered = hoveredArtifact === artifact.id;
              const isFocused = focusedArtifact === artifact.id;
              const isActive = isHovered || isFocused;

              return (
                <div
                  key={artifact.id}
                  className="absolute transform -translate-x-1/2"
                  style={{ left: `${artifact.position}%` }}
                >
                  {/* Connection Line */}
                  <div
                    className={`absolute left-1/2 w-0.5 transform -translate-x-1/2 transition-all duration-500 ${
                      isActive 
                        ? `bg-gradient-to-${artifact.isAbove ? 'b' : 't'} from-orange-500 to-red-500 shadow-lg` 
                        : 'bg-gradient-to-b from-gray-300 to-gray-400'
                    } ${
                      artifact.isAbove ? 'top-1/2 h-24' : 'bottom-1/2 h-24'
                    }`}
                    style={{ 
                      top: artifact.isAbove ? '50%' : 'auto',
                      bottom: artifact.isAbove ? 'auto' : '50%'
                    }}
                  ></div>

                  {/* Artifact Marker */}
                  <div
                    className={`absolute left-1/2 w-6 h-6 rounded-full transform -translate-x-1/2 cursor-pointer transition-all duration-500 border-3 border-white shadow-xl z-20 ${
                      artifact.isAbove ? 'top-1/2 -translate-y-1/2' : 'top-1/2 -translate-y-1/2'
                    } ${
                      isActive 
                        ? `bg-gradient-to-r ${getCategoryColor(artifact.category)} scale-150 shadow-2xl` 
                        : `bg-gradient-to-r ${getCategoryColor(artifact.category)} hover:scale-125`
                    }`}
                    onMouseEnter={() => setHoveredArtifact(artifact.id)}
                    onMouseLeave={() => setHoveredArtifact(null)}
                    onFocus={() => setFocusedArtifact(artifact.id)}
                    onBlur={() => setFocusedArtifact(null)}
                    onClick={() => onArtifactClick(artifact)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        onArtifactClick(artifact);
                      }
                    }}
                  >
                    {/* Pulsing Ring */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${getCategoryColor(artifact.category)} animate-ping ${isActive ? 'opacity-75' : 'opacity-0'}`}></div>
                    
                    {/* Category Icon */}
                    <div className="absolute inset-0 flex items-center justify-center text-xs">
                      {getCategoryIcon(artifact.category)}
                    </div>
                  </div>

                  {/* Enhanced Artifact Preview Card */}
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 w-96 transition-all duration-700 cursor-pointer z-30 ${
                      artifact.isAbove 
                        ? 'bottom-full mb-28' 
                        : 'top-full mt-28'
                    } ${
                      isActive 
                        ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' 
                        : 'opacity-0 scale-95 pointer-events-none' + (artifact.isAbove ? ' translate-y-4' : ' -translate-y-4')
                    }`}
                    onMouseEnter={() => setHoveredArtifact(artifact.id)}
                    onMouseLeave={() => setHoveredArtifact(null)}
                    onClick={() => onArtifactClick(artifact)}
                  >
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transform hover:scale-105 transition-all duration-500 backdrop-blur-sm">
                      {/* Image Section */}
                      <div className="relative overflow-hidden">
                        <img
                          src={artifact.imageUrl}
                          alt={artifact.title}
                          className={`w-full h-48 object-cover transition-all duration-700 ${
                            isActive ? 'scale-110' : 'scale-100'
                          }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 right-4">
                          <div className={`bg-gradient-to-r ${getCategoryColor(artifact.category)} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm border border-white/20`}>
                            <span className="mr-1">{getCategoryIcon(artifact.category)}</span>
                            {artifact.category}
                          </div>
                        </div>

                        {/* Year Badge */}
                        <div className="absolute bottom-4 left-4">
                          <div className="bg-black/70 text-white text-sm font-bold px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20">
                            {formatYear(artifact.year)}
                          </div>
                        </div>

                        {/* View Indicator */}
                        <div className="absolute bottom-4 right-4">
                          <div className="bg-white/90 text-gray-800 p-2 rounded-full shadow-lg backdrop-blur-sm hover:bg-white transition-colors">
                            <Eye className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Content Section */}
                      <div className="p-6">
                        <h3 className="font-bold text-gray-900 text-xl mb-2 line-clamp-1">
                          {artifact.title}
                        </h3>
                        
                        {/* Info Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="flex items-center space-x-2 text-sm">
                            <Clock className="h-4 w-4 text-orange-500 flex-shrink-0" />
                            <span className="text-gray-700 font-medium truncate">{artifact.period}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-sm">
                            <Users className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-gray-600 truncate">{artifact.culture}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-sm col-span-2">
                            <MapPin className="h-4 w-4 text-blue-500 flex-shrink-0" />
                            <span className="text-gray-600 truncate">{artifact.location}</span>
                          </div>
                        </div>
                        
                        {/* Description */}
                        <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed mb-4">
                          {artifact.description}
                        </p>

                        {/* Significance Preview */}
                        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-3 mb-4">
                          <div className="flex items-start space-x-2">
                            <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-gray-700 line-clamp-2 leading-relaxed">
                              {artifact.significance}
                            </p>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500 font-medium">
                            Historical Artifact
                          </div>
                          <div className={`bg-gradient-to-r ${getCategoryColor(artifact.category)} text-white text-sm font-bold px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2`}>
                            <span>Explore</span>
                            <ChevronRight className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Arrow */}
                    <div
                      className={`absolute left-1/2 transform -translate-x-1/2 ${
                        artifact.isAbove
                          ? 'top-full -mt-2'
                          : 'bottom-full -mb-2'
                      }`}
                    >
                      <div className={`w-0 h-0 ${
                        artifact.isAbove
                          ? 'border-l-[16px] border-r-[16px] border-t-[16px] border-l-transparent border-r-transparent border-t-white'
                          : 'border-l-[16px] border-r-[16px] border-b-[16px] border-l-transparent border-r-transparent border-b-white'
                      } filter drop-shadow-lg`}></div>
                    </div>
                  </div>

                  {/* Compact Label (when not hovered) */}
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 text-center transition-all duration-500 ${
                      isActive ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                    } ${
                      artifact.isAbove ? 'top-full mt-8' : 'bottom-full mb-8'
                    }`}
                  >
                    <div className="bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg border border-gray-200 max-w-48">
                      <div className="text-sm font-bold text-gray-900 truncate mb-1">
                        {artifact.title}
                      </div>
                      <div className="text-xs text-orange-600 font-bold mb-1">
                        {formatYear(artifact.year)}
                      </div>
                      <div className="text-xs text-gray-600 truncate">
                        {artifact.culture}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <div className="bg-gradient-to-r from-gray-50 via-blue-50 to-indigo-50 p-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Explore India's Cultural Heritage</h3>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              This interactive timeline showcases over 4,500 years of Indian cultural heritage. Each artifact 
              represents a significant milestone in the development of art, architecture, literature, and civilization 
              across the Indian subcontinent.
            </p>
          </div>
          
          {/* Legend */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-lg border-2 border-white"></div>
              </div>
              <div className="text-sm font-bold text-gray-800">Artifact Marker</div>
              <div className="text-xs text-gray-600">Click to explore details</div>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-20 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-sm"></div>
              </div>
              <div className="text-sm font-bold text-gray-800">Timeline</div>
              <div className="text-xs text-gray-600">4,500+ years span</div>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-16 h-6 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center">
                  <div className="text-xs">🏛️</div>
                </div>
              </div>
              <div className="text-sm font-bold text-gray-800">Preview Cards</div>
              <div className="text-xs text-gray-600">Hover to preview</div>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-16 h-6 bg-blue-100 rounded-lg border border-blue-200 flex items-center justify-center">
                  <div className="text-xs font-bold text-blue-700">Era</div>
                </div>
              </div>
              <div className="text-sm font-bold text-gray-800">Historical Periods</div>
              <div className="text-xs text-gray-600">Color-coded eras</div>
            </div>
          </div>

          {/* Era Guide */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">Historical Periods</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full shadow-sm"></div>
                <div>
                  <div className="font-bold text-gray-800">Ancient Period</div>
                  <div className="text-gray-600">3000-500 BCE</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full shadow-sm"></div>
                <div>
                  <div className="font-bold text-gray-800">Classical Era</div>
                  <div className="text-gray-600">500 BCE-500 CE</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-orange-500 rounded-full shadow-sm"></div>
                <div>
                  <div className="font-bold text-gray-800">Medieval Period</div>
                  <div className="text-gray-600">500-1500 CE</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-purple-500 rounded-full shadow-sm"></div>
                <div>
                  <div className="font-bold text-gray-800">Modern Era</div>
                  <div className="text-gray-600">1500+ CE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};