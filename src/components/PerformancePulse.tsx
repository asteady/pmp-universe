'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Target, Zap, AlertTriangle, CheckCircle } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'

interface PerformanceMetric {
  name: string
  current: number
  target: number
  unit: string
  trend: number
  status: 'exceeding' | 'on-track' | 'at-risk' | 'critical'
  description: string
}

interface PerformancePulseProps {
  className?: string
}

export function PerformancePulse({ className = '' }: PerformancePulseProps) {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null)

  const metrics: PerformanceMetric[] = [
    {
      name: 'CTR',
      current: 5.78,
      target: 4.5,
      unit: '%',
      trend: 12.5,
      status: 'exceeding',
      description: 'Click-through rate is performing 28% above target with strong creative engagement.'
    },
    {
      name: 'ROI',
      current: 3.15,
      target: 3.0,
      unit: 'x',
      trend: 8.3,
      status: 'exceeding',
      description: 'Return on investment is 5% above target, driven by efficient audience targeting.'
    },
    {
      name: 'Viewability',
      current: 91.2,
      target: 90.0,
      unit: '%',
      trend: 2.1,
      status: 'on-track',
      description: 'Viewability rate is meeting target with room for optimization in premium inventory.'
    },
    {
      name: 'Conversions',
      current: 12500,
      target: 15000,
      unit: '',
      trend: -5.7,
      status: 'at-risk',
      description: 'Conversions are 17% below target. Consider audience expansion and creative refresh.'
    },
    {
      name: 'VCR',
      current: 68.5,
      target: 75.0,
      unit: '%',
      trend: -8.9,
      status: 'critical',
      description: 'Video completion rate is significantly below target. Review video length and creative.'
    },
    {
      name: 'Dwell Time',
      current: 32,
      target: 35,
      unit: 's',
      trend: -3.2,
      status: 'at-risk',
      description: 'Average dwell time is slightly below target. Optimize for engagement.'
    }
  ]

  const getStatusColor = (status: PerformanceMetric['status']) => {
    switch (status) {
      case 'exceeding':
        return 'text-neon-green border-neon-green bg-neon-green/10'
      case 'on-track':
        return 'text-neon-blue border-neon-blue bg-neon-blue/10'
      case 'at-risk':
        return 'text-yellow-400 border-yellow-400 bg-yellow-400/10'
      case 'critical':
        return 'text-neon-pink border-neon-pink bg-neon-pink/10'
      default:
        return 'text-gray-400 border-gray-400 bg-gray-400/10'
    }
  }

  const getStatusIcon = (status: PerformanceMetric['status']) => {
    switch (status) {
      case 'exceeding':
        return <CheckCircle className="w-4 h-4" />
      case 'on-track':
        return <Target className="w-4 h-4" />
      case 'at-risk':
        return <AlertTriangle className="w-4 h-4" />
      case 'critical':
        return <Zap className="w-4 h-4" />
      default:
        return <Target className="w-4 h-4" />
    }
  }

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 120) // Cap at 120% for visual purposes
  }

  const formatValue = (value: number, unit: string) => {
    if (unit === '%') {
      return `${value.toFixed(1)}%`
    } else if (unit === 'x') {
      return `${value.toFixed(2)}x`
    } else if (unit === 's') {
      return `${value}s`
    } else {
      return value.toLocaleString()
    }
  }

  return (
    <div className={`futuristic-card p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-neon-blue to-cyan-500 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Performance Pulse</h3>
            <p className="text-sm text-gray-400">Real-time KPI monitoring and insights</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-neon-green"></div>
            <span>Exceeding</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-neon-blue"></div>
            <span>On Track</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <span>At Risk</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-neon-pink"></div>
            <span>Critical</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${getStatusColor(metric.status)}`}
            onClick={() => setSelectedMetric(selectedMetric === metric.name ? null : metric.name)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {getStatusIcon(metric.status)}
                <span className="font-semibold">{metric.name}</span>
              </div>
              <div className="flex items-center space-x-1">
                {metric.trend > 0 ? (
                  <TrendingUp className="w-4 h-4 text-neon-green" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-neon-pink" />
                )}
                <span className={`text-xs ${metric.trend > 0 ? 'text-neon-green' : 'text-neon-pink'}`}>
                  {metric.trend > 0 ? '+' : ''}{metric.trend}%
                </span>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold">
                  {formatValue(metric.current, metric.unit)}
                </span>
                <span className="text-sm text-gray-400">
                  / {formatValue(metric.target, metric.unit)} target
                </span>
              </div>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${getProgressPercentage(metric.current, metric.target)}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className={`h-2 rounded-full ${
                  metric.status === 'exceeding' ? 'bg-neon-green' :
                  metric.status === 'on-track' ? 'bg-neon-blue' :
                  metric.status === 'at-risk' ? 'bg-yellow-400' :
                  'bg-neon-pink'
                }`}
              />
            </div>

            <div className="text-xs text-gray-400">
              {getProgressPercentage(metric.current, metric.target).toFixed(1)}% of target
            </div>

            {/* Expanded Description */}
            <AnimatePresence>
              {selectedMetric === metric.name && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 pt-3 border-t border-gray-600"
                >
                  <p className="text-sm leading-relaxed">
                    {metric.description}
                  </p>
                  <div className="mt-2 flex items-center space-x-2">
                    <button className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded transition-colors">
                      View Details
                    </button>
                    <button className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded transition-colors">
                      Optimize
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-gray-600">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-neon-green">
              {metrics.filter(m => m.status === 'exceeding').length}
            </div>
            <div className="text-sm text-gray-400">Exceeding Target</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-neon-blue">
              {metrics.filter(m => m.status === 'on-track').length}
            </div>
            <div className="text-sm text-gray-400">On Track</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {metrics.filter(m => m.status === 'at-risk').length}
            </div>
            <div className="text-sm text-gray-400">At Risk</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-neon-pink">
              {metrics.filter(m => m.status === 'critical').length}
            </div>
            <div className="text-sm text-gray-400">Critical</div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-6 p-4 bg-gradient-to-r from-dark-300 to-dark-200 rounded-lg border border-neon-blue/20">
        <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
          <Zap className="w-5 h-5 text-neon-blue mr-2" />
          Smart Recommendations
        </h4>
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 rounded-full bg-neon-pink mt-2 flex-shrink-0"></div>
            <p className="text-sm text-gray-300">
              <strong>VCR Optimization:</strong> Consider reducing video length from 30s to 15s to improve completion rates.
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
            <p className="text-sm text-gray-300">
              <strong>Conversion Boost:</strong> Expand audience targeting to include lookalike segments based on high-value converters.
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 rounded-full bg-neon-green mt-2 flex-shrink-0"></div>
            <p className="text-sm text-gray-300">
              <strong>CTR Success:</strong> Apply winning creative elements from top-performing ads to underperforming campaigns.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 