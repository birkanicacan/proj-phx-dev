'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronDown, Plus, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

// UI components defined inline
const Label = ({ htmlFor, className, children }: { htmlFor?: string; className?: string; children: React.ReactNode }) => (
  <label htmlFor={htmlFor} className={className}>{children}</label>
);

const Textarea = ({ id, placeholder, value, onChange, className }: { id?: string; placeholder?: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; className?: string }) => (
  <textarea id={id} placeholder={placeholder} value={value} onChange={onChange} className={className} />
);

const Select = ({ value, onValueChange, children }: { value: string; onValueChange: (value: string) => void; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === SelectTrigger) {
          return React.cloneElement(child as React.ReactElement<any>, { 
            onClick: () => setIsOpen(!isOpen) 
          });
        }
        if (React.isValidElement(child) && child.type === SelectContent) {
          return isOpen ? child : null;
        }
        return child;
      })}
    </div>
  );
};

const SelectTrigger = ({ id, className, children, onClick }: { id?: string; className?: string; children: React.ReactNode; onClick?: () => void }) => (
  <div id={id} className={`border border-gray-300 rounded px-3 py-2 flex items-center justify-between cursor-pointer ${className}`} onClick={onClick}>
    <div>{children}</div>
    <ChevronDown className="h-4 w-4 text-gray-500" />
  </div>
);

const SelectValue = ({ placeholder }: { placeholder?: string }) => (
  <span className="text-gray-900">{placeholder}</span>
);

const SelectContent = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg">
    {children}
  </div>
);

const SelectItem = ({ value, children, onSelect }: { value: string; children: React.ReactNode; onSelect?: (value: string) => void }) => (
  <div 
    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-900" 
    onClick={() => onSelect && onSelect(value)}
  >
    {children}
  </div>
);

