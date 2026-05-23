import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'

export type SubscriptionTier = 'free' | 'premium'
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'inactive'

export interface SubscriptionState {
  tier: SubscriptionTier
  status: SubscriptionStatus
  isPremium: boolean
  currentPeriodEnd: string | null
  loading: boolean
}

const DEFAULT: SubscriptionState = {
  tier: 'free',
  status: 'inactive',
  isPremium: false,
  currentPeriodEnd: null,
  loading: false,
}

function isActivePremium(tier: string, status: string, periodEnd: string | null): boolean {
  if (tier !== 'premium') return false
  if (status !== 'active') return false
  if (!periodEnd) return true
  return new Date(periodEnd).getTime() > Date.now()
}

export function useSubscription(): SubscriptionState {
  const { user } = useAuth()
  const userId = user?.id
  // Start in loading state — we don't know premium status until the DB resolves.
  const [state, setState] = useState<SubscriptionState>({ ...DEFAULT, loading: true })

  useEffect(() => {
    if (!userId) {
      setState(DEFAULT)
      return
    }

    let cancelled = false
    setState(prev => ({ ...prev, loading: true }))

    const applyRow = (row: { tier: string; status: string; current_period_end: string | null } | null) => {
      if (cancelled) return
      if (!row) {
        setState({ ...DEFAULT, loading: false })
        return
      }
      const tier = (row.tier === 'premium' ? 'premium' : 'free') as SubscriptionTier
      const status = (['active', 'canceled', 'past_due', 'inactive'].includes(row.status)
        ? row.status
        : 'inactive') as SubscriptionStatus
      setState({
        tier,
        status,
        isPremium: isActivePremium(tier, status, row.current_period_end),
        currentPeriodEnd: row.current_period_end,
        loading: false,
      })
    }

    supabase
      .from('user_subscriptions')
      .select('tier, status, current_period_end')
      .eq('user_id', userId)
      .maybeSingle()
      .then(({ data, error }: { data: { tier: string; status: string; current_period_end: string | null } | null; error: { message: string } | null }) => {
        if (error) {
          console.warn('useSubscription: failed to load:', error.message)
          if (!cancelled) setState({ ...DEFAULT, loading: false })
          return
        }
        applyRow(data ?? null)
      })

    const channel = supabase
      .channel(`user_subscriptions:${userId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'user_subscriptions', filter: `user_id=eq.${userId}` },
        (payload: { new: Record<string, unknown> | null }) => {
          const row = payload.new as { tier: string; status: string; current_period_end: string | null } | null
          applyRow(row ?? null)
        },
      )
      .subscribe()

    return () => {
      cancelled = true
      supabase.removeChannel(channel)
    }
  }, [userId])

  return state
}
