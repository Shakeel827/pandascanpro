import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { 
  Shield, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  Download,
  Eye,
  Server,
  Database,
  Globe,
  Lock,
  Zap
} from 'lucide-react'
import toast from 'react-hot-toast'
import LoadingScreen from '../components/LoadingScreen'

interface ScanForm {
  url: string
  scanType: 'basic' | 'advanced' | 'comprehensive'
}

interface ScanResults {
  url: string
  timestamp: string
  headers: any
  sql_injection: any
  xss: any
  directories: any
  ports: any
  subdomains: any
  geoip: any
}

const Scanner = () => {
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanResults, setScanResults] = useState<ScanResults | null>(null)
  const [activeTab, setActiveTab] = useState('headers')
  
  const { register, handleSubmit, formState: { errors } } = useForm<ScanForm>()

  const onSubmit = async (data: ScanForm) => {
    setIsScanning(true)
    setScanProgress(0)
    setScanResults(null)

    try {
      // Simulate progressive scanning
      const steps = [
        { message: "Initializing scan...", progress: 10 },
        { message: "Analyzing security headers...", progress: 25 },
        { message: "Testing for SQL injection...", progress: 40 },
        { message: "Checking for XSS vulnerabilities...", progress: 55 },
        { message: "Scanning directories...", progress: 70 },
        { message: "Enumerating subdomains...", progress: 85 },
        { message: "Finalizing report...", progress: 100 }
      ]

      for (const step of steps) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        setScanProgress(step.progress)
      }

      // Make actual API call
      const response = await fetch('/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: data.url })
      })

      const result = await response.json()
      
      if (result.status === 'success') {
        setScanResults(result.results)
        toast.success('Scan completed successfully!')
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      toast.error('Scan failed. Please try again.')
      console.error('Scan error:', error)
    } finally {
      setIsScanning(false)
      setScanProgress(0)
    }
  }

  const getSeverityBadge = (severity: string) => {
    const colors = {
      high: 'bg-red-500/20 text-red-400 border-red-500/30',
      medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      low: 'bg-green-500/20 text-green-400 border-green-500/30',
      info: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    }
    return colors[severity as keyof typeof colors] || colors.info
  }

  const tabs = [
    { id: 'headers', label: 'Security Headers', icon: Lock },
    { id: 'sql_injection', label: 'SQL Injection', icon: Database },
    { id: 'xss', label: 'XSS Vulnerabilities', icon: AlertTriangle },
    { id: 'directories', label: 'Directory Scan', icon: Server },
    { id: 'network', label: 'Network Info', icon: Globe },
  ]

  return (
    <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <AnimatePresence>
        {isScanning && (
          <LoadingScreen 
            message="Scanning for vulnerabilities..." 
            progress={scanProgress} 
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Advanced Security Scanner
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Comprehensive vulnerability assessment with AI-powered threat detection
          </p>
        </div>

        {/* Scan Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="glass-effect rounded-2xl p-8 mb-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* URL Input */}
              <div className="lg:col-span-2 space-y-2">
                <label className="text-sm font-medium text-slate-300">Target URL</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    {...register('url', { 
                      required: 'URL is required',
                      pattern: {
                        value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                        message: 'Please enter a valid URL'
                      }
                    })}
                    type="text"
                    placeholder="https://example.com"
                    className="w-full pl-12 pr-4 py-4 bg-dark-800/50 border border-slate-600 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-white placeholder-slate-400 text-lg"
                  />
                </div>
                {errors.url && (
                  <p className="text-red-400 text-sm">{errors.url.message}</p>
                )}
              </div>

              {/* Scan Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Scan Type</label>
                <select
                  {...register('scanType')}
                  className="w-full py-4 px-4 bg-dark-800/50 border border-slate-600 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-white"
                >
                  <option value="basic">Basic Scan</option>
                  <option value="advanced">Advanced Scan</option>
                  <option value="comprehensive">Comprehensive Scan</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isScanning}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full scan-button flex items-center justify-center space-x-2 text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isScanning ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Start Security Scan</span>
                  <Zap className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Results Section */}
        <AnimatePresence>
          {scanResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Results Header */}
              <div className="glass-effect rounded-xl p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Scan Results</h2>
                    <p className="text-slate-400">
                      Target: <span className="text-primary-400 font-mono">{scanResults.url}</span>
                    </p>
                    <p className="text-slate-400 text-sm">
                      Completed: {scanResults.timestamp}
                    </p>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                      <span>Download PDF</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-secondary-600 hover:bg-secondary-700 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                      <span>View Report</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="glass-effect rounded-xl overflow-hidden">
                <div className="flex flex-wrap border-b border-slate-700">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all ${
                        activeTab === tab.id
                          ? 'text-primary-400 bg-primary-500/10 border-b-2 border-primary-400'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {activeTab === 'network' ? (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="vulnerability-card info">
                              <h4 className="font-semibold text-white mb-3 flex items-center">
                                <Server className="w-5 h-5 mr-2" />
                                Port Scan
                              </h4>
                              <pre className="text-sm text-slate-300 bg-dark-900/50 p-4 rounded-lg overflow-x-auto">
                                {JSON.stringify(scanResults.ports, null, 2)}
                              </pre>
                            </div>
                            
                            <div className="vulnerability-card info">
                              <h4 className="font-semibold text-white mb-3 flex items-center">
                                <Globe className="w-5 h-5 mr-2" />
                                Subdomains
                              </h4>
                              <pre className="text-sm text-slate-300 bg-dark-900/50 p-4 rounded-lg overflow-x-auto">
                                {JSON.stringify(scanResults.subdomains, null, 2)}
                              </pre>
                            </div>
                            
                            <div className="vulnerability-card info">
                              <h4 className="font-semibold text-white mb-3 flex items-center">
                                <Globe className="w-5 h-5 mr-2" />
                                GeoIP Info
                              </h4>
                              <pre className="text-sm text-slate-300 bg-dark-900/50 p-4 rounded-lg overflow-x-auto">
                                {JSON.stringify(scanResults.geoip, null, 2)}
                              </pre>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="vulnerability-card info">
                          <h4 className="font-semibold text-white mb-4 flex items-center">
                            {tabs.find(t => t.id === activeTab)?.icon && (
                              <tabs.find(t => t.id === activeTab)!.icon className="w-5 h-5 mr-2" />
                            )}
                            {tabs.find(t => t.id === activeTab)?.label}
                          </h4>
                          <pre className="text-sm text-slate-300 bg-dark-900/50 p-6 rounded-lg overflow-x-auto">
                            {JSON.stringify(scanResults[activeTab as keyof ScanResults], null, 2)}
                          </pre>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default Scanner