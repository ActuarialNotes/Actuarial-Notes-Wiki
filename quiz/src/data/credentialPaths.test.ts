import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  CREDENTIAL_MAP_MARKER,
  CREDENTIAL_PATHS,
  CREDENTIAL_PATH_MARKER,
  isCredentialMapMarker,
  readCredentialPathMarker,
  type PathItem,
  type StageKind,
} from './credentialPaths'
import { TRACKS } from './tracks'
import { entryRefToRepoPath } from '@/lib/wikiRoutes'
import { buildListenContent } from '@/lib/listenTokens'

const VAULT = resolve(__dirname, '../../..')
const GUIDE = 'Guides/How to Study for Actuarial Exams.md'
const MAP_PAGE = 'Concepts/Credential Path.md'

function trackIds(key: string): Set<string> {
  const track = TRACKS.find(t => t.key === key)
  if (!track) throw new Error(`no track ${key}`)
  return new Set(track.sections.flatMap(s => s.items.map(i => i.id)))
}

function pathIds(body: 'SOA' | 'CAS' | 'CIA', kinds: StageKind[]): Set<string> {
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
    ['CIA', 'ACIA', ['start', 'associate']],
  ] as const)('%s start + associateship covers exactly the %s track', (body, key, kinds) => {
    expect(pathIds(body, [...kinds])).toEqual(trackIds(key))
  })

  it.each([
    ['CAS', 'FCAS', 'ACAS'],
    ['SOA', 'FSA', 'ASA'],
    ['CIA', 'FCIA', 'ACIA'],
  ] as const)('%s fellowship covers exactly what %s adds to %s', (body, fellow, associate) => {
    const assoc = trackIds(associate)
    const added = new Set([...trackIds(fellow)].filter(id => !assoc.has(id)))
    expect(pathIds(body, ['fellow'])).toEqual(added)
  })

  // A choice's groups are drawn from the item's own ids, and a group is never
  // empty — an empty group would count as done before anything was sat.
  it('builds every choice out of the item\'s own track ids', () => {
    for (const item of allItems()) {
      if (!item.progress || item.progress === 'none') continue
      const own = new Set(item.trackIds ?? [])
      expect(item.progress.anyOf.length, item.name).toBeGreaterThan(1)
      for (const group of item.progress.anyOf) {
        expect(group.length, item.name).toBeGreaterThan(0)
        for (const id of group) expect(own.has(id), `${item.name}: ${id}`).toBe(true)
      }
    }
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

  it('is the first thing on the general study guide', () => {
    const lines = readFileSync(resolve(VAULT, GUIDE), 'utf8').split('\n')
    expect(lines.filter(l => l.trim() === CREDENTIAL_PATH_MARKER)).toHaveLength(1)
    expect(lines.find(l => l.trim() !== '')?.trim()).toBe(CREDENTIAL_PATH_MARKER)
  })

  // Each designation page shows the path opened at itself. The page is the
  // stage's own `ref`, so a renamed page or a missing marker fails here.
  it.each(
    Object.values(CREDENTIAL_PATHS).flatMap(p =>
      p.stages.flatMap((s, i) => (s.ref ? [[s.short, s.ref, p.body, i] as const] : [])),
    ),
  )('is placed by the %s page, opened at itself', (short, ref, body, stage) => {
    const lines = readFileSync(resolve(VAULT, entryRefToRepoPath(ref)), 'utf8').split('\n')
    const markers = lines.filter(l => readCredentialPathMarker(l) !== null)
    expect(markers.map(l => l.trim())).toEqual([`%%credential-path ${short}%%`])
    expect(readCredentialPathMarker(markers[0])).toEqual({ at: { body, stage } })
  })

  it('reads the bare marker as the unplaced path', () => {
    expect(readCredentialPathMarker(CREDENTIAL_PATH_MARKER)).toEqual({})
    expect(readCredentialPathMarker(`  ${CREDENTIAL_PATH_MARKER}  `)).toEqual({})
  })

  // A designation no stage has isn't a marker: the typo stays visible on the
  // page instead of quietly drawing the path at the start.
  it.each(['%%credential-path CERA%%', '%%credential-path Start%%', '%%credential-paths%%', 'credential-path'])(
    'refuses %s',
    text => expect(readCredentialPathMarker(text)).toBeNull(),
  )

  // The marker is an Obsidian comment; Listen must not read it out.
  it('keeps the marker out of Listen', () => {
    const md = readFileSync(resolve(VAULT, GUIDE), 'utf8')
    const { tokens } = buildListenContent(md)
    expect(tokens.map(t => t.speech).join(' ')).not.toContain('credential-path')
  })

  // The Credential Path page leads with the map and links every designation
  // page the map's nodes stand for.
  it('maps all three societies on the Credential Path page', () => {
    const md = readFileSync(resolve(VAULT, MAP_PAGE), 'utf8')
    expect(md.split('\n').filter(isCredentialMapMarker)).toHaveLength(1)
    for (const path of Object.values(CREDENTIAL_PATHS)) {
      for (const stage of path.stages) {
        if (stage.ref) expect(md, stage.ref.name).toContain(`[[${stage.ref.name}|`)
      }
    }
    expect(isCredentialMapMarker(`  ${CREDENTIAL_MAP_MARKER} `)).toBe(true)
    expect(isCredentialMapMarker('%%credential-map SOA%%')).toBe(false)
  })
})
