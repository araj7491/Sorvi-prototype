import { AppSwitcher } from '@/components/common/AppSwitcher'
import { SearchBar } from '@/components/common/SearchBar'
import { QuickActions } from '@/components/common/QuickActions'
import { ProfileMenu } from '@/components/common/ProfileMenu'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface UniversalHeaderProps {
  currentModule?: string
}

export function UniversalHeader({ currentModule }: UniversalHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 gap-4">
        {/* Left Section: Logo + App Switcher */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <span className="hidden md:inline font-semibold text-lg">Sorvi</span>
          </div>
          <div className="h-6 w-px bg-border hidden md:block" />
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
