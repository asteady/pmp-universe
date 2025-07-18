import React, { useState } from 'react';

const sspOptions = [
  { value: 'openx', label: 'OpenX' },
  { value: 'nexxen', label: 'Nexxen' },
  { value: 'beachfront', label: 'Beachfront' },
  { value: 'index', label: 'Index Exchange' },
];

type CustomDealCreationModalProps = {
  open: boolean;
  onClose: () => void;
};

type DealResult = {
  success: boolean;
  dealId?: string;
  ssp?: string;
  error?: string;
};

const CustomDealCreationModal: React.FC<CustomDealCreationModalProps> = ({ open, onClose }) => {
  const [form, setForm] = useState({
    name: '',
    type: '',
    scale: '',
    ssp: '',
    targeting: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DealResult | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    const res = await fetch('/api/deals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
        <button className="absolute top-2 right-2 text-infillion-dark" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4 text-infillion-dark font-sans">Custom Deal Creation</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Deal Name" className="p-2 border rounded text-infillion-dark" required />
          <input name="type" value={form.type} onChange={handleChange} placeholder="Deal Type (e.g. Tentpole, Evergreen)" className="p-2 border rounded text-infillion-dark" required />
          <input name="scale" value={form.scale} onChange={handleChange} placeholder="Scale (e.g. Large, Medium, Niche)" className="p-2 border rounded text-infillion-dark" required />
          <select name="ssp" value={form.ssp} onChange={handleChange} className="p-2 border rounded text-infillion-dark" required>
            <option value="">Select SSP</option>
            {sspOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
          <textarea name="targeting" value={form.targeting} onChange={handleChange} placeholder="Targeting (JSON or description)" className="p-2 border rounded text-infillion-dark" />
          <button type="submit" className="bg-infillion-green text-white px-4 py-2 rounded font-bold hover:bg-infillion-dark transition" disabled={loading}>
            {loading ? 'Creating...' : 'Create Deal'}
          </button>
        </form>
        {result && (
          <div className="mt-4">
            {result.success ? (
              <div className="text-green-700">Deal created! ID: {result.dealId || result.ssp}</div>
            ) : (
              <div className="text-red-700">Error: {result.error}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDealCreationModal; 