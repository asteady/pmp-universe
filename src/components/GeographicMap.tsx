'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface MapPoint {
  id: string
  lat: number
  lng: number
  city: string
  state: string
  impressions: number
  clicks: number
  conversions: number
  device_type: string
  intensity: number
}

interface GeographicMapProps {
  className?: string
}

// Generate realistic map points for major US cities
const generateMapPoints = (): MapPoint[] => {
  const cities = [
    { name: 'New York', lat: 40.7128, lng: -74.0060, state: 'NY' },
    { name: 'Los Angeles', lat: 34.0522, lng: -118.2437, state: 'CA' },
    { name: 'Chicago', lat: 41.8781, lng: -87.6298, state: 'IL' },
    { name: 'Houston', lat: 29.7604, lng: -95.3698, state: 'TX' },
    { name: 'Phoenix', lat: 33.4484, lng: -112.0740, state: 'AZ' },
    { name: 'Philadelphia', lat: 39.9526, lng: -75.1652, state: 'PA' },
    { name: 'San Antonio', lat: 29.4241, lng: -98.4936, state: 'TX' },
    { name: 'San Diego', lat: 32.7157, lng: -117.1611, state: 'CA' },
    { name: 'Dallas', lat: 32.7767, lng: -96.7970, state: 'TX' },
    { name: 'San Jose', lat: 37.3382, lng: -121.8863, state: 'CA' },
    { name: 'Austin', lat: 30.2672, lng: -97.7431, state: 'TX' },
    { name: 'Jacksonville', lat: 30.3322, lng: -81.6557, state: 'FL' },
    { name: 'Fort Worth', lat: 32.7555, lng: -97.3308, state: 'TX' },
    { name: 'Columbus', lat: 39.9612, lng: -82.9988, state: 'OH' },
    { name: 'Charlotte', lat: 35.2271, lng: -80.8431, state: 'NC' },
    { name: 'San Francisco', lat: 37.7749, lng: -122.4194, state: 'CA' },
    { name: 'Indianapolis', lat: 39.7684, lng: -86.1581, state: 'IN' },
    { name: 'Seattle', lat: 47.6062, lng: -122.3321, state: 'WA' },
    { name: 'Denver', lat: 39.7392, lng: -104.9903, state: 'CO' },
    { name: 'Washington', lat: 38.9072, lng: -77.0369, state: 'DC' },
    { name: 'Boston', lat: 42.3601, lng: -71.0589, state: 'MA' },
    { name: 'El Paso', lat: 31.7619, lng: -106.4850, state: 'TX' },
    { name: 'Nashville', lat: 36.1627, lng: -86.7816, state: 'TN' },
    { name: 'Detroit', lat: 42.3314, lng: -83.0458, state: 'MI' },
    { name: 'Oklahoma City', lat: 35.4676, lng: -97.5164, state: 'OK' },
    { name: 'Portland', lat: 45.5152, lng: -122.6784, state: 'OR' },
    { name: 'Las Vegas', lat: 36.1699, lng: -115.1398, state: 'NV' },
    { name: 'Memphis', lat: 35.1495, lng: -90.0490, state: 'TN' },
    { name: 'Louisville', lat: 38.2527, lng: -85.7585, state: 'KY' },
    { name: 'Baltimore', lat: 39.2904, lng: -76.6122, state: 'MD' }
  ]

  return cities.map((city, index) => ({
    id: `point_${index}`,
    lat: city.lat,
    lng: city.lng,
    city: city.name,
    state: city.state,
    impressions: Math.floor(Math.random() * 500000) + 50000,
    clicks: Math.floor(Math.random() * 25000) + 1000,
    conversions: Math.floor(Math.random() * 2000) + 100,
    device_type: ['Desktop', 'Mobile', 'Tablet', 'Connected TV'][Math.floor(Math.random() * 4)],
    intensity: Math.random() * 0.8 + 0.2
  }))
}

