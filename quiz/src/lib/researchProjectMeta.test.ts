import { describe, it, expect } from 'vitest'
import {
  ARTIFACT_TYPES,
  DOCUMENT_SUBTYPES,
  MODEL_SUBTYPES,
  subtypesForArtifact,
  subtypeMeta,
  projectTypeLabel,
  projectSections,
  sectionTemplate,
  suggestProjectName,
  effectiveSections,
  makeSectionKey,
  MODEL_OUTPUTS,
  CODE_LANGUAGES,
} from './researchProjectMeta'

describe('artifact types and subtypes', () => {
  it('offers Document and Model as the two artifact types', () => {
    expect(ARTIFACT_TYPES.map(t => t.slug)).toEqual(['document', 'model'])
    for (const t of ARTIFACT_TYPES) expect(t.icon).toBeTruthy()
  })

  it('scopes subtype options to the chosen artifact type', () => {
    expect(subtypesForArtifact('document')).toBe(DOCUMENT_SUBTYPES)
    expect(subtypesForArtifact('model')).toBe(MODEL_SUBTYPES)
    // Unknown / null defaults to document subtypes.
    expect(subtypesForArtifact(null)).toBe(DOCUMENT_SUBTYPES)
  })

  it('lists the requested document and model subtypes, each with an icon', () => {
    expect(DOCUMENT_SUBTYPES.map(s => s.slug)).toEqual(['report', 'filing', 'memo', 'presentation'])
    expect(MODEL_SUBTYPES.map(s => s.slug)).toEqual(['reserving', 'pricing', 'valuation_cash_flow', 'risk_capital'])
    for (const s of [...DOCUMENT_SUBTYPES, ...MODEL_SUBTYPES]) expect(s.icon).toBeTruthy()
  })

  it('resolves a readable type label from a subtype or a legacy document type', () => {
    expect(projectTypeLabel('filing')).toBe('Filing')
    expect(projectTypeLabel('reserving')).toBe('Reserving')
    expect(projectTypeLabel('research_report')).toBe('Research Report') // legacy
    expect(projectTypeLabel(null)).toBeUndefined()
    expect(subtypeMeta('pricing')?.label).toBe('Pricing')
  })
})

describe('section structure', () => {
  it('gives a document the outline for its subtype', () => {
    const reportSections = projectSections('document', 'report').map(s => s.title)
    expect(reportSections[0]).toBe('Introduction')
    expect(reportSections).toContain('Literature Review')
    expect(reportSections).toContain('Methodology')

    const filingSections = projectSections('document', 'filing').map(s => s.title)
    expect(filingSections).toContain('Rate Indication')
  })

  it('falls back to the report outline for an unknown document subtype', () => {
    expect(projectSections('document', 'mystery').map(s => s.key))
      .toEqual(projectSections('document', 'report').map(s => s.key))
  })

  it('gives every model the seven-step workflow regardless of subtype', () => {
    const expected = ['Purpose and Scope', 'Data', 'Assumptions', 'Model', 'Test', 'Implement', 'Monitor']
    expect(projectSections('model', 'reserving').map(s => s.title)).toEqual(expected)
    expect(projectSections('model', 'pricing').map(s => s.title)).toEqual(expected)
  })

  it('gives model sections design-decision subsections', () => {
    const data = sectionTemplate('model', 'pricing', 'data')
    expect(data?.subsections.map(s => s.title)).toContain('Data sources')
    expect(sectionTemplate('model', 'pricing', 'model')?.subsections.length).toBeGreaterThan(0)
  })
})

describe('suggestProjectName', () => {
  it('builds a name from region, line of business, and subtype', () => {
    expect(suggestProjectName({
      artifactType: 'document', subtype: 'filing', region: 'ON', lineOfBusiness: 'personal_auto',
    })).toBe('ON Personal Auto Filing')
  })

  it('appends "Model" for a model artifact', () => {
    expect(suggestProjectName({
      artifactType: 'model', subtype: 'pricing', region: 'AB', lineOfBusiness: 'personal_auto',
    })).toBe('AB Personal Auto Pricing Model')
  })

  it('omits parts that were not chosen', () => {
    expect(suggestProjectName({
      artifactType: 'document', subtype: 'report', region: null, lineOfBusiness: null,
    })).toBe('Report')
    expect(suggestProjectName({
      artifactType: null, subtype: null, region: null, lineOfBusiness: null,
    })).toBe('')
  })
})

describe('editable sections', () => {
  it('falls back to the template when the project has no custom sections', () => {
    const fromTemplate = effectiveSections({ artifactType: 'model', documentType: 'pricing', sections: null })
    expect(fromTemplate.map(s => s.title)[0]).toBe('Purpose and Scope')
    // Returns a mutable copy, not the frozen template array.
    expect(() => fromTemplate.push({ key: 'x', title: 'X', hint: '', subsections: [] })).not.toThrow()
  })

  it('uses the project\'s edited sections when present', () => {
    const custom = [{ key: 'one', title: 'One', hint: '', subsections: [] }]
    expect(effectiveSections({ artifactType: 'document', documentType: 'report', sections: custom }))
      .toEqual(custom)
  })

  it('makes a unique slug for a new section', () => {
    expect(makeSectionKey('Risk Appetite', [])).toBe('risk_appetite')
    expect(makeSectionKey('Data', ['data'])).toBe('data_2')
    expect(makeSectionKey('Data', ['data', 'data_2'])).toBe('data_3')
  })
})

describe('model outputs', () => {
  it('offers Documentation and Code, with R / Python / Excel languages', () => {
    expect(MODEL_OUTPUTS.map(o => o.slug)).toEqual(['documentation', 'code'])
    expect(CODE_LANGUAGES.map(l => l.slug)).toEqual(['r', 'python', 'excel'])
  })
})
