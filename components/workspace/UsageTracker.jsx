'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Sparkles, Zap, TrendingUp } from 'lucide-react'

export function UsageTracker({ aiCredits, maxCredits, onUpgrade }) {
  const usagePercent = (aiCredits / maxCredits) * 100
  const isLow = aiCredits <= 10
  const isCritical = aiCredits <= 5

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-12 border-t border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-4"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className={`w-4 h-4 ${isCritical ? 'text-destructive' : isLow ? 'text-warning' : 'text-primary'}`} />
          <span className="text-sm">
            <span className={`font-semibold ${isCritical ? 'text-destructive' : isLow ? 'text-warning' : 'text-primary'}`}>
              {aiCredits}
            </span>
            <span className="text-muted-foreground"> / {maxCredits} AI credits</span>
          </span>
        </div>

        <div className="w-32">
          <Progress 
            value={usagePercent} 
            className={`h-2 ${isCritical ? '[&>div]:bg-destructive' : isLow ? '[&>div]:bg-warning' : ''}`}
          />
        </div>

        {isLow && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-warning"
          >
            Running low on credits!
          </motion.span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <TrendingUp className="w-3 h-3" />
          <span>Avg: 8 credits/day</span>
        </div>

        <Button variant="premium" size="sm" onClick={onUpgrade} className="gap-2">
          <Zap className="w-4 h-4" />
          Get More Credits
        </Button>
      </div>
    </motion.div>
  )
}
