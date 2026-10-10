/** The app's public origin. The connector is always offered at this address, not a preview's. */
export declare const PUBLIC_SITE_URL = "https://quiz.actuarialnotes.com";
/** The MCP endpoint, served by `quiz/api/mcp.js`. */
export declare const CONNECTOR_PATH = "/api/mcp";
/** The Agent Skill package the build zips from `quiz/skills/actuarial-notes/`. */
export declare const SKILL_ASSET = "ai/actuarial-notes-skill.zip";
/** The connector's address on an origin — the public one unless told otherwise. */
export declare function connectorUrl(origin?: string): string;
/** Where the skill package downloads from. */
export declare function skillUrl(origin?: string): string;
