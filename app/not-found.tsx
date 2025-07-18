import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-400 via-dark-300 to-dark-200 flex items-center justify-center">
      <div className="futuristic-card max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-6">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/dashboard"
          className="futuristic-button inline-block"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
} 