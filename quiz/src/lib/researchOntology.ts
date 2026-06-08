// Research-tool ontology: maps Canadian P&C insurance "agents" (regulators,
// industry bureaus, insurers) to their display/jurisdiction metadata, and
// resolves structural relationships between them and exam syllabus tags.
//
// Mirrors the static, pure-function style of conceptMatch.ts: small named
// exports over a static reference table, no classes, no DB calls. The
// reference table here mirrors the `research_agents` seed data in
// supabase/migrations/20260608_research.sql — it is the client-side source of
// truth for display metadata so the UI doesn't need a round trip just to label
// a badge.

export type AgentType =
  | 'federal_regulator'
  | 'provincial_regulator'
  | 'industry_bureau'
  | 'public_insurer'
  | 'federally_incorporated_insurer'
  | 'province_incorporated_insurer'

export type RegulatoryDomain =
  | 'solvency'
  | 'product_regulation'
  | 'market_conduct'
  | 'statistics'
  | 'financial_disclosure'

export type RelationshipType =
  | 'regulates'
  | 'files_with'
  | 'responds_to'
  | 'supersedes'
  | 'cites'
  | 'parent_of'
  | 'statistical_member_of'

export interface AgentJurisdiction {
  scope: 'federal' | 'provincial' | 'multi_provincial'
  provinces: string[]
  domains: RegulatoryDomain[]
}

export interface AgentMeta {
  id: string
  type: AgentType
  legalName: string
  shortName: string
  jurisdiction: AgentJurisdiction
  parentId?: string
}

/** A research document, as far as the ontology layer needs to see it. */
export interface ResearchDocument {
  agentId: string
  examTags?: string[] | null
}

const AGENTS: AgentMeta[] = [
  { id: 'osfi', type: 'federal_regulator', legalName: 'Office of the Superintendent of Financial Institutions', shortName: 'OSFI', jurisdiction: { scope: 'federal', provinces: [], domains: ['solvency'] } },
  { id: 'fsra', type: 'provincial_regulator', legalName: 'Financial Services Regulatory Authority of Ontario', shortName: 'FSRA', jurisdiction: { scope: 'provincial', provinces: ['ON'], domains: ['product_regulation', 'market_conduct'] } },
  { id: 'airb', type: 'provincial_regulator', legalName: 'Alberta Insurance Rate Board', shortName: 'AIRB', jurisdiction: { scope: 'provincial', provinces: ['AB'], domains: ['product_regulation'] } },
  { id: 'amf', type: 'provincial_regulator', legalName: 'Autorité des marchés financiers', shortName: 'AMF', jurisdiction: { scope: 'provincial', provinces: ['QC'], domains: ['product_regulation', 'market_conduct'] } },
  { id: 'bcfsa', type: 'provincial_regulator', legalName: 'BC Financial Services Authority', shortName: 'BCFSA', jurisdiction: { scope: 'provincial', provinces: ['BC'], domains: ['product_regulation', 'market_conduct'] } },
  { id: 'ibc', type: 'industry_bureau', legalName: 'Insurance Bureau of Canada', shortName: 'IBC', jurisdiction: { scope: 'multi_provincial', provinces: [], domains: ['statistics'] } },
  { id: 'gisa', type: 'industry_bureau', legalName: 'General Insurance Statistical Agency', shortName: 'GISA', jurisdiction: { scope: 'multi_provincial', provinces: ['AB', 'NB', 'NL', 'NS', 'PE'], domains: ['statistics'] } },
  { id: 'icbc', type: 'public_insurer', legalName: 'Insurance Corporation of British Columbia', shortName: 'ICBC', jurisdiction: { scope: 'provincial', provinces: ['BC'], domains: ['product_regulation'] } },
  { id: 'intact-financial', type: 'federally_incorporated_insurer', legalName: 'Intact Financial Corporation', shortName: 'Intact', jurisdiction: { scope: 'multi_provincial', provinces: ['ON', 'AB', 'QC', 'BC', 'ATL'], domains: ['financial_disclosure'] } },
  { id: 'desjardins-general', type: 'federally_incorporated_insurer', legalName: 'Desjardins General Insurance Group', shortName: 'Desjardins', jurisdiction: { scope: 'multi_provincial', provinces: ['ON', 'QC'], domains: ['financial_disclosure'] } },
  { id: 'aviva-canada', type: 'federally_incorporated_insurer', legalName: 'Aviva Canada Inc.', shortName: 'Aviva', jurisdiction: { scope: 'multi_provincial', provinces: ['ON', 'AB', 'QC', 'BC'], domains: ['financial_disclosure'] } },
  { id: 'td-insurance', type: 'federally_incorporated_insurer', legalName: 'TD Insurance', shortName: 'TD Insurance', jurisdiction: { scope: 'multi_provincial', provinces: [], domains: ['financial_disclosure'] } },
  { id: 'cooperators', type: 'federally_incorporated_insurer', legalName: 'The Co-operators General Insurance Company', shortName: 'Co-operators', jurisdiction: { scope: 'multi_provincial', provinces: [], domains: ['financial_disclosure'] } },
]

