import { MODULES } from '@/lib/constants'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

interface AllModulesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentModule?: string
}

export function AllModulesModal({
  open,
  onOpenChange,
  currentModule,
}: AllModulesModalProps) {
  const handleModuleClick = (href: string) => {
    window.location.href = href
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>All Modules</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4 md:grid-cols-4">
          {MODULES.map((module) => {
            const Icon = module.icon
            const isCurrent = currentModule === module.id

            return (
              <button
                key={module.id}
                onClick={() => handleModuleClick(module.href)}
                className={cn(
                  'flex flex-col items-center gap-3 rounded-lg border-2 p-6 transition-all hover:bg-accent hover:shadow-md',
                  isCurrent
                    ? 'border-primary bg-accent'
                    : 'border-border'
                )}
              >
                <Icon className={cn('h-8 w-8', module.color)} weight="duotone" />
                <span className="text-sm font-medium">{module.name}</span>
              </button>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
