import React from 'react';
import { MapPin, Calendar, Tag } from 'lucide-react';
import { Artifact } from '../data/artifacts';

interface ArtifactGridProps {
  artifacts: Artifact[];
  onArtifactClick: (artifact: Artifact) => void;
}

export const ArtifactGrid: React.FC<ArtifactGridProps> = ({ artifacts, onArtifactClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Artifact Gallery</h2>
        <p className="text-gray-600">Explore our collection of {artifacts.length} artifacts</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artifacts.map((artifact) => (
          <div
            key={artifact.id}
            onClick={() => onArtifactClick(artifact)}
            className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
          >
            <div className="aspect-w-16 aspect-h-12 overflow-hidden rounded-t-lg">
              <img
                src={artifact.imageUrl}
                alt={artifact.title}
                className="w-full h-48 object-cover"
              />
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{artifact.title}</h3>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-orange-500" />
                  <span>{artifact.period}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <span>{artifact.location}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Tag className="h-4 w-4 text-green-500" />
                  <span>{artifact.category}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-700 mt-3 line-clamp-3">
                {artifact.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};