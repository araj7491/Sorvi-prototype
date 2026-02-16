import { useState, useRef, useEffect, useCallback } from 'react'
import type { RefObject } from 'react'
import { useLocalStorage } from './useLocalStorage'

export type MiniListContentState = 'min' | 'middle' | 'max'

interface UseResizableWidthOptions {
  minWidth: number
  maxWidth: number
  defaultWidth: number
  storageKey: string
}

interface UseResizableWidthReturn {
  width: number
  contentState: MiniListContentState
  isDragging: boolean
  handleMouseDown: (e: React.MouseEvent) => void
  resizeHandleRef: RefObject<HTMLDivElement | null>
}

/**
 * Custom hook for managing resizable width with drag interaction
 * @param options Configuration for min/max width, default, and storage key
 * @returns Width state, content state, drag handlers, and refs
 */
export function useResizableWidth(
  options: UseResizableWidthOptions
): UseResizableWidthReturn {
  const { minWidth, maxWidth, defaultWidth, storageKey } = options

  // Check if we're on mobile (< 768px)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )

  // Get saved width from localStorage, or use default
  const [savedWidth, setSavedWidth] = useLocalStorage(storageKey, defaultWidth)

  // Initialize width - force to minWidth on mobile, otherwise use saved or default
  const [width, setWidth] = useState(() => {
    if (isMobile) return minWidth
    // Clamp saved width between min and max bounds
    return Math.max(minWidth, Math.min(maxWidth, savedWidth))
  })

  const [isDragging, setIsDragging] = useState(false)
  const dragStartX = useRef(0)
  const dragStartWidth = useRef(0)
  const resizeHandleRef = useRef<HTMLDivElement>(null)

  // Handle window resize to detect mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)

      // Force to minWidth on mobile
      if (mobile) {
        setWidth(minWidth)
      } else {
        // Restore saved width when returning to desktop
        setWidth(Math.max(minWidth, Math.min(maxWidth, savedWidth)))
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [minWidth, maxWidth, savedWidth])

  // Calculate content state based on width thresholds
  const contentState: MiniListContentState =
    width < 180 ? 'min' : width < 230 ? 'middle' : 'max'

  // Handle mouse down on resize handle
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Don't allow resizing on mobile
    if (isMobile) return

    e.preventDefault()
    e.stopPropagation()

    setIsDragging(true)
    dragStartX.current = e.clientX
    dragStartWidth.current = width
  }, [width, isMobile])

  // Handle mouse move during drag
  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      const delta = e.clientX - dragStartX.current
      const newWidth = dragStartWidth.current + delta

      // Clamp width between min and max
      const clampedWidth = Math.max(minWidth, Math.min(maxWidth, newWidth))
      setWidth(clampedWidth)
    }

    const handleMouseUp = () => {
      setIsDragging(false)

      // Save to localStorage on drag end (not during drag for performance)
      setSavedWidth(width)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    // Prevent text selection during drag
    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'col-resize'

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
    }
  }, [isDragging, width, minWidth, maxWidth, setSavedWidth])

  return {
    width,
    contentState,
    isDragging,
    handleMouseDown,
    resizeHandleRef,
  }
}
