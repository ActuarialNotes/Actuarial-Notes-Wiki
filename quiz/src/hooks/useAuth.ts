import { useEffect, useState } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { clearSharedCookie, writeSharedCookie } from '@/lib/sharedAuthCookie'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Resolve immediately from the existing session to avoid a loading flash
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setSession(data.session ?? null)
      if (data.session?.refresh_token) writeSharedCookie(data.session.refresh_token)
      setLoading(false)
    })

    // Subscribe to future auth changes (login, logout, token refresh).
    // Keep the cross-subdomain cookie in sync so the wiki can pick up our
    // session (and the rotated refresh tokens Supabase issues on refresh).
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      setSession(session ?? null)
      if (event === 'SIGNED_OUT') {
        clearSharedCookie()
      } else if (session?.refresh_token) {
        writeSharedCookie(session.refresh_token)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return { user, session, loading, signOut }
}
