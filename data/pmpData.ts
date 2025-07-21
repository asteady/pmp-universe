export type Deal = {
  id: string;
  name: string;
  type: string;
  category: string;
  subCategory?: string; // New field for sub-categories
  description: string;
  scale: string;
  vcr: string;
  ctr: string;
  dealId: string;
  formats: string[];
  creativeExamples: string[];
  targeting: string[];
  performance: {
    vcr: string;
    ctr: string;
    ecpm: string;
  };
  // Enhanced properties for better search and display
  ssp?: string;
  dsp?: string;
  keyBenefits?: string[];
  devices?: string[];
  placements?: string[];
  surveys?: string[];
  seasonal?: string[];
  tentpole?: string[];
};

export const evergreenPMPs: Deal[] = [
  // Performance Sub-Category
  {
    id: 'infil-vcr-xxx',
    name: 'High VCR%',
    type: 'Evergreen',
    category: 'Performance',
    subCategory: 'Performance',
    description: 'Drive brand impact with placements and consumers modeled from our algorithms that consistently deliver 80%+ video completion rates. Optimized with real-time data and high-attention inventory.',
    scale: '150MM monthly active devices',
    vcr: '80%+',
    ctr: '0.4%+',
    dealId: 'infil-vcr-xxx',
    formats: ['Video', 'Display', 'Native', 'Audio'],
    creativeExamples: ['Interactive Video', 'Shoppable Ads', 'QR Codes'],
    targeting: ['High-attention inventory', 'Real-time optimization'],
    performance: { vcr: '80%+', ctr: '0.4%+', ecpm: '$15-25' },
    ssp: 'Nexxen, Magnite, OpenX',
    dsp: 'MediaMath, The Trade Desk, DV360',
    keyBenefits: ['150MM monthly active devices for scale', '80%+ VCR guarantee', '0.4%+ CTR performance', 'Real-time optimization', 'High-attention inventory'],
    devices: ['Smart TV', 'Desktop', 'Mobile Phone', 'Tablet'],
    placements: ['Premium Video', 'CTV/OTT', 'Display Banners', 'Native Ads'],
    surveys: ['Brand Awareness', 'Purchase Intent', 'Ad Recall'],
    seasonal: ['Year-round', 'All Seasons'],
    tentpole: ['Sports Events', 'Entertainment', 'News']
  },
  {
    id: 'infil-ctr-xxx',
    name: 'High CTR%',
    type: 'Evergreen',
    category: 'Performance',
    subCategory: 'Performance',
    description: 'Supercharge traffic with high-performing placements exceeding 0.4% CTR. Built for mid-funnel conversions and interactive performance.',
    scale: '200MM monthly impressions',
    vcr: '75%+',
    ctr: '0.4%+',
    dealId: 'infil-ctr-xxx',
    formats: ['Display', 'Video', 'Rich Media', 'Native'],
    creativeExamples: ['Interactive Banners', 'Shoppable Units', 'Lead Forms'],
    targeting: ['Mid-funnel audiences', 'Conversion-focused'],
    performance: { vcr: '75%+', ctr: '0.4%+', ecpm: '$12-20' },
    ssp: 'Index Exchange, Beachfront, AdsWizz',
    dsp: 'Xandr, MediaMath, The Trade Desk',
    keyBenefits: ['200MM monthly impressions for scale', '75%+ VCR guarantee', '0.4%+ CTR performance', 'Mid-funnel optimization', 'Conversion tracking'],
    devices: ['Desktop', 'Mobile Phone', 'Tablet', 'Connected Device'],
    placements: ['Display Banners', 'Rich Media', 'Native Ads', 'Video'],
    surveys: ['Conversion Intent', 'Brand Consideration', 'Purchase Behavior'],
    seasonal: ['Year-round', 'All Seasons'],
    tentpole: ['E-commerce', 'Retail', 'Technology']
  },
  {
    id: 'infil-viewability-xxx',
    name: 'High Viewability%',
    type: 'Evergreen',
    category: 'Performance',
    subCategory: 'Performance',
    description: 'Premium viewability-focused inventory delivering 85%+ viewability rates. Curated from TrueX and MediaMath programmatic networks.',
    scale: '180MM monthly impressions',
    vcr: '78%+',
    ctr: '0.35%+',
    dealId: 'infil-viewability-xxx',
    formats: ['Display', 'Video', 'Native'],
    creativeExamples: ['Premium Display', 'High-Impact Video', 'Native Content'],
    targeting: ['High-attention users', 'Engaged audiences'],
    performance: { vcr: '78%+', ctr: '0.35%+', ecpm: '$14-22' },
    ssp: 'TrueX, MediaMath, Index Exchange',
    dsp: 'MediaMath, The Trade Desk, DV360',
    keyBenefits: ['85%+ viewability guarantee', 'Premium inventory', 'High-attention targeting', 'Brand safety', 'Engagement optimization'],
    devices: ['Desktop', 'Mobile Phone', 'Tablet'],
    placements: ['Premium Display', 'Video', 'Native'],
    surveys: ['Brand Awareness', 'Ad Recall', 'Engagement'],
    seasonal: ['Year-round', 'All Seasons'],
    tentpole: ['Premium Content', 'News', 'Entertainment']
  },

  // Historical Location/Survey Responses/Bid Stream Data Sub-Category
  {
    id: 'infil-arts-xxx',
    name: 'Arts & Culture Lovers',
    type: 'Evergreen',
    category: 'Historical Location/Survey Responses/Bid Stream Data',
    subCategory: 'Historical Location/Survey Responses/Bid Stream Data',
    description: 'Target cultural enthusiasts engaging with museums, art events, galleries, and local theater. Blend location data and 0P affinity to reach patrons and supporters.',
    scale: '25MM monthly reach',
    vcr: '85%+',
    ctr: '0.6%+',
    dealId: 'infil-arts-xxx',
    formats: ['Video', 'Display', 'Native', 'Audio'],
    creativeExamples: ['Museum Tours', 'Event Previews', 'Artist Spotlights'],
    targeting: ['Museum visitors', 'Art event attendees', 'Cultural venues'],
    performance: { vcr: '85%+', ctr: '0.6%+', ecpm: '$18-28' },
    ssp: 'Nexxen, Magnite, OpenX',
    dsp: 'MediaMath, The Trade Desk, DV360',
    keyBenefits: ['Cultural affinity targeting', 'Location-based insights', 'Survey response data', '30-day refresh cadence', 'Contextual signals'],
    devices: ['Mobile Phone', 'Desktop', 'Tablet'],
    placements: ['Cultural Content', 'Arts Websites', 'Event Pages'],
    surveys: ['Cultural Interests', 'Event Attendance', 'Art Preferences'],
    seasonal: ['Year-round', 'Cultural Events'],
    tentpole: ['Art Fairs', 'Museum Exhibitions', 'Cultural Festivals']
  },
  {
    id: 'infil-auto-xxx',
    name: 'Auto Intenders & Lot Visitors',
    type: 'Evergreen',
    category: 'Historical Location/Survey Responses/Bid Stream Data',
    subCategory: 'Historical Location/Survey Responses/Bid Stream Data',
    description: 'Reach in-market car buyers using first-party lot visitation and predictive shopping behaviors. Segment by brand interest, model loyalty, or financing consideration.',
    scale: '35MM monthly reach',
    vcr: '82%+',
    ctr: '0.5%+',
    dealId: 'infil-auto-xxx',
    formats: ['Video', 'Display', 'Native', 'Rich Media'],
    creativeExamples: ['Dealer Locator', 'Virtual Test Drive', 'Financing Calculator'],
    targeting: ['Dealership visitors', 'Auto shoppers', 'Financing seekers'],
    performance: { vcr: '82%+', ctr: '0.5%+', ecpm: '$20-30' },
    ssp: 'Nexxen, Magnite, OpenX',
    dsp: 'MediaMath, The Trade Desk, DV360',
    keyBenefits: ['Lot visitation data', 'Survey response insights', 'Bid stream signals', '30-day refresh', 'Brand-specific targeting'],
    devices: ['Mobile Phone', 'Desktop', 'Tablet'],
    placements: ['Auto Websites', 'Dealership Pages', 'Financing Sites'],
    surveys: ['Car Shopping Intent', 'Brand Preferences', 'Financing Needs'],
    seasonal: ['Year-round', 'Model Year Changes'],
    tentpole: ['Auto Shows', 'Sales Events', 'Model Launches']
  },
  {
    id: 'infil-restaurant-xxx',
    name: 'Restaurant & Dining Enthusiasts',
    type: 'Evergreen',
    category: 'Historical Location/Survey Responses/Bid Stream Data',
    subCategory: 'Historical Location/Survey Responses/Bid Stream Data',
    description: 'Target food lovers and dining enthusiasts using location data from restaurant visits and survey responses about dining preferences.',
    scale: '45MM monthly reach',
    vcr: '80%+',
    ctr: '0.45%+',
    dealId: 'infil-restaurant-xxx',
    formats: ['Video', 'Display', 'Native', 'Rich Media'],
    creativeExamples: ['Restaurant Reviews', 'Menu Previews', 'Reservation Tools'],
    targeting: ['Restaurant visitors', 'Food enthusiasts', 'Dining app users'],
    performance: { vcr: '80%+', ctr: '0.45%+', ecpm: '$16-24' },
    ssp: 'Nexxen, Magnite, OpenX',
    dsp: 'MediaMath, The Trade Desk, DV360',
    keyBenefits: ['Restaurant visitation data', 'Dining preference surveys', 'Bid stream context', '30-day refresh', 'Cuisine-specific targeting'],
    devices: ['Mobile Phone', 'Desktop', 'Tablet'],
    placements: ['Food Websites', 'Restaurant Apps', 'Review Sites'],
    surveys: ['Dining Preferences', 'Cuisine Interests', 'Restaurant Habits'],
    seasonal: ['Year-round', 'Holiday Dining'],
    tentpole: ['Food Festivals', 'Restaurant Week', 'Holiday Meals']
  },

  // Sensitive Sub-Category
  {
    id: 'infil-cannabis-xxx',
    name: 'Cannabis & CBD',
    type: 'Evergreen',
    category: 'Sensitive',
    subCategory: 'Sensitive',
    description: 'Target cannabis and CBD consumers with compliant advertising solutions. Age-gated and geo-targeted for legal markets.',
    scale: '15MM monthly reach',
    vcr: '75%+',
    ctr: '0.4%+',
    dealId: 'infil-cannabis-xxx',
    formats: ['Display', 'Native', 'Rich Media'],
    creativeExamples: ['Educational Content', 'Product Information', 'Compliance Messaging'],
    targeting: ['Age 21+', 'Legal markets', 'Cannabis enthusiasts'],
    performance: { vcr: '75%+', ctr: '0.4%+', ecpm: '$25-35' },
    ssp: 'Specialized SSPs',
    dsp: 'Compliant DSPs',
    keyBenefits: ['Age verification', 'Geo-targeting', 'Compliance focus', 'Educational content', 'Legal market access'],
    devices: ['Mobile Phone', 'Desktop', 'Tablet'],
    placements: ['Cannabis Content', 'Lifestyle Sites', 'Health & Wellness'],
    surveys: ['Cannabis Knowledge', 'Usage Patterns', 'Legal Awareness'],
    seasonal: ['Year-round'],
    tentpole: ['4/20', 'Legalization Events', 'Cannabis Conferences']
  },
  {
    id: 'infil-pharma-hcp-xxx',
    name: 'Pharma HCP',
    type: 'Evergreen',
    category: 'Sensitive',
    subCategory: 'Sensitive',
    description: 'Target healthcare professionals with pharmaceutical advertising. Compliant with medical advertising regulations.',
    scale: '8MM monthly reach',
    vcr: '70%+',
    ctr: '0.3%+',
    dealId: 'infil-pharma-hcp-xxx',
    formats: ['Display', 'Native', 'Rich Media'],
    creativeExamples: ['Clinical Information', 'Medical Education', 'Professional Resources'],
    targeting: ['Healthcare professionals', 'Medical practitioners', 'Clinical decision makers'],
    performance: { vcr: '70%+', ctr: '0.3%+', ecpm: '$30-40' },
    ssp: 'Medical SSPs',
    dsp: 'Healthcare DSPs',
    keyBenefits: ['HCP verification', 'Medical compliance', 'Clinical content', 'Professional targeting', 'Regulatory adherence'],
    devices: ['Desktop', 'Mobile Phone', 'Tablet'],
    placements: ['Medical Journals', 'Healthcare Sites', 'Professional Networks'],
    surveys: ['Medical Knowledge', 'Prescribing Patterns', 'Clinical Interests'],
    seasonal: ['Year-round'],
    tentpole: ['Medical Conferences', 'Clinical Trials', 'FDA Approvals']
  },
  {
    id: 'infil-gambling-xxx',
    name: 'Gambling & Gaming',
    type: 'Evergreen',
    category: 'Sensitive',
    subCategory: 'Sensitive',
    description: 'Target gaming and gambling enthusiasts with responsible gaming messaging and age-appropriate content.',
    scale: '20MM monthly reach',
    vcr: '78%+',
    ctr: '0.5%+',
    dealId: 'infil-gambling-xxx',
    formats: ['Video', 'Display', 'Rich Media'],
    creativeExamples: ['Game Previews', 'Responsible Gaming', 'Tournament Information'],
    targeting: ['Age 21+', 'Gaming enthusiasts', 'Responsible players'],
    performance: { vcr: '78%+', ctr: '0.5%+', ecpm: '$22-32' },
    ssp: 'Gaming SSPs',
    dsp: 'Gaming DSPs',
    keyBenefits: ['Age verification', 'Responsible gaming', 'Gaming content', 'Tournament access', 'Player protection'],
    devices: ['Mobile Phone', 'Desktop', 'Tablet'],
    placements: ['Gaming Sites', 'Sports Betting', 'Casino Content'],
    surveys: ['Gaming Habits', 'Responsible Play', 'Tournament Interest'],
    seasonal: ['Year-round', 'Sports Seasons'],
    tentpole: ['Sports Events', 'Gaming Tournaments', 'Casino Promotions']
  }
]; 