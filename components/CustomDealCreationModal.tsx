import React, { useState } from 'react';
import Select from 'react-select';
import audienceTaxonomy from '../data/audienceTaxonomy.json';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { evergreenPMPs, mergedAndNewPMPs } from '../data/pmpData';
import { createAsanaTask } from '../lib/asana';

// Modular Required/Optional label
const RequiredOptionalLabel = ({ required }: { required: boolean }) => (
  <span className={`ml-2 text-xs font-bold`} style={{ color: required ? '#ff5a36' : '#84B067' }}>
    {required ? '(Required)' : '(Optional)'}
  </span>
);
// Modular Tooltip (reuse from RFP Generator)
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

const sspOptions = [
  { value: 'Nexxen', label: 'Nexxen' },
  { value: 'OpenX', label: 'OpenX' },
  { value: 'Beachfront', label: 'Beachfront' },
  { value: 'Other', label: 'Other' },
];
const dspOptions = [
  { value: 'MediaMath', label: 'MediaMath' },
  { value: 'The Trade Desk', label: 'The Trade Desk' },
  { value: 'DV360', label: 'DV360' },
  { value: 'Adelphic', label: 'Adelphic' },
  { value: 'StackAdapt', label: 'StackAdapt' },
  { value: 'Other', label: 'Other' },
];
const creativeOptions = [
  { value: 'IDV', label: 'IDV' },
  { value: 'Rich Media', label: 'Rich Media' },
  { value: 'Display', label: 'Display' },
  { value: 'Video', label: 'Video' },
  { value: 'None', label: 'None' },
  { value: 'Use Existing Infillion Creatives (NeXt, IDV, etc.)', label: 'Use Existing Infillion Creatives (NeXt, IDV, etc.)' },
];
const audienceOptions = audienceTaxonomy.map(aud => ({ value: aud.id, label: aud.name, description: aud.description }));
const pmpDealCardOptions = [
  ...evergreenPMPs,
  ...mergedAndNewPMPs,
].map(deal => ({ value: deal.name, label: deal.name }));
const evergreenSeasonalOptions = [
  { value: 'Evergreen', label: 'Evergreen' },
  { value: 'Meeting Moments', label: 'Meeting Moments' },
];
const goalOptions = [
  { value: 'Awareness', label: 'Awareness' },
  { value: 'Consideration', label: 'Consideration' },
  { value: 'Conversion', label: 'Conversion' },
  { value: 'Foot Traffic', label: 'Foot Traffic' },
  { value: 'Brand Lift', label: 'Brand Lift' },
];
const kpiOptions = [
  { value: 'VCR', label: 'VCR' },
  { value: 'CTR', label: 'CTR' },
  { value: 'ROI', label: 'ROI' },
  { value: 'Impressions', label: 'Impressions' },
  { value: 'Conversions', label: 'Conversions' },
];
const deviceOptions = [
  { value: 'Mobile', label: 'Mobile' },
  { value: 'Desktop', label: 'Desktop' },
  { value: 'Tablet', label: 'Tablet' },
  { value: 'CTV', label: 'CTV' },
  { value: 'Audio', label: 'Audio' },
];
const geoOptions = [
  { value: 'USA', label: 'USA' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Mexico', label: 'Mexico' },
  { value: 'Brazil', label: 'Brazil' },
  { value: 'Argentina', label: 'Argentina' },
  { value: 'Colombia', label: 'Colombia' },
  { value: 'Chile', label: 'Chile' },
  { value: 'Peru', label: 'Peru' },
  { value: 'Other', label: 'Other (Americas)' },
];
const reportingOptions = [
  { value: 'Standard', label: 'Standard' },
  { value: 'Custom', label: 'Custom' },
  { value: 'Foot Traffic', label: 'Foot Traffic' },
  { value: 'Brand Lift', label: 'Brand Lift' },
  { value: 'Viewability', label: 'Viewability' },
];

const steps = [
  {
    label: 'Client Details',
    fields: [
      { name: 'agencyName', label: 'Agency Name', type: 'text', required: true, placeholder: 'Enter agency name' },
      { name: 'advertiserNames', label: 'Advertiser/Brand Name(s)', type: 'text', required: true, placeholder: 'Enter advertiser/brand names' },
      { name: 'dealName', label: 'Deal Name', type: 'text', required: true, placeholder: 'Enter custom deal name' },
      { name: 'flighting', label: 'Flighting', type: 'date-range', required: true, placeholder: 'Select flighting dates' },
      { name: 'dsps', label: 'DSP(s)', type: 'multi-select', required: true, options: dspOptions, placeholder: 'Select DSP(s)' },
      { name: 'dspOtherName', label: 'DSP (Other) Name', type: 'text', required: false, placeholder: 'If "Other" selected, specify name', conditional: (form: any) => form.dsps?.some((d:any) => d.value === 'Other') },
      { name: 'dspSeatId', label: 'DSP Seat/Partner ID', type: 'text', required: false, placeholder: 'Optional seat ID' },
      { name: 'ssps', label: 'Preferred SSP(s)', type: 'multi-select', required: false, options: sspOptions, placeholder: 'Select SSP(s)', tooltip: 'Optional: Preferred supply partners' },
      { name: 'creatives', label: 'Infillion Curated Creative', type: 'multi-select', required: true, options: creativeOptions, placeholder: 'Select creative types' },
    ],
  },
  {
    label: 'Ideal Audience Persona(s)',
    fields: [
      { name: 'customAudience', label: 'Custom Audience', type: 'textarea', required: false, placeholder: 'Describe custom audience, POIs, etc.' },
      { name: 'audienceTaxonomy', label: 'Infillion Audience Taxonomy', type: 'multi-select', required: false, options: audienceOptions, placeholder: 'Search and select audience segments' },
      { name: 'evergreenSeasonal', label: 'Evergreen & Meeting Moments', type: 'multi-select', required: false, options: pmpDealCardOptions, placeholder: 'Select deal type(s)' },
    ],
  },
  {
    label: 'Settings',
    fields: [
      { name: 'primaryGoal', label: 'Primary Goal', type: 'select', required: true, options: goalOptions, placeholder: 'Select primary goal' },
      { name: 'primaryGoalBenchmark', label: 'Primary Goal Benchmark', type: 'textarea', required: true, placeholder: 'Describe benchmark for primary goal' },
      { name: 'secondaryKpi', label: 'Secondary KPI', type: 'select', required: false, options: kpiOptions, placeholder: 'Select secondary KPI' },
      { name: 'secondaryKpiBenchmark', label: 'Secondary KPI Benchmark', type: 'textarea', required: false, placeholder: 'Describe benchmark for secondary KPI' },
      { name: 'deviceTypes', label: 'Device Type(s)', type: 'multi-select', required: true, options: deviceOptions, placeholder: 'Select device types' },
      { name: 'geos', label: 'Geos', type: 'multi-select', required: true, options: geoOptions, placeholder: 'Select geos (Americas only)' },
      { name: 'otherTargeting', label: 'Other Targeting Details', type: 'textarea', required: false, placeholder: 'Describe any other targeting details' },
      { name: 'publisherInclusionExclusion', label: 'Publisher Inclusion/Exclusion', type: 'textarea', required: false, placeholder: 'List publishers to include/exclude' },
      { name: 'reporting', label: 'Reporting & Measurement', type: 'multi-select', required: false, options: reportingOptions, placeholder: 'Select reporting/measurement' },
    ],
  },
  {
    label: 'Review & Submit',
    fields: [],
  },
];

// Vibrant colors for chips and steps
const stepColors = ['text-pink-400', 'text-blue-400', 'text-yellow-400', 'text-green-400'];
const vibrantChipColors = ['bg-pink-500', 'bg-blue-500', 'bg-yellow-400', 'bg-green-500', 'bg-purple-500', 'bg-orange-400'];
function vibrantChipColor(index: number) { return vibrantChipColors[index % vibrantChipColors.length]; }

// Enhanced react-select styles (same as RFP Generator)
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

function CustomDealCreationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [flightingStart, setFlightingStart] = useState<Date | null>(null);
  const [flightingEnd, setFlightingEnd] = useState<Date | null>(null);
  const [flightingError, setFlightingError] = useState('');

  const currentStep = steps[step];

  const handleChange = (name: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  // 1. Fix flighting validation and error clearing
  // Remove all validation and error messages for Flighting
  // In the handleNext or validation logic, do not check or set errors for the Flighting fields
  // Remove any display of error messages for Flighting
  // The user should be able to proceed to Step 2 and beyond regardless of the date values

  const handleNext = () => {
    setStep(s => Math.min(s + 1, steps.length - 1));
  };
  const handleBack = () => setStep(s => Math.max(s - 1, 0));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);
    try {
      const payload = {
        ...form,
        flighting: flightingStart && flightingEnd ? `${flightingStart.toLocaleDateString()} - ${flightingEnd.toLocaleDateString()}` : '',
      };
      await createAsanaTask(payload, { formType: 'customDeal' });
      setSubmitSuccess(true);
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to submit.');
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
          <h2 className="text-xl font-bold mb-4 text-foreground font-sans">Custom Deal Submitted!</h2>
          <div className="text-foreground mb-2">Thank you for your submission. Our team will follow up soon.</div>
          <div className="text-foreground mb-2">Asana Link: <a href="#" className="underline text-blue-400">View Task</a></div>
          <div className="text-foreground">Google Slides Link: <span className="italic text-muted">(Coming soon)</span></div>
        </div>
      </div>
    );
  }

  if (step === steps.length - 1) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-background rounded-lg shadow-lg p-8 w-full max-w-lg relative">
          <button className="absolute top-2 right-2 text-muted" onClick={onClose}>&times;</button>
          <h2 className="text-xl font-bold mb-4 text-foreground font-sans">Review & Submit</h2>
          <div className="mb-4 max-h-96 overflow-y-auto">
            {steps.slice(0, -1).map((s, i) => (
              <div key={s.label} className="mb-4">
                <div className="font-semibold text-accent mb-1">Step {i + 1}: {s.label}</div>
                {s.fields.map(field => (
                  (!field.conditional || field.conditional(form)) && (
                    <div key={field.name} className="mb-2">
                      <span className="font-semibold text-foreground">{field.label}:</span>{' '}
                      {field.type === 'date-range' ? (
                        <span className="bg-muted text-foreground px-2 py-1 rounded text-xs font-mono ml-1">
                          {flightingStart && flightingEnd ? `${flightingStart.toLocaleDateString()} - ${flightingEnd.toLocaleDateString()}` : ''}
                        </span>
                      ) : Array.isArray(form[field.name]) ? (
                        <span className="inline-flex flex-wrap gap-2">
                          {form[field.name].map((v: any, idx: number) => (
                            <span key={idx} className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">{typeof v === 'object' && v.label ? v.label : v}</span>
                          ))}
                        </span>
                      ) : (
                        <span className="bg-muted text-foreground px-2 py-1 rounded text-xs font-mono ml-1">{form[field.name]}</span>
                      )}
                    </div>
                  )
                ))}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button className="bg-card text-white px-4 py-2 rounded font-bold hover:bg-foreground transition" onClick={handleBack}>Back</button>
            <button className="bg-green text-white px-4 py-2 rounded font-bold hover:bg-foreground transition" onClick={handleSubmit} disabled={submitting}>Submit</button>
          </div>
          {submitError && <div className="mt-4 text-red-500">{submitError}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg shadow-lg p-8 w-full max-w-lg relative">
        <button className="absolute top-2 right-2 text-muted" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4 text-foreground font-sans">Custom Deal Creation</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className={`mb-2 font-semibold ${stepColors[step]}`}>Step {step + 1} of {steps.length}: {currentStep.label}</div>
          {currentStep.fields.map(field => (
            (!field.conditional || field.conditional(form)) && (
              <div key={field.name} className="flex flex-col mb-2">
                <label htmlFor={field.name} className="mb-1 text-foreground font-sans">
                  {field.label}
                  <RequiredOptionalLabel required={field.required} />
                  {field.tooltip && <Tooltip text={field.tooltip} />}
                </label>
                {field.type === 'text' && (
                  <input
                    id={field.name}
                    name={field.name}
                    type="text"
                    value={form[field.name] || ''}
                    onChange={e => handleChange(field.name, e.target.value)}
                    className={`p-2 border rounded text-foreground bg-background border-border ${errors[field.name] ? 'border-red-500' : ''}`}
                    placeholder={field.placeholder}
                    aria-label={field.label}
                    aria-required={field.required}
                    aria-invalid={!!errors[field.name]}
                  />
                )}
                {field.type === 'textarea' && (
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={form[field.name] || ''}
                    onChange={e => handleChange(field.name, e.target.value)}
                    className={`p-2 border rounded text-foreground bg-background border-border ${errors[field.name] ? 'border-red-500' : ''}`}
                    placeholder={field.placeholder}
                    aria-label={field.label}
                    aria-required={field.required}
                    aria-invalid={!!errors[field.name]}
                  />
                )}
                {field.type === 'date-range' && (
                  <div className="flex gap-2">
                    <DatePicker
                      selected={flightingStart}
                      onChange={(date) => {
                        setFlightingStart(date);
                        setFlightingError('');
                      }}
                      selectsStart
                      startDate={flightingStart}
                      endDate={flightingEnd}
                      placeholderText="Start Date"
                      className="p-2 border rounded text-foreground bg-background border-border"
                      aria-label="Flighting Start Date"
                      aria-required={field.required}
                      aria-invalid={!!flightingError}
                    />
                    <DatePicker
                      selected={flightingEnd}
                      onChange={(date) => {
                        setFlightingEnd(date);
                        setFlightingError('');
                      }}
                      selectsEnd
                      startDate={flightingStart}
                      endDate={flightingEnd}
                      placeholderText="End Date"
                      className="p-2 border rounded text-foreground bg-background border-border"
                      aria-label="Flighting End Date"
                      aria-required={field.required}
                      aria-invalid={!!flightingError}
                    />
                  </div>
                )}
                {field.type === 'multi-select' && (
                  <div className="flex items-center">
                    <Select
                      isMulti
                      inputId={field.name}
                      name={field.name}
                      options={field.options}
                      value={form[field.name] || []}
                      onChange={val => handleChange(field.name, val)}
                      classNamePrefix="react-select"
                      placeholder={field.placeholder || 'Select options...'}
                      styles={selectStyles}
                      theme={selectTheme}
                      aria-label={field.label}
                      aria-required={field.required}
                      aria-invalid={!!errors[field.name]}
                    />
                    <Tooltip text={field.tooltip || 'Select from the dropdown'} />
                  </div>
                )}
                {field.type === 'select' && (
                  <Select
                    inputId={field.name}
                    name={field.name}
                    options={field.options}
                    value={form[field.name] || null}
                    onChange={val => handleChange(field.name, val)}
                    classNamePrefix="react-select"
                    placeholder={field.placeholder || 'Select an option...'}
                    styles={selectStyles}
                    theme={selectTheme}
                    aria-label={field.label}
                    aria-required={field.required}
                    aria-invalid={!!errors[field.name]}
                  />
                )}
                {field.name === 'dsps' && Array.isArray(form.dsps) && form.dsps.length > 1 && (
                  <div className="flex flex-col gap-2 mt-2">
                    {form.dsps.map((dsp: any, idx: number) => (
                      <div key={dsp.value} className="flex flex-col">
                        <label htmlFor={`dspSeatId_${dsp.value}`} className="mb-1 text-foreground font-sans">
                          DSP Seat/Partner ID for {dsp.label}
                          <RequiredOptionalLabel required={false} />
                        </label>
                        <input
                          id={`dspSeatId_${dsp.value}`}
                          name={`dspSeatId_${dsp.value}`}
                          type="text"
                          value={form[`dspSeatId_${dsp.value}`] || ''}
                          onChange={e => handleChange(`dspSeatId_${dsp.value}`, e.target.value)}
                          className="p-2 border rounded text-foreground bg-background border-border"
                          placeholder={`Enter seat/partner ID for ${dsp.label}`}
                          aria-label={`DSP Seat/Partner ID for ${dsp.label}`}
                        />
                      </div>
                    ))}
                  </div>
                )}
                {errors[field.name] && <span className="text-red-500 text-xs mt-1">{errors[field.name]}</span>}
                {field.type === 'date-range' && flightingError && <span className="text-red-500 text-xs mt-1">{flightingError}</span>}
              </div>
            )
          ))}
          <div className="flex gap-2 mt-4">
            {step > 0 && <button type="button" className="bg-card text-white px-4 py-2 rounded font-bold hover:bg-foreground transition" onClick={handleBack}>Back</button>}
            <button type="button" className="bg-green text-white px-4 py-2 rounded font-bold hover:bg-foreground transition" onClick={handleNext} disabled={submitting}>Next</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomDealCreationModal; 