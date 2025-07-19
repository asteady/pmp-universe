'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
    targetingNotes: ''
  });
  const [isCreating, setIsCreating] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [generatedDealId, setGeneratedDealId] = useState('');

  const steps = [
    {
      id: 0,
      title: "Deal Basics",
      description: "Name your deal and select your SSP"
    },
    {
      id: 1,
      title: "DSP Selection",
      description: "Choose your demand-side platform"
    },
    {
      id: 2,
      title: "Channel & Device Targeting",
      description: "Select channels and devices"
    },
    {
      id: 3,
      title: "Audience Targeting",
      description: "Choose your target audiences"
    },
    {
      id: 4,
      title: "Budget & Timeline",
      description: "Set budget and campaign dates"
    },
    {
      id: 5,
      title: "Review & Create",
      description: "Review and generate your Deal ID"
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

  const channels = [
    "CTV/OTT",
    "Desktop Display",
    "Mobile Display",
    "Mobile In-App",
    "Audio Streaming",
    "Digital Out-of-Home",
    "Native Advertising",
    "Video Streaming"
  ];

  const devices = [
    "Smart TV",
    "Desktop",
    "Mobile Phone",
    "Tablet",
    "Connected Device",
    "Gaming Console"
  ];

  const audiences = [
    {
      name: "Sports Enthusiasts",
      reach: "25M+",
      matchRate: "94%",
      description: "Fans of professional and college sports"
    },
    {
      name: "Tech Professionals",
      reach: "18M+",
      matchRate: "91%",
      description: "IT professionals and tech decision makers"
    },
    {
      name: "Fashion Forward",
      reach: "22M+",
      matchRate: "89%",
      description: "Trend-conscious consumers aged 18-35"
    },
    {
      name: "Business Travelers",
      reach: "12M+",
      matchRate: "93%",
      description: "Frequent business travelers and executives"
    },
    {
      name: "Gaming Community",
      reach: "30M+",
      matchRate: "87%",
      description: "Active gamers across all platforms"
    },
    {
      name: "Health & Wellness",
      reach: "20M+",
      matchRate: "90%",
      description: "Health-conscious consumers and fitness enthusiasts"
    }
  ];

  const handleInputChange = (field: keyof DealFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-white mb-3">
                What would you like to name this deal?
              </label>
              <input
                type="text"
                value={formData.dealName}
                onChange={(e) => handleInputChange('dealName', e.target.value)}
                placeholder="e.g., Q1 Sports Campaign, Tech Launch, etc."
                className="w-full px-6 py-4 bg-slate-800 text-white rounded-xl border border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-lg transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold text-white mb-3">
                Select your Supply-Side Platform (SSP)
              </label>
              <div className="grid grid-cols-1 gap-4">
                {ssps.map(ssp => (
                  <button
                    key={ssp.name}
                    onClick={() => handleInputChange('ssp', ssp.name)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      formData.ssp === ssp.name
                        ? 'border-blue-500 bg-blue-500/10 text-blue-300'
                        : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600'
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
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-white mb-3">
                Choose your Demand-Side Platform (DSP)
              </label>
              <div className="grid grid-cols-1 gap-4">
                {dsps.map(dsp => (
                  <button
                    key={dsp.name}
                    onClick={() => handleInputChange('dsp', dsp.name)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      formData.dsp === dsp.name
                        ? 'border-blue-500 bg-blue-500/10 text-blue-300'
                        : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-lg">{dsp.name}</div>
                        <div className="text-sm opacity-75">{dsp.description}</div>
                        <div className="text-xs opacity-75 mt-1">
                          {dsp.features.join(' • ')}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{dsp.audienceReach} Reach</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-white mb-3">
                Select your channels
              </label>
              <div className="grid grid-cols-2 gap-4">
                {channels.map(channel => (
                  <button
                    key={channel}
                    onClick={() => handleMultiSelect('channels', channel)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      formData.channels.includes(channel)
                        ? 'border-blue-500 bg-blue-500/10 text-blue-300'
                        : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="font-medium">{channel}</div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-lg font-semibold text-white mb-3">
                Choose target devices
              </label>
              <div className="grid grid-cols-2 gap-4">
                {devices.map(device => (
                  <button
                    key={device}
                    onClick={() => handleMultiSelect('devices', device)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      formData.devices.includes(device)
                        ? 'border-blue-500 bg-blue-500/10 text-blue-300'
                        : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="font-medium">{device}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-white mb-3">
                Select your target audiences
              </label>
              <div className="grid grid-cols-1 gap-4">
                {audiences.map(audience => (
                  <button
                    key={audience.name}
                    onClick={() => handleMultiSelect('audiences', audience.name)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      formData.audiences.includes(audience.name)
                        ? 'border-blue-500 bg-blue-500/10 text-blue-300'
                        : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold">{audience.name}</div>
                        <div className="text-sm opacity-75">{audience.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{audience.reach}</div>
                        <div className="text-xs opacity-75">{audience.matchRate} Match</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-lg font-semibold text-white mb-3">
                Additional targeting notes
              </label>
              <textarea
                value={formData.targetingNotes}
                onChange={(e) => handleInputChange('targetingNotes', e.target.value)}
                placeholder="Any specific targeting requirements or notes..."
                rows={3}
                className="w-full px-6 py-4 bg-slate-800 text-white rounded-xl border border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-lg transition-all duration-200 resize-none"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-white mb-3">
                What's your deal budget?
              </label>
              <select
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                className="w-full px-6 py-4 bg-slate-800 text-white rounded-xl border border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-lg transition-all duration-200"
              >
                <option value="">Select budget range...</option>
                <option value="$5K - $10K">$5K - $10K</option>
                <option value="$10K - $25K">$10K - $25K</option>
                <option value="$25K - $50K">$25K - $50K</option>
                <option value="$50K - $100K">$50K - $100K</option>
                <option value="$100K - $250K">$100K - $250K</option>
                <option value="$250K+">$250K+</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-semibold text-white mb-3">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className="w-full px-6 py-4 bg-slate-800 text-white rounded-xl border border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-lg transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-white mb-3">
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className="w-full px-6 py-4 bg-slate-800 text-white rounded-xl border border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-lg transition-all duration-200"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-4">Deal Summary</h3>
              <div className="space-y-3 text-slate-300">
                <div><span className="font-medium">Deal Name:</span> {formData.dealName}</div>
                <div><span className="font-medium">SSP:</span> {formData.ssp}</div>
                <div><span className="font-medium">DSP:</span> {formData.dsp}</div>
                <div><span className="font-medium">Channels:</span> {formData.channels.join(', ')}</div>
                <div><span className="font-medium">Devices:</span> {formData.devices.join(', ')}</div>
                <div><span className="font-medium">Audiences:</span> {formData.audiences.join(', ')}</div>
                <div><span className="font-medium">Budget:</span> {formData.budget}</div>
                <div><span className="font-medium">Timeline:</span> {formData.startDate} to {formData.endDate}</div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-slate-400 mb-4">
                Your deal will be created across {formData.ssp} and {formData.dsp} with automatic Deal ID generation.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isCreated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">✅</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Deal Created Successfully!</h1>
            <p className="text-slate-300 mb-6">
              Your custom PMP deal has been activated across {formData.ssp} and {formData.dsp}.
            </p>
            
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 mb-6">
              <div className="text-sm text-blue-200 mb-2">Your Deal ID</div>
              <div className="text-2xl font-mono font-bold text-white mb-2">{generatedDealId}</div>
              <div className="text-sm text-blue-200">Active and ready for campaigns</div>
            </div>

            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 mb-6">
              <h3 className="font-semibold text-white mb-2">Deal Details:</h3>
              <div className="text-sm text-slate-400 space-y-1">
                <div>• SSP: {formData.ssp}</div>
                <div>• DSP: {formData.dsp}</div>
                <div>• Channels: {formData.channels.length}</div>
                <div>• Audiences: {formData.audiences.length}</div>
                <div>• Budget: {formData.budget}</div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6">
              <div className="text-amber-300 font-medium mb-1">Need Help?</div>
              <div className="text-sm text-amber-200">
                Reach out to our team for troubleshooting or optimization support.
              </div>
            </div>

            <button
              onClick={() => router.push('/')}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition-all duration-200"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {steps[currentStep].title}
            </h1>
            <p className="text-slate-400 text-lg">
              {steps[currentStep].description}
            </p>
          </div>

          {renderStepContent()}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-lg font-semibold transition-all duration-200"
            >
              Previous
            </button>
            
            {currentStep === steps.length - 1 ? (
              <button
                onClick={handleCreateDeal}
                disabled={isCreating}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-slate-600 disabled:to-slate-700 text-white rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2"
              >
                {isCreating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Deal...</span>
                  </>
                ) : (
                  <span>Create Deal</span>
                )}
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition-all duration-200"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDealCreation; 