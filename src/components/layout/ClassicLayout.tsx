import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { UniversalHeader } from './UniversalHeader'
import { Footer } from './Footer'
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
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const hasSidebar = showContentHeader && contentHeaderTabs.length > 0

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed UniversalHeader */}
      <UniversalHeader currentModule={currentModule} fixed={true} />

      {/* Sidebar + Content area below fixed header */}
      <div className="flex flex-1 pt-16">
        {/* Fixed Sidebar - only shows when there are tabs */}
        {hasSidebar && (
          <Sidebar
            tabs={contentHeaderTabs}
            activeTab={activeTab}
            fixed={true}
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
          />
        )}

        {/* Content area with proper margin if sidebar exists */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${
          hasSidebar
            ? sidebarOpen
              ? 'md:ml-48 lg:ml-60'
              : 'md:ml-16'
            : ''
        }`}>
          <main className="flex-1 overflow-auto p-4 md:p-6 bg-background">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}
