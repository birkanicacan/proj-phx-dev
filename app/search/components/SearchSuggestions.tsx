'use client';

const SUGGESTIONS = [
  {
    id: 1,
    text: "Show me all feedback about the mobile app",
    category: "Product"
  },
  {
    id: 2,
    text: "Find customer complaints about pricing",
    category: "Pricing"
  },
  {
    id: 3,
    text: "Analyze user sentiment about the new feature",
    category: "Features"
  },
  {
    id: 4,
    text: "Show feedback from enterprise customers",
    category: "Customers"
  }
];

export function SearchSuggestions() {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Try asking...</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion.id}
            className="flex items-start p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => {
              // TODO: Implement suggestion click handling
              console.log('Clicked suggestion:', suggestion.text);
            }}
          >
            <div>
              <p className="text-sm text-gray-900">{suggestion.text}</p>
              <span className="mt-1 text-xs text-gray-500">{suggestion.category}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
} 