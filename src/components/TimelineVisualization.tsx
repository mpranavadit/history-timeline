import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Calendar, MapPin, Users, Clock, Star, ChevronRight, Eye, Info, Zap, Filter, Search } from 'lucide-react';

// Mock Artifact interface for demo
interface Artifact {
  id: string;
  title: string;
  year: number;
  period: string;
  culture: string;
  location: string;
  category: string;
  description: string;
  significance: string;
  imageUrl: string;
}

// Sample data for demonstration
const sampleArtifacts: Artifact[] = [
  {
    id: '1',
    title: 'Harappan Civilization Seals',
    year: -2500,
    period: 'Indus Valley Civilization',
    culture: 'Harappan',
    location: 'Harappa, Pakistan',
    category: 'Administrative',
    description: 'Ancient seals with undeciphered script from the Indus Valley Civilization.',
    significance: 'Represents one of the earliest writing systems in human history.',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
  },
  {
    id: '2',
    title: 'Ajanta Cave Paintings',
    year: -200,
    period: 'Ancient Period',
    culture: 'Buddhist',
    location: 'Maharashtra, India',
    category: 'Cave Art',
    description: 'Magnificent Buddhist cave paintings depicting Jataka tales.',
    significance: 'Masterpiece of ancient Indian art and Buddhist culture.',
    imageUrl: 'https://images.unsplash.com/photo-1539650116574-75c0c6d0ed51?w=400&h=300&fit=crop'
  },
  {
    id: '3',
    title: 'Mathura Sculptures',
    year: 100,
    period: 'Kushan Period',
    culture: 'Kushan',
    location: 'Mathura, Uttar Pradesh',
    category: 'Sculpture',
    description: 'Red sandstone sculptures from the Mathura school of art.',
    significance: 'Represents the distinctive Mathura style of Buddhist and Jain art.',
    imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop'
  },
  {
    id: '4',
    title: 'Ellora Kailasa Temple',
    year: 760,
    period: 'Rashtrakuta Period',
    culture: 'Hindu',
    location: 'Maharashtra, India',
    category: 'Architecture',
    description: 'Monolithic temple carved from a single rock.',
    significance: 'Represents the pinnacle of rock-cut architecture in India.',
    imageUrl: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&h=300&fit=crop'
  },
  {
    id: '5',
    title: 'Chola Bronze Sculptures',
    year: 1000,
    period: 'Chola Period',
    culture: 'Tamil',
    location: 'Tamil Nadu, India',
    category: 'Sculpture',
    description: 'Exquisite bronze sculptures of Hindu deities.',
    significance: 'Represents the golden age of South Indian bronze casting.',
    imageUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&h=300&fit=crop'
  },
  {
    id: '6',
    title: 'Taj Mahal',
    year: 1653,
    period: 'Mughal Period',
    culture: 'Mughal',
    location: 'Agra, Uttar Pradesh',
    category: 'Architecture',
    description: 'Ivory-white marble mausoleum built by Shah Jahan.',
    significance: 'Symbol of eternal love and masterpiece of Mughal architecture.',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop'
  }
];

