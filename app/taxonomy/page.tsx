'use client';

import { useState } from 'react';

// Mock data for the taxonomy hierarchy
const mockTaxonomy = {
  themes: [
    { id: 1, name: 'User Experience', subthemes: [
      { id: 101, name: 'Navigation', subthemes: [
        { id: 1001, name: 'Menu Structure' },
        { id: 1002, name: 'Search Functionality' },
        { id: 1003, name: 'Breadcrumbs' }
      ]},
      { id: 102, name: 'Interface Design', subthemes: [
        { id: 1021, name: 'Layout' },
        { id: 1022, name: 'Color Scheme' },
        { id: 1023, name: 'Typography' }
      ]},
      { id: 103, name: 'Accessibility', subthemes: [
        { id: 1031, name: 'Screen Reader' },
        { id: 1032, name: 'Keyboard Navigation' },
        { id: 1033, name: 'Color Contrast' }
      ]},
      { id: 104, name: 'Responsiveness', subthemes: [
        { id: 1041, name: 'Mobile Layout' },
        { id: 1042, name: 'Tablet Layout' },
        { id: 1043, name: 'Desktop Layout' }
      ]},
      { id: 105, name: 'Performance', subthemes: [
        { id: 1051, name: 'Load Time' },
        { id: 1052, name: 'Animation' },
        { id: 1053, name: 'Transitions' }
      ]}
    ]},
    { id: 2, name: 'Product Features', subthemes: [
      { id: 201, name: 'Core Features', subthemes: [
        { id: 2011, name: 'Authentication' },
        { id: 2012, name: 'Data Management' },
        { id: 2013, name: 'File Handling' }
      ]},
      { id: 202, name: 'Advanced Features', subthemes: [
        { id: 2021, name: 'Analytics' },
        { id: 2022, name: 'Reporting' },
        { id: 2023, name: 'Automation' }
      ]},
      { id: 203, name: 'Integration', subthemes: [
        { id: 2031, name: 'API Support' },
        { id: 2032, name: 'Third-party Apps' },
        { id: 2033, name: 'Webhooks' }
      ]},
      { id: 204, name: 'Customization', subthemes: [
        { id: 2041, name: 'Themes' },
        { id: 2042, name: 'Settings' },
        { id: 2043, name: 'Preferences' }
      ]},
      { id: 205, name: 'Security', subthemes: [
        { id: 2051, name: 'Authentication' },
        { id: 2052, name: 'Authorization' },
        { id: 2053, name: 'Encryption' }
      ]}
    ]},
    { id: 3, name: 'Content Management', subthemes: [
      { id: 301, name: 'Content Creation', subthemes: [
        { id: 3011, name: 'Editor' },
        { id: 3012, name: 'Templates' },
        { id: 3013, name: 'Media Upload' }
      ]},
      { id: 302, name: 'Content Organization', subthemes: [
        { id: 3021, name: 'Categories' },
        { id: 3022, name: 'Tags' },
        { id: 3023, name: 'Metadata' }
      ]},
      { id: 303, name: 'Content Publishing', subthemes: [
        { id: 3031, name: 'Scheduling' },
        { id: 3032, name: 'Review Process' },
        { id: 3033, name: 'Version Control' }
      ]},
      { id: 304, name: 'Content Distribution', subthemes: [
        { id: 3041, name: 'Channels' },
        { id: 3042, name: 'Formats' },
        { id: 3043, name: 'Localization' }
      ]},
      { id: 305, name: 'Content Analytics', subthemes: [
        { id: 3051, name: 'Engagement' },
        { id: 3052, name: 'Performance' },
        { id: 3053, name: 'Audience' }
      ]}
    ]},
    { id: 4, name: 'Customer Support', subthemes: [
      { id: 401, name: 'Help Center', subthemes: [
        { id: 4011, name: 'Documentation' },
        { id: 4012, name: 'FAQs' },
        { id: 4013, name: 'Tutorials' }
      ]},
      { id: 402, name: 'Ticket System', subthemes: [
        { id: 4021, name: 'Submission' },
        { id: 4022, name: 'Tracking' },
        { id: 4023, name: 'Resolution' }
      ]},
      { id: 403, name: 'Live Support', subthemes: [
        { id: 4031, name: 'Chat' },
        { id: 4032, name: 'Video' },
        { id: 4033, name: 'Screen Share' }
      ]},
      { id: 404, name: 'Feedback Collection', subthemes: [
        { id: 4041, name: 'Surveys' },
        { id: 4042, name: 'Ratings' },
        { id: 4043, name: 'Reviews' }
      ]},
      { id: 405, name: 'Knowledge Base', subthemes: [
        { id: 4051, name: 'Articles' },
        { id: 4052, name: 'Guides' },
        { id: 4053, name: 'Best Practices' }
      ]}
    ]},
    { id: 5, name: 'Data & Analytics', subthemes: [
      { id: 501, name: 'Data Collection', subthemes: [
        { id: 5011, name: 'User Behavior' },
        { id: 5012, name: 'System Metrics' },
        { id: 5013, name: 'Performance Data' }
      ]},
      { id: 502, name: 'Data Processing', subthemes: [
        { id: 5021, name: 'ETL' },
        { id: 5022, name: 'Transformation' },
        { id: 5023, name: 'Cleaning' }
      ]},
      { id: 503, name: 'Data Visualization', subthemes: [
        { id: 5031, name: 'Charts' },
        { id: 5032, name: 'Dashboards' },
        { id: 5033, name: 'Reports' }
      ]},
      { id: 504, name: 'Data Analysis', subthemes: [
        { id: 5041, name: 'Trends' },
        { id: 5042, name: 'Patterns' },
        { id: 5043, name: 'Insights' }
      ]},
      { id: 505, name: 'Data Security', subthemes: [
        { id: 5051, name: 'Privacy' },
        { id: 5052, name: 'Compliance' },
        { id: 5053, name: 'Access Control' }
      ]}
    ]},
    { id: 6, name: 'Marketing & Sales', subthemes: [
      { id: 601, name: 'Campaign Management', subthemes: [
        { id: 6011, name: 'Email Campaigns' },
        { id: 6012, name: 'Social Media' },
        { id: 6013, name: 'Ads' }
      ]},
      { id: 602, name: 'Lead Management', subthemes: [
        { id: 6021, name: 'Lead Generation' },
        { id: 6022, name: 'Lead Scoring' },
        { id: 6023, name: 'Lead Nurturing' }
      ]},
      { id: 603, name: 'Customer Journey', subthemes: [
        { id: 6031, name: 'Touchpoints' },
        { id: 6032, name: 'Conversion' },
        { id: 6033, name: 'Retention' }
      ]},
      { id: 604, name: 'Sales Pipeline', subthemes: [
        { id: 6041, name: 'Opportunities' },
        { id: 6042, name: 'Forecasting' },
        { id: 6043, name: 'Deals' }
      ]},
      { id: 605, name: 'Marketing Analytics', subthemes: [
        { id: 6051, name: 'ROI' },
        { id: 6052, name: 'Engagement' },
        { id: 6053, name: 'Conversion' }
      ]}
    ]},
    { id: 7, name: 'Operations', subthemes: [
      { id: 701, name: 'Workflow', subthemes: [
        { id: 7011, name: 'Processes' },
        { id: 7012, name: 'Automation' },
        { id: 7013, name: 'Efficiency' }
      ]},
      { id: 702, name: 'Resource Management', subthemes: [
        { id: 7021, name: 'Allocation' },
        { id: 7022, name: 'Scheduling' },
        { id: 7023, name: 'Utilization' }
      ]},
      { id: 703, name: 'Quality Control', subthemes: [
        { id: 7031, name: 'Standards' },
        { id: 7032, name: 'Testing' },
        { id: 7033, name: 'Compliance' }
      ]},
      { id: 704, name: 'Inventory', subthemes: [
        { id: 7041, name: 'Tracking' },
        { id: 7042, name: 'Management' },
        { id: 7043, name: 'Optimization' }
      ]},
      { id: 705, name: 'Supply Chain', subthemes: [
        { id: 7051, name: 'Logistics' },
        { id: 7052, name: 'Vendors' },
        { id: 7053, name: 'Distribution' }
      ]}
    ]},
    { id: 8, name: 'Security & Compliance', subthemes: [
      { id: 801, name: 'Access Control', subthemes: [
        { id: 8011, name: 'Authentication' },
        { id: 8012, name: 'Authorization' },
        { id: 8013, name: 'Permissions' }
      ]},
      { id: 802, name: 'Data Protection', subthemes: [
        { id: 8021, name: 'Encryption' },
        { id: 8022, name: 'Backup' },
        { id: 8023, name: 'Recovery' }
      ]},
      { id: 803, name: 'Compliance', subthemes: [
        { id: 8031, name: 'GDPR' },
        { id: 8032, name: 'HIPAA' },
        { id: 8033, name: 'SOC2' }
      ]},
      { id: 804, name: 'Monitoring', subthemes: [
        { id: 8041, name: 'Logs' },
        { id: 8042, name: 'Alerts' },
        { id: 8043, name: 'Audit' }
      ]},
      { id: 805, name: 'Risk Management', subthemes: [
        { id: 8051, name: 'Assessment' },
        { id: 8052, name: 'Mitigation' },
        { id: 8053, name: 'Response' }
      ]}
    ]},
    { id: 9, name: 'Integration & API', subthemes: [
      { id: 901, name: 'API Management', subthemes: [
        { id: 9011, name: 'Documentation' },
        { id: 9012, name: 'Versioning' },
        { id: 9013, name: 'Testing' }
      ]},
      { id: 902, name: 'Third-party Integration', subthemes: [
        { id: 9021, name: 'Authentication' },
        { id: 9022, name: 'Data Sync' },
        { id: 9023, name: 'Webhooks' }
      ]},
      { id: 903, name: 'Data Integration', subthemes: [
        { id: 9031, name: 'ETL' },
        { id: 9032, name: 'Migration' },
        { id: 9033, name: 'Transformation' }
      ]},
      { id: 904, name: 'System Integration', subthemes: [
        { id: 9041, name: 'Middleware' },
        { id: 9042, name: 'Connectors' },
        { id: 9043, name: 'Protocols' }
      ]},
      { id: 905, name: 'API Security', subthemes: [
        { id: 9051, name: 'Authentication' },
        { id: 9052, name: 'Authorization' },
        { id: 9053, name: 'Rate Limiting' }
      ]}
    ]},
    { id: 10, name: 'Performance & Scalability', subthemes: [
      { id: 1001, name: 'System Performance', subthemes: [
        { id: 10011, name: 'Response Time' },
        { id: 10012, name: 'Throughput' },
        { id: 10013, name: 'Latency' }
      ]},
      { id: 1002, name: 'Scalability', subthemes: [
        { id: 10021, name: 'Horizontal' },
        { id: 10022, name: 'Vertical' },
        { id: 10023, name: 'Load Balancing' }
      ]},
      { id: 1003, name: 'Resource Optimization', subthemes: [
        { id: 10031, name: 'Memory' },
        { id: 10032, name: 'CPU' },
        { id: 10033, name: 'Storage' }
      ]},
      { id: 1004, name: 'Monitoring', subthemes: [
        { id: 10041, name: 'Metrics' },
        { id: 10042, name: 'Alerts' },
        { id: 10043, name: 'Dashboards' }
      ]},
      { id: 1005, name: 'Caching', subthemes: [
        { id: 10051, name: 'Data Cache' },
        { id: 10052, name: 'Page Cache' },
        { id: 10053, name: 'CDN' }
      ]}
    ]}
  ]
};

