#!/usr/bin/env python3
"""Lint the dated timeline pages' shared vocabulary.

A dated page (docs/research-corpus-plan.md) is a regulation, an event or a
benchmark under `Resources/`, with lower-case frontmatter: `id`, `type`,
`date`, `jurisdiction`, `lob`. Two of those keys name things every other
store names too, so their values come from the Actuarial Ontology's lists
(scripts/ontology_lists.py):

  jurisdiction  one entry of `Jurisdiction` — `"CA"`, `"CA-ON"`
  lob           a list, each an entry of `LineOfBusiness` — `["Auto-Personal"]`

A value that is in neither list is an error. Add it to the ontology's list
(with this spelling as its notation) and take the list again; don't spell an
existing entry a new way.

    python3 scripts/timeline_lint.py            # every dated page
    python3 scripts/timeline_lint.py <file>…    # just these

Exits 1 on an error. Stdlib only.
"""

from __future__ import annotations

import glob
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import ontology_lists as ol  # noqa: E402
import vault_links as vl  # noqa: E402
import verify_lib  # noqa: E402

ROOT = vl.REPO_ROOT
KINDS = ("regulation", "event", "benchmark")
JURISDICTIONS = ol.notations("Jurisdiction")
LINES = ol.notations("LineOfBusiness")

_KEY_RE = re.compile(r"^([a-z_]+):\s*(.*)$")


def frontmatter(text: str) -> dict[str, tuple[int, str]]:
    """A page's top-level lower-case keys: key → (line number, raw value)."""
    fm, _body = verify_lib.split_frontmatter(text)
    out: dict[str, tuple[int, str]] = {}
    for i, line in enumerate((fm or "").splitlines(), start=2):
        m = _KEY_RE.match(line)
        if m:
            out.setdefault(m.group(1), (i, m.group(2).strip()))
    return out


def is_dated(keys: dict[str, tuple[int, str]]) -> bool:
    return "id" in keys and keys.get("type", (0, ""))[1] in KINDS


def lint_text(rel: str, text: str) -> list[str]:
    """The errors on one page; none for a page that isn't a dated one."""
    keys = frontmatter(text)
    if not is_dated(keys):
        return []
    errors: list[str] = []
    if "jurisdiction" in keys:
        ln, raw = keys["jurisdiction"]
        value = raw.strip("\"'")
        if value not in JURISDICTIONS:
            errors.append(f"{rel}:{ln}: jurisdiction {value!r} is not in the ontology's list of jurisdictions")
    if "lob" in keys:
        ln, raw = keys["lob"]
        try:
            lines = json.loads(raw)
        except ValueError:
            lines = None
        if not isinstance(lines, list) or not all(isinstance(x, str) for x in lines):
            errors.append(f"{rel}:{ln}: lob is a list of lines of business, `[\"Auto-Personal\"]`")
        else:
            for line in lines:
                if line not in LINES:
                    errors.append(f"{rel}:{ln}: lob {line!r} is not in the ontology's list of lines of business")
    return errors


def dated_pages(root: str = ROOT) -> list[str]:
    return sorted(os.path.relpath(p, root) for p in glob.glob(os.path.join(root, "Resources", "*", "*.md")))


def main(argv: list[str] | None = None) -> int:
    args = sys.argv[1:] if argv is None else argv
    pages = [os.path.relpath(os.path.abspath(a), ROOT) for a in args] or dated_pages()
    errors: list[str] = []
    checked = 0
    for rel in pages:
        with open(os.path.join(ROOT, rel), encoding="utf-8") as fh:
            text = fh.read()
        if is_dated(frontmatter(text)):
            checked += 1
        errors += lint_text(rel, text)
    for e in errors:
        print("ERROR:", e)
    print(f"timeline-lint: {checked} dated page(s), {len(errors)} error(s) "
          f"(ontology lists {ol.VERSION})")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
