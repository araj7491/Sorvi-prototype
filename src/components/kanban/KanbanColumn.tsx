import { useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { Quote, QuoteStatus, KanbanStatusConfig } from '@/types'
import { KanbanCard } from './KanbanCard'
import { KanbanCardSkeleton } from './KanbanCardSkeleton'
import { KanbanColumnHeader } from './KanbanColumnHeader'

interface KanbanColumnProps {
  status: QuoteStatus
  config: KanbanStatusConfig
  items: Quote[]
  total: number
  totalAmount: number
  isLoading: boolean
  page: number
  pageCount: number
  onPageChange: (page: number) => void
}

const CARD_HEIGHT = 108
const CARD_GAP = 8

export function KanbanColumn({
  status,
  config,
  items,
  total,
  totalAmount,
  isLoading,
  page,
  pageCount,
  onPageChange,
}: KanbanColumnProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const { setNodeRef, isOver } = useDroppable({
    id: status,
    data: { status },
  })

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => CARD_HEIGHT + CARD_GAP,
    overscan: 5,
  })

  const virtualItems = virtualizer.getVirtualItems()
  const itemIds = items.map((q) => q.id)

  return (
    <div
      className={cn(
        'flex flex-col min-w-[320px] flex-1 max-w-[400px]',
        'rounded-lg border border-border/50',
        'bg-muted/20 dark:bg-muted/10',
        isOver && 'border-primary/50 bg-primary/5'
      )}
    >
      <KanbanColumnHeader
        config={config}
        count={total}
        totalAmount={totalAmount}
        isOver={isOver}
      />

      <div
        ref={(node) => {
          setNodeRef(node)
          ;(scrollRef as React.MutableRefObject<HTMLDivElement | null>).current = node
        }}
        className="flex-1 overflow-y-auto px-2 py-2"
      >
        {isLoading ? (
          <div className="space-y-2 px-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <KanbanCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
            <div
              style={{ height: virtualizer.getTotalSize(), position: 'relative' }}
            >
              {virtualItems.map((virtualRow) => {
                const quote = items[virtualRow.index]
                if (!quote) return null

                return (
                  <div
                    key={virtualRow.key}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: virtualRow.size,
                      transform: `translate3d(0, ${virtualRow.start}px, 0)`,
                      willChange: 'transform',
                      contain: 'layout style paint',
                    }}
                    className="px-1 pb-2"
                  >
                    <KanbanCard quote={quote} />
                  </div>
                )
              })}
            </div>
          </SortableContext>
        )}
      </div>

      {/* Pagination footer */}
      {pageCount > 1 && (
        <div className="flex items-center justify-between border-t px-3 py-2 text-xs text-muted-foreground">
          <span>{page + 1} / {pageCount}</span>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              disabled={page === 0 || isLoading}
              onClick={() => onPageChange(page - 1)}
            >
              <CaretLeft size={14} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              disabled={page >= pageCount - 1 || isLoading}
              onClick={() => onPageChange(page + 1)}
            >
              <CaretRight size={14} />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
