# GA4 audit — 2026-10-19

> **Snapshot.** A one-off read of the GA4 property, 90 days from 2026-07-21 to 2026-10-18.
> The setup it checks is `docs/analytics-and-monitoring.md`; the follow-up work is in
> `docs/roadmap.md` (G3 and the items proposed in §3.4). The full report, with charts, was
> published as a private Claude artifact.

**Source:** GA4 Data API, property `506926323` (stream `G-YTVSN1NTV9`), time zone
America/Toronto. `v1beta` `runReport` for everything, plus `v1alpha` `runFunnelReport` for the
sequenced funnel. Read-only service account.

**Headline:** GA4 reports **22,728 users**. About **345 of them are people (1.5%)**. The rest
are the e2e suite, one crawler and our own devices. Four of the eight steps in the GA4 admin
checklist have not been done, and three of those four distort every report.

## 1. Who the traffic is

| Segment | Users | How it was identified |
|---|---:|---|
| e2e suite on `127.0.0.1` | 18,490 | Host `127.0.0.1` (Playwright's `baseURL`). Cities Boydton, Cheyenne, Des Moines, Moses Lake, Phoenix, San Jose (GitHub Actions' Azure regions), 1280×720, under 1 s of engagement each. Days of 1,000–2,900 users. None after 2026-10-03. |
| Singapore crawler | ~3,664 | Production host. 3,630 from Singapore, all Windows 10 Chrome at 1280×1200, one page each across 2,389 different wiki URLs, no `user_engagement` or `first_interaction`. **Still arriving** (426 on Oct 18). A normal Chrome user agent and no `navigator.webdriver`, so `decideMeasurement` measures it. Smaller headless profiles at 800×600, 1600×1600, 1280×600, 1280×900 and 390×664 look the same. |
| Internal devices | 24 | GA4's `testDataFilterName = Internal Traffic`. 232 sessions, 5,103 page views (45% of the production host's), 68,189 s of engagement (66%). |
| **People** | **345** | Everything else on `quiz.actuarialnotes.com`. 449 sessions, 262 engaged. |

The human segment, as used for every figure below:

- `hostName = quiz.actuarialnotes.com`
- `testDataFilterName ≠ Internal Traffic`
- `screenResolution` not in `1280x1200, 800x600, 1600x1600, 1280x600, 1280x900, 390x664`

Check: since 2026-10-10, 80 of the segment's 120 users (67%) fired `first_interaction`,
against under 10% of all production-host users.

`testDataFilterName` isn't allowed in segments or funnel steps, so a GA4 *exploration* can't
apply the internal exclusion this way. Per-event counts in a plain report can.

## 2. Data quality

1. **Internal traffic isn't excluded (critical).** The *Internal Traffic* data filter exists
   but is in **Testing**, not Active (checklist step 2). Internal devices are two-thirds of all
   engagement time, and all of the learning and Tutor events recorded so far.
2. **Page views are counted twice (critical).** Every page view the app sends carries
   `content_group`. From Oct 10 to Oct 18 there were 1,464 such page views and 1,316 without one
   (47%), each at the same path and minute as a tagged one. They come from Enhanced
   Measurement's *page changes based on browser history events* (checklist step 1). It also
   counts the in-place query rewrites `isNewPageView` deliberately skips: `/wiki/resources` logs
   up to 8 page views a minute while its filters move. Pages per session, and every pages
   report, are about double.
3. **No custom definitions or key events (critical).** The Data API's metadata lists zero
   custom dimensions or metrics, and `keyEvents` is 0 for every event (checklist steps 5 and 6).
   `exam`, `concept`, `retained`, `level`, `channel`, `content_type`, `search_scope` and the user
   properties can't be reported. Custom dimensions only collect from the day they're created.
4. **The crawler isn't filtered (critical).** See §1. It also fires `content_view` (298 events)
   from `?concept=` URLs.
5. **Search can't show what finds nothing.** `search` carries `search_term` and `search_scope`
   but no result count. The 1.5 s pause also fires mid-word: one reader logged `liability`,
   `liability for`, `liability for in` and `lic`.
6. **Smaller items.**
   - Old event names: `signup` (1) beside `sign_up` (3), and `mastery_analytics_quiz` (5, last
     on 2026-09-11), which no code sends. All internal.
   - `form_start` (221 events) is Enhanced Measurement's form interactions, which the setup
     says to drop.
   - `content_group` is unset on every page view before 2026-10-03, so content-group reports
     start on 2026-10-10.
   - Some untagged Toronto iPhones (390×844) may be team devices that never opened
     `?internal=1`.
   - `exception` reached 14 of the 345 people (4%). One reader hit 4 on
     `/wiki/exam/Exam+6C+(CAS)`. The `description` param isn't registered, so the errors can't
     be named from GA4.

Checklist steps 3 (unwanted referrals), 4 (retention), 7 (reporting identity) and 8 (DebugView)
can't be read through the Data API. `checkout.stripe.com` still appears as a referral source
(1 human session in the window), which may mean step 3 isn't done either.

## 3. Acquisition (people)

