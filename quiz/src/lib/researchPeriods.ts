// Period strings in research_metrics mix quarterly and annual fiscal labels:
//   'Q3_2024'  -> third quarter of 2024
//   'FY2023'   -> full fiscal year 2023
// A plain String.sort() mis-orders these (e.g. 'FY2023' sorts before 'Q1_2024'
// lexically, which happens to be right, but 'Q4_2023' vs 'FY2023' is wrong).
// These helpers parse a period into a sortable numeric key and a human label.

const QUARTER_RE = /^Q([1-4])_(\d{4})$/
const FY_RE = /^FY(\d{4})$/

/**
 * Numeric sort key for a period. Quarter n of year Y -> Y + n/10; a full year
 * sorts just after that year's Q4 (Y + 0.5) so annual figures fall between
 * Q4 of the year and Q1 of the next. Unparseable periods sort last.
 */
export function periodSortKey(period: string): number {
  const q = QUARTER_RE.exec(period)
  if (q) {
    const quarter = Number(q[1])
    const year = Number(q[2])
    return year + quarter / 10
  }
  const fy = FY_RE.exec(period)
  if (fy) {
    return Number(fy[1]) + 0.5
  }
  return Number.MAX_SAFE_INTEGER
}

/** Comparator for Array.prototype.sort over period strings (ascending). */
export function comparePeriods(a: string, b: string): number {
  return periodSortKey(a) - periodSortKey(b)
}

/** Human-readable period label: 'Q3_2024' -> 'Q3 2024', 'FY2023' -> 'FY 2023'. */
export function formatPeriod(period: string): string {
  const q = QUARTER_RE.exec(period)
  if (q) return `Q${q[1]} ${q[2]}`
  const fy = FY_RE.exec(period)
  if (fy) return `FY ${fy[1]}`
  return period
}
