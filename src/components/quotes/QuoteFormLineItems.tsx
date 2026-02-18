import { Plus, Trash } from '@phosphor-icons/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatCurrency } from '@/data/mockQuotesData'
import type { QuoteLineItem } from '@/types'

interface QuoteFormLineItemsProps {
  lineItems: QuoteLineItem[]
  updateLineItem: (index: number, field: keyof QuoteLineItem, value: any) => void
  addLineItem: () => void
  deleteLineItem: (index: number) => void
  errors: Record<string, string>
}

const manufacturers = [
  'Siemens',
  'ABB',
  'Schneider Electric',
  'Rockwell Automation',
  'Mitsubishi',
  'Omron',
  'Allen-Bradley',
  'Honeywell',
]

const conditions = [
  { value: 'new', label: 'New' },
  { value: 'refurbished', label: 'Refurbished' },
  { value: 'used', label: 'Used' },
]

const leadTimes = [
  { value: '1-2 weeks', label: '1-2 weeks' },
  { value: '3-4 weeks', label: '3-4 weeks' },
  { value: '1-2 months', label: '1-2 months' },
  { value: '3+ months', label: '3+ months' },
  { value: 'in stock', label: 'In Stock' },
]

export function QuoteFormLineItems({
  lineItems,
  updateLineItem,
  addLineItem,
  deleteLineItem,
  errors,
}: QuoteFormLineItemsProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-base font-semibold">Line Items</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Description
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Part #
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Manufacturer
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Condition
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Lead Time
                </th>
                <th className="px-3 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Qty
                </th>
                <th className="px-3 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Rate
                </th>
                <th className="px-3 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  VAT %
                </th>
                <th className="px-3 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Amount
                </th>
                <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {lineItems.map((item, index) => (
                <tr key={item.id}>
                  {/* Description */}
                  <td className="px-3 py-3">
                    <Input
                      value={item.description}
                      onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                      placeholder="Item description"
                      className={`h-9 ${errors[`item${index}_desc`] ? 'border-destructive' : ''}`}
                    />
                  </td>

                  {/* Part Number */}
                  <td className="px-3 py-3">
                    <Input
                      value={item.partNumber}
                      onChange={(e) => updateLineItem(index, 'partNumber', e.target.value)}
                      placeholder="Part #"
                      className="h-9"
                    />
                  </td>

                  {/* Manufacturer */}
                  <td className="px-3 py-3">
                    <Select
                      value={item.manufacturer}
                      onValueChange={(value) => updateLineItem(index, 'manufacturer', value)}
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {manufacturers.map((mfr) => (
                          <SelectItem key={mfr} value={mfr}>
                            {mfr}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>

                  {/* Condition */}
                  <td className="px-3 py-3">
                    <Select
                      value={item.condition}
                      onValueChange={(value) => updateLineItem(index, 'condition', value)}
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {conditions.map((cond) => (
                          <SelectItem key={cond.value} value={cond.value}>
                            {cond.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>

                  {/* Lead Time */}
                  <td className="px-3 py-3">
                    <Select
                      value={item.leadTime}
                      onValueChange={(value) => updateLineItem(index, 'leadTime', value)}
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {leadTimes.map((lt) => (
                          <SelectItem key={lt.value} value={lt.value}>
                            {lt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>

                  {/* Quantity */}
                  <td className="px-3 py-3">
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateLineItem(index, 'quantity', parseFloat(e.target.value) || 1)}
                      className={`h-9 text-right ${errors[`item${index}_qty`] ? 'border-destructive' : ''}`}
                    />
                  </td>

                  {/* Rate */}
                  <td className="px-3 py-3">
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.rate}
                      onChange={(e) => updateLineItem(index, 'rate', parseFloat(e.target.value) || 0)}
                      className={`h-9 text-right ${errors[`item${index}_rate`] ? 'border-destructive' : ''}`}
                    />
                  </td>

                  {/* VAT % */}
                  <td className="px-3 py-3">
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      value={item.vatPercent}
                      onChange={(e) => updateLineItem(index, 'vatPercent', parseFloat(e.target.value) || 0)}
                      className="h-9 text-right"
                    />
                  </td>

                  {/* Amount (read-only) */}
                  <td className="px-3 py-3 text-right font-medium">
                    {formatCurrency(item.amount)}
                  </td>

                  {/* Delete Button */}
                  <td className="px-3 py-3 text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteLineItem(index)}
                      disabled={lineItems.length === 1}
                      className="h-9 w-9 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>

      {/* Add Line Item Button */}
      <div className="mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={addLineItem}
          className="gap-2"
        >
          <Plus size={16} />
          Add Line Item
        </Button>
      </div>

      {/* Error message for line items */}
      {errors.lineItems && (
        <p className="text-sm text-destructive mt-2">{errors.lineItems}</p>
      )}
   
   
    </div>
  )
}
