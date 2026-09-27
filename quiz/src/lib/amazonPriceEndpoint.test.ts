import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
// Exercises the serverless handler itself (quiz/api/amazon-price.js) with
// Amazon's token endpoint and Creators API stubbed. The shapes the stubs return
// are the ones Amazon's own Node SDK models (itemsResult / searchResult →
// items → offersV2.listings → price.money). What matters most is the refusals:
// a price is only ever the one Amazon states, for the book the page describes.
import handler, {
  isbnDigits,
  itemMatchesIsbn,
  pickPrice,
  priceFromItems,
  resetTokenCache,
  toIsbn10,
  toIsbn13,
} from '../../api/amazon-price.js'

function mockRes() {
  const res = {
    statusCode: 0,
    body: undefined as unknown,
    headers: {} as Record<string, string>,
    status(code: number) { res.statusCode = code; return res },
    json(payload: unknown) { res.body = payload; return res },
    setHeader(key: string, value: string) { res.headers[key] = value },
    end() { return res },
  }
  return res
}

const call = async (query: Record<string, unknown>, method = 'GET') => {
  const res = mockRes()
  await handler({ method, query }, res)
  return res
}

const listing = (amount: number, extra: Record<string, unknown> = {}) => ({
  price: { money: { amount, currency: 'USD', displayAmount: `$${amount.toFixed(2)}` } },
  condition: { value: 'New' },
  ...extra,
})

const DETAIL = 'https://www.amazon.com/dp/013518939X?tag=notes-20&linkCode=ogi&th=1&psc=1'

// Hogg, Tanis & Zimmerman, Probability and Statistical Inference (10th ed.) —
// ISBN 978-0-13-518939-9 on its vault page; ISBN-10 013518939X.
const HOGG_ITEM = {
  asin: '013518939X',
  detailPageURL: DETAIL,
  offersV2: { listings: [listing(151.2), listing(148.99, { isBuyBoxWinner: true })] },
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
}

function configure() {
  vi.stubEnv('AMAZON_CREATORS_CREDENTIAL_ID', 'cred-id')
  vi.stubEnv('AMAZON_CREATORS_CREDENTIAL_SECRET', 'cred-secret')
  vi.stubEnv('AMAZON_PARTNER_TAG', 'notes-20')
}

/** Stub fetch: the token endpoint, then whatever the API call should answer. */
function stubAmazon(api: (url: string, body: Record<string, unknown>) => Response) {
  const calls: { url: string; init: RequestInit; body: Record<string, unknown> }[] = []
  const fetchMock = vi.fn(async (url: string, init: RequestInit) => {
    const body = JSON.parse(String(init.body))
    calls.push({ url, init, body })
    if (url.includes('/auth/o2/token')) {
      return jsonResponse({ access_token: 'Atc|token', token_type: 'bearer', expires_in: 3600 })
    }
    return api(url, body)
  })
  vi.stubGlobal('fetch', fetchMock)
  return calls
}

beforeEach(() => resetTokenCache())

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('ISBNs', () => {
  it('accepts an ISBN only when its check digit is right', () => {
    expect(isbnDigits('978-0-13-518939-9')).toBe('9780135189399')
    expect(isbnDigits('013518939X')).toBe('013518939X')
    expect(isbnDigits('978-0-13-518939-8')).toBeNull()
    expect(isbnDigits('0-306-40615-3')).toBeNull()
    expect(isbnDigits('not an isbn')).toBeNull()
    expect(isbnDigits(undefined)).toBeNull()
  })

  // A printed book's ASIN is its ISBN-10 — the pair Wikipedia uses for both.
  it('converts between the two forms', () => {
    expect(toIsbn10('9780306406157')).toBe('0306406152')
    expect(toIsbn13('0306406152')).toBe('9780306406157')
    expect(toIsbn10('9780135189399')).toBe('013518939X')
  })

  it('has no ISBN-10, and so no ASIN, for a 979- ISBN', () => {
    expect(toIsbn10('9798890161871')).toBeNull()
  })
})

describe('matching the book the page describes', () => {
  it('matches on the ASIN or on the ISBNs Amazon lists', () => {
    expect(itemMatchesIsbn({ asin: '013518939X' }, '9780135189399')).toBe(true)
    const listed = { asin: 'B0XXXXXXX1', itemInfo: { externalIds: { eans: { displayValues: ['9798890161871'] } } } }
    expect(itemMatchesIsbn(listed, '9798890161871')).toBe(true)
  })

  // A search on an ISBN can come back with another edition or the Kindle copy.
  it('refuses an item that carries a different ISBN', () => {
    const other = { asin: 'B0KINDLE01', itemInfo: { externalIds: { isbns: { displayValues: ['9780134686998'] } } } }
    expect(itemMatchesIsbn(other, '9780135189399')).toBe(false)
    expect(priceFromItems([{ ...other, detailPageURL: DETAIL, offersV2: { listings: [listing(10)] } }], '9780135189399')).toBeNull()
  })
})

describe('pickPrice', () => {
  it("takes the buy-box winner's price, as Amazon states it", () => {
    expect(pickPrice(HOGG_ITEM)).toEqual({ amount: 148.99, currency: 'USD', display: '$148.99' })
  })

  it('falls back to the lowest new offer when no listing wins the buy box', () => {
    expect(pickPrice({ offersV2: { listings: [listing(151.2), listing(139.5)] } })?.amount).toBe(139.5)
  })

  // A MAP-flagged price may not be shown off Amazon; a used copy isn't "the" price.
  it('passes over MAP-restricted and used listings', () => {
    const item = {
      offersV2: {
        listings: [
          listing(99, { isBuyBoxWinner: true, violatesMAP: true }),
          listing(40, { condition: { value: 'Used' } }),
          listing(120),
        ],
      },
    }
    expect(pickPrice(item)?.amount).toBe(120)
  })

  it('has nothing to say for an item with no priced offer', () => {
    expect(pickPrice({})).toBeNull()
    expect(pickPrice({ offersV2: { listings: [{ price: { money: { amount: 0, currency: 'USD' } } }] } })).toBeNull()
  })
})

