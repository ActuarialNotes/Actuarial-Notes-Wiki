# Actuarial Notes Wiki — Onboarding for Claude Code

Read this first, every session. It should save you a re-discovery pass through the repo.

## What this project is

A two-part product for people studying for actuarial exams (CAS/SOA):

The app has **two modes** — two products under one roof, switched from the pill beside the
wordmark (`lib/appMode.ts`). **Study Mode** is everything below; **Cowork** is the second
product, in Preview and open only to approved accounts (`PREVIEW_APPROVED_EMAILS` in
`lib/appMode.ts`; everyone else sees no pill at all) — see "Cowork" at the end of this file and `docs/cowork.md`.

Across Study Mode floats the **Tutor** — the reader's own Gem Shop character, in the corner of
every page, walking an Exam 5 candidate through the exam, purely algorithmically (no model).
Preview, one approved account (`lib/tutor/access.ts`); see "The Tutor" at the end of this file
and `docs/tutor.md`.

1. **Content vault** (repo root) — an Obsidian-style markdown wiki: exam syllabus pages
   (`Exam *.md`), concept pages (`Concepts/*.md`), resource/timeline pages
   (`Resources/{Books,Regulation,Events,Benchmarks,Data}/*.md`), and a practice-question
   bank (`questions/<exam-id>/*.md`).
2. **Quiz app** (`quiz/`) — a React + Vite + TypeScript SPA that reads the markdown content
   at build time, renders the wiki, runs quizzes/flashcards (a concept's card is
   collected when it first reaches Level 1), tracks per-concept mastery, generates personalized study plans, and layers on
   gamification (gems, cosmetics, avatars, a Gem Shop), and a **Store** of the real
   products a candidate buys — registration, study materials, calculators, textbooks — each
   linked to the seller who sells it (`docs/store.md`). Backed by Supabase (auth, sync,
   payments). A **Research** tab (Canadian P&C research corpus + AI "Ask") is fully built
   but currently **disabled behind feature flags** — see "Feature flags & the Research tab".

The vault also reaches **Claude and ChatGPT** directly: the app deploys an MCP server
(`quiz/api/mcp.js`, `https://quiz.actuarialnotes.com/api/mcp`) that a reader adds as a custom
connector, backed by a build-time export of the whole vault and paired with an uploadable Agent
Skill — see "The AI connector" at the end of this file and `docs/ai-connector.md`.

Almost all day-to-day development work happens inside `quiz/`. The markdown content at
the repo root is the "database" the app is built on top of.

## Repo layout cheat sheet

```
Exam *.md, Concepts/*.md                          — wiki content (Obsidian [[wiki-links]])
.syllabus/<wiki id>/syllabus.json                 — a syllabus PDF, extracted (docs/syllabus-pipeline.md)
Resources/Books/*.md                              — resource pages: one real document each, written to
                                                    the standard in docs/resource-pages.md
Resources/{Regulation,Events,Benchmarks,Data}/*.md
                                                  — dated timeline entries for the flag-gated
                                                    Research tab (frontmatter w/ source links)
questions/<exam-id>/*.md                          — question bank (YAML frontmatter + markdown)
Guides/<Exam page>/*.md                           — study tips, one page per tip (frontmatter: exam,
                                                    section, order). Bundled but no longer rendered —
                                                    the exam-page "How to Study" card was removed
Guides/*.md                                       — general guides, belonging to no exam ("How to Study
                                                    for Actuarial Exams"). Listed on the Study Guides
                                                    home page — data/examGuides.ts, GENERAL_GUIDES
comprehension-checks/<exam-id>/*.md               — retired flashcard-collect gate questions (one .md per
                                                    concept, parsed by lib/comprehensionCheckParser.ts);
                                                    kept in the vault, rendered nowhere
Media/Attachments/                                — images referenced via ![[...]]
.verify/<mirrors the vault path>.md               — VERIFY: one append-only fact-check log per
                                                    content file (+ `_runs/` batch summaries)
scripts/                                          — Python content-maintenance scripts (one-off/batch)
docs/                                             — design docs for app algorithms (read these!)
api/chat.js, api/research.js, api/research-ask.js — Vercel serverless fns, proxy to Anthropic API
quiz/api/mcp.js, quiz/api/_mcp/                   — the Claude/ChatGPT connector: an MCP server over the vault
quiz/skills/actuarial-notes/                      — the Agent Skill the build zips for Claude/ChatGPT upload
supabase/migrations/, supabase/functions/         — DB schema + edge functions (Stripe, TTS, beta codes, research)
quiz/                                             — the React app (this is where most code changes go)
```

Cowork's source catalogue is **not** in the vault: it is authored as seed data in
`quiz/src/data/cowork*.ts`, and its sample documents are registered as *virtual* vault files
so they open in the same popup viewer as a real page. See `docs/cowork.md`.


