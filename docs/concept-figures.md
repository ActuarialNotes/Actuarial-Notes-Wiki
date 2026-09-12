# Concept Figures

Every concept linked from `Exam P-1 (SOA).md`, `Exam FM-2 (SOA).md`,
`Exam MAS-I (CAS).md`, `Exam MAS-II (CAS).md`, `Exam 5 (CAS).md` and `Exam 6C (CAS).md`
carries one figure
that makes the idea visible — a Venn diagram, a payment timeline, an annotated density,
a rejection region, a correlogram, a loss triangle, a jurisdictional split, a capital
waterfall. They live in `Media/Figures/*.svg`
and are embedded near the top of each `Concepts/*.md` page, after the definition and
formula block and before the first `> [!example]` callout.

A concept on two syllabuses gets **one** builder, in the file for the exam that
introduces it — MAS-I owns the thirteen it shares with MAS-II (`AIC`, `Cross-Validation`,
`Linear Mixed Model`, …) and the five it shares with Exam 5 (`Frequency`, `Severity`,
`Complement of Credibility`, `Generalized Linear Model`, `Inflation`); 6C's 135 concepts
happen to overlap none of the earlier exams'. Two builders for
one concept would fight over the same slug, and `generate_concept_figures.py` prints a
warning when it sees that.

The figures are **generated, not hand-drawn**. Re-run the generator rather than editing
an SVG by hand — a hand edit will be overwritten on the next run.

## The card

Every figure is the same **portrait card**, 360 × 470, built by `figure_kit.vcard()`,
and carries exactly three things:

1. a **title** — one line of plain English, wrapped to at most two lines;
2. the **picture**, drawn into the fixed box `(20, 66)–(340, 392)`;
3. one **formula** in the footer, with an optional second line for an equivalent form
   (`Var(X) = E[(X − μ)²]` / `= E[X²] − μ²`).

Nothing else. The annotation columns, worked tallies and "worth remembering" asides
that these figures used to carry belong on the concept page, not inside the image — a
figure is read at a glance, and at phone size a paragraph inside it is unreadable
anyway. Labels *inside* the picture are fine when they are needed to read it (axis
names, which curve is which, a marked value); a legend box or a stack of prose lines is
not.

The card is portrait because that is the shape of the space it is shown in: the
full-screen figure viewer on a phone, and the figure banner at the top of the concept
popup.

```bash
python3 scripts/generate_concept_figures.py            # write the SVGs
python3 scripts/generate_concept_figures.py --embed    # ...and insert missing embeds
python3 scripts/generate_concept_figures.py --check    # which exam concepts lack one
python3 scripts/generate_concept_figures.py --only "Covariance"   # just one
```

`--embed` skips any page that already contains an `![[...]]`, so it is safe to re-run
and it never disturbs the one remaining set of hand-authored embeds — the
`Media/*_pdf.svg` / `*_pmf.svg` distribution plots that the simulator replaces. Those
plots are the one exception to the skip: a page whose *only* embed is a simulator plot
still gets its figure, inserted below the plot (`SIMULATOR_EMBEDS` /
`has_figure_embed()` in the generator).

## Modules

