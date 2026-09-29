# E2E smoke suite (roadmap P0.5)

Playwright specs guarding the critical, signed-out user paths so feature work
and the god-component refactors (P3.1) can't silently break them.

| Spec | Path covered |
|------|--------------|
| `home.spec.ts`   | App boots, sidebar nav renders, no error boundary |
| `wiki.spec.ts`   | Wiki index loads from bundled content; open an exam page |
| `quiz.spec.ts`   | Run a quiz, answer a question, reach the results screen; an open answer and its self-grade don't carry into the next question |
| `quiz-resume.spec.ts` | Leave a timed quiz mid-way: the Return to quiz pill follows the reader, Return resumes the same answered question, Leave discards it, and Quit leaves no pill behind |
| `code-block.spec.ts` | Console output in a question stem scrolls inside its panel on a phone |
| `flashcard-focus.spec.ts` | A revealed flashcard taller than a phone scrolls in focus mode, and the backdrop still exits |
| `collect.spec.ts`| Read a New concept from the pre-quiz list, answer it right, and collect its card |
| `tour.spec.ts`   | Onboarding tour: corner launcher, guided steps, minimize/resume, dismiss |
| `store.spec.ts`  | Cosmetics catalog renders and tabs switch |
| `auth.spec.ts`   | Sign-in form renders and toggles to sign-up |
| `actuaria.spec.ts` | Actuaria Online (the e2e build turns `VITE_ACTUARIA_PREVIEW` on): the dark scope, title, keyboard map, sector and landmark popup, Daily Transmission, the hub card, the sidebar row and the Hangar loadout |
| `actuaria-cohort.spec.ts` | Actuaria's cohorts and raid, **signed in** against a stubbed backend (`fixtures/signedIn.ts`): start a cohort, its pool and members, a nudge, the raid screen, a run at the boss marked by `/api/raid`, and the boss on the map |
| `battle.spec.ts` | Quiz Battle: a same-screen battle played to the end (buzz, miss, steal, results, rematch), an online battle between two pages over BroadcastChannel (`VITE_BATTLE_TRANSPORT=local`), the empty matchmaking lobby said so, and two strangers matched from the lobby into a battle and back |

## Running

```bash
npm run test:e2e        # headless, builds + previews automatically
npm run test:e2e:ui     # Playwright UI mode
```

`playwright.config.ts`'s `webServer` runs `npm run build && npm run preview`, so
the suite always exercises a production build of the bundled markdown content.

## Why no backend

Every asserted flow works from a fresh, **signed-out** browser: questions and
wiki pages are bundled at build time, and mastery/collection fall back to
`localStorage`. Supabase throws at import without env vars, so the config injects
inert placeholders — they never receive a real request. This keeps the suite
hermetic and secret-free in CI.
