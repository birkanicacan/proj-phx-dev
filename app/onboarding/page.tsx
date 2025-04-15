'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface PlanFeature {
  free: string | number;
  premium: string | number;
  enterprise: string | number;
  icon?: string;
}

interface PlanFeatures {
  [key: string]: PlanFeature;
}

interface Step {
  title: string;
  description: string;
  options: string[] | ToolCategory[] | PlanFeatures;
  type?: 'default' | 'pricing';
}

interface ToolCategory {
  category: string;
  tools: string[];
  feedbackSource: string | string[];
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
        tools: ["Zendesk", "Intercom"],
        feedbackSource: "Customer Support Tickets"
      },
      {
        category: "CRM & Sales",
        tools: ["Salesforce", "HubSpot"],
        feedbackSource: "Sales Calls"
      },
      {
        category: "Survey & Forms",
        tools: ["Typeform", "Qualtrics"],
        feedbackSource: ["NPS Surveys", "User Research"]
      },
      {
        category: "App Stores",
        tools: ["App Store", "Play Store", "Amazon reviews"],
        feedbackSource: "App Store Reviews"
      },
      {
        category: "Review Platforms",
        tools: ["G2", "Amazon reviews"],
        feedbackSource: "Product Reviews"
      },
      {
        category: "Social Media",
        tools: ["X (fka. Twitter)", "Reddit"],
        feedbackSource: "Social Media"
      }
    ]
  },
  {
    title: "Choose your trial",
    description: "Start with a 14-day trial",
    type: 'pricing',
    options: {
      "Feedback Records": {
        free: "100 records from each feedback source",
        premium: "1000 records from each feedback source",
        enterprise: "Custom records limit",
        icon: "📊"
      },
      "Wisdom Credits": {
        free: "10 queries",
        premium: "100 queries",
        enterprise: "Unlimited queries",
        icon: "🤖"
      },
      "Integrations": {
        free: "Starter integrations including Zendesk, Intercom, Twitter, Reddit, and manual uploads",
        premium: "Starter + Premium integations including Salesforce, Gong, and more",
        enterprise: "Premium + Enterprise integrations with Qualtrics, Medallia, Salesforce, and more",
        icon: "🔌"
      }
    }
  }
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<number, string[]>>({});
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    name: '',
    businessName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: ''
  });

  const handlePaymentFieldClick = () => {
    if (!paymentDetails.name) {
      setPaymentDetails({
        name: 'Birkan Icacan',
        businessName: 'Acme',
        cardNumber: '4242 4242 4242 4242',
        expiryDate: '12 / 24',
        cvc: '123'
      });
    }
  };

  const handleSelection = (option: string) => {
    setSelections(prev => {
      const currentSelections = prev[currentStep] || [];
      let newSelections;
      
      if (currentStep === 0) {
        // For work type selection (first step), make it single-select
        newSelections = [option];
      } else {
        // For other steps, keep it multi-select
        newSelections = currentSelections.includes(option)
          ? currentSelections.filter(item => item !== option)
          : [...currentSelections, option];
      }
      
      return {
        ...prev,
        [currentStep]: newSelections
      };
    });
  };

  const handlePaymentSubmit = () => {
    // Here you would handle the payment submission
    // For now, we'll just proceed to the home page
    const selectedTools = selections[2] || [];
    localStorage.setItem('selectedTools', JSON.stringify(selectedTools));
    localStorage.setItem('hasSeenWelcome', 'false');
    router.push('/home');
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Store selected tools in localStorage
      const selectedTools = selections[2] || [];
      localStorage.setItem('selectedTools', JSON.stringify(selectedTools));
      localStorage.setItem('hasSeenWelcome', 'false');
      router.push('/home');
    }
  };

  const handleStartFreeTrial = () => {
    const selectedTools = selections[2] || [];
    localStorage.setItem('selectedTools', JSON.stringify(selectedTools));
    localStorage.setItem('hasSeenWelcome', 'false');
    router.push('/home');
  };

  const renderPricingStep = () => {
    const features = steps[currentStep].options as PlanFeatures;
    
    return (
      <div className="w-full">
        <div className="grid grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="bg-[rgb(24,24,24)] p-8 rounded-xl border-2 border-transparent">
            <h3 className="text-xl font-bold text-white mb-4">Free</h3>
            <div className="space-y-4">
              {Object.entries(features).map(([name, feature]) => (
                <div key={name} className="flex items-start space-x-3">
                  {feature.icon && <span className="text-2xl">{feature.icon}</span>}
                  <div>
                    <p className="text-white font-medium">{name}</p>
                    <p className="text-gray-400">{feature.free}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleStartFreeTrial}
              className="w-full mt-8 py-3 px-4 border-2 border-gray-700 text-white rounded-full hover:bg-gray-700 transition-colors"
            >
              Continue with Free Trial
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-[rgb(24,24,24)] p-8 rounded-xl border-2 border-purple-500">
            <div className="bg-purple-500 text-white text-sm font-medium px-3 py-1 rounded-full inline-block mb-4">
              RECOMMENDED
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Premium</h3>
            <div className="space-y-4">
              {Object.entries(features).map(([name, feature]) => (
                <div key={name} className="flex items-start space-x-3">
                  {feature.icon && <span className="text-2xl">{feature.icon}</span>}
                  <div>
                    <p className="text-white font-medium">{name}</p>
                    <p className="text-gray-400">{feature.premium}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowPaymentForm(true)}
              className="w-full mt-8 bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity font-medium"
            >
              Start Premium Trial
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-[rgb(24,24,24)] p-8 rounded-xl border-2 border-blue-500">
            <div className="bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded-full inline-block mb-4">
              ENTERPRISE
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Enterprise</h3>
            <div className="space-y-4">
              {Object.entries(features).map(([name, feature]) => (
                <div key={name} className="flex items-start space-x-3">
                  {feature.icon && <span className="text-2xl">{feature.icon}</span>}
                  <div>
                    <p className="text-white font-medium">{name}</p>
                    <p className="text-gray-400">{feature.enterprise}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => window.location.href = 'mailto:sales@enterpret.com'}
              className="w-full mt-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity font-medium"
            >
              Contact Sales
            </button>
          </div>
        </div>

        {showPaymentForm && (
          <div className="mt-8 bg-[rgb(24,24,24)] p-6 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-6">Payment Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2">Name</label>
                  <input
                    type="text"
                    value={paymentDetails.name}
                    onChange={(e) => setPaymentDetails(prev => ({ ...prev, name: e.target.value }))}
                    onClick={handlePaymentFieldClick}
                    className="w-full bg-[rgb(32,32,32)] border border-gray-700 rounded-lg px-4 py-2 text-white"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Business name (optional)</label>
                  <input
                    type="text"
                    value={paymentDetails.businessName}
                    onChange={(e) => setPaymentDetails(prev => ({ ...prev, businessName: e.target.value }))}
                    onClick={handlePaymentFieldClick}
                    className="w-full bg-[rgb(32,32,32)] border border-gray-700 rounded-lg px-4 py-2 text-white"
                    placeholder="Acme Inc."
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Card number</label>
                <input
                  type="text"
                  value={paymentDetails.cardNumber}
                  onChange={(e) => setPaymentDetails(prev => ({ ...prev, cardNumber: e.target.value }))}
                  onClick={handlePaymentFieldClick}
                  className="w-full bg-[rgb(32,32,32)] border border-gray-700 rounded-lg px-4 py-2 text-white"
                  placeholder="1234 1234 1234 1234"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2">Expiration date</label>
                  <input
                    type="text"
                    value={paymentDetails.expiryDate}
                    onChange={(e) => setPaymentDetails(prev => ({ ...prev, expiryDate: e.target.value }))}
                    onClick={handlePaymentFieldClick}
                    className="w-full bg-[rgb(32,32,32)] border border-gray-700 rounded-lg px-4 py-2 text-white"
                    placeholder="MM / YY"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Security code</label>
                  <input
                    type="text"
                    value={paymentDetails.cvc}
                    onChange={(e) => setPaymentDetails(prev => ({ ...prev, cvc: e.target.value }))}
                    onClick={handlePaymentFieldClick}
                    className="w-full bg-[rgb(32,32,32)] border border-gray-700 rounded-lg px-4 py-2 text-white"
                    placeholder="CVC"
                  />
                </div>
              </div>

              <button
                onClick={handlePaymentSubmit}
                className="w-full mt-4 bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity font-medium"
              >
                Start Premium Trial
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <nav className="px-6 py-4 border-b border-gray-800">
        <div className="container mx-auto">
          <Image src="/logo.svg" alt="Enterpret" width={120} height={32} />
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-5xl">
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
            {steps[currentStep].type === 'pricing' ? (
              renderPricingStep()
            ) : Array.isArray(steps[currentStep].options) && typeof steps[currentStep].options[0] === 'string' ? (
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
              (steps[currentStep].options as { category: string; tools: string[]; feedbackSource: string | string[] }[])
                .filter(category => {
                  if (currentStep === 2) { // Only filter on the tools step
                    const selectedFeedbackSources = selections[1] || []; // Get selections from step 1 (feedback sources)
                    if (Array.isArray(category.feedbackSource)) {
                      return category.feedbackSource.some(source => selectedFeedbackSources.includes(source));
                    }
                    return selectedFeedbackSources.includes(category.feedbackSource);
                  }
                  return true;
                })
                .map((category) => (
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
              {currentStep > 0 && !showPaymentForm && (
                <button
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Back
                </button>
              )}
            </div>
            {!steps[currentStep].type && (
              <button
                onClick={handleNext}
                className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity font-medium"
              >
                {currentStep === steps.length - 1 ? 'Complete Setup' : 'Continue'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 