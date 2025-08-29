import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static(join(__dirname, '../dist')))

// Mock scanner class for demo
class MockScanner {
  async scanHeaders(url) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return {
      status: "success",
      found_headers: {
        "Content-Security-Policy": "default-src 'self'",
        "X-Frame-Options": "DENY",
        "X-Content-Type-Options": "nosniff"
      },
      missing_headers: ["Strict-Transport-Security", "Referrer-Policy"],
      security_grade: "B",
      recommendations: ["Enable HSTS", "Add Referrer Policy"]
    }
  }

  async scanSQLi(url) {
    await new Promise(resolve => setTimeout(resolve, 1500))
    return {
      status: Math.random() > 0.7 ? "vulnerable" : "secure",
      vulnerable_parameters: Math.random() > 0.7 ? [
        { parameter: "id", confidence: "85%" },
        { parameter: "search", confidence: "72%" }
      ] : [],
      severity: "High",
      recommendation: "Use parameterized queries"
    }
  }

  async scanXSS(url) {
    await new Promise(resolve => setTimeout(resolve, 1200))
    return {
      status: Math.random() > 0.6 ? "vulnerable" : "secure",
      vulnerable_parameters: Math.random() > 0.6 ? [
        { parameter: "comment", severity: "Medium" },
        { parameter: "search", severity: "Low" }
      ] : [],
      recommendation: "Implement input validation and output encoding"
    }
  }

  async scanDirectories(url) {
    await new Promise(resolve => setTimeout(resolve, 800))
    return {
      found_directories: [
        { path: "admin", status: 200 },
        { path: "backup", status: 403 },
        { path: "config", status: 404 }
      ],
      sensitive_paths: ["admin", "backup"],
      recommendation: "Restrict access to sensitive directories"
    }
  }

  async scanPorts(domain) {
    await new Promise(resolve => setTimeout(resolve, 2000))
    return {
      open_ports: [
        { port: 80, service: "HTTP" },
        { port: 443, service: "HTTPS" },
        { port: 22, service: "SSH" }
      ],
      recommendation: "Close unnecessary ports"
    }
  }

  async getSubdomains(domain) {
    await new Promise(resolve => setTimeout(resolve, 1500))
    return {
      found_subdomains: [
        `www.${domain}`,
        `mail.${domain}`,
        `api.${domain}`
      ],
      recommendation: "Monitor all subdomains for security issues"
    }
  }

  async getGeoIP(domain) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      ip: "192.168.1.1",
      location: "San Francisco, US",
      isp: "CloudFlare",
      threat_level: "Low"
    }
  }
}

const scanner = new MockScanner()

// API Routes
app.post('/scan', async (req, res) => {
  try {
    const { url } = req.body
    
    if (!url) {
      return res.status(400).json({
        status: 'error',
        message: 'URL is required'
      })
    }

    // Parse domain from URL
    const domain = new URL(url.startsWith('http') ? url : `https://${url}`).hostname

    // Perform scans
    const results = {
      headers: await scanner.scanHeaders(url),
      sql_injection: await scanner.scanSQLi(url),
      xss: await scanner.scanXSS(url),
      directories: await scanner.scanDirectories(url),
      ports: await scanner.scanPorts(domain),
      subdomains: await scanner.getSubdomains(domain),
      geoip: await scanner.getGeoIP(domain),
      timestamp: new Date().toISOString()
    }

    res.json({
      status: 'success',
      results,
      report_url: '/download_report'
    })

  } catch (error) {
    console.error('Scan error:', error)
    res.status(500).json({
      status: 'error',
      message: error.message || 'Internal server error'
    })
  }
})

app.get('/download_report', (req, res) => {
  res.json({ message: 'Report download would be implemented here' })
})

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'))
})

app.listen(PORT, () => {
  console.log(`🐼 PandaScanPro server running on port ${PORT}`)
})