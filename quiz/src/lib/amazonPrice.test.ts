import { describe, it, expect, afterEach, vi } from 'vitest'
import {
  AMAZON_ASSOCIATE_DISCLOSURE,
  AMAZON_CONTENT_DISCLAIMER,
  AMAZON_PRICE_DISCLAIMER,
  amazonPriceEndpoint,
  fetchAmazonPrice,
  priceStamp,
  sanitizeAmazonPrice,
} from './amazonPrice'

const PAYLOAD = {
  price: { amount: 148.99, currency: 'USD', display: '$148.99' },
  url: 'https://www.amazon.com/dp/013518939X?tag=notes-20&linkCode=ogi',
  asOf: '2026-09-27T19:10:00.000Z',
}

afterEach(() => vi.unstubAllGlobals())

describe('amazonPriceEndpoint', () => {
  // One CDN entry per book, however the page prints its ISBN.
  it('asks about the bare ISBN', () => {
    expect(amazonPriceEndpoint('978-0-13-518939-9')).toBe('/api/amazon-price?isbn=9780135189399')
    expect(amazonPriceEndpoint('CAS Study Kit')).toBeNull()
  })
})

describe('sanitizeAmazonPrice', () => {
  it('reads a price the endpoint returned', () => {
    expect(sanitizeAmazonPrice(PAYLOAD)).toEqual({
      amount: 148.99,
      currency: 'USD',
      display: '$148.99',
      url: PAYLOAD.url,
      asOf: new Date(PAYLOAD.asOf),
    })
  })

  it('is no price at all when the endpoint had none', () => {
    expect(sanitizeAmazonPrice({ price: null })).toBeNull()
    expect(sanitizeAmazonPrice(null)).toBeNull()
    expect(sanitizeAmazonPrice('nope')).toBeNull()
  })

  // The row links wherever `url` says, so only Amazon's own pages will do.
  it('refuses a link anywhere but amazon.com', () => {
    expect(sanitizeAmazonPrice({ ...PAYLOAD, url: 'https://example.com/dp/1' })).toBeNull()
    expect(sanitizeAmazonPrice({ ...PAYLOAD, url: 'http://www.amazon.com/dp/1' })).toBeNull()
    expect(sanitizeAmazonPrice({ ...PAYLOAD, url: 'https://amazon.com.evil.test/dp/1' })).toBeNull()
  })

  it('refuses a malformed amount, currency, label or timestamp', () => {
    expect(sanitizeAmazonPrice({ ...PAYLOAD, price: { ...PAYLOAD.price, amount: -1 } })).toBeNull()
    expect(sanitizeAmazonPrice({ ...PAYLOAD, price: { ...PAYLOAD.price, currency: 'dollars' } })).toBeNull()
    expect(sanitizeAmazonPrice({ ...PAYLOAD, price: { ...PAYLOAD.price, display: '' } })).toBeNull()
    expect(sanitizeAmazonPrice({ ...PAYLOAD, asOf: 'yesterday-ish' })).toBeNull()
  })
})

describe('priceStamp', () => {
  const asOf = new Date('2026-09-27T19:10:00Z')

  // Amazon's licence lets the date go only on the day the price was read.
  it('gives the time alone on the day the price was read', () => {
    expect(priceStamp(asOf, new Date('2026-09-27T21:00:00Z'), 'America/Toronto')).toBe('3:10 PM EDT')
  })

  it('puts the date in front once it is another day', () => {
    expect(priceStamp(asOf, new Date('2026-09-28T13:00:00Z'), 'America/Toronto')).toBe('Sep 27, 3:10 PM EDT')
  })
})

describe('fetchAmazonPrice', () => {
  it('asks the endpoint without the browser cache and reads the answer', async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify(PAYLOAD), { status: 200 }))
    vi.stubGlobal('fetch', fetchMock)
    expect((await fetchAmazonPrice('978-0-13-518939-9'))?.display).toBe('$148.99')
    expect(fetchMock).toHaveBeenCalledWith('/api/amazon-price?isbn=9780135189399', { cache: 'no-store' })
  })

  it('is null, never a throw, when the endpoint fails', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new TypeError('offline') }))
    expect(await fetchAmazonPrice('978-0-13-518939-9')).toBeNull()
    vi.stubGlobal('fetch', vi.fn(async () => new Response('', { status: 500 })))
    expect(await fetchAmazonPrice('978-0-13-518939-9')).toBeNull()
  })
})

// The licence says to include these statements, so an edit that rewords one
// should be deliberate. (The associate disclosure may be "substantially
// similar"; the other two are Amazon's words.)
describe("Amazon's required wording", () => {
  it('keeps the price and content disclaimers verbatim', () => {
    expect(AMAZON_PRICE_DISCLAIMER).toBe(
      'Product prices and availability are accurate as of the date/time indicated and are subject to change. ' +
        'Any price and availability information displayed on Amazon.com at the time of purchase will apply to the purchase of this product.',
    )
    expect(AMAZON_CONTENT_DISCLAIMER).toBe(
      "CERTAIN CONTENT THAT APPEARS ON THIS SITE COMES FROM AMAZON. THIS CONTENT IS PROVIDED 'AS IS' AND IS SUBJECT TO CHANGE OR REMOVAL AT ANY TIME.",
    )
    expect(AMAZON_ASSOCIATE_DISCLOSURE).toMatch(/^As an Amazon Associate, .+ earns from qualifying purchases\.$/)
  })
})
