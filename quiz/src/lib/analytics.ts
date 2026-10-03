// Typed product-analytics layer.
//
// Every analytics event flows through the single typed `track()` sink below.
// `AnalyticsEventMap` is the one source of truth for the event catalogue and
// the exact param shape of each event, so a wrong or missing param is a compile
// error rather than a silently-malformed `gtag` call. Events land in GA4.
//
// Google Analytics is not in index.html: `initAnalytics()` (main.tsx, before
// the first render) decides whether this visit is measured at all — production
// host, a person rather than automation, not opted out (lib/analyticsPolicy.ts)
// — and only then defines `gtag` and loads the tag. Everywhere else `gtag` is
// undefined and every call here is a no-op, which is what keeps the dev server,
// previews, the e2e suite and crawlers out of the numbers.
//
// The app sends its own page views (`trackPageView`, from usePageTracking): the
// tag is configured with `send_page_view: false`, so GA4's history-change page
// views must be off in the stream's enhanced-measurement settings or every
// navigation counts twice. docs/analytics-and-monitoring.md has the property
// checklist.
//
// Event families:
//   • Engagement (quiz_started, question_answered, …) — fire every time.
//   • Activation funnel (sign_up → first_quiz → first_correct →
//     concept_collected → day2_return) — at most once per device, gated in
//     lib/funnel.ts. The instrument panel the roadmap is judged against.
//   • Reading (content_view, search) — what is read and looked for, including
//     the concept popup and the PDF reader, which never change the URL.
//   • first_interaction — the first real pointer, key, touch or wheel input of
//     a page load: the line between a person and a page that was merely loaded.

import { reachMilestone, recordVisitAndCheckDay2 } from './funnel'
import {
  ANALYTICS_STORAGE,
  CONTROL_PARAMS,
  GA_MEASUREMENT_ID,
  contentGroup,
  decideMeasurement,
  fitParams,
  isInternalAccount,
  pageLocation,
  readControlParam,
  redactPii,
} from './analyticsPolicy'

/** The full event catalogue: event name → its params. Add events here first. */
export interface AnalyticsEventMap {
  // ── Pages & people ────────────────────────────────────────────────────────
  page_view: { page_location: string; page_title: string; content_group: string; page_referrer?: string }
  first_interaction: { input_type: string; seconds_to_interaction: number }

  // ── Reading (no URL of their own) ─────────────────────────────────────────
  /** A page opened in the concept popup, or a document in the PDF reader. */
  content_view: { content_type: string; content_name: string; surface: string }
  /** GA4's recommended site-search event, fired once the reader stops typing. */
  search: { search_term: string; search_scope: string }

  // ── Engagement (fire every time) ──────────────────────────────────────────
  quiz_started: { mode: string; exam: string; question_count: number }
  question_answered: { question_id: string; is_correct: boolean; exam: string; mode: string }
  quiz_completed: { mode: string; exam: string; question_count: number; correct_count: number }
  flashcard_reviewed: { concept: string; kind: string }
  streak_extended: { length: number; longest: number }
  xp_earned: { amount: number; total: number }
  daily_goal_met: { goal: string; xp: number }
  quest_completed: { quest: string; gems: number; xp: number }
  quest_claimed: { quests: number; gems: number; xp: number }
  daily_quests_cleared: { quests: number }
  league_joined: { tier: number }
  league_left: Record<string, never>
  /** A quiz built on the Search page — the query and filters it was built from. */
  search_query: { query: string; exam: string; difficulty: string }
  battle_started: { format: string; matched: boolean; exam?: string; rounds?: number }
  project_started: { project: string; mode: string; language: string }
  upgrade_clicked: Record<string, never>
  /** A Store product's link to its seller — the Store sells nothing itself (docs/store.md). */
  store_outbound_clicked: { product: string; seller: string; aisle: string }
  login: { method: string }

  // ── Reliability (from lib/errorMonitoring.ts) ─────────────────────────────
  exception: { description: string; fatal: boolean }

