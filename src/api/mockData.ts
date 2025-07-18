// Enhanced Mock Data for Infillion Analytics Dashboard
// Realistic campaign data with actual advertisers and campaign names

const realisticAdvertisers = [
  'Procter & Gamble', 'Nike', 'Coca-Cola', 'McDonald\'s', 'Apple', 
  'Amazon', 'Disney', 'Marriott', 'Lexus', 'Verizon', 'AT&T', 'Samsung',
  'Target', 'Walmart', 'Starbucks', 'Netflix', 'Spotify', 'Uber', 'Airbnb',
  'Tesla', 'Microsoft', 'Google', 'Meta', 'Intel', 'Ford', 'Toyota'
]

const realisticCampaignNames = [
  'Pampers Spring 2024', 'Nike Run Club', 'Coca-Cola Summer Refresh', 'McDonald\'s Happy Meal',
  'iPhone 15 Launch', 'Amazon Prime Day', 'Disney+ Family Plan', 'Marriott Bonvoy Summer',
  'Lexus RX Launch', 'Verizon 5G Unlimited', 'AT&T Fiber', 'Samsung Galaxy S24',
  'Target Back to School', 'Walmart Holiday Savings', 'Starbucks Pumpkin Spice',
  'Netflix Stranger Things', 'Spotify Wrapped', 'Uber Eats', 'Airbnb Experiences',
  'Tesla Model Y', 'Microsoft 365', 'Google Pixel', 'Meta Quest', 'Intel Core i9',
  'Ford F-150 Lightning', 'Toyota Camry Hybrid'
]

const realisticStrategyNames = [
  'Awareness', 'Consideration', 'Conversion', 'Retargeting', 'Cross-Device',
  'Loyalty', 'Acquisition', 'Engagement', 'Brand Safety', 'Performance'
]

const realisticCreativeNames = [
  'Pampers_30s_Video_A', 'NikeRC_15s_Video_B', 'CocaCola_Display_Leaderboard',
  'McDonalds_MPU_Static', 'iPhone15_30s_Video_C', 'AmazonPrime_Display_Banner',
  'DisneyPlus_Display_MPU', 'Marriott_15s_Video_C', 'LexusRX_Display_Leaderboard',
  'Verizon5G_30s_Video_A', 'ATTFiber_Display_Banner', 'SamsungGalaxy_15s_Video_B',
  'TargetBTS_Display_MPU', 'WalmartHoliday_30s_Video_A', 'StarbucksPS_Display_Banner',
  'NetflixST_15s_Video_C', 'SpotifyWrapped_Display_Leaderboard', 'UberEats_30s_Video_A',
  'AirbnbExp_Display_MPU', 'TeslaModelY_15s_Video_B', 'Microsoft365_Display_Banner',
  'GooglePixel_30s_Video_C', 'MetaQuest_Display_Leaderboard', 'IntelCore_15s_Video_A',
  'FordF150_Display_MPU', 'ToyotaCamry_30s_Video_B'
]

const realisticSiteDomains = [
  'cnn.com', 'nytimes.com', 'washingtonpost.com', 'usatoday.com', 'foxnews.com',
  'abcnews.go.com', 'cbsnews.com', 'nbcnews.com', 'reuters.com', 'bloomberg.com',
  'wsj.com', 'ft.com', 'techcrunch.com', 'wired.com', 'theverge.com',
  'engadget.com', 'mashable.com', 'gizmodo.com', 'arstechnica.com', 'venturebeat.com',
  'forbes.com', 'businessinsider.com', 'cnbc.com', 'marketwatch.com', 'yahoo.com'
]

const realisticCities = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 
  'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville',
  'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco', 'Indianapolis', 
  'Seattle', 'Denver', 'Washington', 'Boston', 'El Paso', 'Nashville', 
  'Detroit', 'Oklahoma City', 'Portland', 'Las Vegas', 'Memphis', 'Louisville', 'Baltimore'
]

const realisticRegions = [
  'NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'FL', 'OH', 'GA', 'NC', 'MI', 'WA',
  'CO', 'VA', 'MA', 'TN', 'IN', 'MO', 'MD', 'WI', 'MN', 'LA', 'AL', 'SC',
  'KY', 'OR', 'OK', 'CT', 'IA', 'MS', 'AR', 'KS', 'UT', 'NV', 'NM', 'NE',
  'WV', 'ID', 'HI', 'NH', 'ME', 'RI', 'MT', 'DE', 'SD', 'ND', 'AK', 'VT', 'WY'
]

