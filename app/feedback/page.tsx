'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Filter, Plus, Search } from 'lucide-react';
import { FeedbackRecord, FeedbackStatus, Priority, Sentiment } from '../types/feedback';
import FeedbackDetailsPanel from '../components/FeedbackDetailsPanel';

// Sample data
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
    source: 'Twitter',
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
    source: 'G2',
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
  },
  {
    id: '4',
    source: 'Salesforce',
    dateReceived: '2024-03-12',
    customerName: 'Emily Wilson',
    customerId: 'CUST004',
    type: 'Feature Request',
    status: 'New',
    sentiment: 'Neutral',
    priority: 'Medium',
    theme: 'Integration',
    content: 'Need integration with Microsoft Teams',
    summary: 'Feature request for Microsoft Teams integration to streamline notifications',
    assignedTo: 'David Lee',
    tags: ['integration', 'microsoft'],
    user: {
      id: 'U101',
      name: 'Emily Wilson',
      role: 'IT Director'
    },
    account: {
      id: 'ACC202',
      name: 'Enterprise Solutions Inc',
      tier: 'Enterprise'
    },
    opportunity: {
      id: 'OPP303',
      name: 'Enterprise Collaboration Suite',
      value: '$200,000',
      stage: 'Proposal'
    },
    store: {
      id: 'ST505',
      name: 'Enterprise HQ',
      location: 'Chicago, IL'
    },
    product: {
      id: 'P606',
      name: 'Team Collaboration Suite',
      category: 'Communication Tools'
    }
  },
  {
    id: '5',
    source: 'G2',
    dateReceived: '2024-03-11',
    customerName: 'Michael Chang',
    customerId: 'CUST005',
    type: 'Feature Request',
    status: 'In Review',
    sentiment: 'Positive',
    priority: 'Medium',
    theme: 'Analytics',
    content: 'Would be great to have more advanced analytics dashboards',
    summary: 'Request for enhanced analytics capabilities with custom metrics and advanced visualization options',
    assignedTo: 'Lisa Wong',
    tags: ['analytics', 'reporting', 'enhancement'],
    user: {
      id: 'U202',
      name: 'Michael Chang',
      role: 'Data Analyst'
    },
    account: {
      id: 'ACC303',
      name: 'Data Insights Co',
      tier: 'Business'
    },
    opportunity: {
      id: 'OPP404',
      name: 'Advanced Analytics Package',
      value: '$85,000',
      stage: 'Negotiation'
    },
    store: {
      id: 'ST606',
      name: 'Data Center',
      location: 'Boston, MA'
    },
    product: {
      id: 'P707',
      name: 'Business Analytics Pro',
      category: 'Analytics'
    }
  },
  {
    id: '6',
    source: 'Zendesk',
    dateReceived: '2024-03-10',
    customerName: 'Sarah Johnson',
    customerId: 'CUST006',
    type: 'Bug',
    status: 'New',
    sentiment: 'Negative',
    priority: 'High',
    theme: 'Data Export',
    content: 'CSV export is missing some columns and data',
    summary: 'Critical issue: Data export functionality incomplete, affecting reporting workflows',
    assignedTo: 'James Wilson',
    tags: ['bug', 'data', 'export'],
    user: {
      id: 'U303',
      name: 'Sarah Johnson',
      role: 'Business Analyst'
    },
    account: {
      id: 'ACC404',
      name: 'Financial Services Ltd',
      tier: 'Enterprise'
    },
    opportunity: {
      id: 'OPP505',
      name: 'Financial Reporting System',
      value: '$120,000',
      stage: 'Implementation'
    },
    store: {
      id: 'ST707',
      name: 'Financial District',
      location: 'New York, NY'
    },
    product: {
      id: 'P808',
      name: 'Data Export Suite',
      category: 'Data Management'
    }
  },
  {
    id: '7',
    source: 'Twitter',
    dateReceived: '2024-03-09',
    customerName: 'David Lee',
    customerId: 'CUST007',
    type: 'Complaint',
    status: 'Addressed',
    sentiment: 'Negative',
    priority: 'Medium',
    theme: 'Pricing',
    content: 'Recent price increase is too steep for small businesses',
    summary: 'Concerns about pricing structure changes impacting small business customers',
    assignedTo: 'Rachel Chen',
    tags: ['pricing', 'smb'],
    user: {
      id: 'U404',
      name: 'David Lee',
      role: 'Small Business Owner'
    },
    account: {
      id: 'ACC505',
      name: 'Local Business Network',
      tier: 'Startup'
    },
    opportunity: {
      id: 'OPP606',
      name: 'SMB Growth Package',
      value: '$15,000',
      stage: 'Closed Lost'
    },
    store: {
      id: 'ST808',
      name: 'Local Business Hub',
      location: 'Portland, OR'
    },
    product: {
      id: 'P909',
      name: 'SMB Essentials',
      category: 'Business Management'
    }
  },
  {
    id: '8',
    source: 'Salesforce',
    dateReceived: '2024-03-08',
    customerName: 'Jennifer Martinez',
    customerId: 'CUST008',
    type: 'Feature Request',
    status: 'New',
    sentiment: 'Neutral',
    priority: 'Low',
    theme: 'Mobile',
    content: 'Need a mobile app for quick access on the go',
    summary: 'Feature request for native mobile application to support field sales teams',
    tags: ['mobile', 'enhancement'],
    user: {
      id: 'U505',
      name: 'Jennifer Martinez',
      role: 'Sales Manager'
    },
    account: {
      id: 'ACC606',
      name: 'Field Sales Solutions',
      tier: 'Business'
    },
    opportunity: {
      id: 'OPP707',
      name: 'Mobile Sales Platform',
      value: '$45,000',
      stage: 'Discovery'
    },
    store: {
      id: 'ST909',
      name: 'Sales Operations',
      location: 'Denver, CO'
    },
    product: {
      id: 'P1010',
      name: 'Mobile Sales Assistant',
      category: 'Sales Tools'
    }
  },
  {
    id: '9',
    source: 'G2',
    dateReceived: '2024-03-07',
    customerName: 'Robert Taylor',
    customerId: 'CUST009',
    type: 'Praise',
    status: 'Addressed',
    sentiment: 'Positive',
    priority: 'Low',
    theme: 'Support',
    content: 'Customer support team is exceptional, always helpful and quick to respond',
    summary: 'Positive feedback highlighting excellent customer support experience and quick response times',
    tags: ['support', 'testimonial'],
    user: {
      id: 'U606',
      name: 'Robert Taylor',
      role: 'Customer Success Manager'
    },
    account: {
      id: 'ACC707',
      name: 'Customer First Inc',
      tier: 'Enterprise'
    },
    opportunity: {
      id: 'OPP808',
      name: 'Customer Success Platform',
      value: '$95,000',
      stage: 'Closed Won'
    },
    store: {
      id: 'ST1010',
      name: 'Customer Success Center',
      location: 'Atlanta, GA'
    },
    product: {
      id: 'P1111',
      name: 'Customer Support Suite',
      category: 'Customer Service'
    }
  },
  {
    id: '10',
    source: 'Zendesk',
    dateReceived: '2024-03-06',
    customerName: 'Amanda White',
    customerId: 'CUST010',
    type: 'Bug',
    status: 'In Review',
    sentiment: 'Negative',
    priority: 'High',
    theme: 'Authentication',
    content: 'SSO integration with Okta stopped working after latest update',
    summary: 'Authentication issue affecting enterprise customers using Okta SSO integration',
    assignedTo: 'Tom Anderson',
    tags: ['bug', 'sso', 'enterprise'],
    user: {
      id: 'U707',
      name: 'Amanda White',
      role: 'Security Engineer'
    },
    account: {
      id: 'ACC808',
      name: 'Secure Systems Corp',
      tier: 'Enterprise'
    },
    opportunity: {
      id: 'OPP909',
      name: 'Enterprise Security Suite',
      value: '$180,000',
      stage: 'Implementation'
    },
    store: {
      id: 'ST1111',
      name: 'Security Operations',
      location: 'Washington, DC'
    },
    product: {
      id: 'P1212',
      name: 'Enterprise SSO',
      category: 'Security'
    }
  },
  {
    id: '11',
    source: 'Twitter',
    dateReceived: '2024-03-05',
    customerName: 'Chris Rodriguez',
    customerId: 'CUST011',
    type: 'Feature Request',
    status: 'New',
    sentiment: 'Positive',
    priority: 'Medium',
    theme: 'Collaboration',
    content: 'Would love to see real-time collaboration features like Google Docs',
    summary: 'Request for collaborative editing features to improve team workflow',
    assignedTo: 'Nina Patel',
    tags: ['collaboration', 'enhancement'],
    user: {
      id: 'U808',
      name: 'Chris Rodriguez',
      role: 'Team Lead'
    },
    account: {
      id: 'ACC909',
      name: 'Collaborative Workspaces',
      tier: 'Business'
    },
    opportunity: {
      id: 'OPP1010',
      name: 'Team Collaboration Suite',
      value: '$65,000',
      stage: 'Proposal'
    },
    store: {
      id: 'ST1212',
      name: 'Collaboration Hub',
      location: 'San Diego, CA'
    },
    product: {
      id: 'P1313',
      name: 'Team Workspace',
      category: 'Collaboration'
    }
  },
  {
    id: '12',
    source: 'Salesforce',
    dateReceived: '2024-03-04',
    customerName: 'Kevin O\'Brien',
    customerId: 'CUST012',
    type: 'Complaint',
    status: 'In Review',
    sentiment: 'Negative',
    priority: 'Medium',
    theme: 'Performance',
    content: 'Dashboard loading times have gotten significantly slower',
    summary: 'Performance degradation reported in dashboard loading and data visualization',
    assignedTo: 'Alex Kim',
    tags: ['performance', 'dashboard'],
    user: {
      id: 'U909',
      name: 'Kevin O\'Brien',
      role: 'Data Visualization Specialist'
    },
    account: {
      id: 'ACC1010',
      name: 'Data Insights Pro',
      tier: 'Business'
    },
    opportunity: {
      id: 'OPP1111',
      name: 'Performance Optimization',
      value: '$35,000',
      stage: 'Discovery'
    },
    store: {
      id: 'ST1313',
      name: 'Data Visualization Center',
      location: 'Phoenix, AZ'
    },
    product: {
      id: 'P1414',
      name: 'Dashboard Pro',
      category: 'Data Visualization'
    }
  },
  {
    id: '13',
    source: 'G2',
    dateReceived: '2024-03-03',
    customerName: 'Michelle Park',
    customerId: 'CUST013',
    type: 'Praise',
    status: 'Addressed',
    sentiment: 'Positive',
    priority: 'Low',
    theme: 'Integration',
    content: 'The Slack integration is a game changer for our team\'s workflow',
    summary: 'Positive review of Slack integration features and workflow improvements',
    tags: ['integration', 'slack', 'testimonial'],
    user: {
      id: 'U1010',
      name: 'Michelle Park',
      role: 'Product Manager'
    },
    account: {
      id: 'ACC1111',
      name: 'Workflow Solutions',
      tier: 'Business'
    },
    opportunity: {
      id: 'OPP1212',
      name: 'Workflow Automation Suite',
      value: '$55,000',
      stage: 'Closed Won'
    },
    store: {
      id: 'ST1414',
      name: 'Workflow Hub',
      location: 'Minneapolis, MN'
    },
    product: {
      id: 'P1515',
      name: 'Workflow Integrator',
      category: 'Integration'
    }
  },
  {
    id: '14',
    source: 'Zendesk',
    dateReceived: '2024-03-02',
    customerName: 'Thomas Garcia',
    customerId: 'CUST014',
    type: 'Feature Request',
    status: 'New',
    sentiment: 'Neutral',
    priority: 'Low',
    theme: 'Customization',
    content: 'Need more customization options for email notifications',
    summary: 'Request for enhanced email notification settings and templates',
    assignedTo: 'Emma Thompson',
    tags: ['notifications', 'customization'],
    user: {
      id: 'U999',
      name: 'Thomas Garcia',
      role: 'Marketing Director'
    },
    account: {
      id: 'ACC555',
      name: 'Global Marketing Co',
      tier: 'Business'
    },
    opportunity: {
      id: 'OPP777',
      name: 'Marketing Suite Upgrade',
      value: '$75,000',
      stage: 'Discovery'
    },
    store: {
      id: 'ST444',
      name: 'Marketing HQ',
      location: 'Miami, FL'
    },
    product: {
      id: 'P888',
      name: 'Marketing Automation Suite',
      category: 'Marketing Tools'
    }
  },
];

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