  // ── Activation funnel ─────────────────────────────────────────────────────
  // `sign_up` fires at the point of account creation (naturally once); the
  // rest are gated to fire at most once per device via lib/funnel.ts.
  sign_up: { method: string }
  first_quiz: { mode: string; exam: string }
  first_correct: { mode: string; exam: string }
  concept_collected: { concept: string }
  day2_return: Record<string, never>
}

export type AnalyticsEvent = keyof AnalyticsEventMap

/**
 * User-scoped properties: who the reader is, in a handful of low-cardinality
 * values, so any report can be split by them. Each must be registered as a
 * user-scoped custom dimension in the GA4 property before it shows in reports.
 */
export interface AnalyticsUserProperties {
  /** `guest` (signed out), `free` or `pro`. */
  account_type: 'guest' | 'free' | 'pro'
  /** The credential path the reader follows — `DEFAULT`, `ASA`, `ACAS`, `FSA`, `FCAS`. */
  credential_track: string
  theme: 'dark' | 'light'
}

// ── Runtime state ────────────────────────────────────────────────────────────

/** Stopped at run time by the Settings switch; `gtag` stays defined but silent. */
let stopped = false
/** The config the tag was given, re-sent whole when identity changes. */
let tagConfig: Record<string, unknown> = {}
/** The last page view's URL — the next page view's referrer. */
let lastPageLocation: string | null = null
let sentUserProperties: Partial<AnalyticsUserProperties> = {}
let removeInteractionListeners: (() => void) | null = null

function gtagFn(): ((...args: unknown[]) => void) | null {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return null
  return window.gtag
}

/**
 * The single typed analytics sink. Events with no params (`Record<string,
 * never>`) are called as `track('day2_return')`; all others require their typed
 * params. No-ops when `gtag` isn't defined — an unmeasured visit, SSR, tests —
 * and after the reader switches analytics off.
 */
export function track<E extends AnalyticsEvent>(
  event: E,
  ...params: AnalyticsEventMap[E] extends Record<string, never> ? [] : [AnalyticsEventMap[E]]
): void {
  const gtag = gtagFn()
  if (!gtag || stopped) return
  gtag('event', event, params[0] && fitParams(params[0]))
}

// ── Boot ─────────────────────────────────────────────────────────────────────

function safe<T>(fn: () => T, fallback: T): T {
  try {
    return fn()
  } catch {
    return fallback
  }
}

function readFlag(storage: Storage | undefined, key: string): boolean {
  return safe(() => storage?.getItem(key) === '1', false)
}

function writeFlag(storage: Storage | undefined, key: string, on: boolean): void {
  safe(() => (on ? storage?.setItem(key, '1') : storage?.removeItem(key)), undefined)
}

function local(): Storage | undefined {
  return safe(() => (typeof localStorage === 'undefined' ? undefined : localStorage), undefined)
}

function session(): Storage | undefined {
  return safe(() => (typeof sessionStorage === 'undefined' ? undefined : sessionStorage), undefined)
}

/** Has the reader switched usage analytics off on this device (Settings)? */
export function isAnalyticsOptedOut(): boolean {
  return readFlag(local(), ANALYTICS_STORAGE.optOut)
}

/** Is this device marked as the team's own (`?internal=1`, or an internal account)? */
export function isInternalDevice(): boolean {
  return readFlag(local(), ANALYTICS_STORAGE.internal)
}

/**
 * Decide whether this visit is measured and, if it is, define `gtag`, state
 * consent, configure the tag and load it. Idempotent; call once at boot,
 * before the first render, so the first page view carries the full config.
 */
export function initAnalytics(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined' || gtagFn()) return

  // The URL's switches first, so `?ga_debug=1` can measure a preview host and
  // `?internal=1` labels the very visit that set it.
  const search = window.location.search
  const internalParam = readControlParam(search, CONTROL_PARAMS.internal)
  if (internalParam !== null) writeFlag(local(), ANALYTICS_STORAGE.internal, internalParam)
  const debugParam = readControlParam(search, CONTROL_PARAMS.debug)
  if (debugParam !== null) writeFlag(session(), ANALYTICS_STORAGE.debug, debugParam)
  const debug = readFlag(session(), ANALYTICS_STORAGE.debug)

  const decision = decideMeasurement({
    hostname: window.location.hostname,
    userAgent: safe(() => navigator.userAgent, ''),
    webdriver: safe(() => navigator.webdriver === true, false),
    optedOut: isAnalyticsOptedOut(),
    debug,
  })
  if (!decision.measure) return
  startTag(debug)
}

