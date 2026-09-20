import { describe, it, expect } from 'vitest'
import {
  availableExports,
  buildExportCsvSheet,
  buildExportSheets,
  exportFilename,
  type ExportContext,
} from './coworkExport'
import { stepsFor } from '@/data/coworkDeliverables'
import { exportSpec } from '@/data/coworkDeliverables'
import type { Deliverable } from './coworkDeliverables'
import type { SourceEntity, SourceResource } from './coworkSources'

const AS_OF = new Date('2026-09-20T00:00:00Z')

const ENTITY: SourceEntity = {
  id: 'osfi',
  name: 'Office of the Superintendent of Financial Institutions',
  short: 'OSFI',
  category: 'regulator',
  jurisdiction: 'Canada (federal)',
  about: '',
  practiceAreas: ['pc'],
}

const SAMPLE: SourceResource = {
  id: 'gisa',
  entityId: 'osfi',
  title: 'Automobile statistical exhibits',
  kind: 'dataset',
  published: null,
  summary: '',
  sample: true,
  practiceAreas: ['pc'],
  functions: ['pricing'],
  assumptions: [{ label: 'Benchmark development', locator: 'Industry exhibit' }],
}

function analysis(answers: Record<string, string>, resourceIds: string[] = []): ExportContext {
  const deliverable: Deliverable = {
    id: 'd1',
    title: 'Ontario personal auto indication',
    type: 'analysis',
    answers,
    resourceIds,
    createdAt: 0,
    updatedAt: 0,
  }
  return {
    deliverable,
    steps: stepsFor('analysis'),
    resources: resourceIds.length ? [SAMPLE] : [],
    entities: [ENTITY],
    asOf: AS_OF,
  }
}

const SCOPED = {
  practice: 'pc',
  question: 'rate-indication',
  line: 'personal-auto',
  jurisdiction: 'ontario',
  period: 'ay5',
  audience: 'regulator',
}

describe('availableExports', () => {
  it('offers nothing before the flow has been answered', () => {
    expect(availableExports(stepsFor('analysis'), {})).toHaveLength(0)
  })

  it('offers what the chosen analysis earns', () => {
    const ids = availableExports(stepsFor('analysis'), SCOPED).map(e => e.id)
    expect(ids).toContain('experience-summary')
    expect(ids).toContain('rate-indication')
    expect(ids).toContain('assumptions')
  })

  it('does not offer a reserving exhibit to a pricing analysis', () => {
    const ids = availableExports(stepsFor('analysis'), SCOPED).map(e => e.id)
    expect(ids).not.toContain('development-triangle')
  })
})

describe('buildExportSheets', () => {
  it('writes a cover, the exhibit, the assumptions and the sources', () => {
    const sheets = buildExportSheets(analysis(SCOPED), 'experience-summary')
    expect(sheets.map(s => s.name)).toEqual([
      'Cover',
      'Experience Summary Table',
      'Assumptions',
      'Sources',
    ])
  })

  it('does not repeat the assumptions register as its own exhibit', () => {
    const sheets = buildExportSheets(analysis(SCOPED), 'assumptions')
    expect(sheets.filter(s => s.name === 'Assumptions')).toHaveLength(1)
  })

  it('gives the exhibit one row per period, newest last', () => {
    const [, exhibit] = buildExportSheets(analysis(SCOPED), 'experience-summary')
    expect(exhibit.rows.map(r => r[0])).toEqual(['2021', '2022', '2023', '2024', '2025'])
  })

  it('leaves every value cell empty — Cowork holds no experience data', () => {
    const [, exhibit] = buildExportSheets(analysis(SCOPED), 'experience-summary')
    for (const row of exhibit.rows) {
      expect(row.slice(1).every(cell => cell === null)).toBe(true)
    }
  })

  it('gives the exhibit as many columns as the spec declares', () => {
    const [, exhibit] = buildExportSheets(analysis(SCOPED), 'experience-summary')
    expect(exhibit.columns).toEqual(exportSpec('experience-summary')!.columns)
    expect(exhibit.rows[0]).toHaveLength(exhibit.columns!.length)
  })

  it('records the scoping answers on the cover', () => {
    const [cover] = buildExportSheets(analysis(SCOPED), 'experience-summary')
    const flat = cover.rows.map(r => r.join(' | ')).join('\n')
    expect(flat).toContain('Ontario personal auto indication')
    expect(flat).toContain('Personal automobile')
    expect(flat).toContain('Regulator')
  })

  it('carries every assumption with its basis and origin', () => {
    const sheets = buildExportSheets(analysis(SCOPED, ['gisa']), 'experience-summary')
    const assumptions = sheets.find(s => s.name === 'Assumptions')!
    const labels = assumptions.rows.map(r => r[0])
    expect(labels).toContain('Indication method')
    expect(labels).toContain('Benchmark development')
    const sourceRow = assumptions.rows.find(r => r[0] === 'Benchmark development')!
    expect(sourceRow[2]).toBe('Automobile statistical exhibits')
    expect(sourceRow[4]).toBe('Attached source')
  })

  it('flags a sample source on the sources sheet rather than passing it off as real', () => {
    const sheets = buildExportSheets(analysis(SCOPED, ['gisa']), 'experience-summary')
    const sources = sheets.find(s => s.name === 'Sources')!
    expect(sources.rows[0][3]).toBe('Undated')
    expect(String(sources.rows[0][5])).toMatch(/Sample entry/)
  })

  it('builds a development triangle as periods by maturity', () => {
    const ctx = analysis({ ...SCOPED, question: 'unpaid-claims' })
    const [, exhibit] = buildExportSheets(ctx, 'development-triangle')
    expect(exhibit.columns![0]).toBe('Period')
    expect(exhibit.columns![1]).toBe('12 months')
    expect(exhibit.rows).toHaveLength(5)
  })

  it('builds a report outline from the report kind', () => {
    const ctx: ExportContext = {
      deliverable: {
        id: 'r1',
        title: 'AA report',
        type: 'report',
        answers: { practice: 'pc', 'report-kind': 'appointed-actuary', driver: 'regulation', audience: 'regulator' },
        resourceIds: [],
        createdAt: 0,
        updatedAt: 0,
      },
      steps: stepsFor('report'),
      resources: [],
      entities: [ENTITY],
      asOf: AS_OF,
    }
    const [, outline] = buildExportSheets(ctx, 'report-outline')
    expect(outline.rows.map(r => r[0])).toContain('Opinion')
  })

  it('falls back to a cover and sources for an export id it does not know', () => {
    const sheets = buildExportSheets(analysis(SCOPED), 'not-a-real-export')
    expect(sheets.map(s => s.name)).toEqual(['Cover', 'Sources'])
  })
})

describe('buildExportCsvSheet', () => {
  it('writes the exhibit alone, with nothing around it', () => {
    const sheet = buildExportCsvSheet(analysis(SCOPED), 'experience-summary')
    expect(sheet.name).toBe('Experience Summary Table')
    expect(sheet.rows).toHaveLength(5)
  })
})

describe('exportFilename', () => {
  it('slugs the deliverable and the exhibit, and dates the file', () => {
    const spec = exportSpec('experience-summary')!
    expect(exportFilename('Ontario personal auto indication', spec, AS_OF, 'xlsx')).toBe(
      'ontario-personal-auto-indication-experience-summary-table-2026-09-20.xlsx',
    )
  })

  it('still produces a name for an untitled deliverable', () => {
    const spec = exportSpec('assumptions')!
    expect(exportFilename('', spec, AS_OF, 'csv')).toBe('assumptions-register-2026-09-20.csv')
  })
})
