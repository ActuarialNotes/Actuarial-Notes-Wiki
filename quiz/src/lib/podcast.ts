// The daily podcast: Today's Study Plan, read aloud (docs/daily-podcast.md).
//
// An episode is a playlist of short recorded clips. A concept's clip is the
// same for every reader — Bayes' Theorem is read the same way in everyone's
// episode — so each is recorded once, named by a hash of its script, and only
// the order is personal. Two rules carry over from Listen recordings
// (docs/listen-recordings.md):
//
//   • Nothing invented. A clip's script is the concept page's own words, read
//     through the same Listen pipeline, with fixed sentences around them
//     (lib/podcastScripts.ts). No model writes or summarises anything.
//   • A stale clip is never played. The app carries the hash of every script
//     as the vault stands at build time (`virtual:podcast-scripts`) and skips a
//     recording made from an older page (`isCurrentClip`).
//
// This half is the index, the episode and its playback — light enough for the
// main bundle, where the player lives. Making scripts is podcastScripts.ts.

import { narrationHash } from './listenNarration'
import type { EpisodeChapter, EpisodeEntry } from './podcastPlayback'

export * from './podcastPlayback'

/**
 * The fixed sentences every episode is stitched with. Shared by every reader,
 * so they can't name the reader's exam, day or pacing — the player shows those.
 */
export const PODCAST_BRIDGES = {
  intro: "Welcome to today's study session from Actuarial Notes. Here's what's on your plan.",
  refreshers: 'Next, a few concepts you know that are worth a quick refresher.',
  outro: "That's today's session. When you're ready, take today's quiz.",
} as const

export type PodcastBridge = keyof typeof PODCAST_BRIDGES

/** A script's hash — the same hash Listen recordings are named by. */
export function scriptHash(text: string): string {
  return narrationHash(text)
}

/** Every concept page's script hashes, keyed by slug: `[brief, refresher]`. */
export type PodcastScriptHashes = Record<string, [string | null, string | null]>

// ── The recordings' index ─────────────────────────────────────────────────────
//
// One file, `index.json` in the public `podcast` bucket, lists every clip the
// recorder has made: its script hash, length, byte size and voice. The
// recorder rewrites it after uploading audio, so it never names a file that
// isn't there. Compact on purpose — the Dashboard reads it to put the
// episode's length on its button:
//
//   { "v": 1, "voices": [["af_heart", "kokoro-82m"]],
//     "clips": { "brief/bayes-theorem": ["1x2y3z", 71.4, 571392, 0], … } }

export interface PodcastClip {
  /** Hash of the script the clip was recorded from. */
  h: string
  /** Audio file, relative to the bucket. */
  a: string
  /** Seconds. */
  d: number
  /** Bytes (every clip is CBR 64 kb/s mono MP3, so clips join byte for byte). */
  b: number
  /** Voice and engine, e.g. `af_heart` / `kokoro-82m`. */
  voice: string
  model: string
}

export interface PodcastIndexFile {
  v: 1
  voices: Array<[string, string]>
  clips: Record<string, [string, number, number, number]>
}

export function parsePodcastIndex(raw: unknown): Record<string, PodcastClip> | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as { v?: unknown; voices?: unknown; clips?: unknown }
  if (r.v !== 1 || !Array.isArray(r.voices) || !r.clips || typeof r.clips !== 'object') return null
  const voices = r.voices as unknown[]
  const clips: Record<string, PodcastClip> = {}
  for (const [key, value] of Object.entries(r.clips as Record<string, unknown>)) {
    if (!/^(brief|refresher|bridge)\/[a-z0-9-]+$/.test(key) || !Array.isArray(value)) continue
    const [h, d, b, v] = value as unknown[]
    const voice = typeof v === 'number' ? voices[v] : undefined
    if (typeof h !== 'string' || !/^[a-z0-9]+$/.test(h)) continue
    if (typeof d !== 'number' || !(d > 0) || typeof b !== 'number' || !(b > 0)) continue
    if (!Array.isArray(voice) || typeof voice[0] !== 'string' || !voice[0]) continue
    clips[key] = { h, d, b, a: clipAudioFile(key, h, voice[0]), voice: voice[0], model: String(voice[1] ?? '') }
  }
  return clips
}