export default function QualityMonitorAgentCreate() {
  const router = useRouter();
  const [slackChannel, setSlackChannel] = useState('product');
  const [email, setEmail] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [linearConfig, setLinearConfig] = useState({
    title: '"[Enterpret]"+Alert.title',
    description: '',
    status: 'Todo',
    priority: 'Medium',
    assignee: '',
    project: ''
  });

  const actionOptions = [
    { id: 1, name: 'Linear > Create an issue', icon: '🔄' },
    { id: 2, name: 'Jira > Create an issue', icon: '📌' },
    { id: 3, name: 'Asana > Create a task', icon: '✅' },
    { id: 4, name: 'Zendesk > Create a ticket', icon: '🎫' },
    { id: 5, name: 'Webhook > Send a webhook', icon: '🔗' },
  ];

  const handleSelectAction = (actionName: string) => {
    setIsDialogOpen(false);
    setSelectedAction(actionName);
  };

  const handleRemoveAction = () => {
    setSelectedAction(null);
  };

  const handleSelectItem = (field: string, value: string) => {
    setLinearConfig({...linearConfig, [field]: value});
  };

  const handleCreateAgent = () => {
    // In a real app, you would save the agent data to your database here
    
    // Add new agent to local storage to simulate persistence
    try {
      // Get existing agents or default to empty array
      const existingAgentsJSON = localStorage.getItem('activeAgents');
      const existingAgents = existingAgentsJSON ? JSON.parse(existingAgentsJSON) : [];
      
      // Create new agent with fixed name
      const newAgent = {
        id: Date.now().toString(), // Generate unique ID
        name: "Quality Monitor with Linear issues", // Fixed name as requested
        description: 'Monitors customer feedback and creates Linear issues automatically',
        type: 'Quality Monitor',
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
        <span className="mr-2">Quality Monitor</span>
        <span className="mx-2">&gt;</span>
        <span className="font-medium text-gray-900">New Agent</span>
      </div>
      <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded flex items-center">
        <span className="mr-3 text-purple-700">
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" stroke="#a78bfa" strokeWidth="2" fill="#f5f3ff"/><path d="M10 6v4" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="13.5" r="1" fill="#a78bfa"/></svg>
        </span>
        <span className="text-sm text-purple-900">Quality Monitor is designed to automatically detect, analyze, and alert your team about emerging quality issues based on real-time anomalies in customer feedback. <a href="#" className="underline text-purple-700">Learn more.</a></span>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-100 flex items-center">
          <span className="mr-3">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/></svg>
          </span>
          <div>
            <div className="font-semibold text-gray-900">Quality Issue Detection</div>
            <div className="text-gray-600 text-sm">The agent triggers when an anomalous quality issue is detected for the added query.</div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center border border-gray-300 rounded px-3 py-2 bg-gray-50">
              <span className="mr-2 text-gray-500">Category</span>
              <span className="mr-2 text-gray-400">is any of</span>
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">Complaint</span>
            </div>
            <Button variant="outline" className="ml-2 text-purple-700 border-purple-200">ADD FILTER</Button>
            <Button variant="outline" className="text-purple-700 border-purple-200">SAVE AS CUSTOM FILTER</Button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-100 flex items-center">
          <span className="mr-3">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/></svg>
          </span>
          <div>
            <div className="font-semibold text-gray-900">Alerts</div>
            <div className="text-gray-600 text-sm">The agent delivers notifications to the following channels with alert details, root-cause analysis, feedback trend and a link to view associated customer feedback.</div>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <div className="font-medium text-gray-800 mb-2">Slack</div>
            <div className="flex items-center gap-2">
              <div className="flex items-center border border-gray-300 rounded px-3 py-2 bg-gray-50">
                <span className="mr-2 text-gray-500">Slack channels</span>
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">{slackChannel}</span>
                <ChevronDown className="w-4 h-4 ml-2 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="font-medium text-gray-800 mb-2">Email</div>
            <Input
              placeholder="Enter email IDs"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full max-w-md"
            />
          </div>
        </div>
      </div>
      
      {selectedAction === 'Linear > Create an issue' && (
        <div className="bg-white rounded-lg border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-3 text-lg">🔄</span>
              <div>
                <div className="font-semibold text-gray-900">Linear {`>`} Create an issue</div>
                <div className="text-gray-700 text-sm">Configure the Linear issue that will be created when this agent is triggered.</div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleRemoveAction} className="text-gray-500">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <Label htmlFor="issue-title" className="block text-sm font-medium text-gray-800 mb-1">Issue title</Label>
              <Input 
                id="issue-title"
                placeholder="[Enterpret] + Alert.title" 
                value={linearConfig.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLinearConfig({...linearConfig, title: e.target.value})}
                className="w-full border border-gray-300 rounded p-2 text-gray-900 placeholder:text-gray-700"
              />
            </div>
            
            <div>
              <Label htmlFor="issue-description" className="block text-sm font-medium text-gray-800 mb-1">Description</Label>
              <Textarea 
                id="issue-description"
                placeholder="Alert.summary" 
                value={linearConfig.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setLinearConfig({...linearConfig, description: e.target.value})}
                className="w-full min-h-[100px] border border-gray-300 rounded p-2 text-gray-900"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="issue-status" className="block text-sm font-medium text-gray-800 mb-1">Status</Label>
                <Select
                  value={linearConfig.status}
                  onValueChange={(value: string) => setLinearConfig({...linearConfig, status: value})}
                >
                  <SelectTrigger id="issue-status" className="w-full">
                    <SelectValue placeholder={linearConfig.status} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todo" onSelect={() => handleSelectItem('status', 'Todo')}>Todo</SelectItem>
                    <SelectItem value="In Progress" onSelect={() => handleSelectItem('status', 'In Progress')}>In Progress</SelectItem>
                    <SelectItem value="Done" onSelect={() => handleSelectItem('status', 'Done')}>Done</SelectItem>
                    <SelectItem value="Canceled" onSelect={() => handleSelectItem('status', 'Canceled')}>Canceled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="issue-priority" className="block text-sm font-medium text-gray-800 mb-1">Priority</Label>
                <Select
                  value={linearConfig.priority}
                  onValueChange={(value: string) => setLinearConfig({...linearConfig, priority: value})}
                >
                  <SelectTrigger id="issue-priority" className="w-full">
                    <SelectValue placeholder={linearConfig.priority} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Urgent" onSelect={() => handleSelectItem('priority', 'Urgent')}>Urgent</SelectItem>
                    <SelectItem value="High" onSelect={() => handleSelectItem('priority', 'High')}>High</SelectItem>
                    <SelectItem value="Medium" onSelect={() => handleSelectItem('priority', 'Medium')}>Medium</SelectItem>
                    <SelectItem value="Low" onSelect={() => handleSelectItem('priority', 'Low')}>Low</SelectItem>
                    <SelectItem value="No Priority" onSelect={() => handleSelectItem('priority', 'No Priority')}>No Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="issue-assignee" className="block text-sm font-medium text-gray-800 mb-1">Assignee</Label>
                <Select
                  value={linearConfig.assignee}
                  onValueChange={(value: string) => setLinearConfig({...linearConfig, assignee: value})}
                >
                  <SelectTrigger id="issue-assignee" className="w-full">
                    <SelectValue placeholder={linearConfig.assignee || "Select assignee"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="me" onSelect={() => handleSelectItem('assignee', 'me')}>Me</SelectItem>
                    <SelectItem value="unassigned" onSelect={() => handleSelectItem('assignee', 'unassigned')}>Unassigned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="issue-project" className="block text-sm font-medium text-gray-800 mb-1">Project</Label>
                <Select
                  value={linearConfig.project}
                  onValueChange={(value: string) => setLinearConfig({...linearConfig, project: value})}
                >
                  <SelectTrigger id="issue-project" className="w-full">
                    <SelectValue placeholder={linearConfig.project || "Select project"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="feedback" onSelect={() => handleSelectItem('project', 'feedback')}>Customer Feedback</SelectItem>
                    <SelectItem value="bugs" onSelect={() => handleSelectItem('project', 'bugs')}>Bug Tracking</SelectItem>
                    <SelectItem value="product" onSelect={() => handleSelectItem('project', 'product')}>Product Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Button 
        variant="outline" 
        className="mb-8 text-purple-700 border-purple-200 flex items-center"
        onClick={() => setIsDialogOpen(true)}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a step
      </Button>
      
      <div className="flex justify-end gap-4">
        <Button 
          variant="outline" 
          className="border-gray-300 text-gray-800"
          onClick={() => router.push('/agents')}
        >
          CANCEL
        </Button>
        <Button 
          className="bg-purple-600 text-white hover:bg-purple-700"
          onClick={handleCreateAgent}
        >
          CREATE
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">Add an action</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {actionOptions.map((action) => (
              <div 
                key={action.id} 
                className="flex items-center p-3 cursor-pointer hover:bg-gray-50 rounded-md mb-1"
                onClick={() => handleSelectAction(action.name)}
              >
                <span className="mr-3 text-lg">{action.icon}</span>
                <span className="text-gray-800">{action.name}</span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 