'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Target, Play, Pause, Settings, AlertTriangle, CheckCircle } from 'lucide-react'

interface CampaignPacingData {
  id: string
  name: string
  advertiser: string
  budget: number
  spent: number
  impressions: number
  impressionsGoal: number
  clicks: number
  clicksGoal: number
  conversions: number
  conversionsGoal: number
  ctr: number
  ctrGoal: number
  roi: number
  roiGoal: number
  status: 'ahead' | 'on-track' | 'behind' | 'paused'
  daysRemaining: number
  dailyBudget: number
  dailySpent: number
}

interface CampaignPacingProps {
  className?: string
}

export function CampaignPacing({ className = '' }: CampaignPacingProps) {
  const [showPaused, setShowPaused] = useState(false)
  const [sortBy, setSortBy] = useState<'status' | 'budget' | 'performance'>('status')

  const campaigns: CampaignPacingData[] = [
    {
      id: 'camp1',
      name: 'Summer Surge 2025',
      advertiser: 'Nike',
      budget: 500000,
      spent: 320000,
      impressions: 8500000,
      impressionsGoal: 10000000,
      clicks: 425000,
      clicksGoal: 500000,
      conversions: 8500,
      conversionsGoal: 10000,
      ctr: 5.0,
      ctrGoal: 5.0,
      roi: 3.2,
      roiGoal: 3.0,
      status: 'ahead',
      daysRemaining: 12,
      dailyBudget: 41667,
      dailySpent: 45000
    },
    {
      id: 'camp2',
      name: 'Back to School',
      advertiser: 'Apple',
      budget: 300000,
      spent: 180000,
      impressions: 4800000,
      impressionsGoal: 6000000,
      clicks: 240000,
      clicksGoal: 300000,
      conversions: 4800,
      conversionsGoal: 6000,
      ctr: 5.0,
      ctrGoal: 5.0,
      roi: 2.8,
      roiGoal: 3.0,
      status: 'on-track',
      daysRemaining: 8,
      dailyBudget: 37500,
      dailySpent: 36000
    },
    {
      id: 'camp3',
      name: 'Holiday Prep',
      advertiser: 'Toyota',
      budget: 750000,
      spent: 600000,
      impressions: 12000000,
      impressionsGoal: 15000000,
      clicks: 540000,
      clicksGoal: 750000,
      conversions: 10800,
      conversionsGoal: 15000,
      ctr: 4.5,
      ctrGoal: 5.0,
      roi: 2.5,
      roiGoal: 3.0,
      status: 'behind',
      daysRemaining: 5,
      dailyBudget: 50000,
      dailySpent: 55000
    },
    {
      id: 'camp4',
      name: 'Q1 Brand Awareness',
      advertiser: 'Coca-Cola',
      budget: 400000,
      spent: 0,
      impressions: 0,
      impressionsGoal: 8000000,
      clicks: 0,
      clicksGoal: 400000,
      conversions: 0,
      conversionsGoal: 8000,
      ctr: 0,
      ctrGoal: 5.0,
      roi: 0,
      roiGoal: 3.0,
      status: 'paused',
      daysRemaining: 30,
      dailyBudget: 13333,
      dailySpent: 0
    }
  ]

  const getStatusColor = (status: CampaignPacingData['status']) => {
    switch (status) {
      case 'ahead':
        return 'text-neon-green border-neon-green bg-neon-green/10'
      case 'on-track':
        return 'text-neon-blue border-neon-blue bg-neon-blue/10'
      case 'behind':
        return 'text-yellow-400 border-yellow-400 bg-yellow-400/10'
      case 'paused':
        return 'text-gray-400 border-gray-400 bg-gray-400/10'
      default:
        return 'text-gray-400 border-gray-400 bg-gray-400/10'
    }
  }

  const getStatusIcon = (status: CampaignPacingData['status']) => {
    switch (status) {
      case 'ahead':
        return <TrendingUp className="w-4 h-4" />
      case 'on-track':
        return <Target className="w-4 h-4" />
      case 'behind':
        return <AlertTriangle className="w-4 h-4" />
      case 'paused':
        return <Pause className="w-4 h-4" />
      default:
        return <Target className="w-4 h-4" />
    }
  }

  const getBudgetProgress = (spent: number, budget: number) => {
    return Math.min((spent / budget) * 100, 100)
  }

  const getPerformanceScore = (campaign: CampaignPacingData) => {
    const budgetScore = (campaign.spent / campaign.budget) * 100
    const ctrScore = (campaign.ctr / campaign.ctrGoal) * 100
    const roiScore = (campaign.roi / campaign.roiGoal) * 100
    
    return (budgetScore + ctrScore + roiScore) / 3
  }

  const filteredCampaigns = campaigns.filter(campaign => 
    showPaused ? true : campaign.status !== 'paused'
  )

  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    switch (sortBy) {
      case 'status':
        const statusOrder = { 'ahead': 0, 'on-track': 1, 'behind': 2, 'paused': 3 }
        return statusOrder[a.status] - statusOrder[b.status]
      case 'budget':
        return getBudgetProgress(b.spent, b.budget) - getBudgetProgress(a.spent, a.budget)
      case 'performance':
        return getPerformanceScore(b) - getPerformanceScore(a)
      default:
        return 0
    }
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className={`futuristic-card p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-neon-purple to-pink-500 flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Campaign Pacing</h3>
            <p className="text-sm text-gray-400">Budget and performance monitoring</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2 text-sm text-gray-400">
              <input
                type="checkbox"
                checked={showPaused}
                onChange={(e) => setShowPaused(e.target.checked)}
                className="rounded border-gray-600 bg-dark-200"
              />
              <span>Show Paused</span>
            </label>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
          >
            <option value="status">Sort by Status</option>
            <option value="budget">Sort by Budget</option>
            <option value="performance">Sort by Performance</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {sortedCampaigns.map((campaign) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-4 rounded-lg border-2 transition-all duration-200 hover:scale-[1.02] ${getStatusColor(campaign.status)}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon(campaign.status)}
                <div>
                  <h4 className="font-semibold text-white">{campaign.name}</h4>
                  <p className="text-sm text-gray-400">{campaign.advertiser}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">{campaign.daysRemaining} days left</span>
                <button className="p-2 hover:bg-gray-700 rounded transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* Budget Progress */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Budget</span>
                  <span className="text-white">
                    {formatCurrency(campaign.spent)} / {formatCurrency(campaign.budget)}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${getBudgetProgress(campaign.spent, campaign.budget)}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`h-2 rounded-full ${
                      getBudgetProgress(campaign.spent, campaign.budget) > 90 ? 'bg-neon-pink' :
                      getBudgetProgress(campaign.spent, campaign.budget) > 75 ? 'bg-yellow-400' :
                      'bg-neon-green'
                    }`}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Daily: {formatCurrency(campaign.dailySpent)}</span>
                  <span>Target: {formatCurrency(campaign.dailyBudget)}</span>
                </div>
              </div>

              {/* CTR Progress */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">CTR</span>
                  <span className="text-white">
                    {campaign.ctr.toFixed(2)}% / {campaign.ctrGoal.toFixed(2)}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((campaign.ctr / campaign.ctrGoal) * 100, 120)}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className={`h-2 rounded-full ${
                      campaign.ctr >= campaign.ctrGoal ? 'bg-neon-green' :
                      campaign.ctr >= campaign.ctrGoal * 0.8 ? 'bg-yellow-400' :
                      'bg-neon-pink'
                    }`}
                  />
                </div>
              </div>

              {/* ROI Progress */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">ROI</span>
                  <span className="text-white">
                    {campaign.roi.toFixed(2)}x / {campaign.roiGoal.toFixed(2)}x
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((campaign.roi / campaign.roiGoal) * 100, 120)}%` }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className={`h-2 rounded-full ${
                      campaign.roi >= campaign.roiGoal ? 'bg-neon-green' :
                      campaign.roi >= campaign.roiGoal * 0.8 ? 'bg-yellow-400' :
                      'bg-neon-pink'
                    }`}
                  />
                </div>
              </div>

              {/* Conversions Progress */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Conversions</span>
                  <span className="text-white">
                    {(campaign.conversions || 0).toLocaleString()} / {(campaign.conversionsGoal || 0).toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((campaign.conversions / campaign.conversionsGoal) * 100, 120)}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-2 rounded-full ${
                      campaign.conversions >= campaign.conversionsGoal ? 'bg-neon-green' :
                      campaign.conversions >= campaign.conversionsGoal * 0.8 ? 'bg-yellow-400' :
                      'bg-neon-pink'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-600">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>Performance Score:</span>
                <span className={`font-semibold ${
                  getPerformanceScore(campaign) >= 90 ? 'text-neon-green' :
                  getPerformanceScore(campaign) >= 70 ? 'text-yellow-400' :
                  'text-neon-pink'
                }`}>
                  {getPerformanceScore(campaign).toFixed(0)}%
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-xs px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded transition-colors">
                  Optimize
                </button>
                <button className="text-xs px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded transition-colors">
                  Adjust Budget
                </button>
                {campaign.status === 'paused' ? (
                  <button className="text-xs px-3 py-1 bg-neon-green hover:bg-neon-green/80 rounded transition-colors flex items-center space-x-1">
                    <Play className="w-3 h-3" />
                    <span>Resume</span>
                  </button>
                ) : (
                  <button className="text-xs px-3 py-1 bg-yellow-400 hover:bg-yellow-400/80 rounded transition-colors text-gray-900 flex items-center space-x-1">
                    <Pause className="w-3 h-3" />
                    <span>Pause</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-gray-600">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-neon-green">
              {campaigns.filter(c => c.status === 'ahead').length}
            </div>
            <div className="text-sm text-gray-400">Ahead of Pace</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-neon-blue">
              {campaigns.filter(c => c.status === 'on-track').length}
            </div>
            <div className="text-sm text-gray-400">On Track</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {campaigns.filter(c => c.status === 'behind').length}
            </div>
            <div className="text-sm text-gray-400">Behind Pace</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-400">
              {campaigns.filter(c => c.status === 'paused').length}
            </div>
            <div className="text-sm text-gray-400">Paused</div>
          </div>
        </div>
      </div>
    </div>
  )
} 