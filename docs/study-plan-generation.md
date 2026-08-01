# Study Plan Generation

The study plan is a personalised daily schedule that tells you which concepts to practise each day. It works backwards from your target ready date, spaces revisits according to how well you know each concept, and adjusts its pacing status so you always know whether you're on track.

## Setting Up Your Plan

Open the study plan configuration panel and set two things:

| Setting | What it does |
|---|---|
| **Target ready date** | The date by which you want to have mastered all concepts. The plan uses this as its deadline. If the date passes, the plan falls back to your exam date; if that has also passed, it uses 30 days from today. |
| **Study strategy** | **All concepts equally** treats every concept the same. **Key concepts first** front-loads topics that carry more weight in the exam syllabus, so you build strength where the marks are. |

Quick-set presets (1 day, 1 week, 1 month, … 8 months before the exam) let you pick a target relative to the exam date without calculating it yourself.

Once you save a target date, the plan records today as the **plan start date**. Day numbering and pacing calculations use this start date for the lifetime of the plan.

## How the Plan Is Generated

### Step 1 — Classify every concept

Each concept is resolved to its current mastery state (New, Level 1, Level 2, Level 3, or Forgotten) after applying any time-based decay that may have accumulated since you last practised it. Concepts at Level 3 are **mastered**; everything else is **unmastered**.

A concept linked from more than one learning objective (Exam 7's "Reinsurance" appears under
both *Data Preparation* and *Reinsurance*, for example) is still one concept: it's scheduled
once, and the heaviest topic it belongs to owns it so *Key concepts first* prioritises it by
its biggest stake in the exam. Without that, the concept would get one independent pipeline
per topic and the two would interleave on the calendar — the plan would say "→ Level 2" on
one day, "→ Level 1" the next and "→ Level 3" the day after.

If every concept is already at Level 3, the plan enters **review mode** (see below).

### Step 2 — Sort unmastered concepts by priority

Unmastered concepts are sorted so the most at-risk ones come first:

```
Forgotten → Level 1 → Level 2 → New
```

Within each state, if you have chosen *Key concepts first*, concepts from high-weight syllabus topics are sorted before lower-weight ones. Otherwise, concepts within the same state are sorted alphabetically.

### Step 3 — Schedule each concept

The plan enforces spacing gaps that mirror the mastery state machine:

| Concept state | Earliest eligible session |
|---|---|
| New / Forgotten | Spread evenly across available days (up to 5 new introductions per day) |
| Level 1 | 1 day after the last correct answer |
| Level 2 | 2 days after the last correct answer |

For every brand-new or forgotten concept, the plan pre-schedules all three mastery stages so the full workload is visible from day one:

- **Day D** — Introduce the concept (New → Level 1)
- **Day D+1** — Reinforce (Level 1 → Level 2)
- **Day D+3** — Lock in mastery (Level 2 → Level 3)

The plan reserves 3 days at the end of the runway so the last-introduced concept has room to complete this three-stage pipeline before the target date.

#### Even daily load distribution

Each session (introduction or review) is counted toward a target daily load, computed as:

```
targetDailyLoad = ceil(totalRemainingSessions / daysRemaining)
```

Sessions are spread so that no day exceeds this target. A concept is assigned to the **earliest available day on or after its eligible date** that still has capacity, rather than always landing on the first eligible day.

**Example — convergence pile-up avoided**

You answered 20 Level 2 concepts correctly on the same day. Without spreading, all 20 would become eligible two days later and all pile onto a single study session.

With even distribution (61 days remaining):
```
totalRemainingSessions = 20    (one L2 → L3 stage each)
targetDailyLoad = ceil(20 / 61) = 1
```
Instead of 20 concepts on one day, the plan assigns one per day across 20 consecutive days — the same total work, but at a steady, manageable pace.

#### Proactive Level 3 maintenance reviews

Mastered (Level 3) concepts decay if left unreviewed for 30 days. The plan detects any Level 3 concept that will cross this threshold **before the target ready date** and pre-schedules a refresher review in advance.

The review is placed in a 7-day window ending the day before the concept would decay:

```
windowStart = daysUntilDecay - 7   (or today, whichever is later)
deadline    = daysUntilDecay - 1
```

**Example — single concept nearing decay**

You mastered "Duration" 27 days ago. It will decay in 3 days (on day 30).

```
daysUntilDecay = 3
windowStart    = max(0, 3 - 7) = today
deadline       = today + 2
```
A maintenance review is scheduled within the next two days. Answering it correctly resets the 30-day clock, so Duration stays Level 3 without any manual intervention.

**Example — concept with time to spare**

