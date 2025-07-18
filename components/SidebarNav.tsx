import React from 'react';

const SidebarNav = () => (
  <nav className="bg-infillion-dark text-white w-64 min-h-screen flex flex-col py-6 px-4">
    <div className="mb-8">
      <img src="/brand/infillion-logo-dark.svg" alt="Infillion Logo" className="h-10 mb-2" />
      <h1 className="text-xl font-bold font-sans">PMP Universe</h1>
    </div>
    <ul className="space-y-4">
      <li className="font-semibold text-infillion-light">PMP Universe
        <ul className="ml-4 mt-2 space-y-2 text-sm">
          <li>Evergreen</li>
          <li>Tentpole</li>
          <li>Custom</li>
        </ul>
      </li>
      <li className="font-semibold">RFP Generator
        <ul className="ml-4 mt-2 space-y-2 text-sm">
          <li>Submission Form</li>
        </ul>
      </li>
      <li className="font-semibold">Guru</li>
    </ul>
  </nav>
);

export default SidebarNav; 