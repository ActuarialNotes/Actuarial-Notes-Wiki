# Resource Covers

Every page in `Resources/Books/` shows a cover in its metadata card
(`quiz/src/components/wiki/ResourceMetaCard.tsx`) — on the resource page itself, in
the concept popup, and anywhere a source is listed. The card takes that image from
the **first image embed in the page body**, resolved by `parseResourceMeta` in
`quiz/src/lib/resourceMeta.ts` and then lifted out of the body by
`stripFirstCoverImage`, so the picture is never rendered twice.

The card is built to survive a missing cover — the column drops out and the
metadata closes up — but a shelf of sources with no pictures is much harder to scan
than one with them, so every page carries one.

**A cover is not a figure.** Because the jacket is lifted out of the body and shown
as the card's picture, it must not also be counted among the page's figures — a book
whose only embed is its cover would otherwise open in the concept popup behind a
"Show figure" strip that reveals the cover a second time. `ConceptPagePanel` reads a
resource page's images off the same `preprocessResourceMarkdown` output the article
renders, so the figure banner, its Previous/Next pager and the gallery walk all agree
with what is actually on the page.

## What the card shows

The card is the resource page's title block, on the page and in the concept popup
alike: the jacket, then a muted kicker naming the *kind* of source (`Type`), the
authored `Title`, the byline, the bibliographic facts as outline chips
(`Edition`, `Year`, `Publisher`, `Code`, `ISBN` — in that order, reading like a
citation with the identifiers last), and the one action the page offers.

It carries the title on both surfaces. The popup header above it shows the vault's
*filename* — "Introduction to Mathematical Statistics (Hogg et al. - 2018)" — which
is not the authored title, so the card is not repeating the chrome.

Two things about the shape are deliberate: the chips are outlined and the action
button filled, so the passive facts never read as things to press; and the card is
sized to its content (`w-fit`) rather than stretched across the pane, because a
citation block with a third of its width empty reads as a layout bug.

## Real jackets win, always

A scanned or publisher-supplied jacket is the better picture. Eleven of the thirty
pages have one — the ACTEX and ActuarialBrew financial-mathematics texts, Leemis,
Vaaler, Broverman, Wackerly, Hogg's *Probability and Statistical Inference*,
Asimow, Hassett, the SOA's *Risk and Insurance* — and they are left exactly as they
are. The other nineteen get a drawn one.

To replace a generated cover with a real one:

