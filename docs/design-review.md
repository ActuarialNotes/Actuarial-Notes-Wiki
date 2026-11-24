# Design review and redesign proposal

_A review of the whole app against the Laws of UX (lawsofux.com), 2026-11-15, and a redesign
proposed from it. Its items are on the roadmap as **X11** (§3.4 *Proposed*), with five
decisions, D-DR1 to D-DR5 (§7 below). Mock-ups of the proposed screens:
`docs/design-review-mockups.html`._

_**2026-11-23:** the screens were redesigned with the maintainer and the build spec is
`docs/redesign-spec.md`. Build from that document. Where it differs from §5 here, it wins; its
§9 lists the differences._

The goal the review holds the app to: **a person learns actuarial science and can apply it.**
A screen is judged by whether it moves a reader along that path, and a feature by whether a
reader on the path meets it at the moment it helps.

This review looks at the interface. Whether the learning engine itself prepares a candidate to
pass is `docs/learning-review.md` (L11–L18), and where grey captions stand in for design is
`docs/visual-noise-review.md` (X8). Where a finding here leans on one of those, it says so and
doesn't repeat it.

---

## 1. How it was reviewed

- A production build with the e2e suite's preview flags (Workflows, Community and Games open),
  served locally and driven by Playwright.
- **38 routes at two sizes**, 1440 × 900 and 390 × 844 (phone, touch): every sidebar tab, an
  exam's quiz builder, a study guide, concept and resource pages, the Store, Tools, Data
  Sources, Workflows, Projects, Community, Games, Settings, Upgrade and sign-in. Signed out,
  and signed in as a Pro account studying two exams.
- **Three flows walked end to end** at both sizes: a quiz from the concept list to the results;
  the setup sheet, the past-paper shelf and a written Exam 5 question; an exam page to an
  objective to a concept in the popup.
- Light and dark, the keyboard's tab order, and counts taken from the page: controls on
  screen, touch targets under 44 px, page heights, words.

Not covered, and worth a pass of their own: a screen reader, a real phone on a slow network,
an account with months of history (the Dashboard was reviewed nearly empty), and anyone other
than me using it. Every finding below is something seen on a screen or measured; none is a
claim about what readers actually do. The usage report (`docs/usage-report.md`) is where those
would be checked.

---

## 2. Verdict

The parts are well made. The app is fast, its components are consistent, a concept page is
one of the best short explanations of its kind, and nothing on screen claims more than the
vault can back. Most single screens would pass this review on their own.

What fails is the whole. **The app is organised as a list of features, and the reader's job
is a path.** Learn a concept, practice it, find out what went wrong, use it on a real problem:
each step exists, on a different tab, and the app rarely hands the reader from one to the
next. The six findings that cost a learner most:

1. **The sidebar is an inventory.** Up to twelve destinations at one weight, in an order that
   follows no sequence, mixing study, practitioner tools, a shop and a forum (F1).
2. **The exam is chosen again on every tab.** Five surfaces each pick an exam on their own
   (F2).
3. **Every screen that ends leaves the next step to the reader.** A concept page, an exam
   page, a wrong answer and the results screen all stop without one (F8–F12).
4. **A wrong answer is painted as an error when it is the lesson.** The worked solution is
   set on a red ground, and on a phone its equations run past the edge with nothing to say
   they scroll (F9).
5. **Learning and applying never meet.** Thirty-odd calculators that reproduce the textbook
   exhibits sit under a tab called Workflows; no concept page links to the one that computes
   it (F13).
6. **The Dashboard leads with a score and the phone hides the navigation.** Start is on the
   second screen of a phone; every tab is two taps away (F3, F7).

The redesign in §5 changes the frame and leaves the parts alone: four places named for the
steps of the path, one exam in focus across all of them, and a next step at the end of every
screen.

---

## 3. What works, and should be kept

