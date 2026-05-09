import { useEffect, useState } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { clearSharedCookie, readSharedCookie, writeSharedCookie } from '@/lib/sharedAuthCookie'
import { hydrateFromSharedCookie } from '@/lib/hydrateSession'

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
      if (event === 'SIGNED_OUT') {
        // SIGNED_OUT can fire automatically when this device's stored refresh
        // token was rotated away by another device that hydrated from the same
        // shared cookie. Before giving up, check whether the cookie now holds a
        // newer (valid) refresh token from that other device and silently
        // re-hydrate. Only fully sign out if that also fails.
        if (readSharedCookie()) {
          hydrateFromSharedCookie().then(success => {
            if (!success) {
              clearSharedCookie()
              setUser(null)
              setSession(null)
            }
            // On success, onAuthStateChange fires again with SIGNED_IN which
            // sets user/session correctly via the else branch below.
          })
          return
        }
        clearSharedCookie()
        setUser(null)
        setSession(null)
      } else {
        setUser(session?.user ?? null)
        setSession(session ?? null)
        if (session?.refresh_token) writeSharedCookie(session.refresh_token)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return { user, session, loading, signOut }
}
