import { useState, useCallback } from 'react'
import {
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import type { Quote, QuoteStatus } from '@/types'
import { updateQuoteStatus } from '@/api/quotesApi'

interface ColumnActions {
  insertItem: (item: Quote, index: number) => void
  removeItem: (quoteId: string) => void
  items: Quote[]
}

type ColumnMap = Record<QuoteStatus, ColumnActions>

export function useKanbanDragDrop(columns: ColumnMap) {
  const [activeItem, setActiveItem] = useState<Quote | null>(null)
  const [sourceStatus, setSourceStatus] = useState<QuoteStatus | null>(null)

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 8 },
  })

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 300, tolerance: 5 },
  })

  const keyboardSensor = useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates,
  })

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor)

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const id = event.active.id as string
      // Find which column the item belongs to
      for (const [status, col] of Object.entries(columns) as [QuoteStatus, ColumnActions][]) {
        const item = col.items.find((q) => q.id === id)
        if (item) {
          setActiveItem(item)
          setSourceStatus(status)
          return
        }
      }
    },
    [columns]
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      setActiveItem(null)
      setSourceStatus(null)

      if (!over || !sourceStatus || !activeItem) return

      // Determine target status from the droppable id (column id = status)
      const targetStatus = over.id as QuoteStatus
      // If dropped on a card, check its data for the column status
      const overData = over.data?.current as { status?: QuoteStatus } | undefined
      const resolvedTarget = overData?.status ?? targetStatus

      // Only process if statuses are valid and different
      if (!columns[resolvedTarget] || resolvedTarget === sourceStatus) return

      const movedItem = { ...activeItem, status: resolvedTarget }

      // Optimistic update
      columns[sourceStatus].removeItem(active.id as string)
      columns[resolvedTarget].insertItem(movedItem, 0)

      // Fire API call in background, revert on failure
      updateQuoteStatus({
        quoteId: active.id as string,
        fromStatus: sourceStatus,
        toStatus: resolvedTarget,
      }).catch(() => {
        // Revert
        columns[resolvedTarget].removeItem(active.id as string)
        columns[sourceStatus].insertItem(activeItem, 0)
      })
    },
    [columns, sourceStatus, activeItem]
  )

  const handleDragCancel = useCallback(() => {
    setActiveItem(null)
    setSourceStatus(null)
  }, [])

  return {
    sensors,
    activeItem,
    sourceStatus,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  }
}