1. drop the image into `Media/Attachments/` under any name that does **not** end in
   `- Cover.svg` (that suffix is the generator's; it will redraw anything using it);
2. point the page's embed at it — `![[My Book - Cover.jpg]]`;
3. delete the orphaned `… - Cover.svg`.

`generate_resource_covers.py` skips any page whose first embed it does not own, so the
real cover survives every future run.

**The rule cuts both ways, so don't export a generated cover.** *A First Course in
Probability* showed a PNG that was a generated jacket rasterised under a name the
generator does not own — which froze it out of every redraw, including
the one that produced the design below. A generated cover stays the SVG the script
writes; only a genuine jacket earns a name of its own.

## The generated cover

Everything else is drawn by `scripts/generate_resource_covers.py` on top of
`scripts/cover_kit.py` (the SVG toolkit, the text metrics and the publisher
liveries) and `scripts/cover_motifs.py` (the subject drawings) — the same
dependency-free, hand-written-SVG approach `generate_concept_figures.py` takes, for
the same reasons (no matplotlib, ~3 KB a file, and `raw.githubusercontent.com`
serves `.svg` as `image/svg+xml`, so an `<img src>` renders it).

### The shape: a band of colour over paper

The jacket is two-tone. The top 236 px is a band of the publisher's colour carrying
a drawing of the subject; everything below is paper with the title set large in
black, the byline under it, and the citation on a hairline at the foot.

Three things follow from that split, and they are the design:

- **The band says whose it is, before anything is legible.** Colour is keyed off
  `Publisher`, so a shelf of CAS study notes is one navy-and-gold series and the
  ASOPs another. See the `JACKETS` table.
- **The drawing says what it is about.** At the 64–112 px the metadata card renders
  a cover at, a title is a grey smudge and a picture is not — so the band carries
  one, cropped by its own edge rather than fitted inside it.
- **The paper says what it is.** Black on off-white is the most readable thing the
  format allows, and it makes the jacket the brightest object on the Resources page.
  That is deliberate: on the app's dark canvas, a shelf of pale objects reads as a
  shelf, where a shelf of dark ones reads as more chrome.

Unlike a concept figure, a cover **does not follow the theme**. A figure ships a
`prefers-color-scheme` override because it has to stay legible on the app's dark
canvas and the light published site alike; a cover is a picture of an object, and a
real jacket does not invert when the room lights go off. The palette is fixed.

### The subject drawings

`cover_motifs.py` holds nine, matched against the title and kind by `subject_for` —
first pattern wins, so the specific ones come first (an unpaid-claims *standard* is
a triangle before it is a shield):

| Motif | What it draws | Matches |
| --- | --- | --- |
| `triangle` | a development triangle, stepping down | unpaid claims, reserving, ratemaking, principles, nonlife |
| `regression` | a bold trend and the points fitted through it | GLMs, linear/mixed models, statistical learning |
| `wave` | a thick band oscillating across the block | time series |
| `survival` | a quarter disc falling away to the right | life contingencies, survival, mortality |
| `arrivals` | bars stepping up, one mark per arrival | Poisson, stochastic processes |
| `compounding` | a quarter disc sweeping up out of the corner | interest theory, financial mathematics, annuities |
| `bell` | a density with its right tail cut lighter | probability, statistics, distributions |
| `shield` | a shield with its tick cut out | ASOPs and other standards |
| `lattice` | a grid of points and one disc | the fallback, when nothing else fits |

Two marks run through all nine — an outline ring at the left and a stripe near the
band's foot — so nine drawings still read as one series. Add a motif by writing a
function in `cover_motifs.py` and a pattern in `SUBJECTS`; a source that matches
nothing gets `lattice` rather than a blank band.

### What comes from the front matter

| Front matter | On the cover |
| --- | --- |
| `Title` | the title, set large in black; the part after `: ` drops to a smaller line beneath |
| `Type` (or a `Study Note` / `Monograph` prefix on `Edition`) | the small caps in the band; defaults to `Textbook` |
| `Authors` / `Author` | the byline, shortened to surnames |
| `Publisher` | the imprint at the foot, **the band colour**, and the accent |
| `Code`, `Edition`, `Year` | the citation at the foot right — `ASOP No. 43 · 2007`, `5th ed. · 2016` |

Three of those rows are worth spelling out:

- **The title is de-duplicated.** `ASOP No. 12 — Risk Classification` sets the code in
  the citation and the rest as the title; `Probability Distributions — Reference
  Sheet` drops the trailing type, which the small caps already say. A trailing
  parenthetical goes too — *Risk Classification (for All Practice Areas)* wraps to
  four lines at cover size, and the qualifier is the half nobody scans a shelf by.
- **The byline is surnames.** `Hogg, R.V., McKean, J.W., and Craig, A.T.` becomes
  *Hogg, McKean & Craig*, and four or more authors become *Goldburd et al.* The full
  citation is still in the front matter, and the card beside the jacket prints it.
  A body rather than a person — the CAS, the ASB, the vault's own reference sheets —
  is never reduced to a surname, and is dropped entirely when the imprint line is
  about to name it anyway (the same rule `ResourceMetaCard` applies to its publisher
  chip).
- **The colour is the publisher's, not the page's.** An unrecognised publisher gets
  the neutral slate default — add a row to `JACKETS` rather than letting a house
  drift.

### The type is measured, not estimated

Text is laid out without a font engine, so every wrap decision rests on a width
estimate — and a cover that mis-guesses sets its title two steps too large and runs
it off the edge of the jacket, which is exactly what *Property/Casualty Unpaid Claim
Estimates* used to do. `cover_kit` therefore carries the **real** per-character
advances of the cover font stack (`REGULAR` / `BOLD`), measured in a browser with
`getComputedTextLength`; the docstring above them says how to regenerate.

The stack — `'Helvetica Neue', Helvetica, Arial, sans-serif` — is chosen to make
that possible. Those three and Liberation Sans share advance widths, so one table
describes what every platform draws. `-apple-system` is deliberately *not* in it:
SF Pro is narrower, and would make the measured wrap wrong on exactly one platform.

`fit` then picks the largest size whose lines fit on both counts, line *count* and
line *width* — checking only the first is how an unbreakable word like
"Property/Casualty" overruns. `balance` narrows the measure until the last line is
not a one-word stub: a greedy wrap leaves *…with Applications in / R*, which under a
title reads as a mistake.

## Running it

```bash
python3 scripts/generate_resource_covers.py            # draw covers for pages lacking one
python3 scripts/generate_resource_covers.py --force    # redraw the ones we own
python3 scripts/generate_resource_covers.py --check    # exit non-zero if anything drifted
```

The plain run is additive and idempotent: it draws a cover for any page without one and
inserts the embed, and leaves every page that already has an image alone. Use `--force`
after editing the script or a page's front matter — a title, edition or publisher change
does not redraw itself.

These are **generated**. Edit `generate_resource_covers.py`, `cover_kit.py` or
`cover_motifs.py` — never the SVG, or the next run discards the change.
