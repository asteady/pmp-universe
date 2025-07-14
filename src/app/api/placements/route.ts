import { NextRequest, NextResponse } from 'next/server'
import { mockPlacementData } from '@/api/mockData'
import { FilterParams } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body: FilterParams = await request.json()
    
    let filteredData = [...mockPlacementData]
    
    // Filter by site domain
    if (body.site_domain) {
      filteredData = filteredData.filter(item => 
        item.site_domain.toLowerCase().includes(body.site_domain!.toLowerCase())
      )
    }
    
    // Filter by inventory type
    if (body.inventory_type) {
      filteredData = filteredData.filter(item => 
        item.inventory_type === body.inventory_type
      )
    }
    
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
    
    // Sort by impressions and limit to top 75
    filteredData.sort((a, b) => b.impressions - a.impressions)
    filteredData = filteredData.slice(0, 75)
    
    return NextResponse.json({
      success: true,
      data: filteredData,
      total: filteredData.length,
      filters: body
    })
    
  } catch (error) {
    console.error('Error in placements API:', error)
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
      data: mockPlacementData,
      total: mockPlacementData.length
    })
  } catch (error) {
    console.error('Error in placements API:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
} 