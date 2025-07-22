'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Download, ChevronUp, ChevronDown } from 'lucide-react'

interface AudienceData {
  id: string
  campaignName: string
  advertiser: string
  audienceSegment: string
  audienceSize: number
  impressions: number
  clicks: number
  ctr: number
  conversions: number
  conversionRate: number
  cpm: number
  cpc: number
  spend: number
  reach: number
  frequency: number
  status: 'active' | 'paused' | 'completed'
}

interface AudienceDataTableProps {
  data: AudienceData[]
}

export function AudienceDataTable({ data }: AudienceDataTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<keyof AudienceData>('campaignName')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredAndSortedData = useMemo(() => {
    let filtered = data.filter(item =>
      item.campaignName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.advertiser.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.audienceSegment.toLowerCase().includes(searchTerm.toLowerCase())
    )

    filtered.sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
      }
      
      return 0
    })

    return filtered
  }, [data, searchTerm, sortField, sortDirection])

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage)
  const paginatedData = filteredAndSortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSort = (field: keyof AudienceData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const exportToCSV = () => {
    const headers = [
      'Campaign Name',
      'Advertiser',
      'Audience Segment',
      'Audience Size',
      'Impressions',
      'Clicks',
      'CTR (%)',
      'Conversions',
      'Conversion Rate (%)',
      'CPM ($)',
      'CPC ($)',
      'Spend ($)',
      'Reach',
      'Frequency',
      'Status'
    ]

    const csvContent = [
      headers.join(','),
      ...filteredAndSortedData.map(item => [
        `"${item.campaignName}"`,
        `"${item.advertiser}"`,
        `"${item.audienceSegment}"`,
        item.audienceSize.toLocaleString(),
        item.impressions.toLocaleString(),
        item.clicks.toLocaleString(),
        item.ctr.toFixed(2),
        item.conversions.toLocaleString(),
        item.conversionRate.toFixed(2),
        item.cpm.toFixed(2),
        item.cpc.toFixed(2),
        item.spend.toFixed(2),
        item.reach.toLocaleString(),
        item.frequency.toFixed(2),
        item.status
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'audience-performance-data.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const SortIcon = ({ field }: { field: keyof AudienceData }) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
  }

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-foreground">Audience Performance Data</h3>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" size={20} />
            <input
              type="text"
              placeholder="Search campaigns, advertisers, or segments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-primary text-accent-foreground rounded-lg transition-colors"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th 
                className="text-left py-3 px-4 cursor-pointer hover:bg-gray-800 transition-colors"
                onClick={() => handleSort('campaignName')}
              >
                <div className="flex items-center gap-2">
                  Campaign Name
                  <SortIcon field="campaignName" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 cursor-pointer hover:bg-gray-800 transition-colors"
                onClick={() => handleSort('advertiser')}
              >
                <div className="flex items-center gap-2">
                  Advertiser
                  <SortIcon field="advertiser" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 cursor-pointer hover:bg-gray-800 transition-colors"
                onClick={() => handleSort('audienceSegment')}
              >
                <div className="flex items-center gap-2">
                  Audience Segment
                  <SortIcon field="audienceSegment" />
                </div>
              </th>
              <th 
                className="text-right py-3 px-4 cursor-pointer hover:bg-gray-800 transition-colors"
                onClick={() => handleSort('audienceSize')}
              >
                <div className="flex items-center justify-end gap-2">
                  Audience Size
                  <SortIcon field="audienceSize" />
                </div>
              </th>
              <th 
                className="text-right py-3 px-4 cursor-pointer hover:bg-gray-800 transition-colors"
                onClick={() => handleSort('impressions')}
              >
                <div className="flex items-center justify-end gap-2">
                  Impressions
                  <SortIcon field="impressions" />
                </div>
              </th>
              <th 
                className="text-right py-3 px-4 cursor-pointer hover:bg-gray-800 transition-colors"
                onClick={() => handleSort('clicks')}
              >
                <div className="flex items-center justify-end gap-2">
                  Clicks
                  <SortIcon field="clicks" />
                </div>
              </th>
              <th 
                className="text-right py-3 px-4 cursor-pointer hover:bg-gray-800 transition-colors"
                onClick={() => handleSort('ctr')}
              >
                <div className="flex items-center justify-end gap-2">
                  CTR (%)
                  <SortIcon field="ctr" />
                </div>
              </th>
              <th 
                className="text-right py-3 px-4 cursor-pointer hover:bg-gray-800 transition-colors"
                onClick={() => handleSort('conversions')}
              >
                <div className="flex items-center justify-end gap-2">
                  Conversions
                  <SortIcon field="conversions" />
                </div>
              </th>
              <th 
                className="text-right py-3 px-4 cursor-pointer hover:bg-gray-800 transition-colors"
                onClick={() => handleSort('conversionRate')}
              >
                <div className="flex items-center justify-end gap-2">
                  Conv. Rate (%)
                  <SortIcon field="conversionRate" />
                </div>
              </th>
              <th 
                className="text-right py-3 px-4 cursor-pointer hover:bg-gray-800 transition-colors"
                onClick={() => handleSort('cpm')}
              >
                <div className="flex items-center justify-end gap-2">
                  CPM ($)
                  <SortIcon field="cpm" />
                </div>
              </th>
              <th 
                className="text-right py-3 px-4 cursor-pointer hover:bg-gray-800 transition-colors"
                onClick={() => handleSort('spend')}
              >
                <div className="flex items-center justify-end gap-2">
                  Spend ($)
                  <SortIcon field="spend" />
                </div>
              </th>
              <th 
                className="text-right py-3 px-4 cursor-pointer hover:bg-gray-800 transition-colors"
                onClick={() => handleSort('reach')}
              >
                <div className="flex items-center justify-end gap-2">
                  Reach
                  <SortIcon field="reach" />
                </div>
              </th>
              <th 
                className="text-right py-3 px-4 cursor-pointer hover:bg-gray-800 transition-colors"
                onClick={() => handleSort('frequency')}
              >
                <div className="flex items-center justify-end gap-2">
                  Frequency
                  <SortIcon field="frequency" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 cursor-pointer hover:bg-gray-800 transition-colors"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center gap-2">
                  Status
                  <SortIcon field="status" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
              >
                <td className="py-3 px-4 text-white font-medium">{item.campaignName}</td>
                <td className="py-3 px-4 text-gray-300">{item.advertiser}</td>
                <td className="py-3 px-4 text-cyan-400">{item.audienceSegment}</td>
                <td className="py-3 px-4 text-right text-gray-300">{item.audienceSize.toLocaleString()}</td>
                <td className="py-3 px-4 text-right text-gray-300">{item.impressions.toLocaleString()}</td>
                <td className="py-3 px-4 text-right text-gray-300">{item.clicks.toLocaleString()}</td>
                <td className="py-3 px-4 text-right text-gray-300">{item.ctr.toFixed(2)}%</td>
                <td className="py-3 px-4 text-right text-gray-300">{item.conversions.toLocaleString()}</td>
                <td className="py-3 px-4 text-right text-gray-300">{item.conversionRate.toFixed(2)}%</td>
                <td className="py-3 px-4 text-right text-gray-300">${item.cpm.toFixed(2)}</td>
                <td className="py-3 px-4 text-right text-gray-300">${item.spend.toFixed(2)}</td>
                <td className="py-3 px-4 text-right text-gray-300">{item.reach.toLocaleString()}</td>
                <td className="py-3 px-4 text-right text-gray-300">{item.frequency.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'active' ? 'bg-green-900 text-green-300' :
                    item.status === 'paused' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-gray-700 text-gray-300'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <div className="text-gray-400">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length} results
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-800 text-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
            >
              Previous
            </button>
            <span className="px-3 py-1 bg-gray-800 text-white rounded">
              {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-800 text-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 