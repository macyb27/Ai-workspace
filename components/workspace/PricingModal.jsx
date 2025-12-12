'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Check,
  Crown,
  Sparkles,
  Zap,
  Building2,
  Lock
} from 'lucide-react'
import { cn } from '@/lib/utils'

const tiers = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for exploring BMAD',
    icon: Sparkles,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/30',
    features: [
      '50 AI requests/month',
      'Basic SpecKit features',
      'Community support',
      'Standard code editor',
      'Public projects only'
    ],
    limitations: [
      'Limited AI orchestration',
      'No advanced analytics',
      'No ML model storage'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$19',
    period: 'per month',
    description: 'For professional developers',
    icon: Crown,
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
    borderColor: 'border-secondary/50',
    popular: true,
    features: [
      '500 AI requests/month',
      'Full SpecKit access',
      'Priority support',
      'Advanced code analysis',
      'Private repositories',
      'Deep dive submenus',
      'Performance insights',
      'Custom themes'
    ],
    limitations: []
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$99',
    period: 'per month',
    description: 'For teams and organizations',
    icon: Building2,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    borderColor: 'border-accent/50',
    features: [
      'Unlimited AI requests',
      'Dedicated ML training slots',
      'White-label deployment',
      '24/7 premium support',
      'Custom integrations',
      'Team collaboration',
      'SSO & advanced security',
      'SLA guarantee',
      'API access'
    ],
    limitations: []
  }
]

export function PricingModal({ isOpen, onClose, currentTier, onSelectTier }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl flex items-center justify-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            Choose Your Plan
          </DialogTitle>
          <DialogDescription>
            Unlock the full potential of BMAD Workspace
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative p-6 rounded-xl border-2 flex flex-col",
                tier.popular
                  ? `${tier.borderColor} ${tier.bgColor}`
                  : "border-border bg-card",
                currentTier === tier.id && "ring-2 ring-primary ring-offset-2 ring-offset-background"
              )}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-secondary text-secondary-foreground">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={cn(
                  "w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center",
                  tier.bgColor
                )}>
                  <tier.icon className={cn("w-6 h-6", tier.color)} />
                </div>
                <h3 className="text-xl font-bold">{tier.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground text-sm">/{tier.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{tier.description}</p>
              </div>

              <div className="flex-1 space-y-3 mb-6">
                {tier.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className={cn("w-4 h-4 mt-0.5 flex-shrink-0", tier.color)} />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
                {tier.limitations.map((limitation, i) => (
                  <div key={i} className="flex items-start gap-2 text-muted-foreground">
                    <Lock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="text-sm line-through">{limitation}</span>
                  </div>
                ))}
              </div>

              <Button
                variant={currentTier === tier.id ? "outline" : tier.popular ? "premium" : "default"}
                className="w-full mt-auto"
                onClick={() => onSelectTier(tier.id)}
                disabled={currentTier === tier.id}
              >
                {currentTier === tier.id ? 'Current Plan' : tier.id === 'free' ? 'Downgrade' : 'Upgrade'}
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            All plans include a 14-day free trial. Cancel anytime.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
