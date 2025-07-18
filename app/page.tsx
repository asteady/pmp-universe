'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/dashboard')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-400 via-dark-300 to-dark-200">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4 animate-pulse">
          Infillion Analytics Dashboard
        </h1>
        <p className="text-neon-blue">Loading...</p>
      </div>
    </div>
  )
} 