### Inside `quiz/src/`
- `pages/` — route-level views (Quiz, Review, Dashboard, Flashcards, Search, Settings,
  `Store.tsx` — the Store, `/store`, lazy — `WorkflowBuilder.tsx` — Cowork's Workflows,
  `/cowork/workflows`, lazy — `GemShop.tsx` — the gem cosmetics, `/store/gems` —
  Upgrade, wiki/*, `Battle.tsx` — Quiz Battle, `/battle`, lazy — `Craft.tsx` — Concept Craft,
  `/craft` (one board; `/craft/:topicId` adds that pack and redirects), lazy — `Project/` — the Projects tab and the PCPA project simulator, `Cowork/` — the second product's Sources shelf and source pages —
  and `Research/`, which is
  flag-gated)
- `components/` — shared UI; `components/wiki/` (wiki UI), `components/ui/` (shadcn-style primitives),
  `components/workflow/` (Workflows' board, + menu and panels),
  `components/collect/` (the 3D card the level-up ceremony spins), `components/battle/` (Quiz
  Battle's screens, `Matchmaking.tsx` the lobby), `components/craft/` (Concept Craft's board,
  deck and a connection's card), `components/tutor/` (the Tutor's character, panel, views and
  practice card — `TutorHost.tsx` is the gate in the entry bundle, `TutorApp.tsx` the lazy
  rest), `components/research/` (flag-gated).
  `components/CheckMark.tsx` is **the** checkmark — a filled disc with the tick masked out
  of it, so the tick shows whatever the mark is sitting on. Everything that means *done* or
  *picked* draws it (completed plan rows, a levelled-up concept's card, a selected quiz
  topic), and `CompletionCornerBadge` is its corner form — the same corner, at the same
  sizes, that `TodayQuizBadge` counts down in, so a finished plan ends in a mark rather than
  an empty corner. Don't reach for lucide's `Check` / `CheckCircle2` for these: their tick is
  a drawn stroke, and the white-tick-on-green-disc it replaces is only invisible against one
  surface. See `docs/style-guide.md` §10.1.
  `components/ConceptActionMenu.tsx` is **the** concept action menu — quiz, study guide, deck,
  learning progress, fact check — and the owner of the modals those rows open; the
  concept popup (whose title is its only trigger) and every flashcard surface open that one
  component, so the two can't drift apart. An **exam** gets its own form of it, opened by the
  exam study guide's underlined title (`WikiArticle`'s `titleAction`): the readiness bar
  (`components/ReadinessBar.tsx`) and the countdown to the exam,
  then **Start Quiz** (the exam's bank in the quiz builder, greyed out for an exam with no
  questions — `examQuizTopic`), **Today's Study Plan** (locked for a reader who isn't Pro)
  and Fact Check — the facts
  are `lib/examMenu.ts`, pure and tested. A surface adds only rows about *itself* (a card's
  Study and Remove) through `leading` / `trailing`; view switches (Listen, the deck's view
  modes) are each surface's own control, never menu rows. It always portals to the body and
  is placed by `lib/menuPlacement.ts`, so no host's stacking context or viewport edge can
  clip it.
  `components/ExamRow.tsx` is **the** exam row — logo, name with its Beta / In Development
  tag, topic, a line of facts as plain text, and a chevron — and both exam lists draw it: the
  Quiz tab (question count, exam date) and Study Guides (exam date, "NN% ready"; no bar).
  It is a `ListRow` in a `ListPanel` (`components/ui/ListPanel.tsx`), the grouped list every
  "tap to go there" entry on those two pages uses (Games, the general guide,
  Actuaria).
  See `docs/style-guide.md` §7.2a.
  `components/ConceptTile.tsx` is **the** concept tile — a concept as a small static card, its
  foil edge its level (`lib/flashcardFoil.ts`), a padlock while uncollected, the green wash and
  tick when picked. The add-flashcards picker, Quiz Battle's topic pick and Concept Craft's deck
  all draw it (levels read through `latestMasteryStates` in `lib/mastery.ts` — for the latter
  two via `hooks/useConceptLevels.ts`), so one concept is the same card in each. The craft deck
  passes `showLock={false}`: every card in hand can be played.
- `lib/` — core logic, mostly pure/testable modules (this is where the interesting algorithms live)
- `data/` — authored static tables bundled into the app: `comprehensionChecks.ts` (parses the
  retired comprehension checks from `comprehension-checks/<exam-id>/*.md` via the
  `virtual:comprehension-checks` vite module — nothing imports it, so it isn't bundled; see
  `docs/flashcard-collection.md`), `examSittings.ts` / `examPdfLinks.ts` (sitting dates, examiner reports, and each
  exam's published syllabus — the PDF an exam page's header button opens), `examSittingDetails.ts`
  (what the examining body publishes about each sitting — registration opening and closing, PCPA's exam and
  submission deadlines, results release — transcribed with its source page, never extrapolated; the
  study guide's info button reads it), `examFees.ts` (each exam's fee, transcribed from the
  SOA's and CAS's fee pages — the info panel's "Fee" row and the Store's registration
  price), `storeCatalog.ts` (the Store's sellers, study materials and calculators — see
  `docs/store.md`),
  `mnemonics.ts` / `stories.ts` (per-concept, per-avatar content), `quests.ts` (daily-quest
  catalogue), `examGuides.ts` (the exam-page orientation guide — the tip
  pages themselves live in the vault under `Guides/`, see below), `tracks.ts`
- `hooks/` — React hooks wrapping lib logic + Supabase queries
- `stores/` — Zustand stores: `quizStore.ts` (active quiz session), `researchStore.ts` (flag-gated)
- `contexts/` — Auth, ExamProgress providers

## Key domain concepts (read the docs first)

The `docs/` folder holds design docs for the trickiest logic — **read the relevant one
before touching that area**:
- `docs/roadmap.md` — **the one roadmap**, and how development is governed: every product
  line's status, the Now / Next / Later priorities (by lane), the ranking rules (§0.3: an
  unbacked promise — a red gate, a pipeline that isn't running — outranks any feature), the
  definition of done, the register of decisions only the maintainer makes (§6 — build with the
  listed default, or ask), and an index of every subplan with its health. A PR that changes an
  item's status updates its line there in the same PR; new work goes under §3.4 *Proposed*.
  Read it before starting anything that isn't a small fix.
- `docs/concept-learning-progression.md` — the 5-state mastery ladder (New → L1 → L2 → L3,
  with Forgotten/decay), implemented in `quiz/src/lib/mastery.ts`
- `docs/study-plan-generation.md` — how daily study plans are scheduled/paced/cached,
  implemented in `quiz/src/lib/studyPlan.ts`. The *order* concepts are introduced in lives
  next door in `lib/studyPlanOrder.ts` — syllabus order, or heaviest topic first when the
  strategy is *Heaviest topics first*. Never alphabetical: on a fresh account every concept is
  New, so that tiebreak *is* the plan.
- `docs/flashcard-collection.md` — collecting a card: a concept's card is collected the first
  time it reaches **Level 1** (its first correct answer) — no check, no modal, no lock.
  `collectLevelledConcepts` in `stores/quizStore.ts` collects and decks it and marks the
  transition `collected`, which is what makes `ConceptLevelUpCeremony` play the collect
  animation on /review — one card on its own, or several popping into one grid before a
  summary of them all; the pace is `lib/levelUpCeremony.ts`. Before a quiz, `components/PreQuizConcepts.tsx` lists the quiz's New
  concepts, each opening in the concept popup.
- `docs/verification.md` — **VERIFY**, the fact-check layer (**Fact Check** is what it is
  called on screen; the vault-side schema and toolchain keep the `verify`/`verification`
  spelling): the `verification:`
  frontmatter block every content file carries, the append-only `.verify/` sidecar logs, and
  what `scripts/verify_check.py` fails a PR for. The five principles are the part to read —
  in particular P1 (an AI cannot verify by reasoning alone; a page reaches `verified` only
  against a *citable external source*, and `verify_record.py` refuses otherwise) and P4
  (verification is bound to the file's bytes, so any edit downgrades it to `stale`). Read
  before touching a `verification:` block, a log, or anything under `scripts/verify_*`.
- `.claude/skills/question-writer/` — how the vault writes its **own** practice questions
  (the converters below only ever transcribe): every question aligned to an exam objective,
  written to one level of **Bloom's taxonomy** (recorded as `bloom:` in its frontmatter — the
  parser ignores it; it is for auditing the mix), built on a misconception "fork", and
  explained option by option. `references/formats.md` maps every format — I/II/III, matching,
  ordering, numeric and written answers — onto the parser's three `type`s, and
  `scripts/audit_questions.py` reports a batch's level/format spread and the authoring tells.
- `docs/pdf-question-pipeline.md` — the **PDF → question bank** pipeline behind the
  `soa-exam-converter` / `cas-exam-converter` skills: the four stages that turn an
  examiner's report or a sample-question booklet into `questions/<bank>/*.md`, and which
  of them cost model tokens (`pdf_extract.py` → `question_classify.py` →
  `question_write.py` → `question_lint.py`, all of them free but the review residue;
  `report_gaps.py` finds and restores the examiner's-report paragraphs the writer used to drop).
  The rule to keep: **nothing a PDF prints is ever retyped by a model** — prompts,
  exhibits, options, answer keys, point values and publisher solutions are extracted
  mechanically, and a model is asked only for what is genuinely a judgment. Read before
  changing any of those scripts, the skills, or `scripts/mdmath.py`.
- `docs/syllabus-pipeline.md` — the **syllabus PDF → exam page** pipeline:
  `scripts/syllabus_extract.py` reads the examining body's syllabus into
  `.syllabus/<wiki id>/syllabus.json` (verbatim, hashed, no model), `scripts/syllabus_write.py`
  renders the page — every noun phrase of an objective linked to its concept page, or to the
  page that should exist — and `syllabus_lint.py` holds a page with a `syllabus:` block to its
  JSON word for word. It wrote the study guides of every SOA exam past FM (FAM, SRM, PA, ALTAM,
  ASTAM, ATPA and the 23 FSA exams, all `development`); P and FM keep hand-made pages. Its CIA
  reader (`--cia`) wrote the Canadian Institute of Actuaries' own pathway: ACIA Modules 1–2 and
  the Capstone Exam, and each FCIA track's two modules and three exams (`Exam F1PC (CIA).md`,
  `Exam PC-M1 (CIA).md`, all `development`), whose one source is the syllabus document itself —
  the FCIA syllabi list no readings. Read
  before touching `scripts/syllabus_*.py` or regenerating a page for a new sitting.
- `docs/validation-agent.md` — the VALIDATE agent (`.claude/agents/validate.md`, `/validate`):
  how a sweep picks its batch, what context it loads (the *complete* prior log — that is the
  compounding mechanism), and the line between what it may auto-fix and what it must only
  open a finding about.
- `docs/verification-plan.md` — **how fact checking is batched**: by the source document each
  file is checked against rather than by folder — past papers as packets (keyed by paper, so
  Exam 9's moved questions ride with their Exam 7/8 paper), readings as packets (concept →
  syllabus task → reading → pages, with the reading's own resource page in the same load) —
  the source inventory, the Wave 0 tooling (source cache, OCR'd booklets, blind-stem diffs,
  batch recording), the packet procedure and the sizing. *Which* packets run next is the
  content plan's. Read before launching a VERIFY sweep.
- `docs/content-plan.md` — **the one plan for the vault's content** (it absorbed the CAS
  publication plan, the verification waves, the concept-gap and syllabus-pipeline leftovers):
  the eight gates `scripts/publication_readiness.py` measures for both bodies (page verified,
  every objective link lands on a written page, **no catch-all links** — one concept page
  standing in, under other names, for more than two objective lines — concepts verified,
  readings written and verified, a served question for every concept in the exam's own bank,
  the bank verified, and **G8 answerable**: every served question's requirements quoted on a page
  in its reach, re-read in code from the committed answerability record — see the simulated
  learner below), the rules every campaign keeps (read every link first, for the wrong page
  and the wrong country; the clean-up round's limits; never cite an unauthorized copy), where
  every exam stands, every open content item by workstream, the **phases** they are done in
  (1: ready means ready; 2: the converter, then the beta exams; 3: the SOA ASA prelims; 4: the
  rest), the content decisions, and the campaign records (the DISC redesign — one page per
  lettered section, written from the primary documents the course teaches — and Exam 7).
  `publication_readiness.py --hold` (CI, `content-validation.yml`) fails a PR that costs a
  `ready` exam a structural gate (G2, G3, G6) and warns on the rest. Run
  `publication_readiness.py --check <exam>` before promoting an exam in `examStatus.ts`. Read
  before starting any content campaign.
- `docs/research-ai-disabled.md` — what the two Research feature flags hide and the exact
  re-enable checklist (read before touching anything under `Research`/`research`).
- `docs/research-corpus-plan.md` — the plan for the Canadian P&C `Resources/` markdown corpus.
- `docs/daily-plan-email.md` — the opt-in daily study-plan email: how the sender derives
  "today's concepts" from the (usually day-old) `study_plan_cache`, the hourly pg_cron →
  edge-function send loop, and the one-time Resend/vault setup checklist.
- `docs/leagues.md` — the opt-in weekly XP leagues (roadmap P4.1): the tier ladder and
  promotion/relegation math, the lazy Monday-UTC rollover, and the privacy model
  (snapshot-on-join / delete-on-leave, RPC-only board reads).
- `docs/sound-design.md` — the **sound-effects system**: the rules the cue
  catalogue follows (quiet interface feedback, paper-as-noise, melodic success,
  silent mistakes, one key — every note from C major's pentatonic — and nothing
  playing the same twice, a click is a mouse button with no tone in it, chimes
  are round and short — marimba-like `strike()` notes, nothing sustained above
  1 kHz, dead inside a second), what keeps the synth from sounding synthesized
  (rounded attacks, pink noise, per-play drift, a small room that darkens as it
  rings), the delegated `data-sound` listener that
  gives every control a press cue, how to wire a new interaction, and Quiz
  Battle's own cues and music (the soundtrack keeps the same key and the same
  1 kHz ceiling, so a cue can't clash with it). Read before adding or changing a
  sound.
- `docs/visual-noise-review.md` — a **review backlog**: where the app explains itself in grey
  text instead of designing the fact, the five tests for whether a muted caption has earned
  its place, and the surface-by-surface list to work through. The Exam Readiness popup (§3.1)
  is done and is the worked example; the rest is not. Read alongside the style guide before
  adding a `text-xs text-muted-foreground` line under anything.
- `docs/seo.md` — **how each page is found**: one record per exam, concept and resource
  page — and per practice question (`lib/seoQuestions.ts`, `/wiki/question/<id>`: the
  question, never its answer, which is behind a click into the quiz) — (`lib/seo.ts` — its title, and a description derived from the page itself: a
  concept's opening definition, an exam's counts, a textbook's facts and chapters),
  used three ways — the live head (`hooks/useWikiPageHead.ts`), a static
  `dist/wiki/<kind>/<slug>/index.html` per page with that head and a crawlable copy of
  the article, and the generated `sitemap.xml`. Also why a concept URL is shown, not
  redirected, to whoever *lands* on it. Read before touching `lib/seo*.ts`,
  `documentHead.ts`, `usePageTracking`, `index.html`'s `page-head` markers, or the
  redirect in `WikiConcept`.
- `docs/simulated-learner.md` — the **simulated learner** (`simulations/`, `./run-learner`): a model
  playing a configured student (YAML profiles) who studies the vault and practises questions, so
  reports show where guides and questions fail which learners. The learner may see study pages and
  question stems/options only — enforced by an allowlist loader, a context guard and a tool-less,
  MCP-less headless Claude Code backend, and proven by `simulations/tests/test_isolation.py` (CI).
  Its working is never asked for or kept; what the guide taught is measured instead, by a **control
  learner** — the same student with no pages and no notes, put to the same questions — whose score
  is subtracted (`control.py`, the report's *What studying added*). Never edits the vault; only the
  run reports are committed. Beside it is the **answerability check** (`./check-answerable --exam
  <exam>`, `learner_sim/answerability.py`): no student — one model lists what each served question's
  official solution uses without seeing any page, a second quotes where the pages teach each item,
  and code checks every quote is really on the page; the report ranks the gaps by the page that
  should hold them. It is the better instrument for content gaps (on MAS-II the control learner,
  unstudied, outscored the studied one): run it before the learner, and fix a gap from the reading,
  never with the question's own numbers. Each run is merged into a committed record per bank,
  `simulations/answerability/<bank>.json`, which `scripts/answerability_lib.py` (standard library)
  re-reads against the vault as the publication gate **G8**: a quote still on its page, the page
  still tagged, one link away, on the exam's own syllabus (a page its learning objectives link) or
  on a prerequisite exam's page (the exam page's *Prerequisite knowledge* callout), or the item
  recorded `not-required`. Items are closed with its `resolve` /
  `not-required` commands, which refuse a quote that isn't on the page; `status --exam` lists
  what is open.
- `docs/analytics-and-monitoring.md` — **Google Analytics** and error capture. GA is not in
  `index.html`: `initAnalytics()` (`lib/analytics.ts`, from `main.tsx`) loads it only on a
  measured visit — the production host, not automation (`navigator.webdriver`, bot user
  agents), not opted out (Settings → Privacy) — the rules being `lib/analyticsPolicy.ts`,
  pure and tested. The app sends its own page views (`usePageTracking`: one per settled
  address, never for a page rewriting its query in place, URL cleaned, `content_group`
  set), `user_id` + user properties (`components/AnalyticsTracker.tsx`), `content_view`
  for the concept popup and PDF reader (no URL of their own), `search` from every search
  box (`hooks/useSearchTracking.ts`) and `first_interaction`, the human signal. Every
  event is typed in `AnalyticsEventMap`; no personal data in a param. The doc ends with
  the GA4 property settings the code depends on. Read before adding an event.
- `docs/style-guide.md` — the app's **visual/interaction design system**: colour tokens &
  theming, the shallow type scale, the semantic state-colour map, spacing/radius/elevation,
  component & overlay patterns, motion, and a11y. Read before adding or restyling UI so new
  work stays consistent, minimalistic, and hierarchy-aware.
- `docs/store.md` — the **Store** (`/store`, in the sidebar after Projects; its header is the
  Resources page's — a search bar, the SOA / CAS picker, the body's exam strip, and a region
  picker under an exam with regional syllabi like Exam 6 — `lib/storeExams.ts`,
  `lib/examVariants.ts`): real products
  — exam **registration**, **study materials**, the **calculators** SOA and CAS allow, the
  syllabus **textbooks** — each opening a sheet of what its seller says about it, whose one
  button goes to the seller in a new tab. **Nothing is sold here** (the Gem Shop at
  `/store/gems` is the one corner where gems buy cosmetics). The rule is the vault's:
  every name, price and list of contents is **transcribed from the seller's page with the
  date it was read** (`checked`, printed beside the button), never constructed — a fact
  the page doesn't state is absent. Registration is *assembled*, not authored: the fee
  from `data/examFees.ts` (the same table the study guide's info panel reads) and the
  deadline from the sittings tables (`registrationStatus`: open / opens / closed /
  unscheduled). Textbooks come from the vault (`virtual:store-books`, `lib/storeBooks.ts`);
  sellers' logos are local copies in `quiz/public/store-sellers/`, never hotlinks; products
  are drawn (`components/store/ProductArt.tsx`) in the exam's accent. Three refinements ride
  the URL beside exam and aisle — **Free**, **Price** bands and **Publisher / author** — a
  **comparison table** lays one exam's study materials side by side
  (`components/store/CompareSheet.tsx`), **reviews** are quoted verbatim with their links from
  r/actuary (via the Arctic Shift archive), Actuarial Outpost and the sellers themselves
  (`data/storeReviews.ts`, never paraphrased), and every listing ends in the legal notice
  `storeDisclaimer` writes. Read before touching
  anything named `store*`, `examFees` or `GemShop`.
- `docs/concept-craft.md` — **Concept Craft** (`/craft`, the row beside Quiz Battle on **Games**,
  `/games` — `pages/Games.tsx`, opened by the one Games row at the top of the Quiz tab): topics crafted out of their building blocks on one dark, zoomable board. It
  opens empty; its **+** opens the **starter packs** — every topic, grouped under its exam's
  logo — and each pack added deals that topic's **seeds** — what nothing in the topic is made from, and no more
  (`seedConcepts`; 3 to 30 cards, a little under two-fifths of the vault) — and the reader
  drops one card on another: **any two connect** — a line joins them carrying the
  connection's **strength**, 0–100, drawn as its thickness, and what one is to the other in
  1–5 words (`lib/conceptRelations.ts`: a label written for each of the graph's connections in
  `data/craftRelations.json`, else one read off the vault for any pair); the board **scores**
  each find by its strength (squared), the points popping off its line, and plays for
  **medals** — the Pareto rule: gold for 80% of the board's score within the first 20%
  of its pairs found, silver 70/30, bronze 60/40, each target capped at what a play
  from the seeds can reach (`lib/craftMedals.ts`). A connection's practice is an
  ordinary quiz and scores nothing on the board. Where the vault ties them together, the connection
  also **makes** what is built from the pair, cause and effect — the concepts whose own pages define them by the two
  (`Pure Premium = Frequency × Severity`; the recipes are read off the made concept's page by
  `lib/conceptRecipes.ts`) — landing beside the pair filled with the exam's accent, a dashed
  line to them from the line that made them; a pair the notes barely tie is an *inferred*
  connection (`connectionFor`) that makes nothing.
  Nothing opens on a find (the map is the answer), and there is no prompt or challenge: the
  reader builds and discovers on their own. Nothing is authored but the relation labels — a topic is an exam
  page's learning objective (`craftTopics`, thirty boards), and every connection is
  **derived** (`lib/conceptGraph.ts`) from what the pages say about each other (links, and
  names written out — a common name discounted by how many of the topic's pages write it),
  which concepts the quiz pool tests together, and which the syllabus names on one line,
  combined as a noisy-OR; the sentences are kept as the connection's evidence. A card on the
  board opens in the app's **concept popup** (no board-side concept card); a line's strength
  opens the connection's card — the strength, one big **Practice** button (the pair's
  questions, or either concept's — `practiceQuestions`), what it **makes** with the made
  page's words for why, and the pages' words. The measure is how much the *vault* says
  about a pair, so a weak pair that should be strong is a page to fix, not a weight to tune
  — and a recipe that reads wrong is a definition saying the wrong thing about what its
  concept is made of. localStorage only, and only the connections found — the hand is
  re-derived from them (`boardState`); feeds no mastery or XP. Read before touching anything
  named `craft*`, `conceptCraft` or `conceptGraph`.
- `docs/workflows.md` — **Workflows** (`/cowork/workflows`, Cowork's second place in the sidebar,
  behind Cowork's gate; it was the Tools tab's *Workflow Builder*, and `/tools/workflow` and
  `/cowork/deliverables` redirect to it): **sources** (documents from Cowork's Sources — a
  `source` step, `sourceStep`), data, calculations and concepts as steps that **stay where they are put**,
  snapped to a fine 24 px grid on an unbounded board (`lib/workflowGrid.ts` — a card dropped on
  another lands in the nearest place it fits, `nearestFit`; workflows saved on the first, coarse grid
  are spread onto it by `parseWorkflow`) — Concept Craft's board with the physics taken out, sharing
  its camera (`lib/craftLayout.ts`), its map buttons (`components/craft/CraftControls.tsx`) and its
  panels' shape — joined by **directed** connections dragged from a card's port. A workflow never
  loops (`connectReason`), so it has a run order (`runOrder`); a connection along a hand-off the
  engine already defines (`ToolSpec.next`) is a **link** and `evaluateWorkflow` runs the chain live,
  while any other is descriptive (`edgeKind`). Only a concept's connection carries a word
  (`edgeLabel`); a line is tapped for its panel. **Colour is a link**: with a step open, the fields a
  link fills wear the primary colour on its embedded `ToolCard` (`linked`), the figure they came from
  wears it on the upstream card (`carriedTile`), and one tinted line says "**Annual trend** linked to
  **Trend Fit**". The **+** is a menu of pages (kind → area or exam → item). A tool step stores only
  the fields moved off their defaults (`stepOwnInput`). **Save** puts a workflow in the reader's
  **library** (`Workflow.saved`), which the starting screen lists above the templates; a library
  workflow or a template goes on another board as one **sub-workflow** step, entered through its
  first calculations and handing on its last ones' results (`entrySteps` / `exitSpecs`,
  `evaluateWorkflow(wf, resolve)`, never nested in itself — `canNest`), and **Open** goes into it
  with a way back up. A **CSV** upload is a data step whose columns a connection maps onto a tool's
  table, triangle, date or number inputs (`lib/workflowCsv.ts`: `parseCsv`, `guessMapping`,
  `csvInput` — cells moved, never computed on); a source whose document publishes a table
  (`SourceResource.table` — FSRA's loss trend benchmarks) brings it as the step's data, figures
  blank until the reader reads them off the document, and maps the same way (`stepTable`). **The app calls no model and holds no key**:
  *Run in Claude* copies the workflow as a brief for the MCP connector (`lib/workflowBrief.ts`) — an
  earlier in-browser deploy on the reader's own API key was removed as a security risk. All of
  `lib/workflow*.ts` is pure and tested; the flows are `e2e/workflow.spec.ts`. Read before touching
  anything named `workflow*` or `Workflow`.
- `docs/quiz-battle.md` — **Quiz Battle** (`/battle`, a row on Games — `/games`, opened from the
  Quiz tab's Games row): two
  players racing through the same questions, on one screen under **buzzer** rules (first to
  buzz answers, a miss hands the other the steal) or on two devices under **simultaneous**
  rules (each locks in unseen; the fastest right answer earns most). The scoring table (100 +
  speed + streak, final question ×2), the pure reducer in `lib/battle.ts`, and the online
  design — one **host** device runs the reducer and sends the whole room, redacted, over a
  Supabase Realtime broadcast channel named after a 4-character code (no table, nothing
  stored); the guest times its own answers and the host holds a round open 1.5 s for them;
  every message is untrusted and parsed field by field. Before every online battle (a room's,
  a matched one's, each rematch's) comes a **topic pick** — up to 3 concepts each in 30 s,
  drawn as flashcard tiles, hidden from the other player until both are in — and a **draw**
  that deals the questions from both picks, the players taking turns, shown on both screens
  before the count-in (`lib/battleTopics.ts`, `components/battle/TopicPick.tsx`); same-screen
  battles have no pick. **Random opponent** is a matchmaking
  lobby on one more public channel (`quiz-battle:lobby`, presence): every device computes the
  same pairing from the same queue (oldest first, same exam or *any*; the older hosts) and an
  offer → accept → go handshake seals each match, so nobody ends up in two rooms; a matched
  battle is three questions; an empty
  lobby says so, on the way in and inside it. A battle also has its own **cues** and a
  **generative soundtrack** (calm / play / pressure, held to the sound rules). Two rules to
  keep: **nothing is saved** (no mastery, XP, streak or attempts — the other player's answers
  are not the account's; the lobby pairs on the exam alone, since a rating would have to be
  stored), and only click-markable multiple choice is raced. Read before touching anything
  named `battle*` or `Matchmaking`.
- `docs/tutor.md` — **the Tutor**, the plan and the build spec: the learning science it is
  built on (retrieval, spacing, successive relearning, interleaving, calibration, worked
  examples), the walk through the exam (phases from the exam date and the syllabus met), the
  *moments* a part is served and the quiet rules that keep it unobtrusive, the item (one
  lettered part of a past paper, its kind read off the command word), the memory model
  (FSRS-4.5, gaps capped by the days left), the diagnosis of what is confusing, and who can
  use it (`TUTOR_STAGE`: preview → beta for Pro → open). Read before touching anything under
  `lib/tutor/`, `components/tutor/` or `tutorStore`.
- `docs/actuaria-online.md` — **Actuaria Online**, the game layer over Study Mode (behind
  `ACTUARIA_ENABLED`, **on for approved accounts only** — `ACTUARIA_APPROVED_EMAILS` in
  `lib/actuaria/access.ts` is who may enter, and the database holds cohort membership to the
  same list): each exam a *sector* of a star system, each concept a *landmark*,
  Credibility = the mastery ladder and the readiness score, Coverage = the streak, a duel = a
  Quiz Battle. It is the build spec, phase by phase, and its §2 ground rules are the part to
  keep — one mastery ladder, one readiness number, one currency/streak/XP, **one battle engine**
  (extend `battleReducer`, never fork it), exam hues from `examAccentStyle`, player colours only
  inside a battle, and the game never gates study content. In-world words come from
  `lib/actuaria/lexicon.ts`; the look is style guide §2.6 (`.actuaria dark` scope, the signal
  teal as chrome only, Oxanium for display labels). Read before touching anything under
  `actuaria/` or `Actuaria`.
- `docs/cowork.md` — **Cowork**, the second product: the mode switch (`lib/appMode.ts`), its
  two places — Sources and Workflows (Workflows replaced Deliverables) — and how they meet (a
  document as a workflow's source step), and the two rules that hold the whole thing up —
  *nothing is invented* (a source's table comes with blank figures until they are read off the
  publisher; a `Sample` entry carries no date and no link because it names no particular
  document) and *there is no second reader* (a Cowork resource opens in `ConceptPopup`; its own
  documents are registered as virtual vault files to keep that true). Read before touching
  anything named `cowork*`, `ModeSwitcher` or `appMode`.
- `docs/community.md` — **Community** (`/community`, a sidebar row after the Shop, Preview: one
  approved account — `COMMUNITY_APPROVED_EMAILS` in `lib/community/access.ts`, behind
  `COMMUNITY_ENABLED`): where actuaries gather — r/actuary's newest posts, read live through the
  Arctic Shift archive by `quiz/api/community-feed.js` and shown as posted; upcoming meetings and
  the communities themselves (forums, the CAS regional affiliates, local clubs, student
  associations), transcribed from their own pages into `data/communityEvents.ts` /
  `data/communityPlaces.ts` with `source` and `checked`; everything browsed and followed by
  **topic** (`lib/community/topics.ts` — plain word patterns, never a model) and sorted by
  distance from a home city the reader picks (`lib/community/places.ts`; an affiliate matched by
  the territory it names, `servingHome`). Follows and home are localStorage
  (`hooks/useCommunity.ts`). Read before touching anything named `community*` or `Community`.
- `docs/ai-connector.md` — the **AI connector**: Actuarial Notes as an MCP server that Claude and
  ChatGPT add as a custom connector (facts = the build-time vault export, tools = search / fetch /
  syllabus / concept / practice / marking, skills = MCP prompts + the uploadable Agent Skill). Covers
  the contract (nothing invented, the fact check travels with every fact, withheld questions reach
  nobody, a practice answer is never shown first), why the function fetches its own static export,
  the **two MCP protocol eras** it speaks on one endpoint (the 2026-07-28 stateless revision and the
  `initialize`-handshake ones before it), and the mirrors kept in step with the app by tests. Read
  before touching anything under `quiz/api/_mcp/`, `quiz/api/mcp.js`, `lib/knowledgeBase.ts` or
  `quiz/skills/`.
- `docs/listen-recordings.md` — **Listen recordings**: a pre-made ElevenLabs voice-over for a
  concept page that the Listen view plays instead of the browser voice, with the same
  word-by-word highlight (read off the audio clock from per-token start times). One script —
  `lib/listenTokens.ts` → `lib/mathSpeech.ts` (equations in spoken English) →
  `lib/listenNarration.ts` — feeds every voice; `scripts/listen-recording.mjs` makes
  `public/listen/<slug>-<hash>.mp3` + `<slug>.json` (git-ignored) and `upload`s them to the public
  Supabase Storage bucket `listen` — recordings are never committed — and a recording whose script
  hash no longer matches the page is ignored. Read before touching `useListenSpeech`, `mathSpeech.ts` or that script.
- `docs/actuarial-tools.md` — **Actuarial Tools**, the plan and what's built (§16): the Tools
  page (`/tools`, a sidebar row between Projects and the Shop, `TOOLS_ENABLED`) of actuarial
  calculators — thirty-two so far across reserving, ratemaking, loss distributions, credibility
  and financial maths, plus three Data Sources —
  that people use as a card (`components/tools/ToolCard.tsx`) and AI agents use through the
  MCP connector (`list_tools` / `describe_tool` / `run_tool`), all running one pure engine in
  `lib/tools/`. The connector runs it as a committed bundle, `quiz/api/_tools/engine.js`:
  **after any change under `lib/tools/`, run `npm run tools:bundle`** — `bundle.test.ts` fails
  on a stale copy. Every tool reproduces published work in CI (§17): Friedland's and Werner &
  Modlin's exhibits, read off the CAS PDFs by `scripts/tool_fixtures.py` into
  `lib/tools/fixtures/*.json`, and SOA FM / Exam P sample questions and CAS MAS-I/MAS-II past
  papers whose keyed answers (a value, or a range) `checks.test.ts` reads from the bank — a
  question check may chain tools, as Interest Converter → Annuity. `lib/tools/checks.ts` and
  `questionChecks.ts` are both the test lists and what the card's "Tested against" says, so
  nothing is claimed that doesn't pass. Each tool does one thing (one question, one method; bigger
  jobs chain tools), and each is one small live card in the distribution simulator's shape
  (answer on top, inputs below, no Run button). Its ground rules: tools compute and people judge (every
  judgment an explicit input), nothing invented (no benchmark factors; examples and tables
  transcribed with their source), and no tool leaves Preview until it reproduces a published
  worked example in CI. **V2** (§16.1, reviewed in §18) is built: a search bar on `/tools`
  (`ToolsSearchBar`, `lib/toolSearch.ts`, a spec's `aka` short names — `list_tools` matches the
  same words); assumptions picked rather than typed (`lib/toolColumns.ts`: a column header's
  **From** another tool in a `SourceSheet`, Every row / Scale by, arithmetic in any number cell,
  a touch stepper with candidates from the session's last runs, Age-to-Age Factors' selection
  exhibit); a live figure on every card (`lib/toolFigures.ts` → `ToolFigure`, R11: it draws only
  what the tool computed, a curve's points from `sweep`, the same engine run again); and **Data
  Sources**, the first practice area (`lib/tools/data/`: Life Table, Price Index, Yield Curve),
  whose tables `scripts/dataset_extract.py` reads off NCHS's, Statistics Canada's, BLS's and the
  Treasury's own files with each file's sha256 and licence, into
  `lib/tools/data/datasets/*.json` — never hand-edited; re-run the script for a new edition.
  Read before building any of it.
- `docs/stacked-pages.md` — the concept popup's **page stack** (Obsidian's stacked pages):
  a link followed inside the popup opens a new page on top of the one being read, and the
  pages behind it fold up into title bars — vertically, along the pane's short axis, so a
  folded page keeps a readable title. Covers the push/open/close rules in `lib/pageStack.ts`,
  why exactly one page is open at a time, how a folded page keeps its scroll position, and
  the one thing to keep straight — the *stack* (what's on screen) and the *walk* (the
  Previous/Next footer) are different sequences, so every move of the walk rebuilds the
  stack from the page it landed on.
- `docs/exam-readiness.md` — the **Exam Readiness Score**: syllabus coverage (each section at
  its exam weighting), the bands and the insight line. `computeExamReadiness` is the *one* readiness
  number — the exam-page card, the Dashboard radial, the exam grid and the readiness
  projection all call it. Read before changing `lib/readiness.ts` or any readiness readout.
- `docs/pcpa-project.md` — the **Projects tab** (`/project`, in the sidebar after Quiz — a
  **Pro** feature, its row marked with the Pro chip and the page locked to anyone else, with an
  open attempt's Brief / Workspace / Report / Submit views as rows under it — `lib/attemptViews.ts`;
  the PCPA study guide's **Project** button leads there too) and the **PCPA project simulator**
  behind it: every brief is a card grouped by the exam it is a project for (`data/projects.ts`
  — PCPA is the only one yet), the reader *chooses* a brief from the sheet the page's **+** opens
  (each exam's briefs in that exam's colour), and its second step asks only what
  changes the attempt — **Rehearsal** (the real 16-day window, feedback after submission) or
  **Practice** (no deadline, the report checked as it is written), the language, and for a
  brief done before, fresh data or the same draw again. The briefs are `data/pcpaProjects.ts`
  (the CAS's published rules transcribed, the cases invented and labelled so), data drawn per attempt from a known model with every planted problem counted
  (`lib/pcpaData.ts`), a workspace running **webR** and **Pyodide** from their CDNs plus a
  Fortune-sheet spreadsheet, the 1,250-word / five-appendix report, submission with a clean run
  of the code, and grading on fresh assessment data against the true model. Signed in, attempts and
  their files are kept with the account (`lib/project/projectSync.ts`, last writer wins per row,
  tombstones for deletions; the data sets never leave the browser); signed out they are the
  browser's alone and the page says so. Read before touching
  anything named `pcpa*`, `project/` or `Project`. Two rules: nothing is interpreted by the app
  (the languages are their official Wasm builds), and the CAS's data sets are read-only in the
  workspace — a run can't overwrite them.
- `docs/distribution-simulators.md` — the **interactive distribution simulators** that replace the
  static `Media/*_pdf.svg` / `*_pmf.svg` embeds on the distribution concept pages: parameter
  sliders, live moments, PDF↔CDF, and a Monte-Carlo histogram. Read before touching
  `lib/distribution*.ts` or adding a distribution.
- `docs/concept-figures.md` — the **generated concept figures**: one SVG per Exam P / FM /
  MAS-I / MAS-II / 5 / 6C concept in `Media/Figures/`, drawn by
  `scripts/generate_concept_figures.py` on top of the dependency-free
  `scripts/figure_kit.py`. Each is **one picture and nothing else** — no title, formula,
  caption or table; labels of a word or two where the picture needs them, and the words
  in the `alt` text. Read before editing a figure — they are generated, so a hand edit
  to an SVG is lost on the next run.
- `docs/resource-pages.md` — **the resource-page standard** and the pipeline behind it. A
  `Resources/Books/` page describes one real document and **says only what the document
  says, naming where it read it**: the canonical frontmatter (keys, order, the `Type`
  vocabulary, `Available from` only for an official copy — a book for sale carries its
  `ISBN`), then cover → lead → `> [!info] On the syllabus` (one bullet per exam whose
  Source Material lists the page) → the document's own divisions as `##` headings with
  lists beneath → `## Related readings` → `## Sources` last. The pipeline reads the
  document before a page is written (`scripts/resource_extract.py`: sha256, bookmark
  outline in the vault's shape, contents pages, page text, images of scanned pages), and
  `scripts/resource_lint.py` holds every page to the shape in CI. Also the review that
  led to it — commentary sections and a page written without reading its (scanned)
  paper. Read before writing or editing a resource page.
- `docs/resource-covers.md` — the **resource cover images**: where the metadata card gets
  a source's cover (the page's first image embed), how `scripts/generate_resource_covers.py`
  draws one from front matter for the pages with no real jacket, and the rule that a real
  jacket always wins — drop it in under a name that isn't `… - Cover.svg` and the generator
  leaves it alone forever.
- `docs/mock-exam-browser.md` — the **past-paper browser** on the quiz builder (the mode id is
  still `mock-exam`, and it is now the *format*, not the source: the builder asks where the
  questions come from — the tab reads **Past Papers**, or **Samples** for an exam with no released
  sittings (`examSourceLabel`) — and, separately beside Start, whether to sit them as a **Quiz** or a
  **Practice Exam** (`PRACTICE_EXAM_LABEL` in `lib/pastExams.ts`); any source either way): the
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
  A PDF is always *read*, never downloaded: every host the vault links a PDF on is on the
  proxy's allowlist (`examPdf.test.ts` reads every `Resources/` page to hold it there), and
  the resource cards on both shelves carry a **PDF** pill (`PdfPill`) for such a source.
  And the study guide header's **info button** (`components/wiki/ExamSittingInfoButton.tsx`),
  which lays the selected sitting's dates out as a timeline — see "The sitting's details".

Other important `lib/` modules:
- `parser.ts` — parses question markdown (frontmatter + body) into `Question` objects
- `verification.ts` — the app-side read half of **VERIFY** (`docs/verification.md`): parses the
  `verification:` block off any content file (`parseVerification`, and `Question.verification`
  via `parser.ts`), parses a sidecar log, and decides what the **Fact Check** badge says
  (`factCheckBadge` → `components/FactCheckBadge.tsx` → `FactCheckPanel`; on a concept or
  resource page the way in is the *Fact Check* item of the action menu, on a question it is
  both the explanation panel's badge and the verdict row in the quiz's **Info** sheet, and on
  an exam page it is the same item in the menu the exam's title opens). The panel leads with
  the verdict and one sentence (`factCheckOverview`: checked when, against how many sources,
  what is open), then folding cards — **Open issues** (unfolded), **Checked against**,
  **Check history** (each pass, `summarizeLog`'s `checks`), Fixed, Notes, and on a question
  **Answerability** (`components/AnswerabilitySection.tsx` over `lib/answerability.ts`): the
  answerability check's history from the bank's committed record, fetched when the panel opens —
  its verdict, each requirement with where it is taught and the quoted passage, and every
  `resolve` / `not-required` since.
  `summarizeSource` and `summarizeLog` are what keep it short — the first cuts an auditor's
  citation into the source's name, the chapters/pages checked and its link (the sha256 never
  reaches the screen), the second splits the log into Open / Fixed / Notes and folds each
  resolution into the finding it closes;
  `lib/factCheckTone.ts` is the feature's one palette (tinted surface + icon per tone, and the
  severity → tone map), shared by the badge, the action-menu pill and the panel. Two rules live
  here rather than
  in a surface: an open **critical** finding outranks every other badge state including
  `verified`, and `hasCriticalFinding` is what makes `filterQuestions` keep such a question out
  of quiz sessions — ahead of the `ids` short-circuit, so a saved mistake-review link can't
  serve one either. Sidecar logs are deliberately *not* bundled; the panel fetches one on
  demand through `github.ts`.
- `reportIssue.ts` — the panel's **Report** flow as data: the category catalogue (split by
  question vs page), the three steps of `components/ReportIssueModal.tsx` (category →
  description → credit + consent), and the credit name (display name, never the email).
  A category value must also be in the `content_reports_severity` CHECK constraint and in
  `SEVERITY_HINT` in `scripts/sync_reports.py`; `reportIssue.test.ts` reads both. See
  `docs/verification.md`, "The reader's write path".
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
  `ready` (an exam that passes all eight gates of `scripts/publication_readiness.py --check` —
  **none today**: P, FM, MAS-I, the three DISCs and Exam 7 went back to beta on 2026-10-25,
  when answerability became gate G8, and each is promoted again once its bank passes it),
  `beta` (those seven, then MAS-II, Exams 5, 6C, 8 and 9,
  FAM and SRM — their banks the SOA's sample sets — ASTAM and ALTAM, from their sample sets and
  released papers, and PCPA) or `development` (Exams 6U, 6I and 6T, the other SOA exams past FM —
  PA, ATPA and the FSA pathway's exams, keyed `FSA-GH101` etc. — and the **non-exam
  requirements**: the three VEEs (`VEE-MS`, `VEE-ECON`, `VEE-AF`), the SOA's e-learning modules
  PAF, ASF, FAP and DMAC (`FSA-DMAC`), its APC and FAC (`FSA-FAC`), and the CAS's Course on
  Professionalism, page id `COP`, still keyed `CAS-APC` because readers' progress is stored
  under it — a syllabus outline with no question bank yet). Exam 6T is the CAS's credit for
  the Actuarial Institute of Chinese Taipei's Exams 6GA3 and 6GB3, not a CAS sitting. The DISCs publish no papers — The Institutes sells their sample questions —
  so their banks (`exam-disc-da` / `-rm` / `-ia`) are the vault's own, written for
  the DISC campaign (`docs/content-plan.md`, Appendix A.2). PCPA is beta with no bank — CAS releases no PCPA paper or sample
  questions to convert — because its page and the Projects tab's simulator are material
  to study from. The CIA's own requirements are all `development` and keyed under the body —
  `CIA-F1PC`, `CIA-PC-M1`, `CIA-ACIA-CAPSTONE` (`wikiExamIdToProgressKey`) — with their own
  ACIA and FCIA tracks in `data/tracks.ts` (the FCIA's five specialty tracks as pathways,
  `electiveSlots: 5`). Exam 6's variants share `CAS-6` but not a status, so a surface that knows
  which page it is drawing passes the page's id too (`examStatus(key, '6U')`, the id from
  `examPageIdFromFile` in `lib/examMenu.ts`); with no id, `CAS-6` reads as beta. A beta exam
  promoted before all its readings had `Resources/Books/` pages carries
  `"source_pages": "partial"` in `scripts/exam_catalog.json`, and `syllabus_lint.py` warns
  about a missing source on it rather than failing — drop the key once the pages exist. No
  exam carries it today (Exam 9's and then Exam 8's readings all have pages). The DISC pages
  (`Exam DISC-DA (CAS).md` …) transcribe The Institutes' course syllabi, which carry no
  section weights — `"weighted": false` in `scripts/exam_catalog.json`, and the app counts
  each topic equally. The one definition; the exam rows on both tabs dim
  those exams under a dashed *In Development* tag instead of a Beta one (`components/ExamRow.tsx`),
  the exam page shows the amber *In Development* banner (`WikiFloatingSearch`), and `ExamsPopout` uses it (together with "does
  the vault have an `Exam *.md` page at all?") to decide which exams get an **Add** button.
  Move an exam out of development here (and in `scripts/exam_catalog.json`, which
  `lib/examCatalog.test.ts` holds to it), not in the surfaces — and add it to the DEFAULT
  track in `data/tracks.ts`, which `data/tracks.test.ts` requires to offer every studiable
  exam. The quiz builder offers any exam with a question bank (its hand-kept `QUIZ_EXAMS` in
  `lib/quizBuilder.ts`, a practice exam's shape — length or points, formats, section weights — in `lib/practiceExam.ts`) and would show an
  in-development one dimmed, under the same dashed *In Development* tag. Exam 6's regional variants share the
  `CAS-6` progress key and only 6C has a bank, so `bankLabelFor` in `lib/examIds.ts` binds
  the 6C syllabus to `Exam 6C` and leaves 6U unbound — read a syllabus's bank label through
  it (or `questionExamLabel`), never through `EXAM_ID_TO_LABEL[progressKey]`. The credential tracks in
  `data/tracks.ts` list ~50 requirements and the vault has a page for every one of them
  (`Exam *.md`, including the non-exam requirements), but most are still in development, so
  an exam can be tracked on a credential path without being studiable — `data/tracks.test.ts` pins the
  DEFAULT track (what a new account lands on) to exams that *are*.
- `data/tracks.ts` — the credential tracks. Each associate credential's sections run
  **Preliminary Exams → Exams → `MODULES_AND_COURSES` → `VEE_CREDITS`** (the two
  `NON_EXAM_SECTIONS`: what the body requires but doesn't call an exam — the DISCs, the SOA's
  modules and ATPA assessment and the professionalism courses under the first, the VEEs under
  the second). The FSA puts what every pathway shares first (its Modules and Courses — DMAC and
  FAC — then Cross Practice) and then its six practice areas, marked `pathway: true`, which the
  Study Guides page draws together under a *Pathways* heading as a grid of small lists; the FCAS
  lists its ACAS requirements in one collapsed section and so has no group of its own. The Study
  Guides page (`pages/wiki/WikiHome.tsx`) draws a credential in chunks, one heading per section,
  when it has electives or a non-exam section, and titles a non-exam requirement's row without "Exam"
  (`requirementDisplayName` in `lib/wikiRoutes.ts` — `examDisplayName` keeps "Exam DISC-DA",
  which is the DISC banks' quiz label).
- `examGuides.ts` — turns the tip pages the build collects out of `Guides/<exam page>/` into
  one guide per exam, in the reading order their `order:` frontmatter authors (a page with
  none sorts last rather than into the middle of the run). Pure and tested;
  `data/examGuides.ts` applies it to `virtual:exam-guides`. **Nothing renders it today** —
  the exam page's *How to Study* card was removed — but the content, the bundle and the
  `kind: 'guide'` walk in the concept popup are all still here, so resurfacing it is a
  matter of adding a surface. Every tip ref carries an explicit `path` — "Scoring" is a page
  under every exam, so only the folder says which one to fetch.
- `examColors.ts` — the **exam accent colour**: one hue per exam, stepping chromatically
  around the wheel from blue at Exam P to red at Exam 9, so the colour says where on the
  ladder an exam sits. Pure and tested, and it paints nothing itself —
  `examAccentStyle(examKey)` hands back four CSS custom properties (`--exam-accent`,
  `--exam-accent-muted`, `--exam-accent-soft`, `--exam-accent-vivid`) to spread onto whatever
  element scopes the exam. The first three are translucent or mid-lightness so they wash over
  either theme; `--exam-accent-vivid` is the opaque fill for a shape carrying white text.
  Anything that needs an exam's feature colour should read it from there rather than growing
  a second palette. Non-exam requirements (VEE, the DISCs, the professionalism courses)
  get `undefined`, not a colour. PCPA is the one exception: it is sat at a fixed point of the
  ACAS track, so it takes the hue halfway between Exam 5 and Exam 6 (`BETWEEN_RUNGS`, held
  to `data/tracks.ts` by the test) — the colour the Projects tab paints its briefs in. See
  `docs/style-guide.md` §2.3.
- `examLogo.ts` — the **exam logo**'s monogram: an exam key cut down to something that fits a
  square (`MAS-I` → `MAS` over `I`, `CAS-5` → `5`) and the type scale that says how big it may
  be drawn, as a fraction of the tile's edge. Pure and tested; the tile itself is
  `components/ExamLogo.tsx`, filled with the exam's own `--exam-accent-vivid` so a row of
  logos also reads as the ladder. The tile's *shape* — the three edge lengths and the radius
  that tracks them — is one level down in `components/LogoTile.tsx`, shared with the Study
  Guides page's general-guide card, which carries an icon in the same `lg` tile so a guide
  and an exam lead their cards with the same object. It leads every exam row on the Study Guides and Quiz
  tabs (`components/ExamRow.tsx`), and it is branding rather than information — the row's title
  names the exam, so the tile is `aria-hidden`. See `docs/style-guide.md` §2.3.
- `quizResume.ts` — **a quiz outlives its page**: the session lives in `stores/quizStore.ts`
  (including the timed quiz's clock, the unconfirmed answer and whether the pre-quiz concept
  list was read past), so a reader can leave `/quiz` mid-question — to look something up —
  and come back to the same question with their answers intact and the clock still running.
  The rules are here: what counts as *in progress* (started, not finished), and that opening
  `/quiz` **at the URL the session was started under** resumes it (the pill's Return, or the
  browser's Back) while any other URL starts a new quiz. `components/QuizResumeButton.tsx`,
  mounted once in `App`, is the **Return to quiz** pill on every other page — position,
  timer when timed — which opens a choice of **Return** or **Leave** (`leaveQuiz`, the same
  discard the quiz page's Quit does). It is still chrome in a page move (`paper-resume`) and
  rides above `--action-bar-height` / `--concept-split-height`, in the **resume dock**
  (`components/ResumeDock.tsx`) it shares with Quiz Battle's **Return to lobby** pill — a
  ready player's place in the battle queue outlives the lobby screen the same way
  (`lib/battleQueue.ts`, `stores/battleQueueStore.ts`, `e2e/battle.spec.ts`). One trap, commented in
  `Quiz.tsx`: after Quit resets the store the page is still mounted until the (deferred)
  route change lands, so the start effect is guarded or it would draw a phantom new quiz.
  Pure and tested; the flow is `e2e/quiz-resume.spec.ts`.
- `revealMode.ts` — **when the answers show**: `'during'` marks and explains each
  answer as soon as it's confirmed, `'end'` holds the lot back for /review. The quiz
  page has always read a `reveal` search param; this module is the reader's side of
  it — the checkbox in the quiz builder's settings menu
  (`components/QuizSettingsMenu.tsx`, the button beside the deck card),
  remembered per mode in localStorage. The defaults split (`DEFAULT_REVEAL`) because the two modes are for
  different things: a quiz is practice *with* feedback (`during`), a practice exam is
  a rehearsal of the sitting (`end`). Reveal is a *choice*, not a property of the
  mode — `Quiz.tsx` gates `showExplanation` on the choice alone, so a practice exam
  run for feedback reveals and a quiz run as a dry run doesn't. A launch surface that
  sets no `reveal` param gets the saved choice rather than a hardcoded `during`.
  With `'end'` the right-answer chime is silent too — it would give the verdict away
  (`docs/sound-design.md` rule 7). Pure and tested (the storage read/write wrap pure `revealFromStored` /
  `storedWithReveal`).
- `conceptMentions.ts` / `quizConceptLinks.ts` — **concepts in a question, tappable**: a concept
  the question is tagged with (`wiki_link`) and writes out in its stem or a part's ("the concept
  of materiality") is wrapped by a rehype plugin in a `button.concept-mention` carrying the study
  guide's `data-wikiref`; a tap opens it in `ConceptPopup` and the popup walks every mention on the
  card (`mentionWalk`, walk kind `question`), highlighting and scrolling each one through
  `hooks/useConceptHighlight.ts` — the hook `WikiArticle` uses for the same thing. Only words already
  on screen are marked. On by default for a quiz, off for a practice exam — the settings menu's
  *Tap concepts to read them*, per mode, riding the URL as `links=1`/`links=0`. The quiz's **Info**
  panel's concept rows open the same popup. Pure and tested.
- `quizBuilder.ts` — the **quiz builder** (the Quiz tab, `pages/Landing.tsx`) as data: the
  exams it offers and their track headings (`QUIZ_EXAMS`, `quizTrackGroups`), an exam's
  concepts in syllabus order and grouped by objective, today's plan's pool
  (`todaysPlanSelection`), the pool each source covers (`builderPool`), the draw's size and
  signature, and the `/quiz` address every launch writes (`quizLaunchUrl` — each kind keeps
  its key order, since a quiz resumes by its address). The page holds only the state that
  joins it to what it draws — `components/landing/` (the exam ladder, the concept groups,
  Today's Plan, the past-paper shelf, the action bar) and the `useQuizExamScreen` /
  `useTodaysPlanQuiz` / `useBuilderPool` / `useQuizBuilderSettings` / `useShuffledDraw` /
  `useDashboardAutostart` hooks. Pure and tested.
- `quizDifficulty.ts` — the quiz builder's **difficulty multi-select** (settings menu, quiz
  mode only): Easy / Med / Hard, any combination, at least one ticked. It is a *filter* —
  an unticked level is out of the pool, so the deck card's count, the count clamp and
  Today's Plan pool all move with it (`inDifficultyLevels`, the quiz builder's `inLevels`), and each level
  shows how many questions it holds. It rides the URL as `levels=easy,hard`
  (`QuestionFilter.difficulties`, applied by `filterQuestions`; omitted when every level is
  ticked). The module also keeps the older weighted *lean* (`drawByDifficulty` /
  `orderByDifficulty`, a 0–1 target) that Quiz Battle and Actuaria draw with, and that an old
  `level=0–100` link still applies. Pure and tested.
- `quizTiming.ts` — **Timed** quizzes: the per-exam pace table (transcribed from each exam's
  `Guides/<exam page>/Format and pacing.md` — per question for the MC papers, per *point* for
  Exam 5), the set's time budget (`timeAllowanceSeconds`, null rather than invented for an
  exam with no pace), and the per-mode stored choice. The builder's settings menu sets
  `timed=1`; `components/QuizTimer.tsx` counts down in the quiz header from the first
  question (not the pre-quiz concept list), goes amber in the last tenth and counts the
  overrun in red rather than ending the quiz. Pure and tested.
- `writtenAnswer.ts` — the **written parts** of a long-answer question (`answer === ''`: a CAS
  essay or calculation part the reader marks against the sample answer). `splitSampleAnswers`
  cuts a part's sample answer into the separate answers the examiners printed — `Alternatively:`,
  `Or:`, a lead-in such as `Alternatively, with phasing:`, `Sample Answer #1` headings — so
  `components/AnswerReference.tsx` can draw each as its own card inside one *Sample answer*
  panel, with the examiner's report a card of its own. A bare `or`, and an alternative *inside*
  one section of a sectioned answer, split nothing: both are used within one answer as often as
  between two. `ungradedWrittenParts` is what makes Next (or Finish) on a question with written
  parts still ungraded open `components/GradePartsDialog.tsx`, which takes the grades right there
  (`components/SelfGradeButtons.tsx`, the one Full credit / Partial / No credit control) — only
  while answers are revealed as the quiz goes. The grades are recorded (`manualGrades`) and
  scored: `questionCredit` counts a self-graded written part like a keyed one (full, half, none),
  each part weighted by its points, leaves an ungraded one out, and gives a question with nothing
  graded no credit — never a free "correct"; the store's `effectiveIsCorrect` is that credit at 1.
  The results screen weights each question by its `points` too (`quizPoints` in `lib/quizScore.ts`).
  Pure and tested; the flow is in `e2e/quiz.spec.ts`.
- `quizBankInfo.ts` — what the quiz builder's **info button** (`components/QuizExamInfoButton.tsx`,
  in the exam's strip — the study guide's strip, less the version menu and syllabus) says about
  one exam's bank: how many questions a quiz can draw, where they came from (the exam's own past
  papers with their sittings and span, the body's published samples, questions moved here from
  another exam's paper, the vault's own), how many are kept off-syllabus, and the real paper's
  length and time per question or point from `quizTiming.ts`'s pace table — none for an exam
  with no pace on file. Pure and tested.
- `questionAttempts.ts` — turns a learner's per-question response tally (`hooks/useQuestionAttempts`,
  backed by `question_responses`) into the display state every question list shows: attempted or not,
  and how many attempts were successful vs unsuccessful. Rendered by `components/QuestionAttemptBadge.tsx`,
  which is the single chip used by the Search page, the quiz floating search, the concept question
  browser and the concept detail modal — add it to any new surface that lists questions rather than
  writing a new chip. Attempt history is server-side only, so signed-out viewers pass
  `showNew={false}` (via the hook's `tracked` flag) and see no chip instead of a false "Not attempted".
- `questionPreview.ts` — the collapsed preview every question list shows: a few lines of the
  question's *prose*, not six words of it. A stem is prose wrapped around data, so the
  flattening drops the tables, images and fenced blocks (keeping their captions, which is
  the part that says what the data is), turns list markers into bullets, strips emphasis so
  a surface can cut the text at a search match and `<mark>` it, and marks anything dropped
  or cut with an ellipsis. `stemSnippet` windows onto a match that falls past the preview;
  `questionPreview` falls back to the first *part* of a multi-part question whose stem is an
  empty preamble — those rows previewed nothing at all before. Read by
  `components/QuestionSearchRow.tsx` (clamped to three lines) and the Search page.
- `questionFilters.ts` — the filters **every list of questions** offers — Difficulty,
  Type (multiple choice, short answer, written — `QUESTION_TYPE_LABELS`, which the quiz's Info
  panel names a question's type with too), Concepts, Source, Exam and Sitting — as one definition: what each matches, the options each
  offers over a pool (with the count choosing it would leave, the other filters applied),
  and `splitSearchFilter`, which turns the quiz builder's exam and past paper into the
  search panel's *starting* Exam / Sitting choices rather than a narrowed pool (a panel
  scoped to one exam hid its Exam filter). One rule lives here rather than in a surface:
  once an exam is chosen, a sitting means that exam's paper, so a question carried over
  (`originally_exam`) is on none of its sittings — `filterQuestions`' rule for the shelf.
  Drawn by `components/QuestionFilterBar.tsx`, the one filter row used by the quiz search
  panel, the concept question browser, the concept detail modal (Type + Source + Exam + Sitting)
  and the Search page (Type, Source, Sitting); Source, Exam and Sitting are always on screen,
  Sitting disabled for an undated pool. Add it to any new surface that lists questions.
  Pure and tested.
- `questionPublisher.ts` — who published a question, the **Source** filter's values:
  `SOA`, `CAS` or `Actuarial Notes`. A past paper's question is its examining body's (the
  body of `originally_exam` when the material has moved — `EXAM_BODIES`, held to
  `scripts/exam_catalog.json`'s `body` by `examCatalog.test.ts`); the undated Exam P / FM
  questions are the SOA's sample sets, filed as `p-<n>` / `fm-<n>` for sample question n;
  and the vault's own questions are known by id rather than by a frontmatter key, which
  would stale every fact check on them (P4): the first Exam P set by list
  (`VAULT_QUESTION_IDS`, `p-901`–`p-964`), everything since by shape — the bank's prefix,
  `-an-`, a number (`masi-an-001`, `VAULT_QUESTION_ID_RE`). `questionPublisher.test.ts`
  holds the list to the bank both ways (every listed id is an undated question not checked
  as the SOA's, and every unlisted undated question with a fact check cites the SOA sample
  question its id numbers) and fails a dated `-an-` question. Write a new original question
  with the **question-writer** skill (`.claude/skills/question-writer/`), under an `-an-` id.
- `questionSource.ts` — where a question came from, for the quiz's **Info** button
  (`components/QuestionInfoButton.tsx`, in the question bar beside the flag): the sitting it
  was sat on, the published paper behind it (`data/examPdfLinks.ts`), and its vault file —
  recovered from the `verification:` block's `log:` path, since the build collects question
  *contents* and an id doesn't map to a filename. Provenance is read off the frontmatter,
  never inferred: an undated question says it names no sitting rather than being attributed
  to a paper, and a question re-tagged onto another exam keeps its original exam's paper.
  The panel hides topic / objective / difficulty until the answer is in, for the same reason
  `QuestionCard` does (`showMeta`). It also carries the question's **Fact Check** row: the
  same verdict, opening the same `FactCheckDialog`, because "where did this come from" and
  "has anyone checked it" are one question asked twice — and unlike the explanation panel's
  badge, this one is reachable while the question is still live.
- `factCheckSources.ts` — the sources a page was fact checked *against*, for the Fact Check
  panel's **Checked against** shelf (`components/FactCheckSources.tsx`). `summarizeSource`
  (in `verification.ts`) cuts a citation into the work's name, the chapters/pages the claim
  was checked on and its link, dropping the sha256; this module finds the vault's own page
  for the work, matching against every reading of every exam page (`syllabusSourcePages`
  over the bundled exam pages) on *words*, since the two are authored independently — the
  vault files `Basic Ratemaking (Werner - 2016)`, an auditor writes "Werner & Modlin, Basic
  Ratemaking (CAS, 5th ed. May 2016)". The match is one-directional and strict — every word
  of the page's title must appear in the citation — so a citation that names something the
  vault has no page for is drawn from the citation alone rather than matched to a book it
  isn't. Rendered as the same `ResourceMetaCard` a resource page leads with, with the
  locator as the card's `note`. See `docs/verification.md`.
- `resourceExams.ts` — which exam(s) a resource is a syllabus reading for. A
  `Resources/Books` page names no exam; the relationship is authored the other way round, in
  each exam page's `Source Material` callout, so this module inverts those callouts into a
  resource-name → exam-labels map. It is built once at bundle time (`vite.config.ts`) and
  hung on the wiki index's `document` items as `exams`, which is what lets a resource card
  lead its pill row with **Exam P-1** / **Exam MAS-I** without re-reading every exam page.
  Imports are relative, not `@/`-aliased — the vite config pulls it into its own Node graph.
- `resourceFilters.ts` — the **Resources** page (`/wiki/resources`, `pages/wiki/WikiResources.tsx`),
  the Study Guides tab's second page: every `Resources/Books` page as one shelf, filtered by
  **Exam**, **Publisher** and **Year**. This module is what each filter matches (the index
  item's `exams`, `publisher`, `year` — a page that names none is under none), the options
  each offers with the count choosing it would leave (the other filters applied, OR within a
  filter, AND across them — `questionFilters.ts`'s rule), and the URL the choice rides
  (`?exam=…&year=…`, so Back and the sidebar's return keep it). Drawn with the question
  lists' `MultiSelectDropdown`. The sidebar lists the tab's two pages — **Exams** and
  **Resources** — under Study Guides while the tab is open, the way Projects lists an open
  attempt's views; which one a path is under is `studyGuidesSection` in `wikiRoutes.ts`
  (a resource page is under Resources, an exam or concept page under Exams). Pure and tested.
- `resourceVintages.ts` — the Resources page's **Vintage** filter: with exactly one exam
  chosen, which *edition* of its syllabus the shelf shows (the newest by default, so a
  retired reading an exam page keeps for the record is off it), and what that edition
  **added** and **dropped** against the one before. Additions are **always** marked (green
  ring, a fixed *Added N* count under the filter row — not a toggle: switching it off left
  the additions leading the grid with nothing saying why); **Dropped** is the one toggle,
  putting the dropped readings back on the shelf (red ring, struck title) to be seen. The
  changes lead the grid. The editions are
  `data/syllabusVintages.ts`: per exam, newest first, each edition's document (URL and the
  version line it prints — CAS overwrites outline files in place) and its diff; the newest
  edition's list is the exam page's Source Material and every earlier one is walked back
  through the diffs. **Transcribed, never constructed** — an edition is listed once its PDF
  has been read, and one that's no longer published is absent. `syllabusVintages.test.ts`
  holds the table to the vault. Rides the URL as `?vintage=…&changes=dropped`.
  Pure and tested.
- `amazonPrice.ts` — the **Amazon price** on a resource card's *Get a copy* menu
  (`components/wiki/GetCopyMenu.tsx`, whose rows — WorldCat, The Actuarial Bookstore (only for a book it stocks), Amazon — each
  lead with the place's own logo from `quiz/public/copy-sources/`). The price comes from
  `quiz/api/amazon-price.js`, which asks Amazon's **Creators API** with an Associates account's
  credentials (Vercel env: `AMAZON_CREATORS_CREDENTIAL_ID` / `_SECRET` / `_VERSION`,
  `AMAZON_PARTNER_TAG`); with none set it answers `price: null` and the row is the plain ISBN
  search. Rules from Amazon's licence that the code keeps: a price only for an item carrying
  the page's own ISBN, the vended detail-page link used untouched, an hour at the CDN and
  nothing cached in the browser, and the "as of" stamp, disclaimers and associate disclosure
  beside any price (the wording is pinned by `amazonPrice.test.ts`).
- `store.ts` / `storeBooks.ts` — the **Store** (`docs/store.md`). `store.ts` is its logic,
  pure and tested: the four aisles, the exams the shelf narrows to (`STORE_EXAMS`, in
  ladder order), price printing (`Free` for nothing, "From" over choices), registration
  assembled from `data/examFees.ts` and the sittings tables (`registrationStatus` — a
  deadline transcribed into `examSittingDetails.ts` replaces the sittings row's), the shelf
  (`buildStoreItems`, `storeShelf`, `showcase` one exam at a time up the ladder,
  `registrationUrgency` soonest deadline first), and which calculators an exam allows
  (by the body that sets it; the DISCs, The Institutes' exams, none). `storeBooks.ts`
  runs at bundle time (relative imports, like `resourceExams.ts`): every `Resources/Books`
  Textbook or Casebook with an ISBN that an exam's Source Material lists, with each exam's
  chapters. The authored half is `data/storeCatalog.ts` (sellers, study materials,
  calculator policies and calculators — `storeCatalog.test.ts` holds each offer to its
  seller's domain and each calculator to its line on both lists).
- `pastExams.ts` — the past-sitting shelf behind the quiz builder's **Past Papers** source:
  `buildPastExamRows` unions the authored catalogue (`data/pastExams.ts`) with the sittings the
  question bank actually holds, so a released paper that hasn't been imported still lists
  (greyed out, "Not added yet") and a freshly converted one appears without a catalogue edit.
  A sitting is sat in the paper's own order, not shuffled: `inPaperOrder` sorts on the
  number in the question id (`cas5-2019s-q12` → 12), which `useQuestions` applies whenever
  the draw is a sitting — so a converted question's id must keep its `-q<n>` suffix.
  Rendered by `components/PastExamBrowser.tsx`. See `docs/mock-exam-browser.md`.
- `syllabusChapters.ts` — the syllabus's **chapters**: which learning objective each stop of
  an exam page's walk belongs to, read off the page's `[!example]` callouts
  (`buildObjectiveIndex`), and the marks that cut the **concept popup's** progress bar into
  them (`objectiveMarks` → `NavProgressBar segments`). Plumbed as `objectives` through
  `openAt` → `useConceptPopup` → `ConceptPopup`, so a walk down an exam's concepts shows
  which part of the syllabus it is in; a walk with no syllabus behind it (the dashboard, a
  search result) keeps the plain bar. The index has two halves and the popup's mode picks
  one: `byOccurrence` for the document-ordered walk (a *mention* belongs to the callout it
  sits in — keying by first introduction breaks a chapter apart wherever a later objective
  re-uses a concept) and `byConcept` for a walk of concepts. Nothing is inferred — a concept
  outside every callout belongs to no objective and its stretch stays unnamed. `isSyllabusConcept`
  is the shared "this link is a concept, not a source" predicate the exam page walks too, so
  both sides count the same mentions. Pure and tested. See `docs/style-guide.md` §7.5.
- `sittingTimeline.ts` — **one sitting, as a timeline**: the study guide header's info
  button (`components/wiki/ExamSittingInfoButton.tsx`, beside the version menu) shows the
  selected sitting's registration dates, window and results in date order, a check on what
  has passed and a countdown on what comes next. This module merges a sittings row's own
  window / registration deadline with what `data/examSittingDetails.ts` transcribes (a
  transcribed one replaces the row's, under the publisher's label) and places today among
  them — at most one step is *next*, none while a window is open. Which sitting is selected
  is `hooks/useExamVersion.ts`, shared with `ExamVersionMenu` so the two can't disagree.
  Pure and tested. The drawing is `components/SittingTimeline.tsx`, which the Store's
  registration sheet draws too — its own small module, so the Store importing it doesn't
  pull the info button into a chunk the exam page then waits on. See
  `docs/mock-exam-browser.md`.
- `pdfChapters.ts` — the exam-PDF reader's **chapters**: a document's own outline (the
  bookmarks a viewer shows in a sidebar) turned into the marks that segment the page bar,
  resolved against the document by `hooks/usePdfChapters.ts`. Pure and tested. Chapters are
  *transcribed, never constructed* — the same rule as the pass-rate and examiner's-report
  tables: a document with no outline keeps the plain bar rather than being cut into even
  pieces. See `docs/mock-exam-browser.md`.
- `examPdf.ts` / `pdfViewer.ts` / `pdfjsSetup.ts` — the exam-PDF reader behind the mock-exam
  shelf's **Examiner's Report** button. `examPdf.ts` decides which sources are viewable (the
  same allowlist `quiz/api/exam-pdf.js` enforces) and builds the proxy/download URLs — the page
  can't fetch a publisher's PDF itself, and can't save one cross-origin; `pdfViewer.ts` is
  the pure reading maths: the fits (a document opens with the *whole page* on screen —
  `pageFitZoom`, which is fit-to-width on a phone and well below it on a wide desktop
  panel), the render resolution and pixel budget (a page is drawn at ~216 dpi rather than
  the screen's ratio, so a scan is squeezed less far to fit), and the zoom range —
  whole-page fit up to 4× — with the pan/re-anchor maths behind pinch, ctrl+wheel and the
  `+`/`−` keys (the panel has no zoom control in its chrome);
  `pdfjsSetup.ts` is the dynamically-imported pdf.js instance (the **legacy** build) and the
  URLs of the four asset directories pdf.js fetches at run time — `pdfjsAssets.ts` is the
  shared list, copied out of node_modules by `vite.config.ts`. `wasm` is the load-bearing
  one: CCITT fax and JBIG2 decode through it, so without it every *scanned* page renders
  as a ghost, and pdf.js only warns. The reader itself is `PdfDocumentView` (in
  `components/PdfViewerPanel.tsx`) and it has two frames: `PdfViewerPanel`, in the concept
  popup's shell, mounted **once** at the app root by `components/PdfReaderHost.tsx` off the
  `hooks/usePdfReader.ts` store, for every PDF button outside the popup; and a page of the
  popup's own stack (`components/wiki/PdfPagePanel.tsx`) for a **Read PDF** on a page
  being read *in* the popup, which stacks like a followed link instead of covering the pane
  (`PdfLinkButton`'s `onRead`; see `docs/stacked-pages.md`).
  `components/PdfLinkButton.tsx` is the one PDF button that opens either. The
  rule: *every* PDF the app offers is read in the app, never in a browser tab — the
  past-paper shelf's report and solutions, an exam's syllabus, a resource card's **Read
  PDF**, the paper behind the question in the quiz's **Info** panel, and the sources on the
  Fact Check panel's *Checked against* shelf. `opensInReader` (in `examPdf.ts`) decides:
  a plain left click reads here, a modified or middle click stays a link, and a source the
  proxy won't serve is left as an out-link rather than opening a panel that can't load. A
  surface that binds `Esc` or the arrows hands them over while a document is up
  (`useIsReadingPdf()`). Pinned by `components/PdfLinkButton.test.ts`. See
  `docs/mock-exam-browser.md`.
- `pageStack.ts` — the concept popup's **page stack**: which pages a followed link leaves
  open and which one of them is open on screen (one at a time — the rest are folded into
  title bars down the pane). Pure and tested; the store half is `pages`/`pageIndex` in
  `hooks/useConceptPopup.ts`, the rendering is `ConceptPopup` (shell + bars) over
  `ConceptPagePanel` (the open page, mounted per ref, with the scroll memory that lets a
  folded page come back where it was left). A page's **Read PDF** stacks its document the
  same way (`PdfPageRef` → `components/wiki/PdfPagePanel.tsx`), whose own page bar and
  footer stand in for the walk's while it is open. See `docs/stacked-pages.md`.
- `mobileNavHost.ts` — below `lg` the app is one row of top chrome, and this says who owns
  it on a given route: a page with a floating search bar carries the hamburger
  (`components/MobileNavButton.tsx`) on that bar's line, and every other page gets the app
  header `Sidebar.tsx` draws (the same row, plus the wordmark). `App.tsx` reads it to decide whether the content reserves `pt-14`, `Sidebar.tsx`
  to decide whether to render the header — so a route added here must gain a
  `<MobileNavButton />` in its bar at the same time, or it ends up with two hamburgers or
  none. The drawer's own open state is `hooks/useMobileNav.ts`, since the button that opens
  it is no longer inside `Sidebar`. Pure and tested. See `docs/style-guide.md` §5.0.
- `viewTransition.ts` — **paper on a desk**, the app's motion between states: every page is a
  sheet and the app is the desk. Tabs lie side by side in sidebar order, so a tab switch
  slides the desk (`next`/`prev`); a link deeper into a tab lays a sheet over the current
  one (`push`); Back — or a link *up* the tab — swipes the top sheet off (`pop`); and within a
  page a quiz's Next/Back flicks the question off the pile or slides it back
  (`turn`/`return`). `paperMove` decides the move from two paths and the history action
  (`deskPlace` is the tab/depth table — add a new route there); `startViewTransition` writes
  it to `data-paper` on the root and `index.css` ("Paper on a desk") draws it. A change of
  *screen* the address doesn't show — the Quiz tab's exam list → one exam's builder, Quiz
  Battle's way in → its lobby, a setup, a battle — is drawn by the page itself through
  `moveScreen` (`push` deeper, `pop` back), so add one there for any new in-page screen. **Every
  navigation goes through it** without opting in: `components/PaperRouter.tsx` is
  `BrowserRouter` with the history listener wrapped, so links, `navigate()` and the browser's
  Back all animate; a `REPLACE` (a redirect) and a query/hash-only change don't. One curve
  and one pace for every move (`--paper-ease`, which decelerates *evenly* — a steeper curve
  crawls its second half and reads as freezing, then snapping in), every move ends with the
  arriving sheet exactly where the page lies, and **everything on a page travels with its
  page**: nothing but the chrome (`paper-rail`, `paper-header`) is given a
  `view-transition-name`, because an object lifted out flies against its sliding sheet —
  `e2e/view-transitions.spec.ts` sweeps for strays. Nothing may hold the click up either,
  since the old picture stays frozen on screen until the new page renders: lazy routes are
  `lib/lazyRoute.ts` (a plain `React.lazy` suspends once even with its chunk loaded),
  `PaperRouter` warms a route's chunk when the pointer reaches its link, and
  `WarmStudyGuides` in `App.tsx` fetches the Study Guides chunk when the app is idle. Dialogs
  get the matching entrance from the `paper-scrim` class (or `paper-fade` + `paper-drop` for
  a separate backdrop and panel).
  Pure and tested. See `docs/style-guide.md` §9.1.
- `routeScrollMemory.ts` — **the reader's place** across pages: `PaperRouter` records the
  window's scroll as a page is *left* (keyed by history entry, mirrored to sessionStorage)
  and `arrivalScroll` decides on arrival — Back/Forward return to where that entry was left,
  a new page opens at its top, an up-link carrying `state={RESTORE_SCROLL}` (an exam's
  "All exams" arrow, a resource's "All resources") returns to where that page was last left,
  and a same-page change (query, hash) or a redirect leaves the window alone. The browser's
  own restoration is off. Pages don't save or restore their own scroll — don't add a
  per-page copy. Pure and tested; the flow is in `e2e/wiki.spec.ts`.
- `navTrail.ts` — **where the reader came from**: the app's own record of the history stack,
  fed by `PaperRouter` on every move (keyed by the `idx` the router stamps on `history.state`,
  mirrored to sessionStorage, checked by entry key so another visit's record is never trusted).
  `backTarget` is the nearest earlier entry on another *page* (a filter, a `?concept=` popup or
  a hash is the same page; the sign-in screens are never a target), and `placeLabel` names it.
  **Every back control goes through `hooks/useBack.ts`**: `useBack({ to, label })` returns the
  way back — the browser's own Back to the page left (scroll, filters and search intact, drawn
  as a `pop`), or up to the `to` fallback for a reader who came in from outside the app — and
  its name ("Back to Exam P-1"); `usePageLabel` lets a page name its own entry better than its
  path can (an exam's builder, a Cowork source, a project brief). Don't hardcode a parent in a
  back arrow; pass it as the fallback. Two moves keep the history honest: the Quiz tab's open
  exam is an entry of its own (`/?topic=…`), so quitting a quiz returns to that exam's builder,
  and a finished quiz hands its entry to the review (`replace` with `REPLACE_AS_PUSH` from
  `viewTransition.ts`, still drawn as a push), so Back from a review never lands on a quiz that
  is over. Pure and tested; the flows are in `e2e/wiki.spec.ts` and `e2e/quiz-resume.spec.ts`.
- `bodyFilter.ts` — the **SOA/CAS picker** that rides the title row on both the Quiz and Study
  Guides tabs. The Study Guides tab's two pages (exams, resources) offer a third body, the
  **CIA** (`GuideBody`, its ACIA and FCIA tracks — `CIA_TRACK_KEYS`); a page without CIA
  material reads a stored `CIA` as no choice (`loadBody`) and opens on the reader's track's
  body. One choice, one storage key, one fallback: the two tabs are one ladder seen
  twice, and they each used to own a copy of the rule. The copies had drifted in opposite
  directions, so a reader on the DEFAULT track (neither body's) opened one tab on CAS and the
  other on SOA and switching tabs looked like the picker changing itself. Pure and tested.
- `menuPlacement.ts` — where a menu hangs off the control that opened it. Aligning with the
  trigger is only a preference: the viewport gets the last word, so a control near an edge has
  the menu shifted back inside, one with no room below has it opened upwards, and the height is
  cut to the room there is rather than spilling past the fold. Pure and tested; read by
  `components/ConceptActionMenu.tsx`, and by `components/MultiSelectDropdown.tsx` for its
  horizontal place (a filter at the end of a row on a phone).
- `navScrub.ts` — the maths behind a **scrubbable** progress bar: which item a point on the
  track means (the exact inverse of `navProgressPercent`, so a drag can't land off by one),
  where a key press moves to, and how a list of chapter marks becomes the **segments** the
  bar is cut into (`navSegments`, YouTube-style: a piece of track per named stretch, the
  run before the first mark unnamed, a plain bar when the marks say nothing). Read by `components/NavProgressBar.tsx`, which is the one
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
  (syllabus coverage, plus band, section breakdown and concept
  tally); every surface that prints a readiness % calls it — the Dashboard's exam
  card (one card washed in the exam's accent: `NN% Ready` inside a mini readiness ring
  beside the days left and the exam date, under the exam tabs drawn as exam logos; the
  calendar, the primary actions and **Today's Study Plan** follow), the **Study Guide**
  popup the card's ring opens (the ring and the
  criterion bar — it sits under the concept popup, ending where that pane begins, so a
  tapped arc stays highlighted while its concept reads below), the exam grid and the readiness projection. The exam study guide shows no
  readiness card (removed along with the orientation row). `computeReadiness` is the
  weighted section score it is built from — an input, not a second number to display.
- `readinessDelta.ts` — the **movement arrow** beside that KPI: how far the score has moved
  *today*, green up / red down, absent when it hasn't moved. A mastery record carries no
  history, so yesterday's score can't be recomputed — this is the memory that makes the arrow
  possible (pure core here, `hooks/useReadinessDelta.ts` persists it to localStorage). The rule
  to keep: the day after a sighting baselines on **yesterday's last score**, so overnight decay
  shows as a red arrow, while a gap longer than a day starts flat rather than blaming today for
  a week of decay. The delta is measured between the *rounded* scores so it always agrees with
  the number on screen. See `docs/exam-readiness.md`.
- `readinessRing.ts` — the geometry behind the **readiness ring**: one arc per syllabus
  concept, each section sized by its exam weight, each arc filled by that concept's mastery
  state. Pure and tested. Two surfaces draw it and differ only in chrome — the Dashboard's
  Study Guide popup (`StudyGuideRadial`, with `MiniReadinessRing` — the arcs alone, round the
  score — on the Dashboard exam card's ring that opens it in `components/ReadinessCard.tsx`, with a legend,
  curved section labels and a middle that prints the score until a concept is hovered or
  selected, then that concept's readout) and the exam page's title-row badge
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
  Also surfaced via `hooks/useStreak.ts` + `components/StreakBadge.tsx` on the
  Dashboard. Gated by `STREAK_ENABLED`.
- `xp.ts` / `xpStore.ts` — daily goal + XP engine (roadmap P1.2). `xp.ts` is the
  pure, tested core: per-answer XP weighted toward hard + decaying (revived) concepts,
  a level curve, and the configurable daily-goal presets (`DAILY_GOALS`). `xpStore.ts`
  persists `XpState` to the `user_xp` table (signed-in) or localStorage (guests) and is
  called from `quizStore` on quiz completion (`recordXp`). Surfaced via `hooks/useXp.ts`
  + `components/LevelBadge.tsx` (the Dashboard header level badge — a level ring that
  replaces the mascot icon and opens an XP/daily-goal popup) and
  `components/DailyGoalPicker.tsx` (the goal presets, behind the popup's *Change goal*). Gated by `XP_ENABLED`.
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
  a per-exam selector and the join/leave, `components/QuestsPanel.tsx`; its footer's *Change goal*
  swaps in `components/DailyGoalPicker.tsx`). `hooks/useLeague.ts` is `useLeague(exam)`. Gated by `LEAGUES_ENABLED`.
- `dailyEmail.ts` — pure core of the opt-in daily study-plan email: derives "today's
  concepts" from a cached (possibly stale) study plan and the local send-time math. The
  actual sending happens server-side in the `daily-plan-email` edge function, which
  mirrors these helpers verbatim (it can't import from `quiz/src` — same duplication
  contract as the league SQL; `duplicationContracts.test.ts` runs both copies against
  golden vectors, and holds the SQL rollover to `leagues.ts` the same way). Prefs live in `user_email_prefs`
  (`hooks/useEmailPrefs.ts` + `components/DashboardRemindersModal.tsx`, the Dashboard's bell). Gated by
  `DAILY_PLAN_EMAIL_ENABLED`. See `docs/daily-plan-email.md`.
- `learningSignals.ts` — the **learning instrumentation** (roadmap L1): whether studying
  *worked*, as pure functions `lib/analytics.ts` sends. `concept_retention` — a concept
  answered for the first time after its decay window (`decayIfStale` steps it down), with
  `retained` its first answer, once per decay episode (keyed by `last_correct_at`, the keys
  kept in localStorage), fired by `quizStore` before any mastery write for quizzes and the
  fix-mistakes reviewer; `reminder_opened` / `reminder_session` — a landing whose
  `utm_source` names a reminder (`REMINDER_SOURCES`; the daily email's CTA carries
  `daily-plan-email`, held to the edge function's source by the test) and the first quiz
  finished within six hours of it; and `mistake_reviewed` from `MistakesReviewModal`.
  Read `docs/analytics-and-monitoring.md`, "Reading the learning events", before using them.
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
  the synth (its pink noise, room impulse and soft-clip output curve are pure and
  tested in `soundEngine.test.ts`) and the enabled/volume store; `soundInteractions.ts` is the pure
  press-cue decision table used by `components/SoundEffects.tsx`, the one
  delegated listener (mounted in `App`) that sounds every button in the app.
  Override per element with `data-sound="<cue>"` / `data-sound="none"`. Nothing
  plays for a wrong answer — that's deliberate and pinned by a test. See
  `docs/sound-design.md`.
- `components/FloatingSearchBar.tsx` — the **floating search bar**, as parts: the sticky
  blurred container, the input line (the hamburger on the search's own row, folding away as
  you type — see `mobileNavHost.ts`), the title strip, the scope pills and the dimmed
  backdrop. What a query *means* differs per place; the chrome around it does not, so the
  wiki's `WikiFloatingSearch`, Cowork's `CoworkTopBar`, `DashboardSearchBar` and
  `FlashcardsSearchBar` are all built from these and a
  search feels the same wherever a reader is. `components/SearchHighlight.tsx` is the matched run,
  marked — the one implementation the wiki search, the search panel, the Search page and
  Cowork all call. (The quiz builder's `QuizFloatingSearch` still draws its own.)
- `appSearch.ts` — the matching behind the **Dashboard** and **Flashcards** top bars
  (`components/DashboardSearchBar.tsx`, `components/FlashcardsSearchBar.tsx`), which stand
  where the app header's wordmark and mode pill used to be — those two routes are in
  `mobileNavHost.ts` now, so `Sidebar` draws no header over them. `rankMatch` / `searchBy`
  are the ranking every one of those lists shares (a name that *starts* with the query, then
  one that contains it, then one every query word appears in; a hit on a later field —
  an author, a question's prose — never outranks one on the name). `buildStudyIndex` is what
  the Dashboard's Concepts and Resources pills search: the bundled exam pages
  (`useWikiSyllabus`), deliberately **not** `buildWikiIndex`, whose fallback is GitHub's
  rate-limited Contents API — the first screen of the app has to find things offline. What
  the bundle can't answer, the foot of the results hands to the Search page, which now takes
  `?type=` and `?q=`. Pure and tested.
- `conceptGraph.ts` / `conceptRecipes.ts` / `conceptCraft.ts` / `craftMedals.ts` / `craftLayout.ts` — **Concept Craft**
  (`docs/concept-craft.md`). `conceptGraph.ts` is the derived graph: `pageMentions` (what a page
  says about other concepts — every link, and every topic concept named in its text, longest
  name first, never inside a link, math or code — with the sentence it sits in),
  `connectionStrength` (the noisy-OR over pages, questions and syllabus lines, weights in
  `STRENGTH_WEIGHTS`, cut-off `MIN_STRENGTH`, bands `STRENGTH_TIERS`) and `buildConceptGraph`
  (which also hands back how common each name is, `share`). `conceptRecipes.ts` is what a
  connection makes, cause and effect, read off the page of the concept it makes:
  `openingNames` (the topic's concepts its definition sentence, defining formula — `\text{}`
  names or the abbreviation a page gives itself — lead and opening points name, each sentence
  cut at its first aside, `beforeAside`: a use, a contrast, an instance, a pointer),
  `buildRecipes` (two connected ingredients, one in the definition/lead/formula or both in one
  short sentence; never an effect of the concept, by its own definition; a foundation only by
  a plainly stated recipe; best two per concept — `RECIPES`, `PLACE`) and `recipesByPair` (at
  most three per connection, none far below the best). `conceptCraft.ts` is the game: topics
  read off the exam pages (`objectiveBlocks`, `craftTopics` — studiable exams, objectives with
  six or more concept pages), a topic's graph with its recipes (`topicGraph`, `craftGraph`,
  `madeBy`, `recipesOf`), the starting hand (`seedConcepts` — what nothing makes, plus the
  fewest that open a circle, pruned to none the others make; the best-explained connected
  pair dealt first), a board as one list of found pair keys (all that
  `hooks/useConceptCraft.ts` stores) read back into the hand, what made each card and which
  are new (`boardState`), `combine`, `withConnection`, `topicTally`, and a connection's
  practice (`practiceQuestions`). `craftMedals.ts` is the medals: every pair of the
  board at the least it can score (`leastPoints`), the best a rule-keeping play from the
  seeds reaches in so many connections (`bestPlay` — what caps a target), each medal's
  target and connections (`medalPlan`) and where the connections found, in order, stand
  against them (`medalStanding`). `craftLayout.ts` is the board's physics and
  camera: bodies, springs sized by strength (`connectionSpring`), collision, seeding
  (`spawnBeside` for what a find made, `spawnNear`, `seedPositions`), a dragged card as a
  **ghost** (no force reaches it — or collision would shove the target out from under the
  drop), `fitView` with insets for the panels. All pure and tested;
  `conceptCraftVault.test.ts` runs the first three over the real vault, playing every topic
  out from its seeds to every concept and connection, and pins a handful of recipes
  (*Frequency* + *Severity* → *Pure Premium*), and replays every topic's medal plays to
  check each medal can be won.
- `appMode.ts` / `cowork*.ts` — **Cowork**, the app's second product (Preview,
  approved accounts only via `PREVIEW_APPROVED_EMAILS`, `COWORK_ENABLED`; the e2e build opens it
  to everyone with `VITE_COWORK_PREVIEW=on` → `COWORK_OPEN_TO_ALL` → `ModeViewer.previewOpen`). `appMode.ts` is the one definition of what a mode *is* — label,
  home, routes, what it takes to enter it — read by the pill (`components/ModeSwitcher.tsx`),
  the sidebar's nav and `App.tsx`'s route guard, so none of the three re-decides it.
  `coworkSources.ts` is the entity/resource model (a resource's `table`, for Workflows), the shelf's filters (`groupSources` for publishers,
  `filterResources` for the flat document list, both honouring the `entityIds`/`resourceIds`
  the **My Library** pill passes — `[]` is an empty library, `undefined` is the filter off),
  the search bar's two-list lookup (`searchSources`, where each side matches on its *own*
  account), the per-publisher lookups a source page reads (`entityById` / `entityResources`)
  and the library reducers (adding a document follows its publisher; dropping a publisher
  drops its documents); `coworkCovers.ts` finds a resource
  card's cover in the wiki index, or says there is none. (`xlsx.ts`, the minimal dependency-free
  `.xlsx` writer that Cowork's retired Deliverables exported through, stays for the tool card's
  and the Projects tab's exports.) `coworkContent.ts` is the one impure one: it installs
  the wiki bundle's lookup *and* registers Cowork's sample documents as virtual vault files,
  which is what lets both kinds of resource open in `ConceptPopup` rather than a second
  reader. The two rules to keep are in `docs/cowork.md` — nothing is invented, and there is
  no second viewer.
- `knowledgeBase.ts` / `aiConnector.ts` — the **AI connector**'s build-time half
  (`docs/ai-connector.md`). `readKnowledgeBaseSources` is the one list of what an assistant can
  read (root exam pages, `Concepts/`, all of `Resources/`, `Guides/`, the question bank, the exam
  catalogue and alias table), taking an injected `VaultReader` so it stays free of Node imports;
  `buildKnowledgeBase` turns it into the export through the app's own parsers (`parseQuestion`,
  `parseExamSyllabus`, `extractSourceMaterial`, `factCheckBadge`), withholding any question with an
  open critical finding. `aiConnector.ts` holds the public addresses (connector URL, skill zip) the
  Settings card (`components/AiConnectorCard.tsx`) and `llms.txt` hand out. The run-time half is
  plain JS under `quiz/api/_mcp/` (`protocol.js` both MCP eras, `server.js` tools/resources/prompts,
  `knowledgeBase.js` index + search, `load.js`); a few helpers are mirrored there
  (`normalizeTerm`, `objectiveKey`, `normalizeAnswerText`) and pinned by `mcpServer.test.ts`.
- `battle.ts` / `battleDisplay.ts` / `battleSetup.ts` / `battleRoom.ts` / `battleSession.ts` /
  `battleTransport.ts` / `battleLobby.ts` / `battleMatchmaking.ts` / `battleTopics.ts` /
  `battleMusic.ts` / `battleMusicPlayer.ts` — **Quiz Battle** (`docs/quiz-battle.md`). `battle.ts` is the game as a
  pure reducer (`battleReducer`: tick / buzz / answer / ready / next / forfeit, each carrying its
  own time; a disallowed event returns the state by identity), the scoring constants, the
  summary, and the question pool (`isBattleQuestion` — multiple choice only — over
  `filterQuestions`). `battleDisplay.ts` is how it is drawn: the two **player colours** (sky and
  fuchsia, `playerAccentStyle` — identity, never a verdict; style guide §2.3) and the words a
  round is told in. `battleSetup.ts` is the remembered setup. The online half:
  `battleRoom.ts` is room codes and the wire protocol, with a validator for every message
  (`parseMessage` / `parseBattleState` — the channel is public to whoever has the code);
  `battleSession.ts` is `HostSession` (runs the reducer, sends the redacted room on every change
  and every 2 s) and `GuestSession` (sends moves, draws the room shifted onto its own clock),
  framework-free and tested against each other over an in-memory channel — the host also runs
  the **topic pick** (`openTopics`, the pick's clock and its grace, the draw, then `start`);
  `battleTopics.ts` is that pick as data: the topics an exam offers (`topicCatalogue`, grouped
  by the syllabus), the rules a pick is held to (`cleanTopicPick`), the draw from two picks
  (`drawFromTopics` — turns, every pick before any twice, the whole exam last) and the
  `BattleDraft` the room carries, hidden per player until the draw; `battleTransport.ts`
  is the channel — Supabase Realtime broadcast, or BroadcastChannel with
  `VITE_BATTLE_TRANSPORT=local` (the e2e suite). The **matchmaking lobby**: `battleLobby.ts` is
  its rules as data (entries and handshake messages validated, the queue, `planMatches` — the
  pairing every device computes alike — and the matched exam); `battleMatchmaking.ts` is
  `MatchmakingSession`, one player's end of it (or an *observer*, which only counts — the
  Battle page's "No one's in the lobby right now"), plus `presenceOverBroadcast`, the presence
  the BroadcastChannel build and the tests emulate (Supabase has its own). The **music**:
  `battleMusic.ts` writes the generative score (84 bpm, an eight-bar harmony, a line drawn
  per beat, three intensities; every note from the pentatonic, nothing sustained above 1 kHz)
  and holds its on/off switch; `battleMusicPlayer.ts` plays it, look-ahead scheduled onto
  `soundGraph()` from `soundEngine.ts`, driven by `setBattleMusic(intensity | null)` —
  `useBattleMusic` in `hooks/useBattle.ts`, with the intensity from `battleMusicIntensity` in
  `battleDisplay.ts`. The battle's cues are `BATTLE_RECIPES` in `soundConfig.ts`. All pure
  modules are tested.
- `featureFlags.ts` — build-time feature flags (`ACTUARIA_ENABLED` — on, for the approved accounts in `lib/actuaria/access.ts`; `ACTUARIA_OPEN_TO_ALL`, which the e2e build sets with `VITE_ACTUARIA_PREVIEW=on`, opens it to everyone —, `COWORK_ENABLED`, `TUTOR_ENABLED` and `TUTOR_OPEN_TO_ALL` (the Tutor; the e2e build's `VITE_TUTOR_PREVIEW=on` opens it only to a page that sets `actuarial_tutor_preview`), `RESEARCH_AI_ENABLED`, `RESEARCH_TAB_ENABLED`,
  `STREAK_ENABLED`, `XP_ENABLED`, `QUESTS_ENABLED`,
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
- `localMasteryStore.ts` / `dailyProgressStore.ts` — localStorage-backed offline fallbacks that sync with Supabase
- `github.ts` — fetches wiki content from GitHub raw URLs at runtime (for the live site, vs. the
  build-time bundle). Note that `listRepoContents` hits the GitHub **API**, which is limited to
  60 requests/hour per IP without `VITE_GITHUB_TOKEN` — don't put it on a path that has to work.
- `supabase.ts` — Supabase client + shared row types
- `seo.ts` / `seoPrerender.ts` / `seoPages.ts` / `documentHead.ts` — **SEO**
  (`docs/seo.md`). `seo.ts` is pure and runs in both the vite config and the app:
  `buildSeoPages` describes every public page from the vault (title, description,
  canonical path, breadcrumb, `noindex` for stubs), `pageHead` / `fallbackHead` say
  what the document head should hold, `headTagsHtml` writes it as HTML and
  `sitemapXml` the sitemap. `seoPrerender.ts` is build-only (unified → a minimal hast
  serialiser): the crawlable article each page's static file carries. `seoPages.ts`
  looks the build's records up by route (`virtual:seo-pages`, wiki chunk only);
  `documentHead.ts` writes a head into the live document by the same selectors the
  static files use. Imports in `seo.ts` and everything it reaches are relative —
  which is why `findSyllabiForConcept` lives in `wikiParser.ts` (re-exported from
  `conceptMatch.ts`) and `examIds.ts` imports `./wikiParser`.

`*.test.ts` files sit alongside the modules they test (vitest). There are **216 test files /
~4200 tests**, concentrated on the trickiest logic (mastery, study plan, parsing, ontology
matching, the gamification engines, the sound catalogue, the research/resource-timeline
modules, and the AI connector's protocol and tools — `mcp*.test.ts` exercise the plain-JS
endpoint under `quiz/api/` the way `passRate*.test.ts` do theirs).

## Feature flags & the Research tab

`quiz/src/lib/featureFlags.ts` holds build-time flags (plain module constants, no env vars,
annotated `: boolean` so both branches stay type-checked). Two of them gate a large,
**currently-off** feature — the **Research tab**, a Canadian P&C insurance research corpus
with search, a resource timeline, source-collection "projects", and an AI "Ask" assistant:

- `RESEARCH_TAB_ENABLED = false` — hides the whole tab. The nav drops the Research entry and
  `/research` redirects to `/wiki` (see `App.tsx`, `Sidebar.tsx`).
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
- Concept pages (`Concepts/*.md`) follow the `actuarial-concept-definitions` skill: definition →
  `> $$formula$$` (or, for a qualitative concept, its defining list/hierarchy/table) → bullets →
  `> [!idea] The idea` → collapsed examples → collapsed *How it appears on the exam* and *Exam
  traps*. `[!idea]` and `[!trap]` are **note cards** — always open, in the Examiner's report
  shape (`MarkdownCallout`, style guide §7.2b). Nothing callout-shaped goes above the bullets:
  the opening is read by Concept Craft's recipe reader (`pageOpening`) and the SEO lead.
  `Resources/Books/` pages have their own skill, `resource-pages`.
- Exam pages use callout blocks (`> [!example]-`) listing learning objectives with weight
  percentages, e.g. `{23-30%}`.
- The study tips under `Guides/<exam page>/` are still bundled (`virtual:exam-guides`) but no
  surface renders them: the exam page's orientation row — the **Exam Readiness Score** card
  beside the **How to Study** card — was removed, along with the `<div class="exam-guides"></div>`
  position marker the exam pages used to carry. Each tip is a vault page —
  `Guides/<exam page>/<tip>.md`, e.g. `Guides/Exam MAS-I (CAS)/Format and pacing.md` — with
  frontmatter `exam`, `section` (`exam-day` / `how-to-study`, authoring context only) and
  `order`. Write the body like a concept page: no `# Title` (the file name is the title),
  markdown, `[[Wiki Links]]` and LaTeX all fine. The folder name is what ties a guide to its
  exam — `examIdFromFile`, so a dash-less exam picks up a `-1` suffix and Exam 5's key is
  `5-1`.
- A guide page at the **top level** of `Guides/`, beside those folders, belongs to no exam —
  it is an orientation to the course of study itself (`Guides/How to Study for Actuarial
  Exams.md`). It is authored the same way (no `# Title`, wiki-links and LaTeX fine, no
  frontmatter needed), rides along in `virtual:wiki-content`, and is listed on the Study
  Guides home page from `GENERAL_GUIDES` in `data/examGuides.ts` — which is where the card's
  title, one-line description and vault path are authored. It stays out of
  `virtual:exam-guides`, which only walks the exam folders. Its questions are
  `> [!question]-` callouts, which `MarkdownCallout` draws as soft grey FAQ cards (no side
  rule, body-size answers). A bare `%%credential-path%%` line — an Obsidian comment, so the
  vault shows nothing there — is swapped by `WikiArticle` for the interactive SOA/CAS path
  (`components/wiki/CredentialPath.tsx`): start → associate → fellow → continuing education,
  authored in `data/credentialPaths.ts` and held in step with `data/tracks.ts` both ways by
  its test. It is the first thing on the guide, and each designation page (below) places it
  too, naming itself — `%%credential-path ACAS%%` — so it opens on that society at that
  stage (`readCredentialPathMarker`; a name no stage has is left on the page as text). The continuing-education stage (CE/CPD rules, iCAS's CSPA and cat credentials,
  CERA, FCIA) has no track behind it and is transcribed from the societies' own pages.
- The four credential pages — `Concepts/Associate of the Casualty Actuarial Society
  (ACAS).md` and its ASA / FCAS / FSA siblings — are what the Study Guides page's track
  headings open. `data/tracks.ts` names them (`Track.conceptPage`), so a renamed page is a
  one-line change there. Each carries its `%%credential-path <designation>%%` line just above
  `## Requirements`; `credentialPaths.test.ts` fails if one goes missing.
- Every exam page ends with a `## Source Material` heading over a
  `> [!answer]- Source Material` callout: one top-level bullet per syllabus reading (a
  `[[wiki link]]`, normally to a `Resources/Books/` page) with an indented bullet naming the
  chapters or sections covered. The vault keeps the callout — it is what Obsidian renders,
  and `parseExamSyllabus` reads its links — but the app doesn't: `lib/sourceMaterial.ts`
  lifts the entries out and `WikiArticle` renders them as
  `components/wiki/SourceMaterialGallery.tsx`, the same shelf of cover/title/metadata cards
  the Resources page shows, with each card carrying its reading assignment — and the
  Resources page's own filters above it (Publisher, Year, Vintage with its Added / Dropped
  row; `sourceMaterialShelf` in `lib/sourceMaterial.ts`, the marks shared through
  `components/wiki/VintageChanges.tsx`), less the Exam strip, since the page is one exam. The
  metadata comes from the resource page's front matter via the wiki index, so a source with
  no `Resources/Books/` page still gets a card, just a bare one. Obsidian inline footnotes
  (`^[…]`) in a reading line are flattened into parentheses, and a `[[link]]` in a note to
  its text. A reading line that opens with learning-objective codes (`A1, C1-C5`) gives
  the shelf a **Learning objective** filter (`readingObjectives` / `objectiveFilterOptions`
  in `lib/sourceMaterial.ts`), each code named from the page's own numbered objectives —
  but only where every cited code is one the page numbers. Exam 5, 7, 8, 9, MAS-I,
  MAS-II and PCPA have it; Exam 6U cites codes from an earlier outline than its objectives'
  numbering, so it gets none until the two agree; and a page can switch it off with
  `%%objective-filter: off …%%` inside its Source Material callout — Exam 6C does, because
  CAS's Fall 2026 reading table kept the Fall 2025 numbering of the domain C tasks it
  reworded (`extractSourceMaterial(md).objectiveFilter`). A task's `*Key concepts:*` line
  (editorial, marked) keeps a concept on the syllabus that the outline's own words don't
  name — the exam pages transcribe CAS's and the SOA's words and put the vault's additions
  there (content decision D8). `sourceMaterial.test.ts` holds Exam 5's, 6C's and MAS-I's
  readings to their objectives.
- **Every** content file (`questions/`, `Concepts/`, `Resources/`, root `Exam *.md`) carries a
  `verification:` block as the last key of its YAML frontmatter — including concept and exam
  pages, which is why they now have frontmatter at all (`WikiArticle` already stripped it).
  Never hand-edit `content_hash`, `status`, `open_findings` or `open_critical`: they are
  derived, and `python3 scripts/verify_check.py --sync` owns them. A new content file with no
  block is backfilled by the same command. See `docs/verification.md`.
- Question files (`questions/<exam-id>/*.md`) have YAML frontmatter: `id`, `exam`, `topic`,
  `learning_objective`, `difficulty` (`easy`/`medium`/`hard`), `type`, `wiki_link` (array
  of concept paths), `answer`, `points` — followed by the question body, options, and an
  `## Explanation` section (LaTeX via `$$...$$`). A `wiki_link` entry is the concept's vault
  path with no `.md` and **every space written `+`** — `Concepts/Bayes+Theorem`, never
  `Concepts/Bayes Theorem` — and every reader of it (`parser.ts`, `studyPlan.ts`,
  `questionFilters.ts`, `knowledgeBase.ts` …) turns the `+` back into a space before matching.
  A question file sits **directly** in its bank's folder: the build collects
  `questions/<exam-id>/*.md` and nothing deeper (`validate_content.py` warns about a nested
  one; a log may not be renamed, so a file is moved by copying it to its new path and
  withdrawing the old one, as the four early seed questions under `exam-p/probability/`,
  `exam-p/statistics/` and `exam-fm/interest/` were, to `p-an-010`–`012` and `fm-an-001`). Current banks: `exam-p`, `exam-fm`,
  `exam-fam` (the SOA's two FAM sample sets — FAM-S as `fams-<n>`, FAM-L as `faml-<chapter>-<n>`
  after its numbering by AMLCR chapter — and six of the vault's own, `fam-an-001` …),
  `exam-srm` (the SOA's SRM sample set, `srm-<n>`, and five of the vault's own, `srm-an-001` …),
  `exam-astam` (written answer: the SOA's ASTAM sample set as `astam-<n>`, its seven released
  sittings, Spring 2023–Spring 2026, as `astam-<year><s|f>-q<n>` — the Excel-workbook question of
  each left out — and two of the vault's own, `astam-an-001` …), `exam-altam` (the same shape: the
  SOA's ALTAM sample set as `altam-<n>`, most of its questions old MLC and LTAM papers', and its
  seven released sittings as `altam-<year><s|f>-q<n>`),
  `exam-mas-i`, `exam-mas-ii`, the three DISCs' `exam-disc-da` / `exam-disc-rm` / `exam-disc-ia`
  (the vault's own questions, `discda-an-001` …), `exam-5` (hundreds of questions each), `exam-6c` — the
  thirteen Fall 2013–Fall 2019 Exam 6-Canada papers, 394 questions — and `exam-7` /
  `exam-8` / `exam-9` — the 2012–2019 Exam 7 and Exam 8 papers: reserving in `exam-7`,
  classification and individual risk rating in `exam-8`, and in `exam-9` with
  `originally_exam:` Exam 7's ERM questions (CAS moved Brehm's ERM there) and Exam 8's
  reinsurance and catastrophe questions (Clark, Bernegger, Grossi & Kunreuther). `exam-9` also
  holds Exam 9's own seven Spring 2013–2019 papers (`cas9-*`, 172 questions); their syllabus
  ("Financial Risk and Rate of Return") was mostly BKM's *Investments* and the rate-of-return
  papers, so only the 23 on readings today's Exam 9 kept (Panning; Coval, Jurek & Stafford;
  Cummins's capital allocation and CAT bonds) are on it, the rest `off_syllabus`. Two optional keys
  say a question has outlived its paper's syllabus: `originally_exam` (the material moved to
  the exam in `exam`, so it stays off that exam's past-paper shelf) and `off_syllabus: true`
  (no current exam covers it — Exam 7's old valuation questions, Exam 8's NCCI hazard-group
  mapping and Mahler's excess-ratio estimation, and Exam 6C's pre-IFRS 17 valuation (PfADs and
  MfADs, premium deficiency and DPAE, the future-income-tax asset, asset-yield discount rates,
  IAS 39 bond classes), A.M. Best's BCAR (Feldblum Section 5, now excluded) and U.S.-only
  regulation such as TRIA and Dodd-Frank, and Exam 9's old portfolio theory, bond management,
  Hull, Butsic, Goldfarb, Bodoff and rate-of-return questions; kept for the record, out of
  quiz draws, still found by its sitting, its id or a search, and not held to the exam page
  by `syllabus_lint.py`). A CAS question with no lettered parts is `type: multi-part` with
  `### Explanation` / `### Examiner Report` and no `## Part` heading — under `## Explanation`
  the app parses it to nothing; `lib/questionBank.test.ts` fails on any file that doesn't parse.
- Comprehension-check files (`comprehension-checks/<exam-id>/<Concept Name>.md`) used to gate
  flashcard collection and are now rendered nowhere (kept in the vault): YAML frontmatter (`concept`, `exam`, `topic`, `correct` letter) + a `- A) …` option
  list, then an authoring-only `<!-- rationale -->` comment. One file per concept; the filename is
  the concept's display name. See `docs/flashcard-collection.md` and the
  `flashcard-comprehension-check` skill.
- Dated resource pages (`Resources/Regulation|Events|Benchmarks/*.md`) carry frontmatter
  with a `date`/`type` and source links (`source_url`, `source_type`, `pdf_url`) — these feed
  the Resources timeline/heatmap. See `docs/research-corpus-plan.md` for the full schema.
- `Resources/Books/*.md` follow `docs/resource-pages.md`: frontmatter `Title`, `Authors`,
  `Publisher`, `Year`, `date`, `Edition`, `Type`, `Code`, `ISBN`, `Available from` — in that
  order, every value double-quoted — then the body's fixed shape ending in `## Sources`.
  `python3 scripts/resource_lint.py` checks it (CI: `content-validation.yml`).
- `scripts/*.py` are batch maintenance tools for the content vault — e.g.
  `standardize_questions.py` enforces a canonical topic→concept→learning-objective mapping
  (`ontology_map.py` is the data table it consumes), `update_wiki_links.py` rebuilds
  `wiki_link` arrays, `generate_coverage_report.py` regenerates `Concepts Without Review
  Questions.md` (per exam: syllabus concepts no question in that exam's bank is tagged with),
  `tag_missing_concepts.py` backfills concept tags. Run these when doing bulk content
  cleanup, not for one-off edits.
- `pdf_extract.py` / `question_classify.py` / `question_write.py` / `question_lint.py`
  (+ `mdmath.py`) — the **PDF → question bank** pipeline; see
  `docs/pdf-question-pipeline.md`. `pdf_extract.py` and `resource_extract.py` are the only
  scripts in the repo with a non-stdlib dependency (PyMuPDF, imported lazily so the rest
  stays importable without it). `mdmath.py` is the math-aware text normaliser the pipeline and the linter share —
  it mirrors what `quiz/src/lib/vaultMath.ts` fixes at render time and covers what the
  renderer cannot (a literal `\n` escape, an `align*` row packing formula and result,
  OCR characters). Tests: `scripts/test_pdf_pipeline.py`.
- `verify_lib.py` / `verify_check.py` / `verify_targets.py` / `verify_context.py` /
  `verify_record.py` / `sync_reports.py` / `generate_validation_status.py` — the **VERIFY**
  toolchain. The **packet tooling** beside it (`docs/verification-plan.md` §4):
  `verify_sources.py` (the shared source cache, outside the repo, OCR'ing scans),
  `verify_paper.py` (one past paper and every question sat on it: blind stems, stems
  located and diffed in the booklet, the report side), `verify_route.py` (concept →
  syllabus task → reading → focus pages, one packet per reading), `verify_record.py batch`
  and `verify_targets.py --by-source`. Cloud sessions get PyMuPDF and Tesseract from
  `.claude/hooks/session-start.sh`. Tests: `scripts/test_verify_wave0.py`. `verify_check.py` is the CI gate (and `--sync` the repair pass);
  `verify_record.py` is the only supported way to write a finding, resolution or status —
  it dedupes findings by fingerprint and refuses to mark anything `verified` without a
  cited source. Stdlib only, no PyYAML. Tests: `python3 -m unittest discover -s scripts`.
- `generate_concept_figures.py` (+ `figure_kit.py`, `figure_registry.py`,
  `figures_exam_{p,fm,mas_i,mas_ii,5,6c}.py`) draws the per-concept SVGs in `Media/Figures/`
  and inserts their embeds. The figures are **generated** — edit the builder, not the SVG.
  See `docs/concept-figures.md`.
- `dataset_extract.py` — published tables → the **Actuarial Tools** Data Sources
  (`quiz/src/lib/tools/data/datasets/*.json`): NCHS's and Statistics Canada's life tables, BLS's
  and Statistics Canada's price indexes, the Treasury's par yield curves, each file's URL, sha256
  and date read recorded with the licence. Downloads cached outside the repo (`--cache`,
  `--offline`); openpyxl for NCHS's `.xlsx`. Tests: `scripts/test_datasets.py`.
- `tool_fixtures.py` — published worked examples → **Actuarial Tools** fixtures
  (`quiz/src/lib/tools/fixtures/*.json`): Friedland's and Werner & Modlin's exhibits read off
  the CAS's PDFs, each checked by sha256, with no model retyping a number. PyMuPDF, imported
  lazily. Tests: `scripts/test_tool_fixtures.py`. See `docs/actuarial-tools.md` §17.
- `resource_extract.py` / `resource_lint.py` — the **resource-page** pipeline
  (`docs/resource-pages.md`): the first fetches a page's real document and extracts what
  can be read rather than judged (sha256, metadata, bookmark outline as vault markdown,
  contents pages, page text, images of pages with no text layer; an HTML page's headings
  and citation tags; a workbook's sheets), the second is the CI lint for the page shape
  (`--fix` canonicalises the frontmatter). Tests: `scripts/test_resource_pages.py`, which
  also holds every page in `Resources/Books/` to zero lint errors.
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
npm run mcp:local  # after a build: the AI connector at http://localhost:8787/api/mcp
npm run size       # after a build: first-paint bytes against the CI budget
```

Vite plugins (`vite.config.ts`) bundle the markdown content at build time via virtual
modules that read directly from the repo root:
- `virtual:exam-pages` — just the root `Exam*.md` syllabus pages (~80 KB), read by
  `hooks/useWikiSyllabus.ts`. Separate from `virtual:wiki-content` on purpose: that
  module is megabytes and is imported from `WikiLayout`'s lazy chunk, but the Dashboard,
  Sidebar, quiz builder and Flashcards all need to know *which exams exist* and none of
  them mount `WikiLayout`. They used to resolve that from GitHub's Contents API at
  runtime, so a rate-limit or outage left the app with no exams at all — an account
  could add one and never see it appear. **Which exams exist is a build-time fact; keep
  it off the network.**
- `virtual:wiki-content` — `Exam*.md`, `Concepts/`, `Resources/Books/`
- `virtual:questions-content` — `questions/`, as a chunk of its own: `fetchAllQuestions`
  (`lib/github.ts`) dynamic-imports it the first time anything asks for a question. It is
  ~11 MB, and it used to be imported eagerly in `main.tsx`, which put it in the entry chunk
  every reader downloads before first paint. **Never import it statically** —
  `npm run size` (`scripts/bundle-budget.mjs`, a CI step) fails a build whose first paint
  (the entry script, what it preloads and its CSS, gzipped) is over budget
- `virtual:comprehension-checks` — `comprehension-checks/<exam-id>/`
- `virtual:exam-guides` — the tip pages under `Guides/<exam page>/` (their markdown rides
  along in `virtual:wiki-content`; bundled but unrendered — see `lib/examGuides.ts`). A
  general guide at the top level of `Guides/` rides along in `virtual:wiki-content` too, but
  never in this module
- `virtual:resource-timeline` — the dated `Resources/{Books,Events,Regulation,Benchmarks}/`
  pages that power the Resources timeline/heatmap
- `virtual:store-books` — the Store's textbook aisle: the `Resources/Books` textbooks with
  an ISBN that an exam assigns, with each exam's chapters (`lib/storeBooks.ts`, ~20 KB)
- `virtual:seo-pages` — every exam, concept and resource page, described (`lib/seo.ts`).
  The same plugin (`seoPagesPlugin`) writes, after a build, one static
  `dist/wiki/<kind>/<slug>/index.html` per page and `dist/sitemap.xml` — the sitemap is
  generated, never hand-edited (see `docs/seo.md`)

The `ai-connector-assets` plugin also **emits** three files into the build (not virtual modules —
the app never imports them): `ai/knowledge-base.json` (the whole vault for the MCP endpoint,
~10 MB), `ai/actuarial-notes-skill.zip` (`quiz/skills/actuarial-notes/`, zipped with
`lib/xlsx.ts`'s `buildZip`) and `llms.txt`; the dev server serves all three, rebuilt per request.

If you add new top-level exam files or content directories, make sure the relevant collector
picks them up — `readKnowledgeBaseSources` in `lib/knowledgeBase.ts` included.

`quiz/.env.example` lists required env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`,
`VITE_GITHUB_REPO`/`VITE_GITHUB_BRANCH` (for runtime content fetches), `VITE_GITHUB_TOKEN` —
and the optional `VITE_BATTLE_TRANSPORT=local`, which plays online Quiz Battles over the
browser's BroadcastChannel instead of Supabase Realtime (two tabs; set by the e2e config).
Server secrets (e.g. `GOOGLE_CLOUD_TTS_API_KEY`, Stripe keys, `ANTHROPIC_API_KEY`) are set
via `supabase secrets set`, never as `VITE_*`.

## Backend (Supabase)

- `supabase/migrations/` — SQL migrations, dated filenames (`YYYYMMDD_description.sql`).
  They cover: concept mastery, quiz sessions, exam progress, study plan config/cache,
  user subscriptions/gems/cosmetics, beta codes, daily completions, store expansion,
  flashcard sync (collected cards + deck), project sync (PCPA attempts + workspace files), and
  (most of the recent additions) the flag-gated **research** feature — `research_documents`,
  full-text search, ontology, projects, project questions/sections, cron.
- `supabase/functions/` — Deno edge functions: Stripe checkout/portal/webhook/sync,
  account deletion, beta code redemption, Google Cloud TTS proxy, `research-ingest-url`,
  and `daily-plan-email` (the pg_cron-driven study-plan email sender).
- `20260929_actuaria.sql` / `20260930_actuaria_crews.sql` / `20261001_actuaria_pro.sql` /
  `20261002_actuaria_approved.sql` — **Actuaria Online** (approved accounts only): a player's own settings row, then cohorts (`actuaria_crews*`), the risk pool (applied inside
  `award_gems`), guides, nudges, Cohort Clash challenges and the weekly raid — leagues' privacy
  model, RPC-only, with `actuaria_raid_hit` callable by the service role alone (`quiz/api/raid.js`),
  and starting or joining a cohort held to the approved emails (`actuaria_is_approved`, the
  same list as `ACTUARIA_APPROVED_EMAILS` — `access.test.ts` holds them equal).
  `supabase/tests/run.sh` runs `supabase/tests/actuaria_crews.sql` against a throwaway local
  Postgres; CI doesn't, so run it after touching that migration. See `docs/actuaria-online.md`.
- `content_reports` (`20260823_content_reports.sql`) — the reader-report inbox behind VERIFY's
  "Report an issue". Insert/select own rows only; **no** UPDATE or DELETE policy, so only the
  service-role `scripts/sync_reports.py` can mark a report synced.
- `.github/workflows/deploy-functions.yml` — auto-deploys edge functions to Supabase on
  push to `main` when `supabase/functions/**` changes.
- `.github/workflows/verify-check.yml` — the VERIFY gate on every PR (fails on a false
  verification claim or an edited log entry; repairs and commits back what is merely stale).
- `.github/workflows/validate-sweep.yml` — the VALIDATE sweep, run by hand (no schedule —
  roadmap D19). Opens a PR, never pushes to `main`.

## Deployment

Both the root site and `quiz/` have their own `vercel.json` (root handles `/api/*` CORS
headers for the serverless functions — `chat.js` and the flag-gated `research*.js`; `quiz/`
rewrites all routes to `index.html` for the SPA). Deploys to Vercel; Supabase edge functions
deploy via the GitHub Action above. Functions that must share the app's origin live in
`quiz/api/` (`exam-pdf.js`, `amazon-price.js`, `mcp.js` — the AI connector, which reads
the knowledge-base export from its own deployment — and `raid.js`, Actuaria's raid marking, which
reads the same export and needs `SUPABASE_SERVICE_ROLE_KEY`); `quiz/api/_mcp/` and `quiz/api/_raid/`
are `_`-prefixed so Vercel doesn't route them.

## Cowork (the second product)

In **Preview**, gated by `COWORK_ENABLED`, and open only to the approved accounts in
`PREVIEW_APPROVED_EMAILS` (`lib/appMode.ts`) — no one else sees the mode pill, and `/cowork`
redirects them to the dashboard. Two places — **Sources** and **Workflows** — chosen from the
sidebar, like every route in Study mode (the page carries no tab row). They are the two halves
of one loop:

```
Sources ──► Library ──► Workflow ──► Connect ──► Run ──► Run in Claude
```

A reader follows the **entities** that publish (OSFI, FSRA, the CIA, Intact, Canadian
Underwriter…), takes documents into a library, and lays them on a **workflow**'s board
(`/cowork/workflows`, `docs/workflows.md` — what was the Tools tab's Workflow Builder; it
replaced Cowork's Deliverables) as **source** steps beside the data, calculations and concepts
they feed. A document that publishes a table (`SourceResource.table` — FSRA's private passenger
auto **loss trend benchmarks** first) brings it as the step's data, mapped onto a calculation's
inputs the way an uploaded CSV's columns are, so a coverage's trend links straight into Trend
Factor.

The Sources surfaces, and the shape of each is deliberate: the shelf (`/cowork`) answers
one primary filter — **Sources or Documents** — with a grid of publisher cards or document
cards, over a secondary pill row led by **My Library** (a filter narrowing the shelf to what
the reader follows/has taken, not a section stacked above it); **a source is its own page**
(`/cowork/sources/:id`), the way an exam's study guide is, with the publisher's *own* logo in
the sticky header (`SourceEntity.logo`, transcribed from their site, monogram tile as the
fallback) and their catalogue below it; and **a document is always a card**, never a row — one
component (`components/cowork/ResourceCard.tsx`) draws it everywhere, and it is the study
guide's resource card. On both kinds of card the **whole card** is the target and the one
control that doesn't navigate (Follow, Add) sits at its right edge; a card carries pills, not a
paragraph — a publisher's region and `established` year, a document's kind and date.

Three things to know before changing any of it — all three are load-bearing, and
`docs/cowork.md` is the full account:

1. **Nothing is invented.** A source's table carries the publisher's columns and row labels,
   and its **figures stay blank** until they have been read off the publisher — the reader
   fills them in on the workflow step, and a blank carries nothing down a link
   (`coworkContent.test.ts` holds every table to a real, linked document). An assumption a
   document supplies the *row* but not the number for stays visibly blank with its locator. Same rule as the vault's pass rates and
   examiner's reports: transcribed, never constructed.
2. **There is no second reader.** A Cowork resource opens in `ConceptPopup`, the same split
   pane the study guide reads a concept in. Resources that are vault pages carry a `wikiRef`;
   Cowork's own documents are registered as **virtual vault files** at vault-shaped paths
   (`lib/coworkContent.ts`) so they render through the same `WikiArticle`. Anything that
   seems to need a bespoke viewer should become a page at a vault-shaped path instead.
3. **A `Sample` entry names no particular document.** The catalogue is seed data; entries
   marked `sample: true` stand for a *class* of document a publisher issues and carry no date
   and no link, because inventing a plausible one would put a citation in a workflow that
   nothing supports. Tests enforce this both ways (`lib/coworkContent.test.ts`), including
   that every `wikiRef` still resolves to a file that is actually in the vault.

The library store (`hooks/useCoworkLibrary.ts`) is localStorage only and holds **ids only** —
the catalogue is passed in. That is what keeps Cowork a lazy chunk instead of pulling its
catalogue into the main bundle through the sidebar's nav badge (and why the Workflows row has
no count: the workflow store reads the tools engine). Populating the corpus more deeply is the next phase.

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

## The AI connector (Claude and ChatGPT)

A reader adds `https://quiz.actuarialnotes.com/api/mcp` as a custom connector in Claude
(*Customize → Connectors*) or ChatGPT (developer mode) — no sign-in, read-only — and the assistant
can search the vault, read syllabi and concept pages, draw practice questions without their
answers and mark the student's answer against the official solution. Settings → **AI assistants**
shows the address and the skill download. `docs/ai-connector.md` is the full account; three things
to know before changing it:

1. **It speaks two MCP eras on one endpoint.** Revision 2026-07-28 dropped the `initialize`
   handshake for per-request `_meta` plus `Mcp-Method`/`Mcp-Name` headers; older clients still
   handshake. `quiz/api/_mcp/protocol.js` reads the era off each request and answers each with the
   errors its era expects — keep `mcpProtocol.test.ts` green, and re-run the official SDK clients
   (`docs/ai-connector.md` → Testing) after touching it.
2. **The contract is the product.** Everything comes through the app's parsers, every result carries
   its fact-check verdict, withheld questions stay withheld, and practice never shows the answer
   first. `search`/`fetch` keep ChatGPT's exact result shapes; tool names are public API.
3. **The export and the endpoint are versioned together.** Change the export's shape → bump
   `KNOWLEDGE_BASE_VERSION` and `SUPPORTED_KB_VERSION` in the same change.

## The Tutor

The reader's own Gem Shop character — the animal and colourway on their account, drawn by the same
`AvatarDisplay` the shop draws (`lib/tutor/character.ts`; the fox until they pick one) — in the
bottom-right corner of every page (`components/tutor/`), for the accounts its
rollout stage admits — **Preview**: `TUTOR_APPROVED_EMAILS` in `lib/tutor/access.ts`, one
account; **Beta** (one line, `TUTOR_STAGE = 'beta'`) adds every Pro subscriber. To anyone else
it doesn't exist and its lazy chunk is never fetched. It walks an **Exam 5** candidate through
the exam and is **purely algorithmic**: no model, no generated text — every word of feedback is
the vault's (concept page, sample answer, examiners' report) or a templated sentence about the
candidate's own record (`lib/tutor/copy.ts`). `docs/tutor.md` is the full account; four things
to know before changing it:

1. **The engine is `lib/tutor/`, all pure and tested.** `items.ts` (a question's lettered parts
   as items, each part's concepts and kind), `examinerNotes.ts` (the report's lost-credit
   sentences, verbatim), `memory.ts` (FSRS-4.5 + the exam-horizon cap), `log.ts` (the
   append-only event log and its fold — relearning, flags, calibration), `scheduler.ts` (the
   next step: relearn → due → new, page first), `journey.ts` (phases, the exam date),
   `diagnosis.ts` (what is confusing), `moments.ts` (when to speak), `context.ts` (what is on
   screen), `bank.ts` (answers into the rest of the app). `tutorVault.test.ts` runs it over the
   real Exam 5 bank.
2. **It keeps a scheduler, never a score.** Levels are the mastery ladder's and readiness is
   `computeExamReadiness`'s; the Tutor prints neither of its own and pays no reward of its own.
   Its answers are banked through `recordReviewAnswers`, one part as a one-part question under
   its question's id with only its own concepts, so they count everywhere a quiz answer does.
3. **Its record is an event log** in localStorage (`actuarial_tutor_v1:<user id>`); everything
   it knows is `foldLog(events, ladderSeeds, now)`. Don't store derived state.
4. **The quiet rules are the feature.** No bubble during a quiz, a battle, the PDF reader, a
   focused field or focus mode; bubbles 8 minutes apart; two declines of a kind and it stops for
   the day (`moments.ts`).

