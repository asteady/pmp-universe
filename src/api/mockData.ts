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
      site_domain: realisticSiteDomains[i % realisticSiteDomains.length],
      app_name: ['Facebook', 'Instagram', 'TikTok', 'YouTube', 'Twitter'][i % 5],
      verified_visits: Math.floor(Math.random() * 1000) + 100,
      verified_unique_visits: Math.floor(Math.random() * 800) + 80,
      projected_visits: Math.floor(Math.random() * 2000) + 200,
      projected_unique_visits: Math.floor(Math.random() * 1500) + 150,
      dwell_time: Number(dwellTime.toFixed(2)),
      median_dwell_time: Number((dwellTime * 0.8).toFixed(2)),
      average_dwell_time: Number(dwellTime.toFixed(2)),
      campaign_name: realisticCampaignNames[i % realisticCampaignNames.length],
      campaign_id: `camp_${i + 1}`,
      total_verified_visits: Math.floor(Math.random() * 5000) + 500,
      advertiser: advertiser,
      poi: `${realisticCities[i % realisticCities.length]} Store`,
      placement_name: realisticCreativeNames[i % realisticCreativeNames.length],
      distance_traveled: (Math.random() * 20 + 1).toFixed(1),
      time_elapsed: Math.floor(Math.random() * 60 + 5),
      device_os: ['iOS', 'Android', 'Windows', 'macOS'][i % 4]
    }
  })
}

export const getAudiencePerformanceData = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: 'seg' + (i + 1),
    name: 'Audience ' + (i + 1),
    advertiser: realisticAdvertisers[i % realisticAdvertisers.length],
    campaign: realisticCampaignNames[i % realisticCampaignNames.length],
    strategy: realisticStrategyNames[i % realisticStrategyNames.length],
    creative: realisticCreativeNames[i % realisticCreativeNames.length],
    channel: ['Display', 'Video', 'Mobile', 'Connected TV'][i % 4],
    device_type: ['Desktop', 'Mobile', 'CTV'][i % 3],
    poi: `${realisticCities[i % realisticCities.length]} Store`,
    impressions: Math.floor(Math.random() * 100000) + 50000,
    clicks: Math.floor(Math.random() * 5000) + 1000,
    completed_views: Math.floor(Math.random() * 80000) + 50000,
    vcr: Number((Math.random() * 0.7 + 0.6).toFixed(2)),
    ctr: Number((Math.random() * 0.02 + 0.01).toFixed(2)),
    conversions: Math.floor(Math.random() * 500) + 100,
    roi: Number((Math.random() * 3 + 0.5).toFixed(2)),
    discrepancy: Number((Math.random() * 0.1).toFixed(2)),
    confidence: Number((Math.random() * 0.2 + 0.8).toFixed(2)),
    viewability: Number((Math.random() * 0.9 + 0.8).toFixed(2)),
    color: ['blue', 'purple', 'green', 'yellow', 'pink'][i % 5],
    description: 'Description for Audience ' + (i + 1)
  }))
}

// Chart data helpers
export const getChartData = (data: any[], type: string, options: any = {}) => {
  switch (type) {
    case 'bar':
      return {
        labels: data.slice(0, 10).map(d => d.campaign_name || d.site_domain),
        datasets: [{
          label: options.label || 'Value',
          data: data.slice(0, 10).map(d => d[options.field] || d.impressions),
          backgroundColor: options.backgroundColor || 'rgba(0, 212, 255, 0.8)',
          borderColor: options.borderColor || '#00d4ff',
          borderWidth: 1
        }]
      }
    case 'line':
      return {
        labels: data.slice(0, 15).map(d => d.date),
        datasets: [{
          label: options.label || 'Value',
          data: data.slice(0, 15).map(d => d[options.field] || d.ctr),
          borderColor: options.borderColor || '#ff69b4',
          backgroundColor: options.backgroundColor || 'rgba(255, 105, 180, 0.1)',
          fill: true,
          tension: 0.4
        }]
      }
    case 'doughnut':
      return {
        labels: options.labels || ['Category 1', 'Category 2', 'Category 3'],
        datasets: [{
          data: options.data || [300, 200, 100],
          backgroundColor: options.backgroundColor || [
            'rgba(0, 212, 255, 0.8)',
            'rgba(255, 105, 180, 0.8)',
            'rgba(139, 92, 246, 0.8)'
          ],
          borderWidth: 2,
          borderColor: '#1a1a1a'
        }]
      }
    default:
      return { labels: [], datasets: [] }
  }
}

// Badge conditions
export const getBadgeConditions = (data: any[]) => {
  const topCTR = data.reduce((max, item) => 
    parseFloat(item.ctr) > parseFloat(max.ctr) ? item : max
  )
  
  const topViewability = data.reduce((max, item) => 
    parseFloat(item.viewability_rate) > parseFloat(max.viewability_rate) ? item : max
  )
  
  const topVerifiedVisits = getFootTrafficData(1)[0] // Get a single item for comparison
  
  return {
    topCTR: { campaign: topCTR.campaign_name, value: topCTR.ctr },
    topViewability: { campaign: topViewability.campaign_name, value: topViewability.viewability_rate },
    topVerifiedVisits: { campaign: topVerifiedVisits.campaign_name, value: topVerifiedVisits.verified_visits }
  }
}

// Leaderboard data
export const getLeaderboardData = (data: any[], metric: string) => {
  return data
    .sort((a, b) => parseFloat(b[metric]) - parseFloat(a[metric]))
    .slice(0, 10)
    .map((item, index) => ({
      rank: index + 1,
      name: item.campaign_name || item.site_domain,
      value: parseFloat(item[metric]).toFixed(2),
      metric: metric,
      change: (Math.random() * 20 - 10).toFixed(1)
    }))
}

// Progress bar data
export const getProgressData = (data: any[]) => {
  return data.slice(0, 5).map(item => ({
    label: item.campaign_name || item.site_domain,
    current: item.impressions || item.verified_visits,
    target: Math.floor((item.impressions || item.verified_visits) * 1.2),
    unit: 'impressions',
    color: ['#00d4ff', '#ff69b4', '#8b5cf6', '#00ff88', '#ff6b35'][Math.floor(Math.random() * 5)]
  }))
} 