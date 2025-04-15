'use client';

import { useState } from 'react';
import { BellIcon, ChatBubbleLeftIcon, ShareIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface Notification {
  id: string;
  type: 'comment' | 'agent' | 'share';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
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
    },
    {
      id: '5',
      type: 'agent',
      title: 'Sentiment Analysis Alert',
      description: 'Sentiment analysis agent detected a significant drop in customer satisfaction for the mobile app',
      timestamp: '3 days ago',
      read: true,
    },
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 