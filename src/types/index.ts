export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'advertiser' | 'agency'
  organization_id?: string
  advertiser_id?: string
}

export interface FilterParams {
  date_range?: string
  aggregation?: string
  advertisers?: string[]
  campaigns?: string[]
  strategies?: string[]
  creatives?: string[]
  channels?: string[]
  device_types?: string[]
  audience_segments?: string[]
  poi_categories?: string[]
  regions?: string[]
  cities?: string[]
  dmas?: string[]
  age_groups?: string[]
  genders?: string[]
  hh_incomes?: string[]
  os_types?: string[]
  browsers?: string[]
  inventory_types?: string[]
  viewability_providers?: string[]
  creative_sizes?: string[]
  site_domains?: string[]
  app_names?: string[]
  primary_sellers?: string[]
  weather_conditions?: string[]
  traffic_sources?: string[]
  time_of_day?: string[]
  day_of_week?: string[]
  segment_types?: string[]
  segment_names?: string[]
  start_date?: string
  end_date?: string
  city?: string;
  device_type?: string;
  os_type?: string;
  viewability_rate?: string;
  lookback_window?: number;
  site_domain?: string;
  inventory_type?: string;
  country?: string;
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
  ctr: number
  cpa: number
  roi: number
  viewability_rate: number
  vcr: number
  dwell_time: number
  site_domain: string
  city_name: string
  demographic_discrepancy: number
  inventory_type: string
  channel: string
  device_type: string
  poi: string
  completed_views: number
  confidence: number
}

export interface NewToBrandData extends CampaignData {
  new_to_brand_conversions: number
  new_to_brand_revenue: number
  new_to_brand_cpa: number
  new_to_brand_roi: number
  returning_conversions: number
  returning_revenue: number
  lookback_window: number
}

export interface ViewabilityData extends CampaignData {
  in_view_impressions: number
  viewability_rate: number
  viewability_provider: string
  vcr: number
  video_starts: number
  video_completions: number
  creative_size: string
  channel_type: string
}

export interface GeoDeviceData extends CampaignData {
  country: string
  region: string
  city: string
  dma: string
  zip_code: string
  device_type: string
  device_make: string
  device_model: string
  os_type: string
  browser: string
  age_group: string
  gender: string
  hh_income: string
  demographic_discrepancy: number
  impressions: number
  clicks: number
  conversions: number
  revenue: number
  spend: number
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
  goal_impressions: number
  budget_spent: number
  total_budget: number
  advertiser: string
  campaign_name: string
}

export interface FootTrafficData {
  date: string
  city_name: string
  region_name: string
  device_type: string
  poi_name: string
  poi_category: string
  visits: number
  unique_visitors: number
  dwell_time: number
  distance_traveled: number
  time_of_day: string
  day_of_week: string
  weather_condition: string
  traffic_source: string
  conversion_rate: number
  revenue_per_visit: number
  advertiser: string
  campaign_name: string
}

// New audience segment interfaces
export interface AudienceSegment {
  id: string
  name: string
  definition: string
  category: string
  subcategory: string
  segment: string
  impressions: number
  clicks: number
  conversions: number
  revenue: number
  spend: number
  ctr: number
  cpa: number
  roi: number
  viewability: number
  vcr: number
  confidence: number
  color: string
  discrepancy?: number;
}

export interface AudiencePerformanceData extends AudienceSegment {
  advertiser: string
  campaign_name: string
  strategy_name: string
  creative_name: string
  channel: string
  device_type: string
  poi: string
  completed_views: number
  discrepancy: number
}

export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string
    borderWidth?: number
  }[]
}

export interface BadgeCondition {
  label: string
  value: string
  color: string
}

export interface LeaderboardEntry {
  name: string;
  value: number;
  change: number;
  rank: number;
  metric: string;
}

export interface ProgressData {
  label: string
  value: number
  target: number
  color: string
}

export interface MetricCardData {
  title: string
  value: number | string
  change: number
  changeType: 'increase' | 'decrease'
  icon: string
  trend?: number[]
  color?: string
}

export interface ChartOptions {
  plugins?: {
    title?: {
      display?: boolean
      text?: string
      color?: string
      font?: {
        size?: number
        weight?: string
      }
    }
  }
  scales?: {
    x?: {
      title?: {
        display?: boolean
        text?: string
        color?: string
      }
      grid?: {
        color?: string
      }
      ticks?: {
        color?: string
      }
    }
    y?: {
      title?: {
        display?: boolean
        text?: string
        color?: string
      }
      grid?: {
        color?: string
      }
      ticks?: {
        color?: string
      }
      beginAtZero?: boolean
    }
  }
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  achieved: boolean;
  progress: number;
  maxProgress: number;
} 