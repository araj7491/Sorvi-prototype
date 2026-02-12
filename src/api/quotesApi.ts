import type { Quote, QuoteDetail, PaginatedResponse, FetchDataParams, FetchKanbanColumnParams, KanbanColumnResponse, UpdateQuoteStatusParams, UpdateQuoteStatusResponse } from '@/types'
import { mockQuotes } from '@/data/mockQuotesData'
import { generateQuote, KANBAN_TOTALS } from '@/data/mockKanbanData'
import { generateQuoteDetail } from '@/data/mockQuoteDetails'

/**
 * Mock API client for quotes
 *
 * This simulates server-side pagination, sorting, and filtering.
 * In production, replace the implementation with actual fetch() calls to your backend.
 *
 * Example production implementation:
 *
 * export async function fetchQuotes(params: FetchDataParams): Promise<PaginatedResponse<Quote>> {
 *   const queryParams = new URLSearchParams({
 *     page: params.page.toString(),
 *     pageSize: params.pageSize.toString(),
 *     ...(params.sort && { sortBy: params.sort.column, sortOrder: params.sort.direction }),
 *     ...(params.filters && { filters: JSON.stringify(params.filters) }),
 *   })
 *
 *   const response = await fetch(`/api/quotes?${queryParams}`)
 *   return response.json()
 * }
 */
export async function fetchQuotes(
  params: FetchDataParams
): Promise<PaginatedResponse<Quote>> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  let filteredData = [...mockQuotes]

  // Apply filters
  if (params.filters) {
    if (params.filters.status && params.filters.status !== 'all') {
      filteredData = filteredData.filter(
        (quote) => quote.status === params.filters?.status
      )
    }
  }

  // Apply sorting
  if (params.sort) {
    const { column, direction } = params.sort
    filteredData.sort((a, b) => {
      const aValue = a[column as keyof Quote]
      const bValue = b[column as keyof Quote]

      if (aValue === undefined || bValue === undefined) return 0

      let comparison = 0
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue)
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue
      }

      return direction === 'asc' ? comparison : -comparison
    })
  }

  // Calculate pagination
  const total = filteredData.length
  const start = params.page * params.pageSize
  const end = start + params.pageSize
  const paginatedData = filteredData.slice(start, end)

  return {
    data: paginatedData,
    total,
    page: params.page,
    pageSize: params.pageSize,
  }
}

/**
 * Fetch quotes for a single Kanban column (by status), paginated.
 * Uses deterministic generation for scalable mock data.
 */
export async function fetchQuotesByStatus(
  params: FetchKanbanColumnParams
): Promise<KanbanColumnResponse> {
  // Simulate network delay (50-150ms)
  await new Promise((resolve) => setTimeout(resolve, 50 + Math.random() * 100))

  const total = KANBAN_TOTALS[params.status]
  const start = params.page * params.pageSize
  const end = Math.min(start + params.pageSize, total)

  const data: Quote[] = []
  for (let i = start; i < end; i++) {
    data.push(generateQuote(i, params.status))
  }

  // Compute a deterministic total amount for the column
  // Use a fixed per-status average multiplied by count for consistency
  const avgAmounts: Record<string, number> = { accepted: 24500, pending: 18200, declined: 12800 }
  const totalAmount = total * (avgAmounts[params.status] ?? 20000)

  return {
    data,
    total,
    page: params.page,
    pageSize: params.pageSize,
    totalAmount,
    hasMore: end < total,
  }
}

/**
 * Fetch full detail for a single quote by ID.
 */
export async function fetchQuoteDetail(quoteId: string): Promise<QuoteDetail | null> {
  await new Promise((resolve) => setTimeout(resolve, 150))

  const quote = mockQuotes.find((q) => q.id === quoteId)
  if (!quote) return null

  return generateQuoteDetail(quote)
}

/**
 * Mock status update for drag-and-drop.
 */
export async function updateQuoteStatus(
  params: UpdateQuoteStatusParams
): Promise<UpdateQuoteStatusResponse> {
  await new Promise((resolve) => setTimeout(resolve, 100 + Math.random() * 200))

  return {
    success: true,
    quote: {
      ...generateQuote(0, params.toStatus),
      id: params.quoteId,
      status: params.toStatus,
    },
  }
}
