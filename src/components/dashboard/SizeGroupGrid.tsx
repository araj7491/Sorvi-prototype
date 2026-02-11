import { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useDashboardGrid } from '@/providers/DashboardGridProvider'
import { DraggableGridItem } from './DraggableGridItem'
import type { CardSize } from '@/types/grid'
import { cn } from '@/lib/utils'

const sizeToGridClass: Record<CardSize, string> = {
  small: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4',
  medium: 'grid-cols-1 md:grid-cols-2',
  large: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  xlarge: 'grid-cols-1',
}

const sizeLabels: Record<CardSize, string> = {
  small: 'Key Metrics',
  medium: 'Analytics',
  large: 'Detailed Views',
  xlarge: 'Data Tables',
}

export function SizeGroupGrid() {
  const { itemsBySize, reorderItems, getItemById } = useDashboardGrid()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [activeSize, setActiveSize] = useState<CardSize | null>(null)

  // Configure sensors with longer activation constraints for click-to-activate behavior
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 8,
    },
  })

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  })

  const keyboardSensor = useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates,
  })

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor)

  const handleDragStart = (event: DragStartEvent, size: CardSize) => {
    setActiveId(event.active.id as string)
    setActiveSize(size)
  }

  const handleDragEnd = (event: DragEndEvent, size: CardSize) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      reorderItems(active.id as string, over.id as string, size)
    }

    setActiveId(null)
    setActiveSize(null)
  }

  const handleDragCancel = () => {
    setActiveId(null)
    setActiveSize(null)
  }

  const activeItem = activeId ? getItemById(activeId) : null

  // Convert Map to Array and filter out empty groups
  const sizeGroups = Array.from(itemsBySize.entries()).filter(([_, items]) => items.length > 0)

  return (
    <div className="space-y-8">
      {sizeGroups.map(([size, items], groupIndex) => (
        <div key={size} className="space-y-4">
          {/* Group Label */}
          {groupIndex > 0 && (
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-start">
                <span className="bg-background pr-3 text-sm font-medium text-muted-foreground">
                  {sizeLabels[size]}
                </span>
              </div>
            </div>
          )}

          {/* Draggable Grid for this size group */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={(event) => handleDragStart(event, size)}
            onDragEnd={(event) => handleDragEnd(event, size)}
            onDragCancel={handleDragCancel}
          >
            <SortableContext
              items={items.map((item) => item.id)}
              strategy={horizontalListSortingStrategy}
            >
              <div
                className={cn(
                  'grid gap-4 md:gap-6',
                  sizeToGridClass[size],
                  items.length > 1 && 'draggable-group'
                )}
              >
                {items.map((item) => (
                  <DraggableGridItem
                    key={item.id}
                    item={item}
                    isActive={activeId === item.id}
                  />
                ))}
              </div>
            </SortableContext>

            {/* Drag overlay */}
            <DragOverlay>
              {activeItem && activeSize === size ? (
                <div className="opacity-90">
                  <DraggableGridItem item={activeItem} isDragOverlay />
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      ))}
    </div>
  )
}
