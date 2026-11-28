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
| `flashcard-focus.spec.ts` | A revealed flashcard taller than a phone scrolls in focus mode (entered from More), and the backdrop still exits; the Deck popup lists the cards and goes to one; the foot is Previous, Practice this, Next |
| `quiz-format.spec.ts` | Practice's home: a pill opens the setup popup (topics, difficulty, switches), the count steps and is typed, Start launches, a past paper opens its popup and is sat whole, a paper already sat shows its bar, a Practice Exam, Sample questions, and the page opening on the exam last practised |
| `question-search.spec.ts` | The one search: tabs with counts, a question's Info from its row, and Practice these N launching a quiz |
| `collect.spec.ts`| Read a New concept from the pre-quiz list, answer it right, and collect its card |
| `tour.spec.ts`   | Onboarding tour: corner launcher, guided steps, minimize/resume, dismiss |
| `store.spec.ts`  | The Store's aisles render, the exam strip and aisle pills narrow them, a product sheet's button goes out to the seller in a new tab, and the Gem Shop's catalog renders at `/store/gems` (the old `/store?tab=` links sent on to it) |
| `auth.spec.ts`   | Sign-in form renders and toggles to sign-up |
| `battle.spec.ts` | Quiz Battle: a same-screen battle played to the end (buzz, miss, steal, results, rematch), an online battle between two pages over BroadcastChannel (`VITE_BATTLE_TRANSPORT=local`), the empty matchmaking lobby said so, and two strangers matched from the lobby into a battle and back |
| `written-answers.spec.ts` | Analytics' Written answers (Pro, Exam 5): points kept by kind of part and command word, a word opening the parts it lost with each attempt and the examiners' sentences, and Practice this question |

## Writing a spec

Import `test` and `expect` from `./test`, not from `@playwright/test`. It is
Playwright's own `test`, with one change: every `page.goto` and `page.reload`
waits for the first-load screen (`#boot` in `index.html`) to lift. That screen
covers the page above everything for a moment after the load event, so a press
made by coordinates (`page.mouse`) before it lifts lands on the screen and
does nothing.

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
