-- Remove the OSFI documents ingested by the now-removed research-ingest cron
-- (see 20260617_research_remove_ingest_cron.sql). The cron + adapters were
-- removed, but the rows they had already inserted remained in
-- research_documents — leaving it as a near-empty, OSFI-only corpus that the
-- "Add Sources" feed surfaced instead of anything useful.
--
-- Cascades to research_metrics, research_chunks, and research_project_documents
-- (all declared `on delete cascade`). Safe to run even if no such rows exist.
delete from research_documents where agent_id = 'osfi';
