'use client'

import { useState, useEffect } from 'react'
import { FilterParams } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Filter as FilterIcon, Play, Save, RotateCcw, Calendar, Target, Users, Globe, Monitor } from 'lucide-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface FilterProps {
  filters: FilterParams | FilterParams
  onFiltersChange: (filters: any) => void
  userRole: 'admin' | 'advertiser' | 'agency'
  reportType?: string
  onApply?: () => void
  onRun?: () => void
  segmentTypes?: string[]
  segmentNames?: string[]
  onSegmentTypeChange?: (type: string) => void
  onSegmentNamesChange?: (names: string[]) => void
  audienceMode?: boolean
  audiences?: string[]
  channels?: string[]
  deviceTypes?: string[]
  strategies?: string[]
  creatives?: string[]
  onAudienceChange?: (aud: string[]) => void
  onChannelChange?: (ch: string[]) => void
  onDeviceTypeChange?: (dt: string[]) => void
  onStrategyChange?: (st: string[]) => void
  onCreativeChange?: (cr: string[]) => void
  actionLabel?: string // 'Apply' or 'Run'
  onAction?: () => void
}

export function Filter({ 
  filters, 
  onFiltersChange, 
  userRole, 
  reportType,
  onApply,
  onRun,
  segmentTypes,
  segmentNames,
  onSegmentTypeChange,
  onSegmentNamesChange,
  audienceMode,
  audiences,
  channels,
  deviceTypes,
  strategies,
  creatives,
  onAudienceChange,
  onChannelChange,
  onDeviceTypeChange,
  onStrategyChange,
  onCreativeChange,
  actionLabel,
  onAction
}: FilterProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [localFilters, setLocalFilters] = useState<any>(filters)
  const [showDatePicker, setShowDatePicker] = useState(false)

  // Load saved filters from localStorage on mount
  useEffect(() => {
    const savedFilters = localStorage.getItem('dashboard-filters')
    if (savedFilters) {
      try {
        const parsed = JSON.parse(savedFilters)
        setLocalFilters(parsed)
        onFiltersChange(parsed)
      } catch (error) {
        console.error('Error loading saved filters:', error)
      }
    }
  }, [])

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = {
      ...localFilters,
      [key]: value
    }
    setLocalFilters(newFilters)
  }

  const handleApply = () => {
    onFiltersChange(localFilters)
    localStorage.setItem('dashboard-filters', JSON.stringify(localFilters))
    onApply?.()
  }

  const handleRun = () => {
    onFiltersChange(localFilters)
    localStorage.setItem('dashboard-filters', JSON.stringify(localFilters))
    onRun?.()
  }

  const handleReset = () => {
    const defaultFilters: FilterParams = {
      date_range: 'last_30_days',
      aggregation: 'day'
    }
    setLocalFilters(defaultFilters)
    onFiltersChange(defaultFilters)
    localStorage.removeItem('dashboard-filters')
  }

  const dateRangeOptions = [
    { value: 'last_30_days', label: 'Last 30 Days', icon: Calendar },
    { value: 'yesterday', label: 'Yesterday', icon: Calendar },
    { value: 'last_7_days', label: 'Last 7 Days', icon: Calendar },
    { value: 'month_to_date', label: 'Month to Date', icon: Calendar },
    { value: 'custom', label: 'Custom Range', icon: Calendar },
  ]

  const aggregationOptions = [
    { value: 'day', label: 'By Day' },
    { value: 'week', label: 'By Week' },
    { value: 'month', label: 'By Month' },
    { value: 'all', label: 'All' }
  ]

  const lookbackOptions = [
    { value: 30, label: '30 Days' },
    { value: 60, label: '60 Days' },
    { value: 90, label: '90 Days' },
    { value: 180, label: '180 Days' }
  ]

  const kpiGoalOptions = [
    { value: 'ctr', label: 'CTR Target' },
    { value: 'roi', label: 'ROI Target' },
    { value: 'viewability', label: 'Viewability Target' },
    { value: 'conversions', label: 'Conversion Target' }
  ]

  return (
    <motion.div 
      className="futuristic-card mb-6 w-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6 px-6 py-4">
        <div className="flex items-center space-x-3">
          <FilterIcon className="w-5 h-5 text-neon-blue" />
          <h3 className="text-lg font-semibold text-white">Advanced Filters</h3>
          <span className="text-xs text-gray-400 bg-gray-700 px-3 py-1 rounded-full">
            {Object.keys(localFilters).filter(k => localFilters[k]).length} active
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleReset}
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-700/50"
            title="Reset all filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-neon-blue hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-700/50"
          >
            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8 px-6">
              {/* Date Range Selection */}
              <div className="flex flex-col space-y-2">
                <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Date Range
                </label>
                <select
                  value={localFilters.date_range || 'last_30_days'}
                  onChange={(e) => {
                    const value = e.target.value
                    handleFilterChange('date_range', value)
                    if (value === 'custom') {
                      setShowDatePicker(true)
                    } else {
                      setShowDatePicker(false)
                      // Clear custom dates when selecting preset
                      handleFilterChange('start_date', '')
                      handleFilterChange('end_date', '')
                    }
                  }}
                  className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                >
                  {dateRangeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom Date Picker - Only show when custom is selected */}
              {showDatePicker && (
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Custom Date Range
                  </label>
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <input
                        type="date"
                        value={localFilters.start_date || ''}
                        onChange={(e) => handleFilterChange('start_date', e.target.value)}
                        className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                        placeholder="Start Date"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="date"
                        value={localFilters.end_date || ''}
                        onChange={(e) => handleFilterChange('end_date', e.target.value)}
                        className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                        placeholder="End Date"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Aggregation */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Aggregation
                </label>
                <select
                  value={localFilters.aggregation || 'day'}
                  onChange={(e) => handleFilterChange('aggregation', e.target.value)}
                  className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                >
                  {aggregationOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Lookback Window */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Lookback Window
                </label>
                <select
                  value={localFilters.lookback_window || 30}
                  onChange={(e) => handleFilterChange('lookback_window', parseInt(e.target.value))}
                  className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                >
                  {lookbackOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Organization (Admin only) */}
              {userRole === 'admin' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    Organization
                  </label>
                  <select
                    value={localFilters.organization_id || ''}
                    onChange={(e) => handleFilterChange('organization_id', e.target.value || undefined)}
                    className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                  >
                    <option value="">All Organizations</option>
                    <option value="org1">Infillion Media BU</option>
                    <option value="org2">Infillion Enterprise BU</option>
                    <option value="org3">MediaMath Legacy</option>
                  </select>
                </div>
              )}

              {/* Advertiser */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Advertiser
                </label>
                <select
                  value={localFilters.advertiser_id || ''}
                  onChange={(e) => handleFilterChange('advertiser_id', e.target.value || undefined)}
                  className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                >
                  <option value="">All Advertisers</option>
                  <option value="adv1">Nike</option>
                  <option value="adv2">Coca-Cola</option>
                  <option value="adv3">Toyota</option>
                  <option value="adv4">Apple</option>
                  <option value="adv5">McDonald's</option>
                </select>
              </div>

              {/* Campaign */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Campaign
                </label>
                <select
                  value={localFilters.campaign_id || ''}
                  onChange={(e) => handleFilterChange('campaign_id', e.target.value || undefined)}
                  className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                >
                  <option value="">All Campaigns</option>
                  <option value="camp1">Summer Surge 2025</option>
                  <option value="camp2">Back to School</option>
                  <option value="camp3">Holiday Prep</option>
                  <option value="camp4">Q1 Brand Awareness</option>
                </select>
              </div>

              {/* Channel Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <Monitor className="w-4 h-4 mr-1" />
                  Channel Type
                </label>
                <select
                  value={localFilters.channel_type || ''}
                  onChange={(e) => handleFilterChange('channel_type', e.target.value || undefined)}
                  className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                >
                  <option value="">All Channels</option>
                  <option value="display">Display</option>
                  <option value="video">Video</option>
                  <option value="social">Social</option>
                  <option value="search">Search</option>
                </select>
              </div>

              {/* Device Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Device Type
                </label>
                <select
                  value={localFilters.device_type || ''}
                  onChange={(e) => handleFilterChange('device_type', e.target.value || undefined)}
                  className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                >
                  <option value="">All Devices</option>
                  <option value="desktop">Desktop</option>
                  <option value="mobile">Mobile</option>
                  <option value="tablet">Tablet</option>
                  <option value="ctv">CTV</option>
                </select>
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <Globe className="w-4 h-4 mr-1" />
                  Country
                </label>
                <select
                  value={localFilters.country || ''}
                  onChange={(e) => handleFilterChange('country', e.target.value || undefined)}
                  className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                >
                  <option value="">All Countries</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                </select>
              </div>

              {/* KPI Goal Target */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <Target className="w-4 h-4 mr-1" />
                  KPI Goal
                </label>
                <select
                  value={localFilters.kpi_goal || ''}
                  onChange={(e) => handleFilterChange('kpi_goal', e.target.value || undefined)}
                  className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                >
                  <option value="">No Goal</option>
                  {kpiGoalOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* KPI Goal Value */}
              {localFilters.kpi_goal && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Target Value
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={localFilters.kpi_target_value || ''}
                    onChange={(e) => handleFilterChange('kpi_target_value', parseFloat(e.target.value))}
                    placeholder="Enter target value"
                    className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                  />
                </div>
              )}

              {/* Audience Mode Filters */}
              {audienceMode && (
                <>
                  {/* Segment Type */}
                  {segmentTypes && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Segment Type
                      </label>
                      <select
                        value={localFilters.segment_type || ''}
                        onChange={(e) => {
                          handleFilterChange('segment_type', e.target.value)
                          onSegmentTypeChange?.(e.target.value)
                        }}
                        className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                      >
                        <option value="">All Types</option>
                        {segmentTypes.map(type => (
                          <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Segment Names */}
                  {segmentNames && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Segment Names
                      </label>
                      <select
                        multiple
                        value={localFilters.segment_names || []}
                        onChange={(e) => handleFilterChange('segment_names', Array.from(e.target.selectedOptions).map(option => option.value))}
                        className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors min-h-[80px]"
                      >
                        {segmentNames.map(name => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Audiences */}
                  {audiences && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Audiences
                      </label>
                      <select
                        multiple
                        value={localFilters.audiences || []}
                        onChange={(e) => onAudienceChange?.(Array.from(e.target.selectedOptions).map(option => option.value))}
                        className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors min-h-[80px]"
                      >
                        {audiences.map(aud => (
                          <option key={aud} value={aud}>
                            {aud}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Channels */}
                  {channels && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Channels
                      </label>
                      <select
                        multiple
                        value={localFilters.channels || []}
                        onChange={(e) => onChannelChange?.(Array.from(e.target.selectedOptions).map(option => option.value))}
                        className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors min-h-[80px]"
                      >
                        {channels.map(ch => (
                          <option key={ch} value={ch}>
                            {ch}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Device Types */}
                  {deviceTypes && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Device Types
                      </label>
                      <select
                        multiple
                        value={localFilters.device_types || []}
                        onChange={(e) => onDeviceTypeChange?.(Array.from(e.target.selectedOptions).map(option => option.value))}
                        className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors min-h-[80px]"
                      >
                        {deviceTypes.map(dt => (
                          <option key={dt} value={dt}>
                            {dt}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Strategies */}
                  {strategies && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Strategies
                      </label>
                      <select
                        multiple
                        value={localFilters.strategies || []}
                        onChange={(e) => onStrategyChange?.(Array.from(e.target.selectedOptions).map(option => option.value))}
                        className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors min-h-[80px]"
                      >
                        {strategies.map(st => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Creatives */}
                  {creatives && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Creatives
                      </label>
                      <select
                        multiple
                        value={localFilters.creatives || []}
                        onChange={(e) => onCreativeChange?.(Array.from(e.target.selectedOptions).map(option => option.value))}
                        className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors min-h-[80px]"
                      >
                        {creatives.map(cr => (
                          <option key={cr} value={cr}>
                            {cr}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 pb-6 px-6 border-t border-gray-600">
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <span>Quick Actions:</span>
                <button
                  onClick={() => handleFilterChange('date_range', 'last_7_days')}
                  className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-xs transition-colors"
                >
                  Last 7 Days
                </button>
                <button
                  onClick={() => handleFilterChange('date_range', 'month_to_date')}
                  className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-xs transition-colors"
                >
                  MTD
                </button>
                <button
                  onClick={() => handleFilterChange('aggregation', 'week')}
                  className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-xs transition-colors"
                >
                  Weekly
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleApply}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-neon-blue to-cyan-500 text-white rounded-lg font-medium hover:from-cyan-500 hover:to-neon-blue transition-all duration-200 shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>Apply Filters</span>
                </button>
                <button
                  onClick={handleRun}
                  className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-neon-green to-emerald-500 text-white rounded-lg font-medium hover:from-emerald-500 hover:to-neon-green transition-all duration-200 shadow-lg"
                >
                  <Play className="w-4 h-4" />
                  <span>Run Report</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
} 