import React from 'react';

const FilterBar = () => (
  <div className="flex flex-wrap gap-4 bg-infillion-light p-4 rounded-md items-center">
    <select className="p-2 rounded text-infillion-dark">
      <option>Seasonality</option>
    </select>
    <select className="p-2 rounded text-infillion-dark">
      <option>Channel</option>
    </select>
    <select className="p-2 rounded text-infillion-dark">
      <option>Device Type</option>
    </select>
    <select className="p-2 rounded text-infillion-dark">
      <option>Audience Type</option>
    </select>
    <select className="p-2 rounded text-infillion-dark">
      <option>Brand Vertical</option>
    </select>
    <select className="p-2 rounded text-infillion-dark">
      <option>Creative Type</option>
    </select>
    <select className="p-2 rounded text-infillion-dark">
      <option>SSP Source</option>
    </select>
    <select className="p-2 rounded text-infillion-dark">
      <option>DSP Compatibility</option>
    </select>
    <input type="text" placeholder="Search..." className="p-2 rounded text-infillion-dark" />
  </div>
);

export default FilterBar; 