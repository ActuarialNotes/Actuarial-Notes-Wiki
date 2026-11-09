# Writing for readers

The one set of rules for every word a person reads from this project: the app's screens,
its emails and server errors, the AI connector's descriptions, Fact Check findings, and
the vault's own prose (concept pages, explanations, resource pages, guides). It was written
from the UI copy review (`docs/ui-copy-review.md`, 2026-11-08) and the maintainer's
decisions on it.

Each skill that writes for readers points here and adds only what is particular to its kind
of text. App copy has its own skill, `.claude/skills/app-copy/`, which holds the glossary of
the app's nouns and **the decisions log; that log outranks this page** when the two disagree.
Text transcribed from someone else (a past paper, a syllabus, a seller's page, a review) is
copied as written and is outside these rules.

## The voice

One person who knows the material, talking to a candidate across a desk: plain, specific,
a little dry, never selling harder than the thing deserves.

## Rules for all reader-facing text

1. **Every sentence is a claim. Check it.** Before keeping or writing a sentence, check it
   against the code, the source or the data. Copy that promises more than the thing does
   breaks the vault's first rule, nothing invented. A tooltip describes what happens, not
   what was planned.
2. **Never hand-type a list of what is covered.** Lists of exams, features and counts go
   stale. Derive them (`examStatus`, `scripts/exam_catalog.json`, the constants), or leave
   them out.
3. **One thing, one name.** Use the app's nouns exactly as the glossary in `app-copy` spells
   them. A synonym makes the reader wonder whether it is a second thing.
4. **No code words.** Gate and engine vocabulary ("reach", "tagged", "cycle", "the engine",
   a tool's call name, a field key, an environment variable) never reaches a reader.
5. **Things don't act like people.** A quiz doesn't "live" in a browser, progress doesn't
   "come with you", a catalogue doesn't "carry" a document, a boss isn't "using" anything.
   Say what is stored, where, and what the reader can do about it.
6. **The reader's things are theirs.** Say "your results", not "this quiz". Talk to the
   reader, not about the system.
7. **Say it once.** One sentence that states the fact does the job. Don't follow it with a
   second sentence that says the same thing with more feeling, and don't repeat a notice
   elsewhere on the same screen or page.
8. **Concrete over abstract.** Use a number, a name, a thing on screen. "Under the real 1,250-word
   limit" beats "under realistic exam conditions". Define a number by what 100% means.
9. **A status word is never bare.** "Beta", "In Development" and the like get their plain
   meaning beside them, on screen, not only in a hover tooltip (the app is read on phones).
10. **Not "mastered".** The app's levels are New, Level 1, Level 2, Level 3 and Forgotten.
    Use them.
11. **A line that doesn't apply to this reader is removed, not reworded.**
12. **British spelling**, as the app is written: practise (verb), levelled, personalised.

## Tells to cut

These patterns make text read as model-written. Check every draft against them.

| Tell | Example | Instead |
|---|---|---|
| An em dash as the main hinge of a sentence | "each day's concepts are waiting — sized to your pace" | A full stop, a comma, or "and". A dash in a range or as a `·` separator is fine. |
| "No more X" | "No more staring at a syllabus." | Say what happens now |
| A rule of three | "every level gained, every slip caught, every question" | Pick the one that matters, or list plainly |
| A closing aphorism | "Either way, every day moves you closer." / "The letters are not the finish line." | Stop after the fact |
| "Not X, it's Y" | "Points per minute, not questions per minute." | Say what it is |
| A colon reveal | "The result: confidence." | A plain sentence |
| Inflated words | unlock, elevate, empower, supercharge, seamless, journey, effortless, master | The ordinary word, or nothing |
| Feelings on the reader's behalf | "walk in confident", "feel your progress" | Show what they'll see |
| Rhetorical questions | "Ready to pass?" / "Find someone else?" | A statement, or a button |
| Exclamation marks and praise | "Quest complete!", "Great work!" | "Quest complete". (Inside a game, a game moment such as "Steal!" may keep one.) |
| "Whether you're X or Y" | "Whether you're just starting or nearly done…" | Talk to one reader |
| A title that describes, not names | "See where your marks go", "Make it yours" | The feature's name: "Analytics", "Follow Topics" |
| A clever word for a plain fact | "Its twin on the lists", "Vintage", "sorted" | "Also allowed", "Syllabus edition", "done" |
| Packed fragments | "of 40 · retry 60% of 12" | One fact, with its unit visible |

One em dash on a page is not a crime. A page where every other sentence hinges on one is.

## Shapes in the app

- **Title:** a verb and the feature's in-app name, or the name alone. Title Case for card titles.
  No full stop.
- **Body:** one or two sentences, under about 40 words. Lead with the concrete action and end
  on the fact.
- **Subtitle:** one short sentence. The screen below explains the rest.
- **Button:** a verb and its object ("Get Pro", "Start the review"). In-world words never sit
  on a button without a plain verb.
- **Tooltip:** a noun phrase. No dash, no list of three, no "click", "hover" or "tap".
- **Success:** what happened, in the past tense. No exclamation mark.
- **Completion screen:** what happened and what it earned. No praise.
- **Error:** what went wrong and what to do. Never `err.message` raw, and never a server's
  internals. An edge function's `error:` string is reader copy.
- **A tile or caption:** one fact, with its unit visible. If a screen reader is told the
  unit, the screen shows it too.
- **Inside a game:** keep the game's own nouns (card, hand, steal) and the figures as the
  screen shows them (3, 2:00). An in-world word carries its plain meaning the first time it
  appears on a screen.

## Guardrails

- `quiz/src/lib/copyGuard.test.ts` fails a build whose UI strings use an inflated word,
  "No more X", praise or "Whether you're", and holds the count of em-dash hinges in UI
  strings to a ceiling that only goes down.
- The `app-copy` skill: its glossary and its decisions log.
- Every writing skill (concept pages, questions, resource pages, Cowork sources, exam reviews,
  the converters' own notes, the validate agent's findings) links here.
