import { useState, useEffect } from 'react'
import {
  PencilSimple,
  EnvelopeSimple,
  ShareNetwork,
  FilePdf,
  ArrowsClockwise,
  X,
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
import { QuoteDetailedView } from './QuoteDetailedView'
import { QuotePdfView } from './QuotePdfView'
import type { QuoteDetail } from '@/types'

interface QuoteDetailPanelProps {
  quoteId: string
  onClose: () => void
}

export function QuoteDetailPanel({ quoteId, onClose }: QuoteDetailPanelProps) {
  const [detail, setDetail] = useState<QuoteDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showPdf, setShowPdf] = useState(false)

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
    <div className="flex flex-col h-full min-w-0 rounded-lg border border-border bg-card">
      {/* Unified Header Bar */}
      <div className="flex items-center justify-between gap-4 px-6 py-2.5 border-b shrink-0 bg-muted/70 dark:bg-muted/25">
        {/* Left: Quote Number + Company Name */}
        <div className="min-w-0">
          <h2 className="text-xl font-semibold truncate">{detail.quoteNumber}</h2>
          <p className="text-sm text-muted-foreground mt-0.5 truncate">
            {detail.customerDetails.name}
          </p>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm hover:bg-muted transition-colors">
            <PencilSimple size={14} />
            Edit
          </button>
          <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm hover:bg-muted transition-colors">
            <EnvelopeSimple size={14} />
            Email
          </button>
          <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm hover:bg-muted transition-colors">
            <ShareNetwork size={14} />
            Share
          </button>

          <div className="h-8 w-px bg-border mx-1" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm hover:bg-muted transition-colors">
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
              <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm hover:bg-muted transition-colors">
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
              <button type="button" className="inline-flex items-center justify-center rounded-lg border border-border bg-muted/50 p-2 text-sm hover:bg-muted transition-colors">
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

      {/* Content Area - Full Width */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="p-6">
          {/* Controls Bar - Left Aligned */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2">
              <Label htmlFor="pdf-toggle" className="text-xs text-muted-foreground cursor-pointer">
                Show PDF View
              </Label>
              <Switch
                id="pdf-toggle"
                checked={showPdf}
                onCheckedChange={setShowPdf}
              />
            </div>
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
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-xs hover:bg-muted transition-colors"
            >
              Template: {detail.pdfTemplate}
              <CaretDown size={10} />
            </button>
          </div>

          {/* Quote Content */}
          {showPdf ? (
            <QuotePdfView />
          ) : (
            <QuoteDetailedView detail={detail} />
          )}
        </div>
      </div>

      {/* Footer Tip */}
      <div className="border-t px-5 py-3 text-xs text-muted-foreground shrink-0">
        Tip: Use keyboard shortcuts to navigate between quotes. Press <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted text-[10px] font-mono">?</kbd> for help.
      </div>
    </div>
  )
}
