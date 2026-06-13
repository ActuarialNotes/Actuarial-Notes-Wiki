// Vercel serverless function — grounded research queries over the Canadian P&C
// insurance document corpus. Modelled on api/chat.js: same CORS/rate-limit
// shape and Anthropic proxy pattern, but auth is the existing Supabase session
// (no invite codes — "the same users already authenticated via Supabase").
//
// Environment variables required:
//   SUPABASE_URL                — same project as VITE_SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY   — service role key (server-side only, never VITE_*)
//   ANTHROPIC_API_KEY           — same key used by api/chat.js
//   OPENAI_API_KEY              — optional; enables the semantic-search stage
//                                 (text-embedding-3-small). Without it, retrieval
//                                 falls back to structured filtering only.

import { createClient } from '@supabase/supabase-js';

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const OPENAI_EMBEDDINGS_URL = 'https://api.openai.com/v1/embeddings';
const EMBEDDING_MODEL = 'text-embedding-3-small';
const MODEL = 'claude-sonnet-4-20250514';
const MAX_TOKENS = 4096;
const RATE_LIMIT = 20;          // requests per window
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_DOCUMENTS = 12;
const MAX_CHUNKS = 8;

const SYSTEM_PROMPT = `You are an actuarial research assistant specialising in the Canadian property
and casualty insurance market, with a focus on personal auto insurance.

You have access to a curated document corpus from Canadian insurance regulators
(FSRA, OSFI, AIRB, AMF), industry bureaus (IBC), and major insurers
(Intact, Desjardins, Aviva Canada, TD Insurance, Co-operators).

Rules:
1. Make only claims directly supported by the provided document excerpts.
2. Every quantitative claim must cite the document using this format:
   [Source: {title}, {agent}, {date}, p.{page}]
3. If the corpus does not contain sufficient information, say so explicitly.
   Do not infer or extrapolate numbers.
4. Clearly distinguish federal solvency regulation (OSFI) from provincial
   product regulation (FSRA, AIRB, AMF) — they are different domains.
5. When discussing Desjardins or Co-operators, note that their co-operative
   structure affects disclosure norms compared to TSX-listed insurers.
6. If the user's profile includes an active exam focus, conclude with an
   "Exam context" paragraph explaining which syllabus topics this relates to.`;

const CITATION_RE = /\[Source:\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*p\.\s*(\d+)\]/g;

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

// Normalize incoming filters into the shapes the Supabase queries expect.
function normalizeFilters(filters) {
  const f = filters && typeof filters === 'object' ? filters : {};
  const asArray = v => (Array.isArray(v) && v.length > 0 ? v : null);
  const dateRange = f.dateRange && typeof f.dateRange === 'object' ? f.dateRange : null;
  return {
    agentIds: asArray(f.agentIds),
    docTypes: asArray(f.docTypes),
    provinces: asArray(f.provinces),
    from: dateRange?.from || null,
    to: dateRange?.to || null,
  };
}

// Resolve a project to the set of document ids it contains, verifying the
// caller owns it. Service-role bypasses RLS, so the user_id filter is the
// authorization boundary — it must not be omitted. Returns null when the
// project doesn't exist or isn't the caller's (treated as "no access").
async function resolveProjectDocumentIds(client, projectId, userId) {
  const { data: project } = await client
    .from('research_projects')
    .select('id')
    .eq('id', projectId)
    .eq('user_id', userId)
    .maybeSingle();
  if (!project) return null;

  const { data: links, error } = await client
    .from('research_project_documents')
    .select('document_id')
    .eq('project_id', projectId);
  if (error) {
    console.error('research: project document resolution failed:', error.message);
    return [];
  }
  return (links || []).map(l => l.document_id);
}

// Stage 1: structured filter on research_documents, newest first. When
// `documentIds` is provided (project scoping) the candidate set is restricted
// to those ids.
async function fetchCandidateDocuments(client, filters, documentIds) {
  let query = client
    .from('research_documents')
    .select('id, agent_id, type, title, published_at, url, summary, jurisdiction_provinces, exam_tags')
    .order('published_at', { ascending: false })
    .limit(MAX_DOCUMENTS);

  if (documentIds) query = query.in('id', documentIds);
  if (filters.agentIds) query = query.in('agent_id', filters.agentIds);
  if (filters.docTypes) query = query.in('type', filters.docTypes);
  if (filters.provinces) query = query.overlaps('jurisdiction_provinces', filters.provinces);
  if (filters.from) query = query.gte('published_at', filters.from);
  if (filters.to) query = query.lte('published_at', filters.to);

  const { data, error } = await query;
  if (error) {
    console.error('research: document filter query failed:', error.message);
    return [];
  }
  return data || [];
}

