'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, TrendingUp, Users, Eye, Target, Lightbulb, Calendar } from 'lucide-react'

interface DailyDigestModalProps {
  isOpen: boolean
  onClose: () => void
}

interface DigestData {
  topCampaign: {
    name: string
    roi: number
    growth: number
  }
  topSegment: {
    name: string
    conversions: number
    growth: number
  }
  totalImpressions: {
    value: number
    growth: number
  }
  viewabilityLeader: {
    campaign: string
    rate: number
  }
  smartInsight: {
    title: string
    description: string
    confidence: number
  }
}

const mockDigestData: DigestData = {
  topCampaign: {
    name: "Summer Sale Campaign",
    roi: 3.46,
    growth: 12.5
  },
  topSegment: {
    name: "Craft Beer Drinkers",
    conversions: 2847,
    growth: 8.3
  },
  totalImpressions: {
    value: 28900000,
    growth: 15.7
  },
  viewabilityLeader: {
    campaign: "Back to School Prep",
    rate: 99.2
  },
  smartInsight: {
    title: "Audience Targeting Optimization",
    description: "Campaign 13 shows 23% higher engagement when targeting 'DIY Shoppers' segment during weekend hours. Consider increasing budget allocation to this segment.",
    confidence: 87
  }
}

export function DailyDigestModal({ isOpen, onClose }: DailyDigestModalProps) {
  const data = mockDigestData

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-card border border-accent/30 rounded-2xl shadow-2xl glow-ring overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-accent/20 bg-gradient-to-r from-muted to-card">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Daily Digest</h2>
                  <p className="text-muted">Your campaign performance summary</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-muted hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Top Performing Campaign */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="futuristic-card p-4"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-neon-green to-emerald-500 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Top Campaign</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-white font-medium">{data.topCampaign.name}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-neon-green">
                        {data.topCampaign.roi}x ROI
                      </span>
                      <div className="flex items-center space-x-1 text-green-400">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm">+{data.topCampaign.growth}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Top Segment */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="futuristic-card p-4"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-neon-purple to-purple-500 flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Top Segment</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-white font-medium">{data.topSegment.name}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-neon-purple">
                        {formatNumber(data.topSegment.conversions)}
                      </span>
                      <div className="flex items-center space-x-1 text-green-400">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm">+{data.topSegment.growth}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Total Impressions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="futuristic-card p-4"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-neon-blue to-cyan-500 flex items-center justify-center">
                      <Eye className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Impressions</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-white font-medium">Yesterday</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-neon-blue">
                        {formatNumber(data.totalImpressions.value)}
                      </span>
                      <div className="flex items-center space-x-1 text-green-400">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm">+{data.totalImpressions.growth}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Viewability Leader */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="futuristic-card p-4"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-neon-pink to-pink-500 flex items-center justify-center">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Viewability</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-white font-medium">{data.viewabilityLeader.campaign}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-neon-pink">
                        {data.viewabilityLeader.rate}%
                      </span>
                      <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Smart Insight */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="futuristic-card p-6 bg-gradient-to-r from-dark-300 to-dark-200 border border-neon-blue/20"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">{data.smartInsight.title}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400">Confidence</span>
                        <span className="text-sm font-semibold text-neon-green">{data.smartInsight.confidence}%</span>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{data.smartInsight.description}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-neon-blue/20 bg-dark-300">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">
                  Generated on {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-gradient-to-r from-neon-blue to-cyan-500 text-white rounded-lg font-medium hover:from-cyan-500 hover:to-neon-blue transition-all duration-300 glow-ring"
                >
                  Got it
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 