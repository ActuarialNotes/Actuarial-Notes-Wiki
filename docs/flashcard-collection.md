# Flashcard Collection

"Collecting" a concept is what puts its card in the learner's collection, and it
happens the first time the concept reaches **Level 1** — that is, its first
correct quiz answer (see [Concept Learning Progression](concept-learning-progression.md)).
There is no separate step: no comprehension check, no collect modal, no lock.

> **History.** Collection used to be a *gate*: a card had to pass a one-question
> comprehension check in a collect modal before its mastery could leave New,
> with lockouts for wrong answers, a pre-quiz gate listing locked concepts and
> a post-quiz gate for level-ups missed for want of collecting. All of that is
> gone — the first right answer is the proof of understanding the check was
> standing in for. The authored checks are still in the vault (see
> [The retired comprehension checks](#the-retired-comprehension-checks)).

## How it works

1. **Quiz.** A correct answer on a **New** concept promotes it to Level 1
   (`applyAnswer` in `lib/mastery.ts` — no `collected` flag any more).
2. **Collect.** When the quiz is written, `collectLevelledConcepts`
   (`stores/quizStore.ts`) walks the session's upward transitions. Every
   `new → level1` for a card the store doesn't already hold is collected
   (`useCollectedCards.collect`, which fires `COLLECTED_EVENT` and lights up the
   Flashcards nav), added to the deck (`useFlashcards.addCard`) and tracked
   (`concept_collected`). Its transition is marked `collected: true`. It runs on
   every write path that banks mastery: `completeQuiz` (guest and signed-in) and
   `recordReviewAnswers` (the Fix-Mistakes panel).
3. **Celebrate.** On `/review`, `ConceptLevelUpCeremony` plays the **collect
   animation** for each transition marked `collected`: the sealed card spins
   under "Collecting…", blooms into light on the `collect` chime, and settles
   back in on a "Collected!" beat before the next card. Other level-ups keep the
   ordinary level-up spin. The summary tags each collected concept with a
   **Collected** mark.

Nothing in the app withholds a feature from an uncollected concept — it can be
read, studied as a flashcard, listened to and quizzed like any other. Collecting
is simply what the first level-up looks like.

## Where collected cards are stored

`useCollectedCards` (the collected set) and `useFlashcards` (the deck and its
custom order) write to **localStorage first** — that's what keeps their API
synchronous, since `isCollected` / `hasCard` are called during render all over
the app. For a **signed-in** user those writes are also mirrored to Supabase
(`user_collected_cards`, `user_flashcards`) so the deck follows the learner
across devices; guests are localStorage-only, exactly as before.

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

Collected cards also self-heal on a device whose collected store is missing
them: the next time a concept past New moves up a level,
`collectLevelledConcepts` back-fills it *silently* (no nav glow, no ceremony —
the card isn't being won now). It costs nothing and covers the case where the
sync tables aren't reachable.

## What a collected card looks like

Collecting is the card's first *material*: a collected card wears the rainbow
**foil** edge (`.flashcard-collected` in `index.css`). Uncollected cards wear no
material at all — the foil is what collecting earns.

That edge is also the card's **mastery readout** — a collected card carries no
level label, so the border steps once per state
(`lib/flashcardFoil.ts` → `flashcardFoilClass`, the mapping every surface shares):

| State | Edge |
| --- | --- |
| New | the bare collected glint, no colour — the ladder hasn't started |
| Level 1 | a faint rainbow hairline (`.flashcard-sheen-l1`) |
| Level 2 | a static holographic border (`.flashcard-sheen-l2`) |
| Level 3 | a saturated, travelling foil border (`.flashcard-sheen-l3`) |
| Forgotten | **amber**, off the rainbow (`.flashcard-sheen-forgotten`) |

Forgotten leaves the ladder rather than sitting on a rung of it, for the same
reason the mastery badge does (`docs/style-guide.md` §4.1 — a decayed concept is
*at risk*, not an error, and must not read as an early card).

The border can't be spoken, so the deck card names its level twice invisibly: as
the flip button's `title` and as an `sr-only` span. Nothing is printed on the
card itself.

All three surfaces that draw a card use that same ladder, so one concept looks
like the same card wherever it appears:

| Surface | Where |
| --- | --- |
| Deck / gallery card | `SortableCard` in `pages/Flashcards.tsx` (the deck passes `animateCollected={false}` so the Level 3 border doesn't travel while you read) |
| Picker tile in the add-flashcards sheet | `ConceptCardGrid` → `tileFoilClass`, plus `.flashcard-tile` for the smaller surface: a lighter edge, and the ring lifted over the tile's own content |
| The card in the level-up ceremony | `components/collect/CollectCard3D.tsx` — a card being collected shows the Level 3 edge until it lands, so the sealed pack looks like the prize |

The edge belongs to foil, so nothing else may claim it: a keystone concept moves
its gold inside as an underline on the name, and a tile already in the deck
shows that as its green wash and tick rather than a second ring (see
`docs/style-guide.md` §4.3–4.4).

## Before the quiz: the concepts it introduces

When a quiz-mode session starts, `Quiz.tsx` collects the concepts its questions
link to that are currently **New** and, if there are any, shows
`components/PreQuizConcepts.tsx` *before* the first question — "New concepts in
this quiz", with a note that getting one right collects its card. Nothing on it
is locked and nothing needs doing: each row opens the concept in the **concept
popup** (`useConceptPopup.openAt`, over the list of the quiz's New concepts, so
Previous/Next walks them), the same split pane the study guide reads concepts
in, so the reader can look a concept over before the questions start. **Start
Quiz** proceeds.

The screen mounts its own `<ConceptPopup />` and closes the popup when it
unmounts: left open, the store would pop it back up over the next page that
mounts one (the results screen does). The quiz's keyboard shortcuts are off
while it is up, so the popup's arrows and Esc don't reach a hidden question.

It only appears:

- in ordinary **quiz** mode (never a practice exam / past paper),
- at the very start of the session (before any answer), and
- once mastery has loaded, so the New classification is accurate (the page
  holds its spinner until then rather than flashing the first question).

### Today's-plan highlight

A quiz usually covers more concepts than today's study plan asks for, so the
list marks the rows that actually move the plan forward: a concept that is in
today's plan wears the travelling **rainbow foil border**
(`.plan-foil-ring` in `index.css` — the same material as the L3 flashcard), and the card's subtitle gains a legend.

The plan is read by `hooks/useTodayPlanConcepts.ts`, which resolves the
syllabus for the quiz's exam (derived from the questions' `exam` label via
`TOPIC_TO_EXAM_ID`) and reduces its plan to the lower-cased key set
`planConceptKeys` builds (`lib/planCompletion.ts`). That helper keys an aliased
syllabus link under *both* its display name and its raw target, because the
plan schedules `[[Bond Price|Price]]` as "Price" while the list holds the
`slugForLink` slug "Bond Price". Exams with no configured plan simply get no
highlight — the list is unchanged.

## The retired comprehension checks

The authored checks are still in the vault — `comprehension-checks/<exam-id>/<Concept Name>.md`,
one file per concept (frontmatter `concept`, `exam`, `topic`, `correct` plus a
`- A) …` option list and an authoring-only `<!-- rationale -->` comment) — along
with their parser (`lib/comprehensionCheckParser.ts`), its corpus test and
`data/comprehensionChecks.ts`. **Nothing renders them.** They are kept the way
the unrendered `Guides/` tips are, so the content stays valid if a surface for
it comes back; with no importer, Vite leaves the `virtual:comprehension-checks`
module out of the bundle. Deleting the folder, the parser and the
`flashcard-comprehension-check` skill is a follow-up decision, not something
this change made.
