'use client'
import React from 'react'
import { AudienceSegment } from '@/types'
import { DiscrepancyBadge } from './DiscrepancyBadge'

interface AudienceTableProps {
  segments: AudienceSegment[]
}

export function AudienceTable({ segments }: AudienceTableProps) {
  // TODO: Add sorting and export logic
  return (
    <div className="futuristic-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Audience Segments</h3>
        <button className="px-4 py-2 bg-neon-blue text-white rounded-lg font-medium hover:bg-neon-green transition-all">Export CSV</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Segment</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Type</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Impressions</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Clicks</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Conversions</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">ROI</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Discrepancy</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Confidence</th>
            </tr>
          </thead>
          <tbody>
            {segments.map(seg => (
              <tr key={seg.id} className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors">
                <td className="py-3 px-4 text-white">{seg.name}</td>
                <td className="py-3 px-4 text-gray-300 capitalize">{seg.type}</td>
                <td className="py-3 px-4 text-neon-blue">{seg.impressions.toLocaleString()}</td>
                <td className="py-3 px-4 text-neon-green">{seg.clicks.toLocaleString()}</td>
                <td className="py-3 px-4 text-neon-purple">{seg.conversions.toLocaleString()}</td>
                <td className="py-3 px-4 text-neon-pink">{seg.roi.toFixed(2)}x</td>
                <td className="py-3 px-4"><DiscrepancyBadge value={seg.discrepancy} /></td>
                <td className="py-3 px-4 text-neon-yellow">{(seg.confidence * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 