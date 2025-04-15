'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  StarIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

interface SectionProps {
  title: string;
  items: {
    name: string;
    icon: React.ComponentType<any>;
    href?: string;
    items?: {
      name: string;
      icon: React.ComponentType<any>;
      href?: string;
    }[];
  }[];
  isExpanded: boolean;
  onToggle: () => void;
  showCreateButton?: boolean;
}

const Section = ({ title, items, isExpanded, onToggle, showCreateButton = false }: SectionProps) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const router = useRouter();

  const toggleItem = (itemName: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const handleLinkClick = (e: React.MouseEvent, itemName: string, href?: string) => {
    // Prevent Records section from collapsing when clicking Feedback or Users
    if (title === 'Records' && (itemName === 'Feedback' || itemName === 'Users')) {
      e.preventDefault();
      if (href) {
        router.push(href);
      }
    }
    // Prevent event propagation for all sections to avoid collapsing when clicking items
    e.stopPropagation();
  };

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
            <div key={item.name}>
              {item.items ? (
                <button
                  onClick={() => toggleItem(item.name)}
                  className="flex items-center w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                >
                  <div className="flex items-center">
                    {expandedItems[item.name] ? (
                      <ChevronDownIcon className="w-4 h-4 mr-2" />
                    ) : (
                      <ChevronRightIcon className="w-4 h-4 mr-2" />
                    )}
                    <item.icon className="w-5 h-5 mr-1 text-gray-500" />
                    {item.name}
                  </div>
                </button>
              ) : item.href ? (
                <Link
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.name, item.href)}
                  className="flex items-center w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                >
                  <item.icon className="w-5 h-5 mr-2 text-gray-500" />
                  {item.name}
                </Link>
              ) : (
                <button
                  className="flex items-center w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                >
                  <item.icon className="w-5 h-5 mr-2 text-gray-500" />
                  {item.name}
                </button>
              )}
              {item.items && expandedItems[item.name] && (
                <div className="ml-4 mt-1">
                  {item.items.map((subItem) => (
                    subItem.href ? (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="flex items-center w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                      >
                        <subItem.icon className="w-5 h-5 mr-2 text-gray-500" />
                        {subItem.name}
                      </Link>
                    ) : (
                      <button
                        key={subItem.name}
                        className="flex items-center w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                      >
                        <subItem.icon className="w-5 h-5 mr-2 text-gray-500" />
                        {subItem.name}
                      </button>
                    )
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Sidebar() {
  const [expandedSections, setExpandedSections] = useState<{
    pinned: boolean;
    records: boolean;
    dashboards: boolean;
    workflows: boolean;
  }>(() => {
    // Initialize state from localStorage if available
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('sidebarExpandedSections');
      return savedState ? JSON.parse(savedState) : {
        pinned: false,
        records: false,
        dashboards: false,
        workflows: false,
      };
    }
    return {
      pinned: false,
      records: false,
      dashboards: false,
      workflows: false,
    };
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev: typeof expandedSections) => {
      const newState = {
        ...prev,
        [section]: !prev[section],
      };
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('sidebarExpandedSections', JSON.stringify(newState));
      }
      return newState;
    });
  };

  const recordsItems = [
    { name: 'Feedback', icon: DocumentTextIcon, href: '/feedback' },
    { name: 'Users', icon: UserIcon, href: '/users' },
    { name: 'Accounts', icon: BuildingOfficeIcon, href: '/accounts' },
    { name: 'Opportunities', icon: ChartBarIcon },
    { name: 'Stores', icon: ShoppingBagIcon },
    { name: 'Products', icon: TagIcon },
  ];

  return (
    <div className="w-56 h-screen bg-white border-r border-gray-200 flex flex-col overflow-y-auto scrollbar-hide no-scrollbar">
      {/* Account Selector */}
      <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
        <button className="flex items-center justify-between w-full px-2 py-1 text-sm font-medium text-gray-900 bg-gray-50 rounded hover:bg-gray-100">
          <span>Account</span>
          <ChevronDownIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-0 bg-white">
        <Link href="/search" className="flex items-center w-full px-2 py-1 text-sm text-gray-900 hover:bg-gray-100 rounded">
          <SearchIcon className="w-5 h-5 mr-2 text-gray-700" />
          Search
        </Link>
        <Link href="/home" className="flex items-center w-full px-2 py-1 text-sm text-gray-900 hover:bg-gray-100 rounded">
          <HomeIcon className="w-5 h-5 mr-2 text-gray-700" />
          Home
        </Link>
        <Link href="/inbox" className="flex items-center w-full px-2 py-1 text-sm text-gray-900 hover:bg-gray-100 rounded">
          <InboxIcon className="w-5 h-5 mr-2 text-gray-700" />
          Inbox
        </Link>
        <Link
          href="/analyze"
          className="flex items-center w-full px-2 py-1 text-sm text-gray-900 hover:bg-gray-100 rounded"
        >
          <ChartBarIcon className="w-5 h-5 mr-2 text-gray-700" />
          Analyze
        </Link>
        <Link
          href="/agents"
          className="flex items-center w-full px-2 py-1 text-sm text-gray-900 hover:bg-gray-100 rounded"
        >
          <UserGroupIcon className="w-5 h-5 mr-2 text-gray-700" />
          Agents
        </Link>
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
              { name: 'Win/Loss Analysis Q1\'25', icon: ChartBarIcon, href: '/dashboard/win-loss-q1-25' },
              { name: 'Insights from expansion', icon: ArrowTrendingUpIcon, href: '/analyze/insights-from-expansion' }
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
          items={[
            { 
              name: 'Win/Loss Analysis',
              icon: ChartBarIcon,
              items: [
                { name: 'Win/Loss Dashboard', icon: ChartBarIcon, href: '/workflows/win-loss-dashboard' },
                { name: 'Won Deals Agent', icon: CurrencyDollarIcon, href: '/workflows/won-deals-agent' },
                { name: 'Lost Deals Agent', icon: ExclamationTriangleIcon, href: '/workflows/lost-deals-agent' },
                { name: 'VIP Accounts List', icon: StarIcon, href: '/workflows/vip-accounts' },
                { name: 'At Risk Accounts', icon: ExclamationTriangleIcon, href: '/workflows/at-risk-accounts' },
              ]
            }
          ]}
          isExpanded={expandedSections.workflows}
          onToggle={() => toggleSection('workflows')}
          showCreateButton={true}
        />
      </nav>
    </div>
  );
} 