// The daily plan bonus: once every concept on today's study plan is done, the
// day's gems are paid a second time. The rule and its storage key are the ones
// the Dashboard's old plan card kept; only its home has moved. Nothing draws
// it on Today, and the Gem Shop's balance shows it.

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { todayISO } from '@/lib/studyPlan'

function bonusKey(examKey: string): string {
  return `actuarial_daily_bonus_${examKey}_${todayISO()}`
}

export function useDailyPlanBonus({
  userId, examKey, planDone, gemsToday,
}: {
  userId: string | null
  examKey: string | null
  /** Today's plan has concepts and every one is done. */
  planDone: boolean
  /** Gems earned on this exam today: its correct answers. */
  gemsToday: number
}): void {
  const [claimed, setClaimed] = useState(false)
  useEffect(() => {
    if (!examKey) return
    try { setClaimed(!!localStorage.getItem(bonusKey(examKey))) } catch { setClaimed(false) }
  }, [examKey])

  useEffect(() => {
    if (!userId || !examKey || !planDone || claimed || gemsToday <= 0) return
    const amount = gemsToday
    setClaimed(true)
    supabase.rpc('award_gems', { p_amount: amount })
      .then(({ error }: { error: { message: string } | null }) => {
        if (error) { setClaimed(false); return }
        try { localStorage.setItem(bonusKey(examKey), JSON.stringify({ amount })) } catch { /* private window */ }
        window.dispatchEvent(new CustomEvent('gems-awarded', { detail: { amount } }))
      })
  }, [userId, examKey, planDone, claimed, gemsToday])
}
