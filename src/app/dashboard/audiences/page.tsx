'use client'

import React, { useState } from 'react'
import { AudienceTable } from '@/components/AudienceTable'
import { AudienceLeaderboard } from '@/components/AudienceLeaderboard'
import { SmartInsight } from '@/components/SmartInsight'
import { Filter } from '@/components/Filter'
import { Chart } from '@/components/Chart'
import { audiencePerformanceData } from '@/api/mockData'
import { AudienceFilterParams, AudienceLeaderboardEntry } from '@/types'

export default function AudiencesPage() {
  // Filter state
  const [filters, setFilters] = useState<AudienceFilterParams>({})

  // Segment type/name options
  const segmentTypes: ('demographic' | 'behavioral' | 'custom')[] = ['demographic', 'behavioral', 'custom']
  const segmentNames = audiencePerformanceData.map(seg => seg.name)

  // Filtered data
  const filteredSegments = audiencePerformanceData.filter(seg => {
    if (filters.segment_type && (seg.type as 'demographic' | 'behavioral' | 'custom') !== filters.segment_type) return false
    if (filters.segment_names && filters.segment_names.length > 0 && !filters.segment_names.includes(seg.name)) return false
    return true
  })

  // Leaderboard data
  const leaderboard: AudienceLeaderboardEntry[] = [...filteredSegments]
    .sort((a, b) => b.roi - a.roi)
    .map(seg => ({
      id: seg.id,
      name: seg.name,
      roi: seg.roi,
      conversions: seg.conversions,
      impressions: seg.impressions
    }))

  // Smart insight (example logic)
  const top = leaderboard[0]
  const smartMessage = top
    ? `Segment "${top.name}" is outperforming with ROI ${top.roi.toFixed(2)}x and ${top.conversions} conversions.`
    : 'No segments match the current filters.'

  // Bar chart data for conversions by segment
  const conversionsChartData = {
    labels: filteredSegments.map(seg => seg.name),
    datasets: [
      {
        label: 'Conversions',
        data: filteredSegments.map(seg => seg.conversions),
        backgroundColor: filteredSegments.map(seg => seg.color),
      },
    ],
  }

  // Heatmap/scatter data for ROI vs. Discrepancy
  const roiDiscrepancyData = {
    datasets: [
      {
        label: 'Segments',
        data: filteredSegments.map(seg => ({ x: seg.discrepancy, y: seg.roi, r: 10 })),
        backgroundColor: filteredSegments.map(seg => seg.color),
      },
    ],
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Smart Insight Callout */}
      <SmartInsight confidence={top ? Math.max(...filteredSegments.map(s => s.confidence)) : 0} message={smartMessage} />

      {/* Filters */}
      <Filter
        filters={filters}
        onFiltersChange={setFilters}
        userRole="admin"
        segmentTypes={segmentTypes}
        segmentNames={segmentNames}
        audienceMode
      />

      {/* Conversions Bar Chart */}
      <Chart
        type="bar"
        data={conversionsChartData}
        height={320}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Conversions by Audience Segment',
              color: '#fff',
              font: { size: 16, weight: 'bold' },
            },
            legend: { display: false },
          },
          scales: {
            x: { ticks: { color: '#fff' } },
            y: { ticks: { color: '#fff' } },
          },
        }}
      />

      {/* ROI vs. Discrepancy Heatmap/Scatter */}
      <Chart
        type="scatter"
        data={roiDiscrepancyData}
        height={320}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'ROI vs. Discrepancy by Segment',
              color: '#fff',
              font: { size: 16, weight: 'bold' },
            },
            legend: { display: false },
          },
          scales: {
            x: {
              title: { display: true, text: 'Discrepancy', color: '#fff' },
              min: 0, max: 0.15, ticks: { color: '#fff' },
            },
            y: {
              title: { display: true, text: 'ROI', color: '#fff' },
              min: 0, max: 5, ticks: { color: '#fff' },
            },
          },
        }}
      />

      {/* Leaderboard */}
      <AudienceLeaderboard entries={leaderboard} />

      {/* Audience Table */}
      <AudienceTable segments={filteredSegments} />
    </div>
  )
} 