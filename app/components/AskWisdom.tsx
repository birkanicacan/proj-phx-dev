'use client';

import { SparklesIcon } from '@heroicons/react/24/outline';

export function AskWisdom() {
  return (
    <div className="bg-blue-50 rounded-lg p-4 flex items-start gap-3">
      <div className="flex-shrink-0">
        <SparklesIcon className="h-6 w-6 text-blue-600" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-blue-900">Ask Wisdom</h3>
        <p className="mt-1 text-sm text-blue-700">
          Try asking Wisdom in natural language, like &quot;Summarize the feedback around Offline mode?&quot;
        </p>
      </div>
    </div>
  );
} 