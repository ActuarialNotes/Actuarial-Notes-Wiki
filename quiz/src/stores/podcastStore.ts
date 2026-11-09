import { create } from 'zustand'
import {
  chapterIndexAt,
  joinClips,
  podcastBaseUrl,
  type EpisodeChapter,
  type EpisodeEntry,
} from '@/lib/podcastPlayback'
import type { PodcastClip } from '@/lib/podcast'
import { trackPodcastComplete, trackPodcastPlay } from '@/lib/analytics'

// The daily podcast's player (docs/daily-podcast.md), held above the page.
//
// One <audio> element for the whole app, created on first play and kept in
// this module rather than in a component: the reader moves around the app
// while it plays, and the pill in the resume dock and the panel are only views
// of it. The episode's clips are fetched and joined into one track
// (`joinClips`), so it scrubs as one and a phone keeps playing it with the
// screen locked; the Media Session API puts its controls on the lock screen.

export interface PodcastEpisode {
  /** exam_progress key, e.g. `CAS-5`. */
  examKey: string
  examLabel: string
  /** The local day the episode is for. */
  date: string
  /** What the shared audio can't say: day, days left, pacing. */
  facts: string[]
  entries: EpisodeEntry[]
  chapters: EpisodeChapter[]
  seconds: number
  /** Concepts on today's plan the episode doesn't read. */
  unread: string[]
  /** How many concepts it reads. */
  concepts: number
  /** The clips it plays, by key. */
  clips: Record<string, PodcastClip>
}

type Status = 'idle' | 'loading' | 'ready' | 'error'

interface PodcastState {
  episode: PodcastEpisode | null
  status: Status
  playing: boolean
  time: number
  rate: number
  panelOpen: boolean
  /**
   * An exam whose episode was asked for before it could be built — the daily
   * email's link, `/dashboard?episode=<exam>`. That exam's Play button takes
   * it up (`takeRequest`) once its episode is ready.
   */
  requested: string | null
  request: (examKey: string) => void
  /** True, once, if `examKey`'s episode was asked for. */
  takeRequest: (examKey: string) => boolean
  /** Open an episode in the panel and start it (or carry on with it, if it's the one loaded). */
  play: (episode: PodcastEpisode, source: string) => void
  toggle: () => void
  seek: (time: number) => void
  skip: (seconds: number) => void
  goToChapter: (index: number) => void
  setRate: (rate: number) => void
  openPanel: () => void
  closePanel: () => void
  /** Stop and forget the episode — the pill goes away. */
  stop: () => void
}

export const PODCAST_RATES = [0.8, 1, 1.25, 1.5, 1.75, 2] as const

let audio: HTMLAudioElement | null = null
let objectUrl: string | null = null
let loadToken = 0
let lastChapter = -1
const played = new Set<string>()

function episodeId(ep: PodcastEpisode): string {
  return `${ep.examKey}|${ep.date}|${ep.entries.map(e => e.key).join(',')}`
}

function chapterTitle(ep: PodcastEpisode, index: number): string {
  const c = ep.chapters[index]
  if (!c) return "Today's episode"
  if (c.kind !== 'bridge') return c.name
  return c.name === 'intro' ? "Today's episode" : c.name === 'outro' ? "That's today" : 'Worth a refresher'
}

function updateMediaSession(ep: PodcastEpisode, index: number) {
  if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return
  try {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: chapterTitle(ep, index),
      artist: 'Actuarial Notes',
      album: `Today's episode · ${ep.examLabel}`,
      artwork: [{ src: '/actuarialnotes-logo-black-512.png', sizes: '512x512', type: 'image/png' }],
    })
  } catch { /* MediaMetadata missing (older Safari) */ }
}

function updatePosition() {
  if (!audio || typeof navigator === 'undefined' || !('mediaSession' in navigator)) return
  const duration = audio.duration
  if (!Number.isFinite(duration) || duration <= 0) return
  try {
    navigator.mediaSession.setPositionState({ duration, playbackRate: audio.playbackRate, position: Math.min(audio.currentTime, duration) })
  } catch { /* out-of-range position mid-seek */ }
}

