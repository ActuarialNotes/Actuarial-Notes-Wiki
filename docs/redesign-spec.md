# Redesign spec

_Written 2026-11-23 as the handoff for implementation, and extended the same day with
Practice, search, You and Apply (§7a to §7c), which completes the first design of every place. It follows the review in
`docs/design-review.md` (roadmap X11) and a second review of the Dashboard, Study Guides, Quiz,
Projects and Settings done the same day. The screens are drawn on a design canvas:
<https://claude.ai/artifact/Er5o5o1SUw8emHPtV3RQU7>. The canvas is the reference for how a
screen looks; this document is the reference for what was decided, what each screen replaces
in the code, and the order to build it in._

The goal every screen is held to: **a person learns actuarial science and can apply it.**

Read `docs/design-review.md` §5 first. Its direction stands (four places, one exam in focus, a
next step at the end of every screen). Where this document differs, this document wins; the
differences are listed in §9.

---

## 1. What is designed, and what is not

| Area | Canvas page | Screens (file on the canvas) | Status |
|---|---|---|---|
| Today | Today | `Main` (Pro), `Free`, `FirstDay`, `Done`, `Open` (concept reader over Today), `Length` (session length sheet), `Syllabus`, `Analytics`, `Desktop` | Designed, phone and desktop |
| The session | Session | `Question`, `Feedback` (after a miss), `Results` | Designed, phone only |
| Exam switcher | Exam switcher | `Switcher`, `AddExam`, `ExamDate` | Designed, phone only |
| Learn | Learn | `Exam` (exam page), `Concept` (concept page) | Designed, phone only |
| Practice | Practice | `Practice` (home), `Setup` (the quiz setup sheet), `Papers` (past papers, drawn for Exam 5), `Flashcards`, `SearchAll`, `SearchQuestions` | Designed, phone only |
| A written part | Session | `Written` (self-graded, marked Partial) | Designed, phone only |
| You | You | `You` (profile), `League`, `Settings` | Designed, phone only |
| Apply | Apply | `Apply` (home), `ApplyTools`, `Tool`, `Project` (an attempt in progress) | Designed, phone only. `Tool` is a restyle of the existing template, not a redesign |

Not drawn: the feedback screen after a correct answer; the "Edit" state of the exam switcher;
desktop layouts for anything but Today; a past paper's own screen (pass rate, the paper and
examiner's report PDFs); the flashcard deck's management (add, remove, reorder, the grid);
Projects' locked state for a reader without Pro; Apply for an exam with no project and no
tools; Workflows' own screens (unchanged by this design); the Store, Help and Gem Shop behind
the profile.

Each canvas file is `project/<Name>.dc.html`: plain HTML with inline styles, readable with the
Artifact tool's `read` action. Every figure in them is sample data (Exam P at 27%, 52 days,
a 25-minute session). The colours are literal hex values because the canvas has no access to
the app's tokens; §2 says how they map.

---

## 2. Visual rules

The maintainer's brief: high-contrast black and white, text legibility first, design that
carries the meaning so a caption doesn't have to (see `docs/visual-noise-review.md`), and
minimal visual noise.

### 2.1 Colour

The canvas is drawn in the dark theme. Build with the app's existing theme tokens
(`docs/style-guide.md` §2), never the canvas's hex values, so the light theme is the same
design inverted.

| Role | On the canvas | Rule |
|---|---|---|
| Background | `#000000` | One background everywhere. **No filled card surfaces.** A card or tile is a 1 px outline in the line colour |
| Text and icons | `#ffffff` | One text colour. Hierarchy comes from size and weight, not from a second, greyer text colour |
| Line | `#444444` | The one neutral: hairlines, empty tracks, outlines of things that are not selected |
| Control outline | `#ffffff` | Anything pressable that isn't the screen's main action has a 1.5 px outline in the text colour |
| Main action | white fill, black text | **One per screen** (Start, Check, Next, "Fix these 3", "Practice this"). This is Ink's inverted solid (`components/ui/ink.ts`) |
| Exam | the exam's own hue | Only on the exam's logo tile (`ExamLogo`, `examAccentStyle`). Nothing else on a screen takes the exam's colour |
| Correct | green `#3ddc84` | Answer states only, wherever answers are counted: progress segments, the feedback rows, results, Analytics |
| Incorrect | red `#ff5247` | Same |
| Partial | amber `#ffb224` | A self-graded written part marked Partial (canvas: `Written`): its progress segment and its grade button |
| Unanswered | mid grey `#8a8a8a` | Same places as correct and incorrect. Distinct from "not reached yet", which is the line colour |

Use the app's existing semantic state colours for correct, incorrect and partial
(`docs/style-guide.md` §4.1) if they are close; the hex values above are what was approved on
screen.

### 2.2 Concept levels

A concept's level is a small rounded square, shaded:

| State | Square |
|---|---|
| New | empty, 1.5 px outline in the line colour |
| Level 1 | dark grey fill (`#5c5c5c` on black) |
| Level 2 | light grey fill (`#a8a8a8`) |
| Level 3 | solid text colour (white on black) |
| Forgotten | empty, dashed outline in the text colour |
| In today's session | the same square with a 2 px outline in the text colour, offset 2 px |

This is neutral shading, not the green ramp the readiness ring and `MasteryBadge` use today.
It was chosen over a fill-from-the-bottom version. Applying it means one shared component for
the square, used by the Syllabus screen, the exam page, the concept page's level button, the
results' "Levelled up" rows and (later) `ConceptTile`. Green now means "correct" only.

### 2.3 Type, shape, size

- The app's font. Nothing under 13 px. Body text on reading screens is 16–17 px at 1.5 line height.
- Big figures (days left, score, percentage) are 34–64 px, bold, with their unit beside them at
  17–22 px. A figure is never explained by a caption under it.
- Touch targets are at least 44 px. Main actions are 58 px tall, fully rounded.
- Cards have a 22 px radius; tiles 18 px; rows inside a card are separated by hairlines.
- Popups (the session length sheet, the exam switcher, the concept reader) are black with a
  1.5 px edge in the text colour, and the page behind them is dimmed to about 30%.
- Icons carry a visible label except close, back and "more" (`docs/design-review.md` §5.10).

### 2.4 What a screen may not do

- More than one filled button.
- Grey text standing in for design. If a fact needs a sentence under it, redraw the fact.
- A percentage, a ring and a fraction for the same number.
- A hidden menu behind a title. A title is text.

---

## 3. Decisions made

