import { describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { PUBLISHER_RATINGS, REVIEW_SOURCES, REVIEWS_CHECKED, STORE_REVIEWS } from './storeReviews'
import { CALCULATORS, STORE_SELLERS, STUDY_PRODUCTS } from './storeCatalog'

// The reviews are quoted, never written (data/storeReviews.ts). What a test
// can hold them to: each names a product on the shelf, links to a page on its
// own source's domain (a seller's review to that seller's site), carries a
// real date no later than the day they were gathered, and quotes a sentence
// or three — not a paragraph, and nothing empty.

const products = new Map<string, string>([
  ...STUDY_PRODUCTS.map(p => [p.id, p.offer.sellerId] as const),
  ...CALCULATORS.map(c => [c.id, c.makerId] as const),
])
const ISO = /^\d{4}-\d{2}-\d{2}$/

describe('store reviews', () => {
  it('names products on the shelf', () => {
    for (const r of STORE_REVIEWS) {
      expect(r.productIds.length, r.url).toBeGreaterThan(0)
      for (const id of r.productIds) expect(products.has(id), `${id} (${r.url})`).toBe(true)
    }
  })

  it('links each review to its own source, over https', () => {
    for (const r of STORE_REVIEWS) {
      const url = new URL(r.url)
      expect(url.protocol, r.url).toBe('https:')
      if (r.source === 'publisher') {
        // A seller's testimonial is on the seller's own site.
        const sellers = new Set(r.productIds.map(id => products.get(id)!))
        const hosts = [...sellers].map(id => new URL(STORE_SELLERS[id]!.site).hostname.replace(/^www\./, ''))
        expect(hosts.some(h => url.hostname.replace(/^www\./, '').endsWith(h)), r.url).toBe(true)
      } else {
        expect(REVIEW_SOURCES[r.source].hosts, r.url).toContain(url.hostname)
      }
    }
  })

  it('dates each review, no later than the day they were gathered', () => {
    for (const r of STORE_REVIEWS) {
      if (r.date === null) continue
      expect(r.date, r.url).toMatch(ISO)
      expect(Number.isNaN(Date.parse(r.date)), r.url).toBe(false)
      expect(r.date <= REVIEWS_CHECKED, r.url).toBe(true)
    }
  })

  it('quotes a sentence or three, and a rating only out of something', () => {
    for (const r of STORE_REVIEWS) {
      expect(r.quote.trim().length, r.url).toBeGreaterThan(10)
      expect(r.quote.length, r.url).toBeLessThanOrEqual(320)
      expect(r.quote, r.url).not.toMatch(/^["“]|["”]$/)
      if (r.rating != null) expect(r.ratingOutOf, r.url).toBeGreaterThanOrEqual(r.rating)
    }
  })

  it('quotes no post twice for one product', () => {
    const seen = new Set<string>()
    for (const r of STORE_REVIEWS) {
      for (const id of r.productIds) {
        const key = `${id} ${r.url} ${r.quote}`
        expect(seen.has(key), key).toBe(false)
        seen.add(key)
      }
    }
  })

  it('keeps each seller rating to a product and a value out of its scale', () => {
    for (const r of PUBLISHER_RATINGS) {
      expect(products.has(r.productId), r.productId).toBe(true)
      expect(r.value).toBeGreaterThan(0)
      expect(r.value).toBeLessThanOrEqual(r.outOf)
      expect(new URL(r.url).protocol).toBe('https:')
    }
  })

  it('draws every source logo from the bundle', () => {
    for (const source of Object.values(REVIEW_SOURCES)) {
      if (source.logo) expect(existsSync(join(__dirname, '../../public', source.logo)), source.logo).toBe(true)
    }
  })
})
