import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { GridItem } from '@/types/grid'
import { cn } from '@/lib/utils'
import { DotsSixVertical } from '@phosphor-icons/react'

interface DraggableGridItemProps {
  item: GridItem
  isDragOverlay?: boolean
  isActive?: boolean
}

export function DraggableGridItem({
  item,
  isDragOverlay = false,
}: DraggableGridItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const Component = item.component

  // Don't apply sortable behavior to overlay
  if (isDragOverlay) {
    return (
      <div className="w-full">
        <Component {...item.props} />
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative transition-all duration-200',
        'group',
        isDragging && 'opacity-50 z-50',
        !isDragging && 'hover:scale-[1.01]'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Draggable card: ${item.props.title || item.type}`}
    >
      {/* Drag Handle - only show on hover and if there are siblings to swap with */}
      {isHovered && !isDragging && (
        <div
          className={cn(
            'absolute -left-2 top-1/2 -translate-y-1/2 z-10',
            'cursor-grab active:cursor-grabbing',
            'bg-background border border-border rounded-md p-1',
            'shadow-sm hover:shadow-md',
            'transition-all duration-150',
            'touch-none'
          )}
          {...attributes}
          {...listeners}
          title="Click and hold to drag"
        >
          <DotsSixVertical size={16} weight="bold" className="text-muted-foreground hover:text-foreground" />
        </div>
      )}

      {/* Card Content */}
      <div
        className={cn(
          'transition-all duration-200',
          isDragging && 'ring-2 ring-muted-foreground/20',
          'rounded-lg'
        )}
      >
        <Component {...item.props} />
      </div>
    </div>
  )
}
