'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter } from '@/components/Filter'
import { Chart } from '@/components/Chart'
import { Badge, BadgeCollection } from '@/components/Badge'
import { Leaderboard, MiniLeaderboard } from '@/components/Leaderboard'
import { ProgressBar, ProgressBarCollection } from '@/components/ProgressBar'
import { MetricCard, MetricCardGrid } from '@/components/MetricCard'
import { DailyDigestModal } from '@/components/DailyDigestModal'
import dynamic from 'next/dynamic'
import type { FC } from 'react'
import { BenchmarkToggle } from '@/components/BenchmarkToggle'
import { CampaignSpotlight } from '@/components/CampaignSpotlight'
import { SegmentPerformanceGrid } from '@/components/SegmentPerformanceGrid'
import { TimeMachineToggle } from '@/components/TimeMachineToggle'
import { FilterParams } from '@/types'
import { 
  campaignData, 
  newToBrandData, 
  viewabilityData, 
  geoDeviceData, 
  placementData, 
  footTrafficData,
  getChartData,
  getBadgeConditions,
  getLeaderboardData,
  getProgressData,
  audiencePerformanceData
} from '@/api/mockData'
import Link from 'next/link'
import { AudienceTable } from '@/components/AudienceTable'
import { AudienceLeaderboard } from '@/components/AudienceLeaderboard'
import { SmartInsight } from '@/components/SmartInsight'

const InteractiveMap = dynamic(() => import('@/components/InteractiveMap').then(mod => mod.InteractiveMap), { ssr: false }) as FC

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('main')
  const [filters, setFilters] = useState<FilterParams>({
    date_range: 'last_30_days',
    aggregation: 'day'
  })
  const [userRole] = useState<'admin' | 'advertiser' | 'agency'>('admin')
  const [isDailyDigestOpen, setIsDailyDigestOpen] = useState(false)
  const [benchmarkMode, setBenchmarkMode] = useState(false)

  const tabs = [
    { id: 'main', label: 'Main Dashboard' },
    { id: 'new-to-brand', label: 'New to Brand' },
    { id: 'viewability', label: 'Viewability' },
    { id: 'geo-device', label: 'Geo/Device' },
    { id: 'placements', label: 'Placements' },
    { id: 'foot-traffic', label: 'Foot Traffic' },
    { id: 'audiences', label: 'Audiences' },
  ]

  const handleFiltersChange = (newFilters: FilterParams) => {
    setFilters(newFilters)
  }

  const handleApplyFilters = () => {
    console.log('Applying filters:', filters)
    // In a real app, this would trigger API calls
  }

  const handleRunFilters = () => {
    console.log('Running filters:', filters)
    // In a real app, this would refresh all data
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-400 via-dark-300 to-dark-200">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-dark-200/80 backdrop-blur-md border-b border-neon-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <img src="/logo-demo.png" alt="Infillion Logo" className="h-10 w-10 mr-2" />
              <h1 className="text-3xl font-extrabold text-white neon-glow">
                Infillion Analytics Dashboard
              </h1>
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-gray-300">|</span>
                <span className="text-gray-300">Media BU & Enterprise BU</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">
                Role: <span className="text-neon-blue font-medium">{userRole}</span>
              </span>
              <button
                onClick={() => setIsDailyDigestOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-neon-blue to-cyan-500 text-white rounded-lg font-medium hover:from-cyan-500 hover:to-neon-blue transition-all duration-300 glow-ring flex items-center space-x-2"
              >
                <span>📊</span>
                <span>Daily Digest</span>
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 pb-4 overflow-x-auto">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white shadow-lg neon-glow'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Spotlight */}
        <CampaignSpotlight />
        {/* Filters and Benchmark Toggle */}
        <div className="flex items-center justify-between mb-6">
          <Filter
            filters={filters}
            onFiltersChange={handleFiltersChange}
            userRole={userRole}
            reportType={activeTab}
            onApply={handleApplyFilters}
            onRun={handleRunFilters}
          />
          <BenchmarkToggle
            onToggle={setBenchmarkMode}
            className="ml-4"
          />
        </div>
        {/* Time Machine Toggle */}
        <TimeMachineToggle onToggle={() => {}} delta={12.3} className="mb-6" />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'main' && <MainDashboard benchmarkMode={benchmarkMode} />}
            {activeTab === 'new-to-brand' && <NewToBrandDashboard benchmarkMode={benchmarkMode} />}
            {activeTab === 'viewability' && <ViewabilityDashboard benchmarkMode={benchmarkMode} />}
            {activeTab === 'geo-device' && <GeoDeviceDashboard benchmarkMode={benchmarkMode} />}
            {activeTab === 'placements' && <PlacementsDashboard benchmarkMode={benchmarkMode} />}
            {activeTab === 'foot-traffic' && <FootTrafficDashboard benchmarkMode={benchmarkMode} />}
            {activeTab === 'audiences' && <AudiencesDashboard />}
          </motion.div>
        </AnimatePresence>
        {/* Segment Performance Grid */}
        <SegmentPerformanceGrid />
        {/* Daily Digest Modal */}
        <DailyDigestModal
          isOpen={isDailyDigestOpen}
          onClose={() => setIsDailyDigestOpen(false)}
        />
      </div>
    </div>
  )
}

