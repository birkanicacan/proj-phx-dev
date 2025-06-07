'use client';

import { useState } from 'react';
import MainLayout from '../components/MainLayout';
import KnowledgeGraph from '../components/KnowledgeGraph';

export default function KnowledgePage() {
  return (
    <MainLayout>
      <div className="h-full">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Knowledge Graph</h1>
          <p className="mt-2 text-sm text-gray-600">
            Explore your data relationships and connections across different objects in your system.
          </p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 h-[calc(100vh-200px)] relative">
          <KnowledgeGraph />
        </div>
      </div>
    </MainLayout>
  );
} 