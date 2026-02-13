import { useState, useRef, useCallback, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

interface DataTableColumn {
  key: string
  label: string
  className?: string
  render?: (value: any, row: any) => React.ReactNode
  width?: number // Initial width in pixels
  minWidth?: number // Minimum width in pixels (default: 50)
  maxWidth?: number // Maximum width in pixels (default: 500)
}

interface DataTableProps {
  title?: string
  columns: DataTableColumn[]
  data: any[]
  className?: string
  selectable?: boolean
  onSelectionChange?: (selectedRows: any[]) => void
}

export function DataTable({ title, columns, data, className, selectable = false, onSelectionChange }: DataTableProps) {
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set())

  // Column widths state - initialize with column.width or undefined (auto)
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(() => {
    const widths: Record<string, number> = {}
    columns.forEach(col => {
      if (col.width) {
        widths[col.key] = col.width
      }
    })
    return widths
  })

  // Checkbox column width state
  const [checkboxColumnWidth, setCheckboxColumnWidth] = useState<number>(48) // Default: 48px (w-12)
  const CHECKBOX_MIN_WIDTH = 40
  const CHECKBOX_MAX_WIDTH = 100

  // Resizing state
  const [resizingColumn, setResizingColumn] = useState<string | null>(null)
  const resizeStartX = useRef<number>(0)
  const resizeStartWidth = useRef<number>(0)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(data.map((row, index) => row.id ?? index))
      setSelectedRows(allIds)
      onSelectionChange?.(data)
    } else {
      setSelectedRows(new Set())
      onSelectionChange?.([])
    }
  }

  const handleSelectRow = (rowId: string | number, checked: boolean) => {
    const newSelected = new Set(selectedRows)
    if (checked) {
      newSelected.add(rowId)
    } else {
      newSelected.delete(rowId)
    }
    setSelectedRows(newSelected)

    const selected = data.filter((row, index) =>
      newSelected.has(row.id ?? index)
    )
    onSelectionChange?.(selected)
  }

  const isAllSelected = data.length > 0 && selectedRows.size === data.length

  // Handle column resize start
  const handleResizeStart = useCallback((e: React.MouseEvent, columnKey: string) => {
    e.preventDefault()
    e.stopPropagation()

    setResizingColumn(columnKey)
    resizeStartX.current = e.clientX

    // Get current width from DOM or use stored width
    const thElement = e.currentTarget.parentElement as HTMLTableCellElement
    resizeStartWidth.current = thElement.offsetWidth
  }, [])

  // Handle column resize
  const handleResize = useCallback((e: MouseEvent) => {
    if (!resizingColumn) return

    const deltaX = e.clientX - resizeStartX.current

    // Handle checkbox column separately
    if (resizingColumn === '__checkbox__') {
      const newWidth = Math.max(
        CHECKBOX_MIN_WIDTH,
        Math.min(CHECKBOX_MAX_WIDTH, resizeStartWidth.current + deltaX)
      )
      setCheckboxColumnWidth(newWidth)
    } else {
      // Handle data columns
      const newWidth = Math.max(
        columns.find(col => col.key === resizingColumn)?.minWidth ?? 50,
        Math.min(
          columns.find(col => col.key === resizingColumn)?.maxWidth ?? 500,
          resizeStartWidth.current + deltaX
        )
      )

      setColumnWidths(prev => ({
        ...prev,
        [resizingColumn]: newWidth
      }))
    }
  }, [resizingColumn, columns, CHECKBOX_MIN_WIDTH, CHECKBOX_MAX_WIDTH])

  // Handle resize end
  const handleResizeEnd = useCallback(() => {
    setResizingColumn(null)
  }, [])

  // Attach/detach mouse event listeners for resizing
  useEffect(() => {
    if (resizingColumn) {
      document.addEventListener('mousemove', handleResize)
      document.addEventListener('mouseup', handleResizeEnd)

      return () => {
        document.removeEventListener('mousemove', handleResize)
        document.removeEventListener('mouseup', handleResizeEnd)
      }
    }
  }, [resizingColumn, handleResize, handleResizeEnd])

  return (
    <Card className={cn('transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', className)}>
      {title && (
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="overflow-x-auto overflow-y-auto max-h-[600px] min-h-[200px]">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b">
                {selectable && (
                  <th
                    className="relative py-3 px-4"
                    style={{ width: `${checkboxColumnWidth}px` }}
                  >
                    <Checkbox
                      checked={isAllSelected}
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all rows"
                    />

                    {/* Checkbox column resize handle */}
                    <div
                      onMouseDown={(e) => handleResizeStart(e, '__checkbox__')}
                      className={cn(
                        'absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none',
                        'hover:bg-primary transition-colors',
                        resizingColumn === '__checkbox__' && 'bg-primary'
                      )}
                      style={{ userSelect: 'none' }}
                    />
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={cn(
                      'relative text-left py-3 px-4 text-sm font-medium text-muted-foreground',
                      column.className
                    )}
                    style={{
                      width: columnWidths[column.key] ? `${columnWidths[column.key]}px` : undefined
                    }}
                  >
                    <div className="flex items-center">
                      {column.label}
                    </div>

                    {/* Column resize handle */}
                    <div
                      onMouseDown={(e) => handleResizeStart(e, column.key)}
                      className={cn(
                        'absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none',
                        'hover:bg-primary transition-colors',
                        resizingColumn === column.key && 'bg-primary'
                      )}
                      style={{ userSelect: 'none' }}
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => {
                // Calculate progressive lightening: starts at 0% and increases gradually
                const lightnessOpacity = Math.min((index * 3), 40)
                const rowId = row.id ?? index
                const isSelected = selectedRows.has(rowId)

                return (
                  <tr
                    key={rowId}
                    className="border-b last:border-0 hover:bg-muted/50 transition-colors"
                    style={{
                      backgroundColor: `hsl(0 0% 100% / ${lightnessOpacity}%)`
                    }}
                  >
                    {selectable && (
                      <td
                        className="py-3 px-4"
                        style={{ width: `${checkboxColumnWidth}px` }}
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(checked) =>
                            handleSelectRow(rowId, checked as boolean)
                          }
                          aria-label={`Select row ${index + 1}`}
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={cn('py-3 px-4 text-sm', column.className)}
                        style={{
                          width: columnWidths[column.key] ? `${columnWidths[column.key]}px` : undefined
                        }}
                      >
                        {column.render
                          ? column.render(row[column.key], row)
                          : row[column.key]}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
          {data.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No data available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export { Badge }
