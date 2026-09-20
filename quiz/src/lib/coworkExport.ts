/**
 * Turning a deliverable into a **workbook**.
 *
 * The last step of the Cowork loop is an export in a format the reader can
 * actually work in, and the shape of that export is decided by everything the
 * scoping settled: which exhibit, which columns, how many periods, which
 * assumptions and which sources.
 *
 * The rule this module keeps — and the reason it is worth reading before
 * changing it — is that **value cells are left empty**. Cowork has no access to
 * anyone's experience data. An exhibit that arrived with numbers in it would be
 * an exhibit full of numbers nobody measured, and a deliverable built on it
 * would carry a figure with no basis, which is exactly what the assumptions
 * register exists to prevent. What the export *can* carry honestly is
 * structure: the right columns, the right periods (calendar arithmetic off the
 * as-of date), and every assumption and source with the thing that supports it
 * named. That is a working paper, ready for data — not a fabricated result.
 *
 * Pure: it takes a deliverable and returns `Sheet[]`. The download itself is
 * `lib/xlsx.ts`.
 */

import {
  deriveAssumptions,
  deriveKeyDetails,
  derivePeriods,
  chosenOption,
  periodLabels,
  visibleSteps,
  type Deliverable,
  type WizardStep,
} from '@/lib/coworkDeliverables'
import { facetPills } from '@/lib/coworkFacets'
import { facetsFromAnswers } from '@/lib/coworkDeliverables'
import type { SourceEntity, SourceResource } from '@/lib/coworkSources'
import { formatPublished, resourceKindLabel } from '@/lib/coworkSources'
import {
  DOCUMENTATION_ITEMS,
  REPORT_OUTLINES,
  exportSpec,
  type ExportSpec,
} from '@/data/coworkDeliverables'
import type { Sheet, CellValue } from '@/lib/xlsx'

/** How many maturity columns a development triangle is cut into. */
const TRIANGLE_MATURITIES = 10

export interface ExportContext {
  deliverable: Deliverable
  steps: WizardStep[]
  /** The attached documents, resolved from the deliverable's resource ids. */
  resources: SourceResource[]
  entities: SourceEntity[]
  /** Passed in rather than read from the clock, so an export is reproducible. */
  asOf: Date
}

function entityName(entities: SourceEntity[], id: string): string {
  return entities.find(e => e.id === id)?.name ?? id
}

/** The period column's rows, or a single unnamed row when no grain was chosen. */
function periodRows(ctx: ExportContext): string[] {
  const spec = derivePeriods(ctx.steps, ctx.deliverable.answers)
  return spec ? periodLabels(spec, ctx.asOf) : ['']
}

/** The cover sheet: what this deliverable is, and what its answers were. */
function coverSheet(ctx: ExportContext): Sheet {
  const { deliverable, steps } = ctx
  const facets = facetsFromAnswers(steps, deliverable.answers)
  const rows: CellValue[][] = [
    ['Deliverable', deliverable.title],
    ['Exported', ctx.asOf.toISOString().slice(0, 10)],
    [],
    ['Scope', ''],
  ]
  for (const step of visibleSteps(steps, deliverable.answers)) {
    const option = chosenOption(step, deliverable.answers)
    if (option) rows.push([step.question, option.label])
  }
  rows.push([])
  rows.push(['Facets', ''])
  for (const pill of facetPills(facets)) rows.push([pill.axis, pill.label])
  rows.push([])
  rows.push(['Key details', ''])
  for (const detail of deriveKeyDetails(deliverable.type, steps, deliverable.answers, ctx.resources)) {
    rows.push([detail.label, detail.value, detail.basis])
  }
  rows.push([])
  rows.push([
    'Note',
    'Value cells in the exhibits are intentionally empty — Cowork does not hold your experience data. The columns, periods, assumptions and sources are derived from this deliverable’s scoping.',
  ])
  return { name: 'Cover', columns: ['Item', 'Value', 'Basis'], rows }
}

/** The assumptions register — every row with what supports it. */
function assumptionsSheet(ctx: ExportContext): Sheet {
  const rows = deriveAssumptions(ctx.steps, ctx.deliverable.answers, ctx.resources).map(a => [
    a.label,
    a.value ?? '',
    a.basis,
    a.locator ?? '',
    a.origin === 'answer' ? 'Scoping answer' : 'Attached source',
  ])
  return { name: 'Assumptions', columns: ['Assumption', 'Value', 'Basis', 'Locator', 'Origin'], rows }
}

