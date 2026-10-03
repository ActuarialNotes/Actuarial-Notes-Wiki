import { describe, it, expect } from 'vitest'
import {
  contentGroup,
  decideMeasurement,
  describeContent,
  fitParams,
  isAutomatedUserAgent,
  isInternalAccount,
  isMeasuredHost,
  isNewPageView,
  pageLocation,
  readControlParam,
  redactPii,
  searchTerm,
  type MeasurementContext,
} from './analyticsPolicy'

const CHROME =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
const IPHONE =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1'

function ctx(over: Partial<MeasurementContext> = {}): MeasurementContext {
  return { hostname: 'quiz.actuarialnotes.com', userAgent: CHROME, webdriver: false, optedOut: false, debug: false, ...over }
}

describe('decideMeasurement', () => {
  it('measures a person on the production host', () => {
    expect(decideMeasurement(ctx())).toEqual({ measure: true })
    expect(decideMeasurement(ctx({ userAgent: IPHONE }))).toEqual({ measure: true })
  })

  it('keeps out every other host — dev server, e2e preview, Vercel previews', () => {
    for (const hostname of ['localhost', '127.0.0.1', 'actuarial-notes-git-main.vercel.app', 'wiki.actuarialnotes.com']) {
      expect(decideMeasurement(ctx({ hostname }))).toEqual({ measure: false, reason: 'host' })
    }
  })

  it('measures any host in a debug session, so a preview can be checked in DebugView', () => {
    expect(decideMeasurement(ctx({ hostname: 'localhost', debug: true }))).toEqual({ measure: true })
  })

  it('keeps out a browser driven by automation, even on production', () => {
    expect(decideMeasurement(ctx({ webdriver: true }))).toEqual({ measure: false, reason: 'automation' })
    expect(decideMeasurement(ctx({ userAgent: CHROME.replace('Chrome/', 'HeadlessChrome/') }))).toEqual({
      measure: false,
      reason: 'automation',
    })
  })

  it('keeps out automation even in a debug session', () => {
    expect(decideMeasurement(ctx({ webdriver: true, debug: true })).measure).toBe(false)
  })

  it('the opt-out wins over everything', () => {
    expect(decideMeasurement(ctx({ optedOut: true, debug: true }))).toEqual({ measure: false, reason: 'opted-out' })
  })
})

describe('isAutomatedUserAgent', () => {
  it.each([
    'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm) Chrome/116.0.1938.76 Safari/537.36',
    'Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36 Chrome-Lighthouse',
    'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)',
    'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)',
    'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
    'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/120.0.0.0 Safari/537.36',
  ])('flags %s', ua => {
    expect(isAutomatedUserAgent(ua)).toBe(true)
  })

  it.each([
    CHROME,
    IPHONE,
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 14.6; rv:131.0) Gecko/20100101 Firefox/131.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 YaBrowser/24.10.0.0 Safari/537.36',
    // A phone brand, not a bot.
    'Mozilla/5.0 (Linux; Android 12; CUBOT KINGKONG 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
  ])('lets a person through: %s', ua => {
    expect(isAutomatedUserAgent(ua)).toBe(false)
  })
})

describe('hosts and accounts', () => {
  it('only the production app is measured', () => {
    expect(isMeasuredHost('quiz.actuarialnotes.com')).toBe(true)
    expect(isMeasuredHost('QUIZ.ActuarialNotes.com')).toBe(true)
    expect(isMeasuredHost('quiz.actuarialnotes.com.evil.example')).toBe(false)
  })

  it('recognises an internal account whatever its case or padding', () => {
    expect(isInternalAccount(' Jordan@ActuarialNotes.com ')).toBe(true)
    expect(isInternalAccount('someone@example.com')).toBe(false)
    expect(isInternalAccount(null)).toBe(false)
  })
})

describe('readControlParam', () => {
  it('reads a switch on, off, or absent', () => {
    expect(readControlParam('?internal=1', 'internal')).toBe(true)
    expect(readControlParam('?internal', 'internal')).toBe(true)
    expect(readControlParam('?internal=0', 'internal')).toBe(false)
    expect(readControlParam('?internal=off', 'internal')).toBe(false)
    expect(readControlParam('?exam=P', 'internal')).toBeNull()
  })
})

describe('contentGroup', () => {
  it.each([
    ['/', 'Quiz builder'],
    ['/quiz', 'Quiz'],
    ['/review', 'Quiz review'],
    ['/dashboard', 'Dashboard'],
    ['/dashboard/', 'Dashboard'],
    ['/wiki', 'Study guides'],
    ['/wiki/exam/Exam+P-1+(SOA)', 'Study guides'],
    ['/wiki/concept/Bayes+Theorem', 'Concepts'],
    ['/wiki/resources', 'Resources'],
    ['/wiki/resource/Basic+Ratemaking', 'Resources'],
    ['/store', 'Store'],
    ['/store/gems', 'Gem Shop'],
    ['/project/pcpa/p-abc', 'Projects'],
    ['/cowork/sources/osfi', 'Cowork'],
    ['/actuaria/sector/P', 'Actuaria'],
    ['/auth/callback', 'Account'],
    ['/no-such-page', 'Other'],
    // `/` is only ever itself.
    ['/quizzes', 'Other'],
  ])('%s → %s', (path, group) => {
    expect(contentGroup(path)).toBe(group)
  })
})

