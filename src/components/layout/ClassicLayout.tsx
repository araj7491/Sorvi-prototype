import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { UniversalHeader } from './UniversalHeader'
import { Footer } from './Footer'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Tab } from '@/types'

interface ClassicLayoutProps {
  children: React.ReactNode
  showContentHeader?: boolean
  contentHeaderTabs?: Tab[]
  activeTab?: string
  currentModule?: string
}

export function ClassicLayout({
  children,
  showContentHeader = false,
  contentHeaderTabs = [],
  activeTab,
  currentModule
}: ClassicLayoutProps) {
  // Start closed on mobile, open on desktop
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768
    }
    return true
  })
  const hasSidebar = showContentHeader && contentHeaderTabs.length > 0

  // Handle viewport changes (for dev tools testing)
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768
      // Auto-close sidebar when switching to mobile viewport
      if (isMobile && sidebarOpen) {
        setSidebarOpen(false)
      }
      // Auto-open sidebar when switching to desktop viewport
      if (!isMobile && !sidebarOpen) {
        setSidebarOpen(true)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [sidebarOpen])

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Fixed UniversalHeader */}
      <UniversalHeader currentModule={currentModule} fixed={true} />

      {/* Fixed Sidebar - positioned between header and footer */}
      {hasSidebar && (
        <Sidebar
          tabs={contentHeaderTabs}
          activeTab={activeTab}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          onLinkClick={() => {
            // Close sidebar on mobile when link is clicked
            if (window.innerWidth < 768) {
              setSidebarOpen(false)
            }
          }}
        />
      )}

      {/* Content area - with padding for fixed header, footer, and sidebar */}
      <main className={cn(
        "flex-1 overflow-y-auto px-4 pt-20 pb-4 md:px-6 md:pb-6 bg-background relative",
        // Left padding for fixed sidebar on desktop
        hasSidebar && sidebarOpen && "md:pl-52 lg:pl-64",
        hasSidebar && !sidebarOpen && "md:pl-20",
      )}>
        {/* Mobile menu button - only visible when there are tabs */}
        {hasSidebar && !sidebarOpen && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden fixed left-4 top-20 h-9 w-9 z-10"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        {children}
      </main>

      {/* Fixed Footer */}
      <Footer />
    </div>
  )
}