// Enhanced color and icon mappings
const categoryConfig = {
  'Architecture': { color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-500', icon: '🏛️', lightBg: 'bg-blue-50', border: 'border-blue-200' },
  'Sculpture': { color: 'from-emerald-500 to-emerald-600', bgColor: 'bg-emerald-500', icon: '🗿', lightBg: 'bg-emerald-50', border: 'border-emerald-200' },
  'Painting': { color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-500', icon: '🎨', lightBg: 'bg-purple-50', border: 'border-purple-200' },
  'Religious Art': { color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-500', icon: '🕉️', lightBg: 'bg-orange-50', border: 'border-orange-200' },
  'Cave Art': { color: 'from-amber-500 to-amber-600', bgColor: 'bg-amber-500', icon: '🕳️', lightBg: 'bg-amber-50', border: 'border-amber-200' },
  'Administrative': { color: 'from-slate-500 to-slate-600', bgColor: 'bg-slate-500', icon: '📜', lightBg: 'bg-slate-50', border: 'border-slate-200' },
  'Pottery': { color: 'from-rose-500 to-rose-600', bgColor: 'bg-rose-500', icon: '🏺', lightBg: 'bg-rose-50', border: 'border-rose-200' },
  'Literature': { color: 'from-teal-500 to-teal-600', bgColor: 'bg-teal-500', icon: '📚', lightBg: 'bg-teal-50', border: 'border-teal-200' },
  'Traditional Art': { color: 'from-yellow-500 to-yellow-600', bgColor: 'bg-yellow-500', icon: '🖼️', lightBg: 'bg-yellow-50', border: 'border-yellow-200' },
  'Colonial Art': { color: 'from-indigo-500 to-indigo-600', bgColor: 'bg-indigo-500', icon: '🖼️', lightBg: 'bg-indigo-50', border: 'border-indigo-200' },
  'Military': { color: 'from-red-500 to-red-600', bgColor: 'bg-red-500', icon: '⚔️', lightBg: 'bg-red-50', border: 'border-red-200' },
};

const eraInfo = (year: number) => {
  if (year < -1500) return { name: "Ancient Period", color: "from-blue-500 to-blue-700", textColor: "text-blue-700", bgColor: "bg-blue-100" };
  if (year < 0) return { name: "Vedic Era", color: "from-green-500 to-green-700", textColor: "text-green-700", bgColor: "bg-green-100" };
  if (year < 500) return { name: "Classical Period", color: "from-orange-500 to-orange-700", textColor: "text-orange-700", bgColor: "bg-orange-100" };
  if (year < 1000) return { name: "Early Medieval", color: "from-purple-500 to-purple-700", textColor: "text-purple-700", bgColor: "bg-purple-100" };
  if (year < 1500) return { name: "Medieval Period", color: "from-pink-500 to-pink-700", textColor: "text-pink-700", bgColor: "bg-pink-100" };
  return { name: "Modern Era", color: "from-indigo-500 to-indigo-700", textColor: "text-indigo-700", bgColor: "bg-indigo-100" };
};

// Enhanced Header Component
const TimelineHeader: React.FC<{ artifacts: Artifact[] }> = ({ artifacts }) => {
  const categories = new Set(artifacts.map(a => a.category)).size;
  const cultures = new Set(artifacts.map(a => a.culture)).size;
  const locations = new Set(artifacts.map(a => a.location.split(',')[0])).size;
  
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      <div className="relative z-10 p-8 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
            <div className="flex items-center space-x-6 mb-6 lg:mb-0">
              <div className="relative">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-2xl shadow-2xl transform rotate-3">
                  <Zap className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Heritage Timeline
                </h1>
                <p className="text-slate-300 text-lg lg:text-xl max-w-md">
                  Interactive journey through Indian cultural history spanning millennia
                </p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-1">{artifacts.length}</div>
                <div className="text-sm text-slate-300 font-medium">Artifacts</div>
                <div className="text-xs text-slate-400 mt-2">Curated Collection</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Calendar, label: 'Time Span', value: '4,500+ Years', color: 'from-blue-400 to-blue-500' },
              { icon: Users, label: 'Cultures', value: cultures.toString(), color: 'from-green-400 to-green-500' },
              { icon: Star, label: 'Categories', value: categories.toString(), color: 'from-yellow-400 to-yellow-500' },
              { icon: MapPin, label: 'Locations', value: `${locations}+`, color: 'from-purple-400 to-purple-500' }
            ].map((stat, index) => (
              <div key={index} className="group bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className={`bg-gradient-to-r ${stat.color} p-2 rounded-lg w-fit mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                <div className="text-xs text-slate-400 mb-1 uppercase tracking-wide">{stat.label}</div>
                <div className="font-bold text-lg text-white">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Timeline Track
const TimelineTrack: React.FC<{ artifacts: any[] }> = ({ artifacts }) => {
  return (
    <div className="relative mb-20">
      {/* Main timeline line */}
      <div className="relative h-1 bg-gradient-to-r from-blue-300 via-purple-300 via-orange-300 to-pink-300 rounded-full shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 via-orange-500 to-pink-500 rounded-full opacity-70 animate-pulse"></div>
      </div>
      
      {/* Era markers */}
      <div className="absolute top-4 left-0 right-0 flex justify-between text-xs text-gray-500">
        <span className="bg-white px-2 py-1 rounded-full shadow-sm">Ancient</span>
        <span className="bg-white px-2 py-1 rounded-full shadow-sm">Classical</span>
        <span className="bg-white px-2 py-1 rounded-full shadow-sm">Medieval</span>
        <span className="bg-white px-2 py-1 rounded-full shadow-sm">Modern</span>
      </div>
    </div>
  );
};

// Enhanced Artifact Dot
const ArtifactDot: React.FC<{
  artifact: any;
  onClick: () => void;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}> = ({ artifact, onClick, isActive, onHover, onLeave }) => {
  const config = categoryConfig[artifact.category] || categoryConfig['Architecture'];
  const formatYear = (year: number) => (year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`);

  return (
    <div
      className="absolute transform -translate-x-1/2 group cursor-pointer"
      style={{ left: `${artifact.position}%`, top: '-1.5rem' }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {/* Connection line */}
      <div className="absolute top-6 left-1/2 transform -translate-x-0.5 w-px h-8 bg-gray-300 group-hover:bg-gray-400 transition-colors"></div>
      
      {/* Main dot */}
      <div className={`relative w-8 h-8 rounded-full bg-gradient-to-br ${config.color} shadow-lg border-4 border-white transition-all duration-300 group-hover:scale-125 ${isActive ? 'scale-150 shadow-2xl ring-4 ring-white/50' : ''}`}>
        {isActive && (
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${config.color} animate-ping opacity-75`}></div>
        )}
        <div className="absolute inset-0 flex items-center justify-center text-sm">
          {config.icon}
        </div>
        
        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${config.color} opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-md scale-150`}></div>
      </div>
      
      {/* Year label */}
      <div className="absolute top-14 left-1/2 transform -translate-x-1/2">
        <div className={`bg-white rounded-lg px-3 py-2 shadow-md border transition-all duration-300 ${isActive ? 'border-orange-300 bg-orange-50 scale-110' : 'border-gray-200'}`}>
          <div className="text-xs font-bold text-gray-800 whitespace-nowrap">
            {formatYear(artifact.year)}
          </div>
          <div className="text-xs text-gray-500 text-center mt-1">
            {artifact.culture}
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Preview Card
const PreviewCard: React.FC<{ artifact: any; onClick: () => void; onClose: () => void }> = ({ artifact, onClick, onClose }) => {
  const config = categoryConfig[artifact.category] || categoryConfig['Architecture'];
  const era = eraInfo(artifact.year);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-500" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={`bg-gradient-to-r ${config.color} p-6 text-white relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{config.icon}</div>
                <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  {artifact.category}
                </div>
              </div>
              <div className={`bg-gradient-to-r ${era.color} px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg`}>
                {era.name}
              </div>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold leading-tight mb-2">{artifact.title}</h2>
            <p className="text-white/90 text-lg">{artifact.period}</p>
          </div>
        </div>

        {/* Image */}
        <div className="relative h-64 lg:h-80 overflow-hidden">
          <img
            src={artifact.imageUrl}
            alt={artifact.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full backdrop-blur-sm hover:bg-black/70 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="flex items-center space-x-3">
              <div className={`bg-gradient-to-r ${config.color} p-2 rounded-lg`}>
                <Clock className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Period</div>
                <div className="text-sm font-semibold text-gray-800">{artifact.period}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className={`bg-gradient-to-r ${config.color} p-2 rounded-lg`}>
                <Users className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Culture</div>
                <div className="text-sm font-semibold text-gray-800">{artifact.culture}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className={`bg-gradient-to-r ${config.color} p-2 rounded-lg`}>
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Location</div>
                <div className="text-sm font-semibold text-gray-800">{artifact.location}</div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">{artifact.description}</p>
          </div>

          <div className={`bg-gradient-to-br ${config.lightBg} border ${config.border} rounded-2xl p-6`}>
            <div className="flex items-start space-x-3">
              <div className={`bg-gradient-to-r ${config.color} p-2 rounded-lg flex-shrink-0`}>
                <Star className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Historical Significance</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{artifact.significance}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Instructions
const Instructions: React.FC = () => (
  <div className="bg-gradient-to-br from-slate-50 to-blue-50 border-t border-gray-200">
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="bg-blue-500 p-2 rounded-lg">
            <Info className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">How to Explore</h3>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Navigate through centuries of Indian heritage with intuitive interactions
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: '👆',
            title: 'Hover to Preview',
            description: 'Move your cursor over any artifact dot to see a quick preview with essential information',
            color: 'from-blue-500 to-blue-600'
          },
          {
            icon: '🔍',
            title: 'Click to Explore',
            description: 'Click on any artifact to open a detailed modal with comprehensive information and high-quality images',
            color: 'from-green-500 to-green-600'
          },
          {
            icon: '⏳',
            title: 'Navigate Time',
            description: 'Scroll through the timeline to discover artifacts from different eras and civilizations',
            color: 'from-orange-500 to-orange-600'
          }
        ].map((instruction, index) => (
          <div key={index} className="group text-center">
            <div className={`bg-gradient-to-r ${instruction.color} w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
              <span className="text-2xl">{instruction.icon}</span>
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-3">{instruction.title}</h4>
            <p className="text-gray-600 leading-relaxed text-sm">{instruction.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Main Component
export const TimelineVisualization: React.FC<{ artifacts: Artifact[]; onArtifactClick: (artifact: Artifact) => void }> = ({ artifacts: propArtifacts, onArtifactClick }) => {
  const [hoveredArtifact, setHoveredArtifact] = useState<string | null>(null);
  const [selectedArtifact, setSelectedArtifact] = useState<string | null>(null);
  const [artifacts] = useState<Artifact[]>(propArtifacts || sampleArtifacts);

  const processedArtifacts = useMemo(() => {
    if (!artifacts || artifacts.length === 0) return [];
    const sorted = [...artifacts].sort((a, b) => a.year - b.year);
    const minYear = Math.min(...sorted.map(a => a.year));
    const maxYear = Math.max(...sorted.map(a => a.year));
    const yearRange = maxYear - minYear || 1;
    return sorted.map((artifact, index) => ({
      ...artifact,
      position: ((artifact.year - minYear) / yearRange) * 100,
      index,
    }));
  }, [artifacts]);

  const handleArtifactClick = (artifact: Artifact) => {
    setSelectedArtifact(artifact.id);
    setHoveredArtifact(null); // Clear hover state when clicking
    onArtifactClick(artifact);
  };

  const handleCloseModal = () => {
    setSelectedArtifact(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="bg-white shadow-2xl">
        <TimelineHeader artifacts={artifacts} />
        
        <div className="p-8 lg:p-12">
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              <TimelineTrack artifacts={processedArtifacts} />
              
              <div className="relative min-h-32">
                {processedArtifacts.map((artifact) => {
                  const isActive = hoveredArtifact === artifact.id;
                  return (
                    <ArtifactDot
                      key={artifact.id}
                      artifact={artifact}
                      onClick={() => handleArtifactClick(artifact)}
                      isActive={isActive}
                      onHover={() => setHoveredArtifact(artifact.id)}
                      onLeave={() => setHoveredArtifact(null)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        <Instructions />
      </div>

      {/* Modal - Only show when selectedArtifact exists */}
      {selectedArtifact && processedArtifacts.find(a => a.id === selectedArtifact) && (
        <PreviewCard
          artifact={processedArtifacts.find(a => a.id === selectedArtifact)!}
          onClick={() => {}}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default TimelineVisualization;