function startTag(debug: boolean): void {
  stopped = false
  window[`ga-disable-${GA_MEASUREMENT_ID}`] = false
  window.dataLayer = window.dataLayer || []
  // gtag.js reads `arguments` objects off the data layer — not arrays — so
  // this must be a `function`, exactly as Google's snippet writes it.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  const gtag = window.gtag

  // Consent before anything else. The app shows no ads and sells no data, so
  // the advertising signals are denied everywhere; analytics storage is on
  // until the reader turns it off in Settings.
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'granted',
  })
  gtag('js', new Date())
  // The landing URL without its auth codes, fragment or control switches —
  // what session_start and first_visit report until the first page view.
  gtag('set', { page_location: currentPageLocation() })
  tagConfig = {
    // usePageTracking sends every page view, the first included, once the
    // route has settled — see trackPageView.
    send_page_view: false,
    // Google signals add demographics only by thresholding (hiding) rows in a
    // property this size; ads personalisation has nothing to personalise.
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    ...(isInternalDevice() ? { traffic_type: 'internal' } : {}),
    ...(debug ? { debug_mode: true } : {}),
  }
  gtag('config', GA_MEASUREMENT_ID, tagConfig)

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  installInteractionSignal()
}

function currentPageLocation(): string {
  const { origin, pathname, search } = window.location
  return pageLocation(origin, pathname, search)
}

/** Re-send the tag's config after identity changes. Never sends a page view. */
function reconfigure(patch: Record<string, unknown>): void {
  const gtag = gtagFn()
  if (!gtag) return
  if (Object.entries(patch).every(([k, v]) => (tagConfig[k] ?? null) === (v ?? null))) return
  tagConfig = { ...tagConfig, ...patch }
  gtag('config', GA_MEASUREMENT_ID, tagConfig)
}

/**
 * Who is signed in: the account's id becomes GA4's `user_id` (an opaque UUID —
 * never the email, which Google's terms forbid), so one person on a phone and
 * a laptop is one user. An internal account marks the device internal for
 * good. Call at boot with the restored session and again on every change.
 */
export function identifyUser(user: { id: string; email?: string | null } | null): void {
  if (user && isInternalAccount(user.email) && !isInternalDevice()) {
    writeFlag(local(), ANALYTICS_STORAGE.internal, true)
  }
  reconfigure({
    user_id: user ? user.id : null,
    ...(isInternalDevice() ? { traffic_type: 'internal' } : {}),
  })
}

/** Set user-scoped properties; only values that changed are sent. */
export function setUserProperties(props: Partial<AnalyticsUserProperties>): void {
  const gtag = gtagFn()
  if (!gtag || stopped) return
  const changed: Partial<AnalyticsUserProperties> = {}
  for (const [key, value] of Object.entries(props) as [keyof AnalyticsUserProperties, string][]) {
    if (sentUserProperties[key] !== value) Object.assign(changed, { [key]: value })
  }
  if (Object.keys(changed).length === 0) return
  sentUserProperties = { ...sentUserProperties, ...changed }
  gtag('set', 'user_properties', changed)
}

// ── Pages ────────────────────────────────────────────────────────────────────

/**
 * One page view, for the address the reader settled on. The URL is cleaned
 * (lib/analyticsPolicy.ts → `pageLocation`), the section rides along as GA4's
 * content group, and the previous page is the referrer — the first page view
 * leaves it to GA4, which reads `document.referrer` for the visit's source.
 */
export function trackPageView(page: { pathname: string; search: string; title: string }): void {
  const gtag = gtagFn()
  if (!gtag || stopped) return
  const location = pageLocation(window.location.origin, page.pathname, page.search)
  // Events sent before the next page view (first_interaction, quiz events…)
  // report this page, not whatever the address bar held when they fired.
  gtag('set', { page_location: location, page_title: page.title })
  track('page_view', {
    page_location: location,
    page_title: page.title,
    content_group: contentGroup(page.pathname),
    ...(lastPageLocation ? { page_referrer: lastPageLocation } : {}),
  })
  lastPageLocation = location
}

