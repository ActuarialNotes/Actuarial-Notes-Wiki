import { describe, expect, it } from 'vitest'
import {
  EMPTY_WATCH,
  observeSubscription,
  requestCelebration,
  type ProWatch,
  type SubscriptionObservation,
} from './proCelebration'

/** Run a sequence of observations; return the watch and how many times it celebrated. */
function run(obs: SubscriptionObservation[], start: ProWatch = EMPTY_WATCH) {
  let watch = start
  let celebrations = 0
  for (const o of obs) {
    const step = observeSubscription(watch, o)
    watch = step.watch
    if (step.celebrate) celebrations++
  }
  return { watch, celebrations }
}

const u = 'user-1'
const loading = { userId: u, isPro: false, loading: true }
const free = { userId: u, isPro: false, loading: false }
const pro = { userId: u, isPro: true, loading: false }

describe('observeSubscription', () => {
  it('celebrates a free account becoming Pro', () => {
    expect(run([loading, free, pro]).celebrations).toBe(1)
  })

  it('does not celebrate an account that loads as Pro', () => {
    expect(run([loading, pro]).celebrations).toBe(0)
  })

  it('ignores the signed-out default before the first load for an account', () => {
    // Sign-in: the first frame carries the free default, then the hook loads Pro.
    const signedOut = { userId: null, isPro: false, loading: false }
    expect(run([signedOut, free, loading, pro]).celebrations).toBe(0)
  })

  it('celebrates a Pro episode once, through refreshes', () => {
    expect(run([loading, free, pro, loading, pro, pro]).celebrations).toBe(1)
  })

  it('celebrates again after a lapse', () => {
    expect(run([loading, free, pro, free, pro]).celebrations).toBe(2)
  })

  it('starts over for a different account', () => {
    const other = { userId: 'user-2', isPro: true, loading: false }
    expect(run([loading, free, other]).celebrations).toBe(0)
  })
})

describe('requestCelebration', () => {
  it('plays a confirmed request at once, and not again when Pro resolves', () => {
    const { watch } = run([loading, free])
    const req = requestCelebration(watch, { confirmed: true })
    expect(req.celebrate).toBe(true)
    expect(run([loading, pro], req.watch).celebrations).toBe(0)
  })

  it('holds an unconfirmed request until Pro resolves', () => {
    // Back from Stripe: the account may already have loaded as Pro, or not yet.
    const { watch } = run([loading, pro])
    expect(requestCelebration(watch, { confirmed: false }).celebrate).toBe(true)

    const before = run([loading]).watch
    const req = requestCelebration(before, { confirmed: false })
    expect(req.celebrate).toBe(false)
    expect(run([pro], req.watch).celebrations).toBe(1)
  })

  it('keeps an unconfirmed request waiting through a stale free', () => {
    const req = requestCelebration(run([loading]).watch, { confirmed: false })
    expect(run([free, loading, pro], req.watch).celebrations).toBe(1)
  })

  it('does not replay an episode already celebrated', () => {
    const { watch } = run([loading, free, pro])
    expect(requestCelebration(watch, { confirmed: false }).celebrate).toBe(false)
  })
})

describe('requestProCelebration', () => {
  it('holds a request made before the host listens', async () => {
    const { requestProCelebration, onProCelebrationRequest } = await import('./proCelebration')
    requestProCelebration({ confirmed: false })
    const got: boolean[] = []
    const off = onProCelebrationRequest(r => got.push(r.confirmed))
    requestProCelebration({ confirmed: true })
    off()
    expect(got).toEqual([false, true])
  })
})
