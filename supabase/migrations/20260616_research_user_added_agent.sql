-- A generic agent for ad-hoc, user-added sources (the add-by-URL ingest path).
--
-- research_documents.agent_id is a FK to research_agents, so on-demand documents
-- whose source can't be mapped to a known regulator/insurer host need a fallback
-- agent to attach to. The agent_type enum has no "other" value; industry_bureau
-- is the least-wrong existing bucket. is_active=false keeps it out of the normal
-- agent filter pickers (which list authoritative sources).

insert into research_agents (id, type, legal_name, short_name, jurisdiction, is_active)
values (
  'user-added',
  'industry_bureau',
  'User-Added Sources',
  'User-Added',
  '{"scope":"multi_provincial","provinces":[],"domains":[]}',
  false
)
on conflict (id) do nothing;
