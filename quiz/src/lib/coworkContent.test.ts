import { describe, it, expect } from 'vitest'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { COWORK_RESOURCES, COWORK_ENTITIES } from '@/data/coworkSources'
import { COWORK_DOCS } from '@/data/coworkDocs'
import { resourceEntryRef } from './coworkSources'
import { entryRefToRepoPath } from './wikiRoutes'

/**
 * The catalogue's integrity checks.
 *
 * Every one of these guards a way the seed data could quietly lie to a reader:
 * a document that opens nothing, a sample with no body behind it, a "real"
 * entry carrying a date it cannot support, or a resource belonging to a
 * publisher that isn't listed.
 */

describe('the source catalogue', () => {
  it('gives every resource a publisher that exists', () => {
    const ids = new Set(COWORK_ENTITIES.map(e => e.id))
    const orphans = COWORK_RESOURCES.filter(r => !ids.has(r.entityId)).map(r => r.id)
    expect(orphans).toEqual([])
  })

  it('has no duplicate resource ids', () => {
    const ids = COWORK_RESOURCES.map(r => r.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('has no duplicate entity ids', () => {
    const ids = COWORK_ENTITIES.map(e => e.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('gives every entity at least one document to publish', () => {
    const publishing = new Set(COWORK_RESOURCES.map(r => r.entityId))
    const silent = COWORK_ENTITIES.filter(e => !publishing.has(e.id)).map(e => e.id)
    expect(silent).toEqual([])
  })

  it('makes every resource openable — a row that opens nothing is a dead end', () => {
    const dead = COWORK_RESOURCES.filter(r => resourceEntryRef(r) === null).map(r => r.id)
    expect(dead).toEqual([])
  })

  it('backs every Cowork document with a body', () => {
    const missing = COWORK_RESOURCES.filter(r => r.docPath && COWORK_DOCS[r.docPath] === undefined).map(r => r.id)
    expect(missing).toEqual([])
  })

  it('leaves no orphaned document body behind a removed resource', () => {
    const referenced = new Set(COWORK_RESOURCES.map(r => r.docPath).filter(Boolean))
    expect(Object.keys(COWORK_DOCS).filter(p => !referenced.has(p))).toEqual([])
  })

  it('marks every Cowork-authored document as a sample, and no wiki page as one', () => {
    for (const r of COWORK_RESOURCES) {
      if (r.docPath) expect(r.sample, `${r.id} should be marked a sample`).toBe(true)
      if (r.wikiRef) expect(r.sample, `${r.id} is a wiki page, not a sample`).toBeUndefined()
    }
  })

  it('never dates or links a sample — it names no particular document', () => {
    for (const r of COWORK_RESOURCES.filter(r => r.sample)) {
      expect(r.published, `${r.id} must not carry a date`).toBeNull()
      expect(r.url, `${r.id} must not carry a link`).toBeUndefined()
    }
  })

  it('writes every date as a year or a full ISO date', () => {
    for (const r of COWORK_RESOURCES) {
      if (r.published === null) continue
      expect(r.published, `${r.id}`).toMatch(/^\d{4}(-\d{2}-\d{2})?$/)
    }
  })

  it('gives every resource a summary and at least one practice area', () => {
    for (const r of COWORK_RESOURCES) {
      expect(r.summary.trim(), `${r.id}`).not.toBe('')
      expect(r.practiceAreas.length, `${r.id}`).toBeGreaterThan(0)
    }
  })

  it('keeps every entity monogram short enough for the logo tile', () => {
    // `EntityLogo` steps the type down to 0.19 of the tile's edge at six
    // characters; past that a monogram stops fitting the square.
    for (const e of COWORK_ENTITIES) {
      expect(e.short.length, `${e.id}`).toBeGreaterThan(1)
      expect(e.short.length, `${e.id}`).toBeLessThanOrEqual(6)
    }
  })
})

describe('the wiki-backed resources', () => {
  // The vault root, from this file: quiz/src/lib → the repository root.
  const VAULT = resolve(__dirname, '../../..')

  it('points every one at a page that is actually in the vault', () => {
    // A `wikiRef` that no longer resolves is the failure mode this catalogue is
    // most exposed to: a vault page gets renamed, and a Cowork row quietly
    // starts opening an empty panel. Resolve them the way the app does and
    // check the file is there.
    const missing = COWORK_RESOURCES.filter(r => r.wikiRef)
      .map(r => ({ id: r.id, path: entryRefToRepoPath(r.wikiRef!) }))
      .filter(x => !existsSync(resolve(VAULT, x.path)))
      .map(x => `${x.id} → ${x.path}`)
    expect(missing).toEqual([])
  })

  it('checks a meaningful number of them, so a broken glob cannot pass silently', () => {
    expect(COWORK_RESOURCES.filter(r => r.wikiRef).length).toBeGreaterThan(10)
  })
})

describe('the sample documents', () => {
  it('registers each one at the path its resource names', () => {
    for (const r of COWORK_RESOURCES.filter(r => r.docPath)) {
      expect(entryRefToRepoPath(resourceEntryRef(r)!)).toBe(r.docPath)
    }
  })

  it('opens each with front matter the resource card can read', () => {
    for (const [path, body] of Object.entries(COWORK_DOCS)) {
      expect(body.startsWith('---\n'), path).toBe(true)
      expect(body, path).toContain('Title:')
      expect(body, path).toContain('Publisher:')
    }
  })

  it('says on its face that it is a sample, so it is never cited as a document', () => {
    for (const [path, body] of Object.entries(COWORK_DOCS)) {
      expect(body, path).toContain('Sample entry')
    }
  })
})
