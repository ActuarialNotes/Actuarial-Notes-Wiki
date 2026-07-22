import { useAuth } from '@/hooks/useAuth'
import { useEmailPrefs } from '@/hooks/useEmailPrefs'
import { formatHourLabel, detectTimezone } from '@/lib/dailyEmail'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const HOURS = Array.from({ length: 24 }, (_, h) => h)

/**
 * Settings card for the daily study-plan email: an opt-in toggle plus a local
 * send-time picker, persisted to user_email_prefs (hooks/useEmailPrefs.ts).
 * The email itself is assembled and sent server-side by the daily-plan-email
 * edge function from the cached study plan — see docs/daily-plan-email.md.
 */
export function EmailSettingsCard() {
  const { user } = useAuth()
  const { prefs, loading, saving, error, save } = useEmailPrefs()

  if (!user) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily plan email</CardTitle>
        <CardDescription>
          A short morning email with the concepts your study plan has scheduled for the day,
          sent to <span className="font-medium text-foreground">{user.email}</span>.
          Days with nothing scheduled are skipped.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="daily-plan-email-toggle" className="cursor-pointer">
                Send me my study plan every morning
              </Label>
              <button
                id="daily-plan-email-toggle"
                type="button"
                role="switch"
                aria-checked={prefs.dailyPlanEmail}
                disabled={saving}
                onClick={() => void save({ dailyPlanEmail: !prefs.dailyPlanEmail })}
                className={cn(
                  'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors',
                  prefs.dailyPlanEmail ? 'bg-primary' : 'bg-muted-foreground/30',
                  saving && 'opacity-60',
                )}
              >
                <span
                  className={cn(
                    'inline-block h-5 w-5 transform rounded-full bg-background shadow transition-transform',
                    prefs.dailyPlanEmail ? 'translate-x-[22px]' : 'translate-x-0.5',
                  )}
                />
              </button>
            </div>

            {prefs.dailyPlanEmail && (
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="daily-plan-email-hour">Send at</Label>
                <select
                  id="daily-plan-email-hour"
                  value={prefs.sendHourLocal}
                  disabled={saving}
                  onChange={e => void save({ sendHourLocal: Number(e.target.value) })}
                  className="h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {HOURS.map(h => (
                    <option key={h} value={h}>{formatHourLabel(h)}</option>
                  ))}
                </select>
              </div>
            )}

            {prefs.dailyPlanEmail && (
              <p className="text-xs text-muted-foreground">
                Times are in your current timezone ({detectTimezone()}). Changing this setting
                from another device updates the timezone to match it.
              </p>
            )}

            {error && <p className="text-xs text-destructive">{error}</p>}
          </>
        )}
      </CardContent>
    </Card>
  )
}
