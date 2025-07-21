'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Deal = {
  id: string;
  name: string;
  type: string;
  category: string;
  subCategory?: string;
  description: string;
  scale: string;
  vcr: string;
  ctr: string;
  dealId: string;
  formats: string[];
  creativeExamples: string[];
  targeting: string[];
  performance: {
    vcr: string;
    ctr: string;
    ecpm: string;
  };
  // Enhanced properties for better search and display
  ssp?: string;
  dsp?: string;
  keyBenefits?: string[];
  devices?: string[];
  placements?: string[];
  surveys?: string[];
  seasonal?: string[];
  tentpole?: string[];
};

const tabList = [
  'Overview',
  'Data',
  'Creatives',
  'Performance',
];

const valueProps = [
  'Self-Serve Ready',
  'Creative Flexibility',
  'High-Value Targeting',
  'Omni-Channel Support',
  'Attribution Built-In',
  'Insight-Driven',
];

const DealCard = ({ deal }: { deal: Deal }) => {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(tabList[0]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['Video']);
  const [selectedDevices, setSelectedDevices] = useState<string[]>(['CTV']);
  const [selectedGeos, setSelectedGeos] = useState<string[]>(['California']);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Evergreen': return 'from-[#00FFB7] to-[#00FFF7]';
      case 'Seasonal': return 'from-[#FF3CAC] to-[#C77DFF]';
      case 'Custom': return 'from-[#A239CA] to-[#C77DFF]';
      default: return 'from-[#1B6CA8] to-[#00FFF7]';
    }
  };

  const getTypeTextColor = (type: string) => {
    switch (type) {
      case 'Evergreen': return 'text-[#00FFB7]';
      case 'Seasonal': return 'text-[#FF3CAC]';
      case 'Custom': return 'text-[#A239CA]';
      default: return 'text-[#1B6CA8]';
    }
  };

  // Dynamic content based on deal name and audience
  const getDynamicContent = () => {
    const dealName = deal.name.toLowerCase();
    
    // Auto Intenders specific content
    if (dealName.includes('auto') || dealName.includes('car')) {
      return {
        poiExamples: [
          { title: 'Auto Dealerships', description: 'BMW, Mercedes, Toyota, Honda, Ford, Chevrolet' },
          { title: 'Auto Parts Stores', description: 'AutoZone, O\'Reilly, NAPA, Advance Auto Parts' },
          { title: 'Car Wash & Service', description: 'Jiffy Lube, Midas, Meineke, CarMax' }
        ],
        surveyQuestions: [
          'What type of vehicle are you currently shopping for?',
          'What is your preferred budget range for a new vehicle?',
          'How important is fuel efficiency in your car buying decision?',
          'What features are most important to you in a vehicle?',
          'When do you plan to purchase your next vehicle?'
        ],
        creativeExamples: [
          {
            title: 'Tap to Map',
            description: 'Find the closest auto dealer or take a peek inside the new Lexus RSX here...',
            preview: 'Interactive dealer locator with virtual showroom tours'
          },
          {
            title: 'QR Code Scan',
            description: 'Scan to explore the latest models and schedule a test drive',
            preview: 'Virtual test drive experience with 360° vehicle views'
          },
          {
            title: 'Interactive Video',
            description: 'Explore different trim levels and color options',
            preview: 'Interactive vehicle configurator with real-time pricing'
          },
          {
            title: 'Rich Media',
            description: 'Compare features and financing options',
            preview: 'Side-by-side vehicle comparison tool'
          },
          {
            title: 'Display',
            description: 'Special financing offers and lease deals',
            preview: 'Dynamic pricing and promotion banners'
          },
          {
            title: 'Audio',
            description: 'Hear the engine roar and experience the sound system',
            preview: 'Immersive audio experience with vehicle sounds'
          },
          {
            title: 'Native',
            description: 'Expert reviews and owner testimonials',
            preview: 'Native content integration with car reviews'
          }
        ]
      };
    }
    
    // Default content for other deals
    return {
      poiExamples: [
        { title: 'Carrier Stores', description: 'AT&T, Verizon, Boost, T-Mobile' },
        { title: 'Tech Retailers', description: 'Best Buy, Target, Walmart, Gamestop' },
        { title: 'Early Adopters', description: 'Amazon, Google, Apple HQ' }
      ],
      surveyQuestions: [
        'What\'s your primary interest in this category?',
        'Where do you prefer to shop for these products?',
        'What influences your purchasing decisions?',
        'How important is brand reputation to you?',
        'What is your typical budget for this category?'
      ],
      creativeExamples: [
        {
          title: 'Tap to Map',
          description: 'Find the closest store or retailer.',
          preview: 'Interactive store locator with directions'
        },
        {
          title: 'QR Code Scan',
          description: 'Bring the experience to your phone.',
          preview: 'Mobile-optimized interactive content'
        },
        {
          title: 'Interactive Video',
          description: 'Explore products and features.',
          preview: 'Interactive product demonstrations'
        },
        {
          title: 'Rich Media',
          description: 'Engage with dynamic content.',
          preview: 'Interactive banners and overlays'
        },
        {
          title: 'Display',
          description: 'Clear messaging and calls-to-action.',
          preview: 'High-impact display advertising'
        },
        {
          title: 'Audio',
          description: 'Listen to product information.',
          preview: 'Audio-enhanced brand messaging'
        },
        {
          title: 'Native',
          description: 'Seamless content integration.',
          preview: 'Native advertising solutions'
        }
      ]
    };
  };

  const dynamicContent = getDynamicContent();

  // Dynamic performance calculation based on selections
  const getPerformanceMetrics = () => {
    let vcr = 90;
    let ctr = 0.3;
    let acr = 0; // Audio Completion Rate
    let viewShed = 0; // View Shed Viewability Rate for dOOH
    
    // Adjust metrics based on channel selection
    if (selectedChannels.includes('Display')) {
      vcr = 0; // No VCR for Display
      ctr = 0.4;
    }
    if (selectedChannels.includes('Audio')) {
      vcr = 0; // No VCR for Audio
      ctr = 0.2;
      acr = 90; // Audio Completion Rate
    }
    if (selectedChannels.includes('dOOH')) {
      vcr = 0; // No VCR for dOOH
      ctr = 0; // No CTR for dOOH
      viewShed = 79; // View Shed Viewability Rate
    }
    
    let minBidRange = '$6-10';
    let avgECPM = '$3.96';
    
    if (selectedChannels.includes('Video') && selectedDevices.includes('CTV') && selectedGeos.includes('California')) {
      minBidRange = '$15-20';
      avgECPM = '$14.21';
    } else if (selectedChannels.includes('Video') && selectedDevices.includes('CTV')) {
      minBidRange = '$12-16';
      avgECPM = '$11.50';
    }
    
    return { vcr, ctr, acr, viewShed, minBidRange, avgECPM };
  };

  const { vcr, ctr, acr, viewShed, minBidRange, avgECPM } = getPerformanceMetrics();

  // Multi-select handlers
  const handleChannelToggle = (channel: string) => {
    setSelectedChannels(prev => 
      prev.includes(channel) 
        ? prev.filter(c => c !== channel)
        : [...prev, channel]
    );
  };

  const handleDeviceToggle = (device: string) => {
    setSelectedDevices(prev => 
      prev.includes(device) 
        ? prev.filter(d => d !== device)
        : [...prev, device]
    );
  };

  const handleGeoToggle = (geo: string) => {
    setSelectedGeos(prev => 
      prev.includes(geo) 
        ? prev.filter(g => g !== geo)
        : [...prev, geo]
    );
  };

  return (
    <>
      {/* Compact Front Card */}
      <motion.div 
        whileHover={{ scale: 1.02, y: -5 }}
        className="bg-gradient-to-br from-[#121B30] to-[#69101A] rounded-xl p-4 border border-[#1B6CA8]/30 hover:border-[#00FFB7]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#00FFB7]/20 group"
      >
        {/* Type Badge */}
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-[#121B30] bg-gradient-to-r ${getTypeColor(deal.type)}`}>
            {deal.type}
          </span>
        </div>

        {/* Deal Name */}
        <h3 className="text-lg font-bold text-[#F8F8FF] mb-3 group-hover:text-[#00FFB7] transition-colors">
          {deal.name}
        </h3>

        {/* Category Box */}
        <div className="bg-gradient-to-r from-[#1B6CA8]/20 to-[#00FFF7]/20 rounded-lg p-3 mb-4 border border-[#1B6CA8]/30">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-[#F8F8FF]">{deal.category}</span>
            {deal.subCategory && (
              <span className="text-xs text-[#A239CA] bg-[#A239CA]/20 px-2 py-1 rounded">
                {deal.subCategory}
              </span>
            )}
          </div>
          <p className="text-[#C8BCD1] text-sm mb-2">
            {deal.description.length > 100 ? `${deal.description.substring(0, 100)}...` : deal.description}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#A239CA]">{deal.scale}</span>
          </div>
        </div>

        {/* View Details Button */}
        <button 
          onClick={() => setOpen(true)}
          className="w-full bg-gradient-to-r from-[#00FFB7] to-[#00FFF7] hover:from-[#00FFF7] hover:to-[#00FFB7] text-[#121B30] py-2 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-[#00FFB7]/30"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View Details
        </button>
      </motion.div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-[#121B30] to-[#69101A] rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto border border-[#1B6CA8]/30"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-[#1B6CA8]/30">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold text-[#121B30] bg-gradient-to-r ${getTypeColor(deal.type)}`}>
                      {deal.type}
                    </span>
                    <h2 className="text-2xl font-bold text-[#F8F8FF]">{deal.name}</h2>
                  </div>
                  <button 
                    onClick={() => setOpen(false)}
                    className="text-[#C8BCD1] hover:text-[#F8F8FF] transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-[#C8BCD1] mt-2">{deal.description}</p>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-[#1B6CA8]/30">
                {tabList.map((tabName) => (
                  <button
                    key={tabName}
                    onClick={() => setTab(tabName)}
                    className={`px-6 py-4 font-semibold transition-all duration-300 border-b-2 ${
                      tab === tabName
                        ? 'border-[#00FFB7] text-[#00FFB7]'
                        : 'border-transparent text-[#C8BCD1] hover:text-[#F8F8FF]'
                    }`}
                  >
                    {tabName}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {tab === 'Overview' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-[#1B6CA8]/10 rounded-lg p-4 border border-[#1B6CA8]/30">
                        <h4 className="text-lg font-semibold text-[#F8F8FF] mb-3">Scale & Reach</h4>
                        <p className="text-[#C8BCD1]">{deal.scale}</p>
                      </div>
                      <div className="bg-[#1B6CA8]/10 rounded-lg p-4 border border-[#1B6CA8]/30">
                        <h4 className="text-lg font-semibold text-[#F8F8FF] mb-3">Performance</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-[#C8BCD1]">VCR:</span>
                            <span className="text-[#F8F8FF] font-semibold">{deal.performance.vcr}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#C8BCD1]">CTR:</span>
                            <span className="text-[#F8F8FF] font-semibold">{deal.performance.ctr}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#C8BCD1]">eCPM:</span>
                            <span className="text-[#F8F8FF] font-semibold">{deal.performance.ecpm}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#1B6CA8]/10 rounded-lg p-4 border border-[#1B6CA8]/30">
                      <h4 className="text-lg font-semibold text-[#F8F8FF] mb-3">Use Cases</h4>
                      <p className="text-[#C8BCD1]">Ideal for brands looking to {deal.category.toLowerCase()} with {deal.type.toLowerCase()} performance and {deal.scale.toLowerCase()} scale.</p>
                    </div>
                  </div>
                )}

                {tab === 'Data' && (
                  <div className="space-y-6">
                    <div className="bg-[#1B6CA8]/10 rounded-lg p-4 border border-[#1B6CA8]/30">
                      <h4 className="text-lg font-semibold text-[#F8F8FF] mb-3">Targeting Signals</h4>
                      <p className="text-[#C8BCD1] mb-3">Polygonal Geofencing Technology of POIs (Gimbal Location SDK)</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {deal.targeting.map((target, index) => (
                          <span key={index} className="bg-gradient-to-r from-[#00FFB7]/20 to-[#00FFF7]/20 text-[#00FFB7] px-3 py-1 rounded text-sm border border-[#00FFB7]/30">
                            {target}
                          </span>
                        ))}
                      </div>
                      
                      {/* Dynamic POI Examples */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        {dynamicContent.poiExamples.map((poi, index) => (
                          <div key={index} className="bg-[#1B6CA8]/20 rounded p-3 border border-[#1B6CA8]/30">
                            <h5 className="text-[#F8F8FF] font-semibold mb-2">{poi.title}</h5>
                            <p className="text-[#C8BCD1] text-sm">{poi.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-[#1B6CA8]/10 rounded-lg p-4 border border-[#1B6CA8]/30">
                      <h4 className="text-lg font-semibold text-[#F8F8FF] mb-3">Survey Questions</h4>
                      <p className="text-[#C8BCD1] mb-3">TrueX Ads SDK</p>
                      <div className="space-y-3">
                        {dynamicContent.surveyQuestions.map((question, index) => (
                          <div key={index} className="bg-[#1B6CA8]/20 rounded p-3 border border-[#1B6CA8]/30">
                            <span className="text-[#00FFB7] font-semibold">{index + 1}.</span>
                            <span className="text-[#C8BCD1] ml-2">{question}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {tab === 'Creatives' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {dynamicContent.creativeExamples.slice(0, 2).map((creative, index) => (
                        <div key={index} className="bg-[#1B6CA8]/10 rounded-lg p-4 border border-[#1B6CA8]/30">
                          <h4 className="text-lg font-semibold text-[#F8F8FF] mb-3">{creative.title}</h4>
                          <p className="text-[#C8BCD1] text-sm mb-3">{creative.description}</p>
                          <div className="bg-gradient-to-r from-[#FF3CAC]/20 to-[#C77DFF]/20 rounded p-3 border border-[#FF3CAC]/30">
                            <p className="text-[#C8BCD1] text-sm">{creative.preview}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Additional Creative Examples */}
                    <div className="bg-[#1B6CA8]/10 rounded-lg p-4 border border-[#1B6CA8]/30">
                      <h4 className="text-lg font-semibold text-[#F8F8FF] mb-3">Creative Formats</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {dynamicContent.creativeExamples.slice(2).map((creative, index) => (
                          <div key={index} className="bg-[#1B6CA8]/20 rounded p-3 border border-[#1B6CA8]/30">
                            <h5 className="text-[#F8F8FF] font-semibold mb-2">{creative.title}</h5>
                            <p className="text-[#C8BCD1] text-sm mb-2">{creative.description}</p>
                            <p className="text-[#A239CA] text-xs">{creative.preview}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {tab === 'Performance' && (
                  <div className="space-y-6">
                    <div className="bg-[#1B6CA8]/10 rounded-lg p-4 border border-[#1B6CA8]/30">
                      <h4 className="text-lg font-semibold text-[#F8F8FF] mb-3">Channel & Device Mix</h4>
                      <p className="text-[#C8BCD1] mb-4">Optimized across Video, Display, Audio, dOOH, and Native with device-specific dynamic creative adaptations for CTV, Mobile, Digital Signage, Desktop, and more.</p>
                      
                      {/* Multi-select Performance Controls */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div>
                          <label className="text-[#C8BCD1] text-sm mb-2 block">Channels (Multi-select)</label>
                          <div className="space-y-2">
                            {['Video', 'Display', 'Audio', 'Native', 'dOOH'].map(channel => (
                              <label key={channel} className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={selectedChannels.includes(channel)}
                                  onChange={() => handleChannelToggle(channel)}
                                  className="mr-2"
                                />
                                <span className="text-[#F8F8FF] text-sm">{channel}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-[#C8BCD1] text-sm mb-2 block">Devices (Multi-select)</label>
                          <div className="space-y-2">
                            {['CTV', 'Mobile', 'Desktop', 'Digital Signage'].map(device => (
                              <label key={device} className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={selectedDevices.includes(device)}
                                  onChange={() => handleDeviceToggle(device)}
                                  className="mr-2"
                                />
                                <span className="text-[#F8F8FF] text-sm">{device}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-[#C8BCD1] text-sm mb-2 block">Geographies (Multi-select)</label>
                          <div className="space-y-2">
                            {['California', 'New York', 'Texas', 'Florida', 'Illinois', 'Pennsylvania', 'Ohio', 'Georgia', 'North Carolina', 'Michigan'].map(geo => (
                              <label key={geo} className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={selectedGeos.includes(geo)}
                                  onChange={() => handleGeoToggle(geo)}
                                  className="mr-2"
                                />
                                <span className="text-[#F8F8FF] text-sm">{geo}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Dynamic Performance Metrics with Slider Charts */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-[#1B6CA8]/20 rounded-lg p-4 text-center border border-[#1B6CA8]/30">
                          <div className="text-2xl font-bold text-[#00FFB7]">{vcr}%</div>
                          <div className="text-[#C8BCD1] text-sm">Video Completion Rate</div>
                          <div className="w-full bg-[#1B6CA8]/30 rounded-full h-2 mt-2">
                            <div className="bg-[#00FFB7] h-2 rounded-full" style={{ width: `${vcr}%` }}></div>
                          </div>
                        </div>
                        <div className="bg-[#1B6CA8]/20 rounded-lg p-4 text-center border border-[#1B6CA8]/30">
                          <div className="text-2xl font-bold text-[#FF3CAC]">{ctr}%</div>
                          <div className="text-[#C8BCD1] text-sm">Click-Through Rate</div>
                          <div className="w-full bg-[#1B6CA8]/30 rounded-full h-2 mt-2">
                            <div className="bg-[#FF3CAC] h-2 rounded-full" style={{ width: `${ctr * 100}%` }}></div>
                          </div>
                        </div>
                        {selectedChannels.includes('Audio') && (
                          <div className="bg-[#1B6CA8]/20 rounded-lg p-4 text-center border border-[#1B6CA8]/30">
                            <div className="text-2xl font-bold text-[#FFEF00]">{acr}%</div>
                            <div className="text-[#C8BCD1] text-sm">Audio Completion Rate</div>
                            <div className="w-full bg-[#1B6CA8]/30 rounded-full h-2 mt-2">
                              <div className="bg-[#FFEF00] h-2 rounded-full" style={{ width: `${acr}%` }}></div>
                            </div>
                          </div>
                        )}
                        {selectedChannels.includes('dOOH') && (
                          <div className="bg-[#1B6CA8]/20 rounded-lg p-4 text-center border border-[#1B6CA8]/30">
                            <div className="text-2xl font-bold text-[#A239CA]">{viewShed}%</div>
                            <div className="text-[#C8BCD1] text-sm">View Shed Viewability</div>
                            <div className="w-full bg-[#1B6CA8]/30 rounded-full h-2 mt-2">
                              <div className="bg-[#A239CA] h-2 rounded-full" style={{ width: `${viewShed}%` }}></div>
                            </div>
                          </div>
                        )}
                        <div className="bg-[#1B6CA8]/20 rounded-lg p-4 text-center border border-[#1B6CA8]/30">
                          <div className="text-2xl font-bold text-[#FFEF00]">{minBidRange}</div>
                          <div className="text-[#C8BCD1] text-sm">Min Bid Range ($CPM)</div>
                        </div>
                        <div className="bg-[#1B6CA8]/20 rounded-lg p-4 text-center border border-[#1B6CA8]/30">
                          <div className="text-2xl font-bold text-[#A239CA]">{avgECPM}</div>
                          <div className="text-[#C8BCD1] text-sm">Avg Effective $CPM</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Value Props - All on one line */}
              <div className="p-6 border-t border-[#1B6CA8]/30 bg-[#1B6CA8]/5">
                <div className="flex flex-wrap gap-2 mb-4 justify-center">
                  {valueProps.map((vp) => (
                    <span key={vp} className="bg-gradient-to-r from-[#00FFB7]/10 to-[#00FFF7]/10 text-[#00FFB7] px-3 py-1 rounded-full text-sm font-semibold border border-[#00FFB7]/30 whitespace-nowrap">
                      ✅ {vp}
                    </span>
                  ))}
                </div>
                
                {/* Modal Footer */}
                <div className="flex gap-4">
                  <button className="flex-1 bg-gradient-to-r from-[#00FFB7] to-[#00FFF7] hover:from-[#00FFF7] hover:to-[#00FFB7] text-[#121B30] py-3 px-6 rounded-lg font-semibold transition-all duration-300">
                    Copy Deal ID
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-[#FF3CAC] to-[#C77DFF] hover:from-[#C77DFF] hover:to-[#FF3CAC] text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300">
                    Request Media Kit
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DealCard; 