'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  Download, 
  Settings, 
  UserPlus, 
  Edit, 
  Trash2, 
  Moon, 
  Sun,
  Key,
  FileText,
  BarChart3
} from 'lucide-react'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('users')
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [users, setUsers] = useState([
    { id: 1, name: 'John Admin', email: 'john@infillion.com', role: 'admin', status: 'active' },
    { id: 2, name: 'Sarah Manager', email: 'sarah@infillion.com', role: 'manager', status: 'active' },
    { id: 3, name: 'Mike Analyst', email: 'mike@infillion.com', role: 'analyst', status: 'inactive' },
  ])

  const tabs = [
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'export', label: 'Data Export', icon: Download },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId))
  }

  const handleExportData = (format: 'csv' | 'pdf') => {
    // Simulate export
    console.log(`Exporting data as ${format}`)
    alert(`${format.toUpperCase()} export started!`)
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-400 via-dark-300 to-dark-200">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-dark-200/80 backdrop-blur-md border-b border-neon-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white neon-glow">
                Admin Dashboard
              </h1>
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-neon-blue" />
                <span className="text-gray-300">Infillion Analytics</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-300 hover:text-white transition-colors"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 pb-4">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white shadow-lg neon-glow'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'users' && <UserManagement users={users} onDeleteUser={handleDeleteUser} />}
            {activeTab === 'export' && <DataExport onExport={handleExportData} />}
            {activeTab === 'settings' && <SettingsPanel isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function UserManagement({ users, onDeleteUser }: { users: any[], onDeleteUser: (id: number) => void }) {
  const [showAddUser, setShowAddUser] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">User Management</h2>
        <motion.button
          onClick={() => setShowAddUser(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-neon-green to-emerald-500 text-white rounded-lg font-medium hover:scale-105 transition-all duration-200 neon-glow-green"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <UserPlus className="w-4 h-4" />
          <span>Add User</span>
        </motion.button>
      </div>

      <div className="futuristic-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Email</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Role</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors"
                >
                  <td className="py-3 px-4 text-white">{user.name}</td>
                  <td className="py-3 px-4 text-gray-300">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin' ? 'bg-red-500/20 text-red-400' :
                      user.role === 'manager' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-white transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onDeleteUser(user.id)}
                        className="p-1 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function DataExport({ onExport }: { onExport: (format: 'csv' | 'pdf') => void }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white">Data Export</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="futuristic-card p-6"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="w-8 h-8 text-neon-blue" />
            <h3 className="text-xl font-semibold text-white">CSV Export</h3>
          </div>
          <p className="text-gray-400 mb-4">
            Export campaign data, metrics, and reports in CSV format for analysis in Excel or other tools.
          </p>
          <button
            onClick={() => onExport('csv')}
            className="w-full px-4 py-2 bg-gradient-to-r from-neon-blue to-cyan-500 text-white rounded-lg font-medium hover:scale-105 transition-all duration-200 neon-glow"
          >
            Export CSV
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="futuristic-card p-6"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <Download className="w-8 h-8 text-neon-green" />
            <h3 className="text-xl font-semibold text-white">PDF Report</h3>
          </div>
          <p className="text-gray-400 mb-4">
            Generate comprehensive PDF reports with charts, tables, and insights for presentations.
          </p>
          <button
            onClick={() => onExport('pdf')}
            className="w-full px-4 py-2 bg-gradient-to-r from-neon-green to-emerald-500 text-white rounded-lg font-medium hover:scale-105 transition-all duration-200 neon-glow-green"
          >
            Export PDF
          </button>
        </motion.div>
      </div>
    </div>
  )
}

function SettingsPanel({ isDarkMode, onToggleTheme }: { isDarkMode: boolean, onToggleTheme: () => void }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white">Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="futuristic-card p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            {isDarkMode ? <Moon className="w-8 h-8 text-neon-blue" /> : <Sun className="w-8 h-8 text-neon-yellow" />}
            <h3 className="text-xl font-semibold text-white">Theme</h3>
          </div>
          <p className="text-gray-400 mb-4">
            Switch between light and dark themes for the dashboard interface.
          </p>
          <button
            onClick={onToggleTheme}
            className="px-4 py-2 bg-gradient-to-r from-neon-purple to-pink-500 text-white rounded-lg font-medium hover:scale-105 transition-all duration-200 neon-glow-purple"
          >
            {isDarkMode ? 'Switch to Light' : 'Switch to Dark'}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="futuristic-card p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Key className="w-8 h-8 text-neon-green" />
            <h3 className="text-xl font-semibold text-white">API Configuration</h3>
          </div>
          <p className="text-gray-400 mb-4">
            Configure API keys and endpoints for data sources.
          </p>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="BigQuery API Key"
              className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
            />
            <input
              type="text"
              placeholder="StarRocks Connection"
              className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue"
            />
            <button className="w-full px-4 py-2 bg-gradient-to-r from-neon-green to-emerald-500 text-white rounded-lg font-medium hover:scale-105 transition-all duration-200 neon-glow-green">
              Save Configuration
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 