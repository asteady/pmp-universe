import React, { useState } from 'react';

const summaryMetrics = [
  { label: 'Impressions', value: '7,265,827' },
  { label: 'Reach', value: '2,726,546' },
  { label: 'Frequency', value: '2.6' },
  { label: 'VCR%', value: '97.7%' },
  { label: 'CTR%', value: '1.14%' },
  { label: 'Verified Visits', value: '3,451' },
  { label: 'Projected Visits', value: '8,769' },
  { label: 'Average Dwell Time', value: '31.42 minutes' },
];

const ReportingModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [filters, setFilters] = useState({
    advertiser: '',
    campaign: '',
    dateRange: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg shadow-lg p-8 w-full max-w-4xl relative">
        <button className="absolute top-2 right-2 text-foreground" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4 text-foreground font-sans">Reporting</h2>
        <div className="flex flex-col gap-4">
          {/* Filter Bar */}
          <div className="flex gap-4 items-center bg-card p-4 rounded">
            <input name="advertiser" value={filters.advertiser} onChange={handleChange} placeholder="Select Advertiser..." className="p-2 rounded text-foreground" />
            <input name="campaign" value={filters.campaign} onChange={handleChange} placeholder="Select Campaign..." className="p-2 rounded text-foreground" />
            <input name="dateRange" value={filters.dateRange} onChange={handleChange} placeholder="Date Range..." className="p-2 rounded text-foreground" />
            {/* Platform filter is generic and can be extended */}
            <select className="p-2 rounded text-foreground">
              <option>PMP Universe</option>
            </select>
          </div>
          {/* Summary Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            {summaryMetrics.map(m => (
              <div key={m.label} className="bg-foreground text-background rounded p-4 flex flex-col items-center">
                <span className="text-xs uppercase tracking-wide text-muted">{m.label}</span>
                <span className="text-lg font-bold font-sans">{m.value}</span>
              </div>
            ))}
          </div>
          {/* Bar Chart Placeholder */}
          <div className="mt-6">
            <div className="h-48 bg-card rounded flex items-end gap-2 p-4">
              {/* Example bars */}
              {[600, 800, 400, 700, 500, 300, 650].map((h, i) => (
                <div key={i} className="bg-foreground w-8 rounded-t" style={{ height: `${h / 10}px` }} />
              ))}
            </div>
            <div className="flex justify-between text-xs text-foreground mt-2">
              {['Jun 11', 'Jun 12', 'Jun 13', 'Jun 14', 'Jun 15', 'Jun 16', 'Jun 17'].map(d => (
                <span key={d}>{d}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportingModal; 