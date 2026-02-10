import { UniversalHeader } from './UniversalHeader'
import { ContentHeader } from './ContentHeader'
import { Footer } from './Footer'
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
  return (
    <div className="min-h-screen flex flex-col">
      <UniversalHeader currentModule={currentModule} />
      {showContentHeader && contentHeaderTabs.length > 0 && (
        <ContentHeader tabs={contentHeaderTabs} activeTab={activeTab} />
      )}
      <main className="flex-1 overflow-auto p-4 md:p-6 bg-background">
        {children}
      </main>
      <Footer />
    </div>
  )
}