| # | Decision | Notes |
|---|---|---|
| R1 | **The daily session is free.** Pro sells the plan paced to the exam date (the tick on the syllabus bar, "Pace my plan to Jan 14"), Analytics and the daily podcast | Changes what Pro includes today: `Dashboard.tsx` builds no plan for a free account (`studyPlan = isPro ? computedPlan : null`). The Upgrade page and its copy need the same change |
| R2 | **Four places: Today, Learn, Practice, Apply**, as a bottom bar on phones and a rail on desktop. Projects, Tools and Workflows all live in Apply | Confirms D-DR1. The profile button (top right on a phone, foot of the rail on desktop) opens You |
| R3 | **Settings is not account-only.** It also holds each exam's date, session length, the daily goal and the daily email. **It holds no quiz settings**: when answers show, Timed and tap-to-read concepts stay in the quiz setup sheet, where they are used | §7b |
| R4 | **A session is sized by time.** The reader picks 10, 25, 45 or 120 minutes; what doesn't fit carries over | Replaces today's uncapped session (`lib/todaySession.ts` takes every outstanding miss) |
| R5 | **No readiness wheel and no time bar on Today.** The syllabus is one bar with a percentage | The ring's information moves to the Syllabus screen as level squares |
| R6 | **Syllabus and Analytics are overlays on Today**, each opened by its own tile (changed 2026-11-23; the canvas draws them as separate screens) | |
| R7 | **The exam in focus is the one last used**, on every device; the nearest sitting only the first time | |
| R8 | **Per exam:** countdown, session, syllabus, Analytics. **Per account:** the week's check marks, streak, level, quests | Studying either exam keeps the streak |
| R9 | **Session length is one setting**, shared by all exams, with "Use this every day" | |
| R10 | **"Edit" on the exam switcher** holds change date, mark as passed and remove. A passed exam leaves the switcher | Not drawn |
| R11 | **A visitor's first screen is Add an exam**, with progress kept in the browser | Confirms D-DR2 |
| R12 | **Answer colours:** green correct, red incorrect, amber partial, grey unanswered | §2.1 |
| R13 | **Levels are shaded squares** in neutral greys | §2.2 |
| R14 | **Popups are black**, not grey | §2.3 |
| R15 | Free-plan upsell wording: **"Pace my plan to Jan 14"** (the date is the reader's exam date) | The maintainer's wording |
| R16 | **The quiz card's settings are icons with their current value beside them** (topics, difficulty, timer, when answers show) | §7a. The icons alone were hard to read on a phone; the words alone were rejected |
| R17 | **Flashcards is a row inside Practice**, not a place of its own | Confirms `docs/design-review.md` §5.2 |
| R18 | **One search**, opened from Practice, covering concepts, resources and questions | §7a.4 |
| R19 | **Apply opens on three entries, in this order: Projects, Tools, Workflows.** Each is tapped into; Apply does not open on the tools list | §7c |
| R20 | **Delete account is plain red text** at the end of Settings, never a filled button | §7b |

---

## 4. Today

Replaces `pages/Dashboard.tsx`, `components/ReadinessCard.tsx`,
`components/dashboard/TodaySessionCard.tsx` and `SessionWheel.tsx`. Canvas: `Main`, `Free`,
`FirstDay`, `Done`, `Desktop`.

### 4.1 Layout, top to bottom (phone)

1. **Exam switcher** (logo tile, "Exam P", chevron) and the **profile button**. No search bar,
   no export, bell or help icons; those move to You.
2. **Days left** as one large figure, with the exam date beside it. One date only: the
   reader's own. Tapping the date changes it.
3. **The week:** seven circles, Monday to Sunday. A day studied is a filled circle with the
   check (`components/CheckMark.tsx`); today is an outlined circle; the rest are in the line
   colour. This is the streak's week and is per account (R8).
4. **The session card** (§4.2).
5. **Two tiles:** Syllabus (percentage and bar) and Analytics (accuracy and a small green and
   red chart). Each opens its screen (§4.4, §4.5).
6. The place bar.

Everything above fits one 390 × 844 screen with the session's Start visible. That is the
acceptance test for the layout: **Start is on the first screen for every session length.**

On desktop (`Desktop`): the rail on the left; the session card in a left column with its
concepts listed under each step; the days, week, Syllabus (bar and level squares by objective)
and an Analytics summary in the right column.

### 4.2 The session card

- Title "Today" and the **session length** control ("25 min", §4.3).
- A **segmented bar**, one piece per step, each as long as its share of the minutes. Pieces
  fill with the text colour as steps are finished.
- Up to three **steps**, in the order they are done: **Fix mistakes**, **Learn**, **Review**,
  each with an icon, its name and its count. Fix shows "3 of 15" when more misses are waiting
  than fit. A step with nothing in it is not shown.
- **Start**, the screen's one filled button. It runs the whole session as one quiz, as today
  (`nextSessionAction`, `storeSessionMistakes`, `sessionQuizIds`).

Tapping a step unfolds its concepts in place. Tapping a concept opens it in the concept
reader (`ConceptPopup`), over the lower part of the screen, with the session's concepts as
the walk (`sessionWalk`). While the reader is open the rest of Today is dimmed and the open
concept's row stays lit (canvas: `Open`). The reader's footer is Previous, **Practice this**
(filled) and Next.

**States**

- **First day on an exam** (`FirstDay`): one step, Learn, with its concepts listed open,
  since there are only three. Syllabus reads 0%; Analytics reads a dash. No empty wheel.
- **Finished** (`Done`): the bar is full, the title carries a check, the steps become Fixed,
  Learned, Reviewed with their counts. The filled button is "Fix the 1 you missed" when
  something was missed; under it an outlined "Keep going · 10 min". The Syllabus tile shows
  today's gain as a raised end on the bar and a small "▲ 2".
- **Free plan** (`Free`): the same card and the same session (R1). Under it one outlined row,
  a lock, "Pace my plan to Jan 14" and a Pro tag, leading to Upgrade. The Analytics tile shows
  a lock and a Pro tag in place of the figure. There are no other upsells on the screen.

### 4.3 How the session is built

This is the part with new logic. Put it in `lib/todaySession.ts`, pure and tested.

- **Budget:** the chosen minutes divided by the exam's pace (`lib/quizTiming.ts`) gives the
  number of questions. For an exam paced by the point, or with no pace on file, use a default
  pace and say so in the code; the maintainer has not ruled on this.
- **What fills it, in order:** outstanding mistakes (oldest first), then new concepts, then
  reviews. No single step may take the whole budget while another has work waiting. The split
  drawn on the canvas for 25 minutes is 3 fix, 2 learn, 4 review. **The exact split rule is
  not decided.** Propose one in the PR (for example: mistakes up to a third of the budget,
  the rest to the plan in its own order) and get it confirmed.
- **Pro:** Learn and Review come from today's study plan (`lib/studyPlan.ts`), as now.
- **Free:** Learn is the next New concepts in syllabus order (`lib/studyPlanOrder.ts`);
  Review is the concepts closest to stepping down a level (`decayIfStale` in
  `lib/mastery.ts`). No pacing to the exam date.
- **Carry-over:** what doesn't fit stays outstanding and is offered again tomorrow, or by
  "Keep going" today.

**The session length sheet** (`Length`): four options, 10, 25, 45 and 120 minutes. Each
shows what fits as dots, one per question, grouped Fix, Learn, Review. A key under the list
names the three groups. "Use this every day" keeps the choice (R9). The setting is stored
with the account, and with the browser for a visitor.

### 4.4 Syllabus

Canvas: `Syllabus`. The percentage is `computeExamReadiness` (`lib/readiness.ts`), still the
one readiness number, now labelled **Syllabus** on every surface. It is coverage, and the old
label "ready" read as a forecast of passing.

- The percentage with today's movement (`lib/readinessDelta.ts`), and the bar.
- **Pro:** a tick on the bar where the plan expects the reader to be today. How that position
  is derived from the study plan is not decided; propose it in the PR.
- Each learning objective: its name, the reader's percentage, its concepts as level squares
  (§2.2) with today's outlined, and its share of the exam.
- A key for the squares.

Built as an overlay on Today (`SyllabusOverlay`, changed 2026-11-23): the Syllabus tile, and
the Syllabus heading on desktop, open it, and it ends in a link to the exam's study guide
(§7.1). A square names its concept when pointed at and opens it in the concept popup.

The Exam Readiness popup and `StudyGuideRadial` / `readinessRing.ts` have no place in this
design. Remove them from Today; delete them only once nothing else draws them.

### 4.5 Analytics

Canvas: `Analytics`. Replaces `components/analytics/AnalyticsSection.tsx` and its dialog. Pro
only (R1); the data and the span picker are what exist today (`lib/analyticsSummary.ts`,
`lib/performanceAnalytics.ts`).

- A 7 / 30 / 90 day picker.
- **Accuracy:** the figure, and answers per day as stacked bars, green correct and red missed.
- **Pace:** the reader's time per question as a dot on a line, with the exam's pace as a tick.
- **Marks lost:** one bar per section, as long as the section's share of the exam, the lost
  part in red, with the number.
- **By difficulty:** three bars.

---

## 5. The session (question, feedback, results)

Replaces the chrome of `pages/Quiz.tsx`, `components/ExplanationPanel.tsx` and
`pages/Review.tsx`. Canvas: `Question`, `Feedback`, `Results`. The place bar is hidden for
the whole session.

### 5.1 The question

- One row above the question: **leave** (a cross), the **progress bar**, and **more**. More
  holds flag, question info (with Fact Check), sound, the timer and the quiz's settings. The
  six header icons go.
- The progress bar is the session card's bar cut into one segment per question, grouped by
  step. A segment turns green or red as it is answered, grey if skipped; the current one is
  the text colour; the rest are the line colour.
- The question, then the options as outlined rows with their letter. The picked option is
  filled.
- **Check**, the filled button, at the foot.

A timed quiz shows its clock in the top row beside the bar. Keyboard shortcuts and the
existing resume behaviour (`lib/quizResume.ts`) are unchanged.

### 5.2 After an answer

For a miss (`Feedback`):

- The question folds to one line that can be reopened, so the lesson leads.
- Two rows: the reader's answer, outlined in red with a cross and struck through; the right
  answer, filled green with a check.
- The solution in plain text on the page, formulas in outlined boxes that scroll sideways.
- A row that opens the concept in the reader.
- At the foot: **Try a similar one** (outlined) and **Next** (filled). "Try a similar one"
  queues another question tagged with the same concept; it is new behaviour.

The "Choose any answer to continue" caption and the shortcut it describes are removed.
*Change Answer* stays only when answers are held to the end (D-DR4). The state after a
correct answer is not drawn: same layout, one green row, no "Try a similar one".

**A written part** (`Written`, replaces the layout of `components/AnswerReference.tsx`,
`SampleChecklist.tsx` and `SelfGradeButtons.tsx`; the logic in `lib/writtenAnswer.ts`,
`lib/essayChecklist.ts` and `lib/numericCheck.ts` is unchanged):

- The part's label and points, the part as printed, then the reader's answer in an outlined box.
- The sample answer as the checklist the reader ticks, with how many points are asked for in
  its heading ("any two").
- The examiner's report folded in a row below.
- Three grade buttons, each outlined in its colour and filled when picked: **Full** (green),
  **Partial** (amber), **None** (red), each with the points it gives. The suggested grade is
  marked as it is today; the reader still picks.
- **Next**, filled. The part's progress segment takes the grade's colour.

### 5.3 Results

Order, top to bottom (`Results`):

1. The score as one figure ("6 of 9") and the time taken. No percentage, no ring.
2. The progress bar in its final colours, and under it the three counts with their dots:
   correct, incorrect, unanswered.
3. **To fix:** each missed or unanswered question as a row (its concept, one line of the
   stem, its dot) that opens the solution. Then the screen's filled button, **Fix these 3**,
   which starts the existing mistakes quiz on them.
4. **Levelled up:** each concept that moved, with its before and after squares, and the
   syllabus bar with the gain. This replaces the full-screen `ConceptLevelUpCeremony` for an
   ordinary level change. Keep the ceremony only for a card collected for the first time
   (any concept's first move from New to Level 1) or a concept reaching Level 3
   (`docs/design-review.md` §5.8; decided 2026-11-23, see §8, Phase C).
5. The questions answered right, folded under one row.
6. **Back to Today**, outlined.

With nothing missed, steps 3 and 5 are absent and the page ends on what was gained.

---

## 6. The exam switcher

New. Canvas: `Switcher`, `AddExam`, `ExamDate`. It replaces five separate exam choosers: the
Dashboard's chips, the exam lists on the Quiz and Study Guides tabs, and the exam strips on
Resources and the Store.

**State.** One "exam in focus" for the account, stored with it and mirrored in the browser;
for a visitor, the browser alone. Every place reads it. It is the last exam used (R7). The
reader's exams are `exam_progress` rows, as now (`contexts/ExamProgress`).

**Flow.**

1. Tap the exam at the top left of any place. A sheet lists the reader's exams, each with its
   logo, days left and syllabus bar, the current one checked. Tapping one switches every
   place to it and closes the sheet.
2. **Add an exam** opens a screen with the SOA / CAS / CIA picker (`lib/bodyFilter.ts`), the
   ready and beta exams by credential (`lib/examStatus.ts`, `data/tracks.ts`), exams already
   added shown with a check, and in-development exams folded under one row per credential
   (D-DR3).
3. Picking an exam asks **"When is your exam?"**: the next three sittings from the published
   tables (`data/examSittings.ts`), "Another date" and "Not sure yet". Dates are transcribed,
   never constructed; an exam with no sittings on file offers only the last two. Confirming
   adds the exam, makes it the exam in focus and lands on Today in its first-day state.

"Edit" (R10) and the desktop form (a popover from the rail) are not drawn.

---

## 7. Learn

Canvas: `Exam`, `Concept`. Replaces the layout of `pages/wiki/WikiExam.tsx` and
`pages/wiki/WikiConcept.tsx`; the article rendering (`WikiArticle`), the vault and its
parsers are untouched.

### 7.1 The exam page

- The exam's subject and format ("30 questions · 3 hours"), the syllabus bar with the
  percentage and days left, and two labelled buttons: the official syllabus PDF and dates and
  fees (the existing `ExamSyllabusButton` and `ExamSittingInfoButton`).
- Each **learning objective** is a card: name, the reader's percentage, its share of the
  exam. Folded, it shows its concepts as level squares.
- Opened, it shows the syllabus's own numbered sentences, unchanged (they are transcribed).
  Under each sentence its concepts are **pills**, each a level square and the concept's name;
  a concept in today's session has an outline in the text colour. A pill opens the concept.
  This replaces the paragraph of underlined links, and the weight bar under each objective
  row that read as progress.
- An opened objective ends in the page's filled button, **Practice <objective>**.
- Rows at the foot: Readings (the Source Material shelf), Exam format, What you should know
  first.

The title is no longer a menu. Its rows move: Start Quiz to the Practice button, Today's
Study Plan to Today, Fact Check to a "more" button if the page keeps one.

### 7.2 The concept page

- Top row: back to where the reader came from (`hooks/useBack.ts`), the reader's **level as a
  button** (square and "Level 2") that opens Learning Progress, and **more** (add to
  flashcards, listen, fact check). The title is plain text; `ConceptActionMenu`'s rows are
  split between these three controls.
- The article as it is: figure, definition, formula, examples, trap. The example and trap
  cards are outlines. The trap card keeps its icon and loses its amber ground, since amber
  now means Partial.
- At the end: **Next in <objective>**, the next concept with its level square.
- A fixed foot: **Practice this · 152 questions**, the filled button. A concept with no
  questions shows none.

The same foot is in the concept reader (§4.2), so a concept ends the same way wherever it is
read. The concept figures are generated in colour (`docs/concept-figures.md`); whether they
get a monochrome pass is undecided, so leave them as they are.

---

## 7a. Practice

Canvas: `Practice`, `Setup`, `Papers`, `Flashcards`, `SearchAll`, `SearchQuestions`. Replaces
the Quiz tab (`pages/Landing.tsx`, `components/landing/`), `pages/Flashcards.tsx` and
`pages/Search.tsx`. The builder's logic (`lib/quizBuilder.ts`, `lib/quizSetup.ts`,
`lib/quizDifficulty.ts`, `lib/quizTiming.ts`, `lib/revealMode.ts`) is unchanged.

### 7a.1 Home

The page opens on the exam in focus; there is no exam list.

1. A **search** row (§7a.4).
2. **The quiz card**, an outline (the exam-coloured fill goes, §2.1): the count with minus
   and plus, the time it should take, the four settings as pills that each show an icon and
   the current value ("All topics", "All levels", "Untimed", "As you go"), and **Start**, the
   filled button. Any pill opens the setup sheet at its section, as now.
3. Rows: **Practice Exam** (its length and time), **Past papers** (labelled *Sample
   questions* for an exam with no released sittings, `examSourceLabel`), **Flashcards** (the
   deck's size).

Today's Study Plan is not on this page; the day's session is on Today. Games stay hidden
(`GAMES_ENABLED`).

### 7a.2 The setup sheet

`Setup`, a black popup. Topics as checkboxes with their question counts; difficulty as three
buttons with counts, any combination; three labelled switches (Timed with the exam's pace,
Show answers after each question, Tap concepts to read them); and its own filled button,
"Start 12 questions".

### 7a.3 Past papers and flashcards

- **Past papers** (`Papers`): one row per sitting, newest first. A paper the reader has sat
  shows its last result as a small bar in the answer colours. Older sittings fold under one
  row. Unconverted papers stay listed and dimmed, as now (`lib/pastExams.ts`). Pass rates and
  the PDF buttons belong on the screen a paper opens to, which is not drawn.
- **Flashcards** (`Flashcards`): one card at a time, with the concept's name, its level
  square, the definition and formula, and a flip mark. The foot is the concept reader's:
  Previous, **Practice this** (filled), Next. Managing the deck is not drawn.

### 7a.4 Search

One search for the whole app, opened from Practice's search row (and from Apply's Tools
screen for tools).

- **Everything** (`SearchAll`): the field, then four tabs with counts: All, Concepts,
  Resources, Questions. Under All, each kind shows its first few results and a row for the
  rest. A concept row leads with its level square and says where it sits on a syllabus; a
  resource row has its cover, title, author and year; a question row has two lines of its
  stem (`lib/questionPreview.ts`), its concept and difficulty. The matched words are
  highlighted in every row (`components/SearchHighlight.tsx`).
- **Questions** (`SearchQuestions`): the same search narrowed, with the question filters
  (`components/QuestionFilterBar.tsx`: Difficulty, Type, Source, Sitting). Each row leads
  with a dot: green if last answered right, red if missed, an empty ring if not tried
  (`lib/questionAttempts.ts`). The screen ends in a filled button, **Practice these 38**,
  which starts a quiz on the results.

Results cover every exam, with a result from another exam labelled by its exam. Whether
search should default to the exam in focus is open (§10).

---

## 7b. You

Canvas: `You`, `League`, `Settings`. Built (§8, Phase H). Opened by the profile button at the top right of every
place (the foot of the rail on desktop). Replaces `components/LevelBadge.tsx`'s popup, the
Dashboard header's export, reminders and help icons, and `pages/Settings.tsx`.

### 7b.1 Profile

- The reader's character (tapping it changes it), name, Pro tag, and level with its progress
  to the next (`lib/xp.ts`).
- Two tiles: the streak in days (`lib/streak.ts`) and gems.
- A **Today** card: the daily goal as a bar with its figure, which opens the goal picker,
  then the day's quests (`lib/quests.ts`), each with its progress. A finished quest shows
  **Collect**, the screen's filled button.
- Rows: League (tier and rank), Settings, Store, Help.

### 7b.2 League

The week's table for one exam, with the exam switchable in place (leagues are per exam). The
reader's row is filled. A labelled line marks where promotion ends and another where
relegation begins (`lib/leagues.ts`). Days left in the week are in the header. Leaving is an
outlined button at the foot.

### 7b.3 Settings

One screen, grouped, every value shown on its row:

| Group | Rows |
|---|---|
| Studying | Each exam with its date; Session length; Daily goal; Daily email |
| App | Theme; Sound; AI assistants |
| Account | Name; Email; Password; Pro |
| Your data | Usage analytics; Export; Reset study history |

Then **Sign out**, outlined, and **Delete account** as plain red text (R20). There is no
Quizzes group (R3). Theme and sound leave the sidebar's foot and live here only.

---

## 7c. Apply

Canvas: `Apply`, `ApplyTools`, `Tool`, `Project`. Replaces the sidebar's Projects, Tools and
Workflows rows.

### 7c.1 Home

Three entries, in this order, each a card that is tapped into (R19):

1. **Projects**: how many are in progress, and the open attempt's name with its four-step
   bar (Brief, Workspace, Report, Submit).
2. **Tools**: how many belong to the exam in focus, and the reader's recent tools as pills,
   each with the level square of the concept it computes (`lib/toolRecent.ts`,
   `ToolSpec.concepts`).
3. **Workflows**: how many are saved, and the most recent. Shown only to accounts that can
   use Workflows (`lib/workflowsAccess.ts`).

### 7c.2 Tools

`ApplyTools`: a search row, two tabs (the exam in focus, and All), the tools grouped by
practice area, each row leading with the level square of its concept, and a row for Data
sources. Which tools belong to an exam comes from `lib/toolExam.ts`.

### 7c.3 A tool

`Tool` shows the palette on the existing template (`components/tools/ToolTemplate.tsx`) and
two additions. **Do not rebuild the template from this drawing**: source tags, the keypad
sheet, chains, figures and the rest of `docs/tool-template-v3.md` stay. What changes:

- The answer card is an outline, not filled with the exam's colour.
- **Learn the method** is a labelled row leading to the concept, with the reader's level
  square (it was a book icon).
- **Practice this**, filled, at the foot, starting a quiz on the tool's concept.

### 7c.4 A project

`Project`, the overview of one attempt, replaces the four equal tabs as the way into it
(`pages/Project/`). The brief's title and company, the mode as a tag, the four-step bar with
the current step marked, and the submission checklist with its figures (brief read, code runs
clean, words written against the limit, appendices, submission questions). The filled button
is **Continue in <the current step>**. A row reads the brief. The workspace itself is
unchanged.

---

## 8. Build order

Each phase is one PR that can ship on its own. Phases A to E and G to I work under the
**existing sidebar**. Phase F, the four-place navigation, goes last: it moves every tab at
once and needs You to exist.

| Phase | What | Depends on |
|---|---|---|
| **A. Visual base** (built 2026-11-23) | The shared pieces: the level square, the answer-state colours, the outline card and tile, the black popup. Update `docs/style-guide.md` | |
| **B. Today** (built 2026-11-23) | §4: the new Dashboard, the session sized by time, the free session, the Syllabus and Analytics screens, the session length sheet. The icons removed from the header keep working from Settings until You exists | A |
| **C. The session** (built 2026-11-23) | §5: question header, feedback, "Try a similar one", results | A |
| **D. Learn** (built 2026-11-23) | §7: exam page and concept page, the reader's "Practice this" | A |
| **E. Exam switcher** (built 2026-11-24) | §6: the exam in focus, the sheet, Add an exam. The old exam lists and strips are removed as each place adopts it | B, D |
| **G. Practice** | §7a: the home, the setup sheet's restyle, past papers, flashcards as a row, and the one search. §5.2's written part | A, C |
| **H. You** (built 2026-11-23) | §7b: profile, league, Settings. The Dashboard's export, reminders and help move here | A |
| **I. Apply** (built 2026-11-23) | §7c: the home, the tools list, the two additions to a tool, the project overview | A, D |
| **F. Navigation** | The place bar and rail, the profile button; Flashcards, the Store and the old tabs lose their sidebar rows | B, D, G, H, I |

**Phase A is built.** The pieces and where each lives are `docs/style-guide.md` §13: the
`--ground`, `--level-*` and `--answer-*` tokens, `LevelSquare`, `lib/answerState.ts` and
`AnswerDot`, `OutlineCard` / `OutlineTile`, the `edge` button variant and `main` size, and
`Popup`. Today and the session use them; `/design/base` on the dev server shows them all.

**Phase B is built.** Today is `pages/Dashboard.tsx` (still at `/dashboard`, the sidebar row
still "Dashboard" until Phase F) over `components/today/`, `hooks/useTodaySession.ts` and
`lib/todaySession.ts`; Analytics is an overlay on it (`AnalyticsOverlay` in
`components/today/AnalyticsScreen.tsx`, `lib/todayAnalytics.ts`; `/dashboard/analytics`
redirects to Today and opens it). What was decided while
building it:

- **The budget** is the minutes at the exam's own pace, rounded to the nearest question and
  never none: Exam P's 6:00 gives 2, 4, 8 and 20 questions for the four lengths. The canvas's
  dots (nine questions in 25 minutes) are sample data. A paper paced by the point prices a
  question at its seconds per point times the points an average question of its bank carries;
  an exam with no pace on file uses 5 minutes a question, a default kept in the code
  (`DEFAULT_SECONDS_PER_QUESTION`) and never shown as the exam's pace.
- **The split** (`splitSession`): Fix a third of the budget, Learn a third of the rest, Review
  the rest; every step with work gets one question when the budget allows; a share a step
  can't fill goes to Review, then Fix, then Learn. A Learn or Review concept costs one question.
- **The plan's tick** (`planTickPct`): a straight line from 0% on the plan's first day to 100%
  on its ready date; absent once the target has passed or the plan is in review mode.
- **The session is frozen for the day** in the browser once built (`StoredSession`), because a
  list rebuilt from the record would never finish. It is finished when everything has been
  tried; "Fix the N you missed" is the questions missed today; "Keep going" builds ten more
  minutes from what is still waiting.
- **The session length** is kept in the browser and, for "Use this every day", on the account
  (`user_metadata.session_minutes`).
- **Until later phases:** the date opens the study plan's settings on the date
  step; the Syllabus overlay links to the exam page; the level badge
  stands in for the profile button. The exam at the top is the exam switcher and a visitor has
  Today (Phase E, below).
- **Moved or removed:** the daily email's settings and the guide are rows in Settings (export
  was already there); the search bar, the schedule strip, the day panel and its quiz history,
  the Exam Readiness popup and the registration nudge are off Today (the nudge is still on the
  quiz builder). The daily podcast's button (Pro) is an outlined row under the Today card; it is
  not on the canvas.
