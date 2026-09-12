#!/usr/bin/env python3
"""
test_figure_kit.py — tests for the concept-figure palette and theming.

Standard library `unittest` so CI needs no dependencies:

    python3 -m unittest discover -s scripts -p 'test_*.py' -v

The cases here are the two claims `figure_kit`'s docstring makes and that a
reader has no way to check by eye:

1. **The neutrals are the app's tokens.** They are transcribed out of
   `quiz/src/index.css`, so a drift there has to be a deliberate, matching edit
   here rather than something noticed in a screenshot months later.
2. **The palettes are legible.** Every series colour clears the WCAG 3:1 bar
   for a graphical object against *both* surfaces, and the two text greys clear
   4.5:1 against the surface they are drawn on.

Plus the structural rule that makes host theming work at all: `<defs>` and the
drawing both have to sit after the `:target` anchors.
"""

from __future__ import annotations

import re
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import figure_kit as fk  # noqa: E402

INDEX_CSS = Path(__file__).resolve().parents[1] / "quiz" / "src" / "index.css"


def luminance(hex_colour: str) -> float:
    h = hex_colour.lstrip("#")
    channels = [int(h[i : i + 2], 16) / 255 for i in (0, 2, 4)]
    linear = [c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4 for c in channels]
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2]


def contrast(a: str, b: str) -> float:
    la, lb = luminance(a), luminance(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


def palette(block: str) -> dict[str, str]:
    return dict(re.findall(r"(--[\w-]+):\s*(#[0-9a-fA-F]{6})", block))


LIGHT = palette(fk.LIGHT)
DARK = palette(fk.DARK)


def token_hexes() -> dict[str, tuple[str, str]]:
    """Read `index.css`'s achromatic tokens as (light, dark) hex pairs.

    The app's scheme is `0 0% L%` throughout, so a token is one lightness and
    converts to hex exactly — no approximation, which is what lets this be an
    equality assertion instead of a tolerance.
    """
    css = INDEX_CSS.read_text(encoding="utf-8")
    # `:root { … }` is the light scheme, `.dark { … }` the dark one. Both are
    # the first occurrence of each selector in the file.
    def block(selector: str) -> str:
        start = css.index(selector)
        return css[start : css.index("}", start)]

    def hexes(chunk: str) -> dict[str, str]:
        out = {}
        for name, lightness in re.findall(r"(--[\w-]+):\s*0 0% ([\d.]+)%", chunk):
            v = round(float(lightness) / 100 * 255)
            out[name] = f"#{v:02x}{v:02x}{v:02x}"
        return out

    light, dark = hexes(block(":root {")), hexes(block(".dark {"))
    return {name: (light[name], dark[name]) for name in light if name in dark}


# Which app token each figure variable is a transcription of. This map *is* the
# contract in `figure_kit`'s palette comment, written where a test can hold it.
MIRRORS = {
    "--surf": "--card",
    "--edge": "--border",
    "--ink": "--foreground",
    "--dim": "--muted-foreground",
    "--grid": "--accent",
    "--soft": "--muted",
    "--axis": "--input",
}


class PaletteMirrorsTheApp(unittest.TestCase):
    def test_every_neutral_matches_its_token(self):
        tokens = token_hexes()
        for figure_var, token in MIRRORS.items():
            with self.subTest(figure_var):
                self.assertIn(token, tokens, f"{token} is gone from index.css")
                light, dark = tokens[token]
                self.assertEqual(
                    LIGHT[figure_var],
                    light,
                    f"{figure_var} drifted from {token} (light). Update figure_kit "
                    f"and regenerate: python3 scripts/generate_concept_figures.py",
                )
                self.assertEqual(DARK[figure_var], dark, f"{figure_var} drifted from {token} (dark)")

    def test_both_palettes_define_the_same_variables(self):
        self.assertEqual(set(LIGHT), set(DARK))
        self.assertEqual(set(LIGHT), set(MIRRORS))


class ContrastHolds(unittest.TestCase):
    def test_series_colours_clear_3_to_1_on_both_surfaces(self):
        # 3:1 is the WCAG bar for a graphical object; these are strokes, fills
        # and chips, never body text.
        for colour in fk.SERIES:
            for surface in (LIGHT["--surf"], DARK["--surf"]):
                with self.subTest(colour=colour, surface=surface):
                    self.assertGreaterEqual(round(contrast(colour, surface), 2), 3.0)

    def test_text_greys_clear_4_5_to_1(self):
        for scheme in (LIGHT, DARK):
            for ink in ("--ink", "--dim"):
                with self.subTest(scheme=scheme["--surf"], ink=ink):
                    self.assertGreaterEqual(round(contrast(scheme[ink], scheme["--surf"]), 2), 4.5)

    def test_the_card_edge_is_a_hairline_not_an_outline(self):
        # The app's rule (docs/style-guide.md §2.2): a border is a dim grey,
        # never the foreground. A figure that outlined itself in ink would read
        # as a boxed cut-out on the page.
        for scheme in (LIGHT, DARK):
            self.assertLess(contrast(scheme["--edge"], scheme["--surf"]), 3.0)


class HostCanNameTheTheme(unittest.TestCase):
    def setUp(self):
        fig = fk.Fig(w=100, h=60, alt="t")
        fig.arrow(10, 10, 90, 10)  # forces a <defs> marker
        self.svg = fig.svg()

    def test_carries_both_palettes_and_both_ways_to_choose(self):
        self.assertIn("@media (prefers-color-scheme: dark)", self.svg)
        self.assertIn("#light:target ~ *", self.svg)
        self.assertIn("#dark:target ~ *", self.svg)

    def test_defs_and_drawing_both_follow_the_anchors(self):
        # A sibling combinator only reaches forward, so anything that has to
        # see the chosen palette must be emitted after the anchors. `<defs>` is
        # the one that bites: a marker inherits from where it is defined.
        anchors = self.svg.index(fk.THEME_ANCHORS)
        self.assertIn("<defs>", self.svg)
        self.assertGreater(self.svg.index("<defs>"), anchors)
        self.assertGreater(self.svg.index('<g class="art">'), anchors)

    def test_the_card_surface_is_inside_the_themed_group(self):
        art = self.svg.index('<g class="art">')
        self.assertGreater(self.svg.index('class="card"'), art)


if __name__ == "__main__":
    unittest.main()
