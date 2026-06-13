// Vercel serverless function — the project "Ask" loop. Given a question and a
// set of department "agents", retrieves relevant corpus documents (same
// structured + semantic retrieval as api/research.js), auto-adds newly
// discovered documents to the project, then asks Claude for one answer per
// department plus a combined synthesis. The result is persisted to
// research_project_questions, where it becomes one entry in the project's FAQ.
//
// Environment variables required: same as api/research.js —
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ANTHROPIC_API_KEY,
//   OPENAI_API_KEY (optional; enables the semantic-search stage).

import { createClient } from '@supabase/supabase-js';

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const OPENAI_EMBEDDINGS_URL = 'https://api.openai.com/v1/embeddings';
const EMBEDDING_MODEL = 'text-embedding-3-small';
const MODEL = 'claude-sonnet-4-20250514';
const RATE_LIMIT = 20;          // requests per window
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_DOCUMENTS = 12;
const MAX_CHUNKS = 8;
const MAX_AUTO_ADD = 6;         // newly-discovered documents to link per ask
const MAX_DEPARTMENTS = 4;
const MAX_QUESTION_LENGTH = 500;

// Mirrors DEPARTMENTS in quiz/src/lib/researchProjectMeta.ts — the business
// "agent" lenses a project's questions can be answered from.
const DEPARTMENTS = [
  { slug: 'actuarial',             label: 'Actuarial' },
  { slug: 'underwriting',          label: 'Underwriting' },
  { slug: 'claims',                label: 'Claims' },
  { slug: 'risk_management',       label: 'Risk Management' },
  { slug: 'legal_compliance',      label: 'Legal & Compliance' },
  { slug: 'product',                label: 'Product' },
  { slug: 'distribution_broker',   label: 'Distribution & Broker' },
  { slug: 'it',                     label: 'IT' },
  { slug: 'finance',                label: 'Finance' },
  { slug: 'customer_experience',   label: 'Customer Experience' },
  { slug: 'strategy_planning',     label: 'Strategy & Planning' },
  { slug: 'business_intelligence', label: 'Business Intelligence' },
];
const DEPARTMENTS_BY_SLUG = new Map(DEPARTMENTS.map(d => [d.slug, d]));

const CITATION_RE = /\[Source:\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*p\.\s*(\d+)\]/g;
const SECTION_RE = /^##\s+(.+)$/gm;

// In-memory rate limit store (resets on cold start — acceptable, matches chat.js)
const rateLimitMap = new Map();

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

function checkRateLimit(ip) {
  const now = Date.now();
  const cutoff = now - RATE_WINDOW_MS;
  for (const [key, timestamps] of rateLimitMap) {
    const filtered = timestamps.filter(t => t > cutoff);
    if (filtered.length === 0) rateLimitMap.delete(key);
    else rateLimitMap.set(key, filtered);
  }
  const timestamps = (rateLimitMap.get(ip) || []).filter(t => t > cutoff);
  if (timestamps.length >= RATE_LIMIT) return false;
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return true;
}

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function admin() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
}

async function authenticate(req) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!token) return null;
  const { data, error } = await admin().auth.getUser(token);
  if (error || !data?.user) return null;
  return data.user;
}

// Stage 1: structured filter on research_documents, newest first, scoped to
// the project's jurisdiction/line-of-business when set. Deliberately not
// restricted to the project's existing documents — the goal is to discover
// new sources.
async function fetchCandidateDocuments(client, filters) {
  let query = client
    .from('research_documents')
    .select('id, agent_id, type, title, published_at, url, summary, jurisdiction_provinces, exam_tags')
    .order('published_at', { ascending: false })
    .limit(MAX_DOCUMENTS);

  if (filters.provinces) query = query.overlaps('jurisdiction_provinces', filters.provinces);
  if (filters.lineOfBusiness) query = query.overlaps('line_of_business', filters.lineOfBusiness);

  const { data, error } = await query;
  if (error) {
    console.error('research-ask: document filter query failed:', error.message);
    return [];
  }
  return data || [];
}

