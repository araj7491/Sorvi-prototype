import { useMemo } from 'react'
import { formatCurrency } from '@/data/mockQuotesData'
import type { QuoteLineItem } from '@/types'

interface QuoteFormSummaryProps {
  lineItems: QuoteLineItem[]
}

export function QuoteFormSummary({ lineItems }: QuoteFormSummaryProps) {
  const summary = useMemo(() => {
    const subTotal = lineItems.reduce((sum, item) => sum + item.amount, 0)

    // Calculate weighted average VAT
    const totalVat = lineItems.reduce((sum, item) => {
      const itemVat = (item.amount * item.vatPercent) / 100
      return sum + itemVat
    }, 0)

    const total = subTotal + totalVat

    return {
      subTotal,
      tax: totalVat,
      total,
    }
  }, [lineItems])

  return (
    <div className="space-y-6">
      <h3 className="text-base font-semibold">Summary</h3>

      <div className="flex justify-end">
        <div className="flex gap-10 text-sm">
          <div className="space-y-1.5 text-right">
            <p className="text-muted-foreground">Sub Total</p>
            <p className="text-muted-foreground">VAT</p>
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
  )
}
