import React from 'react'
import { motion } from 'framer-motion'

interface PandaLogoProps {
  className?: string
  animated?: boolean
}

const PandaLogo: React.FC<PandaLogoProps> = ({ className = "w-12 h-12", animated = true }) => {
  const logoVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1, 
      rotate: [0, -5, 5, 0],
      transition: { duration: 0.5 }
    }
  }

  return (
    <motion.div
      variants={animated ? logoVariants : undefined}
      initial="initial"
      whileHover="hover"
      className={className}
    >
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Outer glow */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1"/>
            <stop offset="50%" stopColor="#8b5cf6"/>
            <stop offset="100%" stopColor="#06b6d4"/>
          </linearGradient>
        </defs>
        
        {/* Background circle */}
        <circle cx="32" cy="32" r="30" fill="url(#shieldGradient)" opacity="0.1"/>
        <circle cx="32" cy="32" r="28" fill="#ffffff" stroke="url(#shieldGradient)" strokeWidth="2"/>
        
        {/* Panda ears */}
        <motion.circle 
          cx="20" cy="18" r="8" fill="#000000"
          animate={animated ? { rotate: [0, 5, -5, 0] } : undefined}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        />
        <motion.circle 
          cx="44" cy="18" r="8" fill="#000000"
          animate={animated ? { rotate: [0, -5, 5, 0] } : undefined}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        />
        <circle cx="20" cy="18" r="5" fill="#ffffff"/>
        <circle cx="44" cy="18" r="5" fill="#ffffff"/>
        
        {/* Panda face */}
        <circle cx="32" cy="32" r="18" fill="#ffffff"/>
        
        {/* Eye patches */}
        <ellipse cx="26" cy="28" rx="6" ry="8" fill="#000000"/>
        <ellipse cx="38" cy="28" rx="6" ry="8" fill="#000000"/>
        
        {/* Eyes with blink animation */}
        <motion.g
          animate={animated ? { scaleY: [1, 0.1, 1] } : undefined}
          transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 4 }}
        >
          <circle cx="26" cy="28" r="3" fill="#ffffff"/>
          <circle cx="38" cy="28" r="3" fill="#ffffff"/>
          <circle cx="26" cy="28" r="1.5" fill="#000000"/>
          <circle cx="38" cy="28" r="1.5" fill="#000000"/>
        </motion.g>
        
        {/* Nose */}
        <ellipse cx="32" cy="36" rx="2" ry="1.5" fill="#000000"/>
        
        {/* Mouth */}
        <path d="M32 38 Q28 42 24 40" stroke="#000000" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M32 38 Q36 42 40 40" stroke="#000000" strokeWidth="2" fill="none" strokeLinecap="round"/>
        
        {/* Security shield overlay */}
        <motion.g
          animate={animated ? { scale: [1, 1.05, 1] } : undefined}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <path 
            d="M32 8 L40 12 L40 24 Q40 32 32 36 Q24 32 24 24 L24 12 Z" 
            fill="url(#shieldGradient)" 
            opacity="0.9"
            filter="url(#glow)"
          />
          <path 
            d="M32 12 L36 14 L36 22 Q36 26 32 28 Q28 26 28 22 L28 14 Z" 
            fill="#ffffff"
          />
          <motion.path 
            d="M30 18 L32 20 L36 16" 
            stroke="#6366f1" 
            strokeWidth="2" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={animated ? { pathLength: 1 } : { pathLength: 1 }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
          />
        </motion.g>
      </svg>
    </motion.div>
  )
}

export default PandaLogo