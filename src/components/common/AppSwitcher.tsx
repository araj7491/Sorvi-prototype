import { ChevronDown } from 'lucide-react'
import { MODULES } from '@/lib/constants'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

interface AppSwitcherProps {
  currentModule?: string
  onModuleChange?: (moduleId: string) => void
}

export function AppSwitcher({ currentModule = 'finance', onModuleChange }: AppSwitcherProps) {
  const current = MODULES.find(m => m.id === currentModule) || MODULES[0]
  const Icon = current.icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2 px-3">
          <Icon className={`h-5 w-5 ${current.color}`} weight="bold" />
          <span className="font-bold">{current.name}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {MODULES.map((module) => {
          const ModuleIcon = module.icon
          return (
            <DropdownMenuItem
              key={module.id}
              onClick={() => {
                onModuleChange?.(module.id)
                window.location.href = module.href
              }}
              className="gap-2"
            >
              <ModuleIcon className={`h-5 w-5 ${module.color}`} weight="duotone" />
              <span>{module.name}</span>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
