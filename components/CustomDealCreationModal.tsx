'use client';

import React, { useState } from 'react';

const ssps = [
  { name: 'OpenX', icon: '🔵', status: 'Active' },
  { name: 'Nexxen', icon: '🟢', status: 'Active' },
  { name: 'Beachfront', icon: '🟡', status: 'Active' },
  { name: 'Magnite', icon: '🟣', status: 'Active' },
  { name: 'Index', icon: '🟠', status: 'Active' },
  { name: 'AdsWizz', icon: '🔴', status: 'Active' },
  { name: 'Nativo', icon: '⚪', status: 'Active' }
];

const dsps = [
  { name: 'The Trade Desk', icon: '🎯', status: 'Compatible' },
  { name: 'DV360', icon: '📊', status: 'Compatible' },
  { name: 'MediaMath', icon: '🧮', status: 'Compatible' },
  { name: 'Xandr', icon: '🔗', status: 'Compatible' },
  { name: 'Amazon DSP', icon: '📦', status: 'Compatible' }
];

const CustomDealCreationModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [selectedSSPs, setSelectedSSPs] = useState<string[]>([]);
  const [selectedDSP, setSelectedDSP] = useState('');
  const [dealName, setDealName] = useState('');
  const [dealType, setDealType] = useState('');
  const [targeting, setTargeting] = useState('');
  const [generatedDealId, setGeneratedDealId] = useState('');

  const generateDealId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    const sspPrefix = selectedSSPs.length > 0 ? selectedSSPs[0].toLowerCase() : 'custom';
    return `infil-${sspPrefix}-${dealType.toLowerCase()}-${timestamp}-${random}`;
  };

  const handleSSPToggle = (sspName: string) => {
    setSelectedSSPs(prev => 
      prev.includes(sspName) 
        ? prev.filter(s => s !== sspName)
        : [...prev, sspName]
    );
  };

  const handleNext = () => {
    if (step === 1 && selectedSSPs.length > 0) {
      setStep(2);
    } else if (step === 2 && selectedDSP && dealName && dealType) {
      setGeneratedDealId(generateDealId());
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const copyDealId = () => {
    navigator.clipboard.writeText(generatedDealId);
    // You could add a toast notification here
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-slate-700">
        {/* Header */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">🎯</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Custom Deal Creation</h2>
                <p className="text-slate-300">Create your perfect PMP deal with automated SSP integration</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  step >= stepNumber 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                    : 'bg-slate-700 text-slate-400'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                    step > stepNumber ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-slate-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className={`${step >= 1 ? 'text-blue-400' : 'text-slate-500'}`}>Select SSPs</span>
            <span className={`${step >= 2 ? 'text-blue-400' : 'text-slate-500'}`}>Configure Deal</span>
            <span className={`${step >= 3 ? 'text-blue-400' : 'text-slate-500'}`}>Generate Deal ID</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Step 1: Select SSP Partners</h3>
                <p className="text-slate-300 mb-6">Choose which SSPs you want to activate your custom deal on. Each selection will be automatically configured for optimal performance.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ssps.map((ssp) => (
                  <div
                    key={ssp.name}
                    onClick={() => handleSSPToggle(ssp.name)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      selectedSSPs.includes(ssp.name)
                        ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/25'
                        : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{ssp.icon}</span>
                      <div>
                        <h4 className="font-semibold text-white">{ssp.name}</h4>
                        <span className="text-sm text-green-400">{ssp.status}</span>
                      </div>
                    </div>
                    {selectedSSPs.includes(ssp.name) && (
                      <div className="mt-3 p-2 bg-blue-500/20 rounded-lg">
                        <p className="text-xs text-blue-300">✓ Auto-configured for optimal performance</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg p-4 border border-green-500/30">
                <h4 className="text-green-400 font-semibold mb-2">🚀 Automated Integration</h4>
                <p className="text-slate-300 text-sm">
                  Selected SSPs will be automatically configured with your deal parameters, 
                  targeting options, and performance optimization settings.
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Step 2: Configure Your Deal</h3>
                <p className="text-slate-300 mb-6">Set up your deal parameters and select your preferred DSP for activation.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Deal Name</label>
                    <input
                      type="text"
                      value={dealName}
                      onChange={(e) => setDealName(e.target.value)}
                      placeholder="Enter your deal name..."
                      className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Deal Type</label>
                    <select
                      value={dealType}
                      onChange={(e) => setDealType(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">Select deal type...</option>
                      <option value="Performance">Performance</option>
                      <option value="Brand">Brand</option>
                      <option value="Awareness">Awareness</option>
                      <option value="Conversion">Conversion</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Targeting Description</label>
                    <textarea
                      value={targeting}
                      onChange={(e) => setTargeting(e.target.value)}
                      placeholder="Describe your targeting requirements..."
                      rows={3}
                      className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-4">Select DSP for Activation</label>
                  <div className="space-y-3">
                    {dsps.map((dsp) => (
                      <div
                        key={dsp.name}
                        onClick={() => setSelectedDSP(dsp.name)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                          selectedDSP === dsp.name
                            ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/25'
                            : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{dsp.icon}</span>
                          <div>
                            <h4 className="font-semibold text-white">{dsp.name}</h4>
                            <span className="text-sm text-green-400">{dsp.status}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg p-4 border border-purple-500/30">
                <h4 className="text-purple-400 font-semibold mb-2">⚡ Instant Activation</h4>
                <p className="text-slate-300 text-sm">
                  Your deal will be automatically configured for {selectedDSP || 'selected DSP'} 
                  with all necessary parameters and targeting options.
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Step 3: Your Deal is Ready!</h3>
                <p className="text-slate-300 mb-6">Your custom PMP deal has been created and is ready for activation across all selected platforms.</p>
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-6 border border-green-500/30">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-green-400 font-semibold text-lg">Generated Deal ID</h4>
                  <button
                    onClick={copyDealId}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </button>
                </div>
                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                  <code className="text-blue-400 font-mono text-lg break-all">{generatedDealId}</code>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-800 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-3">✅ SSP Integration Complete</h5>
                  <ul className="text-slate-300 text-sm space-y-2">
                    {selectedSSPs.map(ssp => (
                      <li key={ssp} className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        {ssp} - Auto-configured
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-800 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-3">🎯 DSP Ready</h5>
                  <div className="text-slate-300 text-sm">
                    <p className="mb-2"><strong>DSP:</strong> {selectedDSP}</p>
                    <p className="mb-2"><strong>Deal Type:</strong> {dealType}</p>
                    <p><strong>Status:</strong> Ready for activation</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4 border border-blue-500/30">
                <h4 className="text-blue-400 font-semibold mb-2">🚀 Next Steps</h4>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• Copy the Deal ID above</li>
                  <li>• Paste into your {selectedDSP} campaign</li>
                  <li>• Your deal is automatically optimized across all selected SSPs</li>
                  <li>• Real-time performance monitoring available</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-700 flex justify-between">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors"
            >
              Back
            </button>
          )}
          
          <div className="flex gap-4 ml-auto">
            {step < 3 ? (
              <button
                onClick={handleNext}
                disabled={
                  (step === 1 && selectedSSPs.length === 0) ||
                  (step === 2 && (!selectedDSP || !dealName || !dealType))
                }
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all duration-200"
              >
                {step === 2 ? 'Generate Deal ID' : 'Next'}
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg font-semibold transition-all duration-200"
              >
                Done
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDealCreationModal; 