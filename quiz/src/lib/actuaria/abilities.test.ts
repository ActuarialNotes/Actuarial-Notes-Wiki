import { describe, expect, it } from 'vitest'
import { ACTUARIA_ABILITIES, abilityDef } from '@/data/actuariaAbilities'
import { ABILITY_IDS } from '@/lib/battle'
import { findKeystone, keystoneExamKey } from '@/lib/keystone'
import { emptyRecord, type ConceptMasteryRecord, type MasteryState } from '@/lib/mastery'
import { abilityStatus, battleLoadout, toggleEquip } from './abilities'

const DAY = 24 * 60 * 60 * 1000
const NOW = new Date('2026-09-29T12:00:00Z')

function row(exam: string, concept: string, state: MasteryState, daysAgo = 1): ConceptMasteryRecord {
  return { ...emptyRecord('u', exam, concept), state, correct_count: 3, last_correct_at: new Date(NOW.getTime() - daysAgo * DAY).toISOString() }
}

describe('the abilities catalogue', () => {
  it('names every ability the engine knows, once', () => {
    expect(ACTUARIA_ABILITIES.map(a => a.id).sort()).toEqual([...ABILITY_IDS].sort())
  })

  it('unlocks each with a real keystone of the exam it names (§7.2)', () => {
    for (const a of ACTUARIA_ABILITIES) {
      if (a.id === 'reinsurance') {
        expect(a.keystone).toBeNull()
        continue
      }
      const match = findKeystone(a.keystone)
      expect(match, a.keystone ?? a.id).not.toBeNull()
      expect(keystoneExamKey(match!.examId)).toBe(keystoneExamKey(a.exam!))
    }
  })

  it('asks the levels the spec sets', () => {
    expect(abilityDef('bayesian-update')).toMatchObject({ keystone: 'Bayes Theorem', minLevel: 'level2' })
    expect(abilityDef('double-down')).toMatchObject({ keystone: 'Expected Value', minLevel: 'level2' })
    expect(abilityDef('time-value')).toMatchObject({ keystone: 'Present Value', minLevel: 'level2' })
    expect(abilityDef('immunization')).toMatchObject({ keystone: 'Immunization', minLevel: 'level3' })
  })
})

describe('unlocks', () => {
  const bayes = abilityDef('bayesian-update')!

  it('opens Reinsurance to everyone', () => {
    expect(abilityStatus(abilityDef('reinsurance')!, [], NOW)).toMatchObject({ unlocked: true, lapsed: false })
  })

  it('unlocks an ability while its keystone holds the level, on its own exam', () => {
    expect(abilityStatus(bayes, [row('P', 'Bayes Theorem', 'level2')], NOW).unlocked).toBe(true)
    expect(abilityStatus(bayes, [row('P', 'Bayes Theorem', 'level1')], NOW).unlocked).toBe(false)
    // Mastery of the concept on another exam isn't Exam P's keystone.
    expect(abilityStatus(bayes, [row('MAS-I', 'Bayes Theorem', 'level3')], NOW).unlocked).toBe(false)
  })

  it('locks it again when decay takes the keystone below the level — “Requirement lapsed”', () => {
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
