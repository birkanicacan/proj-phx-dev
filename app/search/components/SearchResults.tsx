import { AskWisdom } from '../../components/AskWisdom';
import { Chip } from '../../components/Chip';
import { SearchResult } from './SearchResult';

interface SearchResultsProps {
  query: string;
}

export function SearchResults({ query }: SearchResultsProps) {
  // Check if the query is a natural language question
  const isNaturalLanguageQuery = query.toLowerCase().startsWith('what') || 
    query.toLowerCase().startsWith('how') || 
    query.toLowerCase().startsWith('why');

  // Mock data for filter chips
  const filterChips = [
    { label: 'All', count: 24 },
    { label: 'Zendesk', count: 12 },
    { label: 'Slack', count: 8 },
    { label: 'X / Twitter', count: 4 },
  ];

  // Mock data for offline mode search results
  const offlineModeResults = [
    {
      title: 'Offline Mode Feature Request - Field Sales Teams',
      source: 'Zendesk',
      date: '2 days ago',
      preview: 'Our sales team frequently visits manufacturing sites with poor internet connectivity. We desperately need offline mode support in the mobile app. Currently, our reps have to take notes on paper and update the system later. Would be a game-changer if they could capture feedback and sync when back online...',
    },
    {
      title: 'Offline Support Critical for Remote Areas',
      source: 'X / Twitter',
      date: '1 week ago',
      preview: 'Hey @Enterpret, love your platform but offline mode is crucial for our field researchers. They collect customer feedback in remote locations and need to input data without internet. Any plans to add offline capabilities? Would make your tool perfect for our use case...',
    },
    {
      title: 'Offline Mode Discussion Thread',
      source: 'Slack',
      date: '1 month ago',
      preview: 'Team discussion: Multiple enterprise customers including Tesla, SpaceX, and Boeing have requested offline mode functionality. Key requirements: local data storage, conflict resolution for simultaneous edits, and automatic sync when connection is restored. Priority level: High...',
    },
  ];

  // Mock data for natural language query response
  const topFeatureRequests = {
    summary: `Based on feedback from our paid customers over the last quarter, here are the top 3 most requested features:

1. Advanced Analytics Dashboard
   - Real-time data visualization
   - Custom report builder
   - Team performance metrics

2. Enterprise SSO Integration
   - Support for Okta and Azure AD
   - Role-based access control
   - Audit logging

3. Workflow Automation
   - Custom automation rules
   - Integration with popular tools
   - Templated workflows`,
  };

  if (!query) return null;

  return (
    <div className="space-y-6 mt-4">
      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {filterChips.map((chip) => (
          <Chip
            key={chip.label}
            label={`${chip.label} (${chip.count})`}
            onClick={() => {}}
            selected={chip.label === 'All'}
          />
        ))}
      </div>

      {/* Ask Wisdom Section */}
      <AskWisdom />

      {/* Natural Language Query Result */}
      {isNaturalLanguageQuery && (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Summary</h2>
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-sm">
              {topFeatureRequests.summary}
            </pre>
          </div>
        </div>
      )}

      {/* Regular Search Results */}
      {!isNaturalLanguageQuery && (
        <div className="space-y-4">
          {offlineModeResults.map((result, index) => (
            <SearchResult
              key={index}
              title={result.title}
              source={result.source}
              date={result.date}
              preview={result.preview}
            />
          ))}
        </div>
      )}
    </div>
  );
} 