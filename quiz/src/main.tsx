import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { supabase } from './lib/supabase'
import { clearSharedCookie, readSharedCookie } from './lib/sharedAuthCookie'

async function hydrateFromSharedCookie() {
  const refreshToken = readSharedCookie()
  if (!refreshToken) return

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
      return
    }
    const data = await res.json()
    if (data?.access_token && data?.refresh_token) {
      await supabase.auth.setSession({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      })
    } else {
      clearSharedCookie()
    }
  } catch {
    // network error — leave cookie in place, app will proceed logged-out for now
  }
}

async function bootstrap() {
  const hash = window.location.hash
  let consumedHashTokens = false
  if (hash && hash.includes('access_token=')) {
    const params = new URLSearchParams(hash.slice(1))
    const accessToken = params.get('access_token')
    const refreshToken = params.get('refresh_token')
    if (accessToken && refreshToken) {
      try {
        await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken })
        consumedHashTokens = true
      } catch {
        // ignore — app will handle unauthenticated state
      }
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }

  // If no hash tokens were consumed and the SDK has no existing session,
  // try the shared cross-subdomain cookie set by the wiki.
  if (!consumedHashTokens) {
    const { data } = await supabase.auth.getSession()
    if (!data.session) {
      await hydrateFromSharedCookie()
    }
  }

  const rootElement = document.getElementById('root')
  if (!rootElement) throw new Error('Root element #root not found in index.html')
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

bootstrap()
