import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Deal = any; // Replace with the correct Deal type from pmpData if available

// Subcategory color mapping
const subcategoryColors: Record<string, string> = {
  Sensitive: 'bg-red-600 text-white',
  Performance: 'bg-yellow-400 text-gray-900',
  'Arts & Entertainment': 'bg-purple-600 text-white',
  Automotive: 'bg-blue-600 text-white',
  Shopping: 'bg-green-600 text-white',
  // Add more as needed
};

const badgeColors: Record<string, string> = {
  Evergreen: 'bg-gradient-to-r from-[#00FFB7] to-[#00FFF7] text-[#121B30]',
  Seasonal: 'bg-gradient-to-r from-[#FF3CAC] to-[#C77DFF] text-white',
  Custom: 'bg-gradient-to-r from-[#A239CA] to-[#C77DFF] text-white',
};

const PMPDealCardModal = ({ deal }: { deal: Deal }) => {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('Overview');
  const tabList = ['Overview', 'Data', 'Creatives', 'Performance'];

  // Helper for subcategory color
  const subcatClass = subcategoryColors[deal.subCategory] || 'bg-gray-500 text-white';
  const badgeClass = badgeColors[deal.type] || 'bg-gray-400 text-white';

  // Persona-driven survey questions (fallback if not present)
  const surveyQuestions = (deal.surveys && deal.surveys.length > 0)
    ? deal.surveys
    : [
        `What is your primary interest in ${deal.name}?`,
        `How often do you engage with ${deal.subCategory || deal.category}?`,
        `What influences your decision to purchase or participate?`,
      ];

  // POIs fallback
  const pois = deal.pois && deal.pois.length > 0 ? deal.pois : ['No POI data'];

  return (
    <>
      {/* Front of Card */}
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        className="bg-card rounded-xl p-4 border border-border transition-all duration-300 hover:shadow-2xl group min-h-[360px] max-h-[400px] min-w-[320px] max-w-[360px] flex flex-col justify-between"
      >
        {/* Badge + Subcategory */}
        <div className="flex items-center gap-2 mb-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeClass}`}>{deal.type}</span>
          {deal.subCategory && (
            <span className={`px-2 py-1 rounded text-xs font-semibold ${subcatClass}`}>{deal.subCategory}</span>
          )}
        </div>
        {/* Deal Name */}
        <h3 className="text-2xl font-bold text-center text-foreground mb-2 truncate" title={deal.name}>{deal.name}</h3>
        {/* Unique Monthly Reach */}
        <div className="flex justify-center mb-2">
          <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-semibold border border-accent/30">{deal.scale}</span>
        </div>
        {/* Description */}
        <p className="text-foreground text-sm leading-relaxed mb-2 max-h-16 overflow-hidden text-ellipsis" title={deal.description}>{deal.description}</p>
        {/* POIs */}
        <div className="flex gap-2 mb-4 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-accent/40 scrollbar-track-muted/20">
          {pois.map((poi: string, idx: number) => (
            <span key={idx} className="flex items-center gap-1 px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium border border-accent/30" title={poi}>{poi}</span>
          ))}
        </div>
        {/* View Details Button */}
        <button
          onClick={() => setOpen(true)}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-cyan-400 hover:to-blue-500 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-blue-400/30"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View Details
        </button>
      </motion.div>

      {/* Modal for Details */}
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
              className="bg-card rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto border border-border"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${badgeClass}`}>{deal.type}</span>
                  {deal.subCategory && (
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${subcatClass}`}>{deal.subCategory}</span>
                  )}
                  <h2 className="text-2xl font-bold text-foreground ml-4">{deal.name}</h2>
                </div>
                <button onClick={() => setOpen(false)} className="text-muted hover:text-foreground transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* Tabs */}
              <div className="flex border-b border-border">
                {tabList.map(tabName => (
                  <button
                    key={tabName}
                    onClick={() => setTab(tabName)}
                    className={`px-6 py-4 font-semibold transition-all duration-300 border-b-2 ${tab === tabName ? 'border-blue-400 text-blue-400' : 'border-transparent text-muted hover:text-foreground'}`}
                    title={tabName}
                    aria-label={`${tabName} tab`}
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
                      <div className="bg-muted/10 rounded-lg p-4 border border-border">
                        <h4 className="text-lg font-semibold text-foreground mb-3">Scale & Reach</h4>
                        <p className="text-muted">{deal.scale}</p>
                      </div>
                      <div className="bg-muted/10 rounded-lg p-4 border border-border">
                        <h4 className="text-lg font-semibold text-foreground mb-3">Performance</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted">VCR:</span>
                            <span className="text-foreground font-semibold">{deal.performance?.vcr}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted">CTR:</span>
                            <span className="text-foreground font-semibold">{deal.performance?.ctr}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted">eCPM:</span>
                            <span className="text-foreground font-semibold">{deal.performance?.ecpm}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-muted/10 rounded-lg p-4 border border-border">
                      <h4 className="text-lg font-semibold text-foreground mb-3">Use Cases</h4>
                      <p className="text-muted">Ideal for brands looking to {deal.category?.toLowerCase()} with {deal.type?.toLowerCase()} performance and {deal.scale?.toLowerCase()} scale.</p>
                    </div>
                  </div>
                )}
                {tab === 'Data' && (
                  <div className="space-y-6">
                    <div className="bg-muted/10 rounded-lg p-4 border border-border">
                      <h4 className="text-lg font-semibold text-foreground mb-3">Targeting Signals</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {deal.targeting?.length ? deal.targeting.map((target: string, index: number) => (
                          <span key={index} className="bg-gradient-to-r from-blue-400/20 to-cyan-400/20 text-blue-400 px-3 py-1 rounded text-sm border border-blue-400/30">{target}</span>
                        )) : <span className="text-muted">No targeting data</span>}
                      </div>
                      {/* POIs */}
                      {pois.length ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          {pois.map((poi: string, index: number) => (
                            <div key={index} className="bg-muted/20 rounded p-3 border border-border">
                              <h5 className="text-foreground font-semibold mb-2">POI</h5>
                              <p className="text-muted text-sm">{poi}</p>
                            </div>
                          ))}
                        </div>
                      ) : <span className="text-muted">No POI data</span>}
                    </div>
                    {/* Survey Questions */}
                    <div className="bg-muted/10 rounded-lg p-4 border border-border">
                      <h4 className="text-lg font-semibold text-foreground mb-3">Survey Questions</h4>
                      <div className="space-y-3">
                        {surveyQuestions.map((question: string, index: number) => (
                          <div key={index} className="bg-muted/20 rounded p-3 border border-border">
                            <span className="text-blue-400 font-semibold">{index + 1}.</span>
                            <span className="text-muted ml-2">{question}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {tab === 'Creatives' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {deal.creativeExamples?.length ? deal.creativeExamples.slice(0, 2).map((creative: string, index: number) => (
                        <div key={index} className="bg-muted/10 rounded-lg p-4 border border-border">
                          <h4 className="text-lg font-semibold text-foreground mb-3">Creative Example</h4>
                          <p className="text-muted text-sm mb-3">{creative}</p>
                        </div>
                      )) : <span className="text-muted">No creative examples</span>}
                    </div>
                    {/* Additional Creative Examples */}
                    {deal.creativeExamples?.length > 2 && (
                      <div className="bg-muted/10 rounded-lg p-4 border border-border">
                        <h4 className="text-lg font-semibold text-foreground mb-3">Creative Formats</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {deal.creativeExamples.slice(2).map((creative: string, index: number) => (
                            <div key={index} className="bg-muted/20 rounded p-3 border border-border">
                              <h5 className="text-foreground font-semibold mb-2">Creative Example</h5>
                              <p className="text-muted text-sm mb-2">{creative}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {tab === 'Performance' && (
                  <div className="space-y-6">
                    <div className="bg-muted/10 rounded-lg p-4 border border-border">
                      <h4 className="text-lg font-semibold text-foreground mb-3">Channel & Device Mix</h4>
                      <p className="text-muted mb-4">Optimized across Video, Display, Audio, dOOH, and Native with device-specific dynamic creative adaptations for CTV, Mobile, Digital Signage, Desktop, and more.</p>
                      {/* Example: show available formats and devices */}
                      <div className="flex flex-wrap gap-2 mb-2">
                        {deal.formats?.map((fmt: string, idx: number) => (
                          <span key={idx} className="bg-accent/10 text-accent px-3 py-1 rounded text-xs border border-accent/30">{fmt}</span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {deal.devices?.map((dev: string, idx: number) => (
                          <span key={idx} className="bg-muted/20 text-muted px-3 py-1 rounded text-xs border border-border">{dev}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PMPDealCardModal; 