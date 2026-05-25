import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import type { QuizSession } from '@/lib/supabase'
import { useAuth } from './useAuth'

export function useProgress() {
  const { user } = useAuth()
  const [sessions, setSessions] = useState<QuizSession[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSessions = useCallback((uid: string) => {
    setLoading(true)
    setError(null)
    supabase
      .from('quiz_sessions')
      .select('*')
      .eq('user_id', uid)
      .order('completed_at', { ascending: false })
      .limit(1000)
      .then(({ data, error: err }: { data: QuizSession[] | null; error: { message: string } | null }) => {
        if (err) {
          setError(err.message)
        } else {
          setSessions(data ?? [])
        }
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!user) {
      setSessions([])
      return
    }
    fetchSessions(user.id)
  }, [user?.id])  // key on id — stable across token refreshes

  // Supabase realtime — reflects quiz completions from other devices instantly
  useEffect(() => {
    if (!user?.id) return
    const uid = user.id
    const channel = supabase
      .channel(`quiz_sessions:${uid}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'quiz_sessions', filter: `user_id=eq.${uid}` },
        () => { fetchSessions(uid) },
      )
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [user?.id, fetchSessions])

  // Refetch immediately when a quiz is saved on this device (Supabase Realtime
  // won't fire because quiz_sessions is not in the realtime publication).
  useEffect(() => {
    if (!user?.id) return
    const uid = user.id
    const handleSaved = () => fetchSessions(uid)
    window.addEventListener('quiz-session-saved', handleSaved)
    return () => window.removeEventListener('quiz-session-saved', handleSaved)
  }, [user?.id, fetchSessions])

  // Refetch when tab regains focus
  useEffect(() => {
    if (!user?.id) return
    const uid = user.id
    const handleVisible = () => {
      if (document.visibilityState === 'visible') fetchSessions(uid)
    }
    document.addEventListener('visibilitychange', handleVisible)
    return () => document.removeEventListener('visibilitychange', handleVisible)
  }, [user?.id, fetchSessions])

  return { sessions, loading, error }
}
