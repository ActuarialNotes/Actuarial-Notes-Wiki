// Corpus test: the exams a new account is offered must be exams this app can
// actually study.
//
// The credential tracks list ~50 exams; the vault has a syllabus page for ten
// of them, and only a page can become a dashboard tab. Marking any of the other
// forty "in progress" used to save happily and then change nothing on the
// dashboard — the single worst thing a new account could do, because it looks
// exactly like a broken app. The exams panel now labels those rows and withholds
// the Add button, and the DEFAULT track (what a new account lands on) is the one
// track that must be *entirely* studiable, so the first exam anyone adds lands
// somewhere.

import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { TRACKS, EXAM_ID_TO_TRACK_NAME } from './tracks'
import { parseExamMetadata, wikiExamIdToProgressKey } from '@/lib/wikiParser'

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')

/** Progress keys the vault has an `Exam *.md` syllabus page for. */
function syllabusExamKeys(): Set<string> {
  const keys = new Set<string>()
  for (const file of readdirSync(REPO_ROOT)) {
    if (!/^Exam .+\.md$/.test(file)) continue
    const meta = parseExamMetadata(readFileSync(path.join(REPO_ROOT, file), 'utf-8'))
    if (meta) keys.add(wikiExamIdToProgressKey(meta.examId))
  }
  return keys
}

const defaultTrack = TRACKS[0]
const allTrackItems = TRACKS.flatMap(t => t.sections.flatMap(s => s.items))

describe('credential tracks', () => {
  it('starts a new account on the DEFAULT track', () => {
    expect(defaultTrack.key).toBe('DEFAULT')
  })

  it('finds the syllabus pages in the vault', () => {
    expect(syllabusExamKeys().size).toBeGreaterThan(0)
  })

  it('offers only studiable exams on the DEFAULT track', () => {
    const covered = syllabusExamKeys()
    const orphans = defaultTrack.sections
      .flatMap(s => s.items)
      .filter(item => !covered.has(item.id))
      .map(item => `${item.name} (${item.id})`)
    expect(orphans).toEqual([])
  })

  it('offers every studiable exam on the DEFAULT track', () => {
    // An exam with material that only appears under a credential track is an
    // exam a candidate has to guess their way to. Exams 6–9 are excluded: they
    // are a syllabus outline with no question bank (see lib/examStatus).
    const offered = new Set(defaultTrack.sections.flatMap(s => s.items).map(i => i.id))
    const missing = [...syllabusExamKeys()]
      .filter(key => !/^CAS-[6789]$/.test(key))
      .filter(key => !offered.has(key))
    expect(missing).toEqual([])
  })

  it('names every exam id that appears on any track', () => {
    const unnamed = allTrackItems
      .map(item => item.id)
      .filter(id => !EXAM_ID_TO_TRACK_NAME[id])
    expect(unnamed).toEqual([])
  })
})
