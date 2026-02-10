import { MainLayout } from '@/components/layout/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users } from '@phosphor-icons/react'

export function CRM() {
  return (
    <MainLayout currentModule="crm">
      <div className="container mx-auto">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Users size={32} weight="duotone" className="text-purple-500" />
              <span>CRM Module</span>
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