// Stage 2 (optional): embed the question and run semantic search over chunks
// via the match_research_chunks RPC, scoped to the same filters.
async function fetchRelevantChunks(client, query, filters) {
  if (!process.env.OPENAI_API_KEY) return [];

  let embedding;
  try {
    const res = await fetch(OPENAI_EMBEDDINGS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({ model: EMBEDDING_MODEL, input: query }),
    });
    if (!res.ok) return [];
    const data = await res.json();
    embedding = data?.data?.[0]?.embedding;
  } catch (err) {
    console.error('research-ask: embedding request failed:', err.message || err);
    return [];
  }
  if (!Array.isArray(embedding)) return [];

  const { data, error } = await client.rpc('match_research_chunks', {
    query_embedding: embedding,
    match_count: MAX_CHUNKS,
    filter_agent_ids: null,
    filter_doc_types: null,
    filter_provinces: filters.provinces,
  });
  if (error) {
    console.error('research-ask: chunk search RPC failed:', error.message);
    return [];
  }
  return data || [];
}

function formatDate(iso) {
  if (!iso) return 'undated';
  return String(iso).slice(0, 10);
}

// Compose the grounded context block: prefer chunk-level excerpts (page-traceable);
// fall back to document summaries when no chunks matched.
function buildContext(documents, chunks) {
  const docsById = new Map(documents.map(d => [d.id, d]));
  const lines = [];

  if (chunks.length > 0) {
    for (const chunk of chunks) {
      const doc = docsById.get(chunk.document_id);
      const title = doc?.title || 'Untitled document';
      lines.push(
        `[${title} | ${chunk.agent_id} | ${formatDate(chunk.published_at)} | p.${chunk.page_number}]\n${chunk.content}`
      );
    }
  }
  if (chunks.length === 0 || documents.length > 0) {
    for (const doc of documents) {
      lines.push(
        `[${doc.title} | ${doc.agent_id} | ${formatDate(doc.published_at)} | summary]\n${doc.summary || '(no summary available)'}`
      );
    }
  }
  if (lines.length === 0) return '(no matching documents found in the corpus for this question)';
  return lines.join('\n\n---\n\n');
}

