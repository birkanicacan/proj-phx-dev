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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Filter, Plus, Search } from 'lucide-react';
import { InsightRecord, InsightStatus, InsightPriority, InsightSentiment, InsightCategory } from '../types/insights';

// Sample data
const sampleInsights: InsightRecord[] = [
  {
    id: '1',
    title: 'Dark Mode Feature Request',
    description: 'Multiple users have requested dark mode implementation to reduce eye strain',
    status: 'New',
    category: 'Improvement',
    priority: 'Medium',
    sentiment: 'Positive',
    feedbackCount: 15,
    affectedUsers: 12,
    affectedAccounts: 8,
    revenueImpact: '$50,000',
    dateGenerated: '2024-03-15',
    tags: ['ui', 'feature-request', 'accessibility'],
    relatedFeedbackIds: ['1', '3', '5'],
    lastUpdated: '2024-03-15'
  },
  {
    id: '2',
    title: 'Large File Upload Issues',
    description: 'Critical performance issues with large file uploads causing app crashes',
    status: 'In Progress',
    category: 'Complaint',
    priority: 'High',
    sentiment: 'Negative',
    feedbackCount: 8,
    affectedUsers: 6,
    affectedAccounts: 4,
    revenueImpact: '$150,000',
    dateGenerated: '2024-03-14',
    tags: ['performance', 'bug', 'critical'],
    relatedFeedbackIds: ['2', '4'],
    assignedTo: 'Mike Johnson',
    lastUpdated: '2024-03-14'
  },
  {
    id: '3',
    title: 'Microsoft Teams Integration',
    description: 'High demand for Microsoft Teams integration to streamline notifications',
    status: 'New',
    category: 'Improvement',
    priority: 'Medium',
    sentiment: 'Neutral',
    feedbackCount: 12,
    affectedUsers: 10,
    affectedAccounts: 6,
    revenueImpact: '$200,000',
    dateGenerated: '2024-03-13',
    tags: ['integration', 'microsoft', 'collaboration'],
    relatedFeedbackIds: ['4', '6'],
    lastUpdated: '2024-03-13'
  },
  {
    id: '4',
    title: 'Mobile App Performance Issues',
    description: 'Users reporting slow loading times and crashes on mobile devices',
    status: 'In Progress',
    category: 'Complaint',
    priority: 'High',
    sentiment: 'Negative',
    feedbackCount: 25,
    affectedUsers: 18,
    affectedAccounts: 12,
    revenueImpact: '$300,000',
    dateGenerated: '2024-03-12',
    tags: ['mobile', 'performance', 'critical'],
    relatedFeedbackIds: ['7', '8', '9'],
    assignedTo: 'Sarah Chen',
    lastUpdated: '2024-03-12'
  },
  {
    id: '5',
    title: 'Advanced Analytics Dashboard',
    description: 'Strong demand for more sophisticated analytics and reporting features',
    status: 'New',
    category: 'Improvement',
    priority: 'Medium',
    sentiment: 'Positive',
    feedbackCount: 20,
    affectedUsers: 15,
    affectedAccounts: 10,
    revenueImpact: '$250,000',
    dateGenerated: '2024-03-11',
    tags: ['analytics', 'reporting', 'feature-request'],
    relatedFeedbackIds: ['10', '11', '12'],
    lastUpdated: '2024-03-11'
  },
  {
    id: '6',
    title: 'Data Export Limitations',
    description: 'Users need more flexible data export options and formats',
    status: 'New',
    category: 'Help',
    priority: 'Medium',
    sentiment: 'Neutral',
    feedbackCount: 15,
    affectedUsers: 12,
    affectedAccounts: 8,
    revenueImpact: '$180,000',
    dateGenerated: '2024-03-10',
    tags: ['export', 'data', 'feature-request'],
    relatedFeedbackIds: ['13', '14'],
    lastUpdated: '2024-03-10'
  },
  {
    id: '7',
    title: 'API Rate Limiting Issues',
    description: 'Enterprise customers experiencing API rate limiting problems',
    status: 'In Progress',
    category: 'Complaint',
    priority: 'High',
    sentiment: 'Negative',
    feedbackCount: 10,
    affectedUsers: 8,
    affectedAccounts: 5,
    revenueImpact: '$400,000',
    dateGenerated: '2024-03-09',
    tags: ['api', 'enterprise', 'critical'],
    relatedFeedbackIds: ['15', '16'],
    assignedTo: 'David Lee',
    lastUpdated: '2024-03-09'
  },
  {
    id: '8',
    title: 'Customer Support Response Time',
    description: 'Positive feedback about improved customer support response times',
    status: 'Resolved',
    category: 'Praise',
    priority: 'Low',
    sentiment: 'Positive',
    feedbackCount: 30,
    affectedUsers: 25,
    affectedAccounts: 15,
    revenueImpact: '$0',
    dateGenerated: '2024-03-08',
    tags: ['support', 'customer-service', 'praise'],
    relatedFeedbackIds: ['17', '18', '19'],
    lastUpdated: '2024-03-08'
  },
  {
    id: '9',
    title: 'Documentation Improvements',
    description: 'Users requesting more comprehensive documentation and examples',
    status: 'New',
    category: 'Help',
    priority: 'Medium',
    sentiment: 'Neutral',
    feedbackCount: 18,
    affectedUsers: 14,
    affectedAccounts: 9,
    revenueImpact: '$120,000',
    dateGenerated: '2024-03-07',
    tags: ['documentation', 'help', 'feature-request'],
    relatedFeedbackIds: ['20', '21'],
    lastUpdated: '2024-03-07'
  },
  {
    id: '10',
    title: 'Integration with Salesforce',
    description: 'High demand for Salesforce integration to streamline workflows',
    status: 'New',
    category: 'Improvement',
    priority: 'High',
    sentiment: 'Positive',
    feedbackCount: 22,
    affectedUsers: 17,
    affectedAccounts: 11,
    revenueImpact: '$350,000',
    dateGenerated: '2024-03-06',
    tags: ['integration', 'salesforce', 'feature-request'],
    relatedFeedbackIds: ['22', '23', '24'],
    lastUpdated: '2024-03-06'
  },
  {
    id: '11',
    title: 'Billing System Issues',
    description: 'Customers reporting problems with billing and invoicing system',
    status: 'In Progress',
    category: 'Complaint',
    priority: 'High',
    sentiment: 'Negative',
    feedbackCount: 12,
    affectedUsers: 9,
    affectedAccounts: 6,
    revenueImpact: '$280,000',
    dateGenerated: '2024-03-05',
    tags: ['billing', 'critical', 'finance'],
    relatedFeedbackIds: ['25', '26'],
    assignedTo: 'Lisa Wong',
    lastUpdated: '2024-03-05'
  },
  {
    id: '12',
    title: 'New Feature Adoption',
    description: 'Positive feedback about recent feature releases and improvements',
    status: 'Resolved',
    category: 'Praise',
    priority: 'Low',
    sentiment: 'Positive',
    feedbackCount: 35,
    affectedUsers: 28,
    affectedAccounts: 18,
    revenueImpact: '$0',
    dateGenerated: '2024-03-04',
    tags: ['features', 'praise', 'adoption'],
    relatedFeedbackIds: ['27', '28', '29'],
    lastUpdated: '2024-03-04'
  },
  {
    id: '13',
    title: 'Mobile App UI Improvements',
    description: 'Users requesting UI enhancements for better mobile experience',
    status: 'New',
    category: 'Improvement',
    priority: 'Medium',
    sentiment: 'Positive',
    feedbackCount: 16,
    affectedUsers: 13,
    affectedAccounts: 8,
    revenueImpact: '$150,000',
    dateGenerated: '2024-03-03',
    tags: ['mobile', 'ui', 'feature-request'],
    relatedFeedbackIds: ['30', '31'],
    lastUpdated: '2024-03-03'
  },
  {
    id: '14',
    title: 'Data Security Concerns',
    description: 'Enterprise customers requesting enhanced security features',
    status: 'In Progress',
    category: 'Help',
    priority: 'High',
    sentiment: 'Neutral',
    feedbackCount: 8,
    affectedUsers: 6,
    affectedAccounts: 4,
    revenueImpact: '$500,000',
    dateGenerated: '2024-03-02',
    tags: ['security', 'enterprise', 'critical'],
    relatedFeedbackIds: ['32', '33'],
    assignedTo: 'James Wilson',
    lastUpdated: '2024-03-02'
  },
  {
    id: '15',
    title: 'Onboarding Experience',
    description: 'Positive feedback about improved onboarding process',
    status: 'Resolved',
    category: 'Praise',
    priority: 'Low',
    sentiment: 'Positive',
    feedbackCount: 25,
    affectedUsers: 20,
    affectedAccounts: 12,
    revenueImpact: '$0',
    dateGenerated: '2024-03-01',
    tags: ['onboarding', 'praise', 'user-experience'],
    relatedFeedbackIds: ['34', '35', '36'],
    lastUpdated: '2024-03-01'
  },
  {
    id: '16',
    title: 'Custom Reporting Features',
    description: 'Users requesting more customizable reporting options',
    status: 'New',
    category: 'Improvement',
    priority: 'Medium',
    sentiment: 'Positive',
    feedbackCount: 19,
    affectedUsers: 15,
    affectedAccounts: 10,
    revenueImpact: '$220,000',
    dateGenerated: '2024-02-29',
    tags: ['reporting', 'customization', 'feature-request'],
    relatedFeedbackIds: ['37', '38'],
    lastUpdated: '2024-02-29'
  },
  {
    id: '17',
    title: 'API Documentation Issues',
    description: 'Developers reporting problems with API documentation accuracy',
    status: 'In Progress',
    category: 'Complaint',
    priority: 'Medium',
    sentiment: 'Negative',
    feedbackCount: 14,
    affectedUsers: 11,
    affectedAccounts: 7,
    revenueImpact: '$180,000',
    dateGenerated: '2024-02-28',
    tags: ['api', 'documentation', 'developer'],
    relatedFeedbackIds: ['39', '40'],
    assignedTo: 'Mike Johnson',
    lastUpdated: '2024-02-28'
  },
  {
    id: '18',
    title: 'Customer Success Stories',
    description: 'Positive feedback about customer success stories and case studies',
    status: 'Resolved',
    category: 'Praise',
    priority: 'Low',
    sentiment: 'Positive',
    feedbackCount: 28,
    affectedUsers: 22,
    affectedAccounts: 14,
    revenueImpact: '$0',
    dateGenerated: '2024-02-27',
    tags: ['success-stories', 'praise', 'marketing'],
    relatedFeedbackIds: ['41', '42', '43'],
    lastUpdated: '2024-02-27'
  },
  {
    id: '19',
    title: 'Performance Monitoring',
    description: 'Users requesting better performance monitoring tools',
    status: 'New',
    category: 'Improvement',
    priority: 'Medium',
    sentiment: 'Neutral',
    feedbackCount: 16,
    affectedUsers: 13,
    affectedAccounts: 8,
    revenueImpact: '$190,000',
    dateGenerated: '2024-02-26',
    tags: ['monitoring', 'performance', 'feature-request'],
    relatedFeedbackIds: ['44', '45'],
    lastUpdated: '2024-02-26'
  },
  {
    id: '20',
    title: 'Data Import Issues',
    description: 'Customers experiencing problems with data import functionality',
    status: 'In Progress',
    category: 'Complaint',
    priority: 'High',
    sentiment: 'Negative',
    feedbackCount: 11,
    affectedUsers: 8,
    affectedAccounts: 5,
    revenueImpact: '$260,000',
    dateGenerated: '2024-02-25',
    tags: ['import', 'data', 'critical'],
    relatedFeedbackIds: ['46', '47'],
    assignedTo: 'Sarah Chen',
    lastUpdated: '2024-02-25'
  },
  {
    id: '21',
    title: 'User Interface Consistency',
    description: 'Positive feedback about improved UI consistency across platforms',
    status: 'Resolved',
    category: 'Praise',
    priority: 'Low',
    sentiment: 'Positive',
    feedbackCount: 22,
    affectedUsers: 18,
    affectedAccounts: 11,
    revenueImpact: '$0',
    dateGenerated: '2024-02-24',
    tags: ['ui', 'consistency', 'praise'],
    relatedFeedbackIds: ['48', '49', '50'],
    lastUpdated: '2024-02-24'
  },
  {
    id: '22',
    title: 'Automation Features',
    description: 'Users requesting more automation capabilities',
    status: 'New',
    category: 'Improvement',
    priority: 'Medium',
    sentiment: 'Positive',
    feedbackCount: 17,
    affectedUsers: 14,
    affectedAccounts: 9,
    revenueImpact: '$210,000',
    dateGenerated: '2024-02-23',
    tags: ['automation', 'feature-request', 'productivity'],
    relatedFeedbackIds: ['51', '52'],
    lastUpdated: '2024-02-23'
  },
  {
    id: '23',
    title: 'System Downtime Issues',
    description: 'Customers reporting frequent system downtime',
    status: 'In Progress',
    category: 'Complaint',
    priority: 'High',
    sentiment: 'Negative',
    feedbackCount: 9,
    affectedUsers: 7,
    affectedAccounts: 4,
    revenueImpact: '$450,000',
    dateGenerated: '2024-02-22',
    tags: ['downtime', 'reliability', 'critical'],
    relatedFeedbackIds: ['53', '54'],
    assignedTo: 'David Lee',
    lastUpdated: '2024-02-22'
  }
];

