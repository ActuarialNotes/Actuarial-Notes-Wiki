// Canonical catalog of the benchmark metrics surfaced across the Research tab
// (Benchmarks comparison table + trend chart, Monitor document chips). This is
// the single source of truth for a metric's display label, unit, value
// formatting, and whether a higher or lower value is "better" (used to colour
// deltas green/red regardless of sign).
//
// NOTE: the ingestion side keeps a parallel list of canonical metric_name slugs
// in `supabase/functions/_shared/research-adapters/extract.ts`
// (`CANONICAL_METRIC_NAMES`). That file is a Deno edge function and can't import
// this Vite module, so the two must be kept in sync by hand — if you add a
// metric here, add its slug there too.

export type BetterDirection = 'lower' | 'higher' | 'neutral'

export interface MetricDef {
  /** Canonical metric_name as stored in research_metrics.metric_name. */
  name: string
  /** Full label, e.g. "Combined ratio". */
  label: string
  /** Compact label for chips/columns, e.g. "Combined". */
  shortLabel: string
  /** Display unit, e.g. "%" or "CAD M". */
  unit: string
  /** One-line explanation, shown in the empty-state catalog preview. */
  description: string
  /** Renders a raw numeric value into its display string. */
  format: (value: number) => string
  /** Whether a higher or lower value is the favourable direction. */
  betterDirection: BetterDirection
}

function pct(value: number): string {
  return `${value.toFixed(1)}%`
}

function cadMillions(value: number): string {
  return `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}M`
}

export const RESEARCH_METRICS: readonly MetricDef[] = [
  {
    name: 'combined_ratio',
    label: 'Combined ratio',
    shortLabel: 'Combined',
    unit: '%',
    description: 'Loss ratio plus expense ratio. Below 100% means underwriting profit.',
    format: pct,
    betterDirection: 'lower',
  },
  {
    name: 'loss_ratio',
    label: 'Loss ratio',
    shortLabel: 'Loss',
    unit: '%',
    description: 'Claims and adjustment expenses as a share of earned premium.',
    format: pct,
    betterDirection: 'lower',
  },
  {
    name: 'expense_ratio',
    label: 'Expense ratio',
    shortLabel: 'Expense',
    unit: '%',
    description: 'Underwriting and acquisition expenses as a share of premium.',
    format: pct,
    betterDirection: 'lower',
  },
  {
    name: 'mct_ratio',
    label: 'MCT ratio',
    shortLabel: 'MCT',
    unit: '%',
    // MCT (Minimum Capital Test) is the OSFI/Canadian P&C solvency measure — distinct
    // from EU Solvency II's MCR/SCR and US Risk-Based Capital (RBC). Do not map
    // EU-context MCR values here; they measure different regulatory regimes.
    description: 'Minimum Capital Test ratio — OSFI Canadian P&C solvency capital coverage (≥150% supervisory target).',
    format: pct,
    betterDirection: 'higher',
  },
  {
    name: 'roe',
    label: 'Return on equity',
    shortLabel: 'ROE',
    unit: '%',
    description: 'Net income as a share of shareholders’ equity.',
    format: pct,
    betterDirection: 'higher',
  },
  {
    name: 'premium_growth',
    label: 'Premium growth',
    shortLabel: 'Prem growth',
    unit: '%',
    description: 'Year-over-year change in written premium.',
    format: pct,
    betterDirection: 'higher',
  },
  {
    name: 'net_written_premium',
    label: 'Net written premium',
    shortLabel: 'NWP',
    unit: 'CAD M',
    description: 'Net premium written over the period, in millions of CAD.',
    format: cadMillions,
    betterDirection: 'higher',
  },
  {
    name: 'direct_written_premium',
    label: 'Direct written premium',
    shortLabel: 'DWP',
    unit: 'CAD M',
    // Segmented (line × province) premium volume is the basis for market-share
    // analysis — distinct from net_written_premium, which is the company-wide
    // figure net of reinsurance reported in investor disclosures.
    description: 'Direct premium written for the line/province over the period, in millions of CAD.',
    format: cadMillions,
    betterDirection: 'higher',
  },
  {
    name: 'earned_premium',
    label: 'Earned premium',
    shortLabel: 'EP',
    unit: 'CAD M',
    description: 'Premium earned over the period (the denominator of the loss ratio), in millions of CAD.',
    format: cadMillions,
    betterDirection: 'higher',
  },
] as const

const METRICS_BY_NAME = new Map(RESEARCH_METRICS.map(m => [m.name, m]))

export function metricDef(name: string): MetricDef | undefined {
  return METRICS_BY_NAME.get(name)
}

export function isKnownMetric(name: string): boolean {
  return METRICS_BY_NAME.has(name)
}

/** Order index of a metric in the canonical catalog (for stable chip ordering). */
export function metricOrder(name: string): number {
  const i = RESEARCH_METRICS.findIndex(m => m.name === name)
  return i === -1 ? Number.MAX_SAFE_INTEGER : i
}
