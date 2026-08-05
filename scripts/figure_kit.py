"""A tiny dependency-free SVG toolkit for the concept-page figures.

`generate_concept_figures.py` draws every Exam P / Exam FM illustration through
this module. It exists instead of matplotlib for three reasons:

1. **Theme.** The quiz app defaults to a *dark* canvas, and the vault is also read
   in Obsidian, on GitHub, and on the published light site. A figure is embedded
   as `<img src="...svg">`, so it cannot inherit the app's CSS variables — it has
   to carry its own palette. Every figure here ships a `<style>` block with a
   light default and a `@media (prefers-color-scheme: dark)` override, so it is
   legible on either background and never depends on the host page.
2. **Diagrams, not just plots.** Most of these figures are timelines, Venn
   diagrams, step functions and stacked bars rather than data plots.
3. **Size.** Hand-written SVG is ~2 KB per figure; matplotlib's is ~40 KB.

Coordinates are plain user units and the viewBox is unscaled, so a figure
authored at 360×470 renders at whatever width the `![[...|340]]` embed asks for.

Every concept figure is **portrait** and carries three things and no more — a
title, the picture, and the one formula worth remembering. `vcard()` lays those
out; builders draw into the fixed box `(BX0, BY0)-(BX1, BY1)` between them.
"""

from __future__ import annotations

import math
from dataclasses import dataclass, field
from pathlib import Path
from xml.sax.saxutils import escape

# ── palette ──────────────────────────────────────────────────────────────────
# Series colours are fixed hexes chosen to clear 4.5:1 against *both* the light
# surface (#ffffff) and the dark one (#1a1d24); only the neutrals swap by theme.
BLUE = "#3b82f6"
AMBER = "#d97706"
GREEN = "#059669"
ROSE = "#e11d48"
VIOLET = "#7c3aed"
TEAL = "#0d9488"
SERIES = [BLUE, AMBER, GREEN, VIOLET, ROSE, TEAL]

STYLE = """
:root {
  --surf: #ffffff; --edge: #e4e4e7; --ink: #18181b; --dim: #6b7280;
  --grid: #ececf1; --soft: #f4f4f5; --axis: #9ca3af;
}
@media (prefers-color-scheme: dark) {
  :root {
    --surf: #1a1d24; --edge: #2f333c; --ink: #f4f4f5; --dim: #a1a1aa;
    --grid: #272b33; --soft: #22262e; --axis: #6b7280;
  }
}
text {
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto,
               "Helvetica Neue", Arial, sans-serif;
  fill: var(--ink);
  font-size: 12px;
}
.dim { fill: var(--dim); }
.ttl { font-size: 14px; font-weight: 600; }
.fml { font-size: 14px; font-weight: 600; }
.fml2 { font-size: 12.5px; fill: var(--dim); }
.sub { font-size: 11px; fill: var(--dim); }
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
""".strip()


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
    them reads as one system.
    """

    w: float = 560
    h: float = 300
    alt: str = ""
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

    def title(self, s, sub=None) -> None:
        self.text(self.w / 2, 22, s, cls="ttl")
        if sub:
            self.text(self.w / 2, 38, sub, cls="sub")

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
        body = "\n  ".join(self.parts)
        defs = ("\n  <defs>\n    " + "\n    ".join(self.defs) + "\n  </defs>") if self.defs else ""
        title = f"\n  <title>{escape(self.alt)}</title>" if self.alt else ""
        return (
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {_fmt(self.w)} {_fmt(self.h)}" '
            f'width="{_fmt(self.w)}" height="{_fmt(self.h)}" role="img">{title}\n'
            f"  <style>{STYLE}</style>{defs}\n"
            f'  <rect class="card" x="0.6" y="0.6" width="{_fmt(self.w - 1.2)}" '
            f'height="{_fmt(self.h - 1.2)}" rx="10"/>\n'
            f"  {body}\n</svg>\n"
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


# ── the portrait card ────────────────────────────────────────────────────────
# One shape for every concept figure: a title, a picture, and one formula.
# Everything else — the annotation columns, the footnotes, the "worth
# remembering" asides — belongs on the concept page, not inside the image.
VW, VH = 360, 470          # canvas
BX0, BY0, BX1, BY1 = 20, 66, 340, 392   # the box a builder draws into
BW, BH = BX1 - BX0, BY1 - BY0
BCX, BCY = (BX0 + BX1) / 2, (BY0 + BY1) / 2


def wrap(text: str, width: int = 40) -> list[str]:
    """Greedy word wrap, measured in characters."""
    lines: list[str] = []
    cur = ""
    for word in text.split():
        cand = f"{cur} {word}".strip()
        if len(cand) > width and cur:
            lines.append(cur)
            cur = word
        else:
            cur = cand
    if cur:
        lines.append(cur)
    return lines


def vcard(title: str, formula: str | list[str] | None = None, alt: str = "") -> Fig:
    """A portrait figure: title on top, drawing box, formula in the footer.

    The box is the same rectangle in every figure, so a reader flipping through
    concept pages sees the picture land in the same place each time.
    """
    f = Fig(VW, VH, alt=alt)
    lines = wrap(title, 40)[:3]
    ys = {1: [40], 2: [31, 50], 3: [23, 42, 61]}[len(lines)]
    for y, line in zip(ys, lines):
        f.text(VW / 2, y, line, cls="ttl")

    if formula:
        rows = [formula] if isinstance(formula, str) else list(formula)[:2]
        f.line(28, 406, VW - 28, 406, cls="rule")
        if len(rows) == 1:
            f.text(VW / 2, 438, rows[0], cls="fml")
        else:
            f.text(VW / 2, 430, rows[0], cls="fml")
            f.text(VW / 2, 452, rows[1], cls="fml2")
    return f


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


def fmt_money(v: float) -> str:
    return f"{v:,.0f}"


__all__ = [
    "Fig", "Axes", "axes", "timeline", "cash_arrow", "brace", "venn2", "universe",
    "stacked_bars", "fmt_money", "BLUE", "AMBER", "GREEN", "ROSE", "VIOLET", "TEAL",
    "SERIES", "vcard", "vaxes", "wrap", "VW", "VH", "BX0", "BY0", "BX1", "BY1",
    "BW", "BH", "BCX", "BCY",
]
