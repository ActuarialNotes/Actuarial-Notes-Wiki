-- Full-text search over the research document corpus.
--
-- The Research tab previously had no keyword search — documents could only be
-- narrowed by filter chips, and the only text-query path was the AI "Ask" tab
-- (which relies on research_chunks embeddings that aren't populated yet). This
-- adds a weighted tsvector + GIN index so users can keyword-search specific
-- bulletins/guidance/regulations and get ranked, citeable results instantly.

-- A weighted document vector: title (A) outranks summary (B) outranks the full
-- extracted body (C). Generated/stored so it stays in sync automatically and is
-- indexable. All referenced functions are IMMUTABLE, as `generated always`
-- requires.
alter table research_documents
  add column if not exists search_tsv tsvector
  generated always as (
    setweight(to_tsvector('english', coalesce(title, '')),    'A') ||
    setweight(to_tsvector('english', coalesce(summary, '')),   'B') ||
    setweight(to_tsvector('english', coalesce(raw_text, '')),  'C')
  ) stored;

create index if not exists research_documents_search_tsv_idx
  on research_documents using gin (search_tsv);

-- The base schema declares `url NOT NULL` but never UNIQUE, yet the ingest
-- orchestrator upserts on `onConflict: 'url'`. Make dedupe real so both the
-- scheduled scrapers and the new add-by-URL ingest path actually de-duplicate.
create unique index if not exists research_documents_url_key
  on research_documents (url);

-- Keyword search with the same structured pre-filters the feed/Ask use, plus an
-- optional document-id allowlist (for project-scoped search). Uses
-- websearch_to_tsquery (Google-style syntax; never throws on malformed input)
-- and returns a highlighted headline for snippet display.
create or replace function search_research_documents(
  query_text          text,
  filter_agent_ids    text[]          default null,
  filter_doc_types    document_type[] default null,
  filter_provinces    text[]          default null,
  filter_lobs         text[]          default null,
  date_from           timestamptz     default null,
  date_to             timestamptz     default null,
  match_limit         int             default 25,
  match_offset        int             default 0,
  filter_document_ids uuid[]          default null
)
returns table (
  id uuid,
  agent_id text,
  type document_type,
  title text,
  published_at timestamptz,
  url text,
  pdf_url text,
  summary text,
  jurisdiction_provinces text[],
  exam_tags text[],
  rank real,
  headline text
)
language sql
stable
as $$
  with q as (select websearch_to_tsquery('english', query_text) as tsq)
  select
    d.id, d.agent_id, d.type, d.title, d.published_at, d.url, d.pdf_url,
    d.summary, d.jurisdiction_provinces, d.exam_tags,
    ts_rank(d.search_tsv, q.tsq) as rank,
    ts_headline(
      'english', coalesce(d.summary, d.title), q.tsq,
      'StartSel=<mark>,StopSel=</mark>,MaxFragments=2,MinWords=5,MaxWords=18'
    ) as headline
  from research_documents d, q
  where d.search_tsv @@ q.tsq
    and (filter_agent_ids    is null or d.agent_id = any(filter_agent_ids))
    and (filter_doc_types    is null or d.type = any(filter_doc_types))
    and (filter_provinces    is null or d.jurisdiction_provinces && filter_provinces)
    and (filter_lobs         is null or d.line_of_business && filter_lobs)
    and (filter_document_ids is null or d.id = any(filter_document_ids))
    and (date_from is null or d.published_at >= date_from)
    and (date_to   is null or d.published_at <= date_to)
  order by rank desc, d.published_at desc
  limit greatest(match_limit, 0)
  offset greatest(match_offset, 0)
$$;
