'use client';

import React, { useState } from 'react';
import { X, Maximize2, Minimize2, ChevronRight, ChevronDown, Plus, Filter, MoreHorizontal } from 'lucide-react';
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
} from './ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface TaxonomyNode {
  id: number;
  name: string;
  level: number;
  parent?: number;
  description?: string;
  feedbackCount: number;
  uniqueUsers: number;
  csatImpact: number;
  themes?: TaxonomyNode[];
  subthemes?: TaxonomyNode[];
}

interface TaxonomyKnowledgePaneProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ThemeItem {
  id: number;
  name: string;
  feedbackCount: number;
  uniqueUsers: number;
  csatImpact: number;
  children?: ThemeItem[];
}

// Mock data based on the image provided
const mockTaxonomyData: TaxonomyNode[] = [
  {
    id: 1,
    name: 'L1: Account Management',
    level: 1,
    feedbackCount: 200,
    uniqueUsers: 156,
    csatImpact: -2.4,
    description: 'All feedback related to account management processes and features.',
    themes: [
      {
        id: 2,
        name: 'L2: User Identity & Authentication',
        level: 2,
        parent: 1,
        feedbackCount: 100,
        uniqueUsers: 78,
        csatImpact: -1.8,
        description: 'Feedback about login, registration, and authentication issues.',
        subthemes: [
          {
            id: 3,
            name: 'L3: Account Creation & Sign Up',
            level: 3,
            parent: 2,
            feedbackCount: 75,
            uniqueUsers: 45,
            csatImpact: -2.1,
            description: 'Issues with creating new accounts and the signup process.'
          },
          {
            id: 4,
            name: 'L3: Login Methods',
            level: 3,
            parent: 2,
            feedbackCount: 25,
            uniqueUsers: 18,
            csatImpact: -1.2,
            description: 'Feedback on various login methods including SSO, social login, etc.'
          }
        ]
      },
      {
        id: 5,
        name: 'L2: Subscription & Plan Management',
        level: 2,
        parent: 1,
        feedbackCount: 100,
        uniqueUsers: 89,
        csatImpact: -2.8,
        description: 'Feedback about subscription plans, billing, and account upgrades.',
        subthemes: [
          {
            id: 51,
            name: 'L3: Plan Types Overview',
            level: 3,
            parent: 5,
            feedbackCount: 90,
            uniqueUsers: 67,
            csatImpact: -2.5,
            description: 'Feedback about understanding different plan types and features.'
          },
          {
            id: 52,
            name: 'L3: Plan Upgrade Process',
            level: 3,
            parent: 5,
            feedbackCount: 10,
            uniqueUsers: 8,
            csatImpact: -3.2,
            description: 'Issues with upgrading or downgrading subscription plans.'
          }
        ]
      }
    ]
  },
  {
    id: 6,
    name: 'L1: Content & Workspace Organization',
    level: 1,
    feedbackCount: 100,
    uniqueUsers: 67,
    csatImpact: -1.5,
    description: 'Feedback about organizing content and workspace management.',
    themes: [
      {
        id: 61,
        name: 'L2: Navigation & Access',
        level: 2,
        parent: 6,
        feedbackCount: 50,
        uniqueUsers: 34,
        csatImpact: -1.8,
        description: 'Feedback about navigating and accessing content within workspaces.',
        subthemes: [
          {
            id: 611,
            name: 'L3: Homepage view',
            level: 3,
            parent: 61,
            feedbackCount: 25,
            uniqueUsers: 18,
            csatImpact: -1.5,
            description: 'Issues with the homepage layout and content visibility.'
          },
          {
            id: 612,
            name: 'L3: Private content search',
            level: 3,
            parent: 61,
            feedbackCount: 25,
            uniqueUsers: 16,
            csatImpact: -2.1,
            description: 'Problems with searching for private or restricted content.'
          }
        ]
      },
      {
        id: 62,
        name: 'L2: Organization tools',
        level: 2,
        parent: 6,
        feedbackCount: 50,
        uniqueUsers: 33,
        csatImpact: -1.2,
        description: 'Feedback about tools for organizing and managing content.',
        subthemes: [
          {
            id: 621,
            name: 'L3: Folder creation & management',
            level: 3,
            parent: 62,
            feedbackCount: 40,
            uniqueUsers: 28,
            csatImpact: -1.0,
            description: 'Issues with creating, organizing, and managing folders.'
          },
          {
            id: 622,
            name: 'L3: Content Copy / Duplicate',
            level: 3,
            parent: 62,
            feedbackCount: 10,
            uniqueUsers: 7,
            csatImpact: -1.8,
            description: 'Problems with copying or duplicating content items.'
          }
        ]
      }
    ]
  },
  {
    id: 7,
    name: 'L1: Core Design Editor',
    level: 1,
    feedbackCount: 50,
    uniqueUsers: 34,
    csatImpact: -0.8,
    description: 'Feedback about the main design editing interface and tools.',
    themes: [
      {
        id: 71,
        name: 'L2: Canvas & Page Management',
        level: 2,
        parent: 7,
        feedbackCount: 25,
        uniqueUsers: 18,
        csatImpact: -1.1,
        description: 'Feedback about managing pages and canvas within the design editor.',
        subthemes: [
          {
            id: 711,
            name: 'L3: Page Creation & Duplication',
            level: 3,
            parent: 71,
            feedbackCount: 15,
            uniqueUsers: 12,
            csatImpact: -0.9,
            description: 'Issues with creating new pages or duplicating existing ones.'
          },
          {
            id: 712,
            name: 'L3: Page Deletion',
            level: 3,
            parent: 71,
            feedbackCount: 10,
            uniqueUsers: 8,
            csatImpact: -1.4,
            description: 'Problems with deleting pages or recovering deleted content.'
          }
        ]
      },
      {
        id: 72,
        name: 'L2: Basic Element Manipulation',
        level: 2,
        parent: 7,
        feedbackCount: 25,
        uniqueUsers: 16,
        csatImpact: -0.5,
        description: 'Feedback about manipulating design elements on the canvas.',
        subthemes: [
          {
            id: 721,
            name: 'L3: Element Addition from Library',
            level: 3,
            parent: 72,
            feedbackCount: 20,
            uniqueUsers: 14,
            csatImpact: -0.3,
            description: 'Issues with adding elements from the design library.'
          },
          {
            id: 722,
            name: 'L3: Element Selection',
            level: 3,
            parent: 72,
            feedbackCount: 5,
            uniqueUsers: 4,
            csatImpact: -1.0,
            description: 'Problems with selecting and manipulating individual elements.'
          }
        ]
      }
    ]
  },
  {
    id: 8,
    name: 'L1: Text & Typography',
    level: 1,
    feedbackCount: 20,
    uniqueUsers: 15,
    csatImpact: -0.3,
    description: 'Feedback about text editing features and typography options.',
    themes: [
      {
        id: 81,
        name: 'L2: Text creation & Basic editing',
        level: 2,
        parent: 8,
        feedbackCount: 12,
        uniqueUsers: 9,
        csatImpact: -0.4,
        description: 'Feedback about creating and performing basic text editing.',
        subthemes: [
          {
            id: 811,
            name: 'L3: Text box insertion',
            level: 3,
            parent: 81,
            feedbackCount: 10,
            uniqueUsers: 8,
            csatImpact: -0.3,
            description: 'Issues with inserting and positioning text boxes.'
          },
          {
            id: 812,
            name: 'L3: Font selection & library',
            level: 3,
            parent: 81,
            feedbackCount: 2,
            uniqueUsers: 2,
            csatImpact: -0.8,
            description: 'Problems with font selection and accessing font library.'
          }
        ]
      },
      {
        id: 82,
        name: 'L2: Text formatting, styling, layout',
        level: 2,
        parent: 8,
        feedbackCount: 8,
        uniqueUsers: 6,
        csatImpact: -0.2,
        description: 'Feedback about advanced text formatting and styling options.',
        subthemes: [
          {
            id: 821,
            name: 'L3: Text Emphasis Styles',
            level: 3,
            parent: 82,
            feedbackCount: 6,
            uniqueUsers: 5,
            csatImpact: -0.1,
            description: 'Issues with applying bold, italic, and other emphasis styles.'
          },
          {
            id: 822,
            name: 'L3: Horizontal Alignment',
            level: 3,
            parent: 82,
            feedbackCount: 2,
            uniqueUsers: 2,
            csatImpact: -0.5,
            description: 'Problems with text alignment and positioning.'
          }
        ]
      }
    ]
  }
];

