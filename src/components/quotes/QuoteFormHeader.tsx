import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface QuoteFormHeaderProps {
  formData: {
    quoteNumber: string
    date: string
    validUntil: string
    customer: string
    salesPerson: string
  }
  updateField: (field: string, value: any) => void
  errors: Record<string, string>
}

// Sample customer data
const customers = [
  'Acme Corporation',
  'TechStart Inc',
  'Global Industries',
  'Precision Manufacturing',
  'Blue Ocean Logistics',
  'Summit Enterprises',
  'NextGen Solutions',
  'Cornerstone Group',
  'Velocity Systems',
  'Horizon Technologies',
]

// Sample sales people
const salesPeople = [
  'John Smith',
  'Sarah Johnson',
  'Michael Brown',
  'Emily Davis',
  'David Wilson',
]

export function QuoteFormHeader({ formData, updateField, errors }: QuoteFormHeaderProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-base font-semibold">Quote Information</h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Quote Number */}
        <div className="space-y-2">
          <Label htmlFor="quoteNumber">Quote Number</Label>
          <Input
            id="quoteNumber"
            value={formData.quoteNumber}
            disabled
            className="bg-muted"
          />
          <p className="text-xs text-muted-foreground">Auto-generated</p>
        </div>

        {/* Date */}
        <div className="space-y-2">
          <Label htmlFor="date">
            Date <span className="text-destructive">*</span>
          </Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => updateField('date', e.target.value)}
            className={errors.date ? 'border-destructive' : ''}
          />
          {errors.date && (
            <p className="text-sm text-destructive">{errors.date}</p>
          )}
        </div>

        {/* Valid Until */}
        <div className="space-y-2">
          <Label htmlFor="validUntil">Valid Until</Label>
          <Input
            id="validUntil"
            type="date"
            value={formData.validUntil}
            onChange={(e) => updateField('validUntil', e.target.value)}
          />
        </div>

        {/* Customer */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="customer">
            Customer <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.customer}
            onValueChange={(value) => updateField('customer', value)}
          >
            <SelectTrigger
              id="customer"
              className={errors.customer ? 'border-destructive' : ''}
            >
              <SelectValue placeholder="Select a customer" />
            </SelectTrigger>
            <SelectContent>
              {customers.map((customer) => (
                <SelectItem key={customer} value={customer}>
                  {customer}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.customer && (
            <p className="text-sm text-destructive">{errors.customer}</p>
          )}
        </div>

        {/* Sales Person */}
        <div className="space-y-2">
          <Label htmlFor="salesPerson">Sales Person</Label>
          <Select
            value={formData.salesPerson}
            onValueChange={(value) => updateField('salesPerson', value)}
          >
            <SelectTrigger id="salesPerson">
              <SelectValue placeholder="Select sales person" />
            </SelectTrigger>
            <SelectContent>
              {salesPeople.map((person) => (
                <SelectItem key={person} value={person}>
                  {person}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
