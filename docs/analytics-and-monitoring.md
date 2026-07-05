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

Every event flows through one typed sink, `track(event, params)`.
`AnalyticsEventMap` is the single source of truth for the event catalogue and
each event's param shape, so a wrong/missing param is a compile error. Events
currently land in GA4 (`window.gtag`); swapping in PostHog is a one-file change.

Two families:

- **Engagement** (fire every time): `quiz_started`, `question_answered`,
  `quiz_completed`, `flashcard_reviewed`, `search_query`, `upgrade_clicked`.
- **Activation funnel** (fire at most once per device): `signup → first_quiz →
  first_correct → concept_collected → day2_return`.

### The activation funnel

The "fire once" gating lives in `quiz/src/lib/funnel.ts` (pure, localStorage-
backed, unit-tested). Call sites:

| Event | Fires from | Gate |
|-------|-----------|------|
| `signup` | `Auth.tsx`, on signup success | once per account (the action) |
| `first_quiz` | `Quiz.tsx`, when a quiz starts | `reachMilestone` (once/device) |
| `first_correct` | `Quiz.tsx`, on first correct answer | `reachMilestone` |
| `concept_collected` | `CollectConceptModal.tsx`, on collect | `reachMilestone` |
| `day2_return` | `main.tsx`, on boot | `recordVisitAndCheckDay2` (once/device) |

`day2_return` fires the first time a user opens the app on a **later calendar
day** than their first-ever visit — the D1 return signal.

### Adding an event

1. Add it to `AnalyticsEventMap` with its param type.
2. Call `track('my_event', { … })`, or add a named `trackMyEvent(…)` wrapper.
3. For a once-per-device milestone, gate it with `reachMilestone(...)` from
   `funnel.ts` (add the milestone name to `FunnelMilestone`).
