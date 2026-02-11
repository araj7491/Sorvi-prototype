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
    <div className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar h-14">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              className={cn(
                "relative h-full rounded-none px-4 text-sm font-medium transition-colors hover:text-foreground",
                activeTab === tab.id
                  ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                  : "text-muted-foreground"
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
