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
import { FilterParams, AudiencePerformanceData } from '@/types'
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
  getFootTrafficData,
  getAudienceSegmentData,
  getAudiencePerformanceData,
  getAudienceHierarchyData,
  getMainDashboardData,
  generateMainDashboardData,
  generateAudienceData
} from '@/api/mockData'
import Link from 'next/link'
import { AudienceTable } from '@/components/AudienceTable'
import { AudienceLeaderboard } from '@/components/AudienceLeaderboard'
import { AudienceDataTable } from '@/components/AudienceDataTable'
import { MainDataTable } from '@/components/MainDataTable'
import { SmartInsight } from '@/components/SmartInsight'
import { ReportEmailModal } from '@/components/ReportEmailModal'
import { TopPerformingAudienceSegments } from '@/components/TopPerformingAudienceSegments'
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
  const [showMainDataTable, setShowMainDataTable] = useState(false)
  const [showAudienceDataTable, setShowAudienceDataTable] = useState(false)
  
  // Generate improved mock data
  const mainDashboardData = generateMainDashboardData(50)
  const audienceData = generateAudienceData(30)
  
  // Generate data for other tabs
  const localNewToBrandData = getNewToBrandData(20) || []
  const localViewabilityData = getViewabilityData(20) || []
  const localGeoDeviceData = getGeoDeviceData(20) || []
  const localPlacementData = getPlacementData(20) || []
  const localFootTrafficData = getFootTrafficData(20) || []
  const localAudienceData = getAudiencePerformanceData(15) || []
  const localAudienceHierarchyData = getAudienceHierarchyData(50) || []

  useEffect(() => {
    // Only generate data on client
    if (typeof window !== 'undefined') {
      // setLocalCampaignData(getCampaignData(20) || [])
      // setLocalGeoDeviceData(getGeoDeviceData(20) || [])
      // setLocalNewToBrandData(getNewToBrandData(20) || [])
      // setLocalViewabilityData(getViewabilityData(20) || [])
      // setLocalPlacementData(getPlacementData(20) || [])
      // setLocalFootTrafficData(getFootTrafficData(20) || [])
      // setLocalAudienceData(getAudiencePerformanceData(15) || [])
      // setLocalAudienceHierarchyData(getAudienceHierarchyData(50) || [])
      // setLocalMainDashboardData(getMainDashboardData(100) || [])
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

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'main' && (
              <MainDashboard 
                data={mainDashboardData} 
                showMainDataTable={showMainDataTable}
                setShowMainDataTable={setShowMainDataTable}
              />
            )}
            {activeTab === 'new-to-brand' && (
              <NewToBrandDashboard 
                benchmarkMode={benchmarkMode} 
                localNewToBrandData={localNewToBrandData} 
              />
            )}
            {activeTab === 'viewability' && (
              <ViewabilityDashboard 
                benchmarkMode={benchmarkMode} 
                localViewabilityData={localViewabilityData} 
              />
            )}
            {activeTab === 'geo-device' && (
              <GeoDeviceDashboard 
                benchmarkMode={benchmarkMode} 
                localGeoDeviceData={localGeoDeviceData} 
              />
            )}
            {activeTab === 'placements' && (
              <PlacementsDashboard 
                benchmarkMode={benchmarkMode} 
                localPlacementData={localPlacementData} 
              />
            )}
            {activeTab === 'foot-traffic' && (
              <FootTrafficDashboard 
                benchmarkMode={benchmarkMode} 
                localFootTrafficData={localFootTrafficData} 
              />
            )}
            {activeTab === 'audiences' && (
              <AudiencesDashboard 
                localAudienceData={localAudienceData}
                localAudienceHierarchyData={localAudienceHierarchyData}
              />
            )}
            {activeTab === 'custom' && (
              <CustomReportBuilder />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modals */}
      <DailyDigestModal 
        isOpen={isDailyDigestOpen} 
        onClose={() => setIsDailyDigestOpen(false)} 
      />
      <ReportEmailModal 
        isOpen={isReportEmailOpen} 
        onClose={() => setIsReportEmailOpen(false)} 
      />
    </div>
  )
}

function MainDashboard({ 
  data, 
  showMainDataTable, 
  setShowMainDataTable 
}: { 
  data: any[]
  showMainDataTable: boolean
  setShowMainDataTable: (show: boolean) => void
}) {
  const [columnsPopoverOpen, setColumnsPopoverOpen] = useState(false);
  const [columns, setColumns] = useState([
    { id: 'advertiser', label: 'Advertiser', isVisible: true, render: (row: any) => row.advertiser },
    { id: 'campaignName', label: 'Campaign', isVisible: true, render: (row: any) => row.campaignName },
    { id: 'strategy', label: 'Strategy', isVisible: true, render: (row: any) => row.strategyName || 'Brand Awareness' },
    { id: 'creative', label: 'Creative', isVisible: true, render: (row: any) => row.creativeName || 'Video' },
    { id: 'impressions', label: 'Impressions', isVisible: true, render: (row: any) => (row.impressions ?? 0).toLocaleString() },
    { id: 'clicks', label: 'Clicks', isVisible: true, render: (row: any) => (row.clicks ?? 0).toLocaleString() },
    { id: 'channel', label: 'Channel', isVisible: true, render: (row: any) => row.channel || 'Display' },
    { id: 'format', label: 'Format', isVisible: true, render: (row: any) => row.format || 'Banner' },
    { id: 'ctr', label: 'CTR%', isVisible: true, render: (row: any) => {
      const impressions = row.impressions ?? 0;
      const clicks = row.clicks ?? 0;
      return impressions > 0 ? ((clicks / impressions) * 100).toFixed(2) + '%' : '0.00%';
    }},
    { id: 'vcr', label: 'VCR%', isVisible: true, render: (row: any) => {
      if (row.format === 'Video') {
        // Use row.vcr if present, else fallback to a random realistic value
        const vcr = typeof row.vcr === 'number' ? row.vcr : (Math.random() * 0.3 + 0.7); // 0.70–1.00
        return (vcr * 100).toFixed(2) + '%';
      }
      return '0.00%';
    }},
    { id: 'acr', label: 'ACR%', isVisible: false, render: (row: any) => row.format === 'Audio' ? ((row.acr ?? 0) * 100).toFixed(2) + '%' : '' },
    { id: 'conversions', label: 'Conversions', isVisible: true, render: (row: any) => (row.conversions ?? 0).toLocaleString() },
    { id: 'cpm', label: 'CPM', isVisible: false, render: (row: any) => '$' + (row.cpm ?? 0).toFixed(2) },
    { id: 'cpc', label: 'CPC', isVisible: false, render: (row: any) => '$' + (row.cpc ?? 0).toFixed(2) },
    { id: 'spend', label: 'Spend', isVisible: true, render: (row: any) => '$' + (row.spend ?? 0).toLocaleString() },
    { id: 'roi', label: 'ROI', isVisible: false, render: (row: any) => (row.roi ?? 0).toFixed(2) + 'x' },
    { id: 'status', label: 'Status', isVisible: false, render: (row: any) => row.status },
    { id: 'revenue', label: 'Revenue', isVisible: false, render: (row: any) => '$' + (row.revenue ?? 0).toLocaleString() },
    // Add more MM columns as needed
  ]);

  const visibleColumns = columns.filter(col => col.isVisible);

  const handleToggleColumn = (id: string) => {
    setColumns(cols => cols.map(col => col.id === id ? { ...col, isVisible: !col.isVisible } : col));
  };

  const exportToCSV = () => {
    const headers = visibleColumns.map(col => col.label);
    const csvContent = [
      headers.join(','),
      ...data.map(row => visibleColumns.map(col => {
        const val = col.render(row);
        return typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val;
      }).join(','))
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'campaign-performance-data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Campaign Grid */}
      <div className="futuristic-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Campaign Performance Grid</h2>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
                onClick={() => setColumnsPopoverOpen(v => !v)}
              >
                Columns
              </button>
              {columnsPopoverOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-dark-300 border border-gray-700 rounded-lg shadow-xl z-50 p-4">
                  <div className="font-semibold text-white mb-2">Show/Hide Columns</div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {columns.map(col => (
                      <label key={col.id} className="flex items-center space-x-2 text-sm text-gray-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={col.isVisible}
                          onChange={() => handleToggleColumn(col.id)}
                          className="accent-neon-blue"
                        />
                        <span>{col.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-neon-blue hover:bg-cyan-500 text-white rounded-lg text-sm transition-colors"
            >
              Export
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-600">
                {visibleColumns.map(col => (
                  <th key={col.id} className="px-4 py-3 text-left text-sm font-medium text-gray-300">{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={row.id || idx} className="border-b border-gray-700 hover:bg-gray-700/30 transition-colors">
                  {visibleColumns.map(col => (
                    <td key={col.id} className="px-4 py-3 text-sm text-white">{col.render(row)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function NewToBrandDashboard({ benchmarkMode, localNewToBrandData }: { benchmarkMode: boolean; localNewToBrandData: NewToBrandData[] }) {
  // Prepare data for charts
  const chartData = localNewToBrandData.slice(0, 10).map((item, index) => ({
    name: item.campaign_name.substring(0, 20) + '...',
    newToBrand: item.new_to_brand_conversions,
    returning: item.returning_conversions,
    total: item.new_to_brand_conversions + item.returning_conversions
  }))

  const newVsReturningSummary = [
    {
      name: 'New to Brand',
      value: localNewToBrandData.reduce((sum, item) => sum + item.new_to_brand_conversions, 0)
    },
    {
      name: 'Returning',
      value: localNewToBrandData.reduce((sum, item) => sum + item.returning_conversions, 0)
    }
  ]

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          metric={{
            title: "Total New to Brand",
            value: localNewToBrandData.reduce((sum, item) => sum + item.new_to_brand_conversions, 0).toLocaleString(),
            change: 12.5,
            changeType: "increase",
            icon: "🆕",
            color: "bg-neon-blue"
          }}
        />
        <MetricCard
          metric={{
            title: "Total Returning",
            value: localNewToBrandData.reduce((sum, item) => sum + item.returning_conversions, 0).toLocaleString(),
            change: 8.3,
            changeType: "increase",
            icon: "🔄",
            color: "bg-neon-green"
          }}
        />
        <MetricCard
          metric={{
            title: "Avg New CPA",
            value: `$${(localNewToBrandData.reduce((sum, item) => sum + item.new_to_brand_cpa, 0) / localNewToBrandData.length).toFixed(2)}`,
            change: -5.2,
            changeType: "decrease",
            icon: "💰",
            color: "bg-neon-purple"
          }}
        />
        <MetricCard
          metric={{
            title: "Avg New ROI",
            value: `${(localNewToBrandData.reduce((sum, item) => sum + item.new_to_brand_roi, 0) / localNewToBrandData.length).toFixed(2)}x`,
            change: 15.7,
            changeType: "increase",
            icon: "📈",
            color: "bg-cyan-500"
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Chart
          title="New vs Returning Conversions"
          data={chartData}
          type="bar"
          height={400}
          config={{
            xAxis: { dataKey: 'name' },
            yAxis: { dataKey: 'newToBrand' },
            series: [
              { dataKey: 'newToBrand', name: 'New to Brand', color: '#00d4ff' },
              { dataKey: 'returning', name: 'Returning', color: '#ff69b4' }
            ]
          }}
        />
        <Chart
          title="New to Brand Conversions Over Time"
          data={chartData}
          type="line"
          height={400}
          config={{
            xAxis: { dataKey: 'name' },
            yAxis: { dataKey: 'newToBrand' },
            series: [
              { dataKey: 'newToBrand', name: 'New to Brand', color: '#00d4ff' }
            ]
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
                  <td className="py-3 px-4 text-neon-blue">{(item.new_to_brand_conversions ?? 0).toLocaleString()}</td>
                  <td className="py-3 px-4 text-neon-green">${item.new_to_brand_cpa}</td>
                  <td className="py-3 px-4 text-neon-purple">{item.new_to_brand_roi}x</td>
                  <td className="py-3 px-4 text-gray-300">{typeof item.lookback_window !== 'undefined' ? `${item.lookback_window} days` : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function ViewabilityDashboard({ benchmarkMode, localViewabilityData }: { benchmarkMode: boolean; localViewabilityData: ViewabilityData[] }) {
  // Prepare data for charts
  const chartData = localViewabilityData.slice(0, 10).map((item, index) => ({
    name: item.campaign_name.substring(0, 20) + '...',
    viewability: item.viewability_rate * 100,
    vcr: item.vcr * 100,
    inViewImpressions: item.in_view_impressions
  }))

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          metric={{
            title: "Avg Viewability Rate",
            value: `${(localViewabilityData.reduce((sum, item) => sum + item.viewability_rate, 0) / localViewabilityData.length * 100).toFixed(1)}%`,
            change: 2.3,
            changeType: "increase",
            icon: "👁️",
            color: "bg-neon-blue"
          }}
        />
        <MetricCard
          metric={{
            title: "Avg VCR",
            value: `${(localViewabilityData.reduce((sum, item) => sum + item.vcr, 0) / localViewabilityData.length * 100).toFixed(1)}%`,
            change: 1.8,
            changeType: "increase",
            icon: "▶️",
            color: "bg-neon-green"
          }}
        />
        <MetricCard
          metric={{
            title: "Total In-View Impressions",
            value: localViewabilityData.reduce((sum, item) => sum + item.in_view_impressions, 0).toLocaleString(),
            change: 15.7,
            changeType: "increase",
            icon: "📊",
            color: "bg-neon-purple"
          }}
        />
        <MetricCard
          metric={{
            title: "Video Completions",
            value: localViewabilityData.reduce((sum, item) => sum + item.video_completions, 0).toLocaleString(),
            change: 8.9,
            changeType: "increase",
            icon: "✅",
            color: "bg-cyan-500"
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Chart
          title="Viewability by Campaign"
          data={chartData}
          type="bar"
          height={400}
          config={{
            xAxis: { dataKey: 'name' },
            yAxis: { dataKey: 'viewability' },
            series: [
              { dataKey: 'viewability', name: 'Viewability Rate (%)', color: '#00d4ff' }
            ]
          }}
        />
        <Chart
          title="Video Completion Rate by Campaign"
          data={chartData}
          type="line"
          height={400}
          config={{
            xAxis: { dataKey: 'name' },
            yAxis: { dataKey: 'vcr' },
            series: [
              { dataKey: 'vcr', name: 'VCR (%)', color: '#ff69b4' }
            ]
          }}
        />
      </div>

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
                  <td className="py-3 px-4 text-neon-blue">{(item.viewability_rate * 100).toFixed(1)}%</td>
                  <td className="py-3 px-4 text-neon-green">{(item.vcr * 100).toFixed(1)}%</td>
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

function GeoDeviceDashboard({ benchmarkMode, localGeoDeviceData }: { benchmarkMode: boolean; localGeoDeviceData: GeoDeviceData[] }) {
  // Prepare data for charts
  const chartData = localGeoDeviceData.slice(0, 10).map((item, index) => ({
    name: item.campaign_name.substring(0, 20) + '...',
    impressions: item.impressions,
    clicks: item.clicks,
    conversions: item.conversions,
    deviceType: item.device_type
  }))

  // Device distribution summary
  const deviceDistribution = [
    { name: 'Desktop', value: localGeoDeviceData.filter(item => item.device_type === 'Desktop').length },
    { name: 'Mobile', value: localGeoDeviceData.filter(item => item.device_type === 'Mobile').length },
    { name: 'Tablet', value: localGeoDeviceData.filter(item => item.device_type === 'Tablet').length },
    { name: 'Connected TV', value: localGeoDeviceData.filter(item => item.device_type === 'Connected TV').length }
  ]

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
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          metric={{
            title: "Total Impressions",
            value: localGeoDeviceData.reduce((sum, item) => sum + item.impressions, 0).toLocaleString(),
            change: 12.5,
            changeType: "increase",
            icon: "👁️",
            color: "bg-neon-blue"
          }}
        />
        <MetricCard
          metric={{
            title: "Total Clicks",
            value: localGeoDeviceData.reduce((sum, item) => sum + item.clicks, 0).toLocaleString(),
            change: 8.3,
            changeType: "increase",
            icon: "🖱️",
            color: "bg-neon-green"
          }}
        />
        <MetricCard
          metric={{
            title: "Total Conversions",
            value: localGeoDeviceData.reduce((sum, item) => sum + item.conversions, 0).toLocaleString(),
            change: 15.7,
            changeType: "increase",
            icon: "🎯",
            color: "bg-neon-purple"
          }}
        />
        <MetricCard
          metric={{
            title: "Avg CTR",
            value: `${(localGeoDeviceData.reduce((sum, item) => sum + (item.clicks / item.impressions), 0) / localGeoDeviceData.length * 100).toFixed(2)}%`,
            change: 2.1,
            changeType: "increase",
            icon: "📈",
            color: "bg-cyan-500"
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Chart
          title="Performance by Device Type"
          data={chartData}
          type="bar"
          height={400}
          config={{
            xAxis: { dataKey: 'name' },
            yAxis: { dataKey: 'impressions' },
            series: [
              { dataKey: 'impressions', name: 'Impressions', color: '#00d4ff' },
              { dataKey: 'clicks', name: 'Clicks', color: '#ff69b4' }
            ]
          }}
        />
        <Chart
          title="Conversions by Campaign"
          data={chartData}
          type="line"
          height={400}
          config={{
            xAxis: { dataKey: 'name' },
            yAxis: { dataKey: 'conversions' },
            series: [
              { dataKey: 'conversions', name: 'Conversions', color: '#8b5cf6' }
            ]
          }}
        />
      </div>

      {/* Interactive Map */}
      <div className="futuristic-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Geographic Performance Heatmap</h3>
            <p className="text-sm text-gray-400">Interactive visualization of traffic density across major US cities</p>
          </div>
        </div>
        <GeographicMap 
          data={localGeoDeviceData} 
          type="geo-device" 
        />
      </div>

      {/* Geographic Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Chart
          title="Impressions by City"
          data={topCities.slice(0, 8).map(city => ({
            name: city.name,
            impressions: city.impressions,
            clicks: city.clicks,
            conversions: city.conversions
          }))}
          type="bar"
          height={400}
          config={{
            xAxis: { dataKey: 'name' },
            yAxis: { dataKey: 'impressions' },
            series: [
              { dataKey: 'impressions', name: 'Impressions', color: '#00d4ff' },
              { dataKey: 'clicks', name: 'Clicks', color: '#ff69b4' }
            ]
          }}
        />
        <Chart
          title="Conversions by City"
          data={topCities.slice(0, 8).map(city => ({
            name: city.name,
            conversions: city.conversions,
            revenue: city.revenue
          }))}
          type="line"
          height={400}
          config={{
            xAxis: { dataKey: 'name' },
            yAxis: { dataKey: 'conversions' },
            series: [
              { dataKey: 'conversions', name: 'Conversions', color: '#8b5cf6' }
            ]
          }}
        />
      </div>

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
                  <td className="py-3 px-4 text-neon-green">{(city.impressions ?? 0).toLocaleString()}</td>
                  <td className="py-3 px-4 text-neon-purple">{(city.clicks ?? 0).toLocaleString()}</td>
                  <td className="py-3 px-4 text-yellow-400">{city.ctr}%</td>
                  <td className="py-3 px-4 text-pink-400">{(city.conversions ?? 0).toLocaleString()}</td>
                  <td className="py-3 px-4 text-emerald-400">${(city.revenue ?? 0).toLocaleString()}</td>
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
                  <td className="py-3 px-4 text-neon-blue">{(item.impressions ?? 0).toLocaleString()}</td>
                  <td className="py-3 px-4 text-neon-green">{(item.ctr * 100).toFixed(2)}%</td>
                  <td className="py-3 px-4 text-neon-purple">{(item.conversions ?? 0).toLocaleString()}</td>
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

function PlacementsDashboard({ benchmarkMode, localPlacementData }: { benchmarkMode: boolean; localPlacementData: PlacementData[] }) {
  // Prepare data for charts
  const chartData = localPlacementData.slice(0, 10).map((item, index) => ({
    name: item.site_domain.substring(0, 20) + '...',
    ctr: item.ctr * 100,
    impressions: item.impressions,
    clicks: item.clicks,
    conversions: item.total_conversions
  }))

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          metric={{
            title: "Total Impressions",
            value: localPlacementData.reduce((sum, item) => sum + item.impressions, 0).toLocaleString(),
            change: 12.5,
            changeType: "increase",
            icon: "👁️",
            color: "bg-neon-blue"
          }}
        />
        <MetricCard
          metric={{
            title: "Total Clicks",
            value: localPlacementData.reduce((sum, item) => sum + item.clicks, 0).toLocaleString(),
            change: 8.3,
            changeType: "increase",
            icon: "🖱️",
            color: "bg-neon-green"
          }}
        />
        <MetricCard
          metric={{
            title: "Avg CTR",
            value: `${(localPlacementData.reduce((sum, item) => sum + item.ctr, 0) / localPlacementData.length * 100).toFixed(2)}%`,
            change: 2.1,
            changeType: "increase",
            icon: "📈",
            color: "bg-neon-purple"
          }}
        />
        <MetricCard
          metric={{
            title: "Total Conversions",
            value: localPlacementData.reduce((sum, item) => sum + item.total_conversions, 0).toLocaleString(),
            change: 15.7,
            changeType: "increase",
            icon: "🎯",
            color: "bg-cyan-500"
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Chart
          title="CTR by Site/App"
          data={chartData}
          type="bar"
          height={400}
          config={{
            xAxis: { dataKey: 'name' },
            yAxis: { dataKey: 'ctr' },
            series: [
              { dataKey: 'ctr', name: 'CTR (%)', color: '#00d4ff' }
            ]
          }}
        />
        <Chart
          title="Impressions by Site"
          data={chartData}
          type="line"
          height={400}
          config={{
            xAxis: { dataKey: 'name' },
            yAxis: { dataKey: 'impressions' },
            series: [
              { dataKey: 'impressions', name: 'Impressions', color: '#ff69b4' }
            ]
          }}
        />
      </div>

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
                  <td className="py-3 px-4 text-neon-blue">{(item.impressions ?? 0).toLocaleString()}</td>
                  <td className="py-3 px-4 text-neon-green">{(item.ctr * 100).toFixed(2)}%</td>
                  <td className="py-3 px-4 text-neon-purple">{(item.total_conversions ?? 0).toLocaleString()}</td>
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

function FootTrafficDashboard({ benchmarkMode, localFootTrafficData }: { benchmarkMode: boolean; localFootTrafficData: FootTrafficData[] }) {
  // Prepare data for charts
  const chartData = localFootTrafficData.slice(0, 10).map((item, index) => ({
    name: item.city_name,
    visits: item.visits,
    uniqueVisitors: item.unique_visitors,
    dwellTime: item.dwell_time,
    distance: item.distance_traveled
  }))

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          metric={{
            title: "Total Visits",
            value: localFootTrafficData.reduce((sum, item) => sum + item.visits, 0).toLocaleString(),
            change: 12.5,
            changeType: "increase",
            icon: "👣",
            color: "bg-neon-blue"
          }}
        />
        <MetricCard
          metric={{
            title: "Unique Visitors",
            value: localFootTrafficData.reduce((sum, item) => sum + item.unique_visitors, 0).toLocaleString(),
            change: 8.3,
            changeType: "increase",
            icon: "👥",
            color: "bg-neon-green"
          }}
        />
        <MetricCard
          metric={{
            title: "Avg Dwell Time",
            value: `${(localFootTrafficData.reduce((sum, item) => sum + item.dwell_time, 0) / localFootTrafficData.length).toFixed(1)} min`,
            change: 2.1,
            changeType: "increase",
            icon: "⏱️",
            color: "bg-neon-purple"
          }}
        />
        <MetricCard
          metric={{
            title: "Avg Distance",
            value: `${(localFootTrafficData.reduce((sum, item) => sum + item.distance_traveled, 0) / localFootTrafficData.length).toFixed(1)} mi`,
            change: -1.5,
            changeType: "decrease",
            icon: "🗺️",
            color: "bg-cyan-500"
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Chart
          title="Foot Traffic by City"
          data={chartData}
          type="bar"
          height={400}
          config={{
            xAxis: { dataKey: 'name' },
            yAxis: { dataKey: 'visits' },
            series: [
              { dataKey: 'visits', name: 'Visits', color: '#00d4ff' },
              { dataKey: 'uniqueVisitors', name: 'Unique Visitors', color: '#ff69b4' }
            ]
          }}
        />
        <Chart
          title="Dwell Time by Location"
          data={chartData}
          type="line"
          height={400}
          config={{
            xAxis: { dataKey: 'name' },
            yAxis: { dataKey: 'dwellTime' },
            series: [
              { dataKey: 'dwellTime', name: 'Dwell Time (min)', color: '#8b5cf6' }
            ]
          }}
        />
      </div>

      {/* Geographic Map */}
      <div className="futuristic-card p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Geographic Foot Traffic Heatmap</h3>
        <GeographicMap 
          data={localFootTrafficData} 
          type="foot-traffic" 
        />
      </div>

      {/* Table */}
      <div className="futuristic-card p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Foot Traffic Data</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Location</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">POI Category</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Visits</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Unique Visitors</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Dwell Time (min)</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Conversion Rate</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Revenue/Visit</th>
              </tr>
            </thead>
            <tbody>
              {localFootTrafficData.slice(0, 10).map((item, index) => (
                <tr key={`foot-traffic-${item.poi_name}-${index}`} className="border-b border-gray-700">
                  <td className="py-3 px-4 text-white">{item.poi_name}</td>
                  <td className="py-3 px-4 text-neon-blue">{item.poi_category}</td>
                  <td className="py-3 px-4 text-neon-green">{(item.visits ?? 0).toLocaleString()}</td>
                  <td className="py-3 px-4 text-neon-purple">{(item.unique_visitors ?? 0).toLocaleString()}</td>
                  <td className="py-3 px-4 text-yellow-400">{item.dwell_time}</td>
                  <td className="py-3 px-4 text-pink-400">{(item.conversion_rate * 100).toFixed(2)}%</td>
                  <td className="py-3 px-4 text-cyan-400">${item.revenue_per_visit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 

function AudiencesDashboard({ localAudienceData, localAudienceHierarchyData }: { localAudienceData: AudiencePerformanceData[]; localAudienceHierarchyData: any[] }) {
  const [hoveredSegment, setHoveredSegment] = useState<AudiencePerformanceData | null>(null)
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

  // Audience segment performance data
  const segmentPerformanceData = {
    labels: localAudienceData.map(item => item.segment),
    datasets: [{
      label: 'ROI',
      data: localAudienceData.map(item => item.roi),
      backgroundColor: localAudienceData.map(item => item.color),
      borderColor: localAudienceData.map(item => item.color),
      borderWidth: 1
    }]
  }

  // ROI vs Discrepancy scatter data
  const roiDiscrepancyData = {
    datasets: [{
      label: 'Audience Segments',
      data: localAudienceData.map(item => ({
        x: item.discrepancy,
        y: item.roi,
        segment: item.segment,
        definition: item.definition,
        color: item.color
      })),
      backgroundColor: localAudienceData.map(item => item.color),
      borderColor: localAudienceData.map(item => item.color),
      borderWidth: 2,
      pointRadius: 8,
      pointHoverRadius: 12
    }]
  }

  // Top performing segments
  const topSegments = localAudienceData
    .sort((a, b) => b.roi - a.roi)
    .slice(0, 10)

  // Segment categories breakdown
  const categoryBreakdown = localAudienceData.reduce((acc, item) => {
    const category = item.category
    if (!acc[category]) {
      acc[category] = {
        count: 0,
        totalImpressions: 0,
        totalConversions: 0,
        avgROI: 0
      }
    }
    acc[category].count++
    acc[category].totalImpressions += item.impressions
    acc[category].totalConversions += item.conversions
    acc[category].avgROI += item.roi
    return acc
  }, {} as Record<string, { count: number; totalImpressions: number; totalConversions: number; avgROI: number }>)

  // Calculate averages
  Object.keys(categoryBreakdown).forEach(category => {
    categoryBreakdown[category].avgROI /= categoryBreakdown[category].count
  })

  const categoryData = {
    labels: Object.keys(categoryBreakdown),
    datasets: [{
      label: 'Average ROI',
      data: Object.values(categoryBreakdown).map(cat => cat.avgROI),
      backgroundColor: [
        'rgba(0, 212, 255, 0.8)',
        'rgba(255, 105, 180, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(0, 255, 136, 0.8)',
        'rgba(255, 215, 0, 0.8)'
      ]
    }]
  }

  const handleSegmentHover = (event: any, elements: any[]) => {
    if (elements.length > 0) {
      const dataIndex = elements[0].index
      const segment = localAudienceData[dataIndex]
      setHoveredSegment(segment)
      setShowTooltip(true)
      setTooltipPosition({
        x: event.chart.canvas.offsetLeft + event.chart.chartArea.left + elements[0].element.x,
        y: event.chart.canvas.offsetTop + event.chart.chartArea.top + elements[0].element.y
      })
    } else {
      setShowTooltip(false)
    }
  }

  const handleSegmentLeave = () => {
    setShowTooltip(false)
  }

  return (
    <div className="space-y-8">
      {/* Header with Smart Insight */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Audience Insights Analytics</h2>
          <p className="text-gray-400">Discover high-performing audience segments from the Infillion Taxonomy</p>
        </div>
        <SmartInsight 
          confidence={0.97} 
          message="Segment 'Luxury Auto Intenders' is outperforming with ROI 5.52x and 6,400 conversions." 
        />
      </div>

      {/* Top Performing Audience Segments */}
      <TopPerformingAudienceSegments data={localAudienceData} />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          metric={{
            title: "Total Segments",
            value: localAudienceData.length,
            change: 12.5,
            changeType: "increase",
            icon: "🎯",
            color: "bg-neon-blue"
          }}
        />
        <MetricCard
          metric={{
            title: "Avg ROI",
            value: `${(localAudienceData.reduce((sum, item) => sum + item.roi, 0) / localAudienceData.length).toFixed(2)}x`,
            change: 8.3,
            changeType: "increase",
            icon: "📈",
            color: "bg-neon-green"
          }}
        />
        <MetricCard
          metric={{
            title: "Total Conversions",
            value: localAudienceData.reduce((sum, item) => sum + (item.conversions ?? 0), 0).toLocaleString(),
            change: 15.7,
            changeType: "increase",
            icon: "🔄",
            color: "bg-neon-purple"
          }}
        />
        <MetricCard
          metric={{
            title: "Avg Confidence",
            value: `${(localAudienceData.reduce((sum, item) => sum + item.confidence, 0) / localAudienceData.length * 100).toFixed(1)}%`,
            change: 2.1,
            changeType: "increase",
            icon: "🎯",
            color: "bg-cyan-500"
          }}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Chart
          title="ROI by Audience Segment"
          data={topSegments.slice(0, 8).map(segment => ({
            name: segment.segment,
            roi: segment.roi,
            impressions: segment.impressions,
            conversions: segment.conversions
          }))}
          type="bar"
          height={400}
          config={{
            xAxis: { dataKey: 'name' },
            yAxis: { dataKey: 'roi' },
            series: [
              { dataKey: 'roi', name: 'ROI', color: '#00d4ff' }
            ]
          }}
        />
        <Chart
          title="Impressions vs Conversions"
          data={topSegments.slice(0, 8).map(segment => ({
            name: segment.segment,
            impressions: segment.impressions,
            conversions: segment.conversions
          }))}
          type="line"
          height={400}
          config={{
            xAxis: { dataKey: 'name' },
            yAxis: { dataKey: 'impressions' },
            series: [
              { dataKey: 'impressions', name: 'Impressions', color: '#ff69b4' },
              { dataKey: 'conversions', name: 'Conversions', color: '#8b5cf6' }
            ]
          }}
        />
      </div>

      {/* Category Performance */}
      <div className="futuristic-card p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Performance by Category</h3>
        <Chart
          title="Average ROI by Category"
          data={Object.keys(categoryBreakdown).map(category => ({
            name: category,
            avgROI: categoryBreakdown[category].avgROI,
            count: categoryBreakdown[category].count
          }))}
          type="bar"
          height={300}
          config={{
            xAxis: { dataKey: 'name' },
            yAxis: { dataKey: 'avgROI' },
            series: [
              { dataKey: 'avgROI', name: 'Average ROI', color: '#00d4ff' }
            ]
          }}
        />
      </div>

      {/* Top Performing Segments Table */}
      <div className="futuristic-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Top Performing Audience Segments</h3>
          <button className="px-4 py-2 bg-neon-blue text-white rounded-lg font-medium hover:bg-neon-green transition-all">
            Export CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Rank</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Segment Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Category</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">ROI</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Conversions</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Impressions</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">CTR</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Confidence</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Definition</th>
              </tr>
            </thead>
            <tbody>
              {topSegments.map((segment, index) => (
                <tr 
                  key={`segment-${segment.id}-${index}`} 
                  className="border-b border-gray-700 hover:bg-gray-700/30 transition-colors"
                  onMouseEnter={() => setHoveredSegment(segment)}
                  onMouseLeave={() => setHoveredSegment(null)}
                >
                  <td className="py-3 px-4 text-white">#{index + 1}</td>
                  <td className="py-3 px-4 text-neon-blue font-medium">{segment.segment}</td>
                  <td className="py-3 px-4 text-gray-300">{segment.category}</td>
                  <td className="py-3 px-4 text-neon-green font-bold">{segment.roi.toFixed(2)}x</td>
                  <td className="py-3 px-4 text-neon-purple">{(segment.conversions ?? 0).toLocaleString()}</td>
                  <td className="py-3 px-4 text-yellow-400">{(segment.impressions ?? 0).toLocaleString()}</td>
                  <td className="py-3 px-4 text-pink-400">{(segment.ctr * 100).toFixed(2)}%</td>
                  <td className="py-3 px-4 text-cyan-400">{(segment.confidence * 100).toFixed(1)}%</td>
                  <td className="py-3 px-4 text-gray-300 max-w-xs truncate" title={segment.definition}>
                    {segment.definition.substring(0, 80)}...
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Segment Definition Tooltip */}
      {hoveredSegment && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bg-dark-200 border border-neon-blue rounded-lg p-4 shadow-lg z-50 max-w-md pointer-events-none"
          style={{
            left: tooltipPosition.x + 10,
            top: tooltipPosition.y - 10,
            transform: 'translateY(-100%)'
          }}
        >
          <div className="text-white font-semibold text-sm mb-2">{hoveredSegment.segment}</div>
          <div className="text-gray-300 text-xs leading-relaxed">{hoveredSegment.definition}</div>
          <div className="mt-2 pt-2 border-t border-gray-600">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div><span className="text-gray-400">ROI:</span> <span className="text-neon-green">{hoveredSegment.roi.toFixed(2)}x</span></div>
              <div><span className="text-gray-400">CTR:</span> <span className="text-neon-blue">{(hoveredSegment.ctr * 100).toFixed(2)}%</span></div>
              <div><span className="text-gray-400">Confidence:</span> <span className="text-cyan-400">{(hoveredSegment.confidence * 100).toFixed(1)}%</span></div>
              <div><span className="text-gray-400">Conversions:</span> <span className="text-neon-purple">{(hoveredSegment.conversions ?? 0).toLocaleString()}</span></div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Audience Leaderboard */}
      <AudienceLeaderboard 
        entries={topSegments.map((segment, index) => ({
          id: segment.id,
          name: segment.segment,
          roi: segment.roi,
          conversions: segment.conversions,
          impressions: segment.impressions,
          ctr: segment.ctr,
          confidence: segment.confidence
        }))} 
      />
    </div>
  )
} 