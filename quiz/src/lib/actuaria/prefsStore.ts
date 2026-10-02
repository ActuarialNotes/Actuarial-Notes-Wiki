// Persistence for a player's Actuaria settings (lib/actuaria/prefs.ts) — the
// `user_actuaria` row for a signed-in player, localStorage for a guest and as
// an offline cache, the way `lib/xpStore.ts` keeps XP. A same-tab event lets
// every mounted `useActuariaPrefs` pick a change up at once.

import { supabase } from '@/lib/supabase'
import { parsePrefs, prefsToRow, rowToPrefs, withPatch, type ActuariaPrefs, type ActuariaRow } from './prefs'

export const ACTUARIA_PREFS_EVENT = 'actuarial_actuaria_prefs_updated'
const LOCAL_KEY = 'actuarial_actuaria_prefs_v1'

function dispatch(): void {
  try { window.dispatchEvent(new CustomEvent(ACTUARIA_PREFS_EVENT)) } catch { /* non-browser */ }
}

export function readLocalPrefs(): ActuariaPrefs {
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    return parsePrefs(raw ? JSON.parse(raw) : null)
  } catch {
    return parsePrefs(null)
  }
}

export function writeLocalPrefs(prefs: ActuariaPrefs): void {
  try { localStorage.setItem(LOCAL_KEY, JSON.stringify(prefs)) } catch { /* quota, private mode */ }
}

/**
 * The player's prefs from their row, or null when there is none (a new player)
 * or the table can't be read (not migrated yet) — the caller keeps its local
 * copy then.
 */
export async function loadPrefs(userId: string): Promise<ActuariaPrefs | null> {
  const { data, error } = await supabase.from('user_actuaria').select('*').eq('user_id', userId).maybeSingle()
  if (error) return null
  return rowToPrefs(data as ActuariaRow | null)
}

/**
 * Lay `patch` over the player's prefs and keep the result. Local first, so the
 * screen moves at once and a guest's choice sticks; then the row for a signed-in
 * player. Never throws — a Hangar tap must not break on a network error.
 */
export async function savePrefs(userId: string | null, current: ActuariaPrefs, patch: Partial<ActuariaPrefs>): Promise<ActuariaPrefs> {
  const next = withPatch(current, patch)
  writeLocalPrefs(next)
  dispatch()
  if (!userId) return next
  try {
    const { error } = await supabase.from('user_actuaria').upsert(prefsToRow(userId, next), { onConflict: 'user_id' })
    if (error) console.warn('savePrefs: kept locally:', error.message)
  } catch (err) {
    console.warn('savePrefs: kept locally:', err)
  }
  return next
}
