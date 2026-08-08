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

**Paste from `embed/`, not from this directory.**

```
web-snippets/embed/*.html   ← paste these (widget only, nothing else)
web-snippets/*.html         ← open these in a browser to preview
```

Each file in `embed/` contains only the widget — markup, its `<style>` and its
`<script>`, and nothing more. Select all, copy, paste into your CMS block
(Elementor **HTML** widget, WordPress Custom HTML, Webflow embed, Squarespace
code block). There is nothing to trim.

The files in this directory are *preview pages*: complete standalone documents
that wrap the widget in demo scaffolding — a mock 3-column hero row — so you
can see how it behaves in a realistic layout. **Do not paste a preview page
into your site.** Its demo columns will render on top of your real ones and
squeeze the widget into a fraction of its intended width.

Put each widget in its own CMS block so the builder's own spacing controls
apply between them.

### Regenerating the embed files

`embed/` is generated from the `COPY START` / `COPY END` block of each preview
file. After editing a preview file, re-run:

```bash
python3 web-snippets/build-embeds.py
```

Edit the preview files, never `embed/` — hand edits there are overwritten.

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

### Keep the flip card boring

The flip card previewed correctly in Elementor and then rendered as **nothing
at all** on the published page. It took three attempts to fix because each
one guessed at a different culprit and patched only that.

What actually settled it was comparing feature usage across the three
snippets. `mini-quiz` and `study-guide-radial` published correctly every time;
the flip card was the *only* one using `aspect-ratio`, `container-type`/`cqw`,
`clamp()`, 3D transforms (`perspective`, `preserve-3d`,
`backface-visibility`), and an unguarded `mask-composite` ring. Rather than
keep bisecting which of those broke on the live site, the card was rebuilt
from the same plain vocabulary the two working snippets use.

The rules that keep it safe, in rough order of importance:

1. **The front face is in normal flow**, so the card's height is real content
   height. Nothing derives height from width. This is the big one: everything
   inside the old card was absolutely positioned, so its height rested
   entirely on one declaration, and losing that made the whole widget 0px tall
   and invisible.
2. **Plain px sizing.** No container queries, no `clamp()`. `cqw` is
   particularly treacherous here: with no container context it stays *valid*
   CSS but resolves against the viewport, so `8cqw` became ~94px of padding
   and no fallback could ever catch it.
3. **The flip is an opacity cross-fade, not a 3D transform** — which also
   matches what the app actually does (`CollectCard3D.tsx`: "a cross-fade
   between panes, not a 3D flip").
4. **The gradient ring is an enhancement inside `@supports`**, with a plain
   2px border as the base. Unguarded, a dropped `mask-composite` turns that
   ring into a solid gradient block covering the card's text.

The property worth preserving: there is now no failure mode that renders
nothing. Strip the snippet's CSS entirely and you still get readable text.
If you want the 3D flip back, add it as an enhancement — just don't make the
card's size depend on it.

### Surviving a page builder's re-renders

Elementor's live editor re-renders a widget after its script has already run,
and AJAX page loads can inject one later still. Either would silently kill
handlers that were bound to individual elements, leaving a card that won't
flip or buttons that do nothing on a page that looks fine.

So the flip card and the quiz attach a **single delegated listener to the
document** and read their state back out of the DOM — nothing is bound
per-element, so replacing the markup changes nothing. The radial draws itself
and can't work that way, so it re-scans on a debounced `MutationObserver`
(at most one scan per frame) and redraws if it finds an undrawn instance.

All three are guarded so they stay correct when pasted more than once, and
when the same script runs more than once on a page.

### Other notes

- No external requests, fonts, or libraries — everything is inline, so these
  work inside CSP-restricted embed widgets.
- Respects `prefers-reduced-motion` (foil shimmer, flip, and wedge hover
  transitions are disabled for users who've asked for reduced motion).
- The radial ships with demo data for Exam P — edit `SYLLABUS`, `KEYSTONES`
  and `STATES` near the bottom of its `<script>` to show a different exam or a
  different level of progress. The readiness % is computed from that data, so
  it stays honest whatever you set.
