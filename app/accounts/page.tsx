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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Types for account data
type AccountTier = 'Enterprise' | 'Business' | 'Startup';
type AccountStatus = 'Active' | 'Inactive' | 'Prospect';
type Industry = 'Technology' | 'Finance' | 'Healthcare' | 'Retail' | 'Manufacturing' | 'Education' | 'Professional Services';
type AccountType = 'Customer' | 'Partner' | 'Vendor' | 'Competitor';

interface AccountRecord {
  id: string;
  name: string;
  industry: Industry;
  type: AccountType;
  tier: AccountTier;
  status: AccountStatus;
  annualRevenue: string;
  employeeCount: number;
  location: string;
  website: string;
  lastContactDate: string;
  opportunityCount: number;
  feedbackCount: number;
  tags: string[];
  primaryContact: {
    name: string;
    email: string;
    role: string;
  };
}

// Sample data
const sampleAccounts: AccountRecord[] = [
  {
    id: 'ACC001',
    name: 'TechCorp Solutions',
    industry: 'Technology',
    type: 'Customer',
    tier: 'Enterprise',
    status: 'Active',
    annualRevenue: '$50M',
    employeeCount: 500,
    location: 'San Francisco, CA',
    website: 'www.techcorp.com',
    lastContactDate: '2024-03-15',
    opportunityCount: 5,
    feedbackCount: 42,
    tags: ['cloud', 'saas', 'enterprise'],
    primaryContact: {
      name: 'Sarah Johnson',
      email: 'sarah.j@techcorp.com',
      role: 'CTO'
    }
  },
  {
    id: 'ACC002',
    name: 'Financial Services Ltd',
    industry: 'Finance',
    type: 'Customer',
    tier: 'Enterprise',
    status: 'Active',
    annualRevenue: '$200M',
    employeeCount: 1000,
    location: 'New York, NY',
    website: 'www.financialservices.com',
    lastContactDate: '2024-03-14',
    opportunityCount: 3,
    feedbackCount: 28,
    tags: ['banking', 'fintech'],
    primaryContact: {
      name: 'Michael Chen',
      email: 'michael.c@financialservices.com',
      role: 'VP of Technology'
    }
  },
  {
    id: 'ACC003',
    name: 'HealthCare Systems',
    industry: 'Healthcare',
    type: 'Customer',
    tier: 'Business',
    status: 'Active',
    annualRevenue: '$75M',
    employeeCount: 300,
    location: 'Boston, MA',
    website: 'www.healthcaresystems.com',
    lastContactDate: '2024-03-13',
    opportunityCount: 2,
    feedbackCount: 15,
    tags: ['healthcare', 'medical'],
    primaryContact: {
      name: 'Dr. Emily Wilson',
      email: 'emily.w@healthcaresystems.com',
      role: 'Medical Director'
    }
  },
  {
    id: 'ACC004',
    name: 'Retail Giant Inc',
    industry: 'Retail',
    type: 'Customer',
    tier: 'Enterprise',
    status: 'Active',
    annualRevenue: '$1B',
    employeeCount: 5000,
    location: 'Chicago, IL',
    website: 'www.retailgiant.com',
    lastContactDate: '2024-03-12',
    opportunityCount: 4,
    feedbackCount: 67,
    tags: ['retail', 'ecommerce'],
    primaryContact: {
      name: 'David Lee',
      email: 'david.l@retailgiant.com',
      role: 'CIO'
    }
  },
  {
    id: 'ACC005',
    name: 'Manufacturing Pro',
    industry: 'Manufacturing',
    type: 'Customer',
    tier: 'Business',
    status: 'Active',
    annualRevenue: '$30M',
    employeeCount: 200,
    location: 'Detroit, MI',
    website: 'www.manufacturingpro.com',
    lastContactDate: '2024-03-11',
    opportunityCount: 1,
    feedbackCount: 8,
    tags: ['manufacturing', 'industrial'],
    primaryContact: {
      name: 'Robert Taylor',
      email: 'robert.t@manufacturingpro.com',
      role: 'Operations Manager'
    }
  },
  {
    id: 'ACC006',
    name: 'EduTech Solutions',
    industry: 'Education',
    type: 'Customer',
    tier: 'Startup',
    status: 'Prospect',
    annualRevenue: '$5M',
    employeeCount: 50,
    location: 'Austin, TX',
    website: 'www.edutechsolutions.com',
    lastContactDate: '2024-03-10',
    opportunityCount: 0,
    feedbackCount: 3,
    tags: ['education', 'edtech'],
    primaryContact: {
      name: 'Amanda White',
      email: 'amanda.w@edutechsolutions.com',
      role: 'CEO'
    }
  },
  {
    id: 'ACC007',
    name: 'Legal Partners LLP',
    industry: 'Professional Services',
    type: 'Customer',
    tier: 'Business',
    status: 'Active',
    annualRevenue: '$25M',
    employeeCount: 150,
    location: 'Washington, DC',
    website: 'www.legalpartners.com',
    lastContactDate: '2024-03-09',
    opportunityCount: 2,
    feedbackCount: 12,
    tags: ['legal', 'professional-services'],
    primaryContact: {
      name: 'Kevin O\'Brien',
      email: 'kevin.o@legalpartners.com',
      role: 'Managing Partner'
    }
  },
  {
    id: 'ACC008',
    name: 'Cloud Solutions Inc',
    industry: 'Technology',
    type: 'Partner',
    tier: 'Business',
    status: 'Active',
    annualRevenue: '$40M',
    employeeCount: 250,
    location: 'Seattle, WA',
    website: 'www.cloudsolutions.com',
    lastContactDate: '2024-03-08',
    opportunityCount: 3,
    feedbackCount: 19,
    tags: ['cloud', 'partner'],
    primaryContact: {
      name: 'Jennifer Park',
      email: 'jennifer.p@cloudsolutions.com',
      role: 'Partnership Director'
    }
  },
  {
    id: 'ACC009',
    name: 'Data Insights Co',
    industry: 'Technology',
    type: 'Competitor',
    tier: 'Business',
    status: 'Inactive',
    annualRevenue: '$35M',
    employeeCount: 180,
    location: 'Denver, CO',
    website: 'www.datainsights.com',
    lastContactDate: '2024-02-15',
    opportunityCount: 0,
    feedbackCount: 0,
    tags: ['analytics', 'competitor'],
    primaryContact: {
      name: 'Thomas Brown',
      email: 'thomas.b@datainsights.com',
      role: 'Sales Director'
    }
  },
  {
    id: 'ACC010',
    name: 'Supply Chain Pro',
    industry: 'Manufacturing',
    type: 'Vendor',
    tier: 'Business',
    status: 'Active',
    annualRevenue: '$20M',
    employeeCount: 120,
    location: 'Houston, TX',
    website: 'www.supplychainpro.com',
    lastContactDate: '2024-03-07',
    opportunityCount: 1,
    feedbackCount: 5,
    tags: ['supply-chain', 'vendor'],
    primaryContact: {
      name: 'Lisa Martinez',
      email: 'lisa.m@supplychainpro.com',
      role: 'Procurement Manager'
    }
  }
];

