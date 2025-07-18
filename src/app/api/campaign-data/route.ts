import { NextRequest, NextResponse } from 'next/server'
import { mockCampaignData } from '@/api/mockData'
import { FilterParams } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body: FilterParams = await request.json()
    
    // Apply filters to mock data
    let filteredData = [...mockCampaignData]
    
    // Filter by date range
    if (body.date_range) {
      const now = new Date()
      let startDate: Date
      
      switch (body.date_range) {
        case 'last_30_days':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          break
        case 'last_7_days':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          break
        case 'yesterday':
          startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000)
          break
        case 'month_to_date':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1)
          break
        case 'custom':
          if (body.start_date && body.end_date) {
            startDate = new Date(body.start_date)
            const endDate = new Date(body.end_date)
            filteredData = filteredData.filter(item => {
              const itemDate = new Date(item.date)
              return itemDate >= startDate && itemDate <= endDate
            })
          }
          break
        default:
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      }
      
      if (body.date_range !== 'custom') {
        filteredData = filteredData.filter(item => {
          const itemDate = new Date(item.date)
          return itemDate >= startDate
        })
      }
    }
    
    // Filter by advertiser
    if (body.advertisers && body.advertisers.length > 0) {
      filteredData = filteredData.filter(item => 
        body.advertisers!.includes(item.advertiser)
      )
    }
    
    // Filter by campaign
    if (body.campaigns && body.campaigns.length > 0) {
      filteredData = filteredData.filter(item => 
        body.campaigns!.includes(item.campaign_name)
      )
    }
    
    // Aggregate data if needed
    if (body.aggregation && body.aggregation !== 'day') {
      const aggregatedData = new Map()
      
      filteredData.forEach(item => {
        let key: string
        
        switch (body.aggregation) {
          case 'week':
            const weekStart = new Date(item.date)
            weekStart.setDate(weekStart.getDate() - weekStart.getDay())
            key = weekStart.toISOString().split('T')[0]
            break
          case 'month':
            key = item.date.substring(0, 7) // YYYY-MM
            break
          case 'all':
            key = 'all'
            break
          default:
            key = item.date
        }
        
        if (!aggregatedData.has(key)) {
          aggregatedData.set(key, {
            date: key,
            campaign_name: 'Aggregated',
            campaign_id: 'agg',
            strategy_name: 'Aggregated',
            strategy_id: 'agg',
            strategy_type: 'Aggregated',
            audience_segment_name: 'Aggregated',
            impressions: 0,
            clicks: 0,
            total_conversions: 0,
            total_revenue: 0,
            total_spend: 0,
            ctr: 0,
            cpa: 0,
            roi: 0,
            viewability_rate: 0,
            vcr: 0,
            dwell_time: 0
          })
        }
        
        const agg = aggregatedData.get(key)
        agg.impressions += item.impressions
        agg.clicks += item.clicks
        agg.total_conversions += item.total_conversions
        agg.total_revenue += item.total_revenue
        agg.total_spend += item.total_spend
        agg.dwell_time += item.dwell_time
      })
      
      // Calculate averages
      aggregatedData.forEach((agg: any) => {
        agg.ctr = agg.impressions > 0 ? agg.clicks / agg.impressions : 0
        agg.cpa = agg.total_conversions > 0 ? agg.total_spend / agg.total_conversions : 0
        agg.roi = agg.total_spend > 0 ? agg.total_revenue / agg.total_spend : 0
        agg.viewability_rate = agg.impressions > 0 ? agg.viewability_rate / filteredData.length : 0
        agg.vcr = agg.impressions > 0 ? agg.vcr / filteredData.length : 0
        agg.dwell_time = agg.dwell_time / filteredData.length
      })
      
      filteredData = Array.from(aggregatedData.values())
    }
    
    return NextResponse.json({
      success: true,
      data: filteredData,
      total: filteredData.length,
      filters: body
    })
    
  } catch (error) {
    console.error('Error in campaign-data API:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: mockCampaignData,
      total: mockCampaignData.length
    })
  } catch (error) {
    console.error('Error in campaign-data API:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
} 