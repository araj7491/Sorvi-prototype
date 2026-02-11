import { ArrowDown, ArrowUp } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { KPIData } from '@/types'

export function KPICard({ title, value, change, icon, variant = 'default' }: KPIData) {
  const variantStyles = {
    default: '',
    success: 'border-green-200 dark:border-green-900',
    warning: 'border-yellow-200 dark:border-yellow-900',
    error: 'border-red-200 dark:border-red-900',
  }

  return (
    <Card className={cn('min-h-[140px] max-h-[200px] transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', variantStyles[variant])}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-semibold">{value}</p>
          {change && (
            <div className="flex items-center gap-1 pt-1">
              <Badge
                variant={change.direction === 'up' ? 'default' : 'secondary'}
                className="gap-1 text-xs"
              >
                {change.direction === 'up' ? (
                  <ArrowUp className="h-3 w-3" />
                ) : (
                  <ArrowDown className="h-3 w-3" />
                )}
                {change.value}%
              </Badge>
              <span className="text-xs text-muted-foreground">{change.period}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
