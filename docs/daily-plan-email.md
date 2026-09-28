# Daily Study-Plan Email

An opt-in morning email that lists the concepts the [study plan](study-plan-generation.md) has scheduled for the day, so students start each day knowing exactly what to practise — before they open the app.

## User experience

- **Opt in**: the Dashboard's reminders bell (signed-in only — the email goes to the account address). A toggle turns the email on, and a picker chooses the local send hour (default 8:00 AM). The browser's IANA timezone is stored alongside the hour and refreshed on every save, so the send time follows whichever device last touched the setting.
- **The email**: one section per exam that has a cached study plan, each with a pacing line (day number, pacing status, days to target), today's concept list (capped at 12, "+N more" beyond that), and the plan's "worth a refresher" concepts. A CTA links to the quiz; the footer links to `/dashboard?reminders=1`, which opens the bell's modal, to change the time or turn it off.
- **Quiet days**: if no exam has anything scheduled or worth reviewing, no email is sent.

## Architecture

The study plan is generated **client-side** and cached to `exam_progress.study_plan_cache` when the user opens the app (see [study-plan-generation.md](study-plan-generation.md) — "Caching and Cross-Device Sync"). A morning email goes out *before* the user opens the app, so the cache is usually a day (or more) old. The server never re-runs plan generation — it reconstructs today's list from the cached plan's forward schedule:

- Cache generated **today** (another device already rebuilt it): use its `todaysConcepts` verbatim.
- Cache from an **earlier day**: every `assignment` scheduled after the generation day up to and including today (catch-up for skipped days), deduped, in schedule order. Assignments *on* the generation day are excluded — they were that day's list.

This derivation (`deriveTodaysConcepts`), the pacing phrasing, and the timezone math live in `quiz/src/lib/dailyEmail.ts` as the pure, **tested** source of truth, and are **mirrored verbatim** in the edge function (which cannot import from `quiz/src`) — the same duplication contract as the league math mirrored into SQL ([leagues.md](leagues.md)). Change one, update the other.

### Pieces

| Piece | Where |
|---|---|
| Prefs table `user_email_prefs` + hourly pg_cron job | `supabase/migrations/20260721_daily_plan_email.sql` |
| Sender edge function | `supabase/functions/daily-plan-email/index.ts` |
| Pure derivation core + tests | `quiz/src/lib/dailyEmail.ts` / `.test.ts` |
| Reminders modal + hook | `quiz/src/components/DashboardRemindersModal.tsx`, `quiz/src/hooks/useEmailPrefs.ts` |
| Feature flag `DAILY_PLAN_EMAIL_ENABLED` | `quiz/src/lib/featureFlags.ts` |

### Send loop

pg_cron fires the edge function **hourly** (on the hour) with an `x-cron-secret` header. Each run:

1. Loads all `user_email_prefs` rows with `daily_plan_email = true`.
2. For each row, computes the user's current local date and hour from the stored timezone (invalid timezones fall back to UTC rather than failing the run). Skips unless the local hour equals `send_hour_local`.
3. Skips if `last_sent_date` already equals the local date — this makes retried or double-fired runs idempotent.
4. Loads the user's `exam_progress` rows with a non-null `study_plan_cache`, derives each exam's section, and skips the user if every section is empty.
5. Fetches the account email via the admin auth API, sends through Resend, then stamps `last_sent_date`.

Per-user failures are collected and reported in the response JSON (`{ checked, sent, skipped, errors }`) without aborting the run. A `{ "force": true }` body (still behind the cron secret) bypasses the hour match and the `last_sent_date` dedupe for manual testing; add `"user_id": "<uuid>"` to limit the run to one account, or a smoke test emails every opted-in user.

The function is deployed with **`--no-verify-jwt`** (`.github/workflows/deploy-functions.yml`). pg_cron sends no user JWT, and with the gateway's JWT check on, every hourly call is refused with `401 UNAUTHORIZED_NO_AUTH_HEADER` before the function runs. The `x-cron-secret` check inside the function is the auth.

### Privacy / access model

