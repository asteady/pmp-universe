'use client'

import { motion } from 'framer-motion'
import { LeaderboardEntry } from '@/types'
import { Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface LeaderboardProps {
  entries: LeaderboardEntry[]
  title?: string
  className?: string
}

export function Leaderboard({ entries, title = 'Leaderboard', className = '' }: LeaderboardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-400" />
      case 2:
        return <Trophy className="w-5 h-5 text-gray-300" />
      case 3:
        return <Trophy className="w-5 h-5 text-amber-600" />
      default:
        return <span className="text-gray-400 font-bold">{rank}</span>
    }
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) {
      return <TrendingUp className="w-4 h-4 text-green-400" />
    } else if (change < 0) {
      return <TrendingDown className="w-4 h-4 text-red-400" />
    } else {
      return <Minus className="w-4 h-4 text-gray-400" />
    }
  }

  const getChangeColor = (change: number) => {
    if (change > 0) {
      return 'text-green-400'
    } else if (change < 0) {
      return 'text-red-400'
    } else {
      return 'text-gray-400'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`futuristic-card ${className}`}
    >
      <h3 className="text-xl font-semibold text-foreground mb-4">{title}</h3>
      <div className="space-y-2">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 hover:scale-105 ${
              entry.rank <= 3 
                ? 'bg-gradient-to-r from-accent to-primary border border-accent/20' 
                : 'bg-muted/50 hover:bg-muted'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8">
                {getRankIcon(entry.rank)}
              </div>
              <div>
                <h4 className="text-foreground font-medium">{entry.name}</h4>
                <p className="text-sm text-muted">{entry.metric}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-foreground font-semibold">{entry.value}</p>
                <div className="flex items-center space-x-1">
                  {getChangeIcon(entry.change)}
                  <span className={`text-xs ${getChangeColor(entry.change)}`}>
                    {entry.change > 0 ? '+' : ''}{entry.change}%
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// Mini leaderboard for compact display
interface MiniLeaderboardProps {
  entries: LeaderboardEntry[]
  title?: string
  maxEntries?: number
}

export function MiniLeaderboard({ entries, title = 'Top Performers', maxEntries = 5 }: MiniLeaderboardProps) {
  const topEntries = entries.slice(0, maxEntries)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="futuristic-card p-4"
    >
      <h4 className="text-lg font-semibold text-white mb-3">{title}</h4>
      <div className="space-y-2">
        {topEntries.map((entry, index) => (
          <motion.div
            key={entry.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className="flex items-center justify-between py-2"
          >
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-bold ${
                entry.rank === 1 ? 'text-yellow-400' :
                entry.rank === 2 ? 'text-gray-300' :
                entry.rank === 3 ? 'text-amber-600' : 'text-gray-400'
              }`}>
                #{entry.rank}
              </span>
              <span className="text-white text-sm truncate max-w-24">{entry.name}</span>
            </div>
            <span className="text-neon-blue font-semibold text-sm">{entry.value}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
} 