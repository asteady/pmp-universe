import React from 'react';

const SidebarNav = () => (
  <nav className="bg-infillion-dark text-white w-64 min-h-screen flex flex-col py-8 px-6 shadow-xl">
    <div className="mb-10 flex items-center gap-3">
      <img src="/brand/infillion-logo-dark.svg" alt="Infillion Logo" className="h-8 w-8" />
      <span className="text-2xl font-bold font-sans tracking-tight">PMP Universe</span>
    </div>
    <div className="flex flex-col gap-8">
      <div>
        <div className="text-infillion-light font-bold text-xs uppercase mb-2 tracking-widest">PMP Universe</div>
        <ul className="space-y-2">
          <li className="font-semibold transition hover:text-infillion-green cursor-pointer">Evergreen</li>
          <li className="font-semibold transition hover:text-infillion-green cursor-pointer">Tentpole</li>
          <li className="font-semibold transition hover:text-infillion-green cursor-pointer">Custom Deal Creation</li>
        </ul>
      </div>
      <div>
        <div className="text-infillion-light font-bold text-xs uppercase mb-2 tracking-widest">RFP Generator</div>
        <ul className="space-y-2">
          <li className="font-semibold transition hover:text-infillion-green cursor-pointer">Submission Form</li>
        </ul>
      </div>
      <div>
        <div className="text-infillion-light font-bold text-xs uppercase mb-2 tracking-widest">Guru</div>
      </div>
    </div>
  </nav>
);

export default SidebarNav; 