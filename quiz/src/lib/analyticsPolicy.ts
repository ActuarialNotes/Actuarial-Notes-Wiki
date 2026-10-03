// Who is measured, and how a page is named — the pure half of the analytics
// layer (lib/analytics.ts is the half that talks to Google Analytics).
//
// The point of the analytics is to learn how *people* study with the app, so
// the first job is keeping everything else out of the property:
//
//   • the dev server, `vite preview` (the e2e suite) and Vercel preview
//     deployments — only the production host is measured;
//   • automation — a browser driven by WebDriver/CDP (Playwright, Puppeteer,
//     Selenium) says so in `navigator.webdriver`, and crawlers, auditors and
//     headless browsers say so in their user agent;
//   • whoever opted out in Settings.
//
// What is left is labelled rather than dropped: the developer's own devices
// carry `traffic_type: 'internal'` (GA4's internal-traffic data filter keys on
// it), and a session opened with `?ga_debug=1` carries `debug_mode` so it shows
// in DebugView. See docs/analytics-and-monitoring.md.
//
// Everything here is pure and tested (analyticsPolicy.test.ts).

/** The GA4 web stream every event is sent to. */
export const GA_MEASUREMENT_ID = 'G-YTVSN1NTV9'

/** The production app. Anything else — localhost, a `*.vercel.app` preview — is not measured. */
export const MEASURED_HOSTS: readonly string[] = ['quiz.actuarialnotes.com']

/**
 * Accounts whose activity is the team's own, not a candidate's. Signing in as
 * one marks the device internal for good, so its signed-out visits stay out of
 * the numbers too. Compared on this device only — the address is never sent.
 */
export const INTERNAL_TRAFFIC_EMAILS: readonly string[] = ['jordan@actuarialnotes.com']

/** Storage keys — localStorage unless noted. */
export const ANALYTICS_STORAGE = {
  optOut: 'actuarial-analytics-opt-out',
  internal: 'actuarial-analytics-internal',
  /** sessionStorage: debug lasts the tab, not the device. */
  debug: 'actuarial-analytics-debug',
} as const

/**
 * The query parameters that switch a device's labels — `?internal=1` (or `0`)
 * and `?ga_debug=1` (or `0`). They are instructions to this module, not part
 * of the page, so they are stripped from every reported URL.
 */
export const CONTROL_PARAMS = { internal: 'internal', debug: 'ga_debug' } as const

// Self-identified crawlers, auditors and headless browsers. GA4 already drops
// the IAB's known-bot list server-side; this catches what runs our JavaScript
// anyway (rendering crawlers, Lighthouse, uptime checks) before it is counted.
// `\bbot\b` rather than a bare `bot`, so a phone model like "CUBOT" isn't one.
const AGENT_PATTERN = new RegExp(
  [
    '\\b(bot|crawler|spider|crawling|scraper)\\b',
    '[a-z]bot/\\d',
    'googlebot', 'google-inspectiontool', 'adsbot', 'mediapartners-google', 'apis-google',
    'bingbot', 'bingpreview', 'yandexbot', 'baiduspider', 'duckduckbot', 'slurp', 'applebot',
    'petalbot', 'semrush', 'ahrefs', 'mj12bot', 'dotbot', 'bytespider', 'gptbot', 'claudebot',
    'perplexitybot', 'ccbot', 'facebookexternalhit', 'embedly', 'ia_archiver',
    'headlesschrome', 'phantomjs', 'lighthouse', 'pagespeed', 'gtmetrix', 'pingdom',
    'uptimerobot', 'prerender', 'rendertron', 'cypress', 'playwright', 'puppeteer', 'selenium',
  ].join('|'),
  'i',
)

/** Does the user agent say it is a crawler, an auditor or a headless browser? */
export function isAutomatedUserAgent(userAgent: string): boolean {
  return AGENT_PATTERN.test(userAgent)
}

