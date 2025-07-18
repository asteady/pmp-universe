import React from 'react';
import SidebarNav from '../../components/SidebarNav';
import FilterBar from '../../components/FilterBar';
import PMPGrid from '../../components/PMPGrid';

const sampleDeals = [
  { id: 'TENT123', name: 'Holiday Shoppers', type: 'Tentpole', scale: 'Large' },
  { id: 'EVER456', name: 'Luxury Shoppers', type: 'Evergreen', scale: 'Medium' },
  { id: 'CUST789', name: 'Sneakerheads', type: 'Custom', scale: 'Niche' },
];

const PMPUniversePage = () => (
  <div className="flex min-h-screen bg-infillion-dark">
    <SidebarNav />
    <main className="flex-1 p-8 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4 text-infillion-dark font-sans">PMP Universe</h2>
      <FilterBar />
      <PMPGrid deals={sampleDeals} />
    </main>
  </div>
);

export default PMPUniversePage; 