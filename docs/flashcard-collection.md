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
   concept is recorded as collected (`useCollectedCards`, localStorage) and added
   to the flashcard gallery.

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

## Open tasks

- **TODO — better comprehension questions.** The current check is a
  "which concept does this describe?" multiple-choice built from the concept's own
  definition (name masked) plus sibling-concept distractors. This is too easy:
  the answer is essentially the card title shown above the prompt. This needs its
  own task — likely a dedicated **skill** that authors/generates a genuine
  conceptual question per concept (stored alongside the content, similar to
  `data/mnemonics.ts`) rather than deriving it from the definition at runtime.
  Until then the gate still works; only the question quality is weak.
- **TODO — collect-then-quiz flow.** In the daily quiz / study plan, a New
  concept should present its comprehension check *first* (to unlock), then its
  quiz questions. Tracked as a follow-up to the mastery-gate change.