// Infillion Taxonomy Audience Segments with definitions
const audienceSegments = [
  {
    id: 'arts-entertainment',
    name: 'Location-based > Interest > Arts and Entertainment',
    definition: 'This audience comprises consumers who have visited fine arts schools, performing arts companies, casinos, amusement parks, and various entertainment venues in the past six months. They are deeply engaged in arts and entertainment, making them ideal targets for promotions related to live performances, motion pictures, and recreational activities.',
    category: 'Location-based',
    subcategory: 'Interest',
    segment: 'Arts and Entertainment',
    impressions: 2450000,
    clicks: 125000,
    conversions: 8500,
    revenue: 425000,
    spend: 98000,
    ctr: 0.051,
    cpa: 11.53,
    roi: 4.34,
    viewability: 0.87,
    vcr: 0.72,
    confidence: 0.94,
    color: '#00d4ff'
  },
  {
    id: 'theatre-musicals',
    name: 'Location-based > Interest > Arts and Entertainment > Theatre and Musicals',
    definition: 'This audience is passionate about arts and entertainment, frequently visiting performing arts companies, motion picture theaters, and video industries in the past six months. They are ideal candidates for theatrical performances and cinema-related promotions, enjoying experiences that encompass theatre, musicals, and the latest films.',
    category: 'Location-based',
    subcategory: 'Interest',
    segment: 'Theatre and Musicals',
    impressions: 1850000,
    clicks: 98000,
    conversions: 7200,
    revenue: 360000,
    spend: 75000,
    ctr: 0.053,
    cpa: 10.42,
    roi: 4.80,
    viewability: 0.89,
    vcr: 0.75,
    confidence: 0.96,
    color: '#ff69b4'
  },
  {
    id: 'sporting-events',
    name: 'Location-based > Interest > Arts and Entertainment > Sporting Events',
    definition: 'This audience comprises consumers who have visited locations related to sports and recreation in the past six months, such as fitness centers, golf courses, and spectator sports venues. They are likely to be interested in sports events, recreational activities, and purchasing related merchandise, making them ideal targets for sports and entertainment promotions.',
    category: 'Location-based',
    subcategory: 'Interest',
    segment: 'Sporting Events',
    impressions: 3200000,
    clicks: 168000,
    conversions: 11200,
    revenue: 560000,
    spend: 125000,
    ctr: 0.053,
    cpa: 11.16,
    roi: 4.48,
    viewability: 0.85,
    vcr: 0.68,
    confidence: 0.92,
    color: '#8b5cf6'
  },
  {
    id: 'automotive',
    name: 'Location-based > Interest > Automotive',
    definition: 'This audience comprises consumers who have visited various automotive-related locations in the past 6 months, making them ideal for marketing automotive products and services. Key categories include automobile dealers, motor vehicle parts and supplies wholesalers, automotive repair and maintenance shops, and new car dealers.',
    category: 'Location-based',
    subcategory: 'Interest',
    segment: 'Automotive',
    impressions: 4100000,
    clicks: 205000,
    conversions: 15200,
    revenue: 760000,
    spend: 168000,
    ctr: 0.050,
    cpa: 11.05,
    roi: 4.52,
    viewability: 0.83,
    vcr: 0.71,
    confidence: 0.91,
    color: '#00ff88'
  },
  {
    id: 'business-finance',
    name: 'Location-based > Interest > Business and Finance',
    definition: 'This audience consists of consumers who have visited business-related locations in the past 6 months, such as business schools, accounting firms, and investment advisory services. They are likely interested in business and finance, making them ideal for marketing financial products, professional services, and educational programs in finance and management.',
    category: 'Location-based',
    subcategory: 'Interest',
    segment: 'Business and Finance',
    impressions: 2800000,
    clicks: 140000,
    conversions: 9800,
    revenue: 490000,
    spend: 112000,
    ctr: 0.050,
    cpa: 11.43,
    roi: 4.38,
    viewability: 0.86,
    vcr: 0.73,
    confidence: 0.93,
    color: '#ffd700'
  },
  {
    id: 'food-drink',
    name: 'Location-based > Interest > Food and Drink',
    definition: 'This audience is likely to have a strong interest in food and drink, making them ideal for marketing opportunities related to dining and beverage experiences. They frequently visit grocery stores, specialty food stores, restaurants, beer and wine stores, and breweries, indicating a high engagement with both everyday and specialty food and drink occasions.',
    category: 'Location-based',
    subcategory: 'Interest',
    segment: 'Food and Drink',
    impressions: 5200000,
    clicks: 260000,
    conversions: 18200,
    revenue: 910000,
    spend: 198000,
    ctr: 0.050,
    cpa: 10.88,
    roi: 4.60,
    viewability: 0.84,
    vcr: 0.69,
    confidence: 0.90,
    color: '#ff6b35'
  },
  {
    id: 'healthy-living',
    name: 'Location-based > Interest > Healthy Living',
    definition: 'This audience is characterized by their visits to health-centric locations, such as food supplement stores, fitness centers, and health and personal care stores, over the past six months. They are likely to be interested in healthy living and wellness products, making them ideal for marketing health supplements, fitness programs, and personal care items.',
    category: 'Location-based',
    subcategory: 'Interest',
    segment: 'Healthy Living',
    impressions: 3600000,
    clicks: 180000,
    conversions: 12600,
    revenue: 630000,
    spend: 142000,
    ctr: 0.050,
    cpa: 11.27,
    roi: 4.44,
    viewability: 0.88,
    vcr: 0.74,
    confidence: 0.95,
    color: '#00ffcc'
  },
  {
    id: 'shopping',
    name: 'Location-based > Interest > Shopping',
    definition: 'This audience consists of consumers with a strong interest in shopping, having visited locations such as electronic stores, apparel shops, department stores, and malls in the past six months. They are prime targets for marketing campaigns focused on clothing, furniture, beauty supplies, health products, and general merchandise.',
    category: 'Location-based',
    subcategory: 'Interest',
    segment: 'Shopping',
    impressions: 4800000,
    clicks: 240000,
    conversions: 16800,
    revenue: 840000,
    spend: 185000,
    ctr: 0.050,
    cpa: 11.01,
    roi: 4.54,
    viewability: 0.82,
    vcr: 0.67,
    confidence: 0.89,
    color: '#ff1493'
  },
  {
    id: 'technology-computing',
    name: 'Location-based > Interest > Technology and Computing',
    definition: 'This audience consists of tech-savvy consumers who have visited locations related to technology, education, and electronics in the past 6 months. Key categories include electronics stores, business schools, technical and trade schools, and medical and diagnostic laboratories, indicating an interest in cutting-edge gadgets, professional development, and specialized technical services.',
    category: 'Location-based',
    subcategory: 'Interest',
    segment: 'Technology and Computing',
    impressions: 3400000,
    clicks: 170000,
    conversions: 11900,
    revenue: 595000,
    spend: 135000,
    ctr: 0.050,
    cpa: 11.34,
    roi: 4.41,
    viewability: 0.85,
    vcr: 0.70,
    confidence: 0.92,
    color: '#00bfff'
  },
  {
    id: 'travel',
    name: 'Location-based > Interest > Travel',
    definition: 'This audience consists of consumers who have shown a keen interest in travel by visiting places related to travel arrangement services, traveler accommodations, and RV parks within the past six months. They are ideal for travel-related promotions, offering potential for engagement with travel agencies, recreational camps, and rail transportation services.',
    category: 'Location-based',
    subcategory: 'Interest',
    segment: 'Travel',
    impressions: 2200000,
    clicks: 110000,
    conversions: 7700,
    revenue: 385000,
    spend: 89000,
    ctr: 0.050,
    cpa: 11.56,
    roi: 4.33,
    viewability: 0.87,
    vcr: 0.72,
    confidence: 0.94,
    color: '#32cd32'
  },
  {
    id: 'luxury-auto-intenders',
    name: 'Location-based > Intent > Automotive Ownership > Luxury Vehicles',
    definition: 'This audience consists of consumers whose recent visitation behaviors suggest they are in-market for luxury automotive products or services. They frequently visit high-end car dealerships, luxury vehicle showrooms, and premium automotive service centers, making them ideal targets for luxury car brands and premium automotive services.',
    category: 'Location-based',
    subcategory: 'Intent',
    segment: 'Luxury Auto Intenders',
    impressions: 1200000,
    clicks: 72000,
    conversions: 6400,
    revenue: 320000,
    spend: 58000,
    ctr: 0.060,
    cpa: 9.06,
    roi: 5.52,
    viewability: 0.91,
    vcr: 0.78,
    confidence: 0.97,
    color: '#ff4500'
  },
  {
    id: 'home-buyers',
    name: 'Location-based > Intent > Home Buyer',
    definition: 'This audience comprises consumers whose recent visitation behaviors suggest they are actively in-market for home-buying related products and services. They frequent depository credit institutions, real estate agencies, mortgage brokers, and consumer lending offices, indicating a strong interest in purchasing or investing in real estate.',
    category: 'Location-based',
    subcategory: 'Intent',
    segment: 'Home Buyers',
    impressions: 1800000,
    clicks: 90000,
    conversions: 6300,
    revenue: 315000,
    spend: 72000,
    ctr: 0.050,
    cpa: 11.43,
    roi: 4.38,
    viewability: 0.86,
    vcr: 0.73,
    confidence: 0.93,
    color: '#9370db'
  },
  {
    id: 'fitness-enthusiasts',
    name: 'Location-based > Interest > Healthy Living > Fitness and Exercise',
    definition: 'This audience is passionate about fitness and exercise, frequently visiting fitness and recreational sports centers, as well as participating in sports and recreation instruction. They are ideal for promotions related to gyms, fitness gear, and health-focused events.',
    category: 'Location-based',
    subcategory: 'Interest',
    segment: 'Fitness and Exercise',
    impressions: 2900000,
    clicks: 145000,
    conversions: 10150,
    revenue: 507500,
    spend: 115000,
    ctr: 0.050,
    cpa: 11.33,
    roi: 4.41,
    viewability: 0.88,
    vcr: 0.74,
    confidence: 0.95,
    color: '#ff6347'
  },
  {
    id: 'dining-out',
    name: 'Location-based > Interest > Food and Drink > Dining Out',
    definition: 'This audience comprises individuals who have visited full-service and limited-service restaurants within the past six months, indicating a strong interest in dining out. Ideal for marketing food and beverage offerings, they are likely to be receptive to promotions for new restaurant openings, dining experiences, and related culinary events.',
    category: 'Location-based',
    subcategory: 'Interest',
    segment: 'Dining Out',
    impressions: 3800000,
    clicks: 190000,
    conversions: 13300,
    revenue: 665000,
    spend: 150000,
    ctr: 0.050,
    cpa: 11.28,
    roi: 4.43,
    viewability: 0.85,
    vcr: 0.71,
    confidence: 0.92,
    color: '#ff8c00'
  },
  {
    id: 'tech-early-adopters',
    name: 'Location-based > Intent > Technology and Computing',
    definition: 'This audience consists of consumers whose recent visitation behaviors suggest they are in-market for technology and computing products or services. Key categories include electronics and appliance stores, electronic shopping and mail-order houses, and telecommunications carriers, indicating a strong interest in acquiring and maintaining electronic goods and services.',
    category: 'Location-based',
    subcategory: 'Intent',
    segment: 'Technology and Computing',
    impressions: 2600000,
    clicks: 130000,
    conversions: 9100,
    revenue: 455000,
    spend: 105000,
    ctr: 0.050,
    cpa: 11.54,
    roi: 4.33,
    viewability: 0.87,
    vcr: 0.72,
    confidence: 0.94,
    color: '#00ced1'
  }
]

