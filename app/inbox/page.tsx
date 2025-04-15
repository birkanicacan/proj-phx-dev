'use client';

import { useState } from 'react';
import { BellIcon, ChatBubbleLeftIcon, ShareIcon, ExclamationTriangleIcon, CheckCircleIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline';

interface Notification {
  id: string;
  type: 'comment' | 'agent' | 'share';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  comment?: {
    content: string;
    author: string;
    authorAvatar?: string;
    dashboard: string;
    dashboardLink: string;
  };
}

export default function InboxPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'comment',
      title: 'New comment on Win/Loss Analysis Q1\'25',
      description: 'Alice Doe added a comment on your Win/Loss Analysis Q1\'25 dashboard',
      timestamp: '2 hours ago',
      read: false,
      comment: {
        content: "I noticed a significant drop in win rates for the Enterprise segment in Q1. The data shows a 15% decrease compared to Q4. Could this be related to the recent pricing changes? Also, I've attached some customer feedback that might be relevant.",
        author: "Alice Doe",
        authorAvatar: "AD",
        dashboard: "Win/Loss Analysis Q1'25",
        dashboardLink: "/dashboard/win-loss-q1-25"
      }
    },
    {
      id: '2',
      type: 'agent',
      title: 'Quality Monitor Alert',
      description: 'Quality monitor agent detected an anomaly about increasing feedback on X/Twitter about the iOS app crashes',
      timestamp: '4 hours ago',
      read: false,
    },
    {
      id: '3',
      type: 'share',
      title: 'Dashboard shared with you',
      description: 'John Appleseed shared the Top 10 Features Requests dashboard with you',
      timestamp: '1 day ago',
      read: true,
    },
    {
      id: '4',
      type: 'comment',
      title: 'New comment on User Feedback Analysis',
      description: 'Bob Smith replied to your comment on the User Feedback Analysis dashboard',
      timestamp: '2 days ago',
      read: true,
      comment: {
        content: "Thanks for the analysis! I agree with your points about the mobile app performance. We should definitely prioritize the crash fixes. I've added some additional data points about user retention that might help with the prioritization.",
        author: "Bob Smith",
        authorAvatar: "BS",
        dashboard: "User Feedback Analysis",
        dashboardLink: "/dashboard/user-feedback"
      }
    },
    {
      id: '5',
      type: 'agent',
      title: 'Sentiment Analysis Alert',
      description: 'Sentiment analysis agent detected a significant drop in customer satisfaction for the mobile app',
      timestamp: '3 days ago',
      read: true,
    },
    {
      id: '6',
      type: 'comment',
      title: 'New comment on Customer Churn Analysis',
      description: 'Sarah Chen added a comment on your Customer Churn Analysis dashboard',
      timestamp: '5 hours ago',
      read: false,
      comment: {
        content: "The churn analysis shows an interesting pattern - customers who don't use our mobile app within the first 7 days have a 45% higher churn rate. I've created a new segment to track this behavior. Should we consider adding an onboarding flow specifically for mobile users?",
        author: "Sarah Chen",
        authorAvatar: "SC",
        dashboard: "Customer Churn Analysis",
        dashboardLink: "/dashboard/customer-churn"
      }
    },
    {
      id: '7',
      type: 'agent',
      title: 'Competitor Analysis Alert',
      description: 'Competitor analysis agent detected increased mentions of a new feature by our main competitor',
      timestamp: '1 day ago',
      read: false,
    },
    {
      id: '8',
      type: 'share',
      title: 'Dashboard shared with you',
      description: 'Michael Rodriguez shared the Product Usage Analytics dashboard with you',
      timestamp: '2 days ago',
      read: true,
    },
    {
      id: '9',
      type: 'comment',
      title: 'New comment on Revenue Forecast',
      description: 'Emily Wilson added a comment on your Revenue Forecast dashboard',
      timestamp: '3 days ago',
      read: true,
      comment: {
        content: "Looking at the revenue forecast, I think we might be underestimating the impact of our upcoming enterprise features. The beta testing feedback has been extremely positive, and several large accounts have expressed interest. I've adjusted the forecast model to account for this potential upside.",
        author: "Emily Wilson",
        authorAvatar: "EW",
        dashboard: "Revenue Forecast",
        dashboardLink: "/dashboard/revenue-forecast"
      }
    }
  ]);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'comment':
        return <ChatBubbleLeftIcon className="w-5 h-5 text-blue-500" />;
      case 'agent':
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />;
      case 'share':
        return <ShareIcon className="w-5 h-5 text-green-500" />;
      default:
        return <BellIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const handleReply = (id: string) => {
    // In a real app, this would open a reply dialog or navigate to the comment thread
    console.log('Reply to notification:', id);
  };

  const handleResolve = (id: string) => {
    // In a real app, this would mark the comment as resolved
    console.log('Resolve notification:', id);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Inbox</h1>
        <p className="mt-1 text-sm text-gray-500">Your notifications and activity feed</p>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border ${
              notification.read ? 'bg-white' : 'bg-blue-50'
            } border-gray-200 hover:border-gray-300 transition-colors`}
            onClick={() => markAsRead(notification.id)}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">
                    {notification.title}
                  </h3>
                  <span className="text-xs text-gray-500">{notification.timestamp}</span>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  {notification.description}
                </p>
                
                {/* Comment Content */}
                {notification.comment && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                        {notification.comment.authorAvatar}
                      </div>
                      <div className="ml-2">
                        <p className="text-sm font-medium text-gray-900">{notification.comment.author}</p>
                        <p className="text-xs text-gray-500">on {notification.comment.dashboard}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-line">
                      {notification.comment.content}
                    </p>
                    <div className="mt-3 flex items-center space-x-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReply(notification.id);
                        }}
                        className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                      >
                        <ArrowUturnLeftIcon className="w-4 h-4 mr-1" />
                        Reply
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleResolve(notification.id);
                        }}
                        className="flex items-center text-sm text-green-600 hover:text-green-800"
                      >
                        <CheckCircleIcon className="w-4 h-4 mr-1" />
                        Resolve
                      </button>
                      <a
                        href={notification.comment.dashboardLink}
                        onClick={(e) => e.stopPropagation()}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        View Dashboard
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 