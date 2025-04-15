'use client';

import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { SearchResults } from './SearchResults';
import { useSearchParams } from 'next/navigation';

export function SearchBar() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Get query from URL parameters
    const urlQuery = searchParams.get('q');
    if (urlQuery) {
      setQuery(decodeURIComponent(urlQuery));
      setIsSearching(true);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
  };

  return (
    <div className="space-y-4 w-full">
      <h1 className="text-2xl font-semibold text-gray-900 text-center">How can I help you today?</h1>
      <form onSubmit={handleSearch} className="w-full">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value === '') {
                setIsSearching(false);
              }
            }}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
            placeholder="Search anything..."
          />
        </div>
      </form>

      {/* Search Results */}
      {isSearching && <SearchResults query={query} />}
    </div>
  );
} 