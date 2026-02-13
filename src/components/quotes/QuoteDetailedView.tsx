import { PencilSimple, Trash, ShareNetwork } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/data/mockQuotesData'
import type { QuoteDetail } from '@/types'

interface QuoteDetailedViewProps {
  detail: QuoteDetail
}

export function QuoteDetailedView({ detail }: QuoteDetailedViewProps) {
  const { customerDetails, lineItems, summary } = detail

  const formatAddress = (addr: typeof customerDetails.billingAddress) =>
    `${addr.street}\n${addr.city}, ${addr.state} ${addr.zip}\n${addr.country}`

  return (
    <div className="space-y-6">
      {/* Billing & Shipping Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Billing Address */}
        <div className="rounded-lg border border-border/50 bg-muted/30 p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Billing Address
            </span>
            <button type="button" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
              <PencilSimple size={12} />
              Edit
            </button>
          </div>
          <p className="text-lg font-semibold mt-1">{customerDetails.name}</p>
          <p className="text-sm text-muted-foreground mt-1 whitespace-pre-line">
            {formatAddress(customerDetails.billingAddress)}
          </p>
        </div>

        {/* Shipping Address */}
        <div className="rounded-lg border border-border/50 bg-muted/30 p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Shipping Address
            </span>
            <button type="button" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
              <PencilSimple size={12} />
              Edit
            </button>
          </div>
          <p className="text-lg font-semibold mt-1">{customerDetails.name}</p>
          <p className="text-sm text-muted-foreground mt-1 whitespace-pre-line">
            {formatAddress(customerDetails.shippingAddress)}
          </p>
        </div>
      </div>

      {/* Line Items Table + Summary */}
      <div className="rounded-lg border border-border/50 bg-muted/30 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Item Details
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Qty
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Rate
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {lineItems.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3">
                  <div className="font-medium">{item.description}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.partNumber} &middot; {item.manufacturer}
                  </div>
                </td>
                <td className="px-4 py-3 text-right">{item.quantity}</td>
                <td className="px-4 py-3 text-right">{formatCurrency(item.rate)}</td>
                <td className="px-4 py-3 text-right font-medium">{formatCurrency(item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary Footer */}
        <div className="border-t border-border/50 bg-muted/50 px-4 py-4">
          <div className="flex justify-end">
            <div className="flex gap-10 text-sm">
              <div className="space-y-1.5 text-right">
                <p className="text-muted-foreground">Sub Total</p>
                <p className="text-muted-foreground">VAT (20%)</p>
                <p className="font-semibold">Total</p>
              </div>
              <div className="space-y-1.5 text-right">
                <p>{formatCurrency(summary.subTotal)}</p>
                <p>{formatCurrency(summary.tax)}</p>
                <p className="font-semibold">{formatCurrency(summary.total)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between border-t border-border/50 pt-6">
        <button
          type="button"
          className={cn(
            'inline-flex items-center gap-1.5 text-sm text-destructive hover:underline'
          )}
        >
          <Trash size={14} />
          Delete Quote
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ShareNetwork size={14} />
          Share
        </button>
      </div>
    </div>
  )
}
