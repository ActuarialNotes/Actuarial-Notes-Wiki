// A tool card's state and moves, shared by the two ways a card is drawn: the
// original `ToolCard` and the template (`ToolTemplate`, docs/actuarial-tools.md
// §19). Both run the same engine on the same draft, so moving a tool from one
// to the other changes how it looks and nothing it computes.
//
// The draft leaves out every judgment the reader hasn't touched, so the
// result's judgments say honestly which were left at their default (R3). The
// tool page keeps it between visits (`persist`), and a reset can be undone
// for a few seconds.

import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ToolInputError,
  assumptionRef,
  bankFigure,
  filedCell,
  filedRef,
  filingsInstalled,
  readerMessage,
  runPath,
  runTool,
  toolById,
  toolSlug,
  uncheckedWarning,
  type BankFigure,
  type FiledCell,
  type ChoiceField,
  type DateField,
  type NumberField,
  type TableField,
  type ToolInput,
  type ToolResult,
  type ToolSpec,
  type TriangleField,
} from '@/lib/tools'
import { fillColumn, scalarSources, selectionsToFactors, type ColumnSource, type Selection } from '@/lib/toolColumns'
import { figureFor } from '@/lib/toolFigures'
import { lastRun, rememberRun } from '@/lib/toolRuns'
import { runToolCall, toolResultSheets } from '@/lib/toolExport'
import { draftFromStore, draftToStore, fieldVisible, initialDraft, type Draft } from '@/lib/toolDraft'
import { columnValues, originOf, type Origin } from '@/lib/toolTemplate'
import { downloadWorkbook } from '@/lib/xlsx'
import type { Sourcing } from './SourceSheet'
import type { ToolMenuItem } from './ToolMenu'
import type { DraftRow } from './ToolGrid'
// Installs the vault's Assumptions Bank into the engine, for every card.
import '@/lib/toolBank'
import { loadFilings, needsFilings } from '@/lib/toolFilings'

/** The tool whose card carries the LDF selection exhibit (§6.6). */
export const SELECTING_TOOL = 'reserving.age_to_age_factors'

/** The key a tool page keeps its draft under (localStorage, this device only — R7). */
const DRAFT_STORE = 'actuarial_tool_draft:'