export const usePodcast = create<PodcastState>((set, get) => {
  function element(): HTMLAudioElement {
    if (audio) return audio
    audio = new Audio()
    audio.preload = 'auto'
    audio.addEventListener('timeupdate', () => {
      const ep = get().episode
      const time = audio!.currentTime
      set({ time })
      if (ep) {
        const index = chapterIndexAt(ep.chapters, time)
        if (index !== lastChapter) {
          lastChapter = index
          updateMediaSession(ep, index)
        }
      }
    })
    audio.addEventListener('play', () => { set({ playing: true }); updatePosition() })
    audio.addEventListener('pause', () => set({ playing: false }))
    audio.addEventListener('ratechange', updatePosition)
    audio.addEventListener('ended', () => {
      set({ playing: false })
      const ep = get().episode
      if (ep) trackPodcastComplete({ exam: ep.examKey, minutes: Math.round(ep.seconds / 60), concepts: ep.concepts })
    })
    if (typeof navigator !== 'undefined' && 'mediaSession' in navigator) {
      const ms = navigator.mediaSession
      const handlers: Array<[MediaSessionAction, MediaSessionActionHandler]> = [
        ['play', () => void audio?.play()],
        ['pause', () => audio?.pause()],
        ['seekbackward', d => get().skip(-(d.seekOffset ?? 15))],
        ['seekforward', d => get().skip(d.seekOffset ?? 15)],
        ['seekto', d => { if (typeof d.seekTime === 'number') get().seek(d.seekTime) }],
        ['previoustrack', () => get().goToChapter(Math.max(0, chapterIndexAt(get().episode?.chapters ?? [], get().time) - 1))],
        ['nexttrack', () => get().goToChapter(chapterIndexAt(get().episode?.chapters ?? [], get().time) + 1)],
      ]
      for (const [action, handler] of handlers) {
        try { ms.setActionHandler(action, handler) } catch { /* unsupported action */ }
      }
    }
    return audio
  }

  async function load(ep: PodcastEpisode): Promise<boolean> {
    const token = ++loadToken
    const base = podcastBaseUrl(import.meta.env)
    try {
      const parts = await Promise.all(ep.entries.map(async e => {
        const res = await fetch(`${base}/${ep.clips[e.key].a}`)
        if (!res.ok) throw new Error(`${e.key}: ${res.status}`)
        return res.arrayBuffer()
      }))
      if (token !== loadToken) return false
      if (objectUrl) URL.revokeObjectURL(objectUrl)
      objectUrl = URL.createObjectURL(new Blob([joinClips(parts) as BlobPart], { type: 'audio/mpeg' }))
      const el = element()
      el.src = objectUrl
      el.playbackRate = get().rate
      lastChapter = -1
      return true
    } catch (err) {
      if (token === loadToken) set({ status: 'error' })
      console.warn('podcast: could not load the episode', err)
      return false
    }
  }

  return {
    episode: null,
    status: 'idle',
    playing: false,
    time: 0,
    rate: 1,
    panelOpen: false,
    requested: null,

    request: examKey => set({ requested: examKey }),
    takeRequest: examKey => {
      if (get().requested !== examKey) return false
      set({ requested: null })
      return true
    },

    play: (ep, source) => {
      const current = get().episode
      if (current && episodeId(current) === episodeId(ep) && get().status === 'ready') {
        set({ panelOpen: true })
        void audio?.play().catch(() => {})
        return
      }
      audio?.pause()
      set({ episode: ep, status: 'loading', playing: false, time: 0, panelOpen: true })
      void load(ep).then(ok => {
        if (!ok) return
        set({ status: 'ready' })
        updateMediaSession(ep, 0)
        const id = episodeId(ep)
        if (!played.has(id)) {
          played.add(id)
          trackPodcastPlay({ exam: ep.examKey, minutes: Math.round(ep.seconds / 60), concepts: ep.concepts, source })
        }
        // Autoplay may be refused once the fetch has outlived the tap's
        // gesture; the panel's play button is right there.
        void audio?.play().catch(() => {})
      })
    },

    toggle: () => {
      if (!audio || get().status !== 'ready') return
      if (audio.paused) void audio.play().catch(() => {})
      else audio.pause()
    },

    seek: time => {
      if (!audio || get().status !== 'ready') return
      const end = get().episode?.seconds ?? audio.duration
      audio.currentTime = Math.max(0, Math.min(time, Number.isFinite(audio.duration) ? audio.duration : end))
      set({ time: audio.currentTime })
      updatePosition()
    },

    skip: seconds => get().seek((audio?.currentTime ?? 0) + seconds),

    goToChapter: index => {
      const chapter = get().episode?.chapters[index]
      if (!chapter) return
      get().seek(chapter.start)
      if (audio?.paused) void audio.play().catch(() => {})
    },

    setRate: rate => {
      set({ rate })
      if (audio) audio.playbackRate = rate
    },

    openPanel: () => set({ panelOpen: true }),
    closePanel: () => set({ panelOpen: false }),

    stop: () => {
      loadToken++
      audio?.pause()
      if (audio) audio.removeAttribute('src')
      if (objectUrl) URL.revokeObjectURL(objectUrl)
      objectUrl = null
      set({ episode: null, status: 'idle', playing: false, time: 0, panelOpen: false })
      if (typeof navigator !== 'undefined' && 'mediaSession' in navigator) navigator.mediaSession.metadata = null
    },
  }
})
