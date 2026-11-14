# UI copy review (2026-11-08)

A review of every word a reader sees in the app's own interface, judged against
`.claude/skills/app-copy/SKILL.md` and its decisions log. **Scope:** `quiz/src/pages`,
`quiz/src/components`, the `lib/` and `data/` modules that build sentences for them, the
daily email and edge-function errors, `index.html`/SEO fallbacks, and the AI connector's
reader-facing text (tool descriptions, Agent Skill, `llms.txt`). **Out of scope:** vault
content (concept, resource and study-guide pages, questions), code comments, docs, the
flag-gated Research tab, and anything transcribed from a third party (seller facts,
reviews, Amazon's licensed wording).

**Status (2026-11-08): done.** The full pass is applied on `claude/brave-pasteur-xo3sn2`
(§2–§6), using the §5 glossary as decided (Store; British spelling; Quiz Battle's in-game
exclamations kept). The unused files in §6 are deleted, with `data/mnemonics.ts` and
`data/stories.ts`, which only they read. §1 and §5 are codified: the rules for every
reader-facing word are `docs/writing-style.md`, the app's glossary and decisions log are the
`app-copy` skill, every other writing skill and the validate agent link to them, and
`quiz/src/lib/copyGuard.test.ts` is the mechanical guardrail.

---

## 0. The verdict

The voice is mostly right. Most screens are plain, specific and a little dry, and about
three-quarters of the reviewers' notes were praise or nitpicks. "Unlock", "journey" and
"empower" are nearly absent, and nothing anywhere opens with "No more X". The pages that have
had a copy pass (Upgrade, the Dashboard guide, Projects, the spreadsheet rules, Report an
issue) are good enough to use as the model.

The problems are concentrated in five places, roughly in order of how much they matter:

1. **Copy that says something the code doesn't do** (§2). About 25 lines. This is the
   most serious finding because it breaks the vault's own rule, "nothing invented", for
   the app's claims about itself.
2. **Cryptic copy:** words that only make sense if you know the code or the game
   (§3). Analytics tiles, Concept Craft medals, the
   Answerability section, "Vintage", "Beta" with no meaning attached.
3. **Gamification screens that have had no copy pass** (§4). Quest, streak and plan-complete
   overlays, LeaderboardPanel, Settings and the Gem Shop hold almost all of the
   exclamation marks, "Great work!" and dash-hinged sentences.
4. **Noun drift** (§5). One thing called by two or three names (Store/Shop,
   Today's plan/Today's Study Plan, Practice exam/Practice Exam, finding/issue…).
5. **Dead copy** (§6). Several unrendered components carry stale, slogany text that would
   come back if anyone revived them.

Em dashes are less of a problem than expected: roughly 100 visible strings across the
whole app, clustered in tooltips, toasts and status lines rather than in prose.

---

## 1. Proposed rules (to codify)

These are the habits the review turned up repeatedly. Each one would have caught several
findings below. Accept, change or drop each:

| # | Rule | Catches |
|---|---|---|
| R1 | **Copy is a claim about the code.** Before shipping a sentence, check that the handler, lib or server actually does it. A tooltip describes what happens, not what was planned. | §2, all of it |
| R2 | **Never type a list of what the app covers.** Exam lists, feature lists and counts are derived from `examStatus`, `exam_catalog.json` and the constants (`MATCH_TIME`, `MAX_NEW_PER_DAY`), or left out. | ActiveExamCard, connector, SEO, email exam names |
| R3 | **One thing, one name.** Every feature and status has one label and one explanation sentence, defined once and imported. A synonym is a bug. | §5 |
| R4 | **No code words on screen.** Gate vocabulary ("reach", "tagged"), engine words ("cycle", "the engine", `run_tool`, `informs`), field keys and env-var names never reach a reader. | Answerability, tool errors, edge-function errors |
| R5 | **An error is reader copy.** Every `catch` and every edge-function `error:` maps to a sentence that says what went wrong and what to do. Never show `err.message` raw. | Upgrade, Auth, Settings, Stripe and beta-code functions |
| R6 | **A completion screen says what happened and what it earned.** No exclamation marks, no "Great work", no praise. (Possible exception for *in-game* moments in Battle: "Steal!", "Match found!".) | Quest, streak, plan-complete and level-up overlays, Settings, Dashboard welcome |
| R7 | **A tile or caption is one fact, with its unit visible.** If a screen reader is told the unit, so is the screen. No `·`-packed fragments. | Analytics tiles, Craft scoreboard |
| R8 | **In-world words carry their plain meaning on screen.** It can't live only in a hover tooltip: the app is read on phones. Buttons get the plain verb. | — |
| R9 | **Tooltips are noun phrases.** No em dash, no rule of three, no "click"/"hover"/"tap". | ~25 tooltips |
| R10 | **Say it once per screen.** A legal notice, a status or a phase purpose appears once. Two strings drawn into one `<p>` must not repeat each other. | Tutor phases, Store "nothing is sold", Settings delete warning |
| R11 | **Don't call it "mastered".** The app's nouns are the levels (Level 1–3, Forgotten). | ReadinessCard, email, quests, study-plan strategy |
| R12 | **A status word is never shown bare.** "Beta", "In Development", "Vintage" and "Studio voice" get the plain meaning next to them. | Study-guide banner, ExamsPopout, Listen |
| R13 | **Things don't act like people.** A quiz doesn't "live" anywhere, progress doesn't "come with you", and Cowork doesn't "carry" documents. Say what is stored, where, and what the reader can do about it. *(Added from the maintainer's note on the guest save prompt.)* | GuestSavePrompt, ActiveExamCard "hang off it", Cowork "carries", Tutor "follows you here, quietly" |
| R14 | **The reader's things are theirs.** Say "your quiz results", not "this quiz"; speak to the reader, not about the system. *(Same note.)* | GuestSavePrompt and every "this X" that is really the reader's own record |

---

## 2. Untrue or unbacked claims (fix first)

Each of these was checked against the code. The ones marked ✔ were also checked by hand
for this write-up.

| Where | What it says | What the code does | Suggested |
|---|---|---|---|
| ✔ `pages/Flashcards.tsx:1775` | "Move completed cards into a dated pack and clear them from your deck" | `clearCompleted` just removes them. There is no pack. | "Remove completed cards from your deck" |
| ✔ `pages/GemShop.tsx` + `lib/cosmetics.ts:88` | Custom Badge, Mythic, Pro, 100 gems | `badge:custom` is drawn nowhere, so readers can pay for nothing. (The skill log already flagged this.) | Hide it until a surface shows it |
| ✔ `pages/Upgrade.tsx:254` | "Try it for a month" | No trial in `stripe-create-checkout`. This is the first paid month. | "$10 a month" / "Get Pro" |
| ✔ `pages/Project/index.tsx:53` | "…and a report graded against the true model" | Only the *predictions* are scored against the true model. The report is self-graded against the CAS rubric. This is the first line a non-Pro reader sees. | "…Your model is scored against the one that made the data, and you grade the report against the CAS rubric." |
| ✔ `components/ReadinessCard.tsx:1716` | "2× gem bonus is active for the rest of today." | One `award_gems` call equal to the gems earned so far. Nothing doubles later gems. | "Finish today's study plan to double the gems you've earned today." |
| ✔ `daily-plan-email/index.ts:31, 341` | Button "Start today's session" | Links to bare `/quiz`, which draws from every bank, not today's session | Link to `/dashboard?…` (Start lives there) |
| `daily-plan-email/index.ts:271` | "Day N of M" | In review mode `totalDays` is 1, so the email prints "Day 41 of 1" | Use `plan.dayNumber`; skip it in review mode |
| `daily-plan-email` | "Today's concepts" + "Worth a refresher" | In review mode the second list is a subset of the first, so the same names appear twice | Drop the duplicate list |
| `components/HeatmapInfoPanel.tsx:107, 175` (Dashboard guide) | "Predicted readiness · if you follow your plan" | With no plan (most free readers) it projects **no further study**, decay only | Branch: "…if you stop studying today" |
| `components/DashboardGuideSlides.tsx:74` | Forgotten "starts again from New" | One correct answer takes a Forgotten concept straight to Level 1 | "One correct answer brings it back to Level 1." |
| `components/ActiveExamCard.tsx:240` | "Add an exam we cover — P, FM, MAS-I, MAS-II or Exam 5" | Ten more exams are ready or beta | Derive the list from `examStatus` (R2) |
| `components/ReadinessCard.tsx:281` | "keep your weakest concepts fresh" | Review picks the oldest correct answers, not the weakest | "reviews the ones you answered longest ago" |
| `components/ReadinessCard.tsx:1327` | "Concepts mastered" | Lists every level-up, New → Level 1 included | "Levelled up" |
| `components/StudyPlanConfigModal.tsx:418` | Strategy "Master everything" | It only sets syllabus order | "Syllabus order" |
| `components/ReadinessCard.tsx:1116` | Locked card "Custom Study Plan / A daily plan tailored to you" | It's Today's Study Plan, and the body is a slogan | "Today's Study Plan / The concepts to study each day, paced to your exam date." |
| `components/ConceptCoverageSection.tsx:367` | "Sign in to … see your accuracy over time" | Analytics is Pro | "Sign in to keep your results." |
| `pages/Flashcards.tsx:600` | "Set up your study plan on the Dashboard…" | Sends free readers to a locked card | Gate on Pro |
| `components/StreakBadge.tsx:34` | "Study today to keep your streak alive" | The rule is one correct answer | "Answer a question correctly today to keep your streak" |
| `components/FloatingSearchBar.tsx:205` | In Development: "not yet available to study" | The pages are readable; what's missing is the question bank | "Syllabus outline, no practice questions yet" |
| `components/wiki/CredentialMap.tsx:175` | "Dashed: an SOA or CAS credential carries credit into the CIA's" | Only ACAS→ACIA and FCAS→FCIA are drawn dashed | Draw the SOA edges, or reword |
| `components/wiki/LearningProgressModal.tsx:140` | "Show exam history" | It shows this concept's history | "Show history" |
| `lib/tutor/copy.ts:135` | "A confident error, once corrected, is corrected for good." | The doc says "more durably", and the item still comes back for review | "Confident errors are the ones that stick best once corrected." |
| `quiz/api/_mcp/server.js`, `SKILL.md`, `knowledgeBase.ts:803` | Exam list "(P, FM, MAS-I … PCPA)"; "community-written"; `ready` = "complete — full syllabus and question bank"; "most pages not fact checked" | FAM, SRM, the DISCs, ALTAM and ASTAM are missing. The vault is one maintainer's. "Ready" means the eight gates pass. Nearly every question *is* verified. | Derive the list; "study notes"; "ready"; "Most concept and source pages haven't been checked yet; nearly every question has." |
| `lib/pcpaReport.ts:261` | Check "Uses exposure as an offset" | Ticked by `/offset\|exposure/`, so any mention passes | "Mentions exposure or an offset", or tighten the test |
| `pages/Community.tsx:296` | "The most talked-about threads on r/actuary right now" | The most-commented of the latest fetched posts | "Most discussed of the latest posts" |
| `pages/Landing.tsx:462` | Paper tile "Sample questions" | The DISC banks are the vault's own questions | Name the source per bank |
| `components/assumptions/AssumptionsShelf.tsx:35` | "N published figures from M documents" | Counts superseded sets the list below hides | Count what's listed |

**Also bugs, not just copy:**
- ✔ `StreakCompleteOverlay.tsx:96` prints "5 / day streaks!" Make it singular, with no "!".
- `battle/TopicPick.tsx:347`: the fallback prints "Their's topics".
- ✔ `TutorNowView.tsx:147` draws `purpose` and `phaseLine` in one `<p>`, so three phases say
  everything twice ("Good luck. Nothing to do here. It's exam time. Nothing more to do here — good luck.").
- `lib/sittingTimeline.ts`: "Registration deadline in … Tomorrow".
- `lib/navTrail.ts:225`: can render "Back to Back".
- Edge functions: `"Configuration error: STRIPE_SECRET_KEY is not set"` reaches the
  Upgrade page word for word, and the beta-code errors are telegraphic (R5).

---

## 3. Cryptic copy

| Where | Current | Problem | Suggested |
|---|---|---|---|
| `analytics/AnalyticsSummary.tsx:90` | Tile "Marks at risk", "−4.2", "Section · 23% of the exam" | No unit. It's an estimate in points of 100, which only the screen reader is told | "−4.2 of 100 · {Section} · 23% of the exam" |
| `AnalyticsSummary.tsx:72, 99` | "a question · the exam allows 3:00"; "of 40 · retry 60% of 12" | Fragments | "per question · exam allows 3:00"; "40 first tries · retries 60% of 12" |
| `analytics/AnalyticsLocked.tsx:38` | "See where your marks go" | A situational title (log 2026-10-23) | "Analytics" + a plain body |
| `craft/CraftScoreboard.tsx:135, 214, 80` | "in 3 for Gold"; "Gold 80% in 20%"; "Missed: 1,200 in its 5 connections" | You need to know the Pareto rule to read these | "120 points to Gold · 3 connections left"; "Gold · 80% of the score in your first 20% of pairs" |
| `AnswerabilitySection.tsx` + `lib/answerability.ts` | "Answerability", "Out of reach", "Tagged page", "within its reach", "steps the notes needn't teach" | Gate vocabulary (R4) | Title "Taught in the Notes"; pills "Taught on this question's pages" / "Taught on a linked page" / "Not taught yet" |
| `WikiResources.tsx:344`, `SourceMaterialGallery.tsx:160` | Filter "Vintage" | The app's own empty states say "edition" | "Syllabus edition" |
| `FloatingSearchBar.tsx:211`, `ExamsPopout.tsx:356` | "Beta" on its own | Never explained (R12) | "Beta · questions and pages still being checked" |
| `wiki/ListenView.tsx:153` | "Studio voice" / "Pro voice" | Studio vs Pro means nothing to a reader | "Recorded voice" |
| `workflow/WorkflowPanels.tsx:867` | "Connection · informs" | An edge-kind id shown as a word | "Connection" |
| `tools/ToolCard.tsx:202` | "Copy for AI (run_tool call)" | MCP jargon | "Copy for Claude or ChatGPT" |
| `lib/tools/input.ts` (on the card) | `"per_year" must be between…`; `Row 3 of "points" is missing "value".` | Field keys on screen | Use the field's label |
| `lib/workflowBrief.ts:66` | "A judgment left at its default is my call, not a selection" | Reads as the opposite of what it means | "…is one I haven't made yet. List the ones you ran at their defaults." |
| `cowork/ResourceCard.tsx:132` | "…rather than naming one Cowork carries." | In-house verb ("carries", ×3) | "A stand-in for this kind of document, not a real one." |
| `lib/tutor/copy.ts:76, 143`; `journey.ts:27` | "Extra practice is still spaced."; "Start underneath"; "what is heavy" | Cryptic | "Nothing due today. You can still practise."; "Get {X} to Level 1 first."; "the heaviest-weighted sections" |
| `components/ExamsPopout.tsx:328` | "click to cycle Exam P status" | Code-speak | "Exam P: Not started. Change status" |
| `store/ProductSheet.tsx:595` | Section "Its twin on the lists" | A clever title for a plain fact | "Also allowed" |
| `ReadinessCard.tsx:1503` | Popup "Study Guide" | Clashes with the Study Guides tab | "Exam Readiness" |

---

## 4. Slogans and AI tells

Grouped by pattern rather than listed one by one. File references are where the rest of
each pattern lives.

**Taglines and selling lines**
- `pages/Store.tsx:227`: "…so you walk in confident". This is the skill's own example of a
  feeling put on the reader's behalf.
- `pages/Settings.tsx:800`: "a custom study plan and exclusive features" → "Pro plans what
  to study each day until your exam."
- `data/credentialPaths.ts:248, 402`: "The letters are not the finish line." (×2) Cut it.
- `pages/Community.tsx:271`: section "Make it yours" → "Follow Topics".
- `lib/seo.ts:38`: "…and beyond". `lib/seo.ts:922`: "…for you and your AI assistant."
- `lib/podcast.ts:31`: "…to lock these in." (It also tells someone already inside the app to "open Actuarial Notes".)

**Exclamation marks and praise in confirmations** (R6), about 15 live:
- `Settings.tsx`: "Thank you for helping us build Actuarial Notes!" and "Pro restored! Your features should appear shortly."
- Welcome and completion screens: Dashboard "Welcome to Actuarial Notes!" and Flashcards "Deck complete!".
- `QuestCompleteOverlay`: "Quest complete!" `StreakCompleteOverlay`: "Nice work — …" and "You lit the flame — …".
- `StudyPlanCompleteOverlay`: "Today's plan complete!" and "Unlock the 2× gem bonus". The button is "Unlock" with a lock icon, but the action is collecting gems.
- `ReadinessCard`: "All concepts mastered. Great work!"
- `LeaderboardPanel`: "You were promoted to Gold!", "climb back this week", "take the early lead".
- `ConceptLevelUpCeremony`: "Collected!" and "Concept Leveled Up!". This one is a ceremony, so it's your call; it also uses US "Leveled" where the app writes "practise".

**Triads and colon reveals in page intros**
- Battle: "Two players, the same questions, one scoreboard." It's followed by a second triad that repeats "How points work" just below.
- Craft: "…every pair connects…: find 80% of it in your first 20% for gold."
- Community: "Where actuaries gather — what they're talking about, where they're meeting, and how to join in."
- Dashboard sign-in: "Track your progress, study plans, and exam readiness."
- GuestSavePrompt: "it comes with you — your scores, concept levels and streak…"
- Project: "a brief, a data set, R and Python…". Also untrue (§2).

**Rhetorical questions:** Tools "What does the published document say the figure is?", Battle
errors "…Find someone else?", Store kit "Have one? Tick it", and Tutor "Want to look at what that
quiz cost you?"

**Saying it twice** (R10):
- Store product sheet: "Nothing is sold on Actuarial Notes" (×3) plus the legal disclaimer, and the reviews line repeats the disclaimer.
- Settings delete dialog: "irreversible" + "permanently" + "cannot be recovered" + "cannot be undone", and a GDPR citation.
- `ActiveExamCard.tsx:254`.
- `TutorJourneyView.tsx:105`.
- `HeatmapInfoPanel.tsx:175` repeats slide 4 on slide 5 (against the log's "each fact on one slide only").

**One word stretched:** "sorted" appears about 8 times in the Store kit ("Practise questions sorted").
"Done" would do.

**Em dashes** (R9): roughly 100 visible across the app, densest in Flashcards (13),
LeaderboardPanel, ReadinessCard, the Project results/report views (about 9) and Tutor strings (about 18).
Most are tooltips, toasts and status lines: "Schedule locked in — N concepts…",
"2× gem bonus applied — …", "Not started — click to update exam status".

---

## 5. Noun drift: decisions needed

Pick one form for each; I'll apply it everywhere and add it to the skill as a glossary.

| Thing | Forms in use | Suggested |
|---|---|---|
| The products tab | Shop (sidebar, h1) · Store (route, docs, back links, `navTrail`) · "Actuarial Exam Shop" (SEO) | **?** Store keeps it apart from the Gem Shop, and every product sheet says nothing is sold |
| The daily plan | Today's Study Plan · Today's study plan · Today's plan · Custom Study Plan · Study Plan | Title "Today's Study Plan"; "today's study plan" in sentences |
| The full-paper mode | Practice Exam (`PRACTICE_EXAM_LABEL`) · Practice exam · Exam · Finish Exam | **Practice Exam**, matching **Past Papers** beside it |
| Fact Check verdicts | Fact checked / Not fact checked · Verified / Not verified · finding / issue | "Fact checked" and "issue" |
| Exam status | Passed · Completed · In Progress · In progress · In Development · In development | One casing each |
| Readiness projection | Projected readiness · Predicted readiness | Projected |
| Credential | Credential path · Credential track | Track |
| Settings page | h1 "You" · every link "Settings" | Settings |
| Collect reward | Collect · Claim · Unlock · bank | Collect |
| Ready date | target date (email) · ready date (app) | ready date |
| Account creation | Sign up · Create Account · Make an account | "Create account" |
| Levels | Level 1 · L1 · mastered · Decayed | Level 1–3, Forgotten |
| Spelling | levelled/leveled · personalised · summarising | **?** The app mostly writes British ("practise") |
| Resource empty state | No sources / No resources match these/the current filters | "No resources match these filters." |
| Syllabus change | Added · New in Fall 2026 | Added |

---

## 6. Dead copy

These are rendered nowhere today, but they carry stale or slogany text. Delete them, or mark them for
rewrite before any revival:

- `HeatmapInfoPanel.tsx`: `HeatmapOverviewSlide`, `ExamDatesSlide`, `RegistrationSlide`
  (old exam lists such as "IFM, LTAM, STAM", and "the date you want to feel fully prepared by").
- `MascotWidget.tsx`: about 130 phrases ("Outsmart the exam. It's what we do.").
- `TodayCard`, `StudyPlanCompletionCeremony` ("Bonus claimed! 🎉"), `StudyPlanInfoPanel` (a
  Forgotten rule that doesn't match `mastery.ts`), `TopicProgressSection`,
  `TopicCoverageChart`, `SessionHeatmap`, `RadialGauge`, and the `QuestsCard` component
  (only its `CollectButton` is used).
- `OnboardingTour.tsx` (parked): "The loop is simple: read, quiz, level up". It also says
  signing in "unlocks the daily plan", which needs Pro.

---

## 7. Copy to hold up as the model

- **Today's session steps:** "Fix 3 mistakes", "Learn 4 new concepts", "Review 5 concepts".
- **Readiness insight:** "Your biggest gap is Ratemaking: 30% of the exam, 20% covered."
- **Spreadsheet rules:** "Only what the exam-day spreadsheet allows. Other functions are refused, and function keys do nothing."
- **Projects:** "Not yet a pass on your own ratings. The CAS publishes no pass mark; this simulator uses 70% overall with no domain below half."
- **Numeric check:** "Your final figure, 1,240, is close to the answer, 1,250. Check your rounding and your working against the sample answer."
- **Discontinued calculator:** "Texas Instruments no longer makes the {model}, and no seller we checked lists it new. It is still on both bodies' lists, so one you already own is allowed in."
- **Privacy:** "Which pages and features get used, so we know what to improve. No ads, nothing sold."
- **Wiki question page:** "No current syllabus covers this question. It's kept for the record."
- **Credential path:** "Exam P at the SOA, Exam 1 at the CAS. Same paper."
- **Upgrade success:** "That worked. You have Pro now."

What these share: each one names a real number or thing, says one fact per sentence, and
stops when the fact is told.

---

## 8. Suggested order of work

1. §2: the untrue claims and the bugs. These are small, independent edits, and each one is checkable.
2. §5: settle the nouns (your call), then a sweep.
3. §3 and §4, screen by screen: gamification overlays, Settings, the Gem Shop, Analytics, Craft.
4. §6: delete or quarantine the dead copy.
5. Codify §1 and §5 into `app-copy`, and into the other skills and guardrails that write
   human-facing text.
