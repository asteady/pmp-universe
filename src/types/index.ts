export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'advertiser' | 'agency'
  organization_id?: string
  advertiser_id?: string
}

export interface FilterParams {
  organization_id?: string
  advertiser_id?: string
  campaign_id?: string
  date_range?: 'last_30_days' | 'yesterday' | 'last_7_days' | 'month_to_date' | 'custom'
  start_date?: string
  end_date?: string
  aggregation?: 'day' | 'week' | 'month' | 'all'
  lookback_window?: 30 | 60 | 90 | 180
  channel_type?: string
  creative_size?: string
  country?: string
  region?: string
  city?: string
  device_type?: string
  os_type?: string
  site_domain?: string
  app_name?: string
  inventory_type?: string
  placements?: string[]
}

export interface CampaignData {
  date: string
  campaign_name: string
  campaign_id: string
  strategy_name: string
  strategy_id: string
  strategy_type: string
  audience_segment_name: string
  advertiser: string
  creative: string
  impressions: number
  clicks: number
  total_conversions: number
  total_revenue: number
  total_spend: number
  ctr: string | number
  cpa: number
  roi: number
  viewability_rate: number
  vcr: number
  dwell_time: number
  site_domain?: string
  city_name?: string
  demographic_discrepancy?: number
  inventory_type?: string
  channel?: string
  device_type?: string
  poi?: string
  completed_views?: number
  confidence?: number
}

export interface NewToBrandData extends CampaignData {
  new_to_brand_conversions: number
  new_to_brand_revenue: number
  new_to_brand_cpa: number
  new_to_brand_roi: number
  returning_conversions: number
  returning_revenue: number
  lookback_window?: number
}

export interface ViewabilityData extends CampaignData {
  in_view_impressions: number
  viewability_rate: number
  viewability_provider: string
  vcr: number
  video_starts: number
  video_completions: number
  creative_size?: string
  channel_type?: string
}

export interface GeoDeviceData extends CampaignData {
  country: string
  region: string
  city: string
  dma?: string
  zip_code?: string
  device_type: string
  device_make: string
  device_model: string
  os_type: string
  browser: string
  age_group: string
  gender: string
  hh_income: string
  demographic_discrepancy: number
  conversions?: number
  revenue?: number
  spend?: number
}

export interface PlacementData {
  date: string
  site_domain: string
  app_name: string
  primary_seller_name: string
  inventory_type: string
  impressions: number
  clicks: number
  total_conversions: number
  ctr: number
  cpa: number
  companion_clicks: number
  video_starts: number
  skipped_impressions: number
  rank: number
  goal_impressions?: number
  budget_spent?: number
  total_budget?: number
  advertiser?: string
  campaign_name?: string
}

export interface FootTrafficData {
  date: string
  city_name: string
  region_name: string
  device_type: string
  site_domain: string
  app_name: string
  verified_visits: number
  verified_unique_visits: number
  projected_visits: number
  projected_unique_visits: number
  dwell_time: number
  average_dwell_time?: number
  median_dwell_time?: number
  advertiser?: string
  campaign_name?: string
}

export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string | string[]
    borderWidth?: number
    fill?: boolean
  }[]
}

export interface MetricCard {
  title: string
  value: string | number
  change: number
  changeType: 'increase' | 'decrease' | 'neutral'
  icon: string
  color: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  color: string
  achieved: boolean
  progress: number
  maxProgress: number
}

export interface LeaderboardEntry {
  rank: number
  name: string
  value: number
  metric: string
  change: number
}

export interface ProgressBar {
  label: string
  current: number
  target: number
  unit: string
  color: string
}

export interface Notification {
  id: string
  type: 'info' | 'warning' | 'error' | 'success'
  title: string
  message: string
  timestamp: Date
  read: boolean
}

export interface AudienceSegment {
  id: string
  name: string
  advertiser: string
  campaign: string
  strategy: string
  creative: string
  channel: 'Video' | 'Display'
  device_type: 'CTV' | 'Desktop' | 'Mobile'
  poi: string
  impressions: number
  clicks: number
  completed_views: number
  vcr: number
  ctr: number
  conversions: number
  roi: number
  discrepancy: number
  confidence: number
  viewability: number
  color: string
  description: string
}

export interface AudienceFilter {
  segmentType?: 'demographic' | 'behavioral' | 'custom'
  segmentName?: string[]
  minConfidence?: number
  maxDiscrepancy?: number
}

export interface AudienceFilterParams {
  segment_type?: 'demographic' | 'behavioral' | 'custom'
  segment_names?: string[]
  date_range?: string
  aggregation?: string
  [key: string]: any
}

export interface AudienceLeaderboardEntry {
  id: string
  name: string
  roi: number
  conversions: number
  impressions: number
} 