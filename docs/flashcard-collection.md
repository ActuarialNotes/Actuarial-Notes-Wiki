# Flashcard Collection

"Collecting" a concept is the first **active-learning** step. A concept must be
collected before its mastery can advance past **New** — collection is the gate to
Level 1 (see [Concept Learning Progression](concept-learning-progression.md)).

## How it works

1. A **lock icon** sits beside the concept name (before the play/action button)
   in the concept popup, and in the Flashcards pack shop.
2. Clicking it opens the **collect modal**: a 3D flashcard render plus a quick
   **comprehension check**.
3. Passing the check **collects** the concept — a card-spin → screen-bloom →
   distilled-drop animation flies into and lights up the Flashcards tab. The
   concept is recorded as collected (`useCollectedCards`) and added to the
   flashcard gallery.

## Where collected cards are stored

`useCollectedCards` (the collected set) and `useFlashcards` (the deck, its
custom order and the saved packs) write to **localStorage first** — that's what
keeps their API synchronous, since `isCollected` / `hasCard` are called during
render all over the app. For a **signed-in** user those writes are also mirrored
to Supabase (`user_collected_cards`, `user_flashcards`, `user_flashcard_packs`)
so the deck follows the learner across devices; guests are localStorage-only,
exactly as before.

`lib/flashcardSync.ts` is the store-agnostic half (pure merges + the Supabase
reads/writes) and `hooks/useFlashcardSync.ts` the orchestrator, mounted once at
the app root as `components/FlashcardSync.tsx`. Three things are worth knowing
before changing it:

- **Row per card, not a JSONB blob.** A deck is a set, and two devices adding
  different cards have to converge instead of the last writer clobbering the
  other.
- **Union once, then the server wins.** The first time a user hydrates on a
  given device the local state is *unioned* into the server's, so work done as a
  guest survives signing in. After that the server is the source of truth for
  that device — a permanent union would resurrect every card deleted elsewhere.
  The `actuarial_flashcard_sync_user` marker distinguishes the two, and is keyed
  by user id so signing in as someone else never merges the previous account's
  cards into theirs.
- **Writes are debounced and fire-and-forget.** A failed sync never surfaces in
  the UI; the local store is already updated and the next mutation or hydrate
  re-pushes. Pending writes are flushed on sign-out and on `pagehide`, and a
  server refresh is skipped while writes are still queued so it can't revert a
  change the user just made.

Before this existed, collected cards partly self-healed on a new device: the
collect modal back-fills the local store for any concept whose (server-synced)
mastery is past New. That back-fill is still there — it costs nothing and covers
the case where the sync tables aren't reachable — but it is no longer the only
thing carrying collection state across devices.

## Mastery gate

