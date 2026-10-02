import { describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import examPages from 'virtual:exam-pages'
import { parseExamMetadata, parseExamSyllabus, wikiExamIdToProgressKey } from '@/lib/wikiParser'
import { ACTUARIA_LANDMARKS, landmarkName } from './actuariaLandmarks'

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')

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

describe('Actuaria landmark names', () => {
  it('names only real concepts, each on the syllabus of the exam named (§6.4)', () => {
    for (const landmark of ACTUARIA_LANDMARKS) {
      expect(existsSync(path.join(REPO_ROOT, 'Concepts', `${landmark.concept}.md`)), `no page for ${landmark.concept}`).toBe(true)
      expect(syllabusConcepts(landmark.exam).has(landmark.concept.toLowerCase()), `${landmark.concept} is not on the ${landmark.exam} syllabus`).toBe(true)
    }
  })

  it('gives each concept one name, and each name to one concept', () => {
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
