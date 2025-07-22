'use client';

import React, { useState, useEffect } from 'react';
import PMPGrid from '../../components/PMPGrid';
import { evergreenPMPs, mergedAndNewPMPs } from '../../data/pmpData';
import { seasonalPMPs } from '../../data/seasonalPMPs';
import { customPMPs } from '../../data/customPMPs';
import { filterPMPsByFlags } from '../../lib/featureFlags';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';

// Combine all PMP data and filter based on feature flags
const allPMPs = filterPMPsByFlags([
  ...evergreenPMPs,
  ...mergedAndNewPMPs,
  ...seasonalPMPs,
  ...customPMPs,
]);

// Sort PMPs alphabetically by name
const sortedPMPs = allPMPs.sort((a, b) => a.name.localeCompare(b.name));

const pmpData = {
  summary: {
    meetingMoments: { count: seasonalPMPs.length, period: 'June-Nov 2025', icon: '🗓️' },
    evergreen: { count: evergreenPMPs.length + mergedAndNewPMPs.length, period: 'Year-round Performance', icon: '📈' },
    custom: { count: customPMPs.length, period: 'Tailored solutions', icon: '🎯' }
  },
  deals: sortedPMPs
};

const typewriterPhrases = [
  'Curated PMPs for every campaign.',
  'Activate across any DSP or SSP.',
  'Audience insights, creative, and performance.',
  'Your universe of premium programmatic.'];

const PMPUniversePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Deals');
  const [filteredDeals, setFilteredDeals] = useState(sortedPMPs);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [typewriterText, setTypewriterText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80);
  const typewriterTimeout = useRef<NodeJS.Timeout | null>(null);

  // Enhanced search and filter functionality
  useEffect(() => {
    let filtered = sortedPMPs;

    // Apply category filter
    if (selectedFilter !== 'All Deals') {
      let filterType = selectedFilter.replace(' PMPs', '');
      if (filterType === 'Meeting Moments') filterType = 'Seasonal';
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

  useEffect(() => {
    const handleType = () => {
      const currentPhrase = typewriterPhrases[typewriterIndex % typewriterPhrases.length];
      if (!isDeleting) {
        setTypewriterText(currentPhrase.substring(0, typewriterText.length + 1));
        if (typewriterText.length + 1 === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), 1200);
        } else {
          setTypingSpeed(80);
        }
      } else {
        setTypewriterText(currentPhrase.substring(0, typewriterText.length - 1));
        if (typewriterText.length === 0) {
          setIsDeleting(false);
          setTypewriterIndex((prev) => prev + 1);
        } else {
          setTypingSpeed(40);
        }
      }
    };
    typewriterTimeout.current = setTimeout(handleType, typingSpeed);
    return () => {
      if (typewriterTimeout.current) {
        clearTimeout(typewriterTimeout.current);
      }
    };
  }, [typewriterText, isDeleting, typewriterIndex]);

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
    <div className="min-h-screen bg-background text-foreground">
      <main className="p-8 min-h-screen">
        {/* Enhanced Header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              THE PMP UNIVERSE
            </h1>
            <h2 className="text-xl italic font-semibold text-foreground mb-2">
              by Infillion
            </h2>
            {/* Animated typewriter text */}
            <div className="flex justify-center min-h-[2.5rem]">
              <span className="typewriter-text text-lg font-medium transition-colors duration-300" style={{ color: ['#00FFB7', '#FF3CAC', '#FFEF00', '#A239CA'][typewriterIndex % 4] }}>{typewriterText}&nbsp;</span>
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
                  ? 'bg-muted/20 border-primary shadow-lg shadow-primary/20' 
                  : 'bg-muted/10 border-border'
              } text-foreground placeholder-muted-foreground focus:outline-none`}
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="relative group">
            <button className="px-6 py-4 bg-muted/20 text-foreground rounded-xl border border-border hover:bg-muted/30 hover:border-primary transition-all duration-300 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
              </svg>
              {selectedFilter}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute right-0 mt-2 w-64 bg-muted rounded-xl border border-border shadow-xl z-10 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200">
              <div className="p-4">
                <div className="text-sm text-muted-foreground mb-3">Quick Filters</div>
                <div className="space-y-2">
                  <button 
                    onClick={() => handleFilterChange('All Deals')}
                    className={`w-full text-left px-3 py-2 rounded-lg hover:bg-muted/20 text-sm transition-colors ${
                      selectedFilter === 'All Deals' 
                        ? 'bg-gradient-to-r from-primary to-accent text-foreground' 
                        : 'text-foreground'
                    }`}
                  >
                    All Deals ({sortedPMPs.length})
                  </button>
                  <button 
                    onClick={() => handleFilterChange('Meeting Moments PMPs')}
                    className={`w-full text-left px-3 py-2 rounded-lg hover:bg-muted/20 text-sm transition-colors ${
                      selectedFilter === 'Meeting Moments PMPs' 
                        ? 'bg-gradient-to-r from-primary to-accent text-foreground' 
                        : 'text-foreground'
                    }`}
                  >
                    Meeting Moments ({seasonalPMPs.length})
                  </button>
                  <button 
                    onClick={() => handleFilterChange('Evergreen PMPs')}
                    className={`w-full text-left px-3 py-2 rounded-lg hover:bg-muted/20 text-sm transition-colors ${
                      selectedFilter === 'Evergreen PMPs' 
                        ? 'bg-gradient-to-r from-primary to-accent text-foreground' 
                        : 'text-foreground'
                    }`}
                  >
                    Evergreen ({evergreenPMPs.length + mergedAndNewPMPs.length})
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
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCategoryClick('Meeting Moments PMPs')}
            className={`bg-gradient-to-br from-[#2b4857] to-[#612c4e] rounded-xl p-6 text-white transform transition-all duration-300 hover:shadow-2xl border-2 ${
              selectedFilter === 'Meeting Moments PMPs'
                ? 'border-[#612c4e] shadow-[#612c4e]/30'
                : 'border-muted/30 hover:border-[#612c4e] hover:shadow-[#612c4e]/25'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl font-bold">{pmpData.summary.meetingMoments.count}</span>
              <span className="text-2xl animate-bounce">{pmpData.summary.meetingMoments.icon}</span>
            </div>
            <h3 className="text-2xl font-semibold mb-1">Meeting Moments PMPs</h3>
            <p className="text-blue-100">{pmpData.summary.meetingMoments.period}</p>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCategoryClick('Evergreen PMPs')}
            className={`bg-gradient-to-br from-[#1f261c] to-[#31870c] rounded-xl p-6 text-white transform transition-all duration-300 hover:shadow-2xl border-2 ${
              selectedFilter === 'Evergreen PMPs'
                ? 'border-[#31870c] shadow-[#31870c]/30'
                : 'border-muted/30 hover:border-[#31870c] hover:shadow-[#31870c]/25'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl font-bold">{pmpData.summary.evergreen.count}</span>
              <span className="text-2xl animate-pulse">{pmpData.summary.evergreen.icon}</span>
            </div>
            <h3 className="text-2xl font-semibold mb-1">Evergreen PMPs</h3>
            <p className="text-green-100">{pmpData.summary.evergreen.period}</p>
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