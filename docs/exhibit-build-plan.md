# Exhibit Core: build plan

_The build plan for the redesign drawn in **Exhibit Core**
(https://claude.ai/artifact/E7q9ZKdQ9KjPMtHALx7sAq), as revised on 2026-11-20. It continues
`docs/design-review.md` (roadmap X11), whose Phases 0 to 4 are built. Where this plan and the
page disagree, the page's drawings win and this file is corrected._

Seven sections are in scope: Today, Exams, Resources, Quiz, Flashcards, Projects and Settings,
with the reader (the concept popup) they all open. Tools, Data Sources, Workflows, the Store,
Community and the Tutor stay as built. Quiz Battle and Concept Craft have no place in the
design.

## Where the work goes

The build goes on `claude/design-review-docs-phase-1-e57itt`. On 2026-11-20 it is seven
commits ahead of `main` and none behind: `main` is merged in (`cbfd7803`), and the exam in
focus and its switcher are taken out (`5ecb80d5`).

The file paths below were read from `CLAUDE.md` and that branch's tree, not from a build of
it. Confirm each before editing; a step that finds its file renamed follows the code.

## Decisions this plan rests on

| # | Decision | Date |
|---|---|---|
| K1 | The places are Today, Learn, Practice, Apply | 16 Nov |
| K2 | Phones get the bottom bar | 16 Nov |
| K3 | The account's page is Settings. The level, quests, league and reminders stay on Today | 16 Nov |
| K4 | Flashcards is under Practice and opens on the Deck | 16 Nov |
| K5 | Without Pro a Projects brief can be read; starting one is locked | 16 Nov |
| K6 | Quiz opens on its list of exams. There is no exam in focus and no switcher | 16 Nov (revert) |
| K7 | The week strip stays on Today | 16 Nov |
| K8 | White on solid black, black on white. Cards by hairline | 20 Nov |
| K9 | Dark is the default theme. Light and System are offered | 20 Nov |
| K10 | Quiz Battle and Concept Craft have no place in the design | 20 Nov |
| K11 | The ten improvements of the 20 November review are accepted | 20 Nov |

## The rules every step keeps

1. One filled control a screen, in ink. The exam's colour is for fills and outlines (the
   tile, progress, what is chosen) and is never the colour of text.
2. One shape per job: a choice is an underlined segment, an action a pill, a filter a chip
   with a chevron, a badge small capitals, a fact plain text.
3. State is drawn with its word: a verdict is a band, a level is pips and "Level 1".
4. Six type sizes, two weights, nothing under 12 px. Every target is 44 px, even where the
   shape drawn inside it is smaller.
5. One slot: the screen's one action, pinned at the foot. Return to quiz takes it first, then
   the page's action. The podcast player is never in it.
6. The page never grows under the reader. Going on never needs a scroll. A long sample answer
   scrolls behind the slot.
7. One Start. Nothing stands between it and the first question.
8. A result fills in and nothing covers it.
9. An underline is a link. A title that opens a menu gets a More button.
10. One name per thing (`docs/writing-style.md`, the `app-copy` glossary).
11. Body text is 21:1 and nothing a reader must read is under 7:1.

Every step also keeps the repo's own rules: `npm run lint`, `npm test`, `npm run build`,
`npm run size` and the e2e suite pass; UI strings go through the `app-copy` skill; a step that
changes an item's status updates `docs/roadmap.md` and `docs/design-review.md` §6 in the same
PR; `docs/style-guide.md` is updated where a token or pattern changes.

---

## Step 0. Catch up

**On the branch:** Phases 0 to 4 of the design review, with `main` merged in.

**To build**

- Take Games off Practice's list: the `games` page in `lib/places.ts` and its `PlaceAccess`
  key, and the row in `Sidebar.tsx`. The pages keep their addresses. `GAMES_ENABLED` stays
  off.
- Re-shoot the seven sections and the reader at 390 × 844 and 1280 × 800, as a visitor, a
  signed-in reader without Pro, and a Pro reader. Keep the shots with the PR; they are the
  "before" for every later step.

**Done when** unit tests, lint, the build and the e2e suite pass, and the shots are on file.

## Step 1. Type, shape and contrast

This step comes first because every later screen is built on it. It needs no switch: the
neutrals do not change.

**On the branch:** white on black in the dark theme, black on a 95% grey in the light theme
(`quiz/src/index.css`, `--background` and `--foreground`).

**To build**

- Keep `--background: 0 0% 0%` and `--foreground: 0 0% 100%` in `.dark`. In the light theme
  set the page to white, so both themes are 21:1.
- A card is set off by a 1 px hairline. `--card` equals `--background` in both themes, and
  the fills that separated surfaces by a grey step go. Keep one raised tone for the surface
  that slides (the "Paper on a desk" rule in `index.css`) if the page move needs it.
