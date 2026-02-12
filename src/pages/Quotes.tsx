import { useState, useEffect, useCallback } from 'react'
import { Table, Kanban } from '@phosphor-icons/react'
import { MainLayout } from '@/components/layout/MainLayout'
import { DataGrid } from '@/components/common/DataGrid'
import { DataGridFilters } from '@/components/common/DataGridFilters'
import { KanbanBoard } from '@/components/kanban/KanbanBoard'
import { QuoteMiniList } from '@/components/quotes/QuoteMiniList'
import { QuoteDetailPanel } from '@/components/quotes/QuoteDetailPanel'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { financeTabs } from '@/data/mockFinanceData.tsx'
import { formatCurrency, formatDate } from '@/data/mockQuotesData'
import { fetchQuotes } from '@/api/quotesApi'
import { cn } from '@/lib/utils'
import type { Quote, DataGridColumn, SortConfig, FilterConfig } from '@/types'

type ViewMode = 'grid' | 'kanban'

const STORAGE_KEY = 'sorvi-quotes-view'

function getInitialView(): ViewMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'grid' || stored === 'kanban') return stored
  } catch { /* ignore */ }
  return 'grid'
}

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
  const [viewMode, setViewMode] = useState<ViewMode>(getInitialView)
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null)

  // State for server-side operations (grid view)
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

  // Persist view mode
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, viewMode) } catch { /* ignore */ }
  }, [viewMode])

  // Fetch data whenever pagination, sorting, or filters change
  // Also load when selectedQuoteId is set (need data for mini list)
  const loadData = useCallback(async () => {
    if (viewMode !== 'grid' && !selectedQuoteId) return
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
  }, [pagination, sorting, filters, viewMode, selectedQuoteId])

  useEffect(() => {
    loadData()
  }, [loadData])

  const pageCount = Math.ceil(totalRows / pagination.pageSize)

  // When switching to kanban, close detail panel
  const handleViewModeChange = (mode: ViewMode) => {
    if (mode === 'kanban') {
      setSelectedQuoteId(null)
    }
    setViewMode(mode)
  }

  return (
    <MainLayout
      showContentHeader
      contentHeaderTabs={financeTabs}
      activeTab="quotes"
      currentModule="finance"
    >
      <div className="flex flex-col flex-1 min-h-0 gap-6">
        {/* Page Header - always visible */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Quotes</h1>
            <p className="text-muted-foreground">
              Manage and track all quotes across your organization
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 rounded-lg border bg-muted/50 p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleViewModeChange('grid')}
              className={cn(
                'h-8 px-3 gap-1.5',
                viewMode === 'grid' && 'bg-background shadow-sm'
              )}
            >
              <Table size={16} weight={viewMode === 'grid' ? 'fill' : 'regular'} />
              <span className="text-xs">Table</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleViewModeChange('kanban')}
              className={cn(
                'h-8 px-3 gap-1.5',
                viewMode === 'kanban' && 'bg-background shadow-sm'
              )}
            >
              <Kanban size={16} weight={viewMode === 'kanban' ? 'fill' : 'regular'} />
              <span className="text-xs">Board</span>
            </Button>
          </div>
        </div>

        {/* Content */}
        {selectedQuoteId ? (
          /* Split-panel layout */
          <div className="grid grid-cols-12 gap-5 flex-1 min-h-0">
            <div className="col-span-12 lg:col-span-2 min-h-0">
              <QuoteMiniList
                quotes={data}
                selectedQuoteId={selectedQuoteId}
                onSelectQuote={setSelectedQuoteId}
              />
            </div>
            <div className="col-span-12 lg:col-span-10 min-h-0 overflow-hidden">
              <QuoteDetailPanel
                quoteId={selectedQuoteId}
                onClose={() => setSelectedQuoteId(null)}
              />
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="space-y-6">
            <DataGridFilters onFiltersChange={setFilters} />
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
              onRowClick={(row) => setSelectedQuoteId(row.id)}
            />
          </div>
        ) : (
          <KanbanBoard />
        )}
      </div>
    </MainLayout>
  )
}