// Remove all top-level Math.random and Date.now usage
// Export functions like getCampaignData, getGeoDeviceData, etc. that generate and return the data
export const getCampaignData = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    date: new Date(2025, 6, i + 1).toISOString().split('T')[0],
    campaign_name: realisticCampaignNames[i % realisticCampaignNames.length],
    campaign_id: `camp_${i + 1}`,
    strategy_name: realisticStrategyNames[i % realisticStrategyNames.length],
    strategy_id: `strat_${i + 1}`,
    strategy_type: ['Display', 'Video', 'Mobile', 'Connected TV'][i % 4],
    audience_segment_name: `Audience ${i + 1}`,
    advertiser: realisticAdvertisers[i % realisticAdvertisers.length],
    creative: realisticCreativeNames[i % realisticCreativeNames.length],
    impressions: Math.floor(Math.random() * 1000000) + 100000,
    clicks: Math.floor(Math.random() * 50000) + 1000,
    total_conversions: Math.floor(Math.random() * 5000) + 100,
    total_revenue: Math.floor(Math.random() * 100000) + 5000,
    total_spend: Math.floor(Math.random() * 50000) + 2000,
    ctr: Number((Math.random() * 0.1 + 0.01).toFixed(4)),
    cpa: Number((Math.random() * 50 + 10).toFixed(2)),
    roi: Number((Math.random() * 3 + 0.5).toFixed(2)),
    viewability_rate: Number((Math.random() * 0.3 + 0.7).toFixed(4)),
    vcr: Number((Math.random() * 0.4 + 0.6).toFixed(4)),
    dwell_time: Number((Math.random() * 30 + 10).toFixed(2)),
    site_domain: realisticSiteDomains[i % realisticSiteDomains.length],
    city_name: realisticCities[i % realisticCities.length],
    demographic_discrepancy: Number((Math.random() * 0.5).toFixed(4)),
    inventory_type: ['premium', 'programmatic', 'direct'][i % 3],
    channel: ['Display', 'Video', 'Mobile', 'Connected TV'][i % 4],
    device_type: ['Desktop', 'Mobile', 'Tablet', 'Connected TV'][i % 4],
    poi: `${realisticCities[i % realisticCities.length]} Store`,
    completed_views: Math.floor(Math.random() * 80000) + 5000,
    confidence: Number((Math.random() * 0.2 + 0.8).toFixed(2))
  }))
}

