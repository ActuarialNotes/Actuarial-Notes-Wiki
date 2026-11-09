---
name: app-copy
description: Write or edit the words people read in the Actuarial Notes app — page headings, card titles and bodies, buttons, tooltips, empty states, success and error messages (including the errors edge functions return), completion screens, the Upgrade page, the daily email, the AI connector's descriptions and announcements — so they are true to what the code does, use the app's own nouns, and sound like a person wrote them, not a model. Use whenever you add or change user-facing copy in quiz/src, supabase/functions or quiz/api (any string a reader sees), or when the user asks to rewrite, punch up, humanize, simplify or "make it sound less AI" for any screen, message or email. Not for vault content (concept pages are actuarial-concept-definitions, resource pages resource-pages, questions question-writer) and not for code comments or docs.
---

# App copy

The app is made by one person, for people studying for actuarial exams. Its words
should read like that person talking to a candidate across a desk: plain, specific,
a little dry, and never selling harder than the thing deserves.

The rules for every reader-facing word in the project are `docs/writing-style.md`.
Read it first; this skill adds what is particular to the app: the glossary of its
nouns, the shapes of its text, and **the decisions log at the end, which outranks
everything else**. When the maintainer accepts, rejects or rewrites a line, record
what they did and why, and follow it next time. The full review these rules came
from is `docs/ui-copy-review.md`.

`quiz/src/lib/copyGuard.test.ts` fails a build on the tells a machine can see
(inflated words, "No more X", praise, "Whether you're") and holds the count of
em-dash hinges in UI strings to a ceiling. When you remove hinges, lower its
`EM_DASH_CEILING`; never raise it.

## Before you write

1. **Find out what the thing actually does.** Read the component, the lib module,
   the server function and the doc for the feature. Copy that promises more than
   the code does is the worst kind of copy here: the vault's rule is "nothing
   invented", and that goes for the app's own claims about itself. The review found
   about 25 such lines: a tooltip promising a "dated pack" nothing made, "Try it for
   a month" with no trial, a "Start today's session" link that started an
   unfiltered quiz. If a feature is half-built, don't write around the gap with
   vague words; say less, and tell the maintainer.
2. **Never hand-type a list of what the app covers.** Exam lists, feature lists and
   counts go stale (the review found four stale exam lists). Derive them from
   `examStatus`, `scripts/exam_catalog.json` or the constants, or leave them out.