// Build citation metadata the UI can resolve to a document/page, and flag any
// cited (title, agent) pair that isn't actually present in the retrieved context.
function extractCitations(answer, documents) {
  const byTitleAgent = new Map(documents.map(d => [`${d.title}::${d.agent_id}`, d]));
  const citations = [];
  const unverifiedClaims = [];
  const seen = new Set();

  for (const match of answer.matchAll(CITATION_RE)) {
    const [full, rawTitle, rawAgent, rawDate, rawPage] = match;
    const title = rawTitle.trim();
    const agentId = rawAgent.trim();
    const page = Number(rawPage);
    const key = `${title}::${agentId}::${page}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const doc = byTitleAgent.get(`${title}::${agentId}`);
    if (doc) {
      citations.push({ documentId: doc.id, title: doc.title, agentId: doc.agent_id, url: doc.url, page, date: rawDate.trim() });
    } else {
      unverifiedClaims.push({ text: full, title, agentId, page });
    }
  }
  return { citations, unverifiedClaims };
}

// Split the model's response into "## Heading" sections, keyed by the
// (trimmed) heading text. Sections not produced by the model simply won't be
// present in the returned map — callers fall back gracefully.
function parseSections(text) {
  const sections = new Map();
  const matches = [...text.matchAll(SECTION_RE)];
  for (let i = 0; i < matches.length; i++) {
    const heading = matches[i][1].trim();
    const start = matches[i].index + matches[i][0].length;
    const end = i + 1 < matches.length ? matches[i + 1].index : text.length;
    sections.set(heading, text.slice(start, end).trim());
  }
  return sections;
}

function buildSystemPrompt(departmentLabels, project) {
  const scopeParts = [];
  if (project.jurisdiction_region) scopeParts.push(`jurisdiction: ${project.jurisdiction_region}`);
  else if (project.jurisdiction_country) scopeParts.push(`jurisdiction: ${project.jurisdiction_country}`);
  if (project.line_of_business) scopeParts.push(`line of business: ${project.line_of_business}`);
  const scope = scopeParts.length > 0 ? ` Project scope — ${scopeParts.join(', ')}.` : '';

  const sectionSpecs = departmentLabels
    .map(label => `## ${label}\n2-4 sentences answering the question from this department's perspective, citing sources.`)
    .join('\n\n');

  return `You are an actuarial research assistant for a Canadian P&C insurance project${project.name ? ` called "${project.name}"` : ''}.${scope}

You have access to a curated document corpus from Canadian insurance regulators (FSRA, OSFI, AIRB, AMF, BCFSA), industry bureaus (IBC, GISA), and major insurers (Intact, Desjardins, Aviva Canada, TD Insurance, Co-operators, and others).

A user has asked a question. Answer it once for EACH department below, then write one combined synthesis. Respond using exactly these section headers, each on its own line starting with "## ", in this order:

${sectionSpecs}

## Synthesis
A short combined result a user could act on or quote — reconcile the perspectives above into one answer.

Rules:
1. Make only claims directly supported by the provided document excerpts.
2. Every quantitative claim must cite its source using this exact format: [Source: {title}, {agent}, {date}, p.{page}]
3. If the corpus does not contain enough information for a department's perspective, say so explicitly rather than inferring numbers.
4. Keep each department's answer focused on what that department would care about (e.g. Actuarial = pricing/reserving adequacy, Underwriting = risk selection/appetite, Claims = handling/reserve practice, Legal & Compliance = regulatory exposure, Product = coverage/policy design, Finance = financial statement impact).
5. Do not repeat the question or add headings/sections beyond the ones listed above.`;
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    return await handleAsk(req, res);
  } catch (err) {
    console.error('research-ask: unhandled error:', err);
    if (!res.headersSent) {
      return res.status(500).json({ error: 'Internal server error: ' + (err?.message || 'Unknown error') });
    }
  }
}

