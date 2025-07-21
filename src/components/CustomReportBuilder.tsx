'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, Download, Eye, Settings, BarChart3, PieChart, TrendingUp, Map, Users, Target } from 'lucide-react'

interface ReportComponent {
  id: string
  type: 'metric' | 'chart' | 'table' | 'map' | 'leaderboard'
  title: string
  config: any
  position: { x: number; y: number }
  size: { width: number; height: number }
}

interface CustomReportBuilderProps {
  className?: string
}

export function CustomReportBuilder({ className = '' }: CustomReportBuilderProps) {
  const [components, setComponents] = useState<ReportComponent[]>([])
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [showComponentPanel, setShowComponentPanel] = useState(false)
  const [reportName, setReportName] = useState('Custom Report')
  const [showMaxAlert, setShowMaxAlert] = useState(false);

  const availableComponents = [
    { type: 'metric', label: 'Metric Card', icon: Target, description: 'Display key performance indicators' },
    { type: 'chart', label: 'Chart', icon: BarChart3, description: 'Line, bar, or pie charts' },
    { type: 'table', label: 'Data Table', icon: TrendingUp, description: 'Tabular data display' },
    { type: 'map', label: 'Interactive Map', icon: Map, description: 'Geographic visualization' },
    { type: 'leaderboard', label: 'Leaderboard', icon: Users, description: 'Ranked performance list' }
  ]

  const addComponent = (type: ReportComponent['type']) => {
    if (components.length >= 8) {
      setShowMaxAlert(true);
      setTimeout(() => setShowMaxAlert(false), 3000);
      return;
    }
    // Calculate grid position to prevent overlap
    const gridSize = 320 // component width + margin
    const maxComponentsPerRow = Math.floor(1200 / gridSize) // assuming max width of 1200px
    const row = Math.floor(components.length / maxComponentsPerRow)
    const col = components.length % maxComponentsPerRow
    
    const newComponent: ReportComponent = {
      id: `comp_${Date.now()}`,
      type,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Component`,
      config: getDefaultConfig(type),
      position: { x: col * gridSize, y: row * 220 }, // 220 = component height + margin
      size: { width: 300, height: 200 }
    }
    
    // Check if adding this component would exceed screen bounds
    const maxY = row * 220 + 200
    if (maxY > 800) { // Max height before scrolling
      alert('Maximum components reached for current view. Please resize existing components or scroll to see more.')
    }
    
    setComponents([...components, newComponent])
    setSelectedComponent(newComponent.id)
  }

  const getDefaultConfig = (type: ReportComponent['type']) => {
    switch (type) {
      case 'metric':
        return { metric: 'impressions', title: 'Total Impressions', format: 'number' }
      case 'chart':
        return { chartType: 'bar', dataSource: 'campaign_data', metric: 'impressions' }
      case 'table':
        return { dataSource: 'campaign_data', columns: ['campaign', 'impressions', 'clicks', 'ctr'] }
      case 'map':
        return { dataSource: 'geo_data', metric: 'impressions', region: 'US' }
      case 'leaderboard':
        return { dataSource: 'campaign_data', metric: 'roi', limit: 10 }
      default:
        return {}
    }
  }

  const removeComponent = (id: string) => {
    setComponents(components.filter(comp => comp.id !== id))
    if (selectedComponent === id) {
      setSelectedComponent(null)
    }
  }

  const updateComponent = (id: string, updates: Partial<ReportComponent>) => {
    setComponents(components.map(comp => 
      comp.id === id ? { ...comp, ...updates } : comp
    ))
  }

  const exportReport = () => {
    const reportData = {
      name: reportName,
      components,
      createdAt: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${reportName.replace(/\s+/g, '_')}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const renderComponent = (component: ReportComponent) => {
    const isSelected = selectedComponent === component.id

    return (
      <motion.div
        key={component.id}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`absolute border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
          isSelected 
            ? 'border-accent bg-accent/10' 
            : 'border-gray-600 bg-dark-200 hover:border-gray-500'
        }`}
        style={{
          left: component.position.x,
          top: component.position.y,
          width: component.size.width,
          height: component.size.height
        }}
        onClick={() => setSelectedComponent(component.id)}
      >
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-semibold text-white">{component.title}</h4>
          <div className="flex items-center space-x-1">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowComponentPanel(true)
              }}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
            >
              <Settings className="w-3 h-3 text-gray-400" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                removeComponent(component.id)
              }}
              className="p-1 hover:bg-red-500/20 rounded transition-colors"
            >
              <Trash2 className="w-3 h-3 text-red-400" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          {component.type === 'metric' && (
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">26.4M</div>
              <div className="text-xs text-gray-400">Impressions</div>
            </div>
          )}
          {component.type === 'chart' && (
            <div className="text-center">
              <BarChart3 className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-xs text-gray-400">Chart Component</div>
            </div>
          )}
          {component.type === 'table' && (
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-purple mx-auto mb-2" />
              <div className="text-xs text-gray-400">Data Table</div>
            </div>
          )}
          {component.type === 'map' && (
            <div className="text-center">
              <Map className="w-8 h-8 text-pink mx-auto mb-2" />
              <div className="text-xs text-gray-400">Interactive Map</div>
            </div>
          )}
          {component.type === 'leaderboard' && (
            <div className="text-center">
              <Users className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-xs text-gray-400">Leaderboard</div>
            </div>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <div className={`futuristic-card p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple to-pink-500 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <input
              type="text"
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
              className="text-xl font-bold text-white bg-transparent border-none outline-none focus:ring-2 focus:ring-accent rounded px-2"
            />
            <p className="text-sm text-gray-400">Custom report builder</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowComponentPanel(!showComponentPanel)}
            className="px-4 py-2 bg-accent text-white rounded-lg font-medium hover:bg-primary transition-all flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Component</span>
          </button>
          <button
            onClick={exportReport}
            className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-accent transition-all flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {showMaxAlert && (
        <div className="mb-4 p-3 rounded-lg bg-pink/20 border border-pink text-pink text-center font-semibold shadow-lg">
          Maximum visible components reached. Please remove a component to add more.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Component Panel */}
        {showComponentPanel && (
          <div className="lg:col-span-1">
            <div className="futuristic-card p-4">
              <h4 className="text-lg font-semibold text-white mb-4">Components</h4>
              <div className="space-y-3">
                {availableComponents.map((comp) => (
                  <button
                    key={comp.type}
                    onClick={() => addComponent(comp.type as ReportComponent['type'])}
                    className="w-full p-3 text-left bg-dark-200 hover:bg-dark-300 rounded-lg transition-colors border border-gray-600 hover:border-accent"
                  >
                    <div className="flex items-center space-x-3">
                      <comp.icon className="w-5 h-5 text-accent" />
                      <div>
                        <div className="font-medium text-white">{comp.label}</div>
                        <div className="text-xs text-gray-400">{comp.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Report Canvas */}
        <div className="relative w-full min-h-[600px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-muted mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-muted mb-2">Empty Report</h3>
                <p className="text-sm text-muted mb-4">Add components to build your custom report</p>
                <button
                  onClick={() => setShowComponentPanel(true)}
                  className="px-4 py-2 bg-accent text-white rounded-lg font-medium hover:bg-primary transition-all flex items-center space-x-2 mx-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add First Component</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full">
              {components.map(renderComponent)}
            </div>
          )}
        </div>
      </div>

      {/* Component Configuration Panel */}
      {selectedComponent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 futuristic-card p-4"
        >
          <h4 className="text-lg font-semibold text-white mb-4">Component Configuration</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <input
                type="text"
                value={components.find(c => c.id === selectedComponent)?.title || ''}
                onChange={(e) => updateComponent(selectedComponent, { title: e.target.value })}
                className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Width</label>
              <input
                type="number"
                value={components.find(c => c.id === selectedComponent)?.size.width || 300}
                onChange={(e) => updateComponent(selectedComponent, { 
                  size: { 
                    ...components.find(c => c.id === selectedComponent)!.size,
                    width: parseInt(e.target.value)
                  }
                })}
                className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Height</label>
              <input
                type="number"
                value={components.find(c => c.id === selectedComponent)?.size.height || 200}
                onChange={(e) => updateComponent(selectedComponent, { 
                  size: { 
                    ...components.find(c => c.id === selectedComponent)!.size,
                    height: parseInt(e.target.value)
                  }
                })}
                className="w-full bg-dark-200 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Report Summary */}
      <div className="mt-6 pt-6 border-t border-gray-600">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">
              {components.length}
            </div>
            <div className="text-sm text-gray-400">Components</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {components.filter(c => c.type === 'chart').length}
            </div>
            <div className="text-sm text-gray-400">Charts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple">
              {components.filter(c => c.type === 'metric').length}
            </div>
            <div className="text-sm text-gray-400">Metrics</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {components.filter(c => c.type === 'table').length}
            </div>
            <div className="text-sm text-gray-400">Tables</div>
          </div>
        </div>
      </div>
    </div>
  )
} 