3. **Titles name the feature; bodies say what it does for the reader.** A title
   is a label the reader can find again in the app: "Track Learning Progress",
   not "See what's sticking". A clever or situational title ("Know what to study
   today", "Make it yours") is vague, and vague reads as AI. Save the reader's
   situation for the body.
4. **Use the app's own nouns, from the glossary below.** A reader learns these words
   from the app; copy that swaps in synonyms ("learning journey", "Custom Study
   Plan", "Shop" for the Store) makes them guess whether it is a second thing.
5. **Ask whether the line applies to this reader.** A line a reader can't act on
   (a bonus a signed-out reader can't get, a study plan a free reader can't open) is
   removed for them, not reworded.

## How it should sound

- **Short, ordinary words.** "Use", not "leverage". "Change", not "adapt".
  "Help", not "empower".
- **Concrete over abstract.** A number, a name, a thing on screen. "Under the real
  1,250-word limit" beats "under realistic exam conditions".
- **Say it once.** One sentence that states the fact usually does the job. Don't
  follow it with a second sentence that says the same thing with more feeling, and
  don't repeat a notice elsewhere on the same screen.
- **Things don't act like people.** A quiz doesn't "live" in a browser and results
  don't "come with you". Say what is stored, where, and what the reader can do:
  "Your results are only saved in this browser."
- **The reader's things are theirs.** "Your results", not "This quiz".
- **No code words.** "Reach", "tagged", "cycle", "the engine", `run_tool`, a field
  key or an environment variable never reaches the screen.
- **Vary the rhythm.** Mix a short sentence with a longer one. Three sentences of
  the same length and shape read as generated.
- **Contractions are fine.** "You're", "it's", "don't".
- **It's allowed to be modest.** "Your subscription pays for the hours that go
  into adding exams" is more persuasive than "Fuel the future of actuarial
  education".

## Tells to cut

These are the patterns that make copy read as model-written. Check every draft
against the list before showing it. (`docs/writing-style.md` has the same table for
all reader-facing text.)

| Tell | Example | Instead |
|---|---|---|
| Em dashes as the main joint of a sentence | "each day's concepts are waiting — sized to your pace" | A comma, a full stop, or "and" |
| The "No more X" opener | "No more staring at a syllabus wondering where to start." | Say what happens now |
| Rule of three, especially with a repeated word | "every level gained, every slip caught, and every question" | Pick the one that matters, or list plainly |
| Neat closing aphorism | "Either way, every day moves you closer." / "Keep it that way." | Stop after the fact |
| "Not X, it's Y" / "It's not just X" | "It's not a quiz, it's a coach." | Say what it is |
| Colon reveal | "The result: confidence." | Plain sentence |
| Inflated verbs and nouns | unlock, elevate, empower, supercharge, seamless, journey, effortless, game-changer, mastered | The ordinary word, or nothing |
| Feelings on the reader's behalf | "Feel your progress", "walk in confident" | Show what they'll see; let them feel it |
| Rhetorical questions | "Ready to pass?", "Find someone else?" | A statement or a button |
| Exclamation marks and praise | "Code redeemed! Welcome aboard.", "Great work!" | "That worked. You have Pro now." |
| "Whether you're X or Y" | "Whether you're just starting or nearly done…" | Talk to one reader |
| A title describing who can have it, not what it is | "A badge only Pro members can buy" | The feature's name: "Associate and Fellowship Badges" |
| Personification | "This quiz only lives in this browser", "it comes with you", "the boss is using" | What is stored, where, and what to do |
| A clever word for a plain fact | "Its twin on the lists", "Vintage", "sorted" | "Also allowed", "Syllabus edition", "done" |
| Packed fragments | "of 40 · retry 60% of 12" | One fact, with its unit visible |
| A status word on its own | "Beta" | "Beta · Questions and pages are still being added and checked." |

One em dash in a page is not a crime. A page where every second sentence hinges
on one is.

## Glossary

One thing, one name. Use these exactly.

| Thing | Say | Not |
|---|---|---|
| The products tab | **Store** ("Search the Store") | Shop |
| The cosmetics page | **Gem Shop** | Store, shop |
| The daily plan | **Today's Study Plan** as a title, tile or button; "today's study plan" mid-sentence | Today's plan, Custom Study Plan, Study Plan |
| The whole-paper mode | **Practice Exam** (`PRACTICE_EXAM_LABEL`), beside **Past Papers** | Practice exam, Exam, mock exam |
| Fact Check verdicts | **Fact checked** / **Not fact checked**; a problem is an **issue** | Verified, finding |
| Exam status | **Not started**, **In progress**, **Passed**; **In Development** ("Syllabus outline only. No practice questions yet."); **Beta** ("Questions and pages are still being added and checked.") | Completed, In Progress, Not Started |
| Concept levels | **New**, **Level 1**, **Level 2**, **Level 3**, **Forgotten**; "levelled up" | L1, mastered, Decayed, Cleared |
| The readiness forecast | **Projected readiness** | Predicted |
| The pop-up behind the readiness ring | **Exam Readiness** | Study Guide |
| A credential's requirements | **track** | path |
| The settings page | **Settings** | You |
| Taking a reward | **Collect** | Claim, Unlock, bank |
| The date a plan aims at | **ready date** | target date |
| Accounts | **Create account**, **Sign in** | Sign up, Make an account, Sign In |
| The assistants | **Claude or ChatGPT** where the connector serves both; **Claude** only where only Claude | AI |
| An empty filter | "No resources match these filters." | No sources / the current filters |
| A syllabus change | **Added** | New in |
| Spelling | British: practise (verb), levelled, personalised | practice (verb), leveled |

Inside a game (Quiz Battle, Concept Craft, Actuaria), keep the game's own nouns (card,
hand, steal, sector) and the figures as the screen shows them (3, 2:00), and put an
in-world word's plain meaning beside it the first time it appears on a screen.

## Shapes

- **Card title:** 2–6 words in Title Case, a verb and the feature's name as the
  app spells it: "Track Learning Progress", "Choose a Study Strategy",
  "Rehearse the PCPA Project". No full stop. (Page headings and body text stay
  in sentence case.)
- **Card body:** one or two sentences, under ~40 words. Lead with the concrete
  action; end on the fact, not a flourish.
- **Subtitle:** one short sentence. The screen below explains the rest.
- **Button:** a verb and its object ("Get Pro", "Redeem", "Start the review"). No
  "Click here", and no in-world verb without its plain form.
- **Tooltip and aria-label:** a noun phrase. No em dash, no list of three, no
  "click", "hover" or "tap".
- **Success message:** what happened, in the past tense. No exclamation mark.
- **Completion screen:** what happened and what it earned. No "!", no praise. (A
  game moment inside a Quiz Battle, "Steal!", may keep one.)
- **Error message:** what went wrong and what to do, if there's anything to do.
  Never show `err.message` raw; map it to a sentence. An edge function's `error:`
  string is reader copy, and an environment variable's name never goes in it.
- **Tile or caption:** one fact, with its unit visible. If the screen reader is told
  the unit, the screen shows it too.
- **List items next to a price:** parallel enough to scan, but each one a real
  thing the reader can point to in the app.

## Workflow when the maintainer is reviewing

1. Draft the copy in place, in the code, and build it so the maintainer sees it
   on the real screen.
2. In your reply, put the old and new lines side by side for anything that
   changed, and flag every claim you weren't sure was true.
3. For every string you change, grep `quiz/src` tests and `quiz/e2e` for it and
   update them the same way.
4. When they push back, change the copy **and** add a line to the log below
   saying what they preferred. Don't just fix the one string; look for the same
   pattern elsewhere in what you wrote. If it is a rule for all reader-facing
   text, add it to `docs/writing-style.md` too.

## Decisions log

Each entry: the date, the screen, what the maintainer said, and the rule it
implies. Newest first.

- 2026-11-08 · Full UI copy review (`docs/ui-copy-review.md`) · Accepted the
  first batch of rewrites. On the guest save prompt, flagged "This quiz only
  lives in this browser" and "Make an account and it comes with you": "lives in"
  and "comes with you" are awkward, and "This quiz" is impersonal next to "Your
  quiz results". → Things don't act like people: say what is stored, where, and
  what the reader can do. The reader's things are theirs ("your results").
  Picked "Your results are only saved in this browser. Create an account to keep
  your scores, concept levels and streak, and see them on any device."
- 2026-11-08 · Plan-complete panel · The 2× gem bonus line for a reader who
  can't get it (signed out, no gems): show nothing. → A line that doesn't apply
  to the reader is removed, not reworded.
- 2026-11-08 · Projects tab · "Rehearse the PCPA project with R and Python in
  your browser." over a longer accurate version. → A subtitle is one short
  sentence; the screen below explains the rest.
- 2026-11-08 · Upgrade price card · Title "Get Pro", not "Try it for a month"
  (there is no trial) nor "$10 a month". → Titles name the action or feature.
- 2026-11-08 · Quiz Battle redesign, start screen · A pass changed "3 questions,
  each pairing a card from your hand with one of theirs. 2:00 each." to "Three
  questions, each on one of your topics and one of theirs. Two minutes a
  question." The maintainer put the original back: it was best. The rest of the
  pass stood (no taglines, no puns like "strong suits", no invented counts, no
  hint repeated on every card, the app's existing "No one's in the lobby right
  now"). → Inside a game, keep the game's own nouns (card, hand) and the figures
  as the screen shows them (3, 2:00). Plainer isn't better when it loses the
  game's words.

- 2026-11-02 · Dashboard "?" guide · The old slide was confusing (and its
  "Day 1 › 3 › 7 › 14 › 30" chain wasn't the app's schedule). Rewritten as five
  slides: How It Works, Concept Levels, Today's Study Plan, Exam Readiness,
  Projected Readiness. "Counts how far up the ladder the whole syllabus has
  got" was unclear; the maintainer picked "adds up your levels across the
  syllabus, weighted the way the exam weights it. 100% means every concept is at
  Level 3." Asked to merge the levels and decay slides into one. → Define a
  number by what 100% means. Explain a mechanism with the app's real figures
  (30/14/7 days, five a day, ⅓ ⅔ full), read from the code, and say each fact on
  one slide only.

- 2026-10-31 · Upgrade page · Removed the "Track Learning Progress" card and
  bullet because levels are free now, and the "Fund New Exams and Questions" card
  (the proposal says it read as a donation appeal). Headline is now "Know you're
  ready before you sit." → A free feature never appears on the Upgrade page, and
  the page sells what Pro does, not what the money pays for.
- 2026-10-24 · Upgrade page · Cut "Actuarial Notes is made by one person."
  from the funding card. → Don't lead with who makes the app; say what the
  money pays for.
- 2026-10-23 · Upgrade page · Card titles were too vague ("See what's
  sticking"). Wanted: the feature, said precisely, Title Case, like "Track
  Learning Progress". → Titles are a verb plus the feature's in-app name.
- 2026-10-23 · Upgrade page · "A badge only Pro members can buy" is very AI.
  Better is naming the thing ("Associate and Fellowship Badges"). → Name the
  feature, never describe its eligibility in the title. (The card itself was
  dropped: the designation badges aren't Pro-only, and the one Pro-only badge
  shows nowhere yet. A benefit card needs a feature that's really gated.)
- 2026-10-23 · Upgrade page · First draft of this skill, written alongside the
  rewrite of the Upgrade page's copy. Nothing reviewed yet.