/** The sources sheet — what the deliverable is built on, and where it came from. */
function sourcesSheet(ctx: ExportContext): Sheet {
  const rows = ctx.resources.map(r => [
    r.title,
    entityName(ctx.entities, r.entityId),
    resourceKindLabel(r.kind),
    formatPublished(r.published),
    r.url ?? '',
    r.sample ? 'Sample entry — replace with the document you relied on' : '',
  ])
  return {
    name: 'Sources',
    columns: ['Document', 'Publisher', 'Type', 'Published', 'Link', 'Note'],
    rows,
  }
}

/** The exhibit sheet for one export spec: real columns, blank values. */
function exhibitSheet(ctx: ExportContext, spec: ExportSpec): Sheet {
  if (spec.id === 'development-triangle') {
    const maturities = Array.from({ length: TRIANGLE_MATURITIES }, (_, i) => `${(i + 1) * 12} months`)
    return {
      name: spec.label,
      columns: ['Period', ...maturities],
      rows: periodRows(ctx).map(p => [p, ...maturities.map(() => null)]),
    }
  }

  if (spec.id === 'report-outline') {
    const kind = ctx.deliverable.answers['report-kind'] ?? ''
    const outline = REPORT_OUTLINES[kind] ?? []
    const sourceList = ctx.resources.map(r => r.title).join('; ')
    return {
      name: spec.label,
      columns: spec.columns,
      rows: outline.map(o => [o.section, o.covers, sourceList]),
    }
  }

  if (spec.id === 'documentation-index') {
    const kind = ctx.deliverable.answers['doc-kind'] ?? ''
    const items = DOCUMENTATION_ITEMS[kind] ?? []
    const sourceList = ctx.resources.map(r => r.title).join('; ')
    return {
      name: spec.label,
      columns: spec.columns,
      rows: items.map(i => [i.item, i.record, sourceList, null]),
    }
  }

  if (spec.perPeriod) {
    const trailing = spec.columns.length - 1
    return {
      name: spec.label,
      columns: spec.columns,
      rows: periodRows(ctx).map(p => [p, ...Array.from({ length: trailing }, () => null)]),
    }
  }

  if (spec.id === 'capital-summary') {
    // The components are the axes a capital test is built from; the numbers are
    // the reader's. Naming the rows is the part Cowork can do honestly.
    const components = ['Insurance risk', 'Market risk', 'Credit risk', 'Operational risk', 'Diversification credit', 'Total']
    return {
      name: spec.label,
      columns: spec.columns,
      rows: components.map(c => [c, null, null, null, '']),
    }
  }

  return { name: spec.label, columns: spec.columns, rows: [] }
}

/**
 * The workbook for one export: a cover, the exhibit, the assumptions register
 * and the sources. The assumptions export is its own exhibit, so it does not
 * get a second copy of itself.
 */
export function buildExportSheets(ctx: ExportContext, exportId: string): Sheet[] {
  const spec = exportSpec(exportId)
  if (!spec) return [coverSheet(ctx), sourcesSheet(ctx)]
  const sheets: Sheet[] = [coverSheet(ctx)]
  if (spec.id !== 'assumptions') sheets.push(exhibitSheet(ctx, spec))
  sheets.push(assumptionsSheet(ctx))
  sheets.push(sourcesSheet(ctx))
  return sheets
}

/** The single sheet a CSV export writes — the exhibit itself, nothing around it. */
export function buildExportCsvSheet(ctx: ExportContext, exportId: string): Sheet {
  const spec = exportSpec(exportId)
  if (!spec) return sourcesSheet(ctx)
  if (spec.id === 'assumptions') return assumptionsSheet(ctx)
  return exhibitSheet(ctx, spec)
}

/** A filesystem-safe name: `experience-summary-table-2026-09-20.xlsx`. */
export function exportFilename(title: string, spec: ExportSpec, asOf: Date, extension: string): string {
  const slug = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const day = asOf.toISOString().slice(0, 10)
  const name = [slug(title), slug(spec.label)].filter(Boolean).join('-') || 'cowork-export'
  return `${name}-${day}.${extension}`
}

/**
 * The exports this deliverable has earned, in catalogue order. An export is
 * offered only when a scoping answer opened it, so nothing is offered for a
 * deliverable whose scoping cannot fill it.
 */
export function availableExports(steps: WizardStep[], answers: Record<string, string>): ExportSpec[] {
  const ids = new Set<string>()
  for (const step of visibleSteps(steps, answers)) {
    const option = chosenOption(step, answers)
    for (const id of option?.exports ?? []) ids.add(id)
  }
  return [...ids].map(exportSpec).filter((s): s is ExportSpec => s !== null)
}
