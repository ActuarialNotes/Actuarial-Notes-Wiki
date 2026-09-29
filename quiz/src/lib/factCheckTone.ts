import { AlertTriangle, Check, CheckCheck, RefreshCw } from 'lucide-react'
import type { FactCheckTone, LogEntrySeverity } from '@/lib/verification'

/**
 * The one **Fact Check** palette.
 *
 * Four tones carry the whole feature — the badge in a title row, the pill in
 * the concept popup's action menu, the verdict tile at the top of the panel and
 * a finding's severity chip — so all of them read the same tinted surface. Same
 * reason `lib/masteryBadge.ts` exists: this table had two copies before the
 * panel needed a third, and a severity that is red in one place and amber in
 * another is worse than no colour at all.
 *
 * It lives in `lib/` rather than beside the badge so the panel can share it
 * without importing the component that renders it.
 */

/**
 * Tinted badge surface — background + text, light and dark. The standard
 * pairings from `docs/style-guide.md` §4.2.
 */
export const FACT_CHECK_TONE_CLASSES: Record<FactCheckTone, string> = {
  green: 'bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100',
  amber: 'bg-amber-50 text-amber-900 dark:bg-amber-950 dark:text-amber-100',
  red: 'bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100',
  grey: 'bg-muted text-muted-foreground',
}

/**
 * A check mark is the feature's mark, so every state that is *about* checking
 * wears one: the double check for a page checked against a source, the single
 * check for one nobody has got to yet. The two states that are not about
 * checking — a page that changed underneath its pass, and one with something
 * known wrong on it — say that instead.
 */
export const FACT_CHECK_TONE_ICONS: Record<FactCheckTone, typeof Check> = {
  green: CheckCheck,
  amber: RefreshCw,
  red: AlertTriangle,
  grey: Check,
}

/**
 * A finding's severity on the same four tones, so a `critical` chip is the same
 * red as the *Known issue* verdict it produces.
 */
export const SEVERITY_TONE: Record<LogEntrySeverity, FactCheckTone> = {
  critical: 'red',
  major: 'amber',
  minor: 'grey',
  nit: 'grey',
}

/**
 * The two sides of a finding, drawn as a diff: what the page said is the line
 * taken out, what the source says the line put in. Red and green because that
 * is what they mean everywhere else (`docs/style-guide.md` §4.1 — incorrect,
 * correct), but only as a wash under the text and a colour on the `−` / `+`
 * mark and its label: the words themselves stay in the foreground colour, since
 * a paragraph set in red-900 is a paragraph nobody reads to the end.
 */
export const FACT_CHECK_DIFF = {
  removed: {
    surface: 'bg-red-50 dark:bg-red-950/50',
    mark: 'text-red-600 dark:text-red-400',
  },
  added: {
    surface: 'bg-green-50 dark:bg-green-950/50',
    mark: 'text-green-600 dark:text-green-400',
  },
} as const
