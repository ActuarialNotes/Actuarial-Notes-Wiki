// The Assumptions Bank, installed into the tools engine (docs/assumptions-bank.md §4.3).
//
// The engine never bundles the bank (it is vault content, and the connector's
// engine is a committed file); the app hands it the vault's figures here, once,
// when the tools load. `components/tools/ToolCard.tsx` imports this module, so
// every surface that draws a tool card — the Tools page, a workflow's steps, a
// source sheet — runs with the bank installed.

import sets from 'virtual:assumption-bank'
import { TOOLS, installAssumptionBank, runPath, toolSlug, unitFits, type BankFigure, type NumberField, type ToolSpec } from '@/lib/tools'
import type { AssumptionRow, AssumptionSet } from '@/lib/assumptionBank'

/**
 * Every figure of every set, as the engine takes it: a fact and a blank row
 * carry no number, so neither is a figure. The set's fact check rides with
 * each one; the engine leaves out a set with an open critical finding.
 */
export function toBankFigures(bank: readonly AssumptionSet[]): BankFigure[] {
  return bank.flatMap(set =>
    set.rows
      .filter(row => row.decimal != null)
      .map(row => ({
        id: row.id,
        label: row.label,
        kind: row.kind,
        unit: row.unit,
        value: row.decimal!,
        raw: row.raw,
        set: set.id,
        title: set.title,
        publisher: set.publisher,
        edition: set.edition,
        effective: set.effective,
        supersededBy: set.supersededBy,
        jurisdiction: set.jurisdiction,
        locator: row.locator,
        document: set.document,
        resource: set.source,
        verdict: set.verification?.status ?? 'unverified',
        openCritical: set.verification?.openCritical ?? 0,
        ...(set.shortName ? { shortName: set.shortName } : {}),
        ...(set.line ? { line: set.line } : {}),
        ...(row.basis ? { basis: row.basis } : {}),
        ...(row.meaning ? { meaning: row.meaning } : {}),
        ...(set.lead ? { lead: set.lead } : {}),
        ...(row.fits ? { fits: row.fits } : {}),
        ...(set.pageOffset ? { pageOffset: set.pageOffset } : {}),
      })),
  )
}

/** A tool field a figure can go into. */
export interface FigureUse {
  tool: ToolSpec
  field: NumberField
  /** The tool's page, opened with this field given the figure (a share link's shape). */
  path: string
}

/**
 * Every tool field that takes a row's figure: of a kind the field names, in a
 * unit it reads — the shelf's "Use in" links, each opening that tool with the
 * figure already in (`{ field: { assumption: id } }`, recorded as its source).
 */
export function figureUses(row: Pick<AssumptionRow, 'id' | 'kind' | 'unit' | 'decimal'>): FigureUse[] {
  if (row.decimal == null) return []
  return TOOLS.flatMap(tool =>
    tool.fields
      .filter((f): f is NumberField => f.kind === 'number' && !!f.bank?.includes(row.kind) && unitFits(row.unit, f.unit))
      .map(field => ({ tool, field, path: runPath(toolSlug(tool), { [field.key]: { assumption: row.id } }, tool.area) })),
  )
}

/**
 * A figure the document holds but the bank hasn't transcribed yet: a blank
 * row of a kind and unit the field takes. Listed in the edit sheet, explained,
 * never selectable (docs/tool-template-v2.md §3.7).
 */
export interface PendingFigure {
  set: AssumptionSet
  row: AssumptionRow
}

export function pendingFiguresFor(field: Pick<NumberField, 'bank' | 'unit'>, bank: readonly AssumptionSet[] = sets): PendingFigure[] {
  if (!field.bank?.length) return []
  return bank.flatMap(set =>
    set.supersededBy ? [] : set.rows
      .filter(row => row.decimal == null && row.kind !== 'fact' && field.bank!.includes(row.kind) && unitFits(row.unit, field.unit))
      .map(row => ({ set, row })),
  )
}

/** A set by its id, for a figure's level-2 explanation (its document, its lead). */
export const assumptionSet = (id: string): AssumptionSet | undefined => sets.find(s => s.id === id)

/**
 * A set's rows on the shelf: the figures a filter keeps, entered ones before
 * blanks, and the rest folded into one line under them. With no filter every
 * row is shown.
 */
export function shelfRows(
  rows: readonly AssumptionRow[],
  keep: ((row: AssumptionRow) => boolean) | null,
): { shown: AssumptionRow[]; folded: AssumptionRow[] } {
  const ordered = [...rows.filter(r => r.raw !== ''), ...rows.filter(r => r.raw === '')]
  if (!keep) return { shown: ordered, folded: [] }
  return { shown: ordered.filter(keep), folded: ordered.filter(r => !keep(r)) }
}

/** The tools that take a figure from the bank, in the catalogue's order — the shelf's Tool filter. */
export function toolsTakingFigures(): ToolSpec[] {
  return TOOLS.filter(t => t.fields.some(f => f.kind === 'number' && !!f.bank?.length))
}

/** Whether a tool takes this row's figure. */
export function takesFigure(tool: Pick<ToolSpec, 'id'>, row: Pick<AssumptionRow, 'id' | 'kind' | 'unit' | 'decimal'>): boolean {
  return figureUses(row).some(u => u.tool.id === tool.id)
}

/** The kinds a bank holds figures or rows of, in the vocabulary's order — the shelf's filter. */
export function kindsIn(bank: readonly AssumptionSet[], order: readonly string[]): string[] {
  const present = new Set<string>(bank.flatMap(s => s.rows.map(r => r.kind)))
  return order.filter(k => present.has(k))
}

installAssumptionBank(toBankFigures(sets))
