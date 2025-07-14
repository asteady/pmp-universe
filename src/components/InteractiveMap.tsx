'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { MapPin, TrendingUp } from 'lucide-react'
import 'leaflet/dist/leaflet.css'

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false })
const CircleMarker = dynamic(() => import('react-leaflet').then(mod => mod.CircleMarker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false })
const ZoomControl = dynamic(() => import('react-leaflet').then(mod => mod.ZoomControl), { ssr: false })

interface CityData {
  id: string
  name: string
  lat: number
  lng: number
  verifiedVisits: number
  impressions: number
  growth: number
  subRegions?: {
    name: string
    visits: number
    lat: number
    lng: number
  }[]
}

const mockCityData: CityData[] = [
  {
    id: 'nyc',
    name: 'New York',
    lat: 40.7128,
    lng: -74.0060,
    verifiedVisits: 2847,
    impressions: 3200000,
    growth: 12.5,
    subRegions: [
      { name: 'Manhattan', visits: 1247, lat: 40.7589, lng: -73.9851 },
      { name: 'Brooklyn', visits: 892, lat: 40.6782, lng: -73.9442 },
      { name: 'Queens', visits: 708, lat: 40.7282, lng: -73.7949 }
    ]
  },
  {
    id: 'la',
    name: 'Los Angeles',
    lat: 34.0522,
    lng: -118.2437,
    verifiedVisits: 2156,
    impressions: 2800000,
    growth: 8.3,
    subRegions: [
      { name: 'Downtown LA', visits: 987, lat: 34.0522, lng: -118.2437 },
      { name: 'Hollywood', visits: 756, lat: 34.0928, lng: -118.3287 },
      { name: 'Santa Monica', visits: 413, lat: 34.0195, lng: -118.4912 }
    ]
  },
  {
    id: 'chicago',
    name: 'Chicago',
    lat: 41.8781,
    lng: -87.6298,
    verifiedVisits: 1892,
    impressions: 2100000,
    growth: 15.7,
    subRegions: [
      { name: 'Loop', visits: 823, lat: 41.8781, lng: -87.6298 },
      { name: 'River North', visits: 654, lat: 41.8925, lng: -87.6264 },
      { name: 'Lincoln Park', visits: 415, lat: 41.9217, lng: -87.6334 }
    ]
  },
  {
    id: 'houston',
    name: 'Houston',
    lat: 29.7604,
    lng: -95.3698,
    verifiedVisits: 1654,
    impressions: 1800000,
    growth: 6.2,
    subRegions: [
      { name: 'Downtown', visits: 723, lat: 29.7604, lng: -95.3698 },
      { name: 'Galleria', visits: 567, lat: 29.7375, lng: -95.4619 },
      { name: 'Rice Village', visits: 364, lat: 29.7218, lng: -95.4181 }
    ]
  },
  {
    id: 'phoenix',
    name: 'Phoenix',
    lat: 33.4484,
    lng: -112.0740,
    verifiedVisits: 1432,
    impressions: 1600000,
    growth: 9.8,
    subRegions: [
      { name: 'Downtown', visits: 634, lat: 33.4484, lng: -112.0740 },
      { name: 'Scottsdale', visits: 498, lat: 33.4942, lng: -111.9261 },
      { name: 'Tempe', visits: 300, lat: 33.4255, lng: -111.9400 }
    ]
  },
  {
    id: 'philadelphia',
    name: 'Philadelphia',
    lat: 39.9526,
    lng: -75.1652,
    verifiedVisits: 1321,
    impressions: 1500000,
    growth: 11.4,
    subRegions: [
      { name: 'Center City', visits: 587, lat: 39.9526, lng: -75.1652 },
      { name: 'University City', visits: 456, lat: 39.9522, lng: -75.1932 },
      { name: 'Fishtown', visits: 278, lat: 39.9726, lng: -75.1282 }
    ]
  },
  {
    id: 'san-antonio',
    name: 'San Antonio',
    lat: 29.4241,
    lng: -98.4936,
    verifiedVisits: 1187,
    impressions: 1300000,
    growth: 7.6,
    subRegions: [
      { name: 'Downtown', visits: 523, lat: 29.4241, lng: -98.4936 },
      { name: 'Pearl District', visits: 387, lat: 29.4478, lng: -98.4858 },
      { name: 'King William', visits: 277, lat: 29.4168, lng: -98.4898 }
    ]
  },
  {
    id: 'san-diego',
    name: 'San Diego',
    lat: 32.7157,
    lng: -117.1611,
    verifiedVisits: 1098,
    impressions: 1200000,
    growth: 13.2,
    subRegions: [
      { name: 'Gaslamp Quarter', visits: 487, lat: 32.7157, lng: -117.1611 },
      { name: 'La Jolla', visits: 356, lat: 32.8328, lng: -117.2713 },
      { name: 'Pacific Beach', visits: 255, lat: 32.7978, lng: -117.2344 }
    ]
  },
  {
    id: 'dallas',
    name: 'Dallas',
    lat: 32.7767,
    lng: -96.7970,
    verifiedVisits: 987,
    impressions: 1100000,
    growth: 5.9,
    subRegions: [
      { name: 'Downtown', visits: 432, lat: 32.7767, lng: -96.7970 },
      { name: 'Deep Ellum', visits: 298, lat: 32.7833, lng: -96.7833 },
      { name: 'Bishop Arts', visits: 257, lat: 32.7500, lng: -96.8167 }
    ]
  },
  {
    id: 'san-jose',
    name: 'San Jose',
    lat: 37.3382,
    lng: -121.8863,
    verifiedVisits: 876,
    impressions: 1000000,
    growth: 16.8,
    subRegions: [
      { name: 'Downtown', visits: 387, lat: 37.3382, lng: -121.8863 },
      { name: 'Santana Row', visits: 289, lat: 37.3219, lng: -121.9477 },
      { name: 'Willow Glen', visits: 200, lat: 37.3047, lng: -121.8897 }
    ]
  },
  {
    id: 'austin',
    name: 'Austin',
    lat: 30.2672,
    lng: -97.7431,
    verifiedVisits: 765,
    impressions: 900000,
    growth: 18.4,
    subRegions: [
      { name: 'Downtown', visits: 334, lat: 30.2672, lng: -97.7431 },
      { name: 'South Congress', visits: 231, lat: 30.2500, lng: -97.7500 },
      { name: 'East Austin', visits: 200, lat: 30.2667, lng: -97.7333 }
    ]
  },
  {
    id: 'jacksonville',
    name: 'Jacksonville',
    lat: 30.3322,
    lng: -81.6557,
    verifiedVisits: 654,
    impressions: 800000,
    growth: 4.7,
    subRegions: [
      { name: 'Downtown', visits: 287, lat: 30.3322, lng: -81.6557 },
      { name: 'Riverside', visits: 198, lat: 30.3167, lng: -81.6833 },
      { name: 'San Marco', visits: 169, lat: 30.3167, lng: -81.6500 }
    ]
  },
  {
    id: 'fort-worth',
    name: 'Fort Worth',
    lat: 32.7555,
    lng: -97.3308,
    verifiedVisits: 543,
    impressions: 700000,
    growth: 8.9,
    subRegions: [
      { name: 'Downtown', visits: 238, lat: 32.7555, lng: -97.3308 },
      { name: 'Stockyards', visits: 165, lat: 32.7883, lng: -97.3475 },
      { name: 'West 7th', visits: 140, lat: 32.7500, lng: -97.3333 }
    ]
  },
  {
    id: 'columbus',
    name: 'Columbus',
    lat: 39.9612,
    lng: -82.9988,
    verifiedVisits: 432,
    impressions: 600000,
    growth: 12.1,
    subRegions: [
      { name: 'Downtown', visits: 189, lat: 39.9612, lng: -82.9988 },
      { name: 'Short North', visits: 143, lat: 39.9833, lng: -83.0000 },
      { name: 'German Village', visits: 100, lat: 39.9500, lng: -82.9833 }
    ]
  },
  {
    id: 'charlotte',
    name: 'Charlotte',
    lat: 35.2271,
    lng: -80.8431,
    verifiedVisits: 398,
    impressions: 550000,
    growth: 9.3,
    subRegions: [
      { name: 'Uptown', visits: 174, lat: 35.2271, lng: -80.8431 },
      { name: 'South End', visits: 124, lat: 35.2167, lng: -80.8500 },
      { name: 'NoDa', visits: 100, lat: 35.2333, lng: -80.8167 }
    ]
  },
  {
    id: 'san-francisco',
    name: 'San Francisco',
    lat: 37.7749,
    lng: -122.4194,
    verifiedVisits: 365,
    impressions: 500000,
    growth: 14.7,
    subRegions: [
      { name: 'Financial District', visits: 160, lat: 37.7749, lng: -122.4194 },
      { name: 'Mission District', visits: 105, lat: 37.7599, lng: -122.4148 },
      { name: 'North Beach', visits: 100, lat: 37.8099, lng: -122.4103 }
    ]
  },
  {
    id: 'indianapolis',
    name: 'Indianapolis',
    lat: 39.7684,
    lng: -86.1581,
    verifiedVisits: 321,
    impressions: 450000,
    growth: 6.8,
    subRegions: [
      { name: 'Downtown', visits: 141, lat: 39.7684, lng: -86.1581 },
      { name: 'Broad Ripple', visits: 95, lat: 39.8667, lng: -86.1333 },
      { name: 'Fountain Square', visits: 85, lat: 39.7500, lng: -86.1333 }
    ]
  },
  {
    id: 'seattle',
    name: 'Seattle',
    lat: 47.6062,
    lng: -122.3321,
    verifiedVisits: 298,
    impressions: 400000,
    growth: 11.9,
    subRegions: [
      { name: 'Downtown', visits: 131, lat: 47.6062, lng: -122.3321 },
      { name: 'Capitol Hill', visits: 89, lat: 47.6167, lng: -122.3167 },
      { name: 'Fremont', visits: 78, lat: 47.6500, lng: -122.3500 }
    ]
  },
  {
    id: 'denver',
    name: 'Denver',
    lat: 39.7392,
    lng: -104.9903,
    verifiedVisits: 276,
    impressions: 380000,
    growth: 13.5,
    subRegions: [
      { name: 'LoDo', visits: 121, lat: 39.7392, lng: -104.9903 },
      { name: 'RiNo', visits: 78, lat: 39.7667, lng: -104.9833 },
      { name: 'Highlands', visits: 77, lat: 39.7667, lng: -105.0167 }
    ]
  },
  {
    id: 'washington',
    name: 'Washington DC',
    lat: 38.9072,
    lng: -77.0369,
    verifiedVisits: 254,
    impressions: 350000,
    growth: 7.2,
    subRegions: [
      { name: 'Downtown', visits: 112, lat: 38.9072, lng: -77.0369 },
      { name: 'Georgetown', visits: 76, lat: 38.9097, lng: -77.0653 },
      { name: 'Adams Morgan', visits: 66, lat: 38.9167, lng: -77.0333 }
    ]
  }
]

