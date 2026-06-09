-- research_cron: schedule pg_cron jobs that call the research-ingest edge
-- function on the cadences each adapter needs.
--
-- Prerequisites — run these two commands in the Supabase SQL editor BEFORE
-- applying this migration (Vault stores them encrypted; no superuser needed):
--
--   SELECT vault.create_secret(
--     'https://<project-ref>.supabase.co',
--     'supabase_project_url',
--     'Supabase project base URL for pg_cron edge-function calls'
--   );
--
--   SELECT vault.create_secret(
--     '<your-cron-secret>',
--     'research_ingest_cron_secret',
--     'Shared secret for research-ingest cron authentication'
--   );
--
-- The cron secret must match the RESEARCH_INGEST_CRON_SECRET Supabase secret
-- set for the research-ingest edge function (supabase secrets set ...).
-- Your project ref appears in the Supabase dashboard URL:
--   app.supabase.com/project/<project-ref>

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
    url     := (select decrypted_secret from vault.decrypted_secrets where name = 'supabase_project_url')
               || '/functions/v1/research-ingest',
    headers := jsonb_build_object(
                 'Content-Type',  'application/json',
                 'x-cron-secret', (select decrypted_secret from vault.decrypted_secrets where name = 'research_ingest_cron_secret')
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
    url     := (select decrypted_secret from vault.decrypted_secrets where name = 'supabase_project_url')
               || '/functions/v1/research-ingest',
    headers := jsonb_build_object(
                 'Content-Type',  'application/json',
                 'x-cron-secret', (select decrypted_secret from vault.decrypted_secrets where name = 'research_ingest_cron_secret')
               ),
    body    := '{}'::jsonb
  );
  $$
);
