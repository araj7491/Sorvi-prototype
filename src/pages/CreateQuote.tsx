import { MainLayout } from '@/components/layout/MainLayout'
import { QuoteForm } from '@/components/quotes/QuoteForm'
import { financeTabs } from '@/data/mockFinanceData'

export function CreateQuote() {
  return (
    <MainLayout
      currentModule="finance"
      showContentHeader={true}
      contentHeaderTabs={financeTabs}
    >
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Create New Quote</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Finance &gt; Quotes &gt; Create
          </p>
        </div>

        {/* Form */}
        <QuoteForm />
      </div>
    </MainLayout>
  )
}