- **The week row scrolls** (`weeksAround`), a week at a time, from the first day studied to the
  exam date; a week that isn't this one shows dates in place of the letters. A day picked in it
  takes the session card under its date: a paid plan's concepts for a day ahead (`planDayView`),
  otherwise one sentence (`dayNote`: what was practised on a day behind; for a day ahead, that
  nothing is planned, or that a free session is built when the day comes), and "Back to today".
  The daily plan's gem bonus is still paid (`hooks/useDailyPlanBonus.ts`) and is drawn nowhere.

**Phase C is built.** The question screen is `pages/Quiz.tsx` and the results
`pages/Review.tsx`, over `components/session/` (`SessionProgress`, `SessionMoreMenu`,
`AnswerFeedback`), `lib/sessionProgress.ts`, `lib/sessionSteps.ts`, `lib/similarQuestion.ts`,
`lib/sessionResults.ts` and `lib/gradeWords.ts`. What was decided while building it:

- **The ceremony** (decided with the maintainer, 2026-11-23): the full-screen
  `ConceptLevelUpCeremony` plays only for a card collected for the first time (any concept's
  first move from New to Level 1) or a concept reaching Level 3, and shows only those concepts
  (`ceremonyMoves`). Every move up is a row under Levelled up.
- **The overlays** stay overlays in this phase, in the order they had: the ceremony when it
  plays, the streak, the quests, the visitor's prompt to save, the plan bonus. With no ceremony
  the streak overlay opens at once.