// ── Human signal ─────────────────────────────────────────────────────────────

const INTERACTION_EVENTS = ['pointerdown', 'keydown', 'touchstart', 'wheel'] as const

function inputType(event: Event): string {
  if (event.type === 'keydown') return 'keyboard'
  if (event.type === 'wheel') return 'wheel'
  if (event.type === 'touchstart') return 'touch'
  const pointer = (event as PointerEvent).pointerType
  return pointer || 'mouse'
}

/**
 * `first_interaction`, once per page load, on the first *trusted* pointer,
 * key, touch or wheel event — input a script can't fake with dispatchEvent.
 * A session with one had a person in it; segment on it in GA4 to separate
 * readers from pages that were only ever loaded.
 */
function installInteractionSignal(): void {
  if (removeInteractionListeners || typeof window.addEventListener !== 'function') return
  const startedAt = safe(() => performance.now(), 0)
  const options: AddEventListenerOptions = { capture: true, passive: true }
  const onInput = (event: Event) => {
    if (!event.isTrusted) return
    removeInteractionListeners?.()
    const elapsed = safe(() => performance.now(), startedAt) - startedAt
    track('first_interaction', {
      input_type: inputType(event),
      seconds_to_interaction: Math.max(0, Math.round(elapsed / 1000)),
    })
  }
  const target = window
  for (const type of INTERACTION_EVENTS) target.addEventListener(type, onInput, options)
  removeInteractionListeners = () => {
    for (const type of INTERACTION_EVENTS) target.removeEventListener(type, onInput, options)
    removeInteractionListeners = null
  }
}

// ── Opt-out ──────────────────────────────────────────────────────────────────

function clearAnalyticsCookies(): void {
  safe(() => {
    const host = window.location.hostname
    const parts = host.split('.')
    const domains = ['', host, ...parts.slice(1).map((_, i) => `.${parts.slice(i + 1).join('.')}`)]
    for (const raw of document.cookie.split(';')) {
      const name = raw.split('=')[0]!.trim()
      if (!name.startsWith('_ga')) continue
      for (const domain of domains) {
        document.cookie = `${name}=; Max-Age=0; Path=/${domain ? `; Domain=${domain}` : ''}`
      }
    }
  }, undefined)
}

/**
 * The Settings switch. Off: nothing more is sent from this device, analytics
 * storage is withdrawn and the `_ga` cookies are deleted. On again: the tag
 * starts (or resumes) as if the visit had begun measured.
 */
export function setAnalyticsOptOut(optOut: boolean): void {
  writeFlag(local(), ANALYTICS_STORAGE.optOut, optOut)
  const gtag = gtagFn()
  if (optOut) {
    if (gtag) gtag('consent', 'update', { analytics_storage: 'denied' })
    stopped = true
    if (typeof window !== 'undefined') window[`ga-disable-${GA_MEASUREMENT_ID}`] = true
    removeInteractionListeners?.()
    clearAnalyticsCookies()
    return
  }
  if (gtag) {
    stopped = false
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = false
    gtag('consent', 'update', { analytics_storage: 'granted' })
    return
  }
  initAnalytics()
}

// ── Engagement wrappers ──────────────────────────────────────────────────────
// Thin, named wrappers kept so existing call sites read clearly and the event
// name lives in exactly one place.

export function trackQuizStarted(params: AnalyticsEventMap['quiz_started']) {
  track('quiz_started', params)
}

export function trackQuestionAnswered(params: AnalyticsEventMap['question_answered']) {
  track('question_answered', params)
}

export function trackQuizCompleted(params: AnalyticsEventMap['quiz_completed']) {
  track('quiz_completed', params)
}

export function trackFlashcardReviewed(params: AnalyticsEventMap['flashcard_reviewed']) {
  track('flashcard_reviewed', params)
}

export function trackSearchQuery(params: AnalyticsEventMap['search_query']) {
  track('search_query', { ...params, query: redactPii(params.query) })
}

