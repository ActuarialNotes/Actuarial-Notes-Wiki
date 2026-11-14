// The Assumptions section of Data Sources (`/data-sources`, docs/assumptions-bank.md
// §4.5), in the tool template's shape (docs/actuarial-tools.md §19,
// docs/tool-template-v2.md §3.8): every document a banner — tinted in the exam
// whose syllabus lists it, neutral when none does, no logo — headed by the
// chain it sits in (Source › Document, each a way there), with its figures as
// rows under it, newest first. One row of filters: the **Kind** of figure, and
// the **Tool** a figure is for; either shows only the rows it keeps, the rest
// of the document folded into one line. `?set=` narrows the shelf to one
// document (a document's Assumptions tag leads here). A figure not yet entered
// is never first. Each figure names the tools that take it ("to Permissible
// Loss Ratio"), the mirror of a tool's "from" chip; tapping a figure opens its
// sheet: the value, where it was read, what it means, and every tool it goes
// into. The shelf is where a published number starts its way into a model.

import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import bank from 'virtual:assumption-bank'
import { ChevronDown, ChevronRight, ExternalLink, X } from 'lucide-react'
import { ASSUMPTION_KINDS, effectiveLabel, formatAssumptionValue, kindLabel, type AssumptionRow, type AssumptionSet } from '@/lib/assumptionBank'
import { figureUses, kindsIn, shelfRows, takesFigure, toolsTakingFigures, type FigureUse } from '@/lib/toolBank'
import { toolSlug } from '@/lib/tools'
import { examForResource } from '@/lib/toolExam'
import { contextLine } from '@/lib/toolTemplate'
import { examAccentStyle } from '@/lib/examColors'
import { entityById, resourcePageName, type SourceEntity, type SourceResource } from '@/lib/coworkSources'
import { publisherPath } from '@/lib/dataSources'
import { COWORK_ENTITIES, COWORK_RESOURCES } from '@/data/coworkSources'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import { FactCheckBadge } from '@/components/FactCheckBadge'
import { MultiSelectDropdown } from '@/components/MultiSelectDropdown'
import { EXAM_BANNER, NEUTRAL_BANNER } from '@/components/ui/InfoSheet'
import { BottomSheet } from '@/components/tools/ValueSheet'
import { UncheckedTag } from '@/components/tools/SourceTag'
import { cn } from '@/lib/utils'

/** Where a set sits in the chain: the document it was read from, and that document's source. */
interface SetChain {
  resource: SourceResource | null
  entity: SourceEntity | null
}

function setChain(set: AssumptionSet): SetChain {
  const resource = COWORK_RESOURCES.find(r => resourcePageName(r) === set.source) ?? null
  return { resource, entity: resource ? entityById(COWORK_ENTITIES, resource.entityId) : null }
}

