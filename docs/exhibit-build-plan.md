# Exhibit Core: build plan

A handoff. It tells the agent doing the build what to make, in what order, on which branch,
and how to know each step is done. The design it builds is drawn in
`docs/exhibit-core/index.html` (published at
https://claude.ai/artifact/E7q9ZKdQ9KjPMtHALx7sAq): one section per screen, each with a
screenshot of `main`, what is wrong, and the redrawn frames. Read that page's section before
starting a step. Where this plan and that page disagree, the page is the design and this plan
is the order.

Roadmap item: X11. Earlier documents: `docs/design-review.md` (the review and Phases 0 to 4),
and the Exhibit draft (https://claude.ai/artifact/6S7oSFraH2nkvhoyuE3mPo), which this replaces
for the seven sections.

## 1. Scope

Seven sections in four places, and nothing else:

| Place | Pages | Routes |
|---|---|---|
| **Today** | Today | `/dashboard` |
| **Learn** | Exams, Resources | `/wiki`, `/wiki/exam/…`, `/wiki/concept/…`, `/wiki/resources`, `/wiki/resource/…` |
| **Practice** | Quiz, Flashcards | `/`, `/quiz`, `/review`, `/flashcards` |
| **Apply** | Projects | `/project`, `/project/pcpa/…` |
| behind the account | Settings | `/settings` |

Out of scope, left as built: Tools, Data Sources, Workflows, the Store, Community, Quiz
Battle, Concept Craft, the Tutor, Research. They take the tokens of step 3 and nothing more.
Do not redesign them, and do not add a new surface until step 2 is merged.

## 2. Decisions already made

Decided by the maintainer on 15 and 16 November 2026. Do not reopen them.

- The places are **Today, Learn, Practice, Apply** (D-DR1). *Practice* with a c everywhere.
- **Practice opens on Quiz**, on the builder for the exam in focus, and links to Flashcards.
- Phones get the **bottom bar** of four. The drawer is not coming back.
- The account's page stays **Settings**. The level, quests, league and reminders **stay on
  Today's header**; they do not move into Settings.
- **Flashcards is a page of Practice** and opens on the Deck.
- **Projects without Pro**: briefs can be read, starting an attempt is locked.
- **The week strip stays on Today**, with dates, counts and ticks.
- Today is open to visitors (D-DR2). In-development exams are folded (D-DR3). *Change Answer*
  goes once an answer is revealed (D-DR4).
- The action colour is ink (the inverted solid), not the exam's colour. The exam's colour is
  for the tile, progress and what is chosen.
- Defaults that stand: the system sans with one self-hosted serif subset for page titles; the
  exam ramp from blue to rose; the collect ceremony full screen only for a first card and a
  Level 3; a question turns in 200 ms.

## 3. Branch and process

- **Build on `claude/design-review-docs-phase-1-e57itt`.** It holds Phases 0 to 4 of the
  design review and is five commits ahead of `main` and two behind.
- One commit (or a few) per step below, in order. Steps 1 and 2 need no visual decision and
  can start at once. Step 3 can run beside them.
- Every step, before it is called done: `cd quiz && npm run lint && npm test && npm run build
  && npm run size`, then the e2e suite (`npx playwright test --trace off`). After any change
  under `lib/tools/`, `npm run tools:bundle`.
- Every user-facing string follows `docs/writing-style.md`; use the `app-copy` skill.
  `copyGuard.test.ts` must pass.
- Each step updates, in the same commit: its line in `docs/roadmap.md` (X11),
  `docs/design-review.md` §6 (a "built on" entry like the existing ones, with what is left),
  `docs/style-guide.md` where a rule changes, and `CLAUDE.md` where a module is added or
  renamed.
- Do not open a pull request unless asked.

### Seeing the screens

The review was made by building the app and shooting it with Playwright, signed in through
`quiz/e2e/fixtures/signedIn.ts` (a planted session and stubbed Supabase; `pro: true` for Pro,
`examProgress` for the exam). Build with `VITE_SUPABASE_URL=https://e2e.placeholder.supabase.co`
and any anon key, serve with `vite preview`, and shoot at 390 × 844 and 1280 × 800 as a
visitor, a signed-in reader without Pro and a Pro reader. The dev server is too slow for the
wiki and project chunks; use the build. Wait six seconds after load before a desktop shot:
the sidebar is drawn full width for a moment.

## 4. Rules every screen keeps

1. One filled control a screen, in ink.
2. One shape per job: a choice is an underlined segment, an action a pill, a filter a chip
   with a chevron, a badge small capitals, a fact plain text.
3. State is drawn with its word: a verdict is a band, a level is pips and "Level 1",
   Forgotten is amber and says so.
4. Six type sizes, two weights, nothing under 12 px. Anything pressable is 44 px.
5. **One slot.** The screen's one action is pinned at the foot, above the bottom bar. Return
   to quiz takes it first, then the page's action, then the podcast player. With nothing to do
   there is no slot. A second action is a row in the page, never a second button in the slot.
6. The page never grows under the reader. Going on never needs a scroll.
7. One Start. Nothing stands between it and the first question.
8. A result fills in and nothing covers it. Its last button goes to the next thing undone.
9. An underline is a link. A title that opens a menu has a More button; a fold keeps its
   chevron.
10. One name per thing (§1's table).
11. On a phone, content starts within 120 px of the top, and within 64 px while answering.

## 5. Steps

"On the branch" is taken from the branch's own record in `docs/design-review.md` §6, not from
its rendered screens. Step 0 ends by shooting them; correct this plan's "to build" lists from
what the shots show before going on.

### Step 0. Catch up with main

- Merge `origin/main` into the branch. The real conflict is `quiz/src/components/Sidebar.tsx`:
  `main` added `TOOLS_STORE_NAV_ENABLED` (off: Tools, Data Sources and Store rows hidden) to
  the old sidebar, and the branch rebuilt the sidebar on `lib/places.ts`. Keep the branch's
  sidebar and carry the flag across: in `PlaceAccess`, `tools` is false when the flag is off,
  and the account menu's Store row follows the same flag. `BottomBar.tsx` reads the same
  access. Expect smaller conflicts in `CLAUDE.md`, `docs/roadmap.md` and the e2e config
  (`VITE_SIDEBAR_PREVIEW`).
- With the flag off, **Apply lists Projects alone** and opens on `/project`.
- **Done when:** lint, unit tests, build, size and e2e pass; the seven sections are shot as
  three readers at both sizes and kept beside the step's notes.

### Step 1. The frame

Files: `lib/places.ts`, `components/BottomBar.tsx`, `components/Sidebar.tsx`,
`components/ExamSwitcher.tsx`, `components/MobileNavButton.tsx`, `lib/mobileNavHost.ts`,
`components/FloatingSearchBar.tsx` and the per-page search bars, `pages/Settings.tsx`.

- **Phone header, one shape on every page.** Left: the exam switcher (tile, "Exam 5", a
  chevron) on Today and on Practice's pages; the page's title in Learn, Apply and Settings,
  with a back arrow on a page below a place's first. Right: a search button, then the account.
  The switcher moves out of the account's drawer into the header.
- **Search is a button** that opens the page's search. A search **bar** stays only on
  Resources ("Search 808 readings", the live count) and the Deck ("Search your deck"). Today
  there are four different prompts on four bars.
- **A place's pages are an underlined choice** under the header, drawn once as a shared
  component: `Exams · Resources` in Learn, `Quiz · Flashcards 72` in Practice (the deck's
  count, as text). Remove the bar's "press again to list the pages" menu. Apply has one page
  and no choice.
- Remove the orange today's-plan badge from the Quiz row and from Practice in the bar. Today
  shows the plan.
- **Sidebar foot** is the account row alone. Move the theme and sound controls into Settings
  (step 7 restyles them; here they only move).
- Every "Back to Dashboard" and "your dashboard" reads Today. `rg -n "Dashboard" quiz/src
  --glob '!*.test.*'` should leave only code names.
- **Done when:** at 390 px each of the seven starts its content within 120 px; Flashcards is
  one visible tap from the builder and back; `e2e/four-places.spec.ts` covers the choice and
  no longer the second press.

### Step 2. The quiz's seams

Files: `pages/Quiz.tsx`, `pages/Review.tsx`, `stores/quizStore.ts`,
`components/AnswerOption.tsx`, `components/ExplanationPanel.tsx`,
`components/PreQuizConcepts.tsx`, `components/landing/QuizHeroCard.tsx`,
`components/GuestSavePrompt.tsx`, `components/ResumeDock.tsx`, `hooks/useActionBarHeight`,
the overlays `StreakCompleteOverlay`, `QuestCompleteOverlay`, `StudyPlanCompleteOverlay`,
`ConceptLevelUpCeremony`.

Measured on `main` at 390 × 844: Confirm Answer appears about 900 px down; after it the page
is 1,485 px with Next at its end; a dialog covers a visitor's score; the results are 3,321 px
for two questions.

- **The slot** as one component (suggested `components/ActionSlot.tsx`): fixed above the
  bottom bar, publishing its height as `--action-bar-height` so the resume dock and the
  concept pane ride above it. It leaves while the on-screen keyboard is up.
- **In a quiz the slot is Confirm** (dimmed until a pick), **then Next question**, then
  **See results** on the last. With answers held to the end it reads **Skip** and turns into
  **Next** on a pick; it is never dimmed there.
- **The verdict opens in place** over 200 ms: a band on the options card ("Incorrect" /
  "Correct"), the reader's answer and the right one named in rows of that card, the other
  options folded to one 44 px row ("A $222 · D $900 · E $2,000 · Show") that reopens on a tap
  and stays open when the explanation names an option by its letter. The solution follows as
  text; concept folds are 44 px rows. The page does not grow past the screen for a short
  solution, and Next never needs a scroll because it is the slot.
- **The count carries Previous and Next**: `‹ 3 of 12 ›` in the header row. No swipe.
- **One Start.** `PreQuizConcepts` stops being a screen. The builder shows a row, "6 new
  concepts · Read first", that opens the same list in the concept viewer; Start goes to the
  first question. Keep the `conceptsRead` state in the store only if the resume rules need it.
- **Keys:** 1 to 5 and A to E pick, Enter confirms and goes on, arrows step.
- **The results** (`/review`): the donut as drawn today, the percentage in the text colour
  (not red), time against the estimate; then **Earned** as rows that arrive one at a time
  (levels with pips, the streak, a quest's Collect, the plan bonus); then **To fix** as rows
  with the two answers as chips; the ones answered right under one row. Slot: **Fix these N
  now**, or **Back to Today** with nothing missed.
- **Nothing covers the score.** `GuestSavePrompt` becomes one quiet row above the slot, once
  a visit. The streak, quest and plan overlays become Earned rows. The level-up ceremony
  plays full screen only for a first card and a Level 3, after the score has drawn; otherwise
  it is a row.
- **Done when:** a new `e2e/quiz-slot.spec.ts` at 390 × 844 walks three questions as a
  visitor and asserts the primary button's `y` is the same from the first question to the
  results, `window.scrollY` is never needed to reach it, no dialog is open when the score is
  visible, and E is picked by key. Existing quiz specs are updated, not skipped.

### Step 3. Tokens

Files: `quiz/src/index.css`, `tailwind.config.*`, `lib/examColors.ts`,
`components/ui/ink.ts`, `docs/style-guide.md`.

- Land behind a switch (a `data-look="exhibit"` attribute on the root, set from a localStorage
  key and a `?look=` query), so every screen can be seen in both looks until step 7 ends.
- **Neutrals** (light / dark): page `#F5F6F8` / `#12141A`; surface `#FFFFFF` / `#1B1E26`;
  rule `#DFE2E8` / `#2E323D`; text `#151821` / `#E8EAF0`; second text `#535968` / `#A9AFBD`;
  third text, labels only, `#666C7B` / `#8A91A1`; right `#16794A` / `#5FCB93`; wrong
  `#B3261E` / `#F2877F`; amber `#8A5A00` / `#E0B25A`.
- **Theme** follows the system when the reader has made no choice. Settings offers System,
  Light, Dark.
- **The exam ramp** at one lightness and chroma, blue (hue 250) to rose (355), stopping short
  of the wrong-answer red: CAS nine rungs about 13° apart, SOA six about 21° apart. Exam P
  stays blue, Exam 5 violet, PCPA halfway between 5 and 6. Check each for contrast in both
  themes; update `examColors.test.ts`.
- **Type:** six sizes (32 serif title, 22, 17, 16, 14, 12), two weights (400, 600). The serif
  is one self-hosted subset, inside the first-paint budget.
- **Radii:** 6 (data), 14 (surface), full (action). **Motion:** `--t-press` 120 ms,
  `--t-change` 200 ms, `--t-move` 400 ms (today's `--paper-duration`), `--ease` (today's
  `--paper-ease`), `--earn` for something earned only.
- A card on the page needs no outline; a rule is for rows inside one. No shadows.
- **Lint ceilings** in CI beside the copy guard, each a number that only goes down: uses of
  type under 12 px, off-scale radii, hand-written durations and curves.
- **Done when:** the ceilings are in CI, contrast is checked in both themes, and the seven
  screens can be flipped between looks.

### Step 4. Today

Files: `pages/Dashboard.tsx`, `components/dashboard/TodaySessionCard.tsx`,
`components/dashboard/SessionWheel.tsx`, `components/ReadinessCard.tsx`,
`components/LevelBadge.tsx`, `components/DashboardRemindersModal.tsx`, `lib/todaySession.ts`.

Measured on `main`: two Start buttons on the first screen; five header controls; the session
card starts at 365 px; the week is seven unlabelled grey blocks.

- **One Start**, in the slot. Remove the header's Start pill and the card's own button. The
  slot names the work: **Start session**, **Continue · 8 left**, **Fix 2 now**, **Build a
  quiz**.
- **One line under the header**: "Level 7 · 6-day streak · 20 of 30 XP", which opens the
  level, quests and league popup the Level badge opens today, and **Reminders** at its end.
  Export and help move to Settings. Adding an exam is in the switcher. The exam chips go: the
  switcher is the picker.
- **The week stays**: "164 days to Exam 5", Week / Overview, then seven columns, each the
  weekday, the date, and the questions planned or a tick for a day done or a dash for a day
  missed. Today's column is in the exam's colour. The Pro plan's alone; a reader without Pro
  sees the days-left line and no strip.
- **The session card**: its size ("12 questions", "15 points · about 36 min"; minutes from
  points on an exam paced by the point, which `sessionMinutes` does not do today), the
  readiness wheel beside it (score, today's movement, opens Exam Readiness), then the numbered
  steps with a 44 px row per concept. A row shows the concept's state now (New, Level 1 to 3,
  Forgotten in amber), not "→ Level 1".
- **Five states**, each with an e2e assertion: Pro; signed in without Pro (the mistakes, a
  Build a quiz row, the plan shown locked as text); a visitor (the same card from the
  browser's record, a Create an account row; a first visit asks "Which exam are you
  studying?"); part-way (answered rows ticked, the slot says how many are left); done (steps
  ticked, tomorrow's size, Listen and Analytics as rows, no slot).
- **Done when:** there is one Start on the page in every state, the session card begins above
  200 px on a phone with the week shown, and `e2e/dashboard-session.spec.ts` covers the five.

### Step 5. Learn

Files: `pages/wiki/WikiHome.tsx`, `pages/wiki/WikiExam.tsx`, `pages/wiki/WikiResources.tsx`,
`components/ExamRow.tsx`, `components/wiki/SourceMaterialGallery.tsx`,
`components/wiki/ResourceMetaCard.tsx`, `components/MarkdownCallout.tsx`.

Measured on `main`: the Exams list is 4,044 px with Exam P on its first screen twice; the
first reading on Resources is at 395 px; a resource card carries up to seven chips.

- **Exams:** one ladder. Remove the *In progress* group; the reader's exams carry their date
  and "34% ready" on their own row. Remove the "Exam Resources" card (the choice at the top
  replaces it) and the "Exam Study Guides" card on Resources.
- **An exam's page:** the tile and title, one line of facts (the name, the date as text, the
  readiness), three labelled controls at 12 px (Info, Syllabus, the sitting). Learning
  objectives come before the folds about format. An objective row: its name, "23–30% of the
  exam · 12 of 31", and the bar. Slot: **Practice Exam 5**; in an open objective, **Practice
  this objective · 10**.
- **Resources:** a search bar, then one row of filters: Exam (opens on the exam in focus,
  which also picks the body), Publisher, Year, and Edition only once one exam is chosen. The
  exam tile strip goes. A reading is a row: a small cover, the title, one line of facts as
  text ("Werner & Modlin · 2016 · 5th ed. · CAS"), and a PDF mark. The same row in an exam's
  Source Material. 24 at a time, as built.
- **A resource page** keeps the Reference Card. Slot: **Read PDF**; Get a copy is a row.
- **Done when:** the ACAS ladder fits one phone screen, the first reading is above 220 px,
  and no fact on either page is drawn as a chip.

### Step 6. Practice

Files: `pages/Landing.tsx`, `components/landing/*`, `pages/Flashcards.tsx` (3,185 lines;
split it as part of this step), `components/ConceptTile.tsx`, `lib/quizSetup.ts`.

Measured on `main`: a flashcard's face is 225 of 844 px with about 390 px empty under it; the
builder's four settings are unlabelled icons.

- **The builder** on the shared surface (no coloured slab): the count with − and +, the time
  estimate, then labelled rows: Topics, Difficulty, Timed (a switch), Show answers after each
  question (a switch), "N new concepts · Read first". Then Practice Exam and Past Papers as
  rows. Slot: **Start quiz**. Today's Study Plan is not repeated here.
- **Flashcards opens on the Deck**: a search bar, Level and Topic filters, every card as a
  `ConceptTile`. Slot: **Study · N cards**, the count following the filters. A tile opens
  Study at that card. Adding cards is in the header's More.
- **Study** fills the screen and the bar leaves, as in a quiz. Header: close, `‹ 1 of 72 ›`,
  More. The front shows the level as pips with its word, the exam, the name, "Tap to turn".
  Turned, it shows the concept page's definition and formula, and the slot reads **Got it**
  (ticks the card and goes on). The Flip switch, the "D Σ" menu and the unlabelled chevron
  move into More with labels, or go.
- **An empty deck** says how a card is collected, shows the first few uncollected tiles, and
  its slot is **Start a quiz**. No search bar, filters or switches.
- **Done when:** a card's face is at least 60% of the screen in Study, and
  `e2e/flashcard-focus.spec.ts` is rewritten for Deck and Study.

### Step 7. Apply and Settings

Files: `pages/Project/ProjectsHome.tsx`, `pages/Project/index.tsx`, the new-project dialog,
`data/pcpaProjects.ts`, `pages/Settings.tsx` (1,131 lines; split into the page and its
sub-pages), `components/AiConnectorCard.tsx`.

- **Projects:** a line of the rules as text ("16-day window · 1,250 words · 5 appendices ·
  next CAS window Dec 16–31", the dates from the sittings tables, never typed). **Open**
  attempts first, each with its mode, word count against 1,250 as a bar, and its day. Then
  the briefs as rows under the PCPA tile. Slot: **Continue · Day 4 of 16** with an attempt
  open, **New attempt** without. One way to start, not two.
- **Without Pro** the same page: the briefs listed and readable (the brief view opens),
  starting an attempt locked, the slot **See Pro**; a visitor's slot is **Sign in**. Check
  what the page's Pro gate hides today (`Project/index.tsx`) and gate the attempt, not the
  brief.
- **Starting** asks mode, language and data, each an underlined choice; data only for a brief
  done before.
- **Settings:** the reader first (character, name, email, plan, Edit), then grouped lists:
  **Study** (Exams and credential track, Daily goal), **Preferences** (Theme: System / Light
  / Dark; Sound as a switch, with volume), **Account** (Email and password, Plan),
  **Connect** (AI assistants), **Your data** (Usage measurement as a switch, Export your
  answers, Reset study history, Delete account), **Help** (Contact us, Sign out). A long task
  is its own page behind its row, pushed like any page. Reset and Delete are rows of text in
  the wrong-answer colour, last in their group, each with its confirmation. No "Back to"
  link. A visitor sees the sign-in form, then Preferences and AI assistants.
- **Not in Settings:** the level, quests, league and reminders (they stay on Today).
- Remove the token switch from step 3; the old look goes.
- **Done when:** Settings is under 1,400 px on a phone, a reader without Pro can read a brief
  in `e2e/pcpa-project.spec.ts`, and the lint ceilings of step 3 are at zero or a named
  exemption.

## 6. Not known yet

- The branch's screens were not rendered for this plan (step 0 does it).
- Everything a long-lived account shows: months of history, a full deck, the overlay queue
  after a signed-in quiz. The measurements here are a visitor's and a fresh account's.
- A real phone and a screen reader. The 200 ms verdict wants a hand on a phone before it is a
  token.
- Start to first question on a production build. If it is over 400 ms, fetch the question bank
  when the builder opens.
