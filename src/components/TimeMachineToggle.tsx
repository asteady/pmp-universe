'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight, History } from 'lucide-react'

interface TimeMachineToggleProps {
  onToggle: (mode: 'current' | 'previous') => void
  delta?: number
  className?: string
}

export function TimeMachineToggle({ onToggle, delta = 0, className = '' }: TimeMachineToggleProps) {
  const [mode, setMode] = useState<'current' | 'previous'>('current')

  const handleToggle = () => {
    const newMode = mode === 'current' ? 'previous' : 'current'
    setMode(newMode)
    onToggle(newMode)
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <button
        onClick={handleToggle}
        className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 glass border border-neon-blue/30 shadow hover:scale-105 ${mode === 'current' ? 'bg-neon-blue/20 text-neon-blue' : 'bg-gray-700/40 text-gray-300'}`}
      >
        <History className="w-4 h-4 mr-2" />
        {mode === 'current' ? 'Last 30 Days' : 'Prior 30 Days'}
      </button>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-1"
      >
        {delta !== 0 && (
          <>
            {delta > 0 ? (
              <ArrowUpRight className="w-4 h-4 text-neon-green" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-neon-pink" />
            )}
            <span className={`font-bold ${delta > 0 ? 'text-neon-green' : 'text-neon-pink'}`}>{Math.abs(delta).toFixed(1)}%</span>
          </>
        )}
      </motion.div>
    </div>
  )
} 