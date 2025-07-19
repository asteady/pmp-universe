'use client';

import React, { useState, useEffect } from 'react';
import SidebarNav from '../../components/SidebarNav';
import FilterBar from '../../components/FilterBar';
import PMPGrid from '../../components/PMPGrid';
import UserProfile from '../../components/UserProfile';
import { evergreenPMPs } from '../../data/pmpData';
import { seasonalPMPs } from '../../data/seasonalPMPs';
import { customPMPs } from '../../data/customPMPs';
import { filterPMPsByFlags } from '../../lib/featureFlags';

// Combine all PMP data and filter based on feature flags
const allPMPs = filterPMPsByFlags([...evergreenPMPs, ...seasonalPMPs, ...customPMPs]);

const pmpData = {
  summary: {
    seasonal: { count: seasonalPMPs.length, period: 'Jun-Nov 2025', icon: '📅' },
    evergreen: { count: evergreenPMPs.length, period: 'Year-round performance', icon: '📈' },
    custom: { count: customPMPs.length, period: 'Tailored solutions', icon: '🎯' }
  },
  deals: allPMPs
};

const PMPUniversePage = () => {
  const [activeTab, setActiveTab] = useState('PMP Universe');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [filteredDeals, setFilteredDeals] = useState(allPMPs);

  // Filter deals based on search query and filters
  useEffect(() => {
    let filtered = allPMPs;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(deal => 
        deal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.targeting.some((target: string) => target.toLowerCase().includes(searchQuery.toLowerCase())) ||
        deal.formats.some((format: string) => format.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply category filters
    Object.entries(activeFilters).forEach(([category, values]) => {
      if (values.length > 0) {
        filtered = filtered.filter(deal => {
          switch (category) {
            case 'Seasonality':
              return values.includes(deal.type);
            case 'Channel':
              return values.some(value => deal.formats.includes(value));
            case 'Audience':
              return values.some(value => deal.category.includes(value));
            case 'Brand':
              return values.some(value => deal.name.includes(value));
            case 'Format':
              return values.some(value => deal.formats.includes(value));
            case 'SSP':
              return true; // All deals are compatible with all SSPs
            case 'DSP':
              return true; // All deals are compatible with all DSPs
            default:
              return true;
          }
        });
      }
    });
    
    setFilteredDeals(filtered);
  }, [searchQuery, activeFilters, allPMPs]);

  const handleFilterChange = (filters: Record<string, string[]>) => {
    setActiveFilters(filters);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <SidebarNav />
      <main className="flex-1 p-8 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold text-white font-sans tracking-tight mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              PMP Universe
            </h1>
            <p className="text-blue-200 text-xl">
              Premium marketplace deals for Q2-Q4 2025 • Compatible with any DSP
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-sm font-bold">©</span>
              </div>
              <span className="text-sm font-semibold">Premium Inventory Available</span>
            </div>
            <UserProfile />
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search deals, targeting, or descriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-4 pl-12 bg-slate-800/80 text-white rounded-xl border border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button className="px-6 py-4 bg-slate-800/80 text-white rounded-xl border border-slate-700 hover:bg-slate-700 hover:border-blue-500 transition-all duration-200 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
            </svg>
            All Deals
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25">
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl font-bold">{pmpData.summary.seasonal.count}</span>
              <span className="text-2xl animate-bounce">{pmpData.summary.seasonal.icon}</span>
            </div>
            <h3 className="text-lg font-semibold mb-1">Seasonal PMPs</h3>
            <p className="text-blue-100">{pmpData.summary.seasonal.period}</p>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/25">
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl font-bold">{pmpData.summary.evergreen.count}</span>
              <span className="text-2xl animate-pulse">{pmpData.summary.evergreen.icon}</span>
            </div>
            <h3 className="text-lg font-semibold mb-1">Evergreen PMPs</h3>
            <p className="text-green-100">{pmpData.summary.evergreen.period}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25">
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl font-bold">{pmpData.summary.custom.count}</span>
              <span className="text-2xl animate-spin">{pmpData.summary.custom.icon}</span>
            </div>
            <h3 className="text-lg font-semibold mb-1">Custom PMPs</h3>
            <p className="text-purple-100">{pmpData.summary.custom.period}</p>
          </div>
        </div>

        {/* Filter Bar */}
        <FilterBar onFilterChange={handleFilterChange} />

        {/* PMP Grid */}
        <PMPGrid deals={filteredDeals} />
      </main>
    </div>
  );
};

export default PMPUniversePage; 