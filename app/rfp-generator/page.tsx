'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface RFPFormData {
  clientName: string;
  industry: string;
  campaignObjective: string;
  targetAudience: string;
  budget: string;
  timeline: string;
  preferredFormats: string[];
  geographicTargeting: string;
  additionalRequirements: string;
}

const RFPGenerator = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<RFPFormData>({
    clientName: '',
    industry: '',
    campaignObjective: '',
    targetAudience: '',
    budget: '',
    timeline: '',
    preferredFormats: [],
    geographicTargeting: '',
    additionalRequirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const rfpTemplates = [
    {
      id: 1,
      title: "Sports & Entertainment RFP",
      url: "https://docs.google.com/presentation/d/1BUWy_9gWsrjjEfDdAHolCbVRalRhxR7D7birYjwWjpo/edit?slide=id.g36f3a30fafd_0_7#slide=id.g36f3a30fafd_0_7",
      description: "Comprehensive sports and entertainment campaign template"
    },
    {
      id: 2,
      title: "Technology & Innovation RFP",
      url: "https://docs.google.com/presentation/d/193mrarvf5FBQmB3i9ePAt02F7KadvWb5i4KxaxbgwV0/edit?slide=id.p1#slide=id.p1",
      description: "Modern tech-focused campaign with innovative formats"
    },
    {
      id: 3,
      title: "Lifestyle & Fashion RFP",
      url: "https://docs.google.com/presentation/d/1VXumPgHBMmCnFpCUGoT020z9lNvivURy_JijdQdmxQs/edit?slide=id.g36f3a30fafd_0_314#slide=id.g36f3a30fafd_0_314",
      description: "Trendy lifestyle and fashion campaign showcase"
    }
  ];

  const steps = [
    {
      id: 0,
      title: "Client Information",
      description: "Tell us about your client and campaign"
    },
    {
      id: 1,
      title: "Campaign Objectives",
      description: "Define your campaign goals and target audience"
    },
    {
      id: 2,
      title: "Budget & Timeline",
      description: "Set your budget and campaign timeline"
    },
    {
      id: 3,
      title: "Format Preferences",
      description: "Choose your preferred ad formats"
    },
    {
      id: 4,
      title: "Targeting & Requirements",
      description: "Define geographic targeting and special requirements"
    },
    {
      id: 5,
      title: "Review & Submit",
      description: "Review your RFP and submit for generation"
    }
  ];

  const industries = [
    "Sports & Entertainment",
    "Technology & Innovation",
    "Lifestyle & Fashion",
    "Finance & Banking",
    "Healthcare & Wellness",
    "Automotive",
    "Food & Beverage",
    "Travel & Tourism",
    "Education",
    "Real Estate",
    "Other"
  ];

  const objectives = [
    "Brand Awareness",
    "Lead Generation",
    "Sales Conversion",
    "App Downloads",
    "Website Traffic",
    "Product Launch",
    "Event Promotion",
    "Customer Retention"
  ];

  const formats = [
    "Display Banner",
    "Video (CTV/OTT)",
    "Native Advertising",
    "Audio Streaming",
    "Rich Media",
    "Interactive Display",
    "Mobile In-App",
    "Digital Out-of-Home"
  ];

  const handleInputChange = (field: keyof RFPFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormatToggle = (format: string) => {
    setFormData(prev => ({
      ...prev,
      preferredFormats: prev.preferredFormats.includes(format)
        ? prev.preferredFormats.filter(f => f !== format)
        : [...prev.preferredFormats, format]
    }));
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call to Asana
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate RFP generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-white mb-3">
                What's your client's name?
              </label>
              <input
                type="text"
                value={formData.clientName}
                onChange={(e) => handleInputChange('clientName', e.target.value)}
                placeholder="Enter client name..."
                className="w-full px-6 py-4 bg-slate-800 text-white rounded-xl border border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-lg transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold text-white mb-3">
                What industry are they in?
              </label>
              <select
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                className="w-full px-6 py-4 bg-slate-800 text-white rounded-xl border border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-lg transition-all duration-200"
              >
                <option value="">Select industry...</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-white mb-3">
                What's your main campaign objective?
              </label>
              <select
                value={formData.campaignObjective}
                onChange={(e) => handleInputChange('campaignObjective', e.target.value)}
                className="w-full px-6 py-4 bg-slate-800 text-white rounded-xl border border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-lg transition-all duration-200"
              >
                <option value="">Select objective...</option>
                {objectives.map(objective => (
                  <option key={objective} value={objective}>{objective}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-lg font-semibold text-white mb-3">
                Describe your target audience
              </label>
              <textarea
                value={formData.targetAudience}
                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                placeholder="e.g., Tech-savvy professionals aged 25-45, interested in innovation..."
                rows={4}
                className="w-full px-6 py-4 bg-slate-800 text-white rounded-xl border border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-lg transition-all duration-200 resize-none"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-white mb-3">
                What's your campaign budget?
              </label>
              <select
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                className="w-full px-6 py-4 bg-slate-800 text-white rounded-xl border border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-lg transition-all duration-200"
              >
                <option value="">Select budget range...</option>
                <option value="$10K - $25K">$10K - $25K</option>
                <option value="$25K - $50K">$25K - $50K</option>
                <option value="$50K - $100K">$50K - $100K</option>
                <option value="$100K - $250K">$100K - $250K</option>
                <option value="$250K - $500K">$250K - $500K</option>
                <option value="$500K+">$500K+</option>
              </select>
            </div>
            <div>
              <label className="block text-lg font-semibold text-white mb-3">
                What's your campaign timeline?
              </label>
              <select
                value={formData.timeline}
                onChange={(e) => handleInputChange('timeline', e.target.value)}
                className="w-full px-6 py-4 bg-slate-800 text-white rounded-xl border border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-lg transition-all duration-200"
              >
                <option value="">Select timeline...</option>
                <option value="1-2 weeks">1-2 weeks</option>
                <option value="1 month">1 month</option>
                <option value="2-3 months">2-3 months</option>
                <option value="3-6 months">3-6 months</option>
                <option value="6+ months">6+ months</option>
              </select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-white mb-3">
                Which ad formats interest you?
              </label>
              <div className="grid grid-cols-2 gap-4">
                {formats.map(format => (
                  <button
                    key={format}
                    onClick={() => handleFormatToggle(format)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      formData.preferredFormats.includes(format)
                        ? 'border-blue-500 bg-blue-500/10 text-blue-300'
                        : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="font-medium">{format}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-white mb-3">
                Geographic targeting preferences
              </label>
              <textarea
                value={formData.geographicTargeting}
                onChange={(e) => handleInputChange('geographicTargeting', e.target.value)}
                placeholder="e.g., National, specific states, DMAs, or local markets..."
                rows={3}
                className="w-full px-6 py-4 bg-slate-800 text-white rounded-xl border border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-lg transition-all duration-200 resize-none"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold text-white mb-3">
                Any additional requirements?
              </label>
              <textarea
                value={formData.additionalRequirements}
                onChange={(e) => handleInputChange('additionalRequirements', e.target.value)}
                placeholder="Special targeting, creative requirements, or other notes..."
                rows={3}
                className="w-full px-6 py-4 bg-slate-800 text-white rounded-xl border border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-lg transition-all duration-200 resize-none"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-4">RFP Summary</h3>
              <div className="space-y-3 text-slate-300">
                <div><span className="font-medium">Client:</span> {formData.clientName}</div>
                <div><span className="font-medium">Industry:</span> {formData.industry}</div>
                <div><span className="font-medium">Objective:</span> {formData.campaignObjective}</div>
                <div><span className="font-medium">Budget:</span> {formData.budget}</div>
                <div><span className="font-medium">Timeline:</span> {formData.timeline}</div>
                <div><span className="font-medium">Formats:</span> {formData.preferredFormats.join(', ')}</div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-slate-400 mb-4">
                Your RFP will be generated using Infillion's AI-powered tools and templates.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">✅</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">RFP Generated Successfully!</h1>
            <p className="text-slate-300 mb-8">
              Your custom RFP has been created and sent to Asana. Here are your generated templates:
            </p>
            
            <div className="space-y-4 mb-8">
              {rfpTemplates.map((template, index) => (
                <a
                  key={template.id}
                  href={template.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-4 rounded-xl transition-all duration-200 hover:scale-105"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{template.title}</div>
                      <div className="text-sm opacity-90">{template.description}</div>
                    </div>
                    <span className="text-xl">→</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 mb-6">
              <h3 className="font-semibold text-white mb-2">Resources Used:</h3>
              <div className="text-sm text-slate-400 space-y-1">
                <div>• Infillion Audience Taxonomy</div>
                <div>• AI Audience Builder (ChatGPT)</div>
                <div>• Open Internet Research</div>
                <div>• Creative Asset Curation</div>
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
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-slate-600 disabled:to-slate-700 text-white rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Generating RFP...</span>
                  </>
                ) : (
                  <span>Generate RFP</span>
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

export default RFPGenerator; 