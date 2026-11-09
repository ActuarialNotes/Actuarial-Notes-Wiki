// Parts of the Ledger template (docs/tool-template-v3.md) that only some tools
// draw: the **chain strip** over a tool in a chain, the **source line** over a
// Data Source, and the **capital card** under Insurer Return's answer, which
// sets the capital an insurer filed against the minimum it must hold.

import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Database } from 'lucide-react'
import { datasetsFor, formatValue, toolById, toolSlug, type ToolResult } from '@/lib/tools'
import { chainPlace } from '@/lib/toolChains'

/** Where the tool sits in its chain: the steps before it, then it, then its alternatives. */
export function ChainStrip({ toolId }: { toolId: string }) {
  const place = chainPlace(toolId)
  if (!place) return null
  const name = (id: string) => toolById(id)?.name ?? id
  const link = (id: string) => {
    const spec = toolById(id)
    return spec ? (
      <Link to={`/tools/${toolSlug(spec)}`} className="underline-offset-2 hover:text-foreground hover:underline">{spec.name}</Link>
    ) : id
  }
  // Two steps back is enough to say where the tool is; earlier ones fold into "…".
  const shown = place.before.slice(-2)
  return (
    <nav aria-label={place.chain.label} className="rounded-xl bg-card px-3.5 py-2.5 text-xs" data-testid="tool-chain">
      <p className="mb-1 text-muted-foreground">{place.chain.label}</p>
      <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-muted-foreground">
        {place.before.length > shown.length && <><span aria-hidden>…</span><span aria-hidden>›</span></>}
        {shown.map((step, k) => (
          <Fragment key={k}>
            {step.length === 1 ? link(step[0]) : <span>{step.map(name).join(' or ')}</span>}
            <span aria-hidden>›</span>
          </Fragment>
        ))}
        <span className="rounded-full bg-pick px-2 py-0.5 font-semibold text-pick-foreground" aria-current="page">{name(place.here)}</span>
        {place.alternatives.length > 0 && (
          <span>
            · or{' '}
            {place.alternatives.map((id, k) => (
              <Fragment key={id}>{k > 0 && ', '}{link(id)}</Fragment>
            ))}
          </span>
        )}
      </p>
    </nav>
  )
}

/** What a Data Source reads, from whom and under which licence: above its question, not in a menu. */
export function DataSourceLine({ toolId }: { toolId: string }) {
  const datasets = datasetsFor(toolId)
  if (!datasets.length) return null
  // One line per publisher, its licence beside it; Life Table reads two.
  const byPublisher = [...new Map(datasets.map(d => [d.publisher, d])).values()]
  return (
    <div className="flex items-start gap-2 px-1 text-xs text-muted-foreground" data-testid="tool-data-source">
      <Database className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
      <p className="min-w-0 leading-snug">
        {byPublisher.map((d, k) => (
          <Fragment key={d.id}>
            {k > 0 && ' · '}
            {d.publisher}, <a href={d.licence.url} target="_blank" rel="noreferrer" className="underline-offset-2 hover:text-foreground hover:underline">{d.licence.name}</a>
          </Fragment>
        ))}
      </p>
    </div>
  )
}

/**
 * The capital an insurer filed against the minimum it must hold, two bars on
 * one scale: what the ratio on line 140 is made of, whichever line is asked.
 */
export function CapitalCard({ result }: { result: ToolResult }) {
  if (result.tool !== 'data.insurer_return') return null
  const capital = result.values.capital_available as number | undefined
  const minimum = result.values.minimum_required as number | undefined
  const capitalLine = result.values.capital_line as string | undefined
  if (capital == null || minimum == null || !(minimum > 0) || !(capital >= 0)) return null
  const top = Math.max(capital, minimum)
  const share = minimum / Math.max(capital, 1e-12)
  const money = (v: number) => formatValue(v, 'money')
  const word = result.values.test === 'BAAT' ? 'net assets available' : 'capital available'
  return (
    <section className="space-y-2.5 rounded-2xl bg-card px-3.5 py-3" data-testid="tool-capital">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Capital against the minimum</h3>
      <p className="text-sm leading-snug">
        <b className="tabular-nums">{money(capital)}</b> <span className="text-muted-foreground">{word} (line {capitalLine}) over</span>{' '}
        <b className="tabular-nums">{money(minimum)}</b> <span className="text-muted-foreground">minimum required (line 130), $000.</span>
      </p>
      <div className="space-y-1" aria-hidden>
        <div className="h-3.5 rounded bg-[var(--exam-accent-vivid,hsl(var(--foreground)/0.7))]" style={{ width: `${(capital / top) * 100}%` }} />
        <div className="h-3.5 rounded bg-[color-mix(in_srgb,var(--exam-accent-vivid,hsl(var(--foreground)))_45%,hsl(var(--card)))]" style={{ width: `${(minimum / top) * 100}%` }} />
      </div>
      <p className="flex justify-between gap-3 text-xs text-muted-foreground">
        <span>{word.charAt(0).toUpperCase() + word.slice(1)}</span>
        <span>{capital >= minimum ? `The minimum is ${Math.round(share * 100)}% of it` : 'Below the minimum'}</span>
      </p>
    </section>
  )
}
