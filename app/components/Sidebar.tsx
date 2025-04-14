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
}

const Section = ({ title, items, isExpanded, onToggle }: SectionProps) => {
  return (
    <div className="mt-4">
      <button
        onClick={onToggle}
        className="flex items-center w-full px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
      >
        {isExpanded ? (
          <ChevronDownIcon className="w-4 h-4 mr-1" />
        ) : (
          <ChevronRightIcon className="w-4 h-4 mr-1" />
        )}
        {title}
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
    pinned: true,
    records: true,
    dashboards: true,
    workflows: true,
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
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Account Selector */}
      <div className="p-4 border-b border-gray-200">
        <button className="flex items-center justify-between w-full px-2 py-1 text-sm font-medium text-gray-700 bg-gray-50 rounded hover:bg-gray-100">
          <span>Account</span>
          <ChevronDownIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <button className="flex items-center w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
          <SearchIcon className="w-5 h-5 mr-2 text-gray-500" />
          Search
        </button>
        <Link href="/home" className="flex items-center w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
          <HomeIcon className="w-5 h-5 mr-2 text-gray-500" />
          Home
        </Link>
        <button className="flex items-center w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
          <InboxIcon className="w-5 h-5 mr-2 text-gray-500" />
          Inbox
        </button>
        <button className="flex items-center w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
          <ChartBarIcon className="w-5 h-5 mr-2 text-gray-500" />
          Analyze
        </button>
        <button className="flex items-center w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
          <UserGroupIcon className="w-5 h-5 mr-2 text-gray-500" />
          Agents
        </button>
        <button className="flex items-center w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
          <AdjustmentsHorizontalIcon className="w-5 h-5 mr-2 text-gray-500" />
          Taxonomy
        </button>
        <button className="flex items-center w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
          <CogIcon className="w-5 h-5 mr-2 text-gray-500" />
          Settings
        </button>

        {/* Collapsible Sections */}
        <Section
          title="Pinned"
          items={[]}
          isExpanded={expandedSections.pinned}
          onToggle={() => toggleSection('pinned')}
        />
        <Section
          title="Records"
          items={recordsItems}
          isExpanded={expandedSections.records}
          onToggle={() => toggleSection('records')}
        />
        <Section
          title="Dashboards"
          items={[]}
          isExpanded={expandedSections.dashboards}
          onToggle={() => toggleSection('dashboards')}
        />
        <Section
          title="Workflows"
          items={[]}
          isExpanded={expandedSections.workflows}
          onToggle={() => toggleSection('workflows')}
        />
      </nav>
    </div>
  );
} 