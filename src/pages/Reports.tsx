import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Download, 
  Eye, 
  Calendar, 
  Filter,
  Search,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe
} from 'lucide-react'

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSeverity, setFilterSeverity] = useState('all')
  const [sortBy, setSortBy] = useState('date')

  const mockReports = [
    {
      id: 1,
      url: 'example.com',
      date: '2024-01-15',
      time: '14:30',
      vulnerabilities: 5,
      severity: 'high',
      status: 'completed',
      size: '2.4 MB'
    },
    {
      id: 2,
      url: 'testsite.org',
      date: '2024-01-14',
      time: '09:15',
      vulnerabilities: 0,
      severity: 'low',
      status: 'completed',
      size: '1.8 MB'
    },
    {
      id: 3,
      url: 'webapp.net',
      date: '2024-01-13',
      time: '16:45',
      vulnerabilities: 12,
      severity: 'critical',
      status: 'completed',
      size: '3.1 MB'
    },
    {
      id: 4,
      url: 'secure.io',
      date: '2024-01-12',
      time: '11:20',
      vulnerabilities: 2,
      severity: 'medium',
      status: 'completed',
      size: '2.0 MB'
    },
    {
      id: 5,
      url: 'mysite.com',
      date: '2024-01-11',
      time: '13:10',
      vulnerabilities: 1,
      severity: 'low',
      status: 'completed',
      size: '1.9 MB'
    }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-purple-400 bg-purple-500/20 border-purple-500/30'
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30'
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30'
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30'
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="w-4 h-4" />
      case 'medium':
        return <Clock className="w-4 h-4" />
      case 'low':
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Globe className="w-4 h-4" />
    }
  }

  const filteredReports = mockReports
    .filter(report => 
      report.url.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterSeverity === 'all' || report.severity === filterSeverity)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'severity':
          const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 }
          return (severityOrder[b.severity as keyof typeof severityOrder] || 0) - 
                 (severityOrder[a.severity as keyof typeof severityOrder] || 0)
        case 'vulnerabilities':
          return b.vulnerabilities - a.vulnerabilities
        default:
          return 0
      }
    })

  return (
    <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Scan Reports</h1>
          <p className="text-slate-400">View and download your security scan reports</p>
        </div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="glass-effect rounded-xl p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-dark-800/50 border border-slate-600 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-white placeholder-slate-400"
              />
            </div>

            {/* Severity Filter */}
            <div>
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="w-full py-3 px-4 bg-dark-800/50 border border-slate-600 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-white"
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-3 px-4 bg-dark-800/50 border border-slate-600 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-white"
              >
                <option value="date">Sort by Date</option>
                <option value="severity">Sort by Severity</option>
                <option value="vulnerabilities">Sort by Vulnerabilities</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              className="glass-effect rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group"
            >
              {/* Report Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center group-hover:bg-primary-500/30 transition-colors">
                    <FileText className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-primary-300 transition-colors">
                      {report.url}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {report.date} at {report.time}
                    </p>
                  </div>
                </div>
                
                <div className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getSeverityColor(report.severity)}`}>
                  {getSeverityIcon(report.severity)}
                  <span className="capitalize">{report.severity}</span>
                </div>
              </div>

              {/* Report Stats */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Vulnerabilities Found:</span>
                  <span className="font-semibold text-white">{report.vulnerabilities}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Report Size:</span>
                  <span className="font-semibold text-white">{report.size}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Status:</span>
                  <span className="font-semibold text-green-400 capitalize">{report.status}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors text-sm font-medium"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 bg-secondary-600 hover:bg-secondary-700 rounded-lg transition-colors text-sm font-medium"
                >
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredReports.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-400 mb-2">No reports found</h3>
            <p className="text-slate-500">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default Reports