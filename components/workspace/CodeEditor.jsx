'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Editor from '@monaco-editor/react'
import { Button } from '@/components/ui/button'
import {
  Sparkles,
  Copy,
  Check,
  Wand2,
  FileCode,
  MoreHorizontal,
  Maximize2,
  Minimize2
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'

export function CodeEditor({ code, onChange, filename, onAIRequest }) {
  const [copied, setCopied] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [aiSuggestion, setAiSuggestion] = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const editorRef = useRef(null)

  const handleEditorMount = (editor) => {
    editorRef.current = editor
  }

  const getLanguage = (filename) => {
    if (filename.endsWith('.jsx') || filename.endsWith('.js')) return 'javascript'
    if (filename.endsWith('.json')) return 'json'
    if (filename.endsWith('.css')) return 'css'
    if (filename.endsWith('.html')) return 'html'
    return 'plaintext'
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    toast.success('Code copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleAIComplete = async () => {
    if (!onAIRequest()) return

    setIsGenerating(true)
    toast.info('AI Generating...', { description: 'Analyzing code context' })

    // Simulate AI generation
    setTimeout(() => {
      const suggestions = [
        `\n\n// AI Suggestion: Add error handling\ntry {\n  // Your code here\n} catch (error) {\n  console.error('Error:', error)\n}`,
        `\n\n// AI Suggestion: Add loading state\nconst [loading, setLoading] = useState(false)`,
        `\n\n// AI Suggestion: Optimize with useMemo\nconst memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])`
      ]
      const suggestion = suggestions[Math.floor(Math.random() * suggestions.length)]
      setAiSuggestion(suggestion)
      setIsGenerating(false)
      toast.success('AI suggestion ready', { description: 'Press Tab to accept' })
    }, 1500)
  }

  const acceptSuggestion = () => {
    if (aiSuggestion) {
      onChange(code + aiSuggestion)
      setAiSuggestion(null)
      toast.success('Suggestion applied')
    }
  }

  const handleAIRefactor = () => {
    if (!onAIRequest()) return
    toast.info('AI Refactoring', { description: 'Optimizing code structure...' })
    setTimeout(() => {
      toast.success('Refactoring complete', { description: 'Code has been optimized' })
    }, 2000)
  }

  return (
    <motion.div
      className={`h-full flex flex-col bg-card ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}
      layout
    >
      {/* Editor Header */}
      <div className="h-10 flex items-center justify-between px-4 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium">{filename}</span>
        </div>

        <div className="flex items-center gap-1">
          {/* AI Actions */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleAIComplete}
            disabled={isGenerating}
            className="relative"
          >
            {isGenerating ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
              </motion.div>
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm">
                <Wand2 className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleAIComplete}>
                <Sparkles className="w-4 h-4 mr-2" />
                AI Complete
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleAIRefactor}>
                <Wand2 className="w-4 h-4 mr-2" />
                AI Refactor
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="w-px h-4 bg-border mx-1" />

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="w-4 h-4 text-success" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 relative">
        <Editor
          height="100%"
          language={getLanguage(filename)}
          value={code}
          onChange={(value) => onChange(value || '')}
          onMount={handleEditorMount}
          theme="vs-dark"
          options={{
            fontSize: 14,
            fontFamily: "'JetBrains Mono', monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            padding: { top: 16, bottom: 16 },
            lineNumbers: 'on',
            glyphMargin: false,
            folding: true,
            lineDecorationsWidth: 10,
            lineNumbersMinChars: 3,
            renderLineHighlight: 'line',
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            smoothScrolling: true,
            wordWrap: 'on',
            tabSize: 2,
          }}
        />

        {/* AI Suggestion Overlay */}
        <AnimatePresence>
          {aiSuggestion && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-4 left-4 right-4 glass-card p-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium mb-2">AI Suggestion</p>
                  <pre className="text-xs text-muted-foreground bg-muted/50 p-2 rounded overflow-x-auto">
                    <code>{aiSuggestion}</code>
                  </pre>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-3">
                <Button variant="ghost" size="sm" onClick={() => setAiSuggestion(null)}>
                  Dismiss
                </Button>
                <Button variant="default" size="sm" onClick={acceptSuggestion}>
                  Accept (Tab)
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
