---
name: app-copy
description: Write or edit the words people read in the Actuarial Notes app — page headings, card titles and bodies, buttons, empty states, success and error messages, the Upgrade page, emails and announcements — so they sound like a person wrote them, not a model. Use whenever you add or change user-facing copy in quiz/src (any string a reader sees), or when the user asks to rewrite, punch up, humanize, simplify or "make it sound less AI" for any screen, message or email. Not for vault content (concept pages are actuarial-concept-definitions, resource pages resource-pages, questions question-writer) and not for code comments or docs.
---

# App copy

The app is made by one person, for people studying for actuarial exams. Its words
should read like that person talking to a candidate across a desk: plain, specific,
a little dry, and never selling harder than the thing deserves.

This skill is being built up by working through real copy with the maintainer.
The rules below are a starting point. **The decisions log at the end outranks
them**: when the maintainer accepts, rejects or rewrites a line, record what they
did and why, and follow it next time.

## Before you write

1. **Find out what the thing actually does.** Read the component, the lib module
   and the doc for the feature. Copy that promises more than the code does is the
   worst kind of copy here: the vault's rule is "nothing invented", and that goes
   for the app's own claims about itself. If a feature is half-built (the Custom
   Badge can be bought but is shown nowhere yet), don't write around the gap with
   vague words; say less, and tell the maintainer.
2. **Name the reader's situation, not the feature.** "Know what to study today",
   not "Personalized daily study plans".
3. **Use the app's own nouns.** Study plan, concept, Level 1, the Gem Shop, the
   PCPA project, a past paper. A reader learns these words from the app; copy that
   swaps in synonyms ("learning journey", "knowledge areas") makes them guess.

## How it should sound

- **Short, ordinary words.** "Use", not "leverage". "Change", not "adapt".
  "Help", not "empower".
- **Concrete over abstract.** A number, a name, a thing on screen. "Under the real
  1,250-word limit" beats "under realistic exam conditions".
- **Say it once.** One sentence that states the fact usually does the job. Don't
  follow it with a second sentence that says the same thing with more feeling.
- **Vary the rhythm.** Mix a short sentence with a longer one. Three sentences of
  the same length and shape read as generated.
- **Contractions are fine.** "You're", "it's", "don't".
- **It's allowed to be modest.** "Your subscription pays for the hours that go
  into adding exams" is more persuasive than "Fuel the future of actuarial
  education".

## Tells to cut

These are the patterns that make copy read as model-written. Check every draft
against the list before showing it.

| Tell | Example | Instead |
|---|---|---|
| Em dashes as the main joint of a sentence | "each day's concepts are waiting — sized to your pace" | A comma, a full stop, or "and" |
| The "No more X" opener | "No more staring at a syllabus wondering where to start." | Say what happens now |
| Rule of three, especially with a repeated word | "every level gained, every slip caught, and every question" | Pick the one that matters, or list plainly |
| Neat closing aphorism | "Either way, every day moves you closer." | Stop after the fact |
| "Not X, it's Y" / "It's not just X" | "It's not a quiz, it's a coach." | Say what it is |
| Colon reveal | "The result: confidence." | Plain sentence |
| Inflated verbs and nouns | unlock, elevate, empower, supercharge, seamless, journey, effortless, game-changer | The ordinary word, or nothing |
| Feelings on the reader's behalf | "Feel your progress", "walk in confident" | Show what they'll see; let them feel it |
| Rhetorical questions | "Ready to pass?" | A statement or a button |
| Exclamation marks in confirmations | "Code redeemed! Welcome aboard." | "That worked. You have Pro now." |
| "Whether you're X or Y" | "Whether you're just starting or nearly done…" | Talk to one reader |
| Title Case Headings For Everything | "Track Your Concept Mastery" | Sentence case |

One em dash in a page is not a crime. A page where every second sentence hinges
on one is.

## Shapes

- **Card title:** 2–6 words, sentence case, what the reader gets or does. No
  full stop.
- **Card body:** one or two sentences, under ~40 words. Lead with the concrete
  action; end on the fact, not a flourish.
- **Button:** a verb and its object ("Get Pro", "Redeem"). No "Click here".
- **Success message:** what happened, in the past tense. No exclamation mark.
- **Error message:** what went wrong and what to do, if there's anything to do.
- **List items next to a price:** parallel enough to scan, but each one a real
  thing the reader can point to in the app.

## Workflow when the maintainer is reviewing

1. Draft the copy in place, in the code, and build it so the maintainer sees it
   on the real screen.
2. In your reply, put the old and new lines side by side for anything that
   changed, and flag every claim you weren't sure was true.
3. When they push back, change the copy **and** add a line to the log below
   saying what they preferred. Don't just fix the one string; look for the same
   pattern elsewhere in what you wrote.

## Decisions log

Each entry: the date, the screen, what the maintainer said, and the rule it
implies. Newest first.

- 2026-10-23 · Upgrade page · First draft of this skill, written alongside the
  rewrite of the Upgrade page's copy. Nothing reviewed yet.