export const getNewToBrandData = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    ...getCampaignData(1)[0], // Reuse campaignData for consistency
    new_to_brand_conversions: Math.floor(Math.random() * 2000) + 50,
    new_to_brand_revenue: Math.floor(Math.random() * 50000) + 2000,
    new_to_brand_cpa: Number((Math.random() * 40 + 15).toFixed(2)),
    new_to_brand_roi: Number((Math.random() * 2.5 + 0.8).toFixed(2)),
    returning_conversions: Math.floor(Math.random() * 3000) + 50,
    returning_revenue: Math.floor(Math.random() * 60000) + 3000,
    lookback_window: [30, 60, 90, 180][i % 4]
  }))
}

export const getViewabilityData = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    ...getCampaignData(1)[0], // Reuse campaignData for consistency
    in_view_impressions: Math.floor(getCampaignData(1)[0].impressions * (Math.random() * 0.3 + 0.7)),
    viewability_rate: Number((Math.random() * 0.3 + 0.7).toFixed(4)),
    viewability_provider: ['IAS', 'Moat', 'DoubleVerify', 'Comscore'][i % 4],
    vcr: Number((Math.random() * 0.4 + 0.6).toFixed(4)),
    video_starts: Math.floor(Math.random() * 100000) + 10000,
    video_completions: Math.floor(Math.random() * 80000) + 5000,
    creative_size: ['300x250', '728x90', '160x600', '320x50', '970x250'][i % 5],
    channel_type: ['Display', 'Video', 'Mobile', 'Connected TV'][i % 4]
  }))
}

export const getGeoDeviceData = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    ...getCampaignData(1)[0], // Reuse campaignData for consistency
    country: 'United States',
    region: realisticRegions[i % realisticRegions.length],
    city: realisticCities[i % realisticCities.length],
    dma: `${realisticCities[i % realisticCities.length]} DMA`,
    zip_code: `${Math.floor(Math.random() * 99999) + 10000}`,
    device_type: ['Desktop', 'Mobile', 'Tablet', 'Connected TV'][i % 4],
    device_make: ['Apple', 'Samsung', 'Google', 'Microsoft', 'LG', 'Sony'][i % 6],
    device_model: ['iPhone', 'Galaxy', 'Pixel', 'Surface', 'G Series', 'Bravia'][i % 6],
    os_type: ['iOS', 'Android', 'Windows', 'macOS', 'Linux'][i % 5],
    browser: ['Chrome', 'Safari', 'Firefox', 'Edge', 'Opera'][i % 5],
    age_group: ['18-24', '25-34', '35-44', '45-54', '55+'][i % 5],
    gender: ['Male', 'Female', 'Other'][i % 3],
    hh_income: ['<$50K', '$50K-$100K', '$100K-$150K', '$150K+'][i % 4],
    demographic_discrepancy: Number((Math.random() * 0.5).toFixed(4)),
    impressions: Math.floor(Math.random() * 500000) + 50000,
    clicks: Math.floor(Math.random() * 25000) + 500,
    conversions: Math.floor(Math.random() * 2000) + 50,
    revenue: Math.floor(Math.random() * 50000) + 2000,
    spend: Math.floor(Math.random() * 25000) + 1000
  }))
}

