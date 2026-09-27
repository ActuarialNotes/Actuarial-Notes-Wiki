/**
 * The **Projects** tab's catalogue: every exam that is sat as a project rather
 * than a paper, and the briefs the app offers for it (`docs/pcpa-project.md`).
 *
 * A project is its own kind of study — a business problem, a data set and a
 * deadline, not a bank of questions — so it is its own tab beside Quiz and
 * Flashcards, and an exam with a project appears here as one group of brief
 * cards. PCPA is the only one today. Adding another is an entry here, with its
 * briefs authored the way `data/pcpaProjects.ts` authors PCPA's: the rules the
 * examining body publishes transcribed with their source, the cases invented
 * and saying so.
 */

import {
  APPENDIX_LIMIT,
  CONTENT_OUTLINE_URL,
  ESTIMATED_HOURS,
  PROJECT_CASES,
  WINDOW_DAYS,
  WORD_LIMIT,
  type ProjectCase,
} from './pcpaProjects'
import { nextRealWindow } from '@/lib/pcpaAttempt'

export interface ProjectProgramme {
  id: string
  /** The `exam_progress` / track key — what the group's logo is drawn from. */
  examKey: string
  body: 'SOA' | 'CAS'
  /** The exam's short name, as the track headings print it. */
  label: string
  name: string
  /** The vault's exam page, which the group's heading opens. */
  examPage: string
  /** The published rules a candidate works to, one short phrase each. */
  facts: string[]
  /** Where the facts come from. */
  source: { label: string; url: string }
  /** The next real window, when the examining body publishes a calendar. */
  nextWindow?: (now: Date) => { opens: Date; closes: Date; registrationDeadline: Date }
  briefs: ProjectCase[]
}

export const PROJECT_PROGRAMMES: ProjectProgramme[] = [
  {
    id: 'pcpa',
    examKey: 'CAS-PCPA',
    body: 'CAS',
    label: 'PCPA',
    name: 'Property & Casualty Predictive Analytics',
    examPage: 'Exam PCPA (CAS)',
    facts: [
      `${WINDOW_DAYS}-day window`,
      `≤ ${WORD_LIMIT.toLocaleString('en-US')} words`,
      `≤ ${APPENDIX_LIMIT} appendices`,
      `About ${ESTIMATED_HOURS} hours`,
    ],
    source: { label: 'CAS PCPA Content Outline (v.8)', url: CONTENT_OUTLINE_URL },
    nextWindow: nextRealWindow,
    briefs: PROJECT_CASES,
  },
]

/** The programme a brief belongs to. */
export function programmeOf(caseId: string): ProjectProgramme | undefined {
  return PROJECT_PROGRAMMES.find(p => p.briefs.some(b => b.id === caseId))
}
