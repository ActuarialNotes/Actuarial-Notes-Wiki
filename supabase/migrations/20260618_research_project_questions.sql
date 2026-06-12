-- Research project questions: the "Ask" FAQ loop for a project.
--
-- Each row is one asked question: the departments ("agents") whose lens were
-- applied, each agent's answer, a synthesized result, the citations backing
-- both, and the corpus documents that were auto-added to the project while
-- answering. Together these rows are the project's FAQ, and can be compiled
-- into a "Research Report" or "Actuarial Justification" view (see
-- researchProjectMeta.ts PROJECT_DOCUMENT_TYPES).
--
-- Written by api/research-ask.js using the service-role key (same pattern as
-- research-ingest-url), so RLS here is read/delete protection for the owner —
-- the API enforces project ownership itself before inserting.

create table research_project_questions (
  id                 uuid primary key default gen_random_uuid(),
  project_id         uuid not null references research_projects(id) on delete cascade,
  user_id            uuid not null references auth.users(id) on delete cascade,
  question           text not null check (char_length(question) between 1 and 500),
  department_ids     text[] not null default '{}',
  agent_answers      jsonb not null default '[]'::jsonb,
  synthesis          text not null default '',
  citations          jsonb not null default '[]'::jsonb,
  added_document_ids uuid[] not null default '{}',
  tokens_used        integer not null default 0,
  created_at         timestamptz not null default now()
);

create index research_project_questions_project_idx
  on research_project_questions (project_id, created_at desc);

-- ── Row level security ────────────────────────────────────────────────────────
alter table research_project_questions enable row level security;

create policy "users manage their own project questions" on research_project_questions
  for all to authenticated
  using (exists (
    select 1 from research_projects p
    where p.id = project_id and p.user_id = auth.uid()
  ))
  with check (user_id = auth.uid() and exists (
    select 1 from research_projects p
    where p.id = project_id and p.user_id = auth.uid()
  ));
