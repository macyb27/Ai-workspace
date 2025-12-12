'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocalStorage } from '@/hooks/useLocalStorage'

// Dynamically import Workspace to avoid SSR issues
const Workspace = dynamic(() => import('@/components/workspace/Workspace').then(mod => ({ default: mod.Workspace })), {
  ssr: false,
  loading: () => null
})

const OnboardingModal = dynamic(() => import('@/components/workspace/OnboardingModal').then(mod => ({ default: mod.OnboardingModal })), {
  ssr: false,
  loading: () => null
})

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [showOnboarding, setShowOnboarding] = useLocalStorage('bmad-onboarding-complete', false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          >
            <div className="flex flex-col items-center gap-6">
              <motion.div
                className="relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Animated Logo */}
                <div className="relative w-24 h-24">
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-secondary"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    style={{ opacity: 0.2 }}
                  />
                  <motion.div
                    className="absolute inset-2 rounded-xl bg-gradient-to-br from-primary/80 to-secondary/80"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    style={{ opacity: 0.4 }}
                  />
                  <div className="absolute inset-4 rounded-lg bg-card flex items-center justify-center">
                    <span className="text-2xl font-bold gradient-text">B</span>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center gap-2"
              >
                <h1 className="text-xl font-semibold text-foreground">BMAD Workspace</h1>
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="workspace"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
          >
            <Workspace />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Onboarding Modal */}
      {!isLoading && !showOnboarding && (
        <OnboardingModal
          isOpen={!showOnboarding}
          onComplete={() => setShowOnboarding(true)}
        />
      )}
    </>
  )
}