interface InteractiveMapProps {
  className?: string
}

export function InteractiveMap({ className = "" }: InteractiveMapProps) {
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const getMarkerColor = (visits: number) => {
    if (visits > 2000) return '#10b981' // neon-green
    if (visits > 1000) return '#00d4ff' // neon-blue
    if (visits > 500) return '#8b5cf6' // neon-purple
    return '#ec4899' // neon-pink
  }

  const getMarkerSize = (visits: number) => {
    if (visits > 2000) return 12
    if (visits > 1000) return 10
    if (visits > 500) return 8
    return 6
  }

  if (!isClient) {
    return (
      <div className={`futuristic-card ${className}`}>
        <div className="h-96 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-neon-blue mx-auto mb-4 animate-pulse" />
            <p className="text-gray-400">Loading interactive map...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`futuristic-card ${className}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Geographic Performance</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-neon-green"></div>
              <span>2K+ visits</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-neon-blue"></div>
              <span>1K+ visits</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-neon-purple"></div>
              <span>500+ visits</span>
            </div>
          </div>
        </div>
        
        <div className="h-96 rounded-lg overflow-hidden border border-neon-blue/20">
          <MapContainer
            center={[39.8283, -98.5795]}
            zoom={4}
            className="h-full w-full"
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            <ZoomControl position="bottomright" />
            
            {mockCityData.map((city) => (
              <CircleMarker
                key={city.id}
                center={[city.lat, city.lng]}
                radius={getMarkerSize(city.verifiedVisits)}
                fillColor={getMarkerColor(city.verifiedVisits)}
                color={getMarkerColor(city.verifiedVisits)}
                weight={2}
                opacity={0.8}
                fillOpacity={0.6}
                eventHandlers={{
                  click: () => setSelectedCity(city),
                  mouseover: (e) => {
                    const layer = e.target
                    layer.setRadius(getMarkerSize(city.verifiedVisits) + 2)
                    layer.setOpacity(1)
                  },
                  mouseout: (e) => {
                    const layer = e.target
                    layer.setRadius(getMarkerSize(city.verifiedVisits))
                    layer.setOpacity(0.8)
                  }
                }}
              >
                <Popup className="custom-popup">
                  <div className="p-2">
                    <h3 className="font-semibold text-gray-900 mb-2">{city.name}</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Verified Visits:</span>
                        <span className="font-semibold">{city.verifiedVisits.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Impressions:</span>
                        <span className="font-semibold">{(city.impressions / 1000000).toFixed(1)}M</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-3 h-3 text-green-500" />
                        <span className="text-green-500 text-xs">+{city.growth}%</span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        {/* City Detail Panel */}
        {selectedCity && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-4 futuristic-card p-4 bg-gradient-to-r from-dark-300 to-dark-200 border border-neon-blue/20"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-lg font-semibold text-white">{selectedCity.name}</h4>
              <button
                onClick={() => setSelectedCity(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-neon-blue">
                  {selectedCity.verifiedVisits.toLocaleString()}
                </p>
                <p className="text-sm text-gray-400">Verified Visits</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-neon-green">
                  {(selectedCity.impressions / 1000000).toFixed(1)}M
                </p>
                <p className="text-sm text-gray-400">Impressions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-neon-purple">
                  +{selectedCity.growth}%
                </p>
                <p className="text-sm text-gray-400">Growth</p>
              </div>
            </div>

            {selectedCity.subRegions && (
              <div>
                <h5 className="text-sm font-semibold text-white mb-2">Sub-Regions</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {selectedCity.subRegions.map((region, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-800/50 rounded">
                      <span className="text-sm text-gray-300">{region.name}</span>
                      <span className="text-sm font-semibold text-neon-blue">{region.visits}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
} 