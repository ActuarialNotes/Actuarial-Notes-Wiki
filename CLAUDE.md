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
Media/Attachments/                                — images referenced via ![[...]]
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
- `data/` — authored static tables bundled into the app: `comprehensionChecks.ts` (flashcard-collect
  gate questions), `examSittings.ts` / `examPdfLinks.ts` (sitting dates + examiner reports),
  `mnemonics.ts` / `stories.ts` (per-concept, per-avatar content), `quests.ts` (daily-quest
  catalogue), `tracks.ts`
- `hooks/` — React hooks wrapping lib logic + Supabase queries
- `stores/` — Zustand stores: `quizStore.ts` (active quiz session), `researchStore.ts` (flag-gated)
- `contexts/` — Auth, ExamProgress, MathView providers

## Key domain concepts (read the docs first)

The `docs/` folder holds design docs for the trickiest logic — **read the relevant one
before touching that area**:
- `docs/concept-learning-progression.md` — the 5-state mastery ladder (New → L1 → L2 → L3,
  with Forgotten/decay), implemented in `quiz/src/lib/mastery.ts`
- `docs/study-plan-generation.md` — how daily study plans are scheduled/paced/cached,
  implemented in `quiz/src/lib/studyPlan.ts`
- `docs/flashcard-collection.md` — the "collect this card" gate: a concept must be collected
  (pass a comprehension check) before its mastery can advance past **New**. `applyAnswer`
  in `mastery.ts` takes a `collected` flag; the gate UI lives in `components/collect/`.
- `docs/research-ai-disabled.md` — what the two Research feature flags hide and the exact
  re-enable checklist (read before touching anything under `Research`/`research`).
- `docs/research-corpus-plan.md` — the plan for the Canadian P&C `Resources/` markdown corpus.
- `docs/leagues.md` — the opt-in weekly XP leagues (roadmap P4.1): the tier ladder and
  promotion/relegation math, the lazy Monday-UTC rollover, and the privacy model
  (snapshot-on-join / delete-on-leave, RPC-only board reads).

Other important `lib/` modules:
- `parser.ts` — parses question markdown (frontmatter + body) into `Question` objects
- `wikiParser.ts` / `wikiIndex.ts` / `wikiExtract.ts` — parse wiki pages, build search index, extract syllabus structure
- `conceptMatch.ts` — resolves concept name variants/aliases to a canonical slug (`slugForLink`)
- `resourceTimeline.ts` / `resourceTimelineFilters.ts` — build/filter the dated Resources timeline (heatmap)
- `readiness.ts` — exam-readiness score shown on the Dashboard
- `streak.ts` / `streakStore.ts` — daily-streak engine (roadmap P1.1). `streak.ts` is the
  pure, tested core (timezone-correct day boundaries + freeze/repair mechanics);
  `streakStore.ts` persists it to the `user_streaks` table (signed-in) or localStorage
  (guests) and is called from `quizStore` on quiz completion. Surfaced via
  `hooks/useStreak.ts` + `components/StreakBadge.tsx` in the Sidebar/BottomNav/Dashboard.
  Gated by `STREAK_ENABLED`.
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
  Level/Quests/League tabs → `components/LeaderboardPanel.tsx` with a per-exam selector,
  `components/QuestsPanel.tsx`), plus `components/LeagueSettingsCard.tsx` (Settings
  opt-in/out). `hooks/useLeague.ts` is `useLeague(exam)`. Gated by `LEAGUES_ENABLED`.
- `featureFlags.ts` — build-time feature flags (`RESEARCH_AI_ENABLED`, `RESEARCH_TAB_ENABLED`,
  `STREAK_ENABLED`, `XP_ENABLED`, `QUESTS_ENABLED`, `MASTERY_ANALYTICS_ENABLED`,
  `LEAGUES_ENABLED`)
- `research*.ts` (researchOntology / researchMetrics / researchPeriods / researchProjectMeta) — Research-tab logic (flag-gated)
- `localMasteryStore.ts` / `dailyProgressStore.ts` — localStorage-backed offline fallbacks that sync with Supabase
- `github.ts` — fetches wiki content from GitHub raw URLs at runtime (for the live site, vs. the build-time bundle)
- `supabase.ts` — Supabase client + shared row types

`*.test.ts` files sit alongside the modules they test (vitest). There are **25 test files /
~435 tests**, concentrated on the trickiest logic (mastery, study plan, parsing, ontology
matching, the gamification engines, and the research/resource-timeline modules).

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
- Question files (`questions/<exam-id>/*.md`) have YAML frontmatter: `id`, `exam`, `topic`,
  `learning_objective`, `difficulty` (`easy`/`medium`/`hard`), `type`, `wiki_link` (array
  of concept paths), `answer`, `points` — followed by the question body, options, and an
  `## Explanation` section (LaTeX via `$$...$$`). Current banks: `exam-p`, `exam-fm`,
  `exam-mas-i`, `exam-5` (hundreds of questions each).
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

## Running things

```bash
cd quiz
npm install
npm run dev        # vite dev server
npm run build      # tsc + vite build
npm run lint       # eslint src --ext ts,tsx
npm test           # vitest run
```

Vite plugins (`vite.config.ts`) bundle the markdown content at build time via three virtual
modules that read directly from the repo root:
- `virtual:wiki-content` — `Exam*.md`, `Concepts/`, `Resources/Books/`
- `virtual:questions-content` — `questions/`
- `virtual:resource-timeline` — the dated `Resources/{Books,Events,Regulation,Benchmarks}/`
  pages that power the Resources timeline/heatmap

If you add new top-level exam files or content directories, make sure the relevant collector
picks them up.

`quiz/.env.example` lists required env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`,
`VITE_GITHUB_REPO`/`VITE_GITHUB_BRANCH` (for runtime content fetches), `VITE_GITHUB_TOKEN`.
Server secrets (e.g. `GOOGLE_CLOUD_TTS_API_KEY`, Stripe keys, `ANTHROPIC_API_KEY`) are set
via `supabase secrets set`, never as `VITE_*`.

## Backend (Supabase)

- `supabase/migrations/` — SQL migrations, dated filenames (`YYYYMMDD_description.sql`).
  They cover: concept mastery, quiz sessions, exam progress, study plan config/cache,
  user subscriptions/gems/cosmetics, beta codes, daily completions, store expansion, and
  (most of the recent additions) the flag-gated **research** feature — `research_documents`,
  full-text search, ontology, projects, project questions/sections, cron.
- `supabase/functions/` — Deno edge functions: Stripe checkout/portal/webhook/sync,
  account deletion, beta code redemption, Google Cloud TTS proxy, and `research-ingest-url`.
- `.github/workflows/deploy-functions.yml` — auto-deploys edge functions to Supabase on
  push to `main` when `supabase/functions/**` changes.

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