export function GeographicMap({ className = '' }: GeographicMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mapPoints, setMapPoints] = useState<MapPoint[]>([])
  const [hoveredPoint, setHoveredPoint] = useState<MapPoint | null>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsClient(true)
    const timer = setTimeout(() => {
      setMapPoints(generateMapPoints())
      setIsLoading(false)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  if (!isClient || isLoading) {
    return (
      <div className={`futuristic-card p-6 ${className}`}>
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full animate-spin"></div>
            <div className="text-gray-400 text-sm">Loading interactive map...</div>
          </div>
        </div>
      </div>
    )
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !isClient) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw USA outline
    ctx.save()
    ctx.translate(pan.x, pan.y)
    ctx.scale(zoom, zoom)

    // Draw heatmap background
    drawHeatmap(ctx, canvas.width, canvas.height)

    // Draw map points
    mapPoints.forEach(point => {
      drawMapPoint(ctx, point, hoveredPoint?.id === point.id)
    })

    ctx.restore()
  }, [mapPoints, hoveredPoint, zoom, pan, isClient])

  const drawHeatmap = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Create gradient for heatmap effect
    const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width / 2)
    
    mapPoints.forEach(point => {
      const x = (point.lng + 125) * (width / 50) // Convert longitude to x
      const y = (50 - point.lat) * (height / 30) // Convert latitude to y
      
      const intensity = point.intensity
      const alpha = intensity * 0.3
      
      const pointGradient = ctx.createRadialGradient(x, y, 0, x, y, 100)
      pointGradient.addColorStop(0, `rgba(255, 0, 0, ${alpha})`)
      pointGradient.addColorStop(0.5, `rgba(255, 165, 0, ${alpha * 0.7})`)
      pointGradient.addColorStop(1, `rgba(0, 0, 255, ${alpha * 0.3})`)
      
      ctx.fillStyle = pointGradient
      ctx.fillRect(x - 50, y - 50, 100, 100)
    })
  }

  const drawMapPoint = (ctx: CanvasRenderingContext2D, point: MapPoint, isHovered: boolean) => {
    const x = (point.lng + 125) * (ctx.canvas.width / 50)
    const y = (50 - point.lat) * (ctx.canvas.height / 30)
    
    const radius = isHovered ? 8 : 6
    const alpha = isHovered ? 1 : 0.8

    // Draw point
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`
    ctx.fill()
    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw pulse effect for hovered point
    if (isHovered) {
      ctx.beginPath()
      ctx.arc(x, y, radius + 10, 0, 2 * Math.PI)
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)'
      ctx.lineWidth = 2
      ctx.stroke()
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (isDragging) {
      const deltaX = x - lastMousePos.x
      const deltaY = y - lastMousePos.y
      setPan(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }))
      setLastMousePos({ x, y })
    } else {
      // Check for hover
      const transformedX = (x - pan.x) / zoom
      const transformedY = (y - pan.y) / zoom
      
      const hovered = mapPoints.find(point => {
        const pointX = (point.lng + 125) * (canvas.width / 50)
        const pointY = (50 - point.lat) * (canvas.height / 30)
        const distance = Math.sqrt((transformedX - pointX) ** 2 + (transformedY - pointY) ** 2)
        return distance < 20
      })
      
      setHoveredPoint(hovered || null)
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true)
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      setLastMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    setZoom(prev => Math.max(0.5, Math.min(3, prev * delta)))
  }

  return (
    <div className={`futuristic-card p-6 ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">Geographic Performance Heatmap</h3>
        <p className="text-sm text-gray-400">Interactive map showing traffic density across major US cities</p>
      </div>
      
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full h-96 border border-gray-600 rounded-lg cursor-grab active:cursor-grabbing"
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        />
        
        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-dark-200/90 backdrop-blur-sm p-3 rounded-lg border border-gray-600">
          <div className="text-xs text-gray-300 mb-2">Traffic Density</div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-xs text-gray-400">High</span>
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span className="text-xs text-gray-400">Medium</span>
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-xs text-gray-400">Low</span>
          </div>
        </div>

        {/* Tooltip */}
        {hoveredPoint && (
          <div className="absolute bg-dark-200/95 backdrop-blur-sm p-3 rounded-lg border border-neon-blue shadow-lg text-white text-sm">
            <div className="font-semibold">{hoveredPoint.city}, {hoveredPoint.state}</div>
            <div className="text-gray-300">
              <div>Impressions: {hoveredPoint.impressions.toLocaleString()}</div>
              <div>Clicks: {hoveredPoint.clicks.toLocaleString()}</div>
              <div>Conversions: {hoveredPoint.conversions.toLocaleString()}</div>
              <div>Device: {hoveredPoint.device_type}</div>
            </div>
          </div>
        )}

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button
            onClick={() => setZoom(prev => Math.min(3, prev * 1.2))}
            className="w-8 h-8 bg-dark-200/90 border border-neon-blue rounded flex items-center justify-center text-neon-blue hover:bg-neon-blue hover:text-white transition-colors"
          >
            +
          </button>
          <button
            onClick={() => setZoom(prev => Math.max(0.5, prev * 0.8))}
            className="w-8 h-8 bg-dark-200/90 border border-neon-blue rounded flex items-center justify-center text-neon-blue hover:bg-neon-blue hover:text-white transition-colors"
          >
            −
          </button>
          <button
            onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }) }}
            className="w-8 h-8 bg-dark-200/90 border border-neon-blue rounded flex items-center justify-center text-neon-blue hover:bg-neon-blue hover:text-white transition-colors"
            title="Reset View"
          >
            ⌂
          </button>
        </div>
      </div>
    </div>
  )
} 