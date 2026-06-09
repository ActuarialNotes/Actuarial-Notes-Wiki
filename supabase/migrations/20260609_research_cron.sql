-- research_cron: schedule pg_cron jobs that call the research-ingest edge
-- function on the cadences each adapter needs.
--
-- Prerequisites (run once in the Supabase SQL editor before applying this
-- migration, or add to your project's bootstrap script):
--
--   ALTER DATABASE postgres
--     SET "app.settings.supabase_url" = 'https://<project-ref>.supabase.co';
--   ALTER DATABASE postgres
--     SET "app.settings.research_ingest_cron_secret" = '<secret>';
--
-- The cron secret must match the RESEARCH_INGEST_CRON_SECRET Supabase secret
-- set for the research-ingest edge function (supabase secrets set ...).
-- If RESEARCH_INGEST_CRON_SECRET is not set on the function, the header is
-- ignored and any caller is accepted — set it before enabling these jobs.

create extension if not exists pg_cron  with schema extensions;
create extension if not exists pg_net   with schema extensions;

-- Daily at 06:00 UTC — picks up new OSFI bulletins/circulars.
-- The Intact adapter also runs here; upsert(ignoreDuplicates) makes it a
-- no-op on days when no new quarterly supplement has been published.
select cron.schedule(
  'research-ingest-daily',
  '0 6 * * *',
  $$
  select net.http_post(
    url     := current_setting('app.settings.supabase_url') || '/functions/v1/research-ingest',
    headers := jsonb_build_object(
                 'Content-Type',   'application/json',
                 'x-cron-secret',  current_setting('app.settings.research_ingest_cron_secret')
               ),
    body    := '{}'::jsonb
  );
  $$
);

-- Quarterly on the 16th of Feb/May/Aug/Nov at 08:00 UTC — re-runs shortly
-- after Intact's earnings supplements typically land (~mid-month), so the
-- first daily run that day catches any same-day publish rather than waiting
-- until the next daily window.
select cron.schedule(
  'research-ingest-quarterly',
  '0 8 16 2,5,8,11 *',
  $$
  select net.http_post(
    url     := current_setting('app.settings.supabase_url') || '/functions/v1/research-ingest',
    headers := jsonb_build_object(
                 'Content-Type',   'application/json',
                 'x-cron-secret',  current_setting('app.settings.research_ingest_cron_secret')
               ),
    body    := '{}'::jsonb
  );
  $$
);
