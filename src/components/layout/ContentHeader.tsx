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
    <div className="relative bg-gray-50/50 dark:bg-gray-950 backdrop-blur-lg backdrop-saturate-150 z-30 h-12 shrink-0">
      {/* Gradient border at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#7DD3FC] via-[#3B82F6] via-[#8B5CF6] to-[#6366F1]" />

      <div className="flex items-end h-12 gap-1">
        {/* Scrollable Tabs */}
        <div className="flex items-end gap-1 overflow-x-auto no-scrollbar flex-1 min-w-0 pl-4 h-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.href) window.location.href = tab.href
              }}
              className={cn(
                "relative group h-full px-4 flex items-center justify-center transition-all",
                activeTab === tab.id
                  ? "z-20 text-black dark:text-white font-bold"
                  : "z-10 text-gray-700 dark:text-gray-300 hover:bg-muted/30 dark:hover:bg-muted/20 rounded-t-lg"
              )}
            >
              {/* The Active Tab Body with Gradient Border */}
              {activeTab === tab.id && (
                <>
                  <div className="absolute top-0 left-0 right-0 -bottom-[1px] p-[1px] rounded-t-lg bg-gradient-to-r from-[#7DD3FC] via-[#3B82F6] via-[#8B5CF6] to-[#6366F1]">
                    <div className="w-full h-full bg-background rounded-t-lg" />

                    {/* Left Bottom Curve */}
                    <div className="absolute bottom-0 -left-[8px] w-[8px] h-[8px] overflow-hidden">
                      <div className="absolute w-[16px] h-[16px] rounded-full shadow-[0_8px_0_0_hsl(var(--background))]" />
                    </div>

                    {/* Right Bottom Curve */}
                    <div className="absolute bottom-0 -right-[8px] w-[8px] h-[8px] overflow-hidden">
                      <div className="absolute w-[16px] h-[16px] rounded-full shadow-[0_8px_0_0_hsl(var(--background))]" />
                    </div>
                  </div>

                  {/* Cover the baseline underneath the active tab */}
                  <div className="absolute -bottom-[1px] left-0 right-0 h-[1px] bg-background z-10" />
                </>
              )}

              {/* Tab Content */}
              <span className="relative z-30 text-sm flex items-center gap-2">
                {tab.icon}
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* Fixed All Modules Button - Right-most */}
        <div className="shrink-0 pr-4">
          <Button
            variant="ghost"
            onClick={() => setShowAllModules(true)}
            className="h-9 gap-2 px-3 text-sm"
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
