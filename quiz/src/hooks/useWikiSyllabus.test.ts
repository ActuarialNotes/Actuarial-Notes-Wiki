// The exam syllabi are bundled, not fetched.
//
// Every surface that asks "which exams exist?" — the dashboard's exam tabs, the
// sidebar, the quiz builder, flashcards — comes through useWikiSyllabus. It used
// to resolve that from GitHub's Contents API at runtime, so an API outage, an
// offline user or an unauthenticated rate-limit (60 requests/hour per IP) left
// the app believing there were no exams at all: an account could add an exam,
// save it, and watch the dashboard keep saying it had none. These tests pin the
// two halves of the fix — the build collects every exam page, and every page it
// collects parses into a usable syllabus without a network call.

import { describe, it, expect } from 'vitest'
import { readdirSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import examPages from 'virtual:exam-pages'
import { parseExamMetadata, parseExamSyllabus } from '@/lib/wikiParser'

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')

const vaultExamFiles = readdirSync(REPO_ROOT).filter(f => /^Exam .+\.md$/.test(f))

describe('virtual:exam-pages', () => {
  it('carries every exam page in the vault', () => {
    expect(vaultExamFiles.length).toBeGreaterThan(0)
    expect(Object.keys(examPages).sort()).toEqual([...vaultExamFiles].sort())
  })

  it.each(Object.keys(examPages))('%s parses into a syllabus with concepts', fileName => {
    const meta = parseExamMetadata(examPages[fileName])
    expect(meta).not.toBeNull()
    const syllabus = parseExamSyllabus(
      examPages[fileName],
      meta!.examId,
      meta!.examLabel,
      meta!.examTopic,
      fileName.replace(/\.md$/i, ''),
    )
    expect(syllabus.topics.length).toBeGreaterThan(0)
    expect(syllabus.topics.some(t => t.concepts.length > 0)).toBe(true)
  })
})
