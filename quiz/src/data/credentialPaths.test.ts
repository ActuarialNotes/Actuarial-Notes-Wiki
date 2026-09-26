import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { CREDENTIAL_PATHS, CREDENTIAL_PATH_MARKER, type PathItem, type StageKind } from './credentialPaths'
import { TRACKS } from './tracks'
import { entryRefToRepoPath } from '@/lib/wikiRoutes'
import { buildListenContent } from '@/lib/listenTokens'

const VAULT = resolve(__dirname, '../../..')
const GUIDE = 'Guides/How to Study for Actuarial Exams.md'

function trackIds(key: string): Set<string> {
  const track = TRACKS.find(t => t.key === key)
  if (!track) throw new Error(`no track ${key}`)
  return new Set(track.sections.flatMap(s => s.items.map(i => i.id)))
}

function pathIds(body: 'SOA' | 'CAS', kinds: StageKind[]): Set<string> {
  return new Set(
    CREDENTIAL_PATHS[body].stages
      .filter(s => kinds.includes(s.kind))
      .flatMap(s => s.items.flatMap(i => i.trackIds ?? [])),
  )
}

function allItems(): PathItem[] {
  return Object.values(CREDENTIAL_PATHS).flatMap(p =>
    p.stages.flatMap(s => [...s.items, ...(s.optional?.items ?? [])]),
  )
}

describe('credential paths', () => {
  it('runs start → associate → fellow → ongoing for both societies', () => {
    for (const path of Object.values(CREDENTIAL_PATHS)) {
      expect(path.stages.map(s => s.kind)).toEqual(['start', 'associate', 'fellow', 'ongoing'])
    }
  })

  // The path and the progress tracks describe the same requirements. Holding
  // them together both ways means a requirement added to a track shows up
  // here, and the path can't name one the track doesn't have.
  it.each([
    ['CAS', 'ACAS', ['start', 'associate']],
    ['SOA', 'ASA', ['start', 'associate']],
  ] as const)('%s start + associateship covers exactly the %s track', (body, key, kinds) => {
    expect(pathIds(body, [...kinds])).toEqual(trackIds(key))
  })

  it.each([
    ['CAS', 'FCAS', 'ACAS'],
    ['SOA', 'FSA', 'ASA'],
  ] as const)('%s fellowship covers exactly what %s adds to %s', (body, fellow, associate) => {
    const assoc = trackIds(associate)
    const added = new Set([...trackIds(fellow)].filter(id => !assoc.has(id)))
    expect(pathIds(body, ['fellow'])).toEqual(added)
  })

  it('gives every item a tile', () => {
    for (const item of allItems()) {
      expect(Boolean(item.exam) || Boolean(item.icon), item.name).toBe(true)
    }
  })

  it('links only to pages that are in the vault', () => {
    const refs = [
      ...Object.values(CREDENTIAL_PATHS).flatMap(p => p.stages.map(s => s.ref)),
      ...allItems().map(i => i.ref),
    ].filter(ref => ref !== undefined)
    expect(refs.length).toBeGreaterThan(0)
    const missing = refs.map(entryRefToRepoPath).filter(path => !existsSync(resolve(VAULT, path)))
    expect(missing).toEqual([])
  })

  it('is placed by the general study guide', () => {
    const lines = readFileSync(resolve(VAULT, GUIDE), 'utf8').split('\n')
    expect(lines.filter(l => l.trim() === CREDENTIAL_PATH_MARKER)).toHaveLength(1)
  })

  // The marker is an Obsidian comment; Listen must not read it out.
  it('keeps the marker out of Listen', () => {
    const md = readFileSync(resolve(VAULT, GUIDE), 'utf8')
    const { tokens } = buildListenContent(md)
    expect(tokens.map(t => t.speech).join(' ')).not.toContain('credential-path')
  })
})
