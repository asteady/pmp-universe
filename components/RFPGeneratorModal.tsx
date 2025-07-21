import React, { useState } from 'react';
import { createAsanaTask } from '../lib/asana';
import ChipSelect from '../src/components/ChipSelect';

const requestTypes = [
  { value: 'deal-id', label: 'Deal ID Only' },
  { value: 'rfp-slides', label: 'RFP Slides Only' },
  { value: 'both', label: 'Both (Deal ID + RFP Slides)' },
];

// 1. Define the new step structure
const steps = [
  {
    label: 'Client Details',
    fields: ['agencyName', 'advertiserName', 'description'],
  },
  {
    label: 'Deal Settings',
    fields: ['audienceTaxonomy', 'customAudience', 'creatives', 'deviceTypes', 'measurement', 'customReporting'],
  },
  {
    label: 'Review & Submit',
    fields: [],
  },
];

const fieldLabels: Record<string, string> = {
  agencyName: 'Agency Name',
  advertiserName: 'Advertiser/Brand Name',
  description: 'Description',
  audienceTaxonomy: 'Audience Taxonomy',
  customAudience: 'Custom Audience',
  creatives: 'Creatives',
  deviceTypes: 'Device Type(s)',
  measurement: 'Measurement (Arrival, etc.)',
  customReporting: 'Custom Reporting',
};

const RFP_PROPOSAL_SECTION_GID = process.env.ASANA_RFP_PROPOSAL_SECTION_GID || '1209264958990943';

const RFPGeneratorModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [useApi, setUseApi] = useState(true); // Toggle for API vs direct
  const [resultMsg, setResultMsg] = useState<string | null>(null);
  // Add error state and helper text for all required fields
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Conditional logic: Only show relevant steps based on requestType
  const getVisibleSteps = () => {
    if (form.requestType === 'deal-id') {
      // Minimal info for Deal ID
      return steps.filter((s, i) => [0, 1, 2, 3, 4].includes(i));
    }
    if (form.requestType === 'rfp-slides') {
      // Full RFP info
      return steps;
    }
    // Both: all info
    return steps;
  };
  const visibleSteps = getVisibleSteps();

  const validateStep = () => {
    const currentStepFields = visibleSteps[step]?.fields || [];
    const newErrors: Record<string, string> = {};
    currentStepFields.forEach(field => {
      if (["agencyName", "advertiserName", "description", "audienceTaxonomy", "customAudience", "creatives", "deviceTypes"].includes(field)) {
        if (!form[field] || (Array.isArray(form[field]) && form[field].length === 0)) {
          newErrors[field] = 'This field is required.';
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(s => Math.min(s + 1, visibleSteps.length));
    }
  };
  const handleBack = () => setStep(s => Math.max(s - 1, 0));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);
    try {
      await createAsanaTask(form, { sectionGid: RFP_PROPOSAL_SECTION_GID });
      setSubmitSuccess(true);
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to submit to Asana.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
          <button className="absolute top-2 right-2 text-infillion-dark" onClick={onClose}>&times;</button>
          <h2 className="text-xl font-bold mb-4 text-infillion-dark font-sans">RFP Submitted!</h2>
          <div className="text-infillion-dark">Thank you for your submission. Our team will follow up soon.</div>
        </div>
      </div>
    );
  }

  if (step === visibleSteps.length) {
    // Summary/confirmation step
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
          <button className="absolute top-2 right-2 text-infillion-dark" onClick={onClose}>&times;</button>
          <h2 className="text-xl font-bold mb-4 text-infillion-dark font-sans">Review & Submit</h2>
          <div className="mb-4">
            <div className="mb-2">
              <span className="font-semibold text-infillion-dark">Request Type:</span> <span className="text-infillion-dark">{requestTypes.find(rt => rt.value === form.requestType)?.label}</span>
            </div>
            {Object.entries(form).filter(([k]) => k !== 'requestType').map(([k, v]) => (
              <div key={k} className="mb-2">
                <span className="font-semibold text-infillion-dark">{fieldLabels[k]}:</span> <span className="text-infillion-dark">{v}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mb-4">
            <input type="checkbox" id="useApi" checked={useApi} onChange={() => setUseApi(v => !v)} />
            <label htmlFor="useApi" className="text-infillion-dark">Submit via API (recommended)</label>
          </div>
          <div className="flex gap-2">
            <button className="bg-infillion-light text-white px-4 py-2 rounded font-bold hover:bg-infillion-dark transition" onClick={handleBack}>Back</button>
            <button className="bg-infillion-green text-white px-4 py-2 rounded font-bold hover:bg-infillion-dark transition" onClick={handleSubmit}>Submit</button>
          </div>
          {resultMsg && <div className="mt-4 text-infillion-dark">{resultMsg}</div>}
        </div>
      </div>
    );
  }

  const currentStep = visibleSteps[step];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
        <button className="absolute top-2 right-2 text-infillion-dark" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4 text-infillion-dark font-sans">RFP Generator</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="mb-2 text-infillion-dark font-semibold">Step {step + 1} of {visibleSteps.length + 1}: {currentStep.label}</div>
          {currentStep.fields.map(field => (
            <div key={field} className="flex flex-col">
              <label htmlFor={field} className="mb-1 text-infillion-dark font-sans">
                {fieldLabels[field]}
                {field === 'requestType' ? (
                  <span className="ml-1 text-xs text-gray-500" aria-label="Select the type of RFP you need"> (Select)</span>
                ) : field === 'description' || field === 'customReporting' ? (
                  <span className="ml-1 text-xs text-gray-500" aria-label="Enter a description for the RFP"> (Optional)</span>
                ) : (
                  <span className="ml-1 text-xs text-gray-500" aria-label="Enter a value for the field"> (Required)</span>
                )}
              </label>
              {field === 'requestType' ? (
                <select name="requestType" value={form.requestType || ''} onChange={handleChange} className="p-2 border rounded text-infillion-dark" required aria-required="true" aria-invalid={submitted && !form.requestType}>
                  <option value="">Select...</option>
                  {requestTypes.map(rt => (
                    <option key={rt.value} value={rt.value} aria-label={rt.label}>{rt.label}</option>
                  ))}
                </select>
              ) : field === 'description' || field === 'customReporting' ? (
                <textarea name={field} value={form[field] || ''} onChange={handleChange} className="p-2 border rounded text-infillion-dark" aria-label={`Enter ${fieldLabels[field]}`} />
              ) : (
                <input name={field} value={form[field] || ''} onChange={handleChange} aria-label={`Enter ${fieldLabels[field]}`} aria-required={true} aria-invalid={!!errors[field]} className={`p-2 border rounded text-infillion-dark ${errors[field] ? 'border-red-500' : ''}`} />
              )}
              {errors[field] && <span className="text-red-500 text-xs mt-1">{errors[field]}</span>}
            </div>
          ))}
          <div className="flex gap-2 mt-4">
            {step > 0 && <button type="button" className="bg-infillion-light text-white px-4 py-2 rounded font-bold hover:bg-infillion-dark transition" onClick={handleBack}>Back</button>}
            <button type="button" className="bg-infillion-green text-white px-4 py-2 rounded font-bold hover:bg-infillion-dark transition" onClick={handleNext} disabled={currentStep.fields.includes('requestType') && !form.requestType}>Next</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RFPGeneratorModal; 