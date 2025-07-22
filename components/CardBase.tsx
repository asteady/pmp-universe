import React from 'react';

interface CardBaseProps {
  dealName: string;
  uniqueReach: string;
  badge: string;
  subcategory: string;
  description: string;
  children?: React.ReactNode;
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
}) => {
  return (
    <div className="flex flex-col justify-between min-h-[420px] max-h-[480px] min-w-[340px] max-w-[400px] bg-card border border-border rounded-2xl p-6 shadow-lg transition-all duration-300">
      {/* Deal Name */}
      <h2 className="text-2xl font-extrabold text-center text-foreground mb-2 truncate" title={dealName}>{dealName}</h2>
      {/* Unique Monthly Reach */}
      <div className="flex justify-center mb-2">
        <span className={reachPillClass} title={`Unique Monthly Reach: ${uniqueReach}`}>{uniqueReach}</span>
      </div>
      {/* Badge + Subcategory */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="bg-emerald-600 text-white px-2 py-1 rounded-full text-xs font-semibold" title={badge}>{badge}</span>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${subcategoryColors[subcategory] || 'bg-muted text-foreground'}`} title={subcategory}>{subcategory}</span>
      </div>
      {/* Description */}
      <p className="text-base text-center text-foreground mb-4 leading-relaxed" title={description}>{description}</p>
      {/* Additional content (POIs, buttons, etc.) */}
      <div className="flex-1 flex flex-col justify-end">{children}</div>
    </div>
  );
};

export default CardBase; 