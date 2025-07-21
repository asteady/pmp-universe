'use client';

import React, { useState, useEffect } from 'react';
import PMPGrid from '../../components/PMPGrid';
import { evergreenPMPs } from '../../data/pmpData';
import { seasonalPMPs } from '../../data/seasonalPMPs';
import { customPMPs } from '../../data/customPMPs';
import { filterPMPsByFlags } from '../../lib/featureFlags';
import { motion, AnimatePresence } from 'framer-motion';

// Combine all PMP data and filter based on feature flags
const allPMPs = filterPMPsByFlags([...evergreenPMPs, ...seasonalPMPs, ...customPMPs]);

// Sort PMPs alphabetically by name
const sortedPMPs = allPMPs.sort((a, b) => a.name.localeCompare(b.name));

const pmpData = {
  summary: {
    seasonal: { count: seasonalPMPs.length, period: 'Jun-Nov 2025', icon: '📅' },
    evergreen: { count: evergreenPMPs.length, period: 'Year-round performance', icon: '📈' },
    custom: { count: customPMPs.length, period: 'Tailored solutions', icon: '🎯' }
  },
  deals: sortedPMPs
};

const PMPUniversePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Deals');
  const [filteredDeals, setFilteredDeals] = useState(sortedPMPs);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Enhanced search and filter functionality
  useEffect(() => {
    let filtered = sortedPMPs;

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
        
        // Search in tentpole keywords (map to seasonal)
        if (deal.tentpole && deal.tentpole.some((tent: string) => tent.toLowerCase().includes(query))) return true;
        
        return false;
      });
    }
    
    setFilteredDeals(filtered);
  }, [searchQuery, selectedFilter, sortedPMPs]);

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedFilter(category);
  };

  // Value proposition icons and descriptions
  const valueProps = [
    {
      icon: '🚀',
      title: 'Bespoke solutions and curated marketplace deals that outperform standard programmatic campaigns',
      color: 'from-[#FF3CAC] to-[#C77DFF]'
    },
    {
      icon: '🔗',
      title: 'DSP-agnostic, multi-SSP flexibility, and omni-format/channel access to alleviate platform constraints meeting your operational needs',
      color: 'from-[#00FFB7] to-[#00FFF7]'
    },
    {
      icon: '⚡',
      title: 'Proven ease and speed of activation, driving measurable performance',
      color: 'from-[#FFEF00] to-[#FF7700]'
    },
    {
      icon: '🎯',
      title: 'Proprietary data & audience insights for targeting and measurement, with access to 1P Location Data, 0P Survey Data, 475+ pre-built Infillion audience segments from our Taxonomy, and custom segment creation utilizing historical offline or online data sets',
      color: 'from-[#A239CA] to-[#C77DFF]'
    },
    {
      icon: '🎨',
      title: 'Use your creatives or access our Creative Studio for attention-based interactive digital video and rich media',
      color: 'from-[#FF1744] to-[#FF3131]'
    },
    {
      icon: '💎',
      title: 'High-impact creative formats such as interactive digital video, video, rich media, display, native, and audio, custom-built by Infillion\'s award-winning Creative Studio ready to be activated cross-device',
      color: 'from-[#1B6CA8] to-[#00FFF7]'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121B30] via-[#69101A] to-[#121B30]">
      <main className="p-8 min-h-screen">
        {/* Enhanced Header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-[#FF3CAC] via-[#00FFB7] to-[#FFEF00] bg-clip-text text-transparent">
              THE PMP UNIVERSE
            </h1>
            <h2 className="text-2xl font-semibold text-[#F8F8FF] mb-6">
              by INFILLION DIFFERENCE
            </h2>
            
            {/* Value Proposition Icons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {valueProps.map((prop, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="group relative"
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${prop.color} flex items-center justify-center text-2xl shadow-lg hover:shadow-2xl transition-all duration-300`}>
                    {prop.icon}
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-[#121B30] text-[#F8F8FF] p-4 rounded-xl shadow-2xl max-w-sm text-sm border-2 border-[#1B6CA8]/50 backdrop-blur-sm"
                    >
                      <div className="font-semibold mb-2 text-[#00FFB7]">{prop.title}</div>
                      <div className="text-xs text-[#C8BCD1] leading-relaxed">
                        {prop.title}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Enhanced Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-4 mb-8"
        >
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder={isSearchFocused ? "Search by deal name, category, targeting, formats, SSP, DSP, performance, benefits, creative examples, devices, placements, or seasonal keywords..." : "Search the PMP Deal Universe here..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`w-full px-4 py-4 pl-12 rounded-xl border transition-all duration-300 ${
                isSearchFocused 
                  ? 'bg-[#1B6CA8]/20 border-[#00FFB7] shadow-lg shadow-[#00FFB7]/20' 
                  : 'bg-[#1B6CA8]/10 border-[#1B6CA8]/30'
              } text-[#F8F8FF] placeholder-[#C8BCD1] focus:outline-none`}
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#C8BCD1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="relative group">
            <button className="px-6 py-4 bg-[#1B6CA8]/20 text-[#F8F8FF] rounded-xl border border-[#1B6CA8]/30 hover:bg-[#1B6CA8]/30 hover:border-[#00FFB7] transition-all duration-300 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
              </svg>
              {selectedFilter}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute right-0 mt-2 w-64 bg-[#121B30] rounded-xl border border-[#1B6CA8]/30 shadow-xl z-10 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200">
              <div className="p-4">
                <div className="text-sm text-[#C8BCD1] mb-3">Quick Filters</div>
                <div className="space-y-2">
                  <button 
                    onClick={() => handleFilterChange('All Deals')}
                    className={`w-full text-left px-3 py-2 rounded-lg hover:bg-[#1B6CA8]/20 text-sm transition-colors ${
                      selectedFilter === 'All Deals' 
                        ? 'bg-gradient-to-r from-[#00FFB7] to-[#00FFF7] text-[#121B30]' 
                        : 'text-[#F8F8FF]'
                    }`}
                  >
                    All Deals ({sortedPMPs.length})
                  </button>
                  <button 
                    onClick={() => handleFilterChange('Seasonal PMPs')}
                    className={`w-full text-left px-3 py-2 rounded-lg hover:bg-[#1B6CA8]/20 text-sm transition-colors ${
                      selectedFilter === 'Seasonal PMPs' 
                        ? 'bg-gradient-to-r from-[#00FFB7] to-[#00FFF7] text-[#121B30]' 
                        : 'text-[#F8F8FF]'
                    }`}
                  >
                    Seasonal ({seasonalPMPs.length})
                  </button>
                  <button 
                    onClick={() => handleFilterChange('Evergreen PMPs')}
                    className={`w-full text-left px-3 py-2 rounded-lg hover:bg-[#1B6CA8]/20 text-sm transition-colors ${
                      selectedFilter === 'Evergreen PMPs' 
                        ? 'bg-gradient-to-r from-[#00FFB7] to-[#00FFF7] text-[#121B30]' 
                        : 'text-[#F8F8FF]'
                    }`}
                  >
                    Evergreen ({evergreenPMPs.length})
                  </button>
                  <button 
                    onClick={() => handleFilterChange('Custom PMPs')}
                    className={`w-full text-left px-3 py-2 rounded-lg hover:bg-[#1B6CA8]/20 text-sm transition-colors ${
                      selectedFilter === 'Custom PMPs' 
                        ? 'bg-gradient-to-r from-[#00FFB7] to-[#00FFF7] text-[#121B30]' 
                        : 'text-[#F8F8FF]'
                    }`}
                  >
                    Custom ({customPMPs.length})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Clickable Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCategoryClick('Seasonal PMPs')}
            className={`bg-gradient-to-br rounded-xl p-6 text-white transform transition-all duration-300 hover:shadow-2xl border-2 ${
              selectedFilter === 'Seasonal PMPs'
                ? 'from-[#FF3CAC] to-[#C77DFF] border-[#FF3CAC] shadow-[#FF3CAC]/30'
                : 'from-[#1B6CA8] to-[#00FFF7] border-[#1B6CA8]/30 hover:border-[#00FFB7] hover:shadow-[#00FFB7]/25'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl font-bold">{pmpData.summary.seasonal.count}</span>
              <span className="text-2xl animate-bounce">{pmpData.summary.seasonal.icon}</span>
            </div>
            <h3 className="text-xl font-semibold mb-1">Seasonal PMPs</h3>
            <p className="text-blue-100">{pmpData.summary.seasonal.period}</p>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCategoryClick('Evergreen PMPs')}
            className={`bg-gradient-to-br rounded-xl p-6 text-white transform transition-all duration-300 hover:shadow-2xl border-2 ${
              selectedFilter === 'Evergreen PMPs'
                ? 'from-[#00FFB7] to-[#00FFF7] border-[#00FFB7] shadow-[#00FFB7]/30'
                : 'from-[#1B6CA8] to-[#00FFF7] border-[#1B6CA8]/30 hover:border-[#00FFB7] hover:shadow-[#00FFB7]/25'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl font-bold">{pmpData.summary.evergreen.count}</span>
              <span className="text-2xl animate-pulse">{pmpData.summary.evergreen.icon}</span>
            </div>
            <h3 className="text-xl font-semibold mb-1">Evergreen PMPs</h3>
            <p className="text-green-100">{pmpData.summary.evergreen.period}</p>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCategoryClick('Custom PMPs')}
            className={`bg-gradient-to-br rounded-xl p-6 text-white transform transition-all duration-300 hover:shadow-2xl border-2 ${
              selectedFilter === 'Custom PMPs'
                ? 'from-[#A239CA] to-[#C77DFF] border-[#A239CA] shadow-[#A239CA]/30'
                : 'from-[#1B6CA8] to-[#00FFF7] border-[#1B6CA8]/30 hover:border-[#00FFB7] hover:shadow-[#00FFB7]/25'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl font-bold">{pmpData.summary.custom.count}</span>
              <span className="text-2xl animate-spin">{pmpData.summary.custom.icon}</span>
            </div>
            <h3 className="text-xl font-semibold mb-1">Custom PMPs</h3>
            <p className="text-purple-100">{pmpData.summary.custom.period}</p>
          </motion.button>
        </motion.div>

        {/* PMP Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <PMPGrid deals={filteredDeals} />
        </motion.div>
      </main>
    </div>
  );
};

export default PMPUniversePage; 