/** The index file for a set of clips — what the recorder writes. */
export function podcastIndexFile(clips: Record<string, PodcastClip>): PodcastIndexFile {
  const voices: Array<[string, string]> = []
  const out: PodcastIndexFile['clips'] = {}
  for (const key of Object.keys(clips).sort()) {
    const c = clips[key]
    let v = voices.findIndex(([voice, model]) => voice === c.voice && model === c.model)
    if (v < 0) v = voices.push([c.voice, c.model]) - 1
    out[key] = [c.h, Math.round(c.d * 100) / 100, c.b, v]
  }
  return { v: 1, voices, clips: out }
}

/** `brief/bayes-theorem-<hash>-af-heart.mp3` — a new script or voice is a new URL. */
export function clipAudioFile(key: string, hash: string, voice: string): string {
  return `${key}-${hash}-${podcastSlug(voice)}.mp3`
}

/** Whether a recording was made from the script the vault has now. */
export function isCurrentClip(key: string, hash: string, scripts: PodcastScriptHashes): boolean {
  const [kind, slug] = key.split('/')
  if (kind === 'bridge') return hash === scriptHash(PODCAST_BRIDGES[slug as PodcastBridge] ?? '')
  const hashes = scripts[slug]
  if (!hashes) return false
  return hash === (kind === 'brief' ? hashes[0] : kind === 'refresher' ? hashes[1] : null)
}

// ── The episode ───────────────────────────────────────────────────────────────
//
// `podcastSlug`, `podcastClipKey` and `planEpisode` are mirrored verbatim in
// supabase/functions/daily-plan-email/index.ts (which can't import from here)
// to put the episode's length on the email's button;
// lib/duplicationContracts.test.ts runs the copy against the same vectors.
// Keep them self-contained.

/** `Bayes' Theorem` → `bayes-theorem`, the same slug Listen recordings use. */
export function podcastSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

export function podcastClipKey(kind: string, name: string): string {
  return `${kind}/${podcastSlug(name)}`
}

export interface EpisodePlan {
  entries: EpisodeEntry[]
  seconds: number
  /** Concepts on the plan that the episode doesn't read: not recorded yet, or past the caps. */
  unread: string[]
  /** How many concepts the episode reads. */
  concepts: number
}

/**
 * Today's plan → the episode: the intro, each concept on today's plan that
 * has a current recording, then (behind their bridge) the refreshers, then
 * the outro — capped by count and by length. A plan in review mode reads
 * only its refreshers. An episode reading no concept is empty.
 *
 * `clips` is the recordings' index (`clips` of index.json); `isCurrent`, when
 * given, rejects a recording made from an older script.
 */
