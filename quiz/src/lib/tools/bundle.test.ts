import { describe, it, expect } from 'vitest'
import { readFile } from 'fs/promises'
// The engine bundle the MCP connector runs (api/_tools/engine.js) must be
// this source tree, rebuilt — or a person and an agent would get different
// numbers for the same input (docs/actuarial-tools.md R1, §8.2).
import { ENGINE_BUNDLE, buildToolsEngine } from '../../../scripts/tools-bundle.mjs'
import * as bundled from '../../../api/_tools/engine.js'
import { TOOLS, defaultInput, runTool } from './index'

describe('the bundled engine', () => {
  it('is up to date with src/lib/tools — run `npm run tools:bundle` if this fails', async () => {
    expect(await readFile(ENGINE_BUNDLE, 'utf8')).toBe(await buildToolsEngine())
  })

  it('gives byte-identical results to the app engine (parity, R1)', () => {
    for (const spec of TOOLS) {
      const other = bundled.toolById(spec.id)
      expect(other).toBeTruthy()
      expect(JSON.stringify(bundled.runTool(other, defaultInput(spec)))).toBe(JSON.stringify(runTool(spec, defaultInput(spec))))
    }
  })
})
