// Hook for the daily study-plan email preferences (user_email_prefs table).
// Signed-in only — the email goes to the account address, so there is no
// localStorage fallback like the other gamification stores. The timezone is
// re-detected from the browser on every save so the send hour follows the
// device the user last touched the setting from.

import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { DEFAULT_SEND_HOUR, detectTimezone } from '@/lib/dailyEmail'

export interface EmailPrefs {
  dailyPlanEmail: boolean
  sendHourLocal: number
  timezone: string
}

const DEFAULT_PREFS: EmailPrefs = {
  dailyPlanEmail: false,
  sendHourLocal: DEFAULT_SEND_HOUR,
  timezone: 'UTC',
}

export interface UseEmailPrefsResult {
  prefs: EmailPrefs
  loading: boolean
  saving: boolean
  error: string | null
  save: (next: Partial<Pick<EmailPrefs, 'dailyPlanEmail' | 'sendHourLocal'>>) => Promise<void>
}

export function useEmailPrefs(): UseEmailPrefsResult {
  const { user } = useAuth()
  const userId = user?.id ?? null
  const [prefs, setPrefs] = useState<EmailPrefs>(DEFAULT_PREFS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setPrefs(DEFAULT_PREFS)
      setLoading(false)
      return
    }
    let cancelled = false
    setLoading(true)
    const load = async () => {
      const { data } = await supabase
        .from('user_email_prefs')
        .select('daily_plan_email, send_hour_local, timezone')
        .eq('user_id', userId)
        .maybeSingle()
      if (cancelled) return
      if (data) {
        setPrefs({
          dailyPlanEmail: !!data.daily_plan_email,
          sendHourLocal: typeof data.send_hour_local === 'number' ? data.send_hour_local : DEFAULT_SEND_HOUR,
          timezone: (data.timezone as string) || 'UTC',
        })
      }
      setLoading(false)
    }
    void load()
    return () => { cancelled = true }
  }, [userId])

  const save = useCallback(async (next: Partial<Pick<EmailPrefs, 'dailyPlanEmail' | 'sendHourLocal'>>) => {
    if (!userId) return
    const merged: EmailPrefs = { ...prefs, ...next, timezone: detectTimezone() }
    setPrefs(merged)  // optimistic — the card reflects the choice immediately
    setSaving(true)
    setError(null)
    const { error: upsertErr } = await supabase.from('user_email_prefs').upsert({
      user_id: userId,
      daily_plan_email: merged.dailyPlanEmail,
      send_hour_local: merged.sendHourLocal,
      timezone: merged.timezone,
      updated_at: new Date().toISOString(),
    })
    if (upsertErr) setError(upsertErr.message)
    setSaving(false)
  }, [userId, prefs])

  return { prefs, loading, saving, error, save }
}
