// Enhanced Mock Data for Infillion Analytics Dashboard
// 50+ entries for each tab with realistic campaign data

export const campaignData = Array.from({ length: 50 }, (_, i) => ({
  date: new Date(2025, 6, i + 1).toISOString().split('T')[0],
  campaign_name: `Campaign ${i + 1}`,
  campaign_id: `camp_${i + 1}`,
  strategy_name: `Strategy ${i + 1}`,
  strategy_id: `strat_${i + 1}`,
  strategy_type: ['Display', 'Video', 'Mobile', 'Connected TV'][i % 4],
  audience_segment_name: `Audience ${i + 1}`,
  impressions: Math.floor(Math.random() * 1000000) + 100000,
  clicks: Math.floor(Math.random() * 50000) + 1000,
  total_conversions: Math.floor(Math.random() * 5000) + 100,
  total_revenue: Math.floor(Math.random() * 100000) + 5000,
  total_spend: Math.floor(Math.random() * 50000) + 2000,
  ctr: (Math.random() * 0.1 + 0.01).toFixed(4),
  cpa: (Math.random() * 50 + 10).toFixed(2),
  roi: (Math.random() * 3 + 0.5).toFixed(2),
  viewability_rate: (Math.random() * 0.3 + 0.7).toFixed(4),
  vcr: (Math.random() * 0.4 + 0.6).toFixed(4),
  dwell_time: (Math.random() * 30 + 10).toFixed(2),
  site_domain: ['cnn.com', 'nytimes.com', 'washingtonpost.com', 'usatoday.com', 'foxnews.com'][i % 5],
  city_name: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'][i % 10],
  demographic_discrepancy: (Math.random() * 0.5).toFixed(4),
  inventory_type: ['premium', 'programmatic', 'direct'][i % 3]
}))

export const newToBrandData = Array.from({ length: 50 }, (_, i) => ({
  ...campaignData[i],
  new_to_brand_conversions: Math.floor(Math.random() * 2000) + 50,
  new_to_brand_revenue: Math.floor(Math.random() * 50000) + 2000,
  new_to_brand_cpa: (Math.random() * 40 + 15).toFixed(2),
  new_to_brand_roi: (Math.random() * 2.5 + 0.8).toFixed(2),
  returning_conversions: Math.floor(Math.random() * 3000) + 50,
  returning_revenue: Math.floor(Math.random() * 60000) + 3000,
  lookback_window: [30, 60, 90, 180][i % 4]
}))

export const viewabilityData = Array.from({ length: 50 }, (_, i) => ({
  ...campaignData[i],
  in_view_impressions: Math.floor(campaignData[i].impressions * (Math.random() * 0.3 + 0.7)),
  viewability_rate: (Math.random() * 0.3 + 0.7).toFixed(4),
  viewability_provider: ['IAS', 'Moat', 'DoubleVerify', 'Comscore'][i % 4],
  vcr: (Math.random() * 0.4 + 0.6).toFixed(4),
  video_starts: Math.floor(Math.random() * 100000) + 10000,
  video_completions: Math.floor(Math.random() * 80000) + 5000,
  creative_size: ['300x250', '728x90', '160x600', '320x50', '970x250'][i % 5],
  channel_type: ['Display', 'Video', 'Mobile', 'Connected TV'][i % 4]
}))

export const geoDeviceData = Array.from({ length: 50 }, (_, i) => ({
  ...campaignData[i],
  country: 'United States',
  region: ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'FL', 'OH', 'GA', 'NC'][i % 10],
  city: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'][i % 10],
  device_type: ['Desktop', 'Mobile', 'Tablet', 'Connected TV'][i % 4],
  device_make: ['Apple', 'Samsung', 'Google', 'Microsoft'][i % 4],
  device_model: ['iPhone', 'Galaxy', 'Pixel', 'Surface'][i % 4],
  os_type: ['iOS', 'Android', 'Windows', 'macOS'][i % 4],
  browser: ['Chrome', 'Safari', 'Firefox', 'Edge'][i % 4],
  age_group: ['18-24', '25-34', '35-44', '45-54', '55+'][i % 5],
  gender: ['Male', 'Female', 'Other'][i % 3],
  hh_income: ['<$50K', '$50K-$100K', '$100K-$150K', '$150K+'][i % 4],
  demographic_discrepancy: (Math.random() * 0.5).toFixed(4)
}))

