'use client'
import React from 'react'

export function DiscrepancyBadge({ value }: { value: number }) {
  let color = 'bg-neon-green text-white'
  let label = 'Low'
  if (value >= 0.08) {
    color = 'bg-neon-pink text-white'
    label = 'High'
  } else if (value >= 0.03) {
    color = 'bg-yellow-400 text-gray-900'
    label = 'Medium'
  }
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${color}`}>{label}</span>
  )
} 