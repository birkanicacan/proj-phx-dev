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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Filter, Plus, Search } from 'lucide-react';

// Types for user data
type UserRole = 'Product Manager' | 'Technical Lead' | 'Operations Manager' | 'IT Director' | 'Data Analyst' | 'Business Analyst' | 'Small Business Owner' | 'Customer Success Manager' | 'Security Engineer' | 'Data Visualization Specialist' | 'Marketing Director';
type AccountTier = 'Enterprise' | 'Business' | 'Startup';
type UserStatus = 'Active' | 'Inactive' | 'Pending';

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  account: {
    id: string;
    name: string;
    tier: AccountTier;
  };
  status: UserStatus;
  lastActive: string;
  feedbackCount: number;
  tags: string[];
  location: string;
  department: string;
  joinDate: string;
}

// Sample data
const sampleUsers: UserRecord[] = [
  {
    id: 'U123',
    name: 'John Doe',
    email: 'john.doe@acmecorp.com',
    role: 'Product Manager',
    account: {
      id: 'ACC456',
      name: 'Acme Corp',
      tier: 'Enterprise'
    },
    status: 'Active',
    lastActive: '2024-03-15',
    feedbackCount: 12,
    tags: ['product', 'leadership'],
    location: 'San Francisco, CA',
    department: 'Product',
    joinDate: '2023-01-15'
  },
  {
    id: 'U456',
    name: 'Jane Smith',
    email: 'jane.smith@techcorp.com',
    role: 'Technical Lead',
    account: {
      id: 'ACC789',
      name: 'TechCorp Solutions',
      tier: 'Enterprise'
    },
    status: 'Active',
    lastActive: '2024-03-14',
    feedbackCount: 8,
    tags: ['technical', 'engineering'],
    location: 'Seattle, WA',
    department: 'Engineering',
    joinDate: '2023-02-20'
  },
  {
    id: 'U789',
    name: 'Alex Brown',
    email: 'alex.brown@startup.com',
    role: 'Operations Manager',
    account: {
      id: 'ACC101',
      name: 'Startup Innovators',
      tier: 'Startup'
    },
    status: 'Active',
    lastActive: '2024-03-13',
    feedbackCount: 5,
    tags: ['operations', 'management'],
    location: 'Austin, TX',
    department: 'Operations',
    joinDate: '2023-03-10'
  },
  {
    id: 'U101',
    name: 'Emily Wilson',
    email: 'emily.wilson@enterprise.com',
    role: 'IT Director',
    account: {
      id: 'ACC202',
      name: 'Enterprise Solutions Inc',
      tier: 'Enterprise'
    },
    status: 'Active',
    lastActive: '2024-03-12',
    feedbackCount: 15,
    tags: ['it', 'security'],
    location: 'Chicago, IL',
    department: 'IT',
    joinDate: '2023-04-05'
  },
  {
    id: 'U202',
    name: 'Michael Chang',
    email: 'michael.chang@datainsights.com',
    role: 'Data Analyst',
    account: {
      id: 'ACC303',
      name: 'Data Insights Co',
      tier: 'Business'
    },
    status: 'Active',
    lastActive: '2024-03-11',
    feedbackCount: 7,
    tags: ['analytics', 'data'],
    location: 'Boston, MA',
    department: 'Analytics',
    joinDate: '2023-05-15'
  },
  {
    id: 'U303',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@financial.com',
    role: 'Business Analyst',
    account: {
      id: 'ACC404',
      name: 'Financial Services Ltd',
      tier: 'Enterprise'
    },
    status: 'Active',
    lastActive: '2024-03-10',
    feedbackCount: 9,
    tags: ['finance', 'analysis'],
    location: 'New York, NY',
    department: 'Finance',
    joinDate: '2023-06-20'
  },
  {
    id: 'U404',
    name: 'David Lee',
    email: 'david.lee@localbusiness.com',
    role: 'Small Business Owner',
    account: {
      id: 'ACC505',
      name: 'Local Business Network',
      tier: 'Startup'
    },
    status: 'Active',
    lastActive: '2024-03-09',
    feedbackCount: 3,
    tags: ['small-business', 'owner'],
    location: 'Portland, OR',
    department: 'Management',
    joinDate: '2023-07-10'
  },
  {
    id: 'U606',
    name: 'Robert Taylor',
    email: 'robert.taylor@customerfirst.com',
    role: 'Customer Success Manager',
    account: {
      id: 'ACC707',
      name: 'Customer First Inc',
      tier: 'Enterprise'
    },
    status: 'Active',
    lastActive: '2024-03-08',
    feedbackCount: 11,
    tags: ['customer-success', 'support'],
    location: 'Atlanta, GA',
    department: 'Customer Success',
    joinDate: '2023-08-15'
  },
  {
    id: 'U707',
    name: 'Amanda White',
    email: 'amanda.white@securesystems.com',
    role: 'Security Engineer',
    account: {
      id: 'ACC808',
      name: 'Secure Systems Corp',
      tier: 'Enterprise'
    },
    status: 'Active',
    lastActive: '2024-03-07',
    feedbackCount: 6,
    tags: ['security', 'engineering'],
    location: 'Washington, DC',
    department: 'Security',
    joinDate: '2023-09-20'
  },
  {
    id: 'U909',
    name: 'Kevin O\'Brien',
    email: 'kevin.obrien@datavis.com',
    role: 'Data Visualization Specialist',
    account: {
      id: 'ACC1010',
      name: 'Data Insights Pro',
      tier: 'Business'
    },
    status: 'Active',
    lastActive: '2024-03-06',
    feedbackCount: 4,
    tags: ['visualization', 'analytics'],
    location: 'Phoenix, AZ',
    department: 'Analytics',
    joinDate: '2023-10-10'
  }
];

