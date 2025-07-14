'use client'

import { useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line, Bar, Doughnut, Scatter } from 'react-chartjs-2'
import { motion } from 'framer-motion'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface ChartProps {
  type: 'line' | 'bar' | 'doughnut' | 'scatter'
  data: any
  options?: any
  height?: number
  className?: string
}

export function Chart({ type, data, options = {}, height = 300, className = '' }: ChartProps) {
  const chartRef = useRef<any>(null)

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#ffffff',
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#00d4ff',
        borderWidth: 1,
        cornerRadius: 8
      }
    },
    scales: type !== 'doughnut' ? {
      x: {
        ticks: {
          color: '#9ca3af',
          font: {
            size: 11
          }
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.1)'
        }
      },
      y: {
        ticks: {
          color: '#9ca3af',
          font: {
            size: 11
          }
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.1)'
        }
      }
    } : undefined
  }

  const mergedOptions = { ...defaultOptions, ...options }

  const renderChart = () => {
    switch (type) {
      case 'line':
        return <Line ref={chartRef} data={data} options={mergedOptions} />
      case 'bar':
        return <Bar ref={chartRef} data={data} options={mergedOptions} />
      case 'doughnut':
        return <Doughnut ref={chartRef} data={data} options={mergedOptions} />
      case 'scatter':
        return <Scatter ref={chartRef} data={data} options={mergedOptions} />
      default:
        return <div>Unsupported chart type</div>
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`futuristic-card ${className}`}
      style={{ height }}
    >
      <div className="h-full w-full p-4">
        {renderChart()}
      </div>
    </motion.div>
  )
} 