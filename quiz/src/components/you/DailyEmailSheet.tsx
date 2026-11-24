// The daily email's settings (docs/daily-plan-email.md): on or off, and the
// hour it is sent, kept in user_email_prefs. Opened from Settings' Daily email
// row and from the email's own footer link (/dashboard?reminders=1).
//
// The email is Today's Study Plan, and the plan paced to the exam date is
// Pro's, so the email is too: a free account is told so and shown the way to
// Upgrade, and the sender skips any account that isn't Pro (a choice kept
// from a lapsed subscription stays stored).

import { useId } from 'react'
import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useEmailPrefs } from '@/hooks/useEmailPrefs'
import { detectTimezone } from '@/lib/dailyEmail'
import { hourValue } from '@/lib/you'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/buttonVariants'
import { Popup, PopupTitle } from '@/components/ui/Popup'
import { SwitchRow } from '@/components/you/rows'
import { cn } from '@/lib/utils'

const HOURS = Array.from({ length: 24 }, (_, h) => h)

export function DailyEmailSheet({
  email, isPro, subscriptionLoading, onClose,
}: {
  email: string
  isPro: boolean
  /** The subscription is still resolving: don't tell a Pro reader the email is Pro's. */
  subscriptionLoading: boolean
  onClose: () => void
}) {
  const titleId = useId()
  const hourId = useId()
  const { prefs, loading, saving, error, save } = useEmailPrefs()

  return (
    <Popup onClose={onClose} labelledBy={titleId}>
      <PopupTitle id={titleId}>Daily email</PopupTitle>
      <p className="text-[17px] leading-normal">
        The concepts in Today’s Study Plan, sent to <strong className="break-all">{email}</strong>. A day with
        nothing planned sends nothing.
      </p>

      {loading || subscriptionLoading ? (
        <div className="flex justify-center py-4" aria-busy="true">
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
        </div>
      ) : !isPro ? (
        <>
          <p className="text-[17px] leading-normal">The study plan comes with Pro, so the email does too.</p>
          <Link to="/upgrade" onClick={onClose} className={cn(buttonVariants({ size: 'main' }), 'w-full')}>See Pro</Link>
        </>
      ) : (
        <>
          <div className="flex flex-col divide-y divide-border">
            <SwitchRow
              label="Send it every day"
              on={prefs.dailyPlanEmail}
              onChange={next => { if (!saving) void save({ dailyPlanEmail: next }) }}
              testId="daily-email-switch"
            />
            {prefs.dailyPlanEmail && (
              <div className="flex min-h-[56px] items-center gap-3.5">
                <label htmlFor={hourId} className="flex-1 text-[17px] font-medium">Send at</label>
                <select
                  id={hourId}
                  value={prefs.sendHourLocal}
                  disabled={saving}
                  onChange={e => void save({ sendHourLocal: Number(e.target.value) })}
                  className="h-11 rounded-[14px] border-[1.5px] border-foreground bg-ground px-3 text-base font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {HOURS.map(h => <option key={h} value={h}>{hourValue(h)}</option>)}
                </select>
              </div>
            )}
          </div>
          {prefs.dailyPlanEmail && (
            <p className="text-[15px] leading-normal">
              The hour is in this device’s time zone ({detectTimezone()}). Changing it on another device moves the
              email to that device’s zone.
            </p>
          )}
          {error && <p role="alert" className="text-[15px] font-semibold">The change wasn’t saved. Try again in a minute.</p>}
          <Button size="main" className="w-full" onClick={onClose}>Done</Button>
        </>
      )}
    </Popup>
  )
}
