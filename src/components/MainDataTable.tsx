'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Download, ChevronUp, ChevronDown, Filter } from 'lucide-react'

interface CampaignData {
  id: string
  campaignName: string
  advertiser: string
  startDate: string
  endDate: string
  impressions: number
  clicks: number
  ctr: number
  cpm: number
  cpc: number
  spend: number
  conversions: number
  conversionRate: number
  status: 'active' | 'paused' | 'completed'
}

interface MainDataTableProps {
  data: CampaignData[]
}

export function MainDataTable({ data }: MainDataTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<keyof CampaignData>('campaignName')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredAndSortedData = useMemo(() => {
    let filtered = data.filter(item =>
      item.campaignName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.advertiser.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleSort = (field: keyof CampaignData) => {
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
      'Start Date',
      'End Date',
      'Impressions',
      'Clicks',
      'CTR (%)',
      'CPM ($)',
      'CPC ($)',
      'Conversions',
      'Conversion Rate (%)',
      'Status'
    ]

    const csvContent = [
      headers.join(','),
      ...filteredAndSortedData.map(item => [
        `"${item.campaignName}"`,
        `"${item.advertiser}"`,
        item.startDate,
        item.endDate,
        item.impressions.toLocaleString(),
        item.clicks.toLocaleString(),
        item.ctr.toFixed(2),
        item.cpm.toFixed(2),
        item.cpc.toFixed(2),
        item.conversions.toLocaleString(),
        item.conversionRate.toFixed(2),
        item.status
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'campaign-performance-data.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const SortIcon = ({ field }: { field: keyof CampaignData }) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">Campaign Performance Data (MediaMath)</h3>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
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
              <th className="text-left py-3 px-4">Start Date</th>
              <th className="text-left py-3 px-4">End Date</th>
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
                onClick={() => handleSort('cpm')}
              >
                <div className="flex items-center justify-end gap-2">
                  CPM ($)
                  <SortIcon field="cpm" />
                </div>
              </th>
              <th 
                className="text-right py-3 px-4 cursor-pointer hover:bg-gray-800 transition-colors"
                onClick={() => handleSort('cpc')}
              >
                <div className="flex items-center justify-end gap-2">
                  CPC ($)
                  <SortIcon field="cpc" />
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
                <td className="py-3 px-4 text-gray-300">{item.startDate}</td>
                <td className="py-3 px-4 text-gray-300">{item.endDate}</td>
                <td className="py-3 px-4 text-right text-gray-300">{item.impressions.toLocaleString()}</td>
                <td className="py-3 px-4 text-right text-gray-300">{item.clicks.toLocaleString()}</td>
                <td className="py-3 px-4 text-right text-gray-300">{item.ctr.toFixed(2)}%</td>
                <td className="py-3 px-4 text-right text-gray-300">${item.cpm.toFixed(2)}</td>
                <td className="py-3 px-4 text-right text-gray-300">${item.cpc.toFixed(2)}</td>
                <td className="py-3 px-4 text-right text-gray-300">{item.conversions.toLocaleString()}</td>
                <td className="py-3 px-4 text-right text-gray-300">{item.conversionRate.toFixed(2)}%</td>
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