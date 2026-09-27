// Where the Claude / ChatGPT connector lives — the one place the surfaces that
// tell a reader how to connect (Settings, llms.txt, the skill package) read the
// addresses from. See docs/ai-connector.md.
//
// Imports nothing: vite.config.ts reads these constants at build time too.

/** The app's public origin. The connector is always offered at this address, not a preview's. */
export const PUBLIC_SITE_URL = 'https://quiz.actuarialnotes.com'

/** The MCP endpoint, served by `quiz/api/mcp.js`. */
export const CONNECTOR_PATH = '/api/mcp'

/** The Agent Skill package the build zips from `quiz/skills/actuarial-notes/`. */
export const SKILL_ASSET = 'ai/actuarial-notes-skill.zip'

/** The connector's address on an origin — the public one unless told otherwise. */
export function connectorUrl(origin: string = PUBLIC_SITE_URL): string {
  return `${origin.replace(/\/+$/, '')}${CONNECTOR_PATH}`
}

/** Where the skill package downloads from. */
export function skillUrl(origin: string = PUBLIC_SITE_URL): string {
  return `${origin.replace(/\/+$/, '')}/${SKILL_ASSET}`
}
