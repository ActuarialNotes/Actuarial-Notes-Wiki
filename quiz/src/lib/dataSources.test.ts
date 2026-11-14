import { describe, expect, it } from 'vitest'
import { DATA_SECTIONS, LEGACY_SECTIONS, assumptionSetPath, dataSection, publisherPath, resourceTablePath } from './dataSources'
import { decodeRunInput } from './tools/share'
import { TOOLS, toolBySlug, toolPath, toolSlug } from './tools'
import { COWORK_ENTITIES, COWORK_RESOURCES } from '@/data/coworkSources'

describe('Data Sources addresses', () => {
  it('reads a section off its segment, and the bare page as Assumptions', () => {
    expect(dataSection(undefined)).toBe('assumptions')
    expect(dataSection('sources')).toBe('sources')
    expect(dataSection('documents')).toBe('documents')
    expect(dataSection('assumptions')).toBeNull()
    expect(dataSection('osfi')).toBeNull()
  })

  it('lists the three sections in the chain’s order', () => {
    expect(DATA_SECTIONS.map(s => s.label)).toEqual(['Assumptions', 'Sources', 'Documents'])
  })

  it('puts every published table under /data-sources and every calculator under /tools', () => {
    for (const t of TOOLS) {
      expect(toolPath(t)).toBe(t.area === 'data' ? `/data-sources/${toolSlug(t)}` : `/tools/${toolSlug(t)}`)
    }
  })

  it('never lets a section, an old section, a table and a publisher share a segment', () => {
    const segments = [
      ...DATA_SECTIONS.map(s => s.to.split('/')[2]).filter(Boolean),
      ...Object.keys(LEGACY_SECTIONS),
      ...TOOLS.filter(t => t.area === 'data').map(toolSlug),
      ...COWORK_ENTITIES.map(e => publisherPath(e.id).split('/')[2]),
    ]
    expect(new Set(segments).size).toBe(segments.length)
  })

  it('sends every old section to a section that exists', () => {
    for (const to of Object.values(LEGACY_SECTIONS)) expect(DATA_SECTIONS.some(s => s.to === to)).toBe(true)
  })

  it('makes every published table a document, under its publisher', () => {
    const tables = TOOLS.filter(t => t.area === 'data').map(toolSlug)
    const read = new Set(COWORK_RESOURCES.flatMap(r => (r.tool ? [r.tool.slug] : [])))
    expect([...read].sort()).toEqual([...tables].sort())
  })

  it('opens a data document’s table on a choice that table offers', () => {
    for (const r of COWORK_RESOURCES.filter(r => r.tool)) {
      const spec = toolBySlug(r.tool!.slug)
      expect(spec?.area, r.id).toBe('data')
      const path = resourceTablePath(r.tool!)
      expect(path.startsWith(`/data-sources/${r.tool!.slug}`)).toBe(true)
      for (const [key, value] of Object.entries(r.tool!.input ?? {})) {
        const field = spec!.fields.find(f => f.key === key)
        expect(field?.kind, `${r.id}: ${key}`).toBe('choice')
        const options = field && 'options' in field ? (field.options as { value: string }[]) : []
        expect(options.map(o => o.value), `${r.id}: ${key}`).toContain(value)
      }
      if (r.tool!.input) expect(decodeRunInput(path.split('#')[1] ?? '')).toEqual(r.tool!.input)
    }
  })

  it('narrows the Assumptions section to one set', () => {
    expect(assumptionSetPath('OSFI MCT Capital Ratios (2024)')).toBe('/data-sources?set=OSFI%20MCT%20Capital%20Ratios%20(2024)')
  })
})
