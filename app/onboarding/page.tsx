'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Step {
  title: string;
  description: string;
  options: string[] | { category: string; tools: string[] }[];
}

const steps: Step[] = [
  {
    title: "What kind of work you do?",
    description: "Help us personalize your experience",
    options: [
      "Customer Experience",
      "Product management",
      "Marketing",
      "Customer Success",
      "UX Research",
      "Engineering",
      "Sales",
      "Other"
    ]
  },
  {
    title: "What are your main feedback sources?",
    description: "Select all that apply",
    options: [
      "Customer Support Tickets",
      "NPS Surveys",
      "Product Reviews",
      "User Research",
      "Sales Calls",
      "Social Media",
      "App Store Reviews"
    ]
  },
  {
    title: "Which tools do you use?",
    description: "We'll help you connect your tools",
    options: [
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
    ]
  }
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<number, string[]>>({});

  const handleSelection = (option: string) => {
    setSelections(prev => {
      const currentSelections = prev[currentStep] || [];
      const newSelections = currentSelections.includes(option)
        ? currentSelections.filter(item => item !== option)
        : [...currentSelections, option];
      
      return {
        ...prev,
        [currentStep]: newSelections
      };
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Store selected tools in localStorage
      const selectedTools = selections[2] || []; // Step 2 contains the tools
      localStorage.setItem('selectedTools', JSON.stringify(selectedTools));
      localStorage.setItem('hasSeenWelcome', 'false');
      router.push('/home');
    }
  };

  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <nav className="px-6 py-4 border-b border-gray-800">
        <div className="container mx-auto">
          <Image src="/logo.svg" alt="Enterpret" width={120} height={32} />
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 ${index === 0 ? '' : 'ml-2'} rounded-full ${
                    index <= currentStep
                      ? 'bg-gradient-to-r from-primary to-secondary'
                      : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>
            <div className="text-gray-400 text-sm">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-white mb-3">
              {steps[currentStep].title}
            </h1>
            <p className="text-gray-400">
              {steps[currentStep].description}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-12">
            {Array.isArray(steps[currentStep].options) && typeof steps[currentStep].options[0] === 'string' ? (
              // Render for string options (first two steps)
              <div className="grid grid-cols-2 gap-4">
                {(steps[currentStep].options as string[]).map((option) => {
                  const isSelected = selections[currentStep]?.includes(option);
                  return (
                    <button
                      key={option}
                      onClick={() => handleSelection(option)}
                      className={`p-4 rounded-xl text-left transition-all ${
                        isSelected
                          ? 'bg-purple-500 bg-opacity-20 border-2 border-purple-500'
                          : 'bg-[rgb(24,24,24)] border-2 border-transparent hover:border-gray-700'
                      }`}
                    >
                      <div className="font-medium text-white">{option}</div>
                    </button>
                  );
                })}
              </div>
            ) : (
              // Render for category objects (third step)
              (steps[currentStep].options as { category: string; tools: string[] }[]).map((category) => (
                <div key={category.category} className="space-y-3">
                  <h3 className="text-lg font-medium text-gray-300">{category.category}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {category.tools.map((tool) => {
                      const isSelected = selections[currentStep]?.includes(tool);
                      return (
                        <button
                          key={tool}
                          onClick={() => handleSelection(tool)}
                          className={`p-4 rounded-xl text-left transition-all ${
                            isSelected
                              ? 'bg-purple-500 bg-opacity-20 border-2 border-purple-500'
                              : 'bg-[rgb(24,24,24)] border-2 border-transparent hover:border-gray-700'
                          }`}
                        >
                          <div className="font-medium text-white">{tool}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex justify-between items-center">
            <div>
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Back
                </button>
              )}
            </div>
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity font-medium"
            >
              {currentStep === steps.length - 1 ? 'Complete Setup' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 