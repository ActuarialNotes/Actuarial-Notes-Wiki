import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { supabase } from './lib/supabase'
import { hydrateFromSharedCookie } from './lib/hydrateSession'
import type { Session } from '@supabase/supabase-js'

async function bootstrap() {
  // getSession() automatically handles OAuth callbacks (PKCE code exchange /
  // implicit-flow hash tokens) and cleans up the URL before we render.
  const { data } = await supabase.auth.getSession()
  let initialSession: Session | null = data.session
  if (!initialSession) {
    await hydrateFromSharedCookie()
    const { data: refreshed } = await supabase.auth.getSession()
    initialSession = refreshed.session
  }

  const rootElement = document.getElementById('root')
  if (!rootElement) throw new Error('Root element #root not found in index.html')
  createRoot(rootElement).render(
    <React.StrictMode>
      <App initialSession={initialSession} />
    </React.StrictMode>
  )
}

bootstrap()
