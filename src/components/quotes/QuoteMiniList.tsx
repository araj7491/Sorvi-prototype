import { useState, useMemo } from 'react'
import type { RefObject } from 'react'
import { DotsThreeVertical } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { formatDate } from '@/data/mockQuotesData'
import type { Quote, MiniListContentState } from '@/types'

interface QuoteMiniListProps {
  quotes: Quote[]
  selectedQuoteId: string
  onSelectQuote: (id: string) => void
  contentState: MiniListContentState
  resizeHandleRef: RefObject<HTMLDivElement | null>
  onResizeHandleMouseDown: (e: React.MouseEvent) => void
  isDragging: boolean
}

function QuoteMiniListItem({
  quote,
  isSelected,
  onClick,
  contentState,
}: {
  quote: Quote
  isSelected: boolean
  onClick: () => void
  contentState: MiniListContentState
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
      {/* ALWAYS show quote ID */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium truncate">{quote.id}</span>

        {/* Show date only in MAX state */}
        <span
          className={cn(
            'text-xs text-muted-foreground whitespace-nowrap transition-opacity duration-200',
            contentState === 'max' ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
          )}
        >
          {formatDate(quote.date)}
        </span>
      </div>

      {/* Show company + status in MIDDLE and MAX states */}
      <div
        className={cn(
          'flex items-center justify-between gap-2 transition-opacity duration-200',
          contentState !== 'min' ? 'opacity-100 mt-1' : 'opacity-0 h-0 overflow-hidden'
        )}
      >
        <span className="text-xs text-muted-foreground truncate">
          {quote.customer}
        </span>

        {/* Show status badge only in MAX state */}
        <Badge
          variant={
            quote.status === 'accepted'
              ? 'default'
              : quote.status === 'pending'
              ? 'secondary'
              : 'destructive'
          }
          className={cn(
            'text-[10px] px-1.5 py-0 shrink-0 transition-opacity duration-200',
            quote.status === 'accepted'
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : quote.status === 'pending'
              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
            contentState === 'max' ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
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
  contentState,
  resizeHandleRef,
  onResizeHandleMouseDown,
  isDragging,
}: QuoteMiniListProps) {
  const [statusFilter, setStatusFilter] = useState<'all' | 'accepted' | 'pending' | 'declined'>('all')

  const filteredQuotes = useMemo(() => {
    if (statusFilter === 'all') return quotes
    return quotes.filter((q) => q.status === statusFilter)
  }, [quotes, statusFilter])

  return (
    <div className="relative flex flex-col h-full rounded-lg border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/70 dark:bg-muted/25">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Quotes</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center justify-center hover:brightness-125 transition-all data-[state=open]:brightness-150"
            >
              <DotsThreeVertical size={18} className="text-foreground/80" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* Filter by submenu */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Filter by</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
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
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            {/* Sort by submenu */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Sort by</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Date (Newest)</DropdownMenuItem>
                <DropdownMenuItem>Date (Oldest)</DropdownMenuItem>
                <DropdownMenuItem>Amount (High to Low)</DropdownMenuItem>
                <DropdownMenuItem>Amount (Low to High)</DropdownMenuItem>
                <DropdownMenuItem>Customer (A-Z)</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
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
            contentState={contentState}
          />
        ))}
        {filteredQuotes.length === 0 && (
          <div className="px-3 py-6 text-center text-xs text-muted-foreground">
            No quotes found
          </div>
        )}
      </div>

      {/* Resize Handle - only visible on desktop */}
      <div
        ref={resizeHandleRef}
        onMouseDown={onResizeHandleMouseDown}
        className={cn(
          'absolute top-0 right-0 bottom-0 w-1.5 cursor-col-resize group',
          'hover:bg-primary/20 active:bg-primary/40 transition-colors duration-150',
          'hidden md:block',
          isDragging && 'bg-primary/40'
        )}
      >
        {/* Visual indicator dots */}
        <div className="absolute inset-y-0 right-0.5 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-1 h-1 rounded-full bg-muted-foreground/60" />
          <div className="w-1 h-1 rounded-full bg-muted-foreground/60" />
          <div className="w-1 h-1 rounded-full bg-muted-foreground/60" />
        </div>
      </div>
    </div>
  )
}
