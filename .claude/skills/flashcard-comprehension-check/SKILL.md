---
name: flashcard-comprehension-check
description: Write the single "quick comprehension check" question that gates flashcard collection in Actuarial Notes — the question shown in the "Collect this flashcard" modal (`quiz/src/components/collect/CollectConceptModal.tsx`) before a concept card can be added to the user's deck. Use this skill whenever the user asks for a comprehension check, quiz question, gate question, or "quick check" for a specific concept, or mentions writing questions for the flashcard collection flow, even if they just name a concept ("write a comprehension check for Bayes Theorem," "quiz question for the Poisson flashcard"). The defining requirement: the correct answer must never be the concept's own name or a restatement of its definition — someone who only recognizes the term, without understanding it, should not be able to guess correctly. Do not use this skill for full study guides or exam-style question banks — those belong in `questions/<exam-id>/*.md` following the frontmatter format described in `CLAUDE.md`, not this modal.
---

# Flashcard Comprehension Check Generator

## Why this exists

Today the collect modal builds its check at runtime by masking the concept's
own name out of the first paragraph of its `Concepts/*.md` page and asking
"which concept does this describe?", with the concept's real name as one of
the four options (`extractDefinition`/`maskDefinition`/`handleAnswer` in
`CollectConceptModal.tsx`). That's not a comprehension check — it's a
matching exercise: the answer is the card title the user is already looking
at. This is a known, documented gap — see the "TODO — better comprehension
questions" item in `docs/flashcard-collection.md`, which calls for exactly
what this skill produces: an authored question per concept, stored as data
rather than derived from the definition at runtime. A question at this
skill's target level should be un-guessable by someone who has only glanced
at the card's title.

## The core rule

**The correct answer can never be the concept's own name, nor a close
paraphrase of its dictionary definition.** If a learner could answer
correctly by matching the visible flashcard title to a quoted definition,
without understanding either one, the question has failed — no matter how
the UI dresses it up.

## The fork principle

Every good version of this question is built around a fork: a point where
someone who truly understands the concept and someone who holds one
specific, common misconception about it would give different answers. Find
that fork before writing anything else:

1. State the concept's core definition or formula in one sentence (pull this
   from the concept's own page, e.g. `Concepts/Bayes Theorem.md`, so it stays
   consistent with what the wiki actually teaches).
2. List one to three things a half-informed learner would substitute for it
   — a sibling formula, a superficially similar assumption, a term one step
   removed, a classic reversed relationship (numerator/denominator,
   doubles/halves). Related concept pages and `[[wiki-links]]` on the page
   are a good source of plausible lookalikes.
3. Build the question stem around the exact scenario where the real
   definition and the misconception produce different answers.

If step 2 comes up empty — the concept has no natural lookalike — it's
usually a sign to switch to a calculation-style question instead (see below)
rather than force a distinction that isn't there.

## Choosing the right shape

Not every concept wants the same kind of fork. Match the shape to what the
concept actually is:

- **Quantitative / ratio concepts** (rates, formulas with a numerator and
  denominator — e.g. `Frequency`, `Severity`, `Loss Ratio`): build a short
  scenario with clean, mental-math-friendly numbers, and ask what happens to
  the value — not what the value equals in the abstract. Changing one input
  while holding another fixed is usually the fastest way to force real use
  of the formula.
- **Foundational / definitional concepts** that get confused with a
  related-but-distinct idea (an outcome vs. an event, a parameter vs. a
  statistic, an assumption vs. a conclusion): ask which of several plausible
  items is NOT actually an instance of the concept, or IS the concept when
  the others merely sound like it.
- **Framework / methodology concepts** (models, methods, procedures — e.g.
  `Generalized Linear Model`): contrast the concept against the simpler or
  more familiar thing it extends or replaces. The fork is usually "which
  assumption does this drop or add relative to the thing it's generalizing?"

## Distractor design

Each of the three wrong answers should map to one specific, realistic
misconception — not just be "obviously wrong." Reliable sources of good
distractors:

- Confusing a rate with a raw count (or flipping numerator and denominator)
- Confusing an outcome with an event, or an element with a subset
- Carrying over an assumption from the simpler "parent" concept that this
  concept specifically relaxes or drops
- Reversing a direction (doubles instead of halves, increases instead of
  decreases)
- Reaching for the adjacent term that shares a category but not a
  definition (e.g. a sibling metric that's paired with this one in the same
  formula)

