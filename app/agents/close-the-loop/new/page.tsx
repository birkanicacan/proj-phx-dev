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
  <label htmlFor={htmlFor} className={`${className} text-gray-800`}>{children}</label>
);

const Textarea = ({ id, placeholder, value, onChange, className }: { id?: string; placeholder?: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; className?: string }) => (
  <textarea 
    id={id} 
    placeholder={placeholder} 
    value={value} 
    onChange={onChange} 
    className={`${className} placeholder:text-gray-500 focus:border-purple-700 focus:ring-purple-700`} 
  />
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

const Checkbox = ({ id, label, checked, onChange }: { id: string, label: string, checked: boolean, onChange: (checked: boolean) => void }) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="h-4 w-4 rounded border-gray-300 text-purple-700 focus:ring-purple-700"
    />
    <label htmlFor={id} className="ml-2 block text-sm text-gray-800">
      {label}
    </label>
  </div>
);

export default function CloseTheLoopAgentCreate() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [ticketProvider, setTicketProvider] = useState('jira');
  const [ticketSearch, setTicketSearch] = useState('');
  const [selectedTicket, setSelectedTicket] = useState('');
  const [feedbackChannels, setFeedbackChannels] = useState({
    zendesk: false,
    twitter: false,
    appStore: false,
    playStore: false,
    other: false
  });
  const [messageSource, setMessageSource] = useState('wisdom');
  const [messageContent, setMessageContent] = useState('');
  const [messagePreview, setMessagePreview] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('enterpret');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock ticket data
  const jiraTickets = [
    { id: 'PROJ-123', title: 'Fix login bug on mobile devices', status: 'In Progress' },
    { id: 'PROJ-124', title: 'Implement dark mode', status: 'Done' },
    { id: 'PROJ-125', title: 'Improve loading performance', status: 'To Do' }
  ];
  
  const linearTickets = [
    { id: 'LIN-123', title: 'Add multi-factor authentication', status: 'In Progress' },
    { id: 'LIN-124', title: 'Enhance search functionality', status: 'Done' },
    { id: 'LIN-125', title: 'Fix billing issues', status: 'Backlog' }
  ];

  // Generate recipient list based on selected channels
  const generateRecipientList = () => {
    let recipients = [];
    
    if (feedbackChannels.zendesk) recipients.push('john.doe@example.com', 'jane.smith@example.com');
    if (feedbackChannels.twitter) recipients.push('twitter_user1', 'twitter_user2');
    if (feedbackChannels.appStore) recipients.push('app_store_user1', 'app_store_user2');
    if (feedbackChannels.playStore) recipients.push('play_store_user1', 'play_store_user2');
    
    return recipients;
  };

  // Handle checkbox changes
  const handleCheckboxChange = (channel: keyof typeof feedbackChannels, checked: boolean) => {
    setFeedbackChannels({
      ...feedbackChannels,
      [channel]: checked
    });
  };

  // Generate message with Wisdom
  const generateMessage = () => {
    const generatedMessage = `Dear valued customer,

We wanted to let you know that the issue you reported regarding "${selectedTicket}" has been resolved.

Our team has worked diligently to address the concerns you raised, and we've implemented a solution that should improve your experience.

Thank you for bringing this to our attention. Your feedback is invaluable in helping us enhance our product.

Best regards,
The Product Team`;

    setMessageContent(generatedMessage);
    setMessagePreview(generatedMessage);
  };

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
        name: "Close the Loop",
        description: 'Automatically follows up with customers when their reported issues are resolved',
        type: 'Close the Loop',
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="bg-white rounded-lg border border-gray-200 mb-8">
            <div className="p-6 border-b border-gray-100 flex items-center">
              <span className="mr-3">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/></svg>
              </span>
              <div>
                <div className="font-semibold text-gray-900">Step 1: Select Ticket (Trigger)</div>
                <div className="text-gray-600 text-sm">Choose the ticket provider and select which ticket to monitor. When its status changes to "Done/Resolved", the workflow will proceed.</div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <Label htmlFor="ticket-provider" className="block text-sm font-medium text-gray-800 mb-1">Ticket Provider</Label>
                <div className="flex gap-4 mb-4">
                  <Button 
                    variant={ticketProvider === 'jira' ? 'default' : 'outline'} 
                    className={ticketProvider === 'jira' ? 'bg-purple-700 text-white hover:bg-purple-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900'}
                    onClick={() => setTicketProvider('jira')}
                  >
                    Jira
                  </Button>
                  <Button 
                    variant={ticketProvider === 'linear' ? 'default' : 'outline'} 
                    className={ticketProvider === 'linear' ? 'bg-purple-700 text-white hover:bg-purple-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900'}
                    onClick={() => setTicketProvider('linear')}
                  >
                    Linear
                  </Button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="ticket-search" className="block text-sm font-medium text-gray-800 mb-1">Search for a ticket</Label>
                <Input 
                  id="ticket-search"
                  placeholder="Search by ticket ID or title..." 
                  value={ticketSearch}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTicketSearch(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 text-gray-900 mb-4 placeholder:text-gray-500 focus:border-purple-700 focus:ring-purple-700"
                />
                
                <div className="border border-gray-200 rounded">
                  <div className="grid grid-cols-3 gap-4 p-3 border-b border-gray-200 bg-gray-50">
                    <div className="text-sm font-medium text-gray-700">ID</div>
                    <div className="text-sm font-medium text-gray-700">Title</div>
                    <div className="text-sm font-medium text-gray-700">Status</div>
                  </div>
                  {(ticketProvider === 'jira' ? jiraTickets : linearTickets).map((ticket) => (
                    <div 
                      key={ticket.id} 
                      className={`grid grid-cols-3 gap-4 p-3 border-b border-gray-200 last:border-0 hover:bg-gray-50 cursor-pointer ${selectedTicket === ticket.id ? 'bg-purple-50' : ''}`}
                      onClick={() => setSelectedTicket(ticket.id)}
                    >
                      <div className="text-gray-900">{ticket.id}</div>
                      <div className="text-gray-900">{ticket.title}</div>
                      <div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          ticket.status === 'Done' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {ticket.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="bg-white rounded-lg border border-gray-200 mb-8">
            <div className="p-6 border-b border-gray-100 flex items-center">
              <span className="mr-3">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/></svg>
              </span>
              <div>
                <div className="font-semibold text-gray-900">Step 2: Build Recipient List</div>
                <div className="text-gray-600 text-sm">Choose which feedback channels to include for recipient list generation.</div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="mb-4">
                <Label className="block text-sm font-medium text-gray-800 mb-3">Select feedback channels</Label>
                <div className="space-y-3">
                  <Checkbox
                    id="zendesk"
                    label="Zendesk"
                    checked={feedbackChannels.zendesk}
                    onChange={(checked) => handleCheckboxChange('zendesk', checked)}
                  />
                  <Checkbox
                    id="twitter"
                    label="Twitter"
                    checked={feedbackChannels.twitter}
                    onChange={(checked) => handleCheckboxChange('twitter', checked)}
                  />
                  <Checkbox
                    id="appStore"
                    label="App Store"
                    checked={feedbackChannels.appStore}
                    onChange={(checked) => handleCheckboxChange('appStore', checked)}
                  />
                  <Checkbox
                    id="playStore"
                    label="Play Store"
                    checked={feedbackChannels.playStore}
                    onChange={(checked) => handleCheckboxChange('playStore', checked)}
                  />
                  <Checkbox
                    id="other"
                    label="Other channels"
                    checked={feedbackChannels.other}
                    onChange={(checked) => handleCheckboxChange('other', checked)}
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <Label className="block text-sm font-medium text-gray-800 mb-2">Preview of recipient list</Label>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded max-h-40 overflow-y-auto">
                  {generateRecipientList().length > 0 ? (
                    <ul className="list-disc list-inside">
                      {generateRecipientList().map((recipient, index) => (
                        <li key={index} className="text-sm text-gray-700">{recipient}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No recipients selected. Please select at least one feedback channel.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="bg-white rounded-lg border border-gray-200 mb-8">
            <div className="p-6 border-b border-gray-100 flex items-center">
              <span className="mr-3">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/></svg>
              </span>
              <div>
                <div className="font-semibold text-gray-900">Step 3: Compose Message</div>
                <div className="text-gray-600 text-sm">Create the message that will be sent to customers when the ticket is resolved.</div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="mb-4">
                <Label className="block text-sm font-medium text-gray-800 mb-3">Message source</Label>
                <div className="flex gap-4 mb-4">
                  <Button 
                    variant={messageSource === 'wisdom' ? 'default' : 'outline'} 
                    className={messageSource === 'wisdom' ? 'bg-purple-700 text-white hover:bg-purple-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900'}
                    onClick={() => {
                      setMessageSource('wisdom');
                      generateMessage();
                    }}
                  >
                    Use Wisdom (Enterpret AI)
                  </Button>
                  <Button 
                    variant={messageSource === 'manual' ? 'default' : 'outline'} 
                    className={messageSource === 'manual' ? 'bg-purple-700 text-white hover:bg-purple-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900'}
                    onClick={() => setMessageSource('manual')}
                  >
                    Write manually
                  </Button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="message-content" className="block text-sm font-medium text-gray-800 mb-1">Message content</Label>
                <Textarea 
                  id="message-content"
                  placeholder="Enter your message here..." 
                  value={messageContent}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setMessageContent(e.target.value);
                    setMessagePreview(e.target.value);
                  }}
                  className="w-full min-h-[200px] border border-gray-300 rounded p-2 text-gray-900 mb-4"
                />
              </div>
              
              <div>
                <Label className="block text-sm font-medium text-gray-800 mb-2">Message preview</Label>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded max-h-60 overflow-y-auto">
                  <div className="text-sm whitespace-pre-wrap">{messagePreview}</div>
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="bg-white rounded-lg border border-gray-200 mb-8">
            <div className="p-6 border-b border-gray-100 flex items-center">
              <span className="mr-3">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/></svg>
              </span>
              <div>
                <div className="font-semibold text-gray-900">Step 4: Delivery Method</div>
                <div className="text-gray-600 text-sm">Select how you want to deliver the messages to customers.</div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-3">
                <div 
                  className={`p-4 border rounded-lg cursor-pointer ${deliveryMethod === 'enterpret' ? 'border-purple-600 bg-purple-50' : 'border-gray-300 hover:bg-gray-50'}`}
                  onClick={() => setDeliveryMethod('enterpret')}
                >
                  <div className="font-medium text-gray-900">Send directly via Enterpret</div>
                  <div className="text-sm text-gray-700 mt-1">Send emails directly to customers through Enterpret's email service.</div>
                </div>
                
                <div 
                  className={`p-4 border rounded-lg cursor-pointer ${deliveryMethod === 'hubspot' ? 'border-purple-600 bg-purple-50' : 'border-gray-300 hover:bg-gray-50'}`}
                  onClick={() => setDeliveryMethod('hubspot')}
                >
                  <div className="font-medium text-gray-900">Upload to HubSpot (draft campaign)</div>
                  <div className="text-sm text-gray-700 mt-1">Create a draft email campaign in HubSpot with the recipient list.</div>
                </div>
                
                <div 
                  className={`p-4 border rounded-lg cursor-pointer ${deliveryMethod === 'customerio' ? 'border-purple-600 bg-purple-50' : 'border-gray-300 hover:bg-gray-50'}`}
                  onClick={() => setDeliveryMethod('customerio')}
                >
                  <div className="font-medium text-gray-900">Upload to Customer.io (draft campaign)</div>
                  <div className="text-sm text-gray-700 mt-1">Create a draft email campaign in Customer.io with the recipient list.</div>
                </div>
                
                <div 
                  className={`p-4 border rounded-lg cursor-pointer ${deliveryMethod === 'sendgrid' ? 'border-purple-600 bg-purple-50' : 'border-gray-300 hover:bg-gray-50'}`}
                  onClick={() => setDeliveryMethod('sendgrid')}
                >
                  <div className="font-medium text-gray-900">Upload to SendGrid and send immediately</div>
                  <div className="text-sm text-gray-700 mt-1">Send emails immediately through SendGrid's email service.</div>
                </div>
                
                <div 
                  className={`p-4 border rounded-lg cursor-pointer ${deliveryMethod === 'twitter' ? 'border-purple-600 bg-purple-50' : 'border-gray-300 hover:bg-gray-50'}`}
                  onClick={() => setDeliveryMethod('twitter')}
                >
                  <div className="font-medium text-gray-900">Reply directly on Twitter</div>
                  <div className="text-sm text-gray-700 mt-1">Send direct replies to customers who reported issues on Twitter.</div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-6 flex items-center text-gray-500 text-sm">
        <span className="mr-2">Agent</span>
        <span className="mx-2">&gt;</span>
        <span className="mr-2">Close the Loop</span>
        <span className="mx-2">&gt;</span>
        <span className="font-medium text-gray-900">New Agent</span>
      </div>
      <div className="mb-6 p-4 bg-purple-50 border border-purple-300 rounded flex items-center">
        <span className="mr-3 text-purple-800">
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" stroke="#7e22ce" strokeWidth="2" fill="#f5f3ff"/><path d="M10 6v4" stroke="#7e22ce" strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="13.5" r="1" fill="#7e22ce"/></svg>
        </span>
        <span className="text-sm text-purple-950">Close the Loop Agent automatically follows up with every customer who reported an issue or feature request once the linked Jira or Linear ticket is marked Done, helping teams "close the loop" at scale. <a href="#" className="underline text-purple-800 hover:text-purple-900">Learn more.</a></span>
      </div>
      
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-800">Step {currentStep} of 4</span>
          <span className="text-sm text-gray-700">{25 * currentStep}% complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-purple-700 h-2.5 rounded-full" style={{ width: `${25 * currentStep}%` }}></div>
        </div>
      </div>
      
      {/* Current step content */}
      {renderStep()}
      
      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
          disabled={currentStep === 1}
          className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
        >
          Back
        </Button>
        
        {currentStep < 4 ? (
          <Button 
            onClick={() => setCurrentStep(currentStep + 1)}
            className="bg-purple-700 hover:bg-purple-800 text-white"
            disabled={currentStep === 1 && !selectedTicket}
          >
            Continue
          </Button>
        ) : (
          <Button 
            onClick={handleCreateAgent}
            className="bg-purple-700 hover:bg-purple-800 text-white"
          >
            Create Agent
          </Button>
        )}
      </div>
    </div>
  );
} 