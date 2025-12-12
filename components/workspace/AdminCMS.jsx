'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  X,
  Users,
  CreditCard,
  FileText,
  Settings,
  TrendingUp,
  DollarSign,
  Activity,
  UserPlus,
  Search,
  MoreVertical,
  ChevronRight,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Clock,
  Crown,
  Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const mockUsers = [
  { id: 1, name: 'Alex Chen', email: 'alex@example.com', tier: 'pro', credits: 450, status: 'active', joined: '2024-01-15' },
  { id: 2, name: 'Maria Garcia', email: 'maria@example.com', tier: 'enterprise', credits: 9999, status: 'active', joined: '2024-02-20' },
  { id: 3, name: 'John Smith', email: 'john@example.com', tier: 'free', credits: 12, status: 'active', joined: '2024-03-10' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', tier: 'pro', credits: 280, status: 'inactive', joined: '2024-01-25' },
  { id: 5, name: 'Mike Johnson', email: 'mike@example.com', tier: 'free', credits: 0, status: 'churned', joined: '2024-02-05' },
]

const mockRevenue = [
  { month: 'Jan', revenue: 4500, users: 120 },
  { month: 'Feb', revenue: 5200, users: 145 },
  { month: 'Mar', revenue: 6800, users: 180 },
  { month: 'Apr', revenue: 8100, users: 220 },
  { month: 'May', revenue: 9500, users: 275 },
  { month: 'Jun', revenue: 11200, users: 340 },
]

const mockSpecKits = [
  { id: 1, name: 'E-commerce Platform', version: '2.1.0', updated: '2 hours ago', status: 'current' },
  { id: 2, name: 'Mobile Banking App', version: '1.5.2', updated: '1 day ago', status: 'current' },
  { id: 3, name: 'SaaS Dashboard', version: '3.0.0', updated: '3 days ago', status: 'outdated' },
]

export function AdminCMS({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')

  const stats = [
    { label: 'Total Users', value: '1,247', change: '+12%', icon: Users, color: 'text-primary' },
    { label: 'Monthly Revenue', value: '$11,200', change: '+18%', icon: DollarSign, color: 'text-secondary' },
    { label: 'Active Sessions', value: '342', change: '+5%', icon: Activity, color: 'text-accent' },
    { label: 'Conversion Rate', value: '4.2%', change: '+0.8%', icon: TrendingUp, color: 'text-success' },
  ]

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getTierBadge = (tier) => {
    switch (tier) {
      case 'enterprise':
        return <Badge className="bg-accent/20 text-accent border-accent/30">Enterprise</Badge>
      case 'pro':
        return <Badge className="bg-secondary/20 text-secondary border-secondary/30">Pro</Badge>
      default:
        return <Badge variant="outline">Free</Badge>
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 className="w-4 h-4 text-success" />
      case 'inactive':
        return <Clock className="w-4 h-4 text-warning" />
      case 'churned':
        return <AlertCircle className="w-4 h-4 text-destructive" />
      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* CMS Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-12 bg-card border border-border rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Settings className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Admin CMS</h2>
                  <p className="text-xs text-muted-foreground">Manage users, revenue & SpecKit</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => toast.success('Data refreshed')}>
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </Button>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
              <div className="border-b border-border px-4">
                <TabsList className="h-12 bg-transparent gap-4">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-muted">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="users" className="data-[state=active]:bg-muted">
                    <Users className="w-4 h-4 mr-2" />
                    Users
                  </TabsTrigger>
                  <TabsTrigger value="revenue" className="data-[state=active]:bg-muted">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Revenue
                  </TabsTrigger>
                  <TabsTrigger value="speckit" className="data-[state=active]:bg-muted">
                    <FileText className="w-4 h-4 mr-2" />
                    SpecKit
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="flex-1 overflow-hidden">
                {/* Overview Tab */}
                <TabsContent value="overview" className="h-full m-0 p-4 overflow-auto">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-xl border border-border bg-muted/30"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <stat.icon className={cn("w-5 h-5", stat.color)} />
                          <span className="text-xs text-success font-medium">{stat.change}</span>
                        </div>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-border">
                      <h3 className="font-semibold mb-3">Recent Activity</h3>
                      <div className="space-y-3">
                        {[
                          { action: 'New Pro subscription', user: 'alex@example.com', time: '2 min ago' },
                          { action: 'API key generated', user: 'maria@example.com', time: '15 min ago' },
                          { action: 'SpecKit exported', user: 'john@example.com', time: '1 hour ago' },
                        ].map((activity, i) => (
                          <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                            <div>
                              <p className="text-sm font-medium">{activity.action}</p>
                              <p className="text-xs text-muted-foreground">{activity.user}</p>
                            </div>
                            <span className="text-xs text-muted-foreground">{activity.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-border">
                      <h3 className="font-semibold mb-3">Tier Distribution</h3>
                      <div className="space-y-3">
                        {[
                          { tier: 'Free', count: 847, percent: 68 },
                          { tier: 'Pro', count: 320, percent: 26 },
                          { tier: 'Enterprise', count: 80, percent: 6 },
                        ].map((item) => (
                          <div key={item.tier} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{item.tier}</span>
                              <span className="text-muted-foreground">{item.count} users</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${item.percent}%` }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className={cn(
                                  "h-full rounded-full",
                                  item.tier === 'Free' ? 'bg-muted-foreground' :
                                  item.tier === 'Pro' ? 'bg-secondary' : 'bg-accent'
                                )}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Users Tab */}
                <TabsContent value="users" className="h-full m-0 flex flex-col overflow-hidden">
                  <div className="p-4 border-b border-border flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <Button variant="neon" size="sm">
                      <UserPlus className="w-4 h-4" />
                      Add User
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                      Export
                    </Button>
                  </div>

                  <ScrollArea className="flex-1">
                    <div className="p-4">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-xs text-muted-foreground border-b border-border">
                            <th className="pb-3 font-medium">User</th>
                            <th className="pb-3 font-medium">Tier</th>
                            <th className="pb-3 font-medium">Credits</th>
                            <th className="pb-3 font-medium">Status</th>
                            <th className="pb-3 font-medium">Joined</th>
                            <th className="pb-3 font-medium"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUsers.map((user, index) => (
                            <motion.tr
                              key={user.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: index * 0.05 }}
                              className="border-b border-border hover:bg-muted/30"
                            >
                              <td className="py-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium text-primary">
                                    {user.name.charAt(0)}
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">{user.name}</p>
                                    <p className="text-xs text-muted-foreground">{user.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3">{getTierBadge(user.tier)}</td>
                              <td className="py-3">
                                <span className={cn(
                                  "text-sm font-medium",
                                  user.credits < 20 ? "text-destructive" : "text-foreground"
                                )}>
                                  {user.tier === 'enterprise' ? '∞' : user.credits}
                                </span>
                              </td>
                              <td className="py-3">
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(user.status)}
                                  <span className="text-sm capitalize">{user.status}</span>
                                </div>
                              </td>
                              <td className="py-3 text-sm text-muted-foreground">{user.joined}</td>
                              <td className="py-3">
                                <Button variant="ghost" size="icon-sm">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </ScrollArea>
                </TabsContent>

                {/* Revenue Tab */}
                <TabsContent value="revenue" className="h-full m-0 p-4 overflow-auto">
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 rounded-xl border border-primary/30 bg-primary/5">
                      <p className="text-xs text-muted-foreground mb-1">Total Revenue (YTD)</p>
                      <p className="text-3xl font-bold text-primary">$45,300</p>
                      <p className="text-xs text-success mt-1">+32% vs last year</p>
                    </div>
                    <div className="p-4 rounded-xl border border-secondary/30 bg-secondary/5">
                      <p className="text-xs text-muted-foreground mb-1">MRR</p>
                      <p className="text-3xl font-bold text-secondary">$11,200</p>
                      <p className="text-xs text-success mt-1">+18% vs last month</p>
                    </div>
                    <div className="p-4 rounded-xl border border-accent/30 bg-accent/5">
                      <p className="text-xs text-muted-foreground mb-1">ARPU</p>
                      <p className="text-3xl font-bold text-accent">$28.00</p>
                      <p className="text-xs text-success mt-1">+$3.50 vs last month</p>
                    </div>
                  </div>

                  {/* Revenue Chart Placeholder */}
                  <div className="p-4 rounded-xl border border-border">
                    <h3 className="font-semibold mb-4">Monthly Revenue Trend</h3>
                    <div className="flex items-end gap-4 h-48">
                      {mockRevenue.map((item, index) => (
                        <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${(item.revenue / 12000) * 100}%` }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="w-full bg-gradient-to-t from-primary to-secondary rounded-t-md"
                          />
                          <span className="text-xs text-muted-foreground">{item.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* SpecKit Tab */}
                <TabsContent value="speckit" className="h-full m-0 p-4 overflow-auto">
                  <div className="space-y-4">
                    {mockSpecKits.map((spec, index) => (
                      <motion.div
                        key={spec.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-xl border border-border hover:border-primary/30 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                              <FileText className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium">{spec.name}</h4>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs text-muted-foreground">v{spec.version}</span>
                                <span className="text-xs text-muted-foreground">•</span>
                                <span className="text-xs text-muted-foreground">{spec.updated}</span>
                                {spec.status === 'outdated' && (
                                  <Badge variant="outline" className="text-warning border-warning/30 text-xs">
                                    Outdated
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4" />
                              Export
                            </Button>
                            <Button variant="ghost" size="sm">
                              View
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    <Button variant="neon" className="w-full">
                      <Zap className="w-4 h-4" />
                      Generate New SpecKit
                    </Button>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
