import React from 'react';

const UserProfile = () => (
  <div className="flex items-center gap-3 bg-infillion-dark rounded-full px-3 py-2 shadow-lg">
    <img
      src="/brand/robert-emrich.jpg"
      alt="Robert Emrich"
      className="w-10 h-10 rounded-full border-2 border-infillion-light object-cover"
      style={{ objectPosition: 'center' }}
    />
    <div className="flex flex-col">
      <span className="text-white font-bold leading-tight">Robert Emrich</span>
      <span className="text-infillion-light text-xs font-medium">CEO</span>
    </div>
  </div>
);

export default UserProfile; 