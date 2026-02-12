import { useState, useEffect, useMemo } from 'react'
import {
  PencilSimple,
  EnvelopeSimple,
  ShareNetwork,
  FilePdf,
  ArrowsClockwise,
  X,
  Sparkle,
  DotsThree,
  CaretDown,
  Lock,
  Copy,
  Trash,
  GearSix,
  PaperPlaneTilt,
} from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { fetchQuoteDetail } from '@/api/quotesApi'
import { generateQuoteActivities } from '@/data/mockQuoteDetails'
import { QuoteDetailedView } from './QuoteDetailedView'
import { QuotePdfView } from './QuotePdfView'
import { QuoteActivityPanel } from './QuoteActivityPanel'
import type { QuoteDetail, QuoteActivity } from '@/types'

interface QuoteDetailPanelProps {
  quoteId: string
  onClose: () => void
}

export function QuoteDetailPanel({ quoteId, onClose }: QuoteDetailPanelProps) {
  const [detail, setDetail] = useState<QuoteDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showPdf, setShowPdf] = useState(false)

  const activities: QuoteActivity[] = useMemo(
    () => generateQuoteActivities(quoteId),
    [quoteId]
  )

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)

    fetchQuoteDetail(quoteId).then((data) => {
      if (!cancelled) {
        setDetail(data)
        setIsLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [quoteId])

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        Loading quote details...
      </div>
    )
  }

  if (!detail) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        Quote not found
      </div>
    )
  }

  const statusLabel = detail.status.charAt(0).toUpperCase() + detail.status.slice(1)

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden rounded-2xl border border-border bg-card">
      {/* Unified Header Bar */}
      <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-border/50 shrink-0">
        {/* Left: ID + Badge + Subtitle */}
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold truncate">{detail.quoteNumber}</h2>
            <Badge
              variant={
                detail.status === 'accepted' ? 'default' : detail.status === 'pending' ? 'secondary' : 'destructive'
              }
              className={cn(
                'text-xs px-2 py-0.5 shrink-0',
                detail.status === 'accepted' && 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
                detail.status === 'pending' && 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
                detail.status === 'declined' && 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              )}
            >
              {statusLabel}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            Created by {detail.salesPerson ?? 'Unknown'} &middot; {detail.items} items
          </p>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/50 px-3 py-2 text-sm hover:bg-muted transition-colors">
            <PencilSimple size={14} />
            Edit
          </button>
          <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/50 px-3 py-2 text-sm hover:bg-muted transition-colors">
            <EnvelopeSimple size={14} />
            Email
          </button>
          <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/50 px-3 py-2 text-sm hover:bg-muted transition-colors">
            <ShareNetwork size={14} />
            Share
          </button>

          <div className="h-8 w-px bg-border mx-1" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/50 px-3 py-2 text-sm hover:bg-muted transition-colors">
                <FilePdf size={14} />
                PDF/Print
                <CaretDown size={10} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Download PDF</DropdownMenuItem>
              <DropdownMenuItem>Print Quote</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/50 px-3 py-2 text-sm hover:bg-muted transition-colors">
                <ArrowsClockwise size={14} />
                Convert
                <CaretDown size={10} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Convert to Invoice</DropdownMenuItem>
              <DropdownMenuItem>Convert to Sales Order</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* More Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" className="inline-flex items-center justify-center rounded-xl border border-border bg-muted/50 p-2 text-sm hover:bg-muted transition-colors">
                <DotsThree size={16} weight="bold" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <PaperPlaneTilt size={14} className="mr-2" />
                Mark as Sent
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy size={14} className="mr-2" />
                Clone
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <Trash size={14} className="mr-2" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Lock size={14} className="mr-2" />
                Lock Quote
              </DropdownMenuItem>
              <DropdownMenuItem>
                <GearSix size={14} className="mr-2" />
                Quote Preferences
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Close button */}
          <Button variant="ghost" size="icon" className="h-9 w-9 ml-1" onClick={onClose}>
            <X size={16} />
          </Button>
        </div>
      </div>

      {/* What's Next Section */}
      <div className="bg-muted/30 border-b border-border/50 px-6 py-4 shrink-0">
        <div className="flex items-start gap-3">
          <Sparkle size={18} weight="fill" className="text-purple-500 mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              What's Next
            </p>
            <p className="text-sm mt-0.5">
              Convert this quote to an Invoice or Sales Order to proceed with the transaction.
            </p>
          </div>
          <button
            type="button"
            className="shrink-0 bg-primary text-primary-foreground rounded-lg px-4 py-1.5 text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Convert
          </button>
        </div>
      </div>

      {/* Toggle & Status Section */}
      <div className="px-6 py-4 border-b border-border/50 shrink-0">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-end gap-2">
            <Label htmlFor="pdf-toggle" className="text-xs text-muted-foreground cursor-pointer">
              Show PDF View
            </Label>
            <Switch
              id="pdf-toggle"
              checked={showPdf}
              onCheckedChange={setShowPdf}
            />
          </div>
          <div className="flex items-center justify-between">
            <Badge
              variant={
                detail.status === 'accepted' ? 'default' : detail.status === 'pending' ? 'secondary' : 'destructive'
              }
              className={cn(
                'text-xs px-2 py-0.5',
                detail.status === 'accepted' && 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
                detail.status === 'pending' && 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
                detail.status === 'declined' && 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              )}
            >
              {statusLabel}
            </Badge>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-muted/50 px-3 py-1.5 text-xs hover:bg-muted transition-colors"
            >
              Template: {detail.pdfTemplate}
              <CaretDown size={10} />
            </button>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-12 gap-6 p-6">
          {/* Left: Detailed View or PDF View */}
          <div className="col-span-12 xl:col-span-8">
            {showPdf ? (
              <QuotePdfView />
            ) : (
              <QuoteDetailedView detail={detail} />
            )}
          </div>

          {/* Right: Activity Panel */}
          <div className="col-span-12 xl:col-span-4">
            <div className="xl:sticky xl:top-0">
              <QuoteActivityPanel activities={activities} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Tip */}
      <div className="border-t border-border/50 px-5 py-3 text-xs text-muted-foreground shrink-0">
        Tip: Use keyboard shortcuts to navigate between quotes. Press <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted text-[10px] font-mono">?</kbd> for help.
      </div>
    </div>
  )
}
