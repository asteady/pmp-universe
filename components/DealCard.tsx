import React from 'react';

type Deal = {
  id: string;
  name: string;
  type: string;
  scale: string;
};

const DealCard = ({ deal }: { deal: Deal }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-3 border border-infillion-light min-w-[260px] max-w-xs transition hover:shadow-xl">
    <div className="flex items-center gap-2 mb-2">
      <span className="font-bold text-infillion-dark text-lg leading-tight">{deal.name}</span>
      <span className="bg-infillion-light text-white text-xs px-3 py-1 rounded-full font-semibold">{deal.type}</span>
    </div>
    <div className="text-sm text-infillion-dark font-medium">Scale/Reach: <span className="font-normal">{deal.scale}</span></div>
    <div className="flex items-center gap-2 mt-2">
      <span className="text-xs text-infillion-dark">Deal ID:</span>
      <span className="font-mono bg-infillion-dark text-white px-2 py-1 rounded cursor-pointer select-all" title="Copy Deal ID">{deal.id}</span>
    </div>
    <div className="flex gap-1 mt-2">
      {/* Placeholder for SSP icons */}
      <span className="bg-infillion-light w-6 h-6 rounded-full inline-block opacity-70" />
      <span className="bg-infillion-light w-6 h-6 rounded-full inline-block opacity-70" />
    </div>
    <button className="mt-4 bg-infillion-green text-white px-4 py-2 rounded-lg font-bold hover:bg-infillion-dark transition">View Details</button>
  </div>
);

export default DealCard; 