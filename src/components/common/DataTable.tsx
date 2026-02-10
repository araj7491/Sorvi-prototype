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
    <Card className={cn('col-span-1 md:col-span-2 lg:col-span-3', className)}>
      {title && (
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
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
