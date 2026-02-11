import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/providers/ThemeProvider'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()

  // For the settings UI, we only show Light and Dark options (not system)
  const actualTheme = theme === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme

  return (
    <div className="space-y-3">
      <RadioGroup value={actualTheme} onValueChange={(value) => setTheme(value as 'light' | 'dark')}>
        <div className="flex items-center space-x-3 rounded-md border p-4 hover:bg-accent/50 transition-colors">
          <RadioGroupItem value="light" id="light" />
          <Label
            htmlFor="light"
            className="flex items-center gap-3 cursor-pointer flex-1"
          >
            <Sun className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium">Light</div>
              <div className="text-sm text-muted-foreground">Clean and bright interface</div>
            </div>
          </Label>
        </div>

        <div className="flex items-center space-x-3 rounded-md border p-4 hover:bg-accent/50 transition-colors">
          <RadioGroupItem value="dark" id="dark" />
          <Label
            htmlFor="dark"
            className="flex items-center gap-3 cursor-pointer flex-1"
          >
            <Moon className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium">Dark</div>
              <div className="text-sm text-muted-foreground">Easy on the eyes in low light</div>
            </div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  )
}
