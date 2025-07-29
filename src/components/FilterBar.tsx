import React from 'react';
import { Filter } from 'lucide-react';

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
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-gray-700">
          <Filter className="h-5 w-5" />
          <span className="font-medium">Filter by Category:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange('All')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'All'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Categories
          </button>
          
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};