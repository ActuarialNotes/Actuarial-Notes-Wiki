import { useEffect, useRef } from 'react'
import { useConceptLevels } from '@/hooks/useConceptLevels'
import { levelNumber } from '@/lib/battleDeck'

// The two things a battle's draft reads from outside the battle
// (lib/battleDraft.ts): the concept pages its pair strengths are read off —
// the wiki bundle, fetched the first time a room is hosted, since only the
// host deals — and this player's own level on each card. Both are read
// through refs, because a session is made once and holds the functions it
// was given.

type Bundle = { files: Record<string, string>; index: { category: string; name: string; path: string }[] }

let bundle: Promise<Bundle> | null = null
function loadBundle(): Promise<Bundle> {
  bundle ??= import('virtual:wiki-content').then(m => m.default as unknown as Bundle)
  return bundle
}

/**
 * A concept's page by its name, once the wiki bundle has arrived (`enabled`
 * starts the fetch). Until then, and for a name with no page, undefined — a
 * pair's strength then rests on its questions alone.
 */
export function useConceptPages(enabled: boolean): (name: string) => string | undefined {
  const pages = useRef<Map<string, string> | null>(null)
  useEffect(() => {
    if (!enabled || pages.current) return
    let live = true
    void loadBundle().then(b => {
      if (!live) return
      const map = new Map<string, string>()
      for (const item of b.index) {
        if (item.category !== 'concept') continue
        const markdown = b.files[item.path]
        if (markdown) map.set(item.name.toLowerCase(), markdown)
      }
      pages.current = map
    }).catch(() => { bundle = null })
    return () => { live = false }
  }, [enabled])
  return useRef((name: string) => pages.current?.get(name.toLowerCase())).current
}

/** This player's level on a topic, 0 (New) to 3, as the draft's cards carry it. */
export function usePlayerLevel(): (topic: string) => number {
  const levels = useConceptLevels()
  const ref = useRef(levels)
  ref.current = levels
  return useRef((topic: string) => levelNumber(ref.current.levelOf(topic))).current
}
