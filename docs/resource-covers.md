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

## Real jackets win, always

A scanned or publisher-supplied jacket is the better picture. Three pages already
have one (Hogg's *Probability and Statistical Inference*, Asimow's *Probability and
Statistics with Applications*, Hassett's *Probability for Risk Management*) and they
are left exactly as they are.

To replace a generated cover with a real one:

1. drop the image into `Media/Attachments/` under any name that does **not** end in
   `- Cover.svg` (that suffix is the generator's; it will redraw anything using it);
2. point the page's embed at it — `![[My Book - Cover.jpg]]`;
3. delete the orphaned `… - Cover.svg`.

`generate_resource_covers.py` skips any page whose first embed it does not own, so the
real cover survives every future run.

## The generated cover

Everything else is drawn by `scripts/generate_resource_covers.py` on top of
`scripts/cover_kit.py` — the same dependency-free, hand-written-SVG approach
`generate_concept_figures.py` takes, for the same reasons (no matplotlib, ~3 KB a
file, and `raw.githubusercontent.com` serves `.svg` as `image/svg+xml`, so an
`<img src>` renders it).

Unlike a concept figure, a cover **does not follow the theme**. A figure ships a
`prefers-color-scheme` override because it has to stay legible on the app's dark
canvas and the light published site alike; a cover is a picture of an object, and a
real jacket does not invert when the room lights go off. The palette is fixed.

The whole cover is drawn from the page's own front matter:

| Front matter | On the cover |
| --- | --- |
| `Title` | the title, set large in a serif; the part after `: ` drops to a smaller line beneath |
| `Code`, `Edition`, `Year` | the line under the title — `ASOP No. 43 · 2007`, `5th Edition · 2016` |
| `Authors` / `Author` | the byline, under the accent rule |
| `Type` (or a `Study Note` / `Monograph` prefix on `Edition`) | the small caps above the imprint |
| `Publisher` | the imprint at the foot, and **the jacket colour** |

Two of those rows are worth spelling out:

- **The title is de-duplicated.** `ASOP No. 12 — Risk Classification` sets the code in
  the subtitle line and the rest as the title; `Probability Distributions — Reference
  Sheet` drops the trailing type, which the small caps already say. Where the author
  and the publisher are the same body — the ASOPs, the CAS *Statement of Principles* —
  the byline is dropped rather than printed twice, the same rule `ResourceMetaCard`
  applies to the publisher line.
- **The colour is the publisher's, not the page's.** Covers are looked at as a shelf,
  so the jacket is keyed off `Publisher` from the `JACKETS` table: every CAS study
  note is the same navy and gold, every ASOP the same charcoal and brick, Springer
  blue, Chapman & Hall aubergine, Cambridge green, Pearson red. That reads as a
  series, which is what the source material is. An unrecognised publisher gets the
  neutral slate default — add a row rather than letting a house drift.

Text is laid out without a font engine. `cover_kit.text_width` estimates advances from
a per-character table normalised to the em, which only has to be good enough to decide
where to wrap and when to step the title down a size. `cover_kit.balance` then narrows
the measure until the last line is not a one-word stub — a greedy wrap leaves
*…with Applications in / R*, which on a centred title block reads as a mistake.

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

These are **generated**. Edit `generate_resource_covers.py` or `cover_kit.py`, never the
SVG, or the next run discards the change.
