# Analytics & error monitoring (P0.3 / P0.4)

The instrument panel the roadmap's later phases are judged against. Read this
before adding an analytics event or touching error capture.

## Error monitoring (P0.3) — `quiz/src/lib/errorMonitoring.ts`

A dependency-free capture layer. Any thrown value is normalized to
`{ name, message, stack }` and fanned out to a list of *sinks*:

- **console sink** — always on; logs `[error-monitoring] …` in the browser.
- **GA4 `exception` sink** — always on; sends a GA4 `exception` event
  (`description`, `fatal`) via the existing `gtag` (see `analytics.ts`).
- **beacon sink** — on only when `VITE_ERROR_ENDPOINT` is set; `sendBeacon`-POSTs
  the error JSON to a collector (a Sentry tunnel or any custom endpoint).

Wiring is done once at boot: `main.tsx` calls `initErrorMonitoring()` before the
first render, which registers the default sinks and installs global
`error` + `unhandledrejection` listeners. Unhandled Supabase failures surface as
rejected promises, so they're caught there. The React `ErrorBoundary` in
`App.tsx` also calls `captureError(error, { source: 'error-boundary', … })`.

Identical errors are collapsed within a 5s window (`shouldReport`) so a render
loop can't flood the collector. Source maps are emitted by the Vite build
(`vite.config.ts` → `build.sourcemap: true`) so captured stacks map to source.

**To wire a full SDK later** (e.g. Sentry), register one more sink — no core
change needed:

```ts
import { registerErrorSink } from '@/lib/errorMonitoring'
registerErrorSink((err, ctx) => Sentry.captureException(new Error(err.message), { extra: ctx }))
```

## Product analytics (P0.4) — `quiz/src/lib/analytics.ts`

The point of the analytics is to learn how **people** study with the app. Two
modules hold it: `lib/analyticsPolicy.ts` (pure, tested: who is measured, how a
page is named, what a URL may carry) and `lib/analytics.ts` (the event catalogue,
the `track()` sink and everything that talks to `gtag`). Events land in GA4,
stream `G-YTVSN1NTV9`.

### Who is measured

Google Analytics is **not** in `index.html`. `initAnalytics()` runs in `main.tsx`
before the first render, asks `decideMeasurement`, and only on a measured visit
defines `gtag`, sets consent, configures the tag and loads `gtag.js`. On any other
visit `gtag` stays undefined and every `track*` call is a no-op. Kept out:

| Visit | Why it isn't counted |
|-------|----------------------|
| `localhost`, `vite preview` (the e2e suite), `*.vercel.app` previews | only `quiz.actuarialnotes.com` is measured (`MEASURED_HOSTS`) |
| Playwright, Puppeteer, Selenium | `navigator.webdriver === true` |
| Crawlers, Lighthouse, headless Chrome, uptime checks, link previewers | user agent (`isAutomatedUserAgent`) — GA4 drops the IAB's known bots server-side too; this catches what runs our JavaScript anyway |
| A reader who switched it off | Settings → Privacy → Usage analytics (`setAnalyticsOptOut`) |

What is left is **labelled**, not dropped:

- **Internal** — the team's own devices send `traffic_type: 'internal'`, which GA4's
  *Internal Traffic* data filter keys on. A device becomes internal by opening any
  page with `?internal=1` (`?internal=0` undoes it), or by signing in as an account in
  `INTERNAL_TRAFFIC_EMAILS` — the email is compared on the device and never sent.
- **Debug** — `?ga_debug=1` sends `debug_mode` for the rest of the tab, so the session
  shows in GA4's DebugView. It also measures a non-production host, which is how a
  preview build is checked. Automation and the opt-out still win.

Expect the numbers to drop when this ships. Some of that is noise leaving (the dev
server, previews, the e2e suite, double-counted page views, filter clicks counted as
visits); some is visitors who leave before the app's bundle runs, who were counted
before and never saw a page.

### Page views