export function isMeasuredHost(hostname: string): boolean {
  return MEASURED_HOSTS.includes(hostname.toLowerCase())
}

export function isInternalAccount(email: string | null | undefined): boolean {
  if (!email) return false
  const normalized = email.trim().toLowerCase()
  return INTERNAL_TRAFFIC_EMAILS.some(e => e.toLowerCase() === normalized)
}

export interface MeasurementContext {
  hostname: string
  userAgent: string
  /** `navigator.webdriver` — true under Playwright, Puppeteer, Selenium. */
  webdriver: boolean
  optedOut: boolean
  /** A debug session (`?ga_debug=1`) is measured on any host, so a preview build can be checked in DebugView. */
  debug: boolean
}

export type MeasurementDecision =
  | { measure: true }
  | { measure: false; reason: 'opted-out' | 'automation' | 'host' }

/** Should this visit reach Google Analytics at all? */
export function decideMeasurement(ctx: MeasurementContext): MeasurementDecision {
  if (ctx.optedOut) return { measure: false, reason: 'opted-out' }
  if (ctx.webdriver || isAutomatedUserAgent(ctx.userAgent)) return { measure: false, reason: 'automation' }
  if (!ctx.debug && !isMeasuredHost(ctx.hostname)) return { measure: false, reason: 'host' }
  return { measure: true }
}

/**
 * What a `?internal=` / `?ga_debug=` parameter asks for: `true` to switch the
 * label on, `false` to switch it off, `null` when the URL doesn't mention it.
 */
export function readControlParam(search: string, name: string): boolean | null {
  const value = new URLSearchParams(search).get(name)
  if (value === null) return null
  return !['0', 'false', 'off', 'no'].includes(value.trim().toLowerCase())
}

// ── Pages ─────────────────────────────────────────────────────────────────────

/**
 * The app's sections, as GA4's built-in **Content group** dimension. A wiki
 * has thousands of URLs; this is the column that says which part of the app a
 * reader was in, so the Pages report can be read a tab at a time. Prefixes are
 * matched longest first; `/` is only ever itself.
 */
const CONTENT_GROUPS: ReadonlyArray<readonly [prefix: string, group: string]> = [
  ['/', 'Quiz builder'],
  ['/quiz', 'Quiz'],
  ['/review', 'Quiz review'],
  ['/battle', 'Quiz Battle'],
  ['/dashboard', 'Dashboard'],
  ['/flashcards', 'Flashcards'],
  ['/search', 'Search'],
  ['/browse', 'Search'],
  ['/wiki', 'Study guides'],
  ['/wiki/exam', 'Study guides'],
  ['/wiki/concept', 'Concepts'],
  ['/wiki/resources', 'Resources'],
  ['/wiki/resource', 'Resources'],
  ['/project', 'Projects'],
  ['/store', 'Store'],
  ['/store/gems', 'Gem Shop'],
  ['/upgrade', 'Upgrade'],
  ['/settings', 'Settings'],
  ['/auth', 'Account'],
  ['/actuaria', 'Actuaria'],
  ['/cowork', 'Cowork'],
  ['/research', 'Research'],
]

function normalizePath(pathname: string): string {
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
}

export function contentGroup(pathname: string): string {
  const path = normalizePath(pathname)
  let best: readonly [string, string] | null = null
  for (const entry of CONTENT_GROUPS) {
    const [prefix] = entry
    const match = path === prefix || (prefix !== '/' && path.startsWith(`${prefix}/`))
    if (match && (!best || prefix.length > best[0].length)) best = entry
  }
  return best ? best[1] : 'Other'
}

export type NavigationAction = 'PUSH' | 'POP' | 'REPLACE'

export interface PageAddress {
  pathname: string
  search: string
}

/**
 * Is this change of address a new page view? A new path always is. A new
 * query string is when the reader *went* there (a link, Back) — not when the
 * page rewrote its own address in place (`REPLACE`): the resource shelf's and
 * the Store's filters, the flashcard deck's view, each click of which used to
 * be counted as another visit to the page.
 */
