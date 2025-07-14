'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp } from 'lucide-react'

interface BenchmarkToggleProps {
  onToggle: (enabled: boolean) => void
  className?: string
}

interface BenchmarkData {
  retail: {
    impressions: number
    ctr: number
    roi: number
    viewability: number
  }
  auto: {
    impressions: number
    ctr: number
    roi: number
    viewability: number
  }
  qsr: {
    impressions: number
    ctr: number
    roi: number
    viewability: number
  }
}

const mockBenchmarks: BenchmarkData = {
  retail: {
    impressions: 2500000,
    ctr: 0.045,
    roi: 2.8,
    viewability: 0.72
  },
  auto: {
    impressions: 1800000,
    ctr: 0.038,
    roi: 3.2,
    viewability: 0.78
  },
  qsr: {
    impressions: 3200000,
    ctr: 0.07,
    roi: 2.5,
    viewability: 0.85
  }
}

export function BenchmarkToggle({ onToggle, className = "" }: BenchmarkToggleProps) {
  const [isEnabled, setIsEnabled] = useState(false)

  const handleToggle = () => {
    const newState = !isEnabled
    setIsEnabled(newState)
    onToggle(newState)
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="flex items-center space-x-2">
        <BarChart3 className="w-4 h-4 text-neon-blue" />
        <span className="text-sm font-medium text-white">Benchmark Mode</span>
      </div>
      
      <button
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2 focus:ring-offset-dark-200 ${
          isEnabled 
            ? 'bg-gradient-to-r from-neon-blue to-cyan-500' 
            : 'bg-gray-600'
        }`}
      >
        <motion.span
          layout
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-200 ease-in-out ${
            isEnabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>

      {isEnabled && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center space-x-2 text-xs text-gray-400"
        >
          <TrendingUp className="w-3 h-3" />
          <span>Industry benchmarks enabled</span>
        </motion.div>
      )}
    </div>
  )
}

// Export benchmark data for use in charts
export { mockBenchmarks }
export type { BenchmarkData } 