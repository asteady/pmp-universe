import React from 'react';
import DealCard from './DealCard';

type Deal = {
  id: string;
  name: string;
  type: string;
  category: string;
  description: string;
  scale: string;
  vcr: string;
  ctr: string;
  dealId: string;
  formats: string[];
  creativeExamples: string[];
  targeting: string[];
  performance: {
    vcr: string;
    ctr: string;
    ecpm: string;
  };
  // Enhanced properties for better search and display
  ssp?: string;
  dsp?: string;
  keyBenefits?: string[];
  devices?: string[];
  placements?: string[];
  surveys?: string[];
  seasonal?: string[];
  tentpole?: string[];
};

const groupDeals = (deals: Deal[]) => {
  return {
    Evergreen: deals.filter(d => d.type === 'Evergreen'),
    Seasonal: deals.filter(d => d.type === 'Seasonal'),
    Custom: deals.filter(d => d.type === 'Custom'),
  };
};

const PMPGrid = ({ deals }: { deals: Deal[] }) => {
  const grouped = groupDeals(deals);
  
  return (
    <div className="w-full space-y-12">
      {Object.entries(grouped).map(([category, categoryDeals]) => (
        <div key={category}>
          <h3 className="text-2xl font-bold mb-6 text-white tracking-tight">
            {category} PMPs
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {categoryDeals.map((deal: Deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PMPGrid; 