export function isNewPageView(prev: PageAddress | null, next: PageAddress, action: NavigationAction): boolean {
  if (!prev) return true
  if (normalizePath(prev.pathname) !== normalizePath(next.pathname)) return true
  if (prev.search === next.search) return false
  return action !== 'REPLACE'
}

// Query parameters that must never leave the device: the auth flows' codes and
// tokens (Supabase cleans the URL on arrival, but a page view must not depend
// on that) and anything naming a person.
const PRIVATE_PARAMS = new Set([
  'code', 'token', 'token_hash', 'access_token', 'refresh_token', 'id_token', 'provider_token',
  'email', 'password', 'invite', 'invite_code',
])

const EMAIL_PATTERN = /[^\s@/?#&=]+@[^\s@/?#&=]+\.[^\s@/?#&=]+/g
// A run of 7+ digits (allowing spaces/dashes inside) — a phone or card number.
const LONG_NUMBER_PATTERN = /\d(?:[\s-]?\d){6,}/g

/**
 * Free text with anything that looks like an email address or a long number
 * (phone, card, member id) blanked out. Google's terms forbid sending personal
 * information, and a search box is where a reader might type some.
 */
export function redactPii(text: string): string {
  return text.replace(EMAIL_PATTERN, '[redacted email]').replace(LONG_NUMBER_PATTERN, '[redacted number]')
}

/**
 * The URL a page view reports: no fragment, no auth codes or tokens, none of
 * this module's control switches, and free-text values redacted. Campaign
 * parameters (`utm_*`, `gclid`) are kept — they are how GA4 attributes the
 * visit that landed on this page.
 */
export function pageLocation(origin: string, pathname: string, search: string): string {
  const params = new URLSearchParams(search)
  const kept = new URLSearchParams()
  for (const [key, value] of params) {
    const lower = key.toLowerCase()
    if (PRIVATE_PARAMS.has(lower)) continue
    if (lower === CONTROL_PARAMS.internal || lower === CONTROL_PARAMS.debug) continue
    kept.append(key, redactPii(value))
  }
  const query = kept.toString()
  return `${origin}${pathname}${query ? `?${query}` : ''}`
}

// ── Event parameters ─────────────────────────────────────────────────────────

/**
 * GA4 truncates an event parameter's value at 100 characters — except the
 * page parameters, which have their own limits. Cutting here keeps the cut at
 * a known place rather than wherever Google's falls.
 */
const PARAM_LIMITS: Record<string, number> = { page_location: 1000, page_referrer: 420, page_title: 300 }
const DEFAULT_PARAM_LIMIT = 100

export function fitParams<T extends Record<string, unknown>>(params: T): T {
  const out: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(params)) {
    out[key] = typeof value === 'string' ? value.slice(0, PARAM_LIMITS[key] ?? DEFAULT_PARAM_LIMIT) : value
  }
  return out as T
}

/**
 * A search box's text as a reportable term: trimmed, whitespace collapsed,
 * lower-cased (so "Bayes" and "bayes " are one row), personal details redacted.
 * Empty when there is nothing worth reporting.
 */
export function searchTerm(raw: string): string {
  const term = raw.trim().replace(/\s+/g, ' ').toLowerCase()
  return term.length < 2 ? '' : redactPii(term)
}

/**
 * What a page in the concept popup or a document in the PDF reader is, as a
 * `content_view`'s type and name. A document's own title is generic
 * ("Examiner's Report"), so its paper ("Exam 5 · Spring 2019") rides with it.
 */
export function describeContent(ref: { kind: string; name: string; subtitle?: string }): {
  content_type: string
  content_name: string
} {
  return { content_type: ref.kind, content_name: ref.subtitle ? `${ref.name} · ${ref.subtitle}` : ref.name }
}
