"""Registry that ties each concept page to the figure drawn for it.

The per-exam `figures_exam_*.py` modules register builders with the
`@figure(...)` decorator; `generate_concept_figures.py` walks the registry,
writes each SVG to `Media/Figures/`, and (with `--embed`) inserts the
`![[Media/Figures/….svg|width]]` line into the matching `Concepts/*.md` page.
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Callable

from figure_kit import Fig


@dataclass
class FigureSpec:
    concept: str          # Concepts/<concept>.md
    slug: str             # Media/Figures/<slug>.svg
    width: int            # the |NNN| in the embed
    alt: str              # image alt text
    build: Callable[[], Fig]


REGISTRY: list[FigureSpec] = []


def slugify(name: str) -> str:
    s = re.sub(r"[^\w\s-]", "", name).strip()
    return re.sub(r"[\s_]+", "_", s)


def figure(concept: str, alt: str, width: int = 520, slug: str | None = None):
    """Register the builder that draws `concept`'s figure."""

    def wrap(fn: Callable[[], Fig]) -> Callable[[], Fig]:
        REGISTRY.append(
            FigureSpec(concept=concept, slug=slug or slugify(concept), width=width,
                       alt=alt, build=fn)
        )
        return fn

    return wrap
