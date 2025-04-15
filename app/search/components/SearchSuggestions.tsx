'use client';

export function SearchSuggestions() {
  const suggestions = [
    'How to use offline mode?',
    'What are the top feature requests?',
    'Integration documentation',
    'API reference',
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Ask Wisdom</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            className="text-left px-4 py-3 rounded-lg border border-gray-200 bg-white hover:border-gray-300 transition-colors text-gray-900"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
} 