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
    query.toLowerCase().startsWith('why') ||
    query.toLowerCase().startsWith('summarize');

  // Check if it's specifically asking for offline mode summary
  const isOfflineModeSummary = query.toLowerCase().includes('offline mode') && 
    query.toLowerCase().includes('summarize');

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

  // Mock data for offline mode summary
  const offlineModeSummary = {
    summary: `Based on recent customer feedback across multiple channels, there is a strong demand for offline mode functionality in the platform. Here's a comprehensive summary:

Key Use Cases:
1. Field Sales Teams
   - Frequently visit manufacturing sites with poor connectivity
   - Currently using paper-based workarounds
   - Need ability to capture feedback on-site and sync later

2. Research Teams
   - Operating in remote locations
   - Collecting customer feedback data in areas without internet
   - Require reliable data collection capabilities regardless of connectivity

3. Enterprise Requirements
   - Multiple large enterprises (Tesla, SpaceX, Boeing) have requested this feature
   - Critical for field operations and data collection
   - Essential for global teams in various connectivity conditions

Technical Requirements:
• Local data storage capabilities
• Robust conflict resolution system
• Automatic synchronization when connection is restored
• Mobile app support for field usage

Impact:
The lack of offline functionality is currently:
- Reducing field team efficiency
- Creating data entry duplications
- Limiting platform usage in key scenarios
- Affecting potential enterprise adoption

Recommendation:
Given the consistent feedback and use cases presented, implementing offline mode should be considered a high-priority feature. The functionality would significantly enhance the platform's value proposition for field teams and enterprise customers.`
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
      {isOfflineModeSummary ? (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Feedback Summary</h2>
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap font-sans text-sm text-gray-700">
              {offlineModeSummary.summary}
            </div>
          </div>
        </div>
      ) : isNaturalLanguageQuery ? (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Summary</h2>
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-sm">
              {topFeatureRequests.summary}
            </pre>
          </div>
        </div>
      ) : (
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