export default function TaxonomyKnowledgePane({ isOpen, onClose }: TaxonomyKnowledgePaneProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set([1])); // L1: Account Management expanded by default
  const [selectedNode, setSelectedNode] = useState<TaxonomyNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedThemes, setExpandedThemes] = useState<Set<number>>(new Set([1001])); // First theme expanded by default
  const [panelWidth, setPanelWidth] = useState(600); // Default width like FeedbackDetailsPanel
  const [isResizing, setIsResizing] = useState(false);

  // Handle mouse events for resizing - must be defined before useEffect
  const handleMouseMove = React.useCallback((e: MouseEvent) => {
    if (!isResizing) return;
    
    const newWidth = window.innerWidth - e.clientX;
    const minWidth = 400;
    const maxWidth = window.innerWidth * 0.8;
    
    setPanelWidth(Math.max(minWidth, Math.min(maxWidth, newWidth)));
  }, [isResizing]);

  const handleMouseUp = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  // useEffect must be called before any early returns
  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  // Early return after all hooks
  if (!isOpen) return null;

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  };

  const toggleNodeExpansion = (nodeId: number) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const handleNodeClick = (node: TaxonomyNode) => {
    setSelectedNode(node);
  };

  const toggleThemeExpansion = (themeId: number) => {
    const newExpanded = new Set(expandedThemes);
    if (newExpanded.has(themeId)) {
      newExpanded.delete(themeId);
    } else {
      newExpanded.add(themeId);
    }
    setExpandedThemes(newExpanded);
  };

  // Get fake theme data based on selected node
  const getThemesForNode = (node: TaxonomyNode): ThemeItem[] => {
    // Generate different themes based on node level and type
    switch (node.level) {
      case 1: // L1 nodes get high-level themes
        if (node.name.includes('Account Management')) {
          return [
            {
              id: 1001,
              name: 'Overall Satisfaction with Account Management',
              feedbackCount: 20,
              uniqueUsers: 15,
              csatImpact: -2.1,
              children: [
                { id: 1002, name: 'Lorem Ipsum', feedbackCount: 12, uniqueUsers: 8, csatImpact: -1.8 },
                { id: 1003, name: 'Dolor Ipsum', feedbackCount: 8, uniqueUsers: 7, csatImpact: -2.4 }
              ]
            },
            {
              id: 1004,
              name: 'Dolor Ipsum',
              feedbackCount: 20,
              uniqueUsers: 14,
              csatImpact: -1.5,
              children: [
                { id: 1005, name: 'Ipsum Ipsum', feedbackCount: 15, uniqueUsers: 10, csatImpact: -1.2 },
                { id: 1006, name: 'Lorem Ipsum', feedbackCount: 5, uniqueUsers: 4, csatImpact: -2.1 }
              ]
            },
            {
              id: 1007,
              name: 'Lorem Ipsum',
              feedbackCount: 20,
              uniqueUsers: 12,
              csatImpact: -0.8,
              children: [
                { id: 1008, name: 'Lorem Ipsum', feedbackCount: 18, uniqueUsers: 11, csatImpact: -0.6 },
                { id: 1009, name: 'Lorem Ipsum', feedbackCount: 2, uniqueUsers: 1, csatImpact: -2.5 }
              ]
            }
          ];
        } else if (node.name.includes('Content & Workspace')) {
          return [
            {
              id: 2001,
              name: 'Content Discovery Issues',
              feedbackCount: 15,
              uniqueUsers: 12,
              csatImpact: -1.8,
              children: [
                { id: 2002, name: 'Search Functionality', feedbackCount: 10, uniqueUsers: 8, csatImpact: -2.1 },
                { id: 2003, name: 'Content Visibility', feedbackCount: 5, uniqueUsers: 4, csatImpact: -1.2 }
              ]
            },
            {
              id: 2004,
              name: 'Workspace Organization',
              feedbackCount: 12,
              uniqueUsers: 9,
              csatImpact: -1.3,
              children: [
                { id: 2005, name: 'Folder Structure', feedbackCount: 8, uniqueUsers: 6, csatImpact: -1.1 },
                { id: 2006, name: 'Content Categorization', feedbackCount: 4, uniqueUsers: 3, csatImpact: -1.8 }
              ]
            }
          ];
        }
        break;
      case 2: // L2 nodes get more specific themes
        return [
          {
            id: 3001,
            name: 'User Experience Pain Points',
            feedbackCount: 8,
            uniqueUsers: 6,
            csatImpact: -1.5,
            children: [
              { id: 3002, name: 'Navigation Confusion', feedbackCount: 5, uniqueUsers: 4, csatImpact: -1.8 },
              { id: 3003, name: 'Interface Complexity', feedbackCount: 3, uniqueUsers: 2, csatImpact: -1.0 }
            ]
          },
          {
            id: 3004,
            name: 'Feature Requests',
            feedbackCount: 6,
            uniqueUsers: 5,
            csatImpact: 0.2,
            children: [
              { id: 3005, name: 'Automation Requests', feedbackCount: 4, uniqueUsers: 3, csatImpact: 0.5 },
              { id: 3006, name: 'Integration Needs', feedbackCount: 2, uniqueUsers: 2, csatImpact: -0.3 }
            ]
          }
        ];
      case 3: // L3 nodes get very specific themes
        return [
          {
            id: 4001,
            name: 'Specific Implementation Issues',
            feedbackCount: 4,
            uniqueUsers: 3,
            csatImpact: -2.0,
            children: [
              { id: 4002, name: 'Technical Errors', feedbackCount: 2, uniqueUsers: 2, csatImpact: -3.0 },
              { id: 4003, name: 'Performance Issues', feedbackCount: 2, uniqueUsers: 1, csatImpact: -1.0 }
            ]
          }
        ];
    }
    
    // Default themes
    return [
      {
        id: 5001,
        name: 'General Feedback Themes',
        feedbackCount: 5,
        uniqueUsers: 4,
        csatImpact: -1.0,
        children: [
          { id: 5002, name: 'Usability Concerns', feedbackCount: 3, uniqueUsers: 2, csatImpact: -1.2 },
          { id: 5003, name: 'Feature Suggestions', feedbackCount: 2, uniqueUsers: 2, csatImpact: -0.8 }
        ]
      }
    ];
  };

  const getCsatColor = (impact: number) => {
    if (impact >= 0) return 'text-green-600';
    if (impact >= -1) return 'text-yellow-600';
    if (impact >= -2) return 'text-orange-600';
    return 'text-red-600';
  };

  const renderThemeRows = (themes: ThemeItem[], level: number = 0): React.JSX.Element[] => {
    const rows: React.JSX.Element[] = [];

    themes.forEach((theme) => {
      const isExpanded = expandedThemes.has(theme.id);
      const hasChildren = theme.children && theme.children.length > 0;

      rows.push(
        <div 
          key={theme.id} 
          className="px-3 py-2 hover:bg-gray-50 cursor-pointer grid grid-cols-4 gap-4 items-center"
          style={{ paddingLeft: `${12 + level * 16}px` }}
        >
          <div className="flex items-center gap-2">
            {hasChildren ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleThemeExpansion(theme.id);
                }}
                className="p-0.5 hover:bg-gray-200 rounded"
              >
                {isExpanded ? (
                  <ChevronDown className="w-3 h-3 text-gray-600" />
                ) : (
                  <ChevronRight className="w-3 h-3 text-gray-600" />
                )}
              </button>
            ) : (
              <div className="w-4" />
            )}
            <span className="text-sm text-gray-900">{theme.name}</span>
          </div>
          <span className="text-sm text-gray-700 text-center">{theme.feedbackCount}</span>
          <span className="text-sm text-gray-700 text-center">{theme.uniqueUsers}</span>
          <span className={`text-sm font-medium text-center ${getCsatColor(theme.csatImpact)}`}>
            {theme.csatImpact > 0 ? '+' : ''}{theme.csatImpact}
          </span>
        </div>
      );

      // Add child rows if expanded
      if (isExpanded && hasChildren) {
        const childRows = renderThemeRows(theme.children!, level + 1);
        rows.push(...childRows);
      }
    });

    return rows;
  };

  const renderTaxonomyRows = (nodes: TaxonomyNode[], level: number = 1): React.JSX.Element[] => {
    const rows: React.JSX.Element[] = [];

    nodes.forEach((node) => {
      const isExpanded = expandedNodes.has(node.id);
      const hasChildren = (node.themes && node.themes.length > 0) || (node.subthemes && node.subthemes.length > 0);

      rows.push(
        <TableRow 
          key={node.id} 
          className="hover:bg-gray-50 border-b border-gray-200 cursor-pointer"
          onClick={() => handleNodeClick(node)}
        >
          <TableCell className="font-medium text-gray-900">
            <div 
              className="flex items-center gap-2"
              style={{ paddingLeft: `${(level - 1) * 24}px` }}
            >
              {hasChildren && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleNodeExpansion(node.id);
                  }}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              )}
              {!hasChildren && <div className="w-6" />}
              <span className={level === 1 ? 'font-semibold' : level === 2 ? 'font-medium' : ''}>{node.name}</span>
            </div>
          </TableCell>
          <TableCell className="text-center text-gray-900">{node.feedbackCount}</TableCell>
          <TableCell className="text-center text-gray-900">{node.uniqueUsers}</TableCell>
          <TableCell className={`text-center font-medium ${getCsatColor(node.csatImpact)}`}>
            {node.csatImpact > 0 ? '+' : ''}{node.csatImpact}
          </TableCell>
          <TableCell className="text-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>View Feedback</DropdownMenuItem>
                <DropdownMenuItem>Export Data</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      );

      // Add child rows if expanded
      if (isExpanded && hasChildren) {
        // Render themes (L2) children
        if (node.themes && node.themes.length > 0) {
          const childRows = renderTaxonomyRows(node.themes, level + 1);
          rows.push(...childRows);
        }
        
        // Render subthemes (L3) children
        if (node.subthemes && node.subthemes.length > 0) {
          const subthemeRows = renderTaxonomyRows(node.subthemes, level + 1);
          rows.push(...subthemeRows);
        }
      }
    });

    return rows;
  };

  return (
    <>
      <div className={`
        fixed bg-white border-t border-gray-200 shadow-lg transition-all duration-300 ease-in-out z-50
        ${isFullScreen 
          ? 'inset-0 left-56' 
          : 'bottom-0 left-56 right-0 h-[55vh] min-h-[400px]'
        }
      `}>
        {/* Main Content */}
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-900">Taxonomy Explorer</h2>
              <Badge variant="outline" className="text-gray-700">
                Hierarchical View
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Input
                  placeholder="Search taxonomy..."
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
                  <DropdownMenuItem className="text-gray-700">By Level</DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-700">By Feedback Count</DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-700">By CSAT Impact</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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

          {/* Table Content */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-white z-10">
                  <TableRow className="border-b border-gray-200">
                    <TableHead className="text-gray-900 font-medium w-[40%]">Name</TableHead>
                    <TableHead className="text-gray-900 font-medium text-center"># of Feedback</TableHead>
                    <TableHead className="text-gray-900 font-medium text-center">Unique Users</TableHead>
                    <TableHead className="text-gray-900 font-medium text-center">CSAT Impact</TableHead>
                    <TableHead className="text-gray-900 font-medium text-center w-[60px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {renderTaxonomyRows(mockTaxonomyData)}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

      {/* Right Panel for Node Details - Overlay */}
      {selectedNode && (
        <div 
          className="fixed inset-y-0 right-0 bg-white shadow-xl border-l border-gray-200 overflow-y-auto z-50"
          style={{ width: panelWidth }}
        >
          {/* Resize Handle */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1 bg-gray-300 hover:bg-gray-400 cursor-col-resize"
            onMouseDown={handleMouseDown}
          />
          
          <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">{selectedNode.name}</h2>
              <Button variant="ghost" size="icon" onClick={() => setSelectedNode(null)}>
                <X className="h-5 w-5 text-gray-500" />
              </Button>
            </div>
          </div>
          
          <div className="px-6 py-4">
            <div className="space-y-6">

              {/* Scorecards - Grid layout like FeedbackDetailsPanel */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500"># of Feedback</label>
                  <div className="mt-1 text-xl font-semibold text-gray-900">{selectedNode.feedbackCount}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500"># CSAT Impact</label>
                  <div className="mt-1 text-gray-900">{selectedNode.csatImpact}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500"># Parent Item</label>
                  <div className="mt-1 text-gray-900">
                    {selectedNode.parent ? `ID: ${selectedNode.parent}` : 'None'}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500"># Sub-item</label>
                  <div className="mt-1 text-gray-900">
                    {(selectedNode.themes?.length || 0) + (selectedNode.subthemes?.length || 0)}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500"># Unique Users</label>
                  <div className="mt-1 text-gray-900">{selectedNode.uniqueUsers}</div>
                </div>
              </div>

              {/* Description - Matching FeedbackDetailsPanel styling */}
              <div>
                <label className="text-sm font-medium text-gray-500">Description</label>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-900 leading-relaxed">{selectedNode.description}</p>
                </div>
              </div>

              {/* Themes Section */}
              <div>
                <label className="text-sm font-medium text-gray-500">Themes</label>
                
                <div className="bg-white rounded-lg border">
                  <div className="px-3 py-2 border-b border-gray-200 bg-gray-50">
                    <div className="grid grid-cols-4 gap-4 text-xs font-medium text-gray-700">
                      <span>Name</span>
                      <span className="text-center"># of Feedback</span>
                      <span className="text-center">Unique Users</span>
                      <span className="text-center">CSAT Impact</span>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {renderThemeRows(getThemesForNode(selectedNode))}
                  </div>
                </div>
              </div>

              {/* Actions Section - Moved to bottom */}
              <div className="pt-4 border-t border-gray-200">
                <label className="text-sm font-medium text-gray-500">Actions</label>
                <div className="mt-2 space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start text-gray-800 border-gray-300 hover:bg-gray-100">
                    Edit node
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start text-gray-800 border-gray-300 hover:bg-gray-100">
                    Promote node
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start text-gray-800 border-gray-300 hover:bg-gray-100">
                    Demote node
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start text-gray-800 border-gray-300 hover:bg-gray-100">
                    Split node
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start text-gray-800 border-gray-300 hover:bg-gray-100">
                    Merge node
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start text-red-700 border-red-300 hover:bg-red-50">
                    Delete node
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
} 