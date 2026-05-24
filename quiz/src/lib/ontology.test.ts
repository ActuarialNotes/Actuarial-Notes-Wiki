// Ontology invariant guard: every question's topic must be a real concept page,
// must appear in its own wiki_link, and must carry a syllabus-exact
// learning_objective. Reads the repo content directly (vitest runs in Node).

import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseQuestion, type Question } from './parser'
import { parseExamSyllabus } from './wikiParser'
import { hrefToEntryRef } from './wikiRoutes'

const HERE = path.dirname(fileURLToPath(import.meta.url)) // quiz/src/lib
const REPO_ROOT = path.resolve(HERE, '../../..')

function readQuestionFiles(dir: string): string[] {
  const out: string[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...readQuestionFiles(full))
    else if (entry.name.endsWith('.md')) out.push(readFileSync(full, 'utf-8'))
  }
  return out
}

function conceptPageNames(): Set<string> {
  const dir = path.join(REPO_ROOT, 'Concepts')
  const names = new Set<string>()
  for (const f of readdirSync(dir)) {
    if (f.endsWith('.md')) names.add(f.replace(/\.md$/i, '').toLowerCase())
  }
  return names
}

function objectivesFor(file: string, examId: string, examLabel: string, examTopic: string): Set<string> {
  const content = readFileSync(path.join(REPO_ROOT, file), 'utf-8')
  const syllabus = parseExamSyllabus(content, examId, examLabel, examTopic)
  return new Set(syllabus.topics.map(t => t.name))
}

// Resolve a wiki_link to its concept display name (mirrors conceptsForQuestion).
function linkName(link: string): string {
  const ref = hrefToEntryRef(link)
  if (ref?.name) return ref.name
  return (link.split('/').filter(Boolean).pop() ?? '').replace(/-/g, ' ')
}

describe('question ontology', () => {
  const concepts = conceptPageNames()
  const objectivesByExam = new Map<string, Set<string>>([
    ['Probability', objectivesFor('Exam P-1 (SOA).md', 'P-1', 'Exam P', 'Probability')],
    ['Financial Mathematics', objectivesFor('Exam FM-2 (SOA).md', 'FM-2', 'Exam FM', 'Financial Mathematics')],
  ])

  const questions: Question[] = []
  for (const examDir of ['exam-p', 'exam-fm']) {
    for (const raw of readQuestionFiles(path.join(REPO_ROOT, 'questions', examDir))) {
      const q = parseQuestion(raw)
      if (q) questions.push(q)
    }
  }

  it('parses the full question bank', () => {
    expect(questions.length).toBeGreaterThan(450)
  })

  it('every topic is a concept page', () => {
    const bad = questions.filter(q => !concepts.has(q.topic.toLowerCase()))
    expect(bad.map(q => `${q.id}: ${q.topic}`)).toEqual([])
  })

  it('every topic appears in its own wiki_link', () => {
    const bad = questions.filter(
      q => !q.wiki_link.some(l => linkName(l).toLowerCase() === q.topic.toLowerCase()),
    )
    expect(bad.map(q => `${q.id}: ${q.topic} not in [${q.wiki_link.join(', ')}]`)).toEqual([])
  })

  it('every learning_objective matches the exam syllabus', () => {
    const bad = questions.filter(q => {
      const los = objectivesByExam.get(q.exam)
      return !los || !los.has(q.learning_objective)
    })
    expect(bad.map(q => `${q.id}: ${q.exam} / ${q.learning_objective}`)).toEqual([])
  })
})
