import React, { useState, useMemo, useCallback } from 'react';
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
  const [error, setError] = useState<string | null>(null);

  // Memoized categories to prevent unnecessary recalculations
  const categories = useMemo(() => {
    try {
      const cats = Array.from(new Set(artifacts.map(artifact => artifact.category)));
      return cats.sort();
    } catch (err) {
      setError('Failed to load categories');
      return [];
    }
  }, []);

  // Memoized filtered artifacts with comprehensive search
  const filteredArtifacts = useMemo(() => {
    try {
      return artifacts.filter(artifact => {
        if (!artifact) return false;
        
        const searchLower = searchTerm.toLowerCase().trim();
        const matchesSearch = !searchLower || 
          artifact.title?.toLowerCase().includes(searchLower) ||
          artifact.description?.toLowerCase().includes(searchLower) ||
          artifact.period?.toLowerCase().includes(searchLower) ||
          artifact.culture?.toLowerCase().includes(searchLower) ||
          artifact.location?.toLowerCase().includes(searchLower) ||
          artifact.significance?.toLowerCase().includes(searchLower);
        
        const matchesCategory = selectedCategory === 'All' || artifact.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
      });
    } catch (err) {
      setError('Failed to filter artifacts');
      return [];
    }
  }, [searchTerm, selectedCategory]);

  // Optimized event handlers using useCallback
  const handleArtifactClick = useCallback((artifact: Artifact) => {
    if (!artifact) {
      setError('Invalid artifact selected');
      return;
    }
    setSelectedArtifact(artifact);
    setIsPanelOpen(true);
    setError(null);
  }, []);

  const handleClosePanel = useCallback(() => {
    setIsPanelOpen(false);
    setSelectedArtifact(null);
  }, []);

  const handleSearchChange = useCallback((search: string) => {
    setSearchTerm(search);
    setError(null);
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Error boundary component
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="text-red-600 text-center mb-4">
            <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={clearError}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        searchTerm={searchTerm} 
        onSearchChange={handleSearchChange} 
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Results summary */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold text-gray-800">{filteredArtifacts.length}</span> of{' '}
                <span className="font-semibold text-gray-800">{artifacts.length}</span> artifacts
                {searchTerm && (
                  <span className="ml-2">
                    for "<span className="font-medium text-orange-600">{searchTerm}</span>"
                  </span>
                )}
              </div>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>

          <FilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
          
          {filteredArtifacts.length > 0 ? (
            <TimelineVisualization
              artifacts={filteredArtifacts}
              onArtifactClick={handleArtifactClick}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0120 15c0-4.411-3.589-8-8-8s-8 3.589-8 8c0 1.846.63 3.542 1.688 4.891L6 22l5.291-1.312z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No artifacts found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm 
                  ? `No artifacts match your search for "${searchTerm}"`
                  : `No artifacts found in the "${selectedCategory}" category`
                }
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Show all artifacts
              </button>
            </div>
          )}
        </div>
      </main>

      <ArtifactDetailPanel
        artifact={selectedArtifact}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
      />

      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Indian Heritage Timeline</h3>
              <p className="text-gray-300 leading-relaxed">
                Explore over 4,500 years of Indian cultural heritage through our comprehensive 
                collection of historical artifacts and archaeological discoveries.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Stats</h4>
              <div className="space-y-2 text-gray-300">
                <p>{artifacts.length} Historical Artifacts</p>
                <p>{categories.length} Categories</p>
                <p>Spanning 4,500+ Years</p>
                <p>Multiple Civilizations</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Time Periods</h4>
              <div className="space-y-1 text-gray-300 text-sm">
                <p>Indus Valley Civilization (2500 BCE)</p>
                <p>Vedic Period (1500 BCE)</p>
                <p>Mauryan & Gupta Empires</p>
                <p>Medieval Kingdoms</p>
                <p>Mughal Era</p>
                <p>Colonial Period</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 mt-8 text-center">
            <p className="text-gray-400">
              © 2025 Indian Artifacts Timeline. Preserving and sharing India's rich cultural heritage.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;