A distractor that no one would ever actually pick isn't pulling its weight
— replace it.

## Format checklist

Run every draft against this before finalizing:

- The stem reads in under about three sentences — it has to fit comfortably
  inside a modal, not a full exam page.
- Any calculation uses clean numbers a learner can do in their head.
- There is exactly one unambiguously correct answer.
- The concept's own name does not appear in any answer choice.
- Every distractor targets a specific, nameable misconception (write that
  misconception down even if it doesn't ship in the UI — it's the fastest
  way to catch a lazy distractor).
- **The test**: could someone answer correctly just by staring at the
  flashcard's title and matching it to a quoted definition, without
  understanding either? If yes, rewrite.

## Output format

This data doesn't exist yet in the repo — `docs/flashcard-collection.md`
calls for it to be "stored alongside the content, similar to
`data/mnemonics.ts`." Follow that pattern: a `Record` keyed by concept name
in `quiz/src/data/comprehensionChecks.ts` (create the file if it isn't there
yet), matching the plain, no-brackets key style `mnemonics.ts` already uses
(`'Bayes Theorem'`, `'Sample Space'`, not `'[[Bayes Theorem]]'`). The key
must exactly match the concept's display name — i.e. its `Concepts/*.md`
filename without the extension — so it lines up with `allConceptNames` in
`CollectConceptModal.tsx` and the `concept.name` values from
`useWikiSyllabus`.

```ts
export interface ComprehensionCheck {
  /** Stem shown in the collect modal — keep it to ~3 sentences. */
  question: string
  /** Exactly 4 options, in a fixed canonical order. The concept's own name
   *  must never appear here — the UI is free to shuffle at render time. */
  options: string[]
  /** Index into `options` of the correct answer. */
  correctIndex: number
}

export const COMPREHENSION_CHECKS: Record<string, ComprehensionCheck> = {
  'Concept Name': {
    question: '...',
    options: ['...', '...', '...', '...'],
    correctIndex: 0,
  },
}
```

Put one short comment line above each entry's `options` listing what
misconception each wrong option targets (see worked examples below) — it's
documentation for future maintainers, not runtime data, so it costs nothing
and stops lazy distractors from creeping back in during edits.

Wiring `COMPREHENSION_CHECKS` into `CollectConceptModal.tsx` (replacing the
current `maskDefinition`/`allConceptNames`-based question) is a separate
implementation task, not something this skill does on its own — only touch
that component if the user explicitly asks you to wire the new questions in.

## Worked examples

**Frequency** (quantitative/ratio shape)

```ts
'Frequency': {
  question:
    "This year, an insurer records 1,000 claims over 10,000 car-years of " +
    "exposure. Next year, exposure grows to 20,000 car-years while claims " +
    "stay at exactly 1,000. What happens to frequency?",
  options: [
    "It doubles, from 0.10 to 0.20",          // inverts exposure/frequency relationship
    "It's cut in half, from 0.10 to 0.05",    // correct
    "It stays at 0.10, since the claim count didn't change", // treats frequency as a count, not a rate
    "It can't be determined without severity", // confuses frequency with pure premium
  ],
  correctIndex: 1,
},
```

**Sample Space** (foundational/definitional shape)

```ts
'Sample Space': {
  question:
    "A fair die is rolled once, and the outcome is defined as the number " +
    "of pips shown. Which of the following is NOT an element of the " +
    "sample space?",
  options: [
    "4",
    "6",
    "1",
    "\"Rolling an even number\"", // confuses an event (a subset of the sample space) with an outcome (a single element)
  ],
  correctIndex: 3,
},
```

**Generalized Linear Model** (framework/methodology shape)

```ts
'Generalized Linear Model': {
  question: "Which of the following is NOT required to specify a GLM?",
  options: [
    "A response distribution from the exponential family",
    "A link function connecting the mean to the linear predictor",
    "A linear predictor built from the covariates",
    "An assumption that variance is constant across observations", // carries over OLS's homoscedasticity assumption, which GLMs specifically relax
  ],
  correctIndex: 3,
},
```

## When you're stuck

If a concept genuinely resists both a calculation and a clean misconception
trap, it's fine to fall back to an Understand-level "why" question (why is
it defined this way, what does it prevent) rather than force a fork that
isn't there — but try the fork first. Most concepts have one.

Per `CLAUDE.md`, this content is AI-assisted, not AI-final — present new or
changed entries for the user to review before treating them as done.
