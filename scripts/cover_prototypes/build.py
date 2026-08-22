#!/usr/bin/env python3
"""Draw all three prototype jackets for every placeholder page.

Writes `covers.json` next to this file — a map of page stem →
{now, a, b, c} SVG source — which `make_artifact.py` turns into the comparison
page. Nothing here touches the vault; the prototypes are a pitch, not a
generator. Once a direction is picked, its variant folds back into
`scripts/cover_kit.py` + `scripts/generate_resource_covers.py` and this whole
directory goes away.

    python3 scripts/cover_prototypes/build.py
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
REPO = HERE.parent.parent
sys.path.insert(0, str(HERE))
sys.path.insert(0, str(REPO / "scripts"))

from proto_kit import parse_front_matter, read_meta  # noqa: E402
import variant_a, variant_b, variant_c  # noqa: E402
import generate_resource_covers as current  # noqa: E402

BOOKS = REPO / "Resources" / "Books"
IMAGE_EMBED = re.compile(r"!\[\[([^\]|]+\.(?:png|jpe?g|gif|svg|webp|avif))\]\]", re.I)
OURS = " - Cover.svg"
# One raster placeholder: a generated cover exported to PNG under a name the
# generator does not own, so it has been frozen out of every redraw since.
FROZEN = {"A First Course in Probability.png"}


def placeholder_pages():
    for page in sorted(BOOKS.glob("*.md")):
        attrs, body = parse_front_matter(page.read_text(encoding="utf-8"))
        if not attrs:
            continue
        m = IMAGE_EMBED.search(body)
        embed = m.group(1) if m else None
        if embed and not embed.endswith(OURS) and Path(embed).name not in FROZEN:
            continue  # a real jacket
        yield page, attrs


def main() -> int:
    out = {}
    for page, attrs in placeholder_pages():
        meta = read_meta(attrs)
        out[page.stem] = {
            "subject": meta.subject,
            "title": meta.title,
            "now": current.draw(attrs),
            "a": variant_a.draw(meta),
            "b": variant_b.draw(meta),
            "c": variant_c.draw(meta),
        }
        print(f"  {meta.subject:11s} {page.stem}")
    (HERE / "covers.json").write_text(json.dumps(out), encoding="utf-8")
    print(f"{len(out)} placeholder page(s) → covers.json")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
