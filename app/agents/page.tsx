'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AgentTile {
  id: string;
  name: string;
  description: string;
  type: string;
}

const agentTiles: AgentTile[] = [
  {
    id: '1',
    name: 'Quality Monitor',
    description: 'Automatically identify emerging bugs and issues and trigger an alert to your team immediately.',
    type: 'Quality Monitor'
  },
  {
    id: '2',
    name: 'CX Agent Quality Monitor',
    description: 'Monitor customer experience quality metrics and alert on significant deviations or trends.',
    type: 'Quality Monitor'
  },
  {
    id: '3',
    name: 'Feedback from Top Customers Alert',
    description: 'Get instant notifications when high-value customers provide feedback or report issues.',
    type: 'Quality Monitor'
  }
];

export default function AgentsPage() {
  const [activeAgents] = useState<AgentTile[]>([
    {
      id: '4',
      name: 'Complaints by customers',
      description: 'Monitor and track customer complaints across all channels',
      type: 'Quality Monitor'
    },
    {
      id: '5',
      name: 'Quality Monitor -- Wisdom',
      description: 'AI-powered quality monitoring system',
      type: 'Quality Monitor'
    },
    {
      id: '6',
      name: 'Overall Quality Monitor',
      description: 'Comprehensive quality monitoring dashboard',
      type: 'Quality Monitor'
    }
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-950">Agents</h1>
          <p className="text-gray-600 mt-2">
            AI-powered agents designed to automate, optimize, and amplify your team's capabilities. Detect issues faster, take action instantly, and stay ahead effortlessly.
          </p>
        </div>
        <Button className="bg-purple-600 text-white hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          CREATE NEW
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-semibold text-gray-950 mb-4">Create a new Agent</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agentTiles.map((tile) => (
            <div
              key={tile.id}
              className="bg-white p-6 rounded-lg border border-gray-200 hover:border-purple-500 cursor-pointer transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 text-purple-600">🎯</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{tile.name}</h3>
                  <p className="text-gray-600 mt-1">{tile.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-950 mb-4">Active Agents (3)</h2>
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-200 bg-gray-50">
            <div className="text-sm font-medium text-gray-500">Name</div>
            <div className="text-sm font-medium text-gray-500">Created By</div>
            <div className="text-sm font-medium text-gray-500">Last Updated</div>
            <div className="text-sm font-medium text-gray-500">Type</div>
          </div>
          {activeAgents.map((agent) => (
            <div key={agent.id} className="grid grid-cols-4 gap-4 p-4 border-b border-gray-200 last:border-0">
              <div className="text-gray-900">{agent.name}</div>
              <div className="text-gray-900">Vivek Kaushal</div>
              <div className="text-gray-900">Apr 08, 2025</div>
              <div>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {agent.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 