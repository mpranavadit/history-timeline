import React from 'react';
import { Filter, X, Grid3X3, List } from 'lucide-react';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}) => {
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

  const getCategoryColor = (category: string, isSelected: boolean) => {
    if (!isSelected) return 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200';
    
    switch (category.toLowerCase()) {
      case 'architecture': return 'bg-blue-600 text-white border-blue-600';
      case 'sculpture': return 'bg-green-600 text-white border-green-600';
      case 'painting': return 'bg-purple-600 text-white border-purple-600';
      case 'religious art': return 'bg-orange-600 text-white border-orange-600';
      case 'cave art': return 'bg-amber-600 text-white border-amber-600';
      case 'administrative': return 'bg-gray-600 text-white border-gray-600';
      case 'pottery': return 'bg-rose-600 text-white border-rose-600';
      case 'literature': return 'bg-teal-600 text-white border-teal-600';
      case 'traditional art': return 'bg-yellow-600 text-white border-yellow-600';
      case 'colonial art': return 'bg-indigo-600 text-white border-indigo-600';
      case 'military': return 'bg-red-600 text-white border-red-600';
      default: return 'bg-gray-600 text-white border-gray-600';
    }
  };

  const getActiveFiltersCount = () => {
    return selectedCategory !== 'All' ? 1 : 0;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Filter className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Filter Collection</h3>
              <p className="text-sm text-gray-600">
                Refine your exploration by category
              </p>
            </div>
          </div>
          
          {getActiveFiltersCount() > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {getActiveFiltersCount()} filter{getActiveFiltersCount() > 1 ? 's' : ''} active
              </span>
              <button
                onClick={() => onCategoryChange('All')}
                className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
              >
                <X className="h-4 w-4" />
                <span>Clear</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filter Options */}
      <div className="p-6">
        <div className="flex flex-wrap gap-3">
          {/* All Categories Button */}
          <button
            onClick={() => onCategoryChange('All')}
            className={`group flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border-2 transform hover:scale-105 ${
              selectedCategory === 'All'
                ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white border-orange-600 shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200 hover:border-gray-300'
            }`}
          >
            <Grid3X3 className="h-4 w-4" />
            <span>All Categories</span>
            {selectedCategory === 'All' && (
              <div className="bg-white/20 text-xs px-2 py-0.5 rounded-full">
                {categories.length + 1}
              </div>
            )}
          </button>
          
          {/* Category Buttons */}
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            const categoryColorClass = getCategoryColor(category, isSelected);
            
            return (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`group flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 border-2 transform hover:scale-105 hover:shadow-md ${categoryColorClass}`}
              >
                <span className="text-base">{getCategoryIcon(category)}</span>
                <span>{category}</span>
                {isSelected && (
                  <div className="bg-white/20 text-xs px-2 py-0.5 rounded-full">
                    ✓
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Filter Statistics */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <List className="h-4 w-4" />
                <span>{categories.length} categories available</span>
              </div>
            </div>
            
            <div className="text-xs text-gray-500">
              {selectedCategory === 'All' 
                ? 'Showing all artifact categories' 
                : `Filtered by ${selectedCategory}`
              }
            </div>
          </div>
        </div>

        {/* Quick Filter Suggestions */}
        {selectedCategory === 'All' && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Popular Categories</h4>
            <div className="flex flex-wrap gap-2">
              {['Architecture', 'Sculpture', 'Religious Art', 'Painting'].filter(cat => categories.includes(cat)).map((category) => (
                <button
                  key={`popular-${category}`}
                  onClick={() => onCategoryChange(category)}
                  className="text-xs bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 hover:from-blue-100 hover:to-indigo-100 px-3 py-1 rounded-full border border-blue-200 hover:border-blue-300 transition-all duration-200"
                >
                  {getCategoryIcon(category)} {category}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};