import React from 'react';
import DealCard from './DealCard';

type Deal = {
  id: string;
  name: string;
  type: string;
  scale: string;
};

const PMPGrid = ({ deals }: { deals: Deal[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
    {deals.map((deal: Deal) => (
      <DealCard key={deal.id} deal={deal} />
    ))}
  </div>
);

export default PMPGrid; 