'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { CodeEditor } from './CodeEditor'
import { LivePreview } from './LivePreview'
import { BMADDashboard } from './BMADDashboard'
import { AIAssistant } from './AIAssistant'
import { SettingsModal } from './SettingsModal'
import { PricingModal } from './PricingModal'
import { useLocalStorage } from '@/hooks/useLocalStorage'

export function Workspace() {
  const [activeFile, setActiveFile] = useState('index.jsx')
  const [files, setFiles] = useState({
    'index.jsx': `import React from 'react'\nimport { Button } from './components/ui/button'\n\nexport default function App() {\n  return (\n    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">\n      <header className="p-6">\n        <h1 className="text-4xl font-bold text-white">\n          Welcome to BMAD\n        </h1>\n        <p className="text-slate-400 mt-2">\n          Build amazing applications with AI\n        </p>\n      </header>\n      <main className="p-6">\n        <Button variant="primary">\n          Get Started\n        </Button>\n      </main>\n    </div>\n  )\n}`,
    'styles.css': `/* BMAD Workspace Styles */\n\n:root {\n  --primary: #00d4ff;\n  --secondary: #7c3aed;\n}\n\n.container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 2rem;\n}\n\n.btn-primary {\n  background: var(--primary);\n  color: #0a0a0f;\n  padding: 0.75rem 1.5rem;\n  border-radius: 0.5rem;\n  font-weight: 600;\n}`,
    'config.json': `{\n  "name": "my-bmad-app",\n  "version": "1.0.0",\n  "description": "Built with BMAD Workspace",\n  "dependencies": {\n    "react": "^18.2.0",\n    "react-dom": "^18.2.0"\n  },\n  "bmad": {\n    "tier": "pro",\n    "aiOrchestration": true,\n    "specKit": true\n  }\n}`
  })
  
  const [showSettings, setShowSettings] = useState(false)
  const [showPricing, setShowPricing] = useState(false)
  const [showAI, setShowAI] = useState(false)
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const [userTier, setUserTier] = useLocalStorage('bmad-user-tier', 'free')
  const [aiCredits, setAiCredits] = useLocalStorage('bmad-ai-credits', 50)

  const handleCodeChange = (newCode) => {
    setFiles(prev => ({
      ...prev,
      [activeFile]: newCode
    }))
  }

  const handleAIRequest = () => {
    if (aiCredits <= 0 && userTier === 'free') {
      setShowPricing(true)
      return false
    }
    if (userTier === 'free') {
      setAiCredits(prev => Math.max(0, prev - 1))
    }
    return true
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar
        expanded={sidebarExpanded}
        onToggle={() => setSidebarExpanded(!sidebarExpanded)}
        files={Object.keys(files)}
        activeFile={activeFile}
        onFileSelect={setActiveFile}
        onSettingsClick={() => setShowSettings(true)}
        onPricingClick={() => setShowPricing(true)}
        userTier={userTier}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          onAIToggle={() => setShowAI(!showAI)}
          showAI={showAI}
          aiCredits={aiCredits}
          userTier={userTier}
          onUpgradeClick={() => setShowPricing(true)}
        />

        {/* Workspace Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Editor + Preview */}
          <div className="flex-1 flex overflow-hidden">
            {/* Code Editor */}
            <motion.div
              className="flex-1 min-w-0"
              layout
              transition={{ duration: 0.3 }}
            >
              <CodeEditor
                code={files[activeFile]}
                onChange={handleCodeChange}
                filename={activeFile}
                onAIRequest={handleAIRequest}
              />
            </motion.div>

            {/* Live Preview */}
            <motion.div
              className="w-[45%] border-l border-border"
              layout
              transition={{ duration: 0.3 }}
            >
              <LivePreview code={files['index.jsx']} />
            </motion.div>
          </div>

          {/* BMAD Dashboard */}
          <BMADDashboard userTier={userTier} />
        </div>
      </div>

      {/* AI Assistant Panel */}
      <AIAssistant
        isOpen={showAI}
        onClose={() => setShowAI(false)}
        onAIRequest={handleAIRequest}
        userTier={userTier}
        aiCredits={aiCredits}
      />

      {/* Modals */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        userTier={userTier}
      />
      
      <PricingModal
        isOpen={showPricing}
        onClose={() => setShowPricing(false)}
        currentTier={userTier}
        onSelectTier={(tier) => {
          setUserTier(tier)
          if (tier !== 'free') {
            setAiCredits(tier === 'pro' ? 500 : 9999)
          }
          setShowPricing(false)
        }}
      />
    </div>
  )
}