export const getPlacementData = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    date: new Date(2025, 6, (i % 30) + 1).toISOString().split('T')[0],
    site_domain: realisticSiteDomains[i % realisticSiteDomains.length],
    app_name: ['Facebook', 'Instagram', 'TikTok', 'YouTube', 'Twitter', 'LinkedIn', 'Snapchat', 'Pinterest'][i % 8],
    primary_seller_name: ['Google', 'Facebook', 'Amazon', 'Microsoft', 'Twitter', 'TikTok', 'Snap Inc'][i % 7],
    inventory_type: ['premium', 'programmatic', 'direct'][i % 3],
    impressions: Math.floor(Math.random() * 500000) + 50000,
    clicks: Math.floor(Math.random() * 25000) + 500,
    total_conversions: Math.floor(Math.random() * 2000) + 50,
    ctr: Number((Math.random() * 0.08 + 0.01).toFixed(4)),
    cpa: Number((Math.random() * 60 + 15).toFixed(2)),
    companion_clicks: Math.floor(Math.random() * 1000) + 10,
    video_starts: Math.floor(Math.random() * 50000) + 1000,
    skipped_impressions: Math.floor(Math.random() * 10000) + 100,
    rank: i + 1,
    goal_impressions: Math.floor(Math.random() * 600000) + 100000,
    budget_spent: Math.floor(Math.random() * 40000) + 5000,
    total_budget: Math.floor(Math.random() * 50000) + 10000,
    advertiser: realisticAdvertisers[i % realisticAdvertisers.length],
    campaign_name: realisticCampaignNames[i % realisticCampaignNames.length]
  }))
}

export const getFootTrafficData = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const advertiser = realisticAdvertisers[i % realisticAdvertisers.length]
    
    // Generate realistic dwell times based on advertiser type
    let dwellTime: number
    if (advertiser.includes('McDonald') || advertiser.includes('Starbucks') || advertiser.includes('7/11')) {
      // Quick service restaurants: 5-15 minutes
      dwellTime = Math.random() * 10 + 5
    } else if (advertiser.includes('Target') || advertiser.includes('Walmart') || advertiser.includes('Amazon')) {
      // Retail stores: 20-60 minutes
      dwellTime = Math.random() * 40 + 20
    } else if (advertiser.includes('Marriott') || advertiser.includes('Disney') || advertiser.includes('Netflix')) {
      // Entertainment/hospitality: 30-90 minutes
      dwellTime = Math.random() * 60 + 30
    } else if (advertiser.includes('Apple') || advertiser.includes('Samsung') || advertiser.includes('Tesla')) {
      // Tech/electronics: 15-45 minutes
      dwellTime = Math.random() * 30 + 15
    } else {
      // Default: 10-40 minutes
      dwellTime = Math.random() * 30 + 10
    }

    return {
      date: new Date(2025, 6, i + 1).toISOString().split('T')[0],
      city_name: realisticCities[i % realisticCities.length],
      region_name: realisticRegions[i % realisticRegions.length],
      device_type: ['Mobile', 'Desktop', 'Tablet'][i % 3],
      poi_name: `${realisticCities[i % realisticCities.length]} Store`,
      poi_category: ['Retail', 'Restaurant', 'Entertainment', 'Automotive', 'Technology'][i % 5],
      visits: Math.floor(Math.random() * 1000) + 100,
      unique_visitors: Math.floor(Math.random() * 800) + 80,
      dwell_time: Number(dwellTime.toFixed(2)),
      distance_traveled: Number((Math.random() * 20 + 1).toFixed(1)),
      time_of_day: ['Morning', 'Afternoon', 'Evening', 'Night'][i % 4],
      day_of_week: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i % 7],
      weather_condition: ['Sunny', 'Cloudy', 'Rainy', 'Snowy'][i % 4],
      traffic_source: ['Organic', 'Paid Search', 'Social Media', 'Direct'][i % 4],
      conversion_rate: Number((Math.random() * 0.1 + 0.02).toFixed(4)),
      revenue_per_visit: Number((Math.random() * 50 + 10).toFixed(2)),
      advertiser: advertiser,
      campaign_name: realisticCampaignNames[i % realisticCampaignNames.length]
    }
  })
}

// New function to get audience segment data
export const getAudienceSegmentData = () => {
  return audienceSegments
}

// Enhanced audience performance data with realistic metrics
export const getAudiencePerformanceData = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const segment = audienceSegments[i % audienceSegments.length]
    const baseImpressions = segment.impressions
    const baseClicks = segment.clicks
    const baseConversions = segment.conversions
    
    // Add some variation to make it more realistic
    const variation = 0.2 // 20% variation
    const impressions = Math.floor(baseImpressions * (1 + (Math.random() - 0.5) * variation))
    const clicks = Math.floor(baseClicks * (1 + (Math.random() - 0.5) * variation))
    const conversions = Math.floor(baseConversions * (1 + (Math.random() - 0.5) * variation))
    const revenue = Math.floor(conversions * (Math.random() * 50 + 25)) // $25-75 per conversion
    const spend = Math.floor(impressions * (Math.random() * 0.02 + 0.01)) // $0.01-0.03 per impression
    
    return {
      id: segment.id,
      name: segment.name,
      definition: segment.definition,
      category: segment.category,
      subcategory: segment.subcategory,
      segment: segment.segment,
      impressions,
      clicks,
      conversions,
      revenue,
      spend,
      ctr: Number((clicks / impressions).toFixed(4)),
      cpa: Number((spend / conversions).toFixed(2)),
      roi: Number((revenue / spend).toFixed(2)),
      viewability: Number((Math.random() * 0.2 + 0.8).toFixed(2)),
      vcr: Number((Math.random() * 0.3 + 0.6).toFixed(2)),
      confidence: Number((Math.random() * 0.1 + 0.9).toFixed(2)),
      color: segment.color,
      advertiser: realisticAdvertisers[i % realisticAdvertisers.length],
      campaign_name: realisticCampaignNames[i % realisticCampaignNames.length],
      strategy_name: realisticStrategyNames[i % realisticStrategyNames.length],
      creative_name: realisticCreativeNames[i % realisticCreativeNames.length],
      channel: ['Display', 'Video', 'Mobile', 'Connected TV'][i % 4],
      device_type: ['Desktop', 'Mobile', 'Tablet', 'Connected TV'][i % 4],
      poi: `${realisticCities[i % realisticCities.length]} Store`,
      completed_views: Math.floor(impressions * (Math.random() * 0.3 + 0.6)),
      discrepancy: Number((Math.random() * 0.5).toFixed(4))
    }
  })
}

