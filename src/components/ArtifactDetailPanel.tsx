import React from 'react';
import { X, Calendar, MapPin, Tag, Star, Users, Clock } from 'lucide-react';
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
  if (!isOpen || !artifact) return null;

  const formatYear = (year: number) => {
    return year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="pr-12">
            <h1 className="text-3xl font-bold mb-2">{artifact.title}</h1>
            <div className="flex items-center space-x-4 text-orange-100">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{artifact.period}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatYear(artifact.year)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image Section */}
              <div className="space-y-4">
                <div className="relative group">
                  <img
                    src={artifact.imageUrl}
                    alt={artifact.title}
                    className="w-full h-80 object-cover rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                </div>
                
                {/* Quick Info Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-blue-800">Location</span>
                    </div>
                    <p className="text-blue-700 text-sm">{artifact.location}</p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="h-5 w-5 text-green-600" />
                      <span className="font-semibold text-green-800">Culture</span>
                    </div>
                    <p className="text-green-700 text-sm">{artifact.culture}</p>
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="space-y-6">
                {/* Category Badge */}
                <div className="flex items-center space-x-2">
                  <Tag className="h-5 w-5 text-purple-600" />
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {artifact.category}
                  </span>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center space-x-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
                    <span>Description</span>
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {artifact.description}
                  </p>
                </div>

                {/* Historical Significance */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center space-x-2">
                    <Star className="h-6 w-6 text-yellow-500" />
                    <span>Historical Significance</span>
                  </h3>
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200">
                    <p className="text-gray-800 leading-relaxed">
                      {artifact.significance}
                    </p>
                  </div>
                </div>

                {/* Timeline Context */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-2">Timeline Context</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium">Era:</span> {artifact.period}</p>
                    <p><span className="font-medium">Year:</span> {formatYear(artifact.year)}</p>
                    <p><span className="font-medium">Cultural Period:</span> {artifact.culture} civilization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Part of India's rich cultural heritage spanning over 4,500 years
            </p>
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};