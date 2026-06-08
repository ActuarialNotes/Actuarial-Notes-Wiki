-- Research tool: Canadian P&C insurance regulatory/financial document corpus.
-- Public reference data (agents, documents, metrics, chunks, relationships) is
-- readable by any authenticated user; only alert subscriptions are user-owned.
--
-- NOTE: requires the `vector` extension to be enabled on this Supabase project
-- (Database > Extensions in the dashboard) before this migration can run —
-- it is not enabled by any prior migration in this repo.
create extension if not exists vector;

-- ── Agents ────────────────────────────────────────────────────────────────────
create type agent_type as enum (
  'federal_regulator',
  'provincial_regulator',
  'industry_bureau',
  'public_insurer',
  'federally_incorporated_insurer',
  'province_incorporated_insurer'
);

create table research_agents (
  id            text primary key,          -- slug: 'fsra', 'intact-financial'
  type          agent_type not null,
  legal_name    text not null,
  short_name    text not null,
  jurisdiction  jsonb not null,            -- { scope, provinces[], domains[] }
  parent_id     text references research_agents(id),
  is_active     boolean default true,
  metadata      jsonb default '{}'
);

-- ── Documents ─────────────────────────────────────────────────────────────────
create type document_type as enum (
  'regulatory_bulletin', 'regulatory_circular', 'consultation_paper',
  'approved_guideline', 'rate_filing_summary', 'supervisory_framework',
  'annual_report', 'quarterly_supplement', 'md_and_a', 'press_release',
  'investor_presentation', 'industry_statistics', 'research_report',
  'cia_educational_note'
);

create table research_documents (
  id                    uuid primary key default gen_random_uuid(),
  agent_id              text not null references research_agents(id),
  type                  document_type not null,
  title                 text not null,
  published_at          timestamptz not null,
  effective_date        date,
  expiry_date           date,
  superseded_by         uuid references research_documents(id),
  jurisdiction_provinces text[],           -- e.g. '{ON,AB}'
  line_of_business      text[],            -- e.g. '{personal_auto}'
  url                   text not null,
  pdf_url               text,
  summary               text,             -- AI-generated, 2-3 sentences
  exam_tags             text[],           -- existing exam slugs, e.g. '{6c-1}'
  extraction_confidence float,            -- 0-1
  is_in_review          boolean default false,
  extracted_at          timestamptz default now(),
  raw_text              text,             -- full extracted text, for chunking
  created_at            timestamptz default now()
);

create index research_documents_published_at_idx on research_documents (published_at desc);
create index research_documents_agent_idx on research_documents (agent_id);
create index research_documents_exam_tags_idx on research_documents using gin (exam_tags);

-- ── Extracted metrics (structured, provenance-required) ───────────────────────
create table research_metrics (
  id               uuid primary key default gen_random_uuid(),
  document_id      uuid not null references research_documents(id) on delete cascade,
  agent_id         text not null references research_agents(id),
  metric_name      text not null,         -- 'combined_ratio', 'loss_ratio', etc.
  value            numeric not null,
  unit             text not null,         -- '%', 'cad_millions'
  period           text not null,         -- 'Q3_2024', 'FY2023'
  province         text,                  -- null = national/consolidated
  line_of_business text,
  source_page      int not null,          -- REQUIRED -- no metric without a page
  source_text      text not null,         -- verbatim excerpt <= 200 chars
  confidence       float not null,        -- reject < 0.85 to review queue
  created_at       timestamptz default now(),
  constraint source_text_not_empty check (char_length(source_text) > 0)
);

create index research_metrics_agent_metric_period_idx
  on research_metrics (agent_id, metric_name, period);

-- ── Document chunks for vector search ────────────────────────────────────────
create table research_chunks (
  id            uuid primary key default gen_random_uuid(),
  document_id   uuid not null references research_documents(id) on delete cascade,
  agent_id      text not null,            -- denormalized for fast filter
  doc_type      document_type not null,   -- denormalized
  provinces     text[],                   -- denormalized
  published_at  timestamptz not null,     -- denormalized
  chunk_index   int not null,
  page_number   int not null,
  content       text not null,
  embedding     vector(1536)              -- text-embedding-3-small dimensions
);

create index research_chunks_embedding_idx on research_chunks
  using ivfflat (embedding vector_cosine_ops) with (lists = 100);
create index research_chunks_document_idx on research_chunks (document_id);

-- Vector similarity search over chunks, with optional structured pre-filters.
-- Used by api/research.js for the semantic stage of hybrid retrieval — the
-- structured stage (agent/type/province/date filtering on research_documents)
-- runs as a normal Supabase query and narrows `filter_agent_ids` etc. here.
create or replace function match_research_chunks(
  query_embedding vector(1536),
  match_count int default 8,
  filter_agent_ids text[] default null,
  filter_doc_types document_type[] default null,
  filter_provinces text[] default null
)
returns table (
  id uuid,
  document_id uuid,
  agent_id text,
  doc_type document_type,
  provinces text[],
  published_at timestamptz,
  page_number int,
  content text,
  similarity float
)
language sql stable
as $$
  select
    c.id, c.document_id, c.agent_id, c.doc_type, c.provinces, c.published_at,
    c.page_number, c.content,
    1 - (c.embedding <=> query_embedding) as similarity
  from research_chunks c
  where (filter_agent_ids is null or c.agent_id = any(filter_agent_ids))
    and (filter_doc_types is null or c.doc_type = any(filter_doc_types))
    and (filter_provinces is null or c.provinces && filter_provinces)
  order by c.embedding <=> query_embedding
  limit match_count
