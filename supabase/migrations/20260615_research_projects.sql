-- Research projects: user-owned named collections of saved corpus documents.
--
-- Lets a user gather citeable sources (bulletins, guidance, regulations,
-- filings) into a working set, then scope keyword search and the AI "Ask"
-- assistant to just that set. Documents themselves stay in the shared,
-- world-readable corpus — projects only reference them via a join table.
--
-- Ownership/RLS mirrors the research_alert_subscriptions pattern from
-- 20260608_research.sql (the only existing user-owned research table).

create table research_projects (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  name        text not null check (char_length(name) between 1 and 120),
  description text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index research_projects_user_idx on research_projects (user_id);

create table research_project_documents (
  project_id  uuid not null references research_projects(id) on delete cascade,
  document_id uuid not null references research_documents(id) on delete cascade,
  note        text,
  added_at    timestamptz not null default now(),
  primary key (project_id, document_id)
);

create index research_project_documents_document_idx
  on research_project_documents (document_id);

-- ── Row level security ────────────────────────────────────────────────────────
alter table research_projects enable row level security;
alter table research_project_documents enable row level security;

-- Projects: owner-only (read + write), mirroring alert subscriptions.
create policy "users manage their own projects" on research_projects
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Join rows: gated by ownership of the parent project. The corpus document
-- itself is world-readable, so no per-document ownership check is needed — only
-- the project side is access-controlled.
create policy "users manage their own project documents" on research_project_documents
  for all to authenticated
  using (exists (
    select 1 from research_projects p
    where p.id = project_id and p.user_id = auth.uid()
  ))
  with check (exists (
    select 1 from research_projects p
    where p.id = project_id and p.user_id = auth.uid()
  ));