export const placementData = Array.from({ length: 75 }, (_, i) => ({
  date: new Date(2025, 6, (i % 30) + 1).toISOString().split('T')[0],
  site_domain: [
    'cnn.com', 'nytimes.com', 'washingtonpost.com', 'usatoday.com', 'foxnews.com',
    'abcnews.go.com', 'cbsnews.com', 'nbcnews.com', 'reuters.com', 'bloomberg.com',
    'wsj.com', 'ft.com', 'techcrunch.com', 'wired.com', 'theverge.com',
    'engadget.com', 'mashable.com', 'gizmodo.com', 'arstechnica.com', 'venturebeat.com'
  ][i % 20],
  app_name: ['Facebook', 'Instagram', 'TikTok', 'YouTube', 'Twitter', 'LinkedIn', 'Snapchat', 'Pinterest'][i % 8],
  primary_seller_name: ['Google', 'Facebook', 'Amazon', 'Microsoft', 'Twitter'][i % 5],
  inventory_type: ['premium', 'programmatic', 'direct'][i % 3],
  impressions: Math.floor(Math.random() * 500000) + 50000,
  clicks: Math.floor(Math.random() * 25000) + 500,
  total_conversions: Math.floor(Math.random() * 2000) + 50,
  ctr: (Math.random() * 0.08 + 0.01).toFixed(4),
  cpa: (Math.random() * 60 + 15).toFixed(2),
  companion_clicks: Math.floor(Math.random() * 1000) + 10,
  video_starts: Math.floor(Math.random() * 50000) + 1000,
  skipped_impressions: Math.floor(Math.random() * 10000) + 100,
  rank: i + 1,
  goal_impressions: Math.floor(Math.random() * 600000) + 100000,
  budget_spent: Math.floor(Math.random() * 40000) + 5000,
  total_budget: Math.floor(Math.random() * 50000) + 10000
}))

export const footTrafficData = Array.from({ length: 50 }, (_, i) => ({
  date: new Date(2025, 6, i + 1).toISOString().split('T')[0],
  city_name: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'][i % 10],
  region_name: ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'FL', 'OH', 'GA', 'NC'][i % 10],
  device_type: ['Mobile', 'Desktop', 'Tablet'][i % 3],
  site_domain: ['cnn.com', 'nytimes.com', 'washingtonpost.com', 'usatoday.com', 'foxnews.com'][i % 5],
  app_name: ['Facebook', 'Instagram', 'TikTok', 'YouTube', 'Twitter'][i % 5],
  verified_visits: Math.floor(Math.random() * 1000) + 100,
  verified_unique_visits: Math.floor(Math.random() * 800) + 80,
  projected_visits: Math.floor(Math.random() * 2000) + 200,
  projected_unique_visits: Math.floor(Math.random() * 1500) + 150,
  dwell_time: (Math.random() * 60 + 20).toFixed(2),
  campaign_name: `Campaign ${i + 1}`,
  campaign_id: `camp_${i + 1}`,
  total_verified_visits: Math.floor(Math.random() * 5000) + 500
}))

export const audiencePerformanceData = [
  {
    id: 'seg1',
    name: 'Millennial Shoppers',
    type: 'demographic' as 'demographic',
    impressions: 120000,
    clicks: 3200,
    conversions: 410,
    roi: 3.2,
    discrepancy: 0.01,
    confidence: 0.97,
    color: 'blue',
    description: 'Ages 25-40, high engagement with retail and CPG.'
  },
  {
    id: 'seg2',
    name: 'Luxury Auto Intenders',
    type: 'behavioral' as 'behavioral',
    impressions: 95000,
    clicks: 2100,
    conversions: 320,
    roi: 4.1,
    discrepancy: 0.04,
    confidence: 0.91,
    color: 'purple',
    description: 'Users actively researching luxury vehicles.'
  },
  {
    id: 'seg3',
    name: 'Fitness Enthusiasts',
    type: 'custom' as 'custom',
    impressions: 78000,
    clicks: 1800,
    conversions: 250,
    roi: 2.7,
    discrepancy: 0.09,
    confidence: 0.85,
    color: 'green',
    description: 'Custom segment: gym-goers, sports app users.'
  },
  {
    id: 'seg4',
    name: 'Parents with Young Kids',
    type: 'demographic' as 'demographic',
    impressions: 67000,
    clicks: 1500,
    conversions: 210,
    roi: 3.8,
    discrepancy: 0.02,
    confidence: 0.93,
    color: 'yellow',
    description: 'Parents of children under 10, high mobile usage.'
  },
  {
    id: 'seg5',
    name: 'Travel Buffs',
    type: 'behavioral' as 'behavioral',
    impressions: 54000,
    clicks: 1200,
    conversions: 180,
    roi: 2.9,
    discrepancy: 0.12,
    confidence: 0.81,
    color: 'pink',
    description: 'Frequent travelers, airline and hotel site visitors.'
  }
]

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
  
  const topVerifiedVisits = footTrafficData.reduce((max, item) => 
    item.verified_visits > max.verified_visits ? item : max
  )
  
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