- **Answers held to the end** (decided with the maintainer, 2026-11-23): no segment of the bar
  shows whether an answer was right until the results. An answered question is the text
  colour, one passed with no answer is the unanswered grey, one not reached is the line
  colour, and the question on screen is drawn taller. *Change Answer* is offered only in this
  mode.
- **The bar's steps:** Today's Start hands the Learn concepts over with the misses
  (`SessionMistakes.learn`); the quiz builder orders the questions Fix mistakes, Learn, Review
  (`sessionQuizSteps`) and leaves each question's step in the browser; the quiz page groups the
  bar by it only when it names exactly the questions drawn (`orderBySteps`). Any other quiz is
  one run of segments. A written part waiting for its grade is the text colour until graded,
  and a flagged question carries a dot under its segment.
- **Try a similar one** (`pickSimilarQuestion`) is offered after an incorrect or partial
  answer. It queues a question from the same exam's bank that shares a concept with the miss,
  straight after it and in the same step, and turns to it. The choice, in order: one sharing
  the miss's first concept, the most concepts shared, one answered the same way, one the
  reader hasn't seen, the closest difficulty, the fewest other concepts, the lowest id. Never
  a question already in the quiz, one kept off the syllabus, or one withheld for an open
  critical finding. When no other question exists the button is not drawn. The queued question
  counts in the score and the results like any other, and a timed quiz's allowance is not
  extended.
