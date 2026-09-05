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
