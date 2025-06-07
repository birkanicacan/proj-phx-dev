'use client';

import { useState } from 'react';
import { X, Maximize2, Minimize2, Plus, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { FeedbackRecord, FeedbackStatus, Priority, Sentiment } from '../types/feedback';
import FeedbackDetailsPanel from './FeedbackDetailsPanel';

interface FeedbackKnowledgePaneProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock data for source integrations
const sourceIntegrations = [
  {
    id: '1',
    name: 'Zendesk',
    type: 'Conversation',
    status: 'Active',
    lastIngested: '3 days ago',
    recordVolume: '10,000',
    createdAt: 'Jan 1, 2025',
    syncFrequency: 'Real-time'
  },
  {
    id: '2',
    name: 'Gong',
    type: 'Rich Media',
    status: 'Active',
    lastIngested: '2 hrs ago',
    recordVolume: '1,000',
    createdAt: 'Jan 1, 2025',
    syncFrequency: 'Hourly'
  },
  {
    id: '3',
    name: 'Qualtrics',
    type: 'Survey',
    status: 'Active',
    lastIngested: '1 hr ago',
    recordVolume: '5,000',
    createdAt: 'Jan 1, 2025',
    syncFrequency: 'Daily'
  },
  {
    id: '4',
    name: 'App Store',
    type: 'Review',
    status: 'ERROR',
    lastIngested: 'N/A',
    recordVolume: '500',
    createdAt: 'Jan 1, 2025',
    syncFrequency: 'Daily'
  }
];

// Sample feedback data (reusing from feedback page)
const sampleFeedback: FeedbackRecord[] = [
  {
    id: '1',
    source: 'Zendesk',
    dateReceived: '2024-03-15',
    customerName: 'John Doe',
    customerId: 'CUST001',
    type: 'Feature Request',
    status: 'New',
    sentiment: 'Positive',
    priority: 'Medium',
    theme: 'UI/UX',
    content: 'Would love to see dark mode implementation',
    summary: 'Request for dark mode theme option to reduce eye strain during night usage',
    assignedTo: 'Sarah Chen',
    tags: ['enhancement', 'ui'],
    user: {
      id: 'U123',
      name: 'John Doe',
      role: 'Product Manager'
    },
    account: {
      id: 'ACC456',
      name: 'Acme Corp',
      tier: 'Enterprise'
    },
    opportunity: {
      id: 'OPP789',
      name: 'Acme Corp Expansion',
      value: '$50,000',
      stage: 'Negotiation'
    },
    store: {
      id: 'ST101',
      name: 'Acme Downtown',
      location: 'San Francisco, CA'
    },
    product: {
      id: 'P202',
      name: 'Analytics Suite',
      category: 'Business Intelligence'
    },
    linearIssue: {
      id: 'UI-123',
      title: 'Implement dark mode',
      status: 'In Progress',
      url: 'https://linear.app/team/project/UI-123'
    }
  },
  {
    id: '2',
    source: 'Gong',
    dateReceived: '2024-03-14',
    customerName: 'Jane Smith',
    customerId: 'CUST002',
    type: 'Bug',
    status: 'In Review',
    sentiment: 'Negative',
    priority: 'High',
    theme: 'Performance',
    content: 'App crashes when uploading large files',
    summary: 'Critical bug: Application crashes during large file upload (>50MB)',
    assignedTo: 'Mike Johnson',
    tags: ['bug', 'critical'],
    user: {
      id: 'U456',
      name: 'Jane Smith',
      role: 'Technical Lead'
    },
    account: {
      id: 'ACC789',
      name: 'TechCorp Solutions',
      tier: 'Enterprise'
    },
    opportunity: {
      id: 'OPP456',
      name: 'TechCorp Platform Migration',
      value: '$150,000',
      stage: 'Implementation'
    },
    store: {
      id: 'ST202',
      name: 'TechCorp HQ',
      location: 'Seattle, WA'
    },
    product: {
      id: 'P303',
      name: 'Data Pipeline Pro',
      category: 'Data Integration'
    }
  },
  {
    id: '3',
    source: 'App Store',
    dateReceived: '2024-03-13',
    customerName: 'Alex Brown',
    customerId: 'CUST003',
    type: 'Praise',
    status: 'Addressed',
    sentiment: 'Positive',
    priority: 'Low',
    theme: 'General',
    content: 'Great product, really improved our workflow!',
    summary: 'Positive review highlighting workflow improvements and team productivity gains',
    tags: ['testimonial'],
    user: {
      id: 'U789',
      name: 'Alex Brown',
      role: 'Operations Manager'
    },
    account: {
      id: 'ACC101',
      name: 'Startup Innovators',
      tier: 'Startup'
    },
    opportunity: {
      id: 'OPP202',
      name: 'Startup Innovators Growth Plan',
      value: '$25,000',
      stage: 'Closed Won'
    },
    store: {
      id: 'ST303',
      name: 'Innovation Hub',
      location: 'Austin, TX'
    },
    product: {
      id: 'P404',
      name: 'Workflow Automation',
      category: 'Process Automation'
    }
  }
];

const getStatusColor = (status: FeedbackStatus) => {
  switch (status) {
    case 'New':
      return 'bg-blue-100 text-blue-900';
    case 'In Review':
      return 'bg-yellow-100 text-yellow-900';
    case 'Addressed':
      return 'bg-green-100 text-green-900';
  }
};

const getSentimentColor = (sentiment: Sentiment) => {
  switch (sentiment) {
    case 'Positive':
      return 'bg-green-100 text-green-900';
    case 'Negative':
      return 'bg-red-100 text-red-900';
    default:
      return 'bg-gray-100 text-gray-900';
  }
};

const getPriorityColor = (priority: Priority) => {
  switch (priority) {
    case 'High':
      return 'bg-red-100 text-red-900';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-900';
    case 'Low':
      return 'bg-green-100 text-green-900';
    default:
      return 'bg-gray-100 text-gray-900';
  }
};

const getSourceStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-900';
    case 'ERROR':
      return 'bg-red-100 text-red-900';
    default:
      return 'bg-gray-100 text-gray-900';
  }
};

