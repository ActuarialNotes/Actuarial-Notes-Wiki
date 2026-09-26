"""A tiny dependency-free SVG toolkit for the concept-page figures.

`generate_concept_figures.py` draws every concept-page illustration through
this module. It exists instead of matplotlib for three reasons:

1. **Theme.** The quiz app defaults to a *dark* canvas, and the vault is also read
   in Obsidian, on GitHub, and on the published light site. A figure is embedded
   as `<img src="...svg">`, so it cannot inherit the app's CSS variables — it has
   to carry its own palette. Every figure here ships a `<style>` block holding
   *both* palettes and two ways to choose between them:

   - **On its own** (Obsidian, GitHub, a direct file open) it follows the
     reader's OS setting, via `@media (prefers-color-scheme: dark)`.
   - **In the app** the OS setting is the wrong signal: the theme is a user
     toggle that defaults to dark and never consults the OS (`useTheme`, a
     `.dark` class on `<html>`), so an OS-light reader on the default dark app
     got a white figure on a black card. The host therefore *names* the theme
     in the embed URL — `…/Exposure_Base.svg#dark` — and the `:target` rules
     below override the media query. A fragment is the only channel into an
     `<img>`: the referenced document is isolated, so the host's class and
     custom properties are invisible to it, and it runs no script.

   A host that passes no fragment, or a renderer that ignores `:target`, falls
   back to the media query — i.e. to exactly the old behaviour — so the figures
   stay self-contained everywhere else.
2. **Diagrams, not just plots.** Most of these figures are timelines, Venn
   diagrams, step functions and stacked bars rather than data plots.
3. **Size.** Hand-written SVG is ~2 KB per figure; matplotlib's is ~40 KB.

Coordinates are plain user units and the viewBox is unscaled, so a figure
authored at 360×470 renders at whatever width the `![[...|340]]` embed asks for.

Every concept figure is one picture and nothing else — no title, no formula, no
caption, no table. The concept page around it already says all of those in
words; the figure is the part that has to be *seen*. `vcard()` makes the card,
and builders draw into the fixed box `(BX0, BY0)-(BX1, BY1)` inside it.
"""

from __future__ import annotations

import math
from dataclasses import dataclass, field
from pathlib import Path
from xml.sax.saxutils import escape

# ── palette ──────────────────────────────────────────────────────────────────
# Series colours are fixed hexes and do not swap by theme: they are the *data*
# layer, and a curve that changed hue between modes would stop being the same
# series. Each clears 3:1 — the WCAG bar for a graphical object — against both
# surfaces (#ffffff and #171717). They are strokes, fills and chips, never body
# text, so 3:1 rather than 4.5:1 is the bar that applies; run
# `python3 -m unittest scripts.test_figure_kit` to re-check after an edit.
BLUE = "#3b82f6"
AMBER = "#d97706"
GREEN = "#059669"
ROSE = "#e11d48"
VIOLET = "#7c3aed"
TEAL = "#0d9488"
SERIES = [BLUE, AMBER, GREEN, VIOLET, ROSE, TEAL]

# The neutrals are not a palette of this module's own: they are the quiz app's
# tokens, read out of `quiz/src/index.css` as hex. Those tokens are achromatic
# (`0 0% L%`), so this is an exact transcription rather than a match by eye —
# which is the point. A figure drawn in zinc and slate sat on a concept page as
# a faintly blue panel on a neutral ground; drawn in these, its surface *is* the
# card behind it. Keep the two in step: move a token in index.css and you move
# it here, then regenerate.
#
#     --surf  ← --card              --grid  ← --accent
#     --edge  ← --border            --soft  ← --muted
#     --ink   ← --foreground        --axis  ← --input
#     --dim   ← --muted-foreground
LIGHT = """--surf: #ffffff; --edge: #c7c7c7; --ink: #000000; --dim: #424242;
  --grid: #dedede; --soft: #e8e8e8; --axis: #8c8c8c;"""

DARK = """--surf: #171717; --edge: #424242; --ink: #ffffff; --dim: #c7c7c7;
  --grid: #333333; --soft: #242424; --axis: #6b6b6b;"""

def _indent(block: str) -> str:
    """Re-indent a palette block's continuation lines by one more level."""
    return block.replace("\n  ", "\n    ")


# The two anchors the `:target` rules hang off. They are empty and paint
# nothing; all they do is give the embed URL something to name. Emitted
# *before* `<defs>` and the drawing so the sibling combinator reaches both —
# a marker lives in `<defs>` and inherits from there, not from the element
# that references it, so an arrowhead drawn in `var(--axis)` would otherwise
# keep the media query's value while the rest of the figure switched.
THEME_ANCHORS = '<g id="light"/><g id="dark"/>'

