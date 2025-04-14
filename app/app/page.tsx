'use client';

import { useEffect, useState } from 'react';

export default function AppHome() {
  return (
    <div>
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