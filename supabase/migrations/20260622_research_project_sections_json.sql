-- Per-project section structure (editable).
--
-- The onboarding revamp seeds a project's sections from a static template
-- (researchProjectMeta.ts → projectSections). This column lets the user edit
-- that structure — add, remove, and reorder sections — by persisting the whole
-- ordered list as JSON. While null the project falls back to the template; once
-- the user edits the structure the materialized list is stored here. Section
-- resources/notes continue to key off the (stable) section/subsection slugs, so
-- no foreign keys are involved.
alter table research_projects
  add column if not exists sections jsonb;
