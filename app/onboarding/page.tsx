'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type GoalOption = {
  id: string;
  label: string;
  isOther?: boolean;
};

type ToolOption = {
  id: string;
  label: string;
  isOther?: boolean;
};

const goalOptions: GoalOption[] = [
  { id: 'consolidate', label: 'Consolidate customer feedback' },
  { id: 'analyze', label: 'Analyze customer feedback and discover insights' },
  { id: 'track-sentiment', label: 'Track CSAT, NPS, and public sentiment' },
  { id: 'track-feedback', label: 'Track product feedback and feature requests' },
  { id: 'other-goal', label: 'Other', isOther: true },
];

const toolOptions: ToolOption[] = [
  { id: 'cx-tools', label: 'CX tools: Zendesk, Intercom' },
  { id: 'crm', label: 'CRM: Salesforce, Hubspot' },
  { id: 'survey', label: 'Survey: Qualtrics, Google Forms, Typeform' },
  { id: 'review-sites', label: 'Review sites: G2, PowerReviews' },
  { id: 'app-stores', label: 'App stores' },
  { id: 'other-tools', label: 'Other', isOther: true },
];

export default function Onboarding() {
  const router = useRouter();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [otherGoal, setOtherGoal] = useState('');
  const [otherTool, setOtherTool] = useState('');

  const handleGoalChange = (goalId: string) => {
    if (selectedGoals.includes(goalId)) {
      setSelectedGoals(selectedGoals.filter(id => id !== goalId));
    } else {
      setSelectedGoals([...selectedGoals, goalId]);
    }
  };

  const handleToolChange = (toolId: string) => {
    if (selectedTools.includes(toolId)) {
      setSelectedTools(selectedTools.filter(id => id !== toolId));
    } else {
      setSelectedTools([...selectedTools, toolId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit this data to your backend
    router.push('/dashboard'); // Redirect to dashboard after onboarding
  };

  return (
    <div className="min-h-screen bg-dark text-white flex items-center justify-center">
      <div className="w-full max-w-2xl p-8 space-y-8 bg-gray-900 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Welcome to Enterpret!</h2>
          <p className="mt-2 text-gray-400">Help us personalize your experience</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Question 1 */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">What is your goal for signing up to Enterpret?</h3>
            <div className="space-y-2">
              {goalOptions.map((option) => (
                <div key={option.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={option.id}
                    checked={selectedGoals.includes(option.id)}
                    onChange={() => handleGoalChange(option.id)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-700 rounded"
                  />
                  <label htmlFor={option.id} className="ml-3 text-gray-300">
                    {option.label}
                  </label>
                </div>
              ))}
              {selectedGoals.includes('other-goal') && (
                <input
                  type="text"
                  value={otherGoal}
                  onChange={(e) => setOtherGoal(e.target.value)}
                  placeholder="Please specify"
                  className="mt-2 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              )}
            </div>
          </div>

          {/* Question 2 */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">What tools do you use for feedback collection?</h3>
            <div className="space-y-2">
              {toolOptions.map((option) => (
                <div key={option.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={option.id}
                    checked={selectedTools.includes(option.id)}
                    onChange={() => handleToolChange(option.id)}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-700 rounded"
                  />
                  <label htmlFor={option.id} className="ml-3 text-gray-300">
                    {option.label}
                  </label>
                </div>
              ))}
              {selectedTools.includes('other-tools') && (
                <input
                  type="text"
                  value={otherTool}
                  onChange={(e) => setOtherTool(e.target.value)}
                  placeholder="Please specify"
                  className="mt-2 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
} 