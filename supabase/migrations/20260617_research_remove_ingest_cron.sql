-- Remove the pg_cron schedule added by 20260609_research_cron.sql.
--
-- The research-ingest edge function (and its per-source adapters) has been
-- removed: the Research corpus is no longer grown by automated scrapers
-- hitting regulator/insurer "guideline" sites on a schedule. Content and
-- benchmark data are now loaded from verified sources in batches instead.
-- The on-demand "add resource by URL" path (research-ingest-url) is
-- unaffected — it is user-initiated, not cron-driven.
--
-- 20260609_research_cron.sql always runs before this migration (it created
-- the pg_cron/pg_net extensions and scheduled these two named jobs), so both
-- unschedule calls below are guaranteed to have a valid target on both a
-- fresh database (replaying every migration in order) and an existing
-- database where that migration already ran.
select cron.unschedule('research-ingest-daily');
select cron.unschedule('research-ingest-quarterly');
