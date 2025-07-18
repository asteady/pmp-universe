'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface ChartConfig {
  xAxis: {
    dataKey: string
    name?: string
  }
  yAxis: {
    dataKey: string
    name?: string
  }
  series: Array<{
    dataKey: string
    name: string
    color: string
  }>
}

interface ChartProps {
  title: string
  data: any[]
  type: 'bar' | 'line' | 'pie' | 'scatter' | 'area'
  height?: number
  config: ChartConfig
}

export function Chart({ title, data, type, height = 300, config }: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !data.length) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const width = canvas.width
    const height = canvas.height
    const padding = 60

    // Set up colors
    const colors = config.series.map(s => s.color)
    
    // Find data ranges
    const allValues = data.flatMap(item => 
      config.series.map(s => item[s.dataKey]).filter(v => typeof v === 'number')
    )
    const maxValue = Math.max(...allValues, 1)
    const minValue = Math.min(...allValues, 0)

    // Draw title
    ctx.fillStyle = '#ffffff'
    ctx.font = '16px Inter, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(title, width / 2, 25)

    // Draw axes
    ctx.strokeStyle = '#374151'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Draw axis labels
    ctx.fillStyle = '#9CA3AF'
    ctx.font = '12px Inter, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(config.xAxis.name || config.xAxis.dataKey, width / 2, height - 10)
    
    ctx.save()
    ctx.translate(20, height / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.fillText(config.yAxis.name || config.yAxis.dataKey, 0, 0)
    ctx.restore()

    // Draw data based on chart type
    if (type === 'bar') {
      const barWidth = (width - 2 * padding) / (data.length * config.series.length)
      const spacing = barWidth * 0.2

      data.forEach((item, index) => {
        config.series.forEach((series, seriesIndex) => {
          const value = item[series.dataKey] || 0
          const barHeight = ((value - minValue) / (maxValue - minValue)) * (height - 2 * padding)
          const x = padding + index * (barWidth * config.series.length) + seriesIndex * barWidth + spacing
          const y = height - padding - barHeight

          ctx.fillStyle = series.color
          ctx.fillRect(x, y, barWidth - spacing, barHeight)
        })
      })
    } else if (type === 'line') {
      config.series.forEach((series, seriesIndex) => {
        ctx.strokeStyle = series.color
        ctx.lineWidth = 2
        ctx.beginPath()

        data.forEach((item, index) => {
          const value = item[series.dataKey] || 0
          const x = padding + (index / (data.length - 1)) * (width - 2 * padding)
          const y = height - padding - ((value - minValue) / (maxValue - minValue)) * (height - 2 * padding)

          if (index === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        })

        ctx.stroke()

        // Draw points
        data.forEach((item, index) => {
          const value = item[series.dataKey] || 0
          const x = padding + (index / (data.length - 1)) * (width - 2 * padding)
          const y = height - padding - ((value - minValue) / (maxValue - minValue)) * (height - 2 * padding)

          ctx.fillStyle = series.color
          ctx.beginPath()
          ctx.arc(x, y, 4, 0, 2 * Math.PI)
          ctx.fill()
        })
      })
    } else if (type === 'scatter') {
      data.forEach((item, index) => {
        const xValue = item[config.xAxis.dataKey] || 0
        const yValue = item[config.yAxis.dataKey] || 0
        
        const x = padding + (xValue / Math.max(...data.map(d => d[config.xAxis.dataKey] || 0))) * (width - 2 * padding)
        const y = height - padding - (yValue / Math.max(...data.map(d => d[config.yAxis.dataKey] || 0))) * (height - 2 * padding)

        ctx.fillStyle = colors[0]
        ctx.beginPath()
        ctx.arc(x, y, 6, 0, 2 * Math.PI)
        ctx.fill()
      })
    }

    // Draw legend
    const legendY = height - 30
    config.series.forEach((series, index) => {
      const x = padding + index * 120
      
      ctx.fillStyle = series.color
      ctx.fillRect(x, legendY, 12, 12)
      
      ctx.fillStyle = '#9CA3AF'
      ctx.font = '12px Inter, sans-serif'
      ctx.textAlign = 'left'
      ctx.fillText(series.name, x + 18, legendY + 9)
    })

  }, [data, type, config, height])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 rounded-lg p-6 border border-gray-700"
    >
      <canvas
        ref={canvasRef}
        width={600}
        height={height}
        className="w-full h-full"
      />
    </motion.div>
  )
} 