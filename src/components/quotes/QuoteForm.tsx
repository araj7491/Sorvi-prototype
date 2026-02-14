import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { QuoteFormHeader } from './QuoteFormHeader'
import { QuoteFormCustomer } from './QuoteFormCustomer'
import { QuoteFormLineItems } from './QuoteFormLineItems'
import { QuoteFormSummary } from './QuoteFormSummary'
import type { QuoteLineItem, QuoteCustomer, Address } from '@/types'

interface QuoteFormState {
  quoteNumber: string
  date: string
  creationDate: string
  validUntil: string
  customer: string
  salesPerson: string
  status: 'pending'
  customerDetails: QuoteCustomer
  lineItems: QuoteLineItem[]
}

// Generate auto quote number
const generateQuoteNumber = () => `Q-${Date.now()}`

// Default empty address
const emptyAddress: Address = {
  street: '',
  city: '',
  state: '',
  zip: '',
  country: '',
}

// Default empty line item
const createEmptyLineItem = (): QuoteLineItem => ({
  id: `item-${Date.now()}-${Math.random()}`,
  description: '',
  partNumber: '',
  manufacturer: '',
  condition: 'new',
  leadTime: '1-2 weeks',
  quantity: 1,
  rate: 0,
  vatPercent: 20,
  amount: 0,
})

export function QuoteForm() {
  const navigate = useNavigate()
  const today = new Date().toISOString().split('T')[0]
  const validDate = new Date()
  validDate.setDate(validDate.getDate() + 30)
  const validUntilDefault = validDate.toISOString().split('T')[0]

  const [formData, setFormData] = useState<QuoteFormState>({
    quoteNumber: generateQuoteNumber(),
    date: today,
    creationDate: today,
    validUntil: validUntilDefault,
    customer: '',
    salesPerson: '',
    status: 'pending',
    customerDetails: {
      name: '',
      email: '',
      phone: '',
      billingAddress: { ...emptyAddress },
      shippingAddress: { ...emptyAddress },
    },
    lineItems: [createEmptyLineItem()],
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Update top-level field
  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  // Update nested customer detail field
  const updateCustomerDetail = (field: keyof QuoteCustomer, value: any) => {
    setFormData((prev) => ({
      ...prev,
      customerDetails: {
        ...prev.customerDetails,
        [field]: value,
      },
    }))
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  // Update customer address field
  const updateAddress = (
    type: 'billingAddress' | 'shippingAddress',
    field: keyof Address,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      customerDetails: {
        ...prev.customerDetails,
        [type]: {
          ...prev.customerDetails[type],
          [field]: value,
        },
      },
    }))
  }

  // Update line item
  const updateLineItem = (index: number, field: keyof QuoteLineItem, value: any) => {
    setFormData((prev) => {
      const newLineItems = [...prev.lineItems]
      const updatedItem = { ...newLineItems[index], [field]: value }

      // Auto-calculate amount when quantity or rate changes
      if (field === 'quantity' || field === 'rate') {
        updatedItem.amount = updatedItem.quantity * updatedItem.rate
      }

      newLineItems[index] = updatedItem
      return { ...prev, lineItems: newLineItems }
    })
  }

  // Add new line item
  const addLineItem = () => {
    setFormData((prev) => ({
      ...prev,
      lineItems: [...prev.lineItems, createEmptyLineItem()],
    }))
  }

  // Delete line item
  const deleteLineItem = (index: number) => {
    setFormData((prev) => {
      // Keep at least one line item
      if (prev.lineItems.length === 1) return prev
      const newLineItems = prev.lineItems.filter((_, i) => i !== index)
      return { ...prev, lineItems: newLineItems }
    })
  }

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Required fields
    if (!formData.date) newErrors.date = 'Date is required'
    if (!formData.customer) newErrors.customer = 'Customer is required'
    if (!formData.customerDetails.email) newErrors.email = 'Email is required'

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.customerDetails.email && !emailRegex.test(formData.customerDetails.email)) {
      newErrors.email = 'Invalid email format'
    }

    // Line items validation
    if (formData.lineItems.length === 0) {
      newErrors.lineItems = 'At least one line item is required'
    } else {
      formData.lineItems.forEach((item, i) => {
        if (!item.description) newErrors[`item${i}_desc`] = 'Required'
        if (item.quantity <= 0) newErrors[`item${i}_qty`] = 'Must be > 0'
        if (item.rate <= 0) newErrors[`item${i}_rate`] = 'Must be > 0'
      })
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (isDraft: boolean) => {
    if (!validateForm()) {
      return
    }

    // In a real app, this would call an API
    console.log('Submitting quote:', { ...formData, isDraft })

    // Navigate back to quotes page
    navigate('/finance/quotes')
  }

  const handleCancel = () => {
    navigate('/finance/quotes')
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Quote Information */}
      <QuoteFormHeader
        formData={formData}
        updateField={updateField}
        errors={errors}
      />

      {/* Customer Details */}
      <QuoteFormCustomer
        customerDetails={formData.customerDetails}
        updateCustomerDetail={updateCustomerDetail}
        updateAddress={updateAddress}
        errors={errors}
      />

      {/* Line Items */}
      <QuoteFormLineItems
        lineItems={formData.lineItems}
        updateLineItem={updateLineItem}
        addLineItem={addLineItem}
        deleteLineItem={deleteLineItem}
        errors={errors}
      />

      {/* Summary */}
      <QuoteFormSummary lineItems={formData.lineItems} />

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border/50 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-end gap-3">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={() => handleSubmit(true)}>
            Save Draft
          </Button>
          <Button onClick={() => handleSubmit(false)}>
            Create Quote
          </Button>
        </div>
      </div>
    </div>
  )
}
