"""Word-shingle fingerprints: how the guard and the tests recognise solution text
after it has been reformatted (LaTeX delimiters, punctuation, case, line breaks)."""

from __future__ import annotations

import re

TOKEN_RE = re.compile(r"[a-z0-9]+(?:\.[0-9]+)?")


def tokens(text: str) -> list[str]:
    t = text.lower()
    t = re.sub(r"\\[a-z]+", " ", t)        # LaTeX commands carry no content of their own
    t = t.replace("{,}", "").replace(",", "")
    return TOKEN_RE.findall(t)


def shingles(text: str, n: int = 8) -> set[tuple[str, ...]]:
    toks = tokens(text)
    if len(toks) < n:
        return set()
    return {tuple(toks[i:i + n]) for i in range(len(toks) - n + 1)}


def word_count(text: str) -> int:
    return len(re.findall(r"\S+", text))
