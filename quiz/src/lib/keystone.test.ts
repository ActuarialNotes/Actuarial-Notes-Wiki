import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  allKeystones,
  findKeystone,
  isKeystone,
  keystoneKey,
  keystoneProgress,
  keystonesForExam,
} from './keystone'
import { KEYSTONE_EXAMS } from '@/data/keystoneConcepts'
import { buildMasteryLookup } from './conceptMatch'
import type { ConceptMasteryRecord, MasteryState } from './mastery'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(HERE, '../../..')

// The syllabus page each exam's keystones must actually appear on.
const SYLLABUS_FILE: Record<string, string> = {
  'P': 'Exam P-1 (SOA).md',
  'FM': 'Exam FM-2 (SOA).md',
  'MAS-I': 'Exam MAS-I (CAS).md',
  'MAS-II': 'Exam MAS-II (CAS).md',
  '5': 'Exam 5 (CAS).md',
}

function record(slug: string, state: MasteryState, daysAgo = 0): ConceptMasteryRecord {
  const last = new Date(Date.UTC(2026, 0, 20) - daysAgo * 86_400_000).toISOString()
  return {
    user_id: 'u',
    exam_id: 'FM',
    concept_slug: slug,
    state,
    correct_count: 1,
    incorrect_streak: 0,
    hard_correct_count: 0,
    last_correct_at: last,
    last_attempted_at: last,
  }
}

describe('keystoneKey', () => {
  it('normalises the shapes a concept reference arrives in', () => {
    expect(keystoneKey('Bayes Theorem')).toBe('bayes theorem')
    expect(keystoneKey('Concepts/Bayes+Theorem')).toBe('bayes theorem')
    expect(keystoneKey('Concepts/Bayes Theorem.md')).toBe('bayes theorem')
    expect(keystoneKey('  BAYES   THEOREM ')).toBe('bayes theorem')
  })
})

describe('findKeystone', () => {
  it('resolves a keystone by name, path and file name', () => {
    for (const ref of ['Bayes Theorem', 'Concepts/Bayes+Theorem', 'Concepts/Bayes Theorem.md', 'bayes theorem']) {
      expect(findKeystone(ref)?.concept.name).toBe('Bayes Theorem')
    }
  })

  it('reports the exam a concept is a keystone for', () => {
    const match = findKeystone('Chain Ladder Method')
    expect(match?.examId).toBe('5')
    expect(match?.examLabel).toBe('Exam 5')
  })

  it('falls back to the raw target for an aliased syllabus link', () => {
    // `[[Bond Price|Price]]` parses to name "Price", target "Bond Price".
    expect(findKeystone({ name: 'Price', target: 'Bond Price' })?.concept.name).toBe('Bond Price')
  })

  it('does not fuzzy-match — a near miss misses', () => {
    expect(findKeystone('Bayes')).toBeNull()
    expect(findKeystone('Conditional Variance')).toBeNull()
    expect(findKeystone('Expected Value of a Perpetuity')).toBeNull()
    expect(findKeystone('')).toBeNull()
    expect(findKeystone(null)).toBeNull()
    expect(isKeystone('Venn Diagram')).toBe(false)
  })
})

describe('the catalogue', () => {
  it('stays rare — no exam may pad its keystone list', () => {
    for (const exam of KEYSTONE_EXAMS) {
      expect(exam.concepts.length).toBeGreaterThanOrEqual(8)
      expect(exam.concepts.length).toBeLessThanOrEqual(15)
    }
  })

  it('claims each concept for exactly one exam (the index is keyed globally)', () => {
    const names = KEYSTONE_EXAMS.flatMap(e => e.concepts.map(c => keystoneKey(c.name)))
    expect(new Set(names).size).toBe(names.length)
    expect(allKeystones().length).toBe(names.length)
  })

  it('gives every keystone a reason that is a sentence, not a definition', () => {
    for (const { concept } of allKeystones()) {
      expect(concept.why.length).toBeGreaterThan(40)
      // The `why` explains what leans on the concept — it must not just open by
      // restating the concept's own name the way a definition would.
      expect(concept.why.toLowerCase().startsWith(concept.name.toLowerCase())).toBe(false)
    }
  })

  it('points only at concept pages that exist in the vault', () => {
    for (const { concept } of allKeystones()) {
      const file = path.join(REPO_ROOT, 'Concepts', `${concept.name}.md`)
      expect(existsSync(file), `missing Concepts/${concept.name}.md`).toBe(true)
    }
  })

  it('only marks concepts that are actually on their exam syllabus', () => {
    for (const exam of KEYSTONE_EXAMS) {
      const file = SYLLABUS_FILE[exam.id]
      expect(file, `no syllabus mapped for exam ${exam.id}`).toBeTruthy()
      const syllabus = readFileSync(path.join(REPO_ROOT, file!), 'utf-8')
      const linked = new Set(
        [...syllabus.matchAll(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g)].map(m => keystoneKey(m[1]!)),
      )
      for (const concept of exam.concepts) {
        expect(linked.has(keystoneKey(concept.name)), `${concept.name} is not linked on ${file}`).toBe(true)
      }
    }
  })
})

describe('keystonesForExam', () => {
  it('returns the authored order and nothing for an unknown exam', () => {
    expect(keystonesForExam('P')[0]!.name).toBe('Axioms of Probability')
    expect(keystonesForExam('nope')).toEqual([])
  })

  it('accepts a CAS exam under either key — the catalogue id or the progress key', () => {
    // `wikiExamIdToProgressKey('5')` is 'CAS-5'; the catalogue authors it as '5'.
    // The readiness score and the study plan hold the progress key.
    expect(keystonesForExam('CAS-5')).toEqual(keystonesForExam('5'))
    expect(keystonesForExam('CAS-5').length).toBeGreaterThan(0)
    expect(keystonesForExam('CAS-9')).toEqual([])
  })
})

describe('keystoneProgress', () => {
  const now = new Date(Date.UTC(2026, 0, 20))

  it('counts an empty history as all-new', () => {
    const p = keystoneProgress('FM', buildMasteryLookup([]), now)
    expect(p.total).toBe(keystonesForExam('FM').length)
    expect(p.mastered).toBe(0)
    expect(p.started).toBe(0)
    expect(p.forgotten).toBe(0)
    expect(p.entries.every(e => e.state === 'new')).toBe(true)
  })

  it('rolls up mastered / started / forgotten', () => {
    const lookup = buildMasteryLookup([
      record('Present Value', 'level3'),
      record('Annuity Immediate', 'level1'),
      record('Bond Price', 'forgotten'),
    ])
    const p = keystoneProgress('FM', lookup, now)
    expect(p.mastered).toBe(1)
    expect(p.started).toBe(2)   // level3 + level1
    expect(p.forgotten).toBe(1)
  })

  it('decays a stale record at read time', () => {
    // Level 3 untouched for well past the decay window drops a rung.
    const lookup = buildMasteryLookup([record('Present Value', 'level3', 45)])
    const p = keystoneProgress('FM', lookup, now)
    expect(p.mastered).toBe(0)
    expect(p.started).toBe(1)
  })

  it('ignores mastery for concepts that are not keystones of that exam', () => {
    const lookup = buildMasteryLookup([record('Venn Diagram', 'level3')])
    expect(keystoneProgress('P', lookup, now).mastered).toBe(0)
  })
})
