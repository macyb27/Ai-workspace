'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Sparkles,
  Code,
  BarChart3,
  Rocket,
  ChevronRight,
  ChevronLeft,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

const onboardingSteps = [
  {
    title: 'Welcome to BMAD Workspace',
    description: 'The next-generation developer environment with AI-powered orchestration.',
    icon: Sparkles,
    color: 'text-primary',
    image: null,
    content: (
      <div className="space-y-4 text-center">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <span className="text-3xl font-bold text-primary-foreground">B</span>
        </div>
        <p className="text-muted-foreground">
          Build, Measure, Analyze, and Deploy your applications with intelligent assistance at every step.
        </p>
      </div>
    )
  },
  {
    title: 'AI-Powered Code Editor',
    description: 'Write code faster with intelligent suggestions and completions.',
    icon: Code,
    color: 'text-accent',
    content: (
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-muted/50 border border-border">
          <pre className="text-sm font-mono text-left overflow-auto">
            <code className="text-muted-foreground">{`// Start typing and let AI complete
function `}</code>
            <code className="text-primary animate-pulse">{`calculateTotal(items) {
  return items.reduce((sum, item) => 
    sum + item.price * item.qty, 0
  )
}`}</code>
          </pre>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Press <kbd className="px-2 py-0.5 rounded bg-muted">Tab</kbd> to accept AI suggestions
        </p>
      </div>
    )
  },
  {
    title: 'BMAD Dashboard',
    description: 'Monitor your entire development lifecycle in real-time.',
    icon: BarChart3,
    color: 'text-secondary',
    content: (
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Build', status: 'Success', time: '2.3s', color: 'text-primary' },
          { label: 'Measure', status: '94%', time: 'Perf Score', color: 'text-accent' },
          { label: 'Analyze', status: '3 Tips', time: 'AI Insights', color: 'text-secondary' },
          { label: 'Deploy', status: 'Ready', time: 'Staging', color: 'text-success' }
        ].map((item) => (
          <div
            key={item.label}
            className="p-3 rounded-lg bg-muted/50 border border-border text-center"
          >
            <div className={cn("text-lg font-bold", item.color)}>{item.status}</div>
            <div className="text-xs text-muted-foreground">{item.label}</div>
          </div>
        ))}
      </div>
    )
  },
  {
    title: 'Ready to Launch',
    description: 'Deploy your applications with one click.',
    icon: Rocket,
    color: 'text-success',
    content: (
      <div className="space-y-4 text-center">
        <motion.div
          className="w-16 h-16 mx-auto rounded-full bg-success/20 flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Rocket className="w-8 h-8 text-success" />
        </motion.div>
        <p className="text-muted-foreground">
          Connect your API keys in Settings to enable deployment to Google Cloud, Android, and more.
        </p>
      </div>
    )
  }
]

export function OnboardingModal({ isOpen, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  const step = onboardingSteps[currentStep]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-lg mx-4 glass-card p-6"
          >
            {/* Close Button */}
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Step Indicator */}
            <div className="flex justify-center gap-2 mb-6">
              {onboardingSteps.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    index === currentStep ? "bg-primary" : "bg-muted"
                  )}
                />
              ))}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <div className={cn(
                    "w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-4",
                    `bg-muted`
                  )}>
                    <step.icon className={cn("w-6 h-6", step.color)} />
                  </div>
                  <h2 className="text-xl font-bold mb-2">{step.title}</h2>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>

                <div className="min-h-[180px] flex items-center justify-center">
                  {step.content}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
              <Button
                variant="ghost"
                onClick={handlePrev}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>

              <Button
                variant="ghost"
                onClick={handleSkip}
                className="text-muted-foreground"
              >
                Skip
              </Button>

              <Button onClick={handleNext}>
                {currentStep === onboardingSteps.length - 1 ? (
                  'Get Started'
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