// Stage 2 (optional): embed the query and run semantic search over chunks via
// the match_research_chunks RPC, scoped to the same structured filters.
async function fetchRelevantChunks(client, query, filters, documentIds) {
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
    console.error('research: embedding request failed:', err.message || err);
    return [];
  }
  if (!Array.isArray(embedding)) return [];

  const { data, error } = await client.rpc('match_research_chunks', {
    query_embedding: embedding,
    match_count: MAX_CHUNKS,
    filter_agent_ids: filters.agentIds,
    filter_doc_types: filters.docTypes,
    filter_provinces: filters.provinces,
  });
  if (error) {
    console.error('research: chunk search RPC failed:', error.message);
    return [];
  }
  // The RPC has no document-id filter, so when project-scoped we narrow the
  // returned chunks to the project's documents in JS.
  if (documentIds) {
    const allow = new Set(documentIds);
    return (data || []).filter(c => allow.has(c.document_id));
  }
  return data || [];
}

function formatDate(iso) {
  if (!iso) return 'undated';
  return String(iso).slice(0, 10);
}

// Compose the grounded context block: prefer chunk-level excerpts (page-traceable);
// fall back to document summaries when no chunks matched (e.g. before embedding
// has run, or OPENAI_API_KEY is unset).
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
  } else {
    for (const doc of documents) {
      lines.push(
        `[${doc.title} | ${doc.agent_id} | ${formatDate(doc.published_at)} | summary]\n${doc.summary || '(no summary available)'}`
      );
    }
  }
  return lines.join('\n\n---\n\n');
}

// Build citation metadata the UI can resolve to a document/page, and flag any
// cited (title, agent) pair that isn't actually present in the retrieved context
// — these are claims the model attributed to a source we can't verify.
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

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const user = await authenticate(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: `Rate limit exceeded. You can make ${RATE_LIMIT} requests per hour. Please wait and try again.` });
  }

  const { query, filters, projectId } = req.body || {};
  if (!query || typeof query !== 'string' || !query.trim()) {
    return res.status(400).json({ error: 'Missing or invalid "query" field in request body' });
  }
  if (projectId !== undefined && typeof projectId !== 'string') {
    return res.status(400).json({ error: 'Invalid "projectId" field in request body' });
  }

  const client = admin();
  const normalizedFilters = normalizeFilters(filters);

  // Project scoping: resolve to the project's document ids (ownership-checked).
  let projectDocIds = null;
  if (projectId) {
    projectDocIds = await resolveProjectDocumentIds(client, projectId, user.id);
    if (projectDocIds === null) {
      return res.status(403).json({ error: 'Project not found' });
    }
    if (projectDocIds.length === 0) {
      return res.status(200).json({
        answer: 'This project has no documents yet. Add sources to it to ask grounded questions over them.',
        citations: [],
        unverifiedClaims: [],
        tokensUsed: 0,
      });
    }
  }

  let documents, chunks;
  try {
    documents = await fetchCandidateDocuments(client, normalizedFilters, projectDocIds);
    chunks = await fetchRelevantChunks(client, query, normalizedFilters, projectDocIds);
  } catch (err) {
    return res.status(502).json({ error: 'Failed to query the document corpus: ' + (err.message || 'Unknown error') });
  }

  if (documents.length === 0 && chunks.length === 0) {
    return res.status(200).json({
      answer: 'The corpus does not currently contain any documents matching this query and filter set.',
      citations: [],
      unverifiedClaims: [],
      tokensUsed: 0,
    });
  }

  const context = buildContext(documents, chunks);
  const userMessage = `User question: ${query.trim()}\n\nRetrieved context:\n${context}`;

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
        max_tokens: MAX_TOKENS,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userMessage }],
      }),
    });

    if (!anthropicRes.ok) {
      const status = anthropicRes.status;
      if (status === 429) return res.status(429).json({ error: 'AI service is busy. Please wait a moment and try again.' });
      return res.status(502).json({ error: `AI service error (${status}). Please try again later.` });
    }

    const data = await anthropicRes.json();
    const answer = data.content?.[0]?.text;
    if (!answer) return res.status(502).json({ error: 'Empty response from AI. Please try again.' });

    const { citations, unverifiedClaims } = extractCitations(answer, documents);
    const tokensUsed = (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0);

    return res.status(200).json({ answer, citations, unverifiedClaims, tokensUsed });
  } catch (err) {
    return res.status(502).json({ error: 'Failed to reach AI service: ' + (err.message || 'Unknown error') });
  }
}