$$;

-- ── Agent relationships ───────────────────────────────────────────────────────
create type relationship_type as enum (
  'regulates', 'files_with', 'responds_to', 'supersedes',
  'cites', 'parent_of', 'statistical_member_of'
);

create table research_relationships (
  id                uuid primary key default gen_random_uuid(),
  type              relationship_type not null,
  from_agent        text references research_agents(id),
  to_agent          text references research_agents(id),
  from_document     uuid references research_documents(id),
  to_document       uuid references research_documents(id),
  jurisdiction      text[],
  inference_method  text not null check (inference_method in
                      ('asserted', 'rule_based', 'llm_inferred')),
  confidence        float,               -- required when llm_inferred
  valid_from        date,
  valid_until       date,
  constraint llm_inferred_requires_confidence check (
    inference_method <> 'llm_inferred' or confidence is not null
  )
);

-- ── Alert subscriptions ───────────────────────────────────────────────────────
create table research_alert_subscriptions (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  agent_ids    text[],                   -- null = all agents
  doc_types    document_type[],          -- null = all types
  provinces    text[],                   -- null = all provinces
  keywords     text[],
  created_at   timestamptz default now()
);

-- ── Row level security ────────────────────────────────────────────────────────
-- Reference corpus tables: world-readable to any signed-in user, writes are
-- performed only by edge functions via the service-role key (which bypasses RLS).
alter table research_agents enable row level security;
alter table research_documents enable row level security;
alter table research_metrics enable row level security;
alter table research_chunks enable row level security;
alter table research_relationships enable row level security;

create policy "authenticated users can read agents" on research_agents
  for select using (auth.role() = 'authenticated');
create policy "authenticated users can read documents" on research_documents
  for select using (auth.role() = 'authenticated');
create policy "authenticated users can read metrics" on research_metrics
  for select using (auth.role() = 'authenticated');
create policy "authenticated users can read chunks" on research_chunks
  for select using (auth.role() = 'authenticated');
create policy "authenticated users can read relationships" on research_relationships
  for select using (auth.role() = 'authenticated');

-- Alert subscriptions are user-owned.
alter table research_alert_subscriptions enable row level security;
create policy "users manage their own subscriptions" on research_alert_subscriptions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ── Seed agents ───────────────────────────────────────────────────────────────
insert into research_agents (id, type, legal_name, short_name, jurisdiction, is_active)
values
  ('osfi',              'federal_regulator',                 'Office of the Superintendent of Financial Institutions', 'OSFI',       '{"scope":"federal","provinces":[],"domains":["solvency"]}', true),
  ('fsra',              'provincial_regulator',              'Financial Services Regulatory Authority of Ontario',      'FSRA',       '{"scope":"provincial","provinces":["ON"],"domains":["product_regulation","market_conduct"]}', true),
  ('airb',              'provincial_regulator',              'Alberta Insurance Rate Board',                            'AIRB',       '{"scope":"provincial","provinces":["AB"],"domains":["product_regulation"]}', true),
  ('amf',               'provincial_regulator',              'Autorité des marchés financiers',                         'AMF',        '{"scope":"provincial","provinces":["QC"],"domains":["product_regulation","market_conduct"]}', true),
  ('bcfsa',             'provincial_regulator',              'BC Financial Services Authority',                         'BCFSA',      '{"scope":"provincial","provinces":["BC"],"domains":["product_regulation","market_conduct"]}', true),
  ('ibc',               'industry_bureau',                   'Insurance Bureau of Canada',                              'IBC',        '{"scope":"multi_provincial","provinces":[],"domains":["statistics"]}', true),
  ('gisa',              'industry_bureau',                   'General Insurance Statistical Agency',                    'GISA',       '{"scope":"multi_provincial","provinces":["AB","NB","NL","NS","PE"],"domains":["statistics"]}', true),
  ('icbc',              'public_insurer',                    'Insurance Corporation of British Columbia',               'ICBC',       '{"scope":"provincial","provinces":["BC"],"domains":["product_regulation"]}', true),
  ('intact-financial',  'federally_incorporated_insurer',    'Intact Financial Corporation',                            'Intact',     '{"scope":"multi_provincial","provinces":["ON","AB","QC","BC","ATL"],"domains":["financial_disclosure"]}', true),
  ('desjardins-general','federally_incorporated_insurer',    'Desjardins General Insurance Group',                      'Desjardins', '{"scope":"multi_provincial","provinces":["ON","QC"],"domains":["financial_disclosure"]}', true),
  ('aviva-canada',      'federally_incorporated_insurer',    'Aviva Canada Inc.',                                       'Aviva',      '{"scope":"multi_provincial","provinces":["ON","AB","QC","BC"],"domains":["financial_disclosure"]}', true),
  ('td-insurance',      'federally_incorporated_insurer',    'TD Insurance',                                            'TD Insurance','{"scope":"multi_provincial","provinces":[],"domains":["financial_disclosure"]}', true),
  ('cooperators',       'federally_incorporated_insurer',    'The Co-operators General Insurance Company',              'Co-operators','{"scope":"multi_provincial","provinces":[],"domains":["financial_disclosure"]}', true);
