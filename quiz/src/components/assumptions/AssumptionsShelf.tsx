// The Assumptions Bank's shelf (`/tools/assumptions`, docs/assumptions-bank.md
// §4.5), in the tool template's shape (docs/actuarial-tools.md §19): every
// document a banner — tinted in the exam whose syllabus lists it, neutral when
// none does — with its figures as rows under it, newest first, filtered by
// kind. A figure a tool takes opens "Use in…", the tools that take it, each
// with its exam's logo; a link opens the tool with the figure already in,
// recorded as its source. The shelf is where a published number starts its
// way into a model.

import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import bank from 'virtual:assumption-bank'
import { BookMarked, ChevronRight, ExternalLink, CornerDownRight } from 'lucide-react'
import { ASSUMPTION_KINDS, effectiveLabel, formatAssumptionValue, kindLabel, type AssumptionRow, type AssumptionSet } from '@/lib/assumptionBank'
import { figureUses, kindsIn, type FigureUse } from '@/lib/toolBank'
import { examForConcepts, examForResource } from '@/lib/toolExam'
import { examAccentStyle } from '@/lib/examColors'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import { ExamLogo } from '@/components/ExamLogo'
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
          syllabi={syllabi}
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
  const figureRows = set.rows.filter(r => r.kind !== 'fact')
  const read = figureRows.filter(r => r.decimal != null).length
  // With a kind chosen, its rows lead; the rest of the document stays below them.
  const rows = kind ? [...set.rows.filter(r => r.kind === kind), ...set.rows.filter(r => r.kind !== kind)] : set.rows
  return (
    <section
      aria-label={set.title}
      id={`set-${set.id.replace(/[^A-Za-z0-9]+/g, '-')}`}
      className="space-y-2"
      style={examKey ? examAccentStyle(examKey) : undefined}
      data-testid="assumption-set"
    >
      <div className={cn('overflow-hidden rounded-2xl', examKey ? EXAM_BANNER : NEUTRAL_BANNER)}>
        <header className="flex items-start gap-3 px-3.5 pb-3 pt-3.5">
          {examKey ? (
            <ExamLogo examKey={examKey} size="md" />
          ) : (
            <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px] bg-background/50" aria-hidden>
              <BookMarked className="h-4 w-4" />
            </span>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-xs text-foreground/75">{set.publisher}</p>
            <h2 className="text-[17px] font-bold leading-tight">{set.title}</h2>
          </div>
        </header>
        <div className="grid grid-cols-2 border-t border-foreground/10">
          <div className="px-3.5 pb-3 pt-2.5">
            <p className="text-lg font-bold leading-tight tabular-nums">{read} of {figureRows.length}</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">figures read</p>
          </div>
          <div className="border-l border-foreground/10 px-3.5 pb-3 pt-2.5">
            <p className="text-lg font-bold leading-tight">{effectiveLabel(set.effective).replace(/^from /, '')}</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">effective</p>
          </div>
        </div>
      </div>
      <ul className="divide-y divide-border/60 overflow-hidden rounded-xl bg-card">
        {rows.map(row => <FigureRow key={row.id} row={row} dimmed={!!kind && row.kind !== kind} onUse={onUse} />)}
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

function FigureRow({ row, dimmed, onUse }: { row: AssumptionRow; dimmed: boolean; onUse: (row: AssumptionRow, uses: FigureUse[]) => void }) {
  const value = formatAssumptionValue(row)
  const uses = figureUses(row)
  const tools = new Set(uses.map(u => u.tool.id)).size
  const body = (
    <>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold">{row.label}</span>
        <span className="block text-xs text-muted-foreground">{row.locator}</span>
      </span>
      <span
        className={cn('shrink-0 text-right text-sm tabular-nums', value ? 'font-bold' : 'text-muted-foreground')}
        title={value ? undefined : 'Not read off the document yet'}
      >
        {value || '—'}
      </span>
      {tools > 0 && (
        <span className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-muted px-1.5 py-0.5 text-[11px] font-medium" aria-label={`${tools} tools take it`}>
          <CornerDownRight className="h-3 w-3" aria-hidden />{tools}
        </span>
      )}
    </>
  )
  if (!uses.length) {
    return <li className={cn('flex items-center gap-3 px-3.5 py-2.5', dimmed && 'opacity-50')} data-testid="assumption-row">{body}</li>
  }
  return (
    <li className={cn(dimmed && 'opacity-50')} data-testid="assumption-row">
      <button
        type="button"
        onClick={() => onUse(row, uses)}
        className="flex w-full items-center gap-3 px-3.5 py-2.5 text-left transition-colors hover:bg-muted/60"
        aria-label={`Use ${row.label}, ${value}, in a tool`}
      >
        {body}
        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
      </button>
    </li>
  )
}

function UseSheet({ set, row, uses, syllabi, onReadSource, onClose }: {
  set: AssumptionSet
  row: AssumptionRow
  uses: FigureUse[]
  syllabi: readonly WikiExamSyllabus[]
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
        {uses.map(u => {
          const exam = examForConcepts(u.tool.method.concepts, syllabi)
          return (
            <Link
              key={`${u.tool.id}:${u.field.key}`}
              to={u.path}
              aria-label={`Use ${row.label} as ${u.field.label} in ${u.tool.name}`}
              className="flex items-center gap-3 px-3.5 py-2.5 transition-colors hover:bg-muted/60"
            >
              {exam ? <ExamLogo examKey={exam} size="sm" /> : <span className="h-[26px] w-[26px] shrink-0 rounded-[7px] bg-muted" aria-hidden />}
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold">{u.tool.name}</span>
                <span className="block text-xs text-muted-foreground">as {u.field.symbol ? `${u.field.symbol}, ` : ''}{u.field.label}</span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
            </Link>
          )
        })}
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
