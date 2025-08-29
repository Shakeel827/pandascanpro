import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Database, Globe, Server, Lock, Zap } from 'lucide-react'

interface ScanProgressProps {
  currentStep: number
  totalSteps: number
  currentMessage: string
}

const ScanProgress: React.FC<ScanProgressProps> = ({ currentStep, totalSteps, currentMessage }) => {
  const steps = [
    { icon: Shield, label: 'Initializing', color: 'text-blue-400' },
    { icon: Lock, label: 'Headers', color: 'text-green-400' },
    { icon: Database, label: 'SQL Injection', color: 'text-red-400' },
    { icon: Zap, label: 'XSS Testing', color: 'text-yellow-400' },
    { icon: Server, label: 'Directory Scan', color: 'text-purple-400' },
    { icon: Globe, label: 'Network Analysis', color: 'text-cyan-400' },
  ]

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-300">Scan Progress</span>
          <span className="text-sm text-slate-400">{currentStep}/{totalSteps}</span>
        </div>
        <div className="h-3 bg-dark-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full relative"
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
          </motion.div>
        </div>
      </div>

      {/* Current Message */}
      <motion.div
        key={currentMessage}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <p className="text-lg font-medium gradient-text">{currentMessage}</p>
      </motion.div>

      {/* Step Indicators */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {steps.map((step, index) => {
          const isActive = index === currentStep - 1
          const isCompleted = index < currentStep - 1
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`flex flex-col items-center space-y-2 p-3 rounded-lg transition-all duration-300 ${
                isActive 
                  ? 'bg-primary-500/20 border border-primary-500/30' 
                  : isCompleted 
                    ? 'bg-green-500/20 border border-green-500/30'
                    : 'bg-dark-800/30 border border-slate-700'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                isActive 
                  ? 'bg-primary-500 animate-pulse' 
                  : isCompleted 
                    ? 'bg-green-500'
                    : 'bg-dark-700'
              }`}>
                <step.icon className={`w-5 h-5 ${
                  isActive || isCompleted ? 'text-white' : 'text-slate-400'
                }`} />
              </div>
              <span className={`text-xs font-medium text-center ${
                isActive 
                  ? 'text-primary-300' 
                  : isCompleted 
                    ? 'text-green-300'
                    : 'text-slate-400'
              }`}>
                {step.label}
              </span>
            </motion.div>
          )
        })}
      </div>

      {/* Scanning Animation */}
      <div className="mt-8 flex justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary-500/30 border-t-primary-500 rounded-full"
        />
      </div>
    </div>
  )
}

export default ScanProgress