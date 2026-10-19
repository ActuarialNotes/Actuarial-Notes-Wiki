// Which examining body the exam ladder is showing — the SOA/CAS picker that
// rides the title row on the Quiz tab and the Study Guides tab.
//
// It is one choice across the two tabs, stored under one key, because the two
// tabs are one ladder seen twice: flipping to CAS on one and finding the other
// still on SOA is the tab lying about what you picked. Both pages had their
// own copy of the key, their own track sets and their own fallback, and the
// fallbacks had drifted — a reader on no particular track (the DEFAULT track a
// new account lands on, which is neither body's) opened the Quiz tab on CAS
// and the Study Guides tab on SOA, so simply switching tabs appeared to change
// the answer. One module, one rule.

export type ExamBody = 'SOA' | 'CAS'

/**
 * The bodies the Study Guides tab's two pages pick between: the SOA and the
 * CAS, and the Canadian Institute of Actuaries, whose own ACIA and FCIA
 * exams and modules have study guides but no question bank, past paper or
 * product. The Quiz tab, the Store and Flashcards offer only `ExamBody`; the
 * choice is still stored once, and a page that doesn't offer the CIA opens
 * on the reader's track's body instead (`loadBody` reads `CIA` as no choice).
 */
export type GuideBody = ExamBody | 'CIA'

export const BODY_FILTER_KEY = 'quiz.bodyFilter'

/** The credential tracks of each body. */
export const SOA_TRACK_KEYS: ReadonlySet<string> = new Set(['ASA', 'FSA'])
export const CAS_TRACK_KEYS: ReadonlySet<string> = new Set(['ACAS', 'FCAS'])
export const CIA_TRACK_KEYS: ReadonlySet<string> = new Set(['ACIA', 'FCIA'])

/**
 * The body to open on when the reader has never picked one: their track's, and
 * SOA for a track that belongs to neither — the DEFAULT track is the two
 * preliminary exams, which the ladder lists under ASA.
 *
 * The test is "is this a CAS track" rather than "is this an SOA track" for that
 * reason: an unrecognised track has to land somewhere, and it has to land in
 * the same place on both tabs.
 */
export function defaultBody(selectedTrack: string): ExamBody {
  return CAS_TRACK_KEYS.has(selectedTrack) ? 'CAS' : 'SOA'
}

/** The Study Guides tab's body for a track: the CIA's for its two tracks. */
export function defaultGuideBody(selectedTrack: string): GuideBody {
  return CIA_TRACK_KEYS.has(selectedTrack) ? 'CIA' : defaultBody(selectedTrack)
}

/** Narrow an untrusted string (a stored value) to a body, or null. */
export function parseBody(value: string | null | undefined): ExamBody | null {
  return value === 'SOA' || value === 'CAS' ? value : null
}

/** The same, for the Study Guides tab, which offers the CIA too. */
export function parseGuideBody(value: string | null | undefined): GuideBody | null {
  return value === 'CIA' ? value : parseBody(value)
}

/** The stored choice, or null when there is none to honour. */
export function loadBody(): ExamBody | null {
  try {
    return parseBody(localStorage.getItem(BODY_FILTER_KEY))
  } catch {
    return null
  }
}

/** The stored choice as the Study Guides tab reads it. */
export function loadGuideBody(): GuideBody | null {
  try {
    return parseGuideBody(localStorage.getItem(BODY_FILTER_KEY))
  } catch {
    return null
  }
}

export function saveBody(body: GuideBody): void {
  try {
    localStorage.setItem(BODY_FILTER_KEY, body)
  } catch {
    /* ignore quota/private-mode errors */
  }
}
