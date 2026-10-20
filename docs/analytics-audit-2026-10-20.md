# GA4 audit — 2026-10-20

> **Snapshot.** A one-off read of the GA4 property, 90 days from 2026-07-22 to 2026-10-19.
> The setup it checks is `docs/analytics-and-monitoring.md`; the follow-up work is in
> `docs/roadmap.md` (G3 and the items proposed in §3.4). The full report, with charts, was
> published as a private Claude artifact. First written 2026-10-19 on data to Oct 18, and
> re-run on 2026-10-20 with Oct 19 added. **None of the recommended GA4 changes had been
> made at either reading**, so every gap below was still open on 2026-10-20.

**Source:** GA4 Data API, property `506926323` (stream `G-YTVSN1NTV9`), time zone
America/Toronto. `v1beta` `runReport` for everything, plus `v1alpha` `runFunnelReport` for the
sequenced funnel. Read-only service account.

**Headline:** GA4 reports **22,835 users**. About **425 of them are people (1.9%)**. The rest
are the e2e suite, one crawler and our own devices. Four of the eight steps in the GA4 admin
checklist have not been done, and three of those four distort every report. The LinkedIn post
is the one real growth signal: 85 people on Oct 18 and 85 more on Oct 19.

## 1. Who the traffic is

| Segment | Users | How it was identified |
|---|---:|---|
| e2e suite on `127.0.0.1` | 18,376 | Host `127.0.0.1` (Playwright's `baseURL`). Cities Boydton, Cheyenne, Des Moines, Moses Lake, Phoenix, San Jose (GitHub Actions' Azure regions), 1280×720, under 1 s of engagement each. Days of 1,000–2,900 users. None after 2026-10-03. |
| Singapore crawler | ~3,888 | Production host. Almost all Singapore, Windows 10 Chrome at 1280×1200, one page each across thousands of different wiki URLs, no `user_engagement` or `first_interaction`. **Still arriving**: 426 on Oct 18, 157 on Oct 19. A normal Chrome user agent and no `navigator.webdriver`, so `decideMeasurement` measures it. Smaller headless profiles at 800×600, 1600×1600, 1280×600, 1280×900 and 390×664 look the same. |
| Internal devices | 26 | GA4's `testDataFilterName = Internal Traffic`. 241 sessions, 5,197 page views (43% of the production host's), 68,957 s of engagement (56%). |
| **People** | **425** | Everything else on `quiz.actuarialnotes.com`. 544 sessions, 326 engaged. |

The human segment, as used for every figure below:

- `hostName = quiz.actuarialnotes.com`
- `testDataFilterName ≠ Internal Traffic`
- `screenResolution` not in `1280x1200, 800x600, 1600x1600, 1280x600, 1280x900, 390x664`

Check: since 2026-10-10, 143 of the segment's 200 users (72%) fired `first_interaction`,
against 9% of all non-internal production-host users (143 of 1,535).

The segment still holds some of our own traffic. A `tutor_offer` came from an untagged Toronto
iPhone (Safari in-app) on Oct 19; the Tutor is shown to one approved account only, so that
phone is a team device that has never opened `?internal=1`. Toronto iPhones at 390×844 and
393×852 are about 39 of the segment's users and may include more.

`testDataFilterName` isn't allowed in segments or funnel steps, so a GA4 *exploration* can't
apply the internal exclusion this way. Per-event counts in a plain report can.

## 2. Data quality

1. **Internal traffic isn't excluded (critical).** The *Internal Traffic* data filter exists
   but is in **Testing**, not Active (checklist step 2), and at least one team phone isn't
   tagged (§1). Internal devices are over half of the production host's engagement time, and
   all of the learning and Tutor events recorded so far.
2. **Page views are counted twice (critical).** Every page view the app sends carries
   `content_group`. From Oct 10 to Oct 19 there were 1,942 such page views and 1,673 without one
   (46%; Oct 19 alone, 478 and 357), each at the same path and minute as a tagged one. They come
   from Enhanced Measurement's *page changes based on browser history events* (checklist step
   1). It also counts the in-place query rewrites `isNewPageView` deliberately skips:
   `/wiki/resources` logs up to 8 page views a minute while its filters move. Pages per session,
   and every pages report, are about double.