function MainDashboard({ benchmarkMode }: { benchmarkMode: boolean }) {
  // Generate metric cards data
  const metricCards = [
    {
      title: 'Total Impressions',
      value: campaignData.reduce((sum, item) => sum + item.impressions, 0),
      change: 12.5,
      changeType: 'increase' as const,
      icon: '👁️',
      color: 'bg-neon-blue'
    },
    {
      title: 'Total Clicks',
      value: campaignData.reduce((sum, item) => sum + item.clicks, 0),
      change: 8.3,
      changeType: 'increase' as const,
      icon: '🖱️',
      color: 'bg-neon-green'
    },
    {
      title: 'Average CTR',
      value: (campaignData.reduce((sum, item) => sum + parseFloat(item.ctr), 0) / campaignData.length * 100).toFixed(2),
      change: -2.1,
      changeType: 'decrease' as const,
      icon: '📊',
      color: 'bg-neon-purple'
    },
    {
      title: 'Total Revenue',
      value: campaignData.reduce((sum, item) => sum + item.total_revenue, 0),
      change: 15.7,
      changeType: 'increase' as const,
      icon: '💰',
      color: 'bg-neon-pink'
    }
  ]

  // Generate badges data
  const badgeConditions = getBadgeConditions(campaignData)
  const badges = [
    {
      id: 'top_ctr',
      name: 'Top CTR Campaign',
      description: 'Achieve highest click-through rate',
      icon: '🎯',
      color: 'neon-blue',
      achieved: true,
      progress: parseFloat(badgeConditions.topCTR.value) * 100,
      maxProgress: 10
    },
    {
      id: 'top_viewability',
      name: 'Highest Viewability Rate',
      description: 'Achieve >90% viewability rate',
      icon: '⭐',
      color: 'neon-green',
      achieved: parseFloat(badgeConditions.topViewability.value) > 0.9,
      progress: parseFloat(badgeConditions.topViewability.value) * 100,
      maxProgress: 100
    },
    {
      id: 'foot_traffic_leader',
      name: 'Most Verified Visits Foot Traffic Campaign',
      description: 'Generate highest verified visits',
      icon: '👣',
      color: 'neon-purple',
      achieved: true,
      progress: badgeConditions.topVerifiedVisits.value,
      maxProgress: 1000
    }
  ]

  const impressionsChartData = getChartData(campaignData, 'bar', {
    label: 'Impressions',
    field: 'impressions'
  })

  const ctrChartData = getChartData(campaignData, 'line', {
    label: 'CTR Over Time',
    field: 'ctr'
  })

  const roiLeaderboard = getLeaderboardData(campaignData, 'roi').map(item => ({
    ...item,
    value: parseFloat(item.value),
    change: parseFloat(item.change)
  }))
  const progressBars = getProgressData(campaignData)

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <MetricCardGrid metrics={metricCards} columns={4} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart
          type="bar"
          data={impressionsChartData}
          height={400}
          options={{
            plugins: {
              title: {
                display: true,
                text: 'Impressions by Campaign',
                color: '#ffffff',
                font: { size: 16, weight: 'bold' }
              }
            }
          }}
        />
        <Chart
          type="line"
          data={ctrChartData}
          height={400}
          options={{
            plugins: {
              title: {
                display: true,
                text: 'CTR Over Time',
                color: '#ffffff',
                font: { size: 16, weight: 'bold' }
              }
            }
          }}
        />
      </div>

      {/* Progress Bars and Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressBarCollection progressBars={progressBars} title="Campaign Progress" />
        <Leaderboard entries={roiLeaderboard} title="Top ROI Campaigns" />
      </div>

      {/* Badges */}
      <BadgeCollection badges={badges} title="Achievements" />
    </div>
  )
}