# Which of the two palettes applies, and how the host names one. Kept apart
# from the rules below so the rest of the sheet stays a plain string.
_THEME_RULES = f"""
:root {{
  {LIGHT}
}}
@media (prefers-color-scheme: dark) {{
  :root {{
    {_indent(DARK)}
  }}
}}
/* Named by the host in the embed URL (`…svg#dark`), and beats the media query
   above because a value set here lands on the drawing rather than on the root
   it inherits from. See the module docstring. */
#light:target ~ * {{ {LIGHT} }}
#dark:target ~ * {{ {DARK} }}"""

_RULES = """
text {
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto,
               "Helvetica Neue", Arial, sans-serif;
  fill: var(--ink);
  font-size: 12px;
}
.dim { fill: var(--dim); }
.sm  { font-size: 10.5px; }
.bold { font-weight: 600; }
.mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11px;
}
.card { fill: var(--surf); stroke: var(--edge); }
.axis { stroke: var(--axis); stroke-width: 1.1; fill: none; }
.grid { stroke: var(--grid); stroke-width: 1; fill: none; }
.tick { stroke: var(--axis); stroke-width: 1; }
.rule { stroke: var(--edge); stroke-width: 1; fill: none; }
.soft { fill: var(--soft); }
.curve { fill: none; stroke-width: 2; stroke-linecap: round;
         stroke-linejoin: round; }
.thin  { fill: none; stroke-width: 1.4; stroke-linecap: round; }
.dash  { stroke-dasharray: 4 3; }
.dot   { stroke-dasharray: 1.5 3; stroke-linecap: round; }
"""

STYLE = (_THEME_RULES + _RULES).strip()


def _fmt(v: float) -> str:
    """Trim float noise so the SVG stays small and diff-friendly."""
    s = f"{v:.2f}".rstrip("0").rstrip(".")
    return "0" if s in ("-0", "") else s


def _attrs(**kw) -> str:
    out = []
    for k, v in kw.items():
        if v is None:
            continue
        out.append(f'{k.replace("_", "-")}="{v}"')
    return " ".join(out)


