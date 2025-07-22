import React, { useState } from 'react';
import { createAsanaTask } from '../lib/asana';
import audienceTaxonomy from '../data/audienceTaxonomy.json';
import Select from 'react-select';

// The modal will always reflect the current theme (light/dark) because it uses CSS variables set on :root and updated via the html class (see app/layout.tsx)

// 1. Define the step structure
const steps = [
  {
    label: 'Client Details',
    fields: ['agencyName', 'advertiserName', 'description'],
  },
  {
    label: 'Deal Settings',
    fields: ['audienceTaxonomy', 'customAudience', 'creatives', 'deviceTypes', 'measurement'],
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
  measurement: 'Custom Reporting & Insights',
};

const fieldTooltips: Record<string, string> = {
  agencyName: '',
  advertiserName: '',
  description: '',
  audienceTaxonomy: 'Select one or more audience segments from the taxonomy. Use search to filter.',
  customAudience: 'Describe custom audiences, POIs, Frequency, Dwell Time, Survey Questions/Responses, etc.',
  creatives: 'Select one or more creative types for this deal.',
  deviceTypes: 'Select all device types to target.',
  measurement: 'e.g. Arrival Foot Traffic Attribution, Online Conversions, Quartiles, etc.',
};

const RFP_PROPOSAL_SECTION_GID = process.env.ASANA_RFP_PROPOSAL_SECTION_GID || '1209264958990943';

const creativeTypes = [
  'IDV', 'Rich Media', 'Display', 'Video', 'Native', 'Audio'
];
const deviceTypes = [
  'Mobile', 'Desktop', 'Tablet', 'CTV', 'Audio'
];

// 1. Add tooltips to all dropdowns
const Tooltip = ({ text }: { text: string }) => (
  <span className="ml-2 cursor-pointer text-accent" tabIndex={0} title={text || 'Select from the dropdown'} aria-label={text || 'Select from the dropdown'}>❓</span>
);

// 2. Update (Required)/(Optional) text color
// 3. Enhance dropdown menu backdrops
const selectStyles = {
  control: (base: any) => ({ ...base, backgroundColor: 'var(--background)', color: 'var(--foreground)', border: '1px solid var(--border)', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }),
  menu: (base: any) => ({ ...base, backgroundColor: 'var(--background)', color: 'var(--foreground)', border: '1px solid var(--border)', zIndex: 9999, backdropFilter: 'blur(8px)', backgroundClip: 'padding-box', boxShadow: '0 8px 32px rgba(0,0,0,0.25)' }),
  multiValue: (base: any, state: any) => ({ ...base, backgroundColor: vibrantChipColor(state.index), color: 'var(--accent-foreground)' }),
  input: (base: any) => ({ ...base, color: 'var(--foreground)' }),
  clearIndicator: (base: any) => ({ ...base, color: 'var(--foreground)' }),
  dropdownIndicator: (base: any) => ({ ...base, color: 'var(--foreground)' }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused ? 'var(--accent)' : 'var(--background)',
    color: state.isFocused ? 'var(--accent-foreground)' : 'var(--foreground)',
    '&:active': { backgroundColor: 'var(--accent)' },
  }),
  noOptionsMessage: (base: any) => ({ ...base, color: 'var(--foreground)' }),
  loadingMessage: (base: any) => ({ ...base, color: 'var(--foreground)' }),
  placeholder: (base: any) => ({ ...base, color: 'var(--foreground)' }),
  singleValue: (base: any) => ({ ...base, color: 'var(--foreground)' }),
  multiValueLabel: (base: any, state: any) => ({ ...base, color: 'var(--foreground)' }),
  multiValueRemove: (base: any) => ({ ...base, color: 'var(--foreground)' }),
};
const selectTheme = (theme: any) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: '#00FFB7',
    primary25: '#00FFB733',
    neutral0: 'var(--background)',
    neutral80: 'var(--foreground)',
  },
});