const AGENTS_BY_ID = new Map(AGENTS.map(a => [a.id, a]))

const INSURER_TYPES: ReadonlySet<AgentType> = new Set([
  'public_insurer',
  'federally_incorporated_insurer',
  'province_incorporated_insurer',
])

/** Look up an agent's display/jurisdiction metadata by its slug. */
export function agentMeta(id: string): AgentMeta | undefined {
  return AGENTS_BY_ID.get(id)
}

/** All known agents, in seed order — for building filter pickers, legends, etc. */
export function allAgents(): readonly AgentMeta[] {
  return AGENTS
}

/** Active agents that are authoritative for a given regulatory domain. */
export function authoritativeAgents(domain: RegulatoryDomain): string[] {
  return AGENTS.filter(a => a.jurisdiction.domains.includes(domain)).map(a => a.id)
}

/**
 * Describe the structural regulatory relationship between two agents, if one
 * is inferable from their types and jurisdictions. This is deliberately
 * definitional (e.g. "a federal regulator regulates federally incorporated
 * insurers") rather than asserting specific real-world facts that belong in
 * `research_relationships` with an explicit `inference_method`.
 */
export function agentRelationship(a: string, b: string): RelationshipType | null {
  if (a === b) return null
  const agentA = agentMeta(a)
  const agentB = agentMeta(b)
  if (!agentA || !agentB) return null

  if (agentA.parentId === agentB.id || agentB.parentId === agentA.id) return 'parent_of'

  const [regulator, insurer] = INSURER_TYPES.has(agentB.type)
    ? [agentA, agentB]
    : INSURER_TYPES.has(agentA.type)
      ? [agentB, agentA]
      : [undefined, undefined]
  if (!regulator || !insurer || regulator === insurer) return null

  const overlapsJurisdiction = (x: AgentMeta, y: AgentMeta) =>
    x.jurisdiction.provinces.length === 0 ||
    x.jurisdiction.provinces.some(p => y.jurisdiction.provinces.includes(p))

  if (regulator.type === 'federal_regulator' && insurer.type === 'federally_incorporated_insurer') {
    return 'regulates'
  }
  if (regulator.type === 'provincial_regulator' && overlapsJurisdiction(regulator, insurer)) {
    return 'regulates'
  }
  if (regulator.type === 'industry_bureau' && overlapsJurisdiction(regulator, insurer)) {
    return 'statistical_member_of'
  }
  return null
}

const EXAM_TAG_PREFIX = /^exam[\s-]*/i
const EXAM_TAG_PAREN_SUFFIX = /\s*\([^)]*\)\s*$/
const EXAM_TAG_SOCIETY_SUFFIX = /[\s-]*(cas|soa)$/i

/**
 * Normalize a (possibly AI-generated) exam tag to the canonical slug format
 * the app already uses for exam ids — see `examIdFromFile` in wikiRoutes.ts
 * (e.g. "Exam 6C (CAS)" -> "6c-1"). AI extraction may emit variants like
 * "exam-6c-cas", "Exam 6C (CAS)", or "exam-5-cas"; this folds them all onto the
 * same canonical form so `exam_tags` reliably link to the matching wiki exam page.
 */
export function normalizeExamTag(raw: string): string | null {
  let cleaned = raw.trim().replace(EXAM_TAG_PREFIX, '')
  cleaned = cleaned.replace(EXAM_TAG_PAREN_SUFFIX, '').replace(EXAM_TAG_SOCIETY_SUFFIX, '').trim()
  if (!cleaned) return null
  const withSuffix = cleaned.includes('-') ? cleaned : `${cleaned}-1`
  return withSuffix.toLowerCase()
}

/** Normalized, deduplicated exam slugs a document's `exam_tags` resolve to. */
export function examTagsForDocument(doc: ResearchDocument): string[] {
  const out = new Set<string>()
  for (const raw of doc.examTags ?? []) {
    const normalized = normalizeExamTag(raw)
    if (normalized) out.add(normalized)
  }
  return [...out]
}