3. **No custom definitions or key events (critical).** The Data API's metadata lists zero
   custom dimensions or metrics, and no event has a key-event count (checklist steps 5 and 6).
   `exam`, `concept`, `retained`, `level`, `channel`, `content_type`, `search_scope` and the user
   properties can't be reported. Custom dimensions only collect from the day they're created,
   so every day they wait is a day of the learning events lost.
4. **The crawler isn't filtered (critical).** See §1. It also fires `content_view` from
   `?concept=` URLs.
5. **Search can't show what finds nothing.** `search` carries `search_term` and `search_scope`
   but no result count. The 1.5 s pause also fires mid-word: one reader logged `liability`,
   `liability for`, `liability for in` and `lic`.
6. **Smaller items.**
   - Old event names: `signup` (1) beside `sign_up`, and `mastery_analytics_quiz` (5, last
     on 2026-09-11), which no code sends. All internal.
   - `form_start` is Enhanced Measurement's form interactions, which the setup says to drop.
   - `content_group` is unset on every page view before 2026-10-03, so content-group reports
     start on 2026-10-10.
   - `exception` reached 17 of the 425 people (4%), 5 of them on Oct 18–19 (`/wiki`, `/craft`,
     Exam 7). The `description` param isn't registered, so the errors can't be named from GA4.

Checklist steps 3 (unwanted referrals), 4 (retention), 7 (reporting identity) and 8 (DebugView)
can't be read through the Data API. `checkout.stripe.com` appears as a referral source (1 human
session in the window), which may mean step 3 isn't done either.

## 3. Acquisition (people)

| Channel · source | Users | Sessions | Engaged | Engagement rate | Avg session |
|---|---:|---:|---:|---:|---:|
| Direct | 247 | 326 | 172 | 53% | 2m 39s |
| Organic social · linkedin.com, lnkd.in | 94 | 109 | 81 | 74% | 2m 06s |
| Organic search · google | 73 | 87 | 64 | 74% | 8m 54s* |
| Referral · github, facebook, Teams | 4 | 6 | 3 | 50% | 28s |
| Unassigned | 5 | 11 | 3 | 27% | 5s |

\* One reader lifts it: a returning visitor in Douala, Cameroon spent 3 h 10 min over three
sessions on Oct 19 (71 page views, mostly the Study Guides and Exams 7, 6U and 6C).

- **The LinkedIn post kept going.** Oct 18: 85 people, 49 from linkedin.com. Oct 19: 85
  people again, 40 of them new from linkedin.com and 37 new direct (shared links that lost
  their referrer), with 64 engaged sessions and 18,824 s of engagement — more time than launch
  day. About 9 people came back on Oct 19 as returning visitors.
- Baseline before the post: 3–10 people a day.
- Google organic brings the most engaged readers. The prerendered `/wiki/concept/…` and
  `/wiki/resource/…` pages are starting to land them, one or two sessions each.
- US 150 people (53% engaged), Canada 125 (69%). Mobile is 44% of people and 54% of page views.

Top landing pages: `/` 202 sessions (134 engaged), `/wiki` 62 (52), `/auth` 14,
`/wiki/exam/Exam+5+(CAS)` 11, `/wiki/exam/Exam+6C+(CAS)` 11, `/dashboard` 10, Exam 9 8,
FM-2 8, `/battle` 7, MAS-I 7, P-1 7, `/wiki/concept/Double+Lift+Chart` 6.

## 4. Activation funnel (people)

People who fired each event in the 90 days, and on Oct 18–19 alone:

| Event | 90 days | Oct 18–19 |
|---|---:|---:|
| `first_visit` | 418 | 163 |
| `sign_up` | 3 | 2 |
| `first_quiz` | 59 | 52 |
| `question_answered` | 30 | 24 |
| `first_correct` | 10 | 8 |
| `quiz_completed` | 12 | 8 |
| `day2_return` | 20 | 4 |
| `upgrade_clicked` | 1 | 0 |

