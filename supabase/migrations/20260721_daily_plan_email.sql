-- daily_plan_email: opt-in daily study-plan email.
--
-- A new user_email_prefs table stores each user's opt-in, preferred local send
-- hour, and IANA timezone. An hourly pg_cron job calls the daily-plan-email
-- edge function, which picks the users whose local clock matches their chosen
-- hour, derives today's concepts from exam_progress.study_plan_cache, and
-- sends the email (see supabase/functions/daily-plan-email/index.ts and
-- docs/daily-plan-email.md).
--
-- Prerequisites — run these in the Supabase SQL editor BEFORE applying this
-- migration (same pattern as 20260609_research_cron.sql; the project-url
-- secret already exists if the research cron was set up):
--
--   SELECT vault.create_secret(
--     'https://<project-ref>.supabase.co',
--     'supabase_project_url',
--     'Supabase project base URL for pg_cron edge-function calls'
--   );
--
--   SELECT vault.create_secret(
--     '<your-cron-secret>',
--     'daily_plan_email_cron_secret',
--     'Shared secret for daily-plan-email cron authentication'
--   );
--
-- The cron secret must match the DAILY_PLAN_EMAIL_CRON_SECRET Supabase secret
-- set for the daily-plan-email edge function (supabase secrets set ...), which
-- also needs RESEND_API_KEY (and optionally DAILY_PLAN_EMAIL_FROM).

CREATE TABLE IF NOT EXISTS user_email_prefs (
  user_id          uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  daily_plan_email boolean NOT NULL DEFAULT false,
  send_hour_local  integer NOT NULL DEFAULT 8 CHECK (send_hour_local BETWEEN 0 AND 23),
  timezone         text    NOT NULL DEFAULT 'UTC',
  -- Local calendar date (YYYY-MM-DD, in the user's timezone) of the last email
  -- actually sent. Written only by the edge function (service role); makes the
  -- hourly cron idempotent if a run is retried or an hour fires twice.
  last_sent_date   text,
  updated_at       timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE user_email_prefs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users manage their own email prefs"
  ON user_email_prefs FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Hourly on the hour — the edge function matches each opted-in user's local
-- hour against their send_hour_local, so one job covers every timezone.
select cron.schedule(
  'daily-plan-email-hourly',
  '0 * * * *',
  $$
  select net.http_post(
    url     := (select decrypted_secret from vault.decrypted_secrets where name = 'supabase_project_url')
               || '/functions/v1/daily-plan-email',
    headers := jsonb_build_object(
                 'Content-Type',  'application/json',
                 'x-cron-secret', (select decrypted_secret from vault.decrypted_secrets where name = 'daily_plan_email_cron_secret')
               ),
    body    := '{}'::jsonb
  );
  $$
);
