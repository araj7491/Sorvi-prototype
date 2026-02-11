import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface DataTableColumn {
  key: string
  label: string
  className?: string
  render?: (value: any, row: any) => React.ReactNode
}

interface DataTableProps {
  title?: string
  columns: DataTableColumn[]
  data: any[]
  className?: string
}

export function DataTable({ title, columns, data, className }: DataTableProps) {
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
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={cn(
                      'text-left py-3 px-4 text-sm font-medium text-muted-foreground',
                      column.className
                    )}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={row.id || index}
                  className="border-b last:border-0 hover:bg-muted/50 transition-colors"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn('py-3 px-4 text-sm', column.className)}
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
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