| File | Role |
|---|---|
| `scripts/figure_kit.py` | The SVG toolkit: the `vcard()` portrait card, cartesian `Axes` (`vaxes()` insets one into the card's box), timelines, cash-flow arrows, Venn helpers, palette and stylesheet. No dependencies — pure Python. |
| `scripts/figure_registry.py` | The `@figure(concept, alt, width)` decorator and the registry it fills. |
| `scripts/figures_exam_p.py` | The 66 Exam P builders, in syllabus order. |
| `scripts/figures_exam_fm.py` | The 82 Exam FM builders, in syllabus order. |
| `scripts/figures_exam_mas_i.py` | The 77 Exam MAS-I builders, in syllabus order. |
| `scripts/figures_exam_mas_ii.py` | The 71 Exam MAS-II builders, in syllabus order (credibility, mixed models, statistical learning, time series). |
| `scripts/figures_exam_5.py` | The 109 Exam 5 builders, in syllabus order (ratemaking, then estimating claim liabilities). |
| `scripts/figures_exam_6c.py` | The 135 Exam 6C builders, in syllabus order (Canadian regulation and law, government and industry programs, financial reporting and solvency). |
| `scripts/generate_concept_figures.py` | Walks the registry, writes the SVGs, optionally embeds them. |

## Why hand-written SVG and not matplotlib

`scripts/generate_illustrations.py` (the older script, now down to the distribution
plots the simulator replaces) uses matplotlib. These figures do not, for three
reasons:

1. **Theme.** The quiz app defaults to a **dark** canvas, while the vault is also read in
   Obsidian, on GitHub, and on the published light site. An embed becomes
   `<img src="…svg">`, and an image cannot inherit the app's CSS variables — so each
   figure carries both palettes and two ways to choose between them (see
   *Which theme a figure picks* below). The matplotlib SVGs, which are dark
   ink on a transparent background, are close to invisible on the app's default theme.
2. **Diagrams, not plots.** Most of this material is timelines, Venn diagrams, step
   functions and stacked bars, which matplotlib is a poor fit for.
3. **Size.** A hand-written figure is ~6 KB; the equivalent matplotlib output is ~40 KB.

Only the neutrals (`--surf`, `--ink`, `--dim`, `--edge`, `--grid`, `--soft`, `--axis`)
swap by theme. The series colours are fixed hexes and stay put, so a blue curve is the
same blue in either mode; each clears 3:1 — the WCAG bar for a graphical object — against
both surfaces.

### The neutrals are the app's tokens

They are not a palette of the figures' own: every one is a value from
`quiz/src/index.css`, transcribed as hex. The app's scheme is achromatic
(`0 0% L%` throughout), so the transcription is exact rather than a match by eye, and
`scripts/test_figure_kit.py` asserts it — a token that moves in `index.css` fails that
test until `figure_kit.py` moves with it and the figures are regenerated.

| Figure variable | App token | |
|---|---|---|
| `--surf` | `--card` | the figure's own rounded card |
| `--edge` | `--border` | its hairline |
| `--ink` | `--foreground` | titles, labels, the formula |
| `--dim` | `--muted-foreground` | captions and secondary labels |
| `--grid` | `--accent` | plot gridlines |
| `--soft` | `--muted` | shaded regions |
| `--axis` | `--input` | axes, ticks, arrowheads |

Because `--surf` *is* `--card`, a figure sits on a concept page as one surface with the
card behind it, and its `--edge` is the same hairline the app draws elsewhere. That is
why the concept popup's figure button adds no border of its own
(`components/wiki/ConceptImageBanner.tsx`) — the figure already has one, and two of them
8px apart read as a box inside a box. A photograph or screenshot the vault embeds
instead has no edge of its own and still gets one.

### Which theme a figure picks

A figure holds both palettes and decides between them in one of two ways:

- **On its own** — in Obsidian, on GitHub, opened as a file — from the reader's OS, via
  `@media (prefers-color-scheme: dark)`.
- **In the app**, from a `#dark` / `#light` fragment the host puts on the embed URL,
  which overrides the media query through a `:target` rule.

The second exists because the OS is the wrong signal inside the app. The theme there is
a toggle that defaults to dark and never consults `prefers-color-scheme` (`useTheme`, a
`.dark` class on `<html>`), so the common case — an OS-light reader on the default dark
app — used to render a white figure on a black card. A fragment is the only channel
available: an `<img>` renders its SVG as an isolated document with no script and no view
of the host, so the `.dark` class and the app's custom properties are unreachable from
inside it.

`quiz/src/lib/figureTheme.ts` is the app half — it appends the fragment, and only to
`Media/Figures/*.svg`, since nothing else carries a second palette. A host that passes
no fragment falls back to the media query, so the figures stay self-contained
everywhere else.

Two structural rules in `figure_kit.py` make this work, and a `:target` figure breaks
quietly without them: the two anchor `<g>` elements must come **before** both `<defs>`
and the drawing (the rules reach forward with a sibling combinator), and `<defs>` must
be among what they reach — a marker takes its custom properties from where it is
defined, not from the element referencing it, so an arrowhead would otherwise keep the
media query's colour while the rest of the figure switched.

## Adding or changing a figure

1. Write a builder in `figures_exam_p.py`, `figures_exam_fm.py`,
   `figures_exam_mas_i.py`, `figures_exam_mas_ii.py`, `figures_exam_5.py` or
   `figures_exam_6c.py` that opens with
   `vcard(title, formula)` and draws into the box, and decorate it with
   `@figure("Concept Name", "alt text", width=WID)`. The concept name must match
   `Concepts/<name>.md` exactly; the slug is derived from it.
2. Run the generator and look at the result — the fastest check is to open the SVG
   directly, in both light and dark, before committing. Opening the file plain follows
   your OS setting; append `#dark` or `#light` to the URL to see what the app will show.
   `python3 -m unittest scripts.test_figure_kit` re-checks the palette and its contrast.
3. `--check` exits non-zero while any exam concept still lacks a figure.
   `--embed` inserts a missing embed and rewrites the width of an existing one, so a
   change of canvas size reaches the pages too.

Conventions worth keeping:

- **A structure is a picture too.** 6C is a qualitative exam, so most of its figures are
  shapes rather than plots — a jurisdictional split, a hierarchy of layers, a ladder of
  thresholds, a decision tree, a waterfall. The rule is unchanged: one idea, drawn, with
  labels only where the picture needs them to be read.
- **One idea per figure**, and one formula under it. If a second idea needs saying, it
  belongs in the page's prose.
- **Real numbers.** Where a worked value fits (an annuity factor, a bond price, a
  posterior probability), use one — a labelled example teaches more than a generic curve.
- **Consistent examples across a family.** The loan pages all draw the same 10,000 loan
  at 8% over 8 years; the bond pages the same 1,000 par bond; the discrete multivariate
  pages the same 3×3 joint PMF. On MAS-II the credibility pages all price the same
  300-claim class against a 1,082-claim standard, the mixed-model pages use the same five
  territories, and the time-series pages draw the same quarterly loss index. Exam 5 runs
  on two: one personal-auto book (pure premium 360, fixed expense 25, V = 26%, Q = 5%, so
  PLR = 0.69 and the indication is +7.3% on a 520 average rate) across every ratemaking
  figure, and one 5×5 reported triangle (factors 1.500 / 1.160 / 1.060 / 1.020, tail
  1.010, so CDF(12) = 1.900) across every reserving figure — the same AY 2024 turns up
  as 2,600 under the expected loss method, 2,732 under BF, 2,794 under Benktander and
  2,850 under the chain ladder. 6C runs on three: one insurer's solvency position
  (capital available $248M against insurance, market, credit and operational margins of
  $92M, $54M, $21M and $17M less a $26M diversification credit, so capital required is
  $158M, the base solvency buffer $237M and the MCT ratio 104.6% — above the minimum and
  far below the supervisory target), the same company's statements ($1,240M of assets,
  $980M of liabilities, $260M of equity, a $38M insurance service result and $39M of net
  income), and two IFRS 17 groups — a PAA book of annual policies written 1 July for $24M
  with $4.8M of acquisition cash flows (LRC $9.6M at 31 December against $11.5M of
  fulfilment cash flows, so a $1.9M loss component) and a GMM group whose $60M of premium
  less $44M of outflows and a $5M risk adjustment opens a CSM of $11M released over
  coverage units of 40% / 35% / 25%. A student reading them in sequence sees one running
  example from several angles.
