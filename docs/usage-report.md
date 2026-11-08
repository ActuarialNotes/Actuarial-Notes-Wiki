# The usage report

A daily read of **how real people use the app**: who comes, from where, whether they practise,
whether they come back, and which accounts do what. It joins GA4 (every visitor, signed in or not)
with the production Supabase database (what signed-in readers saved), takes out the bots and the
team, and publishes one private page.

`scripts/usage_report/` produces it in one command. This document is how to run it, what every
number means, and the traps that make naive numbers wrong. Read **Traps** before trusting a
figure that looks surprising.

- Code: `scripts/usage_report/` — `run.py` (the command), `pull.py` (every query), `figures.py`
  (every number, pure), `render.py` (the page), `segments.py` (who counts as a person),
  `config.py` (the private half). Tests: `scripts/test_usage_report.py`.
- Related: `docs/analytics-and-monitoring.md` (what the app sends to GA4 and the admin checklist),
  `docs/analytics-audit-2026-10-19.md` (the first audit, where the human segment came from).

## Daily routine

The short version, for Claude: *"Prepare today's usage report as in docs/usage-report.md."*

1. **Check the config is there.** `USAGE_REPORT_CONFIG` in the environment, or
   `scripts/usage_report/config.local.json` (see **Configuration**). Without it the run stops and
   says so.
2. **Fetch the last published page** to compare against. In a Claude session: the Artifact tool's
   `read` on the config's `artifact_url`, which saves the page's HTML locally. Every page the
   pipeline renders embeds its figures (`<script id="usage-figures">`), so nothing has to survive
   between sessions: yesterday's numbers come back from yesterday's page.
3. **Run it**, today included (today is partial, and labelled so):

   ```bash
   python3 scripts/usage_report/run.py --previous <saved page.html>
   ```

   It pulls everything (~30 s), writes `usage-reports/<today>/` (git-ignored) — `data.json`,
   `figures.json`, `report.html`, `changes.md` — and prints the figures that changed.
4. **Read before writing.** Go through `changes.md` and the page. For anything that moved more
   than the day's traffic explains, look at the rows behind it before saying what it means
   (**Checks** below lists the usual suspects: a new bot, a team device, GA4 still processing).
5. **Write the notes**: a short HTML fragment, `usage-reports/<today>/notes.html` — a table of the
   figures that moved, what changed this time and why, and what to do. That is the only prose a
   person writes; every other sentence on the page is generated from the numbers. Then re-render
   without pulling again:

   ```bash
   python3 scripts/usage_report/run.py --from-data usage-reports/<today>/data.json \
     --notes usage-reports/<today>/notes.html --previous <saved page.html>
   ```

6. **Publish** `usage-reports/<today>/report.html` to the same private artifact (`url` =
   `artifact_url`), so the link stays the same. Tell the owner what changed in a few lines.

Running it on your own machine is the same, minus the Artifact steps: keep the last
`report.html` and pass it as `--previous`.

## Configuration

Everything that identifies the team lives in one JSON object, never in git:

| Key | What it is |
|---|---|
| `ga_property` | GA4 property ID (numeric). |
| `supabase_project` | The Supabase project ref (from the dashboard URL). |
| `team_emails` | Every account the team uses, including test accounts. Left out of every database figure. |
| `team_devices` | The team's own devices that GA4 doesn't label internal: `{city, resolutions, keep_sources}`. Traffic from that city at those screen sizes is excluded unless its session source is in `keep_sources` (default `["google"]`). |
| `window_start` | First day of the report window. |
| `timezone` | The GA4 property's time zone; also used for Supabase dates. |
| `artifact_url` | The published page, for step 2 and step 6. |

`config.example.json` shows the shape. It is read from, in order:

1. **`USAGE_REPORT_CONFIG`**: the JSON as one environment variable. On Claude Code on the web,
   set it on the cloud environment (environment settings → environment variables) and every
   session has it. Values there are private to the environment, not committed anywhere.
2. **`scripts/usage_report/config.local.json`**: git-ignored. For a local machine. A cloud
   container is wiped between sessions, so this only lasts one session there.

**Credentials.** In a Claude Code cloud session with GA4 and Supabase connected, the agent proxy
injects them; the scripts send a dummy token. Anywhere else set `GA_ACCESS_TOKEN` (an OAuth token
with `analytics.readonly`, e.g. `gcloud auth print-access-token`) and `SUPABASE_ACCESS_TOKEN` (a
personal access token). The scripts only read.

