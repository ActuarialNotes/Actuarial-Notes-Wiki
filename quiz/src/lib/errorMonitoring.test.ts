import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  normalizeError,
  errorSignature,
  shouldReport,
  captureError,
  registerErrorSink,
  resetErrorMonitoring,
  installGlobalErrorHandlers,
  type NormalizedError,
} from './errorMonitoring'

beforeEach(() => {
  resetErrorMonitoring()
})

describe('normalizeError', () => {
  it('preserves an Error name, message and stack', () => {
    const err = new TypeError('boom')
    const norm = normalizeError(err)
    expect(norm.name).toBe('TypeError')
    expect(norm.message).toBe('boom')
    expect(norm.stack).toBe(err.stack)
  })

  it('wraps a bare string', () => {
    expect(normalizeError('kaboom')).toEqual({ name: 'Error', message: 'kaboom' })
  })

  it('reads message/name/stack off a plain error-like object', () => {
    const norm = normalizeError({ name: 'CustomError', message: 'nope', stack: 'at x' })
    expect(norm).toEqual({ name: 'CustomError', message: 'nope', stack: 'at x' })
  })

  it('defaults the name when an object omits it', () => {
    expect(normalizeError({ message: 'no name' })).toEqual({ name: 'Error', message: 'no name' })
  })

  it('JSON-stringifies a messageless object', () => {
    expect(normalizeError({ code: 42 })).toEqual({ name: 'Error', message: '{"code":42}' })
  })

  it('stringifies primitives', () => {
    expect(normalizeError(null)).toEqual({ name: 'Error', message: 'null' })
    expect(normalizeError(undefined)).toEqual({ name: 'Error', message: 'undefined' })
  })
})

describe('errorSignature', () => {
  it('is stable for the same error and differs for different messages', () => {
    const a: NormalizedError = { name: 'Error', message: 'x', stack: 'trace' }
    const b: NormalizedError = { name: 'Error', message: 'y', stack: 'trace' }
    expect(errorSignature(a)).toBe(errorSignature({ ...a }))
    expect(errorSignature(a)).not.toBe(errorSignature(b))
  })
})

describe('shouldReport', () => {
  it('suppresses duplicates within the window and allows them after it', () => {
    const recent = new Map<string, number>()
    expect(shouldReport('sig', 1000, recent, 5000)).toBe(true)
    expect(shouldReport('sig', 2000, recent, 5000)).toBe(false)
    expect(shouldReport('sig', 6001, recent, 5000)).toBe(true)
  })

  it('treats distinct signatures independently', () => {
    const recent = new Map<string, number>()
    expect(shouldReport('a', 0, recent)).toBe(true)
    expect(shouldReport('b', 0, recent)).toBe(true)
  })
})

describe('captureError', () => {
  it('fans a normalized error out to every registered sink', () => {
    const sink = vi.fn()
    registerErrorSink(sink)
    captureError(new Error('hi'), { source: 'test' })
    expect(sink).toHaveBeenCalledTimes(1)
    const [error, context] = sink.mock.calls[0]!
    expect(error).toMatchObject({ name: 'Error', message: 'hi' })
    expect(context).toEqual({ source: 'test' })
  })

  it('collapses a burst of the same error into one report', () => {
    const sink = vi.fn()
    registerErrorSink(sink)
    // A real burst repeats the same throw site → identical name/message/stack.
    const err = new Error('same')
    captureError(err)
    captureError(err)
    captureError(err)
    expect(sink).toHaveBeenCalledTimes(1)
  })

  it('keeps calling other sinks when one throws', () => {
    const bad = vi.fn(() => {
      throw new Error('sink failed')
    })
    const good = vi.fn()
    registerErrorSink(bad)
    registerErrorSink(good)
    expect(() => captureError(new Error('boom'))).not.toThrow()
    expect(good).toHaveBeenCalledTimes(1)
  })
})

describe('installGlobalErrorHandlers', () => {
  it('registers and removes error + unhandledrejection listeners', () => {
    const listeners: Record<string, unknown> = {}
    const target = {
      addEventListener: vi.fn((type: string, fn: unknown) => {
        listeners[type] = fn
      }),
      removeEventListener: vi.fn(),
    } as unknown as Window

    const cleanup = installGlobalErrorHandlers(target)
    expect(target.addEventListener).toHaveBeenCalledWith('error', expect.any(Function))
    expect(target.addEventListener).toHaveBeenCalledWith('unhandledrejection', expect.any(Function))

    cleanup()
    expect(target.removeEventListener).toHaveBeenCalledWith('error', listeners['error'])
    expect(target.removeEventListener).toHaveBeenCalledWith('unhandledrejection', listeners['unhandledrejection'])
  })

  it('captures errors delivered through the installed error listener', () => {
    const sink = vi.fn()
    registerErrorSink(sink)
    let errorHandler: ((e: unknown) => void) | undefined
    const target = {
      addEventListener: vi.fn((type: string, fn: (e: unknown) => void) => {
        if (type === 'error') errorHandler = fn
      }),
      removeEventListener: vi.fn(),
    } as unknown as Window

    installGlobalErrorHandlers(target)
    errorHandler?.({ error: new Error('from window'), message: 'from window' })
    expect(sink).toHaveBeenCalledTimes(1)
    expect(sink.mock.calls[0]![1]).toMatchObject({ source: 'window.onerror', fatal: true })
  })
})