| What | Where | The law it keeps |
|---|---|---|
| A new page is on screen at once: routes are warmed on pointer-down, sheets slide on one curve, nothing waits on the network to say which exams exist | Everywhere (`PaperRouter`, `lazyRoute`) | Doherty Threshold |
| A visitor can answer a question without an account, a tour or a form | `/`, `/quiz` | Paradox of the Active User |
| One row for an exam, one tile for its logo, one card for a resource, one checkmark, wherever they appear | `ExamRow`, `ExamLogo`, `ResourceCard`, `CheckMark` | Similarity, Jakob's Law (within the app) |
| The exam's colour steps round the wheel with the ladder, so a colour says how far along an exam is | `examColors.ts` | Similarity, Von Restorff |
| The quiz builder's card: one large number, one Start, everything else quiet | `/?topic=…` | Von Restorff, Fitts's Law |
| A concept opens in a split pane beside what the reader was reading, and the pane walks the syllabus | `ConceptPopup` | Working Memory |
| A concept page: figure, one-sentence definition, formula, a term per bullet, folded example, one trap | `Concepts/*.md` | Chunking, Cognitive Load |
| A tool's answer is on top and moves as the inputs do; no Run button | `/tools/<slug>` | Doherty Threshold, Prägnanz |
| A quiz left half-way follows the reader as a pill, with its place and its clock | `QuizResumeButton` | Zeigarnik Effect |
| Fact Check: a verdict and its sources on every question | Info sheet, explanation | Aesthetic-Usability (trust, earned) |
| Touch targets: on the phone screens measured, the smallest controls were 36–40 px, and only a handful were under 44 | Quiz, builder, exam page, Resources | Fitts's Law |
| Light and dark are the same design; nothing was found that works in one only | Whole app | — |

None of this is touched by the proposal.

---

## 4. Findings

Each finding names the screen, what was seen or measured, and the laws it runs against.
**High** costs learning directly; **Medium** costs time or confidence; **Low** is polish.

### 4.1 Finding your way

**F1. The sidebar lists features, not a path.** *High. Hick's Law, Miller's Law, Mental
Model, Serial Position.*
Signed in, in the preview build: Dashboard, Study Guides (Exams, Resources), Flashcards, Quiz,
Projects, Workflows (Tools, Data Sources), Store, Community. Eight rows and four sub-rows,
twelve destinations at one weight. Study Guides, Flashcards and Quiz are three views of one activity; Tools and Data
Sources are filed under Workflows, a Preview feature most accounts can't open; the Store and
Community sit in the same list as the work. The first and last rows are the ones remembered,
and signed out those are Study Guides and the Store (Community, for an account that has it). Nothing in the order says "start here,
then this".

**F2. The exam is chosen again on every tab.** *High. Hick's Law, Tesler's Law, Working
Memory.*
The Quiz tab lists exams. Study Guides lists them again. Resources and the Store each carry
a strip of exam tiles. The Dashboard has its own exam chips. The SOA / CAS choice is shared
(`bodyFilter.ts`); the exam is not, because each page keeps it in its own address. A candidate
studies one exam for months, so this is a decision the app could make once and is asking for
five times. Tesler's Law says the complexity has to live somewhere; here it is with the
reader.

**F3. On a phone the navigation is behind a hamburger.** *Medium. Jakob's Law, Fitts's Law.*
Every tab is two taps away, the first of them at the top-left corner, the far corner for a
right thumb. Study apps a candidate already uses keep four or five places in a bar at the
bottom. The drawer also means a reader on a phone never sees where they are among the tabs.

**F4. The first screen names no first step.** *Medium. Goal-Gradient, Paradox of the Active
User.*
A visitor lands on the Quiz tab: a Games row, then a list of exams. That they can start at
once is right. But a path with no visible first step has no gradient to climb, and the
Dashboard, the one screen built around "what next", is a sign-in wall for a visitor whose
progress the app is already keeping in the browser.

**F5. The exam lists are mostly exams that can't be studied yet.** *Medium. Choice Overload,
Von Restorff, Selective Attention.*
The SOA list on Study Guides is 3,880 px on a phone, about four and a half screens, and most
of its rows are dimmed under an *In Development* tag (67 of the 84 exams in `scripts/exam_catalog.json` are in
development, 12 ready and 5 beta). The ready and beta exams are what a visitor came for, and
they don't stand out from the rows around them. The list is honest; it is also the wrong default.