# ── canvas ───────────────────────────────────────────────────────────────────
@dataclass
class Fig:
    """An SVG canvas. Draw into it, then `save()`.

    Every figure gets the same rounded card so a page that stacks several of
    them reads as one system. `oy` is the drawing coordinate the canvas's top
    edge sits at — the viewBox starts there rather than at 0, so a builder's
    coordinates don't have to move when the card around its picture does.
    """

    w: float = 560
    h: float = 300
    alt: str = ""
    oy: float = 0
    parts: list[str] = field(default_factory=list)
    defs: list[str] = field(default_factory=list)
    _marker_ids: set[str] = field(default_factory=set)

    # -- primitives ----------------------------------------------------------
    def raw(self, s: str) -> None:
        self.parts.append(s)

    def rect(self, x, y, w, h, cls="", rx=None, **kw) -> None:
        self.raw(
            f'<rect {_attrs(x=_fmt(x), y=_fmt(y), width=_fmt(w), height=_fmt(h), rx=rx, **({"class": cls} if cls else {}), **kw)}/>'
        )

    def line(self, x1, y1, x2, y2, cls="axis", **kw) -> None:
        self.raw(
            f'<line {_attrs(x1=_fmt(x1), y1=_fmt(y1), x2=_fmt(x2), y2=_fmt(y2), **({"class": cls} if cls else {}), **kw)}/>'
        )

    def path(self, d, cls="curve", **kw) -> None:
        self.raw(f'<path {_attrs(d=d, **({"class": cls} if cls else {}), **kw)}/>')

    def circle(self, cx, cy, r, cls="", **kw) -> None:
        self.raw(
            f'<circle {_attrs(cx=_fmt(cx), cy=_fmt(cy), r=_fmt(r), **({"class": cls} if cls else {}), **kw)}/>'
        )

    def ellipse(self, cx, cy, rx, ry, cls="", **kw) -> None:
        self.raw(
            f'<ellipse {_attrs(cx=_fmt(cx), cy=_fmt(cy), rx=_fmt(rx), ry=_fmt(ry), **({"class": cls} if cls else {}), **kw)}/>'
        )

    def text(self, x, y, s, cls="", anchor="middle", **kw) -> None:
        self.raw(
            f'<text {_attrs(x=_fmt(x), y=_fmt(y), text_anchor=anchor, **({"class": cls} if cls else {}), **kw)}>{escape(str(s))}</text>'
        )

    def poly(self, pts, cls="curve", **kw) -> None:
        d = " ".join(f"{_fmt(x)},{_fmt(y)}" for x, y in pts)
        self.raw(f'<polyline {_attrs(points=d, **({"class": cls} if cls else {}), **kw)}/>')

    def polygon(self, pts, cls="", **kw) -> None:
        d = " ".join(f"{_fmt(x)},{_fmt(y)}" for x, y in pts)
        self.raw(f'<polygon {_attrs(points=d, **({"class": cls} if cls else {}), **kw)}/>')

    # -- composites ----------------------------------------------------------
    def arrow(self, x1, y1, x2, y2, colour="var(--ink)", width=1.6, dash=False) -> None:
        """A line with a solid head at (x2, y2)."""
        mid = self._marker(colour)
        cls = "thin dash" if dash else "thin"
        self.raw(
            f'<line {_attrs(x1=_fmt(x1), y1=_fmt(y1), x2=_fmt(x2), y2=_fmt(y2))} '
            f'class="{cls}" stroke="{colour}" stroke-width="{width}" marker-end="url(#{mid})"/>'
        )

    def _marker(self, colour: str) -> str:
        mid = "ah" + "".join(c for c in colour if c.isalnum())
        if mid not in self._marker_ids:
            self._marker_ids.add(mid)
            self.defs.append(
                f'<marker id="{mid}" viewBox="0 0 8 8" refX="6.6" refY="4" markerWidth="6" '
                f'markerHeight="6" orient="auto-start-reverse">'
                f'<path d="M0,0.6 L7.4,4 L0,7.4 z" fill="{colour}"/></marker>'
            )
        return mid

    def legend(self, x, y, items, gap=16, swatch=13) -> None:
        """items: list of (colour, label). Stacked vertically, left-aligned."""
        for i, (colour, label) in enumerate(items):
            yy = y + i * gap
            self.line(x, yy, x + swatch, yy, cls="", stroke=colour, stroke_width="2.4",
                      stroke_linecap="round")
            self.text(x + swatch + 6, yy + 3.6, label, cls="sm", anchor="start")

    def legend_row(self, x, y, items, gap=110, swatch=13) -> None:
        for i, (colour, label) in enumerate(items):
            xx = x + i * gap
            self.line(xx, y, xx + swatch, y, cls="", stroke=colour, stroke_width="2.4",
                      stroke_linecap="round")
            self.text(xx + swatch + 6, y + 3.6, label, cls="sm", anchor="start")

    def note(self, x, y, s, anchor="middle", cls="sm dim") -> None:
        self.text(x, y, s, cls=cls, anchor=anchor)

    def chip(self, cx, cy, label, colour=BLUE, w=None, h=22, cls="sm"):
        """A rounded pill with centred text — used for flow/step diagrams."""
        w = w if w is not None else max(52, 7.0 * len(label) + 18)
        self.rect(cx - w / 2, cy - h / 2, w, h, rx=h / 2, fill=colour, fill_opacity="0.14",
                  stroke=colour, stroke_width="1.2")
        self.text(cx, cy + 4, label, cls=cls)
        return w

    def box(self, x, y, w, h, label=None, colour=None, rx=7, fill_opacity="0.12",
            label_cls="sm", sub=None):
        stroke = colour or "var(--edge)"
        fill = colour if colour else "var(--soft)"
        fo = fill_opacity if colour else "1"
        self.rect(x, y, w, h, rx=rx, fill=fill, fill_opacity=fo, stroke=stroke,
                  stroke_width="1.2")
        if label is not None:
            self.text(x + w / 2, y + h / 2 + (0 if sub else 4) - (6 if sub else 0),
                      label, cls=label_cls)
        if sub is not None:
            self.text(x + w / 2, y + h / 2 + 12, sub, cls="sm dim")

    # -- output --------------------------------------------------------------
    def svg(self) -> str:
        """Serialise the figure.

        Document order matters and is not free to change: `<style>`, then the
        two theme anchors, then `<defs>`, then the drawing. The `:target` rules
        reach forward with a sibling combinator, so anything that needs to see
        the chosen palette has to come *after* the anchors — `<defs>` included,
        since a marker takes its custom properties from where it is defined
        rather than from the element referencing it.
        """
        body = "\n    ".join(self.parts)
        defs = ("\n  <defs>\n    " + "\n    ".join(self.defs) + "\n  </defs>") if self.defs else ""
        title = f"\n  <title>{escape(self.alt)}</title>" if self.alt else ""
        return (
            f'<svg xmlns="http://www.w3.org/2000/svg" '
            f'viewBox="0 {_fmt(self.oy)} {_fmt(self.w)} {_fmt(self.h)}" '
            f'width="{_fmt(self.w)}" height="{_fmt(self.h)}" role="img">{title}\n'
            f"  <style>{STYLE}</style>\n"
            f"  {THEME_ANCHORS}{defs}\n"
            f'  <g class="art">\n'
            f'    <rect class="card" x="0.6" y="{_fmt(self.oy + 0.6)}" width="{_fmt(self.w - 1.2)}" '
            f'height="{_fmt(self.h - 1.2)}" rx="10"/>\n'
            f"    {body}\n  </g>\n</svg>\n"
        )

    def save(self, out_dir: Path, name: str) -> Path:
        path = out_dir / f"{name}.svg"
        path.write_text(self.svg(), encoding="utf-8")
        return path