export function planEpisode(
  todaysConcepts: string[],
  reviewConcepts: string[],
  status: string | undefined,
  clips: Record<string, { d: number; h: string }>,
  isCurrent?: (key: string, hash: string) => boolean,
): EpisodePlan {
  // At most 12 concepts from today's plan (the email lists 12), 5 refreshers,
  // and no more concepts once the episode runs 15 minutes.
  const maxBriefs = 12
  const maxRefreshers = 5
  const target = 15 * 60
  const ok = (key: string) => {
    const clip = clips[key]
    return !!clip && clip.d > 0 && (!isCurrent || isCurrent(key, clip.h))
  }
  const entries: EpisodeEntry[] = []
  const unread: string[] = []
  let seconds = 0
  let concepts = 0
  const seen = new Set<string>()
  const add = (kind: EpisodeEntry['kind'], name: string, key: string) => {
    entries.push({ kind, name, key, seconds: clips[key].d })
    seconds += clips[key].d
  }
  const briefs = status === 'review_mode' ? [] : todaysConcepts
  const briefPicks: string[] = []
  for (const name of briefs) {
    const slug = podcastSlug(name)
    if (seen.has(slug)) continue
    seen.add(slug)
    const key = podcastClipKey('brief', name)
    if (!ok(key) || briefPicks.length >= maxBriefs) { unread.push(name); continue }
    briefPicks.push(name)
  }
  const refresherPicks: string[] = []
  for (const name of reviewConcepts) {
    const slug = podcastSlug(name)
    if (seen.has(slug)) continue
    seen.add(slug)
    const key = podcastClipKey('refresher', name)
    if (!ok(key) || refresherPicks.length >= maxRefreshers) { unread.push(name); continue }
    refresherPicks.push(name)
  }
  if (briefPicks.length + refresherPicks.length === 0) return { entries: [], seconds: 0, unread, concepts: 0 }

  const intro = podcastClipKey('bridge', 'intro')
  const outro = podcastClipKey('bridge', 'outro')
  const bridge = podcastClipKey('bridge', 'refreshers')
  if (ok(intro)) add('bridge', 'intro', intro)
  const budget = target - (ok(outro) ? clips[outro].d : 0)
  for (const name of briefPicks) {
    const key = podcastClipKey('brief', name)
    // Always read at least one concept, however long.
    if (concepts > 0 && seconds + clips[key].d > budget) { unread.push(name); continue }
    add('brief', name, key)
    concepts++
  }
  const bridgeSeconds = concepts > 0 && ok(bridge) ? clips[bridge].d : 0
  const fit: string[] = []
  let running = seconds
  for (const name of refresherPicks) {
    const extra = clips[podcastClipKey('refresher', name)].d + (fit.length === 0 ? bridgeSeconds : 0)
    if (concepts + fit.length > 0 && running + extra > budget) { unread.push(name); continue }
    fit.push(name)
    running += extra
  }
  if (fit.length > 0 && bridgeSeconds > 0) add('bridge', 'refreshers', bridge)
  for (const name of fit) {
    add('refresher', name, podcastClipKey('refresher', name))
    concepts++
  }
  if (ok(outro)) add('bridge', 'outro', outro)
  return { entries, seconds, unread, concepts }
}

// ── Playing it ────────────────────────────────────────────────────────────────

/** Where each entry starts and ends once the clips are joined end to end. */
export function episodeChapters(entries: EpisodeEntry[]): EpisodeChapter[] {
  let t = 0
  return entries.map(e => {
    const start = t
    t += e.seconds
    return { kind: e.kind, name: e.name, start, end: t }
  })
}

/** `11 min` — rounded up, never "0 min". */
export function episodeMinutesLabel(seconds: number): string {
  return `${Math.max(1, Math.ceil(seconds / 60))} min`
}

/** `3:07` */
export function clockLabel(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds))
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

/** The facts the player shows that the shared audio can't say: the reader's day, days left and pacing. */
export function episodeFacts(plan: {
  dayNumber?: number
  totalDays?: number
  daysRemaining?: number
  status?: string
}): string[] {
  const facts: string[] = []
  if (plan.dayNumber && plan.totalDays) facts.push(`Day ${plan.dayNumber} of ${plan.totalDays}`)
  if (typeof plan.daysRemaining === 'number' && plan.daysRemaining >= 0 && plan.status !== 'target_passed') {
    facts.push(plan.daysRemaining === 1 ? '1 day to go' : `${plan.daysRemaining} days to go`)
  }
  const pacing: Record<string, string> = {
    on_track: 'On track',
    ahead: 'Ahead of schedule',
    behind: 'Behind schedule',
    review_mode: 'Review mode',
    target_passed: 'Past your ready date',
  }
  if (plan.status && pacing[plan.status]) facts.push(pacing[plan.status])
  return facts
}
