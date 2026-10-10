// The script a recorded voice reads, and how a recording's clock maps back onto
// the Listen view's tokens.
//
// A recording is made once, offline, from the same speech segments the browser
// voice speaks (`toSegments`), so a word highlighted from a recording is the same
// token highlighted from `speechSynthesis` — and an equation is read the way
// `mathSpeech.ts` says it. This module is pure: the script, the character range
// each token owns in it, and the recording manifest the player reads.

import type { SpeechSegment } from '@/lib/listenTokens'

/** One token's place in the script: characters [start, end) of `Narration.text`. */
export interface NarrationToken {
  index: number
  start: number
  end: number
}

export interface Narration {
  /** What the voice is given: one paragraph per segment, blank line between. */
  text: string
  tokens: NarrationToken[]
  /** Token index of the first token in each segment (a paragraph's start). */
  segmentStarts: number[]
}

// A paragraph that ends without punctuation (a heading, an equation) would run
// into the next one; the full stop is what gives the voice its falling cadence.
const ENDS_SENTENCE = /[.!?:;…]["')\]]?$/

export function buildNarration(segments: SpeechSegment[]): Narration {
  let text = ''
  const tokens: NarrationToken[] = []
  const segmentStarts: number[] = []
  for (const seg of segments) {
    if (text) text += '\n\n'
    const base = text.length
    segmentStarts.push(seg.ranges[0].index)
    for (const r of seg.ranges) tokens.push({ index: r.index, start: base + r.start, end: base + r.end })
    text += ENDS_SENTENCE.test(seg.text) ? seg.text : `${seg.text}.`
  }
  return { text, tokens, segmentStarts }
}

/**
 * A short, stable fingerprint of the script (cyrb53). A recording stores the
 * fingerprint of the script it was made from; the player compares it with the
 * page as it is now, and a page edited since falls back to the live voices
 * rather than highlighting words that are no longer the ones being said.
 */
export function narrationHash(text: string): string {
  let h1 = 0xdeadbeef
  let h2 = 0x41c6ce57
  for (let i = 0; i < text.length; i++) {
    const ch = text.charCodeAt(i)
    h1 = Math.imul(h1 ^ ch, 2654435761)
    h2 = Math.imul(h2 ^ ch, 1597334677)
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909)
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36)
}

/** `Probability` → `probability`; the file name a concept's recording is kept under. */
export function listenSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

/** Where a concept's recording manifest is served from. */
export function recordingManifestUrl(slug: string): string {
  return `/listen/${slug}.json`
}

/** The recording manifest — `public/listen/<slug>.json`, beside `<slug>.mp3`. */
export interface ListenRecording {
  v: 1
  /** `narrationHash` of the script this audio was made from. */
  hash: string
  /** Audio file, relative to the manifest. */
  audio: string
  duration: number
  voice: { id: string; name: string }
  model: string
  /** `[tokenIndex, startSeconds]`, in reading order. */
  marks: Array<[number, number]>
}

/** Token being spoken at `time`: the last mark that has started. */
export function tokenAt(marks: ListenRecording['marks'], time: number): number | null {
  let lo = 0
  let hi = marks.length - 1
  let found = -1
  while (lo <= hi) {
    const mid = (lo + hi) >> 1
    if (marks[mid][1] <= time) { found = mid; lo = mid + 1 } else hi = mid - 1
  }
  return found < 0 ? null : marks[found][0]
}

/** Where to seek to start paragraph `seg`: the start time of its first token. */
export function segmentStartTime(
  marks: ListenRecording['marks'],
  narration: Pick<Narration, 'segmentStarts'>,
  seg: number,
): number {
  const first = narration.segmentStarts[Math.max(0, Math.min(seg, narration.segmentStarts.length - 1))]
  return marks.find(([index]) => index === first)?.[1] ?? 0
}

/**
 * Per-token start times from a **character-level** alignment — what ElevenLabs'
 * `/with-timestamps` endpoint returns: `characters[i]` begins at
 * `startTimes[i]`. A token starts when its first character does.
 */
export function marksFromCharacterAlignment(
  narration: Narration,
  alignment: { character_start_times_seconds: number[] },
): ListenRecording['marks'] {
  const starts = alignment.character_start_times_seconds
  return narration.tokens.map(t => [t.index, starts[Math.min(t.start, starts.length - 1)]] as [number, number])
}