- `--muted-foreground` is at least 7:1 on the page in both themes.
- The exam's accent (`lib/examColors.ts`) is never a text colour. Sweep for
  `text-[var(--exam-accent…)]` and the active tab, link and count styles that use it, and
  move each to the foreground colour with the accent as a fill, bar or outline.
- Six type sizes and three radii as tokens. Motion tokens beside `--paper-ease`.
- Theme: add System to the choice in `hooks/useTheme.ts` and to the inline script in
  `quiz/index.html`. A reader with no stored choice gets Dark, as today.

**Done when**

- A test computes the contrast of every text token on every surface token in both themes
  and fails under 7:1 (under 4.5:1 for disabled text only).
- Ceilings on type under 12 px and off-scale radii are in CI, in the manner of
  `copyGuard.test.ts`, and only go down. The count of `text-[9px]`, `text-[10px]` and
  `text-[11px]` on `main` today is about 220.
- `docs/style-guide.md` §2 and §3 say the same.

## Step 2. The frame

**On the branch:** the four places (`lib/places.ts`), the bottom bar
(`components/BottomBar.tsx`), the sidebar's four rows, the account menu.

**To build**

- A place's pages are an underlined choice at the top of the place
  (`components/ui/SegmentedControl.tsx`): Exams · Resources in Learn, Quiz · Flashcards in
  Practice, with the deck's count. The second press on a bar tab is removed.
- The header on a phone: the page's title on the left; a search button and the account on
  the right. A search bar stays only on Resources and the Deck (`lib/mobileNavHost.ts`).
- The SOA / CAS / CIA picker (`lib/bodyFilter.ts`) is drawn as a chip with a menu.
- Apply lists Projects alone while the others are hidden.
- Theme and sound leave the sidebar's foot for Settings. The Quiz row's orange badge goes;
  the flashcard count stays as a number.
- The podcast player (`components/podcast/PodcastPlayer.tsx`) is one 44 px line above the
  bottom bar and leaves the resume dock (`components/ResumeDock.tsx`), which keeps Return to
  quiz.
- Every chip, segment and icon button has a 44 px target.

**Done when** Flashcards is one visible tap from Practice's first page, an e2e sweep finds no
pressable target under 44 px on the seven sections, and each of the seven starts its content
within 120 px of the top on a phone.

## Step 3. The quiz's seams

**On the branch:** the one-row header with a More menu, the verdict strip
(`components/ExplanationPanel.tsx`), Fix these now on the results (`pages/Review.tsx`).

**To build**

- **The slot.** One pinned button from the first question to the results (`pages/Quiz.tsx`):
  Confirm, dimmed until a pick; then Next question; Skip turning into Next when answers are
  held to the end.
- **The verdict in place.** The reader's answer and the right one in one card, the other
  options folded to one row that reopens. The "Choose any answer to continue" shortcut and
  its caption go.
- **Written parts.** The answer box above the slot, which reads "Confirm part a". Marked, the
  sample answer (`components/AnswerReference.tsx`) scrolls behind the foot; the three grades
  (`components/SelfGradeButtons.tsx`) sit in the foot above the slot, the suggested one
  outlined (`components/GradeSuggestion.tsx`); Next part is dimmed until a grade is in.
  `components/GradePartsDialog.tsx` is no longer opened while answers are revealed as the
  quiz goes. The essay checklist stays inside the sample answer.
- **The header row.** Quit, the count with Previous and Next, the clock when timed, More.
  Spreadsheet joins the row on an exam sat with one (`data/examSpreadsheets.ts`). Flag joins
  it in a Practice Exam and is in More otherwise.
- **One Start.** The pre-quiz list of new concepts (`components/PreQuizConcepts.tsx`) becomes
  a row of the builder, "6 new concepts · Read first".
- **Keys.** 1 to 5 and A to E pick; Enter confirms and goes on. `data-own-keys` still wins
  inside the spreadsheet.
- **The results.** The donut, what was earned, what to fix, in one screen. No dialog over a
  visitor's score; the account offer is one row, once a visit. The streak and quest overlays
  (`PostQuizCelebrations` in `pages/Review.tsx`) become rows of "Earned"; the full-screen
  ceremony stays only for a first card and a Level 3.

**Done when** an e2e walk of a multiple-choice quiz and of a written Exam 5 quiz, at
390 × 844, finds the primary button at one height from the first question to the results,
never scrolls to go on, and meets nothing over the score. `e2e/quiz.spec.ts`,
`quiz-format.spec.ts`, `reveal.spec.ts`, `question-sheet.spec.ts` and `quiz-resume.spec.ts`
are updated with it.

## Step 4. Today and the reader

**On the branch:** Today is open to a visitor from the browser's record
(`lib/guestMastery.ts`); no 0% ring.

**To build**

- One Start, in the slot, named for the work (`nextSessionAction` in `lib/todaySession.ts`):
  Start session, Continue · 8 left, Fix 2 mistakes. The header pill and the card's own button
  go.
- One line under the header: Today's own exam chip and the days to that exam on the left;
  the level and the daily goal on the right, opening the level, quests and league
  (`components/LevelBadge.tsx`). Reminders is a bell in the header. Export and help move to
  Settings; adding an exam is in the chip's menu.