describe('the endpoint', () => {
  it('refuses a missing or malformed ISBN', async () => {
    expect((await call({})).statusCode).toBe(400)
    expect((await call({ isbn: '978-0-13-518939-8' })).statusCode).toBe(400)
  })

  // A deployment with no Associates account is the normal case, not an error —
  // and it isn't cached, so adding the keys takes effect at once.
  it('answers no price, uncached, when no credentials are set', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    const res = await call({ isbn: '978-0-13-518939-9' })
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ price: null })
    expect(res.headers['Cache-Control']).toBe('no-store')
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it("looks a book up by its ASIN and returns Amazon's price and vended link", async () => {
    configure()
    const calls = stubAmazon(() => jsonResponse({ itemsResult: { items: [HOGG_ITEM] } }))
    const res = await call({ isbn: '978-0-13-518939-9' })

    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({
      price: { amount: 148.99, currency: 'USD', display: '$148.99' },
      url: DETAIL,
    })
    expect(Number.isNaN(Date.parse((res.body as { asOf: string }).asOf))).toBe(false)
    // An hour at the edge — Amazon's TTL for offers — and nothing in the browser.
    expect(res.headers['Cache-Control']).toBe('public, max-age=0, s-maxage=3600')

    const [token, api] = calls
    expect(token.url).toBe('https://api.amazon.com/auth/o2/token')
    expect(token.body).toEqual({
      grant_type: 'client_credentials',
      client_id: 'cred-id',
      client_secret: 'cred-secret',
      scope: 'creatorsapi::default',
    })
    expect(api.url).toBe('https://creatorsapi.amazon/catalog/v1/getItems')
    expect(api.init.headers).toMatchObject({ Authorization: 'Bearer Atc|token', 'x-marketplace': 'www.amazon.com' })
    expect(api.body).toMatchObject({ partnerTag: 'notes-20', itemIds: ['013518939X'], condition: 'New' })
  })

  it('searches Books on a 979- ISBN and keeps only the result that carries it', async () => {
    configure()
    const book = {
      asin: 'B0CHECKMAT',
      detailPageURL: 'https://www.amazon.com/dp/B0CHECKMAT?tag=notes-20',
      itemInfo: { externalIds: { eans: { displayValues: ['9798890161871'] } } },
      offersV2: { listings: [listing(95)] },
    }
    const kindle = { ...book, asin: 'B0KINDLE02', itemInfo: {}, offersV2: { listings: [listing(40)] } }
    const calls = stubAmazon(() => jsonResponse({ searchResult: { items: [kindle, book] } }))

    const res = await call({ isbn: '979-8-89016-187-1' })
    expect((res.body as { price: { amount: number } }).price.amount).toBe(95)
    const api = calls[1]
    expect(api.url).toBe('https://creatorsapi.amazon/catalog/v1/searchItems')
    expect(api.body).toMatchObject({ keywords: '9798890161871', searchIndex: 'Books' })
    expect(api.body.resources).toContain('itemInfo.externalIds')
  })

  it('answers no price, briefly cached, when Amazon throttles — and logs why', async () => {
    configure()
    const log = vi.spyOn(console, 'error').mockImplementation(() => {})
    stubAmazon(() => jsonResponse({ message: 'TooManyRequests' }, 429))
    const res = await call({ isbn: '978-0-13-518939-9' })
    expect(res.body).toEqual({ price: null })
    expect(res.headers['Cache-Control']).toBe('public, max-age=0, s-maxage=300')
    expect(String(log.mock.calls[0]?.[0])).toMatch(/9780135189399: getItems responded 429/)
    log.mockRestore()
  })

  it("never returns a link that isn't Amazon's", async () => {
    configure()
    stubAmazon(() =>
      jsonResponse({ itemsResult: { items: [{ ...HOGG_ITEM, detailPageURL: 'https://example.com/dp/013518939X' }] } }),
    )
    expect((await call({ isbn: '978-0-13-518939-9' })).body).toEqual({ price: null })
  })

  // Amazon asks that a token be reused for its hour, not fetched per request.
  it('reuses its access token across requests', async () => {
    configure()
    const calls = stubAmazon(() => jsonResponse({ itemsResult: { items: [HOGG_ITEM] } }))
    await call({ isbn: '978-0-13-518939-9' })
    await call({ isbn: '978-0-13-518939-9' })
    expect(calls.filter(c => c.url.includes('/auth/o2/token'))).toHaveLength(1)
  })

  it('asks a 2.x credential for its token the Cognito way', async () => {
    configure()
    vi.stubEnv('AMAZON_CREATORS_VERSION', '2.1')
    const calls: { url: string; init: RequestInit }[] = []
    vi.stubGlobal('fetch', vi.fn(async (url: string, init: RequestInit) => {
      calls.push({ url, init })
      return url.includes('amazoncognito.com')
        ? jsonResponse({ access_token: 'cognito-token', expires_in: 3600 })
        : jsonResponse({ itemsResult: { items: [HOGG_ITEM] } })
    }))
    await call({ isbn: '978-0-13-518939-9' })
    expect(calls[0].url).toBe('https://creatorsapi.auth.us-east-1.amazoncognito.com/oauth2/token')
    expect(String(calls[0].init.body)).toContain('scope=creatorsapi%2Fdefault')
    expect(calls[1].init.headers).toMatchObject({ Authorization: 'Bearer cognito-token, Version 2.1' })
  })
})
