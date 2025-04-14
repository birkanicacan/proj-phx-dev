'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import IntegrationDialog from '../components/IntegrationDialog';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import { Pie, Line, Bar } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { SparklesIcon, ExclamationTriangleIcon, ChatBubbleBottomCenterTextIcon, PlusIcon, QueueListIcon } from '@heroicons/react/24/outline';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

// Sample data - replace with real data from your API
const feedbackSourcesData = {
  labels: ['Zendesk', 'Intercom', 'Email', 'Slack'],
  datasets: [
    {
      data: [300, 200, 150, 100],
      backgroundColor: [
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 99, 132, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(255, 206, 86, 0.8)',
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const timeSeriesOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
  scales: {
    x: {
      type: 'time' as const,
      time: {
        unit: 'month' as const,
        displayFormats: {
          month: 'MMM yyyy'
        }
      },
      title: {
        display: true,
        text: 'Date'
      }
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Count'
      }
    },
  },
};

// Generate dates for the last 6 months
const generateDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 5; i >= 0; i--) {
    const date = new Date(today);
    date.setMonth(date.getMonth() - i);
    dates.push(date);
  }
  return dates;
};

const dates = generateDates();

const feedbackVolumeData = {
  labels: dates,
  datasets: [
    {
      label: 'Zendesk',
      data: dates.map((date, index) => ({
        x: date,
        y: Math.floor(Math.random() * 100) + 50
      })),
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      tension: 0.4,
      fill: false
    },
    {
      label: 'Intercom',
      data: dates.map((date, index) => ({
        x: date,
        y: Math.floor(Math.random() * 80) + 30
      })),
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      tension: 0.4,
      fill: false
    },
  ],
};

const csatData = {
  labels: dates,
  datasets: [
    {
      label: 'CSAT Score',
      data: dates.map((date, index) => ({
        x: date,
        y: (Math.random() * 0.5) + 4.5
      })),
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.4,
      fill: false
    },
  ],
};

const npsData = {
  labels: dates,
  datasets: [
    {
      label: 'NPS Score',
      data: dates.map((date, index) => ({
        x: date,
        y: Math.floor(Math.random() * 20) + 50
      })),
      borderColor: 'rgba(153, 102, 255, 1)',
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      tension: 0.4,
      fill: false
    },
  ],
};

const barChartOptions = {
  indexAxis: 'y' as const,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Number of Reports'
      }
    },
    y: {
      grid: {
        display: false
      }
    }
  }
};

// Sort data by value in descending order
const sortData = (labels: string[], data: number[]) => {
  const combined = labels.map((label, index) => ({
    label,
    value: data[index]
  }));
  combined.sort((a, b) => b.value - a.value);
  return {
    labels: combined.map(item => item.label),
    data: combined.map(item => item.value)
  };
};

