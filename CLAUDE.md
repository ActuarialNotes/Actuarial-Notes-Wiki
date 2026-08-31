# Actuarial Notes Wiki — Onboarding for Claude Code

Read this first, every session. It should save you a re-discovery pass through the repo.

## What this project is

A two-part product for people studying for actuarial exams (CAS/SOA):

1. **Content vault** (repo root) — an Obsidian-style markdown wiki: exam syllabus pages
   (`Exam *.md`), concept pages (`Concepts/*.md`), resource/timeline pages
   (`Resources/{Books,Regulation,Events,Benchmarks,Data}/*.md`), and a practice-question
   bank (`questions/<exam-id>/*.md`).
2. **Quiz app** (`quiz/`) — a React + Vite + TypeScript SPA that reads the markdown content
   at build time, renders the wiki, runs quizzes/flashcards (with a "collect the card"
   gate), tracks per-concept mastery, generates personalized study plans, and layers on
   gamification (gems, cosmetics, avatars, a Store). Backed by Supabase (auth, sync,
   payments). A **Research** tab (Canadian P&C research corpus + AI "Ask") is fully built
   but currently **disabled behind feature flags** — see "Feature flags & the Research tab".

Almost all day-to-day development work happens inside `quiz/`. The markdown content at
the repo root is the "database" the app is built on top of.

## Repo layout cheat sheet

```
Exam *.md, Concepts/*.md                          — wiki content (Obsidian [[wiki-links]])
Resources/{Books,Regulation,Events,Benchmarks,Data}/*.md
                                                  — resource pages; the dated ones feed the
                                                    Resources timeline/heatmap (frontmatter w/ source links)
questions/<exam-id>/*.md                          — question bank (YAML frontmatter + markdown)
comprehension-checks/<exam-id>/*.md               — flashcard-collect gate questions (one .md per concept,
                                                    parsed by lib/comprehensionCheckParser.ts)
Media/Attachments/                                — images referenced via ![[...]]
.verify/<mirrors the vault path>.md               — VERIFY: one append-only fact-check log per
                                                    content file (+ `_runs/` batch summaries)
scripts/                                          — Python content-maintenance scripts (one-off/batch)
docs/                                             — design docs for app algorithms (read these!)
api/chat.js, api/research.js, api/research-ask.js — Vercel serverless fns, proxy to Anthropic API
supabase/migrations/, supabase/functions/         — DB schema + edge functions (Stripe, TTS, beta codes, research)
quiz/                                             — the React app (this is where most code changes go)
```