**F6. Long lists are rendered whole.** *Medium. Cognitive Load, Doherty Threshold.*
Resources puts all 808 cards on one page: 54,371 px at desktop width, **93,116 px on a
phone** (110 screens), with 616 images. Data Sources' Documents is 50,699 px on a phone; a
question search for "credibility" is 12,776 px, and its filter panel fills the first screen
so that no result is visible without scrolling. Above Resources and the Store, the exam strip
is up to 37 tiles; the FSA tiles carry two lines of text in a tile about 34 px square and can't be read.

### 4.2 The learning loop

**F7. The Dashboard leads with a score.** *High. Goal-Gradient, Von Restorff, Selective
Attention, Fitts's Law.*
On a phone the first screen holds a name, three unlabelled icons, exam chips, a countdown,
a week of grey boxes and a 280 px ring reading *0% ready*. **Start session is on the second
screen.** A pill reading "▶ 5 min" in the top row is a second Start, and nothing says so. The
header gives two dates ("150 days to Exam FM · Wed, Apr 14" over "Next sitting · Dec 3–14,
2026"). The page has 195 focusable controls, most of them arcs of the ring. The ring is a good
drawing of a syllabus and a poor answer to "what do I do now", and for a new account it is the
largest thing on the screen while saying nothing.

**F8. The question shares its screen with the quiz's settings.** *Medium. Selective
Attention, Flow, Cognitive Load.*
Above a question on a phone: Quit, then six small unlabelled icons (difficulty, timer,
answers, concept links, the exam, sound), then the question number with a menu, a flag and
an info button, then a segmented bar. Four of the six icons show settings chosen before the
quiz started. Progress is told three times on desktop: "Question 1 of 3", the bar, and a
"33%" at the right that sits where a score would and reads as one before the first answer.

**F9. A wrong answer is styled as an error, and the lesson with it.** *High. Peak-End Rule,
Cognitive Load, Von Restorff.*
After a miss the whole worked solution is set inside a dark red panel headed *Incorrect*.
Red is the app's colour for wrong (style guide §4.1), and it belongs on the verdict; the
solution is the most valuable reading on the screen and is the hardest to read. On a phone,
aligned equations run past the right edge of the panel (seen on `p-005`: the line stops at
"= N(Your"). They scroll sideways, and nothing on screen says so. Under the options a caption says "Choose any answer to continue" after the
answer is locked, and a *Change Answer* button stands beside *Next Question* with the correct
option already lit. The concepts to re-read are two collapsed rows at the bottom, and nothing
offers another question on the same idea, which is the step the research in
`learning-review.md` §3.3 asks for.

**F10. The results screen is a transcript.** *High. Peak-End Rule, Goal-Gradient, Serial
Position.*
A three-question quiz ends in a page 4,856 px tall on a phone: a score, five small stats,
a ring, then every question printed again in full with its solution open, in the order
asked, right and wrong alike. A 30-question Practice Exam would be about ten times that.
The one question the reader got wrong is nowhere near the top. The screen opens with a
*2 Concepts Levelled Up* ceremony over a 33% score, which is true and is not what the reader
most needs to hear at that moment. The next steps are there, *Try Again* and *New Quiz*, at the very
foot of the transcript, and *Review Incorrect* in the header filters the list without
moving the misses to the top. The end of a session is what the session is remembered by, and this
one ends in a scroll.

**F11. A concept page ends without a next step.** *High. Goal-Gradient, Mental Model.*
The page is definition, formula, examples, trap, and then it stops. Practicing the concept,
adding its card and seeing its level are all in a menu opened by tapping the underlined
title, which looks like a link to the page the reader is already on. A reader who doesn't
find the menu has read a page and been offered nothing to do with it.

**F12. An exam page doesn't say where the reader stands.** *Medium. Goal-Gradient,
Zeigarnik.*
The study guide for an exam is its syllabus: objectives with their weights, then the
readings. It shows no readiness and no progress on any objective (the readiness card was
removed from it). Quiz is a small icon in the header strip. The one place a candidate would
look to see "which parts of this exam have I done" shows the same thing on day 1 and day 90.

**F13. Learning and applying never meet.** *High. Mental Model, Uniform Connectedness.*
The app has what most study tools lack: calculators that reproduce Friedland's and Werner &
Modlin's exhibits, published tables, the PCPA project. A tool names the concept pages it
belongs to (`ToolSpec.concepts`) and links to them with a small book icon. **Nothing links
the other way.** The Chain Ladder concept page doesn't offer the Chain Ladder tool, an Exam 5
question about on-level factors doesn't offer On-Level Factors, and Tools sits under
Workflows in the sidebar where a candidate has no reason to look. "Apply" is half of the
goal and is reachable only by a reader who goes looking for it.

### 4.3 Consistency

**F14. Seven content columns.** *Low. Similarity, Prägnanz, Aesthetic-Usability.*
At 1440 px the content starts at 280 px (Flashcards, 1,136 wide), 360 (Store, Data Sources,
Workflows, Community: 976 wide), 424 (Quiz, Study Guides, Resources, Search: 848), 480 (Tools:
736), 528 (a tool: 640), 560 (the quiz builder: 576) and 632 (Settings: 640). Switching tabs
moves the page sideways each time.

**F15. Each tab has its own header.** *Low. Jakob's Law, Similarity.*
A floating search bar with the title below it (Quiz, Study Guides, Store, Tools, Data
Sources); a title alone (Projects, Workflows, Search, Games); a breadcrumb (a tool); an exam
strip (an exam page, the builder). Community has a gradient hero, avatar stack and coloured
topic chips that appear nowhere else and run against the style guide's first principle,
neutral by default.

**F16. Icon-only controls with no label.** *Medium. Cognitive Load (recognition over
recall), Jakob's Law.*
The quiz header's six, the Dashboard's download / bell / help and its "▶ 5 min" pill, the
Flashcards bar's "D Σ" menu. (The builder's four are a summary row that unfolds into
labelled settings, which is the right pattern.) Each is a small picture a reader has
to learn by pressing. A phone has no hover to ask.

