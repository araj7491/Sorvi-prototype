import { useMemo } from 'react'
import { DndContext, DragOverlay, closestCenter, type DropAnimation, defaultDropAnimationSideEffects } from '@dnd-kit/core'
import type { QuoteStatus } from '@/types'
import { QUOTE_STATUSES, quoteKanbanConfig } from '@/data/mockFinanceData'
import { useKanbanColumn } from '@/hooks/useKanbanColumn'
import { useKanbanDragDrop } from '@/hooks/useKanbanDragDrop'
import { KanbanColumn } from './KanbanColumn'
import { KanbanCard } from './KanbanCard'

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: { active: { opacity: '0.4' } },
  }),
  duration: 250,
  easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
}

export function KanbanBoard() {
  const acceptedCol = useKanbanColumn('accepted')
  const pendingCol = useKanbanColumn('pending')
  const declinedCol = useKanbanColumn('declined')

  const columnMap = useMemo(
    () => ({
      accepted: {
        items: acceptedCol.items,
        insertItem: acceptedCol.insertItem,
        removeItem: acceptedCol.removeItem,
      },
      pending: {
        items: pendingCol.items,
        insertItem: pendingCol.insertItem,
        removeItem: pendingCol.removeItem,
      },
      declined: {
        items: declinedCol.items,
        insertItem: declinedCol.insertItem,
        removeItem: declinedCol.removeItem,
      },
    }),
    [
      acceptedCol.items, acceptedCol.insertItem, acceptedCol.removeItem,
      pendingCol.items, pendingCol.insertItem, pendingCol.removeItem,
      declinedCol.items, declinedCol.insertItem, declinedCol.removeItem,
    ]
  )

  const {
    sensors,
    activeItem,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  } = useKanbanDragDrop(columnMap)

  const columns: Record<QuoteStatus, typeof acceptedCol> = {
    accepted: acceptedCol,
    pending: pendingCol,
    declined: declinedCol,
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex gap-4 flex-1 min-h-0 overflow-x-auto pb-2">
        {QUOTE_STATUSES.map((status) => {
          const col = columns[status]
          return (
            <KanbanColumn
              key={status}
              status={status}
              config={quoteKanbanConfig[status]}
              items={col.items}
              total={col.total}
              totalAmount={col.totalAmount}
              isLoading={col.isLoading}
              page={col.page}
              pageCount={col.pageCount}
              onPageChange={col.goToPage}
            />
          )
        })}
      </div>

      <DragOverlay dropAnimation={dropAnimation}>
        {activeItem ? (
          <div className="w-[300px]">
            <KanbanCard quote={activeItem} isDragOverlay />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
