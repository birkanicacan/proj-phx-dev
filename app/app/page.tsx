'use client';

import { useEffect, useState } from 'react';

export default function AppHome() {
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedHome');
    if (hasVisited) {
      setIsFirstVisit(false);
    }
  }, []);

  return (
    <div>
      {isFirstVisit && (
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Get Started</h2>
            <p className="text-gray-600 mb-4">
              Welcome to Enterpret! Let's set up your workspace by connecting your feedback sources.
            </p>
            <button
              onClick={() => {/* TODO: Implement import dialog */}}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Import Feedback
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Recent Activity</h3>
          <p className="text-gray-600">No recent activity yet</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded">
              Create new analysis
            </button>
            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded">
              Import feedback
            </button>
            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded">
              Ask Wisdom
            </button>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Feedback Overview</h3>
          <p className="text-gray-600">Connect your first feedback source to see insights</p>
        </div>
      </div>
    </div>
  );
} 