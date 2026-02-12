import { useState, useEffect, useCallback } from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { DataGrid } from '@/components/common/DataGrid'
import { DataGridFilters } from '@/components/common/DataGridFilters'
import { Badge } from '@/components/ui/badge'
import { financeTabs } from '@/data/mockFinanceData.tsx'
import { formatCurrency, formatDate } from '@/data/mockQuotesData'
import { fetchQuotes } from '@/api/quotesApi'
import type { Quote, DataGridColumn, SortConfig, FilterConfig } from '@/types'

// Column definitions for the DataGrid
const quoteColumns: DataGridColumn<Quote>[] = [
  {
    id: 'id',
    header: 'Quote #',
    accessorKey: 'id',
    size: 120,
    cell: (info) => <span className="font-medium">{info.getValue() as string}</span>,
  },
  {
    id: 'date',
    header: 'Date',
    accessorKey: 'date',
    size: 130,
    cell: (info) => formatDate(info.getValue() as string),
  },
  {
    id: 'customer',
    header: 'Customer',
    accessorKey: 'customer',
    size: 250,
    enableSorting: true,
  },
  {
    id: 'salesPerson',
    header: 'Sales Person',
    accessorKey: 'salesPerson',
    size: 150,
  },
  {
    id: 'items',
    header: 'Items',
    accessorKey: 'items',
    size: 100,
    cell: (info) => <span className="text-muted-foreground">{info.getValue() as number}</span>,
  },
  {
    id: 'amount',
    header: 'Amount',
    accessorKey: 'amount',
    size: 130,
    cell: (info) => (
      <span className="font-semibold">{formatCurrency(info.getValue() as number)}</span>
    ),
  },
  {
    id: 'validUntil',
    header: 'Valid Until',
    accessorKey: 'validUntil',
    size: 130,
    cell: (info) => {
      const value = info.getValue() as string | undefined
      return value ? (
        <span className="text-sm text-muted-foreground">{formatDate(value)}</span>
      ) : null
    },
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    size: 120,
    cell: (info) => {
      const status = info.getValue() as 'accepted' | 'pending' | 'declined'
      return (
        <Badge
          variant={
            status === 'accepted'
              ? 'default'
              : status === 'pending'
              ? 'secondary'
              : 'destructive'
          }
          className={`text-xs px-2 py-0.5 ${
            status === 'accepted'
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : status === 'pending'
              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
  },
]

export function Quotes() {
  // State for server-side operations
  const [data, setData] = useState<Quote[]>([])
  const [totalRows, setTotalRows] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  })
  const [sorting, setSorting] = useState<SortConfig>({
    column: 'date',
    direction: 'desc',
  })
  const [filters, setFilters] = useState<FilterConfig>({})

  // Fetch data whenever pagination, sorting, or filters change
  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetchQuotes({
        page: pagination.pageIndex,
        pageSize: pagination.pageSize,
        sort: sorting,
        filters,
      })
      setData(response.data)
      setTotalRows(response.total)
    } catch (error) {
      console.error('Error fetching quotes:', error)
    } finally {
      setIsLoading(false)
    }
  }, [pagination, sorting, filters])

  useEffect(() => {
    loadData()
  }, [loadData])

  const pageCount = Math.ceil(totalRows / pagination.pageSize)

  return (
    <MainLayout
      showContentHeader
      contentHeaderTabs={financeTabs}
      activeTab="quotes"
      currentModule="finance"
    >
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold">Quotes</h1>
          <p className="text-muted-foreground">
            Manage and track all quotes across your organization
          </p>
        </div>

        {/* Filters */}
        <DataGridFilters onFiltersChange={setFilters} />

        {/* Data Grid */}
        <DataGrid
          data={data}
          columns={quoteColumns}
          pageCount={pageCount}
          totalRows={totalRows}
          pagination={pagination}
          onPaginationChange={setPagination}
          sorting={sorting}
          onSortingChange={(newSort) => setSorting(newSort || { column: 'date', direction: 'desc' })}
          isLoading={isLoading}
        />
      </div>
    </MainLayout>
  )
}
