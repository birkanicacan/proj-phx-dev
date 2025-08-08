'use client';

import { useState } from 'react';
import { ChartBarIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import AnalyzeThemesTable, { AnalyzeFilter } from '../components/AnalyzeThemesTable';

export default function AnalyzePage() {
  const [plotQuery, setPlotQuery] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('3M');
  const [chartType, setChartType] = useState<'BAR' | 'TREND' | 'TABLE'>('TABLE');
  const [filters, setFilters] = useState<AnalyzeFilter[]>([]);

  const handleAddFilter = (f: AnalyzeFilter) => {
    setFilters((prev) => {
      if (prev.find((p) => p.id === f.id)) return prev;
      return [...prev, f];
    });
  };

  const handleRemoveFilter = (id: string) => {
    setFilters((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analyze</h1>
      </div>
      
      <div className="flex-1 flex">
        {/* Left Configuration Panel */}
        <div className="w-80 border-r border-gray-200 bg-white p-4 flex flex-col">
          <div className="space-y-6">
            {/* Plot Section */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Plot</h3>
              <div className="relative">
                <select
                  className="w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue="themes"
                >
                  <option value="themes" className="text-gray-800">Themes</option>
                  <option value="feedback_volume" className="text-gray-800">Feedback Volume</option>
                  <option value="sentiment" className="text-gray-800">Sentiment</option>
                  <option value="topics" className="text-gray-800">Topics</option>
                  <option value="sources" className="text-gray-800">Sources</option>
                </select>
              </div>
            </div>

            {/* Breakdown By Section */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">BREAKDOWN BY</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
                  Sub-themes
                </button>
              </div>
            </div>

            {/* Filter Section */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Filter</h3>
              <div className="space-y-2">
                {filters.length === 0 && (
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-50 rounded-md border border-dashed border-gray-300 rounded-md">
                    + Add Filter
                  </button>
                )}
                {filters.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {filters.map((f) => (
                      <span key={f.id} className="inline-flex items-center gap-2 text-xs bg-blue-50 text-blue-800 border border-blue-200 px-2 py-1 rounded">
                        {f.label}
                        <button onClick={() => handleRemoveFilter(f.id)} className="text-blue-700 hover:text-blue-900">×</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Duration Section */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Duration</h3>
              <div className="flex space-x-2 text-sm">
                {['7D', '14D', '4W', '3M', '6M', '12M'].map((duration) => (
                  <button
                    key={duration}
                    onClick={() => setSelectedDuration(duration)}
                    className={`px-2 py-1 rounded ${
                      selectedDuration === duration
                        ? 'bg-blue-100 text-blue-800'
                        : 'text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    {duration}
                  </button>
                ))}
                <button className="px-2 py-1 rounded text-gray-800 hover:bg-gray-100">
                  Custom
                </button>
              </div>
            </div>

            {/* Measured As Section */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Measured as</h3>
              <div className="space-y-2">
                <select
                  className="w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue="count"
                >
                  <option value="count">Count</option>
                  <option value="percentage">Percentage</option>
                  <option value="average">Average</option>
                </select>
                <select
                  className="w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue="feedback"
                >
                  <option value="feedback">Feedback</option>
                  <option value="users">Users</option>
                  <option value="sessions">Sessions</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Chart Panel */}
        <div className="flex-1 p-6">
          <div className="mb-4 flex justify-between items-center">
            {/* Chart Type Toggle */}
            <div className="flex space-x-2 bg-gray-100 p-1 rounded-md">
              <button
                onClick={() => setChartType('TABLE')}
                className={`px-3 py-1 rounded flex items-center space-x-1 ${
                  chartType === 'TABLE'
                    ? 'bg-white shadow text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span>TABLE</span>
              </button>
              <button
                onClick={() => setChartType('BAR')}
                className={`px-3 py-1 rounded flex items-center space-x-1 ${
                  chartType === 'BAR'
                    ? 'bg-white shadow text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <ChartBarIcon className="h-4 w-4" />
                <span>BAR</span>
              </button>
              <button
                onClick={() => setChartType('TREND')}
                className={`px-3 py-1 rounded flex items-center space-x-1 ${
                  chartType === 'TREND'
                    ? 'bg-white shadow text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <ArrowTrendingUpIcon className="h-4 w-4" />
                <span>TREND + ANOMALIES</span>
              </button>
            </div>
          </div>

          {/* Chart Area */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-[calc(100vh-12rem)]">
            {chartType === 'TABLE' && (
              <AnalyzeThemesTable onAddFilter={handleAddFilter} />
            )}
            {chartType !== 'TABLE' && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-4">
                    <img
                      src="/chart-placeholder.svg"
                      alt="Chart placeholder"
                      className="w-48 h-48 mx-auto opacity-50"
                    />
                  </div>
                  <p className="text-gray-600 mb-2">
                    Create a chart using the Quantify builder or generate one by describing it below.
                  </p>
                  <div className="relative max-w-xl mx-auto">
                    <input
                      type="text"
                      value={plotQuery}
                      onChange={(e) => setPlotQuery(e.target.value)}
                      placeholder="Describe the chart you want to create..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-20"
                    />
                    <button
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors text-sm"
                    >
                      GENERATE
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 