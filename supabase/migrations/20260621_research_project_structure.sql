-- Research project structure: artifact types, model outputs, and per-section
-- resources/notes.
--
-- The project onboarding revamp reframes a project as a research *artifact* that
-- is either a Document (a series of outline sections) or a Model (the seven-step
-- actuarial model-development workflow). `document_type` now stores the chosen
-- subtype (report/filing/memo/presentation for a document; reserving/pricing/
-- valuation_cash_flow/risk_capital for a model). A project's sections come from
-- a static template (see researchProjectMeta.ts); resources and custom notes
-- attach to a section (or one of its subsections) by stable slug, so no sections
-- table is needed.

-- ── Project-level columns ─────────────────────────────────────────────────────
alter table research_projects
  add column if not exists artifact_type       text,
  add column if not exists model_outputs       text[] not null default '{}',
  add column if not exists model_code_language text;

alter table research_projects
  drop constraint if exists research_projects_artifact_type_chk;
alter table research_projects
  add constraint research_projects_artifact_type_chk
  check (artifact_type is null or artifact_type in ('document', 'model'));

alter table research_projects
  drop constraint if exists research_projects_code_language_chk;
alter table research_projects
  add constraint research_projects_code_language_chk
  check (model_code_language is null or model_code_language in ('r', 'python', 'excel'));

-- Widen the document_type check to cover the new subtype vocabulary while still
-- accepting the two legacy values so projects created before the revamp load
-- unchanged.
alter table research_projects
  drop constraint if exists research_projects_document_type_chk;
alter table research_projects
  add constraint research_projects_document_type_chk
  check (document_type is null or document_type in (
    -- new document subtypes
    'report', 'filing', 'memo', 'presentation',
    -- new model subtypes
    'reserving', 'pricing', 'valuation_cash_flow', 'risk_capital',
    -- legacy
    'research_report', 'actuarial_justification'
  ));

-- ── Section resources ─────────────────────────────────────────────────────────
-- A wiki item (concept, book, regulation, benchmark, event) saved to the project
-- and pinned to one of its sections/subsections. References the page by kind+name
-- the same way research_project_wiki_items does (wiki pages are files, not rows).
create table if not exists research_project_section_resources (
  id              uuid primary key default gen_random_uuid(),
  project_id      uuid not null references research_projects(id) on delete cascade,
  section_key     text not null,
  subsection_key  text,
  kind            text not null check (kind in ('concept', 'resource', 'exam', 'event', 'regulation')),
  name            text not null,
  path            text,
  added_at        timestamptz not null default now(),
  unique (project_id, section_key, subsection_key, kind, name)
);

create index if not exists research_project_section_resources_project_idx
  on research_project_section_resources (project_id);

-- ── Section notes ─────────────────────────────────────────────────────────────
-- A free-text note authored against a section/subsection.
create table if not exists research_project_section_notes (
  id              uuid primary key default gen_random_uuid(),
  project_id      uuid not null references research_projects(id) on delete cascade,
  section_key     text not null,
  subsection_key  text,
  body            text not null default '',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists research_project_section_notes_project_idx
  on research_project_section_notes (project_id);

-- ── Row level security ────────────────────────────────────────────────────────
-- Both tables are gated entirely by ownership of the parent project, mirroring
-- research_project_wiki_items (20260619_research_project_wiki_items.sql).
alter table research_project_section_resources enable row level security;
alter table research_project_section_notes enable row level security;

create policy "users manage their own project section resources" on research_project_section_resources
  for all to authenticated
  using (exists (
    select 1 from research_projects p
    where p.id = project_id and p.user_id = auth.uid()
  ))
  with check (exists (
    select 1 from research_projects p
    where p.id = project_id and p.user_id = auth.uid()
  ));

create policy "users manage their own project section notes" on research_project_section_notes
  for all to authenticated
  using (exists (
    select 1 from research_projects p
    where p.id = project_id and p.user_id = auth.uid()
  ))
  with check (exists (
    select 1 from research_projects p
    where p.id = project_id and p.user_id = auth.uid()
  ));
