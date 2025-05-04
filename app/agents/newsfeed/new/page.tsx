'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronDown, Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

// UI components defined inline
const Label = ({ htmlFor, className, children }: { htmlFor?: string; className?: string; children: React.ReactNode }) => (
  <label htmlFor={htmlFor} className={className}>{children}</label>
);

const Textarea = ({ id, placeholder, value, onChange, className }: { id?: string; placeholder?: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; className?: string }) => (
  <textarea id={id} placeholder={placeholder} value={value} onChange={onChange} className={className} />
);

const RadioGroup = ({ children }: { children: React.ReactNode }) => (
  <div className="space-y-2">{children}</div>
);

const RadioItem = ({ id, value, checked, onChange, children }: { id: string; value: string; checked: boolean; onChange: (value: string) => void; children: React.ReactNode }) => (
  <div className="flex items-center space-x-2">
    <input
      type="radio"
      id={id}
      checked={checked}
      onChange={() => onChange(value)}
      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
    />
    <label htmlFor={id} className="text-gray-900">{children}</label>
  </div>
);

export default function NewsfeedAgentCreate() {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [notificationType, setNotificationType] = useState('slack');
  const [slackChannel, setSlackChannel] = useState('#general');
  const [email, setEmail] = useState('');
  
  const slackChannels = ['#general', '#feedback', '#product', '#engineering', '#mobile-team', '#design'];

  const handleCreateAgent = () => {
    // In a real app, you would save the agent data to your database here
    
    // Add new agent to local storage to simulate persistence
    try {
      // Get existing agents or default to empty array
      const existingAgentsJSON = localStorage.getItem('activeAgents');
      const existingAgents = existingAgentsJSON ? JSON.parse(existingAgentsJSON) : [];
      
      // Create new agent
      const newAgent = {
        id: Date.now().toString(), // Generate unique ID
        name: `Newsfeed: ${prompt.substring(0, 30)}${prompt.length > 30 ? '...' : ''}`,
        description: `Monitors feedback signals: ${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}`,
        type: 'Newsfeed',
        createdBy: 'Vivek Kaushal',
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
      };
      
      // Add new agent to array
      const updatedAgents = [...existingAgents, newAgent];
      
      // Save to localStorage
      localStorage.setItem('activeAgents', JSON.stringify(updatedAgents));
    } catch (error) {
      console.error('Error saving agent:', error);
    }
    
    // Navigate back to agents page
    router.push('/agents');
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-6 flex items-center text-gray-500 text-sm">
        <span className="mr-2">Agent</span>
        <span className="mx-2">&gt;</span>
        <span className="mr-2">Newsfeed Agent</span>
        <span className="mx-2">&gt;</span>
        <span className="font-medium text-gray-900">New Agent</span>
      </div>
      <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded flex items-center">
        <span className="mr-3 text-purple-700">
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" stroke="#a78bfa" strokeWidth="2" fill="#f5f3ff"/><path d="M10 6v4" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="13.5" r="1" fill="#a78bfa"/></svg>
        </span>
        <span className="text-sm text-purple-900">Newsfeed Agent monitors specified feedback signals and delivers concise, actionable insights right where your team works. <a href="#" className="underline text-purple-700">Learn more.</a></span>
      </div>
      
      {/* Step 1: Define Prompt */}
      <div className="bg-white rounded-lg border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-100 flex items-center">
          <span className="h-8 w-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mr-3">1</span>
          <div>
            <div className="font-semibold text-gray-900">Define Prompt</div>
            <div className="text-gray-600 text-sm">Describe the feedback signals you want to monitor</div>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <Label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
              Prompt
            </Label>
            <Textarea
              id="prompt"
              placeholder="Example: Monitor feedback related to integrations."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md min-h-[120px] focus:ring-purple-500 focus:border-purple-500"
            />
            <p className="mt-2 text-sm text-gray-500">
              Describe what feedback signals you want to monitor. Be specific to get the most relevant insights.
            </p>
          </div>
        </div>
      </div>
      
      {/* Step 2: Choose Destination */}
      <div className="bg-white rounded-lg border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-100 flex items-center">
          <span className="h-8 w-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mr-3">2</span>
          <div>
            <div className="font-semibold text-gray-900">Choose Destination</div>
            <div className="text-gray-600 text-sm">Where should insights be delivered?</div>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Notification Method
            </Label>
            <RadioGroup>
              <RadioItem
                id="slack"
                value="slack"
                checked={notificationType === 'slack'}
                onChange={setNotificationType}
              >
                Slack
              </RadioItem>
              <RadioItem
                id="email"
                value="email"
                checked={notificationType === 'email'}
                onChange={setNotificationType}
              >
                Email
              </RadioItem>
            </RadioGroup>
          </div>
          
          {notificationType === 'slack' ? (
            <div className="mb-4">
              <Label htmlFor="slackChannel" className="block text-sm font-medium text-gray-700 mb-1">
                Slack Channel
              </Label>
              <div className="relative">
                <select
                  id="slackChannel"
                  value={slackChannel}
                  onChange={(e) => setSlackChannel(e.target.value)}
                  className="appearance-none w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 pr-8"
                >
                  {slackChannels.map((channel) => (
                    <option key={channel} value={channel}>{channel}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Create Button */}
      <div className="flex justify-end">
        <Button 
          className="bg-gray-200 text-gray-800 hover:bg-gray-300 mr-2"
          onClick={() => router.push('/agents')}
        >
          Cancel
        </Button>
        <Button 
          className="bg-purple-600 text-white hover:bg-purple-700"
          onClick={handleCreateAgent}
          disabled={!prompt || (notificationType === 'email' && !email)}
        >
          Create Agent
        </Button>
      </div>
    </div>
  );
} 