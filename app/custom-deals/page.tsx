'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface DealFormData {
  dealName: string;
  ssp: string;
  dsp: string;
  channels: string[];
  devices: string[];
  audiences: string[];
  budget: string;
  startDate: string;
  endDate: string;
  targetingNotes: string;
  // Enhanced fields inspired by Curated Media
  primaryKPI: string;
  secondaryKPI: string;
  geo: string;
  adType: string;
  seatId: string;
  advancedSettings: {
    addedValue: boolean;
    operatingSystems: string[];
    browsers: string[];
    content: string[];
    deviceTypes: string[];
    formatSizes: string[];
    viewability: string;
  };
  publisherInclusion: string[];
  publisherExclusion: string[];
}

const CustomDealCreation = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<DealFormData>({
    dealName: '',
    ssp: '',
    dsp: '',
    channels: [],
    devices: [],
    audiences: [],
    budget: '',
    startDate: '',
    endDate: '',
    targetingNotes: '',
    primaryKPI: '',
    secondaryKPI: '',
    geo: '',
    adType: '',
    seatId: '',
    advancedSettings: {
      addedValue: false,
      operatingSystems: [],
      browsers: [],
      content: [],
      deviceTypes: [],
      formatSizes: [],
      viewability: ''
    },
    publisherInclusion: [],
    publisherExclusion: []
  });
  const [isCreating, setIsCreating] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [generatedDealId, setGeneratedDealId] = useState('');

  const steps = [
    {
      id: 0,
      title: "Confirm PMP Request Details",
      description: "Curation Details"
    },
    {
      id: 1,
      title: "Execution Preferences",
      description: "Select Additional Settings"
    },
    {
      id: 2,
      title: "Contact Information",
      description: "Where to send the PMP?"
    }
  ];

  const ssps = [
    {
      name: "Nexxen",
      description: "Premium video and CTV inventory",
      matchRate: "92%",
      deviceCount: "45M+"
    },
    {
      name: "Magnite",
      description: "CTV and digital video leader",
      matchRate: "89%",
      deviceCount: "38M+"
    },
    {
      name: "OpenX",
      description: "High-quality display and video",
      matchRate: "87%",
      deviceCount: "42M+"
    },
    {
      name: "Index Exchange",
      description: "Premium programmatic marketplace",
      matchRate: "91%",
      deviceCount: "50M+"
    },
    {
      name: "Beachfront",
      description: "CTV and mobile video specialist",
      matchRate: "85%",
      deviceCount: "35M+"
    },
    {
      name: "AdsWizz",
      description: "Audio streaming and podcast",
      matchRate: "88%",
      deviceCount: "28M+"
    }
  ];

  const dsps = [
    {
      name: "MediaMath",
      description: "Enterprise programmatic platform",
      audienceReach: "95%",
      features: ["Advanced Targeting", "Real-time Optimization", "Cross-device"]
    },
    {
      name: "The Trade Desk",
      description: "Independent DSP leader",
      audienceReach: "93%",
      features: ["Unified ID", "Cross-platform", "Advanced Analytics"]
    },
    {
      name: "DV360",
      description: "Google's display and video platform",
      audienceReach: "90%",
      features: ["YouTube Integration", "Google Analytics", "Machine Learning"]
    },
    {
      name: "Xandr",
      description: "Microsoft's programmatic platform",
      audienceReach: "88%",
      features: ["LinkedIn Targeting", "Premium Inventory", "Brand Safety"]
    }
  ];

  const kpis = [
    "Attention", "CPA", "CPC", "CPCV", "CPM", "CPV", "CTR", "Reach", "ROAS", "VCR", "Viewability"
  ];

  const geos = [
    "United States", "Canada", "United Kingdom", "Germany", "France", "Australia", "Japan", "Global"
  ];

  const adTypes = [
    "Display", "Video", "Native", "Audio", "CTV", "Digital Out-of-Home", "Rich Media"
  ];

  const handleInputChange = (field: keyof DealFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAdvancedSettingChange = (field: keyof DealFormData['advancedSettings'], value: any) => {
    setFormData(prev => ({
      ...prev,
      advancedSettings: { ...prev.advancedSettings, [field]: value }
    }));
  };

  const handleMultiSelect = (field: keyof DealFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(value)
        ? (prev[field] as string[]).filter(item => item !== value)
        : [...(prev[field] as string[]), value]
    }));
  };

  const generateDealId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    const sspCode = formData.ssp.substring(0, 3).toUpperCase();
    return `${sspCode}-${timestamp}-${random}`.toUpperCase();
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreateDeal = async () => {
    setIsCreating(true);
    
    // Simulate API calls to SSP and DSP
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate Deal ID
    const dealId = generateDealId();
    setGeneratedDealId(dealId);
    
    // Simulate deal activation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsCreating(false);
    setIsCreated(true);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-lg font-semibold text-[#F8F8FF] mb-3">
                What would you like to name this deal?
              </label>
              <input
                type="text"
                value={formData.dealName}
                onChange={(e) => handleInputChange('dealName', e.target.value)}
                placeholder="e.g., Q1 Sports Campaign, Tech Launch, etc."
                className="w-full px-6 py-4 bg-[#1B6CA8]/20 text-[#F8F8FF] rounded-xl border border-[#1B6CA8]/30 focus:border-[#00FFB7] focus:outline-none focus:ring-2 focus:ring-[#00FFB7]/20 text-lg transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold text-[#F8F8FF] mb-3">
                Select your Supply-Side Platform (SSP)
              </label>
              <div className="grid grid-cols-1 gap-4">
                {ssps.map(ssp => (
                  <motion.button
                    key={ssp.name}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleInputChange('ssp', ssp.name)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      formData.ssp === ssp.name
                        ? 'border-[#00FFB7] bg-[#00FFB7]/10 text-[#00FFB7]'
                        : 'border-[#1B6CA8]/30 bg-[#1B6CA8]/10 text-[#C8BCD1] hover:border-[#1B6CA8]/50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-lg">{ssp.name}</div>
                        <div className="text-sm opacity-75">{ssp.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{ssp.matchRate} Match Rate</div>
                        <div className="text-xs opacity-75">{ssp.deviceCount} Devices</div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Required Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#F8F8FF] mb-2">
                  DSP *
                </label>
                <select
                  value={formData.dsp}
                  onChange={(e) => handleInputChange('dsp', e.target.value)}
                  className="w-full px-4 py-3 bg-[#1B6CA8]/20 border border-[#1B6CA8]/30 rounded-lg text-[#F8F8FF] focus:outline-none focus:border-[#00FFB7] transition-colors"
                >
                  <option value="">Select DSP...</option>
                  {dsps.map(dsp => (
                    <option key={dsp.name} value={dsp.name}>{dsp.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#F8F8FF] mb-2">
                  Geo *
                </label>
                <select
                  value={formData.geo}
                  onChange={(e) => handleInputChange('geo', e.target.value)}
                  className="w-full px-4 py-3 bg-[#1B6CA8]/20 border border-[#1B6CA8]/30 rounded-lg text-[#F8F8FF] focus:outline-none focus:border-[#00FFB7] transition-colors"
                >
                  <option value="">Select Geo...</option>
                  {geos.map(geo => (
                    <option key={geo} value={geo}>{geo}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#F8F8FF] mb-2">
                  Ad Type *
                </label>
                <select
                  value={formData.adType}
                  onChange={(e) => handleInputChange('adType', e.target.value)}
                  className="w-full px-4 py-3 bg-[#1B6CA8]/20 border border-[#1B6CA8]/30 rounded-lg text-[#F8F8FF] focus:outline-none focus:border-[#00FFB7] transition-colors"
                >
                  <option value="">Select Ad Type...</option>
                  {adTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Optional Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#C8BCD1] mb-2">
                  Primary KPI
                </label>
                <select
                  value={formData.primaryKPI}
                  onChange={(e) => handleInputChange('primaryKPI', e.target.value)}
                  className="w-full px-4 py-3 bg-[#1B6CA8]/20 border border-[#1B6CA8]/30 rounded-lg text-[#F8F8FF] focus:outline-none focus:border-[#00FFB7] transition-colors"
                >
                  <option value="">Select Primary KPI...</option>
                  {kpis.map(kpi => (
                    <option key={kpi} value={kpi}>{kpi}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#C8BCD1] mb-2">
                  Secondary KPI
                </label>
                <select
                  value={formData.secondaryKPI}
                  onChange={(e) => handleInputChange('secondaryKPI', e.target.value)}
                  className="w-full px-4 py-3 bg-[#1B6CA8]/20 border border-[#1B6CA8]/30 rounded-lg text-[#F8F8FF] focus:outline-none focus:border-[#00FFB7] transition-colors"
                >
                  <option value="">Select Secondary KPI...</option>
                  {kpis.map(kpi => (
                    <option key={kpi} value={kpi}>{kpi}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#C8BCD1] mb-2">
                  Device
                </label>
                <select
                  value={formData.devices[0] || ''}
                  onChange={(e) => handleInputChange('devices', [e.target.value])}
                  className="w-full px-4 py-3 bg-[#1B6CA8]/20 border border-[#1B6CA8]/30 rounded-lg text-[#F8F8FF] focus:outline-none focus:border-[#00FFB7] transition-colors"
                >
                  <option value="">Select Device...</option>
                  <option value="CTV">CTV</option>
                  <option value="Desktop">Desktop</option>
                  <option value="Mobile">Mobile</option>
                  <option value="All">All Devices</option>
                </select>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="bg-[#1B6CA8]/10 rounded-lg p-4 border border-[#1B6CA8]/30">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-[#F8F8FF]">Advanced Settings</h4>
                <button className="text-[#C8BCD1] hover:text-[#F8F8FF] transition-colors">
                  ▼
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center space-x-2 text-[#C8BCD1]">
                    <input
                      type="checkbox"
                      checked={formData.advancedSettings.addedValue}
                      onChange={(e) => handleAdvancedSettingChange('addedValue', e.target.checked)}
                      className="rounded border-[#1B6CA8]/30 bg-[#1B6CA8]/20 text-[#00FFB7] focus:ring-[#00FFB7]"
                    />
                    <span>Added Value</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm text-[#C8BCD1] mb-2">Viewability</label>
                  <select
                    value={formData.advancedSettings.viewability}
                    onChange={(e) => handleAdvancedSettingChange('viewability', e.target.value)}
                    className="w-full px-3 py-2 bg-[#1B6CA8]/20 border border-[#1B6CA8]/30 rounded text-[#F8F8FF] focus:outline-none focus:border-[#00FFB7] transition-colors"
                  >
                    <option value="">Select Viewability...</option>
                    <option value="70%">70%</option>
                    <option value="80%">80%</option>
                    <option value="90%">90%</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Publisher Lists */}
            <div className="bg-[#1B6CA8]/10 rounded-lg p-4 border border-[#1B6CA8]/30">
              <h4 className="text-lg font-semibold text-[#F8F8FF] mb-4">Publisher Inclusion or Exclusion</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#C8BCD1] mb-2">Include Publishers</label>
                  <textarea
                    placeholder="Enter publisher domains to include..."
                    className="w-full px-3 py-2 bg-[#1B6CA8]/20 border border-[#1B6CA8]/30 rounded text-[#F8F8FF] focus:outline-none focus:border-[#00FFB7] transition-colors resize-none"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#C8BCD1] mb-2">Exclude Publishers</label>
                  <textarea
                    placeholder="Enter publisher domains to exclude..."
                    className="w-full px-3 py-2 bg-[#1B6CA8]/20 border border-[#1B6CA8]/30 rounded text-[#F8F8FF] focus:outline-none focus:border-[#00FFB7] transition-colors resize-none"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-lg font-semibold text-[#F8F8FF] mb-3">
                Contact Information
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#C8BCD1] mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="your.email@company.com"
                    className="w-full px-4 py-3 bg-[#1B6CA8]/20 border border-[#1B6CA8]/30 rounded-lg text-[#F8F8FF] focus:outline-none focus:border-[#00FFB7] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#C8BCD1] mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 bg-[#1B6CA8]/20 border border-[#1B6CA8]/30 rounded-lg text-[#F8F8FF] focus:outline-none focus:border-[#00FFB7] transition-colors"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-lg font-semibold text-[#F8F8FF] mb-3">
                Deal Summary
              </label>
              <div className="bg-[#1B6CA8]/10 rounded-lg p-4 border border-[#1B6CA8]/30">
                <div className="space-y-2 text-[#C8BCD1]">
                  <div><span className="font-medium text-[#F8F8FF]">Deal Name:</span> {formData.dealName}</div>
                  <div><span className="font-medium text-[#F8F8FF]">SSP:</span> {formData.ssp}</div>
                  <div><span className="font-medium text-[#F8F8FF]">DSP:</span> {formData.dsp}</div>
                  <div><span className="font-medium text-[#F8F8FF]">Geo:</span> {formData.geo}</div>
                  <div><span className="font-medium text-[#F8F8FF]">Ad Type:</span> {formData.adType}</div>
                  {formData.primaryKPI && <div><span className="font-medium text-[#F8F8FF]">Primary KPI:</span> {formData.primaryKPI}</div>}
                  {formData.secondaryKPI && <div><span className="font-medium text-[#F8F8FF]">Secondary KPI:</span> {formData.secondaryKPI}</div>}
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (isCreated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#121B30] via-[#69101A] to-[#121B30] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <div className="bg-gradient-to-br from-[#121B30] to-[#69101A] rounded-2xl p-8 border border-[#1B6CA8]/30 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 bg-gradient-to-r from-[#00FFB7] to-[#00FFF7] rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <span className="text-2xl">✅</span>
            </motion.div>
            <h1 className="text-3xl font-bold text-[#F8F8FF] mb-4">Deal Created Successfully!</h1>
            <p className="text-[#C8BCD1] mb-6">
              Your custom PMP deal has been activated across {formData.ssp} and {formData.dsp}.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-[#00FFB7] to-[#00FFF7] rounded-xl p-6 mb-6"
            >
              <div className="text-sm text-[#121B30] mb-2">Your Deal ID</div>
              <div className="text-2xl font-mono font-bold text-[#121B30] mb-2">{generatedDealId}</div>
              <div className="text-sm text-[#121B30]">Active and ready for campaigns</div>
            </motion.div>

            <div className="bg-[#1B6CA8]/10 rounded-xl p-4 border border-[#1B6CA8]/30 mb-6">
              <h3 className="font-semibold text-[#F8F8FF] mb-2">Deal Details:</h3>
              <div className="text-sm text-[#C8BCD1] space-y-1">
                <div>• SSP: {formData.ssp}</div>
                <div>• DSP: {formData.dsp}</div>
                <div>• Geo: {formData.geo}</div>
                <div>• Ad Type: {formData.adType}</div>
                {formData.primaryKPI && <div>• Primary KPI: {formData.primaryKPI}</div>}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/')}
              className="px-8 py-3 bg-gradient-to-r from-[#FF3CAC] to-[#C77DFF] hover:from-[#C77DFF] hover:to-[#FF3CAC] text-white rounded-lg font-semibold transition-all duration-300"
            >
              Back to Dashboard
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121B30] via-[#69101A] to-[#121B30] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-[#C8BCD1] mb-2">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-[#1B6CA8]/30 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-[#00FFB7] to-[#00FFF7] h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-gradient-to-br from-[#121B30] to-[#69101A] rounded-2xl p-8 border border-[#1B6CA8]/30">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#F8F8FF] mb-2">
              {steps[currentStep].title}
            </h1>
            <p className="text-[#C8BCD1] text-lg">
              {steps[currentStep].description}
            </p>
          </div>

          {renderStepContent()}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-6 py-3 bg-[#1B6CA8]/20 hover:bg-[#1B6CA8]/30 disabled:bg-[#1B6CA8]/10 disabled:text-[#69101A] text-[#F8F8FF] rounded-lg font-semibold transition-all duration-300 border border-[#1B6CA8]/30"
            >
              Previous
            </motion.button>
            
            {currentStep === steps.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCreateDeal}
                disabled={isCreating}
                className="px-8 py-3 bg-gradient-to-r from-[#00FFB7] to-[#00FFF7] hover:from-[#00FFF7] hover:to-[#00FFB7] disabled:from-[#69101A] disabled:to-[#69101A] text-[#121B30] rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
              >
                {isCreating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#121B30] border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Deal...</span>
                  </>
                ) : (
                  <span>Create Deal</span>
                )}
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextStep}
                className="px-6 py-3 bg-gradient-to-r from-[#FF3CAC] to-[#C77DFF] hover:from-[#C77DFF] hover:to-[#FF3CAC] text-white rounded-lg font-semibold transition-all duration-300"
              >
                Next
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDealCreation; 