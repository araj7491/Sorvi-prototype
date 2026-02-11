import { Link } from 'react-router-dom'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { Tab } from '@/types'

interface SidebarProps {
  tabs: Tab[]
  activeTab?: string
  fixed?: boolean
  isOpen?: boolean
  onToggle?: () => void
  onLinkClick?: () => void
}

export function Sidebar({ tabs, activeTab, fixed = false, isOpen = true, onToggle, onLinkClick }: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 top-16 bg-black/50 z-30 transition-opacity"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "flex flex-col border-r bg-background transition-all duration-300",
        // Base mobile styles: fixed drawer
        "fixed left-0 top-16 bottom-0 h-auto z-40 w-48",
        // Mobile: slide in/out based on isOpen
        !isOpen && "-translate-x-full",
        isOpen && "translate-x-0",
        // Desktop overrides
        "md:translate-x-0 md:z-10",
        fixed
          ? "md:fixed"
          : "md:sticky md:top-0 md:h-[calc(100vh-4rem)]",
        // Desktop width
        "md:w-48 lg:w-60",
        !isOpen && "md:w-16"
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
                  "flex items-center gap-3 px-4 py-2.5 rounded-md transition-colors text-sm",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive && "bg-accent text-accent-foreground font-medium"
                )}
                title={!isOpen ? tab.label : undefined}
              >
                {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
                {isOpen && <span>{tab.label}</span>}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Toggle Button - pinned to bottom right */}
      <div className="shrink-0 flex items-center justify-end p-3 pb-8">
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
