/**
 * **Getting Pro, celebrated once.** The moment an account becomes Pro — a
 * Stripe checkout coming back, a code redeemed, or the subscription row
 * flipping under a page that is open — `components/ProCelebration.tsx` plays a
 * small ceremony. This module decides *when*: pure, so the rules are tested
 * rather than discovered.
 *
 * Two ways in:
 *  - **An observed transition.** The host watches `useSubscription` and
 *    celebrates when a *resolved* not-Pro becomes a resolved Pro for the same
 *    account. "Resolved" matters: the hook's first frame for a freshly
 *    signed-in account is the signed-out default (free, not loading), so a
 *    baseline is only taken after the hook has loaded for that account —
 *    otherwise every Pro reader would be "upgraded" on every sign-in.
 *  - **A request.** The surfaces that know an upgrade just happened say so
 *    (`requestProCelebration`): the dashboard on the Stripe return, the Upgrade
 *    page on a redeemed code. A *confirmed* request (the server has already
 *    said yes) plays at once; an unconfirmed one waits for Pro to resolve.
 *
 * Each Pro episode celebrates once (`ProWatch.celebrated`), so the request and
 * the transition it causes don't play it twice; seeing the account not Pro
 * again ends the episode, so a reader who lapses and comes back is welcomed back.
 */

export interface ProCelebrationRequest {
  /** The server has confirmed the upgrade (a redeemed code): play now. */
  confirmed: boolean
}

type Listener = (request: ProCelebrationRequest) => void
let listener: Listener | null = null
let queued: ProCelebrationRequest | null = null

/**
 * Ask the host to celebrate. A request made before the host is listening —
 * the dashboard's mount effect on the Stripe return runs before the root's —
 * is held and handed over when it subscribes.
 */
export function requestProCelebration(request: ProCelebrationRequest): void {
  if (listener) listener(request)
  else queued = request
}

/** The host's end: receive requests, starting with any made before it listened. */
export function onProCelebrationRequest(fn: Listener): () => void {
  listener = fn
  if (queued) {
    const request = queued
    queued = null
    fn(request)
  }
  return () => { if (listener === fn) listener = null }
}

/** What the host remembers between renders. */
export interface ProWatch {
  /** The account the rest is about; a different one starts over. */
  userId: string | null
  /** The hook has been seen loading for this account, so its next resolved value is real. */
  sawLoading: boolean
  /** The last resolved Pro state for this account, or null before the first. */
  isPro: boolean | null
  /** An upgrade was announced and is waiting for Pro to resolve. */
  pending: boolean
  /** This Pro episode has been celebrated already. */
  celebrated: boolean
}

export const EMPTY_WATCH: ProWatch = {
  userId: null,
  sawLoading: false,
  isPro: null,
  pending: false,
  celebrated: false,
}

export interface SubscriptionObservation {
  userId: string | null
  isPro: boolean
  loading: boolean
}

export interface WatchStep {
  watch: ProWatch
  celebrate: boolean
}

/** Fold one render's subscription state into the watch. */
export function observeSubscription(watch: ProWatch, obs: SubscriptionObservation): WatchStep {
  if (!obs.userId) return { watch: EMPTY_WATCH, celebrate: false }
  let w: ProWatch = watch.userId === obs.userId ? watch : { ...EMPTY_WATCH, userId: obs.userId }
  if (obs.loading) {
    return { watch: w.sawLoading ? w : { ...w, sawLoading: true }, celebrate: false }
  }
  // Resolved, but not yet known to be this account's own answer.
  if (!w.sawLoading) return { watch: w, celebrate: false }

  if (!obs.isPro) {
    // Not Pro: the episode (if any) is over; a pending request keeps waiting.
    w = { ...w, isPro: false, celebrated: false }
    return { watch: w, celebrate: false }
  }

  const upgraded = w.isPro === false || w.pending
  const celebrate = upgraded && !w.celebrated
  w = { ...w, isPro: true, pending: false, celebrated: w.celebrated || celebrate }
  return { watch: w, celebrate }
}

/** Fold an explicit request into the watch. */
export function requestCelebration(watch: ProWatch, request: ProCelebrationRequest): WatchStep {
  if (watch.celebrated) return { watch, celebrate: false }
  if (request.confirmed || watch.isPro === true) {
    // A confirmed upgrade is Pro, whatever the hook has caught up to yet.
    return { watch: { ...watch, isPro: true, pending: false, celebrated: true }, celebrate: true }
  }
  return { watch: { ...watch, pending: true }, celebrate: false }
}
