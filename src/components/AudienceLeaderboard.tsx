'use client'
import React from 'react'
import { AudienceLeaderboardEntry } from '@/types'

interface AudienceLeaderboardProps {
  entries: AudienceLeaderboardEntry[]
}

export function AudienceLeaderboard({ entries }: AudienceLeaderboardProps) {
  return (
    <div className="futuristic-card p-6">
      <h3 className="text-xl font-bold text-white mb-4">Top Audience Segments by ROI</h3>
      <ol className="space-y-2">
        {entries.slice(0, 10).map((entry, idx) => (
          <li key={entry.id} className="flex items-center space-x-4">
            <span className="text-2xl font-bold text-neon-blue">#{idx + 1}</span>
            <span className="flex-1 text-white font-medium">{entry.name}</span>
            <span className="text-neon-pink font-bold">{entry.roi.toFixed(2)}x</span>
            <span className="text-neon-green">{entry.conversions} conv.</span>
            <span className="text-neon-yellow">{entry.impressions.toLocaleString()} imp.</span>
          </li>
        ))}
      </ol>
    </div>
  )
} 