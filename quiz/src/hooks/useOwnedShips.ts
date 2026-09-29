import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { ownedShipIds } from '@/lib/actuaria/ship'
import { supabase } from '@/lib/supabase'

export interface OwnedShips {
  /** The ship cosmetics the player owns; null until a signed-in player's are read. */
  owned: ReadonlySet<string> | null
  refresh: () => Promise<void>
}

const NONE: ReadonlySet<string> = new Set()

/**
 * The ship cosmetics a player owns (docs/actuaria-online.md §7.3) — their
 * `ship:*` rows in `user_cosmetics`, the Store's inventory. A guest owns none:
 * the Store sells only to an account.
 */
export function useOwnedShips(): OwnedShips {
  const { user } = useAuth()
  const userId = user?.id ?? null
  const [owned, setOwned] = useState<ReadonlySet<string> | null>(userId ? null : NONE)

  const refresh = useCallback(async () => {
    if (!userId) { setOwned(NONE); return }
    const { data, error } = await supabase
      .from('user_cosmetics')
      .select('cosmetic_id')
      .eq('user_id', userId)
      .like('cosmetic_id', 'ship:%')
    // A failed read leaves the slots trusted rather than stripping a paint.
    if (error) { setOwned(prev => prev ?? null); return }
    setOwned(ownedShipIds((data ?? []).map((r: { cosmetic_id: string }) => r.cosmetic_id)))
  }, [userId])

  useEffect(() => {
    setOwned(userId ? null : NONE)
    void refresh()
  }, [userId, refresh])

  return { owned, refresh }
}
