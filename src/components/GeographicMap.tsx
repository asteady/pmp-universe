'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { MapPin, TrendingUp, TrendingDown } from 'lucide-react'

interface GeographicData {
  city: string
  state: string
  impressions: number
  clicks: number
  conversions: number
  revenue: number
  spend: number
  device_type: string
  lat: number
  lng: number
}

interface GeographicMapProps {
  data: any[]
  height?: number
  className?: string
  type?: string
}

export function GeographicMap({ data, height = 400, className = '', type = 'geo' }: GeographicMapProps) {
  const [hoveredPoint, setHoveredPoint] = useState<any>(null)
  const [isClient, setIsClient] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className={`futuristic-card ${className}`} style={{ height }}>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-2xl text-gray-400 mb-2">🗺️</div>
            <div className="text-gray-400">Loading map...</div>
          </div>
        </div>
      </div>
    )
  }

  // Transform data based on type
  const transformedData = data.map((item, index) => {
    if (type === 'geo-device') {
      return {
        city: item.city || `City ${index + 1}`,
        state: item.state || 'CA',
        impressions: item.impressions || 0,
        clicks: item.clicks || 0,
        conversions: item.conversions || 0,
        revenue: item.revenue || 0,
        spend: item.spend || 0,
        device_type: item.device_type || 'Desktop',
        lat: item.lat || 0,
        lng: item.lng || 0
      }
    } else if (type === 'foot-traffic') {
      return {
        city: item.poi_name || `Location ${index + 1}`,
        state: 'CA',
        impressions: item.visits || 0,
        clicks: item.unique_visitors || 0,
        conversions: item.conversion_rate || 0,
        revenue: 0,
        spend: 0,
        device_type: 'Mobile',
        lat: 0,
        lng: 0
      }
    }
    return item
  })

  return (
    <div className={`futuristic-card ${className}`} style={{ height }}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Geographic Performance</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <div className="w-3 h-3 bg-neon-blue rounded-full"></div>
            <span>High Performance</span>
          </div>
        </div>
        
        <div className="relative bg-dark-300 rounded-lg p-4" style={{ height: height - 100 }}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full">
            {transformedData.slice(0, 12).map((point, index) => (
              <motion.div
                key={`${point.city}-${index}`}
                className="relative bg-dark-400 rounded-lg p-3 cursor-pointer border border-gray-600 hover:border-neon-blue transition-all duration-200"
                onMouseEnter={() => setHoveredPoint(point)}
                onMouseLeave={() => setHoveredPoint(null)}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-neon-blue" />
                    <span className="text-xs font-medium text-white">{point.city}</span>
                  </div>
                  <span className="text-xs text-gray-400">{point.state}</span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Impressions:</span>
                    <span className="text-neon-green">{(point.impressions || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Clicks:</span>
                    <span className="text-neon-purple">{(point.clicks || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">CTR:</span>
                    <span className="text-yellow-400">{((point.clicks / point.impressions) * 100).toFixed(2)}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Hover Tooltip */}
          {hoveredPoint && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute bg-dark-200 border border-neon-blue/50 rounded-lg p-4 shadow-xl z-10"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                minWidth: '200px'
              }}
            >
              <div className="text-white font-semibold text-sm">{hoveredPoint.city}, {hoveredPoint.state}</div>
              <div className="text-gray-300 text-xs mt-1">
                <div>Impressions: {(hoveredPoint.impressions || 0).toLocaleString()}</div>
                <div>Clicks: {(hoveredPoint.clicks || 0).toLocaleString()}</div>
                <div>Conversions: {(hoveredPoint.conversions || 0).toLocaleString()}</div>
                <div>Device: {hoveredPoint.device_type}</div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
} 