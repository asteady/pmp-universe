'use client';

import React, { useState } from 'react';

type Deal = {
  id: string;
  name: string;
  type: string;
  category: string;
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
};

const tabList = [
  'Overview',
  'Audiences',
  'Survey Signals',
  'Creative Examples',
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Evergreen': return 'bg-green-500';
      case 'Seasonal': return 'bg-blue-500';
      case 'Custom': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeGradient = (type: string) => {
    switch (type) {
      case 'Evergreen': return 'from-green-500 to-green-600';
      case 'Seasonal': return 'from-blue-500 to-blue-600';
      case 'Custom': return 'from-purple-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 group">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getTypeColor(deal.type)}`}>
              {deal.type}
            </span>
            <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded font-mono">
              {deal.dealId}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
          {deal.name}
        </h3>

        {/* Infillion Advantage */}
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-4 mb-4 border border-purple-500/30">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">👑</span>
            </div>
            <span className="text-sm font-semibold text-white">Infillion Advantage</span>
          </div>
          <div className="flex gap-2">
            <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs border border-blue-500/30">
              Interactive Creative
            </span>
            <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs border border-purple-500/30">
              Free Foot Traffic
            </span>
          </div>
        </div>

        {/* Key Feature */}
        <div className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-lg p-4 mb-4 border border-amber-500/30">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">🏆</span>
            </div>
            <span className="text-sm font-semibold text-white">{deal.category}</span>
          </div>
          <p className="text-slate-300 text-sm mb-2">{deal.description.substring(0, 120)}...</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">{deal.scale}</span>
            <span className={`px-2 py-1 rounded text-xs font-semibold text-white ${getTypeColor(deal.type)}`}>
              {deal.type}
            </span>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-white">Key Benefits</span>
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
          <ul className="text-xs text-slate-300 space-y-1">
            <li>• {deal.scale} for scale</li>
            <li>• {deal.vcr} VCR guarantee</li>
            <li>• {deal.ctr} CTR performance</li>
            <li>• +3 more benefits</li>
          </ul>
        </div>

        {/* Formats & Platforms */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-white">Formats & Platforms</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {deal.formats.slice(0, 3).map((format, index) => (
              <span key={index} className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                {format}
              </span>
            ))}
            {deal.formats.length > 3 && (
              <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">
                +{deal.formats.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Interactive Creative Examples */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-white">Interactive Creative Examples</span>
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <p className="text-xs text-slate-400">
            {deal.creativeExamples.slice(0, 3).join(' • ')} & more
          </p>
        </div>

        {/* View Details Button */}
        <button 
          onClick={() => setOpen(true)}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-blue-500/25"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View Details
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-slate-700">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${getTypeColor(deal.type)}`}>
                    {deal.type}
                  </span>
                  <h2 className="text-2xl font-bold text-white">{deal.name}</h2>
                </div>
                <button 
                  onClick={() => setOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-slate-300 mt-2">{deal.description}</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-700">
              {tabList.map((tabName) => (
                <button
                  key={tabName}
                  onClick={() => setTab(tabName)}
                  className={`px-6 py-4 font-semibold transition-all duration-200 border-b-2 ${
                    tab === tabName
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-slate-400 hover:text-slate-300'
                  }`}
                >
                  {tabName}
                </button>
              ))}
            </div>

            {/* Value Props */}
            <div className="p-6 border-b border-slate-700">
              <div className="flex flex-wrap gap-2">
                {valueProps.map((vp) => (
                  <span key={vp} className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm font-semibold border border-green-500/30">
                    ✅ {vp}
                  </span>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {tab === 'Overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-800 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-white mb-3">Scale & Reach</h4>
                      <p className="text-slate-300">{deal.scale}</p>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-white mb-3">Performance</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-400">VCR:</span>
                          <span className="text-white font-semibold">{deal.performance.vcr}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">CTR:</span>
                          <span className="text-white font-semibold">{deal.performance.ctr}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">eCPM:</span>
                          <span className="text-white font-semibold">{deal.performance.ecpm}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-3">Use Cases</h4>
                    <p className="text-slate-300">Ideal for brands looking to {deal.category.toLowerCase()} with {deal.type.toLowerCase()} performance and {deal.scale.toLowerCase()} scale.</p>
                  </div>
                </div>
              )}

              {tab === 'Audiences' && (
                <div className="space-y-6">
                  <div className="bg-slate-800 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-3">Targeting Signals</h4>
                    <div className="flex flex-wrap gap-2">
                      {deal.targeting.map((target, index) => (
                        <span key={index} className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded text-sm">
                          {target}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-3">Location Targeting</h4>
                    <p className="text-slate-300">Polygon geofencing for relevant venues, retail locations, and behavioral hotspots.</p>
                  </div>
                </div>
              )}

              {tab === 'Survey Signals' && (
                <div className="space-y-6">
                  <div className="bg-slate-800 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-3">TrueX Survey Questions</h4>
                    <div className="space-y-3">
                      <div className="bg-slate-700 rounded p-3">
                        <span className="text-blue-400 font-semibold">1.</span>
                        <span className="text-slate-300 ml-2">What's your primary interest in this category?</span>
                      </div>
                      <div className="bg-slate-700 rounded p-3">
                        <span className="text-blue-400 font-semibold">2.</span>
                        <span className="text-slate-300 ml-2">Where do you prefer to shop for these products?</span>
                      </div>
                      <div className="bg-slate-700 rounded p-3">
                        <span className="text-blue-400 font-semibold">3.</span>
                        <span className="text-slate-300 ml-2">What influences your purchasing decisions?</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {tab === 'Creative Examples' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {deal.creativeExamples.map((example, index) => (
                      <div key={index} className="bg-slate-800 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-white mb-3">{example}</h4>
                        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded p-3 border border-blue-500/30">
                          <p className="text-slate-300 text-sm">Interactive preview coming soon...</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === 'Performance' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-800 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-400">{deal.performance.vcr}</div>
                      <div className="text-slate-400 text-sm">Video Completion Rate</div>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-400">{deal.performance.ctr}</div>
                      <div className="text-slate-400 text-sm">Click-Through Rate</div>
                    </div>
                    <div className="bg-slate-800 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-400">{deal.performance.ecpm}</div>
                      <div className="text-slate-400 text-sm">Effective CPM</div>
                    </div>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-3">Channel & Device Mix</h4>
                    <p className="text-slate-300">Optimized across {deal.formats.join(', ')} with device-specific creative adaptations.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-700 flex gap-4">
              <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200">
                Copy Deal ID
              </button>
              <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200">
                Request Media Kit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DealCard; 