- **Read it from `first_visit`, not `sign_up`.** Guests can quiz, so only 3 people signed up.
- **The LinkedIn visitors try the product.** 52 of the 163 new people on Oct 18–19 (32%)
  started a quiz, against 3% (7 of 255) before the post.
- **About half of first quizzes end before a single answer** (59 → 30 over 90 days, 52 → 24
  on Oct 18–19). The pre-quiz concept list or the first question is where they leave. This is
  still the biggest drop in the clean data.
- Sequenced (`runFunnelReport`, bots excluded but internal included): 370 first visits → 66
  first quizzes → 13 first correct → 12 completed, in order.
- **Unfiltered GA4 overstates activation about 10–20×:** 626 `first_quiz`, 223
  `first_correct` and 173 `quiz_completed` users, almost all the e2e suite.

## 5. Content (people)

Content groups, Oct 10–19 (page views include the Enhanced Measurement twins):

| Group | Views | People |
|---|---:|---:|
| Quiz builder | 425 | 154 |
| Study guides | 197 | 45 |
| Quiz | 81 | 54 |
| Resources | 27 | 15 |
| Concepts | 24 | 19 |
| Dashboard | 22 | 14 |
| Flashcards | 16 | 8 |
| Quiz Battle | 14 | 11 |
| Store | 11 | 7 |

Exam pages over 90 days, by people: Exam 5 (35), FM-2 (27), P-1 (26), MAS-I (25), MAS-II (17),
Exam 8 (13), Exam 9 (12), Exams 6C and 7 (11 each), 6U (8). Exam 5 is also where the concept
popup is used most: 295 human `content_view` events were opened on it, by 5 readers; the quiz's
Practice Questions page follows with 99 by 17.

**Search:** no new searches on Oct 19. Over 90 days, 7 human `search` events from 4 people:
liability for incurred claims, linear regression and "large". The vault has *Liability for
Incurred Claims*, *Linear Regression* and *Large Loss*. Internally, `asop 2` and `cia ma` match
no page. Without a result count, "searches that lead nowhere" can't be measured.

## 6. Learning events

| Event | Events | Users | Who |
|---|---:|---:|---|
| `concept_retention` | 27 | 2 | Internal, Oct 17–19 |
| `mistake_reviewed` | 3 | 1 | Internal, Oct 17 |
| `reminder_opened` | 0 | 0 | — |
| `reminder_session` | 0 | 0 | — |
| `tutor_offer` | 3 + 1 | 2 + 1 | Internal, plus the untagged team phone (§1) |
| `tutor_answer` · `tutor_session` | 5 · 1 | 2 · 1 | Internal |

They shipped on 2026-10-17 (roadmap L1), so there is still no reader data. The events arrive,
but their params aren't registered, so retention by `level` and `days_since_correct` can't be
read until they are. No reminder-email landing has been recorded.

## 7. Recommended actions

1. **Activate the Internal Traffic filter** and add the Developer Traffic filter (checklist
   step 2). Open `?internal=1` on every team device; at least one phone is untagged.
2. **Turn off history-change page views and form interactions** in Enhanced Measurement
   (step 1).
3. **Register the custom definitions and key events** (steps 5 and 6) now, while the learning
   events are three days old.
4. **Keep the Singapore crawler out:** find its user agent and IP range in Vercel's request
   logs and block or challenge it in the Vercel firewall, or add its user agent to
   `isAutomatedUserAgent`. *(Proposed as G8.)*
5. **Save the human segment** as a GA4 comparison and use it for any report covering dates
   before these fixes; past data can't be cleaned.
6. **Add a result count to `search`**, and fire it when the reader pauses *and* leaves the box
   or opens a result, not on every pause. *(Proposed as G9.)*
7. **Look at the first quiz.** Half the people who start one never answer a question, and the
   LinkedIn visitors are starting them at ten times the old rate. *(Proposed as L10.)*
8. **Follow the LinkedIn cohort**: check its `day2_return` over the coming week, and post
   again, since one post brought about 170 people in two days, against about 255 in the three months
   before it.
   Set data retention to 14 months (step 4) so the before-and-after stays visible.

With 425 people, treat any rate over fewer than ~30 people as a direction, not a measurement.