export default function FeedbackPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackRecord | null>(null);

  const handleRowClick = (feedback: FeedbackRecord) => {
    setSelectedFeedback(feedback);
  };

  return (
    <div className="w-full relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Feedback</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search feedback..."
              className="pl-8 w-[300px] bg-white text-gray-900 placeholder:text-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-white text-gray-700">
                <Filter className="h-4 w-4" />
                Filter
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="text-gray-700">Source</DropdownMenuItem>
              <DropdownMenuItem className="text-gray-700">Type</DropdownMenuItem>
              <DropdownMenuItem className="text-gray-700">Status</DropdownMenuItem>
              <DropdownMenuItem className="text-gray-700">Priority</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Feedback
          </Button>
        </div>
      </div>

      <div className={`border rounded-lg bg-white transition-all duration-200 ${selectedFeedback ? 'mr-[600px]' : ''}`}>
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200">
              <TableHead className="text-gray-900 font-medium">Feedback</TableHead>
              <TableHead className="text-gray-900 font-medium">Source</TableHead>
              <TableHead className="text-gray-900 font-medium">Date</TableHead>
              <TableHead className="text-gray-900 font-medium">User</TableHead>
              <TableHead className="text-gray-900 font-medium">Account</TableHead>
              <TableHead className="text-gray-900 font-medium">Opportunity</TableHead>
              <TableHead className="text-gray-900 font-medium">Store</TableHead>
              <TableHead className="text-gray-900 font-medium">Product</TableHead>
              <TableHead className="text-gray-900 font-medium">Type</TableHead>
              <TableHead className="text-gray-900 font-medium">Status</TableHead>
              <TableHead className="text-gray-900 font-medium">Sentiment</TableHead>
              <TableHead className="text-gray-900 font-medium">Priority</TableHead>
              <TableHead className="text-gray-900 font-medium">Theme</TableHead>
              <TableHead className="text-gray-900 font-medium">Assigned To</TableHead>
              <TableHead className="text-gray-900 font-medium">Tags</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleFeedback.map((feedback) => (
              <TableRow
                key={feedback.id}
                className="group hover:bg-gray-50 border-b border-gray-200 cursor-pointer"
                onClick={() => handleRowClick(feedback)}
              >
                <TableCell className="max-w-[300px]">
                  <p className="text-gray-900 font-medium">{feedback.content}</p>
                  <p className="text-gray-700 text-sm truncate mt-1">{feedback.summary}</p>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-gray-900 border-gray-200">{feedback.source}</Badge>
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
                  {feedback.opportunity && (
                    <div className="flex flex-col">
                      <span className="text-gray-900">{feedback.opportunity.name}</span>
                      <span className="text-gray-500 text-sm">{feedback.opportunity.value}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {feedback.store && (
                    <div className="flex flex-col">
                      <span className="text-gray-900">{feedback.store.name}</span>
                      <span className="text-gray-500 text-sm">{feedback.store.location}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {feedback.product && (
                    <div className="flex flex-col">
                      <span className="text-gray-900">{feedback.product.name}</span>
                      <span className="text-gray-500 text-sm">{feedback.product.category}</span>
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
                <TableCell className="text-gray-700">{feedback.theme}</TableCell>
                <TableCell>
                  {feedback.assignedTo && (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-gray-200 text-gray-700">
                          {feedback.assignedTo.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-gray-700">{feedback.assignedTo}</span>
                    </div>
                  )}
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

      {selectedFeedback && (
        <FeedbackDetailsPanel
          feedback={selectedFeedback}
          onClose={() => setSelectedFeedback(null)}
        />
      )}
    </div>
  );
} 