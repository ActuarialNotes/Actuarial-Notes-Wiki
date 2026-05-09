import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { supabase } from './lib/supabase'
import { hydrateFromSharedCookie } from './lib/hydrateSession'

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
