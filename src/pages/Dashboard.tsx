import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Globe,
  Server,
  Database,
  Lock
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalScans: 0,
    vulnerabilitiesFound: 0,
    secureWebsites: 0,
    criticalIssues: 0
  })

  useEffect(() => {
    // Animate counters
    const animateCounter = (target: number, setter: (value: number) => void) => {
      let current = 0
      const increment = target / 50
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          setter(target)
          clearInterval(timer)
        } else {
          setter(Math.floor(current))
        }
      }, 30)
    }

    setTimeout(() => {
      animateCounter(247, (value) => setStats(prev => ({ ...prev, totalScans: value })))
      animateCounter(89, (value) => setStats(prev => ({ ...prev, vulnerabilitiesFound: value })))
      animateCounter(158, (value) => setStats(prev => ({ ...prev, secureWebsites: value })))
      animateCounter(12, (value) => setStats(prev => ({ ...prev, criticalIssues: value })))
    }, 500)
  }, [])

  const recentScans = [
    { id: 1, url: 'example.com', status: 'completed', vulnerabilities: 3, severity: 'medium', time: '2 hours ago' },
    { id: 2, url: 'testsite.org', status: 'completed', vulnerabilities: 0, severity: 'low', time: '4 hours ago' },
    { id: 3, url: 'webapp.net', status: 'completed', vulnerabilities: 7, severity: 'high', time: '6 hours ago' },
    { id: 4, url: 'secure.io', status: 'completed', vulnerabilities: 1, severity: 'low', time: '1 day ago' },
  ]

  const chartData = [
    { name: 'Mon', scans: 12, vulnerabilities: 4 },
    { name: 'Tue', scans: 19, vulnerabilities: 7 },
    { name: 'Wed', scans: 15, vulnerabilities: 3 },
    { name: 'Thu', scans: 22, vulnerabilities: 8 },
    { name: 'Fri', scans: 18, vulnerabilities: 5 },
    { name: 'Sat', scans: 25, vulnerabilities: 9 },
    { name: 'Sun', scans: 20, vulnerabilities: 6 },
  ]

  const pieData = [
    { name: 'Secure', value: 65, color: '#10b981' },
    { name: 'Low Risk', value: 20, color: '#f59e0b' },
    { name: 'Medium Risk', value: 10, color: '#f97316' },
    { name: 'High Risk', value: 5, color: '#ef4444' },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30'
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30'
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30'
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30'
    }
  }

  return (
    <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Security Dashboard</h1>
          <p className="text-slate-400">Monitor your website security and vulnerability trends</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Globe, label: 'Total Scans', value: stats.totalScans, color: 'text-blue-400' },
            { icon: AlertTriangle, label: 'Vulnerabilities Found', value: stats.vulnerabilitiesFound, color: 'text-yellow-400' },
            { icon: CheckCircle, label: 'Secure Websites', value: stats.secureWebsites, color: 'text-green-400' },
            { icon: Shield, label: 'Critical Issues', value: stats.criticalIssues, color: 'text-red-400' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="glass-effect rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <div className={`text-3xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
              </div>
              <h3 className="text-slate-300 font-medium">{stat.label}</h3>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Line Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="glass-effect rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-primary-400" />
              Weekly Scan Activity
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="scans" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="vulnerabilities" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="glass-effect rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-secondary-400" />
              Security Status Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Recent Scans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="glass-effect rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-accent-400" />
            Recent Scans
          </h3>
          
          <div className="space-y-4">
            {recentScans.map((scan, index) => (
              <motion.div
                key={scan.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
                className="flex items-center justify-between p-4 bg-dark-800/30 rounded-lg hover:bg-dark-800/50 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center">
                    <Globe className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{scan.url}</h4>
                    <p className="text-sm text-slate-400">{scan.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-white">
                      {scan.vulnerabilities} vulnerabilities
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full border ${getSeverityColor(scan.severity)}`}>
                      {scan.severity}
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Dashboard