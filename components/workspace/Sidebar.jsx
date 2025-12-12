'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  ChevronLeft,
  ChevronRight,
  FileCode,
  FileJson,
  FileText,
  Folder,
  FolderOpen,
  Settings,
  CreditCard,
  Plus,
  MoreVertical,
  Layers,
  Boxes,
  GitBranch,
  Search,
  Lock
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const getFileIcon = (filename) => {
  if (filename.endsWith('.jsx') || filename.endsWith('.js')) {
    return <FileCode className="w-4 h-4 text-accent" />
  }
  if (filename.endsWith('.json')) {
    return <FileJson className="w-4 h-4 text-success" />
  }
  if (filename.endsWith('.css')) {
    return <FileText className="w-4 h-4 text-primary" />
  }
  return <FileText className="w-4 h-4 text-muted-foreground" />
}

export function Sidebar({
  expanded,
  onToggle,
  files,
  activeFile,
  onFileSelect,
  onSettingsClick,
  onPricingClick,
  userTier
}) {
  const [foldersOpen, setFoldersOpen] = useState({ src: true, components: false })
  const [advancedMenuOpen, setAdvancedMenuOpen] = useState(false)

  const toggleFolder = (folder) => {
    setFoldersOpen(prev => ({ ...prev, [folder]: !prev[folder] }))
  }

  const navItems = [
    { icon: Layers, label: 'Explorer', active: true },
    { icon: Search, label: 'Search', active: false },
    { icon: GitBranch, label: 'Source Control', active: false },
    { icon: Boxes, label: 'Extensions', active: false, premium: true },
  ]

  return (
    <motion.aside
      className="h-full bg-sidebar border-r border-sidebar-border flex"
      animate={{ width: expanded ? 280 : 60 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Icon Bar */}
      <div className="w-[60px] flex flex-col items-center py-4 border-r border-sidebar-border">
        {navItems.map((item, index) => (
          <motion.button
            key={item.label}
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center mb-2 relative group",
              item.active
                ? "bg-sidebar-accent text-sidebar-primary"
                : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <item.icon className="w-5 h-5" />
            {item.premium && userTier === 'free' && (
              <Lock className="w-3 h-3 absolute -top-1 -right-1 text-secondary" />
            )}
            {!expanded && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                {item.label}
                {item.premium && userTier === 'free' && ' (Pro)'}
              </div>
            )}
          </motion.button>
        ))}

        <div className="flex-1" />

        {/* Advanced Functions - Surprise Effect */}
        <motion.div
          className="relative"
          onHoverStart={() => setAdvancedMenuOpen(true)}
          onHoverEnd={() => setAdvancedMenuOpen(false)}
        >
          <motion.button
            className="w-10 h-10 rounded-lg flex items-center justify-center text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
          >
            <Settings className="w-5 h-5" />
          </motion.button>

          <AnimatePresence>
            {advancedMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-0 left-full ml-2 w-48 glass-card p-2 z-50"
              >
                <button
                  onClick={onSettingsClick}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted text-left"
                >
                  <Settings className="w-4 h-4" />
                  API Keys & Settings
                </button>
                <button
                  onClick={onPricingClick}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted text-left"
                >
                  <CreditCard className="w-4 h-4" />
                  Subscription
                </button>
                <button
                  onClick={() => toast.info('ML Model Config', { description: 'Coming soon in Pro tier' })}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted text-left relative"
                >
                  <Boxes className="w-4 h-4" />
                  ML Models
                  {userTier === 'free' && <Lock className="w-3 h-3 ml-auto text-secondary" />}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* File Explorer */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 220 }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="h-10 flex items-center justify-between px-4 border-b border-sidebar-border">
              <span className="text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wider">
                Explorer
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="h-6 w-6"
                  onClick={() => toast.success('New file created')}
                >
                  <Plus className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="h-6 w-6"
                  onClick={onToggle}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            {/* File Tree */}
            <ScrollArea className="flex-1 px-2 py-2">
              {/* Project Root */}
              <div className="mb-1">
                <button
                  onClick={() => toggleFolder('src')}
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-sidebar-accent/50 text-left"
                >
                  {foldersOpen.src ? (
                    <FolderOpen className="w-4 h-4 text-accent" />
                  ) : (
                    <Folder className="w-4 h-4 text-accent" />
                  )}
                  <span>src</span>
                </button>

                <AnimatePresence>
                  {foldersOpen.src && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="ml-4 overflow-hidden"
                    >
                      {files.map((file) => (
                        <motion.button
                          key={file}
                          onClick={() => onFileSelect(file)}
                          className={cn(
                            "w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-md text-left group",
                            activeFile === file
                              ? "bg-sidebar-accent text-sidebar-accent-foreground"
                              : "hover:bg-sidebar-accent/50 text-sidebar-foreground/80"
                          )}
                          whileHover={{ x: 2 }}
                        >
                          {getFileIcon(file)}
                          <span className="truncate flex-1">{file}</span>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <span
                                className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-muted rounded cursor-pointer"
                              >
                                <MoreVertical className="w-3 h-3" />
                              </span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Rename</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed Toggle */}
      {!expanded && (
        <button
          onClick={onToggle}
          className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-sidebar-accent border border-sidebar-border flex items-center justify-center hover:bg-sidebar-primary hover:text-sidebar-primary-foreground transition-colors z-10"
        >
          <ChevronRight className="w-3 h-3" />
        </button>
      )}
    </motion.aside>
  )
}
