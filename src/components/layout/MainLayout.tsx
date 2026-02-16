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
      />

      {/* Content Header - positioned after UniversalHeader */}
      {hasContentHeader && (
        <ContentHeader tabs={contentHeaderTabs} activeTab={activeTab} currentModule={currentModule} />
      )}

      <div className="flex-1 overflow-y-auto bg-background relative">
        <div className="p-1 md:p-2">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  )
}
