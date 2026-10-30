// A month as a Monday-first grid of days, for the date picker an exam with no
// published sittings is given (StudyPlanConfigModal). Dates are ISO day keys,
// compared as strings, so no time zone ever enters the arithmetic.

export interface MonthKey {
  year: number
  /** 0-based, as Date's */
  month: number
}

export interface CalendarDay {
  /** ISO date, YYYY-MM-DD */
  key: string
  day: number
  /** Inside the month drawn (the days padding its first and last weeks are not) */
  inMonth: boolean
}

export const WEEKDAY_LABELS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function isoKey(year: number, month: number, day: number): string {
  // Date.UTC normalises an overflowing day or month (day 0, month 12) for us.
  const d = new Date(Date.UTC(year, month, day))
  return d.toISOString().slice(0, 10)
}

export function monthOf(iso: string): MonthKey {
  return { year: Number(iso.slice(0, 4)), month: Number(iso.slice(5, 7)) - 1 }
}

export function addMonths({ year, month }: MonthKey, n: number): MonthKey {
  const total = year * 12 + month + n
  return { year: Math.floor(total / 12), month: ((total % 12) + 12) % 12 }
}

export function compareMonths(a: MonthKey, b: MonthKey): number {
  return a.year * 12 + a.month - (b.year * 12 + b.month)
}

export function monthLabel({ year, month }: MonthKey): string {
  return `${MONTH_NAMES[month]} ${year}`
}

/** The month's days in whole Monday-to-Sunday weeks, padded with the neighbouring months' days. */
export function monthGrid({ year, month }: MonthKey): CalendarDay[][] {
  const first = new Date(Date.UTC(year, month, 1))
  const lead = (first.getUTCDay() + 6) % 7 // days before the 1st back to Monday
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
  const weeks = Math.ceil((lead + daysInMonth) / 7)
  return Array.from({ length: weeks }, (_, w) =>
    Array.from({ length: 7 }, (_, i) => {
      const offset = w * 7 + i - lead + 1
      const key = isoKey(year, month, offset)
      return { key, day: Number(key.slice(8, 10)), inMonth: offset >= 1 && offset <= daysInMonth }
    }),
  )
}

/** The ISO date n days after `iso`. */
export function addDaysISO(iso: string, n: number): string {
  const { year, month } = monthOf(iso)
  return isoKey(year, month, Number(iso.slice(8, 10)) + n)
}
