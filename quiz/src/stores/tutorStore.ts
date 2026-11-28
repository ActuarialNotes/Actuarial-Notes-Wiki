import { create } from 'zustand'
import { capLog, type OfferKind, type OfferResponse, type TutorEvent } from '@/lib/tutor/log'
import type { Offer } from '@/lib/tutor/moments'
import type { BankedAnswer } from '@/lib/tutor/bank'
import type { TutorStep } from '@/lib/tutor/scheduler'

// The Tutor's state (docs/tutor.md §11): the event log and the settings beside
// it, persisted per account in localStorage, plus what is only true while the
// app is open — whether the Tutor is open, the part being answered, the bubble
// it put up unasked and the answers waiting to be banked. Everything the Tutor
// *knows* is a fold over `events` (lib/tutor/log.ts); nothing derived is stored
// here.

export interface TutorSettings {
  /** No bubbles: the Tutor speaks only when tapped. */
  quiet: boolean
  /** Folded into a tab on the screen's edge. */
  hidden: boolean
}

export const DEFAULT_SETTINGS: TutorSettings = { quiet: false, hidden: false }

export type ItemStep = Extract<TutorStep, { type: 'item' }>

interface TutorState {
  userId: string | null
  events: TutorEvent[]
  settings: TutorSettings
  /** The Tutor has been tapped open. */
  panelOpen: boolean
  /** The part on screen, and when it was put there: kept so closing mid-part loses nothing. */
  current: { step: ItemStep; at: string } | null
  /** Parts served since the app was opened, in order, so none comes round twice. */
  served: string[]
  bubble: Offer | null
  /** Answered, not yet banked into mastery/XP (lib/tutor/bank.ts). */
  pending: BankedAnswer[]

  load: (userId: string) => void
  append: (event: TutorEvent) => void
  setSettings: (patch: Partial<TutorSettings>) => void
  openPanel: () => void
  closePanel: () => void
  setCurrent: (step: ItemStep | null) => void
  recordAnswer: (banked: BankedAnswer, event: TutorEvent) => void
  showBubble: (offer: Offer) => void
  answerBubble: (response: Exclude<OfferResponse, 'shown'>) => void
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
    current: null,
    served: [],
    bubble: null,
    pending: [],

    load: userId => {
      if (get().userId === userId) return
      const data = read(userId)
      set({ userId, events: data.events, settings: data.settings, current: null, served: [], bubble: null, pending: [] })
    },

    append: event => appendEvents([event]),

    setSettings: patch => {
      const settings = { ...get().settings, ...patch }
      set({ settings })
      write(get().userId, { events: get().events, settings })
    },

    openPanel: () => set({ panelOpen: true, bubble: null }),
    closePanel: () => set({ panelOpen: false }),

    setCurrent: step => {
      if (!step) return set({ current: null })
      const served = get().served
      set({
        current: { step, at: now() },
        served: served[served.length - 1] === step.item.id ? served : [...served, step.item.id],
        panelOpen: true,
        bubble: null,
      })
    },

    recordAnswer: (banked, event) => {
      appendEvents([event])
      set({ pending: [...get().pending, banked] })
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

    takePending: () => {
      const p = get().pending
      if (p.length) set({ pending: [] })
      return p
    },
  }
})
