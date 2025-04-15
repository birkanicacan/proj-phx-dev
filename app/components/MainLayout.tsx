'use client';

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import WelcomeDialog from './WelcomeDialog';
import IntegrationDialog from './IntegrationDialog';
import { usePathname } from 'next/navigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showIntegrationDialog, setShowIntegrationDialog] = useState(false);
  const [hasEnabledIntegration, setHasEnabledIntegration] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check if it's the first visit
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (hasSeenWelcome === 'false') {
      setShowWelcome(true);
      localStorage.setItem('hasSeenWelcome', 'true');
    }

    // Check if any integration is enabled
    const enabledIntegrations = localStorage.getItem('enabledIntegrations');
    if (enabledIntegrations) {
      try {
        const integrations = JSON.parse(enabledIntegrations);
        setHasEnabledIntegration(integrations.length > 0);
      } catch (e) {
        console.error('Error parsing enabled integrations:', e);
        setHasEnabledIntegration(false);
      }
    } else {
      // Initialize empty array if no integrations exist
      localStorage.setItem('enabledIntegrations', JSON.stringify([]));
      setHasEnabledIntegration(false);
    }
  }, []);

  const handleIntegrationEnabled = () => {
    setHasEnabledIntegration(true);
    setShowIntegrationDialog(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {!hasEnabledIntegration && !['/feedback', '/dashboard/win-loss-q1-25', '/users'].includes(pathname) && (
            <div className="mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Get Started</h2>
                <p className="text-gray-600 mb-4">
                  Welcome to Enterpret! Let's set up your workspace by connecting your feedback sources.
                </p>
                <button
                  onClick={() => setShowIntegrationDialog(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Import Feedback
                </button>
              </div>
            </div>
          )}
          {children}
        </div>
      </main>
      <WelcomeDialog isOpen={showWelcome} onClose={() => setShowWelcome(false)} />
      <IntegrationDialog 
        isOpen={showIntegrationDialog} 
        onClose={() => setShowIntegrationDialog(false)}
        onIntegrationEnabled={handleIntegrationEnabled}
      />
    </div>
  );
} 