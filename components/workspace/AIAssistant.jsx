'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import {
  X,
  Send,
  Sparkles,
  Code,
  FileCode,
  Zap,
  Bot,
  User,
  Copy,
  Check,
  Lock
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const quickActions = [
  { label: 'Generate Component', icon: Code, prompt: 'Generate a React component for...' },
  { label: 'Explain Code', icon: FileCode, prompt: 'Explain what this code does...' },
  { label: 'Optimize', icon: Zap, prompt: 'Optimize this code for performance...' },
]

const sampleResponses = [
  {
    type: 'code',
    content: `// Here's a modern Button component\nimport { cn } from '@/lib/utils'\n\nexport function Button({ variant = 'default', children, ...props }) {\n  return (\n    <button\n      className={cn(\n        'px-4 py-2 rounded-lg font-medium transition-all',\n        variant === 'primary' && 'bg-primary text-primary-foreground',\n        variant === 'ghost' && 'bg-transparent hover:bg-muted'\n      )}\n      {...props}\n    >\n      {children}\n    </button>\n  )\n}`
  },
  {
    type: 'text',
    content: "I've analyzed your code and here are my suggestions:\n\n1. **Use useMemo** for expensive computations\n2. **Add error boundaries** for better error handling\n3. **Implement lazy loading** for the heavy components\n\nWould you like me to implement any of these optimizations?"
  },
  {
    type: 'text',
    content: "Great question! This code creates a responsive grid layout using CSS Grid. The `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))` ensures cards automatically wrap and maintain a minimum width of 300px while expanding to fill available space."
  }
]

export function AIAssistant({ isOpen, onClose, onAIRequest, userTier, aiCredits }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm your AI assistant powered by advanced orchestration. How can I help you build something amazing today?",
      type: 'text'
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState(null)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return
    if (!onAIRequest()) return

    const userMessage = { role: 'user', content: input, type: 'text' }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const response = sampleResponses[Math.floor(Math.random() * sampleResponses.length)]
      setMessages(prev => [...prev, { role: 'assistant', ...response }])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickAction = (prompt) => {
    setInput(prompt)
    inputRef.current?.focus()
  }

  const handleCopy = async (content, index) => {
    await navigator.clipboard.writeText(content)
    setCopiedIndex(index)
    toast.success('Copied to clipboard')
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 bottom-0 w-96 bg-card border-l border-border shadow-2xl flex flex-col z-50"
        >
          {/* Header */}
          <div className="h-14 flex items-center justify-between px-4 border-b border-border bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">AI Assistant</h3>
                <p className="text-xs text-muted-foreground">Powered by Gemini 3</p>
              </div>
            </div>
            <Button variant="ghost" size="icon-sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="p-3 border-b border-border">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  variant="outline"
                  size="sm"
                  className="flex-shrink-0 gap-1.5 text-xs"
                  onClick={() => handleQuickAction(action.prompt)}
                >
                  <action.icon className="w-3.5 h-3.5" />
                  {action.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-3",
                    message.role === 'user' ? "flex-row-reverse" : ""
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                    message.role === 'user'
                      ? "bg-muted"
                      : "bg-gradient-to-br from-primary/20 to-secondary/20"
                  )}>
                    {message.role === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <div className={cn(
                    "flex-1 rounded-lg p-3 max-w-[85%]",
                    message.role === 'user'
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-muted/50"
                  )}>
                    {message.type === 'code' ? (
                      <div className="relative">
                        <pre className="text-xs overflow-x-auto p-2 bg-background/50 rounded">
                          <code>{message.content}</code>
                        </pre>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="absolute top-1 right-1"
                          onClick={() => handleCopy(message.content, index)}
                        >
                          {copiedIndex === index ? (
                            <Check className="w-3 h-3 text-success" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                    ) : (
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex gap-1">
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
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>

          {/* Credits Warning */}
          {userTier === 'free' && aiCredits <= 10 && (
            <div className="px-4 py-2 bg-accent/10 border-t border-accent/20">
              <div className="flex items-center gap-2 text-accent">
                <Lock className="w-4 h-4" />
                <span className="text-xs">{aiCredits} credits remaining. Upgrade for more!</span>
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border bg-muted/20">
            <div className="flex gap-2">
              <Textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="min-h-[44px] max-h-32 resize-none"
                rows={1}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
