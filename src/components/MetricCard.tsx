'use client'

import { motion } from 'framer-motion'
import { MetricCard as MetricCardType } from '@/types'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface MetricCardProps {
  metric: MetricCardType
  className?: string
}

export function MetricCard({ metric, className = '' }: MetricCardProps) {
  const formatValue = (value: string | number) => {
    if (typeof value === 'number') {
      if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M`
      } else if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}K`
      }
      return value.toLocaleString()
    }
    return value
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) {
      return <TrendingUp className="w-4 h-4 text-green-400" />
    } else if (change < 0) {
      return <TrendingDown className="w-4 h-4 text-red-400" />
    } else {
      return <Minus className="w-4 h-4 text-gray-400" />
    }
  }

  const getChangeColor = (change: number) => {
    if (change > 0) {
      return 'text-green-400'
    } else if (change < 0) {
      return 'text-red-400'
    } else {
      return 'text-gray-400'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`futuristic-card p-6 ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${metric.color}`}>
            {metric.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{metric.title}</h3>
            <div className="flex items-center space-x-2">
              {getChangeIcon(metric.change)}
              <span className={`text-sm font-medium ${getChangeColor(metric.change)}`}>
                {metric.change > 0 ? '+' : ''}{metric.change}%
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-bold text-white mb-2"
        >
          {formatValue(metric.value)}
        </motion.div>
      </div>
    </motion.div>
  )
}

// Metric card grid component
interface MetricCardGridProps {
  metrics: MetricCardType[]
  title?: string
  columns?: 2 | 3 | 4
}

export function MetricCardGrid({ metrics, title, columns = 4 }: MetricCardGridProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <div className="space-y-4">
      {title && (
        <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      )}
      <div className={`grid ${gridCols[columns]} gap-6`}>
        {metrics.map((metric, index) => (
          <MetricCard 
            key={index} 
            metric={metric} 
          />
        ))}
      </div>
    </div>
  )
}

// Compact metric card for smaller spaces
interface CompactMetricCardProps {
  title: string
  value: string | number
  change: number
  icon: string
  color: string
}

export function CompactMetricCard({ title, value, change, icon, color }: CompactMetricCardProps) {
  const formatValue = (value: string | number) => {
    if (typeof value === 'number') {
      if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M`
      } else if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}K`
      }
      return value.toLocaleString()
    }
    return value
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) {
      return <TrendingUp className="w-3 h-3 text-green-400" />
    } else if (change < 0) {
      return <TrendingDown className="w-3 h-3 text-red-400" />
    } else {
      return <Minus className="w-3 h-3 text-gray-400" />
    }
  }

  const getChangeColor = (change: number) => {
    if (change > 0) {
      return 'text-green-400'
    } else if (change < 0) {
      return 'text-red-400'
    } else {
      return 'text-gray-400'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="futuristic-card p-4"
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg ${color}`}>
            {icon}
          </div>
          <div>
            <h4 className="text-sm font-medium text-white">{title}</h4>
            <div className="flex items-center space-x-1">
              {getChangeIcon(change)}
              <span className={`text-xs ${getChangeColor(change)}`}>
                {change > 0 ? '+' : ''}{change}%
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-white">
            {formatValue(value)}
          </div>
        </div>
      </div>
    </motion.div>
  )
} 