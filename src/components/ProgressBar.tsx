'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface ProgressBarType {
  label: string
  value: number
  maxValue: number
  color: string
  change?: number
  unit?: string
}

interface ProgressBarProps {
  progress: ProgressBarType
  className?: string
}

export function ProgressBar({ progress, className = '' }: ProgressBarProps) {
  const percentage = Math.min((progress.value / progress.maxValue) * 100, 100)
  const isComplete = percentage >= 100

  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`
    }
    return (value || 0).toLocaleString()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`futuristic-card p-4 ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-white font-medium">{progress.label}</h4>
        <div className="text-right">
          <p className="text-white font-semibold">
            {formatValue(progress.value)} / {formatValue(progress.maxValue)}
          </p>
          <p className="text-sm text-gray-400">{progress.unit}</p>
        </div>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-3 relative overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          className={`h-3 rounded-full relative ${
            isComplete 
              ? 'bg-gradient-to-r from-neon-green to-emerald-500' 
              : 'bg-gradient-to-r from-neon-blue to-cyan-500'
          }`}
          style={{
            background: `linear-gradient(90deg, ${progress.color} 0%, ${progress.color}80 100%)`
          }}
        >
          {isComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"
            />
          )}
        </motion.div>
      </div>
      
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-400">
          {percentage.toFixed(1)}% Complete
        </span>
        {isComplete && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className="text-neon-green text-sm font-semibold"
          >
            ✓ Target Achieved
          </motion.span>
        )}
      </div>
    </motion.div>
  )
}

// Progress bar collection component
interface ProgressBarCollectionProps {
  progressBars: ProgressBarType[]
  title?: string
}

export function ProgressBarCollection({ progressBars, title = 'Campaign Progress' }: ProgressBarCollectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {progressBars.map((progress, index) => (
          <ProgressBar key={`${progress.label}-${index}`} progress={progress} />
        ))}
      </div>
    </div>
  )
}

// Compact progress bar for inline use
interface CompactProgressBarProps {
  current: number
  target: number
  label: string
  color?: string
  showPercentage?: boolean
}

export function CompactProgressBar({ 
  current, 
  target, 
  label, 
  color = '#00d4ff',
  showPercentage = true 
}: CompactProgressBarProps) {
  const percentage = Math.min((current / target) * 100, 100)

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-gray-300">{label}</span>
        {showPercentage && (
          <span className="text-white font-medium">{percentage.toFixed(1)}%</span>
        )}
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8 }}
          className="h-2 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color} 0%, ${color}80 100%)`
          }}
        />
      </div>
    </div>
  )
} 