export const getChartData = (data: any[], type: string, options: any = {}) => {
  if (!data || data.length === 0) {
    return {
      labels: [],
      datasets: [{
        label: 'No Data',
        data: [],
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
      }]
    }
  }

  const { groupBy, metric, limit = 10 } = options

  let processedData = data

  if (groupBy) {
    const grouped = data.reduce((acc, item) => {
      const key = item[groupBy]
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(item)
      return acc
    }, {})

    processedData = Object.entries(grouped).map(([key, items]: [string, any]) => ({
      [groupBy]: key,
      ...items.reduce((acc: any, item: any) => {
        Object.keys(item).forEach(k => {
          if (typeof item[k] === 'number') {
            acc[k] = (acc[k] || 0) + item[k]
          }
        })
        return acc
      }, {})
    }))
  }

  if (limit) {
    processedData = processedData.slice(0, limit)
  }

  const labels = processedData.map(item => item[groupBy] || item.name || item.campaign_name || 'Unknown')
  const values = processedData.map(item => item[metric] || 0)

  const colors = [
    'rgba(0, 212, 255, 0.8)',
    'rgba(255, 105, 180, 0.8)',
    'rgba(139, 92, 246, 0.8)',
    'rgba(0, 255, 136, 0.8)',
    'rgba(255, 215, 0, 0.8)',
    'rgba(255, 69, 0, 0.8)',
    'rgba(138, 43, 226, 0.8)',
    'rgba(0, 191, 255, 0.8)',
    'rgba(255, 20, 147, 0.8)',
    'rgba(50, 205, 50, 0.8)'
  ]

  return {
    labels,
    datasets: [{
      label: metric || 'Value',
      data: values,
      backgroundColor: type === 'doughnut' || type === 'pie' ? colors.slice(0, labels.length) : colors[0],
      borderColor: type === 'line' ? colors[0] : undefined,
      borderWidth: type === 'line' ? 2 : 1
    }]
  }
}

export const getBadgeConditions = (data: any[]) => {
  if (!data || data.length === 0) return []

  const totalImpressions = data.reduce((sum, item) => sum + (item.impressions || 0), 0)
  const totalClicks = data.reduce((sum, item) => sum + (item.clicks || 0), 0)
  const totalConversions = data.reduce((sum, item) => sum + (item.conversions || item.total_conversions || 0), 0)
  const avgCTR = totalImpressions > 0 ? totalClicks / totalImpressions : 0
  const avgROI = data.reduce((sum, item) => sum + (item.roi || 0), 0) / data.length

  return [
    {
      label: 'High Volume',
      value: totalImpressions > 1000000 ? 'Active' : 'Inactive',
      color: totalImpressions > 1000000 ? 'neon-green' : 'gray'
    },
    {
      label: 'High CTR',
      value: avgCTR > 0.05 ? 'Active' : 'Inactive',
      color: avgCTR > 0.05 ? 'neon-blue' : 'gray'
    },
    {
      label: 'High ROI',
      value: avgROI > 3 ? 'Active' : 'Inactive',
      color: avgROI > 3 ? 'neon-purple' : 'gray'
    },
    {
      label: 'High Conversions',
      value: totalConversions > 1000 ? 'Active' : 'Inactive',
      color: totalConversions > 1000 ? 'neon-pink' : 'gray'
    }
  ]
}