### Inside `quiz/src/`
- `pages/` — route-level views (Quiz, Review, Dashboard, Flashcards, Search, Settings, Store,
  Upgrade, wiki/*, and `Research/` — the last is flag-gated)
- `components/` — shared UI; `components/wiki/` (wiki UI), `components/ui/` (shadcn-style primitives),
  `components/collect/` (flashcard-collection modal + 3D card), `components/research/` (flag-gated)
- `lib/` — core logic, mostly pure/testable modules (this is where the interesting algorithms live)
- `data/` — authored static tables bundled into the app: `comprehensionChecks.ts` (parses the
  flashcard-collect gate questions from `comprehension-checks/<exam-id>/*.md` at build time via the
  `virtual:comprehension-checks` vite module — see `lib/comprehensionCheckParser.ts` +
  `docs/flashcard-collection.md`), `examSittings.ts` / `examPdfLinks.ts` (sitting dates, examiner reports, and each
  exam's published syllabus — the PDF an exam page's title-row button opens),
  `mnemonics.ts` / `stories.ts` (per-concept, per-avatar content), `quests.ts` (daily-quest
  catalogue), `keystoneConcepts.ts` (the per-exam keystone catalogue — see
  `docs/keystone-concepts.md`), `examGuides.ts` (the exam-page orientation guide — see below),
  `tracks.ts`
- `hooks/` — React hooks wrapping lib logic + Supabase queries
- `stores/` — Zustand stores: `quizStore.ts` (active quiz session), `researchStore.ts` (flag-gated)
- `contexts/` — Auth, ExamProgress providers

## Key domain concepts (read the docs first)

The `docs/` folder holds design docs for the trickiest logic — **read the relevant one
before touching that area**:
- `docs/concept-learning-progression.md` — the 5-state mastery ladder (New → L1 → L2 → L3,
  with Forgotten/decay), implemented in `quiz/src/lib/mastery.ts`
- `docs/study-plan-generation.md` — how daily study plans are scheduled/paced/cached,
  implemented in `quiz/src/lib/studyPlan.ts`. The *order* concepts are introduced in lives
  next door in `lib/studyPlanOrder.ts` — syllabus order, or keystone-first (each keystone
  trailed by what its page links to, from the build-time `data/keystoneLinks.ts` map) when the
  strategy is *Key concepts first*. Never alphabetical: on a fresh account every concept is
  New, so that tiebreak *is* the plan.
- `docs/flashcard-collection.md` — the "collect this card" gate: a concept must be collected
  (pass a comprehension check) before its mastery can advance past **New**. `applyAnswer`
  in `mastery.ts` takes a `collected` flag; the gate UI lives in `components/collect/`.
- `docs/verification.md` — **VERIFY**, the fact-check layer (**Fact Check** is what it is
  called on screen; the vault-side schema and toolchain keep the `verify`/`verification`
  spelling): the `verification:`
  frontmatter block every content file carries, the append-only `.verify/` sidecar logs, and
  what `scripts/verify_check.py` fails a PR for. The five principles are the part to read —
  in particular P1 (an AI cannot verify by reasoning alone; a page reaches `verified` only
  against a *citable external source*, and `verify_record.py` refuses otherwise) and P4
  (verification is bound to the file's bytes, so any edit downgrades it to `stale`). Read
  before touching a `verification:` block, a log, or anything under `scripts/verify_*`.
- `docs/validation-agent.md` — the VALIDATE agent (`.claude/agents/validate.md`, `/validate`):
  how a sweep picks its batch, what context it loads (the *complete* prior log — that is the
  compounding mechanism), and the line between what it may auto-fix and what it must only
  open a finding about.
- `docs/research-ai-disabled.md` — what the two Research feature flags hide and the exact
  re-enable checklist (read before touching anything under `Research`/`research`).
- `docs/research-corpus-plan.md` — the plan for the Canadian P&C `Resources/` markdown corpus.
- `docs/daily-plan-email.md` — the opt-in daily study-plan email: how the sender derives
  "today's concepts" from the (usually day-old) `study_plan_cache`, the hourly pg_cron →
  edge-function send loop, and the one-time Resend/vault setup checklist.
- `docs/leagues.md` — the opt-in weekly XP leagues (roadmap P4.1): the tier ladder and
  promotion/relegation math, the lazy Monday-UTC rollover, and the privacy model
  (snapshot-on-join / delete-on-leave, RPC-only board reads).
- `docs/sound-design.md` — the **sound-effects system**: the four rules the cue
  catalogue follows (quiet interface feedback, paper-as-noise, melodic success,
  silent mistakes), the delegated `data-sound` listener that gives every control
  a press cue, and how to wire a new interaction. Read before adding or changing
  a sound.
- `docs/visual-noise-review.md` — a **review backlog**: where the app explains itself in grey
  text instead of designing the fact, the five tests for whether a muted caption has earned
  its place, and the surface-by-surface list to work through. The Exam Readiness popup (§3.1)
  is done and is the worked example; the rest is not. Read alongside the style guide before
  adding a `text-xs text-muted-foreground` line under anything.
- `docs/style-guide.md` — the app's **visual/interaction design system**: colour tokens &
  theming, the shallow type scale, the semantic state-colour map, spacing/radius/elevation,
  component & overlay patterns, motion, and a11y. Read before adding or restyling UI so new
  work stays consistent, minimalistic, and hierarchy-aware.
- `docs/stacked-pages.md` — the concept popup's **page stack** (Obsidian's stacked pages):
  a link followed inside the popup opens a new page on top of the one being read, and the
  pages behind it fold up into title bars — vertically, along the pane's short axis, so a
  folded page keeps a readable title. Covers the push/open/close rules in `lib/pageStack.ts`,
  why exactly one page is open at a time, how a folded page keeps its scroll position, and
  the one thing to keep straight — the *stack* (what's on screen) and the *walk* (the
  Previous/Next footer) are different sequences, so every move of the walk rebuilds the
  stack from the page it landed on.
- `docs/keystone-concepts.md` — **keystone concepts**: the authored ~10–15 load-bearing
  concepts per exam (`data/keystoneConcepts.ts`), the `lib/keystone.ts` lookup every surface
  shares, and the **gold** material that marks them. Read before editing the catalogue or
  touching `.keystone-*` CSS — gold (intrinsic) and rainbow foil (earned) must stay distinct.
- `docs/exam-readiness.md` — the **Exam Readiness Score**: the two weighted criteria
  (syllabus coverage 60%, keystone concepts 40%), the bands, and why keystone mastery carries
  far more than its share of the syllabus. `computeExamReadiness` is the *one* readiness
  number — the exam-page card, the Dashboard radial, the exam grid and the readiness
  projection all call it. Read before changing `lib/readiness.ts` or any readiness readout.
- `docs/distribution-simulators.md` — the **interactive distribution simulators** that replace the
  static `Media/*_pdf.svg` / `*_pmf.svg` embeds on the distribution concept pages: parameter
  sliders, live moments, PDF↔CDF, and a Monte-Carlo histogram. Read before touching
  `lib/distribution*.ts` or adding a distribution.
- `docs/concept-figures.md` — the **generated concept figures**: one SVG per Exam P / FM /
  MAS-I / MAS-II / 5 concept in `Media/Figures/`, drawn by
  `scripts/generate_concept_figures.py` on top of the dependency-free
  `scripts/figure_kit.py`. Read before editing a figure — they are generated, so a hand
  edit to an SVG is lost on the next run.
- `docs/resource-covers.md` — the **resource cover images**: where the metadata card gets
  a source's cover (the page's first image embed), how `scripts/generate_resource_covers.py`
  draws one from front matter for the pages with no real jacket, and the rule that a real
  jacket always wins — drop it in under a name that isn't `… - Cover.svg` and the generator
  leaves it alone forever.
- `docs/mock-exam-browser.md` — the **Mock Exam past-paper browser** on the quiz builder: the
  authored sitting catalogue (`data/pastExams.ts`), how `lib/pastExams.ts` merges it with the
  question bank so unimported papers still list (greyed out), the **live pass-rate
  pipeline** (`api/pass-rates.js` → `lib/passRates.ts` → `hooks/useExamPassRates`) that lays
  published ratios over the authored ones, and the **in-app PDF viewer** that reads a
  sitting's examiner's report (`components/PdfViewerPanel.tsx` → `quiz/api/exam-pdf.js`). Read
  before touching any of it — in particular the rule that a ratio is transcribed or fetched,
  never estimated, that an unparseable source must yield *no* figures rather than wrong ones,
  and the same rule for the report links in `data/examPdfLinks.ts`: transcribed from the
  publisher, never constructed from the filename pattern. That doc also covers the
  **syllabus button** on a study-guide page (`components/wiki/ExamSyllabusButton.tsx`),
  which reads the same table and reuses the same viewer, and the **Read PDF** button on a
  resource page's metadata card (`components/wiki/ResourceMetaCard.tsx`), which opens an
  `Available from:` PDF — an ASOP, a CAS study note — in that viewer instead of a browser tab.

Other important `lib/` modules:
- `parser.ts` — parses question markdown (frontmatter + body) into `Question` objects
- `verification.ts` — the app-side read half of **VERIFY** (`docs/verification.md`): parses the
  `verification:` block off any content file (`parseVerification`, and `Question.verification`
  via `parser.ts`), parses a sidecar log, and decides what the **Fact Check** badge says
  (`factCheckBadge` → `components/FactCheckBadge.tsx` → `FactCheckPanel`; on a concept or
  resource page the way in is the *Fact Check* item of the action menu, and an exam page has
  none). Two rules live here rather than
  in a surface: an open **critical** finding outranks every other badge state including
  `verified`, and `hasCriticalFinding` is what makes `filterQuestions` keep such a question out
  of quiz sessions — ahead of the `ids` short-circuit, so a saved mistake-review link can't
  serve one either. Sidecar logs are deliberately *not* bundled; the panel fetches one on
  demand through `github.ts`.
- `vaultMath.ts` — normalises the vault's math delimiters into the shapes `remark-math`
  can tokenise. The content is authored for Obsidian, whose math parser is looser: an
  escaped dollar inside inline math (`$\$400$` — currency is everywhere in ratemaking
  examples) closes the span early and swallows the rest of the sentence as italic "math",
  and a multi-line `$$\begin{align*}` block whose fence is not alone on its line loses the
  `\begin` as fence *meta* and runs to the end of the page. Both render as red KaTeX error
  text. `normalizeVaultMath` is applied by `WikiArticle` and `MarkdownText` before parsing;
  it only ever moves delimiters, never edits a LaTeX body, and is idempotent. Write the
  vault the Obsidian way — this module is what makes that render.
- `wikiParser.ts` / `wikiIndex.ts` / `wikiExtract.ts` — parse wiki pages, build search index, extract syllabus structure
- `conceptMatch.ts` — resolves concept name variants/aliases to a canonical slug (`slugForLink`)
- `examStatus.ts` — how far along each exam's material is, keyed by exam_progress key:
  `ready` (P, FM), `beta` (MAS-I, MAS-II, Exam 5) or `development` (Exams 6–9 — a syllabus
  outline with no question bank yet). The one definition; the study-guide exam grid greys
  those cards out with an "In development — not yet available" pill instead of a Beta label,
  the exam page shows the amber *In Development* banner (`WikiFloatingSearch`), and the quiz
  builder's Beta pill reads the same helper. Move an exam out of development here, not in the
  surfaces.
- `keystone.ts` — the keystone-concept read side: `findKeystone` / `isKeystone` (strict name
  matching, no fuzzy hits) and `keystoneProgress` (decay-aware mastery roll-up per exam).
  Rendered by `components/KeystoneName.tsx`; the per-exam list lives in the readiness popup
  (`components/wiki/ExamReadinessCard.tsx`), where keystone mastery is a scoring criterion.
- `questionAttempts.ts` — turns a learner's per-question response tally (`hooks/useQuestionAttempts`,
  backed by `question_responses`) into the display state every question list shows: attempted or not,
  and how many attempts were successful vs unsuccessful. Rendered by `components/QuestionAttemptBadge.tsx`,
  which is the single chip used by the Search page, the quiz floating search, the concept question
  browser and the concept detail modal — add it to any new surface that lists questions rather than
  writing a new chip. Attempt history is server-side only, so signed-out viewers pass
  `showNew={false}` (via the hook's `tracked` flag) and see no chip instead of a false "Not attempted".
- `resourceExams.ts` — which exam(s) a resource is a syllabus reading for. A
  `Resources/Books` page names no exam; the relationship is authored the other way round, in
  each exam page's `Source Material` callout, so this module inverts those callouts into a
  resource-name → exam-labels map. It is built once at bundle time (`vite.config.ts`) and
  hung on the wiki index's `document` items as `exams`, which is what lets a resource card
  lead its pill row with **Exam P-1** / **Exam MAS-I** without re-reading every exam page.
  Imports are relative, not `@/`-aliased — the vite config pulls it into its own Node graph.
- `pastExams.ts` — the past-sitting shelf behind the quiz builder's **Mock Exam** source:
  `buildPastExamRows` unions the authored catalogue (`data/pastExams.ts`) with the sittings the
  question bank actually holds, so a released paper that hasn't been imported still lists
  (greyed out, "Not added yet") and a freshly converted one appears without a catalogue edit.
  Rendered by `components/PastExamBrowser.tsx`. See `docs/mock-exam-browser.md`.
- `examPdf.ts` / `pdfViewer.ts` / `pdfjsSetup.ts` — the exam-PDF reader behind the mock-exam
  shelf's **Examiner's Report** button. `examPdf.ts` decides which sources are viewable (the
  same allowlist `quiz/api/exam-pdf.js` enforces) and builds the proxy/download URLs — the page
  can't fetch a publisher's PDF itself, and can't save one cross-origin; `pdfViewer.ts` is
  the pure reading maths: the fits (a document opens with the *whole page* on screen —
  `pageFitZoom`, which is fit-to-width on a phone and well below it on a wide desktop
  panel), the render resolution and pixel budget (a page is drawn at ~216 dpi rather than
  the screen's ratio, so a scan is squeezed less far to fit), and the zoom range —
  whole-page fit up to 4× — with the pan/re-anchor maths behind the panel's zoom slider;
  `pdfjsSetup.ts` is the dynamically-imported pdf.js instance (the **legacy** build) and the
  URLs of the four asset directories pdf.js fetches at run time — `pdfjsAssets.ts` is the
  shared list, copied out of node_modules by `vite.config.ts`. `wasm` is the load-bearing
  one: CCITT fax and JBIG2 decode through it, so without it every *scanned* page renders
  as a ghost, and pdf.js only warns. Rendered by
  `components/PdfViewerPanel.tsx` in the concept popup's shell. See
  `docs/mock-exam-browser.md`.
- `pageStack.ts` — the concept popup's **page stack**: which pages a followed link leaves
  open and which one of them is open on screen (one at a time — the rest are folded into
  title bars down the pane). Pure and tested; the store half is `pages`/`pageIndex` in
  `hooks/useConceptPopup.ts`, the rendering is `ConceptPopup` (shell + bars) over
  `ConceptPagePanel` (the open page, mounted per ref, with the scroll memory that lets a
  folded page come back where it was left). See `docs/stacked-pages.md`.
- `navScrub.ts` — the maths behind a **scrubbable** progress bar: which item a point on the
  track means (the exact inverse of `navProgressPercent`, so a drag can't land off by one),
  and where a key press moves to. Read by `components/NavProgressBar.tsx`, which is the one
  position bar above every Previous / Next footer and becomes a video-timeline-style control
  wherever a surface passes `onScrub` — the exam-PDF reader, the quiz's question bar, the
  concept popup, flashcard study, the concept detail and mistakes modals, math focus. Bars
  that measure something *earned* (mastery, XP, readiness, quests) deliberately don't get a
  handler: there is nowhere to drag to. See `docs/style-guide.md` §7.5.
- `passRates.ts` — the client half of the live pass-rate pipeline: sanitises what
  `api/pass-rates.js` returns, caches it in localStorage for a week, and `applyPassRates`
  lays the published ratios over the authored catalogue per field (live wins, authored is
  the floor). The fetch is server-side because the examining bodies send no CORS headers;
  the parsing lives in `api/lib/passRates.js` — one implementation, exercised from
  `lib/passRateParser.test.ts` / `lib/passRateEndpoint.test.ts` rather than mirrored.
- `resourceTimeline.ts` / `resourceTimelineFilters.ts` — build/filter the dated Resources timeline (heatmap)
- `readiness.ts` — exam-readiness scoring. `computeExamReadiness` is **the** readiness score
  (syllabus coverage 60% + keystone concepts 40%, plus band, section breakdown and concept
  tally); every surface that prints a readiness % calls it — the exam page's **Exam Readiness
  Score** card (`components/wiki/ExamReadinessCard.tsx` — the Dashboard's Study Guide radial
  at 48px, leading the orientation row as `ExamGuideCards`'s `leadCard`; the card shows only
  the score, its popup the breakdown and the exam's keystones), the Dashboard's Study Guide
  radial, the exam grid and the readiness projection. `computeReadiness` is the
  weighted section score it is built from — an input, not a second number to display.
- `readinessRing.ts` — the geometry behind the **readiness ring**: one arc per syllabus
  concept, each section sized by its exam weight, each arc filled by that concept's mastery
  state. Pure and tested. Two surfaces draw it and differ only in chrome — the Dashboard's
  Study Guide card (`StudyGuideRadial` in `components/ReadinessCard.tsx`, with a legend,
  curved section labels and a hover readout) and the exam page's title-row badge
  (`components/ReadinessRing.tsx`, everything stripped off) — so the two can never disagree
  about the shape of a syllabus. Geometry is in a fixed 280-unit viewBox; pick a size by
  scaling the SVG, not by editing the constants.
- `distributionMath.ts` / `distributions.ts` / `distributionPlot.ts` — the distribution-simulator
  engine: special functions + seeded samplers, the per-distribution spec catalogue (with the
  `Media/*.svg` → spec map), and the pure curve/histogram/tick helpers the SVG reads. Rendered by
  `components/wiki/DistributionSimulator.tsx`. See `docs/distribution-simulators.md`.
- `streak.ts` / `streakStore.ts` — daily-streak engine (roadmap P1.1). `streak.ts` is the
  pure, tested core (timezone-correct day boundaries + freeze/repair mechanics);
  `streakStore.ts` persists it to the `user_streaks` table (signed-in) or localStorage
  (guests) and is called from `quizStore` on quiz completion — but only when the quiz
  had **at least one correct answer** (an all-wrong quiz no longer banks the day). Each
  record `settleStreak`s a day-keyed celebration marker (grown or not) and fires
  `STREAK_CELEBRATION_EVENT`; `components/StreakCompleteOverlay.tsx` reads that on /review
  to play a flame animation when today's streak grew, then resolves so the
  `QuestCompleteOverlay` follows (sequenced by `PostQuizCelebrations` in `pages/Review.tsx`).
  Also surfaced via `hooks/useStreak.ts` + `components/StreakBadge.tsx` in the
  Sidebar/BottomNav/Dashboard. Gated by `STREAK_ENABLED`.
- `xp.ts` / `xpStore.ts` — daily goal + XP engine (roadmap P1.2). `xp.ts` is the
  pure, tested core: per-answer XP weighted toward hard + decaying (revived) concepts,
  a level curve, and the configurable daily-goal presets (`DAILY_GOALS`). `xpStore.ts`
  persists `XpState` to the `user_xp` table (signed-in) or localStorage (guests) and is
  called from `quizStore` on quiz completion (`recordXp`). Surfaced via `hooks/useXp.ts`
  + `components/LevelBadge.tsx` (the Dashboard header level badge — a level ring that
  replaces the mascot icon and opens an XP/daily-goal popup) and
  `components/DailyGoalPicker.tsx` (Settings goal picker). Gated by `XP_ENABLED`.
- `quests.ts` / `questStore.ts` — daily-quest engine (roadmap P1.4), the gem-economy
  loop. `quests.ts` is the pure, tested core: it generates a *personalized* daily
  board from the catalogue authored in `data/quests.ts` (one always-achievable "core"
  quest, a revive quest only when concepts have actually decayed to Forgotten, a
  focus quest from today's study plan, generic specials filling the rest), freezes it
  into `QuestsState` for the day, tallies per-quiz progress, and claims completed
  quests. `questStore.ts` persists the state to the `user_quests` table (signed-in)
  or localStorage (guests); `ensureDailyQuests` seeds the board from Dashboard
  context, `recordQuestProgress` advances it from `quizStore` on quiz completion, and
  `claimQuestRewards` pays collected quests (gems via the `award_gems` RPC, XP via
  `recordXp`) — rewards are claimed by the user, never auto-paid. Surfaced via
  `hooks/useQuests.ts` + `components/QuestsCard.tsx` (collapsible Dashboard section)
  and `components/QuestCompleteOverlay.tsx` (post-quiz collect prompt on /review).
  Gated by `QUESTS_ENABLED`.
- `leagues.ts` / `leagueStore.ts` — weekly XP leagues (roadmap P4.1), the opt-in social
  layer. Leagues are **per-exam** (keyed by the exam_progress key: `P`/`FM`/`MAS-I`).
  `leagues.ts` is the pure, tested core: the Bronze→Diamond tier ladder, the
  promotion/demotion zone formulas (duplicated in the SQL rollover — see
  `docs/leagues.md`), and the Monday-UTC week clock. Unlike the other gamification
  stores, `leagueStore.ts` has no localStorage side: leagues are signed-in only and all
  state lives behind SECURITY DEFINER RPCs (`join_league`, `leave_league`,
  `record_league_xp`, `get_league_board` — each takes the exam — in
  `supabase/migrations/20260710_leagues.sql`) because a leaderboard is cross-user — the
  client can never write its own weekly XP or read the raw member table. `recordLeagueXp`
  is fired alongside `recordXp` from `quizStore` on quiz completion, credited to the
  quiz's exam (quest XP is not — quests are cross-exam). Surfaced not as its own card but
  as the **League tab** in the Level-badge popup (`components/LevelBadge.tsx` hosts
  Quests/League tabs — the popup header shows the level + level-progress bar and the
  daily goal is the first row of the Quests tab → `components/LeaderboardPanel.tsx` with
  a per-exam selector, `components/QuestsPanel.tsx`), plus `components/LeagueSettingsCard.tsx` (Settings
  opt-in/out). `hooks/useLeague.ts` is `useLeague(exam)`. Gated by `LEAGUES_ENABLED`.
- `dailyEmail.ts` — pure core of the opt-in daily study-plan email: derives "today's
  concepts" from a cached (possibly stale) study plan and the local send-time math. The
  actual sending happens server-side in the `daily-plan-email` edge function, which
  mirrors these helpers verbatim (it can't import from `quiz/src` — same duplication
  contract as the league SQL). Prefs live in `user_email_prefs`
  (`hooks/useEmailPrefs.ts` + `components/EmailSettingsCard.tsx` in Settings). Gated by
  `DAILY_PLAN_EMAIL_ENABLED`. See `docs/daily-plan-email.md`.
- `mathFocus.ts` — math focus mode: tapping a rendered equation magnifies it in a
  full-screen overlay with Previous/Next through the equations around it. This module
  is the decision layer (what counts as a hit, which equations form one set, how far
  to scale); `components/MathFocus.tsx` is the single delegated click listener mounted
  in `App`, and `components/MathFocusOverlay.tsx` is the overlay. It works on *any*
  surface that renders KaTeX because nothing opts in: a formula box is marked
  `data-math-block` by `MarkdownCallout`, a container that groups equations into one
  prev/next set is marked `data-math-scope` (`WikiArticle`, `MarkdownText`, and the
  popup/flashcard bodies that stack several of them), and `data-math-magnify="none"`
  opts a subtree out. Note the vault writes formulas as `> $$…$$` on one line, which
  remark parses as *inline* math — so equations are matched on `.katex`, not
  `.katex-display`.
- `imageFocus.ts` — image focus: tapping a figure opens it in the full-screen
  `ImageGalleryModal` (pan/zoom, Previous/Next), so the diagrams the exam banks ship
  with are readable on a phone. Same shape as math focus — this module is the decision
  layer, `components/ImageFocus.tsx` is the single delegated click listener mounted in
  `App` — but the *opposite* default: an avatar, a cosmetic and an exam diagram are all
  `<img>`, so nothing is clickable until a surface opts in by marking its images
  `data-zoomable`. `MarkdownText` does that for every rendered markdown image, which is
  what makes a quiz stem, a part and an explanation tappable; `data-image-scope` groups
  the images that step together, and `data-image-zoom="none"` opts a subtree out. An
  image inside a control (an answer option) is that control's label and never opens.
- `soundConfig.ts` / `soundEngine.ts` / `soundInteractions.ts` — the sound system.
  `soundConfig.ts` is the cue catalogue as plain data (tones, noise sweeps,
  envelopes) — edit sounds there; `soundEngine.ts` holds the single AudioContext,
  the synth and the enabled/volume store; `soundInteractions.ts` is the pure
  press-cue decision table used by `components/SoundEffects.tsx`, the one
  delegated listener (mounted in `App`) that sounds every button in the app.
  Override per element with `data-sound="<cue>"` / `data-sound="none"`. Nothing
  plays for a wrong answer — that's deliberate and pinned by a test. See
  `docs/sound-design.md`.
- `featureFlags.ts` — build-time feature flags (`RESEARCH_AI_ENABLED`, `RESEARCH_TAB_ENABLED`,
  `STREAK_ENABLED`, `XP_ENABLED`, `QUESTS_ENABLED`, `MASTERY_ANALYTICS_ENABLED`,
  `LEAGUES_ENABLED`, `DAILY_PLAN_EMAIL_ENABLED`, `FACT_CHECK_UI_ENABLED`, `TOUR_ENABLED`). `TOUR_ENABLED` is
  **off**: the guided onboarding tour (`components/OnboardingTour.tsx` +
  `hooks/useOnboardingTour.ts`) is parked pending a simpler rebuild, so `App.tsx` doesn't
  mount it and Settings → Support hides the "Take the tour" row. The component, store and
  the `data-tour` markers across the app are left intact — re-enabling is a one-line change.
- `research*.ts` (researchOntology / researchMetrics / researchPeriods / researchProjectMeta) — Research-tab logic (flag-gated)
- `flashcardSync.ts` — cross-device persistence for the flashcard state: the collected
  set (`hooks/useCollectedCards`) and the deck / custom order
  (`hooks/useFlashcards`). Both stores stay synchronous and localStorage-first; this
  module holds the pure merge functions and the Supabase reads/writes against
  `user_collected_cards` / `user_flashcards` (row per card, so
  two devices converge instead of clobbering). `hooks/useFlashcardSync.ts` orchestrates
  it, mounted at the app root as `components/FlashcardSync.tsx`. The rule to keep in mind:
  local state is unioned into the server **once per device per user** (so guest work
  survives sign-in), and after that the server wins — see `docs/flashcard-collection.md`.
- `collectLockout.ts` — the collect-check **lockout**: a wrong answer on a flashcard's
  comprehension check shuts it for 1 minute, then 5, per concept (misses never
  decay; passing clears the record). Pure core here, persisted by
  `hooks/useCollectLockouts.ts` (localStorage only — see the doc for why), rendered by
  `CollectConceptModal`'s locked panel and `components/collect/CollectGateButton.tsx`.
  The wait is announced before it's applied and always points at the concept page.
  See `docs/flashcard-collection.md`.
- `localMasteryStore.ts` / `dailyProgressStore.ts` — localStorage-backed offline fallbacks that sync with Supabase
- `github.ts` — fetches wiki content from GitHub raw URLs at runtime (for the live site, vs. the build-time bundle)
- `supabase.ts` — Supabase client + shared row types

`*.test.ts` files sit alongside the modules they test (vitest). There are **83 test files /
~1250 tests**, concentrated on the trickiest logic (mastery, study plan, parsing, ontology
matching, the gamification engines, the sound catalogue, and the research/resource-timeline
modules).

## Feature flags & the Research tab

`quiz/src/lib/featureFlags.ts` holds build-time flags (plain module constants, no env vars,
annotated `: boolean` so both branches stay type-checked). Two of them gate a large,
**currently-off** feature — the **Research tab**, a Canadian P&C insurance research corpus
with search, a resource timeline, source-collection "projects", and an AI "Ask" assistant:

- `RESEARCH_TAB_ENABLED = false` — hides the whole tab. The nav drops the Research entry and
  `/research` redirects to `/wiki` (see `App.tsx`, `Sidebar.tsx`, `BottomNav.tsx`).
- `RESEARCH_AI_ENABLED = false` — hides only the AI surfaces (the "Ask AI" search button +
  answer panel, and the project "Ask"/FAQ views) while leaving keyword search + source
  collection working.

**Nothing behind these flags is deleted** — the pages (`pages/Research/`), components
(`components/research/`), store (`stores/researchStore.ts`), `research*` lib modules and
hooks, the `api/research*.js` endpoints, and the `research_*` Supabase tables all remain.
Re-enabling is a one-line change per flag. Read `docs/research-ai-disabled.md` before
touching any of this. When making unrelated changes, remember the disabled branches still
compile — don't "clean up" the flagged code as dead.

## Content conventions (markdown vault)

- Wiki links use Obsidian syntax: `[[Concept Name]]` or `[[Concept Name|Display Text]]`.
- Exam pages use callout blocks (`> [!example]-`) listing learning objectives with weight
  percentages, e.g. `{23-30%}`.
- An exam page may carry a bare `<div class="exam-guides"></div>` marking where the
  **orientation row** goes (the readiness card beside the guide card, both shaped like a
  learning objective, normally just below the exam's intro paragraph; the guide card opens a
  paged popup with a graphic per page). The content is still authored as two guides —
  "How to Study for …" and "Exam Day Tips", for Exam P, Exam FM, MAS-I, MAS-II and Exam 5 —
  but `guideForExam` merges them into one run of pages titled **How to Study**: the page
  marked `opensGuide` first (always the exam-day format page — how many questions, how long
  each gets), then the focus-area advice, then the rest of the exam-day facts. Note the exam
  id for a dash-less exam picks up a `-1` suffix, so Exam 5's `EXAM_GUIDES` key is `5-1`.
  The div is only a position marker: the prose, the paging and the
  illustrations are authored app-side in `quiz/src/data/examGuides.ts` (keyed by the wiki
  exam id) + `components/wiki/ExamGuideGraphics.tsx`, and `WikiArticle` swaps the marker
  for `components/wiki/ExamGuideCards.tsx`. Page bodies are markdown and may use
  `[[Wiki Links]]`. An exam with no entry in `EXAM_GUIDES` renders no guide card. The
  **Exam Readiness Score** card leads the same row (passed to `ExamGuideCards` as
  `leadCard`); on an exam page with no `exam-guides` div it falls back to a slot inserted
  under the "Learning Objectives" heading.
- Every exam page ends with a `## Source Material` heading over a
  `> [!answer]- Source Material` callout: one top-level bullet per syllabus reading (a
  `[[wiki link]]`, normally to a `Resources/Books/` page) with an indented bullet naming the
  chapters or sections covered. The vault keeps the callout — it is what Obsidian renders,
  and `parseExamSyllabus` reads its links — but the app doesn't: `lib/sourceMaterial.ts`
  lifts the entries out and `WikiArticle` renders them as
  `components/wiki/SourceMaterialGallery.tsx`, the same shelf of cover/title/metadata cards
  the study-guide home page shows, with each card carrying its reading assignment. The
  metadata comes from the resource page's front matter via the wiki index, so a source with
  no `Resources/Books/` page still gets a card, just a bare one. Obsidian inline footnotes
  (`^[…]`) in a reading line are flattened into parentheses.
- **Every** content file (`questions/`, `Concepts/`, `Resources/`, root `Exam *.md`) carries a
  `verification:` block as the last key of its YAML frontmatter — including concept and exam
  pages, which is why they now have frontmatter at all (`WikiArticle` already stripped it).
  Never hand-edit `content_hash`, `status`, `open_findings` or `open_critical`: they are
  derived, and `python3 scripts/verify_check.py --sync` owns them. A new content file with no
  block is backfilled by the same command. See `docs/verification.md`.
- Question files (`questions/<exam-id>/*.md`) have YAML frontmatter: `id`, `exam`, `topic`,
  `learning_objective`, `difficulty` (`easy`/`medium`/`hard`), `type`, `wiki_link` (array
  of concept paths), `answer`, `points` — followed by the question body, options, and an
  `## Explanation` section (LaTeX via `$$...$$`). Current banks: `exam-p`, `exam-fm`,
  `exam-mas-i`, `exam-5` (hundreds of questions each).
- Comprehension-check files (`comprehension-checks/<exam-id>/<Concept Name>.md`) gate flashcard
  collection: YAML frontmatter (`concept`, `exam`, `topic`, `correct` letter) + a `- A) …` option
  list, then an authoring-only `<!-- rationale -->` comment. One file per concept; the filename is
  the concept's display name. See `docs/flashcard-collection.md` and the
  `flashcard-comprehension-check` skill.
- Dated resource pages (`Resources/Regulation|Events|Benchmarks/*.md`) carry frontmatter
  with a `date`/`type` and source links (`source_url`, `source_type`, `pdf_url`) — these feed
  the Resources timeline/heatmap. `Resources/Books/*.md` use the older schema (`Available from`).
  See `docs/research-corpus-plan.md` for the full schema.
- `scripts/*.py` are batch maintenance tools for the content vault — e.g.
  `standardize_questions.py` enforces a canonical topic→concept→learning-objective mapping
  (`ontology_map.py` is the data table it consumes), `update_wiki_links.py` rebuilds
  `wiki_link` arrays and regenerates `Concepts Without Review Questions.md`,
  `tag_missing_concepts.py` backfills concept tags. Run these when doing bulk content
  cleanup, not for one-off edits.
- `verify_lib.py` / `verify_check.py` / `verify_targets.py` / `verify_context.py` /
  `verify_record.py` / `sync_reports.py` / `generate_validation_status.py` — the **VERIFY**
  toolchain. `verify_check.py` is the CI gate (and `--sync` the repair pass);
  `verify_record.py` is the only supported way to write a finding, resolution or status —
  it dedupes findings by fingerprint and refuses to mark anything `verified` without a
  cited source. Stdlib only, no PyYAML. Tests: `python3 -m unittest discover -s scripts`.
- `generate_concept_figures.py` (+ `figure_kit.py`, `figure_registry.py`,
  `figures_exam_{p,fm,mas_i,mas_ii,5}.py`) draws the per-concept SVGs in `Media/Figures/`
  and inserts their embeds. The figures are **generated** — edit the builder, not the SVG.
  See `docs/concept-figures.md`.
- `generate_resource_covers.py` (+ `cover_kit.py`) draws the `Resources/Books/` cover
  images in `Media/Attachments/… - Cover.svg` and inserts their embeds, skipping any page
  that already has a real jacket. Also **generated** — edit the builder.
  See `docs/resource-covers.md`.

## Running things

```bash
cd quiz
npm install
npm run dev        # vite dev server
npm run build      # tsc + vite build
npm run lint       # eslint src --ext ts,tsx
npm test           # vitest run
```

Vite plugins (`vite.config.ts`) bundle the markdown content at build time via virtual
modules that read directly from the repo root:
- `virtual:wiki-content` — `Exam*.md`, `Concepts/`, `Resources/Books/`
- `virtual:questions-content` — `questions/`
- `virtual:comprehension-checks` — `comprehension-checks/<exam-id>/`
- `virtual:resource-timeline` — the dated `Resources/{Books,Events,Regulation,Benchmarks}/`
  pages that power the Resources timeline/heatmap
- `virtual:keystone-links` — for each keystone concept page, the concept pages it links to
  (the study plan's *Key concepts first* order)

If you add new top-level exam files or content directories, make sure the relevant collector
picks them up.

`quiz/.env.example` lists required env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`,
`VITE_GITHUB_REPO`/`VITE_GITHUB_BRANCH` (for runtime content fetches), `VITE_GITHUB_TOKEN`.
Server secrets (e.g. `GOOGLE_CLOUD_TTS_API_KEY`, Stripe keys, `ANTHROPIC_API_KEY`) are set
via `supabase secrets set`, never as `VITE_*`.

## Backend (Supabase)

- `supabase/migrations/` — SQL migrations, dated filenames (`YYYYMMDD_description.sql`).
  They cover: concept mastery, quiz sessions, exam progress, study plan config/cache,
  user subscriptions/gems/cosmetics, beta codes, daily completions, store expansion,
  flashcard sync (collected cards + deck), and
  (most of the recent additions) the flag-gated **research** feature — `research_documents`,
  full-text search, ontology, projects, project questions/sections, cron.
- `supabase/functions/` — Deno edge functions: Stripe checkout/portal/webhook/sync,
  account deletion, beta code redemption, Google Cloud TTS proxy, `research-ingest-url`,
  and `daily-plan-email` (the pg_cron-driven study-plan email sender).
- `content_reports` (`20260823_content_reports.sql`) — the reader-report inbox behind VERIFY's
  "Report an issue". Insert/select own rows only; **no** UPDATE or DELETE policy, so only the
  service-role `scripts/sync_reports.py` can mark a report synced.
- `.github/workflows/deploy-functions.yml` — auto-deploys edge functions to Supabase on
  push to `main` when `supabase/functions/**` changes.
- `.github/workflows/verify-check.yml` — the VERIFY gate on every PR (fails on a false
  verification claim or an edited log entry; repairs and commits back what is merely stale).
- `.github/workflows/validate-sweep.yml` — the Monday VALIDATE sweep. Opens a PR, never
  pushes to `main`.

## Deployment

Both the root site and `quiz/` have their own `vercel.json` (root handles `/api/*` CORS
headers for the serverless functions — `chat.js` and the flag-gated `research*.js`; `quiz/`
rewrites all routes to `index.html` for the SPA). Deploys to Vercel; Supabase edge functions
deploy via the GitHub Action above.

## Working conventions observed in this repo

- Commit/PR style: short, imperative, present-tense summaries (e.g. "Fix mobile Quiz tab
  spotlight position", "Add Organization schema with logo for search results"). Most PRs
  are small and focused on one user-facing change.
- This is largely a solo-developer + AI project (see README "About the Wiki"). A large
  fraction of recent history is Claude-authored branches/PRs (`claude/<slug>-<id>`).
- TypeScript is `strict` with `noUnusedLocals`/`noUnusedParameters` — clean up unused
  imports/vars or `npm run build` will fail.
- Prefer editing/extending existing `lib/` modules and hooks over introducing new
  abstractions; the codebase favors small, pure, well-tested utility functions.
- AI is used for content organization, code, and review — but the README is explicit that
  no wiki content is published 100% AI-written without human review. Keep that in mind if
  asked to generate concept/exam content.
