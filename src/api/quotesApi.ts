import type { Quote, PaginatedResponse, FetchDataParams } from '@/types'
import { mockQuotes } from '@/data/mockQuotesData'

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
