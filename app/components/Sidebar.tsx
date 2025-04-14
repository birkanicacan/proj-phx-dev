'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  HomeIcon,
  InboxIcon,
  MagnifyingGlassIcon as SearchIcon,
  ChartBarIcon,
  UserGroupIcon,
  AdjustmentsHorizontalIcon,
  Cog6ToothIcon as CogIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  UserIcon,
  BuildingOfficeIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  TagIcon,
  DocumentTextIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

interface SectionProps {
  title: string;
  items: {
    name: string;
    icon: React.ComponentType<any>;
    href?: string;
  }[];
  isExpanded: boolean;
  onToggle: () => void;
  showCreateButton?: boolean;
}

const Section = ({ title, items, isExpanded, onToggle, showCreateButton = false }: SectionProps) => {
  return (
    <div className="mt-4">
      <button
        onClick={onToggle}
        className="group flex items-center justify-between w-full px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
      >
        <div className="flex items-center">
          {isExpanded ? (
            <ChevronDownIcon className="w-4 h-4 mr-1" />
          ) : (
            <ChevronRightIcon className="w-4 h-4 mr-1" />
          )}
          {title}
        </div>
        {showCreateButton && (
          <PlusIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </button>
      {isExpanded && (
        <div className="ml-4 mt-1">
          {items.map((item) => (
            item.href ? (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              >
                <item.icon className="w-5 h-5 mr-2 text-gray-500" />
                {item.name}
              </Link>
            ) : (
              <button
                key={item.name}
                className="flex items-center w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              >
                <item.icon className="w-5 h-5 mr-2 text-gray-500" />
                {item.name}
              </button>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default function Sidebar() {
  const [expandedSections, setExpandedSections] = useState({
    pinned: false,
    records: false,
    dashboards: false,
    workflows: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const recordsItems = [
    { name: 'Feedback', icon: DocumentTextIcon, href: '/feedback' },
    { name: 'Users', icon: UserIcon, href: '/users' },
    { name: 'Accounts', icon: BuildingOfficeIcon },
    { name: 'Opportunities', icon: ChartBarIcon },
    { name: 'Stores', icon: ShoppingBagIcon },
    { name: 'Products', icon: TagIcon },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col overflow-y-auto scrollbar-hide no-scrollbar">
      {/* Account Selector */}
      <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
        <button className="flex items-center justify-between w-full px-2 py-1 text-sm font-medium text-gray-900 bg-gray-50 rounded hover:bg-gray-100">
          <span>Account</span>
          <ChevronDownIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-0 bg-white">
        <button className="flex items-center w-full px-2 py-1 text-sm text-gray-900 hover:bg-gray-100 rounded">
          <SearchIcon className="w-5 h-5 mr-2 text-gray-700" />
          Search
        </button>
        <Link href="/home" className="flex items-center w-full px-2 py-1 text-sm text-gray-900 hover:bg-gray-100 rounded">
          <HomeIcon className="w-5 h-5 mr-2 text-gray-700" />
          Home
        </Link>
        <button className="flex items-center w-full px-2 py-1 text-sm text-gray-900 hover:bg-gray-100 rounded">
          <InboxIcon className="w-5 h-5 mr-2 text-gray-700" />
          Inbox
        </button>
        <Link
          href="/analyze"
          className="flex items-center w-full px-2 py-1 text-sm text-gray-900 hover:bg-gray-100 rounded"
        >
          <ChartBarIcon className="w-5 h-5 mr-2 text-gray-700" />
          Analyze
        </Link>
        <button className="flex items-center w-full px-2 py-1 text-sm text-gray-900 hover:bg-gray-100 rounded">
          <UserGroupIcon className="w-5 h-5 mr-2 text-gray-700" />
          Agents
        </button>
        <Link
          href="/taxonomy"
          className="flex items-center w-full px-2 py-1 text-sm text-gray-900 hover:bg-gray-100 rounded"
        >
          <AdjustmentsHorizontalIcon className="w-5 h-5 mr-2 text-gray-700" />
          Taxonomy
        </Link>
        <button className="flex items-center w-full px-2 py-1 text-sm text-gray-900 hover:bg-gray-100 rounded">
          <CogIcon className="w-5 h-5 mr-2 text-gray-700" />
          Settings
        </button>

        {/* Collapsible Sections */}
        <div className="mt-4 space-y-1">
          <Section
            title="Pinned"
            items={[
              { name: 'Win/Loss Analysis Q1\'25', icon: ChartBarIcon, href: '/dashboard/win-loss-q1-25' }
            ]}
            isExpanded={expandedSections.pinned}
            onToggle={() => toggleSection('pinned')}
          />
          <Section
            title="Records"
            items={recordsItems}
            isExpanded={expandedSections.records}
            onToggle={() => toggleSection('records')}
            showCreateButton={true}
          />
        </div>
        <Section
          title="Dashboards"
          items={[
            { name: 'Win/Loss Analysis Q1\'25', icon: ChartBarIcon, href: '/dashboard/win-loss-q1-25' },
            { name: 'Sales Performance Dashboard', icon: ChartBarIcon, href: '/dashboard/sales-performance' },
            { name: 'Product Analytics Overview', icon: ChartBarIcon, href: '/dashboard/product-analytics' },
            { name: 'Marketing Campaign ROI', icon: ChartBarIcon, href: '/dashboard/marketing-roi' },
            { name: 'Customer Success Metrics', icon: ChartBarIcon, href: '/dashboard/customer-success' },
            { name: 'Revenue Growth Tracker', icon: ChartBarIcon, href: '/dashboard/revenue-growth' },
            { name: 'Market Share Analysis', icon: ChartBarIcon, href: '/dashboard/market-share' },
            { name: 'Competitive Intelligence', icon: ChartBarIcon, href: '/dashboard/competitive-intel' }
          ]}
          isExpanded={expandedSections.dashboards}
          onToggle={() => toggleSection('dashboards')}
          showCreateButton={true}
        />
        <Section
          title="Workflows"
          items={[]}
          isExpanded={expandedSections.workflows}
          onToggle={() => toggleSection('workflows')}
          showCreateButton={true}
        />
      </nav>
    </div>
  );
} 