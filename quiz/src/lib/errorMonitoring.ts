// Client-side error monitoring.
//
// A small, dependency-free capture layer that turns any thrown value into a
// normalized record and fans it out to a set of pluggable *sinks*. Out of the
// box it installs two sinks — a dev console logger and a GA4 `exception` event —
// and, when `VITE_ERROR_ENDPOINT` is configured, a beacon POST to a collector
// (a Sentry tunnel or any custom endpoint). Wiring a full SDK later is a
// one-liner: `registerErrorSink((err, ctx) => Sentry.captureException(...))`.
//
// Kept SDK-free on purpose: no bundle cost when monitoring is off, and the core
// (normalize + dedupe + fan-out) is pure and unit-tested under Node, matching
// the rest of the lib/ layer. Source maps are emitted by the Vite build
// (vite.config.ts → build.sourcemap) so captured stacks map back to source.

import { track } from './analytics'

export interface NormalizedError {
  name: string
  message: string
  stack?: string
}

export interface ErrorContext {
  /** Where the error was captured, e.g. 'error-boundary', 'window.onerror'. */
  source?: string
  /** React component stack, when captured from an ErrorBoundary. */
  componentStack?: string
  /** Whether the error likely broke the current view. */
  fatal?: boolean
  [key: string]: unknown
}

export type ErrorSink = (error: NormalizedError, context: ErrorContext) => void

function safe<T>(fn: () => T, fallback: T): T {
  try {
    return fn()
  } catch {
    return fallback
  }
}

/**
 * Coerce anything a `throw`/rejection/DOM error event can carry into a stable
 * `{ name, message, stack }` shape. `ErrorEvent`/`PromiseRejectionEvent` are
 * referenced via `typeof` guards so this runs under Node (where they're absent).
 */
export function normalizeError(value: unknown): NormalizedError {
  if (value instanceof Error) {
    return { name: value.name || 'Error', message: value.message || String(value), stack: value.stack }
  }
  // DOM 'error' event — unwrap the underlying Error when present.
  if (typeof ErrorEvent !== 'undefined' && value instanceof ErrorEvent) {
    if (value.error instanceof Error) return normalizeError(value.error)
    return { name: 'ErrorEvent', message: value.message || 'Unknown error' }
  }
  // 'unhandledrejection' event — unwrap the rejection reason.
  if (typeof PromiseRejectionEvent !== 'undefined' && value instanceof PromiseRejectionEvent) {
    return normalizeError(value.reason)
  }
  if (typeof value === 'string') return { name: 'Error', message: value }
  if (value && typeof value === 'object') {
    const obj = value as { name?: unknown; message?: unknown; stack?: unknown }
    if (typeof obj.message === 'string') {
      return {
        name: typeof obj.name === 'string' ? obj.name : 'Error',
        message: obj.message,
        stack: typeof obj.stack === 'string' ? obj.stack : undefined,
      }
    }
    return { name: 'Error', message: safe(() => JSON.stringify(value), String(value)) }
  }
  return { name: 'Error', message: String(value) }
}

/** A short signature used to collapse duplicate reports within a time window. */
export function errorSignature(error: NormalizedError): string {
  return `${error.name}:${error.message}:${(error.stack ?? '').slice(0, 200)}`
}

/**
 * Pure dedupe decision: is `signature` novel within `windowMs` ending at `now`?
 * Records `now` for the signature as a side effect on `recent` (a caller-owned
 * map) so a burst of identical errors reports once, not thousands of times.
 */
export function shouldReport(
  signature: string,
  now: number,
  recent: Map<string, number>,
  windowMs = 5000,
): boolean {
  const last = recent.get(signature)
  if (last != null && now - last < windowMs) return false
  recent.set(signature, now)
  return true
}

const sinks: ErrorSink[] = []
const recentErrors = new Map<string, number>()

/** Register an additional sink (e.g. a Sentry/PostHog forwarder). */
export function registerErrorSink(sink: ErrorSink): void {
  sinks.push(sink)
}

/** Test helper: clear registered sinks and the dedupe cache. */
export function resetErrorMonitoring(): void {
  sinks.length = 0
  recentErrors.clear()
}

/**
 * Normalize, dedupe, and fan a captured error out to every sink. A throwing sink
 * can never break the app or starve the other sinks. Safe to call manually to
 * report a handled error (e.g. a swallowed Supabase failure worth surfacing).
 */
export function captureError(value: unknown, context: ErrorContext = {}): void {
  const error = normalizeError(value)
  if (!shouldReport(errorSignature(error), Date.now(), recentErrors)) return
  for (const sink of sinks) {
    try {
      sink(error, context)
    } catch {
      /* a monitoring sink must never surface an error of its own */
    }
  }
}

function consoleSink(error: NormalizedError, context: ErrorContext): void {
  // eslint-disable-next-line no-console
  console.error(`[error-monitoring] ${error.name}: ${error.message}`, context, error.stack ?? '')
}

function gtagSink(error: NormalizedError, context: ErrorContext): void {
  track('exception', {
    description: `${error.name}: ${error.message}`.slice(0, 500),
    fatal: context.fatal === true,
  })
}

/** Best-effort beacon transport to a collector endpoint (Sentry tunnel / custom). */
function beaconSink(endpoint: string): ErrorSink {
  return (error, context) => {
    const payload = JSON.stringify({
      name: error.name,
      message: error.message,
      stack: error.stack,
      context,
      url: safe(() => window.location.href, ''),
      userAgent: safe(() => navigator.userAgent, ''),
      ts: new Date().toISOString(),
    })
    safe(() => {
      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        navigator.sendBeacon(endpoint, new Blob([payload], { type: 'application/json' }))
      } else {
        void fetch(endpoint, {
          method: 'POST',
          body: payload,
          headers: { 'Content-Type': 'application/json' },
          keepalive: true,
        })
      }
    }, undefined)
  }
}

/**
 * Install `error` and `unhandledrejection` listeners so uncaught exceptions and
 * rejected promises (including unhandled Supabase errors) are captured. Returns
 * a cleanup function that removes both listeners.
 */
export function installGlobalErrorHandlers(target: Window = window): () => void {
  const onError = (event: ErrorEvent) => captureError(event, { source: 'window.onerror', fatal: true })
  const onRejection = (event: PromiseRejectionEvent) =>
    captureError(event, { source: 'unhandledrejection', fatal: false })
  target.addEventListener('error', onError)
  target.addEventListener('unhandledrejection', onRejection)
  return () => {
    target.removeEventListener('error', onError)
    target.removeEventListener('unhandledrejection', onRejection)
  }
}

let initialized = false

/**
 * Wire up error monitoring once, at app boot. Registers the default sinks
 * (console + GA4 exception, plus a beacon sink when `VITE_ERROR_ENDPOINT` is
 * set) and installs the global handlers. Idempotent and a no-op without a DOM.
 */
export function initErrorMonitoring(): void {
  if (initialized || typeof window === 'undefined') return
  initialized = true
  registerErrorSink(consoleSink)
  registerErrorSink(gtagSink)
  const endpoint = import.meta.env?.VITE_ERROR_ENDPOINT
  if (typeof endpoint === 'string' && endpoint) registerErrorSink(beaconSink(endpoint))
  installGlobalErrorHandlers(window)
}
