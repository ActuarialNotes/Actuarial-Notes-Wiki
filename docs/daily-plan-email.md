# Daily Study-Plan Email

An opt-in morning email that lists the concepts the [study plan](study-plan-generation.md) has scheduled for the day, so students start each day knowing exactly what to practise — before they open the app.

## User experience

- **Opt in**: Settings → *Daily plan email* (signed-in only — the email goes to the account address). A toggle turns the email on, and a picker chooses the local send hour (default 8:00 AM). The browser's IANA timezone is stored alongside the hour and refreshed on every save, so the send time follows whichever device last touched the setting.
- **The email**: one section per exam that has a cached study plan, each with a pacing line (day number, pacing status, days to target), today's concept list (capped at 12, "+N more" beyond that), and the plan's "worth a refresher" concepts. A CTA links to the quiz; the footer links back to Settings to change the time or turn it off.
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
| Settings card + hook | `quiz/src/components/EmailSettingsCard.tsx`, `quiz/src/hooks/useEmailPrefs.ts` |
| Feature flag `DAILY_PLAN_EMAIL_ENABLED` | `quiz/src/lib/featureFlags.ts` |

### Send loop

pg_cron fires the edge function **hourly** (on the hour) with an `x-cron-secret` header. Each run:

1. Loads all `user_email_prefs` rows with `daily_plan_email = true`.
2. For each row, computes the user's current local date and hour from the stored timezone (invalid timezones fall back to UTC rather than failing the run). Skips unless the local hour equals `send_hour_local`.
3. Skips if `last_sent_date` already equals the local date — this makes retried or double-fired runs idempotent.
4. Loads the user's `exam_progress` rows with a non-null `study_plan_cache`, derives each exam's section, and skips the user if every section is empty.
5. Fetches the account email via the admin auth API, sends through Resend, then stamps `last_sent_date`.

Per-user failures are collected and reported in the response JSON (`{ checked, sent, skipped, errors }`) without aborting the run. A `{ "force": true }` body (still behind the cron secret) bypasses the hour match and the `last_sent_date` dedupe for manual testing.

### Privacy / access model

The client can only read and write its **own** prefs row (RLS on `user_email_prefs`). `last_sent_date` is only meaningfully written by the edge function's service role. Email addresses are never stored in app tables — the function resolves them from `auth.users` at send time. Deleting the account cascades the prefs row away.

## Setup checklist (one-time, per environment)

1. **Resend**: create an API key and a verified sending domain, then:
   ```
   supabase secrets set RESEND_API_KEY=re_...
   supabase secrets set DAILY_PLAN_EMAIL_CRON_SECRET=<random string>
   supabase secrets set DAILY_PLAN_EMAIL_FROM="Actuarial Notes <notifications@actuarialnotes.com>"   # optional
   ```
2. **Vault secrets** (Supabase SQL editor, *before* applying the migration — `supabase_project_url` already exists if the research cron was set up):
   ```sql
   SELECT vault.create_secret('https://<project-ref>.supabase.co', 'supabase_project_url', '...');
   SELECT vault.create_secret('<same random string>', 'daily_plan_email_cron_secret', '...');
   ```
3. Apply `20260721_daily_plan_email.sql`. The edge function auto-deploys via `.github/workflows/deploy-functions.yml` on push to `main`.
4. Smoke test: `curl -X POST https://<project-ref>.supabase.co/functions/v1/daily-plan-email -H "x-cron-secret: <secret>" -H "Content-Type: application/json" -d '{"force": true}'` after opting in a test account.