const topIssuesData = {
  labels: ['Slow Performance', 'Bug Reports', 'UI Issues', 'Feature Requests', 'Integration Problems'],
  datasets: [
    {
      label: 'Number of Reports',
      data: [65, 59, 80, 81, 56],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};

const topRequestsData = {
  labels: ['New Feature A', 'Integration B', 'UI Enhancement', 'API Update', 'Mobile App'],
  datasets: [
    {
      label: 'Number of Requests',
      data: [85, 79, 90, 81, 76],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ],
};

// Sort the data
const sortedIssues = sortData(topIssuesData.labels, topIssuesData.datasets[0].data);
const sortedRequests = sortData(topRequestsData.labels, topRequestsData.datasets[0].data);

// Update the chart data with sorted values
topIssuesData.labels = sortedIssues.labels;
topIssuesData.datasets[0].data = sortedIssues.data;

topRequestsData.labels = sortedRequests.labels;
topRequestsData.datasets[0].data = sortedRequests.data;

export default function HomePage() {
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [showIntegrationDialog, setShowIntegrationDialog] = useState(false);
  const [enabledIntegrations, setEnabledIntegrations] = useState<string[]>([]);
  const [isStep1Collapsed, setIsStep1Collapsed] = useState(false);
  const [wisdomQuery, setWisdomQuery] = useState('');

  useEffect(() => {
    // For testing, let's always show the section
    setIsFirstVisit(true);
    
    // Get selected tools from localStorage
    const storedTools = localStorage.getItem('selectedTools');
    if (storedTools) {
      try {
        const parsedTools = JSON.parse(storedTools);
        setSelectedTools(parsedTools);
      } catch (e) {
        console.error('Error parsing stored tools:', e);
      }
    }

    // Get enabled integrations from localStorage
    const storedIntegrations = localStorage.getItem('enabledIntegrations');
    if (storedIntegrations) {
      try {
        const parsedIntegrations = JSON.parse(storedIntegrations);
        setEnabledIntegrations(parsedIntegrations);
        // Check if all selected tools are enabled
        if (selectedTools.length > 0 && selectedTools.every(tool => parsedIntegrations.includes(tool))) {
          setIsStep1Collapsed(true);
        }
      } catch (e) {
        console.error('Error parsing enabled integrations:', e);
      }
    }
  }, []);

  const handleIntegrationClick = (tool: string) => {
    // Get current integrations
    const currentIntegrations = JSON.parse(localStorage.getItem('enabledIntegrations') || '[]');
    
    // Add the new integration if it's not already there
    if (!currentIntegrations.includes(tool)) {
      currentIntegrations.push(tool);
      localStorage.setItem('enabledIntegrations', JSON.stringify(currentIntegrations));
      setEnabledIntegrations(currentIntegrations);
      
      // Check if all selected tools are now enabled
      if (selectedTools.every(t => currentIntegrations.includes(t))) {
        setIsStep1Collapsed(true);
      }
    }
  };

  const handleIntegrationEnabled = (integration: string) => {
    // Get current integrations
    const currentIntegrations = JSON.parse(localStorage.getItem('enabledIntegrations') || '[]');
    
    // Add the new integration if it's not already there
    if (!currentIntegrations.includes(integration)) {
      currentIntegrations.push(integration);
      localStorage.setItem('enabledIntegrations', JSON.stringify(currentIntegrations));
      setEnabledIntegrations(currentIntegrations);
    }
  };

  const handleWisdomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle wisdom query submission
    console.log('Wisdom query:', wisdomQuery);
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome Birkan</h1>
      </div>

      {/* Get Started Section */}
      <div className="mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Get Started with Enterpret</h2>
          <div className="space-y-6">
            <div className={`flex items-start space-x-4 ${isStep1Collapsed ? 'opacity-50' : ''}`}>
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">1</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Connect Your Feedback Sources</h3>
                  {isStep1Collapsed && (
                    <button 
                      onClick={() => setIsStep1Collapsed(false)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Show details
                    </button>
                  )}
                </div>
                {!isStep1Collapsed && (
                  <>
                    <p className="text-gray-600 mt-1">Start by connecting your customer feedback sources like Zendesk, Intercom, or other support tools. This will allow Enterpret to automatically collect and analyze your customer feedback.</p>
                    
                    {selectedTools.length > 0 ? (
                      <div className="mt-4">
                        <p className="text-gray-700 mb-2">Let's enable these recommended integrations to get started:</p>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {selectedTools.map((tool) => (
                            <div key={tool} className="relative">
                              <button
                                onClick={() => handleIntegrationClick(tool)}
                                disabled={enabledIntegrations.includes(tool)}
                                className={`w-full bg-gray-50 p-3 rounded-lg text-left transition-colors ${
                                  enabledIntegrations.includes(tool)
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'hover:bg-gray-100'
                                }`}
                              >
                                <span className="text-gray-800">{tool}</span>
                              </button>
                              {enabledIntegrations.includes(tool) && (
                                <div className="absolute top-2 right-2 flex items-center space-x-1 bg-green-50 px-2 py-1 rounded">
                                  <CheckCircleIcon className="h-4 w-4 text-green-500" />
                                  <span className="text-xs text-green-700">Enabled</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-700 mt-4">No tools selected yet. Please complete the onboarding process.</p>
                    )}
                    <button
                      onClick={() => setShowIntegrationDialog(true)}
                      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      See all integrations
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className={`flex items-start space-x-4 ${!isStep1Collapsed ? 'opacity-50' : ''}`}>
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">2</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Review Your Feedback Taxonomy</h3>
                <p className="text-gray-600 mt-1">Enterpret automatically creates a comprehensive taxonomy of your feedback topics. Review and customize this taxonomy to ensure it accurately reflects your product and customer needs.</p>
              </div>
            </div>

            <div className={`flex items-start space-x-4 ${!isStep1Collapsed ? 'opacity-50' : ''}`}>
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">3</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Ask Wisdom for Insights</h3>
                <p className="text-gray-600 mt-1">Use our Ask Wisdom feature to get instant answers to your questions about customer feedback. Simply type your question and get AI-powered insights from all your collected feedback.</p>
              </div>
            </div>

            <div className={`flex items-start space-x-4 ${!isStep1Collapsed ? 'opacity-50' : ''}`}>
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">4</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Review Automated Insights</h3>
                <p className="text-gray-600 mt-1">Explore the automatically generated insights and trends shown in the charts below. These visualizations help you quickly understand key patterns in your customer feedback.</p>
              </div>
            </div>

            <div className={`flex items-start space-x-4 ${!isStep1Collapsed ? 'opacity-50' : ''}`}>
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">5</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Create Custom Analysis</h3>
                <p className="text-gray-600 mt-1">Use the Analyze feature to dive deeper into specific aspects of your feedback. Create custom segments, compare different time periods, and generate detailed reports to uncover actionable insights.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wisdom Section */}
      <div className="mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <SparklesIcon className="h-6 w-6 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">Ask Wisdom</h2>
            </div>
          </div>

          <div className="mb-6">
            <form onSubmit={handleWisdomSubmit}>
              <div className="relative">
                <input
                  type="text"
                  value={wisdomQuery}
                  onChange={(e) => setWisdomQuery(e.target.value)}
                  placeholder="What would you like to learn, Birkan?"
                  className="w-full px-4 py-3 pr-20 text-gray-900 placeholder-gray-500 border border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
                >
                  GO
                </button>
              </div>
            </form>
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="inline-flex items-center px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors">
              <SparklesIcon className="h-4 w-4 mr-2 text-purple-600" />
              Summarize feedback
            </button>
            <button className="inline-flex items-center px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors">
              <ExclamationTriangleIcon className="h-4 w-4 mr-2 text-red-500" />
              Identify top issues
            </button>
            <button className="inline-flex items-center px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors">
              <ChatBubbleBottomCenterTextIcon className="h-4 w-4 mr-2 text-green-600" />
              Find user quotes
            </button>
            <button className="inline-flex items-center px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors">
              <PlusIcon className="h-4 w-4 mr-2 text-blue-600" />
              List feature requests
            </button>
            <button className="inline-flex items-center px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors">
              <QueueListIcon className="h-4 w-4 mr-2 text-gray-600" />
              More
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-1">Feedback sources</h2>
            <div className="flex items-baseline mb-2">
              <span className="text-3xl font-bold text-gray-900">750</span>
              <span className="ml-2 text-sm font-medium text-gray-500">total responses</span>
            </div>
            <p className="text-sm text-gray-600">Zendesk is your primary feedback channel, accounting for 40% of all customer interactions</p>
          </div>
          <div className="h-80">
            <Pie data={feedbackSourcesData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-1">Feedback volume</h2>
            <div className="flex items-baseline mb-2">
              <span className="text-3xl font-bold text-gray-900">23%</span>
              <span className="ml-2 text-sm font-medium text-green-600">↑ from last month</span>
            </div>
            <p className="text-sm text-gray-600">Consistent growth in feedback volume across all channels since November</p>
          </div>
          <div className="h-80">
            <Line data={feedbackVolumeData} options={timeSeriesOptions} />
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-1">Customer satisfaction</h2>
            <div className="flex items-baseline mb-2">
              <span className="text-3xl font-bold text-gray-900">4.8</span>
              <span className="ml-2 text-sm font-medium text-green-600">↑ 0.3 points</span>
            </div>
            <p className="text-sm text-gray-600">CSAT scores remain consistently high with positive trend</p>
          </div>
          <div className="h-80">
            <Line data={csatData} options={timeSeriesOptions} />
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-1">Net Promoter Score</h2>
            <div className="flex items-baseline mb-2">
              <span className="text-3xl font-bold text-gray-900">65</span>
              <span className="ml-2 text-sm font-medium text-gray-500">Excellent</span>
            </div>
            <p className="text-sm text-gray-600">Strong NPS indicating high customer loyalty and satisfaction</p>
          </div>
          <div className="h-80">
            <Line data={npsData} options={timeSeriesOptions} />
          </div>
        </div>
      </div>

      <IntegrationDialog 
        isOpen={showIntegrationDialog} 
        onClose={() => setShowIntegrationDialog(false)}
        onIntegrationEnabled={handleIntegrationEnabled}
      />
    </div>
  );
} 