/** What a reader typed into a search box, once they stopped typing (`hooks/useSearchTracking.ts`). */
export function trackSearch(params: AnalyticsEventMap['search']) {
  track('search', { ...params, search_term: redactPii(params.search_term) })
}

/** A page opened in the concept popup or a document in the PDF reader (`components/AnalyticsTracker.tsx`). */
export function trackContentView(params: AnalyticsEventMap['content_view']) {
  track('content_view', params)
}

/** Fires when a day of study lengthens the streak (not on same-day repeats). */
export function trackStreakExtended(params: AnalyticsEventMap['streak_extended']) {
  track('streak_extended', params)
}

/** Fires each time a quiz awards XP (roadmap P1.2). */
export function trackXpEarned(params: AnalyticsEventMap['xp_earned']) {
  track('xp_earned', params)
}

/** Fires the first time the daily XP goal is reached on a given day. */
export function trackDailyGoalMet(params: AnalyticsEventMap['daily_goal_met']) {
  track('daily_goal_met', params)
}

/** Fires once per quest per day, when its target is reached (roadmap P1.4). */
export function trackQuestCompleted(params: AnalyticsEventMap['quest_completed']) {
  track('quest_completed', params)
}

/** Fires when the student collects quest rewards (the actual gem/XP payout). */
export function trackQuestClaimed(params: AnalyticsEventMap['quest_claimed']) {
  track('quest_claimed', params)
}

/** Fires when the last of the day's quests is cleared. */
export function trackDailyQuestsCleared(params: AnalyticsEventMap['daily_quests_cleared']) {
  track('daily_quests_cleared', params)
}

/** A Quiz Battle begins — on one screen, or online as host or guest. */
export function trackBattleStarted(params: AnalyticsEventMap['battle_started']) {
  track('battle_started', params)
}

/** A project attempt is created on the Projects tab (the PCPA simulator). */
export function trackProjectStarted(params: AnalyticsEventMap['project_started']) {
  track('project_started', params)
}

export function trackUpgradeClicked() {
  track('upgrade_clicked')
}

/** Fires when a reader follows a Store product out to its seller. */
export function trackStoreOutbound(params: AnalyticsEventMap['store_outbound_clicked']) {
  track('store_outbound_clicked', params)
}

/** Fires when the student opts in to the weekly XP league (roadmap P4.1). */
export function trackLeagueJoined(params: AnalyticsEventMap['league_joined']) {
  track('league_joined', params)
}

/** Fires when the student opts out of the weekly XP league. */
export function trackLeagueLeft() {
  track('league_left')
}

/** A returning reader signed in (GA4's recommended `login`). */
export function trackLogin(method: string = 'password') {
  track('login', { method })
}

// ── Activation-funnel helpers ────────────────────────────────────────────────

/** Account created (GA4's recommended `sign_up`). Fires at the signup action — once per account. */
export function trackSignup(method: string = 'password') {
  track('sign_up', { method })
}

/** First quiz ever started on this device. */
export function trackFirstQuiz(params: AnalyticsEventMap['first_quiz']) {
  if (reachMilestone('first_quiz')) track('first_quiz', params)
}

/** First correct answer ever on this device. */
export function trackFirstCorrect(params: AnalyticsEventMap['first_correct']) {
  if (reachMilestone('first_correct')) track('first_correct', params)
}

/** First flashcard/concept ever collected on this device. */
export function trackConceptCollected(params: AnalyticsEventMap['concept_collected']) {
  if (reachMilestone('concept_collected')) track('concept_collected', params)
}

/**
 * Call once on app boot. Records the visit and, if the user is returning on a
 * later calendar day than their first-ever visit, fires `day2_return` once.
 */
export function trackDay2ReturnOnBoot() {
  if (recordVisitAndCheckDay2()) track('day2_return')
}

/** Test seam: forget the module's run-time state. */
export function resetAnalyticsForTests(): void {
  stopped = false
  tagConfig = {}
  lastPageLocation = null
  sentUserProperties = {}
  removeInteractionListeners?.()
  removeInteractionListeners = null
}
