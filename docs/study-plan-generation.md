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

### Step 4 — Determine today's concepts

Today's concepts are the deduplicated list of everything scheduled for the current date. If you have already levelled up some concepts earlier in the day (in a prior quiz session), those levelled-up concepts are preserved at the top of the list. Fresh unlearned concepts fill remaining slots. This keeps the plan grounded in what you actually practised rather than replacing it with concepts you haven't touched yet.

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

When all concepts are mastered, the plan switches to review mode. It picks the 5 concepts whose last correct answer is oldest and makes those today's concepts. This keeps fading memories refreshed without requiring any manual configuration.

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
