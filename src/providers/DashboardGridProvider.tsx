import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import type { GridItem, GridLayoutConfig, CardSize } from '@/types/grid'

type DashboardGridProviderProps = {
  children: React.ReactNode
  dashboardId: string
  defaultItems: GridItem[]
}

type DashboardGridContextState = {
  items: GridItem[]
  itemsBySize: Map<CardSize, GridItem[]>
  reorderItems: (activeId: string, overId: string, size: CardSize) => void
  getItemById: (id: string) => GridItem | undefined
}

const initialState: DashboardGridContextState = {
  items: [],
  itemsBySize: new Map(),
  reorderItems: () => null,
  getItemById: () => undefined,
}

const DashboardGridContext = createContext<DashboardGridContextState>(initialState)

const STORAGE_VERSION = '1.0.0'

export function DashboardGridProvider({
  children,
  dashboardId,
  defaultItems,
}: DashboardGridProviderProps) {
  const storageKey = `sorvi-dashboard-${dashboardId}`

  const [items, setItems] = useState<GridItem[]>(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        const config: GridLayoutConfig = JSON.parse(stored)

        // Validate version and structure
        if (config.version === STORAGE_VERSION && Array.isArray(config.items)) {
          // Merge stored order with default items to handle new items
          const storedMap = new Map(config.items.map(item => [item.id, item]))

          return defaultItems.map(defaultItem => {
            const storedItem = storedMap.get(defaultItem.id)
            return storedItem ? { ...defaultItem, order: storedItem.order } : defaultItem
          }).sort((a, b) => a.order - b.order)
        }
      }
    } catch (error) {
      console.error('Failed to load dashboard layout:', error)
    }

    return defaultItems
  })

  // Save to localStorage whenever items change
  useEffect(() => {
    try {
      const config: GridLayoutConfig = {
        items: items.map(item => ({
          id: item.id,
          type: item.type,
          component: item.component,
          props: item.props,
          size: item.size,
          order: item.order,
        })),
        lastModified: Date.now(),
        version: STORAGE_VERSION,
      }
      localStorage.setItem(storageKey, JSON.stringify(config))
    } catch (error) {
      console.error('Failed to save dashboard layout:', error)

      // Handle quota exceeded - try session storage fallback
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        try {
          const config: GridLayoutConfig = {
            items: items.map(item => ({
              id: item.id,
              type: item.type,
              component: item.component,
              props: item.props,
              size: item.size,
              order: item.order,
            })),
            lastModified: Date.now(),
            version: STORAGE_VERSION,
          }
          sessionStorage.setItem(storageKey, JSON.stringify(config))
        } catch {
          console.error('Session storage also full')
        }
      }
    }
  }, [items, storageKey])

  // Sync across tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue) {
        try {
          const config: GridLayoutConfig = JSON.parse(e.newValue)
          if (config.version === STORAGE_VERSION && Array.isArray(config.items)) {
            const storedMap = new Map(config.items.map(item => [item.id, item]))

            const updatedItems = defaultItems.map(defaultItem => {
              const storedItem = storedMap.get(defaultItem.id)
              return storedItem ? { ...defaultItem, order: storedItem.order } : defaultItem
            }).sort((a, b) => a.order - b.order)

            setItems(updatedItems)
          }
        } catch (error) {
          console.error('Failed to sync dashboard layout:', error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [storageKey, defaultItems])

  // Group items by size
  const itemsBySize = useMemo(() => {
    const groups = new Map<CardSize, GridItem[]>()
    const sizeOrder: CardSize[] = ['small', 'medium', 'large', 'xlarge']

    // Initialize groups
    sizeOrder.forEach(size => groups.set(size, []))

    // Group items by size
    items.forEach(item => {
      const group = groups.get(item.size)
      if (group) {
        group.push(item)
      }
    })

    // Remove empty groups
    sizeOrder.forEach(size => {
      if (groups.get(size)?.length === 0) {
        groups.delete(size)
      }
    })

    return groups
  }, [items])

  const reorderItems = useCallback((activeId: string, overId: string, size: CardSize) => {
    setItems(currentItems => {
      // Only allow reordering within the same size group
      const activeItem = currentItems.find(item => item.id === activeId)
      const overItem = currentItems.find(item => item.id === overId)

      if (!activeItem || !overItem || activeItem.size !== size || overItem.size !== size) {
        return currentItems
      }

      const activeIndex = currentItems.findIndex(item => item.id === activeId)
      const overIndex = currentItems.findIndex(item => item.id === overId)

      if (activeIndex === -1 || overIndex === -1) {
        return currentItems
      }

      const newItems = [...currentItems]
      const [removed] = newItems.splice(activeIndex, 1)
      newItems.splice(overIndex, 0, removed)

      // Update order numbers
      return newItems.map((item, index) => ({ ...item, order: index }))
    })
  }, [])

  const getItemById = useCallback((id: string) => {
    return items.find(item => item.id === id)
  }, [items])

  const value = {
    items,
    itemsBySize,
    reorderItems,
    getItemById,
  }

  return (
    <DashboardGridContext.Provider value={value}>
      {children}
    </DashboardGridContext.Provider>
  )
}

export const useDashboardGrid = () => {
  const context = useContext(DashboardGridContext)

  if (context === undefined) {
    throw new Error('useDashboardGrid must be used within a DashboardGridProvider')
  }

  return context
}
