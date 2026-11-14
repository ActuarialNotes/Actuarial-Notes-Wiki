import { describe, expect, it } from 'vitest'
import { DATA_SECTIONS, dataSection, publisherPath } from './dataSources'
import { TOOLS, toolPath, toolSlug } from './tools'
import { COWORK_ENTITIES } from '@/data/coworkSources'

describe('Data Sources addresses', () => {
  it('reads a section off its segment, and the bare page as Tables', () => {
    expect(dataSection(undefined)).toBe('tables')
    expect(dataSection('assumptions')).toBe('assumptions')
    expect(dataSection('publishers')).toBe('publishers')
    expect(dataSection('documents')).toBe('documents')
    expect(dataSection('tables')).toBeNull()
    expect(dataSection('osfi')).toBeNull()
  })

  it('puts every published table under /data-sources and every calculator under /tools', () => {
    for (const t of TOOLS) {
      expect(toolPath(t)).toBe(t.area === 'data' ? `/data-sources/${toolSlug(t)}` : `/tools/${toolSlug(t)}`)
    }
  })

  it('never lets a section, a table and a publisher share a segment', () => {
    const segments = [
      ...DATA_SECTIONS.map(s => s.to.split('/')[2]).filter(Boolean),
      ...TOOLS.filter(t => t.area === 'data').map(toolSlug),
      ...COWORK_ENTITIES.map(e => publisherPath(e.id).split('/')[2]),
    ]
    expect(new Set(segments).size).toBe(segments.length)
  })
})
