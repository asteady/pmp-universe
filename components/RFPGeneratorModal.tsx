import React, { useState } from 'react';
import { createAsanaTask } from '../lib/asana';
import audienceTaxonomy from '../data/audienceTaxonomy.json';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// The modal will always reflect the current theme (light/dark) because it uses CSS variables set on :root and updated via the html class (see app/layout.tsx)

// 1. Define the step structure
const steps = [
  {
    label: 'Client Details',
    fields: ['agencyName', 'advertiserName', 'description', 'dueDate'], // Add dueDate
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
  dueDate: 'Due Date',
  audienceTaxonomy: 'Audience Taxonomy',
  customAudience: 'Custom Audience',
  creatives: 'Creatives',
  deviceTypes: 'Device Type(s)',
  measurement: 'Custom Reporting & Insights',
};

// 1. Update creativeTypes and deviceTypes arrays
const creativeTypes = [
  'IDV', 'Rich Media', 'Display', 'Video', 'None', 'Use Existing Infillion Creatives (NeXt, IDV, etc.)'
];
const deviceTypes = [
  'Smartphone', 'Desktop', 'Tablet', 'CTV'
];
// 2. Update Tooltip component for hover animation
const Tooltip = ({ text }: { text: string }) => {
  const [show, setShow] = useState(false);
  return (
    <span
      className="ml-2 cursor-pointer text-accent transition-transform duration-200 hover:scale-110 hover:text-blue-400 relative"
      tabIndex={0}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
      aria-label={text || 'Select from the dropdown'}
    >
      ❓
      {show && (
        <span className="absolute left-6 top-1/2 -translate-y-1/2 bg-background text-foreground border border-border rounded shadow-lg px-3 py-2 text-xs z-50 w-64">
          {text}
        </span>
      )}
    </span>
  );
};

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
  // Only one input for search
  const [audienceInput, setAudienceInput] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);

  // Alphabetize options
  const allAudienceOptions = audienceTaxonomy
    .map(aud => ({ value: aud.id, label: aud.name }))
    .sort((a, b) => a.label.localeCompare(b.label));

  // Filtered options: if input < 4 chars, show first 10; else, show up to 10 matches
  const filteredAudienceOptions =
    audienceInput.length < 4
      ? allAudienceOptions.slice(0, 10)
      : allAudienceOptions.filter(opt => opt.label.toLowerCase().includes(audienceInput.toLowerCase())).slice(0, 10);

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
      if (field === 'dueDate' && !dueDate) {
        newErrors['dueDate'] = 'Due date is required.';
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

  // 2. Add clear-on-focus for input fields
  const [agencyNamePlaceholder, setAgencyNamePlaceholder] = useState('Enter the Agency Name!');
  const [advertiserNamePlaceholder, setAdvertiserNamePlaceholder] = useState('Enter the Brand(s) Name(s)!');
  const [descriptionPlaceholder, setDescriptionPlaceholder] = useState('Please add as much detail about this request as you can!');
  const [customAudiencePlaceholder, setCustomAudiencePlaceholder] = useState('Get creative! What are the ideal customer personas of this Advertiser? If applicable, please provide some thought-starters. If not, just type in N/A!');
  const [measurementPlaceholder, setMeasurementPlaceholder] = useState('Any insights or analytics we should call out in the RFP (Arrival Foot Traffic Attribution, Custom Insights, Engagement Metrics, etc.)?');

  // 3. Update tooltips
  const fieldTooltips: Record<string, string> = {
    agencyName: '',
    advertiserName: '',
    description: '',
    dueDate: 'Select the due date for this RFP. This will be used as the Asana due date.',
    audienceTaxonomy: 'Please select from the drop down menu. You must select at least one pre-built Segment, and you can select as many as you’d like!',
    customAudience: '',
    creatives: 'Studio is currently helping curate these RFPs, but we will auto-generate these soon. Let us know if you need any of these. Multi-select enabled!',
    deviceTypes: 'Any specific screens you’d like to see the advertisement mock ups visualized within?',
    measurement: '',
  };

  // 4. Update label color logic
  const requiredColor = { color: '#ff5a36' };
  const optionalColor = { color: '#84B067' };

  // 5. Update createAsanaTask call
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
        dueDate: dueDate ? dueDate.toISOString().split('T')[0] : '',
      };
      await createAsanaTask(payload, { formType: 'rfp' });
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
                      {field === 'dueDate' ? (
                        <span className="bg-muted text-foreground px-2 py-1 rounded text-xs font-mono ml-1">{dueDate ? dueDate.toLocaleDateString() : ''}</span>
                      ) : Array.isArray(form[field]) ? (
                        <span className="inline-flex flex-wrap gap-2">
                          {form[field].map((v: any, idx: number) => (
                            <span key={idx} className={`${vibrantChipColor(idx)} text-white px-2 py-1 rounded-full text-xs font-medium`}>{typeof v === 'object' && v.label ? v.label : v}</span>
                          ))}
                        </span>
                      ) : (
                        <span className="bg-muted text-foreground px-2 py-1 rounded text-xs font-mono ml-1">{form[field]}</span>
                      )}
                    </div>
                  ))}
                  {/* Show Due Date in review step */}
                  {i === 0 && (
                    <div className="mb-2">
                      <span className="font-semibold text-foreground">Due Date:</span>{' '}
                      <span className="bg-muted text-foreground px-2 py-1 rounded text-xs font-mono ml-1">{dueDate ? dueDate.toLocaleDateString() : ''}</span>
                    </div>
                  )}
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
                    {fieldTooltips[field] && <Tooltip text={fieldTooltips[field]} />}
                  </label>
                  {/* Only one input/textarea/select per field */}
                  {(() => {
                    if (field === 'dueDate') {
                      return (
                        <DatePicker
                          selected={dueDate}
                          onChange={date => setDueDate(date)}
                          placeholderText="Select due date"
                          className="p-2 border rounded text-foreground bg-background border-border placeholder-[#A0A0A0]"
                          aria-label="Due Date"
                          aria-required={true}
                          aria-invalid={!!errors['dueDate']}
                        />
                      );
                    }
                    if (field === 'audienceTaxonomy') {
                      return (
                        <div>
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
                            inputValue={audienceInput}
                            onInputChange={val => setAudienceInput(val)}
                          />
                          <Tooltip text={fieldTooltips[field]} />
                        </div>
                      );
                    }
                    if (field === 'creatives' || field === 'deviceTypes') {
                      return (
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
                      );
                    }
                    if (field === 'description') {
                      return (
                        <textarea
                          name={field}
                          value={form[field] || ''}
                          onChange={handleChange}
                          className="p-2 border rounded text-foreground bg-background placeholder-[#A0A0A0]"
                          aria-label={`Enter ${fieldLabels[field]}`}
                          onFocus={() => setDescriptionPlaceholder('')}
                          placeholder={descriptionPlaceholder}
                        />
                      );
                    }
                    if (field === 'customAudience') {
                      return (
                        <textarea
                          name={field}
                          value={form[field] || ''}
                          onChange={handleChange}
                          className="p-2 border rounded text-foreground bg-background placeholder-[#A0A0A0]"
                          aria-label={`Enter ${fieldLabels[field]}`}
                          onFocus={() => setCustomAudiencePlaceholder('')}
                          placeholder={customAudiencePlaceholder}
                        />
                      );
                    }
                    if (field === 'measurement') {
                      return (
                        <textarea
                          name={field}
                          value={form[field] || ''}
                          onChange={handleChange}
                          className="p-2 border rounded text-foreground bg-background placeholder-[#A0A0A0]"
                          aria-label={`Enter ${fieldLabels[field]}`}
                          onFocus={() => setMeasurementPlaceholder('')}
                          placeholder={measurementPlaceholder}
                        />
                      );
                    }
                    if (field === 'agencyName') {
                      return (
                        <input
                          name={field}
                          value={form[field] || ''}
                          onChange={handleChange}
                          aria-label={`Enter ${fieldLabels[field]}`}
                          aria-required={true}
                          aria-invalid={!!errors[field]}
                          className={`p-2 border rounded text-foreground bg-background placeholder-[#A0A0A0] ${errors[field] ? 'border-red-500' : ''}`}
                          onFocus={() => setAgencyNamePlaceholder('')}
                          placeholder={agencyNamePlaceholder}
                        />
                      );
                    }
                    if (field === 'advertiserName') {
                      return (
                        <input
                          name={field}
                          value={form[field] || ''}
                          onChange={handleChange}
                          aria-label={`Enter ${fieldLabels[field]}`}
                          aria-required={true}
                          aria-invalid={!!errors[field]}
                          className={`p-2 border rounded text-foreground bg-background placeholder-[#A0A0A0] ${errors[field] ? 'border-red-500' : ''}`}
                          onFocus={() => setAdvertiserNamePlaceholder('')}
                          placeholder={advertiserNamePlaceholder}
                        />
                      );
                    }
                    // fallback for any other field
                    return (
                      <input
                        name={field}
                        value={form[field] || ''}
                        onChange={handleChange}
                        aria-label={`Enter ${fieldLabels[field]}`}
                        aria-required={true}
                        aria-invalid={!!errors[field]}
                        className={`p-2 border rounded text-foreground bg-background placeholder-[#A0A0A0] ${errors[field] ? 'border-red-500' : ''}`}
                      />
                    );
                  })()}
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