**F17. An underline means three things.** *Medium. Similarity, Mental Model.*
A link to a concept; a title that opens a menu (exam and concept pages); a heading that
unfolds a section (an exam page's objective rows, which also carry a chevron). A reader can't
tell from the mark which of the three a tap will do.

**F18. Empty states give directions.** *Low. Fitts's Law.*
"Your deck is empty. Tap the + button below to add today's study plan, or browse
everything." The + is in the opposite corner of the screen. This is the visual-noise
review's affordance test: the button belongs in the empty state.

### 4.4 Access

**F19. No way past the sidebar by keyboard.** *Medium.*
There is no skip link. From the top of the Quiz tab, the fourteenth press of Tab is still in
the sidebar.

### 4.5 The laws, one by one

| Law | Standing | Where |
|---|---|---|
| Aesthetic-Usability Effect | Holds; Community and the column widths chip at it | F14, F15 |
| Choice Overload | **Broken** on the exam lists and Resources | F5, F6 |
| Chunking | Holds on concept pages; broken on results | §3, F10 |
| Cognitive Bias | Mixed: a readiness ring that reads as a prediction feeds overconfidence | `learning-review.md` §3.1 |
| Cognitive Load | Mixed | F8, F9, F16 |
| Doherty Threshold | **Holds**, except the 800-card pages | §3, F6 |
| Fitts's Law | Targets hold; placement doesn't (hamburger, Start below the fold) | F3, F7, F18 |
| Flow | Mixed: chrome on the question, a ceremony at the wrong moment | F8, F10 |
| Goal-Gradient Effect | **Broken**: screens end without a next step | F4, F7, F10–F12 |
| Hick's Law | **Broken** in the sidebar and the repeated exam choice | F1, F2 |
| Jakob's Law | Mixed: no bottom bar on phones, titles that are menus | F3, F17 |
| Common Region | Holds (`ListPanel`, cards) | §3 |
| Proximity | Holds, except settings sitting with the question | F8 |
| Prägnanz | Holds on tools and the builder; broken on the Dashboard's first screen | F7 |
| Similarity | Mixed: strong components, three meanings of an underline | §3, F17 |
| Uniform Connectedness | **Broken** between Learn and Apply | F13 |
| Mental Model | **Broken**: features where a path is expected | F1, F13 |
| Miller's Law | Sidebar over the limit; quiz header over it | F1, F8 |
| Occam's Razor | The proposal's test: fewer places, one exam | §5 |
| Paradox of the Active User | **Holds** | §3 |
| Pareto Principle | Unused: 17 ready and beta exams get the same room as 67 that aren't | F5 |
| Parkinson's Law | Holds: sessions are sized in questions and minutes | §3 |
| Peak-End Rule | **Broken** at both ends of a question | F9, F10 |
| Postel's Law | Holds: number cells take arithmetic, CSVs are mapped | Tools |
| Selective Attention | Mixed | F7, F8 |
| Serial Position Effect | Unused in the sidebar and the results | F1, F10 |
| Tesler's Law | The exam choice is left with the reader | F2 |
| Von Restorff Effect | Holds in the builder; spent on a 0% ring on the Dashboard | F7 |
| Working Memory | Holds: the concept popup keeps the source page in view | §3 |
| Zeigarnik Effect | Holds for a quiz; unused for the syllabus | §3, F12 |

---

## 5. The redesign

### 5.1 The idea

Organise the app around the four things a learner does, in the order they do them, for the
one exam they are studying.

```
            ┌────────────────────────── one exam in focus ──────────────────────────┐
 Today  →   Learn      →     Practice     →     Review      →     Apply
            read the         answer on          see what            use it on a
            concept          it                 went wrong          real problem
```

Every screen answers three questions without scrolling: *where am I on the path, what is the
one thing to do here, and what comes after it.* No feature is removed. Each is met at the step
where it helps.

### 5.2 Four places and a profile (F1, F3)

| Place | What it holds | Today it is |
|---|---|---|
| **Today** | The session for the day, for the exam in focus. Open to a visitor | Dashboard |
| **Learn** | The exam's study guide, its concepts, its readings | Study Guides (Exams, Resources) |
| **Practice** | Quiz, Practice Exam, Past Papers, Flashcards, Games | Quiz, Flashcards |
| **Apply** | Tools, Data Sources, Projects, Workflows | Tools, Data Sources, Projects, Workflows |
| **You** (avatar) | Level, quests and league, Settings, the Store, Community, theme, sound | Store, Community, the Level badge, the sidebar's foot |

Four rows is under any reading of Hick's and Miller's laws, and the order is the path, so
the first row is where to start and the last is where the learning is used. On a phone the
four are **a bar at the bottom of the screen**, with the avatar in the top corner; the
hamburger goes. The bar hides where the app already hides chrome: in a quiz, a battle, the
PDF reader, focus mode.

Flashcards moves inside Practice because a card is a way of practicing a concept the reader
has collected; as a top-level tab it reads as a second product. The Store and Community move
behind the avatar because neither is a step on the path. They keep their addresses.

The names are a proposal. *Dashboard*, *Study Guides* and *Quiz* are the app's nouns today
(`app-copy`'s glossary), so renaming them is **D-DR1**.

### 5.3 One exam in focus (F2, F5, F6)

The reader picks an exam once. It is stored with the account (or the browser, signed out) and
every place opens on it:

- A **switcher** at the head of the navigation shows the exam's logo and name. It lists the
  reader's exams, then the ready and beta exams of their body, then "All exams" for the full
  ladder with the in-development ones. Changing it is one tap from anywhere.
- The exam's accent (`examAccentStyle`) scopes the whole app, so the colour of the frame says
  which exam is open. The ladder's colour ramp already carries this meaning.
- The exam lists on the Quiz tab and Study Guides, and the exam strips on Resources and the
  Store, are replaced by the switcher. Those pages open filtered to the exam in focus, with
  "All exams" one tap away.
- **In-development exams are folded** under one row per credential ("33 more in
  development") on any list that still shows the ladder. They stay findable by search and
  by address, and the static pages for search engines don't change.
- **Long lists page.** Resources, Documents and question search show the first 24 results and
  a "Show more", and a question search's filters fold to one row once a query is typed.

A visitor's first screen becomes one question, "Which exam are you studying?", over the
ready and beta exams, and the answer takes them to Today.

### 5.4 Today (F4, F7)

Today is a session and a way to start it. On a phone, top to bottom, without scrolling:

1. The exam and the days to it: one date, the sitting the reader set.
2. **Today's session**: its size in questions and minutes, and its steps as a short
   checklist (Fix 2 mistakes, Learn 3 new concepts, Review 4).
3. **Start session**, full width, in the exam's colour. The one filled control on the screen.
4. Below it, small: readiness as a figure with today's movement, and the week as seven marks.

The ring, the analytics, quests and the league are one tap down, under **Progress**. The ring
is kept as it is; it is a picture to study, and it shouldn't be what stands between a reader
and Start. A new account sees no 0% ring: until there is something to draw, the space holds
the first step ("Answer your first three questions").

Signed out, Today works from the browser's own record, with one line offering an account to
keep it. For a reader who isn't Pro, the session is the free one the quiz builder already
makes (the reader's own quiz for the exam), and Today's Study Plan stays the locked row it is
now.

### 5.5 The exam's page (F12)

The study guide keeps its content and gains the reader's standing:

- Each learning objective row carries a thin bar of its concepts by level, and its count
  ("12 of 31"). Collapsed, the list of objectives is the map of the exam with the reader's
  progress drawn on it, which is what the ring draws, readable in rows.
- An open objective lists its concepts with their `MasteryBadge`, and ends in **Practice this
  objective**.
- The header strip's small Quiz icon becomes a labelled button, and the page's title stops
  being a menu (§5.9).

### 5.6 The concept page (F11, F13)

A bar at the foot of every concept page, and of the concept popup:

```
[ Practice · 14 questions ]   [ Open in Chain Ladder ]   Level 1 ▸
```

- **Practice** starts a quiz on the concept (the action menu's first row, brought into view).
  A concept with no questions shows none.
- **Open in <tool>** appears where a tool names the concept (`ToolSpec.concepts`, read the
  other way). On a page whose worked example the tool reproduces, the example's card offers
  **Try these numbers**, which opens the tool with the example's inputs. The inputs are the
  page's own figures, moved, never invented.
- The level is the page's `MasteryBadge`, and opens Learning Progress.

The rest of the action menu (deck, Fact Check, Listen) moves to a labelled **More** button.

### 5.7 The question (F8, F9)

- **While answering, the screen is the question.** One row above it: Quit, "3 of 12" with the
  bar, the timer if timed, and a **⋯** that holds flag, info, sound and the settings. Six
  icons and the stray percentage go.
- **After answering, verdict and lesson are separate.** A one-line strip carries the verdict
  in its colour: *Incorrect · the answer is A*. The solution follows on the ordinary card
  surface, in ordinary text, in a block that scrolls sideways when an equation is wider than
  the phone (the treatment `CodeBlock` already gives console output).
- **A miss ends in two choices**: *Read: Independent Events* (the popup) and *Try a similar
  one* (another question on the same concept, queued next). *Next question* stays the filled
  button. *Change Answer* and the "Choose any answer" caption go, unless the maintainer wants
  to keep changing an answer after the reveal (D-DR4).
- The confidence tap and the reason for a miss that `learning-review.md` §3.6 proposes
  (L2, L3) belong on this screen and fit this layout: one tap before the reveal, one after a
  miss.

### 5.8 The results (F10)

One screen, in this order:

1. **The score**, with its points, and the time against the allowance if the quiz was timed
   (the pacing report of L15 goes here).
2. **What moved**: concepts that changed level, as a row of `ConceptTile`s. The level-up
   ceremony plays here, in place, and takes the whole screen only for a first collected card
   or a Level 3.
3. **What to fix**: the missed questions as collapsed rows (stem preview, the reader's answer,
   the right one), each opening to its solution. One filled button: **Fix these now**, which
   is the Dashboard's existing mistakes quiz.
4. **Everything else**: the questions answered right, folded under one row.
5. A footer: **Back to Today**, showing the session's next step if one is left.

A reader who got everything right sees steps 1, 2 and 5, and the session ends on what they
gained.

### 5.9 Apply (F13)

Apply is where a candidate sees what the exam is for, and where a working actuary starts.

- Its first screen is the exam in focus: "Methods on Exam 5" lists the tools whose concepts
  are on that syllabus (`lib/toolExam.ts` already knows the earliest exam that teaches each),
  then the full catalogue by practice area.
- Each tool keeps its *Tested against* line and gains **Learn the method**, back to its
  concept page, as a labelled button in place of the book icon.
- Projects and Workflows sit beside Tools as the long-form version of the same step: a tool
  answers one question, a workflow chains several, a project is the whole assignment.
- A written question whose answer is a calculation a tool does offers **Check with <tool>**
  after the answer is locked, beside the sample answer. This needs a mapping from question to
  tool; `questionChecks.ts` holds the first of them (the questions each tool is tested
  against).

### 5.10 One frame (F14–F19)

- **One content column**: 720 px for reading and lists, 1,040 px for shelves and boards,
  both from the same left edge.
- **One page header**: title, then the page's one control row (search, filters). Community
  takes the neutral header; its topic colours stay on the topic chips, where they carry
  meaning.
- **Icons get labels** wherever there is room, and always in a sheet or menu. An icon alone
  is kept for the few a reader meets everywhere (close, back, search, more).
- **An underline is a link.** A title that opens a menu becomes a title with a **⋯** button
  beside it; a heading that unfolds keeps its chevron and loses its underline.
- **Empty states hold their button**: "Your deck is empty" with *Add today's concepts* in the
  card.
- A **skip link** to the page's content as the first tab stop.

---

## 6. Order of work

Phase 0 changes no structure and needs no decision. Each later phase stands on its own and
can stop there.

| Phase | What | Findings | Size |
|---|---|---|---|
| **0. Repairs** | Solution off the red ground, with the equations scrolling; verdict strip. Results: missed questions first, the rest folded. Start session on the Dashboard's first phone screen. Pages for Resources, Documents and search. A label on the Dashboard's Start pill. Skip link. Empty-state buttons. The "33%" removed | F6, F7, F9, F10, F16, F18, F19 | S–M |
| **1. The next step** | The concept page's foot bar with Practice and the tool link. Practice this objective, and progress on the exam page's objective rows. Fix these now on the results. Learn the method on a tool | F10–F13 | M |
| **2. One exam** | The exam in focus and its switcher; the exam lists and strips replaced; in-development exams folded; a visitor's first question | F2, F4, F5 | M–L |
| **3. Four places** | The sidebar regrouped; the bottom bar on phones; Flashcards into Practice; the Store and Community behind the avatar; Today open to visitors | F1, F3, F4 | L |
| **4. The frame** | One column, one header, the underline rule, Community's header; the quiz header's ⋯ | F8, F14, F15, F17 | M |

Phases 0 and 1 are where the learning is. A candidate who never notices the sidebar changing
would still read every solution more easily and be handed from a concept to a question to a
tool.

**Phase 0 was built on 2026-11-15**, with the spelling decision (*practice*):

- The verdict is a strip in its colour and the solution is ordinary text on the card surface
  (`components/ExplanationPanel.tsx`). A display equation wider than the panel fades at its
  right edge while there is more to scroll to. Where a solution is only being shown, no
  verdict is drawn (it used to read "Correct!").
- *Change Answer* is offered only while answers are held to the end (D-DR4).
- The results list leads with the missed questions; the ones answered right are under one
  row, unless nothing was missed (`pages/Review.tsx`).
- On a phone, Today's session puts its size, steps and Start above the wheel, and the header
  pill reads "Start · 5 min".
- Resources and question search show 24 at a time with **Show more**
  (`lib/paging.ts`, `hooks/usePagedList.ts`, `components/ShowMore.tsx`); how far a list was
  opened is kept for the browser session, so Back still lands on the card it left.
  Data Sources was rebuilt on `main` the same day as one catalogue that folds each of its
  groups, so its Documents list (F6) needed nothing more.
- The quiz header's percentage is gone, a **Skip to content** link is the first tab stop, and
  an empty deck holds its own **Add flashcards** button.

**The build spec's Phase A (the visual base) was built on 2026-11-23**: the level square, the
answer-state colours, the outline card and tile, the outlined control and main action, and the
popup (`docs/style-guide.md` §13). **Phase B (Today) was built the same day**: the
session sized by time and free to every account, the Syllabus and Analytics tiles, the session
length sheet and the Analytics overlay (`docs/redesign-spec.md` §8). **Phase C (the session)
was built the same day**: one row above the question (leave, the progress bar, the timer, More),
Check and Next at the foot, feedback that folds the question and leads with the two answers,
**Try a similar one** after a miss, the written part graded Full / Partial / None, and results
that run score, bar, To fix with **Fix these N**, Levelled up, the right answers folded, Back to
Today. The full-screen level-up ceremony now plays only for a card collected for the first time
or a concept reaching Level 3. It answers F8 (the question shared its screen with the quiz's
settings) and F10 (the results were a transcript).
**Phase D (Learn) was built
the same day**: the exam page's objectives as cards with the syllabus's sentences and their
concepts as pills, "Practice <objective>", the concept page's level button, "more" and
"Practice this", and the same foot in the reader (F10 to F13's next step, less the tool link).
**Phase E (the exam switcher) was built on 2026-11-24**: the exam in focus, kept with the
account; the sheet of the reader's exams, Add an exam and the date question; a visitor's first
screen is Add an exam (D-DR2); and Study Guides, the Quiz tab, Resources and the Store open on
the exam in focus in place of their own exam lists and strips (F2, F5; D-DR3's fold is on Add
an exam). Phases F to I are not built.

The "Choose any answer to continue" caption, left from Phase 0, went with Phase C, along with
the shortcut it described (a tap on any option moved on).

### How to tell whether it worked

The events are already sent (`docs/analytics-and-monitoring.md`); no new instrument is needed
for the first four.

| Change | Measure | Today's baseline |
|---|---|---|
| Next step on a concept page | Share of `content_view` (concept) followed by a quiz start in the same visit | To be read from GA4 before the change |
| Results rebuilt | Share of finished quizzes followed by a second quiz or a mistakes review in the same visit; `mistake_reviewed` per finished quiz | Same |
| Start above the fold | Share of Dashboard views that start a session | Same |
| One exam, first question | Share of first visits that answer a question (`first_interaction` → first answer) | Same |
| Tools linked from concepts | Tool page views arriving from a concept page | Near zero by construction |

A baseline is read first and written into this table; a change that doesn't move its
measure in a month is reconsidered.

---

## 7. Decisions for the maintainer

**Decided 2026-11-15:** D-DR1 yes, with the third place spelled **Practice** (with a *c*,
noun and verb alike, wherever the app writes the word); D-DR2 yes; D-DR3 yes; D-DR4 no,
*Change Answer* goes once an answer is revealed; D-DR5 yes, the Store and Community both.

| ID | Decision | Default if not decided |
|---|---|---|
| **D-DR1** | Rename the places: Today, Learn, Practice, Apply? | Regroup the sidebar under the existing names (Dashboard, Study Guides, Quiz) with Tools, Data Sources, Projects and Workflows under one **Apply** heading |
| **D-DR2** | Open Today to visitors, from the browser's record? | Yes. Analytics and the League stay signed-in |
| **D-DR3** | Fold in-development exams out of the default lists? | Yes, under one "in development" row per credential |
| **D-DR4** | Keep *Change Answer* after the answer is revealed? | Remove it once answers are shown as the quiz goes; keep it when they are held to the end |
| **D-DR5** | Move the Store and Community behind the avatar? | Yes for Community (Preview). The Store stays a row until Phase 3 |

---

## 8. What the proposal does not change

The vault, its parsers and its rules. The mastery ladder, readiness, the study plan and
every engine in `lib/`. Every address (old ones redirect, as they do today). The style
guide's tokens, the Ink controls, the exam colours, the motion. The concept popup and its
stack. Tools' cards. Quiz Battle and Concept Craft, which are games with their own screens.
The proposal moves things and adds links between them; the largest new component is the
bottom bar.