The client can only read and write its **own** prefs row (RLS on `user_email_prefs`). `last_sent_date` is only meaningfully written by the edge function's service role. Email addresses are never stored in app tables — the function resolves them from `auth.users` at send time. Deleting the account cascades the prefs row away.

## Setup checklist (one-time, per environment)

1. **Resend**: create an account, add and verify the sending domain (`actuarialnotes.com` — Resend gives the DNS records to add), and create an API key. Until the domain verifies, Resend's test sender `onboarding@resend.dev` works, but it only delivers to the Resend account's own address.
2. **Edge-function secrets** — Dashboard → Edge Functions → Secrets, or:
   ```
   supabase secrets set RESEND_API_KEY=re_...
   supabase secrets set DAILY_PLAN_EMAIL_CRON_SECRET=<random string>
   supabase secrets set DAILY_PLAN_EMAIL_FROM="Actuarial Notes <notifications@actuarialnotes.com>"   # optional; must be on the verified domain
   ```
3. **Vault secrets** (Supabase SQL editor). `supabase_project_url` already exists if the research cron was set up. The cron job reads the vault on every run, so creating these *after* the migration is fine — the next hour picks them up.
   ```sql
   SELECT vault.create_secret('https://<project-ref>.supabase.co', 'supabase_project_url', 'Supabase project base URL for pg_cron edge-function calls');
   SELECT vault.create_secret('<same random string as step 2>', 'daily_plan_email_cron_secret', 'Shared secret for daily-plan-email cron authentication');
   ```
4. Apply `20260721_daily_plan_email.sql` (creates the table and the hourly job).
5. **Deploy**: merging to `main` deploys the function through `.github/workflows/deploy-functions.yml` (with `--no-verify-jwt`); *Run workflow* on that action redeploys on demand. By hand: `supabase functions deploy daily-plan-email --no-verify-jwt --project-ref <project-ref>`.
6. **Smoke test** from the SQL editor, which also exercises the vault secrets the cron uses. Turn the email on from the Dashboard's bell first, and open the app once so the study plan is cached:
   ```sql
   SELECT net.http_post(
     url     := (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'supabase_project_url') || '/functions/v1/daily-plan-email',
     headers := jsonb_build_object(
                  'Content-Type',  'application/json',
                  'x-cron-secret', (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'daily_plan_email_cron_secret')),
     body    := jsonb_build_object('force', true, 'user_id', (SELECT id FROM auth.users WHERE email = '<your email>'))
   );
   -- a few seconds later: expect 200 and {"checked":1,"sent":1,...}
   SELECT status_code, content FROM net._http_response ORDER BY created DESC LIMIT 1;
   ```

### Troubleshooting

What the smoke test (or `net._http_response` after an hourly run) returns says which step is missing:

| Response | Cause |
|---|---|
| `404 NOT_FOUND` "Requested function was not found" | The function isn't deployed — step 5. |
| `401 UNAUTHORIZED_NO_AUTH_HEADER` | Deployed with the gateway's JWT check on — redeploy with `--no-verify-jwt`. |
| `401 {"error":"Unauthorized"}` | `DAILY_PLAN_EMAIL_CRON_SECRET` is unset or differs from the vault's `daily_plan_email_cron_secret`. |
| `500 RESEND_API_KEY not configured` | Step 2. |
| `errors: ["…: Resend 403: …"]` | The From address isn't on a verified Resend domain — step 1. |
| `checked: 0` | No opted-in row for that account (or the `user_id` doesn't match). |
| `sent: 0, skipped: 1` | Nothing scheduled or worth a refresher in any cached plan — open the Dashboard to cache today's plan. |
| No row in `net._http_response` | The job isn't running, or the vault URL secret is missing (the post goes to a NULL url) — check the queries below. |

```sql
SELECT jobname, schedule, active FROM cron.job WHERE jobname = 'daily-plan-email-hourly';
SELECT status, return_message, start_time FROM cron.job_run_details
  WHERE jobid = (SELECT jobid FROM cron.job WHERE jobname = 'daily-plan-email-hourly')
  ORDER BY start_time DESC LIMIT 5;
SELECT name FROM vault.decrypted_secrets WHERE name IN ('supabase_project_url', 'daily_plan_email_cron_secret');
```
