'use client'

import { motion } from 'framer-motion'
import { Badge as BadgeType } from '@/types'

interface BadgeProps {
  badge: BadgeType
  className?: string
}

export function Badge({ badge, className = '' }: BadgeProps) {
  const isAchieved = badge.achieved
  const progressPercentage = (badge.progress / badge.maxProgress) * 100

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`futuristic-card p-4 ${className} ${isAchieved ? 'neon-glow' : ''}`}
    >
      <div className="flex items-center space-x-3">
        <div className={`text-2xl ${isAchieved ? 'animate-bounce' : ''}`}>
          {badge.icon}
        </div>
        <div className="flex-1">
          <h4 className={`text-lg font-semibold ${isAchieved ? 'text-white' : 'text-gray-400'}`}>
            {badge.name}
          </h4>
          <p className="text-sm text-gray-500 mb-2">
            {badge.description}
          </p>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className={`h-2 rounded-full ${
                isAchieved 
                  ? 'bg-gradient-to-r from-neon-green to-emerald-500' 
                  : 'bg-gradient-to-r from-neon-blue to-cyan-500'
              }`}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Progress: {badge.progress}</span>
            <span>Goal: {badge.maxProgress}</span>
          </div>
        </div>
        {isAchieved && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-2xl"
          >
            🏆
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

// Badge collection component
interface BadgeCollectionProps {
  badges: BadgeType[]
  title?: string
}

export function BadgeCollection({ badges, title = 'Achievements' }: BadgeCollectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge) => (
          <Badge key={badge.id} badge={badge} />
        ))}
      </div>
    </div>
  )
} 