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
  const recentSearches = [
    {
      query: 'Offline mode',
      timestamp: '2 hours ago',
    },
    {
      query: 'Top feature requests from paid customers',
      timestamp: '1 day ago',
    },
    {
      query: 'API documentation',
      timestamp: '3 days ago',
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Recent Searches</h2>
      <div className="space-y-2">
        {recentSearches.map((search, index) => (
          <button
            key={index}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-gray-200 bg-white hover:border-gray-300 transition-colors"
          >
            <span className="text-gray-900">{search.query}</span>
            <span className="text-sm text-gray-500">{search.timestamp}</span>
          </button>
        ))}
      </div>
    </div>
  );
} 