# ── cartesian axes ───────────────────────────────────────────────────────────
@dataclass
class Axes:
    """Maps data coordinates onto a rectangular plot area inside a `Fig`."""

    fig: Fig
    x0: float
    y0: float
    x1: float
    y1: float  # pixel box (top-left → bottom-right)
    xmin: float
    xmax: float
    ymin: float
    ymax: float

    def px(self, x: float) -> float:
        return self.x0 + (x - self.xmin) / (self.xmax - self.xmin) * (self.x1 - self.x0)

    def py(self, y: float) -> float:
        return self.y1 - (y - self.ymin) / (self.ymax - self.ymin) * (self.y1 - self.y0)

    def p(self, x: float, y: float) -> tuple[float, float]:
        return self.px(x), self.py(y)

    # -- frame ---------------------------------------------------------------
    def frame(self, xlabel=None, ylabel=None, xticks=None, yticks=None,
              xfmt=None, yfmt=None, grid=False, arrows=True) -> None:
        f = self.fig
        if grid:
            for t in (xticks or []):
                f.line(self.px(t), self.y0, self.px(t), self.y1, cls="grid")
            for t in (yticks or []):
                f.line(self.x0, self.py(t), self.x1, self.py(t), cls="grid")
        ybase = self.py(max(self.ymin, min(0, self.ymax))) if self.ymin < 0 < self.ymax else self.y1
        if arrows:
            f.arrow(self.x0, ybase, self.x1 + 10, ybase, colour="var(--axis)", width=1.1)
            f.arrow(self.x0, self.y1, self.x0, self.y0 - 10, colour="var(--axis)", width=1.1)
        else:
            f.line(self.x0, ybase, self.x1, ybase, cls="axis")
            f.line(self.x0, self.y0, self.x0, self.y1, cls="axis")
        for t in (xticks or []):
            x = self.px(t)
            f.line(x, ybase, x, ybase + 4, cls="tick")
            lab = xfmt(t) if xfmt else _fmt(t)
            if lab != "":
                f.text(x, ybase + 16, lab, cls="sm dim")
        for t in (yticks or []):
            y = self.py(t)
            f.line(self.x0 - 4, y, self.x0, y, cls="tick")
            lab = yfmt(t) if yfmt else _fmt(t)
            if lab != "":
                f.text(self.x0 - 8, y + 3.6, lab, cls="sm dim", anchor="end")
        if xlabel:
            # Below the tick row and inside the plot box — an x-label hung off the
            # right end lands in whatever notes column sits beside the plot.
            f.text(self.x1, ybase + 32, xlabel, cls="sm dim", anchor="end")
        if ylabel:
            f.text(self.x0 - 4, self.y0 - 14, ylabel, cls="sm dim", anchor="start")

    # -- data ----------------------------------------------------------------
    def curve(self, fn, colour=BLUE, n=180, xa=None, xb=None, width=2, dash=False,
              clip_top=None):
        xa = self.xmin if xa is None else xa
        xb = self.xmax if xb is None else xb
        pts = []
        for i in range(n + 1):
            x = xa + (xb - xa) * i / n
            try:
                y = fn(x)
            except (ValueError, ZeroDivisionError, OverflowError):
                continue
            if y is None or not math.isfinite(y):
                continue
            if clip_top is not None:
                y = min(y, clip_top)
            y = max(self.ymin, min(self.ymax, y))
            pts.append(self.p(x, y))
        cls = "curve dash" if dash else "curve"
        self.fig.poly(pts, cls=cls, stroke=colour, stroke_width=str(width))
        return pts

    def area(self, fn, xa, xb, colour=BLUE, n=120, opacity="0.16", base=None):
        base = self.ymin if base is None else base
        pts = [self.p(xa, base)]
        for i in range(n + 1):
            x = xa + (xb - xa) * i / n
            y = max(self.ymin, min(self.ymax, fn(x)))
            pts.append(self.p(x, y))
        pts.append(self.p(xb, base))
        self.fig.polygon(pts, fill=colour, fill_opacity=opacity, stroke="none")

    def polyline(self, points, colour=BLUE, width=2, dash=False):
        cls = "curve dash" if dash else "curve"
        self.fig.poly([self.p(x, y) for x, y in points], cls=cls, stroke=colour,
                      stroke_width=str(width))

    def stems(self, points, colour=BLUE, dot=3.2, width=2):
        base = self.py(max(self.ymin, 0))
        for x, y in points:
            px_, py_ = self.p(x, y)
            self.fig.line(px_, base, px_, py_, cls="", stroke=colour,
                          stroke_width=str(width), stroke_linecap="round")
            self.fig.circle(px_, py_, dot, fill=colour)

    def bars(self, points, colour=BLUE, bw=None, opacity="0.75", base=0.0):
        if bw is None and len(points) > 1:
            bw = abs(self.px(points[1][0]) - self.px(points[0][0])) * 0.66
        bw = bw or 12
        yb = self.py(base)
        for x, y in points:
            px_, py_ = self.p(x, y)
            self.fig.rect(px_ - bw / 2, min(py_, yb), bw, abs(yb - py_), rx=1.5,
                          fill=colour, fill_opacity=opacity)

    def vline(self, x, colour="var(--dim)", dash=True, y_top=None, label=None,
              label_dy=-6, label_cls="sm dim"):
        px_ = self.px(x)
        top = self.py(y_top) if y_top is not None else self.y0
        self.fig.line(px_, self.y1, px_, top, cls="thin dash" if dash else "thin",
                      stroke=colour, stroke_width="1.3")
        if label:
            self.fig.text(px_, top + label_dy, label, cls=label_cls)

    def hline(self, y, colour="var(--dim)", dash=True, x_to=None, label=None,
              label_dx=4, label_cls="sm dim", anchor="start"):
        py_ = self.py(y)
        right = self.px(x_to) if x_to is not None else self.x1
        self.fig.line(self.x0, py_, right, py_, cls="thin dash" if dash else "thin",
                      stroke=colour, stroke_width="1.3")
        if label:
            self.fig.text(right + label_dx, py_ + 3.6, label, cls=label_cls, anchor=anchor)

    def point(self, x, y, colour=BLUE, r=3.6, label=None, dx=0, dy=-8, cls="sm"):
        px_, py_ = self.p(x, y)
        self.fig.circle(px_, py_, r, fill=colour)
        if label:
            self.fig.text(px_ + dx, py_ + dy, label, cls=cls)

    def label(self, x, y, s, cls="sm", anchor="middle", dx=0, dy=0, **kw):
        px_, py_ = self.p(x, y)
        self.fig.text(px_ + dx, py_ + dy, s, cls=cls, anchor=anchor, **kw)


