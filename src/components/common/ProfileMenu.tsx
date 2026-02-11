import { LogOut, Settings, User, ChevronRight, Sliders, LayoutGrid, PanelLeft } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useLayout } from '@/providers/LayoutProvider'
import { cn } from '@/lib/utils'

export function ProfileMenu() {
  const { layout, setLayout } = useLayout()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src="" alt="User" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              DG
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[calc(100vw-2rem)] sm:w-80 p-4" align="end">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="" alt="User" />
            <AvatarFallback className="bg-primary text-primary-foreground text-base">
              DG
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium">Deepak Gupta</p>
            <p className="text-xs text-muted-foreground">Finance Director</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            ×
          </Button>
        </div>

        {/* Layout Structure */}
        <div className="space-y-3 mb-4">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Layout Structure
          </h3>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setLayout('modern')}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-colors w-full",
                layout === 'modern'
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-accent"
              )}
            >
              <LayoutGrid className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">Modern</span>
            </button>
            <button
              onClick={() => setLayout('classic')}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-colors w-full",
                layout === 'classic'
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-accent"
              )}
            >
              <PanelLeft className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">Classic</span>
            </button>
          </div>
        </div>

        <DropdownMenuSeparator className="my-4" />

        {/* Menu Items */}
        <div className="space-y-1">
          <DropdownMenuItem className="cursor-pointer py-3 px-3">
            <div className="flex items-center gap-3 flex-1">
              <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">My Profile</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer py-3 px-3">
            <div className="flex items-center gap-3 flex-1">
              <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
                <Settings className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">Settings</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer py-3 px-3">
            <div className="flex items-center gap-3 flex-1">
              <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
                <Sliders className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">Preferences</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="my-4" />

        {/* Sign Out */}
        <DropdownMenuItem className="cursor-pointer py-3 px-3 text-destructive focus:text-destructive">
          <div className="flex items-center gap-3 flex-1">
            <LogOut className="h-4 w-4" />
            <span className="text-sm font-medium">Sign out</span>
          </div>
          <span className="text-xs text-muted-foreground">→</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