**What is safe to commit.** The code, this document and `config.example.json` name no one: the
bot signatures in `segments.py` are facts about crawlers. The config, `usage-reports/` (it lists
readers' masked emails and account IDs) and the published page stay private.

## Who counts as a person

GA4 reported ~26,800 "users" for Aug 1 – Nov 8, 2026; about 450 were people who engaged. In
order, `segments.human()` keeps:

1. **Production host only.** `127.0.0.1` is the Playwright e2e suite running on GitHub Actions
   (17,400 users, none since Oct 3, 2026).
2. **Not GA4's Internal Traffic label** (`testDataFilterName`). The admin data filter is still in
   *Testing*, so the label is there to filter on but the traffic isn't dropped from GA4 itself.
3. **Not a crawler signature**: screen sizes only crawlers report (`BOT_RESOLUTIONS`: the
   Singapore crawler is Windows 10 Chrome at 1280×1200, ~7,900 users, one page each), operating
   system "(not set)", and Linux at 1440×900 or Mac at 375×812.
4. **Not one of the team's untagged devices** (`team_devices` in the config).

What gets through: a **distributed bot** — Windows, 1920×1080, "direct", one page, zero
engagement, from many countries — whose screen size real readers share. Since Nov 2026 it also
sends `chatgpt.com` as its referrer. So the visitors figure is an upper bound, and the
**headline is engaged people**: browser IDs that fired `user_engagement`, which this bot never
does. Rates are taken over engaged people unless the page says otherwise.

GA4 counts **browser IDs, not people or devices.** One iPhone is a new ID in Safari, in Chrome,
in every app's in-app browser (LinkedIn, Instagram) and after every cookie clear. A person on two
browsers counts twice everywhere in GA4.

### Bots: how to spot a new one

Break the day down by `country, screenResolution, operatingSystem, browser, sessionSource` with
`totalUsers, engagedSessions, userEngagementDuration`. A crawler shows as many IDs with almost no
engagement, one page each, an unusual or headless screen size, or an OS of "(not set)", often
from one country or spread evenly over many. If it has a signature real readers don't share, add
it to `segments.py` (screen size → `BOT_RESOLUTIONS`, OS + size → `BOT_OS_RESOLUTIONS`) and say
so in the notes. If it doesn't (the distributed bot), leave it: the engaged headline already
ignores it.

### The team's own traffic

The giveaway is **events only the team can produce**: a Tutor offer (`tutor_offer` — the Tutor
shows only to approved accounts), a session from the daily-plan email (it goes only to Pro
accounts that opted in, which so far means only the team), a Stripe checkout, an Upgrade click
from an account that is already Pro. Look one up by `city, operatingSystem, browser,
screenResolution, sessionSource` and compare with the tagged internal devices (`testDataFilterName
= Internal Traffic`, same breakdown). Matching untagged rows are the team before `?internal=1` was
opened in that browser, or in an in-app browser that doesn't keep it. That is how the owner's own
clicks on their LinkedIn post were counted as readers until Nov 7, 2026. Add the device's city
and screen size to `team_devices`.

The cost is real: a stranger in the same city on the same phone model, arriving directly or from
LinkedIn, is dropped too. Google arrivals are kept by default. Opening `?internal=1` once in every
browser on every team device (Safari and Chrome on the phone included) is the better fix; in-app
browsers will still lose the tag.

## What the numbers mean

| Figure | Source and definition |
|---|---|
| Engaged people | IDs in the human segment that fired `user_engagement`. |
| Visitors | `totalUsers` in the human segment: an upper bound (the distributed bot). |
| Opened a quiz | `first_quiz` IDs. `quiz_started` fires when the quiz page loads its questions, before the pre-quiz concept list. |
| Answered a question | `question_answered` IDs: an answer was confirmed. |
| Quiz openers who never answer | 1 − answered ÷ opened. The biggest leak since the first audit. |
| Came back on a later day | `day2_return` IDs: fired once, the first time a browser opens the app on a later calendar day. |
| Daily returns (D1, D2, …) | Active users by `firstSessionDate` × `date`: people first seen on day X and active again n days later. Someone back on several days counts in several columns. The day's "New" equals `first_visit`, which is the check that this is right. |
| Search / social / ChatGPT rows | `sessionDefaultChannelGroup` of the session in which each event fired. |
| Accounts | Supabase `auth.users` minus `team_emails`. An account is listed if it did anything in the window other than a subscription update (a Stripe renewal isn't a visit). A *return* is any later day with activity. *Practised on a return* is a later day with an answer. |
| Answers saved by reader accounts | `question_responses` rows from listed accounts in the window. |
| Guest share of answers | 1 − database answers ÷ GA4 `question_answered` events: a floor (see **Traps**). |

The per-day account activity unions `question_responses`, `quiz_sessions`,
`user_collected_cards`, `user_flashcards`, `concept_level_events`, `exam_progress`,
`auth.refresh_tokens` / `auth.sessions` (the app was open while signed in),
`user_subscriptions`, `pro_access_keys`, `beta_code_redemptions`, `user_email_prefs` and
`user_project_attempts` (`pull.ACTIVITY_SQL`).

## Traps

Each of these produced a wrong number at least once while the report was being built.

1. **Today is partial, and so is yesterday.** GA4 keeps processing a day for a day or more.
   Yesterday's figures usually rise on the next run (Nov 7, 2026 gained 7 engaged people
   overnight), so a day-over-day change is partly GA4 catching up. Say so before reading a trend
   into it.
2. **GA4's cohort engine is unreliable.** `cohortActiveUsers` changes with the other metrics in
   the same request: adding `cohortTotalUsers` cut next-day returns from 26 to 16 for the same ten
   days. The pipeline uses a plain `firstSessionDate × date` report instead (22 for those days),
   whose day-0 count matches `first_visit`. Reports published before Nov 8, 2026 used the cohort
   engine with both metrics, so their return figures were low.
3. **GA4 misses some readers entirely.** One reader saved 31 answers on Nov 4–5, 2026 while GA4
   recorded 5 answers from anyone: a blocker or the in-app analytics opt-out (Settings → Privacy).
   Every GA4 figure is a floor, and so is the guest share of answers.
4. **`sign_up` under-counts.** It fired for 7 IDs while readers created 16 accounts; email
   confirmation often lands in another browser. Count accounts in Supabase.
5. **The team hides in plain sight.** See **The team's own traffic**. Tagged internal traffic
   alone was about 27% of production engagement time; the untagged team devices were another ~30
   IDs, including 4 of the 23 people who appeared to finish a quiz.
6. **A deleted account takes its records with it.** A Pro key it redeemed shows `redeemed_by`
   empty but `redeemed_at` set. A team member who deletes and re-creates an account looks like a
   reader churning; check the masked email against `team_emails` before reporting it.
7. **Supabase timestamps move.** `exam_progress.updated_at` keeps only each exam's latest change,
   so an exam set on Nov 1 and touched on Nov 3 shows on Nov 3. `auth.refresh_tokens` are pruned,
   so "app open" days are incomplete. Neither is a bug in the report.
8. **Error text isn't readable.** The app sends the message in `exception.description`, but that
   parameter isn't registered as a custom dimension, so GA4 can't report it. What can be read:
   page, browser and date. In Oct–Nov 2026 Mac Safari users hit errors far more often than anyone
   else (about two-thirds of them, against about 5% elsewhere).
9. **One exam, two URLs.** The quiz builder's links come as `/?topic=Exam+MAS-I` and
   `/?topic=Exam%20MAS-I`; `figures.topic_name` merges them (people can then be counted twice).
10. **Parentheses in page URLs.** Exam and resource pages (`Exam 6C (CAS)`) return HTTP 404 when
    the parentheses arrive encoded as `%28`/`%29`. The app still renders them, but a crawler that
    requests that form is told the page doesn't exist. Worth watching in Search Console.

## Checks before publishing

- **New bot?** Visitors up but engaged flat, or a burst from one screen size or country.
- **Team traffic?** Any team-only event in the human segment (`tutor_offer`, `daily-plan-email`
  source, `upgrade_clicked` from a Pro account).
- **Accounts:** a new account whose email belongs to the team (add it to `team_emails`), a deleted
  one, a paying subscriber's renewal date approaching with no practice.
- **The comparison is like for like:** same window start, and the previous page's figures were
  made by the pipeline (they carry `usage-figures`).

## Changing the report

- A new figure: query in `pull.py`, number in `figures.py` (add it to `S` so the next run diffs
  it, and to `run.LABELS` if it belongs at the top of `changes.md`), sentence in `render.py`.
- Keep `figures.py` and `render.py` free of network calls; the tests run on synthetic data.
- Never put a name, email, city or device of the team in the code or this document; that is the
  config's job.

```bash
python3 -m unittest discover -s scripts -p 'test_usage_report.py'
```
