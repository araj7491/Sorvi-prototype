import { useState, useCallback, useRef, useEffect } from 'react'
import type { Quote, QuoteStatus } from '@/types'
import { fetchQuotesByStatus } from '@/api/quotesApi'

const PAGE_SIZE = 50

interface KanbanColumnState {
  items: Quote[]
  page: number
  total: number
  totalAmount: number
  isLoading: boolean
  hasMore: boolean
}

export function useKanbanColumn(status: QuoteStatus) {
  const [state, setState] = useState<KanbanColumnState>({
    items: [],
    page: 0,
    total: 0,
    totalAmount: 0,
    isLoading: false,
    hasMore: true,
  })

  const isFetchingRef = useRef(false)
  const abortRef = useRef<AbortController | null>(null)

  const fetchPage = useCallback(async (pageNum: number) => {
    if (isFetchingRef.current) return
    isFetchingRef.current = true

    setState((prev) => ({ ...prev, isLoading: true }))

    try {
      const response = await fetchQuotesByStatus({
        status,
        page: pageNum,
        pageSize: PAGE_SIZE,
      })

      setState({
        items: response.data,
        page: pageNum,
        total: response.total,
        totalAmount: response.totalAmount,
        isLoading: false,
        hasMore: response.hasMore,
      })
    } catch {
      setState((prev) => ({ ...prev, isLoading: false }))
    } finally {
      isFetchingRef.current = false
    }
  }, [status])

  // Load first page on mount
  useEffect(() => {
    abortRef.current = new AbortController()
    fetchPage(0)
    return () => {
      abortRef.current?.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const goToPage = useCallback((pageNum: number) => {
    fetchPage(pageNum)
  }, [fetchPage])

  const pageCount = Math.ceil(state.total / PAGE_SIZE)

  const insertItem = useCallback((item: Quote, index: number) => {
    setState((prev) => {
      const newItems = [...prev.items]
      newItems.splice(index, 0, item)
      return {
        ...prev,
        items: newItems,
        total: prev.total + 1,
        totalAmount: prev.totalAmount + item.amount,
      }
    })
  }, [])

  const removeItem = useCallback((quoteId: string) => {
    setState((prev) => {
      const idx = prev.items.findIndex((q) => q.id === quoteId)
      if (idx === -1) return prev
      const removed = prev.items[idx]
      const newItems = prev.items.filter((q) => q.id !== quoteId)
      return {
        ...prev,
        items: newItems,
        total: prev.total - 1,
        totalAmount: prev.totalAmount - removed.amount,
      }
    })
  }, [])

  return {
    ...state,
    pageCount,
    pageSize: PAGE_SIZE,
    goToPage,
    insertItem,
    removeItem,
  }
}
