import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, Check, Star } from 'lucide-react'
import { GridFour } from '@phosphor-icons/react'
import { MODULES } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

interface EnhancedAppSwitcherProps {
  currentModule?: string
  onModuleChange?: (moduleId: string) => void
  onFavoritesChange?: (favorites: string[]) => void
}

export function EnhancedAppSwitcher({ currentModule = 'finance', onModuleChange, onFavoritesChange }: EnhancedAppSwitcherProps) {
  const navigate = useNavigate()

  const [recentApps, setRecentApps] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('sorvi-recent-apps') || '[]')
    } catch {
      return []
    }
  })

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('sorvi-favorite-apps') || '[]')
    } catch {
      return []
    }
  })

  // Get recent apps (excluding current module)
  const recentModules = useMemo(() => {
    return recentApps
      .filter(id => id !== currentModule)
      .map(id => MODULES.find(m => m.id === id))
      .filter(Boolean)
      .slice(0, 3)
  }, [recentApps, currentModule])

  // Handle app selection
  const handleAppSelect = (moduleId: string) => {
    // Update recent apps
    const updatedRecent = [moduleId, ...recentApps.filter(id => id !== moduleId)].slice(0, 5)
    setRecentApps(updatedRecent)
    localStorage.setItem('sorvi-recent-apps', JSON.stringify(updatedRecent))

    // Navigate
    onModuleChange?.(moduleId)
    const module = MODULES.find(m => m.id === moduleId)
    if (module) {
      navigate(module.href)
    }
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="gap-1.5 pl-2 pr-3"
        >
          <GridFour className="h-5 w-5" weight="bold" />
          <span className="font-medium text-base">Apps</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-64">
        {/* Recent Apps */}
        {recentModules.length > 0 && (
          <>
            {recentModules.map((module) => {
              if (!module) return null
              const ModuleIcon = module.icon
              const isFavorite = favorites.includes(module.id)
              return (
                <DropdownMenuItem
                  key={module.id}
                  className="cursor-pointer justify-between"
                  asChild
                >
                  <div className="flex items-center w-full">
                    <div
                      className="flex items-center gap-2 flex-1"
                      onClick={() => handleAppSelect(module.id)}
                    >
                      <ModuleIcon className={`h-4 w-4 ${module.color}`} weight="duotone" />
                      <span>{module.name}</span>
                      {currentModule === module.id && (
                        <Check className="h-4 w-4 ml-auto" />
                      )}
                    </div>
                    <button
                      onClick={(e) => toggleFavorite(module.id, e)}
                      className="p-1 hover:bg-accent rounded"
                    >
                      <Star
                        className={cn(
                          "h-4 w-4",
                          isFavorite ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"
                        )}
                      />
                    </button>
                  </div>
                </DropdownMenuItem>
              )
            })}
            <DropdownMenuSeparator />
          </>
        )}

        {/* All Applications */}
        {MODULES.map((module) => {
          const ModuleIcon = module.icon
          const isFavorite = favorites.includes(module.id)
          return (
            <DropdownMenuItem
              key={module.id}
              className="cursor-pointer justify-between"
              asChild
            >
              <div className="flex items-center w-full">
                <div
                  className="flex items-center gap-2 flex-1"
                  onClick={() => handleAppSelect(module.id)}
                >
                  <ModuleIcon className={`h-4 w-4 ${module.color}`} weight="duotone" />
                  <span>{module.name}</span>
                  {currentModule === module.id && (
                    <Check className="h-4 w-4 ml-auto" />
                  )}
                </div>
                <button
                  onClick={(e) => toggleFavorite(module.id, e)}
                  className="p-1 hover:bg-accent rounded"
                >
                  <Star
                    className={cn(
                      "h-4 w-4",
                      isFavorite ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"
                    )}
                  />
                </button>
              </div>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