async function handleAsk(req, res) {
  const user = await authenticate(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: `Rate limit exceeded. You can make ${RATE_LIMIT} requests per hour. Please wait and try again.` });
  }

  const { projectId, question, departmentIds } = req.body || {};
  if (!projectId || typeof projectId !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid "projectId" field in request body' });
  }
  if (!question || typeof question !== 'string' || !question.trim()) {
    return res.status(400).json({ error: 'Missing or invalid "question" field in request body' });
  }
  if (question.trim().length > MAX_QUESTION_LENGTH) {
    return res.status(400).json({ error: `"question" must be ${MAX_QUESTION_LENGTH} characters or fewer` });
  }
  if (!Array.isArray(departmentIds) || departmentIds.length === 0) {
    return res.status(400).json({ error: 'Select at least one department to answer from' });
  }
  const departments = [...new Set(departmentIds)]
    .map(slug => DEPARTMENTS_BY_SLUG.get(slug))
    .filter(Boolean)
    .slice(0, MAX_DEPARTMENTS);
  if (departments.length === 0) {
    return res.status(400).json({ error: 'No valid departments selected' });
  }

  const client = admin();

  const { data: project } = await client
    .from('research_projects')
    .select('id, name, document_type, jurisdiction_country, jurisdiction_region, line_of_business')
    .eq('id', projectId)
    .eq('user_id', user.id)
    .maybeSingle();
  if (!project) return res.status(403).json({ error: 'Project not found' });

  const trimmedQuestion = question.trim();
  const filters = {
    provinces: project.jurisdiction_region ? [project.jurisdiction_region] : null,
    lineOfBusiness: project.line_of_business ? [project.line_of_business] : null,
  };

  let documents, chunks;
  try {
    documents = await fetchCandidateDocuments(client, filters);
    chunks = await fetchRelevantChunks(client, trimmedQuestion, filters);
  } catch (err) {
    return res.status(502).json({ error: 'Failed to query the document corpus: ' + (err.message || 'Unknown error') });
  }

  // Chunks may reference documents outside the structured-filter candidate
  // set (e.g. semantic matches with no province/LOB overlap) — pull those in
  // too so buildContext/extractCitations can resolve them.
  const missingDocIds = [...new Set(chunks.map(c => c.document_id))].filter(id => !documents.some(d => d.id === id));
  if (missingDocIds.length > 0) {
    const { data: extra } = await client
      .from('research_documents')
      .select('id, agent_id, type, title, published_at, url, summary, jurisdiction_provinces, exam_tags')
      .in('id', missingDocIds);
    if (extra) documents = [...documents, ...extra];
  }

  // Auto-add newly discovered documents to the project — semantically
  // relevant ones (from chunk hits) first, then recent/filtered ones.
  const { data: existingLinks } = await client
    .from('research_project_documents')
    .select('document_id')
    .eq('project_id', projectId);
  const existingIds = new Set((existingLinks || []).map(l => l.document_id));

  const relevantIds = [...new Set(chunks.map(c => c.document_id))];
  const recentIds = documents.map(d => d.id);
  const candidateIds = [...new Set([...relevantIds, ...recentIds])];
  const addedDocumentIds = candidateIds.filter(id => !existingIds.has(id)).slice(0, MAX_AUTO_ADD);

  if (addedDocumentIds.length > 0) {
    await client
      .from('research_project_documents')
      .upsert(
        addedDocumentIds.map(document_id => ({ project_id: projectId, document_id })),
        { onConflict: 'project_id,document_id', ignoreDuplicates: true },
      );
  }

  const context = buildContext(documents, chunks);
  const departmentLabels = departments.map(d => d.label);
  const systemPrompt = buildSystemPrompt(departmentLabels, project);
  const userMessage = `Question: ${trimmedQuestion}\n\nRetrieved context:\n${context}`;
  const maxTokens = Math.min(8192, 700 * (departments.length + 1) + 600);

  let answer, tokensUsed;
  try {
    const anthropicRes = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: maxTokens,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }],
      }),
    });

    if (!anthropicRes.ok) {
      const status = anthropicRes.status;
      if (status === 429) return res.status(429).json({ error: 'AI service is busy. Please wait a moment and try again.' });
      return res.status(502).json({ error: `AI service error (${status}). Please try again later.` });
    }

    const data = await anthropicRes.json();
    answer = data.content?.[0]?.text;
    if (!answer) return res.status(502).json({ error: 'Empty response from AI. Please try again.' });
    tokensUsed = (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0);
  } catch (err) {
    return res.status(502).json({ error: 'Failed to reach AI service: ' + (err.message || 'Unknown error') });
  }

  const sections = parseSections(answer);
  const agentAnswers = departments.map((dept, i) => ({
    departmentId: dept.slug,
    departmentLabel: departmentLabels[i],
    answer: sections.get(dept.label) || '',
  }));
  const synthesis = sections.get('Synthesis')
    || (agentAnswers.every(a => !a.answer) ? answer.trim() : '');
  const { citations } = extractCitations(answer, documents);

  const { data: inserted, error: insertError } = await client
    .from('research_project_questions')
    .insert({
      project_id: projectId,
      user_id: user.id,
      question: trimmedQuestion,
      department_ids: departments.map(d => d.slug),
      agent_answers: agentAnswers,
      synthesis,
      citations,
      added_document_ids: addedDocumentIds,
      tokens_used: tokensUsed,
    })
    .select('id, project_id, question, department_ids, agent_answers, synthesis, citations, added_document_ids, tokens_used, created_at')
    .single();

  if (insertError || !inserted) {
    return res.status(502).json({ error: 'Saved answer failed: ' + (insertError?.message || 'Unknown error') });
  }

  return res.status(200).json({
    id: inserted.id,
    projectId: inserted.project_id,
    question: inserted.question,
    departmentIds: inserted.department_ids,
    agentAnswers: inserted.agent_answers,
    synthesis: inserted.synthesis,
    citations: inserted.citations,
    addedDocumentIds: inserted.added_document_ids,
    tokensUsed: inserted.tokens_used,
    createdAt: inserted.created_at,
  });
}
