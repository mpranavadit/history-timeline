import React, { useEffect, useCallback } from 'react';
import { X, Calendar, MapPin, Tag, Star, Clock, Users, Globe, Scroll, Heart } from 'lucide-react';
import { Artifact } from '../data/artifacts';

interface ArtifactModalProps {
  artifact: Artifact | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ArtifactModal: React.FC<ArtifactModalProps> = ({ artifact, isOpen, onClose }) => {
  // Handle escape key press
  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
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
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Enhanced Header */}
        <div className={`relative bg-gradient-to-r ${getCategoryColor(artifact.category)} text-white p-6`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-3 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="pr-16">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-4xl">{getCategoryIcon(artifact.category)}</span>
              <div>
                <h1 className="text-3xl font-bold mb-2 leading-tight">{artifact.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-white/90">
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
        <div className="overflow-y-auto max-h-[calc(95vh-140px)]">
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Image and Quick Info */}
              <div className="space-y-6">
                <div className="relative group">
                  <img
                    src={artifact.imageUrl}
                    alt={artifact.title}
                    className="w-full h-80 object-cover rounded-xl shadow-lg transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm font-medium">Click to enlarge</p>
                  </div>
                </div>
                
                {/* Enhanced Info Cards */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-blue-800">Location</span>
                    </div>
                    <p className="text-blue-700">{artifact.location}</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <Users className="h-5 w-5 text-green-600" />
                      <span className="font-semibold text-green-800">Culture</span>
                    </div>
                    <p className="text-green-700">{artifact.culture}</p>
                  </div>

                  <div className={`bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200`}>
                    <div className="flex items-center space-x-3 mb-2">
                      <Tag className="h-5 w-5 text-purple-600" />
                      <span className="font-semibold text-purple-800">Category</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-purple-700">{artifact.category}</span>
                      <span className="text-lg">{getCategoryIcon(artifact.category)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center space-x-2">
                    <Scroll className="h-6 w-6 text-orange-600" />
                    <span>Description</span>
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <p className="text-gray-800 leading-relaxed">
                      {artifact.description}
                    </p>
                  </div>
                </div>

                {/* Historical Significance */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center space-x-2">
                    <Star className="h-6 w-6 text-yellow-500" />
                    <span>Historical Significance</span>
                  </h3>
                  <div className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 p-4 rounded-xl border border-yellow-200">
                    <p className="text-gray-800 leading-relaxed">
                      {artifact.significance}
                    </p>
                  </div>
                </div>

                {/* Timeline Context */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span>Historical Context</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-gray-800">Era:</span>
                      <p className="text-gray-700">{artifact.period}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">Date:</span>
                      <p className="text-gray-700">{formatYear(artifact.year)}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">Civilization:</span>
                      <p className="text-gray-700">{artifact.culture}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">Period:</span>
                      <p className="text-gray-700">{getEraDescription(artifact.year)}</p>
                    </div>
                  </div>
                </div>

                {/* Fun Facts */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-200">
                  <h4 className="font-bold text-indigo-800 mb-3">📍 Did You Know?</h4>
                  <div className="space-y-2 text-sm text-indigo-700">
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
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-700 font-medium flex items-center justify-center md:justify-start space-x-2">
                <Heart className="h-4 w-4 text-red-500" />
                <span>Part of India's cultural heritage spanning over 4,500 years</span>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Preserving history for future generations
              </p>
            </div>
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
            >
              <X className="h-4 w-4" />
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};