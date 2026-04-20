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
  // getSession() automatically handles OAuth callbacks (PKCE code exchange /
  // implicit-flow hash tokens) and cleans up the URL before we render.
  const { data } = await supabase.auth.getSession()
  if (!data.session) {
    await hydrateFromSharedCookie()
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
