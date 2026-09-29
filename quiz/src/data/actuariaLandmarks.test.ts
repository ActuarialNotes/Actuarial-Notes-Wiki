import { describe, expect, it } from 'vitest'
import { findKeystone, keystoneExamKey } from '@/lib/keystone'
import { ACTUARIA_LANDMARKS, landmarkName } from './actuariaLandmarks'

describe('Actuaria landmark names', () => {
  it('names only real keystones, each on the exam it is a keystone for (§6.4)', () => {
    for (const landmark of ACTUARIA_LANDMARKS) {
      const match = findKeystone(landmark.concept)
      expect(match, landmark.concept).not.toBeNull()
      expect(keystoneExamKey(match!.examId)).toBe(keystoneExamKey(landmark.exam))
    }
  })

  it('gives each keystone one name, and each name to one keystone', () => {
    const concepts = ACTUARIA_LANDMARKS.map(l => l.concept.toLowerCase())
    const names = ACTUARIA_LANDMARKS.map(l => l.name.toLowerCase())
    expect(new Set(concepts).size).toBe(concepts.length)
    expect(new Set(names).size).toBe(names.length)
  })

  it('looks a name up by concept, alias target included', () => {
    expect(landmarkName('Bayes Theorem')).toBe('Bayes Outpost')
    expect(landmarkName({ name: 'PV', target: 'Present Value' })).toBe('Present Value Harbor')
    expect(landmarkName({ name: 'Variance' })).toBeNull()
  })
})
