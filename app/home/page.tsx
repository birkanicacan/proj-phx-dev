'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import IntegrationDialog from '../components/IntegrationDialog';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function HomePage() {
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [showIntegrationDialog, setShowIntegrationDialog] = useState(false);
  const [enabledIntegrations, setEnabledIntegrations] = useState<string[]>([]);

  useEffect(() => {
    // For testing, let's always show the section
    setIsFirstVisit(true);
    
    // Get selected tools from localStorage
    const storedTools = localStorage.getItem('selectedTools');
    if (storedTools) {
      try {
        const parsedTools = JSON.parse(storedTools);
        setSelectedTools(parsedTools);
      } catch (e) {
        console.error('Error parsing stored tools:', e);
      }
    }

    // Get enabled integrations from localStorage
    const storedIntegrations = localStorage.getItem('enabledIntegrations');
    if (storedIntegrations) {
      try {
        const parsedIntegrations = JSON.parse(storedIntegrations);
        setEnabledIntegrations(parsedIntegrations);
      } catch (e) {
        console.error('Error parsing enabled integrations:', e);
      }
    }
  }, []);

  const handleIntegrationClick = (tool: string) => {
    // Get current integrations
    const currentIntegrations = JSON.parse(localStorage.getItem('enabledIntegrations') || '[]');
    
    // Add the new integration if it's not already there
    if (!currentIntegrations.includes(tool)) {
      currentIntegrations.push(tool);
      localStorage.setItem('enabledIntegrations', JSON.stringify(currentIntegrations));
      setEnabledIntegrations(currentIntegrations);
    }
  };

  const handleIntegrationEnabled = (integration: string) => {
    // Get current integrations
    const currentIntegrations = JSON.parse(localStorage.getItem('enabledIntegrations') || '[]');
    
    // Add the new integration if it's not already there
    if (!currentIntegrations.includes(integration)) {
      currentIntegrations.push(integration);
      localStorage.setItem('enabledIntegrations', JSON.stringify(currentIntegrations));
      setEnabledIntegrations(currentIntegrations);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome Birkan</h1>
      </div>
      <div className="mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Connect feedback sources to get started!</h2>
      
          {selectedTools.length > 0 ? (
            <div className="mb-4">
              <p className="text-gray-700 mb-2">Let's enable these recommended integrations to get started:</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {selectedTools.map((tool) => (
                  <div key={tool} className="relative">
                    <button
                      onClick={() => handleIntegrationClick(tool)}
                      disabled={enabledIntegrations.includes(tool)}
                      className={`w-full bg-gray-50 p-3 rounded-lg text-left transition-colors ${
                        enabledIntegrations.includes(tool)
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-gray-800">{tool}</span>
                    </button>
                    {enabledIntegrations.includes(tool) && (
                      <div className="absolute top-2 right-2 flex items-center space-x-1 bg-green-50 px-2 py-1 rounded">
                        <CheckCircleIcon className="h-4 w-4 text-green-500" />
                        <span className="text-xs text-green-700">Enabled</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-700 mb-4">No tools selected yet. Please complete the onboarding process.</p>
          )}
          <button
            onClick={() => setShowIntegrationDialog(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            See all integrations
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2 text-gray-900">Recent Activity</h3>
          <p className="text-gray-600">No recent activity yet</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2 text-gray-900">Quick Actions</h3>
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
          <h3 className="text-lg font-medium mb-2 text-gray-900">Feedback Overview</h3>
          <p className="text-gray-600">Connect your first feedback source to see insights</p>
        </div>
      </div>

      <IntegrationDialog 
        isOpen={showIntegrationDialog} 
        onClose={() => setShowIntegrationDialog(false)}
        onIntegrationEnabled={handleIntegrationEnabled}
      />
    </div>
  );
} 