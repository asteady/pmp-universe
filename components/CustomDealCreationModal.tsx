'use client';

import React, { useState } from 'react';
import audienceTaxonomy from '../data/audienceTaxonomy.json';
import { createAsanaTask } from '../lib/asana';

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
  { name: 'Amazon DSP', icon: '📦', status: 'Compatible' },
  { name: 'Amobee', icon: '🟪', status: 'Compatible' },
  { name: 'Basis', icon: '🟫', status: 'Compatible' },
  { name: 'Adform', icon: '🟦', status: 'Compatible' },
  { name: 'StackAdapt', icon: '🟩', status: 'Compatible' },
  { name: 'Quantcast', icon: '🟧', status: 'Compatible' }
];

const geoOptions = [
  'USA', 'Canada', 'Mexico', 'Costa Rica', 'Brazil', 'Argentina', 'Peru', 'Colombia', 'Chile'
];

const creativeTypes = [
  'IDV', 'Rich Media', 'Display', 'Video', 'Native', 'Audio'
];

const viewabilityOptions = [
  '10% or higher', '20% or higher', '30% or higher', '40% or higher', '50% or higher', '60% or higher', '70% or higher', '80% or higher', '90% or higher'
];

const reportingOptions = [
  'Arrival Foot Traffic Attribution', 'Online Conversion Tracking'
];

const DEAL_REQUEST_SECTION_GID = process.env.ASANA_DEAL_REQUEST_SECTION_GID || '1209264958990943';

const CustomDealCreationModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [selectedSSPs, setSelectedSSPs] = useState<string[]>([]);
  const [selectedDSP, setSelectedDSP] = useState('');
  const [dealName, setDealName] = useState('');
  const [dealType, setDealType] = useState('');
  const [targeting, setTargeting] = useState('');
  const [generatedDealId, setGeneratedDealId] = useState('');
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);
  const [customAudience, setCustomAudience] = useState('');
  const [advertiserName, setAdvertiserName] = useState('');
  const [dspSeatId, setDspSeatId] = useState('');
  const [selectedGeos, setSelectedGeos] = useState<string[]>([]);
  const [selectedCreative, setSelectedCreative] = useState('');
  const [selectedViewability, setSelectedViewability] = useState('');
  const [selectedReporting, setSelectedReporting] = useState<string[]>([]);
  const [publisherInclusion, setPublisherInclusion] = useState('');
  const [publisherExclusion, setPublisherExclusion] = useState('');
  // 1. Add Agency Name and Flighting to Step 1
  const [agencyName, setAgencyName] = useState('');
  const [flighting, setFlighting] = useState('');
  // 2. Add Device Types, Primary/Secondary Goal, Benchmarks, Evergreen & Seasonal, etc. to Step 3
  const [deviceTypes, setDeviceTypes] = useState<string[]>([]);
  const [primaryGoal, setPrimaryGoal] = useState('');
  const [primaryGoalBenchmark, setPrimaryGoalBenchmark] = useState('');
  const [secondaryKPI, setSecondaryKPI] = useState('');
  const [secondaryKPIBenchmark, setSecondaryKPIBenchmark] = useState('');
  const [evergreenSeasonal, setEvergreenSeasonal] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);
    try {
      const formPayload = {
        agencyName,
        advertiserName,
        dealName,
        flighting,
        dsp: selectedDSP,
        dspSeatId,
        preferredSSP: selectedSSPs,
        infillionCreative: selectedCreative,
        customAudience,
        audienceTaxonomy: selectedAudiences,
        evergreenSeasonal,
        primaryGoal,
        primaryGoalBenchmark,
        secondaryKPI,
        secondaryKPIBenchmark,
        deviceTypes,
        geos: selectedGeos,
        otherTargeting: targeting,
        publisherInclusion,
        publisherExclusion,
        reporting: selectedReporting,
        // Add any additional fields as needed
      };
      await createAsanaTask(formPayload, { sectionGid: DEAL_REQUEST_SECTION_GID });
      setSubmitSuccess(true);
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to submit to Asana.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-border">
        {/* Header */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-foreground text-lg">🎯</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Custom Deal Creation</h2>
                <p className="text-muted">Create your perfect PMP deal with automated SSP integration</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-muted hover:text-foreground transition-colors"
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
              {/* Agency Name */}
              <div>
                <label htmlFor="agencyName" className="block text-sm font-semibold text-white mb-2">Agency Name</label>
                <input
                  type="text"
                  id="agencyName"
                  value={agencyName}
                  onChange={e => setAgencyName(e.target.value)}
                  placeholder="Enter agency name..."
                  className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none"
                  aria-required="true"
                  aria-label="Agency Name"
                />
                {agencyName === '' && (
                  <p className="text-red-500 text-xs mt-1" role="alert">Agency Name is required.</p>
                )}
              </div>
              {/* Advertiser Name(s) */}
              <div>
                <label htmlFor="advertiserName" className="block text-sm font-semibold text-white mb-2">Advertiser Name(s)?</label>
                <input
                  type="text"
                  id="advertiserName"
                  value={advertiserName}
                  onChange={e => setAdvertiserName(e.target.value)}
                  placeholder="Enter advertiser name(s)..."
                  className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none"
                  aria-label="Advertiser Name(s)"
                />
                {advertiserName === '' && (
                  <p className="text-red-500 text-xs mt-1" role="alert">Advertiser Name(s) is required.</p>
                )}
              </div>
              {/* Deal Name */}
              <div>
                <label htmlFor="dealName" className="block text-sm font-semibold text-white mb-2">Please name this Deal</label>
                <input
                  type="text"
                  id="dealName"
                  value={dealName}
                  onChange={(e) => setDealName(e.target.value)}
                  placeholder="I.e., The Best Deal Ever Launch Q3 2025, Agentic Pokémon Nintendo Anthropic Collab, etc."
                  className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none"
                  aria-required="true"
                  aria-label="Deal Name"
                />
                {dealName === '' && (
                  <p className="text-red-500 text-xs mt-1" role="alert">Deal Name is required.</p>
                )}
              </div>
              {/* Flighting */}
              <div>
                <label htmlFor="flighting" className="block text-sm font-semibold text-white mb-2">Flighting</label>
                <input
                  type="text"
                  id="flighting"
                  value={flighting}
                  onChange={e => setFlighting(e.target.value)}
                  placeholder="To ensure we keep the Deal activated & consistently refreshed"
                  className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none"
                  aria-required="true"
                  aria-label="Flighting"
                />
                {flighting === '' && (
                  <p className="text-red-500 text-xs mt-1" role="alert">Flighting is required.</p>
                )}
              </div>
              {/* DSP(s), DSP (Other) Name, DSP Seat ID, Preferred SSP(s), Infillion Curated Creative */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {/* Audience Taxonomy Multi-Select */}
                  <div>
                    <label htmlFor="selectedAudiences" className="block text-sm font-semibold text-white mb-2">Select Infillion Audiences</label>
                    <div className="space-y-2">
                      {audienceTaxonomy.map((aud) => (
                        <label key={aud.id} className="flex items-start gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedAudiences.includes(aud.id)}
                            onChange={() => setSelectedAudiences(prev => prev.includes(aud.id) ? prev.filter(a => a !== aud.id) : [...prev, aud.id])}
                            className="mt-1 accent-blue-500"
                            aria-label={`Select ${aud.name}`}
                          />
                          <div>
                            <span className="font-medium text-white">{aud.name}</span>
                            <span className="block text-xs text-slate-400">{aud.description}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                    {selectedAudiences.length === 0 && (
                      <p className="text-red-500 text-xs mt-1" role="alert">At least one Infillion Audience is required.</p>
                    )}
                  </div>
                  {/* Custom Audience Input */}
                  <div>
                    <label htmlFor="customAudience" className="block text-sm font-semibold text-white mb-2">Custom Audience (optional)</label>
                    <textarea
                      id="customAudience"
                      value={customAudience}
                      onChange={e => setCustomAudience(e.target.value)}
                      placeholder="Describe custom audiences, POIs, dwell time, frequency, survey questions, custom metrics, retargeting, etc."
                      rows={2}
                      className="w-full px-4 py-2 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none"
                      aria-label="Custom Audience Description"
                    />
                    {customAudience === '' && (
                      <p className="text-red-500 text-xs mt-1" role="alert">Custom Audience Description is required if custom audiences are selected.</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="dealType" className="block text-sm font-semibold text-white mb-2">Deal Type</label>
                    <select
                      id="dealType"
                      value={dealType}
                      onChange={(e) => setDealType(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none"
                      aria-required="true"
                      aria-label="Deal Type"
                    >
                      <option value="">Select deal type...</option>
                      <option value="Performance">Performance</option>
                      <option value="Brand">Brand</option>
                      <option value="Awareness">Awareness</option>
                      <option value="Conversion">Conversion</option>
                    </select>
                    {dealType === '' && (
                      <p className="text-red-500 text-xs mt-1" role="alert">Deal Type is required.</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="targeting" className="block text-sm font-semibold text-white mb-2">Targeting Description</label>
                    <textarea
                      id="targeting"
                      value={targeting}
                      onChange={(e) => setTargeting(e.target.value)}
                      placeholder="Describe your targeting requirements..."
                      rows={3}
                      className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none"
                      aria-label="Targeting Description"
                    />
                    {targeting === '' && (
                      <p className="text-red-500 text-xs mt-1" role="alert">Targeting Description is required.</p>
                    )}
                  </div>
                </div>

                {/* Move SSP selection here (Execution Preferences) */}
                <div className="space-y-4 mt-8">
                  <label htmlFor="selectedSSPs" className="block text-sm font-semibold text-white mb-2">Select your SSP(s)</label>
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
                  {selectedSSPs.length === 0 && (
                    <p className="text-red-500 text-xs mt-1" role="alert">At least one SSP is required.</p>
                  )}
                </div>

                {/* DSP Selection */}
                <div>
                  <label htmlFor="selectedDSP" className="block text-sm font-semibold text-white mb-4">Select DSP for Activation</label>
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
                  {selectedDSP === '' && (
                    <p className="text-red-500 text-xs mt-1" role="alert">DSP for Activation is required.</p>
                  )}
                  {/* DSP Seat ID input (conditional) */}
                  {selectedDSP && (
                    <div className="mt-3">
                      <label htmlFor="dspSeatId" className="block text-xs font-semibold text-white mb-1">DSP Seat ID</label>
                      <input
                        type="text"
                        id="dspSeatId"
                        value={dspSeatId}
                        onChange={e => setDspSeatId(e.target.value)}
                        placeholder="Enter DSP Seat ID..."
                        className="w-full px-4 py-2 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-purple-500 focus:outline-none"
                        aria-label="DSP Seat ID"
                      />
                      {dspSeatId === '' && (
                        <p className="text-red-500 text-xs mt-1" role="alert">DSP Seat ID is required if a DSP is selected.</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Creative Type */}
                <div>
                  <label htmlFor="selectedCreative" className="block text-sm font-semibold text-white mb-2">Infillion Curated Creative</label>
                  <select
                    id="selectedCreative"
                    value={selectedCreative}
                    onChange={e => setSelectedCreative(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none"
                    aria-required="true"
                    aria-label="Creative Type"
                  >
                    <option value="">Select creative type...</option>
                    {creativeTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {selectedCreative === '' && (
                    <p className="text-red-500 text-xs mt-1" role="alert">Creative Type is required.</p>
                  )}
                </div>

                {/* Viewability */}
                <div>
                  <label htmlFor="selectedViewability" className="block text-sm font-semibold text-white mb-2">Viewability</label>
                  <select
                    id="selectedViewability"
                    value={selectedViewability}
                    onChange={e => setSelectedViewability(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none"
                    aria-required="true"
                    aria-label="Viewability"
                  >
                    <option value="">Select viewability...</option>
                    {viewabilityOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {selectedViewability === '' && (
                    <p className="text-red-500 text-xs mt-1" role="alert">Viewability is required.</p>
                  )}
                </div>

                {/* Reporting & Measurement */}
                <div>
                  <label htmlFor="selectedReporting" className="block text-sm font-semibold text-white mb-2">Reporting & Measurement</label>
                  <div className="flex flex-wrap gap-2">
                    {reportingOptions.map(opt => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedReporting.includes(opt)}
                          onChange={() => setSelectedReporting(prev => prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt])}
                          className="accent-blue-500"
                          aria-label={`Select ${opt}`}
                        />
                        <span className="text-slate-300 text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                  {selectedReporting.length === 0 && (
                    <p className="text-red-500 text-xs mt-1" role="alert">At least one reporting option is required.</p>
                  )}
                </div>

                {/* Publisher Inclusion/Exclusion */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="publisherInclusion" className="block text-sm font-semibold text-white mb-2">Publisher Inclusion (optional)</label>
                    <input
                      type="text"
                      id="publisherInclusion"
                      value={publisherInclusion}
                      onChange={e => setPublisherInclusion(e.target.value)}
                      placeholder="List publishers to include..."
                      className="w-full px-4 py-2 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none"
                      aria-label="Publisher Inclusion"
                    />
                  </div>
                  <div>
                    <label htmlFor="publisherExclusion" className="block text-sm font-semibold text-white mb-2">Publisher Exclusion (optional)</label>
                    <input
                      type="text"
                      id="publisherExclusion"
                      value={publisherExclusion}
                      onChange={e => setPublisherExclusion(e.target.value)}
                      placeholder="List publishers to exclude..."
                      className="w-full px-4 py-2 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none"
                      aria-label="Publisher Exclusion"
                    />
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

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Step 2: Configure Your Deal</h3>
                <p className="text-slate-300 mb-6">Set up your deal parameters and select your preferred DSP for activation.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {/* Custom Audience, Infillion Audience Taxonomy, Evergreen & Seasonal */}
                  {/* Custom Audience Input */}
                  <div>
                    <label htmlFor="customAudienceStep2" className="block text-sm font-semibold text-white mb-2">Custom Audience (optional)</label>
                    <textarea
                      id="customAudienceStep2"
                      value={customAudience}
                      onChange={e => setCustomAudience(e.target.value)}
                      placeholder="Describe custom audiences, POIs, dwell time, frequency, survey questions, custom metrics, retargeting, etc."
                      rows={2}
                      className="w-full px-4 py-2 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none"
                      aria-label="Custom Audience Description for Step 2"
                    />
                    {customAudience === '' && (
                      <p className="text-red-500 text-xs mt-1" role="alert">Custom Audience Description is required if custom audiences are selected.</p>
                    )}
                  </div>
                  {/* Audience Taxonomy Multi-Select */}
                  <div>
                    <label htmlFor="selectedAudiencesStep2" className="block text-sm font-semibold text-white mb-2">Select Infillion Audiences</label>
                    <div className="space-y-2">
                      {audienceTaxonomy.map((aud) => (
                        <label key={aud.id} className="flex items-start gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedAudiences.includes(aud.id)}
                            onChange={() => setSelectedAudiences(prev => prev.includes(aud.id) ? prev.filter(a => a !== aud.id) : [...prev, aud.id])}
                            className="mt-1 accent-blue-500"
                            aria-label={`Select ${aud.name}`}
                          />
                          <div>
                            <span className="font-medium text-white">{aud.name}</span>
                            <span className="block text-xs text-slate-400">{aud.description}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                    {selectedAudiences.length === 0 && (
                      <p className="text-red-500 text-xs mt-1" role="alert">At least one Infillion Audience is required.</p>
                    )}
                  </div>
                  {/* Evergreen & Seasonal */}
                  <div>
                    <label htmlFor="evergreenSeasonal" className="block text-sm font-semibold text-white mb-2">Evergreen & Seasonal</label>
                    <select
                      id="evergreenSeasonal"
                      multiple
                      value={evergreenSeasonal}
                      onChange={e => setEvergreenSeasonal(Array.from(e.target.selectedOptions, option => option.value))}
                      className="w-full px-4 py-2 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none"
                      aria-label="Evergreen and Seasonal Deals"
                    >
                      {/* TODO: Populate with deals from PMP Universe */}
                      <option value="Evergreen Example">Evergreen Example</option>
                      <option value="Seasonal Example">Seasonal Example</option>
                    </select>
                    {evergreenSeasonal.length === 0 && (
                      <p className="text-red-500 text-xs mt-1" role="alert">At least one Evergreen or Seasonal deal is required.</p>
                    )}
                  </div>
                </div>

                {/* Move SSP selection here (Execution Preferences) */}
                <div className="space-y-4 mt-8">
                  <label htmlFor="selectedSSPsStep2" className="block text-sm font-semibold text-white mb-2">Select your SSP(s)</label>
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
                  {selectedSSPs.length === 0 && (
                    <p className="text-red-500 text-xs mt-1" role="alert">At least one SSP is required.</p>
                  )}
                </div>

                {/* DSP Selection */}
                <div>
                  <label htmlFor="selectedDSPStep2" className="block text-sm font-semibold text-white mb-4">Select DSP for Activation</label>
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
                  {selectedDSP === '' && (
                    <p className="text-red-500 text-xs mt-1" role="alert">DSP for Activation is required.</p>
                  )}
                  {/* DSP Seat ID input (conditional) */}
                  {selectedDSP && (
                    <div className="mt-3">
                      <label htmlFor="dspSeatIdStep2" className="block text-xs font-semibold text-white mb-1">DSP Seat ID</label>
                      <input
                        type="text"
                        id="dspSeatIdStep2"
                        value={dspSeatId}
                        onChange={e => setDspSeatId(e.target.value)}
                        placeholder="Enter DSP Seat ID..."
                        className="w-full px-4 py-2 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-purple-500 focus:outline-none"
                        aria-label="DSP Seat ID"
                      />
                      {dspSeatId === '' && (
                        <p className="text-red-500 text-xs mt-1" role="alert">DSP Seat ID is required if a DSP is selected.</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Geo Multi-Select */}
                <div>
                  <label htmlFor="selectedGeos" className="block text-sm font-semibold text-white mb-2">Select Geos (North/Central/South America)</label>
                  <div className="flex flex-wrap gap-2">
                    {geoOptions.map(geo => (
                      <button
                        key={geo}
                        type="button"
                        onClick={() => setSelectedGeos(prev => prev.includes(geo) ? prev.filter(g => g !== geo) : [...prev, geo])}
                        className={`px-3 py-1 rounded-full border text-sm font-medium transition-colors ${
                          selectedGeos.includes(geo)
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                        }`}
                        aria-label={`Select ${geo}`}
                      >
                        {geo}
                      </button>
                    ))}
                  </div>
                  {selectedGeos.length === 0 && (
                    <p className="text-red-500 text-xs mt-1" role="alert">At least one Geo is required.</p>
                  )}
                </div>

                {/* Creative Type */}
                <div>
                  <label htmlFor="selectedCreativeStep2" className="block text-sm font-semibold text-white mb-2">Infillion Curated Creative</label>
                  <select
                    id="selectedCreativeStep2"
                    value={selectedCreative}
                    onChange={e => setSelectedCreative(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none"
                    aria-required="true"
                    aria-label="Creative Type"
                  >
                    <option value="">Select creative type...</option>
                    {creativeTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {selectedCreative === '' && (
                    <p className="text-red-500 text-xs mt-1" role="alert">Creative Type is required.</p>
                  )}
                </div>

                {/* Viewability */}
                <div>
                  <label htmlFor="selectedViewabilityStep2" className="block text-sm font-semibold text-white mb-2">Viewability</label>
                  <select
                    id="selectedViewabilityStep2"
                    value={selectedViewability}
                    onChange={e => setSelectedViewability(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none"
                    aria-required="true"
                    aria-label="Viewability"
                  >
                    <option value="">Select viewability...</option>
                    {viewabilityOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {selectedViewability === '' && (
                    <p className="text-red-500 text-xs mt-1" role="alert">Viewability is required.</p>
                  )}
                </div>

                {/* Reporting & Measurement */}
                <div>
                  <label htmlFor="selectedReportingStep2" className="block text-sm font-semibold text-white mb-2">Reporting & Measurement</label>
                  <div className="flex flex-wrap gap-2">
                    {reportingOptions.map(opt => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedReporting.includes(opt)}
                          onChange={() => setSelectedReporting(prev => prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt])}
                          className="accent-blue-500"
                          aria-label={`Select ${opt}`}
                        />
                        <span className="text-slate-300 text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                  {selectedReporting.length === 0 && (
                    <p className="text-red-500 text-xs mt-1" role="alert">At least one reporting option is required.</p>
                  )}
                </div>

                {/* Publisher Inclusion/Exclusion */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="publisherInclusionStep2" className="block text-sm font-semibold text-white mb-2">Publisher Inclusion (optional)</label>
                    <input
                      type="text"
                      id="publisherInclusionStep2"
                      value={publisherInclusion}
                      onChange={e => setPublisherInclusion(e.target.value)}
                      placeholder="List publishers to include..."
                      className="w-full px-4 py-2 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none"
                      aria-label="Publisher Inclusion"
                    />
                  </div>
                  <div>
                    <label htmlFor="publisherExclusionStep2" className="block text-sm font-semibold text-white mb-2">Publisher Exclusion (optional)</label>
                    <input
                      type="text"
                      id="publisherExclusionStep2"
                      value={publisherExclusion}
                      onChange={e => setPublisherExclusion(e.target.value)}
                      placeholder="List publishers to exclude..."
                      className="w-full px-4 py-2 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none"
                      aria-label="Publisher Exclusion"
                    />
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