import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseExamSyllabus } from './wikiParser'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(HERE, '../../..')

function syllabus(file: string, examId: string, examTopic: string) {
  const content = readFileSync(path.join(REPO_ROOT, file), 'utf-8')
  return parseExamSyllabus(content, examId, 'Exam', examTopic)
}

describe('parseExamSyllabus resources handling', () => {
  const p = syllabus('Exam P-1 (SOA).md', 'P-1', 'Probability')

  it('keeps learning objectives as topics, excluding the source-material callout', () => {
    expect(p.topics.map(t => t.name)).toEqual([
      'General Probability',
      'Univariate Random Variables',
      'Multivariate Random Variables',
    ])
  })

  it('does not fold source-material books into the last objective', () => {
    const lastTopicConcepts = p.topics[p.topics.length - 1].concepts.map(c => c.name)
    expect(lastTopicConcepts.some(n => /Ross - 2019|Hassett|Wackerly/.test(n))).toBe(false)
  })

  it('collects source-material books as resources', () => {
    expect(p.resources.map(r => r.name)).toContain('A First Course in Probability (Ross - 2019)')
    expect(p.resources.length).toBeGreaterThanOrEqual(5)
  })

  it('parses FM resources from the [!answer] table too', () => {
    const fm = syllabus('Exam FM-2 (SOA).md', 'FM-2', 'Financial Mathematics')
    expect(fm.topics.map(t => t.name)).toContain('General Cash Flows, Portfolios, and Asset Liability Management')
    expect(fm.resources.length).toBeGreaterThanOrEqual(5)
  })
})
