-- Research project wiki items: lets a project also reference pages from the
-- markdown wiki (concepts, resources, exams, events, regulations) — not just
-- corpus research_documents — so a user can pull their own syllabus/notes
-- pages into a project alongside crawled bulletins for AI review.
--
-- Wiki pages aren't rows in any table (they're files read via github.ts), so
-- they're referenced by kind+name (WikiEntryRef, see wikiRoutes.ts) rather
-- than a foreign key. `path` carries the explicit repo-path override some
-- refs use when kind alone doesn't determine the file location.
--
-- RLS mirrors research_project_documents (20260615_research_projects.sql):
-- gated entirely by ownership of the parent project.

create table research_project_wiki_items (
  project_id  uuid not null references research_projects(id) on delete cascade,
  kind        text not null check (kind in ('concept', 'resource', 'exam', 'event', 'regulation')),
  name        text not null,
  path        text,
  added_at    timestamptz not null default now(),
  primary key (project_id, kind, name)
);

create index research_project_wiki_items_project_idx
  on research_project_wiki_items (project_id);

alter table research_project_wiki_items enable row level security;

create policy "users manage their own project wiki items" on research_project_wiki_items
  for all to authenticated
  using (exists (
    select 1 from research_projects p
    where p.id = project_id and p.user_id = auth.uid()
  ))
  with check (exists (
    select 1 from research_projects p
    where p.id = project_id and p.user_id = auth.uid()
  ));
