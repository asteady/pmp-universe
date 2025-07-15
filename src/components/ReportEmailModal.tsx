'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Calendar, Download, Share2, Clock, Users, BarChart3 } from 'lucide-react'

interface ReportEmailModalProps {
  isOpen: boolean
  onClose: () => void
  reportType?: string
}

export function ReportEmailModal({ isOpen, onClose, reportType = 'Main Dashboard' }: ReportEmailModalProps) {
  const [email, setEmail] = useState('')
  const [frequency, setFrequency] = useState('weekly')
  const [reportTypes, setReportTypes] = useState<string[]>([reportType])
  const [isSending, setIsSending] = useState(false)

  const availableReports = [
    'Main Dashboard',
    'New to Brand',
    'Viewability',
    'Geo/Device',
    'Placements',
    'Foot Traffic',
    'Audiences',
    'Custom Report'
  ]

  const frequencies = [
    { value: 'daily', label: 'Daily', icon: Clock },
    { value: 'weekly', label: 'Weekly', icon: Calendar },
    { value: 'monthly', label: 'Monthly', icon: Calendar },
    { value: 'quarterly', label: 'Quarterly', icon: Calendar }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSending(false)
    onClose()
    // In a real app, this would send the email
  }

  const toggleReportType = (type: string) => {
    setReportTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="futuristic-card w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Mail className="w-6 h-6 text-neon-blue" />
                <h2 className="text-xl font-semibold text-white">Email Report</h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-700/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  required
                  className="w-full bg-dark-200 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                />
              </div>

              {/* Report Types */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Report Types
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {availableReports.map((type) => (
                    <label
                      key={type}
                      className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                        reportTypes.includes(type)
                          ? 'border-neon-blue bg-neon-blue/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={reportTypes.includes(type)}
                        onChange={() => toggleReportType(type)}
                        className="text-neon-blue focus:ring-neon-blue"
                      />
                      <span className="text-sm text-white">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Frequency */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Frequency
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {frequencies.map((freq) => {
                    const Icon = freq.icon
                    return (
                      <label
                        key={freq.value}
                        className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                          frequency === freq.value
                            ? 'border-neon-blue bg-neon-blue/10'
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        <input
                          type="radio"
                          name="frequency"
                          value={freq.value}
                          checked={frequency === freq.value}
                          onChange={(e) => setFrequency(e.target.value)}
                          className="text-neon-blue focus:ring-neon-blue"
                        />
                        <Icon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-white">{freq.label}</span>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Additional Options */}
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="text-neon-blue focus:ring-neon-blue" />
                  <span className="text-sm text-gray-300">Include executive summary</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="text-neon-blue focus:ring-neon-blue" />
                  <span className="text-sm text-gray-300">Include raw data export</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="text-neon-blue focus:ring-neon-blue" />
                  <span className="text-sm text-gray-300">Send to team members</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-600">
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                  <button
                    type="submit"
                    disabled={isSending || !email}
                    className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-neon-blue to-cyan-500 text-white rounded-lg font-medium hover:from-cyan-500 hover:to-neon-blue transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4" />
                        <span>Send Report</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 