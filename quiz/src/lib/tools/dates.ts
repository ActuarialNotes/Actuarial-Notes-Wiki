/**
 * Dates as the ratemaking tools read them: '2017-01-01', '01/01/2017', or the
 * texts' own '01/01/17'. Time is measured the way Werner & Modlin measure it,
 * in months — a policy written April 1 has three-quarters of the calendar year
 * left, not 275/365 of it — so a date becomes a decimal year by its month and
 * its day's share of that month.
 */

export interface DateParts {
  y: number
  m: number
  d: number
}

const daysIn = (y: number, m: number) => new Date(Date.UTC(y, m, 0)).getUTCDate()

/** A date's parts, or null if the text isn't a real date. */
export function parseDate(text: unknown): DateParts | null {
  const t = String(text ?? '').trim()
  let y: number, m: number, d: number
  const iso = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(t)
  const us = /^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})$/.exec(t)
  if (iso) {
    ;[y, m, d] = [Number(iso[1]), Number(iso[2]), Number(iso[3])]
  } else if (us) {
    ;[m, d, y] = [Number(us[1]), Number(us[2]), Number(us[3])]
    // A two-digit year: 00–69 are this century, as the texts' 10/01/10 is 2010.
    if (us[3].length === 2) y += y < 70 ? 2000 : 1900
  } else {
    return null
  }
  if (m < 1 || m > 12 || d < 1 || d > daysIn(y, m)) return null
  return { y, m, d }
}

/** The date as a year and its fraction, month by month: 1 April 2011 is 2011.25. */
export function decimalYear({ y, m, d }: DateParts): number {
  return y + (m - 1) / 12 + (d - 1) / (daysIn(y, m) * 12)
}

/** The ISO form, for an input that must round-trip. */
export function isoDate({ y, m, d }: DateParts): string {
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

/** A decimal year as a date to the day, for the working ('2017.75' reads as 2017-10-01). */
export function dateOfYear(t: number): string {
  const y = Math.floor(t + 1e-9)
  const months = (t - y) * 12
  const m = Math.min(12, Math.floor(months + 1e-9) + 1)
  const d = Math.min(daysIn(y, m), Math.round((months - (m - 1)) * daysIn(y, m)) + 1)
  return isoDate({ y, m, d })
}
