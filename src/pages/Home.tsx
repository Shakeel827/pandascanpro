import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, Zap, Eye, Lock, ArrowRight, CheckCircle } from 'lucide-react'
import PandaLogo from '../components/PandaLogo'

const Home = () => {
  const features = [
    {
      icon: Shield,
      title: "Advanced Vulnerability Detection",
      description: "Comprehensive scanning for SQL injection, XSS, CSRF, and 100+ other security vulnerabilities"
    },
    {
      icon: Zap,
      title: "Lightning Fast Scanning",
      description: "AI-powered scanning engine that delivers results in seconds, not hours"
    },
    {
      icon: Eye,
      title: "Deep Network Analysis",
      description: "Port scanning, subdomain enumeration, and service fingerprinting"
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "Bank-grade encryption and security measures to protect your data"
    }
  ]

  const stats = [
    { number: "1M+", label: "Websites Scanned" },
    { number: "50K+", label: "Vulnerabilities Found" },
    { number: "99.9%", label: "Accuracy Rate" },
    { number: "24/7", label: "Support Available" }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Logo and Title */}
            <div className="flex flex-col items-center space-y-6">
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <PandaLogo className="w-32 h-32 md:w-40 md:h-40" />
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-orbitron font-bold gradient-text text-shadow">
                PandaScanPro
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
            >
              The world's most advanced web vulnerability scanner. 
              Protect your digital assets with AI-powered security analysis.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/scanner"
                className="scan-button group flex items-center space-x-2"
              >
                <Shield className="w-5 h-5" />
                <span>Start Free Scan</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/signup"
                className="px-8 py-3 border border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white rounded-full font-semibold transition-all duration-300"
              >
                Get Started Free
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-400 mt-12"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>OWASP Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>SOC 2 Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Enterprise Ready</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary-500 rounded-full opacity-20"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + i * 10}%`,
              }}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Advanced Security Features
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Comprehensive security testing with enterprise-grade accuracy and speed
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="glass-effect rounded-xl p-6 text-center group hover:bg-white/10 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500/20 rounded-full mb-4 group-hover:bg-primary-500/30 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary-400 group-hover:text-primary-300" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-primary-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 group-hover:text-slate-300 transition-colors">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary-900/20 to-secondary-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-effect rounded-2xl p-12 space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              Ready to Secure Your Website?
            </h2>
            <p className="text-xl text-slate-300">
              Join thousands of security professionals who trust PandaScanPro
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/scanner"
                className="scan-button group flex items-center justify-center space-x-2"
              >
                <Shield className="w-5 h-5" />
                <span>Start Scanning Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home