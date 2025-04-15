'use client';

import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { 
  ChartBarIcon, 
  ArrowTrendingUpIcon, 
  ChevronDownIcon, 
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
    },
  },
};

const data = {
  labels: [
    'Issue With Dependencies Column',
    'Issue With Platform Performance',
    'Issue With Limitations Of The Tool',
    'Ability To Visualize Dependencies',
    'Suggestion For Resource Allocation Improvement',
    'Issue With App Performance',
    'Issue With Project Management On Monday.Com',
    'Ability To Streamline Processes',
    'Suggestion To Enhance Project Management Features',
    'Ability To Enhance Workflows',
  ],
  datasets: [
    {
      data: [471704, 345608, 312000, 312000, 312000, 212560, 211224, 201520, 197441, 178120],
      backgroundColor: [
        'rgb(59, 130, 246)', // blue-500
        'rgb(16, 185, 129)', // green-500
        'rgb(236, 72, 153)', // pink-500
        'rgb(245, 158, 11)', // amber-500
        'rgb(249, 115, 22)', // orange-500
        'rgb(107, 114, 128)', // gray-500
        'rgb(168, 85, 247)', // purple-500
        'rgb(59, 130, 246)', // blue-500
        'rgb(16, 185, 129)', // green-500
        'rgb(120, 53, 15)', // brown-500
      ],
      borderRadius: 4,
    },
  ],
};

export default function InsightsFromExpansion() {
  const [chartType, setChartType] = useState<'BAR' | 'TREND'>('BAR');

  return (
    <div>
      <div className="mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Quantify</span>
          <span>•</span>
          <span>Yael Mittelman</span>
          <span>•</span>
          <span>13 hours ago</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Insights from Expansion</h1>
      </div>
      
      <div className="flex-1 flex">
        {/* Left Configuration Panel */}
        <div className="w-80 border-r border-gray-200 bg-white p-4 flex flex-col">
          <div className="space-y-6">
            {/* Plot Section */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                <ChartBarIcon className="h-4 w-4 mr-2" />
                Plot
              </h3>
              <div className="relative">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md flex items-center justify-between">
                  <span>Reason</span>
                  <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Breakdown By Section */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">BREAKDOWN BY</h3>
            </div>

            {/* Filter Section */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Filter</h3>
              <div className="space-y-2">
                <div className="border border-gray-200 rounded-md p-3">
                  <div className="text-sm text-gray-600 mb-2">Source</div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm">Gong</span>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-md p-3">
                  <div className="text-sm text-gray-600 mb-2">Category</div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm">Complaint</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm">Improvement</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm">Help</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Duration Section */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Duration</h3>
              <div className="flex flex-wrap gap-1 text-sm">
                {['7D', '14D', '4W', '3M', '6M', '12M'].map((duration) => (
                  <button
                    key={duration}
                    className={`px-3 py-1 rounded ${
                      duration === '12M'
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {duration}
                  </button>
                ))}
                <button className="px-3 py-1 rounded text-gray-600 hover:bg-gray-100 border border-gray-200">
                  CUSTOM
                </button>
              </div>
            </div>

            {/* Measured As Section */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Measured as</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md flex items-center justify-between">
                  <span>Sum</span>
                  <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-md flex items-center justify-between">
                  <span>Salesforce Opportunity - arr value c</span>
                  <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Chart Panel */}
        <div className="flex-1 p-6">
          <div className="mb-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing 10 selected Reasons
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-1">
                <button
                  onClick={() => setChartType('BAR')}
                  className={`px-3 py-1 text-sm rounded-full flex items-center space-x-1 ${
                    chartType === 'BAR'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  BAR
                </button>
                <button
                  onClick={() => setChartType('TREND')}
                  className={`px-3 py-1 text-sm rounded-full flex items-center space-x-1 ${
                    chartType === 'TREND'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  TREND + ANOMALIES
                </button>
              </div>
              <div className="text-sm">
                <span className="text-gray-600">89 feedback records match the filter:</span>
                <button className="ml-2 text-purple-600 hover:text-purple-700">SEE ALL</button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="h-[500px]">
              <Bar options={options} data={data} />
            </div>
          </div>

          {/* Table Section */}
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded text-purple-600" />
                  <span className="text-sm font-medium">Reason</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Sum (Salesforce Opportunity - arr value c)</span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-2">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              {/* Table Content */}
              <div className="mt-2">
                {data.labels.map((label, index) => {
                  const isIssue = label.toLowerCase().startsWith('issue');
                  const value = data.datasets[0].data[index];
                  const formattedValue = value >= 1000 
                    ? `${(value / 1000).toFixed(3)}K`
                    : value.toString();
                    
                  return (
                    <div 
                      key={label}
                      className="flex items-center justify-between py-2 px-3 hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <input type="checkbox" className="rounded text-purple-600" />
                        {isIssue ? (
                          <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />
                        ) : (
                          <SparklesIcon className="h-4 w-4 text-amber-500" />
                        )}
                        <span className="text-sm text-gray-900">{label}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-900">{formattedValue}</span>
                        <button className="text-gray-400 hover:text-gray-600">
                          <EllipsisHorizontalIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Table Footer */}
              <div className="mt-2 px-3 py-2 border-t border-gray-200 text-sm text-gray-600">
                Selected 10 of 872 Reasons
                <button className="ml-2 text-purple-600 hover:text-purple-700">
                  RESET TO TOP VALUES
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 