describe('isNewPageView', () => {
  const at = (pathname: string, search = '') => ({ pathname, search })

  it('counts the first page', () => {
    expect(isNewPageView(null, at('/'), 'POP')).toBe(true)
  })

  it('counts any change of path, a redirect included', () => {
    expect(isNewPageView(at('/'), at('/dashboard'), 'PUSH')).toBe(true)
    expect(isNewPageView(at('/research'), at('/wiki'), 'REPLACE')).toBe(true)
  })

  it('does not count the same address twice, or a trailing slash', () => {
    expect(isNewPageView(at('/quiz', '?exam=P'), at('/quiz', '?exam=P'), 'PUSH')).toBe(false)
    expect(isNewPageView(at('/store'), at('/store/'), 'PUSH')).toBe(false)
  })

  it('counts a new query string the reader went to, not one a page rewrote in place', () => {
    expect(isNewPageView(at('/quiz', '?exam=P'), at('/quiz', '?exam=FM'), 'PUSH')).toBe(true)
    expect(isNewPageView(at('/quiz', '?exam=P'), at('/quiz', '?exam=FM'), 'POP')).toBe(true)
    expect(isNewPageView(at('/wiki/resources'), at('/wiki/resources', '?exam=P'), 'REPLACE')).toBe(false)
  })
})

describe('pageLocation', () => {
  const origin = 'https://quiz.actuarialnotes.com'

  it('keeps the path and the campaign parameters', () => {
    expect(pageLocation(origin, '/wiki', '?utm_source=reddit&utm_medium=social&gclid=abc')).toBe(
      `${origin}/wiki?utm_source=reddit&utm_medium=social&gclid=abc`,
    )
  })

  it('drops auth codes, tokens and the control switches', () => {
    expect(pageLocation(origin, '/auth/callback', '?code=secret&type=signup')).toBe(`${origin}/auth/callback?type=signup`)
    expect(pageLocation(origin, '/', '?access_token=x&refresh_token=y&ga_debug=1&internal=1')).toBe(`${origin}/`)
  })

  it('redacts an email typed into a query value', () => {
    expect(pageLocation(origin, '/search', '?q=jane%40example.com')).toBe(`${origin}/search?q=%5Bredacted+email%5D`)
  })
})

describe('redactPii', () => {
  it('blanks emails and long numbers, and leaves study terms alone', () => {
    expect(redactPii('mail me at a.b@c.io')).toBe('mail me at [redacted email]')
    expect(redactPii('call 416-555-0199')).toBe('call [redacted number]')
    expect(redactPii('exam 5 spring 2019 q12')).toBe('exam 5 spring 2019 q12')
    expect(redactPii('Var(X) = E[X^2] - E[X]^2')).toBe('Var(X) = E[X^2] - E[X]^2')
  })
})

describe('searchTerm', () => {
  it('normalises a typed term into one row per meaning', () => {
    expect(searchTerm('  Bayes   Theorem ')).toBe('bayes theorem')
  })

  it('has nothing to report for one character or none', () => {
    expect(searchTerm('')).toBe('')
    expect(searchTerm(' b ')).toBe('')
  })

  it('redacts personal details', () => {
    expect(searchTerm('me@example.com')).toBe('[redacted email]')
  })
})

describe('fitParams', () => {
  it('cuts strings at GA4’s limits and leaves other values alone', () => {
    const long = 'x'.repeat(2000)
    const fitted = fitParams({ content_name: long, page_location: long, page_title: long, fatal: true, count: 3 })
    expect(fitted.content_name).toHaveLength(100)
    expect(fitted.page_location).toHaveLength(1000)
    expect(fitted.page_title).toHaveLength(300)
    expect(fitted.fatal).toBe(true)
    expect(fitted.count).toBe(3)
  })
})

describe('describeContent', () => {
  it('names a wiki page by its name and a document by its title and paper', () => {
    expect(describeContent({ kind: 'concept', name: 'Bayes Theorem' })).toEqual({
      content_type: 'concept',
      content_name: 'Bayes Theorem',
    })
    expect(describeContent({ kind: 'pdf', name: "Examiner's Report", subtitle: 'Exam 5 · Spring 2019' })).toEqual({
      content_type: 'pdf',
      content_name: "Examiner's Report · Exam 5 · Spring 2019",
    })
  })
})
