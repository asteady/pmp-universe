import React, { useState } from 'react';

const requestTypes = [
  { value: 'deal-id', label: 'Deal ID Only' },
  { value: 'rfp-slides', label: 'RFP Slides Only' },
  { value: 'both', label: 'Both (Deal ID + RFP Slides)' },
];

const steps = [
  { label: 'Request Type', fields: ['requestType'] },
  { label: 'Contact Info', fields: ['name', 'email', 'agency'] },
  { label: 'Brands & Description', fields: ['brands', 'description'] },
  { label: 'Channels & Creative', fields: ['channels', 'creativeTypes'] },
  { label: 'Audiences', fields: ['audiences'] },
  { label: 'Lists & Geos', fields: ['inclusionList', 'exclusionList', 'geos'] },
  { label: 'Measurement & Reporting', fields: ['measurement', 'customReporting'] },
];

const fieldLabels: Record<string, string> = {
  requestType: 'What do you need?',
  name: 'Name',
  email: 'Email',
  agency: 'Agency',
  brands: 'Brand(s)',
  description: 'Description',
  channels: 'Channel(s)',
  creativeTypes: 'Creative Type(s)',
  audiences: 'Audience(s)',
  inclusionList: 'Inclusion List',
  exclusionList: 'Exclusion List',
  geos: 'Geos',
  measurement: 'Measurement (Arrival, etc.)',
  customReporting: 'Custom Reporting',
};

const RFPGeneratorModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [useApi, setUseApi] = useState(true); // Toggle for API vs direct
  const [resultMsg, setResultMsg] = useState<string | null>(null);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(s => Math.min(s + 1, visibleSteps.length));
  const handleBack = () => setStep(s => Math.max(s - 1, 0));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    let resultMsg = '';
    try {
      if (useApi) {
        // Submit via server-side API
        const res = await fetch('/api/rfp-to-asana', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        resultMsg = data.success ? 'RFP submitted to Asana!' : `Error: ${data.error}`;
      } else {
        // Direct client-side Asana call
        const { createAsanaTask } = await import('@/lib/asana');
        await createAsanaTask(form);
        resultMsg = 'RFP submitted to Asana (client-side)!';
      }
    } catch (err: any) {
      resultMsg = `Error: ${err.message}`;
    }
    setResultMsg(resultMsg);
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
              <label className="mb-1 text-infillion-dark font-sans">{fieldLabels[field]}</label>
              {field === 'requestType' ? (
                <select name="requestType" value={form.requestType || ''} onChange={handleChange} className="p-2 border rounded text-infillion-dark" required>
                  <option value="">Select...</option>
                  {requestTypes.map(rt => <option key={rt.value} value={rt.value}>{rt.label}</option>)}
                </select>
              ) : field === 'description' || field === 'customReporting' ? (
                <textarea name={field} value={form[field] || ''} onChange={handleChange} className="p-2 border rounded text-infillion-dark" />
              ) : (
                <input name={field} value={form[field] || ''} onChange={handleChange} className="p-2 border rounded text-infillion-dark" />
              )}
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