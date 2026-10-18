import { create } from 'zustand'
import { capLog, type ConfusionReason, type OfferKind, type OfferResponse, type TutorEvent } from '@/lib/tutor/log'
import type { Offer } from '@/lib/tutor/moments'
import type { BankedAnswer } from '@/lib/tutor/bank'
import type { PartKind } from '@/lib/tutor/items'
import type { TutorStep } from '@/lib/tutor/scheduler'

// The Tutor's state (docs/tutor.md §11): the event log and the settings beside
// it, persisted per account in localStorage, plus what is only true while the
// app is open — the panel, the running session, the bubble on screen and the
// answers waiting to be banked. Everything the Tutor *knows* is a fold over
// `events` (lib/tutor/log.ts); nothing derived is stored here.

export type SessionMinutes = 10 | 20 | 30 | 45
export const SESSION_MINUTES: readonly SessionMinutes[] = [10, 20, 30, 45]

export interface TutorSettings {
  sessionMinutes: SessionMinutes
  /** No bubbles: the dot and the count only. */
  quiet: boolean
  /** Folded into a tab on the screen's edge. */
  hidden: boolean
}

export const DEFAULT_SETTINGS: TutorSettings = { sessionMinutes: 20, quiet: false, hidden: false }

export type TutorView = 'now' | 'confusing' | 'journey'

/** What a session was started to work on, when not simply the day's plan. */
export interface SessionFocus {
  concepts: string[]
  kind?: PartKind | null
}

export interface TutorSession {
  startedAt: string
  /** Items served, in order. */
  served: string[]
  answered: number
  minutes: number
  /** New concepts the candidate chose to skip reading. */
  skipRead: string[]
  focus: SessionFocus | null
  /** The session's planned work is done; what follows is extra practice. */
  extra: boolean
  /** The step on screen — kept here so closing the panel mid-item loses nothing. */
  current: TutorStep | null
  /** When it was put on screen. */
  currentAt: string | null
}

interface TutorState {
  userId: string | null
  events: TutorEvent[]
  settings: TutorSettings
  panelOpen: boolean
  view: TutorView
  session: TutorSession | null
  bubble: Offer | null
  /** Answered, not yet banked into mastery/XP (lib/tutor/bank.ts). */
  pending: BankedAnswer[]

  load: (userId: string) => void
  append: (event: TutorEvent) => void
  setSettings: (patch: Partial<TutorSettings>) => void
  openPanel: (view?: TutorView) => void
  closePanel: () => void
  startSession: (focus?: SessionFocus | null) => void
  endSession: () => void
  recordAnswer: (banked: BankedAnswer, event: TutorEvent) => void
  skipRead: (concept: string) => void
  setExtra: () => void
  setCurrent: (step: TutorStep | null) => void
  showBubble: (offer: Offer) => void
  answerBubble: (response: Exclude<OfferResponse, 'shown'>) => void
  flagConfusion: (concept: string, reason: ConfusionReason) => void
  takePending: () => BankedAnswer[]
}

const KEY = 'actuarial_tutor_v1:'

interface Persisted {
  events: TutorEvent[]
  settings: TutorSettings
}

function read(userId: string): Persisted {
  try {
    const raw = localStorage.getItem(KEY + userId)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<Persisted>
      return {
        events: Array.isArray(parsed.events) ? parsed.events : [],
        settings: { ...DEFAULT_SETTINGS, ...(parsed.settings ?? {}) },
      }
    }
  } catch { /* unreadable or blocked: start fresh */ }
  return { events: [], settings: DEFAULT_SETTINGS }
}

function write(userId: string | null, data: Persisted): void {
  if (!userId) return
  try {
    localStorage.setItem(KEY + userId, JSON.stringify(data))
  } catch { /* quota or blocked storage: the session still works */ }
}

const now = () => new Date().toISOString()

export const useTutorStore = create<TutorState>((set, get) => {
  function appendEvents(events: TutorEvent[]) {
    const next = capLog([...get().events, ...events])
    set({ events: next })
    write(get().userId, { events: next, settings: get().settings })
  }

  function offerEvent(kind: OfferKind, response: OfferResponse): TutorEvent {
    return { t: 'offer', at: now(), kind, response }
  }

  return {
    userId: null,
    events: [],
    settings: DEFAULT_SETTINGS,
    panelOpen: false,
    view: 'now',
    session: null,
    bubble: null,
    pending: [],

    load: userId => {
      if (get().userId === userId) return
      const data = read(userId)
      set({ userId, events: data.events, settings: data.settings, session: null, bubble: null, pending: [] })
    },

    append: event => appendEvents([event]),

    setSettings: patch => {
      const settings = { ...get().settings, ...patch }
      set({ settings })
      write(get().userId, { events: get().events, settings })
    },

    openPanel: view => set({ panelOpen: true, bubble: null, ...(view ? { view } : {}) }),
    closePanel: () => set({ panelOpen: false }),

    startSession: (focus = null) => set({
      session: { startedAt: now(), served: [], answered: 0, minutes: 0, skipRead: [], focus, extra: false, current: null, currentAt: null },
      panelOpen: true,
      bubble: null,
    }),
    endSession: () => set({ session: null }),

    recordAnswer: (banked, event) => {
      appendEvents([event])
      const s = get().session
      set({
        pending: [...get().pending, banked],
        session: s ? { ...s, answered: s.answered + 1, minutes: s.minutes + banked.item.minutes } : s,
      })
    },

    skipRead: concept => {
      const s = get().session
      if (s) set({ session: { ...s, skipRead: [...s.skipRead, concept] } })
    },

    setExtra: () => {
      const s = get().session
      if (s && !s.extra) set({ session: { ...s, extra: true } })
    },

    setCurrent: step => {
      const s = get().session
      if (!s) return
      const served = step?.type === 'item' && s.served[s.served.length - 1] !== step.item.id
        ? [...s.served, step.item.id]
        : s.served
      set({ session: { ...s, current: step, currentAt: now(), served } })
    },

    showBubble: offer => {
      set({ bubble: offer })
      appendEvents([offerEvent(offer.kind, 'shown')])
    },

    answerBubble: response => {
      const b = get().bubble
      if (!b) return
      set({ bubble: null })
      appendEvents([offerEvent(b.kind, response)])
    },

    flagConfusion: (concept, reason) => appendEvents([{ t: 'confused', at: now(), concept, reason }]),

    takePending: () => {
      const p = get().pending
      if (p.length) set({ pending: [] })
      return p
    },
  }
})
