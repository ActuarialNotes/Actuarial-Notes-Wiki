// The Assumptions Bank's shelf (`/tools/assumptions`, docs/assumptions-bank.md
// §4.5), in the tool template's shape (docs/actuarial-tools.md §19,
// docs/tool-template-v2.md §3.8): every document a banner — tinted in the exam
// whose syllabus lists it, neutral when none does, no logo — with its figures
// as rows under it, newest first. A kind filter shows only that kind's rows,
// the rest of the document folded into one line; a figure not yet entered is
// never first. Each figure names the tools that take it ("to Permissible Loss
// Ratio"), the mirror of a tool's "from" chip: one tool opens it with the
// figure already in, recorded as its source; several open "Use in…". The
// shelf is where a published number starts its way into a model.

import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import bank from 'virtual:assumption-bank'
import { ChevronDown, ChevronRight, ExternalLink } from 'lucide-react'
import { ASSUMPTION_KINDS, effectiveLabel, formatAssumptionValue, kindLabel, type AssumptionRow, type AssumptionSet } from '@/lib/assumptionBank'
import { figureUses, kindsIn, shelfRows, type FigureUse } from '@/lib/toolBank'
import { examForResource } from '@/lib/toolExam'
import { contextLine } from '@/lib/toolTemplate'
import { examAccentStyle } from '@/lib/examColors'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import { FactCheckBadge } from '@/components/FactCheckBadge'
import { EXAM_BANNER, NEUTRAL_BANNER } from '@/components/ui/InfoSheet'
import { BottomSheet } from '@/components/tools/ValueSheet'
import { UncheckedTag } from '@/components/tools/SourceTag'
import { inkChip } from '@/components/ui/ink'
import { cn } from '@/lib/utils'

export function AssumptionsShelf({ onReadSource }: { onReadSource: (resource: string) => void }) {
  const [params, setParams] = useSearchParams()
  const { syllabi } = useWikiSyllabus()
  // A fact never goes into a tool; the filter is for figures.
  const kinds = kindsIn(bank, Object.keys(ASSUMPTION_KINDS)).filter(k => k !== 'fact')
  const kind = kinds.includes(params.get('kind') ?? '') ? params.get('kind')! : null
  const choose = (k: string | null) => {
    const next = new URLSearchParams(params)
    if (k) next.set('kind', k)
    else next.delete('kind')
    setParams(next, { replace: true })
  }
  const sets = [...bank]
    .filter(s => !s.supersededBy && (!kind || s.rows.some(r => r.kind === kind)))
    .sort((a, b) => b.effective.localeCompare(a.effective) || a.title.localeCompare(b.title))
  const [using, setUsing] = useState<{ set: AssumptionSet; row: AssumptionRow; uses: FigureUse[] } | null>(null)

  return (
    <div className="space-y-5">
      <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1" role="group" aria-label="Kind">
        <button type="button" onClick={() => choose(null)} className={cn(inkChip(kind === null), 'shrink-0')} aria-pressed={kind === null}>All</button>
        {kinds.map(k => (
          <button key={k} type="button" onClick={() => choose(k)} className={cn(inkChip(kind === k), 'shrink-0')} aria-pressed={kind === k}>
            {kindLabel(k)}
          </button>
        ))}
      </div>
      {sets.map(set => (
        <SetSection
          key={set.id}
          set={set}
          kind={kind}
          syllabi={syllabi}
          onReadSource={() => onReadSource(set.source)}
          onUse={(row, uses) => setUsing({ set, row, uses })}
        />
      ))}
      {using && (
        <UseSheet
          {...using}
          onReadSource={() => { setUsing(null); onReadSource(using.set.source) }}
          onClose={() => setUsing(null)}
        />
      )}
    </div>
  )
}

