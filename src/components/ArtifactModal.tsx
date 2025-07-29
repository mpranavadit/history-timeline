import React from 'react';
import { X, Calendar, MapPin, Tag, Star } from 'lucide-react';
import { Artifact } from '../data/artifacts';

interface ArtifactModalProps {
  artifact: Artifact | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ArtifactModal: React.FC<ArtifactModalProps> = ({ artifact, isOpen, onClose }) => {
  if (!isOpen || !artifact) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">{artifact.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <img
                src={artifact.imageUrl}
                alt={artifact.title}
                className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-md"
              />
            </div>
            
            <div className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 bg-orange-50 px-3 py-2 rounded-full">
                  <Calendar className="h-5 w-5 text-orange-500" />
                  <span className="text-orange-700 font-medium">{artifact.period}</span>
                </div>
                
                <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-full">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <span className="text-blue-700 font-medium">{artifact.location}</span>
                </div>
                
                <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-full">
                  <Tag className="h-5 w-5 text-green-500" />
                  <span className="text-green-700 font-medium">{artifact.category}</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{artifact.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span>Historical Significance</span>
                </h3>
                <p className="text-gray-700 leading-relaxed">{artifact.significance}</p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-1">Cultural Context</h4>
                <p className="text-purple-700">Culture: {artifact.culture}</p>
                <p className="text-purple-700">
                  Year: {Math.abs(artifact.year)} {artifact.year < 0 ? 'BCE' : 'CE'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};