export default function TaxonomyPage() {
  const [selectedTheme, setSelectedTheme] = useState<number | null>(null);
  const [selectedSubtheme, setSelectedSubtheme] = useState<number | null>(null);

  const handleThemeClick = (themeId: number) => {
    setSelectedTheme(themeId);
    setSelectedSubtheme(null);
  };

  const handleSubthemeClick = (subthemeId: number) => {
    setSelectedSubtheme(subthemeId);
  };

  const selectedThemeData = mockTaxonomy.themes.find(theme => theme.id === selectedTheme);
  const selectedSubthemeData = selectedThemeData?.subthemes.find(subtheme => subtheme.id === selectedSubtheme);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Feedback Taxonomy</h1>
      <div className="flex gap-4 h-[calc(100vh-8rem)]">
        {/* L1 Column - Themes */}
        <div className="w-1/3 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">L1 - Themes</h2>
          <div className="space-y-2">
            {mockTaxonomy.themes.map(theme => (
              <div
                key={theme.id}
                onClick={() => handleThemeClick(theme.id)}
                className={`p-3 rounded cursor-pointer transition-colors ${
                  selectedTheme === theme.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-white hover:bg-gray-200 text-gray-900'
                }`}
              >
                {theme.name}
              </div>
            ))}
          </div>
        </div>

        {/* L2 Column - Subthemes */}
        <div className="w-1/3 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">L2 - Subthemes</h2>
          {selectedThemeData ? (
            <div className="space-y-2">
              {selectedThemeData.subthemes.map(subtheme => (
                <div
                  key={subtheme.id}
                  onClick={() => handleSubthemeClick(subtheme.id)}
                  className={`p-3 rounded cursor-pointer transition-colors ${
                    selectedSubtheme === subtheme.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-white hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  {subtheme.name}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-700">Select a theme to view subthemes</p>
          )}
        </div>

        {/* L3 Column - Sub-subthemes */}
        <div className="w-1/3 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">L3 - Sub-subthemes</h2>
          {selectedSubthemeData ? (
            <div className="space-y-2">
              {selectedSubthemeData.subthemes.map(subsubtheme => (
                <div
                  key={subsubtheme.id}
                  className="p-3 bg-white rounded cursor-pointer hover:bg-gray-200 transition-colors text-gray-900"
                >
                  {subsubtheme.name}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-700">Select a subtheme to view details</p>
          )}
        </div>
      </div>
    </div>
  );
} 