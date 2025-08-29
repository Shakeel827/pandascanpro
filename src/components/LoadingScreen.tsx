import React from 'react'
import { motion } from 'framer-motion'
import PandaLogo from './PandaLogo'

interface LoadingScreenProps {
  message?: string
  progress?: number
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = "Scanning for vulnerabilities...", 
  progress = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-dark-950/95 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="text-center space-y-8">
        {/* Animated Panda Logo */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="flex justify-center"
        >
          <PandaLogo className="w-24 h-24" />
        </motion.div>

        {/* Loading Text */}
        <div className="space-y-4">
          <motion.h2
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-2xl font-semibold gradient-text"
          >
            {message}
          </motion.h2>

          {/* Progress Bar */}
          <div className="w-80 max-w-full mx-auto">
            <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
              />
            </div>
            <p className="text-sm text-slate-400 mt-2">{progress}% Complete</p>
          </div>

          {/* Scanning Animation */}
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                className="w-3 h-3 bg-primary-500 rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default LoadingScreen