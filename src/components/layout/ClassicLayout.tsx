import { useState, useEffect } from 'react'
import { List } from '@phosphor-icons/react'
import { Sidebar } from './Sidebar'
import { UniversalHeader } from './UniversalHeader'
import { Footer } from './Footer'
import { Button } from '@/components/ui/button'
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
    <div className="min-h-screen flex flex-col">
      {/* Fixed UniversalHeader */}
      <UniversalHeader currentModule={currentModule} fixed={true} />

      {/* Sidebar + Content area below fixed header */}
      <div className="flex flex-1 pt-16">
        {/* Mobile menu button - only visible when there are tabs */}
        {hasSidebar && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden fixed left-4 top-20 z-50 h-10 w-10 bg-background border shadow-md"
            aria-label="Toggle sidebar"
          >
            <List size={20} weight="bold" />
          </Button>
        )}

        {/* Overlay Sidebar - only shows when there are tabs */}
        {hasSidebar && (
          <Sidebar
            tabs={contentHeaderTabs}
            activeTab={activeTab}
            fixed={true}
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

        {/* Content area - full width as sidebar overlays */}
        <div className="flex-1 flex flex-col">
          <main className="flex-1 overflow-auto p-4 md:p-6 bg-background">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}
