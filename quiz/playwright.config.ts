import { defineConfig, devices } from '@playwright/test'

// E2E smoke suite (roadmap P0.5). Guards the critical paths — landing, wiki,
// running a quiz, collecting a card, and the store/auth shells — against
// regressions from feature work and the god-component refactors (P3.1).
//
// The suite runs against a *production build* served by `vite preview`, so it
// exercises the same bundled markdown content and code splitting users get.
// Auth/sync (Supabase) is never hit: every asserted flow works from a fresh,
// signed-out browser using the bundled question/wiki content and localStorage
// fallbacks, so dummy Supabase env vars are enough to build and boot the app.

const PORT = Number(process.env.E2E_PORT ?? 4173)
const HOST = '127.0.0.1'
const baseURL = `http://${HOST}:${PORT}`

// Supabase throws at import time without these, so provide inert placeholders
// for the build/preview the webServer runs. They never receive a real request.
const buildEnv = {
  VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL ?? 'https://e2e.placeholder.supabase.co',
  VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY ?? 'e2e-placeholder-anon-key',
}

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['github'], ['list']] : [['list']],
  use: {
    baseURL,
    trace: 'on-first-retry',
    // Collect animations (card ceremony, level-up toasts) resolve instantly,
    // keeping the smoke flows deterministic.
    reducedMotion: 'reduce',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: `npm run build && npm run preview -- --port ${PORT} --host ${HOST} --strictPort`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    env: buildEnv,
  },
})
