import { useState, useMemo } from 'react'
import { ListBullets, CaretDown } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { formatDate } from '@/data/mockQuotesData'
import type { Quote } from '@/types'

interface QuoteMiniListProps {
  quotes: Quote[]
  selectedQuoteId: string
  onSelectQuote: (id: string) => void
}

function QuoteMiniListItem({
  quote,
  isSelected,
  onClick,
}: {
  quote: Quote
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full text-left px-3 py-2.5 transition-colors',
        isSelected
          ? 'bg-primary/10'
          : 'hover:bg-muted/50'
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium truncate">{quote.id}</span>
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {formatDate(quote.date)}
        </span>
      </div>
      <div className="flex items-center justify-between gap-2 mt-1">
        <span className="text-xs text-muted-foreground truncate">
          {quote.customer}
        </span>
        <Badge
          variant={
            quote.status === 'accepted'
              ? 'default'
              : quote.status === 'pending'
              ? 'secondary'
              : 'destructive'
          }
          className={cn(
            'text-[10px] px-1.5 py-0 shrink-0',
            quote.status === 'accepted' && 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
            quote.status === 'pending' && 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
            quote.status === 'declined' && 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          )}
        >
          {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
        </Badge>
      </div>
    </button>
  )
}

export function QuoteMiniList({
  quotes,
  selectedQuoteId,
  onSelectQuote,
}: QuoteMiniListProps) {
  const [statusFilter, setStatusFilter] = useState<'all' | 'accepted' | 'pending' | 'declined'>('all')

  const filteredQuotes = useMemo(() => {
    if (statusFilter === 'all') return quotes
    return quotes.filter((q) => q.status === statusFilter)
  }, [quotes, statusFilter])

  return (
    <div className="flex flex-col h-full rounded-lg border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/70 dark:bg-muted/25">
        <div className="flex items-center gap-2">
          <ListBullets size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium">Quotes</span>
          <span className="rounded-full border px-2 py-0.5 text-[11px] text-muted-foreground">
            {filteredQuotes.length}
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs hover:bg-muted transition-colors"
            >
              Status: {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
              <CaretDown size={10} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setStatusFilter('all')}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('accepted')}>
              Accepted
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('pending')}>
              Pending
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('declined')}>
              Declined
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto divide-y divide-border/30">
        {filteredQuotes.map((quote) => (
          <QuoteMiniListItem
            key={quote.id}
            quote={quote}
            isSelected={quote.id === selectedQuoteId}
            onClick={() => onSelectQuote(quote.id)}
          />
        ))}
        {filteredQuotes.length === 0 && (
          <div className="px-3 py-6 text-center text-xs text-muted-foreground">
            No quotes found
          </div>
        )}
      </div>
    </div>
  )
}