function NewToBrandDashboard({ benchmarkMode }: { benchmarkMode: boolean }) {
  const newVsReturningData = getChartData(newToBrandData, 'doughnut', {
    labels: ['New to Brand', 'Returning'],
    data: [
      newToBrandData.reduce((sum, item) => sum + item.new_to_brand_conversions, 0),
      newToBrandData.reduce((sum, item) => sum + item.returning_conversions, 0)
    ],
    backgroundColor: ['rgba(0, 212, 255, 0.8)', 'rgba(255, 105, 180, 0.8)']
  })

  const conversionsChartData = getChartData(newToBrandData, 'line', {
    label: 'New to Brand Conversions',
    field: 'new_to_brand_conversions'
  })

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart
          type="doughnut"
          data={newVsReturningData}
          height={400}
          options={{
            plugins: {
              title: {
                display: true,
                text: 'New vs Returning Conversions',
                color: '#ffffff',
                font: { size: 16, weight: 'bold' }
              }
            }
          }}
        />
        <Chart
          type="line"
          data={conversionsChartData}
          height={400}
          options={{
            plugins: {
              title: {
                display: true,
                text: 'New to Brand Conversions Over Time',
                color: '#ffffff',
                font: { size: 16, weight: 'bold' }
              }
            }
          }}
        />
      </div>

      {/* Table placeholder */}
      <div className="futuristic-card p-6">
        <h3 className="text-xl font-semibold text-white mb-4">New to Brand Metrics</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Campaign</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">New to Brand Conv.</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">CPA</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">ROI</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Lookback</th>
              </tr>
            </thead>
            <tbody>
              {newToBrandData.slice(0, 10).map((item, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="py-3 px-4 text-white">{item.campaign_name}</td>
                  <td className="py-3 px-4 text-neon-blue">{item.new_to_brand_conversions.toLocaleString()}</td>
                  <td className="py-3 px-4 text-neon-green">${item.new_to_brand_cpa}</td>
                  <td className="py-3 px-4 text-neon-purple">{item.new_to_brand_roi}x</td>
                  <td className="py-3 px-4 text-gray-300">{item.lookback_window} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function ViewabilityDashboard({ benchmarkMode }: { benchmarkMode: boolean }) {
  const viewabilityBySizeData = getChartData(viewabilityData, 'bar', {
    label: 'Viewability Rate',
    field: 'viewability_rate'
  })

  return (
    <div className="space-y-6">
      <Chart
        type="bar"
        data={viewabilityBySizeData}
        height={400}
        options={{
          indexAxis: 'y',
          plugins: {
            title: {
              display: true,
              text: 'Viewability by Creative Size',
              color: '#ffffff',
              font: { size: 16, weight: 'bold' }
            }
          }
        }}
      />

      {/* Table placeholder */}
      <div className="futuristic-card p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Viewability Metrics</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Campaign</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Viewability Rate</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">VCR</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Creative Size</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Channel Type</th>
              </tr>
            </thead>
            <tbody>
              {viewabilityData.slice(0, 10).map((item, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="py-3 px-4 text-white">{item.campaign_name}</td>
                  <td className="py-3 px-4 text-neon-blue">{(parseFloat(item.viewability_rate) * 100).toFixed(1)}%</td>
                  <td className="py-3 px-4 text-neon-green">{(parseFloat(item.vcr) * 100).toFixed(1)}%</td>
                  <td className="py-3 px-4 text-neon-purple">{item.creative_size}</td>
                  <td className="py-3 px-4 text-gray-300">{item.channel_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function GeoDeviceDashboard({ benchmarkMode }: { benchmarkMode: boolean }) {
  const deviceShareData = getChartData(geoDeviceData, 'doughnut', {
    labels: ['Desktop', 'Mobile', 'Tablet', 'Connected TV'],
    data: [
      geoDeviceData.filter(item => item.device_type === 'Desktop').length,
      geoDeviceData.filter(item => item.device_type === 'Mobile').length,
      geoDeviceData.filter(item => item.device_type === 'Tablet').length,
      geoDeviceData.filter(item => item.device_type === 'Connected TV').length
    ],
    backgroundColor: [
      'rgba(0, 212, 255, 0.8)',
      'rgba(255, 105, 180, 0.8)',
      'rgba(139, 92, 246, 0.8)',
      'rgba(0, 255, 136, 0.8)'
    ]
  })

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart
          type="doughnut"
          data={deviceShareData}
          height={400}
          options={{
            plugins: {
              title: {
                display: true,
                text: 'Device Type Share',
                color: '#ffffff',
                font: { size: 16, weight: 'bold' }
              }
            }
          }}
        />
        
        <InteractiveMap />
      </div>

      {/* Table placeholder */}
      <div className="futuristic-card p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Performance by Device</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Device Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Impressions</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">CTR</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Conversions</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">City</th>
              </tr>
            </thead>
            <tbody>
              {geoDeviceData.slice(0, 10).map((item, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="py-3 px-4 text-white">{item.device_type}</td>
                  <td className="py-3 px-4 text-neon-blue">{item.impressions.toLocaleString()}</td>
                  <td className="py-3 px-4 text-neon-green">{(parseFloat(item.ctr) * 100).toFixed(2)}%</td>
                  <td className="py-3 px-4 text-neon-purple">{item.total_conversions.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-300">{item.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function PlacementsDashboard({ benchmarkMode }: { benchmarkMode: boolean }) {
  const ctrBySiteData = getChartData(placementData, 'bar', {
    label: 'CTR by Site',
    field: 'ctr'
  })

  return (
    <div className="space-y-6">
      <Chart
        type="bar"
        data={ctrBySiteData}
        height={400}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'CTR by Site/App',
              color: '#ffffff',
              font: { size: 16, weight: 'bold' }
            }
          }
        }}
      />

      {/* Top 75 Sites Table */}
      <div className="futuristic-card p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Top 75 Sites/Apps</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Rank</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Site/App</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Impressions</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">CTR</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Conversions</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Progress</th>
              </tr>
            </thead>
            <tbody>
              {placementData.slice(0, 20).map((item, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="py-3 px-4 text-white">#{item.rank}</td>
                  <td className="py-3 px-4 text-neon-blue">{item.site_domain}</td>
                  <td className="py-3 px-4 text-neon-green">{item.impressions.toLocaleString()}</td>
                  <td className="py-3 px-4 text-neon-purple">{(parseFloat(item.ctr) * 100).toFixed(2)}%</td>
                  <td className="py-3 px-4 text-gray-300">{item.total_conversions.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <div className="w-20 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-neon-blue h-2 rounded-full"
                        style={{ width: `${(item.impressions / item.goal_impressions) * 100}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function FootTrafficDashboard({ benchmarkMode }: { benchmarkMode: boolean }) {
  const verifiedVisitsData = getChartData(footTrafficData, 'line', {
    label: 'Verified Visits',
    field: 'verified_visits'
  })

  const topCampaignsLeaderboard = getLeaderboardData(footTrafficData, 'verified_visits').map(item => ({
    ...item,
    value: parseFloat(item.value),
    change: parseFloat(item.change)
  }))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart
          type="line"
          data={verifiedVisitsData}
          height={400}
          options={{
            plugins: {
              title: {
                display: true,
                text: 'Verified Visits by Day',
                color: '#ffffff',
                font: { size: 16, weight: 'bold' }
              }
            }
          }}
        />
        <Leaderboard entries={topCampaignsLeaderboard} title="Top Campaigns by Verified Visits" />
      </div>

      {/* Badge for Most Verified Visits */}
      <div className="futuristic-card p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Foot Traffic Achievement</h3>
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h4 className="text-2xl font-bold text-neon-green mb-2">Most Verified Visits Foot Traffic Campaign</h4>
            <p className="text-gray-400">
              Campaign {topCampaignsLeaderboard[0]?.name} achieved {topCampaignsLeaderboard[0]?.value} verified visits
            </p>
          </div>
        </div>
      </div>

      {/* Table placeholder */}
      <div className="futuristic-card p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Foot Traffic Data</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">City</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Verified Visits</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Projected Visits</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Dwell Time</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Device Type</th>
              </tr>
            </thead>
            <tbody>
              {footTrafficData.slice(0, 10).map((item, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="py-3 px-4 text-white">{item.date}</td>
                  <td className="py-3 px-4 text-neon-blue">{item.city_name}</td>
                  <td className="py-3 px-4 text-neon-green">{item.verified_visits.toLocaleString()}</td>
                  <td className="py-3 px-4 text-neon-purple">{item.projected_visits.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-300">{item.dwell_time}s</td>
                  <td className="py-3 px-4 text-gray-300">{item.device_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 

function AudiencesDashboard() {
  // Table columns config
  const defaultColumns = [
    { key: 'advertiser', label: 'Advertiser Name' },
    { key: 'campaign', label: 'Campaign Name' },
    { key: 'strategy', label: 'Strategy Name' },
    { key: 'creative', label: 'Creative Name' },
    { key: 'ctr', label: 'CTR%' },
    { key: 'vcr', label: 'VCR%' },
  ]
  const [columns, setColumns] = useState(defaultColumns)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [showColumnConfig, setShowColumnConfig] = useState(false)

  // Type for table row
  type TableRow = {
    [key: string]: string | number
    advertiser: string
    campaign: string
    strategy: string
    creative: string
    ctr: string
    vcr: string
    id: string
    name: string
    type: string
    impressions: number
    clicks: number
    conversions: number
    roi: number
    discrepancy: number
    confidence: number
    color: string
    description: string
  }

  // Mock data for table (replace with real data as needed)
  const tableData: TableRow[] = audiencePerformanceData.map(seg => ({
    advertiser: (seg as any).advertiser || 'Acme Corp',
    campaign: (seg as any).campaign || seg.name,
    strategy: (seg as any).strategy || 'Awareness',
    creative: (seg as any).creative || 'Creative A',
    ctr: ((seg.clicks / seg.impressions) * 100).toFixed(2) + '%',
    vcr: ((seg as any).vcr ? ((seg as any).vcr * 100).toFixed(2) : '68.2') + '%',
    ...seg
  }))
  const paginatedData = tableData.slice((page - 1) * pageSize, page * pageSize)

  // Column config UI
  const handleColumnToggle = (key: string) => {
    if (columns.find(col => col.key === key)) {
      setColumns(columns.filter(col => col.key !== key))
    } else {
      const col = defaultColumns.find(col => col.key === key)
      if (col) setColumns([...columns, col])
    }
  }

  return (
    <div className="space-y-8">
      {/* Campaign Audience Insights Table */}
      <div className="futuristic-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Campaign Audience Insights</h3>
          <div className="flex items-center space-x-2">
            <button onClick={() => setShowColumnConfig(v => !v)} className="px-3 py-1 bg-neon-blue text-white rounded-lg text-xs font-medium hover:bg-neon-green transition-all">Configure Columns</button>
            <button className="px-4 py-2 bg-neon-blue text-white rounded-lg font-medium hover:bg-neon-green transition-all">Export CSV</button>
          </div>
        </div>
        {showColumnConfig && (
          <div className="mb-4 flex flex-wrap gap-2">
            {defaultColumns.map(col => (
              <label key={col.key} className="flex items-center space-x-1 text-sm text-white">
                <input type="checkbox" checked={!!columns.find(c => c.key === col.key)} onChange={() => handleColumnToggle(col.key)} />
                <span>{col.label}</span>
              </label>
            ))}
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-600">
                {columns.map(col => (
                  <th key={col.key} className="text-left py-3 px-4 text-sm font-medium text-gray-300">{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-700">
                  {columns.map(col => (
                    <td key={col.key} className="py-3 px-4 text-white">{row[col.key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-end items-center mt-4 space-x-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-2 py-1 bg-dark-300 text-white rounded disabled:opacity-50">Prev</button>
          <span className="text-white text-sm">Page {page}</span>
          <button onClick={() => setPage(p => (p * pageSize < tableData.length ? p + 1 : p))} disabled={page * pageSize >= tableData.length} className="px-2 py-1 bg-dark-300 text-white rounded disabled:opacity-50">Next</button>
          <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))} className="ml-2 px-2 py-1 rounded bg-dark-300 text-white">
            {[10, 20, 50].map(size => <option key={size} value={size}>{size} / page</option>)}
          </select>
        </div>
      </div>

      {/* Rest of Audiences Tab: SmartInsight, Filters, Leaderboard, Charts, Table */}
      <SmartInsight confidence={0.97} message={'Segment "Luxury Auto Intenders" is outperforming with ROI 4.10x and 320 conversions.'} />
      <Filter
        filters={{}}
        onFiltersChange={() => {}}
        userRole={'admin'}
        reportType={'audiences'}
        segmentTypes={['demographic', 'behavioral', 'custom']}
        segmentNames={audiencePerformanceData.map(seg => seg.name)}
        audienceMode
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart
          type="bar"
          data={{
            labels: audiencePerformanceData.map(seg => seg.name),
            datasets: [
              {
                label: 'Conversions',
                data: audiencePerformanceData.map(seg => seg.conversions),
                backgroundColor: audiencePerformanceData.map(seg => seg.color),
              },
            ],
          }}
          height={320}
          options={{
            plugins: {
              title: {
                display: true,
                text: 'Conversions by Audience Segment',
                color: '#fff',
                font: { size: 16, weight: 'bold' },
              },
            },
          }}
        />
        <Chart
          type="scatter"
          data={{
            datasets: [
              {
                label: 'Segments',
                data: audiencePerformanceData.map(seg => ({ x: seg.discrepancy, y: seg.roi, r: 10 })),
                backgroundColor: audiencePerformanceData.map(seg => seg.color),
              },
            ],
          }}
          height={320}
          options={{
            plugins: {
              title: {
                display: true,
                text: 'ROI vs. Discrepancy by Segment',
                color: '#fff',
                font: { size: 16, weight: 'bold' },
              },
            },
            scales: {
              x: { title: { display: true, text: 'Discrepancy', color: '#fff' } },
              y: { title: { display: true, text: 'ROI', color: '#fff' } },
            },
          }}
        />
      </div>
      <AudienceLeaderboard entries={audiencePerformanceData.map(seg => ({ id: seg.id, name: seg.name, roi: seg.roi, conversions: seg.conversions, impressions: seg.impressions }))} />
      <AudienceTable segments={audiencePerformanceData} />
    </div>
  )
} 