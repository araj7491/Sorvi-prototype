import { Link } from 'react-router-dom'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { Tab } from '@/types'

interface SidebarProps {
  tabs: Tab[]
  activeTab?: string
  isOpen?: boolean
  onToggle?: () => void
  onLinkClick?: () => void
}

export function Sidebar({ tabs, activeTab, isOpen = true, onToggle, onLinkClick }: SidebarProps) {
  return (
    <aside className={cn(
        "flex flex-col border-r bg-gray-50 dark:bg-[#0C1220] transition-all duration-300",
        // Fixed position between header (top-16) and bottom edge on all screen sizes
        "fixed left-0 top-16 bottom-0 z-30",
        // Mobile: slide in/out, Desktop: always visible
        !isOpen && "-translate-x-full md:translate-x-0",
        // Width based on collapse state
        isOpen ? "w-48 md:w-48 lg:w-60" : "md:w-16 w-48",
      )}>
        {/* Scrollable container for navigation */}
        <div className="flex-1 min-h-0 overflow-y-auto">
        <nav className="p-4 space-y-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id

            return (
              <Link
                key={tab.id}
                to={tab.href}
                onClick={() => onLinkClick?.()}
                className={cn(
                  "flex items-center gap-3 py-2.5 rounded-md transition-colors text-sm",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive && "bg-accent text-accent-foreground font-medium",
                  isOpen ? "px-4" : "px-0 justify-center"
                )}
                title={!isOpen ? tab.label : undefined}
              >
                {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
                {isOpen && <span className="whitespace-nowrap">{tab.label}</span>}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Toggle Button - pinned to bottom right */}
      <div className="shrink-0 flex items-center justify-end p-3 pb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8"
          title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? (
            <PanelLeftClose className="h-4 w-4" />
          ) : (
            <PanelLeftOpen className="h-4 w-4" />
          )}
        </Button>
      </div>
    </aside>
  )
}
