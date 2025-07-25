'use client'
import React from 'react'

interface SmartInsightProps {
  confidence: number
  message: string
}

export function SmartInsight({ confidence, message }: SmartInsightProps) {
  return (
    <div className="futuristic-card p-4 mb-4 border-l-4 border-accent bg-card/80">
      <div className="flex items-center space-x-3 mb-2">
        <span className="text-accent font-bold text-lg">Confidence: {(confidence * 100).toFixed(1)}%</span>
      </div>
      <div className="text-foreground text-base">{message}</div>
    </div>
  )
} 