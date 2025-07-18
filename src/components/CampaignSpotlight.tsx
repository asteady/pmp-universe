'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Star, Eye, Zap } from 'lucide-react'

interface CampaignSpotlightProps {
  campaign?: {
    name: string
    logoUrl?: string
    roi: number
    verifiedVisits: number
    viewability: number
    ctr: number
    vcr: number
    kpiDelta: number
    kpiDirection: 'up' | 'down'
  }
}

const defaultCampaign = {
  name: 'Nike Run Club 2024',
  logoUrl: '', // Removed logo reference to prevent 404
  roi: 4.2,
  verifiedVisits: 18000,
  viewability: 0.91,
  ctr: 0.045,
  vcr: 0.62,
  kpiDelta: 12.3,
  kpiDirection: 'up' as const
}

export function CampaignSpotlight({ campaign = defaultCampaign }: CampaignSpotlightProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="futuristic-card flex items-center p-6 mb-6 glass shadow-lg border border-neon-blue/30"
    >
      {campaign.logoUrl && (
        <img src={campaign.logoUrl} alt="Logo" className="w-16 h-16 rounded-xl mr-6 bg-white/10 object-contain" />
      )}
      <div className="flex-1">
        <div className="flex items-center space-x-3 mb-2">
          <h2 className="text-2xl font-bold text-white tracking-tight">{campaign.name}</h2>
          <span className="px-2 py-1 text-xs rounded bg-neon-blue/20 text-neon-blue font-semibold">Featured</span>
        </div>
        <div className="flex items-center space-x-6 mb-2">
          <div className="flex items-center space-x-1 text-neon-green">
            <TrendingUp className="w-4 h-4" />
            <span className="font-semibold">{campaign.roi}x ROI</span>
          </div>
          <div className="flex items-center space-x-1 text-neon-purple">
            <Eye className="w-4 h-4" />
            <span className="font-semibold">{(campaign.verifiedVisits || 0).toLocaleString()} Visits</span>
          </div>
          <div className="flex items-center space-x-1 text-neon-pink">
            <Star className="w-4 h-4" />
            <span className="font-semibold">{(campaign.viewability * 100).toFixed(1)}% Viewability</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">Performance Pulse</span>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, Math.abs(campaign.kpiDelta * 2))}%` }}
            transition={{ duration: 1.2, type: 'spring' }}
            className={`h-3 rounded-full ${campaign.kpiDirection === 'up' ? 'bg-neon-green' : 'bg-neon-pink'} shadow-inner`}
            style={{ minWidth: 24, maxWidth: 160 }}
          />
          <span className={`text-xs font-bold ${campaign.kpiDirection === 'up' ? 'text-neon-green' : 'text-neon-pink'}`}>{campaign.kpiDirection === 'up' ? '▲' : '▼'} {Math.abs(campaign.kpiDelta).toFixed(1)}%</span>
        </div>
      </div>
      <div className="ml-6 flex flex-col items-end">
        <Zap className="w-6 h-6 text-neon-blue animate-pulse mb-2" />
        <span className="text-xs text-gray-400">Spotlight</span>
      </div>
    </motion.div>
  )
} 