import { formatValue } from './format'
import { canonicalJson, sha256Hex } from './hash'
import { normalizeInput } from './input'
import { ENGINE_VERSION } from './registry'
import type { ToolResult, ToolSpec } from './types'

/**
 * Run one tool on one input: normalise it, compute, and wrap the output in
 * the envelope every surface receives (docs/actuarial-tools.md §5). Throws
 * `ToolInputError` for an input it can't read; the caller decides how to say so.
 */
export function runTool(spec: ToolSpec, raw: unknown): ToolResult {
  const { input, defaulted, notes } = normalizeInput(spec, raw)
  const output = spec.compute(input)
  const judgments = spec.fields
    .filter(f => f.judgment)
    .map(f => ({ field: f.key, label: f.label, value: input[f.key], default: defaulted.includes(f.key) }))
  const summary = output.summary
    ?? `${spec.name}: ${output.tiles.map(t => `${t.label === 'Total' ? t.symbol : t.label} ${formatValue(t.value, t.unit)}`).join('; ')}.`
  return {
    tool: spec.id,
    version: spec.version,
    engine: ENGINE_VERSION,
    inputHash: `sha256:${sha256Hex(canonicalJson(input))}`,
    input,
    summary,
    tiles: output.tiles,
    table: output.table,
    values: output.values,
    judgments,
    warnings: [...notes, ...output.warnings],
    trace: output.trace,
    method: spec.method,
  }
}