export const getLeaderboardData = (data: any[], metric: string) => {
  if (!data || data.length === 0) return []

  return data
    .map(item => ({
      name: item.name || item.campaign_name || item.advertiser || 'Unknown',
      value: item[metric] || 0,
      change: Math.random() * 20 - 10 // Random change between -10 and +10
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10)
}

export const getProgressData = (data: any[]) => {
  if (!data || data.length === 0) return []

  const totalImpressions = data.reduce((sum, item) => sum + (item.impressions || 0), 0)
  const totalClicks = data.reduce((sum, item) => sum + (item.clicks || 0), 0)
  const totalConversions = data.reduce((sum, item) => sum + (item.conversions || item.total_conversions || 0), 0)

  return [
    {
      label: 'Impressions',
      value: totalImpressions,
      target: totalImpressions * 1.2,
      color: 'neon-blue'
    },
    {
      label: 'Clicks',
      value: totalClicks,
      target: totalClicks * 1.15,
      color: 'neon-green'
    },
    {
      label: 'Conversions',
      value: totalConversions,
      target: totalConversions * 1.1,
      color: 'neon-purple'
    }
  ]
} 

// Generate comprehensive audience performance data by campaign hierarchy
export function getAudienceHierarchyData(count: number = 50) {
  const advertisers = ['Nike', 'Coca-Cola', 'McDonald\'s', 'Apple', 'Samsung', 'Toyota', 'BMW', 'Adidas', 'Pepsi', 'Burger King']
  const campaigns = ['Summer Campaign 2024', 'Holiday Special', 'Brand Awareness', 'Product Launch', 'Seasonal Sale', 'Back to School', 'Black Friday', 'Cyber Monday', 'Valentine\'s Day', 'Spring Collection']
  const strategies = ['Retargeting', 'Prospecting', 'Lookalike', 'Custom Intent', 'In-Market', 'Affinity', 'Demographic', 'Geographic', 'Behavioral', 'Contextual']
  const creatives = ['Video Ad 30s', 'Banner 728x90', 'Rich Media', 'Native Ad', 'Display Banner', 'Video Ad 15s', 'Interactive Ad', 'Carousel Ad', 'Static Banner', 'Dynamic Ad']
  const audienceSegments = [
    'Sports Enthusiasts', 'Fitness Buffs', 'Tech Savvy', 'Fashion Forward', 'Budget Conscious', 'Luxury Buyers', 
    'Young Professionals', 'Parents', 'Students', 'Retirees', 'Gamers', 'Travelers', 'Foodies', 'Music Lovers',
    'Book Readers', 'Movie Buffs', 'Pet Owners', 'Homeowners', 'Car Enthusiasts', 'Health Conscious'
  ]

  return Array.from({ length: count }, (_, i) => ({
    id: `audience-hierarchy-${i}`,
    advertiser_name: advertisers[Math.floor(Math.random() * advertisers.length)],
    campaign_name: campaigns[Math.floor(Math.random() * campaigns.length)],
    strategy_name: strategies[Math.floor(Math.random() * strategies.length)],
    creative_name: creatives[Math.floor(Math.random() * creatives.length)],
    audience_segment: audienceSegments[Math.floor(Math.random() * audienceSegments.length)],
    impressions: Math.floor(Math.random() * 500000) + 10000,
    clicks: Math.floor(Math.random() * 25000) + 100,
    completed_views: Math.floor(Math.random() * 20000) + 50,
    ctr: Math.random() * 0.1 + 0.01,
    vcr: Math.random() * 0.8 + 0.1,
    revenue: Math.floor(Math.random() * 50000) + 1000,
    conversions: Math.floor(Math.random() * 2000) + 10
  }))
}

// Generate comprehensive MediaMath-style data (excluding costs)
export function getMainDashboardData(count: number = 100) {
  const advertisers = ['Nike', 'Coca-Cola', 'McDonald\'s', 'Apple', 'Samsung', 'Toyota', 'BMW', 'Adidas', 'Pepsi', 'Burger King', 'Netflix', 'Amazon', 'Google', 'Facebook', 'Microsoft']
  const campaigns = ['Summer Campaign 2024', 'Holiday Special', 'Brand Awareness', 'Product Launch', 'Seasonal Sale', 'Back to School', 'Black Friday', 'Cyber Monday', 'Valentine\'s Day', 'Spring Collection', 'Q4 Push', 'New Year', 'Spring Break', 'Summer Sale', 'Fall Collection']
  const strategies = ['Retargeting', 'Prospecting', 'Lookalike', 'Custom Intent', 'In-Market', 'Affinity', 'Demographic', 'Geographic', 'Behavioral', 'Contextual', 'Remarketing', 'Cross-Sell', 'Up-Sell', 'Brand Safety', 'Viewability']
  const creatives = ['Video Ad 30s', 'Banner 728x90', 'Rich Media', 'Native Ad', 'Display Banner', 'Video Ad 15s', 'Interactive Ad', 'Carousel Ad', 'Static Banner', 'Dynamic Ad', 'HTML5 Ad', 'Expandable Ad', 'Interstitial', 'Pre-roll', 'Mid-roll']
  const placements = ['CNN.com', 'ESPN.com', 'YouTube', 'Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'TikTok', 'Snapchat', 'Pinterest', 'Reddit', 'Hulu', 'Netflix', 'Spotify', 'Pandora']
  const deviceTypes = ['Desktop', 'Mobile', 'Tablet', 'Connected TV', 'Smart TV', 'Gaming Console']
  const geoLocations = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ', 'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA', 'Dallas, TX', 'San Jose, CA']

  return Array.from({ length: count }, (_, i) => ({
    id: `main-data-${i}`,
    campaign_name: campaigns[Math.floor(Math.random() * campaigns.length)],
    advertiser_name: advertisers[Math.floor(Math.random() * advertisers.length)],
    strategy_name: strategies[Math.floor(Math.random() * strategies.length)],
    creative_name: creatives[Math.floor(Math.random() * creatives.length)],
    placement_name: placements[Math.floor(Math.random() * placements.length)],
    device_type: deviceTypes[Math.floor(Math.random() * deviceTypes.length)],
    geo_location: geoLocations[Math.floor(Math.random() * geoLocations.length)],
    impressions: Math.floor(Math.random() * 1000000) + 10000,
    clicks: Math.floor(Math.random() * 50000) + 100,
    completed_views: Math.floor(Math.random() * 40000) + 50,
    ctr: Math.random() * 0.15 + 0.005,
    vcr: Math.random() * 0.9 + 0.05,
    viewability_rate: Math.random() * 0.3 + 0.6,
    conversions: Math.floor(Math.random() * 5000) + 10,
    revenue: Math.floor(Math.random() * 100000) + 1000,
    roi: Math.random() * 8 + 1,
    frequency: Math.random() * 5 + 1,
    reach: Math.floor(Math.random() * 500000) + 10000,
    unique_users: Math.floor(Math.random() * 300000) + 5000,
    time_spent: Math.random() * 60 + 10,
    bounce_rate: Math.random() * 0.4 + 0.1,
    engagement_rate: Math.random() * 0.3 + 0.05,
    brand_safety_score: Math.random() * 2 + 8,
    fraud_score: Math.random() * 3 + 1
  }))
} 

// Generate improved campaign performance data for main dashboard
export function generateMainDashboardData(count: number = 50) {
  const advertisers = [
    'Nike', 'Adidas', 'Coca-Cola', 'Pepsi', 'McDonald\'s', 'Burger King',
    'Apple', 'Samsung', 'Toyota', 'Honda', 'Ford', 'Chevrolet',
    'Amazon', 'Walmart', 'Target', 'Best Buy', 'Home Depot', 'Lowe\'s',
    'Netflix', 'Disney+', 'Hulu', 'Spotify', 'Uber', 'Lyft'
  ]

  const campaignTypes = [
    'Brand Awareness', 'Performance', 'Retargeting', 'Prospecting',
    'Seasonal', 'Product Launch', 'Holiday', 'Back to School',
    'Black Friday', 'Cyber Monday', 'Valentine\'s Day', 'Mother\'s Day'
  ]

  const data = []
  
  for (let i = 0; i < count; i++) {
    const impressions = Math.floor(Math.random() * 5000000) + 100000
    const clicks = Math.floor(impressions * (Math.random() * 0.05 + 0.01))
    const ctr = (clicks / impressions) * 100
    const cpm = Math.random() * 15 + 2
    const cpc = Math.random() * 3 + 0.5
    const conversions = Math.floor(clicks * (Math.random() * 0.1 + 0.02))
    const conversionRate = (conversions / clicks) * 100
    
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 90))
    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 60) + 30)

    data.push({
      id: `campaign-${i + 1}`,
      campaignName: `${campaignTypes[Math.floor(Math.random() * campaignTypes.length)]} - ${advertisers[Math.floor(Math.random() * advertisers.length)]} ${Math.floor(Math.random() * 1000) + 1}`,
      advertiser: advertisers[Math.floor(Math.random() * advertisers.length)],
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      impressions,
      clicks,
      ctr: parseFloat(ctr.toFixed(2)),
      cpm: parseFloat(cpm.toFixed(2)),
      cpc: parseFloat(cpc.toFixed(2)),
      spend: parseFloat((impressions * cpm / 1000).toFixed(2)),
      conversions,
      conversionRate: parseFloat(conversionRate.toFixed(2)),
      status: ['active', 'paused', 'completed'][Math.floor(Math.random() * 3)] as 'active' | 'paused' | 'completed'
    })
  }

  return data
} 

