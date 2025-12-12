'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Sparkles,
  Play,
  Bug,
  Download,
  Share2,
  Zap,
  Crown,
  ChevronDown
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'

export function Header({ onAIToggle, showAI, aiCredits, userTier, onUpgradeClick }) {
  const [isRunning, setIsRunning] = useState(false)

  const handleRun = () => {
    setIsRunning(true)
    toast.success('Build started', {
      description: 'Your project is being compiled...'
    })
    setTimeout(() => {
      setIsRunning(false)
      toast.success('Build complete', {
        description: 'Preview updated successfully'
      })
    }, 2000)
  }

  const handleDebugExport = () => {
    toast.success('Debug Export', {
      description: 'Project exported to VS Code'
    })
  }

  return (
    <header className="h-14 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-between px-4">
      {/* Left Section - Logo & Project Name */}
      <div className="flex items-center gap-4">
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-sm font-bold text-primary-foreground">B</span>
          </div>
          <span className="font-semibold text-foreground hidden sm:block">BMAD Workspace</span>
        </motion.div>

        <div className="h-6 w-px bg-border" />

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">my-bmad-app</span>
          {userTier !== 'free' && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-secondary/20 text-secondary border border-secondary/30">
              {userTier.toUpperCase()}
            </span>
          )}
        </div>
      </div>

      {/* Center Section - Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="glass"
          size="sm"
          onClick={handleRun}
          disabled={isRunning}
          className="gap-2"
        >
          {isRunning ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-4 h-4 text-accent" />
            </motion.div>
          ) : (
            <Play className="w-4 h-4" />
          )}
          <span className="hidden sm:inline">Run</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="glass" size="sm" className="gap-2">
              <Bug className="w-4 h-4" />
              <span className="hidden sm:inline">Debug</span>
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-48">
            <DropdownMenuItem onClick={handleDebugExport}>
              <Download className="w-4 h-4 mr-2" />
              Export to VS Code
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bug className="w-4 h-4 mr-2" />
              Debug Console
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Share2 className="w-4 h-4 mr-2" />
              Share Debug Session
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Right Section - AI & Credits */}
      <div className="flex items-center gap-3">
        {/* AI Credits */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">
            {userTier === 'enterprise' ? '∞' : aiCredits}
          </span>
          <span className="text-xs text-muted-foreground hidden sm:inline">credits</span>
        </div>

        {/* AI Toggle */}
        <Button
          variant={showAI ? 'premium' : 'glass'}
          size="sm"
          onClick={onAIToggle}
          className="gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span className="hidden sm:inline">AI Assistant</span>
        </Button>

        {/* Upgrade Button (for free tier) */}
        {userTier === 'free' && (
          <Button
            variant="premium"
            size="sm"
            onClick={onUpgradeClick}
            className="gap-2"
          >
            <Crown className="w-4 h-4" />
            <span className="hidden sm:inline">Upgrade</span>
          </Button>
        )}
      </div>
    </header>
  )
}