The tag is configured with `send_page_view: false`; `usePageTracking` sends every
page view itself, the first included, through `trackPageView`:

- **One per page the reader settles on.** An address must stand 250 ms, so a redirect
  (a gated route, a concept link sent on to its study guide) counts where the reader
  landed, not where they bounced from.
- **A new path is a page view; a new query string only if the reader went there**
  (a link, Back). A page rewriting its own query in place (`REPLACE`: the resource
  shelf's and Store's filters, the flashcard deck's view) is not — `isNewPageView`.
- **The URL is cleaned** (`pageLocation`): no fragment, no auth codes or tokens, no
  `internal`/`ga_debug` switches, emails and long numbers redacted. `utm_*` and `gclid`
  stay — they are how GA4 attributes the visit.
- **`content_group`** names the section of the app (`contentGroup`: Quiz builder, Quiz,
  Study guides, Concepts, Resources, Flashcards, Dashboard, Store…) — GA4's built-in
  *Content group* dimension, the way to read the Pages report a tab at a time.
- **`page_referrer`** is the previous page in the app; the first page view leaves it to
  GA4, which reads `document.referrer` for the visit's source.

### Who the reader is

`AnalyticsTracker` (mounted once inside the auth and exam-progress providers) keeps
GA4 told:

- **`user_id`** — the Supabase account id, an opaque UUID (never the email, which
  Google's terms forbid). One person on a phone and a laptop is one user. `main.tsx`
  sets it from the restored session before the first page view; `Auth.tsx` sets it
  before `login`.
- **User properties** — `account_type` (`guest` / `free` / `pro`), `credential_track`
  (`DEFAULT`, `ASA`, `ACAS`, `FSA`, `FCAS`) and `theme`. Only changed values are sent.

### The human signal

`first_interaction` fires once per page load on the first **trusted** pointer, key,
touch or wheel input (`event.isTrusted` — a script's `dispatchEvent` doesn't count),
with `input_type` and `seconds_to_interaction`. A session with one had a person in it.
Build a segment (*Sessions → include → event `first_interaction`*) and compare it with
all sessions; the gap is what was loaded but never used.

### The event catalogue

`AnalyticsEventMap` is the single source of truth for every event and its params, so
a wrong or missing param is a compile error. `track()` cuts string params to GA4's
limits (`fitParams`: 100 characters; page params longer).

| Family | Events |
|--------|--------|
| Pages & people | `page_view`, `first_interaction` |
| Reading — no URL of their own | `content_view` (`content_type`, `content_name`, `surface`: `popup` for the concept popup's open page, `reader` for the PDF reader), `search` (GA4's recommended event: `search_term`, `search_scope`) |
| Studying | `quiz_started`, `question_answered`, `quiz_completed`, `flashcard_reviewed`, `search_query` (a quiz built on the Search page), `battle_started` (`format`: `same_screen` / `room_host` / `room_guest` / `matched`), `project_started` |
| Gamification | `streak_extended`, `xp_earned`, `daily_goal_met`, `quest_completed`, `quest_claimed`, `daily_quests_cleared`, `league_joined`, `league_left` |
| Money & accounts | `upgrade_clicked`, `store_outbound_clicked` (product, seller, aisle — docs/store.md), `login`, `sign_up` |
| Reliability | `exception` (from `errorMonitoring.ts`) |
| Activation funnel | `sign_up → first_quiz → first_correct → concept_collected → day2_return` |

`search` comes from `hooks/useSearchTracking.ts`, mounted on every search box
(`FloatingSearchInput` — the wiki, Dashboard, Flashcards and Cowork bars — the quiz
builder's search and the Search page). It fires once per term after the reader stops
typing for 1.5 s, lower-cased and redacted; its scope is the page's content group.
What readers look for and don't find is the content backlog.

`sign_up` was `signup` before GA4's recommended name was adopted: a key event or
exploration built on `signup` must be moved to `sign_up`.

### The activation funnel

The "fire once" gating lives in `quiz/src/lib/funnel.ts` (pure, localStorage-
backed, unit-tested). Call sites:

| Event | Fires from | Gate |
|-------|-----------|------|
| `sign_up` | `Auth.tsx`, on signup success | once per account (the action) |
| `first_quiz` | `Quiz.tsx`, when a quiz starts | `reachMilestone` (once/device) |
| `first_correct` | `Quiz.tsx`, on first correct answer | `reachMilestone` |
| `concept_collected` | `stores/quizStore.ts` (`collectLevelledConcepts`), when a concept's first Level 1 collects its card | `reachMilestone` |
| `day2_return` | `main.tsx`, on boot | `recordVisitAndCheckDay2` (once/device) |

`day2_return` fires the first time a user opens the app on a **later calendar
day** than their first-ever visit — the D1 return signal.

### Privacy

- **Consent mode** defaults are set before the tag is configured: `ad_storage`,
  `ad_user_data` and `ad_personalization` denied everywhere (the app has no ads),
  `analytics_storage` granted until the reader switches analytics off.
- **Google signals and ad personalisation are off** in the tag config. Signals turns
  on data *thresholding*, which hides rows from reports in a property this size.
- **The opt-out** (Settings → Privacy) is per device: it sets `ga-disable-<ID>`,
  updates consent to denied, stops `track()`, removes the interaction listener and
  deletes the `_ga` cookies. Switching it back on resumes the tag, or starts it.
- **No personal data**: no emails (redacted from URLs and search terms), no names;
  `user_id` is an opaque id.
- Not done: a consent banner. Visitors in the EEA/UK are measured on these defaults;
  strict GDPR compliance would need their `analytics_storage` to default to denied
  until they accept one.

### Setting up the GA4 property

Several of these must be done in GA4 itself — the code can't:

1. **Admin → Data streams → (web) → Enhanced measurement → Page views → Show
   advanced settings → untick "Page changes based on browser history events".**
   The app sends its own page views; left on, every in-app navigation counts twice.
   Keep scrolls, outbound clicks and file downloads; *form interactions* is noise
   here and can go.
2. **Admin → Data filters**: set *Internal Traffic* (`traffic_type = internal`) to
   **Active**, and create a *Developer Traffic* filter, also Active, so DebugView
   sessions stay out of reports. Then open `https://quiz.actuarialnotes.com/?internal=1`
   once on each of your devices.
3. **Admin → Data streams → Configure tag settings → List unwanted referrals**:
   `checkout.stripe.com` and `supabase.co`, so a return from Stripe checkout or an
   email-confirmation link doesn't start a new session sourced to them.
4. **Admin → Data retention → 14 months** (the default is 2, which empties
   explorations of anything older).
5. **Admin → Custom definitions**, so the params show in reports — event-scoped:
   `content_type`, `content_name`, `surface`, `search_scope`, `input_type`, `mode`,
   `exam`, `format`, `project`, `language`, `product`, `seller`, `aisle`, `concept`;
   user-scoped: `account_type`, `credential_track`, `theme`; custom metric:
   `seconds_to_interaction` (seconds).
6. **Admin → Key events**: `sign_up` (re-mark it if `signup` was one), `first_quiz`,
   `quiz_completed`, `day2_return`, `upgrade_clicked`.
7. **Admin → Reporting identity → Observed** (user id, then device).
8. Check it works: open `https://quiz.actuarialnotes.com/?ga_debug=1` and watch
   **Admin → DebugView**.

### Adding an event

1. Add it to `AnalyticsEventMap` with its param type.
2. Call `track('my_event', { … })`, or add a named `trackMyEvent(…)` wrapper.
3. For a once-per-device milestone, gate it with `reachMilestone(...)` from
   `funnel.ts` (add the milestone name to `FunnelMilestone`).
4. No personal data in a param — free text goes through `redactPii`. Register any
   param a report needs as a custom dimension (above).
