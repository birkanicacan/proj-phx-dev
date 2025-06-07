'use client';

import { useState } from 'react';
import { 
  DocumentTextIcon, 
  UserIcon, 
  BuildingOfficeIcon, 
  ChartBarIcon,
  ShoppingBagIcon,
  TagIcon,
  PlusIcon,
  ArrowsRightLeftIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import FeedbackKnowledgePane from './FeedbackKnowledgePane';
import TaxonomyKnowledgePane from './TaxonomyKnowledgePane';

interface DataObject {
  id: string;
  name: string;
  type: 'feedback' | 'taxonomy' | 'users' | 'accounts' | 'opportunities' | 'stores' | 'products' | 'connect';
  status: 'connected' | 'derived' | 'potential' | 'placeholder';
  description: string;
  icon: React.ComponentType<any>;
}

export default function KnowledgeGraph() {
  const [selectedObject, setSelectedObject] = useState<string | null>(null);

  const dataObjects: DataObject[] = [
    {
      id: 'feedback',
      name: 'Feedback',
      type: 'feedback',
      status: 'connected',
      description: 'Direct from third-party systems (Zendesk, Intercom)',
      icon: DocumentTextIcon
    },
    {
      id: 'taxonomy',
      name: 'Taxonomy',
      type: 'taxonomy',
      status: 'connected',
      description: 'Hierarchical classification of feedback themes and topics',
      icon: AdjustmentsHorizontalIcon
    },
    {
      id: 'users',
      name: 'Users',
      type: 'users',
      status: 'derived',
      description: 'Derived from feedback records',
      icon: UserIcon
    },
    {
      id: 'accounts',
      name: 'Accounts',
      type: 'accounts',
      status: 'potential',
      description: 'Connect a CRM to enrich this data',
      icon: BuildingOfficeIcon
    },
    {
      id: 'opportunities',
      name: 'Opportunities',
      type: 'opportunities',
      status: 'potential',
      description: 'Connect a CRM to enrich this data',
      icon: ChartBarIcon
    },
    {
      id: 'connect',
      name: '+ Connect',
      type: 'connect',
      status: 'placeholder',
      description: 'Add more data sources or custom objects',
      icon: PlusIcon
    }
  ];

  const getNodeStyles = (status: string) => {
    switch (status) {
      case 'connected':
        return {
          container: 'bg-purple-100 border-purple-300 border-2',
          icon: 'text-purple-600',
          text: 'text-purple-900',
          connector: 'border-purple-400'
        };
      case 'derived':
        return {
          container: 'bg-purple-50 border-purple-200 border-2 border-dashed',
          icon: 'text-purple-500',
          text: 'text-purple-800',
          connector: 'border-purple-300 border-dashed'
        };
      case 'potential':
        return {
          container: 'bg-gray-100 border-gray-300 border-2',
          icon: 'text-gray-500',
          text: 'text-gray-700',
          connector: 'border-gray-300'
        };
      case 'placeholder':
        return {
          container: 'bg-gray-50 border-gray-200 border-2 border-dashed',
          icon: 'text-gray-400',
          text: 'text-gray-600',
          connector: 'border-gray-200'
        };
      default:
        return {
          container: 'bg-white border-gray-200 border-2',
          icon: 'text-gray-500',
          text: 'text-gray-700',
          connector: 'border-gray-200'
        };
    }
  };

  return (
    <>
      <div className="w-full h-full p-8">
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="flex items-center gap-4">
            {dataObjects.map((obj, index) => {
              const styles = getNodeStyles(obj.status);
              const IconComponent = obj.icon;
              
              return (
                <div key={obj.id} className="flex items-center">
                  {/* Node */}
                  <div
                    className={`
                      relative w-32 h-24 rounded-lg transition-all duration-200
                      ${styles.container}
                      ${selectedObject === obj.id ? 'ring-2 ring-purple-500 ring-offset-2' : ''}
                      hover:shadow-md cursor-pointer
                    `}
                    onClick={() => {
                      if (obj.id === 'feedback') {
                        setSelectedObject(selectedObject === 'feedback' ? null : 'feedback');
                      } else if (obj.id === 'taxonomy') {
                        setSelectedObject(selectedObject === 'taxonomy' ? null : 'taxonomy');
                      }
                    }}
                  >
                    <div className="flex flex-col items-center justify-center h-full p-3">
                      <IconComponent className={`w-6 h-6 mb-2 ${styles.icon}`} />
                      <span className={`text-sm font-medium text-center ${styles.text}`}>
                        {obj.name}
                      </span>
                      {obj.status === 'potential' && (
                        <span className="text-xs text-gray-500 mt-1">♦ Connect</span>
                      )}
                    </div>
                  </div>

                  {/* Connector Arrow */}
                  {index < dataObjects.length - 1 && (
                    <div className="flex items-center mx-2">
                      <ArrowsRightLeftIcon className={`w-6 h-6 ${styles.icon}`} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Feedback Knowledge Pane */}
      <FeedbackKnowledgePane
        isOpen={selectedObject === 'feedback'}
        onClose={() => setSelectedObject(null)}
      />

      {/* Taxonomy Knowledge Pane */}
      <TaxonomyKnowledgePane
        isOpen={selectedObject === 'taxonomy'}
        onClose={() => setSelectedObject(null)}
      />
    </>
  );
} 