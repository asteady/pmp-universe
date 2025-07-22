import React, { useState } from 'react';

interface CardDetailsModalProps {
  open: boolean;
  onClose: () => void;
  deal: any;
}

const tabs = ["Overview", "Data", "Creatives"];

const CardDetailsModal: React.FC<CardDetailsModalProps> = ({ open, onClose, deal }) => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  if (!open) return null;

  // Helper for creative formats
  const creativeFormats = [
    {
      name: "Rich Media",
      desc: "Access the Award Winning Creative Studio at Infillion to create DSP specific multi-click cross-screen compliant Tap to Map, Hotspot Tiles, Minigame, Slider, Tap to Expand, and other engagement driven units."
    },
    {
      name: "IDV",
      desc: "Access the Award Winning Creative Studio at Infillion to curate attention-based Foundation Carousel interactive digital videos."
    },
    {
      name: "Display",
      desc: "Standard Desktop and Mobile Ad Sizes (320x50, 300x250, 320x480, 728x90, 160x600, 300x600, etc.)"
    },
    {
      name: "Video",
      desc: "Duration: 6s, 15s, 30s. Aspect Ratio: 16:9 (landscape). Format: MP4. File Size: <100MB."
    },
    {
      name: "Audio",
      desc: "Duration: 15s, 30s, 60s. Format: MP3. Bitrate: 196kbps. File Size: <2MB."
    },
    {
      name: "Native",
      desc: "Main Image: jpeg, png, or GIF; 1200x627, max 2MB. Main Video: MP4, 5min max, max 2GB. Icon: 100x100. Logo: 100x100. Headline: 90 char. max. Description: 140 char. max. Brand: 25 char. CTA: 15 char."
    }
  ];

  // Example: unique creative examples (should be persona-driven)
  const creativeExamples = deal.creativeExamples || [
    "IDV: Huggies Foundation Carousel for Parenting/Family persona",
    "Rich Media: Tap to Map for Arts & Culture Lovers",
    "Video: 30s CTV Spot for Auto Intenders"
  ];

  // Gradient maps for badges and subcategories (same as CardBase)
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
  const badgeType = deal.type === 'Seasonal' ? 'Meeting Moments' : deal.type;
  const badgeGradient = badgeGradients[badgeType] || 'bg-muted';
  const categoryBadgeGradient = categoryBadgeGradients[badgeType] || 'bg-muted';
  const subcat = subcategoryGradients[deal.subCategory] || { name: deal.subCategory, className: 'bg-muted text-foreground' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-card rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl text-foreground/60 hover:text-foreground">&times;</button>
        {/* Header */}
        <h2 className="text-2xl font-extrabold text-center text-foreground mb-2">{deal.name}</h2>
        <div className="flex justify-center gap-2 mb-2">
          <span className={`bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md`} title={`Unique Monthly Reach: ${deal.scale}`}>{deal.scale}</span>
          <span className={`${categoryBadgeGradient} text-white px-2 py-1 rounded-full text-xs font-semibold`} title={badgeType}>{badgeType}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${subcat.className}`} title={subcat.name}>{subcat.name}</span>
        </div>
        <p className="text-base text-center text-foreground mb-4 leading-relaxed" title={deal.description}>{deal.description}</p>
        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-4">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-full font-semibold transition-colors ${activeTab === tab ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground hover:bg-accent/20'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Tab Content */}
        <div className="min-h-[180px]">
          {activeTab === "Overview" && (
            <div>
              <h3 className="text-lg font-bold mb-2 text-foreground">Use Cases</h3>
              <ul className="list-disc list-inside text-foreground/90 mb-4">
                {(deal.useCases || [
                  "Drive awareness for new product launches",
                  "Reach high-value audience segments with omni-channel creative",
                  "Leverage location and survey data for attribution and insights"
                ]).map((uc: string, idx: number) => (
                  <li key={idx}>{uc}</li>
                ))}
              </ul>
              <h4 className="text-md font-semibold mb-1 text-foreground">Channel & Device Mix</h4>
              <p className="text-foreground/80">Optimized across Video, Display, Audio, and Native with device-specific dynamic creative adaptations for CTV, Mobile, Desktop, and Gaming Consoles.</p>
            </div>
          )}
          {activeTab === "Data" && (
            <div>
              <h3 className="text-lg font-bold mb-2 text-foreground">Survey Questions</h3>
              <ul className="list-disc list-inside text-foreground/90 mb-4">
                {(deal.surveyQuestions || [
                  "How likely are you to purchase this product in the next 6 months?",
                  "Which brands in this category are you most familiar with?",
                  "What factors influence your buying decision?"
                ]).map((q: string, idx: number) => (
                  <li key={idx}>{q}</li>
                ))}
              </ul>
              <h4 className="text-md font-semibold mb-1 text-foreground">Targeting Signals (POIs)</h4>
              {deal.sensitive || deal.type === 'Sensitive' ? (
                <div className="mb-2 text-muted-foreground text-sm">
                  In accordance with Infillion’s privacy standards and platform bylaws, we do not track or target users based on visits to sensitive locations such as hospitals, clinics, reproductive health centers, or places of worship.
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 mb-2">
                  {(deal.pois || []).map((poi: string, idx: number) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium" title={poi}>{poi}</span>
                  ))}
                </div>
              )}
            </div>
          )}
          {activeTab === "Creatives" && (
            <div>
              <h3 className="text-lg font-bold mb-2 text-foreground">EXPERIENTIAL RECOMMENDATIONS</h3>
              <p className="mb-3 text-foreground/80">Rich Media, Interactive Digital Video (IDV), Display (Static), Video, Audio, and Native</p>
              <div className="mb-4">
                {creativeFormats.map(fmt => (
                  <div key={fmt.name} className="mb-2">
                    <button
                      className={`w-full text-left px-4 py-2 rounded bg-muted text-foreground font-semibold transition-colors ${openDropdown === fmt.name ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/20'}`}
                      onClick={() => setOpenDropdown(openDropdown === fmt.name ? null : fmt.name)}
                    >
                      {fmt.name}
                    </button>
                    {openDropdown === fmt.name && (
                      <div className="p-3 bg-muted border-l-4 border-accent text-sm text-foreground/90 rounded-b">
                        {fmt.desc}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardDetailsModal; 