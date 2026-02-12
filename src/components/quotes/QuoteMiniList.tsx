import { useState, useMemo } from 'react'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
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
  const [search, setSearch] = useState('')

  const filteredQuotes = useMemo(() => {
    if (!search.trim()) return quotes
    const term = search.toLowerCase()
    return quotes.filter(
      (q) =>
        q.id.toLowerCase().includes(term) ||
        q.customer.toLowerCase().includes(term)
    )
  }, [quotes, search])

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden h-full">
      {/* Search */}
      <div className="p-2.5">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/30 px-3 py-1.5">
          <MagnifyingGlass size={14} className="text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Search quotes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
          />
        </div>
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
