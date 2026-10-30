import { describe, it, expect } from 'vitest'
import { isResourcePage, registerResourcePaths, resourceRepoPath, splitResourcePath } from './resourceFolders'
import { entryRefToRepoPath, hrefToEntryRef, pathToEntryRef } from './wikiRoutes'

describe('resource folders', () => {
  it('reads a resource page in any folder, and only a titled page in a shared one', () => {
    expect(isResourcePage('Resources/Books/OSFI MCT.md', '')).toBe(true)
    expect(isResourcePage('Resources/Standards/X.md', '---\nTitle: "X"\n---\n')).toBe(true)
    expect(isResourcePage('Resources/Regulation/Creation of OSFI (1987).md', '---\nid: reg\ntype: event\n---\n')).toBe(false)
    expect(isResourcePage('Resources/Events/X.md', '---\nTitle: "X"\n---\n')).toBe(false)
    expect(splitResourcePath('Resources/Reports/A (2026).md')).toEqual({ folder: 'Reports', name: 'A (2026)' })
  })

  it('finds a page by its name wherever the bundle says it is, Books otherwise', () => {
    registerResourcePaths(
      ['Resources/Standards/Std One.md', 'Resources/Regulation/Timeline Entry.md', 'Concepts/X.md'],
      path => !path.includes('Timeline'),
    )
    expect(resourceRepoPath('Std One')).toBe('Resources/Standards/Std One.md')
    expect(resourceRepoPath('Timeline Entry')).toBe('Resources/Books/Timeline Entry.md')
    expect(resourceRepoPath('Werner')).toBe('Resources/Books/Werner.md')
  })

  it('routes a type-folder page as a resource, from its path or a bare link', () => {
    registerResourcePaths(['Resources/Reports/Rep Two.md'])
    expect(pathToEntryRef('Resources/Reports/Rep Two.md')).toEqual({ kind: 'resource', name: 'Rep Two', path: 'Resources/Reports/Rep Two.md' })
    expect(hrefToEntryRef('Rep Two')).toMatchObject({ kind: 'resource', name: 'Rep Two' })
    expect(entryRefToRepoPath({ kind: 'resource', name: 'Rep Two' })).toBe('Resources/Reports/Rep Two.md')
    // A shared folder's unregistered page keeps its old route.
    expect(pathToEntryRef('Resources/Regulation/Old.md')).toMatchObject({ kind: 'regulation' })
  })
})
