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
import { PerformancePulse } from '@/components/PerformancePulse'
import { CampaignPacing } from '@/components/CampaignPacing'
import { CustomReportBuilder } from '@/components/CustomReportBuilder'
import { TimeMachineToggle } from '@/components/TimeMachineToggle'
import { FilterParams } from '@/types'
import { 
  getChartData,
  getBadgeConditions,
  getLeaderboardData,
  getProgressData,
  getCampaignData,
  getGeoDeviceData,
  getNewToBrandData,
  getViewabilityData,
  getPlacementData,
  getFootTrafficData
} from '@/api/mockData'
import Link from 'next/link'
import { AudienceTable } from '@/components/AudienceTable'
import { AudienceLeaderboard } from '@/components/AudienceLeaderboard'
import { SmartInsight } from '@/components/SmartInsight'
import { ReportEmailModal } from '@/components/ReportEmailModal'
import type { CampaignData, GeoDeviceData, NewToBrandData, ViewabilityData, PlacementData, FootTrafficData } from '@/types'

const GeographicMap = dynamic(() => import('@/components/GeographicMap').then(mod => ({ default: mod.GeographicMap })), { ssr: false })

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('main')
  const [filters, setFilters] = useState<FilterParams>({
    date_range: 'last_30_days',
    aggregation: 'day'
  })
  const [userRole] = useState<'admin' | 'advertiser' | 'agency'>('admin')
  const [isDailyDigestOpen, setIsDailyDigestOpen] = useState(false)
  const [isReportEmailOpen, setIsReportEmailOpen] = useState(false)
  const [benchmarkMode, setBenchmarkMode] = useState(false)

  // Add state for all mock data with types
  const [localCampaignData, setLocalCampaignData] = useState<CampaignData[]>([])
  const [localGeoDeviceData, setLocalGeoDeviceData] = useState<GeoDeviceData[]>([])
  const [localNewToBrandData, setLocalNewToBrandData] = useState<NewToBrandData[]>([])
  const [localViewabilityData, setLocalViewabilityData] = useState<ViewabilityData[]>([])
  const [localPlacementData, setLocalPlacementData] = useState<PlacementData[]>([])
  const [localFootTrafficData, setLocalFootTrafficData] = useState<FootTrafficData[]>([])

  useEffect(() => {
    // Only generate data on client
    if (typeof window !== 'undefined') {
      setLocalCampaignData(getCampaignData())
      setLocalGeoDeviceData(getGeoDeviceData())
      setLocalNewToBrandData(getNewToBrandData())
      setLocalViewabilityData(getViewabilityData())
      setLocalPlacementData(getPlacementData())
      setLocalFootTrafficData(getFootTrafficData())
    }
  }, [])

  const tabs = [
    { id: 'main', label: 'Main Dashboard' },
    { id: 'new-to-brand', label: 'New to Brand' },
    { id: 'viewability', label: 'Viewability' },
    { id: 'geo-device', label: 'Geo/Device' },
    { id: 'placements', label: 'Placements' },
    { id: 'foot-traffic', label: 'Foot Traffic' },
    { id: 'audiences', label: 'Audiences' },
    { id: 'custom', label: 'Custom' },
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
      <div className="sticky top-0 z-50 bg-dark-200/95 backdrop-blur-md border-b border-neon-blue/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Main Header Row */}
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-neon-blue to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">I</span>
              </div>
              <h1 className="text-2xl font-bold text-white neon-glow">
                Infillion Analytics
              </h1>
            </div>
            
            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Status Indicator */}
              <div className="hidden md:flex items-center space-x-2 text-xs">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                <span className="text-gray-400">Live</span>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsDailyDigestOpen(true)}
                  className="px-3 py-2 bg-gradient-to-r from-neon-blue to-cyan-500 text-white rounded-lg text-sm font-medium hover:from-cyan-500 hover:to-neon-blue transition-all duration-300 shadow-lg"
                >
                  📊 Digest
                </button>
                <button
                  onClick={() => setIsReportEmailOpen(true)}
                  className="px-3 py-2 bg-gradient-to-r from-neon-green to-emerald-500 text-white rounded-lg text-sm font-medium hover:from-emerald-500 hover:to-neon-green transition-all duration-300 shadow-lg"
                >
                  📧 Report
                </button>
              </div>
              
              {/* User Profile */}
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-600">
                <div className="text-right hidden sm:block">
                  <div className="text-sm text-white font-medium">Alex Steady</div>
                  <div className="text-xs text-gray-400">Director of Product</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-blue to-cyan-500 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">AS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 pb-3 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white shadow-lg neon-glow'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        {/* Spotlight */}
        <div className="mb-6">
          <CampaignSpotlight />
        </div>
        
        {/* Filters and Controls */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <Filter
                filters={filters}
                onFiltersChange={handleFiltersChange}
                userRole={userRole}
                reportType={activeTab}
                onApply={handleApplyFilters}
                onRun={handleRunFilters}
              />
            </div>
            <div className="flex items-center space-x-4">
              <BenchmarkToggle
                onToggle={setBenchmarkMode}
                className=""
              />
              <TimeMachineToggle onToggle={() => {}} delta={12.3} className="" />
            </div>
          </div>
        </div>
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
            {activeTab === 'custom' && <CustomReportBuilder />}
          </motion.div>
        </AnimatePresence>
        {/* Campaign Pacing */}
        <CampaignPacing />
        {/* Daily Digest Modal */}
        <DailyDigestModal
          isOpen={isDailyDigestOpen}
          onClose={() => setIsDailyDigestOpen(false)}
        />
        {/* Report Email Modal */}
        <ReportEmailModal
          isOpen={isReportEmailOpen}
          onClose={() => setIsReportEmailOpen(false)}
          reportType={tabs.find(tab => tab.id === activeTab)?.label}
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
      value: localCampaignData.reduce((sum: number, item: CampaignData) => sum + item.impressions, 0),
      change: 12.5,
      changeType: 'increase' as const,
      icon: '👁️',
      color: 'bg-neon-blue'
    },
    {
      title: 'Total Clicks',
      value: localCampaignData.reduce((sum: number, item: CampaignData) => sum + item.clicks, 0),
      change: 8.3,
      changeType: 'increase' as const,
      icon: '🖱️',
      color: 'bg-neon-green'
    },
    {
      title: 'Average CTR',
      value: (localCampaignData.reduce((sum: number, item: CampaignData) => sum + parseFloat(item.ctr), 0) / localCampaignData.length * 100).toFixed(2),
      change: -2.1,
      changeType: 'decrease' as const,
      icon: '📊',
      color: 'bg-neon-purple'
    },
    {
      title: 'Total Revenue',
      value: localCampaignData.reduce((sum: number, item: CampaignData) => sum + item.total_revenue, 0),
      change: 15.7,
      changeType: 'increase' as const,
      icon: '💰',
      color: 'bg-neon-pink'
    }
  ]

  // Generate badges data
  const badgeConditions = getBadgeConditions(localCampaignData)
  const badges = [
    {
      id: 'top_ctr',
      name: 'Top CTR Campaign',
      description: 'Achieve highest click-through rate',
      icon: '👁️',
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

  const impressionsChartData = getChartData(localCampaignData, 'bar', {
    label: 'Impressions',
    field: 'impressions'
  })

  const ctrChartData = getChartData(localCampaignData, 'line', {
    label: 'CTR Over Time',
    field: 'ctr'
  })

  const roiLeaderboard = getLeaderboardData(localCampaignData, 'roi').map(item => ({
    ...item,
    value: parseFloat(item.value),
    change: parseFloat(item.change)
  }))
  const progressBars = getProgressData(localCampaignData)

  return (
    <div className="space-y-8">
      {/* Metric Cards */}
      <MetricCardGrid metrics={metricCards} columns={4} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProgressBarCollection progressBars={progressBars} title="Campaign Progress" />
        <Leaderboard entries={roiLeaderboard} title="Top ROI Campaigns" />
      </div>

      {/* Badges */}
      <BadgeCollection badges={badges} title="Achievements" />
      
      {/* Performance Pulse - Only on Main Dashboard */}
      <PerformancePulse />
    </div>
  )
}

function NewToBrandDashboard({ benchmarkMode }: { benchmarkMode: boolean }) {
  const newVsReturningData = getChartData(localNewToBrandData, 'doughnut', {
    labels: ['New to Brand', 'Returning'],
    data: [
      localNewToBrandData.reduce((sum: number, item: NewToBrandData) => sum + item.new_to_brand_conversions, 0),
      localNewToBrandData.reduce((sum: number, item: NewToBrandData) => sum + item.returning_conversions, 0)
    ],
    backgroundColor: ['rgba(0, 212, 255, 0.8)', 'rgba(255, 105, 180, 0.8)']
  })

  const conversionsChartData = getChartData(localNewToBrandData, 'line', {
    label: 'New to Brand Conversions',
    field: 'new_to_brand_conversions'
  })

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
              {localNewToBrandData.slice(0, 10).map((item, index) => (
                <tr key={`new-to-brand-${item.campaign_name}-${index}`} className="border-b border-gray-700">
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
  const viewabilityBySizeData = getChartData(localViewabilityData, 'bar', {
    label: 'Viewability Rate',
    field: 'viewability_rate'
  })

  return (
    <div className="space-y-8">
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
              {localViewabilityData.slice(0, 10).map((item, index) => (
                <tr key={`viewability-${item.campaign_name}-${index}`} className="border-b border-gray-700">
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
  // Device performance data
  const deviceShareData = {
    labels: ['Desktop', 'Mobile', 'Tablet', 'Connected TV'],
    datasets: [{
      data: [
        localGeoDeviceData.filter(item => item.device_type === 'Desktop').length,
        localGeoDeviceData.filter(item => item.device_type === 'Mobile').length,
        localGeoDeviceData.filter(item => item.device_type === 'Tablet').length,
        localGeoDeviceData.filter(item => item.device_type === 'Connected TV').length
      ],
      backgroundColor: [
        'rgba(0, 212, 255, 0.8)',
        'rgba(255, 105, 180, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(0, 255, 136, 0.8)'
      ]
    }]
  }

  // Geographic performance data
  const geoPerformanceData = {
    labels: localGeoDeviceData.slice(0, 15).map(item => item.city),
    datasets: [{
      label: 'Impressions',
      data: localGeoDeviceData.slice(0, 15).map(item => item.impressions),
      backgroundColor: 'rgba(0, 212, 255, 0.8)',
      borderColor: '#00d4ff',
      borderWidth: 1
    }]
  }

  // Device type performance comparison
  const devicePerformanceData = {
    labels: ['Desktop', 'Mobile', 'Tablet', 'Connected TV'],
    datasets: [
      {
        label: 'Impressions',
        data: [
          localGeoDeviceData.filter(item => item.device_type === 'Desktop').reduce((sum: number, item: GeoDeviceData) => sum + item.impressions, 0),
          localGeoDeviceData.filter(item => item.device_type === 'Mobile').reduce((sum: number, item: GeoDeviceData) => sum + item.impressions, 0),
          localGeoDeviceData.filter(item => item.device_type === 'Tablet').reduce((sum: number, item: GeoDeviceData) => sum + item.impressions, 0),
          localGeoDeviceData.filter(item => item.device_type === 'Connected TV').reduce((sum: number, item: GeoDeviceData) => sum + item.impressions, 0)
        ],
        backgroundColor: 'rgba(0, 212, 255, 0.8)',
        borderColor: '#00d4ff',
        borderWidth: 1
      },
      {
        label: 'Clicks',
        data: [
          localGeoDeviceData.filter(item => item.device_type === 'Desktop').reduce((sum: number, item: GeoDeviceData) => sum + item.clicks, 0),
          localGeoDeviceData.filter(item => item.device_type === 'Mobile').reduce((sum: number, item: GeoDeviceData) => sum + item.clicks, 0),
          localGeoDeviceData.filter(item => item.device_type === 'Tablet').reduce((sum: number, item: GeoDeviceData) => sum + item.clicks, 0),
          localGeoDeviceData.filter(item => item.device_type === 'Connected TV').reduce((sum: number, item: GeoDeviceData) => sum + item.clicks, 0)
        ],
        backgroundColor: 'rgba(255, 105, 180, 0.8)',
        borderColor: '#ff69b4',
        borderWidth: 1
      }
    ]
  }

  // Top performing cities
  const topCities = localGeoDeviceData
    .reduce((acc, item: GeoDeviceData) => {
      const existing = acc.find(city => city.name === item.city)
      if (existing) {
        existing.impressions += item.impressions
        existing.clicks += item.clicks
        existing.conversions += item.conversions
      } else {
        acc.push({
          name: item.city,
          region: item.region,
          impressions: item.impressions,
          clicks: item.clicks,
          conversions: item.conversions,
          revenue: item.revenue,
          spend: item.spend
        })
      }
      return acc
    }, [] as any[])
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 10)

  return (
    <div className="space-y-8">
      {/* Interactive Map */}
      <div className="futuristic-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Geographic Performance Heatmap</h3>
            <p className="text-sm text-gray-400">Interactive visualization of traffic density across major US cities</p>
          </div>
        </div>
        <GeographicMap />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Chart
          type="doughnut"
          data={deviceShareData}
          height={400}
          options={{
            plugins: {
              title: {
                display: true,
                text: 'Device Type Distribution',
                color: '#ffffff',
                font: { size: 16, weight: 'bold' }
              }
            }
          }}
        />
        
        <Chart
          type="bar"
          data={devicePerformanceData}
          height={400}
          options={{
            plugins: {
              title: {
                display: true,
                text: 'Performance by Device Type',
                color: '#ffffff',
                font: { size: 16, weight: 'bold' }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                  color: '#ffffff'
                }
              },
              x: {
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                  color: '#ffffff'
                }
              }
            }
          }}
        />
      </div>

      {/* Geographic Performance Chart */}
      <Chart
        type="bar"
        data={geoPerformanceData}
        height={400}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Impressions by City',
              color: '#ffffff',
              font: { size: 16, weight: 'bold' }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              },
              ticks: {
                color: '#ffffff'
              }
            },
            x: {
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              },
              ticks: {
                color: '#ffffff'
              }
            }
          }
        }}
      />

      {/* Top Cities Performance Table */}
      <div className="futuristic-card p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Top Performing Cities</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Rank</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">City</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">State</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Impressions</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Clicks</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">CTR</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Conversions</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Revenue</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">ROI</th>
              </tr>
            </thead>
            <tbody>
              {topCities.map((city, index) => (
                <tr key={`geo-city-${city.name}-${index}`} className="border-b border-gray-700">
                  <td className="py-3 px-4 text-white">#{index + 1}</td>
                  <td className="py-3 px-4 text-neon-blue font-medium">{city.name}</td>
                  <td className="py-3 px-4 text-gray-300">{city.region}</td>
                  <td className="py-3 px-4 text-neon-green">{city.impressions.toLocaleString()}</td>
                  <td className="py-3 px-4 text-neon-purple">{city.clicks.toLocaleString()}</td>
                  <td className="py-3 px-4 text-yellow-400">{((city.clicks / city.impressions) * 100).toFixed(2)}%</td>
                  <td className="py-3 px-4 text-pink-400">{city.conversions.toLocaleString()}</td>
                  <td className="py-3 px-4 text-emerald-400">${city.revenue.toLocaleString()}</td>
                  <td className="py-3 px-4 text-cyan-400">{(city.revenue / city.spend).toFixed(2)}x</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Device Performance Table */}
      <div className="futuristic-card p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Device Performance Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Device Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">OS</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Browser</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Impressions</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">CTR</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Conversions</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">City</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">DMA</th>
              </tr>
            </thead>
            <tbody>
              {localGeoDeviceData.slice(0, 15).map((item, index) => (
                <tr key={`geo-device-${item.device_type}-${item.city}-${index}`} className="border-b border-gray-700">
                  <td className="py-3 px-4 text-white">{item.device_type}</td>
                  <td className="py-3 px-4 text-gray-300">{item.os_type}</td>
                  <td className="py-3 px-4 text-gray-300">{item.browser}</td>
                  <td className="py-3 px-4 text-neon-blue">{item.impressions.toLocaleString()}</td>
                  <td className="py-3 px-4 text-neon-green">{(parseFloat(item.ctr) * 100).toFixed(2)}%</td>
                  <td className="py-3 px-4 text-neon-purple">{item.conversions.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-300">{item.city}</td>
                  <td className="py-3 px-4 text-gray-300">{item.dma}</td>
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
  const ctrBySiteData = getChartData(localPlacementData, 'bar', {
    label: 'CTR by Site',
    field: 'ctr'
  })

  return (
    <div className="space-y-8">
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
              {localPlacementData.slice(0, 20).map((item, index) => (
                <tr key={`placement-${item.site_domain}-${index}`} className="border-b border-gray-700">
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
  const verifiedVisitsData = getChartData(localFootTrafficData, 'line', {
    label: 'Verified Visits',
    field: 'verified_visits'
  })

  const dwellTimeData = getChartData(localFootTrafficData, 'line', {
    label: 'Average Dwell Time (minutes)',
    field: 'average_dwell_time'
  })

  const topCampaignsLeaderboard = getLeaderboardData(localFootTrafficData, 'verified_visits').map(item => ({
    ...item,
    value: parseFloat(item.value),
    change: parseFloat(item.change)
  }))

  // Calculate summary metrics
  const totalVerifiedVisits = localFootTrafficData.reduce((sum: number, item: FootTrafficData) => sum + item.verified_visits, 0)
  const totalProjectedVisits = localFootTrafficData.reduce((sum: number, item: FootTrafficData) => sum + item.projected_visits, 0)
  const totalVerifiedUniqueVisits = localFootTrafficData.reduce((sum: number, item: FootTrafficData) => sum + item.verified_unique_visits, 0)
  const totalProjectedUniqueVisits = localFootTrafficData.reduce((sum: number, item: FootTrafficData) => sum + item.projected_unique_visits, 0)
  const avgDwellTime = localFootTrafficData.reduce((sum: number, item: FootTrafficData) => sum + parseFloat(item.average_dwell_time), 0) / localFootTrafficData.length
  const medianDwellTime = localFootTrafficData.reduce((sum: number, item: FootTrafficData) => sum + parseFloat(item.median_dwell_time), 0) / localFootTrafficData.length

  return (
    <div className="space-y-8">
      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <div className="futuristic-card p-4">
          <div className="text-2xl font-bold text-neon-green">{totalVerifiedVisits.toLocaleString()}</div>
          <div className="text-sm text-gray-400">Total Verified Visits</div>
        </div>
        <div className="futuristic-card p-4">
          <div className="text-2xl font-bold text-neon-blue">{totalProjectedVisits.toLocaleString()}</div>
          <div className="text-sm text-gray-400">Total Projected Visits</div>
        </div>
        <div className="futuristic-card p-4">
          <div className="text-2xl font-bold text-neon-purple">{totalVerifiedUniqueVisits.toLocaleString()}</div>
          <div className="text-sm text-gray-400">Total Verified Unique Visits</div>
        </div>
        <div className="futuristic-card p-4">
          <div className="text-2xl font-bold text-neon-pink">{totalProjectedUniqueVisits.toLocaleString()}</div>
          <div className="text-sm text-gray-400">Total Projected Unique Visits</div>
        </div>
        <div className="futuristic-card p-4">
          <div className="text-2xl font-bold text-cyan-400">{avgDwellTime.toFixed(1)} min</div>
          <div className="text-sm text-gray-400">Average Dwell Time</div>
        </div>
        <div className="futuristic-card p-4">
          <div className="text-2xl font-bold text-orange-400">{medianDwellTime.toFixed(1)} min</div>
          <div className="text-sm text-gray-400">Median Dwell Time</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
        <Chart
          type="line"
          data={dwellTimeData}
          height={400}
          options={{
            plugins: {
              title: {
                display: true,
                text: 'Average Dwell Time by Day',
                color: '#ffffff',
                font: { size: 16, weight: 'bold' }
              }
            }
          }}
        />
      </div>

      {/* Leaderboard */}
      <Leaderboard entries={topCampaignsLeaderboard} title="Top Campaigns by Verified Visits" />

      {/* Enhanced Table */}
      <div className="futuristic-card p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Foot Traffic Performance Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Advertiser</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Campaign</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">City</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Verified Visits</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Verified Unique Visits</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Projected Visits</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Projected Unique Visits</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Avg Dwell Time</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Median Dwell</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Device Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Distance</th>
              </tr>
            </thead>
            <tbody>
              {localFootTrafficData.slice(0, 15).map((item, index) => (
                <tr key={`foot-traffic-${index}`} className="border-b border-gray-700 hover:bg-gray-800/50">
                  <td className="py-3 px-4 text-white">{item.advertiser}</td>
                  <td className="py-3 px-4 text-neon-blue">{item.campaign_name}</td>
                  <td className="py-3 px-4 text-neon-green">{item.city_name}</td>
                  <td className="py-3 px-4 text-neon-purple">{item.verified_visits.toLocaleString()}</td>
                  <td className="py-3 px-4 text-neon-pink">{item.verified_unique_visits.toLocaleString()}</td>
                  <td className="py-3 px-4 text-yellow-400">{item.projected_visits.toLocaleString()}</td>
                  <td className="py-3 px-4 text-yellow-300">{item.projected_unique_visits.toLocaleString()}</td>
                  <td className="py-3 px-4 text-cyan-400">{item.average_dwell_time} min</td>
                  <td className="py-3 px-4 text-orange-400">{item.median_dwell_time} min</td>
                  <td className="py-3 px-4 text-gray-300">{item.device_type}</td>
                  <td className="py-3 px-4 text-gray-300">{item.distance_traveled} mi</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Influence Parameters */}
      <div className="futuristic-card p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Visit Influence Parameters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h4 className="text-lg font-semibold text-neon-blue mb-2">Placement Performance</h4>
            <div className="space-y-2 text-sm">
              {localFootTrafficData.slice(0, 5).map((item, index) => (
                <div key={`placement-${index}`} className="flex justify-between">
                  <span className="text-gray-300">{item.placement_name}</span>
                  <span className="text-neon-green">{item.verified_visits} visits</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h4 className="text-lg font-semibold text-neon-purple mb-2">Distance Analysis</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">Average Distance</span>
                <span className="text-neon-green">{(localFootTrafficData.reduce((sum: number, item: FootTrafficData) => sum + parseFloat(item.distance_traveled), 0) / localFootTrafficData.length).toFixed(1)} mi</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Max Distance</span>
                <span className="text-neon-pink">{Math.max(...localFootTrafficData.map(item => parseFloat(item.distance_traveled))).toFixed(1)} mi</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h4 className="text-lg font-semibold text-neon-pink mb-2">Device Distribution</h4>
            <div className="space-y-2 text-sm">
              {['Mobile', 'Desktop', 'Tablet'].map(device => {
                const count = localFootTrafficData.filter(item => item.device_type === device).length
                return (
                  <div key={device} className="flex justify-between">
                    <span className="text-gray-300">{device}</span>
                    <span className="text-neon-green">{count} campaigns</span>
                  </div>
                )
              })}
            </div>
          </div>
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
    { key: 'channel', label: 'Channel' },
    { key: 'device_type', label: 'Device Type' },
    { key: 'poi', label: 'POI' },
    { key: 'impressions', label: 'Impressions' },
    { key: 'clicks', label: 'Clicks' },
    { key: 'ctr', label: 'CTR%' },
    { key: 'completed_views', label: 'Completed Views' },
    { key: 'vcr', label: 'VCR%' },
    { key: 'conversions', label: 'Conversions' },
    { key: 'roi', label: 'ROI' },
    { key: 'viewability', label: 'Viewability%' },
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
    channel: string
    device_type: string
    poi: string
    impressions: number
    clicks: number
    ctr: string
    completed_views: number
    vcr: string
    conversions: number
    roi: number
    viewability: string
    id: string
    name: string
    discrepancy: number
    confidence: number
    color: string
    description: string
  }

  // Map mock data to table rows with logic for video/display
  const tableData: TableRow[] = [] // No mock data for audience performance, so this will be empty
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
                <tr key={`audience-${idx}`} className="border-b border-gray-700">
                  {columns.map(col => (
                    <td key={`${idx}-${col.key}`} className="py-3 px-4 text-white">{row[col.key]}</td>
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
        segmentNames={[]} // No mock data for segment names
        audienceMode
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart
          type="bar"
          data={{
            labels: [], // No mock data for audience performance
            datasets: [
              {
                label: 'Conversions',
                data: [], // No mock data for audience performance
                backgroundColor: [], // No mock data for audience performance
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
                data: [], // No mock data for audience performance
                backgroundColor: [], // No mock data for audience performance
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
      <AudienceLeaderboard entries={[]} /> {/* No mock data for audience leaderboard */}
    </div>
  )
} 