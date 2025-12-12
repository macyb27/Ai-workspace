import './globals.css'
import { Toaster } from '@/components/ui/sonner'

export const metadata = {
  title: 'BMAD Workspace | AI-Powered Developer Environment',
  description: 'Build, Measure, Analyze, Deploy - The next-generation developer workspace with integrated SpecKit and AI orchestration.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background antialiased">
        {children}
        <Toaster position="bottom-right" theme="dark" />
      </body>
    </html>
  )
}