const getStatusColor = (status: AccountStatus) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-900';
    case 'Inactive':
      return 'bg-red-100 text-red-900';
    case 'Prospect':
      return 'bg-yellow-100 text-yellow-900';
  }
};

export default function AccountsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showEnrichDialog, setShowEnrichDialog] = useState(false);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Accounts</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search accounts..."
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
              <DropdownMenuItem className="text-gray-900">Status</DropdownMenuItem>
              <DropdownMenuItem className="text-gray-900">Industry</DropdownMenuItem>
              <DropdownMenuItem className="text-gray-900">Account Type</DropdownMenuItem>
              <DropdownMenuItem className="text-gray-900">Tier</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Account
          </Button>
        </div>
      </div>

      <div className="border rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200">
              <TableHead className="text-gray-950 font-medium">Account Name</TableHead>
              <TableHead className="text-gray-950 font-medium">Industry</TableHead>
              <TableHead className="text-gray-950 font-medium">Type</TableHead>
              <TableHead className="text-gray-950 font-medium">Tier</TableHead>
              <TableHead className="text-gray-950 font-medium">Status</TableHead>
              <TableHead className="text-gray-950 font-medium">Annual Revenue</TableHead>
              <TableHead className="text-gray-950 font-medium">Employee Count</TableHead>
              <TableHead className="text-gray-950 font-medium">Location</TableHead>
              <TableHead className="text-gray-950 font-medium">Last Contact</TableHead>
              <TableHead className="text-gray-950 font-medium">Opportunities</TableHead>
              <TableHead className="text-gray-950 font-medium">Feedback Count</TableHead>
              <TableHead className="text-gray-950 font-medium">Primary Contact</TableHead>
              <TableHead className="text-gray-950 font-medium">Tags</TableHead>
              <TableHead>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-full justify-start gap-2 -ml-3 hover:bg-gray-100">
                      <Plus className="h-4 w-4" />
                      <span className="text-gray-950">Add column</span>
                      <ChevronDown className="h-4 w-4 ml-auto" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setShowEnrichDialog(true)} className="text-gray-900">
                      Enrich with custom functions
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleAccounts.map((account) => (
              <TableRow key={account.id} className="group hover:bg-gray-50 border-b border-gray-200">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-gray-900 font-medium">{account.name}</span>
                    <span className="text-gray-500 text-sm">{account.website}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-900">{account.industry}</TableCell>
                <TableCell className="text-gray-900">{account.type}</TableCell>
                <TableCell className="text-gray-900">{account.tier}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(account.status)}>
                    {account.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-900">{account.annualRevenue}</TableCell>
                <TableCell className="text-gray-900">{account.employeeCount}</TableCell>
                <TableCell className="text-gray-900">{account.location}</TableCell>
                <TableCell className="text-gray-900">{account.lastContactDate}</TableCell>
                <TableCell className="text-gray-900">{account.opportunityCount}</TableCell>
                <TableCell className="text-gray-900">{account.feedbackCount}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-gray-900">{account.primaryContact.name}</span>
                    <span className="text-gray-500 text-sm">{account.primaryContact.role}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {account.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showEnrichDialog} onOpenChange={setShowEnrichDialog}>
        <DialogContent className="sm:max-w-[600px] bg-gray-50">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Add enrichment</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-4">
              <Input placeholder="Search" className="w-full" />
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 text-gray-900">Discover</Button>
                <Button variant="outline" className="flex-1 text-gray-900">Integrations</Button>
                <Button variant="outline" className="flex-1 text-gray-900">Templates</Button>
              </div>
              <div className="space-y-4">
                <div className="border rounded-lg p-4 bg-white">
                  <h3 className="font-medium mb-2 text-gray-900">Company info</h3>
                  <div className="space-y-2">
                    <div className="flex items-center p-2 hover:bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-gray-100 rounded">🏢</div>
                        <span className="text-gray-900">Company Details</span>
                      </div>
                    </div>
                    <div className="flex items-center p-2 hover:bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-gray-100 rounded">📈</div>
                        <span className="text-gray-900">Financial Data</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4 bg-white">
                  <h3 className="font-medium mb-2 text-gray-900">Tools</h3>
                  <div className="space-y-2">
                    <div className="flex items-center p-2 hover:bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-gray-100 rounded">🔍</div>
                        <span className="text-gray-900">Perform Search</span>
                      </div>
                    </div>
                    <div className="flex items-center p-2 hover:bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-gray-100 rounded">🌐</div>
                        <span className="text-gray-900">Scrape Website</span>
                      </div>
                    </div>
                    <div className="flex items-center p-2 hover:bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-gray-100 rounded">🤖</div>
                        <span className="text-gray-900">Use AI</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 