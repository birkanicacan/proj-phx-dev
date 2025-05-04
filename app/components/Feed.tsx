import React, { useState } from 'react';
import FeedItem, { InsightData } from './FeedItem';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { ChartBarIcon } from '@heroicons/react/24/outline';

interface FeedProps {
  insights: InsightData[];
}

export default function Feed({ insights }: FeedProps) {
  const [visibleCount, setVisibleCount] = useState(3);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  
  const handleDismiss = (id: string) => {
    setDismissedIds([...dismissedIds, id]);
  };
  
  const filteredInsights = insights.filter(insight => !dismissedIds.includes(insight.id));
  const visibleInsights = filteredInsights.slice(0, visibleCount);
  const hasMore = visibleCount < filteredInsights.length;
  
  const handleShowMore = () => {
    setVisibleCount(prev => prev + 3);
  };
  
  if (filteredInsights.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="text-center py-8">
          <SparklesIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No insights available</h3>
          <p className="text-gray-600">
            Check back later for new insights from your feedback sources.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="mb-8">
      <div className="flex items-center space-x-3 mb-4">
        <ChartBarIcon className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Feed</h2>
      </div>
      
      <div className="space-y-4">
        {visibleInsights.map(insight => (
          <FeedItem 
            key={insight.id} 
            insight={insight} 
            onDismiss={handleDismiss}
          />
        ))}
        
        {hasMore && (
          <div className="text-center">
            <button 
              onClick={handleShowMore}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Show more
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 