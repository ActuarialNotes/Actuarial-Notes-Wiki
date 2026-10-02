import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import type { CrewView, Thread } from '@/lib/actuaria/crews'
import { CREW_EVENT, fetchCrew, fetchRaid, fetchThreads } from '@/lib/actuaria/crewStore'
import type { RaidView } from '@/lib/actuaria/raid'

/**
 * Re-read `load` on mount, on the same-tab CREW_EVENT, on focus and on a slow
 * poll while visible — a cohort is other people, and there is no realtime on
 * RPC-only tables (docs/leagues.md, *Deferrals*).
 */
function useCrewResource<T>(key: string | null, load: (key: string) => Promise<{ data: T | null; error: string | null }>) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(!!key)
  const [version, setVersion] = useState(0)
  const refresh = useCallback(() => setVersion(v => v + 1), [])

  // A different crew (or a first one) is loading; a refresh of the same one
  // keeps what is on screen until the answer lands.
  const [loadedKey, setLoadedKey] = useState<string | null>(null)
  if (key !== loadedKey) {
    setLoadedKey(key)
    setData(null)
    setLoading(!!key)
  }

  useEffect(() => {
    if (!key) return
    let cancelled = false
    void load(key).then(out => {
      if (cancelled) return
      setData(out.data)
      setError(out.error)
      setLoading(false)
    })
    return () => { cancelled = true }
  }, [key, load, version])

  useEffect(() => {
    const onChange = () => refresh()
    window.addEventListener(CREW_EVENT, onChange)
    window.addEventListener('focus', onChange)
    const poll = window.setInterval(() => { if (document.visibilityState === 'visible') refresh() }, 60_000)
    return () => {
      window.removeEventListener(CREW_EVENT, onChange)
      window.removeEventListener('focus', onChange)
      window.clearInterval(poll)
    }
  }, [refresh])

  return { data, error, loading, refresh }
}

/** The signed-in player's cohort for an exam (null: none, or signed out). */
export function useCrew(exam: string | null) {
  const { user } = useAuth()
  const res = useCrewResource<CrewView>(user && exam ? exam : null, fetchCrew)
  return { crew: res.data, error: res.error, loading: res.loading, refresh: res.refresh, signedIn: !!user }
}

export function useCrewThreads(crewId: string | null) {
  const res = useCrewResource<Thread[]>(crewId, fetchThreads)
  return { threads: res.data ?? [], error: res.error, loading: res.loading, refresh: res.refresh }
}

export function useRaid(crewId: string | null) {
  const res = useCrewResource<RaidView>(crewId, fetchRaid)
  return { raid: res.data, error: res.error, loading: res.loading, refresh: res.refresh }
}
