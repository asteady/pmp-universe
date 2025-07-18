'use client'

import { useEffect } from 'react'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-400 via-dark-300 to-dark-200 flex items-center justify-center">
      <div className="futuristic-card max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Dashboard Error</h2>
        <p className="text-gray-400 mb-6">
          {error.message || 'An error occurred while loading the dashboard'}
        </p>
        <button
          onClick={reset}
          className="futuristic-button"
        >
          Reload Dashboard
        </button>
      </div>
    </div>
  )
} 