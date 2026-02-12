import { Link } from 'react-router-dom'
import { AppSwitcher } from '@/components/common/AppSwitcher'
import { SearchBar } from '@/components/common/SearchBar'
import { QuickActions } from '@/components/common/QuickActions'
import { ProfileMenu } from '@/components/common/ProfileMenu'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface UniversalHeaderProps {
  currentModule?: string
  fixed?: boolean
}

export function UniversalHeader({ currentModule, fixed = false }: UniversalHeaderProps) {
  return (
    <header className={cn(
      "top-0 left-0 right-0 z-50 h-16 border-b border-border shadow-sm bg-header text-header-foreground",
      fixed ? "fixed" : "sticky"
    )}>
      <div className="flex h-16 items-center px-4 gap-4">
        {/* Left Section: Logo + App Switcher */}
        <div className="flex items-center gap-0">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-md bg-white dark:bg-[#0E0918] flex items-center justify-center p-1 transition-opacity group-hover:opacity-80">
              <img src="/sorvi-logo.png" alt="Sorvi Logo" className="h-full w-full object-contain" />
            </div>
            <span className="hidden md:inline font-semibold text-lg group-hover:text-primary transition-colors">Sorvi</span>
          </Link>
          <AppSwitcher currentModule={currentModule} />
        </div>

        {/* Center Section: Search Bar */}
        <div className="flex-1 flex items-center justify-center max-w-2xl mx-auto">
          <SearchBar />
        </div>

        {/* Right Section: Actions + Theme + Profile */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden h-9 w-9">
            <Search className="h-4 w-4" />
          </Button>
          <QuickActions />
          <ThemeToggle />
          <ProfileMenu />
        </div>
      </div>
    </header>
  )
}
