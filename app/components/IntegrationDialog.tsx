'use client';

import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface IntegrationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onIntegrationEnabled: (integration: string) => void;
}

const integrations = [
  {
    category: "Customer Support",
    tools: ["Zendesk", "Intercom"]
  },
  {
    category: "CRM & Sales",
    tools: ["Salesforce", "HubSpot"]
  },
  {
    category: "Survey & Forms",
    tools: ["Typeform", "Qualtrics"]
  },
  {
    category: "App Stores",
    tools: ["App Store", "Play Store", "Amazon reviews"]
  },
  {
    category: "Review Platforms",
    tools: ["G2", "Amazon reviews"]
  },
  {
    category: "Social Media",
    tools: ["X (fka. Twitter)", "Reddit"]
  }
];

export default function IntegrationDialog({ isOpen, onClose, onIntegrationEnabled }: IntegrationDialogProps) {
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);
  const [enabledIntegrations, setEnabledIntegrations] = useState<string[]>([]);

  useEffect(() => {
    // Get enabled integrations from localStorage
    const storedIntegrations = localStorage.getItem('enabledIntegrations');
    if (storedIntegrations) {
      try {
        const parsedIntegrations = JSON.parse(storedIntegrations);
        setEnabledIntegrations(parsedIntegrations);
      } catch (e) {
        console.error('Error parsing enabled integrations:', e);
      }
    }
  }, [isOpen]); // Re-run when dialog opens

  const handleIntegrationSelect = (integration: string) => {
    if (!enabledIntegrations.includes(integration)) {
      setSelectedIntegration(integration);
    }
  };

  const handleEnableIntegration = () => {
    if (selectedIntegration) {
      // Get existing integrations from localStorage
      const currentIntegrations = JSON.parse(localStorage.getItem('enabledIntegrations') || '[]');
      
      // Add the new integration if it's not already there
      if (!currentIntegrations.includes(selectedIntegration)) {
        currentIntegrations.push(selectedIntegration);
        localStorage.setItem('enabledIntegrations', JSON.stringify(currentIntegrations));
        setEnabledIntegrations(currentIntegrations);
        onIntegrationEnabled(selectedIntegration);
        onClose();
      }
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold leading-6 text-gray-900 mb-4"
                >
                  Connect Your Feedback Sources
                </Dialog.Title>

                <div className="mt-4 space-y-6">
                  {integrations.map((category) => (
                    <div key={category.category} className="space-y-3">
                      <h3 className="text-lg font-medium text-gray-900">{category.category}</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {category.tools.map((tool) => (
                          <div key={tool} className="relative">
                            <button
                              onClick={() => handleIntegrationSelect(tool)}
                              className={`p-4 rounded-xl text-left transition-all ${
                                selectedIntegration === tool
                                  ? 'bg-blue-500 bg-opacity-20 border-2 border-blue-500'
                                  : enabledIntegrations.includes(tool)
                                  ? 'bg-gray-50 border-2 border-transparent opacity-50 cursor-not-allowed'
                                  : 'bg-gray-50 border-2 border-transparent hover:border-gray-300'
                              }`}
                              disabled={enabledIntegrations.includes(tool)}
                            >
                              <div className="font-medium text-gray-900">{tool}</div>
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
                  ))}
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleEnableIntegration}
                    disabled={!selectedIntegration}
                  >
                    Connect
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 