def axes(fig: Fig, xmin, xmax, ymin, ymax, left=48, right=24, top=52, bottom=40) -> Axes:
    return Axes(fig, left, top, fig.w - right, fig.h - bottom, xmin, xmax, ymin, ymax)


# ── the card ─────────────────────────────────────────────────────────────────
# One shape for every concept figure: the picture, and nothing around it. The
# title, the formula, the captions and the tallies these figures used to carry
# all say in words what the concept page beside the figure already says — and
# at phone size a line of prose inside an image is unreadable anyway.
#
# The drawing box is where it has always been, in the coordinates every builder
# is written in; the card is that box plus a 20-unit margin, so the viewBox
# starts at y = OY rather than at 0 (see `Fig.oy`).
BX0, BY0, BX1, BY1 = 20, 66, 340, 392   # the box a builder draws into
BW, BH = BX1 - BX0, BY1 - BY0
BCX, BCY = (BX0 + BX1) / 2, (BY0 + BY1) / 2
MARGIN = 20
OY = BY0 - MARGIN                       # the card's top edge
VW, VH = BW + 2 * MARGIN, BH + 2 * MARGIN   # 360 × 366


def vcard(alt: str = "") -> Fig:
    """The figure card: a bare surface around the drawing box.

    The box is the same rectangle in every figure, so a reader flipping through
    concept pages sees the picture land in the same place each time.
    """
    return Fig(VW, VH, alt=alt, oy=OY)


def vaxes(fig: Fig, xmin, xmax, ymin, ymax, left=44, right=14, top=20, bottom=42) -> Axes:
    """Cartesian axes inset into the portrait drawing box."""
    return Axes(fig, BX0 + left, BY0 + top, BX1 - right, BY1 - bottom,
                xmin, xmax, ymin, ymax)