const WORD_RE = /[a-z0-9]+/g

/** Lower-case words of a string, punctuation and case removed — the unit two transcripts are compared in. */
export function alignWords(s: string): string[] {
  return s.toLowerCase().match(WORD_RE) ?? []
}

/**
 * Per-token start times from a **word-level** transcript (a speech-to-text pass
 * over the finished audio, for when the voice returned no alignment of its own).
 *
 * The script's words and the transcript's words are lined up with a
 * longest-common-subsequence, so a number the transcript writes as digits where
 * the script spells it, or a word it drops or splits, shifts nothing after it.
 * A token's start is the start of its first word that was matched; one whose
 * words all went unmatched takes the time of the nearest matched word before it.
 */
export function marksFromWordTranscript(
  narration: Narration,
  words: Array<{ text: string; start: number }>,
): ListenRecording['marks'] {
  return alignTranscript(narration, words).marks
}

/**
 * `marksFromWordTranscript`, plus the tokens that could not be matched to any
 * spoken word. Tokens with no words of their own (a stray bracket) can't be
 * matched and aren't reported; a long list here means the audio is not the
 * script and the recording should not be shipped.
 */
export function alignTranscript(
  narration: Narration,
  words: Array<{ text: string; start: number }>,
): { marks: ListenRecording['marks']; unmatched: number[]; spokenTokens: number } {
  // Flatten the script into words, remembering which token each came from.
  const scriptWords: Array<{ w: string; token: number }> = []
  for (const t of narration.tokens) {
    const slice = narration.text.slice(t.start, t.end)
    for (const w of alignWords(slice)) scriptWords.push({ w, token: t.index })
  }
  const spoken: Array<{ w: string; start: number }> = []
  for (const x of words) for (const w of alignWords(x.text)) spoken.push({ w, start: x.start })

  const n = scriptWords.length
  const m = spoken.length
  // LCS table, row-major in one typed array.
  const lcs = new Uint32Array((n + 1) * (m + 1))
  const at = (i: number, j: number) => i * (m + 1) + j
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      lcs[at(i, j)] = scriptWords[i].w === spoken[j].w
        ? lcs[at(i + 1, j + 1)] + 1
        : Math.max(lcs[at(i + 1, j)], lcs[at(i, j + 1)])
    }
  }
  const matchedAt = new Map<number, number>() // script word → time
  for (let i = 0, j = 0; i < n && j < m;) {
    if (scriptWords[i].w === spoken[j].w) { matchedAt.set(i, spoken[j].start); i++; j++ }
    else if (lcs[at(i + 1, j)] >= lcs[at(i, j + 1)]) i++
    else j++
  }

  const firstTime = new Map<number, number>() // token → first matched word's time
  scriptWords.forEach((sw, i) => {
    const t = matchedAt.get(i)
    if (t != null && !firstTime.has(sw.token)) firstTime.set(sw.token, t)
  })
  let last = 0
  const wordy = new Set(scriptWords.map(sw => sw.token))
  const unmatched: number[] = []
  const marks = narration.tokens.map(t => {
    const own = firstTime.get(t.index)
    if (own != null) last = own
    else if (wordy.has(t.index)) unmatched.push(t.index)
    return [t.index, own ?? last] as [number, number]
  })
  return { marks, unmatched, spokenTokens: wordy.size }
}

/**
 * A manifest fetched from the network, checked against the page as it is now:
 * the right shape, and made from this exact script. Anything else is `null` —
 * the player then uses a live voice rather than highlighting the wrong words.
 */
export function readRecording(raw: unknown, narration: Pick<Narration, 'text' | 'tokens'>): ListenRecording | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Partial<ListenRecording>
  if (r.v !== 1 || typeof r.audio !== 'string' || typeof r.hash !== 'string' || !Array.isArray(r.marks)) return null
  if (r.hash !== narrationHash(narration.text)) return null
  if (r.marks.length !== narration.tokens.length) return null
  let prev = 0
  for (const m of r.marks) {
    if (!Array.isArray(m) || typeof m[0] !== 'number' || typeof m[1] !== 'number' || m[1] < prev) return null
    prev = m[1]
  }
  return r as ListenRecording
}
