import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { DotsSixVertical } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { formatCurrency, formatDate } from '@/data/mockQuotesData'
import type { Quote } from '@/types'

interface KanbanCardProps {
  quote: Quote
  isDragOverlay?: boolean
}

export const KanbanCard = React.memo(function KanbanCard({
  quote,
  isDragOverlay = false,
}: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: quote.id,
    data: { status: quote.status },
    transition: {
      duration: 200,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    },
  })

  // Use Translate (not Transform) to avoid scaleX/scaleY — pure translate3d stays on GPU compositor
  const style: React.CSSProperties | undefined = isDragOverlay
    ? { willChange: 'transform' }
    : {
        transform: CSS.Translate.toString(transform),
        transition,
        willChange: transform ? 'transform' : undefined,
      }

  return (
    <div
      ref={isDragOverlay ? undefined : setNodeRef}
      style={style}
      className={cn(
        'rounded-md border bg-card p-3 shadow-sm',
        isDragging && 'opacity-40 z-50',
        isDragOverlay && 'shadow-lg ring-2 ring-primary/30',
        !isDragging && !isDragOverlay && 'hover:border-primary/30'
      )}
    >
      <div className="flex items-start gap-2">
        {/* Drag handle */}
        <button
          className={cn(
            'mt-0.5 shrink-0 cursor-grab active:cursor-grabbing rounded p-0.5',
            'text-muted-foreground/50 hover:text-muted-foreground',
            'touch-none'
          )}
          {...(isDragOverlay ? {} : { ...attributes, ...listeners })}
        >
          <DotsSixVertical size={14} weight="bold" />
        </button>

        <div className="flex-1 min-w-0 space-y-1.5">
          {/* Top row: ID + amount */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-semibold truncate">{quote.id}</span>
            <span className="text-sm font-semibold shrink-0">
              {formatCurrency(quote.amount)}
            </span>
          </div>

          {/* Customer */}
          <p className="text-sm text-muted-foreground truncate">
            {quote.customer}
          </p>

          {/* Bottom row: date + salesperson */}
          <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground/70">
            <span>{formatDate(quote.date)}</span>
            <span className="truncate">{quote.salesPerson}</span>
          </div>
        </div>
      </div>
    </div>
  )
},
  (prev, next) => prev.quote.id === next.quote.id && prev.quote.status === next.quote.status && prev.isDragOverlay === next.isDragOverlay
)
