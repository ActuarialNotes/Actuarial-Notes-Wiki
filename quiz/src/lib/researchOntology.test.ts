import { describe, it, expect } from 'vitest'
import {
  agentMeta,
  authoritativeAgents,
  agentRelationship,
  normalizeExamTag,
  examTagsForDocument,
} from './researchOntology'

describe('agentMeta', () => {
  it('resolves a known agent', () => {
    expect(agentMeta('osfi')?.shortName).toBe('OSFI')
    expect(agentMeta('intact-financial')?.type).toBe('federally_incorporated_insurer')
  })

  it('returns undefined for an unknown agent', () => {
    expect(agentMeta('not-a-real-agent')).toBeUndefined()
  })
})

describe('authoritativeAgents', () => {
  it('finds solvency regulators', () => {
    expect(authoritativeAgents('solvency')).toEqual(['osfi'])
  })

  it('finds product regulators across provinces', () => {
    const agents = authoritativeAgents('product_regulation')
    expect(agents).toContain('fsra')
    expect(agents).toContain('airb')
    expect(agents).toContain('icbc')
  })

  it('finds statistics bureaus', () => {
    expect(authoritativeAgents('statistics')).toEqual(expect.arrayContaining(['ibc', 'gisa']))
  })
})

describe('agentRelationship', () => {
  it('relates the federal regulator to a federally incorporated insurer', () => {
    expect(agentRelationship('osfi', 'intact-financial')).toBe('regulates')
    expect(agentRelationship('intact-financial', 'osfi')).toBe('regulates')
  })

  it('relates a provincial regulator to insurers operating in its province', () => {
    expect(agentRelationship('fsra', 'intact-financial')).toBe('regulates')
  })

  it('does not relate a provincial regulator to insurers outside its province', () => {
    // AIRB (Alberta-only) has no overlap with Desjardins (ON/QC only)
    expect(agentRelationship('airb', 'desjardins-general')).toBeNull()
  })

  it('relates an industry bureau to insurers as statistical members', () => {
    expect(agentRelationship('ibc', 'intact-financial')).toBe('statistical_member_of')
  })

  it('returns null between two regulators or two insurers', () => {
    expect(agentRelationship('osfi', 'fsra')).toBeNull()
    expect(agentRelationship('intact-financial', 'aviva-canada')).toBeNull()
  })

  it('returns null for unknown agents or self-comparison', () => {
    expect(agentRelationship('osfi', 'osfi')).toBeNull()
    expect(agentRelationship('osfi', 'not-a-real-agent')).toBeNull()
  })
})

describe('normalizeExamTag', () => {
  it('folds AI-generated variants onto the canonical wiki exam id', () => {
    expect(normalizeExamTag('exam-6c-cas')).toBe('6c-1')
    expect(normalizeExamTag('Exam 6C (CAS)')).toBe('6c-1')
    expect(normalizeExamTag('exam-5-cas')).toBe('5-1')
    expect(normalizeExamTag('P-1')).toBe('p-1')
  })

  it('appends the -1 suffix only when the cleaned tag has no dash', () => {
    expect(normalizeExamTag('exam-p')).toBe('p-1')
    expect(normalizeExamTag('exam-mas-i')).toBe('mas-i')
  })

  it('returns null for empty input', () => {
    expect(normalizeExamTag('   ')).toBeNull()
  })
})

describe('examTagsForDocument', () => {
  it('normalizes and deduplicates tags', () => {
    const doc = { agentId: 'osfi', examTags: ['exam-6c-cas', 'Exam 6C (CAS)', 'exam-5-cas'] }
    expect(examTagsForDocument(doc)).toEqual(['6c-1', '5-1'])
  })

  it('handles missing exam tags', () => {
    expect(examTagsForDocument({ agentId: 'osfi' })).toEqual([])
    expect(examTagsForDocument({ agentId: 'osfi', examTags: null })).toEqual([])
  })
})
