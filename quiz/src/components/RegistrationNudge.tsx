import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarClock, ExternalLink, X } from 'lucide-react'
import { REGISTRATION_PAGES, registrationStatus } from '@/lib/store'
import { STORE_EXAMS } from '@/lib/storeExams'
import { closesIn, monthDay, registrationNudge } from '@/lib/registrationNudge'
import { todayISO } from '@/lib/studyPlan'

const DISMISSED_KEY = 'actuarial_registration_nudge_dismissed'

function readDismissed(): string[] {
  try {
    const raw = localStorage.getItem(DISMISSED_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((k): k is string => typeof k === 'string') : []
  } catch {
    return []
  }
}

function writeDismissed(keys: string[]) {
  try { localStorage.setItem(DISMISSED_KEY, JSON.stringify(keys.slice(-50))) } catch { /* private window */ }
}

/**
 * A line saying the exam's registration closes soon (`lib/registrationNudge.ts`),
 * on the quiz builder and the Dashboard. Lazy-loaded by its hosts: it reads the
 * Store's registration tables, which have no business in the first paint.
 * Dismissed per sitting, so the next deadline still shows.
 */
export default function RegistrationNudge({ examKey }: { examKey: string }) {
  const [dismissed, setDismissed] = useState(readDismissed)
  const nudge = registrationNudge(examKey, registrationStatus(examKey, todayISO()))
  if (!nudge || dismissed.includes(nudge.dismissKey)) return null

  const exam = STORE_EXAMS.find(e => e.key === examKey)
  const register = exam?.body ? REGISTRATION_PAGES[exam.body] : null
  const examName = exam?.name ?? examKey

  function dismiss() {
    const next = [...dismissed, nudge!.dismissKey]
    setDismissed(next)
    writeDismissed(next)
  }

  return (
    <div role="status" className="relative flex gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 pr-10 text-sm">
      <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
      <div className="min-w-0 space-y-1">
        <p className="font-semibold text-foreground">
          Registration for the {monthDay(nudge.sittingStart)} {examName} sitting closes {closesIn(nudge.daysLeft)}
        </p>
        <p className="text-muted-foreground">
          The deadline is {monthDay(nudge.deadline)}{nudge.deadlineNote ? `, ${nudge.deadlineNote}` : ''}.
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
          {register && (
            <a
              href={register.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-foreground underline underline-offset-2 hover:no-underline"
            >
              Register with the {exam!.body} <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          )}
          <Link
            to={`/store?exam=${encodeURIComponent(examKey)}&aisle=registration`}
            className="font-medium text-muted-foreground underline underline-offset-2 hover:text-foreground"
          >
            Fee and dates
          </Link>
        </div>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute right-2 top-2 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
