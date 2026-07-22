import { X, Bell, Loader2 } from 'lucide-react'
import { useEmailPrefs } from '@/hooks/useEmailPrefs'
import { formatHourLabel, detectTimezone } from '@/lib/dailyEmail'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const HOURS = Array.from({ length: 24 }, (_, h) => h)

// Daily reminder email settings, surfaced from the Dashboard header via the
// notification icon. Mirrors EmailSettingsCard (Settings) — the opt-in toggle
// plus a local send-time picker persisted to user_email_prefs — so both entry
// points drive the same preference. The email itself is sent server-side by the
// daily-plan-email edge function (see docs/daily-plan-email.md).

interface Props {
  open: boolean
  onClose: () => void
  email: string
}

export function DashboardRemindersModal({ open, onClose, email }: Props) {
  const { prefs, loading, saving, error, save } = useEmailPrefs()

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-background/80 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Daily reminder email settings"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-lg bg-card rounded-xl shadow-2xl flex flex-col my-12">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 h-12 shrink-0">
          <Bell className="h-4 w-4 text-primary shrink-0" />
          <span className="flex-1 font-semibold text-sm">Daily reminder email</span>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-2 transition-colors rounded-md hover:bg-muted/50"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-sm text-muted-foreground">
            A short morning email with the concepts your study plan has scheduled for the day,
            sent to <span className="font-medium text-foreground">{email}</span>.
            Days with nothing scheduled are skipped.
          </p>

          {loading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="dashboard-reminder-toggle" className="cursor-pointer">
                  Send me my study plan every morning
                </Label>
                <button
                  id="dashboard-reminder-toggle"
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
                  <Label htmlFor="dashboard-reminder-hour">Send at</Label>
                  <select
                    id="dashboard-reminder-hour"
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
        </div>

        <div className="px-5 pb-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-3 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
