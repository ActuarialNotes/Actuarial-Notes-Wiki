# Web snippets

Standalone HTML/CSS/JS widgets for actuarialnotes.com (the marketing site),
styled to match the quiz app's dark theme and "foil" rainbow-border treatment
but with **no dependency on the app's React/Tailwind build** — each file is a
complete, self-contained HTML document you can open directly in a browser to
preview.

These are not wired into the `quiz/` app and are not imported anywhere in the
repo build. They exist purely as copy/paste source for the marketing site.

## Files

- `rainbow-flip-card.html` — a 3D flip card for a concept (Probability), front
  shows the name, back shows the definition. Animated rainbow foil border,
  same gradient stops (`sky → fuchsia → gold`) as the app's "Level 3" mastery
  cards.
- `mini-quiz.html` — a single multiple-choice probability question ("same
  result in 3 coin flips") with instant right/wrong feedback and an
  explanation panel.
- `concept-level-graph.html` — a New → Level 1 → Level 2 → Level 3 mastery
  ladder with an embedded mini-quiz wired to it: each correct answer levels
  the concept up (with a level-up flourish borrowed from the app's collect
  animation), a miss leaves it where it was.

## How to use

Each file has a clearly marked `COPY START` / `COPY END` block. Everything
inside that block — the markup, its `<style>`, and its `<script>` — is meant
to be pasted as one chunk into a custom-HTML embed block on the site (Webflow
embed, WordPress HTML block, Squarespace code block, etc.). The surrounding
`<html>/<head>/<body>` scaffolding in each file exists only so the snippet
previews correctly when opened on its own; it does not need to travel with
the copy/paste block.

Notes:
- No external requests, fonts, or libraries — everything is inline, so these
  work inside CSP-restricted embed widgets.
- CSS classes are prefixed `an-` and scoped under one wrapper element per
  widget so they're safe to drop next to a site's existing styles; each
  script only queries within its own widget instances, so a snippet can be
  pasted more than once on the same page.
- `concept-level-graph.html`'s question bank and `rainbow-flip-card.html`'s
  front/back text are the easiest things to edit to repurpose these for a
  different concept — see the comments in each file for exactly what to
  change.
- Respects `prefers-reduced-motion` (foil shimmer / flip / level-up flourish
  are disabled for users who've asked for reduced motion).
