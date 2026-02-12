import { useState } from 'react'
import { LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AllModulesModal } from '@/components/common/AllModulesModal'
import type { Tab } from '@/types'

interface ContentHeaderProps {
  tabs: Tab[]
  activeTab?: string
  currentModule?: string
}

export function ContentHeader({ tabs, activeTab, currentModule }: ContentHeaderProps) {
  const [showAllModules, setShowAllModules] = useState(false)
  return (
    <div className="border-b border-white/20 dark:border-white/10 bg-gray-50/40 dark:bg-gray-900/40 backdrop-blur-lg backdrop-saturate-150 sticky top-0 z-40 h-12 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar h-12">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              className={cn(
                "relative h-full rounded-none px-4 text-sm font-medium transition-all hover:text-gray-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/10",
                activeTab === tab.id
                  ? "text-black dark:text-white font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                  : "text-gray-700 dark:text-gray-300"
              )}
              onClick={() => {
                if (tab.href) window.location.href = tab.href
              }}
            >
              {tab.icon}
              {tab.label}
            </Button>
          ))}
          <Button
            variant="ghost"
            onClick={() => setShowAllModules(true)}
            className="ml-auto h-9 shrink-0 gap-2 px-3 text-sm"
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="hidden sm:inline">All Modules</span>
          </Button>
        </div>
      </div>
      <AllModulesModal
        open={showAllModules}
        onOpenChange={setShowAllModules}
        currentModule={currentModule}
      />
    </div>
  )
}
