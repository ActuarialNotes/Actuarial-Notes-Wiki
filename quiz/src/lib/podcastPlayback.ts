// The daily podcast's playback helpers (docs/daily-podcast.md) — the part the
// player's store needs, kept apart from lib/podcast.ts so that module, and the
// episode planning in it, stays out of the entry chunk. No imports.

export interface EpisodeEntry {
  kind: 'brief' | 'refresher' | 'bridge'
  /** The concept's name, or the bridge's id. */
  name: string
  key: string
  seconds: number
}

export interface EpisodeChapter {
  kind: EpisodeEntry['kind']
  name: string
  start: number
  end: number
}

/** The chapter playing at `time` (seconds); the last one past the end. */
export function chapterIndexAt(chapters: EpisodeChapter[], time: number): number {
  if (chapters.length === 0) return -1
  for (let i = chapters.length - 1; i >= 0; i--) if (time >= chapters[i].start) return i
  return 0
}

/**
 * Join MP3 clips byte for byte. Every clip is CBR MP3 with no ID3 tag and no
 * Xing/LAME header (the recorder writes them that way), so the frames run on
 * and a player measures the whole by its bitrate — one track to scrub, one
 * track a phone keeps playing with the screen locked.
 */
export function joinClips(parts: ArrayBuffer[]): Uint8Array {
  const total = parts.reduce((n, p) => n + p.byteLength, 0)
  const out = new Uint8Array(total)
  let at = 0
  for (const p of parts) {
    out.set(new Uint8Array(p), at)
    at += p.byteLength
  }
  return out
}

/** Where the recordings are served from: the public `podcast` bucket, or `VITE_PODCAST_BASE_URL`. */
export function podcastBaseUrl(env: { VITE_PODCAST_BASE_URL?: string; VITE_SUPABASE_URL?: string }): string {
  const own = env.VITE_PODCAST_BASE_URL?.replace(/\/+$/, '')
  if (own) return own
  const supabase = env.VITE_SUPABASE_URL?.replace(/\/+$/, '')
  return supabase ? `${supabase}/storage/v1/object/public/podcast` : '/podcast'
}