- The week as seven columns: the date, the questions planned, a tick on a day done. The
  streak is read off the ticks and is not printed a second time.
- The session card (`components/dashboard/TodaySessionCard.tsx`): its size in questions,
  points and minutes, the wheel, the numbered steps with a 44 px row per concept.
- Without Pro: the mistakes are the session and the slot. Today's Study Plan is one row with
  its Pro mark, opening one sheet. With nothing missed the slot reads "Start a quiz". The
  blurred stand-in is not built.
- Done: the finished list and tomorrow's size, with no slot.
- The reader (`components/ConceptPopup.tsx` and its page panel): the level as pips beside the
  title, Listen / More / Close at 44 px, a filled dot on rows already read, the page ending
  in its Practice row, and the last Next of a Today walk reading "Start session". Its scroll,
  highlight, stack and walk are not touched. It stays black in the dark theme.

**Done when** there is one Start on the page for every kind of reader, the session card
begins above 200 px on a phone, and `e2e/dashboard-session.spec.ts` and `wiki.spec.ts` pass
with the reader's behaviour unchanged.

## Step 5. Learn

**On the branch:** exams in development folded, titles with a More button, objective
progress, Practice this objective.

**To build**

- Exams (`pages/wiki/WikiHome.tsx`): one ladder, no In progress group. The reader's exams
  carry their date and "34% ready" in place (`components/ExamRow.tsx`). Both cross-link cards
  go.
- An exam's page: the date as text; Info, Syllabus and the sitting as three labelled
  controls; an objective row with its weight in words and a labelled bar. The slot is
  "Practice Exam 5", or "Practice this objective" inside one.
- Resources (`pages/wiki/WikiResources.tsx`): one row of filters, Exam, Publisher, Year, with
  Edition appearing once one exam is chosen. Every exam is shown until one is chosen. A
  reading is a row with its cover, its title and one line of facts as text. The search bar
  says it searches readings.

**Done when** the ACAS ladder fits one phone screen and the first reading is above 220 px.

## Step 6. Practice

**On the branch:** the Quiz page opens on its list of exams.

**To build**

- The builder (`pages/Landing.tsx`, `components/landing/`): the count with − and +, the
  settings as labelled rows, Practice Exam and Past Papers as rows, Start quiz in the slot.
- Flashcards as two views. The Deck: every card as a `ConceptTile`, a search bar, Exam, Level
  and Topic filters, and Study in the slot with its count. Study: one card filling the page,
  its level as pips with the word; turned, the foot offers Again (quiet) and Got it (filled).
  Got it takes the card out of the run; Again puts it back later in the run. Neither changes
  a level, XP or the streak.
- An empty deck says how a card is collected, shows no search bar, filter or switch, and its
  slot starts a quiz.

**Done when** a card's face is at least 60% of the screen in Study, and an empty deck shows no
control that does nothing. `e2e/flashcard-focus.spec.ts` is updated.

## Step 7. Apply and Settings

**To build**

- Projects (`pages/Project/`): the briefs as rows under the PCPA tile, an open attempt first
  with its day and word count, the rules as one line of text. The slot is the next step.
  Without Pro the same page, with briefs readable and the slot reading "See Pro". Starting
  asks mode, language and data as underlined choices.
- Settings: it opens on the reader, then grouped lists of about a screen and a half. The
  credential track, AI assistants and the export are pages behind their rows. A switch is a
  switch. Theme is Dark, Light or System. Reset and Delete are rows in the wrong-answer
  colour, last, and each asks before it acts. A visitor's Settings is the sign-in form, then
  Preferences.

**Done when** Settings is under 1,400 px on a phone and a reader without Pro can read a brief
(`e2e/pcpa-project.spec.ts`).

## Step 8. Desktop

**On the branch:** the sidebar's four rows with their pages listed.

**To build**

- Content keeps to one column capped at 720 px on Today, a question and the results.
- The slot on a wide screen is a pill of a phone's width in that column: right under the
  content when it is short, pinned at the column's foot when it is long. Enter presses it.
- The sidebar stays during a quiz.
- The reader is the right half, its text capped at 720 px.

**Done when** at 1280 × 800 the primary button is inside the content column on Today, a
question and the results, and the e2e walk of step 3 passes at that size.

---

## What this plan does not change

The vault, its parsers and its rules. The mastery ladder, readiness, the study plan and every
engine in `lib/`. Every address. The reader's scroll, highlight, stack and walk. Tools, Data
Sources, Workflows, the Store, Community and the Tutor.

## Open after this plan

- An account with months of history, a real phone and a screen reader were not part of the
  review behind the page.
- Whether Again should feed a spaced schedule is a learning question (`docs/learning-review.md`),
  not a design one, and is left out.
- Removing Quiz Battle's and Concept Craft's code is a separate job. This plan only keeps them
  out of the navigation.
