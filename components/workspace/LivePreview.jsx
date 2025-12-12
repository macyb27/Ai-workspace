'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  RefreshCw,
  Smartphone,
  Monitor,
  Tablet,
  ExternalLink,
  Eye
} from 'lucide-react'
import { toast } from 'sonner'

const devicePresets = [
  { id: 'desktop', icon: Monitor, width: '100%', label: 'Desktop' },
  { id: 'tablet', icon: Tablet, width: '768px', label: 'Tablet' },
  { id: 'mobile', icon: Smartphone, width: '375px', label: 'Mobile' },
]

export function LivePreview({ code }) {
  const [device, setDevice] = useState('desktop')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [previewKey, setPreviewKey] = useState(0)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setPreviewKey(prev => prev + 1)
    setTimeout(() => {
      setIsRefreshing(false)
      toast.success('Preview refreshed')
    }, 500)
  }

  const handleOpenExternal = () => {
    toast.info('Opening in new tab...', { description: 'Preview URL copied' })
  }

  const selectedDevice = devicePresets.find(d => d.id === device)

  // Create preview HTML with dark theme
  const previewHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          background: #0a0a0a;
          min-height: 100vh;
          color: #f5f5f5;
        }
        .preview-container {
          padding: 2rem;
        }
        h1 {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #22c55e, #d4ff00);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }
        p {
          color: #71717a;
          margin-bottom: 1.5rem;
        }
        .btn {
          background: linear-gradient(135deg, #22c55e, #d4ff00);
          color: #0a0a0a;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(34, 197, 94, 0.3);
        }
        .card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 1rem;
          padding: 1.5rem;
          margin-top: 2rem;
        }
        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-top: 1rem;
        }
        .stat {
          text-align: center;
          padding: 1rem;
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.2);
          border-radius: 0.5rem;
        }
        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #22c55e;
        }
        .stat-label {
          font-size: 0.75rem;
          color: #71717a;
          margin-top: 0.25rem;
        }
        .badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: rgba(212, 255, 0, 0.1);
          border: 1px solid rgba(212, 255, 0, 0.3);
          border-radius: 9999px;
          font-size: 0.75rem;
          color: #d4ff00;
          margin-left: 0.5rem;
        }
      </style>
    </head>
    <body>
      <div class="preview-container">
        <header>
          <h1>Welcome to BMAD <span class="badge">v2.0</span></h1>
          <p>Build amazing applications with AI-powered assistance</p>
          <button class="btn">Get Started</button>
        </header>
        <div class="card">
          <h3 style="margin-bottom: 0.5rem; color: #f5f5f5;">Project Stats</h3>
          <p style="font-size: 0.875rem;">Real-time metrics for your app</p>
          <div class="stats">
            <div class="stat">
              <div class="stat-value">12</div>
              <div class="stat-label">Components</div>
            </div>
            <div class="stat">
              <div class="stat-value">98%</div>
              <div class="stat-label">Coverage</div>
            </div>
            <div class="stat">
              <div class="stat-value">A+</div>
              <div class="stat-label">Performance</div>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Preview Header */}
      <div className="h-10 flex items-center justify-between px-4 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Live Preview</span>
          <span className="px-2 py-0.5 text-xs rounded-full bg-primary/20 text-primary border border-primary/30">
            Auto-sync
          </span>
        </div>

        <div className="flex items-center gap-1">
          {/* Device Toggles */}
          {devicePresets.map((preset) => (
            <Button
              key={preset.id}
              variant={device === preset.id ? 'neon' : 'ghost'}
              size="icon-sm"
              onClick={() => setDevice(preset.id)}
              title={preset.label}
            >
              <preset.icon className="w-4 h-4" />
            </Button>
          ))}

          <div className="w-px h-4 bg-border mx-1" />

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <motion.div
              animate={isRefreshing ? { rotate: 360 } : {}}
              transition={{ duration: 0.5 }}
            >
              <RefreshCw className="w-4 h-4" />
            </motion.div>
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleOpenExternal}
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 p-4 bg-muted/20 overflow-auto">
        <motion.div
          key={previewKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="h-full flex justify-center"
        >
          <div
            className="bg-black rounded-lg overflow-hidden shadow-lg border border-border transition-all duration-300"
            style={{
              width: selectedDevice?.width || '100%',
              maxWidth: '100%',
              height: '100%',
            }}
          >
            <iframe
              srcDoc={previewHTML}
              className="w-full h-full border-0"
              title="Live Preview"
              sandbox="allow-scripts"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
