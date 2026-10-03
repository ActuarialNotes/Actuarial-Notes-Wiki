import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  identifyUser,
  initAnalytics,
  isAnalyticsOptedOut,
  resetAnalyticsForTests,
  setAnalyticsOptOut,
  setUserProperties,
  track,
  trackPageView,
  trackQuizStarted,
  trackSearch,
  trackUpgradeClicked,
  trackSignup,
  trackFirstQuiz,
  trackConceptCollected,
} from './analytics'
import { ANALYTICS_STORAGE, GA_MEASUREMENT_ID } from './analyticsPolicy'

// analytics.ts sends via window.gtag and gates funnel milestones through
// localStorage. Both are absent under Node, so stub them per-test.
let gtag: ReturnType<typeof vi.fn>

function memoryStorage() {
  const memory = new Map<string, string>()
  return {
    getItem: (k: string) => (memory.has(k) ? memory.get(k)! : null),
    setItem: (k: string, v: string) => void memory.set(k, v),
    removeItem: (k: string) => void memory.delete(k),
    clear: () => memory.clear(),
    key: () => null,
    length: 0,
  }
}

beforeEach(() => {
  resetAnalyticsForTests()
  gtag = vi.fn()
  vi.stubGlobal('window', { gtag, location: { origin: 'https://quiz.actuarialnotes.com' } })
  vi.stubGlobal('localStorage', memoryStorage())
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('track', () => {
  it('forwards the event name and params to gtag', () => {
    track('quiz_completed', { mode: 'quiz', exam: 'P', question_count: 10, correct_count: 7 })
    expect(gtag).toHaveBeenCalledWith('event', 'quiz_completed', {
      mode: 'quiz',
      exam: 'P',
      question_count: 10,
      correct_count: 7,
    })
  })

  it('sends param-less events with undefined params', () => {
    track('day2_return')
    expect(gtag).toHaveBeenCalledWith('event', 'day2_return', undefined)
  })

  it('no-ops when gtag is unavailable', () => {
    vi.stubGlobal('window', {})
    expect(() => track('upgrade_clicked')).not.toThrow()
  })
})

describe('engagement wrappers', () => {
  it('trackQuizStarted forwards its params', () => {
    trackQuizStarted({ mode: 'flashcards', exam: 'FM', question_count: 20 })
    expect(gtag).toHaveBeenCalledWith('event', 'quiz_started', {
      mode: 'flashcards',
      exam: 'FM',
      question_count: 20,
    })
  })

  it('trackUpgradeClicked sends the bare event', () => {
    trackUpgradeClicked()
    expect(gtag).toHaveBeenCalledWith('event', 'upgrade_clicked', undefined)
  })
})

describe('activation-funnel wrappers', () => {
  it('trackSignup always fires GA4’s recommended sign_up with the method', () => {
    trackSignup('password')
    expect(gtag).toHaveBeenCalledWith('event', 'sign_up', { method: 'password' })
  })

  it('trackFirstQuiz fires only once per device', () => {
    trackFirstQuiz({ mode: 'quiz', exam: 'P' })
    trackFirstQuiz({ mode: 'quiz', exam: 'P' })
    const firstQuizCalls = gtag.mock.calls.filter(c => c[1] === 'first_quiz')
    expect(firstQuizCalls).toHaveLength(1)
  })

  it('trackConceptCollected fires only once per device', () => {
    trackConceptCollected({ concept: 'Bayes Theorem' })
    trackConceptCollected({ concept: 'Poisson Distribution' })
    const collectedCalls = gtag.mock.calls.filter(c => c[1] === 'concept_collected')
    expect(collectedCalls).toHaveLength(1)
    expect(collectedCalls[0]![2]).toEqual({ concept: 'Bayes Theorem' })
  })
})

describe('event parameters', () => {
  it('cuts a string parameter at GA4’s 100 characters', () => {
    trackSearch({ search_term: 'x'.repeat(300), search_scope: 'Concepts' })
    const params = gtag.mock.calls.find(c => c[1] === 'search')![2] as { search_term: string }
    expect(params.search_term).toHaveLength(100)
  })

  it('redacts an email typed into a search', () => {
    trackSearch({ search_term: 'help me@example.com', search_scope: 'Search' })
    expect(gtag).toHaveBeenCalledWith('event', 'search', { search_term: 'help [redacted email]', search_scope: 'Search' })
  })
})

describe('trackPageView', () => {
  it('sends the cleaned URL, the content group, and the previous page as referrer', () => {
    trackPageView({ pathname: '/wiki/concept/Bayes', search: '?code=abc&utm_source=x', title: 'Bayes | Actuarial Notes' })
    expect(gtag).toHaveBeenCalledWith('set', {
      page_location: 'https://quiz.actuarialnotes.com/wiki/concept/Bayes?utm_source=x',
      page_title: 'Bayes | Actuarial Notes',
    })
    expect(gtag).toHaveBeenCalledWith('event', 'page_view', {
      page_location: 'https://quiz.actuarialnotes.com/wiki/concept/Bayes?utm_source=x',
      page_title: 'Bayes | Actuarial Notes',
      content_group: 'Concepts',
    })

    trackPageView({ pathname: '/quiz', search: '?exam=P', title: 'Practice Questions | Actuarial Notes' })
    expect(gtag).toHaveBeenLastCalledWith('event', 'page_view', {
      page_location: 'https://quiz.actuarialnotes.com/quiz?exam=P',
      page_title: 'Practice Questions | Actuarial Notes',
      content_group: 'Quiz',
      page_referrer: 'https://quiz.actuarialnotes.com/wiki/concept/Bayes?utm_source=x',
    })
  })
})

describe('setUserProperties', () => {
  it('sends only the values that changed', () => {
    setUserProperties({ account_type: 'guest', theme: 'dark' })
    setUserProperties({ account_type: 'guest', theme: 'light' })
    setUserProperties({ theme: 'light' })
    const sets = gtag.mock.calls.filter(c => c[0] === 'set' && c[1] === 'user_properties').map(c => c[2])
    expect(sets).toEqual([{ account_type: 'guest', theme: 'dark' }, { theme: 'light' }])
  })
})

// ── Boot, in a fake browser ──────────────────────────────────────────────────

interface FakeBrowser {
  window: Record<string, unknown> & { dataLayer?: IArguments[] }
  scripts: { src?: string; async?: boolean }[]
  listeners: Map<string, (event: unknown) => void>
  /** Every gtag command, as plain arrays. */
  commands: () => unknown[][]
}

function fakeBrowser(over: { hostname?: string; search?: string; userAgent?: string; webdriver?: boolean } = {}): FakeBrowser {
  const hostname = over.hostname ?? 'quiz.actuarialnotes.com'
  const listeners = new Map<string, (event: unknown) => void>()
  const scripts: { src?: string; async?: boolean }[] = []
  const win: FakeBrowser['window'] = {
    location: { hostname, origin: `https://${hostname}`, pathname: '/', search: over.search ?? '' },
    addEventListener: (type: string, fn: (event: unknown) => void) => void listeners.set(type, fn),
    removeEventListener: (type: string) => void listeners.delete(type),
  }
  vi.stubGlobal('window', win)
  vi.stubGlobal('document', {
    cookie: '',
    head: { appendChild: (el: { src?: string; async?: boolean }) => void scripts.push(el) },
    createElement: () => ({}),
  })
  vi.stubGlobal('navigator', {
    userAgent: over.userAgent ?? 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15',
    webdriver: over.webdriver ?? false,
  })
  vi.stubGlobal('sessionStorage', memoryStorage())
  return {
    window: win,
    scripts,
    listeners,
    commands: () => (win.dataLayer ?? []).map(args => Array.from(args)),
  }
}

describe('initAnalytics', () => {
  it('starts the tag on the production host: consent first, no automatic page view, no ads signals', () => {
    const browser = fakeBrowser()
    initAnalytics()
    expect(browser.scripts).toEqual([{ async: true, src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}` }])
    const commands = browser.commands()
    expect(commands[0]).toEqual([
      'consent',
      'default',
      { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted' },
    ])
    const config = commands.find(c => c[0] === 'config')!
    expect(config[1]).toBe(GA_MEASUREMENT_ID)
    expect(config[2]).toMatchObject({ send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false })
    expect(config[2]).not.toHaveProperty('traffic_type')
    expect(config[2]).not.toHaveProperty('debug_mode')
  })

  it.each([
    ['the dev server', { hostname: 'localhost' }],
    ['a Vercel preview', { hostname: 'actuarial-notes-abc123.vercel.app' }],
    ['a browser under automation', { webdriver: true }],
    ['a crawler', { userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' }],
  ])('leaves gtag undefined for %s', (_, over) => {
    const browser = fakeBrowser(over)
    initAnalytics()
    expect(browser.window.gtag).toBeUndefined()
    expect(browser.scripts).toHaveLength(0)
    expect(() => track('upgrade_clicked')).not.toThrow()
  })

  it('stays off for a reader who opted out', () => {
    const browser = fakeBrowser()
    localStorage.setItem(ANALYTICS_STORAGE.optOut, '1')
    initAnalytics()
    expect(browser.window.gtag).toBeUndefined()
  })

  it('?internal=1 labels the device internal from the visit that set it on', () => {
    const browser = fakeBrowser({ search: '?internal=1' })
    initAnalytics()
    expect(localStorage.getItem(ANALYTICS_STORAGE.internal)).toBe('1')
    expect(browser.commands().find(c => c[0] === 'config')![2]).toMatchObject({ traffic_type: 'internal' })
  })

  it('?ga_debug=1 measures a preview host in debug mode', () => {
    const browser = fakeBrowser({ hostname: 'localhost', search: '?ga_debug=1' })
    initAnalytics()
    expect(browser.commands().find(c => c[0] === 'config')![2]).toMatchObject({ debug_mode: true })
  })

  it('sends first_interaction once, on the first trusted input only', () => {
    const browser = fakeBrowser()
    initAnalytics()
    const onPointer = browser.listeners.get('pointerdown')!
    onPointer({ type: 'pointerdown', isTrusted: false, pointerType: 'mouse' })
    expect(browser.commands().some(c => c[1] === 'first_interaction')).toBe(false)
    onPointer({ type: 'pointerdown', isTrusted: true, pointerType: 'touch' })
    const sent = browser.commands().filter(c => c[1] === 'first_interaction')
    expect(sent).toHaveLength(1)
    expect(sent[0]![2]).toMatchObject({ input_type: 'touch' })
    expect(browser.listeners.size).toBe(0)
  })
})

describe('identifyUser', () => {
  it('sends the account id as user_id — never the email', () => {
    const browser = fakeBrowser()
    initAnalytics()
    identifyUser({ id: 'uuid-1', email: 'reader@example.com' })
    const configs = browser.commands().filter(c => c[0] === 'config')
    expect(configs.at(-1)![2]).toMatchObject({ user_id: 'uuid-1', send_page_view: false })
    expect(JSON.stringify(browser.commands())).not.toContain('reader@example.com')
  })

  it('does not re-send an unchanged identity', () => {
    const browser = fakeBrowser()
    initAnalytics()
    identifyUser(null)
    identifyUser({ id: 'uuid-1' })
    identifyUser({ id: 'uuid-1' })
    expect(browser.commands().filter(c => c[0] === 'config')).toHaveLength(2)
  })

  it('an internal account marks the device internal', () => {
    const browser = fakeBrowser()
    initAnalytics()
    identifyUser({ id: 'uuid-2', email: 'jordan@actuarialnotes.com' })
    expect(localStorage.getItem(ANALYTICS_STORAGE.internal)).toBe('1')
    expect(browser.commands().filter(c => c[0] === 'config').at(-1)![2]).toMatchObject({ traffic_type: 'internal' })
  })
})

describe('setAnalyticsOptOut', () => {
  it('silences the tag at once and remembers the choice; on again resumes it', () => {
    const browser = fakeBrowser()
    initAnalytics()
    setAnalyticsOptOut(true)
    expect(isAnalyticsOptedOut()).toBe(true)
    expect(browser.window[`ga-disable-${GA_MEASUREMENT_ID}`]).toBe(true)
    expect(browser.commands()).toContainEqual(['consent', 'update', { analytics_storage: 'denied' }])
    track('upgrade_clicked')
    expect(browser.commands().some(c => c[1] === 'upgrade_clicked')).toBe(false)

    setAnalyticsOptOut(false)
    expect(isAnalyticsOptedOut()).toBe(false)
    expect(browser.window[`ga-disable-${GA_MEASUREMENT_ID}`]).toBe(false)
    track('upgrade_clicked')
    expect(browser.commands().some(c => c[1] === 'upgrade_clicked')).toBe(true)
  })

  it('opting back in on a visit that started opted out starts the tag', () => {
    const browser = fakeBrowser()
    localStorage.setItem(ANALYTICS_STORAGE.optOut, '1')
    initAnalytics()
    expect(browser.window.gtag).toBeUndefined()
    setAnalyticsOptOut(false)
    expect(typeof browser.window.gtag).toBe('function')
    expect(browser.scripts).toHaveLength(1)
  })
})
