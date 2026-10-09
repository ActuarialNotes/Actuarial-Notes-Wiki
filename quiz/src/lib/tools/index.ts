/**
 * The Actuarial Tools engine (docs/actuarial-tools.md). This module is the
 * whole public surface: the app imports it, and `npm run tools:bundle` bundles
 * it into `quiz/api/_tools/engine.js` for the MCP connector, so a person and an
 * agent run the same code (R1).
 */

export { TOOLS, AREAS, ENGINE_VERSION, toolById, toolBySlug, toolSlug } from './registry'
export { runTool } from './run'
export { describeTool, inputSchema, sourceLine, toolSummary } from './schema'
export { CHECKS, QUESTION_CHECKS, checksFor, checkedValueCount, verifyCheck, type QuestionCheck, type SourceRef } from './checks'
export { defaultInput, normalizeInput, readNumber } from './input'
export { formatValue } from './format'
export { decodeRunInput, encodeRunInput, runPath } from './share'
export { ToolInputError } from './types'
export type * from './types'