// 4. Audience Taxonomy: searchable, always-open, default short list
// 5. Label all steps and use vibrant color for step headers and chips
const stepColors = ['text-pink-400', 'text-blue-400', 'text-yellow-400', 'text-green-400'];
const vibrantChipColors = ['bg-pink-500', 'bg-blue-500', 'bg-yellow-400', 'bg-green-500', 'bg-purple-500', 'bg-orange-400'];
function vibrantChipColor(index: number) { return vibrantChipColors[index % vibrantChipColors.length]; }

const RFPGeneratorModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Record<string, any>>({
    agencyName: '',
    advertiserName: '',
    description: '',
    audienceTaxonomy: [],
    customAudience: '',
    creatives: [],
    deviceTypes: [],
    measurement: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [audienceSearch, setAudienceSearch] = useState('');
  const filteredAudienceOptions = audienceTaxonomy
    .map(aud => ({ value: aud.id, label: aud.name }))
    .filter(opt => opt.label.toLowerCase().includes(audienceSearch.toLowerCase()))
    .slice(0, 10);

  // Validation
  const validateStep = () => {
    const currentStepFields = steps[step]?.fields || [];
    const newErrors: Record<string, string> = {};
    currentStepFields.forEach(field => {
      if (["agencyName", "advertiserName", "description", "audienceTaxonomy", "customAudience", "creatives", "deviceTypes"].includes(field)) {
        if (
          form[field] === '' ||
          (Array.isArray(form[field]) && form[field].length === 0)
        ) {
          newErrors[field] = 'This field is required.';
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSelectChange = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
  };
  const handleNext = () => {
    if (validateStep()) {
      setStep(s => Math.min(s + 1, steps.length - 1));
    }
  };
  const handleBack = () => setStep(s => Math.max(s - 1, 0));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);
    try {
      // Prepare payload for Asana
      const payload = {
        ...form,
        audienceTaxonomy: form.audienceTaxonomy.map((opt: any) => opt.value),
        creatives: form.creatives.map((opt: any) => opt.value),
        deviceTypes: form.deviceTypes.map((opt: any) => opt.value),
      };
      await createAsanaTask(payload, { sectionGid: RFP_PROPOSAL_SECTION_GID });
      setSubmitSuccess(true);
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to submit to Asana.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  if (submitSuccess) {
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

  const currentStep = steps[step];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg shadow-lg p-8 w-full max-w-lg relative">
        <button className="absolute top-2 right-2 text-muted" onClick={onClose}>&times;</button>
        {step === steps.length - 1 ? (
          <>
            <h2 className="text-xl font-bold mb-4 text-foreground font-sans">Review & Submit</h2>
            <div className="mb-4 max-h-96 overflow-y-auto">
              {steps.slice(0, -1).map((s, i) => (
                <div key={s.label} className="mb-4">
                  <div className={`font-semibold ${stepColors[i]} mb-1`}>Step {i + 1}: {s.label}</div>
                  {s.fields.map(field => (
                    <div key={field} className="mb-2">
                      <span className="font-semibold text-foreground">{fieldLabels[field] || field}:</span>{' '}
                      {Array.isArray(form[field]) ? (
                        <span className="inline-flex flex-wrap gap-2">
                          {form[field].map((v: any, idx: number) => (
                            <span key={idx} className={`${vibrantChipColor(idx)} text-white px-2 py-1 rounded-full text-xs font-medium`}>{v.label || v}</span>
                          ))}
                        </span>
                      ) : (
                        <span className="bg-muted text-foreground px-2 py-1 rounded text-xs font-mono ml-1">{form[field]}</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button className="bg-card text-white px-4 py-2 rounded font-bold hover:bg-foreground transition" onClick={handleBack}>Back</button>
              <button className="bg-green text-white px-4 py-2 rounded font-bold hover:bg-foreground transition" onClick={handleSubmit} disabled={submitting}>Submit</button>
            </div>
            {submitError && <div className="mt-4 text-red-500">{submitError}</div>}
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4 text-foreground font-sans">RFP Generator</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className={`mb-2 font-semibold ${stepColors[step]}`}>Step {step + 1} of {steps.length}: {currentStep.label}</div>
              {currentStep.fields.map(field => (
                <div key={field} className="flex flex-col">
                  <label htmlFor={field} className="mb-1 text-foreground font-sans" title={fieldTooltips[field] || ''}>
                    {fieldLabels[field]}
                    <span className={`ml-2 text-xs ${['description', 'customAudience', 'measurement'].includes(field) ? 'text-blue-200' : 'text-accent font-bold'}`}>{['description', 'customAudience', 'measurement'].includes(field) ? '(Optional)' : '(Required)'}</span>
                  </label>
                  {field === 'audienceTaxonomy' && (
                    <div>
                      <input type="text" value={audienceSearch} onChange={e => setAudienceSearch(e.target.value)} placeholder="Search audiences..." className="w-full px-2 py-1 mb-2 bg-muted text-foreground rounded" />
                      <Select
                        isMulti
                        options={filteredAudienceOptions}
                        value={form.audienceTaxonomy}
                        onChange={opts => handleSelectChange('audienceTaxonomy', opts || [])}
                        classNamePrefix="react-select"
                        placeholder="Search audiences..."
                        styles={selectStyles}
                        theme={selectTheme}
                        menuPortalTarget={typeof window !== 'undefined' ? document.body : undefined}
                        menuPosition="fixed"
                        maxMenuHeight={200}
                      />
                      <Tooltip text={fieldTooltips[field]} />
                    </div>
                  )}
                  {field !== 'audienceTaxonomy' && (field === 'creatives' || field === 'deviceTypes') && (
                    <div className="flex items-center">
                      <Select
                        isMulti
                        options={field === 'creatives' ? creativeTypes.map(type => ({ value: type, label: type })) : deviceTypes.map(type => ({ value: type, label: type }))}
                        value={form[field]}
                        onChange={opts => handleSelectChange(field, opts || [])}
                        classNamePrefix="react-select"
                        placeholder="Search..."
                        styles={selectStyles}
                        theme={selectTheme}
                      />
                      <Tooltip text={fieldTooltips[field]} />
                    </div>
                  )}
                  {field !== 'audienceTaxonomy' && field !== 'creatives' && field !== 'deviceTypes' && (field === 'description' || field === 'customAudience' || field === 'measurement') && (
                    <textarea
                      name={field}
                      value={form[field] || ''}
                      onChange={handleChange}
                      className="p-2 border rounded text-foreground bg-background"
                      aria-label={`Enter ${fieldLabels[field]}`}
                    />
                  )}
                  {field !== 'audienceTaxonomy' && field !== 'creatives' && field !== 'deviceTypes' && field !== 'description' && field !== 'customAudience' && field !== 'measurement' && (
                    <input
                      name={field}
                      value={form[field] || ''}
                      onChange={handleChange}
                      aria-label={`Enter ${fieldLabels[field]}`}
                      aria-required={true}
                      aria-invalid={!!errors[field]}
                      className={`p-2 border rounded text-foreground bg-background ${errors[field] ? 'border-red-500' : ''}`}
                    />
                  )}
                  {errors[field] && <span className="text-red-500 text-xs mt-1">{errors[field]}</span>}
                </div>
              ))}
              <div className="flex gap-2 mt-4">
                {step > 0 && <button type="button" className="bg-card text-white px-4 py-2 rounded font-bold hover:bg-foreground transition" onClick={handleBack}>Back</button>}
                <button type="button" className="bg-green text-white px-4 py-2 rounded font-bold hover:bg-foreground transition" onClick={handleNext}>Next</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default RFPGeneratorModal;

