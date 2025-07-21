import React from 'react';
import DealCard from './DealCard';
import { motion } from 'framer-motion';

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

const PMPGrid = ({ deals }: { deals: Deal[] }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {deals.map((deal: Deal, index: number) => (
          <motion.div
            key={deal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <DealCard deal={deal} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PMPGrid; 