import { describe, expect, it } from 'vitest'
import { CALCULATORS, STUDY_PRODUCTS } from '@/data/storeCatalog'
import { STUDY_KIND_ORDER, buildStoreItems, type StoreItem } from './store'
import {
  KIT_STEP_KINDS,
  comparableKinds,
  defaultKitExam,
  examKit,
  nextStep,
  parseKitDone,
  pickKitStep,
  priceBar,
  priceScale,
  priceSpan,
  toggleKitStep,
} from './storeKit'

const items = buildStoreItems({ study: STUDY_PRODUCTS, calculators: CALCULATORS }, [])

describe('examKit', () => {
  it('reads Exam P as its steps, registration first', () => {
    const kit = examKit(items, 'P')
    expect(kit.steps.map(s => s.id)).toEqual(['register', 'calculator', 'learn', 'practise', 'review'])
    expect(kit.steps[0]!.items.map(i => i.id)).toEqual(['register-P'])
  })

  it('puts every study kind in exactly one step', () => {
    const all = Object.values(KIT_STEP_KINDS).flat()
    expect([...all].sort()).toEqual([...STUDY_KIND_ORDER].sort())
  })

  it('keeps the shelf order within a step: like with like, cheapest first', () => {
    const learn = examKit(items, 'P').steps.find(s => s.id === 'learn')!
    const kinds = learn.items.map(i => (i.type === 'study' ? STUDY_KIND_ORDER.indexOf(i.study.kind) : -1))
    expect(kinds).toEqual([...kinds].sort((a, b) => a - b))
  })

  it('drops a step with nothing in it', () => {
    for (const key of ['P', 'FM', 'MAS-I', 'CAS-5']) {
      for (const step of examKit(items, key).steps) expect(step.items.length).toBeGreaterThan(0)
    }
  })
})

describe('nextStep', () => {
  const kit = examKit(items, 'P')
  it('is the first step not ticked off', () => {
    expect(nextStep(kit.steps, new Set())?.id).toBe('register')
    expect(nextStep(kit.steps, new Set(['register', 'calculator']))?.id).toBe('learn')
  })
  it('is none when everything is ticked', () => {
    expect(nextStep(kit.steps, new Set(kit.steps.map(s => s.id)))).toBeNull()
  })
})

describe('comparableKinds', () => {
  it('compares the learn step, never registration', () => {
    const kit = examKit(items, 'P')
    expect(comparableKinds(kit.steps.find(s => s.id === 'learn')!)).toEqual(expect.arrayContaining(['manual']))
    expect(comparableKinds(kit.steps.find(s => s.id === 'register')!)).toBeNull()
  })
})

const priced = (id: string, amounts: number[], currency: 'USD' | 'CAD' = 'USD') =>
  ({ id, prices: amounts.map(amount => ({ amount, currency })) }) as unknown as StoreItem

describe('price scale', () => {
  it('spans an item from its lowest price to its highest', () => {
    expect(priceSpan(priced('a', [245, 139, 295]))).toEqual({ low: 139, high: 295, currency: 'USD' })
    expect(priceSpan(priced('a', []))).toBeNull()
  })

  it('rounds the top of the scale up to the next hundred', () => {
    expect(priceScale([priced('a', [139, 295]), priced('b', [222, 794])])).toBe(800)
  })

  it('draws no scale for one price, or for two currencies', () => {
    expect(priceScale([priced('a', [139])])).toBeNull()
    expect(priceScale([priced('a', [139]), priced('b', [1000], 'CAD')])).toBeNull()
  })

  it('places a bar as percentages of the scale', () => {
    expect(priceBar({ low: 200, high: 400, currency: 'USD' }, 800)).toEqual({ left: 25, width: 25 })
  })
})

describe('defaultKitExam', () => {
  it('opens on the first exam studied that the Shop stocks', () => {
    expect(defaultKitExam(new Set(['FM', 'P']), ['P', 'FM'])).toBe('P')
    expect(defaultKitExam(new Set(['ZZ']), ['P', 'FM'])).toBeNull()
  })
})

describe('kit storage', () => {
  it('keeps only known steps, and survives junk', () => {
    expect(parseKitDone('{"P":{"register":"","calculator":"ba-ii-plus","nope":"x","learn":3},"FM":"x"}')).toEqual({
      P: { register: '', calculator: 'ba-ii-plus' },
    })
    expect(parseKitDone('not json')).toEqual({})
    expect(parseKitDone(null)).toEqual({})
  })

  it('reads the first version, a list of ticked steps, as ticks with no product', () => {
    expect(parseKitDone('{"P":["register","nope"]}')).toEqual({ P: { register: '' } })
  })

  it('ticks a step off and back on', () => {
    const once = toggleKitStep({}, 'P', 'calculator')
    expect(once).toEqual({ P: { calculator: '' } })
    expect(toggleKitStep(once, 'P', 'calculator')).toEqual({})
  })

  it('remembers which product a step was sorted with, and the same pick undoes it', () => {
    const picked = pickKitStep({}, 'P', 'calculator', 'ba-ii-plus')
    expect(picked).toEqual({ P: { calculator: 'ba-ii-plus' } })
    expect(pickKitStep(picked, 'P', 'calculator', 'ti-30xa')).toEqual({ P: { calculator: 'ti-30xa' } })
    expect(pickKitStep(picked, 'P', 'calculator', 'ba-ii-plus')).toEqual({})
    expect(pickKitStep(picked, 'P', 'calculator', null)).toEqual({})
    // A tick with no product on a step that has one un-sorts it.
    expect(toggleKitStep(picked, 'P', 'calculator')).toEqual({})
  })
})