`applyAnswer` (in `lib/mastery.ts`) takes a `collected` flag. For a **New**
concept a correct answer only promotes it to Level 1 when `collected` is true;
otherwise it stays New while still accumulating `correct_count`, so progress is
never lost. Previously-learned concepts (Level 1+, or Forgotten) are unaffected —
they were already collected, so existing users are grandfathered in. The flag is
read from the collected store in the three quiz write paths (`quizStore`
upsert + optimistic simulation, and `Quiz.tsx`'s level-up preview).

Users can still add packs to the gallery and quiz uncollected concepts — they
just won't reach Level 1 until they collect.

## Collect-then-quiz flow (daily quiz)

Because a **New** concept only advances to Level 1 once collected, the quiz
itself prompts for collection up front. When a quiz-mode session starts,
`Quiz.tsx` inspects the concepts referenced by its questions and, for any that
are currently **New** and **uncollected**, shows the `PreQuizCollectGate`
(`components/collect/PreQuizCollectGate.tsx`) *before* the first question. Each
listed concept has a **Collect** button that opens the shared
`CollectConceptModal`; collected concepts flip to a checkmark. A **Start Quiz**
button proceeds into the questions.

The gate is intentionally a *soft* prompt — the user can start without
collecting (uncollected concepts still won't pass New until collected, matching
the mastery gate). It only appears:

- in ordinary **quiz** mode (never a mock exam),
- at the very start of the session (before any answer), and
- once mastery has loaded, so the New/collected classification is accurate.

Concepts already collected or already past New (grandfathered users) never
appear, so a single-concept quiz launched from an already-collected concept
shows no gate.

### Today's-plan highlight

A quiz usually covers more concepts than today's study plan asks for, so the
gate marks the rows that actually move the plan forward: an uncollected concept
that is in today's plan wears the travelling **rainbow foil border**
(`.plan-foil-ring` in `index.css` — the same material as the L3 flashcard and
the concept popup's collect icon), and the card gains a one-line legend.

The plan is read by `hooks/useTodayPlanConcepts.ts`, which resolves the
syllabus for the quiz's exam (derived from the questions' `exam` label via
`TOPIC_TO_EXAM_ID`) and reduces its plan to the lower-cased key set
`planConceptKeys` builds (`lib/planCompletion.ts`). That helper keys an aliased
syllabus link under *both* its display name and its raw target, because the
plan schedules `[[Bond Price|Price]]` as "Price" while the gate holds the
`slugForLink` slug "Bond Price". Exams with no configured plan simply get no
highlight — the gate is unchanged.

## Where the comprehension checks live

The authored checks are markdown, **one file per concept**, under
`comprehension-checks/<exam-id>/<Concept Name>.md` at the repo root — edited like
the question bank (`questions/<exam-id>/*.md`) rather than as a TS object. Each
file is YAML frontmatter (`concept`, `exam`, `topic`, `correct` letter) plus a
`- A) …` option list, and an authoring-only `<!-- rationale -->` comment naming
the misconception each distractor targets:

```markdown
---
concept: Axioms of Probability
exam: exam-p
topic: General Probability
correct: A
---
Which statement is NOT one of the three axioms of probability?

- A) For any two events, P(A ∪ B) = P(A) + P(B)
- B) P(S) = 1 for the sample space S
- C) P(E) ≥ 0 for every event E
- D) For disjoint events, P(A ∪ B) = P(A) + P(B)

<!-- rationale: 0: correct — additivity holds only for disjoint events · … -->
```

Vite bundles them at build time via the `virtual:comprehension-checks` module
(`vite.config.ts`), `lib/comprehensionCheckParser.ts` parses them, and
`data/comprehensionChecks.ts` exposes the concept-keyed `COMPREHENSION_CHECKS`
lookup the modal reads — the same public API as before. A corpus test
(`comprehensionCheckParser.test.ts`) validates every file (4 options, in-range
`correct`, concept name matches filename, correct answer isn't the concept name),
recovering the compile-time guarantees the old TS constant gave.

Stems and options render through `MarkdownText`, so authored **LaTeX** (`$…$`)
displays as KaTeX rather than literal dollar signs. That makes `$` a math
delimiter, so **currency has to be escaped** (`\$900,000`) — two bare currency
signs on a line would otherwise turn the prose between them into a formula. The
corpus test enforces this and the matching authoring rule that inline math never
opens on a bare digit.

The `flashcard-comprehension-check` skill authors these; its output target is a
new `.md` file in the right exam folder.

## Open tasks

- **TODO — better comprehension questions.** The *fallback* check (for a concept
  with no authored file) is still a "which concept does this describe?"
  multiple-choice built from the concept's own definition (name masked) plus
  sibling-concept distractors, which is too easy — the answer is essentially the
  card title. Authored `.md` checks supersede it per concept; the remaining work
  is content, not storage: keep authoring genuine conceptual checks (via the
  `flashcard-comprehension-check` skill) to retire the fallback.
- ~~**move the checks out of one big TS file.**~~ Done — the checks are now
  per-concept markdown under `comprehension-checks/` (see "Where the comprehension
  checks live" above).
- ~~**collect-then-quiz flow.**~~ Done — see "Collect-then-quiz flow" above.
  The daily quiz now surfaces a collection prompt for its New, uncollected
  concepts before the questions.
