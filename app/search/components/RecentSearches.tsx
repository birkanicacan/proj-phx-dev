'use client';

import { ClockIcon } from '@heroicons/react/24/outline';

// This would typically come from your backend or local storage
const RECENT_SEARCHES = [
  {
    id: 1,
    query: "User feedback about login issues",
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    query: "Feature requests Q1 2024",
    timestamp: "Yesterday"
  },
  {
    id: 3,
    query: "Bug reports mobile app",
    timestamp: "3 days ago"
  }
];

export function RecentSearches() {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Recent searches</h2>
      <div className="space-y-2">
        {RECENT_SEARCHES.map((search) => (
          <button
            key={search.id}
            className="flex items-center w-full p-3 text-left hover:bg-gray-50 rounded-lg group transition-colors"
            onClick={() => {
              // TODO: Implement recent search click handling
              console.log('Clicked recent search:', search.query);
            }}
          >
            <ClockIcon className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-900 truncate">{search.query}</p>
              <p className="text-xs text-gray-500">{search.timestamp}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
} 