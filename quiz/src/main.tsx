import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { supabase } from './lib/supabase'
import { hydrateFromSharedCookie } from './lib/hydrateSession'
import type { Session } from '@supabase/supabase-js'
import bundledQuestions from 'virtual:questions-content'
import { setBundledQuestions } from './lib/github'
import { initErrorMonitoring } from './lib/errorMonitoring'
import { trackDay2ReturnOnBoot } from './lib/analytics'

setBundledQuestions(bundledQuestions)

// Capture uncaught errors and unhandled rejections from the very first tick,
// before any React render can throw.
initErrorMonitoring()

async function bootstrap() {
  // Detect email confirmation before getSession() strips the hash.
  if (window.location.hash.includes('type=signup')) {
    sessionStorage.setItem('show_welcome', '1')
  }

  // getSession() automatically handles OAuth callbacks (PKCE code exchange /
  // implicit-flow hash tokens) and cleans up the URL before we render.
  const { data } = await supabase.auth.getSession()
  let initialSession: Session | null = data.session
  if (!initialSession) {
    await hydrateFromSharedCookie()
    const { data: refreshed } = await supabase.auth.getSession()
    initialSession = refreshed.session
  }

  // Fire the day2_return activation signal once the session is resolved.
  trackDay2ReturnOnBoot()

  const rootElement = document.getElementById('root')
  if (!rootElement) throw new Error('Root element #root not found in index.html')
  createRoot(rootElement).render(
    <React.StrictMode>
      <App initialSession={initialSession} />
    </React.StrictMode>
  )
}

bootstrap()
