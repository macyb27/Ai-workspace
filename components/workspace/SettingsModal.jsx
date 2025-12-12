'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Key,
  Cloud,
  Smartphone,
  Settings2,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  ExternalLink
} from 'lucide-react'
import { toast } from 'sonner'

const apiProviders = [
  {
    id: 'google',
    name: 'Google Cloud',
    icon: Cloud,
    description: 'Firebase, Cloud Functions, Vertex AI',
    connected: false
  },
  {
    id: 'android',
    name: 'Android Studio',
    icon: Smartphone,
    description: 'Android SDK, Emulator, Play Console',
    connected: false
  },
  {
    id: 'openai',
    name: 'OpenAI',
    icon: Key,
    description: 'GPT-4, DALL-E, Whisper',
    connected: true
  }
]

export function SettingsModal({ isOpen, onClose, userTier }) {
  const [showKeys, setShowKeys] = useState({})
  const [apiKeys, setApiKeys] = useState({
    google: '',
    android: '',
    openai: 'sk-••••••••••••••••••••••••'
  })
  const [preferences, setPreferences] = useState({
    autoSave: true,
    aiSuggestions: true,
    darkMode: true,
    notifications: true
  })

  const handleConnect = (providerId) => {
    toast.success(`Connecting to ${providerId}...`, {
      description: 'Opening authentication window'
    })
  }

  const handleSaveKey = (providerId) => {
    toast.success('API Key saved', {
      description: `${providerId} has been configured`
    })
  }

  const toggleShowKey = (providerId) => {
    setShowKeys(prev => ({ ...prev, [providerId]: !prev[providerId] }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-primary" />
            Settings & API Keys
          </DialogTitle>
          <DialogDescription>
            Configure your development environment and connect external services
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="api" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="api">API Connections</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="api" className="flex-1 overflow-auto mt-4 space-y-4">
            {apiProviders.map((provider, index) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg border border-border bg-muted/30"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <provider.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium flex items-center gap-2">
                        {provider.name}
                        {provider.connected && (
                          <span className="flex items-center gap-1 text-xs text-success">
                            <Check className="w-3 h-3" />
                            Connected
                          </span>
                        )}
                      </h4>
                      <p className="text-sm text-muted-foreground">{provider.description}</p>
                    </div>
                  </div>
                  <Button
                    variant={provider.connected ? "outline" : "default"}
                    size="sm"
                    onClick={() => handleConnect(provider.id)}
                  >
                    {provider.connected ? 'Manage' : 'Connect'}
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`key-${provider.id}`} className="text-xs text-muted-foreground">
                    API Key
                  </Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        id={`key-${provider.id}`}
                        type={showKeys[provider.id] ? 'text' : 'password'}
                        value={apiKeys[provider.id]}
                        onChange={(e) => setApiKeys(prev => ({ ...prev, [provider.id]: e.target.value }))}
                        placeholder="Enter API key..."
                        className="pr-10"
                      />
                      <button
                        onClick={() => toggleShowKey(provider.id)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showKeys[provider.id] ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSaveKey(provider.id)}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="p-4 rounded-lg border border-dashed border-border bg-muted/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Need more integrations?</p>
                  <p className="text-xs text-muted-foreground">Request new API connections</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="gap-2">
                Request
                <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="flex-1 overflow-auto mt-4 space-y-4">
            {[
              { key: 'autoSave', label: 'Auto Save', description: 'Automatically save changes every 30 seconds' },
              { key: 'aiSuggestions', label: 'AI Suggestions', description: 'Show inline AI code suggestions' },
              { key: 'darkMode', label: 'Dark Mode', description: 'Use dark theme for the workspace' },
              { key: 'notifications', label: 'Notifications', description: 'Receive build and deploy notifications' }
            ].map((pref, index) => (
              <motion.div
                key={pref.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30"
              >
                <div>
                  <h4 className="font-medium">{pref.label}</h4>
                  <p className="text-sm text-muted-foreground">{pref.description}</p>
                </div>
                <Switch
                  checked={preferences[pref.key]}
                  onCheckedChange={(checked) => {
                    setPreferences(prev => ({ ...prev, [pref.key]: checked }))
                    toast.success(`${pref.label} ${checked ? 'enabled' : 'disabled'}`)
                  }}
                />
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
