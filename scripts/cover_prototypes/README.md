# Cover prototypes

Three candidate designs for the **generated** jackets on the `Resources/Books/`
pages that have no publisher cover — 19 of the 30 pages. They are a pitch, not a
generator: nothing here writes into the vault.

Once a direction is picked, that variant folds back into `scripts/cover_kit.py`
and `scripts/generate_resource_covers.py`, `docs/resource-covers.md` is updated,
and this directory is deleted.

| File | What it is |
| --- | --- |
| `variant_a.py` | **Poster** — saturated mesh field, oversized flush-left type, no picture |
| `variant_b.py` | **Motif** — near-black field carrying a line drawing of the subject |
| `variant_c.py` | **Paper** — band of house colour over bright paper, black title |
| `motifs.py` / `flat_motifs.py` | the nine subject drawings, as line art (B) and as flat shapes (C) |
| `palettes.py` | the publisher liveries all three share |
| `proto_kit.py` | SVG builder, wrapping, and the front-matter → `Meta` read |
| `metrics.py` | measured Helvetica/Arial advance widths (see below) |
| `measure_metrics.html` | open in a browser to regenerate `metrics.py`'s tables |
| `build.py` | draws every placeholder page in all three, plus today's cover |
| `make_artifact.py` | turns `covers.json` into the comparison page |

```bash
python3 scripts/cover_prototypes/build.py         # → covers.json
python3 scripts/cover_prototypes/make_artifact.py # → placeholder-jackets.html
```

## Why the metrics table exists

The covers are laid out without a font engine, so every wrap decision rests on a
width estimate. The estimate `cover_kit.py` ships was tuned for Georgia and
under-measures a bold grotesque by ~20%, which is how *Property/Casualty Unpaid
Claim Estimates* ended up set two steps too large and running off the edge of
its jacket. `metrics.py` replaces the guess with the real per-character advances
of the cover font stack, measured with `getComputedTextLength`. Whichever
variant wins should take that with it.