function SetSection({ set, kind, syllabi, onReadSource, onUse }: {
  set: AssumptionSet
  kind: string | null
  syllabi: readonly WikiExamSyllabus[]
  onReadSource: () => void
  onUse: (row: AssumptionRow, uses: FigureUse[]) => void
}) {
  const examKey = useMemo(() => examForResource(set.source, syllabi), [set.source, syllabi])
  const toEnter = set.rows.filter(r => r.kind !== 'fact' && r.decimal == null).length
  const { shown, folded } = shelfRows(set.rows, kind)
  const [unfolded, setUnfolded] = useState(false)
  const place = contextLine({ jurisdiction: set.jurisdiction, line: set.line })
  return (
    <section
      aria-label={set.title}
      id={`set-${set.id.replace(/[^A-Za-z0-9]+/g, '-')}`}
      className="space-y-2"
      style={examKey ? examAccentStyle(examKey) : undefined}
      data-testid="assumption-set"
    >
      <div className={cn('overflow-hidden rounded-2xl px-3.5 pb-3 pt-3.5', examKey ? EXAM_BANNER : NEUTRAL_BANNER)}>
        <p className="text-xs text-foreground/75">{[set.publisher, place].filter(Boolean).join(' · ')}</p>
        <h2 className="text-[17px] font-bold leading-tight">{set.title}</h2>
        <p className="mt-1 text-xs text-muted-foreground" data-testid="assumption-set-status">
          In force {effectiveLabel(set.effective)}
          {toEnter > 0 && <> · {toEnter} {toEnter === 1 ? 'figure' : 'figures'} still to enter</>}
        </p>
      </div>
      <ul className="divide-y divide-border/60 overflow-hidden rounded-xl bg-card">
        {shown.map(row => <FigureRow key={row.id} row={row} onUse={onUse} />)}
        {unfolded && folded.map(row => <FigureRow key={row.id} row={row} onUse={onUse} />)}
        {folded.length > 0 && (
          <li>
            <button
              type="button"
              onClick={() => setUnfolded(u => !u)}
              aria-expanded={unfolded}
              className="flex w-full items-center justify-between px-3.5 py-2.5 text-left text-sm text-muted-foreground transition-colors hover:bg-muted/60"
              data-testid="assumption-folded"
            >
              {unfolded ? 'Fewer figures' : `${folded.length} other ${folded.length === 1 ? 'figure' : 'figures'} in this document`}
              <ChevronDown className={cn('h-4 w-4 shrink-0 transition-transform', unfolded && 'rotate-180')} aria-hidden />
            </button>
          </li>
        )}
      </ul>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-1 text-xs">
        <FactCheckBadge verification={set.verification} contentPath={set.path} contentName={set.title} />
        <button type="button" onClick={onReadSource} className="font-medium underline underline-offset-2 hover:no-underline">
          Read the source
        </button>
        <a href={set.document} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-muted-foreground hover:text-foreground">
          The publisher’s copy <ExternalLink className="h-3 w-3" aria-hidden />
        </a>
      </div>
    </section>
  )
}

function FigureRow({ row, onUse }: { row: AssumptionRow; onUse: (row: AssumptionRow, uses: FigureUse[]) => void }) {
  const value = formatAssumptionValue(row)
  const uses = figureUses(row)
  const tools = [...new Map(uses.map(u => [u.tool.id, u.tool])).values()]
  const chip = 'inline-flex max-w-full items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ring-border transition-colors hover:bg-muted'
  return (
    <li className="space-y-1 px-3.5 py-2.5" data-testid="assumption-row">
      <div className="flex items-center gap-3">
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold">{row.label}</span>
          <span className="block text-xs text-muted-foreground">{row.locator}</span>
        </span>
        <span
          className={cn('shrink-0 text-right text-sm tabular-nums', value ? 'font-bold' : 'text-muted-foreground')}
          title={value ? undefined : 'Not entered from the document yet'}
        >
          {value || '—'}
        </span>
      </div>
      {tools.length > 0 && (
        <p className="flex items-center gap-1.5 text-xs">
          <span className="text-muted-foreground">to</span>
          {uses.length === 1 ? (
            <Link to={uses[0].path} className={chip} aria-label={`Use ${row.label}, ${value}, as ${uses[0].field.label} in ${uses[0].tool.name}`}>
              <span className="truncate">{uses[0].tool.name}</span> <ChevronRight className="h-3 w-3 shrink-0" aria-hidden />
            </Link>
          ) : (
            <button type="button" onClick={() => onUse(row, uses)} className={chip} aria-label={`Use ${row.label}, ${value}, in a tool`}>
              <span className="truncate">{tools[0].name}</span>
              {tools.length > 1 && <span className="text-muted-foreground"> + {tools.length - 1} more</span>}
              <ChevronDown className="h-3 w-3 shrink-0" aria-hidden />
            </button>
          )}
        </p>
      )}
    </li>
  )
}

function UseSheet({ set, row, uses, onReadSource, onClose }: {
  set: AssumptionSet
  row: AssumptionRow
  uses: FigureUse[]
  onReadSource: () => void
  onClose: () => void
}) {
  const value = formatAssumptionValue(row)
  const checked = set.verification?.status === 'verified'
  return (
    <BottomSheet title={`Use ${row.label}`} value={value} onClose={onClose}>
      <p className="flex flex-wrap items-center gap-1.5 px-1 text-xs text-muted-foreground">
        {set.publisher}, {set.edition} · {row.locator}
        {!checked && <UncheckedTag />}
      </p>
      <div className="divide-y divide-border/60 overflow-hidden rounded-xl bg-card" data-testid="assumption-uses">
        {uses.map(u => (
          <Link
            key={`${u.tool.id}:${u.field.key}`}
            to={u.path}
            aria-label={`Use ${row.label} as ${u.field.label} in ${u.tool.name}`}
            className="flex items-center gap-3 px-3.5 py-2.5 transition-colors hover:bg-muted/60"
          >
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold">{u.tool.name}</span>
              <span className="block text-xs text-muted-foreground">as {u.field.symbol ? `${u.field.symbol}, ` : ''}{u.field.label}</span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
          </Link>
        ))}
      </div>
      <button
        type="button"
        onClick={onReadSource}
        className="flex w-full items-center justify-between rounded-xl bg-card px-3.5 py-3 text-sm font-medium hover:bg-muted/60"
      >
        Read the source <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden />
      </button>
    </BottomSheet>
  )
}
