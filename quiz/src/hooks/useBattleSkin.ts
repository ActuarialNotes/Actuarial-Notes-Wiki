import { createContext, useContext } from 'react'
import { PLAIN_SKIN, type BattleSkin } from '@/lib/battleSkin'

/**
 * The skin the Battle page is drawn in (lib/battleSkin.ts) — Quiz Battle's own
 * unless the page says otherwise. Read by the battle components for their words
 * and their few pieces of skinned chrome; the game underneath never reads it.
 */
export const BattleSkinContext = createContext<BattleSkin>(PLAIN_SKIN)

export function useBattleSkin(): BattleSkin {
  return useContext(BattleSkinContext)
}
