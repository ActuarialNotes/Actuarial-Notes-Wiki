import { useCallback, useEffect, useRef, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'

export interface GemState {
  balance: number
  totalEarned: number
  totalSpent: number
  loading: boolean
  /** Refetch from the DB (useful right after a purchase or quiz completion). */
  refresh: () => Promise<void>
}

const DEFAULT: Omit<GemState, 'refresh'> = {
  balance: 0,
  totalEarned: 0,
  totalSpent: 0,
  loading: false,
}

export function useGems(): GemState {
  const { user } = useAuth()
  const userId = user?.id
  // Each hook instance gets its own channel name to avoid the Supabase error
  // "cannot add postgres_changes callbacks after subscribe()" when multiple
  // components (e.g. Sidebar + Store) hold concurrent subscriptions.
  const channelId = useRef(`gems-${Math.random().toString(36).slice(2)}`)
  const [state, setState] = useState<Omit<GemState, 'refresh'>>(DEFAULT)

  const fetchRow = useCallback(async () => {
    if (!userId) {
      setState(DEFAULT)
      return
    }
    const { data, error } = await supabase
      .from('user_gems')
      .select('balance, total_earned, total_spent')
      .eq('user_id', userId)
      .maybeSingle()
    if (error) {
      console.warn('useGems: failed to load:', error.message)
      setState({ ...DEFAULT, loading: false })
      return
    }
    setState({
      balance: data?.balance ?? 0,
      totalEarned: data?.total_earned ?? 0,
      totalSpent: data?.total_spent ?? 0,
      loading: false,
    })
  }, [userId])

  // Re-fetch when the quiz store awards gems (fallback for when realtime lags).
  useEffect(() => {
    if (!userId) return
    const handler = () => { void fetchRow() }
    window.addEventListener('gems-awarded', handler)
    return () => window.removeEventListener('gems-awarded', handler)
  }, [userId, fetchRow])

  useEffect(() => {
    if (!userId) {
      setState(DEFAULT)
      return
    }
    setState(prev => ({ ...prev, loading: true }))
    let cancelled = false
    void fetchRow().then(() => { if (cancelled) return })

    const channel = supabase
      .channel(`user_gems:${userId}:${channelId.current}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'user_gems', filter: `user_id=eq.${userId}` },
        (payload: { new: Record<string, unknown> | null }) => {
          const row = payload.new as { balance: number; total_earned: number; total_spent: number } | null
          if (!row) return
          setState({
            balance: row.balance ?? 0,
            totalEarned: row.total_earned ?? 0,
            totalSpent: row.total_spent ?? 0,
            loading: false,
          })
        },
      )
      .subscribe()

    return () => {
      cancelled = true
      supabase.removeChannel(channel)
    }
  }, [userId, fetchRow])

  return { ...state, refresh: fetchRow }
}
