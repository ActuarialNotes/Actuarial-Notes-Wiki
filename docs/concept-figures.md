# Concept Figures

Every concept linked from `Exam P-1 (SOA).md` and `Exam FM-2 (SOA).md` carries one
figure that makes the idea visible — a Venn diagram, a payment timeline, an annotated
density, a price–yield curve. They live in `Media/Figures/*.svg` and are embedded near
the top of each `Concepts/*.md` page, after the definition and formula block and before
the first `> [!example]` callout.

The figures are **generated, not hand-drawn**. Re-run the generator rather than editing
an SVG by hand — a hand edit will be overwritten on the next run.

```bash
python3 scripts/generate_concept_figures.py            # write the SVGs
python3 scripts/generate_concept_figures.py --embed    # ...and insert missing embeds
python3 scripts/generate_concept_figures.py --check    # which exam concepts lack one
python3 scripts/generate_concept_figures.py --only "Covariance"   # just one
```

`--embed` skips any page that already contains an `![[...]]`, so it is safe to re-run
and it never disturbs the hand-authored embeds (Bayes' theorem, the Venn diagram, the
distribution plots that the simulator replaces).

## Modules

| File | Role |
|---|---|
| `scripts/figure_kit.py` | The SVG toolkit: canvas, cartesian `Axes`, timelines, cash-flow arrows, Venn helpers, palette and stylesheet. No dependencies — pure Python. |
| `scripts/figure_registry.py` | The `@figure(concept, alt, width)` decorator and the registry it fills. |
| `scripts/figures_exam_p.py` | The 52 Exam P builders, in syllabus order. |
| `scripts/figures_exam_fm.py` | The 81 Exam FM builders, in syllabus order. |
| `scripts/generate_concept_figures.py` | Walks the registry, writes the SVGs, optionally embeds them. |

## Why hand-written SVG and not matplotlib

`scripts/generate_illustrations.py` (the older script that produced the distribution
plots) uses matplotlib. These figures do not, for three reasons:

1. **Theme.** The quiz app defaults to a **dark** canvas, while the vault is also read in
   Obsidian, on GitHub, and on the published light site. An embed becomes
   `<img src="…svg">`, and an image cannot inherit the app's CSS variables — so each
   figure carries its own palette: a light default plus a
   `@media (prefers-color-scheme: dark)` override. The matplotlib SVGs, which are dark
   ink on a transparent background, are close to invisible on the app's default theme.
2. **Diagrams, not plots.** Most of this material is timelines, Venn diagrams, step
   functions and stacked bars, which matplotlib is a poor fit for.
3. **Size.** A hand-written figure is ~6 KB; the equivalent matplotlib output is ~40 KB.

Only the neutrals (`--surf`, `--ink`, `--dim`, `--edge`, `--soft`, `--axis`) swap by
theme. The series colours are fixed hexes chosen to stay legible against both the light
surface and the dark one, so a blue curve is the same blue in either mode.

## Adding or changing a figure

1. Write a builder in `figures_exam_p.py` or `figures_exam_fm.py` that returns a `Fig`,
   and decorate it with `@figure("Concept Name", "alt text", width=520)`. The concept
   name must match `Concepts/<name>.md` exactly; the slug is derived from it.
2. Run the generator and look at the result — the fastest check is to open the SVG
   directly, in both light and dark, before committing.
3. `--check` exits non-zero while any exam concept still lacks a figure.

Conventions worth keeping:

- **One idea per figure.** A plot on the left, three or four annotated lines on the
  right; or a timeline across the top and a footer rule with the formulas beneath.
- **Real numbers.** Where a worked value fits (an annuity factor, a bond price, a
  posterior probability), use one — a labelled example teaches more than a generic curve.
- **Consistent examples across a family.** The loan pages all draw the same 10,000 loan
  at 8% over 8 years; the bond pages the same 1,000 par bond; the discrete multivariate
  pages the same 3×3 joint PMF. A student reading them in sequence sees one running
  example from several angles.
- **Stay inside the card.** Text anchored `start` near x = 340 or `end` near x = 520 will
  run off the 560-unit canvas surprisingly easily. Check, don't assume.

## Interaction with the distribution simulators

The named distribution pages (normal, Poisson, gamma, …) already embed
`Media/*_pdf.svg` / `*_pmf.svg`, which `components/wiki/WikiArticle.tsx` swaps for a live
`DistributionSimulator` — see `docs/distribution-simulators.md`. Those pages are
untouched here: they already had an embed, so `--embed` skips them, and no generated
slug collides with a filename in `DISTRIBUTION_IMAGES`.
