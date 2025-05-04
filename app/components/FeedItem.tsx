import React, { useState } from 'react';
import {
  BookmarkIcon,
  ChatBubbleBottomCenterTextIcon,
  ShareIcon,
  XMarkIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Badge } from './ui/badge';

export interface InsightData {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  source: string;
  category?: string;
  chartType?: 'line' | 'bar' | 'pie';
  chartData?: any;
  chartOptions?: any;
}

interface FeedItemProps {
  insight: InsightData;
  onDismiss: (id: string) => void;
}

export default function FeedItem({ insight, onDismiss }: FeedItemProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };
  
  const toggleComments = () => {
    setShowComments(!showComments);
  };
  
  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };
  
  const handleDismiss = () => {
    onDismiss(insight.id);
  };
  
  const handleShare = (platform: 'slack' | 'email') => {
    // Implementation for sharing would go here
    console.log(`Sharing to ${platform}:`, insight);
    setShowShareOptions(false);
  };
  
  const renderChart = () => {
    if (!insight.chartType || !insight.chartData) return null;
    
    // Base chart props with height reduced to 40px
    const baseChartProps = {
      data: insight.chartData,
      options: {
        ...insight.chartOptions,
        maintainAspectRatio: true,
        responsive: true,
        animation: {
          duration: 600 // Shorter animation for better performance
        },
        plugins: {
          legend: {
            display: false // Hide legend by default
          },
          tooltip: {
            enabled: true,
            intersect: false,
            mode: 'index'
          }
        }
      }
    };
    
    // Chart type specific props and styling
    switch (insight.chartType) {
      case 'line':
        return (
          <div className="h-40 w-full mt-3">
            <Line 
              {...baseChartProps}
              options={{
                ...baseChartProps.options,
                elements: {
                  point: {
                    radius: 2,
                    hitRadius: 6,
                    hoverRadius: 4
                  },
                  line: {
                    tension: 0.3
                  }
                }
              }}
            />
          </div>
        );
      case 'bar':
        return (
          <div className="h-40 w-full mt-3">
            <Bar 
              {...baseChartProps}
              options={{
                ...baseChartProps.options,
                barThickness: 'flex'
              }}
            />
          </div>
        );
      case 'pie':
        return (
          <div className="h-36 w-full mt-3 flex justify-center">
            <div className="h-36 w-36">
              <Pie 
                {...baseChartProps}
                options={{
                  ...baseChartProps.options,
                  plugins: {
                    ...baseChartProps.options.plugins,
                    legend: {
                      display: true,
                      position: 'right',
                      labels: {
                        boxWidth: 8,
                        font: {
                          size: 9
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <span className="text-xs text-gray-500 mr-2">{insight.timestamp}</span>
          <span className="text-xs text-gray-500">via {insight.source}</span>
        </div>
        {insight.category && (
          <Badge variant="secondary" className="ml-2">
            {insight.category}
          </Badge>
        )}
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{insight.title}</h3>
      <p className="text-gray-700 mb-4">{insight.content}</p>
      
      {renderChart()}
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
        <div className="flex space-x-4">
          <button 
            onClick={toggleBookmark}
            className="flex items-center text-gray-600 hover:text-blue-600"
          >
            {isBookmarked ? (
              <BookmarkSolidIcon className="h-5 w-5 text-blue-600" />
            ) : (
              <BookmarkIcon className="h-5 w-5" />
            )}
            <span className="ml-1 text-sm">Save</span>
          </button>
          
          <button 
            onClick={toggleComments}
            className="flex items-center text-gray-600 hover:text-blue-600"
          >
            <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
            <span className="ml-1 text-sm">Comment</span>
          </button>
          
          <div className="relative">
            <button 
              onClick={toggleShareOptions}
              className="flex items-center text-gray-600 hover:text-blue-600"
            >
              <ShareIcon className="h-5 w-5" />
              <span className="ml-1 text-sm">Share</span>
            </button>
            
            {showShareOptions && (
              <div className="absolute left-0 mt-2 w-36 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <button 
                  onClick={() => handleShare('slack')} 
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Share to Slack
                </button>
                <button 
                  onClick={() => handleShare('email')} 
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Share via Email
                </button>
              </div>
            )}
          </div>
        </div>
        
        <button 
          onClick={handleDismiss}
          className="flex items-center text-gray-600 hover:text-blue-600"
        >
          <XMarkIcon className="h-5 w-5" />
          <span className="ml-1 text-sm">Dismiss</span>
        </button>
      </div>
      
      {showComments && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Comments</h4>
            <p className="text-sm text-gray-500 italic">No comments yet.</p>
          </div>
          
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 border border-gray-300 rounded-l-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white rounded-r-lg py-2 px-4 hover:bg-blue-700">
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 