'use client';

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import WelcomeDialog from './WelcomeDialog';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [showWelcome, setShowWelcome] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    // Check if it's the first visit
    const hasVisited = localStorage.getItem('hasVisitedHome');
    if (!hasVisited) {
      setShowWelcome(true);
      localStorage.setItem('hasVisitedHome', 'true');
    }
    setIsFirstVisit(!hasVisited);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
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
          {children}
        </div>
      </main>
      <WelcomeDialog isOpen={showWelcome} onClose={() => setShowWelcome(false)} />
    </div>
  );
} 