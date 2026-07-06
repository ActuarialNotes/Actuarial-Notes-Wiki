# E2E smoke suite (roadmap P0.5)

Playwright specs guarding the critical, signed-out user paths so feature work
and the god-component refactors (P3.1) can't silently break them.

| Spec | Path covered |
|------|--------------|
| `home.spec.ts`   | App boots, sidebar nav renders, no error boundary |
| `wiki.spec.ts`   | Wiki index loads from bundled content; open an exam page |
| `quiz.spec.ts`   | Run a quiz, answer a question, reach the results screen |
| `collect.spec.ts`| Collect a flashcard by passing its comprehension check |
| `store.spec.ts`  | Cosmetics catalog renders and tabs switch |
| `auth.spec.ts`   | Sign-in form renders and toggles to sign-up |

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
