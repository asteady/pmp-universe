'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Info, Settings, Download, Eye, EyeOff } from 'lucide-react'
import { AudiencePerformanceData } from '@/types'

interface TopPerformingAudienceSegmentsProps {
  data: AudiencePerformanceData[]
}

interface ColumnConfig {
  key: keyof AudiencePerformanceData
  label: string
  visible: boolean
  sortable: boolean
  format?: (value: any) => string
}

export function TopPerformingAudienceSegments({ data }: TopPerformingAudienceSegmentsProps) {
  const [sortColumn, setSortColumn] = useState<keyof AudiencePerformanceData>('roi')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [showColumnSettings, setShowColumnSettings] = useState(false)
  const [hoveredSegment, setHoveredSegment] = useState<AudiencePerformanceData | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const defaultColumns: ColumnConfig[] = [
    { key: 'advertiser', label: 'Advertiser Name', visible: true, sortable: true },
    { key: 'campaign_name', label: 'Campaign Name', visible: true, sortable: true },
    { key: 'strategy_name', label: 'Strategy Name', visible: true, sortable: true },
    { key: 'segment', label: 'Audience Segment Name', visible: true, sortable: true },
    { key: 'impressions', label: 'Impressions', visible: true, sortable: true, format: (value) => value.toLocaleString() },
    { key: 'clicks', label: 'Clicks', visible: true, sortable: true, format: (value) => value.toLocaleString() },
    { key: 'ctr', label: 'CTR%', visible: true, sortable: true, format: (value) => `${(value * 100).toFixed(2)}%` },
    { key: 'vcr', label: 'VCR%', visible: true, sortable: true, format: (value) => `${(value * 100).toFixed(2)}%` },
    { key: 'category', label: 'Category', visible: false, sortable: true },
    { key: 'roi', label: 'ROI', visible: false, sortable: true, format: (value) => `${value.toFixed(2)}x` },
    { key: 'conversions', label: 'Conversions', visible: false, sortable: true, format: (value) => value.toLocaleString() },
    { key: 'completed_views', label: 'Completed Views', visible: false, sortable: true, format: (value) => value.toLocaleString() },
    { key: 'confidence', label: 'Confidence', visible: false, sortable: true, format: (value) => `${(value * 100).toFixed(1)}%` }
  ]

  const [columns, setColumns] = useState<ColumnConfig[]>(defaultColumns)

  const handleSort = (column: keyof AudiencePerformanceData) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('desc')
    }
  }

  const toggleColumnVisibility = (columnKey: keyof AudiencePerformanceData) => {
    setColumns(prev => prev.map(col => 
      col.key === columnKey ? { ...col, visible: !col.visible } : col
    ))
  }

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortColumn]
    const bValue = b[sortColumn]
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
    }
    
    return 0
  }).slice(0, 20) // Show top 20

  const visibleColumns = columns.filter(col => col.visible)

  const formatValue = (item: AudiencePerformanceData, column: ColumnConfig) => {
    const value = item[column.key]
    if (column.format) {
      return column.format(value)
    }
    if (typeof value === 'number') {
      return value.toLocaleString()
    }
    return value || '-'
  }

  return (
    <div className="futuristic-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <TrendingUp className="w-6 h-6 text-neon-green" />
          <h3 className="text-xl font-semibold text-white">Top Performing Audience Segments</h3>
          <span className="text-sm text-gray-400 bg-gray-700 px-2 py-1 rounded-full">
            {sortedData.length} segments
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowColumnSettings(!showColumnSettings)}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Columns</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 bg-neon-blue hover:bg-cyan-500 text-white rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Column Settings */}
      {showColumnSettings && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6 p-4 bg-dark-300 rounded-lg border border-gray-600"
        >
          <h4 className="text-md font-medium text-white mb-4">Configure Columns</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {columns.map(column => (
              <label
                key={column.key}
                className="flex items-center space-x-2 p-2 rounded-lg border border-gray-600 hover:border-gray-500 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={column.visible}
                  onChange={() => toggleColumnVisibility(column.key)}
                  className="text-neon-blue focus:ring-neon-blue"
                />
                <span className="text-sm text-gray-300">{column.label}</span>
              </label>
            ))}
          </div>
        </motion.div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-600">
              {visibleColumns.map(column => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-left text-sm font-medium text-gray-300 ${
                    column.sortable ? 'cursor-pointer hover:text-white' : ''
                  }`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-2">
                    <span>{column.label}</span>
                    {column.sortable && (
                      <div className="flex flex-col">
                        <div className={`w-0 h-0 border-l-2 border-r-2 border-b-2 border-transparent border-b-gray-400 ${
                          sortColumn === column.key && sortDirection === 'asc' ? 'border-b-neon-blue' : ''
                        }`} />
                        <div className={`w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-400 ${
                          sortColumn === column.key && sortDirection === 'desc' ? 'border-t-neon-blue' : ''
                        }`} />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <motion.tr
                key={`${item.advertiser}-${item.segment}-${index}`}
                className="border-b border-gray-700 hover:bg-gray-700/30 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onMouseEnter={() => setHoveredSegment(item)}
                onMouseLeave={() => setHoveredSegment(null)}
              >
                {visibleColumns.map(column => (
                  <td
                    key={column.key}
                    className={`px-4 py-3 text-sm text-white ${column.key === 'segment' ? 'cursor-pointer relative' : ''}`}
                    onClick={() => column.key === 'segment' && setHoveredSegment(item)}
                    onMouseEnter={column.key === 'segment' ? (e) => {
                      setHoveredSegment(item);
                      setTooltipPosition({ x: e.clientX, y: e.clientY });
                    } : undefined}
                    onMouseMove={column.key === 'segment' ? (e) => setTooltipPosition({ x: e.clientX, y: e.clientY }) : undefined}
                    onMouseLeave={column.key === 'segment' ? () => setHoveredSegment(null) : undefined}
                  >
                    {column.key === 'segment' ? (
                      <div className="relative group">
                        <span className="cursor-help border-b border-dotted border-gray-400">
                          {formatValue(item, column)}
                        </span>
                                                 {hoveredSegment === item && (
                           <div
                             className="fixed z-50 p-3 bg-dark-400 border border-gray-600 rounded-lg shadow-lg min-w-[300px] max-w-[500px] text-white"
                             style={{
                               top: Math.max(0, tooltipPosition.y + 24),
                               left: Math.max(0, tooltipPosition.x - 100),
                               pointerEvents: 'none',
                             }}
                           >
                             <div className="font-semibold mb-1">{item.name}</div>
                             <div className="text-sm text-gray-200 whitespace-pre-line">{item.definition}</div>
                           </div>
                         )}
                      </div>
                    ) : (
                      <span className={column.key === 'roi' ? 'font-semibold text-neon-green' : ''}>
                        {formatValue(item, column)}
                      </span>
                    )}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-gray-600">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-gray-400">Avg ROI</div>
            <div className="text-white font-semibold">
              {(sortedData.reduce((sum, item) => sum + item.roi, 0) / sortedData.length).toFixed(2)}x
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400">Total Impressions</div>
            <div className="text-white font-semibold">
              {sortedData.reduce((sum, item) => sum + (item.impressions ?? 0), 0).toLocaleString()}
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400">Total Conversions</div>
            <div className="text-white font-semibold">
              {sortedData.reduce((sum, item) => sum + (item.conversions ?? 0), 0).toLocaleString()}
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-400">Avg CTR</div>
            <div className="text-white font-semibold">
              {(sortedData.reduce((sum, item) => sum + item.ctr, 0) / sortedData.length * 100).toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 