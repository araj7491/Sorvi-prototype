import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import type { QuoteCustomer, Address } from '@/types'

interface QuoteFormCustomerProps {
  customerDetails: QuoteCustomer
  updateCustomerDetail: (field: keyof QuoteCustomer, value: any) => void
  updateAddress: (
    type: 'billingAddress' | 'shippingAddress',
    field: keyof Address,
    value: string
  ) => void
  errors: Record<string, string>
}

export function QuoteFormCustomer({
  customerDetails,
  updateCustomerDetail,
  updateAddress,
  errors,
}: QuoteFormCustomerProps) {
  const [sameAsBilling, setSameAsBilling] = useState(false)

  const handleSameAsBillingChange = (checked: boolean) => {
    setSameAsBilling(checked)
    if (checked) {
      // Copy billing address to shipping address
      const fields: (keyof Address)[] = ['street', 'city', 'state', 'zip', 'country']
      fields.forEach((field) => {
        updateAddress('shippingAddress', field, customerDetails.billingAddress[field])
      })
    }
  }

  const handleBillingAddressChange = (field: keyof Address, value: string) => {
    updateAddress('billingAddress', field, value)
    // If same as billing is checked, update shipping address too
    if (sameAsBilling) {
      updateAddress('shippingAddress', field, value)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Customer Basic Info */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              value={customerDetails.name}
              onChange={(e) => updateCustomerDetail('name', e.target.value)}
              placeholder="Enter customer name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={customerDetails.email}
              onChange={(e) => updateCustomerDetail('email', e.target.value)}
              placeholder="customer@example.com"
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={customerDetails.phone}
              onChange={(e) => updateCustomerDetail('phone', e.target.value)}
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>

        {/* Addresses */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Billing Address */}
          <div className="rounded-lg border border-border/50 bg-muted/30 p-5 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Billing Address
            </h3>

            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="billingStreet">Street Address</Label>
                <Input
                  id="billingStreet"
                  value={customerDetails.billingAddress.street}
                  onChange={(e) => handleBillingAddressChange('street', e.target.value)}
                  placeholder="123 Main St"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="billingCity">City</Label>
                  <Input
                    id="billingCity"
                    value={customerDetails.billingAddress.city}
                    onChange={(e) => handleBillingAddressChange('city', e.target.value)}
                    placeholder="New York"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billingState">State</Label>
                  <Input
                    id="billingState"
                    value={customerDetails.billingAddress.state}
                    onChange={(e) => handleBillingAddressChange('state', e.target.value)}
                    placeholder="NY"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="billingZip">ZIP Code</Label>
                  <Input
                    id="billingZip"
                    value={customerDetails.billingAddress.zip}
                    onChange={(e) => handleBillingAddressChange('zip', e.target.value)}
                    placeholder="10001"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billingCountry">Country</Label>
                  <Input
                    id="billingCountry"
                    value={customerDetails.billingAddress.country}
                    onChange={(e) => handleBillingAddressChange('country', e.target.value)}
                    placeholder="USA"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="rounded-lg border border-border/50 bg-muted/30 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Shipping Address
              </h3>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sameAsBilling"
                  checked={sameAsBilling}
                  onCheckedChange={handleSameAsBillingChange}
                />
                <Label
                  htmlFor="sameAsBilling"
                  className="text-xs font-normal cursor-pointer"
                >
                  Same as billing
                </Label>
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="shippingStreet">Street Address</Label>
                <Input
                  id="shippingStreet"
                  value={customerDetails.shippingAddress.street}
                  onChange={(e) => updateAddress('shippingAddress', 'street', e.target.value)}
                  placeholder="123 Main St"
                  disabled={sameAsBilling}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="shippingCity">City</Label>
                  <Input
                    id="shippingCity"
                    value={customerDetails.shippingAddress.city}
                    onChange={(e) => updateAddress('shippingAddress', 'city', e.target.value)}
                    placeholder="New York"
                    disabled={sameAsBilling}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shippingState">State</Label>
                  <Input
                    id="shippingState"
                    value={customerDetails.shippingAddress.state}
                    onChange={(e) => updateAddress('shippingAddress', 'state', e.target.value)}
                    placeholder="NY"
                    disabled={sameAsBilling}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="shippingZip">ZIP Code</Label>
                  <Input
                    id="shippingZip"
                    value={customerDetails.shippingAddress.zip}
                    onChange={(e) => updateAddress('shippingAddress', 'zip', e.target.value)}
                    placeholder="10001"
                    disabled={sameAsBilling}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shippingCountry">Country</Label>
                  <Input
                    id="shippingCountry"
                    value={customerDetails.shippingAddress.country}
                    onChange={(e) => updateAddress('shippingAddress', 'country', e.target.value)}
                    placeholder="USA"
                    disabled={sameAsBilling}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
