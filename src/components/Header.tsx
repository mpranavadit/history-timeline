import React, { useState } from 'react';
import { Clock, MapPin, Search, Menu, X, Globe, Star, Calendar } from 'lucide-react';

interface HeaderProps {
  onSearchChange: (search: string) => void;
  searchTerm: string;
}

export const Header: React.FC<HeaderProps> = ({ onSearchChange, searchTerm }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const clearSearch = () => {
    onSearchChange('');
  };

  return (
    <header className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white shadow-2xl relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          
          {/* Logo and Title Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Enhanced Logo */}
              <div className="relative">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/30">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              
              {/* Title and Subtitle */}
              <div>
                <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent">
                  Indian Artifacts Timeline
                </h1>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-orange-100 text-sm md:text-base font-medium">
                    Journey Through India's Rich Cultural Heritage
                  </p>
                  <div className="hidden md:flex items-center space-x-1 text-orange-200 text-sm">
                    <Globe className="h-4 w-4" />
                    <span>4,500+ Years</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Navigation and Search Section */}
          <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
              
              {/* Stats Pills */}
              <div className="hidden xl:flex items-center space-x-3">
                <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full border border-white/30">
                  <div className="flex items-center space-x-2 text-sm">
                    <Star className="h-4 w-4" />
                    <span>20+ Artifacts</span>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full border border-white/30">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>11 Categories</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Search Bar */}
              <div className="relative w-full lg:w-80">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-orange-200" />
                </div>
                <input
                  type="text"
                  placeholder="Search artifacts, periods, cultures..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-12 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl placeholder-orange-200 text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent focus:bg-white/30 transition-all duration-300"
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-orange-200 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
                
                {/* Search Suggestions */}
                {searchTerm && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-48 overflow-y-auto z-50">
                    <div className="p-2">
                      <div className="text-xs text-gray-500 px-3 py-2 font-semibold">Search Suggestions</div>
                      {['Harappan', 'Gupta', 'Chola', 'Mughal', 'Buddha', 'Temple'].filter(term => 
                        term.toLowerCase().includes(searchTerm.toLowerCase())
                      ).map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => onSearchChange(suggestion)}
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
                        >
                          <Search className="h-4 w-4 inline mr-2 text-gray-400" />
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Heritage Info Bar */}
        <div className="mt-6 pt-4 border-t border-white/20">
          <div className="flex flex-wrap items-center justify-center lg:justify-between gap-4 text-sm text-orange-100">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>From Indus Valley to Modern India</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>2500 BCE - 1850 CE</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span>Multiple Civilizations</span>
              </div>
            </div>
            
            <div className="text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
              UNESCO Heritage Collection
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"></div>
    </header>
  );
};