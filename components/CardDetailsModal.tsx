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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-card rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl text-foreground/60 hover:text-foreground">&times;</button>
        {/* Header */}
        <h2 className="text-2xl font-extrabold text-center text-foreground mb-2">{deal.name}</h2>
        <div className="flex justify-center gap-2 mb-2">
          <span className="bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md" title={`Unique Monthly Reach: ${deal.scale}`}>{deal.scale}</span>
          <span className="bg-emerald-600 text-white px-2 py-1 rounded-full text-xs font-semibold" title={deal.type}>{deal.type}</span>
          <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold" title={deal.subCategory}>{deal.subCategory}</span>
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
              {deal.pois && deal.pois.length > 0 && (
                <>
                  <h4 className="text-md font-semibold mb-1 text-foreground">Targeting Signals (POIs)</h4>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {deal.pois.map((poi: string, idx: number) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium" title={poi}>{poi}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
          {activeTab === "Creatives" && (
            <div>
              <h3 className="text-lg font-bold mb-2 text-foreground">Creative Formats optimized to run with this PMP Deal include:</h3>
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
              <h4 className="text-md font-semibold mb-1 text-foreground">Creative Examples</h4>
              <ul className="list-disc list-inside text-foreground/90">
                {creativeExamples.map((ex: string, idx: number) => (
                  <li key={idx}>{ex}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardDetailsModal; 