- **Leaving:** the cross opens "Leave this quiz?" with Keep going, **Come back later**, Finish
  quiz (once something is answered) and Quit quiz. Come back later is new: the session screen
  has no navigation of its own, so it is the way to leave without ending the quiz, and the
  Return to quiz pill brings the reader back.
- **No chrome:** the sidebar and the phone's app header are hidden on `/quiz` and `/review` at
  every width (`isSessionRoute` in `lib/mobileNavHost.ts`).
- **More** holds Flag question, Question info (with its Fact Check), the spreadsheet for an
  exam sat with one, Sound, Quiz settings (with the timer), Keyboard shortcuts and **Previous
  question**. The Back button at the foot is gone; the ← key still goes back, and the bar can
  be pressed or dragged to another question.
- **The foot:** Check, then Next (Finish Quiz or Finish Practice Exam on the last question),
  beside Try a similar one after a miss or Change Answer while answers are held.
- **Results:** the score counts points with partial credit ("6 of 9", with "points" on a paper
  whose questions carry unequal points); the counts under the bar are correct always, and
  incorrect, partial and unanswered when there are any; To fix lists every question short of
  full credit, and Fix these N starts a quiz on exactly those; the Syllabus bar's gain is
  measured against the records as they stood before the quiz. A visitor with no account has no
  Today, so the last button reads "Back to" where the quiz was started.