// Generate improved audience performance data
export function generateAudienceData(count: number = 30) {
  const advertisers = [
    'Nike', 'Adidas', 'Coca-Cola', 'Pepsi', 'McDonald\'s', 'Burger King',
    'Apple', 'Samsung', 'Toyota', 'Honda', 'Ford', 'Chevrolet',
    'Amazon', 'Walmart', 'Target', 'Best Buy', 'Home Depot', 'Lowe\'s',
    'Netflix', 'Disney+', 'Hulu', 'Spotify', 'Uber', 'Lyft'
  ]

  const audienceSegments = [
    'High-Income Professionals', 'Young Urban Millennials', 'Tech-Savvy Early Adopters',
    'Fitness Enthusiasts', 'Luxury Car Buyers', 'Home Improvement DIYers',
    'Gaming Community', 'Travel Lovers', 'Food & Dining', 'Fashion Forward',
    'Health & Wellness', 'Parenting & Family', 'Business Decision Makers',
    'Creative Professionals', 'Sports Fans', 'Music Lovers',
    'Pet Owners', 'Outdoor Adventurers', 'Book Readers', 'Movie Buffs'
  ]

  const campaignTypes = [
    'Brand Awareness', 'Performance', 'Retargeting', 'Prospecting',
    'Seasonal', 'Product Launch', 'Holiday', 'Back to School'
  ]

  const data = []
  
  for (let i = 0; i < count; i++) {
    const audienceSize = Math.floor(Math.random() * 2000000) + 50000
    const impressions = Math.floor(audienceSize * (Math.random() * 0.8 + 0.2))
    const clicks = Math.floor(impressions * (Math.random() * 0.05 + 0.01))
    const ctr = (clicks / impressions) * 100
    const conversions = Math.floor(clicks * (Math.random() * 0.15 + 0.05))
    const conversionRate = (conversions / clicks) * 100
    const cpm = Math.random() * 20 + 3
    const cpc = Math.random() * 4 + 0.5
    const spend = (impressions * cpm / 1000)
    const reach = Math.floor(audienceSize * (Math.random() * 0.6 + 0.3))
    const frequency = Math.random() * 5 + 1

    data.push({
      id: `audience-${i + 1}`,
      campaignName: `${campaignTypes[Math.floor(Math.random() * campaignTypes.length)]} - ${advertisers[Math.floor(Math.random() * advertisers.length)]} ${Math.floor(Math.random() * 1000) + 1}`,
      advertiser: advertisers[Math.floor(Math.random() * advertisers.length)],
      audienceSegment: audienceSegments[Math.floor(Math.random() * audienceSegments.length)],
      audienceSize,
      impressions,
      clicks,
      ctr: parseFloat(ctr.toFixed(2)),
      conversions,
      conversionRate: parseFloat(conversionRate.toFixed(2)),
      cpm: parseFloat(cpm.toFixed(2)),
      cpc: parseFloat(cpc.toFixed(2)),
      spend: parseFloat(spend.toFixed(2)),
      reach,
      frequency: parseFloat(frequency.toFixed(2)),
      status: ['active', 'paused', 'completed'][Math.floor(Math.random() * 3)] as 'active' | 'paused' | 'completed'
    })
  }

  return data
} 

export const mockCampaignData = getCampaignData(50);
export const mockFootTrafficData = getFootTrafficData(50);
export const mockGeoDeviceData = getGeoDeviceData(50);
export const mockNewToBrandData = getNewToBrandData(50);
export const mockPlacementData = getPlacementData(50);
export const mockViewabilityData = getViewabilityData(50); 