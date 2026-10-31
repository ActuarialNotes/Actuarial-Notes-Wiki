// The **registration deadline nudge**: a line on the quiz builder and the
// Dashboard when the exam a reader is studying for stops taking registrations
// soon. A reader told us they were deciding between December and February with
// four days left to register — the deadline was in the app (the Store, the
// study guide's info button) but nowhere they were looking.
//
// The deadline itself is `registrationStatus` (`lib/store.ts`), read from the
// sittings tables: transcribed from the examining body, never estimated. This
// module only decides whether it is close enough to mention and how to say
// when, and keeps the key a dismissal is stored under.

import type { RegistrationStatus } from './store'

/** How many days out the nudge starts showing. */
export const NUDGE_WINDOW_DAYS = 14

export interface RegistrationNudge {
  examKey: string
  daysLeft: number
  deadline: string
  /** The time on the deadline as the body prints it, when it does. */
  deadlineNote?: string
  /** The sitting being registered for: its first day. */
  sittingStart: string
  /** Stored when dismissed, so the next sitting's deadline can still show. */
  dismissKey: string
}

export function registrationNudge(examKey: string, status: RegistrationStatus, windowDays = NUDGE_WINDOW_DAYS): RegistrationNudge | null {
  if (status.state !== 'open' || status.daysLeft === undefined || !status.deadline || !status.sitting) return null
  if (status.daysLeft < 0 || status.daysLeft > windowDays) return null
  return {
    examKey,
    daysLeft: status.daysLeft,
    deadline: status.deadline,
    ...(status.deadlineNote ? { deadlineNote: status.deadlineNote } : {}),
    sittingStart: status.sitting.startDate,
    dismissKey: `${examKey}:${status.deadline}`,
  }
}

/** "today", "tomorrow", "in 4 days". */
export function closesIn(daysLeft: number): string {
  if (daysLeft <= 0) return 'today'
  if (daysLeft === 1) return 'tomorrow'
  return `in ${daysLeft} days`
}

/** "December 3" — a date with no year, read as a calendar day. */
export function monthDay(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
}