- **Removed:** the six header icons, the "Question N of M" dropdown, the Flag, Info and
  Spreadsheet buttons in the question bar, "Confirm Answer" (now Check), the "Choose any
  answer to continue" caption and its shortcut, the Fact Check badge under the explanation
  (it is in Question info); and from the results the percentage, the stats row, the ring and
  concept coverage card (with its score by difficulty), the pinned score header, the full
  transcript, New Quiz, Try Again and the back-to-top button. `ExplanationPanel` still draws
  the answer on surfaces outside the session (the question page).
- **Until later phases:** Practice's home, setup sheet and search are Phase G; the navigation
  is Phase F.

**Phase D is built.** The exam page is `pages/wiki/WikiExam.tsx` over `lib/examPage.ts`
(the page's markdown read into objectives, lines and pills), `components/learn/ObjectiveCard.tsx`
and `lib/syllabusObjectives.ts` (the figures, shared with Today's Syllabus panel). The concept
page is `pages/wiki/WikiConcept.tsx`; its level button, "more" and Practice button are
`components/learn/`, and the reader (`ConceptPopup`, `ConceptPagePanel`) draws the same three.
What was decided while building it:

- **A concept is one pill in its objective**, under the first line that names it: the rule
  `parseExamSyllabus` counts by, so the pills, a folded card's squares and the objective's
  percentage are about the same set (`examPage.test.ts` holds every exam page to it). A later
  sentence whose concepts were all shown already has no pills. A concept in two objectives has
  a pill in each. The opening sentence is shown, unnumbered, with its pills. A `*Key concepts:*`
  line is never drawn; its concepts are pills under the sentence above it. A concept with no
  page yet is a pill that doesn't press.
- **One objective is open at a time**, so the page has one filled button. It shows three lines,
  then "N more". Which one is open is kept for the browser session, and that history entry is
  named for it.
- **A pill opens the concept in the reader**, over the exam page, on the walk of the syllabus
  (the maintainer's call, 2026-11-23; the first build sent a pill to the concept's page). The
  open concept's pill is filled, and as Previous and Next move the walk the objective holding
  the concept opens and its pill scrolls into view. A pill is still a link to the concept's
  page (`?from=<exam>`), which a new tab, a search result or a shared link opens; that page no
  longer redirects into the exam page.
- **Practice** starts a quiz, never the setup: ten questions, or the pool when it holds fewer
  (`lib/practiceLaunch.ts`), with the reader's own quiz settings. The foot says how many
  questions the concept has. The count needs the question bank, which is fetched when a concept
  is opened or an objective unfolded; a count built with the app would spare that download.
- **The title is the exam's name** ("Exam P-1") with the subject and the paper's size under it
  ("Probability · 30 questions · 3 hours", the size from `lib/quizTiming.ts`'s pace table, absent
  for an exam with none). The canvas titles the page with the subject because the switcher
  above it names the exam; the switcher is Phase E.
- **The extras:** the sitting picker is at the top of the Dates and fees panel; the In
  Development and Beta banners are where they were; Fact Check is a row at the foot with its
  verdict; PCPA's project is a row at the foot; a passed exam reads "Passed" where the days
  left would be. The lead paragraph opens the row about the exam (Exam format, About the
  exam). The rows unfold in place.
- **No record** reads 0% with every square New. A signed-in reader who hasn't added the exam
  gets a third outlined button, "Add exam". The plan's tick is drawn for a Pro reader from
  today's cached plan. A concept is outlined as in today's session once Today has built the
  day's session in this browser.
- **In the reader**, a concept's header is its name, the level button and "more", which also
  holds Listen, the figure and focus mode; the walk's filter sits on a line above the foot when
  there is a Practice button, and between the arrows when there isn't. A reading's header is
  unchanged.
- **Removed:** the exam title's menu and its exam form in `ConceptActionMenu`
  (`ReadinessBar`, the countdown and plan-row helpers in `lib/examMenu.ts`), the strip's quiz and
  project buttons, the weight bar under an objective row, the dimmed repeat links.
- **Desktop** is not on the canvas: both pages are one column at reading width.

**Phase H is built.** You is three pages under the existing sidebar: the profile at `/you`
(`pages/You.tsx`), the league at `/you/league` (`pages/League.tsx`) and Settings at `/settings`
(`pages/Settings.tsx`), over `components/you/` (`rows.tsx`: the top row, a group of rows, a row
with its value, a switch; `YouSheets.tsx`, `SettingsSheets.tsx` and `DailyEmailSheet.tsx`: the
popups) and `lib/you.ts` (what each row says, the league's table and its two lines). What was
decided while building it, the first three with the maintainer:

- **A visitor** keeps what the browser keeps. You works without an account (the level, the
  streak, the daily goal and the day's quests are kept in the browser), drawn with the fox, with
  **Sign in** where the name would be and no Pro tag, gems tile or League row. Settings shows
  Session length, Daily goal, Theme, Sound, AI assistants and Usage analytics under a filled
  **Sign in**; it has no Account group, Sign out or Delete account, and the sign-in form it used
  to carry is gone. The league asks a visitor to sign in. A visitor's quest pays its XP alone,
  because gems are kept on an account.
- **Every Settings row is edited in place or in a popup**; nothing opens a second screen. In
  place: Theme and Usage analytics. A popup each: an exam (its date, Mark as passed, Remove from
  my exams), Session length (Today's sheet, kept for every day, without the dots), Daily goal,
  Daily email, Credential track, Sound, AI assistants, Name, Email, Password, Pro, Export, Reset
  study history and Delete account (which still asks for DELETE to be typed). Sign out signs out
  at once.
- **Volume stays in Settings**: the Sound row shows the volume, or Off, and opens a popup with
  the switch and the slider. The canvas draws a switch in place.
- **Not on the canvas:** *Add an exam* (the exam switcher's screen, since Phase E) and
  *Credential track* are rows of Studying. A subscriber's Pro row opens a popup with the renewal
  date and **Manage subscription**, so a billing page that fails to open has somewhere to say so;
  a free account's row reads **Get Pro** and goes to Upgrade; a beta tester's reads "Beta tester"
  and doesn't press. An account that signs in with Google shows "Google" on its Password row,
  and neither it nor Email presses.
- **The profile:** tapping the character opens the existing character picker. The gems tile goes
  to the Gem Shop and the Store row to the Store. A quest's row opens the quest (what it counts,
  what it pays). One filled button a screen: with several quests finished, the first one's
  Collect is filled and the others' outlined. **Help** is a popup: How Today works (the guide),
  Contact us, Restore purchase for an account without Pro, and Take the tour when its flag is on.
  A reader who opens You before Today still gets the day's quests, drawn from the concepts at
  Forgotten and the paced plan Today last kept.
- **The league:** the table shows rank, name and the week's XP, as drawn (no characters). The
  header reads "4 days left", then hours on the last day. The lines are where `zoneForRank` puts
  them: **Promoted** under the last row that moves up, **Relegated** above the first that moves
  down; Bronze has no Relegated line and Diamond no Promoted. The exam is switched in a popup and
  rides the address (`?exam=`). A reader who hasn't joined this exam's league gets the way in on
  the same screen: what a league is, how they will appear, what joining shares, and a filled
  **Join the league**. Leaving asks first. Last week's result is one line above the table until
  dismissed. A re-read of the league (a join, a quiz's XP) keeps the table on screen.
- **The ways in, until Phase F:** Today's level badge is a link to You that still counts the
  quests to collect, and the sidebar's account row is a link to You for an account and a visitor
  alike. On a phone the three screens have no app header: the profile's cross and the others'
  back arrow are the way out (`isYouRoute`, read by `lib/mobileNavHost.ts`).
- **Moved or removed:** the level badge's popup with its Quests and League tabs
  (`QuestsPanel`, `QuestsCard`, `LeaderboardPanel`, `DailyGoalPicker`); the sidebar's theme and
  sound buttons and its account menu (Gem Shop, Exams, Settings, Upgrade to Pro, Sign out); and
  from Settings the section list down its side, the study-history summary (sessions and average
  score), the "Danger zone" box and the Support card. The daily email's footer link
  (`/dashboard?reminders=1`) opens the same popup over Today.
- **Desktop** is not on the canvas: each screen is one column at reading width beside the sidebar.

**Phase I is built.** Apply's home is `pages/Apply.tsx` at `/apply`, over `lib/apply.ts` (what
each card says); the Tools screen and a tool's page are `pages/Tools.tsx`; the attempt's
overview is `components/project/AttemptOverviewView.tsx` over `lib/attemptOverview.ts`; the
four-step bar and the labelled row are `components/apply/ApplyParts.tsx`. What was decided
while building it (the first four with the maintainer, 2026-11-23):

- **A card never disappears and never counts nothing** (§10, question 7). Projects reads the
  attempts in progress, or how many briefs there are ("3 briefs"). Tools reads the tools the
  exam in focus covers ("20 for Exam 5"), or the whole catalogue's count when the exam covers
  none or no exam is in focus ("35 tools"); the Tools screen then draws no tabs and is every
  tool. Workflows says nothing beside its name until one is saved.
- **Anyone can read a brief; starting one is Pro's** (§10, question 7). `/project` is the
  list of briefs for a reader without Pro, each opening on its own page
  (`/project/brief/<case id>`, `pages/Project/BriefPage.tsx`), whose one button is **Upgrade
  to start**, or **Start this project** with Pro. The locked page is gone. Attempts stay Pro's:
  nothing of one mounts without it.
- **A tool has one concept**: the first page its method names (`toolConcept` in
  `lib/toolExam.ts`). The level square on its row, **Learn the method** and **Practice this**
  are all about that page. Practice is the concept page's own button (ten questions or the
  pool, from every bank, the count beside it) and is not drawn for a concept with no
  questions. Every tool has some today.
- **A tool belongs to every exam whose syllabus names one of its concepts** (`toolsForExam`),
  not only the earliest one, which stays the rule for the colour of a tool's sheets and marks.
  It takes the exam's own page, since Exam 6's papers share a progress key. Nothing under
  `lib/tools/` changed, so the connector's bundle is as it was.
- **The exam in focus** is the one Today shows (`hooks/useTodayExam.ts`) until the switcher
  (Phase E).
- **The Tools screen** keeps the floating search bar as its search row ("Search 35 tools");
  the area chips and "Pick up where you left off" are gone (the areas are the headings, the
  recent tools are on Apply's card). A row is the tool's name; a search result also says the
  question the tool answers, where the match may be. The published tables are not counted or
  listed: they are on Data Sources, the row at the foot.
- **A tool's page**: the answer card is a 1.5 px outline, and so is the answer pinned in the
  title strip. The title is text (the book icon is gone). Learn the method is a row under the
  inputs and opens the concept in the reader, as the icon did. Practice this is fixed to the
  foot. The exam's colour is still on the template's sheets, chain strip and figure marks: the
  three changes were the scope.
- **An attempt opens on its overview**, a view of the attempt's page like the four it leads
  to (`?view=overview`, the default while the attempt is open). Going into a view replaces the
  history entry, as switching views always has, so the browser's Back leaves the attempt; a
  view's arrow leads back to the overview. A submitted attempt has no overview and opens on
  its results. The switcher in a view's top bar and the sidebar's rows stay.
- **The steps**: Brief is done once the brief has been opened (`briefReadAt`, new on the
  attempt's record; an older attempt counts once it holds any work), Workspace once a clean
  run has passed (`cleanRun`, recorded by the Submit view's check, where the row leads),
  Report once the body has 150 words and the total is within 1,250 (the Submit view's rule).
  The current step is the first not done, drawn dashed. A later step can be done before an
  earlier one, and is drawn solid.
- **The checklist's rows are buttons** to the view where each is done. Appendices is ticked
  with one to five attached; none is not an error, and the row doesn't say it is. A rehearsal
  shows its time left beside the company; one whose window has closed is tagged Window closed
  and its button opens the report.
- **On Apply's card** the attempt's steps are read off the record alone (`recordTally`), which
  can't count the words inside an attached table's file, so within a few words of the limit
  it can differ from the overview.
- **Until Phase F** the sidebar's Projects row leads to `/apply`, and the arrows at the top of
  Projects and Tools lead up to it. The Tools and Workflows rows are as they were.
- **The Projects page and the brief** are drawn to the same rules (the maintainer's review of
  the first screenshots, 2026-11-23): one ground, outlined tiles, one text colour, the exam's
  colour on its logo alone. The Projects page is the attempts in progress, each with its
  four-step bar, then the submitted ones, and **New project** as its filled button; without
  Pro it is the briefs as rows of one tile. The brief's sections are outlined tiles with a
  plain icon, its outline chips are Ink's (the current one solid), and a stakeholder's note
  is set off by a rule at its left. The start sheet and the workspace are as they were.
- **Desktop** is not on the canvas: every screen is one column at reading width.

**Phase E is built.** The rules are `lib/examFocus.ts`; the stored half is
`contexts/ExamProgressContext.tsx`, the hook `hooks/useExamInFocus.ts`, the screens
`components/switcher/` (mounted once by `ExamSwitcherHost` in `App.tsx`, opened through
`stores/examSwitcher.ts`). What was decided with the maintainer before building it:

- **Where it is stored.** A signed-in account's exam in focus is
  `user_metadata.exam_in_focus` (an exam page's id: `P-1`, `6C`), mirrored in the browser under
  the key Today always used. The account's value wins when the app loads and each time the tab
  is returned to, so a second device opens on the exam last used anywhere; a quiz or its review
  is never switched under the reader. No migration.
- **Focus is only ever one of the reader's exams.** With nothing stored, or a stored exam the
  reader no longer has, it is the exam with the nearest date still to come, then the first.
- **Addresses.** An address that names one of the reader's exams makes it the exam in focus.
  An address that names any other exam is a **visit**: the page reads and practises as before,
  the switcher at its top left names that exam, the sheet offers "Add Exam X" above "Add an
  exam", and the focus stays where it was. Reading an exam page never requires adding it.
- **A reader with no exams** sees Add an exam as the whole of Today (and, once the Quiz tab
  adopts the switcher, of Quiz). Study Guides keeps the general guide and the credentials.
- **Visitors (R11).** A visitor's exams and dates are kept in the browser
  (`quiz.browserExams`), so `useExamProgress` works signed out; Today is open to them with a
  Sign in button where the level badge is. On sign-in the exams the account has no row for are
  added to it once, the account's own rows win, and the browser's list is cleared.
- **Add an exam** lists exam pages, so a regional exam's page says its region (picking Exam 6C
  sets the Canadian variant); ready and beta exams are rows, in-development ones are folded
  under one row per credential and each opens its study guide instead of the date question.
  It is the full ladder.
- **When is your exam?** offers at most three rows of `data/examSittings.ts`, one per start
  date; a row longer than a sitting's window (FAM's year-long registration span) is not a
  sitting and is left out. The date recorded is the window's first day (today, for a window
  already open). "Another date" takes any day from today on; "Not sure yet" records none.
- **Edit** (R10, not drawn): each exam becomes a card with Change date, Mark as passed and
  Remove. Passed is the `completed` status and Remove is `not_started`; either leaves the
  switcher and neither deletes the reader's record of the exam's concepts.
- **The sheet's order** is the soonest exam first, undated exams last. A date with nothing to
  come reads "No date".
- **Desktop** (not drawn): the same sheet as a panel in the middle; Add an exam and the date
  question are full screens on a phone and the same panel on desktop.
- **Search engines:** nothing changes. The static pages, the hub's exam links and the sitemap
  are built from the vault (`lib/seo.ts`), not from any exam list in the app.
- **Each place, and what it lost:**
  - **Study Guides** (`pages/wiki/WikiHome.tsx`) leads with the exam in focus as one row to
    its study guide, then "Your exams" (the sheet; "Add an exam" for a reader with none), the
    Resources row and the six credentials, each opening its page, whose route lists what it
    requires. The exam ladder, its "In progress" group and the SOA / CAS / CIA picker are gone;
    the full ladder is Add an exam. An exam page's back arrow reads "Study Guides".
  - **The Quiz tab** (`hooks/useQuizExamScreen.ts`, `quizTabExam`) opens on the builder of the
    exam in focus; `/?topic=` opens that exam's builder, as a visit when it isn't the reader's.
    The strip's logo and name are the switcher, in place of the "Change exam" arrow. A reader
    with no exams gets Add an exam; an exam in focus with no question bank gets one sentence
    and the way to its study guide. The exam ladder and the body picker are gone; the Games
    row sits above the builder.
  - **Resources** (`shelfExams`) shows the exam in focus's readings; `?exam=` names another
    exam (or an exam's regions together) and `?exam=all` every exam. One switch in the title
    row, this exam or All exams, replaces the body picker, the strip of logos and the region
    picker. With every exam showing, the shelf is every body's.
  - **The Store** opens on the exam in focus's kit; `?exam=<key>` and `?exam=all` as before.
    The same switch replaces its picker, strip and region picker; an exam sat by region opens
    on the region of the page in focus, and `?region=` still names another.
- **Not changed:** Flashcards keeps its own SOA / CAS picker (it is a row of Practice in
  Phase G). Settings (Phase H) lists the reader's exams and its "Add an exam" row opens the
  switcher's Add an exam; the old exams panel (`ExamsPopout`) is no longer opened from anywhere.
  You, the league, Apply and Tools read the exam in focus through the same hook. The parked onboarding tour pointed
  at the Quiz tab's Exam P row, which is gone. Exam names still differ by place ("Exam P" on
  Today, the sheet and the Store; "Exam P-1" on Study Guides, the Quiz tab and Resources), as
  they did before this phase.

For every phase:

- Reader-facing words follow `docs/writing-style.md` and the `app-copy` skill. *Practice* is
  spelled with a c. The new nouns (Today, Syllabus, Fix mistakes, Learn, Review) go in the
  skill's glossary.
- Logic goes in `lib/` as pure, tested functions; update the e2e specs the change touches
  (`e2e/dashboard-session.spec.ts`, `e2e/exam-switcher.spec.ts`, `e2e/quiz.spec.ts`, `e2e/reveal.spec.ts`,
  `e2e/analytics-locked.spec.ts`, `e2e/wiki.spec.ts`, `e2e/you.spec.ts`).
- Check each screen at 390 × 844 and 1440 × 900, in both themes.
- Update the lines in `CLAUDE.md`, `docs/roadmap.md` (X11), `docs/design-review.md` §6 and
  the design doc of whatever was changed (`docs/exam-readiness.md`,
  `docs/study-plan-generation.md`) in the same PR.
- Keep `npm run size` green: nothing here may pull the question bank or the wiki bundle into
  the first paint.

---

## 9. Where this differs from `docs/design-review.md`

| There | Here |
|---|---|
| §5.4: readiness as a figure under Start; the ring kept under Progress | No ring. One syllabus bar; Syllabus and Analytics are tiles that open overlays (R5, R6) |
| §5.4: a free reader's session is the quiz builder's own quiz | A free reader gets the same daily session; Pro is the pacing, Analytics and the podcast (R1) |
| §5.3: the switcher lists the reader's exams, then the body's ready exams, then all | The switcher lists the reader's exams only; adding one is its own screen (§6) |
| §5.6: the concept page's foot bar holds Practice, a tool link and the level | The level is a button at the top; the foot is Practice alone. The tool link waits for Apply |
| §5.8: level changes as a row of `ConceptTile`s | Before and after squares beside each concept's name |
| Colour: the exam's accent scopes the whole app | The exam's colour is on its logo tile only (§2.1) |
| Levels in green | Levels in neutral shades; green means correct (R12, R13) |

---

## 10. Open questions for the maintainer

1. ~~The split rule for a session's budget (§4.3).~~ Decided 2026-11-23; see §8, Phase B.
2. ~~How the plan's tick on the syllabus bar is derived (§4.4).~~ Decided 2026-11-23.
3. ~~The pace to use for an exam paced by the point, or with none on file (§4.3).~~ Decided
   2026-11-23: the exam's pace.
4. Whether the concept figures go monochrome (§7.2).
5. Whether `Syllabus` stays a separate, lighter screen or is the exam page (§4.4 assumes the
   exam page).
6. Whether search defaults to the exam in focus or to every exam (§7a.4 draws every exam).
7. ~~What Apply shows for an exam with no project and no tools, and what a reader without Pro
   sees of Projects (§7c).~~ Decided 2026-11-23; see §8, Phase I.
8. Whether the search row also belongs on Learn.