# ── cash-flow timeline ───────────────────────────────────────────────────────
def timeline(fig: Fig, y, x0, x1, n, labels=None, tick_cls="sm dim", label_dy=17,
             show_axis_label=None):
    """A horizontal time axis with `n+1` evenly spaced integer nodes.

    Returns the list of pixel x-positions, one per node. Nearly every FM figure
    is built on top of this.
    """
    xs = [x0 + (x1 - x0) * k / n for k in range(n + 1)]
    fig.arrow(x0 - 8, y, x1 + 18, y, colour="var(--axis)", width=1.2)
    for k, x in enumerate(xs):
        fig.line(x, y - 4, x, y + 4, cls="tick")
        lab = labels[k] if labels is not None else str(k)
        if lab != "":
            fig.text(x, y + label_dy, lab, cls=tick_cls)
    if show_axis_label:
        fig.text(x1 + 22, y + label_dy, show_axis_label, cls="sm dim", anchor="start")
    return xs


def cash_arrow(fig: Fig, x, y_base, height, colour=BLUE, label=None, up=True,
               label_cls="sm", label_dy=-6, width=1.8):
    """A payment arrow rising from (up) or falling to (down) the timeline."""
    tip = y_base - height if up else y_base + height
    fig.arrow(x, y_base, x, tip, colour=colour, width=width)
    if label:
        fig.text(x, tip + (label_dy if up else -label_dy + 10), label, cls=label_cls)
    return tip


def brace(fig: Fig, x0, x1, y, depth=8, colour="var(--dim)", label=None, below=True,
          label_cls="sm dim"):
    """A flat curly-ish brace spanning [x0, x1], used to mark a term/period."""
    s = 1 if below else -1
    mid = (x0 + x1) / 2
    d = (
        f"M{_fmt(x0)},{_fmt(y)} v{_fmt(s * depth * 0.6)} "
        f"H{_fmt(mid - 5)} q5,0 5,{_fmt(s * depth * 0.55)} "
        f"q0,{_fmt(-s * depth * 0.55)} 5,{_fmt(-s * depth * 0.55)} "
        f"H{_fmt(x1)} v{_fmt(-s * depth * 0.6)}"
    )
    fig.path(d, cls="thin", stroke=colour, stroke_width="1.2")
    if label:
        fig.text(mid, y + s * (depth + 11) - (0 if below else 2), label, cls=label_cls)
    return mid


# ── venn ─────────────────────────────────────────────────────────────────────
def venn2(fig: Fig, cx, cy, r=58, sep=44, colours=(BLUE, AMBER), labels=("A", "B"),
          opacity="0.18", label_dy=None):
    """Two overlapping circles. Returns (left centre, right centre)."""
    ax, bx = cx - sep / 2, cx + sep / 2
    for x, colour in ((ax, colours[0]), (bx, colours[1])):
        fig.circle(x, cy, r, fill=colour, fill_opacity=opacity, stroke=colour,
                   stroke_width="1.6")
    dy = label_dy if label_dy is not None else -r - 8
    fig.text(ax - r * 0.55, cy + dy + 4, labels[0], cls="bold", fill=colours[0])
    fig.text(bx + r * 0.55, cy + dy + 4, labels[1], cls="bold", fill=colours[1])
    return (ax, cy), (bx, cy)


def universe(fig: Fig, x, y, w, h, label="S", rx=8):
    fig.rect(x, y, w, h, rx=rx, fill="var(--soft)", stroke="var(--edge)", stroke_width="1.2")
    fig.text(x + 13, y + 16, label, cls="sm dim")


# ── misc drawing helpers ─────────────────────────────────────────────────────
def stacked_bars(fig: Fig, x0, ybase, bw, gap, rows, height_scale, colours,
                 labels=None, label_cls="sm dim"):
    """rows: list of per-bar segment lists (bottom→top). Returns bar centres."""
    centres = []
    for i, segs in enumerate(rows):
        x = x0 + i * (bw + gap)
        y = ybase
        for j, v in enumerate(segs):
            hgt = v * height_scale
            fig.rect(x, y - hgt, bw, hgt, rx=1.5, fill=colours[j], fill_opacity="0.8")
            y -= hgt
        centres.append(x + bw / 2)
        if labels:
            fig.text(x + bw / 2, ybase + 15, labels[i], cls=label_cls)
    return centres


# ── icons ────────────────────────────────────────────────────────────────────
# Small pictograms for the figures whose concept is *who does what to whom* —
# a regulator, an insurer, a policyholder, a claim, a car, a house. A picture
# of the parties and the arrows between them says in one glance what a box of
# prose never does. Each is centred on (cx, cy), `s` units tall, drawn in one
# series colour as a tinted fill with a solid outline.
def _ink(colour, opacity="0.18"):
    return dict(fill=colour, fill_opacity=opacity, stroke=colour, stroke_width="1.4",
                stroke_linejoin="round")


