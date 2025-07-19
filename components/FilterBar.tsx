'use client';

import React, { useState } from 'react';

const filterOptions = {
  Seasonality: ['All', 'Holiday', 'Back to School', 'New Year', 'Gifting'],
  Channel: ['All', 'CTV', 'Display', 'OLV', 'Audio', 'Native'],
  Audience: ['All', 'Luxury', 'In-Market', 'Demo Indexers', 'Gen Z'],
  Brand: ['All', 'Tech', 'Retail', 'Auto', 'QSR'],
  Format: ['All', 'Standard', 'Rich Media', 'IDV'],
  SSP: ['All', 'OpenX', 'Nexxen', 'Beachfront', 'Magnite', 'Index', 'AdsWizz', 'Nativo'],
  DSP: ['All', 'The Trade Desk', 'DV360', 'MediaMath'],
};

type FilterCategory = keyof typeof filterOptions;
type SelectedState = Record<FilterCategory, string>;

interface FilterBarProps {
  onFilterChange?: (filters: Record<string, string[]>) => void;
}

const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const [selected, setSelected] = useState<SelectedState>({
    Seasonality: 'All',
    Channel: 'All',
    Audience: 'All',
    Brand: 'All',
    Format: 'All',
    SSP: 'All',
    DSP: 'All',
  });

  const handleSelect = (cat: FilterCategory, val: string) => {
    const newSelected = { ...selected, [cat]: val };
    setSelected(newSelected);
    
    // Convert to filter format and notify parent
    if (onFilterChange) {
      const filters: Record<string, string[]> = {};
      Object.entries(newSelected).forEach(([category, value]) => {
        if (value !== 'All') {
          filters[category] = [value];
        }
      });
      onFilterChange(filters);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 bg-infillion-light/80 p-4 rounded-xl shadow mb-4 animate-fade-in">
      {Object.entries(filterOptions).map(([cat, opts]) => (
        <div key={cat} className="flex flex-col items-start">
          <span className="text-xs font-bold text-infillion-dark mb-1">{cat}</span>
          <div className="flex gap-2 flex-wrap">
            {opts.map(opt => (
              <button
                key={opt}
                className={`px-3 py-1 rounded-full font-semibold text-xs transition-all duration-200 border border-infillion-dark/20 hover:bg-infillion-green hover:text-white focus:outline-none focus:ring-2 focus:ring-infillion-green ${selected[cat as FilterCategory] === opt ? 'bg-infillion-green text-white shadow' : 'bg-white text-infillion-dark'}`}
                onClick={() => handleSelect(cat as FilterCategory, opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterBar; 