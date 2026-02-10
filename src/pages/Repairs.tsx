import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Wrench } from '@phosphor-icons/react'

export function Repairs() {
  return (
    <MainLayout currentModule="repairs">
      <div className="container mx-auto">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Wrench size={32} weight="duotone" className="text-orange-500" />
              <span>Repairs Module</span>
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