def person(fig: Fig, cx, cy, s=40, colour=BLUE):
    """Head and shoulders — a policyholder, a claimant, an actuary."""
    fig.circle(cx, cy - 0.3 * s, 0.18 * s, **_ink(colour))
    w, top, bot = 0.32 * s, cy - 0.04 * s, cy + 0.5 * s
    d = (f"M{_fmt(cx - w)},{_fmt(bot)} V{_fmt(top + 0.16 * s)} "
         f"Q{_fmt(cx - w)},{_fmt(top)} {_fmt(cx - 0.14 * s)},{_fmt(top)} "
         f"H{_fmt(cx + 0.14 * s)} Q{_fmt(cx + w)},{_fmt(top)} {_fmt(cx + w)},{_fmt(top + 0.16 * s)} "
         f"V{_fmt(bot)} Z")
    fig.path(d, cls="", **_ink(colour))


def building(fig: Fig, cx, cy, s=40, colour=BLUE):
    """A pediment on columns — a regulator, a court, a government."""
    hw = 0.5 * s
    fig.polygon([(cx - hw, cy - 0.2 * s), (cx, cy - 0.5 * s), (cx + hw, cy - 0.2 * s)],
                **_ink(colour))
    for k in range(4):
        x = cx - 0.36 * s + k * 0.24 * s
        fig.rect(x - 0.05 * s, cy - 0.14 * s, 0.1 * s, 0.46 * s, **_ink(colour))
    fig.rect(cx - hw, cy + 0.36 * s, s, 0.14 * s, **_ink(colour))


def tower(fig: Fig, cx, cy, s=40, colour=BLUE):
    """An office block — an insurer, a company, a reinsurer."""
    w = 0.56 * s
    fig.rect(cx - w / 2, cy - 0.5 * s, w, s, rx=2, **_ink(colour))
    for r in range(4):
        for c in range(2):
            fig.rect(cx - 0.17 * s + c * 0.22 * s, cy - 0.38 * s + r * 0.2 * s,
                     0.12 * s, 0.1 * s, fill=colour, fill_opacity="0.55")


def document(fig: Fig, cx, cy, s=40, colour=BLUE, lines=3):
    """A page with a folded corner — a policy, a return, a report, a statute."""
    w, h, fold = 0.72 * s, s, 0.2 * s
    x0, y0 = cx - w / 2, cy - h / 2
    fig.polygon([(x0, y0), (x0 + w - fold, y0), (x0 + w, y0 + fold), (x0 + w, y0 + h),
                 (x0, y0 + h)], **_ink(colour))
    fig.path(f"M{_fmt(x0 + w - fold)},{_fmt(y0)} V{_fmt(y0 + fold)} H{_fmt(x0 + w)}",
             cls="", fill="none", stroke=colour, stroke_width="1.2")
    for k in range(lines):
        y = y0 + 0.4 * h + k * 0.17 * h
        x_end = x0 + w - 0.16 * s - (0.14 * s if k == lines - 1 else 0)
        fig.line(x0 + 0.14 * s, y, x_end, y, cls="", stroke=colour, stroke_width="1.4",
                 stroke_linecap="round")


def house(fig: Fig, cx, cy, s=40, colour=BLUE):
    """A house — a homeowner's risk, a dwelling, property."""
    hw = 0.36 * s
    fig.polygon([(cx - hw, cy - 0.06 * s), (cx - hw, cy + 0.5 * s), (cx + hw, cy + 0.5 * s),
                 (cx + hw, cy - 0.06 * s), (cx, cy - 0.46 * s)], **_ink(colour))
    fig.rect(cx - 0.09 * s, cy + 0.18 * s, 0.18 * s, 0.32 * s, fill=colour, fill_opacity="0.55")


def car(fig: Fig, cx, cy, s=40, colour=BLUE):
    """A car, side on — an auto risk, a vehicle, a driver's exposure. `s` is its length."""
    L = s
    d = (f"M{_fmt(cx - 0.5 * L)},{_fmt(cy + 0.1 * L)} V{_fmt(cy - 0.04 * L)} "
         f"L{_fmt(cx - 0.3 * L)},{_fmt(cy - 0.08 * L)} L{_fmt(cx - 0.16 * L)},{_fmt(cy - 0.24 * L)} "
         f"H{_fmt(cx + 0.18 * L)} L{_fmt(cx + 0.32 * L)},{_fmt(cy - 0.08 * L)} "
         f"L{_fmt(cx + 0.5 * L)},{_fmt(cy - 0.02 * L)} V{_fmt(cy + 0.1 * L)} Z")
    fig.path(d, cls="", **_ink(colour))
    for x in (cx - 0.28 * L, cx + 0.28 * L):
        fig.circle(x, cy + 0.12 * L, 0.09 * L, fill="var(--surf)", stroke=colour,
                   stroke_width="1.6")