export function AssumptionsShelf({ onReadSource }: { onReadSource: (resource: string) => void }) {
  const [params, setParams] = useSearchParams()
  const { syllabi } = useWikiSyllabus()
  const current = useMemo(() => bank.filter(s => !s.supersededBy), [])
  // A fact never goes into a tool; the filter is for figures.
  const kinds = kindsIn(bank, Object.keys(ASSUMPTION_KINDS)).filter(k => k !== 'fact')
  const kind = kinds.includes(params.get('kind') ?? '') ? params.get('kind')! : null
  const tools = useMemo(() => toolsTakingFigures(), [])
  const tool = tools.find(t => toolSlug(t) === params.get('tool')) ?? null
  const setId = current.some(s => s.id === params.get('set')) ? params.get('set')! : null

  const choose = (key: 'kind' | 'tool' | 'set', value: string | null) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const keep = useMemo(
    () => (kind || tool ? (row: AssumptionRow) => (!kind || row.kind === kind) && (!tool || takesFigure(tool, row)) : null),
    [kind, tool],
  )
  const sets = [...current]
    .filter(s => (!setId || s.id === setId) && (!keep || s.rows.some(keep)))
    .sort((a, b) => b.effective.localeCompare(a.effective) || a.title.localeCompare(b.title))
  const rows = current.flatMap(s => s.rows)
  const [open, setOpen] = useState<{ set: AssumptionSet; row: AssumptionRow } | null>(null)

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <MultiSelectDropdown
          label={kind ? kindLabel(kind) : 'Kind'}
          options={kinds.map(k => ({ value: k, label: kindLabel(k) }))}
          selected={new Set(kind ? [kind] : [])}
          onToggle={v => choose('kind', v === kind ? null : v)}
          getCount={v => rows.filter(r => r.kind === v && (!tool || takesFigure(tool, r))).length}
          single
        />
        <MultiSelectDropdown
          label={tool ? `For ${tool.name}` : 'Tool'}
          options={tools.map(t => ({ value: toolSlug(t), label: t.name }))}
          selected={new Set(tool ? [toolSlug(tool)] : [])}
          onToggle={v => choose('tool', tool && v === toolSlug(tool) ? null : v)}
          getCount={v => {
            const t = tools.find(x => toolSlug(x) === v)
            return t ? rows.filter(r => takesFigure(t, r) && (!kind || r.kind === kind)).length : 0
          }}
          single
        />
        {setId && (
          <button
            type="button"
            onClick={() => choose('set', null)}
            className="inline-flex h-9 items-center gap-1 rounded-full border px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            data-testid="assumption-set-filter"
          >
            One document
            <X className="h-3.5 w-3.5" aria-label="Show every document" />
          </button>
        )}
      </div>
      {sets.length === 0 && (
        <p className="rounded-lg border border-dashed px-4 py-10 text-center text-sm text-muted-foreground">
          No figures match these filters.
        </p>
      )}
      {sets.map(set => (
        <SetSection
          key={set.id}
          set={set}
          keep={keep}
          syllabi={syllabi}
          onReadSource={() => onReadSource(set.source)}
          onOpen={row => setOpen({ set, row })}
        />
      ))}
      {open && (
        <FigureSheet
          {...open}
          onReadSource={() => { setOpen(null); onReadSource(open.set.source) }}
          onClose={() => setOpen(null)}
        />
      )}
    </div>
  )
}

