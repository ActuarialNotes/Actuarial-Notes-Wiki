import { describe, expect, it, vi } from 'vitest'

// The merges under test are pure; the module also holds the Supabase IO.
vi.mock('@/lib/supabase', () => ({ supabase: {} }))

import { newAttempt, type ProjectAttempt } from '@/lib/pcpaAttempt'
import type { StoredFile } from './fileStore'
import {
  base64ToBytes,
  bytesToBase64,
  isSyncedPath,
  MAX_SYNCED_CHARS,
  planAttemptSync,
  planFileSync,
  READ_ONLY_MARKER,
  syncedLength,
  type RemoteAttempt,
  type SyncFile,
} from './projectSync'

const ME = 'user-me'
const THEM = 'user-them'

function attempt(id: string, opts: { at?: number; startedAt?: number; owner?: string; body?: string } = {}): ProjectAttempt {
  const a = newAttempt({ id, caseId: 'bop-frequency', seed: 1, mode: 'practice', language: 'r', now: opts.startedAt ?? 0, owner: opts.owner })
  return { ...a, updatedAt: opts.at ?? a.updatedAt, report: { body: opts.body ?? '', appendices: [] } }
}

function remote(a: ProjectAttempt): RemoteAttempt {
  const { owner: _owner, ...record } = a
  void _owner
  return { id: a.id, record: record as ProjectAttempt, deleted: false, updatedAt: a.updatedAt }
}

const tombstone = (id: string, at: number): RemoteAttempt => ({ id, record: null, deleted: true, updatedAt: at })

describe('planAttemptSync', () => {
  it('takes in an attempt made on another device', () => {
    const plan = planAttemptSync([], [remote(attempt('a', { at: 10 }))], ME)
    expect(plan.attempts.map(a => [a.id, a.owner])).toEqual([['a', ME]])
    expect(plan.push).toEqual([])
    expect(plan.changed).toBe(true)
  })

  it('keeps the later of two copies, whichever side it is on', () => {
    const local = attempt('a', { at: 20, owner: ME, body: 'local' })
    const older = remote(attempt('a', { at: 10, body: 'remote' }))
    let plan = planAttemptSync([local], [older], ME)
    expect(plan.attempts[0].report.body).toBe('local')
    expect(plan.push.map(a => a.id)).toEqual(['a'])
    expect(plan.changed).toBe(false)

    const newer = remote(attempt('a', { at: 30, body: 'remote' }))
    plan = planAttemptSync([local], [newer], ME)
    expect(plan.attempts[0].report.body).toBe('remote')
    expect(plan.push).toEqual([])
    expect(plan.changed).toBe(true)
  })

  it('writes back an attempt the account has never had', () => {
    const plan = planAttemptSync([attempt('a', { at: 5, owner: ME })], [], ME)
    expect(plan.push.map(a => a.id)).toEqual(['a'])
    expect(plan.changed).toBe(false)
  })

  it('leaves two identical copies alone', () => {
    const a = attempt('a', { at: 5, owner: ME })
    const plan = planAttemptSync([a], [remote(a)], ME)
    expect(plan.push).toEqual([])
    expect(plan.changed).toBe(false)
  })

  it('drops an attempt deleted on another device since this copy', () => {
    const plan = planAttemptSync([attempt('a', { at: 5, owner: ME })], [tombstone('a', 9)], ME)
    expect(plan.attempts).toEqual([])
    expect(plan.removed).toEqual(['a'])
  })

  it('keeps an attempt changed here after it was deleted elsewhere', () => {
    const plan = planAttemptSync([attempt('a', { at: 12, owner: ME })], [tombstone('a', 9)], ME)
    expect(plan.attempts.map(a => a.id)).toEqual(['a'])
    expect(plan.push.map(a => a.id)).toEqual(['a'])
  })

  it('never brings a tombstone in as an attempt', () => {
    expect(planAttemptSync([], [tombstone('a', 9)], ME).attempts).toEqual([])
  })

  it('takes attempts started signed out into the account that signs in', () => {
    const plan = planAttemptSync([attempt('guest', { at: 5 })], [], ME)
    expect(plan.adopted).toEqual(['guest'])
    expect(plan.attempts[0].owner).toBe(ME)
    expect(plan.push.map(a => [a.id, a.owner])).toEqual([['guest', ME]])
    expect(plan.changed).toBe(true)
  })

  it("carries another account's attempts through untouched", () => {
    const theirs = attempt('t', { at: 5, owner: THEM })
    const plan = planAttemptSync([theirs], [tombstone('t', 9)], ME)
    expect(plan.attempts).toEqual([theirs])
    expect(plan.removed).toEqual([])
    expect(plan.push).toEqual([])
  })

  it('keeps the list newest first', () => {
    const plan = planAttemptSync(
      [attempt('old', { startedAt: 100, owner: ME })],
      [remote(attempt('new', { startedAt: 200 }))],
      ME,
    )
    expect(plan.attempts.map(a => a.id)).toEqual(['new', 'old'])
  })
})

