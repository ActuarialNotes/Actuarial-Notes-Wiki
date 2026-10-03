import { describe, expect, it } from 'vitest'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { CALCULATORS, CALCULATOR_POLICIES, STORE_SELLERS, STUDY_PRODUCTS } from './storeCatalog'
import { STORE_EXAMS, offerPrices, type StoreOffer } from '@/lib/store'

const PUBLIC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../public')
const EXAM_KEYS = new Set(STORE_EXAMS.map(e => e.key))
const ISO = /^\d{4}-\d{2}-\d{2}$/

function host(url: string): string {
  return new URL(url).hostname.replace(/^www\./, '')
}

const offers: { owner: string; offer: StoreOffer }[] = [
  ...STUDY_PRODUCTS.map(p => ({ owner: p.id, offer: p.offer })),
  ...CALCULATORS.flatMap(c => c.offers.map(offer => ({ owner: c.id, offer }))),
]

describe('the sellers', () => {
  it('each name a site and a monogram, and their logos are in the bundle', () => {
    for (const [id, seller] of Object.entries(STORE_SELLERS)) {
      expect(seller.id, id).toBe(id)
      expect(seller.site, id).toMatch(/^https:\/\//)
      expect(seller.short.length, id).toBeGreaterThan(0)
      if (seller.logo) {
        // Copied into the app, never hotlinked: browsing the Store sends nothing to a seller.
        expect(seller.logo, id).toMatch(/^\//)
        expect(existsSync(path.join(PUBLIC, seller.logo)), `${id}: ${seller.logo}`).toBe(true)
      }
    }
  })
})

describe('the offers', () => {
  it('go to the seller they name, over https', () => {
    for (const { owner, offer } of offers) {
      const seller = STORE_SELLERS[offer.sellerId]
      expect(seller, `${owner}: ${offer.sellerId}`).toBeDefined()
      expect(offer.url, owner).toMatch(/^https:\/\//)
      expect(host(offer.url), owner).toBe(host(seller!.site))
    }
  })

  it('carry the date their page was read, and prices as the page printed them', () => {
    for (const { owner, offer } of offers) {
      expect(offer.checked, owner).toMatch(ISO)
      expect(offer.checked >= '2026-01-01', owner).toBe(true)
      for (const price of offerPrices(offer)) {
        expect(Number.isFinite(price.amount) && price.amount >= 0, owner).toBe(true)
        expect(['USD', 'CAD'], owner).toContain(price.currency)
      }
    }
  })

  it('list a choice once in its group', () => {
    for (const { owner, offer } of offers) {
      const keys = (offer.options ?? []).map(o => `${o.group ?? ''}|${o.name}`)
      expect(new Set(keys).size, owner).toBe(keys.length)
    }
  })
})

describe('the study materials', () => {
  it('have unique ids and name only exams the shelf knows', () => {
    const ids = [...STUDY_PRODUCTS.map(p => p.id), ...CALCULATORS.map(c => c.id)]
    expect(new Set(ids).size).toBe(ids.length)
    for (const product of STUDY_PRODUCTS) {
      expect(product.exams.length, product.id).toBeGreaterThan(0)
      for (const exam of product.exams) expect(EXAM_KEYS.has(exam), `${product.id}: ${exam}`).toBe(true)
      expect(offerPrices(product.offer).length, `${product.id} has no price`).toBeGreaterThan(0)
    }
  })

  it('stand in Registration only when buying one buys the exam', () => {
    for (const product of STUDY_PRODUCTS.filter(p => p.aisle === 'registration')) {
      const names = (product.offer.options ?? []).map(o => o.name)
      expect(names.length, product.id).toBeGreaterThan(0)
      for (const name of names) expect(name, product.id).toMatch(/includes exam fee/i)
    }
  })
})

describe('the calculators', () => {
  // Each card is the line it occupies on the bodies' lists, word for word.
  const LISTED_AS: Record<string, { SOA: string; CAS: string }> = {
    'ti-30xs-multiview': { SOA: 'TI-30XS MultiView (or XB battery)', CAS: 'TI-30XS MultiView (or XB battery)' },
    'ba-ii-plus': { SOA: 'BA II Plus', CAS: 'BA II Plus' },
    'ba-ii-plus-professional': { SOA: 'BA II Plus Professional', CAS: 'BA II Plus Professional' },
    'ti-30x-iis': { SOA: 'TI-30X II (IIS solar or IIB battery)', CAS: 'TI-30X II (IIS solar or IIB battery)' },
    'ti-30xa': { SOA: 'TI – 30Xa or TI – 30XA, same model just different casing, both approved.', CAS: 'TI-30Xa' },
    'ba-35': { SOA: 'BA-35', CAS: 'BA-35' },
  }

  it('are exactly the models on the lists', () => {
    expect(CALCULATORS.map(c => c.id).sort()).toEqual(Object.keys(LISTED_AS).sort())
    for (const policy of CALCULATOR_POLICIES) {
      expect(policy.models.length, policy.body).toBe(CALCULATORS.length)
    }
  })

  it('claim approval only from a body whose list carries them', () => {
    for (const calculator of CALCULATORS) {
      for (const body of calculator.approvedBy) {
        const policy = CALCULATOR_POLICIES.find(p => p.body === body)
        expect(policy, `${calculator.id}: ${body}`).toBeDefined()
        expect(policy!.models, `${calculator.id}: ${body}`).toContain(LISTED_AS[calculator.id]![body])
      }
    }
  })

  it('name their maker, and a discontinued one is sold by nobody', () => {
    for (const calculator of CALCULATORS) {
      expect(STORE_SELLERS[calculator.makerId], calculator.id).toBeDefined()
      expect(calculator.checked, calculator.id).toMatch(ISO)
      if (calculator.discontinued) expect(calculator.offers, calculator.id).toEqual([])
      else expect(calculator.offers.length, calculator.id).toBeGreaterThan(0)
    }
  })
})
