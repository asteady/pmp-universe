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

const segments = [
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
    <div className="futuristic-card p-6 mb-6 glass">
      <h3 className="text-lg font-bold text-white mb-4">Segment Performance Grid</h3>
      <div className="grid grid-cols-6 gap-2">
        <div className="col-span-1"></div>
        {metrics.map((m, i) => (
          <div key={m.key} className="text-xs font-semibold text-gray-300 text-center">{m.label}</div>
        ))}
        {segments.map((seg, rowIdx) => (
          <React.Fragment key={`segment-${seg.name}-${rowIdx}`}>
            <div className="font-medium text-sm text-white flex items-center h-12">{seg.name}</div>
            {metrics.map((m, colIdx) => (
              <motion.div
                key={`${seg.name}-${m.key}-${rowIdx}-${colIdx}`}
                className={`relative flex items-center justify-center h-12 rounded-lg cursor-pointer transition-all duration-200 ${getColor(m.key, seg[m.key as keyof typeof seg] as number)}`}
                onMouseEnter={() => setHovered({row: rowIdx, col: colIdx})}
                onMouseLeave={() => setHovered(null)}
              >
                <span className="font-bold">
                  {m.key === 'ctr' || m.key === 'vcr' || m.key === 'viewability'
                    ? ((seg[m.key as keyof typeof seg] as number) * 100).toFixed(1) + m.unit
                    : m.key === 'roi'
                    ? (seg[m.key as keyof typeof seg] as number).toFixed(2) + m.unit
                    : seg[m.key as keyof typeof seg] + m.unit}
                </span>
                {hovered && hovered.row === rowIdx && hovered.col === colIdx && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute z-20 left-1/2 -translate-x-1/2 top-14 min-w-[180px] p-3 rounded-lg bg-dark-300/95 border border-neon-blue/40 shadow-xl text-xs text-white"
                  >
                    <div className="font-semibold mb-1">{seg.name} - {m.label}</div>
                    <div>{seg.drivers}</div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
} 