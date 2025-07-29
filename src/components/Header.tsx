import React from 'react';
import { Clock, MapPin, Search } from 'lucide-react';

interface HeaderProps {
  onSearchChange: (search: string) => void;
  searchTerm: string;
}

export const Header: React.FC<HeaderProps> = ({ onSearchChange, searchTerm }) => {
  return (
    <header className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="bg-white/20 p-3 rounded-full">
              <Clock className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Indian Artifacts Timeline</h1>
              <p className="text-orange-100 text-sm md:text-base">Journey Through India's Rich Cultural Heritage</p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-orange-200" />
            </div>
            <input
              type="text"
              placeholder="Search artifacts..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-lg placeholder-orange-200 text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </header>
  );
};