import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import type { ActuariaPrefs } from '@/lib/actuaria/prefs'
import { ACTUARIA_PREFS_EVENT, loadPrefs, readLocalPrefs, savePrefs, writeLocalPrefs } from '@/lib/actuaria/prefsStore'

export interface ActuariaPrefsView {
  prefs: ActuariaPrefs
  /** True until a signed-in player's row has been read. */
  loading: boolean
  update: (patch: Partial<ActuariaPrefs>) => Promise<void>
}

/**
 * A player's Actuaria settings (lib/actuaria/prefs.ts): seeded at once from
 * this browser's copy, then from the `user_actuaria` row for a signed-in player.
 */
export function useActuariaPrefs(): ActuariaPrefsView {
  const { user } = useAuth()
  const userId = user?.id ?? null
  const [prefs, setPrefs] = useState<ActuariaPrefs>(readLocalPrefs)
  const [loading, setLoading] = useState(!!userId)

  useEffect(() => {
    let cancelled = false
    if (!userId) {
      setPrefs(readLocalPrefs())
      setLoading(false)
      return
    }
    setLoading(true)
    loadPrefs(userId)
      .then(remote => {
        if (cancelled) return
        if (remote) {
          writeLocalPrefs(remote)
          setPrefs(remote)
        }
      })
      .catch(() => { /* keep the local copy */ })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [userId])

  useEffect(() => {
    const onChange = () => setPrefs(readLocalPrefs())
    window.addEventListener(ACTUARIA_PREFS_EVENT, onChange)
    return () => window.removeEventListener(ACTUARIA_PREFS_EVENT, onChange)
  }, [])

  const update = useCallback(async (patch: Partial<ActuariaPrefs>) => {
    const next = await savePrefs(userId, readLocalPrefs(), patch)
    setPrefs(next)
  }, [userId])

  return { prefs, loading, update }
}
