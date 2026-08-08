# Web snippets

Standalone HTML/CSS/JS widgets for actuarialnotes.com (the marketing site),
styled to match the quiz app but with **no dependency on the app's
React/Tailwind build** — each file is a complete, self-contained HTML document
you can open directly in a browser to preview.

These are not wired into the `quiz/` app and are not imported anywhere in the
repo build. They exist purely as copy/paste source for the marketing site.

## Files

- `rainbow-flip-card.html` — a 3D flip card for a concept (Probability): front
  shows just the concept name, back shows the definition and formula. Animated
  rainbow foil border using the same gradient stops (`sky → fuchsia → gold`) as
  the app's Level 3 mastery cards.
- `mini-quiz.html` — a single multiple-choice probability question ("same
  result in 3 coin flips") with instant right/wrong feedback and an
  explanation panel.
- `study-guide-radial.html` — the Dashboard's **Study Guide radial**, ported to
  plain SVG: one wedge per syllabus concept, sized by its section's exam
  weight, coloured by mastery level (green ladder for ordinary concepts, gold
  for keystones), with topic dividers, curved section labels and the readiness
  % in the middle. Hover or tap a wedge to read it out in the centre.

  The geometry, palette and score are copied from the app so the marketing
  site and the product agree — `StudyGuideRadial` in
  `quiz/src/components/ReadinessCard.tsx`, `quiz/src/lib/masteryFill.ts`, and
  `quiz/src/lib/readiness.ts` (syllabus coverage 60% + keystone concepts 40%).
  Note this means it's a *port*, not a shared module: if the app's radial
  changes, this file has to be updated by hand.

## How to use

Each file has a clearly marked `COPY START` / `COPY END` block. Everything
inside that block — the markup, its `<style>`, and its `<script>` — is meant
to be pasted as one chunk into a custom-HTML embed block on the site (Webflow
embed, WordPress HTML block, Squarespace code block, etc.). The surrounding
`<html>/<head>/<body>` scaffolding exists only so the snippet previews
correctly on its own and does not need to travel with the copy/paste block.

### Sizing

Every widget fills the width of whatever column it's dropped into, up to a cap
you can change with one CSS variable on the wrapper:

| Snippet | Variable | Default |
| --- | --- | --- |
| `rainbow-flip-card.html` | `--an-card-max` | `260px` |
| `study-guide-radial.html` | `--an-radial-max` | `300px` |
| `mini-quiz.html` | `max-width` on `.an-quiz` | `420px` |

The flip card keeps a 3:4 card shape and scales its own type with the card
width (container query units), so it stays proportional in a narrow column
instead of overflowing. Its back face scrolls rather than clipping if the
column gets small enough that a long definition can't fit.

### Playing nicely with the site's own CSS

These are built to be dropped into a page that already has global styles:

- All markup uses `<div>`/`<span>`, never bare `h3`/`h4`/`p`, so the site's
  heading and paragraph styles have nothing to latch onto.
- Every rule is scoped under the widget's wrapper (`.an-flip-wrap`,
  `.an-quiz`, `.an-radial`), which outranks typical single-class or element
  selectors.
- Font size and colour are set explicitly on each text element rather than
  left to inherit — a host rule like `div { color: … }` or `span { font-size:
  … }` targets those elements *directly*, and a direct rule always beats an
  inherited value. (This was a real bug caught in testing, not a theoretical
  one.)

The one thing that can still override them is a host rule using `!important`.
If something looks wrong after pasting, check for `!important` in the site's
stylesheet and add `!important` to the matching line in the snippet.

### Other notes

- No external requests, fonts, or libraries — everything is inline, so these
  work inside CSP-restricted embed widgets.
- Each script only queries within its own widget instances and marks them as
  bound, so a snippet can safely be pasted more than once on the same page.
- Respects `prefers-reduced-motion` (foil shimmer, flip, and wedge hover
  transitions are disabled for users who've asked for reduced motion).
- The radial ships with demo data for Exam P — edit `SYLLABUS`, `KEYSTONES`
  and `STATES` near the bottom of its `<script>` to show a different exam or a
  different level of progress. The readiness % is computed from that data, so
  it stays honest whatever you set.
