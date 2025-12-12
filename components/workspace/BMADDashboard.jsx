'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'
import {
  Hammer,
  BarChart3,
  Brain,
  Rocket,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Lock,
  Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'

const bmadStages = [
  {
    id: 'build',
    label: 'Build',
    icon: Hammer,
    color: 'text-primary',
    bgColor: 'bg-primary/20',
    description: 'Code generation & compilation'
  },
  {
    id: 'measure',
    label: 'Measure',
    icon: BarChart3,
    color: 'text-accent',
    bgColor: 'bg-accent/20',
    description: 'Performance metrics & analytics'
  },
  {
    id: 'analyze',
    label: 'Analyze',
    icon: Brain,
    color: 'text-secondary',
    bgColor: 'bg-secondary/20',
    description: 'AI-powered insights'
  },
  {
    id: 'deploy',
    label: 'Deploy',
    icon: Rocket,
    color: 'text-success',
    bgColor: 'bg-success/20',
    description: 'CI/CD & deployment status'
  }
]

const mockMetrics = {
  build: {
    status: 'success',
    time: '2.3s',
    tasks: [
      { name: 'Compile TypeScript', status: 'complete', time: '0.8s' },
      { name: 'Bundle Assets', status: 'complete', time: '1.2s' },
      { name: 'Generate Types', status: 'complete', time: '0.3s' }
    ]
  },
  measure: {
    performance: 94,
    accessibility: 100,
    seo: 92,
    bestPractices: 96
  },
  analyze: {
    suggestions: 3,
    issues: 1,
    optimizations: 2
  },
  deploy: {
    status: 'ready',
    lastDeploy: '2 hours ago',
    environment: 'staging'
  }
}

export function BMADDashboard({ userTier }) {
  const [expanded, setExpanded] = useState(true)
  const [activeStage, setActiveStage] = useState('build')

  const renderStageContent = () => {
    switch (activeStage) {
      case 'build':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Build Status</span>
              <span className="flex items-center gap-1 text-success text-sm">
                <CheckCircle2 className="w-4 h-4" />
                Success
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Build time: {mockMetrics.build.time}</span>
            </div>
            <div className="space-y-2 mt-4">
              {mockMetrics.build.tasks.map((task, index) => (
                <motion.div
                  key={task.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-2 rounded-lg bg-muted/30"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                    <span className="text-sm">{task.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{task.time}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )

      case 'measure':
        return (
          <div className="space-y-4">
            {Object.entries(mockMetrics.measure).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className={cn(
                    "text-sm font-medium",
                    value >= 90 ? "text-success" : value >= 70 ? "text-accent" : "text-destructive"
                  )}>
                    {value}
                  </span>
                </div>
                <Progress value={value} className="h-2" />
              </motion.div>
            ))}
          </div>
        )

      case 'analyze':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 rounded-lg bg-secondary/10 text-center">
                <div className="text-2xl font-bold text-secondary">{mockMetrics.analyze.suggestions}</div>
                <div className="text-xs text-muted-foreground">Suggestions</div>
              </div>
              <div className="p-3 rounded-lg bg-destructive/10 text-center">
                <div className="text-2xl font-bold text-destructive">{mockMetrics.analyze.issues}</div>
                <div className="text-xs text-muted-foreground">Issues</div>
              </div>
              <div className="p-3 rounded-lg bg-success/10 text-center">
                <div className="text-2xl font-bold text-success">{mockMetrics.analyze.optimizations}</div>
                <div className="text-xs text-muted-foreground">Optimized</div>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <div className="p-3 rounded-lg bg-muted/30 flex items-start gap-3">
                <TrendingUp className="w-4 h-4 text-success mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Bundle size reduced by 23%</p>
                  <p className="text-xs text-muted-foreground">Tree-shaking removed unused code</p>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-muted/30 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-accent mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Consider lazy loading</p>
                  <p className="text-xs text-muted-foreground">3 components could be code-split</p>
                </div>
              </div>
            </div>

            {userTier === 'free' && (
              <div className="p-3 rounded-lg border border-secondary/30 bg-secondary/5">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-medium">Deep Analysis</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  Unlock advanced AI insights with Pro
                </p>
                <Button variant="secondary" size="sm" className="w-full">
                  Upgrade to Pro
                </Button>
              </div>
            )}
          </div>
        )

      case 'deploy':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <span className="flex items-center gap-1 text-success text-sm">
                <Zap className="w-4 h-4" />
                Ready to deploy
              </span>
            </div>

            <div className="p-3 rounded-lg bg-muted/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Environment</span>
                <span className="text-sm text-primary">{mockMetrics.deploy.environment}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Last Deploy</span>
                <span className="text-sm text-muted-foreground">{mockMetrics.deploy.lastDeploy}</span>
              </div>
            </div>

            <Button variant="success" className="w-full gap-2">
              <Rocket className="w-4 h-4" />
              Deploy to Production
            </Button>

            {userTier !== 'enterprise' && (
              <div className="p-3 rounded-lg border border-secondary/30 bg-secondary/5">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-4 h-4 text-secondary" />
                  <span className="text-sm font-medium">White-Label Deploy</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Custom domain & branding available in Enterprise
                </p>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <motion.aside
      className="h-full border-l border-border bg-card/50 backdrop-blur-sm flex flex-col"
      animate={{ width: expanded ? 280 : 48 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="h-10 flex items-center justify-between px-3 border-b border-border">
        {expanded && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm font-medium gradient-text"
          >
            BMAD Dashboard
          </motion.span>
        )}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setExpanded(!expanded)}
          className="ml-auto"
        >
          {expanded ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Stage Tabs */}
      <div className={cn(
        "flex border-b border-border",
        expanded ? "flex-row p-2 gap-1" : "flex-col p-1 gap-1"
      )}>
        {bmadStages.map((stage) => (
          <motion.button
            key={stage.id}
            onClick={() => setActiveStage(stage.id)}
            className={cn(
              "flex items-center justify-center rounded-lg transition-colors",
              expanded ? "flex-1 p-2 gap-2" : "p-2",
              activeStage === stage.id
                ? `${stage.bgColor} ${stage.color}`
                : "text-muted-foreground hover:bg-muted/50"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <stage.icon className="w-4 h-4" />
            {expanded && (
              <span className="text-xs font-medium">{stage.label}</span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 overflow-hidden"
          >
            <ScrollArea className="h-full p-4">
              <div className="mb-4">
                <h3 className={cn(
                  "text-lg font-semibold",
                  bmadStages.find(s => s.id === activeStage)?.color
                )}>
                  {bmadStages.find(s => s.id === activeStage)?.label}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {bmadStages.find(s => s.id === activeStage)?.description}
                </p>
              </div>
              {renderStageContent()}
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  )
}
