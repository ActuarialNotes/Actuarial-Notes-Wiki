import { useState } from 'react'
import { BarChart3, EyeOff } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { isAnalyticsOptedOut, setAnalyticsOptOut } from '@/lib/analytics'
import { cn } from '@/lib/utils'

/**
 * Settings → Privacy. The usage-analytics switch: Off stops Google Analytics on
 * this device at once, withdraws its storage and deletes its cookies; On starts
 * it again. Per device, like the theme — the choice is the browser's, signed in
 * or not. See lib/analytics.ts.
 */
export function PrivacySettingsCard() {
  const [optedOut, setOptedOut] = useState(isAnalyticsOptedOut)

  function choose(optOut: boolean) {
    if (optOut === optedOut) return
    setAnalyticsOptOut(optOut)
    setOptedOut(optOut)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-medium">Usage analytics</p>
        <p className="mb-2 text-xs text-muted-foreground">
          Which pages and features get used, so we know what to improve. No ads, nothing sold.
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => choose(false)}
            aria-pressed={!optedOut}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors',
              !optedOut
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
          >
            <BarChart3 className="h-4 w-4" />
            On
          </button>
          <button
            type="button"
            onClick={() => choose(true)}
            aria-pressed={optedOut}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors',
              optedOut
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
          >
            <EyeOff className="h-4 w-4" />
            Off
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
