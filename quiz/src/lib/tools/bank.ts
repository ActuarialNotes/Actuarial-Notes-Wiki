/**
 * The Assumptions Bank, as the engine sees it (docs/assumptions-bank.md §4.3).
 *
 * The bank is vault content: it changes with every set added or corrected, so
 * it is never compiled into the engine — the committed connector bundle
 * (`api/_tools/engine.js`) would go stale with every edit. It is **installed**
 * instead: the app installs the vault's figures when the tools load
 * (`lib/toolBank.ts`), and the connector will install them from its export
 * (Phase 2). Nothing installed, nothing is offered and a reference to a
 * figure is an input error that says so.
 *
 * A number field that takes published figures names their kinds (`bank` on
 * the field). Its input may then be a reference — `{ "assumption": "<id>" }`
 * — instead of a number: `normalizeInput` reads the figure in, and the run
 * records where it came from (its judgment's `source`, a trace step, the
 * input hash) and warns while the figure isn't fact checked (D-AB4). A
 * figure with an open critical finding is never installed (withheld, as a
 * question with one is from a quiz).
 *
 * Imports are relative only — the engine is bundled outside the app's alias.
 */

import type { NumberField, NumberUnit } from './types'

/** One published figure, as installed: everything a run needs to say where it came from. */
export interface BankFigure {
  /** `<set id>#<row slug>`: how a run, a link or an agent names it. */
  id: string
  label: string
  kind: string
  /** The bank's unit: `%`, `factor`, `CAD`, `USD`. */
  unit: string
  /** As a tool takes it: 0.06 for 6.0%. */
  value: number
  /** As the document prints it: `6.0`. */
  raw: string
  set: string
  title: string
  publisher: string
  edition: string
  effective: string
  /** The set that replaces this one's, when a newer edition has been added. */
  supersededBy: string | null
  jurisdiction: string
  locator: string
  /** The copy that was read. */
  document: string
  /** The resource page of the document (the set's `Source`). */
  resource: string
  /** The set's fact-check status (`verified`, `unverified`, `stale` …). */
  verdict: string
  openCritical: number
  /** The set's short name for the publisher ("AIRB"), for the from chip; else the publisher. */
  shortName?: string
  /** The line of business the set's figures are for ("Private passenger auto"). */
  line?: string
  /** What kind of figure it is: a `cap`, a `selected` figure, a `benchmark`, `observed`, a `minimum`, a `target`. */
  basis?: string
  /** One sentence saying what the figure is, the document's words where it has them. */
  meaning?: string
  /** The set's lead paragraph: what the figures are, where a row has no meaning of its own. */
  lead?: string
  /** A figure that matches a tool's answer rather than an input: `<tool id>#<tile>`. */
  fits?: string
  /** The PDF's page number less the printed one, so a locator's "p. 7" opens at the right page. */
  pageOffset?: number
}

/** Where a figure in a run came from — on its judgment, in the envelope. */
export interface AssumptionSource {
  assumption: string
  label: string
  publisher: string
  title: string
  edition: string
  effective: string
  locator: string
  document: string
  resource: string
  verdict: string
}

let installed: BankFigure[] = []

/** Install the bank's figures (the app does at load; the connector will from its export). */
export function installAssumptionBank(figures: readonly BankFigure[]): void {
  installed = figures.filter(f => f.openCritical === 0 && Number.isFinite(f.value))
}

/** Every installed figure. */
export function bankFigures(): readonly BankFigure[] {
  return installed
}

export function bankFigure(id: string): BankFigure | undefined {
  return installed.find(f => f.id === id)
}

/** Whether a figure's unit is one the field reads: `%` a percent, `factor` a factor, a currency money. */
export function unitFits(figureUnit: string, unit: NumberUnit): boolean {
  if (figureUnit === '%') return unit === 'percent'
  if (figureUnit === 'factor') return unit === 'factor'
  if (figureUnit === 'CAD' || figureUnit === 'USD') return unit === 'money'
  return false
}

/**
 * The figures a field is offered: of the kinds it names, in a unit it reads,
 * in force (not replaced by a newer edition). Newest edition first.
 */
export function figuresFor(field: Pick<NumberField, 'bank' | 'unit'>): BankFigure[] {
  if (!field.bank?.length) return []
  return installed
    .filter(f => field.bank!.includes(f.kind) && unitFits(f.unit, field.unit) && !f.supersededBy)
    .sort((a, b) => b.effective.localeCompare(a.effective) || a.title.localeCompare(b.title))
}

/**
 * The figures that match a tool's **answer** rather than an input
 * (`fits: <tool id>#<tile>`): shown under the answer for comparison, never
 * offered to a field (docs/tool-template-v2.md §3.1).
 */
export function figuresFitting(toolId: string): BankFigure[] {
  return installed.filter(f => f.fits?.split('#')[0] === toolId && !f.supersededBy)
}

/** A field's input that names a figure rather than giving a number. */
export function assumptionRef(raw: unknown): string | null {
  if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
    const id = (raw as Record<string, unknown>).assumption
    if (typeof id === 'string' && id.trim()) return id.trim()
  }
  return null
}

export function sourceOf(f: BankFigure): AssumptionSource {
  return {
    assumption: f.id,
    label: f.label,
    publisher: f.publisher,
    title: f.title,
    edition: f.edition,
    effective: f.effective,
    locator: f.locator,
    document: f.document,
    resource: f.resource,
    verdict: f.verdict,
  }
}

/**
 * The warning a run carries for a figure not yet fact checked (D-AB4). One
 * function writes it, so the card — which says the same under the field —
 * can leave it out of its own list.
 */
export function uncheckedWarning(fieldLabel: string, f: Pick<BankFigure, 'publisher' | 'raw' | 'unit' | 'label' | 'locator'>): string {
  return `${fieldLabel} is ${f.publisher}'s ${printedFigure(f)} (${f.label}), which has not been fact checked yet: read it off the document (${f.locator}) before relying on it.`
}

/** How a figure is printed in a run's words: `6.0%`, `1.094`, `CAD 466`. */
export function printedFigure(f: Pick<BankFigure, 'raw' | 'unit'>): string {
  if (f.unit === '%') return `${f.raw}%`
  if (f.unit === 'factor') return f.raw
  return `${f.unit} ${f.raw}`
}
