import React from 'react';
import EvergreenPMPCard from './EvergreenPMPCard';
import SeasonalPMPCard from './SeasonalPMPCard';

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

const PMPGrid = ({ deals }: { deals: any[] }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {deals.map((deal, index) => {
        if (deal.type === 'Evergreen') {
          return <EvergreenPMPCard key={deal.id || index} deal={deal} />;
        }
        if (deal.type === 'Seasonal') {
          return <SeasonalPMPCard key={deal.id || index} deal={deal} />;
        }
        // fallback: render nothing or a placeholder
        return null;
      })}
    </div>
  );
};

export default PMPGrid; 