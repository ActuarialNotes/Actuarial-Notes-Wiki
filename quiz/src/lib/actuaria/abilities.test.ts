import { describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import examPages from 'virtual:exam-pages'
import { parseExamMetadata, parseExamSyllabus, wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { ACTUARIA_ABILITIES, abilityDef } from '@/data/actuariaAbilities'
import { ABILITY_IDS } from '@/lib/battle'
import { emptyRecord, type ConceptMasteryRecord, type MasteryState } from '@/lib/mastery'
import { abilityStatus, battleLoadout, toggleEquip } from './abilities'

const DAY = 24 * 60 * 60 * 1000
const NOW = new Date('2026-09-29T12:00:00Z')

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..')

/** The concept pages an exam's syllabus links, lowercased. */
function syllabusConcepts(examKey: string): Set<string> {
  for (const [file, text] of Object.entries(examPages)) {
    const meta = parseExamMetadata(text)
    if (!meta || wikiExamIdToProgressKey(meta.examId) !== examKey) continue
    const syllabus = parseExamSyllabus(text, meta.examId, meta.examLabel, meta.examTopic, file.replace(/\.md$/, ''))
    return new Set(syllabus.topics.flatMap(t => t.concepts.map(c => c.name.toLowerCase())))
  }
  return new Set()
}

function row(exam: string, concept: string, state: MasteryState, daysAgo = 1): ConceptMasteryRecord {
  return { ...emptyRecord('u', exam, concept), state, correct_count: 3, last_correct_at: new Date(NOW.getTime() - daysAgo * DAY).toISOString() }
}

describe('the abilities catalogue', () => {
  it('names every ability the engine knows, once', () => {
    expect(ACTUARIA_ABILITIES.map(a => a.id).sort()).toEqual([...ABILITY_IDS].sort())
  })

  it('unlocks each with a real concept on the syllabus of the exam it names (§7.2)', () => {
    for (const a of ACTUARIA_ABILITIES) {
      if (a.id === 'reinsurance') {
        expect(a.concept).toBeNull()
        continue
      }
      expect(existsSync(path.join(REPO_ROOT, 'Concepts', `${a.concept}.md`)), `no page for ${a.concept}`).toBe(true)
      expect(syllabusConcepts(a.exam!).has(a.concept!.toLowerCase()), `${a.concept} is not on the ${a.exam} syllabus`).toBe(true)
    }
  })

  it('asks the levels the spec sets', () => {
    expect(abilityDef('bayesian-update')).toMatchObject({ concept: 'Bayes Theorem', minLevel: 'level2' })
    expect(abilityDef('double-down')).toMatchObject({ concept: 'Expected Value', minLevel: 'level2' })
    expect(abilityDef('time-value')).toMatchObject({ concept: 'Present Value', minLevel: 'level2' })
    expect(abilityDef('immunization')).toMatchObject({ concept: 'Immunization', minLevel: 'level3' })
  })
})

describe('unlocks', () => {
  const bayes = abilityDef('bayesian-update')!

  it('opens Reinsurance to everyone', () => {
    expect(abilityStatus(abilityDef('reinsurance')!, [], NOW)).toMatchObject({ unlocked: true, lapsed: false })
  })

  it('unlocks an ability while its concept holds the level, on its own exam', () => {
    expect(abilityStatus(bayes, [row('P', 'Bayes Theorem', 'level2')], NOW).unlocked).toBe(true)
    expect(abilityStatus(bayes, [row('P', 'Bayes Theorem', 'level1')], NOW).unlocked).toBe(false)
    // Mastery of the concept on another exam doesn't count for Exam P's ability.
    expect(abilityStatus(bayes, [row('MAS-I', 'Bayes Theorem', 'level3')], NOW).unlocked).toBe(false)
  })

  it('locks it again when decay takes the concept below the level — “Requirement lapsed”', () => {
    // Level 2, last right 20 days ago: decayed to Level 1.
    const status = abilityStatus(bayes, [row('P', 'Bayes Theorem', 'level2', 20)], NOW)
    expect(status).toMatchObject({ unlocked: false, state: 'level1', lapsed: true })
  })

  it('takes into a battle only what is equipped and unlocked now', () => {
    const records = [row('P', 'Bayes Theorem', 'level2'), row('FM', 'Present Value', 'level1')]
    expect(battleLoadout(['bayesian-update', 'time-value', 'reinsurance'], records, NOW)).toEqual(['bayesian-update', 'reinsurance'])
  })

  it('equips up to three, and never a locked one', () => {
    expect(toggleEquip(['reinsurance'], 'double-down', true)).toEqual(['reinsurance', 'double-down'])
    expect(toggleEquip(['reinsurance', 'double-down'], 'double-down', true)).toEqual(['reinsurance'])
    expect(toggleEquip(['reinsurance'], 'immunization', false)).toEqual(['reinsurance'])
    expect(toggleEquip(['reinsurance', 'double-down', 'time-value'], 'immunization', true)).toEqual(['reinsurance', 'double-down', 'time-value'])
  })
})
