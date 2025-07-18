import React from 'react';

type Deal = {
  id: string;
  name: string;
  type: string;
  scale: string;
};

const DealCard = ({ deal }: { deal: Deal }) => (
  <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 border border-infillion-light">
    <div className="flex items-center gap-2">
      <span className="font-bold text-infillion-dark text-lg">{deal.name}</span>
      <span className="bg-infillion-light text-white text-xs px-2 py-1 rounded">{deal.type}</span>
    </div>
    <div className="text-sm text-infillion-dark">Scale/Reach: {deal.scale}</div>
    <div className="flex items-center gap-2">
      <span className="text-xs text-infillion-dark">Deal ID:</span>
      <span className="font-mono bg-infillion-dark text-white px-2 py-1 rounded cursor-pointer" title="Copy Deal ID">{deal.id}</span>
    </div>
    <div className="flex gap-1">
      {/* Placeholder for SSP icons */}
      <span className="bg-infillion-light w-6 h-6 rounded-full inline-block" />
      <span className="bg-infillion-light w-6 h-6 rounded-full inline-block" />
    </div>
    <button className="mt-2 bg-infillion-green text-white px-4 py-2 rounded font-bold hover:bg-infillion-dark transition">View Details</button>
  </div>
);

export default DealCard; 