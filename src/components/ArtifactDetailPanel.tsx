import React, { useEffect, useCallback } from 'react';
import { X, Calendar, MapPin, Tag, Star, Users, Clock, Globe, Scroll } from 'lucide-react';
import { Artifact } from '../data/artifacts';

interface ArtifactDetailPanelProps {
  artifact: Artifact | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ArtifactDetailPanel: React.FC<ArtifactDetailPanelProps> = ({ 
  artifact, 
  isOpen, 
  onClose 
}) => {
  // Handle escape key press
  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscapeKey]);

  if (!isOpen || !artifact) return null;

  const formatYear = (year: number) => {
    return year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`;
  };

  const getEraDescription = (year: number) => {
    if (year < -1500) return "Ancient Civilization Period";
    if (year < 0) return "Pre-Christian Era";
    if (year < 500) return "Classical Antiquity";
    if (year < 1000) return "Early Medieval Period";
    if (year < 1500) return "High Medieval Period";
    if (year < 1800) return "Early Modern Period";
    return "Modern Era";
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

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Enhanced Header */}
        <div className="relative bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white p-8">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110"
            aria-label="Close panel"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="pr-16">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-4xl">{getCategoryIcon(artifact.category)}</span>
              <div>
                <h1 className="text-4xl font-bold mb-2 leading-tight">{artifact.title}</h1>
                <div className="flex flex-wrap items-center gap-6 text-orange-100">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span className="font-medium">{artifact.period}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span className="font-medium">{formatYear(artifact.year)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-5 w-5" />
                    <span className="font-medium">{getEraDescription(artifact.year)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(95vh-200px)]">
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              {/* Image Section - Takes more space */}
              <div className="lg:col-span-2 space-y-6">
                <div className="relative group">
                  <img
                    src={artifact.imageUrl}
                    alt={artifact.title}
                    className="w-full h-80 lg:h-96 object-cover rounded-2xl shadow-xl transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm font-medium">Historical Artifact</p>
                  </div>
                </div>
                
                {/* Enhanced Info Cards */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200 shadow-sm">
                    <div className="flex items-center space-x-3 mb-3">
                      <MapPin className="h-6 w-6 text-blue-600" />
                      <span className="font-semibold text-blue-800 text-lg">Location</span>
                    </div>
                    <p className="text-blue-700 leading-relaxed">{artifact.location}</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-5 rounded-xl border border-green-200 shadow-sm">
                    <div className="flex items-center space-x-3 mb-3">
                      <Users className="h-6 w-6 text-green-600" />
                      <span className="font-semibold text-green-800 text-lg">Culture</span>
                    </div>
                    <p className="text-green-700 leading-relaxed">{artifact.culture}</p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-5 rounded-xl border border-purple-200 shadow-sm">
                    <div className="flex items-center space-x-3 mb-3">
                      <Tag className="h-6 w-6 text-purple-600" />
                      <span className="font-semibold text-purple-800 text-lg">Category</span>
                    </div>
                    <p className="text-purple-700 leading-relaxed">{artifact.category}</p>
                  </div>
                </div>
              </div>

              {/* Details Section - Takes more space */}
              <div className="lg:col-span-3 space-y-8">
                {/* Description */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-3">
                    <div className="w-1.5 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
                    <Scroll className="h-7 w-7 text-orange-600" />
                    <span>Description</span>
                  </h3>
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <p className="text-gray-800 leading-relaxed text-lg">
                      {artifact.description}
                    </p>
                  </div>
                </div>

                {/* Historical Significance */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-3">
                    <Star className="h-7 w-7 text-yellow-500" />
                    <span>Historical Significance</span>
                  </h3>
                  <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 p-6 rounded-xl border border-yellow-200 shadow-sm">
                    <p className="text-gray-800 leading-relaxed text-lg">
                      {artifact.significance}
                    </p>
                  </div>
                </div>

                {/* Timeline Context - Enhanced */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-gray-800 mb-4 text-xl flex items-center space-x-2">
                    <Clock className="h-6 w-6 text-blue-600" />
                    <span>Historical Context</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <div className="space-y-3">
                      <div>
                        <span className="font-semibold text-gray-800">Era:</span>
                        <p className="text-gray-700 mt-1">{artifact.period}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-800">Date:</span>
                        <p className="text-gray-700 mt-1">{formatYear(artifact.year)}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="font-semibold text-gray-800">Civilization:</span>
                        <p className="text-gray-700 mt-1">{artifact.culture} civilization</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-800">Period:</span>
                        <p className="text-gray-700 mt-1">{getEraDescription(artifact.year)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fun Facts / Additional Info */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200 shadow-sm">
                  <h4 className="font-bold text-indigo-800 mb-3 text-lg">📍 Did You Know?</h4>
                  <div className="space-y-2 text-indigo-700">
                    <p>• This artifact is approximately <strong>{Math.abs(2025 - artifact.year)} years old</strong></p>
                    <p>• It represents the <strong>{artifact.culture}</strong> cultural tradition</p>
                    <p>• Created during the <strong>{getEraDescription(artifact.year)}</strong></p>
                    {artifact.year < 0 && (
                      <p>• Predates the Common Era by <strong>{Math.abs(artifact.year)} years</strong></p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-700 font-medium">
                🇮🇳 Part of India's cultural heritage spanning over 4,500 years
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Preserving history for future generations
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};