def coins(fig: Fig, cx, base_y, n=3, r=12, colour=AMBER):
    """A stack of `n` coins standing on `base_y` — premium, a payment, capital."""
    for k in range(n):
        y = base_y - 5 - k * 6
        fig.rect(cx - r, y - 3, 2 * r, 6, fill=colour, fill_opacity="0.25", stroke="none")
        fig.ellipse(cx, y + 3, r, 3.4, fill=colour, fill_opacity="0.25", stroke=colour,
                    stroke_width="1.2")
        fig.ellipse(cx, y - 3, r, 3.4, fill="var(--surf)", stroke=colour, stroke_width="1.2")
        fig.ellipse(cx, y - 3, r, 3.4, fill=colour, fill_opacity="0.3", stroke="none")


def scales(fig: Fig, cx, cy, s=40, colour=BLUE, tilt=0.0):
    """The scales of justice — a court, a ruling, a statute. `tilt` in [-1, 1] dips a pan."""
    hw = 0.46 * s
    dy = tilt * 0.12 * s
    fig.line(cx, cy - 0.42 * s, cx, cy + 0.4 * s, cls="", stroke=colour, stroke_width="1.8")
    fig.rect(cx - 0.22 * s, cy + 0.4 * s, 0.44 * s, 0.1 * s, rx=2, **_ink(colour))
    fig.line(cx - hw, cy - 0.3 * s + dy, cx + hw, cy - 0.3 * s - dy, cls="", stroke=colour,
             stroke_width="1.8", stroke_linecap="round")
    fig.circle(cx, cy - 0.44 * s, 0.05 * s, fill=colour)
    for side, dd in ((-1, dy), (1, -dy)):
        x, y = cx + side * hw, cy - 0.3 * s + dd
        fig.line(x, y, x - 0.16 * s, y + 0.3 * s, cls="", stroke=colour, stroke_width="1")
        fig.line(x, y, x + 0.16 * s, y + 0.3 * s, cls="", stroke=colour, stroke_width="1")
        fig.path(f"M{_fmt(x - 0.2 * s)},{_fmt(y + 0.3 * s)} "
                 f"Q{_fmt(x)},{_fmt(y + 0.44 * s)} {_fmt(x + 0.2 * s)},{_fmt(y + 0.3 * s)} Z",
                 cls="", **_ink(colour))


def shield(fig: Fig, cx, cy, s=40, colour=GREEN):
    """A shield — protection, a guarantee, cover."""
    hw = 0.4 * s
    d = (f"M{_fmt(cx)},{_fmt(cy - 0.5 * s)} L{_fmt(cx + hw)},{_fmt(cy - 0.36 * s)} "
         f"V{_fmt(cy - 0.02 * s)} Q{_fmt(cx + hw)},{_fmt(cy + 0.34 * s)} {_fmt(cx)},{_fmt(cy + 0.5 * s)} "
         f"Q{_fmt(cx - hw)},{_fmt(cy + 0.34 * s)} {_fmt(cx - hw)},{_fmt(cy - 0.02 * s)} "
         f"V{_fmt(cy - 0.36 * s)} Z")
    fig.path(d, cls="", **_ink(colour))


def cross(fig: Fig, cx, cy, s=40, colour=ROSE):
    """A medical cross — health care, injury, a benefit for treatment."""
    a, b = 0.5 * s, 0.17 * s
    pts = [(cx - b, cy - a), (cx + b, cy - a), (cx + b, cy - b), (cx + a, cy - b),
           (cx + a, cy + b), (cx + b, cy + b), (cx + b, cy + a), (cx - b, cy + a),
           (cx - b, cy + b), (cx - a, cy + b), (cx - a, cy - b), (cx - b, cy - b)]
    fig.polygon(pts, **_ink(colour))


def fmt_money(v: float) -> str:
    return f"{v:,.0f}"


__all__ = [
    "Fig", "Axes", "axes", "timeline", "cash_arrow", "brace", "venn2", "universe",
    "stacked_bars", "fmt_money", "BLUE", "AMBER", "GREEN", "ROSE", "VIOLET", "TEAL",
    "SERIES", "vcard", "vaxes", "VW", "VH", "BX0", "BY0", "BX1", "BY1",
    "BW", "BH", "BCX", "BCY", "OY", "MARGIN",
    "person", "building", "tower", "document", "house", "car", "coins", "scales",
    "shield", "cross",
]
