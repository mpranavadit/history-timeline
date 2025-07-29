import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { TimelineVisualization } from './components/TimelineVisualization';
import { ArtifactDetailPanel } from './components/ArtifactDetailPanel';
import { FilterBar } from './components/FilterBar';
import { artifacts, Artifact } from './data/artifacts';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(artifacts.map(artifact => artifact.category)));
    return cats.sort();
  }, []);

  const filteredArtifacts = useMemo(() => {
    return artifacts.filter(artifact => {
      const matchesSearch = artifact.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           artifact.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           artifact.period.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           artifact.culture.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || artifact.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleArtifactClick = (artifact: Artifact) => {
    setSelectedArtifact(artifact);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setSelectedArtifact(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <FilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          
          <TimelineVisualization
            artifacts={filteredArtifacts}
            onArtifactClick={handleArtifactClick}
          />
        </div>
      </main>

      <ArtifactDetailPanel
        artifact={selectedArtifact}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
      />

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">
            © 2025 Indian Artifacts Timeline. Journey through 4,500 years of Indian heritage.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;