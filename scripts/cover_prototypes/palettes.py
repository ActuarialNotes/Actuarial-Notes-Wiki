"""Modern publisher liveries, shared by all three prototypes.

Same principle as today's `JACKETS` table — the colour belongs to the house, so
a shelf of CAS study notes reads as a series — but pitched brighter and more
saturated than the current muted set.
"""
from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class Livery:
    base: str     # the field
    deep: str     # the field's dark end
    accent: str   # the one bright colour


LIVERIES: list[tuple[str, Livery]] = [
    ("casualty actuarial society", Livery("#1b4f8a", "#081a33", "#fbbf24")),
    ("actuarial standards board", Livery("#374151", "#0d1117", "#f87171")),
    ("society of actuaries",      Livery("#1d4ed8", "#0a1747", "#38bdf8")),
    ("american academy",          Livery("#1d4ed8", "#0a1747", "#38bdf8")),
    ("springer",                  Livery("#0f766e", "#052e2b", "#fde047")),
    ("world scientific",          Livery("#0e7490", "#062a35", "#5eead4")),
    ("chapman",                   Livery("#6d28d9", "#25084f", "#f472b6")),
    ("routledge",                 Livery("#6d28d9", "#25084f", "#f472b6")),
    ("taylor",                    Livery("#6d28d9", "#25084f", "#f472b6")),
    ("pearson",                   Livery("#be123c", "#3f0417", "#fbbf24")),
    ("academic press",            Livery("#c2410c", "#3d1206", "#fdba74")),
    ("elsevier",                  Livery("#c2410c", "#3d1206", "#fdba74")),
    ("cambridge",                 Livery("#15803d", "#04240f", "#a3e635")),
    ("oxford",                    Livery("#1e40af", "#0a1230", "#93c5fd")),
    ("wiley",                     Livery("#1d4ed8", "#0d1a44", "#22d3ee")),
    ("actex",                     Livery("#9f1239", "#33060f", "#fcd34d")),
    ("actuarialbrew",             Livery("#0f766e", "#062b28", "#facc15")),
    ("lightning source",          Livery("#0e7490", "#052730", "#f4d35e")),
    ("actuarial notes",           Livery("#6d28d9", "#1f0a4d", "#2dd4bf")),
]
DEFAULT = Livery("#334155", "#0b1220", "#94a3b8")


def livery_for(publisher: str, author: str = "") -> Livery:
    hay = f"{publisher} {author}".lower()
    for needle, lv in LIVERIES:
        if needle in hay:
            return lv
    return DEFAULT
