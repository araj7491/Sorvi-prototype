import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Star, Plus } from 'lucide-react'
import { FileText, ShoppingCart, Receipt } from '@phosphor-icons/react'
import { MODULES } from '@/lib/constants'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

// Recent modules (sub-pages)
const RECENT_MODULES = [
  {
    id: 'quotes',
    name: 'Quotes',
    icon: FileText,
    href: '/finance/quotes',
    createHref: '/finance/quotes/new',
    color: 'text-gray-600 dark:text-gray-400'
  },
  {
    id: 'purchases',
    name: 'Purchase Orders',
    icon: ShoppingCart,
    href: '/finance/purchases',
    createHref: '/finance/purchases/new',
    color: 'text-gray-600 dark:text-gray-400'
  },
  {
    id: 'invoices',
    name: 'Invoices',
    icon: Receipt,
    href: '/finance/invoices',
    createHref: '/finance/invoices/new',
    color: 'text-gray-600 dark:text-gray-400'
  }
]

interface AppsGridProps {
  currentModule?: string
  children: React.ReactNode
  onFavoritesChange?: (favorites: string[]) => void
}

export function AppsGrid({ currentModule, children, onFavoritesChange }: AppsGridProps) {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('sorvi-favorite-apps') || '[]')
    } catch {
      return []
    }
  })

  // Handle app selection
  const handleAppSelect = (moduleId: string, href: string) => {
    // Update recent apps
    try {
      const recentApps = JSON.parse(localStorage.getItem('sorvi-recent-apps') || '[]')
      const updatedRecent = [moduleId, ...recentApps.filter((id: string) => id !== moduleId)].slice(0, 5)
      localStorage.setItem('sorvi-recent-apps', JSON.stringify(updatedRecent))
    } catch {
      // Ignore storage errors
    }

    // Navigate
    navigate(href)
  }

  // Handle favorite toggle
  const toggleFavorite = (moduleId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const updatedFavorites = favorites.includes(moduleId)
      ? favorites.filter(id => id !== moduleId)
      : [...favorites, moduleId]

    setFavorites(updatedFavorites)
    localStorage.setItem('sorvi-favorite-apps', JSON.stringify(updatedFavorites))
    onFavoritesChange?.(updatedFavorites)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-80 p-4">
        {/* My Apps Section */}
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-muted-foreground mb-2">My Apps</h3>
          <div className="h-px bg-border mb-3" />
          <div className="grid grid-cols-3 gap-2">
            {MODULES.map((module) => {
              const ModuleIcon = module.icon
              const isFavorite = favorites.includes(module.id)
              const isActive = currentModule === module.id

              return (
                <div
                  key={module.id}
                  className="relative group"
                >
                  <button
                    onClick={() => handleAppSelect(module.id, module.href)}
                    className={cn(
                      "w-full flex flex-col items-center gap-2 p-3 rounded-lg transition-all",
                      "hover:bg-gray-200 dark:hover:bg-accent/50",
                      isActive && "bg-gray-100 dark:bg-accent shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)] dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
                    )}
                  >
                    <div className={cn(
                      "h-10 w-10 rounded-lg flex items-center justify-center transition-all",
                      "bg-muted group-hover:bg-gray-300 dark:group-hover:bg-accent",
                      isActive && "shadow-md ring-2 ring-primary/20"
                    )}>
                      <ModuleIcon className={`h-6 w-6 ${module.color}`} weight="duotone" />
                    </div>
                    <span className="text-xs font-medium text-center line-clamp-2">
                      {module.name}
                    </span>
                  </button>

                  {/* Favorite Star - Top Right */}
                  <button
                    onClick={(e) => toggleFavorite(module.id, e)}
                    className="absolute top-1 right-1 p-1 transition-all hover:scale-[1.5] hover:drop-shadow-lg"
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Star
                      className={cn(
                        "h-3.5 w-3.5 transition-all",
                        isFavorite ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"
                      )}
                    />
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recently used Modules Section */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground mb-2">Recently used Modules</h3>
          <div className="h-px bg-border mb-3" />
          <div className="grid grid-cols-3 gap-2">
            {RECENT_MODULES.map((module) => {
              const ModuleIcon = module.icon

              return (
                <div
                  key={module.id}
                  className="relative group"
                >
                  <button
                    onClick={() => handleAppSelect(module.id, module.href)}
                    className={cn(
                      "w-full flex flex-col items-center gap-2 p-3 rounded-lg transition-all",
                      "hover:bg-gray-200 dark:hover:bg-accent/50"
                    )}
                  >
                    <div className={cn(
                      "h-10 w-10 rounded-lg flex items-center justify-center transition-all",
                      "bg-muted group-hover:bg-gray-300 dark:group-hover:bg-accent"
                    )}>
                      <ModuleIcon className={`h-6 w-6 ${module.color}`} weight="duotone" />
                    </div>
                    <span className="text-xs font-medium text-center line-clamp-2">
                      {module.name}
                    </span>
                  </button>

                  {/* Plus Icon - Top Right */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(module.createHref)
                    }}
                    className="absolute top-1 right-1 p-1 rounded-full bg-gray-200 dark:bg-gray-700 transition-all hover:scale-[1.5] hover:drop-shadow-lg"
                    aria-label={`Create new ${module.name}`}
                  >
                    <Plus
                      className="h-3.5 w-3.5 transition-all text-gray-600 dark:text-gray-400"
                    />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
