import { cn } from '@/lib/utils'

interface KanbanCardSkeletonProps {
  className?: string
}

export function KanbanCardSkeleton({ className }: KanbanCardSkeletonProps) {
  return (
    <div
      className={cn(
        'rounded-md border bg-card p-3 space-y-2 animate-pulse',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="h-4 w-20 rounded bg-muted" />
        <div className="h-4 w-16 rounded bg-muted" />
      </div>
      <div className="h-3.5 w-3/4 rounded bg-muted" />
      <div className="flex items-center justify-between">
        <div className="h-3 w-24 rounded bg-muted" />
        <div className="h-3 w-20 rounded bg-muted" />
      </div>
    </div>
  )
}
