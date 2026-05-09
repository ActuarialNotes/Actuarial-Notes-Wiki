import { supabase } from '@/lib/supabase'
import { clearSharedCookie, readSharedCookie } from '@/lib/sharedAuthCookie'

// Attempts to restore a Supabase session using the refresh token stored in the
// shared cross-subdomain cookie (an_auth_rt). Returns true if a session was
// successfully established, false otherwise.
//
// Called during bootstrap (main.tsx) when no SDK session exists, and also from
// useAuth when an unexpected SIGNED_OUT fires (e.g. because another device
// consumed our stored refresh token via the same cookie, rotating it).
export async function hydrateFromSharedCookie(): Promise<boolean> {
  const refreshToken = readSharedCookie()
  if (!refreshToken) return false

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string
  try {
    const res = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=refresh_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: anonKey },
      body: JSON.stringify({ refresh_token: refreshToken }),
    })
    if (!res.ok) {
      clearSharedCookie()
      return false
    }
    const data = await res.json()
    if (data?.access_token && data?.refresh_token) {
      await supabase.auth.setSession({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      })
      return true
    }
    clearSharedCookie()
    return false
  } catch {
    // Network error — leave cookie intact so the next page load can retry
    return false
  }
}
