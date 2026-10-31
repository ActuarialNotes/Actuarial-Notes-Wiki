import { describe, it, expect } from 'vitest'
import { firstSentence, leadParagraph, readVaultDocument, vaultResource, vaultResourceId } from './coworkVault'
import { COWORK_ENTITIES, COWORK_RESOURCES, PUBLISHER_ENTITY, VAULT_RESOURCES } from '@/data/coworkSources'

const page = (type: string, extra = '') => `---
Title: "Uncollectible Reinsurance Reserves"
Authors: "Bruce E. Ollodart"
Publisher: "Casualty Actuarial Society"
Year: "1999"
date: "1999"
Type: "${type}"
Available from: "[casact.org](https://www.casact.org/sites/default/files/x.pdf)"${extra}
---

![[Uncollectible Reinsurance Reserves - Cover.svg]]

A paper by Bruce E. Ollodart on estimating the reserve for reinsurance that will not be collected, e.g. after a reinsurer fails. It surveys methods.

## Introduction

- …
`

describe('reading a resource page for Cowork', () => {
  it('reads the frontmatter, the link and the lead’s first sentence', () => {
    const doc = readVaultDocument('Resources/Papers/Ollodart.md', page('Paper'), ['Exam 7'])
    expect(doc).toEqual({
      name: 'Ollodart',
      path: 'Resources/Papers/Ollodart.md',
      title: 'Uncollectible Reinsurance Reserves',
      publisher: 'Casualty Actuarial Society',
      type: 'Paper',
      year: '1999',
      summary: 'A paper by Bruce E. Ollodart on estimating the reserve for reinsurance that will not be collected, e.g. after a reinsurer fails.',
      url: 'https://www.casact.org/sites/default/files/x.pdf',
      exams: ['Exam 7'],
    })
  })

  it('leaves out exam preparation and pages it can’t read', () => {
    for (const type of ['Textbook', 'Study Note', 'Course', 'Syllabus', 'Reference Sheet']) {
      expect(readVaultDocument('Resources/Books/X.md', page(type), [])).toBeNull()
    }
    expect(readVaultDocument('Resources/Data/X.md', '# No frontmatter\n', [])).toBeNull()
  })

  it('skips the cover and callouts to find the lead, and cuts at a real full stop', () => {
    expect(leadParagraph('![[c.svg]]\n\n> [!info] x\n\nFirst line\nsecond line.\n\nNext.')).toBe('First line second line.')
    expect(firstSentence('See [[OSFI MCT|the MCT]], s. 1.2. Then more.')).toBe('See the MCT, s. 1.2.')
    expect(firstSentence('By J. Smith and A. B. Jones. More.')).toBe('By J. Smith and A. B. Jones.')
  })

  it('files a page under its entity, its practice and functions read off its exams', () => {
    const doc = readVaultDocument('Resources/Papers/Ollodart.md', page('Paper'), ['Exam 7'])!
    expect(vaultResource(doc, { id: 'cas', practiceAreas: ['pc'] })).toEqual({
      id: 'vault-ollodart',
      entityId: 'cas',
      title: 'Uncollectible Reinsurance Reserves',
      kind: 'paper',
      published: '1999',
      summary: doc.summary,
      wikiRef: { kind: 'resource', name: 'Ollodart', path: 'Resources/Papers/Ollodart.md' },
      url: 'https://www.casact.org/sites/default/files/x.pdf',
      practiceAreas: ['pc'],
      functions: ['reserving', 'capital'],
    })
    const offSyllabus = vaultResource({ ...doc, exams: [] }, { id: 'soa', practiceAreas: ['life', 'pensions'] })
    expect(offSyllabus.practiceAreas).toEqual(['life', 'pensions'])
    expect(offSyllabus.functions).toEqual([])
    expect(vaultResourceId('Réassurance – Notes (2020)')).toBe('vault-reassurance-notes-2020')
  })
})

describe('the vault’s documents in the catalogue', () => {
  it('gives every derived document a summary worth reading', () => {
    const thin = VAULT_RESOURCES.filter(r => r.summary.length < 40).map(r => `${r.wikiRef?.name}: ${r.summary}`)
    expect(thin).toEqual([])
  })

  it('never lists a page twice, and never derives one an authored entry covers', () => {
    const pages = COWORK_RESOURCES.flatMap(r => (r.wikiRef ? [r.wikiRef.path ?? `Resources/Books/${r.wikiRef.name}.md`] : []))
    expect(pages.length).toBe(new Set(pages).size)
  })

  it('maps every publisher to an entity that exists', () => {
    const ids = new Set(COWORK_ENTITIES.map(e => e.id))
    const missing = [...new Set(Object.values(PUBLISHER_ENTITY))].filter(id => !ids.has(id))
    expect(missing).toEqual([])
  })
})
