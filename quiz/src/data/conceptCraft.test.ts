import { describe, expect, it } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { CRAFT_MODULES, craftModuleById } from './conceptCraft'
import { moduleNodes, moduleProblems } from '@/lib/conceptCraft'
import { parseExamSyllabus } from '@/lib/wikiParser'
import { examAccentStyle } from '@/lib/examColors'

const VAULT = resolve(__dirname, '../../..')

/**
 * The recipe book's ties to the vault. A node that isn't a page would open
 * "Couldn't load" in the inspector; a module whose objectives aren't the
 * page's would sit in the topic picker under a section the study guide
 * doesn't have.
 */
describe('the Concept Craft recipe book', () => {
  it('has unique, url-safe module ids', () => {
    const ids = CRAFT_MODULES.map(m => m.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(craftModuleById(ids[0])).toBe(CRAFT_MODULES[0])
    expect(craftModuleById('nope')).toBeUndefined()
  })

  it.each(CRAFT_MODULES.map(m => [m.id, m] as const))('%s keeps the engine’s rules', (_, module) => {
    expect(moduleProblems(module)).toEqual([])
  })

  it.each(CRAFT_MODULES.map(m => [m.id, m] as const))('%s names only concept pages that exist', (_, module) => {
    const missing = moduleNodes(module).filter(n => !existsSync(resolve(VAULT, 'Concepts', `${n}.md`)))
    expect(missing).toEqual([])
  })

  it.each(CRAFT_MODULES.map(m => [m.id, m] as const))('%s covers objectives its exam page has', (_, module) => {
    const path = resolve(VAULT, `${module.examPage}.md`)
    expect(existsSync(path)).toBe(true)
    const syllabus = parseExamSyllabus(readFileSync(path, 'utf8'), '', '', '')
    const names = syllabus.topics.map(t => t.name)
    for (const objective of module.objectives) expect(names).toContain(objective)
  })

  it('paints every module in its exam’s colour', () => {
    for (const module of CRAFT_MODULES) expect(examAccentStyle(module.exam)).toBeDefined()
  })

  it('writes every why line with balanced math', () => {
    for (const module of CRAFT_MODULES) {
      for (const r of module.recipes) {
        const dollars = r.why.replace(/\\\$/g, '').split('$').length - 1
        expect(dollars % 2, `${module.id}: ${r.a} + ${r.b}`).toBe(0)
      }
    }
  })
})
