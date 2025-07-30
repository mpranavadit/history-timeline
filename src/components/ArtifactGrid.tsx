import React from 'react';
import { MapPin, Calendar, Tag, Clock, Users, Star } from 'lucide-react';
import { Artifact } from '../data/artifacts';

interface ArtifactGridProps {
  artifacts: Artifact[];
  onArtifactClick: (artifact: Artifact) => void;
}

export const ArtifactGrid: React.FC<ArtifactGridProps> = ({ artifacts, onArtifactClick }) => {
  const formatYear = (year: number) => {
    return year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`;
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'architecture': return '🏛️';
      case 'sculpture': return '🗿';
      case 'painting': return '🎨';
      case 'religious art': return '🕉️';
      case 'cave art': return '🕳️';
      case 'administrative': return '📜';
      case 'pottery': return '🏺';
      case 'literature': return '📚';
      case 'traditional art': return '🖼️';
      case 'colonial art': return '🖼️';
      case 'military': return '⚔️';
      default: return '🏛️';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'architecture': return 'from-blue-500 to-indigo-600';
      case 'sculpture': return 'from-green-500 to-emerald-600';
      case 'painting': return 'from-purple-500 to-violet-600';
      case 'religious art': return 'from-orange-500 to-red-600';
      case 'cave art': return 'from-amber-500 to-orange-600';
      case 'administrative': return 'from-gray-500 to-slate-600';
      case 'pottery': return 'from-rose-500 to-pink-600';
      case 'literature': return 'from-teal-500 to-cyan-600';
      case 'traditional art': return 'from-yellow-500 to-amber-600';
      case 'colonial art': return 'from-indigo-500 to-purple-600';
      case 'military': return 'from-red-500 to-rose-600';
      default: return 'from-gray-500 to-slate-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">Artifact Gallery</h2>
            <p className="text-orange-100">
              Explore our collection of {artifacts.length} magnificent artifacts
            </p>
          </div>
          <div className="text-4xl opacity-80">🏛️</div>
        </div>
      </div>
      
      <div className="p-6">
        {artifacts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-4xl">
                🔍
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No artifacts found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {artifacts.map((artifact) => (
              <div
                key={artifact.id}
                onClick={() => onArtifactClick(artifact)}
                className="group bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img
                    src={artifact.imageUrl}
                    alt={artifact.title}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <div className={`bg-gradient-to-r ${getCategoryColor(artifact.category)} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-sm`}>
                      <span className="mr-1">{getCategoryIcon(artifact.category)}</span>
                      {artifact.category}
                    </div>
                  </div>

                  {/* Year Badge */}
                  <div className="absolute top-3 right-3">
                    <div className="bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded-full backdrop-blur-sm">
                      {formatYear(artifact.year)}
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-600/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="text-white p-4 w-full">
                      <p className="text-sm font-medium">Click to explore</p>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
                    {artifact.title}
                  </h3>
                  
                  {/* Info Grid */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-orange-500 flex-shrink-0" />
                      <span className="text-gray-700 font-medium truncate">{artifact.period}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-blue-500 flex-shrink-0" />
                      <span className="text-gray-600 truncate">{artifact.location}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-600 truncate">{artifact.culture}</span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed mb-4">
                    {artifact.description}
                  </p>

                  {/* Significance Preview */}
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-3 mb-4">
                    <div className="flex items-start space-x-2">
                      <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-gray-700 line-clamp-2 leading-relaxed">
                        {artifact.significance}
                      </p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      Historical Artifact
                    </div>
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full group-hover:from-orange-600 group-hover:to-red-600 transition-all duration-300 transform group-hover:scale-105">
                      Explore →
                    </div>
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div className={`h-1 bg-gradient-to-r ${getCategoryColor(artifact.category)} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
              </div>
            ))}
          </div>
        )}

        {/* Grid Stats */}
        {artifacts.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>{artifacts.length} Artifacts Displayed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>{new Set(artifacts.map(a => a.category)).size} Categories</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>{new Set(artifacts.map(a => a.culture)).size} Cultures</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>
                  {Math.abs(Math.max(...artifacts.map(a => a.year)) - Math.min(...artifacts.map(a => a.year)))} Years Span
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};