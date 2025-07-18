import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Infillion Analytics Dashboard',
  description: 'Advanced advertising analytics dashboard for Infillion clients and internal stakeholders',
  keywords: 'analytics, advertising, dashboard, infillion, mediamath',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gradient-to-br from-dark-400 via-dark-300 to-dark-200 min-h-screen`}>
        {children}
      </body>
    </html>
  )
} 