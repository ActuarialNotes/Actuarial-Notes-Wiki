#!/usr/bin/env python3
"""List the worked examples whose title is too long to be a title.

A concept page's example is `> [!example]- <question> {Example}`. Over
LIMIT words (each `$…$` counted as one), the skill's rule splits it: the
question alone in the title, the setup as the card's first block, the working
in a nested `> > [!answer]-` box. This lists every title over the limit.

    python3 .claude/skills/actuarial-concept-definitions/long_example_titles.py [files…]
    python3 …/long_example_titles.py --markdown   # the backlog table, by page

Standard library only. Exits 1 when it finds any, so it can gate a page.
"""
from __future__ import annotations

import glob
import re
import sys
from pathlib import Path

LIMIT = 25
EXAMPLE_RE = re.compile(r"^> \[!example\]-\s*(.*?)\s*\{Example\}\s*$")
MATH_RE = re.compile(r"\$[^$]*\$")


def title_words(title: str) -> int:
    return len(MATH_RE.sub("X", title).split())


def long_titles(path: Path) -> list[tuple[int, int, str]]:
    found = []
    for n, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        m = EXAMPLE_RE.match(line)
        if m and title_words(m.group(1)) > LIMIT:
            found.append((n, title_words(m.group(1)), m.group(1)))
    return found


def main(argv: list[str]) -> int:
    markdown = "--markdown" in argv
    files = [a for a in argv if not a.startswith("--")]
    paths = [Path(f) for f in files] or [Path(f) for f in sorted(glob.glob("Concepts/*.md"))]
    total = 0
    pages = 0
    out = []
    for p in paths:
        rows = long_titles(p)
        if not rows:
            continue
        pages += 1
        total += len(rows)
        for n, words, title in rows:
            if markdown:
                short = title if len(title) <= 90 else title[:87].rstrip() + "…"
                cell = short.replace("|", "\\|")
                out.append(f"| `{p}:{n}` | {words} | {cell} |")
            else:
                out.append(f"{p}:{n}: {words} words: {title}")
    if markdown:
        print(f"{total} examples on {pages} pages.\n")
        print("| Where | Words | Title |")
        print("| :--- | ---: | :--- |")
    print("\n".join(out))
    if not markdown:
        print(f"{total} example titles over {LIMIT} words on {pages} pages", file=sys.stderr)
    return 1 if total else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
