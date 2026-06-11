-- Research project onboarding metadata.
--
-- Extends research_projects (20260615_research_projects.sql) with the scoping a
-- project collects in its onboarding flow: the type of document it produces, the
-- jurisdiction it covers, the line of business, and the business departments
-- ("agents") that review it. All columns are nullable so existing projects keep
-- working unchanged; the UI fills them in for new projects.

alter table research_projects
  add column if not exists document_type        text,
  add column if not exists jurisdiction_country text,
  add column if not exists jurisdiction_region  text,
  add column if not exists line_of_business     text,
  add column if not exists departments          text[] not null default '{}';

-- Constrain the document type to the two supported memo kinds (kept loose so
-- new types can be added in a later migration without a data backfill).
alter table research_projects
  drop constraint if exists research_projects_document_type_chk;
alter table research_projects
  add constraint research_projects_document_type_chk
  check (document_type is null or document_type in ('research_report', 'actuarial_justification'));

-- Only Canada is supported today (US corpus not yet ingested); the UI greys out
-- the US option but the constraint keeps the data honest server-side too.
alter table research_projects
  drop constraint if exists research_projects_jurisdiction_country_chk;
alter table research_projects
  add constraint research_projects_jurisdiction_country_chk
  check (jurisdiction_country is null or jurisdiction_country in ('CA', 'US'));