function readStore(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function writeStore(key: string, value: string | null) {
  try {
    if (value === null) window.localStorage.removeItem(key)
    else window.localStorage.setItem(key, value)
  } catch {
    // Storage blocked (a private window): the card works, it just won't remember.
  }
}

/** A tool another value can be taken from, opening in the source sheet. */
export interface ScalarSourceLink {
  label: string
  open: () => void
}

export interface ToolCardOptions {
  spec: ToolSpec
  initialInput?: unknown
  onOpenMethod?: () => void
  onResult?: (result: ToolResult | null) => void
  embedded?: boolean
  persist?: boolean
}

export function useToolCard({ spec, initialInput, onOpenMethod, onResult, embedded = false, persist = false }: ToolCardOptions) {
  const navigate = useNavigate()
  const storeKey = `${DRAFT_STORE}${spec.id}`
  const [draft, setDraft] = useState<Draft>(() =>
    (persist && initialInput === undefined ? draftFromStore(spec, readStore(storeKey)) : null) ?? initialDraft(spec, initialInput),
  )
  useEffect(() => {
    if (persist) writeStore(storeKey, draftToStore(spec, draft))
  }, [persist, storeKey, spec, draft])

  // A reset can be taken back for a few seconds: one tap shouldn't cost a
  // reader the triangle they typed in.
  const [undo, setUndo] = useState<Draft | null>(null)
  useEffect(() => {
    if (!undo) return
    const t = window.setTimeout(() => setUndo(null), 8000)
    return () => window.clearTimeout(t)
  }, [undo])
  const reset = () => {
    if (draftToStore(spec, draft) !== null) setUndo(draft)
    setDraft(initialDraft(spec))
  }
  const undoReset = () => {
    if (undo) setDraft(undo)
    setUndo(null)
  }

  // OSFI's filings are fetched the first time a card needs them; the run waits for them.
  const wantsFilings = needsFilings(spec, draft)
  const [filingsReady, setFilingsReady] = useState(() => filingsInstalled() !== null)
  const [filingsFailed, setFilingsFailed] = useState(false)
  useEffect(() => {
    if (!wantsFilings || filingsReady) return
    let live = true
    loadFilings().then(() => live && setFilingsReady(true), () => live && setFilingsFailed(true))
    return () => { live = false }
  }, [wantsFilings, filingsReady])

  const lastGood = useRef<ToolResult | null>(null)
  const [sourcing, setSourcing] = useState<Sourcing | null>(null)
  // What another tool filled, and with what (the template's "linked" tag).
  const [origins, setOrigins] = useState<Record<string, Origin>>({})
  // Age-to-Age Factors' selection exhibit (§6.6): the picks, one per interval.
  // A new triangle starts them over.
  const selecting = spec.id === SELECTING_TOOL
  const [selections, setSelections] = useState<(Selection | null)[]>([])
  useEffect(() => setSelections([]), [draft.triangle])

  const outcome = useMemo(() => {
    if (wantsFilings && !filingsReady) {
      return {
        result: null as ToolResult | null,
        error: filingsFailed ? "OSFI's filings couldn't be loaded. Check your connection and reload the page." : (null as string | null),
        errorField: null as string | null,
        loading: !filingsFailed,
      }
    }
    try {
      const result = runTool(spec, draft)
      lastGood.current = result
      return { result, error: null as string | null, errorField: null as string | null, loading: false }
    } catch (err) {
      if (err instanceof ToolInputError) return { result: lastGood.current, error: readerMessage(spec, err), errorField: err.field, loading: false }
      throw err
    }
  }, [spec, draft, wantsFilings, filingsReady, filingsFailed])
  const result = outcome.result
  const stale = outcome.error !== null
  // The figure (§6.7), from the same run as the tiles.
  const figure = useMemo(() => (result ? figureFor(result) : null), [result])

  // The session remembers each tool's last good run, for the candidates a
  // cell's stepper offers elsewhere (§6.6); a source sheet is told each result.
  useEffect(() => {
    if (result && !stale) rememberRun(spec.id, result.input)
    onResult?.(stale ? null : result)
  }, [result, stale, spec.id, onResult])

  const set = (key: string, value: unknown) => setDraft(d => ({ ...d, [key]: value }))
  /** Back to the example's value: the field leaves the draft, so the run reports it as a default. */
  const unset = (key: string) => setDraft(d => {
    const next = { ...d }
    delete next[key]
    return next
  })
  const valueOf = (f: ToolSpec['fields'][number]) => draft[f.key] ?? (f as { default: unknown }).default
  /**
   * Whether the reader has changed a field from the example. The draft holds
   * every input that isn't a judgment from the start, so "in the draft" is
   * not the test; "still the example's value" is.
   */
  const touched = (f: ToolSpec['fields'][number]) => {
    const v = draft[f.key]
    if (v === undefined) return false
    const d = (f as { default: unknown }).default
    if (f.kind === 'number') return typeof v !== 'number' && typeof v !== 'string' ? true : Number(v) !== d
    return JSON.stringify(v) !== JSON.stringify(d)
  }

  /** A figure's dragged point sets its input, held to the field's step and bounds as a slider is. */
  const dragTo = (key: string, value: number) => {
    const f = spec.fields.find(x => x.key === key)
    if (!f || f.kind !== 'number') return
    const stepped = f.integer ? Math.round(value) : Math.round(value / f.step) * f.step
    set(key, Math.min(f.max, Math.max(f.min, Number(stepped.toFixed(10)))))
  }

  // A field given a published figure holds a reference to it, not a number
  // (docs/assumptions-bank.md): the card draws the figure's value, and typing
  // or sliding replaces the reference with the reader's own number.
  const drawnFigure = (f: NumberField): BankFigure | null => {
    const ref = assumptionRef(draft[f.key])
    return ref ? bankFigure(ref) ?? null : null
  }
  // The "not fact checked yet" warning of a figure the card already says it
  // of, under its field — said once, where the figure is.
  const shownUnderField = new Set(
    spec.fields.flatMap(f => {
      const fig = f.kind === 'number' ? drawnFigure(f) : null
      return fig && fig.verdict !== 'verified' ? [uncheckedWarning(f.label, fig)] : []
    }),
  )
  const bankValue = (f: NumberField): number | null => {
    if (!assumptionRef(draft[f.key])) return null
    return drawnFigure(f)?.value ?? f.default
  }
  // A field given a filed value holds a reference to the filing's cell: the card
  // draws the value as filed, and an edit replaces it with the reader's own.
  const drawnFiling = (f: NumberField): FiledCell | null => {
    const ref = filedRef(draft[f.key])
    if (!ref || !filingsReady) return null
    try {
      return filedCell(ref)
    } catch {
      return null
    }
  }
  const filedNumber = (f: NumberField): number | null => {
    const cell = drawnFiling(f)
    if (!cell) return filedRef(draft[f.key]) ? f.default : null
    return cell.source.units === '%' && f.unit === 'percent' ? cell.value / 100 : cell.value
  }
  /** A number field's value as drawn: the published figure's, the filed one, or the draft's, or the default. */
  const numberOf = (f: NumberField): number => bankValue(f) ?? filedNumber(f) ?? Number(valueOf(f))

  /** Open the tool a column's values come from, filled from this grid where it can be (§6.6). */
  const fillFrom = (field: TableField, key: string, source: ColumnSource) => {
    const tool = toolById(source.tool)
    if (!tool) return
    const column = field.columns.find(c => c.key === key)
    const rows = valueOf(field) as DraftRow[]
    setSourcing({
      title: `${column?.label ?? key} from ${tool.name}`,
      how: source.how,
      tool,
      initial: source.prefill?.(rows) ?? (lastRun(tool.id) as ToolInput | undefined),
      apply: r => {
        const filled = fillColumn(valueOf(field) as DraftRow[], key, source.take(r, rows))
        set(field.key, filled)
        setOrigins(o => ({ ...o, [`${field.key}.${key}`]: originOf(tool.name, columnValues(filled, key)) }))
      },
    })
  }

  /** The tools a number field can be taken from (§6.6), each opening in the source sheet. */
  const sourcesFor = (f: NumberField): ScalarSourceLink[] =>
    embedded ? [] : scalarSources(spec.id, f.key).map(source => ({
      label: toolById(source.tool)?.name ?? source.tool,
      open: () => {
        const tool = toolById(source.tool)
        if (!tool) return
        setSourcing({
          title: `${f.label} from ${tool.name}`,
          how: source.how,
          tool,
          initial: lastRun(tool.id),
          apply: r => {
            const v = source.take(r)
            if (v != null && Number.isFinite(v)) {
              set(f.key, v)
              setOrigins(o => ({ ...o, [f.key]: originOf(tool.name, v) }))
            }
          },
        })
      },
    }))

  const slug = toolSlug(spec)
  const sends = (embedded ? [] : spec.next ?? []).flatMap(next => {
    const target = toolById(next.tool)
    if (!target || !result || stale) return []
    const picked = selecting && selections.some(Boolean)
    return [{
      key: `next-${next.tool}`,
      label: `Send ${picked ? 'selections ' : ''}to ${next.label}`,
      icon: 'next' as const,
      run: () => {
        const built = picked
          ? selectionsToFactors(result.values.ages as number[], result.values.averages as (number | null)[], selections)
          : next.build(result.input, result)
        navigate(runPath(toolSlug(target), built))
      },
    }]
  })
  const download = () => { if (result) downloadWorkbook(`${slug}.xlsx`, toolResultSheets(spec, result)) }
  const menu: ToolMenuItem[] = [
    ...(onOpenMethod ? [{ key: 'method', label: 'Read about the method', icon: 'method' as const, run: onOpenMethod }] : []),
    { key: 'link', label: 'Copy link to this run', icon: 'link', run: () => `${window.location.origin}${runPath(slug, draft)}` },
    { key: 'ai', label: 'Copy for Claude or ChatGPT', icon: 'ai', run: () => runToolCall(spec, draft) },
    { key: 'json', label: 'Copy result as JSON', icon: 'json', disabled: !result, run: () => JSON.stringify(result, null, 2) },
    { key: 'xlsx', label: 'Download .xlsx', icon: 'download', disabled: !result || stale, run: download },
    ...sends,
  ]

  const grid = spec.grid ? (spec.fields.find(f => f.key === spec.grid) as TableField) : null
  // Every grid-shaped input is drawn: a tool may take two triangles (a ratio) or
  // a table beside its result (rate changes beside the on-level factors).
  const triangles = spec.fields.filter((f): f is TriangleField => f.kind === 'triangle')
  const tables = spec.fields.filter((f): f is TableField => f.kind === 'table' && f.key !== spec.grid)
  const labelled = triangles.length + tables.length + (grid ? 1 : 0) > 1
  const scalars = spec.fields.filter(f => (f.kind === 'number' || f.kind === 'choice' || f.kind === 'date') && fieldVisible(spec, f, draft)) as (NumberField | ChoiceField | DateField)[]
  // An input's problem is said where the input is; one the card draws nowhere is said under the tiles.
  const drawn = new Set([...triangles, ...tables, ...(grid ? [grid] : []), ...scalars].map(f => f.key))
  const errorAt = (key: string) => (outcome.errorField === key ? outcome.error : null)
  const looseError = outcome.error && !drawn.has(outcome.errorField ?? '') ? outcome.error : null

  return {
    spec, slug, draft, set, unset, valueOf, numberOf, touched,
    undo, reset, undoReset,
    outcome, result, stale, figure, dragTo,
    sourcing, setSourcing, origins,
    selecting, selections, setSelections,
    drawnFigure, drawnFiling, shownUnderField, bankValue, filedNumber, fillFrom, sourcesFor,
    menu, sends, download,
    grid, triangles, tables, labelled, scalars, errorAt, looseError,
  }
}

export type ToolCardModel = ReturnType<typeof useToolCard>
