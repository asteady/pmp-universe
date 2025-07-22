import React, { useState } from 'react';
import { createAsanaTask } from '../lib/asana';
import audienceTaxonomy from '../data/audienceTaxonomy.json';
import Select from 'react-select';

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
  const [resultMsg, setResultMsg] = useState<string | null>(null);
  // Add error state and helper text for all required fields
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Add state for multi-selects and single-selects
  const audienceTaxonomyOptions = audienceTaxonomy.map(aud => ({ value: aud.id, label: aud.name }));
  const creativeTypes = [
    'IDV', 'Rich Media', 'Display', 'Video', 'Native', 'Audio'
  ];
  const deviceTypes = [
    'Mobile', 'Desktop', 'Tablet', 'CTV', 'Audio'
  ];
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);
  const [selectedCreatives, setSelectedCreatives] = useState<string[]>([]);
  const [selectedDeviceTypes, setSelectedDeviceTypes] = useState<string[]>([]);
  const [measurement, setMeasurement] = useState('');
  const [customAudience, setCustomAudience] = useState('');
  const [customReporting, setCustomReporting] = useState('');

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
        <div className="bg-background rounded-lg shadow-lg p-8 w-full max-w-lg relative">
          <button className="absolute top-2 right-2 text-muted" onClick={onClose}>&times;</button>
          <h2 className="text-xl font-bold mb-4 text-foreground font-sans">RFP Submitted!</h2>
          <div className="text-foreground mb-2">Thank you for your submission. Our team will follow up soon.</div>
          <div className="text-foreground mb-2">Asana Link: <a href="#" className="underline text-blue-400">View Task</a></div>
          <div className="text-foreground">Google Slides Link: <span className="italic text-muted">(Coming soon)</span></div>
        </div>
      </div>
    );
  }

  if (step === visibleSteps.length) {
    // Summary/confirmation step
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-background rounded-lg shadow-lg p-8 w-full max-w-lg relative">
          <button className="absolute top-2 right-2 text-muted" onClick={onClose}>&times;</button>
          <h2 className="text-xl font-bold mb-4 text-foreground font-sans">Review & Submit</h2>
          <div className="mb-4">
            <div className="mb-2">
              <span className="font-semibold text-foreground">Audiences:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedAudiences.map(aud => (
                  <span key={aud} className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">{audienceTaxonomy.find(o => o.id === aud)?.name || aud}</span>
                ))}
              </div>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-foreground">Creatives:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedCreatives.map(c => (
                  <span key={c} className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">{c}</span>
                ))}
              </div>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-foreground">Device Types:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedDeviceTypes.map(d => (
                  <span key={d} className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">{d}</span>
                ))}
              </div>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-foreground">Custom Audience:</span>
              <div className="bg-slate-100 text-foreground px-3 py-2 rounded text-xs font-mono mt-1">{customAudience}</div>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-foreground">Measurement:</span>
              <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium ml-2">{measurement}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-foreground">Custom Reporting:</span>
              <div className="bg-slate-100 text-foreground px-3 py-2 rounded text-xs font-mono mt-1">{customReporting}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="bg-card text-white px-4 py-2 rounded font-bold hover:bg-foreground transition" onClick={handleBack}>Back</button>
            <button className="bg-green text-white px-4 py-2 rounded font-bold hover:bg-foreground transition" onClick={handleSubmit}>Submit</button>
          </div>
          {resultMsg && <div className="mt-4 text-foreground">{resultMsg}</div>}
        </div>
      </div>
    );
  }

  const currentStep = visibleSteps[step];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg shadow-lg p-8 w-full max-w-lg relative">
        <button className="absolute top-2 right-2 text-muted" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4 text-foreground font-sans">RFP Generator</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="mb-2 text-foreground font-semibold">Step {step + 1} of {visibleSteps.length + 1}: {currentStep.label}</div>
          {currentStep.fields.map(field => (
            <div key={field} className="flex flex-col">
              <label htmlFor={field} className="mb-1 text-foreground font-sans">
                {fieldLabels[field]}
                {field === 'requestType' ? (
                  <span className="ml-1 text-xs text-muted" aria-label="Select the type of RFP you need"> (Select)</span>
                ) : field === 'description' || field === 'customReporting' ? (
                  <span className="ml-1 text-xs text-muted" aria-label="Enter a description for the RFP"> (Optional)</span>
                ) : (
                  <span className="ml-1 text-xs text-muted" aria-label="Enter a value for the field"> (Required)</span>
                )}
              </label>
              {field === 'requestType' ? (
                <select name="requestType" value={form.requestType || ''} onChange={handleChange} className="p-2 border rounded text-foreground" required aria-required="true" aria-invalid={submitted && !form.requestType}>
                  <option value="">Select...</option>
                  {requestTypes.map(rt => (
                    <option key={rt.value} value={rt.value} aria-label={rt.label}>{rt.label}</option>
                  ))}
                </select>
              ) : field === 'description' || field === 'customReporting' ? (
                <textarea name={field} value={form[field] || ''} onChange={handleChange} className="p-2 border rounded text-foreground" aria-label={`Enter ${fieldLabels[field]}`} />
              ) : (
                <input name={field} value={form[field] || ''} onChange={handleChange} aria-label={`Enter ${fieldLabels[field]}`} aria-required={true} aria-invalid={!!errors[field]} className={`p-2 border rounded text-foreground ${errors[field] ? 'border-red-500' : ''}`} />
              )}
              {errors[field] && <span className="text-red-500 text-xs mt-1">{errors[field]}</span>}
            </div>
          ))}
          {currentStep.label === 'Deal Settings' && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-foreground mb-2">Select Audiences</label>
                <Select
                  isMulti
                  options={audienceTaxonomy.map(aud => ({ value: aud.id, label: aud.name }))}
                  value={audienceTaxonomy.filter(aud => selectedAudiences.includes(aud.id)).map(aud => ({ value: aud.id, label: aud.name }))}
                  onChange={opts => setSelectedAudiences(opts.map(opt => opt.value))}
                  classNamePrefix="react-select"
                  placeholder="Search audiences..."
                  styles={{
                    control: (base) => ({ ...base, backgroundColor: 'var(--background)', color: 'var(--foreground)' }),
                    menu: (base) => ({ ...base, backgroundColor: 'var(--background)', color: 'var(--foreground)' }),
                    multiValue: (base) => ({ ...base, backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }),
                    input: (base) => ({ ...base, color: 'var(--foreground)' }),
                  }}
                  theme={theme => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary: '#00FFB7',
                      primary25: '#00FFB733',
                      neutral0: 'var(--background)',
                      neutral80: 'var(--foreground)',
                    },
                  })}
                />
              </div>
              <Select
                isMulti
                options={creativeTypes.map(type => ({ value: type, label: type }))}
                value={selectedCreatives.map(c => ({ value: c, label: c }))}
                onChange={opts => setSelectedCreatives(opts.map(opt => opt.value))}
                classNamePrefix="react-select"
                placeholder="Search creatives..."
                styles={{
                  control: (base) => ({ ...base, backgroundColor: 'var(--background)', color: 'var(--foreground)' }),
                  menu: (base) => ({ ...base, backgroundColor: 'var(--background)', color: 'var(--foreground)' }),
                  multiValue: (base) => ({ ...base, backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }),
                  input: (base) => ({ ...base, color: 'var(--foreground)' }),
                }}
                theme={theme => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: '#00FFB7',
                    primary25: '#00FFB733',
                    neutral0: 'var(--background)',
                    neutral80: 'var(--foreground)',
                  },
                })}
              />
              <Select
                isMulti
                options={deviceTypes.map(type => ({ value: type, label: type }))}
                value={selectedDeviceTypes.map(d => ({ value: d, label: d }))}
                onChange={opts => setSelectedDeviceTypes(opts.map(opt => opt.value))}
                classNamePrefix="react-select"
                placeholder="Search device types..."
                styles={{
                  control: (base) => ({ ...base, backgroundColor: 'var(--background)', color: 'var(--foreground)' }),
                  menu: (base) => ({ ...base, backgroundColor: 'var(--background)', color: 'var(--foreground)' }),
                  multiValue: (base) => ({ ...base, backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }),
                  input: (base) => ({ ...base, color: 'var(--foreground)' }),
                }}
                theme={theme => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: '#00FFB7',
                    primary25: '#00FFB733',
                    neutral0: 'var(--background)',
                    neutral80: 'var(--foreground)',
                  },
                })}
              />
              <textarea
                value={customAudience}
                onChange={e => setCustomAudience(e.target.value)}
                className="p-2 border rounded text-foreground w-full mt-2"
                aria-label="Custom Audience"
                placeholder="Describe custom audiences, POIs, etc."
              />
              <input
                type="text"
                value={measurement}
                onChange={e => setMeasurement(e.target.value)}
                className="p-2 border rounded text-foreground w-full mt-2"
                aria-label="Measurement"
                placeholder="e.g. Arrival, Online Conversion, etc."
              />
              <textarea
                value={customReporting}
                onChange={e => setCustomReporting(e.target.value)}
                className="p-2 border rounded text-foreground w-full mt-2"
                aria-label="Custom Reporting"
                placeholder="Describe custom reporting needs"
              />
            </>
          )}
          <div className="flex gap-2 mt-4">
            {step > 0 && <button type="button" className="bg-card text-white px-4 py-2 rounded font-bold hover:bg-foreground transition" onClick={handleBack}>Back</button>}
            <button type="button" className="bg-green text-white px-4 py-2 rounded font-bold hover:bg-foreground transition" onClick={handleNext} disabled={currentStep.fields.includes('requestType') && !form.requestType}>Next</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RFPGeneratorModal; 