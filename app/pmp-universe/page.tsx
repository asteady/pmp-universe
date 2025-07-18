import React from 'react';
import SidebarNav from '../../components/SidebarNav';
import FilterBar from '../../components/FilterBar';
import PMPGrid from '../../components/PMPGrid';
import UserProfile from '../../components/UserProfile';

const sampleDeals = [
  { id: 'TENT123', name: 'Holiday Shoppers', type: 'Tentpole', scale: 'Large' },
  { id: 'EVER456', name: 'Luxury Shoppers', type: 'Evergreen', scale: 'Medium' },
  { id: 'CUST789', name: 'Sneakerheads', type: 'Custom', scale: 'Niche' },
];

const PMPUniversePage = () => (
  <div className="flex min-h-screen bg-infillion-dark">
    <SidebarNav />
    <main className="flex-1 p-8 bg-gradient-to-br from-infillion-dark to-infillion-light min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-infillion-light font-sans tracking-tight">PMP Universe</h2>
        <UserProfile />
      </div>
      <FilterBar />
      <div className="mt-8 flex flex-wrap gap-8">
        <PMPGrid deals={sampleDeals} />
      </div>
    </main>
  </div>
);

export default PMPUniversePage; 