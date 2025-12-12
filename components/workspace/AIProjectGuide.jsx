'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Circle,
  Target,
  Lightbulb,
  Code,
  TestTube,
  Rocket,
  ArrowRight,
  X,
  Star,
  Lock
} from 'lucide-react'
import { cn } from '@/lib/utils'

const projectPhases = [
  {
    id: 'plan',
    title: 'Plan & Spec',
    description: 'Define your project requirements',
    icon: Target,
    tasks: [
      { id: 'requirements', label: 'Define Requirements', completed: true },
      { id: 'architecture', label: 'Design Architecture', completed: true },
      { id: 'speckit', label: 'Generate SpecKit', completed: false },
    ]
  },
  {
    id: 'build',
    title: 'Build',
    description: 'Develop your application',
    icon: Code,
    tasks: [
      { id: 'components', label: 'Create Components', completed: false },
      { id: 'features', label: 'Implement Features', completed: false },
      { id: 'integration', label: 'API Integration', completed: false },
    ]
  },
  {
    id: 'test',
    title: 'Test & Analyze',
    description: 'Verify and optimize',
    icon: TestTube,
    tasks: [
      { id: 'unit', label: 'Unit Tests', completed: false },
      { id: 'performance', label: 'Performance Audit', completed: false },
      { id: 'security', label: 'Security Check', completed: false },
    ]
  },
  {
    id: 'deploy',
    title: 'Deploy',
    description: 'Ship to production',
    icon: Rocket,
    tasks: [
      { id: 'staging', label: 'Deploy to Staging', completed: false },
      { id: 'production', label: 'Production Release', completed: false },
      { id: 'monitor', label: 'Setup Monitoring', completed: false },
    ]
  }
]

const aiSuggestions = [
  {
    id: 1,
    type: 'optimization',
    title: 'Optimize Bundle Size',
    description: 'I detected 3 unused imports that could reduce your bundle by 15%',
    action: 'Auto-fix',
    priority: 'high'
  },
  {
    id: 2,
    type: 'next-step',
    title: 'Complete SpecKit Generation',
    description: 'Generate documentation from your current code to improve maintainability',
    action: 'Generate Now',
    priority: 'medium'
  },
  {
    id: 3,
    type: 'best-practice',
    title: 'Add Error Boundaries',
    description: 'Your app would benefit from React error boundaries for better UX',
    action: 'Learn More',
    priority: 'low'
  }
]

export function AIProjectGuide({ isOpen, onClose, userTier, onUpgrade }) {
  const [activePhase, setActivePhase] = useState('plan')
  const [projectProgress, setProjectProgress] = useState(22)
  const [tasks, setTasks] = useState(projectPhases)

  const toggleTask = (phaseId, taskId) => {
    setTasks(prev => prev.map(phase => {
      if (phase.id === phaseId) {
        return {
          ...phase,
          tasks: phase.tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
          )
        }
      }
      return phase
    }))
    // Update progress
    const total = tasks.reduce((acc, p) => acc + p.tasks.length, 0)
    const completed = tasks.reduce((acc, p) => acc + p.tasks.filter(t => t.completed).length, 0)
    setProjectProgress(Math.round((completed / total) * 100))
  }

  const currentPhase = tasks.find(p => p.id === activePhase)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -320 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -320 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed left-0 top-14 bottom-0 w-80 bg-card border-r border-border shadow-2xl flex flex-col z-40"
        >
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">AI Project Guide</h3>
                  <p className="text-xs text-muted-foreground">Your intelligent assistant</p>
                </div>
              </div>
              <Button variant="ghost" size="icon-sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Project Progress</span>
                <span className="text-primary font-medium">{projectProgress}%</span>
              </div>
              <Progress value={projectProgress} className="h-2" />
            </div>
          </div>

          {/* Phase Tabs */}
          <div className="flex border-b border-border">
            {tasks.map((phase) => (
              <button
                key={phase.id}
                onClick={() => setActivePhase(phase.id)}
                className={cn(
                  "flex-1 py-2 px-1 text-xs font-medium border-b-2 transition-colors",
                  activePhase === phase.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <phase.icon className="w-4 h-4 mx-auto mb-1" />
                {phase.title.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Phase Content */}
          <div className="flex-1 overflow-auto p-4">
            {currentPhase && (
              <motion.div
                key={currentPhase.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div>
                  <h4 className="font-semibold text-foreground">{currentPhase.title}</h4>
                  <p className="text-xs text-muted-foreground">{currentPhase.description}</p>
                </div>

                {/* Tasks */}
                <div className="space-y-2">
                  {currentPhase.tasks.map((task, index) => (
                    <motion.button
                      key={task.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => toggleTask(currentPhase.id, task.id)}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left",
                        task.completed
                          ? "border-primary/30 bg-primary/5"
                          : "border-border hover:border-primary/30 hover:bg-muted/50"
                      )}
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      )}
                      <span className={cn(
                        "text-sm",
                        task.completed ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {task.label}
                      </span>
                      <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* AI Suggestions */}
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-secondary" />
              <span className="text-xs font-medium">AI Suggestions</span>
            </div>

            <div className="space-y-2">
              {aiSuggestions.slice(0, userTier === 'free' ? 1 : 3).map((suggestion) => (
                <motion.div
                  key={suggestion.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 rounded-lg bg-muted/50 border border-border"
                >
                  <div className="flex items-start gap-2">
                    <div className={cn(
                      "w-2 h-2 rounded-full mt-1.5 flex-shrink-0",
                      suggestion.priority === 'high' ? "bg-destructive" :
                      suggestion.priority === 'medium' ? "bg-secondary" : "bg-muted-foreground"
                    )} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium">{suggestion.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {suggestion.description}
                      </p>
                    </div>
                  </div>
                  <Button variant="neon" size="sm" className="w-full mt-2 h-7 text-xs">
                    {suggestion.action}
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </motion.div>
              ))}

              {userTier === 'free' && (
                <div className="p-3 rounded-lg border border-premium/30 bg-premium/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="w-4 h-4 text-premium" />
                    <span className="text-xs font-medium">Unlock All Suggestions</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Get unlimited AI guidance with Pro
                  </p>
                  <Button variant="premium" size="sm" className="w-full h-7 text-xs" onClick={onUpgrade}>
                    <Star className="w-3 h-3" />
                    Upgrade to Pro
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