export default function FeedbackKnowledgePane({ isOpen, onClose }: FeedbackKnowledgePaneProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'sources' | 'records' | 'linkage'>('sources');
  const [searchQuery, setSearchQuery] = useState('');
  const [addColumnOpen, setAddColumnOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackRecord | null>(null);

  if (!isOpen) return null;

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleRowClick = (feedback: FeedbackRecord) => {
    setSelectedFeedback(feedback);
  };

  return (
    <div className={`
      fixed bg-white border-t border-gray-200 shadow-lg transition-all duration-300 ease-in-out z-50 flex flex-col
      ${isFullScreen 
        ? 'inset-0 left-56' 
        : 'bottom-0 left-56 right-0 h-[40vh] max-h-[400px]'
      }
    `}>
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-900">Feedback Knowledge Explorer</h2>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('sources')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                activeTab === 'sources'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Source Integrations
            </button>
            <button
              onClick={() => setActiveTab('records')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                activeTab === 'records'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Feedback Records
            </button>
            <button
              onClick={() => setActiveTab('linkage')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                activeTab === 'linkage'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Object Linkage
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullScreen}
            className="text-gray-500 hover:text-gray-700"
          >
            {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {activeTab === 'sources' && (
          <div className="h-full p-6 overflow-y-auto">
            <div className="mb-4 flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Source Integrations</h3>
                <p className="text-sm text-gray-600">
                  Active third-party sources feeding the Feedback object
                </p>
              </div>
              <Button className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Integration
              </Button>
            </div>
            <div className="border rounded-lg bg-white">
              <div className="overflow-y-auto max-h-80">
                <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200">
                    <TableHead className="text-gray-900 font-medium">Source</TableHead>
                    <TableHead className="text-gray-900 font-medium">Type</TableHead>
                    <TableHead className="text-gray-900 font-medium">Status</TableHead>
                    <TableHead className="text-gray-900 font-medium">Sync Frequency</TableHead>
                    <TableHead className="text-gray-900 font-medium">Last Ingested</TableHead>
                    <TableHead className="text-gray-900 font-medium">Record Volume</TableHead>
                    <TableHead className="text-gray-900 font-medium">Created At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sourceIntegrations.map((source) => (
                    <TableRow
                      key={source.id}
                      className="hover:bg-gray-50 border-b border-gray-200"
                    >
                      <TableCell className="font-medium text-gray-900">{source.name}</TableCell>
                      <TableCell className="text-gray-700">{source.type}</TableCell>
                      <TableCell>
                        <Badge className={getSourceStatusColor(source.status)}>
                          {source.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-700">{source.syncFrequency}</TableCell>
                      <TableCell className="text-gray-700">{source.lastIngested}</TableCell>
                      <TableCell className="text-gray-700">{source.recordVolume}</TableCell>
                      <TableCell className="text-gray-700">{source.createdAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'records' && (
          <div className="h-full flex flex-col">
            <div className="flex-shrink-0 p-6 border-b border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Feedback Records</h3>
                  <p className="text-sm text-gray-600">
                    Unified table of all feedback records with spreadsheet-like interface
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="relative">
                    <Input
                      placeholder="Search feedback..."
                      className="pl-8 w-[250px] bg-white text-gray-900 placeholder:text-gray-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-2 bg-white text-gray-700">
                        <Filter className="h-4 w-4" />
                        Filter
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem className="text-gray-700">Source</DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-700">Type</DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-700">Status</DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-700">Priority</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    variant="outline"
                    className="gap-2 bg-white text-gray-700"
                    onClick={() => setAddColumnOpen(!addColumnOpen)}
                  >
                    <Plus className="h-4 w-4" />
                    Add Column
                  </Button>
                </div>
              </div>
            </div>
            <div className={`flex-1 min-h-0 overflow-y-auto transition-all duration-200 ${selectedFeedback ? 'mr-[600px]' : ''}`}>
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200">
                    <TableHead className="text-gray-900 font-medium">Feedback</TableHead>
                    <TableHead className="text-gray-900 font-medium">Source</TableHead>
                    <TableHead className="text-gray-900 font-medium">Date</TableHead>
                    <TableHead className="text-gray-900 font-medium">User</TableHead>
                    <TableHead className="text-gray-900 font-medium">Account</TableHead>
                    <TableHead className="text-gray-900 font-medium">Type</TableHead>
                    <TableHead className="text-gray-900 font-medium">Status</TableHead>
                    <TableHead className="text-gray-900 font-medium">Sentiment</TableHead>
                    <TableHead className="text-gray-900 font-medium">Priority</TableHead>
                    <TableHead className="text-gray-900 font-medium">Tags</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleFeedback.map((feedback) => (
                    <TableRow
                      key={feedback.id}
                      className="hover:bg-gray-50 border-b border-gray-200 cursor-pointer"
                      onClick={() => handleRowClick(feedback)}
                    >
                      <TableCell className="max-w-[300px]">
                        <p className="text-gray-900 font-medium">{feedback.content}</p>
                        <p className="text-gray-700 text-sm truncate mt-1">{feedback.summary}</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-gray-900 border-gray-200">
                          {feedback.source}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-900">{feedback.dateReceived}</TableCell>
                      <TableCell>
                        {feedback.user && (
                          <div className="flex flex-col">
                            <span className="text-gray-900">{feedback.user.name}</span>
                            <span className="text-gray-700 text-sm">{feedback.user.role}</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {feedback.account && (
                          <div className="flex flex-col">
                            <span className="text-gray-900">{feedback.account.name}</span>
                            <span className="text-gray-700 text-sm">{feedback.account.tier}</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-gray-100 text-gray-700">{feedback.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(feedback.status)}>
                          {feedback.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getSentimentColor(feedback.sentiment)}>
                          {feedback.sentiment}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(feedback.priority)}>
                          {feedback.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {feedback.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {activeTab === 'linkage' && (
          <div className="h-full p-6 overflow-y-auto">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Object Linkage & Enrichment Context</h3>
              <p className="text-sm text-gray-600">
                Understand how each feedback record connects to other objects in your system
              </p>
            </div>
            
            <div className="space-y-6">
              {/* Connection Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">156</div>
                  <div className="text-sm text-blue-800">Connected Users</div>
                  <div className="text-xs text-blue-600 mt-1">85% coverage</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">89</div>
                  <div className="text-sm text-green-800">Linked Accounts</div>
                  <div className="text-xs text-green-600 mt-1">67% coverage</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">34</div>
                  <div className="text-sm text-purple-800">Opportunities</div>
                  <div className="text-xs text-purple-600 mt-1">23% coverage</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">12</div>
                  <div className="text-sm text-orange-800">Linear Issues</div>
                  <div className="text-xs text-orange-600 mt-1">8% coverage</div>
                </div>
              </div>

              {/* Recent Linkages */}
              <div className="bg-white border border-gray-200 rounded-lg">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h4 className="font-medium text-gray-900">Recent Object Connections</h4>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-900">Feedback #1 → User: John Doe → Account: Acme Corp</span>
                    </div>
                    <Badge variant="outline" className="text-xs">Auto-linked</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-900">Feedback #2 → Linear Issue: UI-123</span>
                    </div>
                    <Badge variant="outline" className="text-xs">Manual</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-900">Feedback #3 → Opportunity: Startup Growth Plan</span>
                    </div>
                    <Badge variant="outline" className="text-xs">AI-suggested</Badge>
                  </div>
                </div>
              </div>

              {/* Enrichment Opportunities */}
              <div className="bg-white border border-gray-200 rounded-lg">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h4 className="font-medium text-gray-900">Enrichment Opportunities</h4>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-gray-900">23 feedback records missing user data</div>
                      <div className="text-xs text-gray-600 mt-1">Connect a CRM to automatically link users</div>
                    </div>
                    <Button size="sm" variant="outline">Connect CRM</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-gray-900">12 feature requests could be linked to Linear</div>
                      <div className="text-xs text-gray-600 mt-1">Create issues for better tracking</div>
                    </div>
                    <Button size="sm" variant="outline">Create Issues</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Feedback Details Panel */}
      {selectedFeedback && (
        <FeedbackDetailsPanel
          feedback={selectedFeedback}
          onClose={() => setSelectedFeedback(null)}
        />
      )}
    </div>
  );
} 