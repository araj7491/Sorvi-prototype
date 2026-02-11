import { LayoutGrid, PanelLeft } from 'lucide-react'
import { useLayout } from '@/providers/LayoutProvider'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export function LayoutSelector() {
  const { layout, setLayout } = useLayout()

  return (
    <div className="space-y-3">
      <RadioGroup value={layout} onValueChange={(value) => setLayout(value as 'modern' | 'classic')}>
        <div className="flex items-center space-x-3 rounded-md border p-4 hover:bg-accent/50 transition-colors">
          <RadioGroupItem value="modern" id="modern" />
          <Label
            htmlFor="modern"
            className="flex items-center gap-3 cursor-pointer flex-1"
          >
            <LayoutGrid className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium">Modern</div>
              <div className="text-sm text-muted-foreground">Top navigation with header bar</div>
            </div>
          </Label>
        </div>

        <div className="flex items-center space-x-3 rounded-md border p-4 hover:bg-accent/50 transition-colors">
          <RadioGroupItem value="classic" id="classic" />
          <Label
            htmlFor="classic"
            className="flex items-center gap-3 cursor-pointer flex-1"
          >
            <PanelLeft className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium">Classic</div>
              <div className="text-sm text-muted-foreground">Left sidebar navigation</div>
            </div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  )
}
