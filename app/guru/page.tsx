'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Simple LaunchDarkly simulation
const isSuperAdmin = () => {
  // In a real implementation, this would check LaunchDarkly flags
  // For now, we'll simulate based on URL parameter or localStorage
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const userRole = urlParams.get('role') || localStorage.getItem('userRole') || 'Super Admin';
    return userRole === 'Super Admin';
  }
  return true; // Default to Super Admin for development
};

const GuruPage = () => {
  const [activeSection, setActiveSection] = useState('faq');
  const isAdmin = isSuperAdmin();

  const sections = [
    {
      id: 'faq',
      title: 'FAQ',
      icon: '❓',
      description: 'Frequently Asked Questions'
    },
    {
      id: 'documentation',
      title: 'Documentation',
      icon: '📚',
      description: 'API Documentation & Resources'
    },
    {
      id: 'resources',
      title: 'Resources',
      icon: '🎯',
      description: 'Alpha Capabilities & Materials'
    }
  ];

  const faqData = [
    {
      category: 'Dashboard',
      questions: [
        {
          question: 'How do I access the dashboard?',
          answer: 'The dashboard is available to Super Admin users only. Navigate to the Dashboard tab in the sidebar to view analytics and overview data.'
        },
        {
          question: 'What metrics are shown on the dashboard?',
          answer: 'The dashboard displays key performance indicators, campaign analytics, and real-time data insights for PMP deals.'
        }
      ]
    },
    {
      category: 'PMP Universe',
      questions: [
        {
          question: 'How do I search for specific PMP deals?',
          answer: 'Use the search bar on the PMP Universe page to search by deal name, category, targeting, formats, SSP, DSP, performance, benefits, creative examples, devices, placements, or seasonal keywords.'
        },
        {
          question: 'What are the different PMP categories?',
          answer: 'PMPs are categorized into Evergreen (Performance, Historical Location/Survey Responses/Bid Stream Data, Sensitive), Seasonal (Summer, Fall, Winter, Spring, by Month), and Custom (no sub-categories).'
        },
        {
          question: 'How do I view detailed information about a PMP deal?',
          answer: 'Click the "View Details" button on any PMP card to open a detailed modal with Overview, Data, Creatives, and Performance tabs.'
        }
      ]
    },
    {
      category: 'RFP Generator',
      questions: [
        {
          question: 'How do I create a new RFP?',
          answer: 'Navigate to the RFP Generator tab and fill out the required fields including campaign details, targeting parameters, and creative requirements.'
        },
        {
          question: 'Can I save and edit RFPs?',
          answer: 'Yes, you can save RFPs as drafts and edit them later. All RFPs are stored in your account for future reference.'
        }
      ]
    },
    {
      category: 'Custom Deals',
      questions: [
        {
          question: 'Who can access Custom Deals?',
          answer: 'Custom Deals are available to Super Admin users only. Client users cannot access this feature due to permission restrictions.'
        },
        {
          question: 'How do I create a custom PMP deal?',
          answer: 'Navigate to the Custom Deals tab and follow the multi-step form to define your custom targeting, creative requirements, and performance goals.'
        }
      ]
    }
  ];

  const documentationData = [
    {
      title: 'PMP Universe API Documentation',
      description: 'Complete API reference for integrating with the PMP Universe platform',
      url: '#',
      status: 'Coming Soon'
    },
    {
      title: 'MediaMath API Documentation',
      description: 'Official MediaMath API documentation for programmatic advertising',
      url: '#',
      status: 'External Link'
    },
    {
      title: 'Seismic Links (Internal)',
      description: 'Internal Infillion resources and documentation',
      url: 'https://infillion.seismic.com/Link/Content/DCbbCp27XJ4VXG9D8mjdc8Q9bjjG',
      status: 'Internal Only',
      internal: true
    },
    {
      title: 'Sales Training',
      description: 'Sales training materials and resources',
      url: 'https://infillion.seismic.com/Link/Content/DC2mq7pBXmbB789GbJJ472pfCWc8',
      status: 'Internal Only',
      internal: true
    },
    {
      title: 'Email Outreach Templates',
      description: 'Templates for email outreach campaigns',
      url: 'https://infillion.seismic.com/Link/Content/DC86VJTB7PXBq8TJbTgpgCBH7gh8',
      status: 'Internal Only',
      internal: true
    }
  ];

  // Filter documentation data based on user permissions
  const filteredDocumentationData = isAdmin 
    ? documentationData 
    : documentationData.filter(item => !item.internal);

  const resourcesData = [
    {
      title: 'PMP Universe Alpha Slides',
      description: 'Presentation slides showcasing PMP Universe alpha capabilities',
      url: '#',
      status: 'Coming Soon'
    },
    {
      title: 'Alpha One Sheet',
      description: 'One-page overview of PMP Universe alpha features',
      url: '#',
      status: 'Coming Soon'
    }
  ];

  const getSectionData = () => {
    switch (activeSection) {
      case 'faq':
        return faqData;
      case 'documentation':
        return filteredDocumentationData;
      case 'resources':
        return resourcesData;
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="p-8 min-h-screen">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            GURU
          </h1>
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Knowledge Hub & Resources
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Your comprehensive guide to the PMP Universe platform. Find answers to frequently asked questions, 
            access documentation, and discover resources to maximize your success.
          </p>
        </motion.div>

        {/* Section Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="flex gap-4 bg-[#1B6CA8]/10 rounded-xl p-2 border border-[#1B6CA8]/30">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-[#00FFB7] to-[#00FFF7] text-[#121B30] shadow-lg'
                    : 'text-[#C8BCD1] hover:text-[#F8F8FF] hover:bg-[#1B6CA8]/20'
                }`}
              >
                <span className="text-lg">{section.icon}</span>
                <div className="text-left">
                  <div className="font-semibold">{section.title}</div>
                  <div className="text-xs opacity-80">{section.description}</div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          {activeSection === 'faq' && (
            <div className="space-y-6">
              {faqData.map((category, index) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#1B6CA8]/10 rounded-xl p-6 border border-[#1B6CA8]/30"
                >
                  <h3 className="text-xl font-bold text-[#F8F8FF] mb-4 flex items-center gap-2">
                    <span className="text-[#00FFB7]">📋</span>
                    {category.category}
                  </h3>
                  <div className="space-y-4">
                    {category.questions.map((item, qIndex) => (
                      <div key={qIndex} className="bg-[#1B6CA8]/20 rounded-lg p-4 border border-[#1B6CA8]/30">
                        <h4 className="text-[#F8F8FF] font-semibold mb-2">{item.question}</h4>
                        <p className="text-[#C8BCD1] text-sm leading-relaxed">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeSection === 'documentation' && (
            <div className="space-y-4">
              {filteredDocumentationData.map((doc, index) => (
                <motion.div
                  key={doc.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#1B6CA8]/10 rounded-xl p-6 border border-[#1B6CA8]/30 hover:border-[#00FFB7]/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#F8F8FF] mb-2 flex items-center gap-2">
                        <span className="text-[#00FFB7]">📚</span>
                        {doc.title}
                      </h3>
                      <p className="text-[#C8BCD1] mb-3">{doc.description}</p>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          doc.internal 
                            ? 'bg-[#A239CA]/20 text-[#A239CA] border border-[#A239CA]/30' 
                            : 'bg-[#FFEF00]/20 text-[#FFEF00] border border-[#FFEF00]/30'
                        }`}>
                          {doc.status}
                        </span>
                        {doc.internal && (
                          <span className="text-[#A239CA] text-xs">🔗 Internal Link</span>
                        )}
                      </div>
                    </div>
                    <a
                      href={doc.url}
                      target={doc.internal ? "_blank" : "_self"}
                      rel={doc.internal ? "noopener noreferrer" : ""}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                        doc.internal
                          ? 'bg-gradient-to-r from-[#A239CA] to-[#C77DFF] text-white hover:shadow-lg hover:shadow-[#A239CA]/30'
                          : 'bg-gradient-to-r from-[#00FFB7] to-[#00FFF7] text-[#121B30] hover:shadow-lg hover:shadow-[#00FFB7]/30'
                      }`}
                    >
                      {doc.internal ? 'Open Link' : 'View Docs'}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeSection === 'resources' && (
            <div className="space-y-4">
              {resourcesData.map((resource, index) => (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#1B6CA8]/10 rounded-xl p-6 border border-[#1B6CA8]/30 hover:border-[#00FFB7]/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#F8F8FF] mb-2 flex items-center gap-2">
                        <span className="text-[#00FFB7]">🎯</span>
                        {resource.title}
                      </h3>
                      <p className="text-[#C8BCD1] mb-3">{resource.description}</p>
                      <span className="px-2 py-1 rounded text-xs font-semibold bg-[#FFEF00]/20 text-[#FFEF00] border border-[#FFEF00]/30">
                        {resource.status}
                      </span>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-[#00FFB7] to-[#00FFF7] text-[#121B30] rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00FFB7]/30 transition-all duration-300">
                      Coming Soon
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default GuruPage; 