function SetSection({ set, keep, syllabi, onReadSource, onOpen }: {
  set: AssumptionSet
  keep: ((row: AssumptionRow) => boolean) | null
  syllabi: readonly WikiExamSyllabus[]
  onReadSource: () => void
  onOpen: (row: AssumptionRow) => void
}) {
  const examKey = useMemo(() => examForResource(set.source, syllabi), [set.source, syllabi])
  const toEnter = set.rows.filter(r => r.kind !== 'fact' && r.decimal == null).length
  const { shown, folded } = shelfRows(set.rows, keep)
  const chain = useMemo(() => setChain(set), [set])
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
        <nav aria-label="Read from" className="flex min-w-0 items-center gap-1 text-xs text-foreground/75" data-testid="assumption-set-chain">
          {chain.entity ? (
            <Link to={publisherPath(chain.entity.id)} className="shrink-0 font-semibold text-foreground/90 hover:underline">
              {chain.entity.short}
            </Link>
          ) : (
            <span className="shrink-0">{set.shortName || set.publisher}</span>
          )}
          <span aria-hidden>›</span>
          <button type="button" onClick={onReadSource} className="min-w-0 truncate text-left font-semibold text-foreground/90 hover:underline">
            {chain.resource?.title ?? set.source}
          </button>
        </nav>
        {place && <p className="mt-0.5 text-xs text-foreground/75">{place}</p>}
        <h2 className="text-[17px] font-bold leading-tight">{set.title}</h2>
        <p className="mt-1 text-xs text-muted-foreground" data-testid="assumption-set-status">
          In force {effectiveLabel(set.effective)}
          {toEnter > 0 && <> · {toEnter} {toEnter === 1 ? 'figure' : 'figures'} still to enter</>}
        </p>
      </div>
      <ul className="divide-y divide-border/60 overflow-hidden rounded-xl bg-card">
        {shown.map(row => <FigureRow key={row.id} row={row} onOpen={onOpen} />)}
        {unfolded && folded.map(row => <FigureRow key={row.id} row={row} onOpen={onOpen} />)}
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

function FigureRow({ row, onOpen }: { row: AssumptionRow; onOpen: (row: AssumptionRow) => void }) {
  const value = formatAssumptionValue(row)
  const uses = figureUses(row)
  const tools = [...new Map(uses.map(u => [u.tool.id, u.tool])).values()]
  const chip = 'inline-flex max-w-full items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ring-border transition-colors hover:bg-muted'
  return (
    <li className="relative space-y-1 px-3.5 py-2.5 transition-colors hover:bg-muted/40" data-testid="assumption-row">
      {/* The whole row opens the figure's sheet; a "to" chip is the one thing on it that goes elsewhere. */}
      <button
        type="button"
        onClick={() => onOpen(row)}
        aria-label={`${row.label}${value ? `, ${value}` : ''}: where it is from and where it goes`}
        className="absolute inset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
        data-testid="assumption-open"
      />
      <div className="pointer-events-none relative flex items-center gap-3">
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
        <p className="pointer-events-none relative flex items-center gap-1.5 text-xs">
          <span className="text-muted-foreground">to</span>
          {uses.length === 1 ? (
            <Link to={uses[0].path} className={cn(chip, 'pointer-events-auto')} aria-label={`Use ${row.label}, ${value}, as ${uses[0].field.label} in ${uses[0].tool.name}`}>
              <span className="truncate">{uses[0].tool.name}</span> <ChevronRight className="h-3 w-3 shrink-0" aria-hidden />
            </Link>
          ) : (
            <button type="button" onClick={() => onOpen(row)} className={cn(chip, 'pointer-events-auto')} aria-label={`Use ${row.label}, ${value}, in a tool`}>
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

/** The words for a figure's basis (`BASES`), as the sheet's first fact. */
const BASIS_LABEL: Record<string, string> = {
  cap: 'A cap',
  selected: 'Selected',
  benchmark: 'A benchmark',
  observed: 'Observed',
  minimum: 'A minimum',
  target: 'A target',
}

/**
 * One figure: its value, where it sits in the chain (Source › Document › the
 * place it is printed), what it means in the set's own words, and every tool
 * it goes into, each opening with the figure already in.
 */
function FigureSheet({ set, row, onReadSource, onClose }: {
  set: AssumptionSet
  row: AssumptionRow
  onReadSource: () => void
  onClose: () => void
}) {
  const value = formatAssumptionValue(row)
  const uses: FigureUse[] = figureUses(row)
  const checked = set.verification?.status === 'verified'
  const chain = setChain(set)
  const step = 'flex items-center gap-3 px-3.5 py-2.5'
  const label = 'w-20 shrink-0 text-xs font-medium text-muted-foreground'
  return (
    <BottomSheet title={row.label} value={value || '—'} onClose={onClose}>
      <p className="flex flex-wrap items-center gap-1.5 px-1 text-xs text-muted-foreground" data-testid="figure-facts">
        {[BASIS_LABEL[row.basis], `In force ${effectiveLabel(set.effective)}`].filter(Boolean).join(' · ')}
        {!value && <> · Not entered from the document yet</>}
        {!checked && <UncheckedTag />}
      </p>
      <div className="divide-y divide-border/60 overflow-hidden rounded-xl bg-card" data-testid="figure-chain">
        {chain.entity ? (
          <Link to={publisherPath(chain.entity.id)} className={cn(step, 'transition-colors hover:bg-muted/60')}>
            <span className={label}>Source</span>
            <span className="min-w-0 flex-1 text-sm font-semibold">{chain.entity.name}</span>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
          </Link>
        ) : (
          <div className={step}>
            <span className={label}>Source</span>
            <span className="min-w-0 flex-1 text-sm font-semibold">{set.publisher}</span>
          </div>
        )}
        <button type="button" onClick={onReadSource} className={cn(step, 'w-full text-left transition-colors hover:bg-muted/60')}>
          <span className={label}>Document</span>
          <span className="min-w-0 flex-1 text-sm font-semibold">{chain.resource?.title ?? set.source}</span>
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
        </button>
        <div className={step}>
          <span className={label}>Where</span>
          <span className="min-w-0 flex-1 text-sm">{row.locator}</span>
        </div>
      </div>
      {row.meaning && <p className="px-1 text-sm leading-relaxed text-foreground/90">{row.meaning}</p>}
      {uses.length > 0 && (
        <>
          <p className="px-1 pt-1 text-xs font-medium text-muted-foreground">Use it in</p>
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
        </>
      )}
      <a
        href={set.document}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-between rounded-xl bg-card px-3.5 py-3 text-sm font-medium hover:bg-muted/60"
      >
        The publisher’s copy <ExternalLink className="h-4 w-4 text-muted-foreground" aria-hidden />
      </a>
    </BottomSheet>
  )
}
