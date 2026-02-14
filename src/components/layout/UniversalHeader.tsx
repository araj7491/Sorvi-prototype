import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SearchBar } from '@/components/common/SearchBar'
import { QuickActions } from '@/components/common/QuickActions'
import { ProfileMenu } from '@/components/common/ProfileMenu'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { SorviOrbitLogo } from '@/components/common/SorviOrbitLogo'
import { AppsIcon } from '@/components/common/AppsIcon'
import { AppsGrid } from '@/components/common/AppsGrid'
import { MODULES } from '@/lib/constants'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface UniversalHeaderProps {
  currentModule?: string
  fixed?: boolean
}

// Module-specific colors
const getModuleColors = (module?: string) => {
  switch (module) {
    case 'finance':
      return 'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-100'
    case 'inventory':
      return 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-100'
    case 'repairs':
      return 'bg-red-100 dark:bg-red-950 text-red-900 dark:text-red-100'
    default:
      return 'bg-header text-header-foreground'
  }
}

export function UniversalHeader({ currentModule, fixed = false }: UniversalHeaderProps) {
  const navigate = useNavigate()

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('sorvi-favorite-apps') || '[]')
    } catch {
      return []
    }
  })

  // Listen for storage changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'sorvi-favorite-apps' && e.newValue) {
        try {
          setFavorites(JSON.parse(e.newValue))
        } catch {
          setFavorites([])
        }
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const favoriteModules = MODULES.filter(m => favorites.includes(m.id))

  // Handle favorite app click - move to first position and navigate
  const handleFavoriteClick = (moduleId: string, href: string) => {
    // Reorder favorites to move clicked item to first position
    const newFavorites = [moduleId, ...favorites.filter(id => id !== moduleId)]
    setFavorites(newFavorites)
    localStorage.setItem('sorvi-favorite-apps', JSON.stringify(newFavorites))

    // Navigate immediately
    navigate(href)
  }

  return (
    <header className={cn(
      "top-0 left-0 right-0 z-50 h-16 border-b border-border shadow-sm",
      getModuleColors(currentModule),
      fixed ? "fixed" : "sticky"
    )}>
      <div className="relative flex h-16 items-center px-4 gap-4">
        {/* Left Section: Apps Icon + Logo + Suite Branding + Favorite Apps */}
        <div className="flex items-center gap-1.5 lg:gap-2 flex-1">
          {/* Apps Grid Icon */}
          <AppsGrid currentModule={currentModule} onFavoritesChange={setFavorites}>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 shrink-0 hover:bg-transparent group/apps data-[state=open]:bg-transparent"
              aria-label="Apps"
            >
              <AppsIcon className="h-5 w-5 group-hover/apps:text-black group-hover/apps:dark:text-white group-data-[state=open]/apps:text-black group-data-[state=open]/apps:dark:text-white" />
            </Button>
          </AppsGrid>

          {/* Logo with Suite Branding */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="h-8 w-8 flex items-center justify-center transition-opacity group-hover:opacity-80">
              <img src="/sorvi-logo.svg" alt="Sorvi Logo" className="h-full w-full object-contain" />
            </div>
            <div className="hidden md:inline">
              <SorviOrbitLogo className="group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent" />
            </div>
          </Link>

          {/* Favorite Apps */}
          {favoriteModules.length > 0 && (
            <>
              <div className="hidden md:block h-6 w-px bg-border/60 shrink-0" />
              <div className="hidden md:flex items-center gap-2">
                {favoriteModules.map((module) => {
                  const Icon = module.icon
                  return (
                    <Button
                      key={module.id}
                      variant="ghost"
                      size="sm"
                      className="h-9 gap-2"
                      onClick={() => handleFavoriteClick(module.id, module.href)}
                    >
                      <Icon className={`h-5 w-5 ${module.color}`} weight="duotone" />
                      <span className="text-sm font-medium">{module.name}</span>
                    </Button>
                  )
                })}
              </div>
            </>
          )}
        </div>

        {/* Center Section: Search Bar - Absolutely Centered */}
        <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-2xl px-4">
          <SearchBar />
        </div>

        {/* Right Section: Actions + Theme + Profile */}
        <div className="flex items-center gap-2 flex-1 justify-end">
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
