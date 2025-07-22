import React from 'react';

const evergreenGradient = 'bg-gradient-to-br from-[#1f261c] to-[#31870c]';
const seasonalGradient = 'bg-gradient-to-br from-[#2b4857] to-[#612c4e]';

interface CardBaseProps {
  dealName: string;
  uniqueReach: string;
  badge: string;
  subcategory: string;
  description: string;
  children?: React.ReactNode;
  type: 'Evergreen' | 'Seasonal';
  bottomLabel?: string;
}

// Color map for subcategories (extend as needed)
const subcategoryColors: Record<string, string> = {
  'Sensitive': 'bg-red-600 text-white',
  'Performance': 'bg-yellow-400 text-black',
  'Arts & Entertainment': 'bg-purple-600 text-white',
  'Travel': 'bg-blue-600 text-white',
  'Infillion Audience Taxonomy': 'bg-green-600 text-white',
  // ...add more as needed
};

// Gradient maps for badges and subcategories
const badgeGradients: Record<string, string> = {
  Evergreen: 'bg-gradient-to-r from-[#1f261c] to-[#31870c]',
  'Meeting Moments': 'bg-gradient-to-r from-[#2b4857] to-[#612c4e]',
  Seasonal: 'bg-gradient-to-r from-[#2b4857] to-[#612c4e]',
};
const categoryBadgeGradients: Record<string, string> = {
  Evergreen: 'bg-gradient-to-r from-[#472A05] to-[#0DBE70]',
  'Meeting Moments': 'bg-gradient-to-r from-[#F25930] to-[#020b36]',
  Seasonal: 'bg-gradient-to-r from-[#F25930] to-[#020b36]',
};
const subcategoryGradients: Record<string, { name: string; className: string }> = {
  Sensitive: { name: 'Sensitive', className: 'bg-gradient-to-r from-[#7F1D1D] to-[#DC2626] text-white' },
  Performance: { name: 'Performance', className: 'bg-gradient-to-r from-[#0F172A] to-[#38BDF8] text-white' },
  'Infillion Audience Taxonomy': { name: 'Infillion Intelligence Engine', className: 'bg-gradient-to-r from-[#2563EB] to-[#9333EA] text-white' },
  Summer: { name: 'Sun-Soaked Surge', className: 'bg-gradient-to-r from-[#F97316] to-[#FDE68A] text-black' },
  July: { name: 'Sun-Soaked Surge', className: 'bg-gradient-to-r from-[#F97316] to-[#FDE68A] text-black' },
  June: { name: 'Sun-Soaked Surge', className: 'bg-gradient-to-r from-[#F97316] to-[#FDE68A] text-black' },
  August: { name: 'Sun-Soaked Surge', className: 'bg-gradient-to-r from-[#F97316] to-[#FDE68A] text-black' },
  September: { name: 'Sun-Soaked Surge', className: 'bg-gradient-to-r from-[#F97316] to-[#FDE68A] text-black' },
  Fall: { name: 'Harvest Hustle', className: 'bg-gradient-to-r from-[#F59E0B] to-[#FDE68A] text-black' },
  'Gifting Peak': { name: 'Gifting Peak', className: 'bg-gradient-to-r from-[#DB2777] to-[#F472B6] text-white' },
  Winter: { name: 'Winter Sports', className: 'bg-gradient-to-r from-[#2563EB] to-[#60A5FA] text-white' },
  'Valentine\'s Day & Romance': { name: 'Romance', className: 'bg-gradient-to-r from-[#9D174D] to-[#F43F5E] text-white' },
  Romance: { name: 'Romance', className: 'bg-gradient-to-r from-[#9D174D] to-[#F43F5E] text-white' },
  'Holiday Shopping & Gifting': { name: 'Capitalism', className: 'bg-gradient-to-r from-[#B91C1C] to-[#FACC15] text-black' },
  Capitalism: { name: 'Capitalism', className: 'bg-gradient-to-r from-[#B91C1C] to-[#FACC15] text-black' },
};

// Vibrant color for unique reach pill
const reachPillClass = 'bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md';

const CardBase: React.FC<CardBaseProps> = ({
  dealName,
  uniqueReach,
  badge,
  subcategory,
  description,
  children,
  type,
  bottomLabel,
}) => {
  const gradientClass = type === 'Evergreen' ? evergreenGradient : seasonalGradient;
  const badgeType = type === 'Seasonal' ? 'Meeting Moments' : type;
  const badgeGradient = badgeGradients[badgeType] || 'bg-muted';
  const categoryBadgeGradient = categoryBadgeGradients[badgeType] || 'bg-muted';
  const subcat = subcategoryGradients[subcategory] || { name: subcategory, className: 'bg-muted text-foreground' };
  return (
    <div className={`flex flex-col justify-between min-h-[440px] max-h-[520px] min-w-[380px] max-w-[440px] ${gradientClass} border border-border rounded-2xl p-6 shadow-lg transition-all duration-300 relative`}> 
      {/* Deal Name */}
      <h2 className="text-2xl font-extrabold text-center text-foreground mb-2 truncate whitespace-nowrap w-full" title={dealName} style={{fontFamily: 'inherit', fontWeight: 800, letterSpacing: '-0.01em'}}>{dealName}</h2>
      {/* Unique Monthly Reach */}
      <div className="flex justify-center mb-2">
        <span className="bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md" title={`Unique Monthly Reach: ${uniqueReach}`}>{uniqueReach}</span>
      </div>
      {/* Badge + Subcategory */}
      <div className="flex items-center justify-center gap-2 mb-3">
        {/* Category badge gradient */}
        <span className={`${categoryBadgeGradient} text-white px-2 py-1 rounded-full text-xs font-semibold`} title={badge}>{badgeType}</span>
        {/* Subcategory badge gradient */}
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${subcat.className}`} title={subcat.name}>{subcat.name}</span>
      </div>
      {/* Description */}
      <p className="text-base text-center text-foreground mb-4 leading-relaxed" title={description}>{description}</p>
      {/* Additional content (children) */}
      <div className="flex-1 flex flex-col justify-end">{children}</div>
      {/* Bottom-left label */}
      {bottomLabel && (
        <div className="absolute left-6 bottom-16">
          <span className="font-bold text-xs text-accent tracking-widest">{bottomLabel}</span>
        </div>
      )}
    </div>
  );
};

export default CardBase; 