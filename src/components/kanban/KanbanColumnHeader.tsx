import { cn } from '@/lib/utils'
import type { KanbanStatusConfig } from '@/types'

interface KanbanColumnHeaderProps {
  config: KanbanStatusConfig
  count: number
  totalAmount: number
  isOver?: boolean
}

function formatCompact(n: number): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n}`
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return n.toString()
}

export function KanbanColumnHeader({
  config,
  count,
  totalAmount,
  isOver = false,
}: KanbanColumnHeaderProps) {
  return (
    <div
      className={cn(
        'sticky top-0 z-10 rounded-t-lg border-b bg-background/95 backdrop-blur-sm px-3 py-2.5',
        isOver && 'ring-2 ring-primary/50'
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn('h-2.5 w-2.5 rounded-full', config.colorDot)} />
          <span className="text-sm font-semibold">{config.label}</span>
          <span
            className={cn(
              'text-xs font-medium px-1.5 py-0.5 rounded-full',
              config.colorBadge
            )}
          >
            {formatCount(count)}
          </span>
        </div>
        <span className="text-xs font-medium text-muted-foreground">
          {formatCompact(totalAmount)}
        </span>
      </div>
    </div>
  )
}
