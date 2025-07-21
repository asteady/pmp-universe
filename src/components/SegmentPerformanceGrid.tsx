'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import React from 'react'

const metrics = [
  { key: 'ctr', label: 'CTR', unit: '%' },
  { key: 'vcr', label: 'VCR', unit: '%' },
  { key: 'roi', label: 'ROI', unit: 'x' },
  { key: 'viewability', label: 'Viewability', unit: '%' },
  { key: 'visits', label: 'Verified Visits', unit: '' },
  { key: 'dwell', label: 'Dwell Time', unit: 's' }
]

interface Segment {
  name: string;
  ctr: number;
  vcr: number;
  roi: number;
  viewability: number;
  visits: number;
  dwell: number;
  drivers: string;
  [key: string]: string | number; // Add index signature for dynamic access
}

const segments: Segment[] = [
  { name: 'Craft Beer Drinkers', ctr: 0.052, vcr: 0.61, roi: 3.2, viewability: 0.93, visits: 4200, dwell: 38, drivers: 'High engagement on weekends, strong creative match.' },
  { name: 'Auto Intenders', ctr: 0.041, vcr: 0.58, roi: 4.1, viewability: 0.89, visits: 3800, dwell: 32, drivers: 'Above-benchmark ROI, but lower VCR due to short video.' },
  { name: 'DIY Shoppers', ctr: 0.047, vcr: 0.65, roi: 2.7, viewability: 0.91, visits: 3500, dwell: 29, drivers: 'Strong VCR, but dwell time below average.' }
]

const benchmarks = {
  ctr: 0.045,
  vcr: 0.60,
  roi: 3.0,
  viewability: 0.90,
  visits: 3000,
  dwell: 35
}

function getColor(metric: string, value: number) {
  const base = benchmarks[metric as keyof typeof benchmarks]
  if (value >= base * 1.1) return 'bg-neon-green/80 text-white'
  if (value >= base * 0.9) return 'bg-yellow-400/80 text-gray-900'
  return 'bg-neon-pink/80 text-white'
}

export function SegmentPerformanceGrid() {
  const [hovered, setHovered] = useState<{row: number, col: number} | null>(null)

  return (
    <div className="bg-card rounded-xl p-6 shadow-lg text-foreground">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-foreground">Segment Performance</h2>
        <p className="text-muted">Compare key metrics across audience segments</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-muted uppercase tracking-wider">Segment</th>
              {metrics.map(metric => (
                <th key={metric.key} className="px-4 py-2 text-left text-xs font-semibold text-muted uppercase tracking-wider">{metric.label}</th>
              ))}
              <th className="px-4 py-2 text-left text-xs font-semibold text-muted uppercase tracking-wider">Drivers</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {segments.map((segment, idx) => (
              <tr key={segment.name} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-2 font-medium text-foreground whitespace-nowrap">{segment.name}</td>
                {metrics.map(metric => (
                  <td key={metric.key} className={`px-4 py-2 whitespace-nowrap font-semibold ${getColor(metric.key, Number(segment[metric.key]))}`}>
                    {segment[metric.key]}{metric.unit}
                  </td>
                ))}
                <td className="px-4 py-2 text-muted whitespace-nowrap">{segment.drivers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 