const stored = (path: string, updatedAt: number, text = path): StoredFile => ({ attemptId: 'a', path, text, size: text.length, updatedAt })
const synced = (path: string, updatedAt: number, extra: Partial<SyncFile> = {}): SyncFile => ({ path, text: path, size: path.length, updatedAt, readOnly: false, ...extra })

describe('planFileSync', () => {
  it('writes in what the account has newer, and sends back what this browser has newer', () => {
    const plan = planFileSync(
      [stored('code/a.R', 10), stored('code/b.R', 30)],
      [synced('code/a.R', 20), synced('code/b.R', 20)],
      new Set(),
    )
    expect(plan.write.map(f => f.path)).toEqual(['code/a.R'])
    expect(plan.push.map(f => f.path)).toEqual(['code/b.R'])
    expect(plan.remove).toEqual([])
  })

  it('takes in files made on another device and sends files made here', () => {
    const plan = planFileSync([stored('output/lift.csv', 5)], [synced('code/a.R', 5)], new Set())
    expect(plan.write.map(f => f.path)).toEqual(['code/a.R'])
    expect(plan.push.map(f => f.path)).toEqual(['output/lift.csv'])
  })

  it('removes a file deleted on another device since this copy, and no other', () => {
    const plan = planFileSync(
      [stored('code/old.R', 5), stored('code/kept.R', 20)],
      [synced('code/old.R', 10, { deleted: true }), synced('code/kept.R', 10, { deleted: true }), synced('code/gone.R', 10, { deleted: true })],
      new Set(),
    )
    expect(plan.remove).toEqual(['code/old.R'])
    expect(plan.write).toEqual([])
    expect(plan.push.map(f => f.path)).toEqual(['code/kept.R'])
  })

  it('never syncs the data sets or the read-only marker', () => {
    const plan = planFileSync(
      [stored('data/policies.csv', 50), stored(READ_ONLY_MARKER, 50)],
      [synced('data/claims.csv', 60)],
      new Set(['data/policies.csv']),
    )
    expect(plan).toEqual({ write: [], remove: [], push: [] })
  })

  it('carries the read-only flag with a pushed file', () => {
    const plan = planFileSync([stored('submission/code/a.R', 5)], [], new Set(['submission/code/a.R']))
    expect(plan.push[0].readOnly).toBe(true)
  })

  it('keeps a file too large to sync in this browser', () => {
    const big = 'x'.repeat(MAX_SYNCED_CHARS + 1)
    const plan = planFileSync([stored('output/big.csv', 5, big)], [], new Set())
    expect(plan.push).toEqual([])
  })
})

describe('what is synced', () => {
  it('is everything but the data sets and the marker', () => {
    expect(isSyncedPath('code/analysis.R')).toBe(true)
    expect(isSyncedPath('submission/code/analysis.R')).toBe(true)
    expect(isSyncedPath('data/policies.csv')).toBe(false)
    expect(isSyncedPath(READ_ONLY_MARKER)).toBe(false)
  })

  it('counts a binary file at its base64 length', () => {
    expect(syncedLength({ text: 'abc' })).toBe(3)
    expect(syncedLength({ bytes: new Uint8Array(4) })).toBe(bytesToBase64(new Uint8Array(4)).length)
  })

  it('round-trips bytes through base64, past one chunk', () => {
    const bytes = new Uint8Array(70_000).map((_, i) => (i * 31) % 256)
    expect(base64ToBytes(bytesToBase64(bytes))).toEqual(bytes)
  })
})
