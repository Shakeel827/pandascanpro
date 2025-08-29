import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Scanner from './pages/Scanner'
import Reports from './pages/Reports'
import ParticleBackground from './components/ParticleBackground'

function App() {
  return (
    <div className="min-h-screen bg-dark-950 relative overflow-hidden">
      <ParticleBackground />
      <Navbar />
      
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App