You mastered "Immunization" 20 days ago (decays in 10 days) and your target ready date is 61 days away.

```
daysUntilDecay = 10
windowStart    = today + 3    (10 - 7)
deadline       = today + 9
```
The plan schedules the refresher somewhere between days 3 and 9. You won't see it in today's list — it appears as a future assignment and surfaces naturally when its window opens.

**Example — concept safe until after the target date**

You mastered "Bond Price" today. It won't decay for 30 days, and your target ready date is also 30 days away. Because the decay date is on or after the target, no maintenance review is scheduled — the concept will still be Level 3 on the day that matters.

### Step 4 — Determine today's concepts

Today's concepts are the deduplicated list of everything scheduled for the current date. If you have already levelled up some concepts earlier in the day (in a prior quiz session), those levelled-up concepts are preserved at the top of the list. Fresh unlearned concepts fill remaining slots. This keeps the plan grounded in what you actually practised rather than replacing it with concepts you haven't touched yet.

## The "questions left today" badge

Once today's concepts are settled, the app answers one more question everywhere it can:
**how many questions until today's plan is done?** That number is the size of the quiz a
"Today's Plan" launch will actually contain — the fewest questions that cover every concept
still outstanding (`minQuestionsToCoverConcepts`, the same greedy cover the launch itself
uses), with concepts already levelled up today dropped so a re-launch after some wrong
answers only re-tests what's left.

The rule is that the badge appears on **every surface a quiz that would accomplish today's
plan can be started from** — a learner should never have to guess whether the button in
front of them is the one that finishes the day. Today that's:

| Surface | Scope |
|---|---|
| Quiz tab in the bottom nav / Quiz row in the sidebar | all active exams, summed |
| Sidebar exam pill + its **Start Quiz** menu item | that exam |
| Quiz tab exam cards (`Landing`) | that exam |
| Quiz tab **Start Quiz** button | that exam, and only when the picked count is sized to finish the plan |
| Dashboard **Start Today's Quiz** | the active exam |

Concept-scoped launches (a flashcard, a concept popup, the Search selection) deliberately
have no badge — they don't complete the plan.

- `lib/todayPlanCount.ts` is the pure, tested core: `todayPlanCountForExam` returns the
  count plus a `complete` flag, and `badgeCountFor` collapses that to what the badge should
  show (0 once the plan is done — a finished plan still has a re-launchable question count,
  but nothing left to nag about).
- `hooks/useTodayQuizCount.ts` assembles the per-exam study plans and exposes
  `useTodayQuizCounts()` → `{ byExam, total }`. Premium-only, same as Today's Plan itself.
- `components/TodayQuizBadge.tsx` is the shared look (orange, corner or inline variant).

**When you add a new way to start a plan-completing quiz, badge it** — pull the count from
the hook rather than recomputing it, so every surface keeps showing the same number.

## Fresh questions on a re-launch

The greedy cover is deterministic, so on its own a second launch of the same plan would hand
back the same questions. Two rules stop that:

1. Concepts already levelled up today are dropped from the selection, so a re-launch after
   some wrong answers only re-tests what's left. Once the whole plan is done, the selection
   falls back to the full plan so **Continue Studying** still has something to practise.
2. Every question today's quizzes have already served is held back from the draw
   (`CoverageOptions.seenIds` on `selectQuestionsForCoverage` /
   `minQuestionsToCoverConcepts`). Both the covering phase and the fill phase run over the
   unseen questions first, and only fall back to a repeat for a concept whose bank is
   exhausted for the day — better a repeat than dropping the concept.

The seen set is written by `quizStore` on quiz completion into the day-keyed
`actuarial_daily_answered_*` entry (`lib/dailyProgressStore.ts`) and read through
`hooks/useTodayAnsweredQuestions.ts`. It's device-local, like the rest of that module: a
second device starts from a clean slate, which at worst costs a repeat.

Because holding questions back can make the cover slightly larger (a seen question covering
three concepts may be replaced by two fresh ones), the badge passes the same seen set to
`todayPlanCountForExam` — the count and the quiz it launches are computed the same way.

## Pacing Status

The plan tells you how your pace compares to what's needed:

| Status | Meaning |
|---|---|
| **On track** | You're progressing at a rate that will get you to mastery by the target date |
| **Ahead** | You've mastered more than 15% beyond the expected fraction at this point in the plan |
| **Behind** | The remaining unmastered concepts can't all fit within the remaining days at the maximum rate of 5 new concepts per day |
| **Target passed** | Your target ready date has passed; the plan has fallen back to your exam date |
| **Review mode** | Every concept is at Level 3 — only spaced review remains |

## Review Mode