const getStatusColor = (status: InsightStatus) => {
  switch (status) {
    case 'New':
      return 'bg-blue-100 text-blue-800';
    case 'In Progress':
      return 'bg-yellow-100 text-yellow-800';
    case 'Resolved':
      return 'bg-green-100 text-green-800';
    case 'Archived':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getPriorityColor = (priority: InsightPriority) => {
  switch (priority) {
    case 'High':
      return 'bg-red-100 text-red-800';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'Low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getSentimentColor = (sentiment: InsightSentiment) => {
  switch (sentiment) {
    case 'Positive':
      return 'bg-green-100 text-green-800';
    case 'Negative':
      return 'bg-red-100 text-red-800';
    case 'Neutral':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getCategoryColor = (category: InsightCategory) => {
  switch (category) {
    case 'Complaint':
      return 'bg-red-100 text-red-800';
    case 'Improvement':
      return 'bg-blue-100 text-blue-800';
    case 'Help':
      return 'bg-purple-100 text-purple-800';
    case 'Praise':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function InsightsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInsight, setSelectedInsight] = useState<InsightRecord | null>(null);

  const filteredInsights = sampleInsights.filter(insight =>
    insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    insight.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    insight.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleRowClick = (insight: InsightRecord) => {
    setSelectedInsight(insight);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Insights</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Insight
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search insights..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 text-gray-900"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-gray-900">
              Sort by <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="text-gray-900">Date Generated</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-900">Priority</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-900">Feedback Count</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-900">Revenue Impact</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-900">Title</TableHead>
              <TableHead className="text-gray-900">Status</TableHead>
              <TableHead className="text-gray-900">Category</TableHead>
              <TableHead className="text-gray-900">Priority</TableHead>
              <TableHead className="text-gray-900">Sentiment</TableHead>
              <TableHead className="text-gray-900">Feedback Count</TableHead>
              <TableHead className="text-gray-900">Affected Users</TableHead>
              <TableHead className="text-gray-900">Affected Accounts</TableHead>
              <TableHead className="text-gray-900">Revenue Impact</TableHead>
              <TableHead className="text-gray-900">Date Generated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInsights.map((insight) => (
              <TableRow
                key={insight.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleRowClick(insight)}
              >
                <TableCell className="font-medium text-gray-900">{insight.title}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(insight.status)}>
                    {insight.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getCategoryColor(insight.category)}>
                    {insight.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(insight.priority)}>
                    {insight.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getSentimentColor(insight.sentiment)}>
                    {insight.sentiment}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-900">{insight.feedbackCount}</TableCell>
                <TableCell className="text-gray-900">{insight.affectedUsers}</TableCell>
                <TableCell className="text-gray-900">{insight.affectedAccounts}</TableCell>
                <TableCell className="text-gray-900">{insight.revenueImpact}</TableCell>
                <TableCell className="text-gray-900">{insight.dateGenerated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 