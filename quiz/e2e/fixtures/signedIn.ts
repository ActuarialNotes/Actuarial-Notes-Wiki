import type { Page, Route } from '@playwright/test'

// A signed-in browser with no backend: a session planted where supabase-js
// keeps it (unexpired, so nothing is refreshed), and the placeholder project's
// REST and Auth endpoints answered here. Every read the app makes that a spec
// doesn't care about gets an empty answer; `rpc` answers the ones it does.
//
// The e2e build points Supabase at https://e2e.placeholder.supabase.co (see
// playwright.config.ts), so supabase-js keeps the session under `sb-e2e-auth-token`.

export const PLACEHOLDER = 'https://e2e.placeholder.supabase.co'
export const USER_ID = '0e2e0000-0000-4000-8000-00000000a0a0'

export interface SignedInOptions {
  displayName?: string
  /** exam_progress rows: which exams the account is studying. */
  examProgress?: { exam_id: string; status: string; target_date: string | null }[]
  /** An RPC's answer by name, given its arguments. Undefined falls through to null. */
  rpc?: Record<string, (args: Record<string, unknown>) => unknown>
}

export async function signIn(page: Page, opts: SignedInOptions = {}) {
  const user = {
    id: USER_ID,
    aud: 'authenticated',
    role: 'authenticated',
    email: 'ada@example.com',
    user_metadata: { display_name: opts.displayName ?? 'Ada' },
    app_metadata: { provider: 'email' },
    created_at: '2026-01-01T00:00:00Z',
  }
  const session = {
    access_token: 'e2e-access-token',
    refresh_token: 'e2e-refresh-token',
    token_type: 'bearer',
    expires_in: 3600 * 24 * 365,
    expires_at: Math.floor(Date.now() / 1000) + 3600 * 24 * 365,
    user,
  }
  await page.addInitScript(s => {
    localStorage.setItem('sb-e2e-auth-token', JSON.stringify(s))
  }, session)

  await page.route(`${PLACEHOLDER}/**`, async (route: Route) => {
    const url = new URL(route.request().url())
    const json = (body: unknown, status = 200) =>
      route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) })
    if (url.pathname.startsWith('/auth/v1/user')) return json(user)
    if (url.pathname.startsWith('/auth/v1/')) return json({})
    if (url.pathname.startsWith('/rest/v1/rpc/')) {
      const name = url.pathname.slice('/rest/v1/rpc/'.length)
      let args: Record<string, unknown> = {}
      try { args = route.request().postDataJSON() ?? {} } catch { /* no body */ }
      const answer = opts.rpc?.[name]?.(args)
      return json(answer === undefined ? null : answer)
    }
    if (url.pathname === '/rest/v1/exam_progress' && route.request().method() === 'GET') {
      return json((opts.examProgress ?? []).map(r => ({ user_id: USER_ID, ...r })))
    }
    // Any other read is empty, and any write succeeds.
    if (route.request().method() === 'GET' || route.request().method() === 'HEAD') {
      const single = (route.request().headers()['accept'] ?? '').includes('vnd.pgrst.object')
      return single ? json(null, 406) : json([])
    }
    return json(null, 201)
  })
}
