import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { clearSharedCookie, readSharedCookie, writeSharedCookie } from '@/lib/sharedAuthCookie'
import { hydrateFromSharedCookie } from '@/lib/hydrateSession'

interface AuthContextValue {
  user: User | null
  session: Session | null
  loading: boolean
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children, initialSession }: { children: ReactNode; initialSession: Session | null }) {
  const [user, setUser] = useState<User | null>(initialSession?.user ?? null)
  const [session, setSession] = useState<Session | null>(initialSession)
  // Auth is pre-seeded from main.tsx's bootstrap getSession() call, so loading
  // is always false — no transient null-user state on the first render.
  const loading = false

  useEffect(() => {
    // Re-fetch in case the token was refreshed between bootstrap and first render.
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setSession(data.session ?? null)
      if (data.session?.refresh_token) writeSharedCookie(data.session.refresh_token)
    })

    // Single subscription for the entire app. Previously useAuth() was called
    // in 14+ components, each creating its own onAuthStateChange listener.
    // When SIGNED_OUT fired, all handlers raced to call hydrateFromSharedCookie()
    // concurrently — each exchange invalidated the next, causing a sign-out cascade.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        // SIGNED_OUT can fire when this device's refresh token was rotated away by
        // another session sharing the same cookie. Before giving up, check whether
        // the cookie now holds a newer token and silently re-hydrate.
        if (readSharedCookie()) {
          hydrateFromSharedCookie().then(success => {
            if (!success) {
              clearSharedCookie()
              setUser(null)
              setSession(null)
            }
            // On success onAuthStateChange fires again with SIGNED_IN, which
            // updates user/session via the else branch below.
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

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
  }, [])

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider')
  return ctx
}
