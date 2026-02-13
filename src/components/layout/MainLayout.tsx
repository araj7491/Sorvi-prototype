import { useState, useEffect } from 'react'
import { useLayout } from '@/providers/LayoutProvider'
import { UniversalHeader } from './UniversalHeader'
import { ContentHeader } from './ContentHeader'
import { Footer } from './Footer'
import { ClassicLayout } from './ClassicLayout'
import { cn } from '@/lib/utils'
import type { Tab } from '@/types'

interface MainLayoutProps {
  children: React.ReactNode
  showContentHeader?: boolean
  contentHeaderTabs?: Tab[]
  activeTab?: string
  currentModule?: string
}

export function MainLayout({
  children,
  showContentHeader = false,
  contentHeaderTabs = [],
  activeTab,
  currentModule
}: MainLayoutProps) {
  const { layout } = useLayout()
  const [isNavigating, setIsNavigating] = useState(false)

  // Reset navigation state when currentModule changes
  useEffect(() => {
    if (isNavigating) {
      setIsNavigating(false)
    }
  }, [currentModule])

  const handleNavigationStart = () => {
    setIsNavigating(true)
  }

  if (layout === 'classic') {
    return (
      <ClassicLayout
        showContentHeader={showContentHeader}
        contentHeaderTabs={contentHeaderTabs}
        activeTab={activeTab}
        currentModule={currentModule}
      >
        {children}
      </ClassicLayout>
    )
  }

  // Modern layout
  const hasContentHeader = showContentHeader && contentHeaderTabs && contentHeaderTabs.length > 0

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <UniversalHeader
        currentModule={currentModule}
        fixed={false}
        onNavigationStart={handleNavigationStart}
      />

      {/* Content Header - positioned after UniversalHeader */}
      {hasContentHeader && (
        <ContentHeader tabs={contentHeaderTabs} activeTab={activeTab} currentModule={currentModule} />
      )}

      <div className="flex-1 overflow-y-auto bg-background relative">
        {/* Loading Overlay */}
        {isNavigating && (
          <div className="absolute inset-0 bg-background/80 z-50 flex items-center justify-center">
            {/* Ring Spinner */}
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        )}

        <div className={cn(
          "px-4 pb-4 md:px-6 md:pb-6",
          hasContentHeader ? "pt-4 md:pt-6" : "pt-4 md:pt-6"
        )}>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  )
}
