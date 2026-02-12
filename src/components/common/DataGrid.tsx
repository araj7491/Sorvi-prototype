import { useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import { CaretUp, CaretDown, CaretUpDown } from '@phosphor-icons/react'
import type { DataGridProps } from '@/types'
import { DataGridPagination } from './DataGridPagination'
import { cn } from '@/lib/utils'

export function DataGrid<TData>({
  data,
  columns,
  title,
  pageCount,
  totalRows,
  pagination,
  onPaginationChange,
  sorting,
  onSortingChange,
  isLoading = false,
  onRowClick,
}: DataGridProps<TData>) {
  // Convert our simplified column definitions to TanStack Table format
  const tableColumns = useMemo<ColumnDef<TData>[]>(() => {
    return columns.map((col) => ({
      id: col.id,
      header: col.header,
      accessorKey: col.accessorKey as string,
      accessorFn: col.accessorFn,
      cell: col.cell,
      enableSorting: col.enableSorting ?? true,
      size: col.size,
      minSize: col.minSize ?? 50,
      maxSize: col.maxSize ?? 500,
    }))
  }, [columns])

  // Convert our sorting format to TanStack Table format
  const sortingState: SortingState = useMemo(() => {
    if (!sorting) return []
    return [{ id: sorting.column, desc: sorting.direction === 'desc' }]
  }, [sorting])

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    // Server-side operations
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    pageCount,
    state: {
      pagination,
      sorting: sortingState,
    },
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === 'function' ? updater(pagination) : updater
      onPaginationChange(newPagination)
    },
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === 'function' ? updater(sortingState) : updater
      if (newSorting.length === 0) {
        onSortingChange?.(undefined)
      } else {
        onSortingChange?.({
          column: newSorting[0].id,
          direction: newSorting[0].desc ? 'desc' : 'asc',
        })
      }
    },
    columnResizeMode: 'onChange',
  })

  return (
    <div className="w-full mb-6 rounded-lg border border-border/50 bg-card shadow-sm dark:bg-card/50">
      {/* Title */}
      {title && (
        <div className="border-b border-border/50 dark:border-border/20 px-4 py-2.5">
          <h2 className="text-base font-semibold">{title}</h2>
        </div>
      )}

      {/* Table container with horizontal scroll */}
      <div className="relative overflow-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-muted/70 dark:bg-muted/25">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b-2 border-border/60 dark:border-border/30">
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort()
                  const isSorted = header.column.getIsSorted()

                  return (
                    <th
                      key={header.id}
                      className={cn(
                        'border-r border-border/40 dark:border-border/20 px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider',
                        canSort && 'cursor-pointer select-none hover:bg-muted/70 dark:hover:bg-muted/30',
                        'last:border-r-0'
                      )}
                      style={{ width: header.getSize() }}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {canSort && (
                          <span className="text-muted-foreground">
                            {isSorted === 'asc' ? (
                              <CaretUp className="h-3.5 w-3.5" weight="fill" />
                            ) : isSorted === 'desc' ? (
                              <CaretDown className="h-3.5 w-3.5" weight="fill" />
                            ) : (
                              <CaretUpDown className="h-3.5 w-3.5" />
                            )}
                          </span>
                        )}
                      </div>

                      {/* Column resize handle */}
                      {header.column.getCanResize() && (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={cn(
                            'absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none',
                            'hover:bg-primary',
                            header.column.getIsResizing() && 'bg-primary'
                          )}
                          style={{ userSelect: 'none' }}
                        />
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="border-b border-border/40 dark:border-border/20 px-4 py-8 text-center text-sm text-muted-foreground"
                >
                  Loading...
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="border-b border-border/40 dark:border-border/20 px-4 py-8 text-center text-sm text-muted-foreground"
                >
                  No results found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={cn(
                    "border-b border-border/40 dark:border-border/20 transition-colors dark:bg-black/25 hover:bg-muted/30 dark:hover:bg-black/15",
                    onRowClick && "cursor-pointer"
                  )}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="border-r border-border/40 dark:border-border/20 px-4 py-1.5 text-sm last:border-r-0"
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <DataGridPagination
        pageIndex={pagination.pageIndex}
        pageSize={pagination.pageSize}
        pageCount={pageCount}
        totalRows={totalRows}
        onPageChange={(pageIndex) =>
          onPaginationChange({ ...pagination, pageIndex })
        }
        onPageSizeChange={(pageSize) =>
          onPaginationChange({ pageIndex: 0, pageSize })
        }
      />
    </div>
  )
}
