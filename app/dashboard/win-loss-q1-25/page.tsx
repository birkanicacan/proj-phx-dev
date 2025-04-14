'use client';

import { useState } from 'react';
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
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/24/outline';

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
  Legend
);

export default function WinLossAnalysis() {
  const [selectedPeriod, setSelectedPeriod] = useState('12M');

  // Fake data for Total Won/Lost ratio
  const wonLostData = {
    datasets: [{
      data: [237],
      backgroundColor: ['#3B82F6'],
      label: 'Closed Lost'
    }],
  };

  // Fake data for Impacted Revenue
  const impactedRevenueData = {
    labels: ['Closed Lost'],
    datasets: [{
      data: [3.375],
      backgroundColor: ['#3B82F6'],
      barThickness: 40,
    }],
  };

  // Fake data for Lost Deals
  const lostDealsData = {
    labels: [
      'ZY Enterprise 1400 Yearly',
      'BMC Software Enterprise 500 Yearly',
      'Truva Enterprise 300 Yearly',
      'merav.co.il Enterprise 220 Yearly',
      'Fiverr Enterprise 860 Yearly',
      'Wizo Enterprise 200 Yearly',
      'Bar-Ilan University Enterprise 160 Yearly',
      'Applied Materials Enterprise 50 Yearly',
      'Israel Bar Association Enterprise Multi Products Yearly',
    ],
    datasets: [{
      data: [436.8, 158.4, 155.76, 134.4, 110.89, 83.616, 78.717, 74.88, 49.92],
      backgroundColor: [
        '#3B82F6', '#10B981', '#EC4899', '#F59E0B', '#6366F1',
        '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'
      ],
      barThickness: 20,
    }],
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Win/Loss Analysis Q1'25 (Birkan)</h1>
        <p className="text-gray-500 text-sm mt-1">Dashboard • Birkan Icacan • 14 days ago</p>
      </div>

      {/* Time Period Selector */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex space-x-2 bg-gray-100 p-1 rounded-md">
          {['DEFAULT', '7D', '14D', '4W', '3M', '6M', '12M'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1 rounded text-sm ${
                selectedPeriod === period
                  ? 'bg-white shadow text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {period}
            </button>
          ))}
          <button className="px-3 py-1 rounded text-sm text-gray-600 hover:text-gray-900">
            CUSTOM
          </button>
        </div>
        <button className="flex items-center space-x-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
          <FunnelIcon className="h-4 w-4" />
          <span>SHOW FILTERS</span>
        </button>
      </div>

      {/* High-level Overview Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-2">High-level Overview</h2>
        <p className="text-gray-600 mb-4">This section provides a high-level overview of impacted revenue, opportunity stages, and deals impacted.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Number of Opportunities */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Number of Opportunities</h3>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900">237</div>
              <div className="text-sm text-gray-500 mt-2">Feedback Records • Count</div>
            </div>
          </div>

          {/* Total Won */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Won</h3>
            </div>
            <div className="flex items-center justify-center h-48">
              <div className="text-center text-gray-500">No Records Found</div>
            </div>
          </div>

          {/* Total Lost */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Lost</h3>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900">237</div>
              <div className="text-sm text-gray-500 mt-2">Feedback Records • Count</div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Won/Lost */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Total Won/Lost</h3>
          </div>
          <div className="h-64">
            <Doughnut 
              data={wonLostData}
              options={{
                cutout: '70%',
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }}
            />
          </div>
          <div className="text-center mt-4">
            <div className="text-sm text-gray-500">100% Closed Lost</div>
          </div>
        </div>

        {/* Impacted Revenue */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Impacted Revenue</h3>
          </div>
          <div className="h-64">
            <Bar
              data={impactedRevenueData}
              options={{
                indexAxis: 'y',
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  x: {
                    beginAtZero: true,
                    grid: {
                      display: false
                    }
                  },
                  y: {
                    grid: {
                      display: false
                    }
                  }
                }
              }}
            />
          </div>
          <div className="text-center mt-4">
            <div className="text-sm text-gray-500">3.375M</div>
          </div>
        </div>

        {/* Lost Deals */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Lost Deals</h3>
          </div>
          <div className="h-64 overflow-y-auto">
            <Bar
              data={lostDealsData}
              options={{
                indexAxis: 'y',
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  x: {
                    beginAtZero: true,
                    grid: {
                      display: false
                    }
                  },
                  y: {
                    grid: {
                      display: false
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 