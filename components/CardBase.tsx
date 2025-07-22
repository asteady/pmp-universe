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
        {/* Badge gradient updated below */}
        <span className={`${type === 'Evergreen' ? 'bg-gradient-to-r from-[#1f261c] to-[#31870c]' : 'bg-gradient-to-r from-[#2b4857] to-[#612c4e]'} text-white px-2 py-1 rounded-full text-xs font-semibold`} title={badge}>{badge}</span>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold bg-muted text-foreground`} title={subcategory}>{subcategory}</span>
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