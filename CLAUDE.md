# Actuarial Notes Wiki — Onboarding for Claude Code

Read this first, every session. It should save you a re-discovery pass through the repo.

## What this project is

A two-part product for people studying for actuarial exams (CAS/SOA):

1. **Content vault** (repo root) — an Obsidian-style markdown wiki: exam syllabus pages
   (`Exam *.md`), concept pages (`Concepts/*.md`), book/resource pages (`Resources/Books/*.md`),
   and a practice-question bank (`questions/<exam>/*.md`).
2. **Quiz app** (`quiz/`) — a React + Vite + TypeScript SPA that reads the markdown content
   at build time, renders the wiki, runs quizzes/flashcards, tracks per-concept mastery,
   and generates personalized study plans. Backed by Supabase (auth, sync, payments).

Almost all day-to-day development work happens inside `quiz/`. The markdown content at
the repo root is the "database" the app is built on top of.

## Repo layout cheat sheet

```
Exam *.md, Concepts/*.md, Resources/Books/*.md   — wiki content (Obsidian [[wiki-links]])
questions/<exam-id>/*.md                          — question bank (YAML frontmatter + markdown)
Media/Attachments/                                — images referenced via ![[...]]
scripts/                                          — Python content-maintenance scripts (one-off/batch)
docs/                                             — design docs for app algorithms (read these!)
api/chat.js                                       — Vercel serverless fn, proxies to Anthropic API
supabase/migrations/, supabase/functions/         — DB schema + edge functions (Stripe, TTS, beta codes…)
quiz/                                             — the React app (this is where most code changes go)
```

### Inside `quiz/src/`
- `pages/` — route-level views (Quiz, Dashboard, Flashcards, Search, Settings, Store, wiki/*)
- `components/` — shared UI; `components/wiki/` for wiki-specific UI, `components/ui/` for primitives (shadcn-style)
- `lib/` — core logic, mostly pure/testable modules (this is where the interesting algorithms live)
- `hooks/` — React hooks wrapping lib logic + Supabase queries
- `stores/quizStore.ts` — Zustand store driving an active quiz session
- `contexts/` — Auth, ExamProgress, MathView providers

## Key domain concepts (read the docs first)

Two files in `docs/` describe the most complex, easy-to-get-wrong logic in the app —
**read them before touching mastery or study-plan code**:
- `docs/concept-learning-progression.md` — the 5-state mastery ladder (New → L1 → L2 → L3,
  with Forgotten/decay), implemented in `quiz/src/lib/mastery.ts`
- `docs/study-plan-generation.md` — how daily study plans are scheduled/paced/cached,
  implemented in `quiz/src/lib/studyPlan.ts`

Other important `lib/` modules:
- `parser.ts` — parses question markdown (frontmatter + body) into `Question` objects
- `wikiParser.ts` / `wikiIndex.ts` / `wikiExtract.ts` — parse wiki pages, build search index, extract syllabus structure
- `conceptMatch.ts` — resolves concept name variants/aliases to a canonical slug (`slugForLink`)
- `localMasteryStore.ts` / `dailyProgressStore.ts` — localStorage-backed offline fallbacks that sync with Supabase
- `github.ts` — fetches wiki content from GitHub raw URLs at runtime (for the live site, vs. the build-time bundle)
- `supabase.ts` — Supabase client + shared row types

`*.test.ts` files sit alongside the modules they test (vitest). There are 10 test files,
concentrated on the trickiest logic (mastery, study plan, parsing, ontology matching).

## Content conventions (markdown vault)

- Wiki links use Obsidian syntax: `[[Concept Name]]` or `[[Concept Name|Display Text]]`.
- Exam pages use callout blocks (`> [!example]-`) listing learning objectives with weight
  percentages, e.g. `{23-30%}`.
- Question files (`questions/<exam>/*.md`) have YAML frontmatter: `id`, `exam`, `topic`,
  `learning_objective`, `difficulty` (`easy`/`medium`/`hard`), `type`, `wiki_link` (array
  of concept paths), `answer`, `points` — followed by the question body, options, and an
  `## Explanation` section (LaTeX via `$$...$$`).
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

Vite plugins (`vite.config.ts`) bundle the markdown content at build time via two virtual
modules (`virtual:wiki-content`, `virtual:questions-content`) that read directly from the
repo root (`Exam*.md`, `Concepts/`, `Resources/Books/`, `questions/`). If you add new
top-level exam files or content directories, make sure these collectors pick them up.

`quiz/.env.example` lists required env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`,
`VITE_GITHUB_REPO`/`VITE_GITHUB_BRANCH` (for runtime content fetches), `VITE_GITHUB_TOKEN`.
Server secrets (e.g. `GOOGLE_CLOUD_TTS_API_KEY`, Stripe keys, `ANTHROPIC_API_KEY`) are set
via `supabase secrets set`, never as `VITE_*`.

## Backend (Supabase)

- `supabase/migrations/` — SQL migrations, dated filenames (`YYYYMMDD_description.sql`).
  Recent ones cover: concept mastery, quiz sessions, exam progress, study plan config/cache,
  user subscriptions/gems/cosmetics, beta codes, daily completions, store expansion.
- `supabase/functions/` — Deno edge functions: Stripe checkout/portal/webhook/sync,
  account deletion, beta code redemption, Google Cloud TTS proxy.
- `.github/workflows/deploy-functions.yml` — auto-deploys edge functions to Supabase on
  push to `main` when `supabase/functions/**` changes.

## Deployment

Both the root site and `quiz/` have their own `vercel.json` (root handles `/api/*` CORS
headers for the serverless chat function; `quiz/` rewrites all routes to `index.html` for
the SPA). Deploys to Vercel; Supabase edge functions deploy via the GitHub Action above.

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
