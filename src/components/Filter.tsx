'use client'

import { useState, useEffect } from 'react'
import { FilterParams, AudienceFilterParams } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Filter as FilterIcon, Play, Save, RotateCcw } from 'lucide-react'

interface FilterProps {
  filters: FilterParams | AudienceFilterParams
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
  audienceMode
}: FilterProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [localFilters, setLocalFilters] = useState<any>(filters)

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
    { value: 'last_30_days', label: 'Last 30 Days' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last_7_days', label: 'Last 7 Days' },
    { value: 'month_to_date', label: 'Month to Date' },
    { value: 'custom', label: 'Custom' }
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

  return (
    <motion.div 
      className="futuristic-card mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FilterIcon className="w-5 h-5 text-neon-blue" />
          <h3 className="text-lg font-semibold text-white">Filters</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleReset}
            className="text-gray-400 hover:text-white transition-colors p-2"
            title="Reset filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-neon-blue hover:text-white transition-colors p-2"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
              {/* Organization (Admin only) */}
              {userRole === 'admin' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Organization
                  </label>
                  <select
                    value={localFilters.organization_id || ''}
                    onChange={(e) => handleFilterChange('organization_id', e.target.value || undefined)}
                    className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                  >
                    <option value="">All Organizations</option>
                    <option value="org1">Organization 1</option>
                    <option value="org2">Organization 2</option>
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
                  <option value="adv1">Advertiser 1</option>
                  <option value="adv2">Advertiser 2</option>
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
                  <option value="camp1">Campaign 1</option>
                  <option value="camp2">Campaign 2</option>
                </select>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Date Range
                </label>
                <select
                  value={localFilters.date_range}
                  onChange={(e) => handleFilterChange('date_range', e.target.value as FilterParams['date_range'])}
                  className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                >
                  {dateRangeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Custom Date Range */}
              {localFilters.date_range === 'custom' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={localFilters.start_date || ''}
                      onChange={(e) => handleFilterChange('start_date', e.target.value)}
                      className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={localFilters.end_date || ''}
                      onChange={(e) => handleFilterChange('end_date', e.target.value)}
                      className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                    />
                  </div>
                </>
              )}

              {/* Aggregation */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Aggregation
                </label>
                <select
                  value={localFilters.aggregation}
                  onChange={(e) => handleFilterChange('aggregation', e.target.value as FilterParams['aggregation'])}
                  className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                >
                  {aggregationOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Report-specific filters */}
              {reportType === 'new-to-brand' && (
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
              )}

              {reportType === 'viewability' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
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
                      <option value="mobile">Mobile</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Creative Size
                    </label>
                    <select
                      value={localFilters.creative_size || ''}
                      onChange={(e) => handleFilterChange('creative_size', e.target.value || undefined)}
                      className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                    >
                      <option value="">All Sizes</option>
                      <option value="300x250">300x250</option>
                      <option value="728x90">728x90</option>
                      <option value="160x600">160x600</option>
                      <option value="320x50">320x50</option>
                    </select>
                  </div>
                </>
              )}

              {(reportType === 'geo-device' || reportType === 'foot-traffic') && (
                <>
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
                      <option value="connected_tv">Connected TV</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      City
                    </label>
                    <select
                      value={localFilters.city || ''}
                      onChange={(e) => handleFilterChange('city', e.target.value || undefined)}
                      className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                    >
                      <option value="">All Cities</option>
                      <option value="New York">New York</option>
                      <option value="Los Angeles">Los Angeles</option>
                      <option value="Chicago">Chicago</option>
                      <option value="Houston">Houston</option>
                      <option value="Phoenix">Phoenix</option>
                    </select>
                  </div>
                </>
              )}

              {reportType === 'placements' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Site/App Domain
                  </label>
                  <select
                    value={localFilters.site_domain || ''}
                    onChange={(e) => handleFilterChange('site_domain', e.target.value || undefined)}
                    className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                  >
                    <option value="">All Sites/Apps</option>
                    <option value="cnn.com">CNN</option>
                    <option value="nytimes.com">NY Times</option>
                    <option value="washingtonpost.com">Washington Post</option>
                    <option value="usatoday.com">USA Today</option>
                    <option value="foxnews.com">Fox News</option>
                  </select>
                </div>
              )}

              {/* Segment Type (if provided) */}
              {segmentTypes && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Segment Type
                  </label>
                  <select
                    value={localFilters.segment_type || ''}
                    onChange={(e) => handleFilterChange('segment_type', e.target.value || undefined)}
                    className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                  >
                    <option value="">All Segments</option>
                    {segmentTypes.map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Segment Names (if provided) */}
              {segmentNames && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Segment Names
                  </label>
                  <select
                    multiple
                    value={localFilters.segment_names || []}
                    onChange={(e) => handleFilterChange('segment_names', Array.from(e.target.selectedOptions).map(option => option.value))}
                    className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                  >
                    {segmentNames.map(name => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-700">
              <button
                onClick={handleApply}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-neon-blue to-cyan-500 text-white rounded-lg font-medium hover:scale-105 transition-all duration-200 neon-glow"
              >
                <Save className="w-4 h-4" />
                <span>Apply</span>
              </button>
              <button
                onClick={handleRun}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-neon-green to-emerald-500 text-white rounded-lg font-medium hover:scale-105 transition-all duration-200 neon-glow-green"
              >
                <Play className="w-4 h-4" />
                <span>Run</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
} 