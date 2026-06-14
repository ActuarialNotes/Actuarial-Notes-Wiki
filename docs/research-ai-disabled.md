# Research tab — AI "Ask" disabled (and how to bring it back)

The Research tab was built with two AI assistants layered on top of a markdown
content corpus. As of this change, **all AI is turned off** behind a single
build-time flag so the tab ships as a pure search + source-collection workflow.
This note records what was gated, why nothing was deleted, and the exact steps
to re-enable.

## The switch

`quiz/src/lib/featureFlags.ts`:

```ts
export const RESEARCH_AI_ENABLED: boolean = false   // flip to true to re-enable
```

It's a plain module constant (not an env var) so it tree-shakes and is easy to
grep. The `: boolean` annotation is deliberate — it stops TypeScript from
narrowing the value to a literal, which keeps both branches of every gate
type-checked and stops the compiler/linter from flagging the disabled branch as
dead code.

## What the flag hides

There are two distinct AI surfaces. Both are gated by the one flag.

1. **Page-level "Ask AI"** — the `Sparkles` button in the corpus search bar.
   - UI: `components/research/ResearchTopSearch.tsx` (button), `AiAnswerPanel.tsx` (answer panel).
   - Data: `hooks/useResearchQuery.ts` → `POST /api/research` (`api/research.js`).
   - While off, the search bar is still fully functional as a keyword search
     over `research_documents` + the markdown resource timeline (Books, Events,
     Regulation, Benchmarks). Only the "Ask AI" button and its answer panel are gone.

2. **Project "Ask" / FAQ** — the big "Ask" CTA inside a project, plus the
   FAQ / Research Report / Actuarial Justification views compiled from its answers.
   - UI: `components/research/ProjectFaq.tsx`, `AskDialog.tsx`, `CompiledView.tsx`.
   - Data: `hooks/useProjectQuestions.ts` → `POST /api/research-ask` (`api/research-ask.js`),
     stored in the `research_project_questions` table.
   - While off, a project is a pure **source collection**: its scope (document
     type, jurisdiction, line of business) plus a Sources list you build by
     searching the corpus and adding documents/wiki pages.

3. **"Review agents" (departments)** — an AI-only concept (the lens the
   assistant answers from). Hidden in two places:
   - The badge on the project detail header (`pages/Research/ProjectsView.tsx`).
   - The picker in the Edit-scope dialog (`DepartmentsField` in
     `components/research/EditProjectScopeDialog.tsx`).
   - The stored `departments` value on each project is **left untouched** so it
     returns intact when AI comes back. The New-project wizard never showed a
     departments step, so nothing there needed hiding — it just keeps writing
     the existing defaults.

`SuggestedResources` keeps its `Sparkles` icon and stays visible: despite the
icon, it is **not** AI — it's a deterministic match on the project's
jurisdiction + line of business (`hooks/useSuggestedResources.ts`).

## What was intentionally NOT removed

Nothing AI-related was deleted. Left in place and dormant:

- All the React components/hooks above (gated, not removed).
- The serverless endpoints `api/research.js` and `api/research-ask.js`.
- The `research_project_questions` Supabase table and its rows.

This keeps re-enabling a one-line change and avoids a schema migration.

## Re-enable checklist

1. Set `RESEARCH_AI_ENABLED = true` in `quiz/src/lib/featureFlags.ts`.
2. Confirm the server secret `ANTHROPIC_API_KEY` is set for the deployment that
   serves `api/research*.js` (these proxy to the Anthropic API, same as
   `api/chat.js`).
3. `cd quiz && npm run build` to typecheck, then smoke-test both surfaces:
   - Search bar → "Ask AI" returns a grounded answer with citations.
   - A project → "Ask" writes a question row and renders the FAQ.
4. (Optional) Grep `RESEARCH_AI_ENABLED` to review every gated call site.

## If AI is being removed permanently

If the decision later is to drop AI for good rather than pause it, delete (in
roughly this order): the gated JSX blocks, then the now-unused
components/hooks (`ProjectFaq`, `AskDialog`, `CompiledView`, `AiAnswerPanel`,
`useResearchQuery`, `useProjectQuestions`), the `api/research*.js` endpoints,
the `research_project_questions` table (migration), and finally the flag and
the `departments` field from the project schema. Until then, the flag is the
single source of truth.