| Channel · source | Users | Sessions | Engaged | Engagement rate | Avg session |
|---|---:|---:|---:|---:|---:|
| Direct | 210 | 282 | 143 | 51% | 2m 35s |
| Organic search · google | 72 | 83 | 61 | 73% | 4m 34s |
| Organic social · linkedin.com, lnkd.in | 53 | 62 | 50 | 81% | 2m 00s |
| Referral · github.com, facebook.com | 6 | 8 | 5 | — | — |
| Unassigned | 5 | 11 | 3 | 27% | 5s |

- Baseline of 3–10 people a day. **Oct 18: 85 people**, 49 from linkedin.com, 72 engaged
  sessions — the LinkedIn post.
- Google organic brings the most engaged readers. The prerendered `/wiki/concept/…` and
  `/wiki/resource/…` pages are starting to land them (149 distinct landing pages, one or two
  sessions each).
- Canada 114 people (69% engaged), US 113 (53%). Mobile is 37% of people and 51% of page views.

Top landing pages: `/` 110 sessions (72 engaged), `/wiki` 59 (49), `/auth` 14, `/dashboard`
10, `/wiki/exam/Exam+5+(CAS)` 9, `/battle` 6, `/wiki/concept/Double+Lift+Chart` 6,
`/wiki/exam/Exam+FM-2+(SOA)` 6, `/wiki/exam/Exam+P-1+(SOA)` 6, the Brown & Kopp resource page 6.

## 4. Activation funnel (people)

People who fired each event in the 90 days:

| Event | People |
|---|---:|
| `first_visit` | 338 |
| `sign_up` | 3 |
| `first_quiz` | 31 |
| `question_answered` | 17 |
| `first_correct` | 7 |
| `quiz_completed` | 8 |
| `day2_return` | 17 |
| `upgrade_clicked` | 1 |

- **Read it from `first_visit`, not `sign_up`.** Guests can quiz, so only 3 people signed up.
- **9% of new people start a quiz, and about half of those never answer a question** (31 → 17).
  The pre-quiz concept list or the first question is where they leave. This is the biggest
  drop in the clean data.
- Sequenced (`runFunnelReport`, bots excluded but internal included): 291 first visits → 38
  first quizzes → 9 first correct → 4 completed, in order.
- `day2_return`: 5% of new people came back on a later day.
- **Unfiltered GA4 overstates activation about 20×:** 611 `first_quiz`, 219 `first_correct`
  and 168 `quiz_completed` users, almost all the e2e suite.

## 5. Content (people)

Content groups, Oct 10–18 (page views include the Enhanced Measurement twins):

| Group | Views | People |
|---|---:|---:|
| Quiz builder | 203 | 78 |
| Study guides | 129 | 31 |
| Quiz | 36 | 26 |
| Concepts | 22 | 17 |
| Resources | 19 | 10 |
| Dashboard | 17 | 10 |
| Flashcards | 11 | 6 |
| Concept Craft · Quiz Battle · Store | 7 each | 7 · 6 · 4 |

Exam pages over 90 days, by people: Exam 5 (34), FM-2 (27), P-1 (23), MAS-I (23), MAS-II (15),
Exam 8 (12), Exams 6C, 7 and 9 (10 each). Exam 5 is also where the concept popup is used: 203
human `content_view` events were opened on it, by 5 readers.

**Search:** 23 `search` events in 90 days, 16 internal. Real readers searched for liability
for incurred claims, linear regression and "large"; the vault has *Liability for Incurred
Claims*, *Linear Regression* and *Large Loss*. Internally, `asop 2` and `cia ma` match no page.
Without a result count, "searches that lead nowhere" can't be measured.

## 6. Learning events

| Event | Events | Users | Who |
|---|---:|---:|---|
| `concept_retention` | 18 | 1 | Internal, Oct 17–18 |
| `mistake_reviewed` | 3 | 1 | Internal, Oct 17 |
| `reminder_opened` | 0 | 0 | — |
| `reminder_session` | 0 | 0 | — |
| `tutor_offer` · `tutor_answer` · `tutor_session` | 2 · 1 · 1 | 2 · 1 · 1 | Internal, Oct 18 |

They shipped on 2026-10-17 (roadmap L1), so there is no reader data yet. The events arrive,
but their params aren't registered, so retention by `level` and `days_since_correct` can't be
read until they are. No reminder-email landing has been recorded.

## 7. Recommended actions

1. **Activate the Internal Traffic filter** and add the Developer Traffic filter (checklist
   step 2). Open `?internal=1` on every team device, phones included.
2. **Turn off history-change page views and form interactions** in Enhanced Measurement
   (step 1).
3. **Register the custom definitions and key events** (steps 5 and 6) now, while the learning
   events are two days old.
4. **Keep the Singapore crawler out:** find its user agent and IP range in Vercel's request
   logs and block or challenge it in the Vercel firewall, or add its user agent to
   `isAutomatedUserAgent`. *(Proposed as G8.)*
5. **Save the human segment** as a GA4 comparison and use it for any report covering dates
   before these fixes; past data can't be cleaned.
6. **Add a result count to `search`**, and fire it when the reader pauses *and* leaves the box
   or opens a result, not on every pause. *(Proposed as G9.)*
7. **Look at the first quiz.** Find out why half the people who start one never answer a
   question. *(Proposed as L10.)*
8. **Lean on search and LinkedIn**, and set data retention to 14 months (step 4) so the
   before-and-after stays visible.

With 345 people, treat any rate over fewer than ~30 people as a direction, not a measurement.