const getStatusColor = (status: UserStatus) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-900';
    case 'Inactive':
      return 'bg-red-100 text-red-900';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-900';
  }
};

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search users..."
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
              <DropdownMenuItem className="text-gray-700">Status</DropdownMenuItem>
              <DropdownMenuItem className="text-gray-700">Role</DropdownMenuItem>
              <DropdownMenuItem className="text-gray-700">Account Tier</DropdownMenuItem>
              <DropdownMenuItem className="text-gray-700">Department</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <div className="border rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200">
              <TableHead className="text-gray-900 font-medium">User</TableHead>
              <TableHead className="text-gray-900 font-medium">Role</TableHead>
              <TableHead className="text-gray-900 font-medium">Account</TableHead>
              <TableHead className="text-gray-900 font-medium">Status</TableHead>
              <TableHead className="text-gray-900 font-medium">Last Active</TableHead>
              <TableHead className="text-gray-900 font-medium">Feedback Count</TableHead>
              <TableHead className="text-gray-900 font-medium">Location</TableHead>
              <TableHead className="text-gray-900 font-medium">Department</TableHead>
              <TableHead className="text-gray-900 font-medium">Join Date</TableHead>
              <TableHead className="text-gray-900 font-medium">Tags</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleUsers.map((user) => (
              <TableRow key={user.id} className="group hover:bg-gray-50 border-b border-gray-200">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gray-200 text-gray-700">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-gray-900 font-medium">{user.name}</span>
                      <span className="text-gray-500 text-sm">{user.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-gray-900">{user.role}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-gray-900">{user.account.name}</span>
                    <span className="text-gray-500 text-sm">{user.account.tier}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(user.status)}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-900">{user.lastActive}</TableCell>
                <TableCell className="text-gray-900">{user.feedbackCount}</TableCell>
                <TableCell className="text-gray-900">{user.location}</TableCell>
                <TableCell className="text-gray-900">{user.department}</TableCell>
                <TableCell className="text-gray-900">{user.joinDate}</TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {user.tags.map((tag) => (
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
  );
} 