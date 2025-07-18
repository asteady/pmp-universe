'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Calendar, Download, Share2, Clock, Users, BarChart3, Code, Key, Database, Zap } from 'lucide-react'

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
  const [showApiSection, setShowApiSection] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [webhookUrl, setWebhookUrl] = useState('')
  const [dataFormat, setDataFormat] = useState('json')

  const availableReports = [
    'Main Dashboard',
    'New to Brand',
    'Viewability',
    'Geo/Device',
    'Placements',
    'Foot Traffic',
    'Audience Insights Analytics',
    'Custom Report'
  ]

  const frequencies = [
    { value: 'daily', label: 'Daily', icon: Clock },
    { value: 'weekly', label: 'Weekly', icon: Calendar },
    { value: 'monthly', label: 'Monthly', icon: Calendar },
    { value: 'quarterly', label: 'Quarterly', icon: Calendar }
  ]

  const dataFormats = [
    { value: 'json', label: 'JSON', icon: Code },
    { value: 'csv', label: 'CSV', icon: Database },
    { value: 'xml', label: 'XML', icon: Code }
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

  const generateApiKey = () => {
    const key = 'inf_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36)
    setApiKey(key)
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
            className="futuristic-card w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-8 px-6 pt-6">
              <div className="flex items-center space-x-3">
                <Mail className="w-6 h-6 text-neon-blue" />
                <h2 className="text-xl font-semibold text-white">Report Configuration</h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-700/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 px-6 pb-6">
              {/* Email Configuration Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white border-b border-gray-600 pb-2">Email Delivery</h3>
                
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
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
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Report Types
                  </label>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {availableReports.map((type) => (
                      <label
                        key={type}
                        className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-colors ${
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
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Frequency
                  </label>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {frequencies.map((freq) => {
                      const Icon = freq.icon
                      return (
                        <label
                          key={freq.value}
                          className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-colors ${
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
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-300">Additional Options</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center space-x-3 p-3 rounded-lg border border-gray-600 hover:border-gray-500">
                      <input type="checkbox" className="text-neon-blue focus:ring-neon-blue" />
                      <span className="text-sm text-gray-300">Include executive summary</span>
                    </label>
                    <label className="flex items-center space-x-3 p-3 rounded-lg border border-gray-600 hover:border-gray-500">
                      <input type="checkbox" className="text-neon-blue focus:ring-neon-blue" />
                      <span className="text-sm text-gray-300">Include raw data export</span>
                    </label>
                    <label className="flex items-center space-x-3 p-3 rounded-lg border border-gray-600 hover:border-gray-500">
                      <input type="checkbox" className="text-neon-blue focus:ring-neon-blue" />
                      <span className="text-sm text-gray-300">Send to team members</span>
                    </label>
                    <label className="flex items-center space-x-3 p-3 rounded-lg border border-gray-600 hover:border-gray-500">
                      <input type="checkbox" className="text-neon-blue focus:ring-neon-blue" />
                      <span className="text-sm text-gray-300">Include performance alerts</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* API Integration Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-600 pb-2">
                  <h3 className="text-lg font-semibold text-white">API Integration</h3>
                  <button
                    type="button"
                    onClick={() => setShowApiSection(!showApiSection)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    <Zap className="w-4 h-4" />
                    <span>{showApiSection ? 'Hide' : 'Show'} API Settings</span>
                  </button>
                </div>

                {showApiSection && (
                  <div className="space-y-6 p-6 bg-dark-300 rounded-lg border border-gray-600">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* API Key */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                          API Key
                        </label>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="Generate or enter API key"
                            className="flex-1 bg-dark-200 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                          />
                          <button
                            type="button"
                            onClick={generateApiKey}
                            className="px-4 py-3 bg-neon-blue hover:bg-cyan-500 text-white rounded-lg transition-colors"
                          >
                            <Key className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">Use this key to authenticate API requests</p>
                      </div>

                      {/* Webhook URL */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                          Webhook URL
                        </label>
                        <input
                          type="url"
                          value={webhookUrl}
                          onChange={(e) => setWebhookUrl(e.target.value)}
                          placeholder="https://your-endpoint.com/webhook"
                          className="w-full bg-dark-200 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-colors"
                        />
                        <p className="text-xs text-gray-400 mt-2">Data will be sent to this endpoint</p>
                      </div>
                    </div>

                    {/* Data Format */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-4">
                        Data Format
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        {dataFormats.map((format) => {
                          const Icon = format.icon
                          return (
                            <label
                              key={format.value}
                              className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                                dataFormat === format.value
                                  ? 'border-neon-blue bg-neon-blue/10'
                                  : 'border-gray-600 hover:border-gray-500'
                              }`}
                            >
                              <input
                                type="radio"
                                name="dataFormat"
                                value={format.value}
                                checked={dataFormat === format.value}
                                onChange={(e) => setDataFormat(e.target.value)}
                                className="text-neon-blue focus:ring-neon-blue"
                              />
                              <Icon className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-white">{format.label}</span>
                            </label>
                          )
                        })}
                      </div>
                    </div>

                    {/* API Documentation */}
                    <div className="p-4 bg-dark-400 rounded-lg border border-gray-600">
                      <h4 className="text-md font-medium text-white mb-3">API Documentation</h4>
                      <div className="space-y-2 text-sm text-gray-300">
                        <p><strong>Endpoint:</strong> https://api.infillion.com/v1/reports</p>
                        <p><strong>Method:</strong> POST</p>
                        <p><strong>Headers:</strong> Authorization: Bearer {apiKey || 'YOUR_API_KEY'}</p>
                        <p><strong>Parameters:</strong> date_range, aggregation, advertisers, campaigns, etc.</p>
                        <p><strong>Rate Limit:</strong> 1000 requests per hour</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-600">
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    className="flex items-center space-x-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                  <button
                    type="submit"
                    disabled={isSending || !email}
                    className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-neon-blue to-cyan-500 text-white rounded-lg font-medium hover:from-cyan-500 hover:to-neon-blue transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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