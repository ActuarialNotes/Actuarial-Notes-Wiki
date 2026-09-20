import { useEffect, useState } from 'react'
import { buildWikiIndex } from '@/lib/wikiIndex'
import { buildCoverLookup, type CoverLookup } from '@/lib/coworkCovers'

/**
 * The vault covers a Cowork resource card can lead with.
 *
 * The index resolves out of the bundle Cowork installs (`lib/coworkContent.ts`),
 * so this costs no network; an index that fails to build yields an empty
 * lookup and every card falls back to its kind icon.
 */
export function useCoworkCovers(): CoverLookup {
  const [lookup, setLookup] = useState<CoverLookup>(() => new Map())

  useEffect(() => {
    let cancelled = false
    buildWikiIndex()
      .then(items => { if (!cancelled) setLookup(buildCoverLookup(items)) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  return lookup
}