When all concepts are mastered, the plan switches to review mode. Any concept that will decay before the target ready date is flagged and scheduled for a maintenance review (using the same decay-window logic described above). Concepts expiring within 7 days appear in today's list immediately; those with more time appear as future assignments.

If no concepts are close to decaying, the plan falls back to surfacing the 5 concepts whose last correct answer is oldest, keeping fading memories refreshed without any manual configuration.

When not in review mode, the plan also surfaces a short list of up to 3 mastered concepts that are getting stale, in case you want to review them proactively before they decay.

## Caching and Cross-Device Sync

Once generated, the plan is frozen for the rest of the calendar day. This means your today's concepts list won't change mid-day just because you answer more questions — the plan stays stable so you know exactly what you're working toward.

The plan is stored in two places:

1. **Supabase** (cloud) — the authoritative copy, synced across all your devices in real time.
2. **localStorage** (browser) — an offline fallback so the plan loads instantly even without a network connection.

When you open the app on a different device, the cloud copy is used. When the cloud copy is missing or stale, the local copy is used and then pushed up so other devices converge on the same plan.

The plan is automatically rebuilt when:
- A new calendar day begins.
- You change the target ready date or study strategy.
- You tap **Regenerate** to force a fresh rebuild.

## Plan Version

The plan carries an internal version number. When the generation logic changes in a way that would produce materially different results, the version is bumped and all cached plans (local and server) are invalidated, forcing a clean rebuild on next load. You won't see stale plans after algorithm improvements.

## Relationship to Mastery

The study plan reads mastery state but does not write it. Mastery advances only when you answer questions correctly in a quiz session. The plan's job is to decide **when** to schedule each concept; the [concept learning progression](concept-learning-progression.md) decides **how far along** you are.

## Locking In a Plan: the Schedule-Forming Playback

Saving the study-plan configuration ("Lock in plan" in `StudyPlanConfigModal`) doesn't just
close the modal — the Dashboard's **Study Schedule card** then rewinds through the new
schedule. The day strip sweeps from exam day back to today while the day panel underneath
shows each day it passes and the concepts that day's plan schedules, landing on today with a
line reporting what was built ("Schedule locked in — *N* concepts across *M* study days").
The animation is the real card doing real work: the same strip, the same day panel, the same
"Planned for this day" list a user gets by tapping a future day.

**How the pieces fit**

- `StudyPlanConfigModal` emits `PLAN_LOCKED_EVENT` (`lib/planForming.ts`) on save and closes.
  The modal is opened from four places and none of them own the Study Schedule card, so the
  two are joined by an event rather than by threading a callback through every caller.
- `ReadinessCard` (which owns the card) listens for it, scrolls the card into view, waits a
  beat for the plan to regenerate, and starts the sweep. It renders the day the sweep is on
  rather than mirroring it into `selectedDay`, so the strip and the panel can never disagree
  by a frame and the sweep doesn't fire a level-up query for every day it passes.
- `hooks/useSchedulePlayback.ts` owns only the day cursor: which day the card is showing,
  whether the sweep has landed, and the summary to report. Under `prefers-reduced-motion` it
  skips the rewind and lands on today immediately.
- `ExamHeatmap` takes `playbackDay` and glides its strip to each new day (linear, finishing
  inside the beat so a day comes to rest before the next arrives). It collapses the expanded
  timeline for the duration without disturbing the user's stored preference, and the mark on
  the day the sweep just left fades out quickly behind it.

**The view-model** is `lib/planForming.ts` (pure, tested):

- `buildPlanFormingDays` inverts `plan.assignments` into one entry per calendar day — including
  the empty days and the tail of buffer days between the ready date and exam day, because the
  gaps are part of what the schedule looks like. Today's row comes from `plan.todaysConcepts`
  rather than the raw assignments, so it matches what the Dashboard shows. The strip is capped
  at `MAX_FORMING_DAYS` so an exam years out can't sweep forever.
- `buildFormingTimeline` decides when the sweep reaches each day. The whole rewind is held
  inside a fixed budget (`TOTAL_REVEAL_MS`) so a 3-week plan and a 6-month plan finish in
  roughly the same time, and days with nothing scheduled get a slightly shorter beat — plans
  usually *end* in a run of empty buffer days, which is where the sweep starts. The
  discount is deliberately mild: the strip has to travel to each new day, so a sharp speed-up
  over the buffer turns that travel into a jump.
- `formingIndexAt` maps elapsed time back to a day index, which is what the hook samples on
  each frame (throttled to `PLAYBACK_HOLD_MS`, so the days stay readable however fast the
  cursor is moving underneath).
