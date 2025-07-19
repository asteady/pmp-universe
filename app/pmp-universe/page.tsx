'use client';

import React, { useState, useEffect } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Deals');
  const [filteredDeals, setFilteredDeals] = useState(allPMPs);

  // Enhanced search and filter functionality
  useEffect(() => {
    let filtered = allPMPs;

    // Apply category filter
    if (selectedFilter !== 'All Deals') {
      const filterType = selectedFilter.replace(' PMPs', '');
      filtered = filtered.filter(deal => deal.type === filterType);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(deal => {
        // Search in deal name
        if (deal.name.toLowerCase().includes(query)) return true;
        
        // Search in description
        if (deal.description.toLowerCase().includes(query)) return true;
        
        // Search in category
        if (deal.category.toLowerCase().includes(query)) return true;
        
        // Search in deal type (Seasonal, Evergreen, Custom)
        if (deal.type.toLowerCase().includes(query)) return true;
        
        // Search in targeting
        if (deal.targeting.some((target: string) => target.toLowerCase().includes(query))) return true;
        
        // Search in formats
        if (deal.formats.some((format: string) => format.toLowerCase().includes(query))) return true;
        
        // Search in SSP compatibility
        if (deal.ssp && deal.ssp.toLowerCase().includes(query)) return true;
        
        // Search in DSP compatibility
        if (deal.dsp && deal.dsp.toLowerCase().includes(query)) return true;
        
        // Search in performance metrics
        if (deal.performance && (
          deal.performance.vcr.toLowerCase().includes(query) ||
          deal.performance.ctr.toLowerCase().includes(query) ||
          deal.performance.ecpm.toLowerCase().includes(query)
        )) return true;
        
        // Search in key benefits
        if (deal.keyBenefits && deal.keyBenefits.some((benefit: string) => benefit.toLowerCase().includes(query))) return true;
        
        // Search in creative examples
        if (deal.creativeExamples && deal.creativeExamples.some((example: string) => example.toLowerCase().includes(query))) return true;
        
        // Search in device types
        if (deal.devices && deal.devices.some((device: string) => device.toLowerCase().includes(query))) return true;
        
        // Search in placements
        if (deal.placements && deal.placements.some((placement: string) => placement.toLowerCase().includes(query))) return true;
        
        // Search in surveys
        if (deal.surveys && deal.surveys.some((survey: string) => survey.toLowerCase().includes(query))) return true;
        
        // Search in seasonal keywords
        if (deal.seasonal && deal.seasonal.some((season: string) => season.toLowerCase().includes(query))) return true;
        
        // Search in tentpole keywords
        if (deal.tentpole && deal.tentpole.some((tent: string) => tent.toLowerCase().includes(query))) return true;
        
        return false;
      });
    }
    
    setFilteredDeals(filtered);
  }, [searchQuery, selectedFilter, allPMPs]);

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <main className="p-8 min-h-screen">
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
              placeholder="Search by deal name, category, targeting, formats, SSP, DSP, performance, benefits, creative examples, devices, placements, or seasonal keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-4 pl-12 bg-slate-800/80 text-white rounded-xl border border-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="relative group">
            <button className="px-6 py-4 bg-slate-800/80 text-white rounded-xl border border-slate-700 hover:bg-slate-700 hover:border-blue-500 transition-all duration-200 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
              </svg>
              {selectedFilter}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute right-0 mt-2 w-64 bg-slate-800 rounded-xl border border-slate-700 shadow-xl z-10 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200">
              <div className="p-4">
                <div className="text-sm text-slate-400 mb-3">Quick Filters</div>
                <div className="space-y-2">
                  <button 
                    onClick={() => handleFilterChange('All Deals')}
                    className={`w-full text-left px-3 py-2 rounded-lg hover:bg-slate-700 text-sm text-white transition-colors ${selectedFilter === 'All Deals' ? 'bg-blue-600 text-white' : ''}`}
                  >
                    All Deals ({allPMPs.length})
                  </button>
                  <button 
                    onClick={() => handleFilterChange('Seasonal PMPs')}
                    className={`w-full text-left px-3 py-2 rounded-lg hover:bg-slate-700 text-sm text-white transition-colors ${selectedFilter === 'Seasonal PMPs' ? 'bg-blue-600 text-white' : ''}`}
                  >
                    Seasonal ({seasonalPMPs.length})
                  </button>
                  <button 
                    onClick={() => handleFilterChange('Evergreen PMPs')}
                    className={`w-full text-left px-3 py-2 rounded-lg hover:bg-slate-700 text-sm text-white transition-colors ${selectedFilter === 'Evergreen PMPs' ? 'bg-blue-600 text-white' : ''}`}
                  >
                    Evergreen ({evergreenPMPs.length})
                  </button>
                  <button 
                    onClick={() => handleFilterChange('Custom PMPs')}
                    className={`w-full text-left px-3 py-2 rounded-lg hover:bg-slate-700 text-sm text-white transition-colors ${selectedFilter === 'Custom PMPs' ? 'bg-blue-600 text-white' : ''}`}
                  >
                    Custom ({customPMPs.length})
                  </button>
                </div>
              </div>
            </div>
          </div>
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

        {/* PMP Grid */}
        <PMPGrid deals={filteredDeals} />
      </main>
    </div>
  );
};

export default PMPUniversePage; 