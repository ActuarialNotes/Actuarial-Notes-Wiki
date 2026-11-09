// An **in-world word** that says what it means. Every use carries the plain app
// term as its tooltip and its `aria-description` (docs/actuaria-online.md §3),
// and the first use of a word on a screen also prints its plain meaning beside
// it ("Coverage · daily streak"), since a phone shows no tooltip.
//
// "First on a screen" is decided by `TermScreen`, which each Actuaria screen
// is wrapped in: every `Term` registers as it mounts (in tree order) and only
// the earliest of each word shows its gloss. Outside a `TermScreen` every use
// shows it.

import { createContext, useContext, useId, useLayoutEffect, useState, useSyncExternalStore, type ReactNode } from 'react'
import { LEXICON, type LexiconId } from '@/lib/actuaria/lexicon'
import { cn } from '@/lib/utils'

interface TermRegistry {
  register: (id: LexiconId, token: string) => () => void
  first: (id: LexiconId) => string | undefined
  subscribe: (listener: () => void) => () => void
}

function createRegistry(): TermRegistry {
  const order = new Map<LexiconId, string[]>()
  const listeners = new Set<() => void>()
  const notify = () => listeners.forEach(l => l())
  return {
    register(id, token) {
      const list = order.get(id) ?? []
      order.set(id, [...list, token])
      notify()
      return () => {
        order.set(id, (order.get(id) ?? []).filter(t => t !== token))
        notify()
      }
    },
    first: id => order.get(id)?.[0],
    subscribe(listener) {
      listeners.add(listener)
      return () => { listeners.delete(listener) }
    },
  }
}

const TermScreenContext = createContext<TermRegistry | null>(null)

/** One screen: within it, each in-world word is glossed once. */
export function TermScreen({ children }: { children: ReactNode }) {
  const [registry] = useState(createRegistry)
  return <TermScreenContext.Provider value={registry}>{children}</TermScreenContext.Provider>
}

const NO_SUBSCRIBE = () => () => {}

export function Term({
  id,
  children,
  className,
  gloss = true,
}: {
  id: LexiconId
  children?: ReactNode
  className?: string
  /** False where the plain words are already on screen beside it. */
  gloss?: boolean
}) {
  const entry = LEXICON[id]
  const token = useId()
  const registry = useContext(TermScreenContext)
  useLayoutEffect(() => registry?.register(id, token), [registry, id, token])
  const first = useSyncExternalStore(
    registry?.subscribe ?? NO_SUBSCRIBE,
    () => (registry ? registry.first(id) : token),
  )
  const showGloss = gloss && first === token && entry.gloss.toLowerCase() !== entry.term.toLowerCase()
  return (
    <span title={entry.plain} aria-description={entry.plain} className={cn('cursor-help', className)}>
      {children ?? entry.term}
      {showGloss && (
        <span aria-hidden className="ml-1.5 font-sans text-[0.85em] font-normal normal-case tracking-normal text-muted-foreground">
          · {entry.gloss}
        </span>
      )}
    </span>
  )
}
