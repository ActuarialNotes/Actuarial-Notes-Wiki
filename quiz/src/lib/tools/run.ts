import { formatValue } from './format'
import { canonicalJson, sha256Hex } from './hash'
import { normalizeInput } from './input'
import { ENGINE_VERSION } from './registry'
import { ToolInputError, type ResultTable, type ToolResult, type ToolSpec } from './types'

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

/** The most runs one batch takes. */
export const MAX_BATCH_RUNS = 50

export interface BatchRunResult {
  label: string
  /** The run's envelope, or the message saying why its input couldn't be read. */
  result?: ToolResult
  error?: string
}

export interface BatchResult {
  tool: string
  version: string
  runs: BatchRunResult[]
  /** One row per run, the spec's `compare` values (or its tiles) side by side. */
  comparison: ResultTable
}

/**
 * Run one tool over several inputs: eight coverages' trend fits, or one trend
 * factor per accident year. Each run is `base` with its own fields laid over it,
 * runs independently (one bad input doesn't sink the rest), and the results are
 * laid side by side. Still one tool, one job — a batch is many runs of it.
 */
export function runBatch(spec: ToolSpec, base: unknown, runs: { label?: unknown; input?: unknown }[]): BatchResult {
  if (base != null && (typeof base !== 'object' || Array.isArray(base))) throw new ToolInputError('input', 'The shared input must be an object keyed by field name.')
  if (!Array.isArray(runs) || runs.length === 0) throw new ToolInputError('runs', 'Give at least one run: [{label, input}].')
  if (runs.length > MAX_BATCH_RUNS) throw new ToolInputError('runs', `At most ${MAX_BATCH_RUNS} runs in one batch; got ${runs.length}.`)
  const out: BatchRunResult[] = runs.map((run, i) => {
    const label = run && typeof run === 'object' && run.label != null && String(run.label).trim() ? String(run.label).trim() : `Run ${i + 1}`
    const own = run && typeof run === 'object' ? run.input : undefined
    if (own != null && (typeof own !== 'object' || Array.isArray(own))) return { label, error: `"input" must be an object keyed by field name.` }
    try {
      return { label, result: runTool(spec, { ...(base as object ?? {}), ...(own as object ?? {}) }) }
    } catch (err) {
      if (err instanceof ToolInputError) return { label, error: err.message }
      throw err
    }
  })
  const firstTiles = out.find(r => r.result)?.result?.tiles ?? []
  const cols = spec.compare ?? firstTiles.map((t, i) => ({ key: `tile_${i}`, label: t.label === 'Total' ? t.symbol : t.label, unit: t.unit }))
  const cell = (r: ToolResult, key: string, i: number): number | string | null => {
    const v = spec.compare ? r.values[key] : r.tiles[i]?.value
    return (typeof v === 'number' && Number.isFinite(v)) || typeof v === 'string' ? v : null
  }
  return {
    tool: spec.id,
    version: spec.version,
    runs: out,
    comparison: {
      columns: [
        { key: 'label', label: 'Run', kind: 'text' },
        ...cols.map(c => (c.unit === 'text'
          ? { key: c.key, label: c.label, kind: 'text' as const, computed: true }
          : { key: c.key, label: c.label, kind: 'number' as const, unit: c.unit, computed: true })),
        { key: 'warnings', label: 'Warnings', kind: 'number', unit: 'count' },
      ],
      rows: out.map(r => ({
        label: r.label,
        ...Object.fromEntries(cols.map((c, i) => [c.key, r.result ? cell(r.result, c.key, i) : null])),
        warnings: r.result ? r.result.warnings.length : null,
        ...(r.error ? { error: r.error } : {}),
      })),
    },
  }
}
