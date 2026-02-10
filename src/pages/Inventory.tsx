import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package } from '@phosphor-icons/react'

export function Inventory() {
  return (
    <MainLayout currentModule="inventory">
      <div className="container mx-auto">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Package size={32} weight="duotone" className="text-green-500" />
              <span>Inventory Module</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">
              Coming Soon...
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
