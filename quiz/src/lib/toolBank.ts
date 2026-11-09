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
      .map(field => ({ tool, field, path: runPath(toolSlug(tool), { [field.key]: { assumption: row.id } }) })),
  )
}

/** The kinds a bank holds figures or rows of, in the vocabulary's order — the shelf's filter. */
export function kindsIn(bank: readonly AssumptionSet[], order: readonly string[]): string[] {
  const present = new Set<string>(bank.flatMap(s => s.rows.map(r => r.kind)))
  return order.filter(k => present.has(k))
}

installAssumptionBank(toBankFigures(sets))