- **Label curves where they run**, rather than in a legend box, when there is room —
  a legend is a block of text competing with the picture. Where a legend is
  unavoidable, drop the y-axis name: the two collide in the box's top-left corner.
- **Stay inside the card.** Text anchored `start` near x = 300, or an axis label under a
  plot whose x-axis sits mid-box (any plot with negative values), runs off or lands on
  top of something surprisingly easily. Check, don't assume. Two recurring collisions:
  `Axes.frame(xlabel=…)` draws at `y1 + 32`, which is exactly where a first footer line
  wants to sit — pass the axis name as a footer line instead; and a footer formula over
  ~40 characters is clipped by the card edge, so shorten it or split it into the two-row
  form `vcard(title, [row1, row2])`. Character counting only approximates this: the real
  check is to measure the rendered `getBBox()` of every `<text>` in a headless browser
  and flag any that escapes the 360 × 470 card or overlaps another — that catches both
  the clipped footer and the label sitting on top of its neighbour.

## Interaction with the distribution simulators

The ten named distribution pages (normal, Poisson, gamma, …) also embed
`Media/*_pdf.svg` / `*_pmf.svg`, which `components/wiki/WikiArticle.tsx` swaps for a live
`DistributionSimulator` — see `docs/distribution-simulators.md`. They carry **both**: the
simulator embed first, then the generated figure directly under it. The simulator is a
control to play with, the figure is a picture to read, and a distribution concept should
not be the one concept in the vault with no picture.

That means the two must stay out of each other's way:

- The generator's skip rule ignores a simulator plot (`SIMULATOR_EMBEDS` above), so
  `--embed` inserts the figure below it instead of treating the page as done.
- No generated slug may collide with a filename in `DISTRIBUTION_IMAGES` — a collision
  would turn the *figure* into a second simulator. The capitalised concept slugs
  (`Poisson_Distribution.svg`) and the lower-case plot names (`Poisson_pmf.svg`) keep
  clear of each other.
- The figure must not simply redraw what the simulator already draws live. Each of these
  ten shows the *mechanism* instead — the trials behind a binomial count, the exponential
  waits that add to a gamma, the z ruler under a normal — so the pair says something the
  simulator alone cannot.
