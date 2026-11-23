#!/usr/bin/env python3
"""The Actuarial Ontology's controlled lists, for the vault's lint scripts.

The lists — jurisdictions, lines of business, document types, quantity kinds,
units, fact-check statuses, kinds of institution — are defined once, in the
Actuarial Ontology (github.com/Actuarial-Notes/Actuarial-Ontology, `lists/`),
which publishes them as `lists/lists.json`. `scripts/ontology_lists.json` is a
copy of that file, never edited here: a new value is added to the ontology's
list and the copy taken again with `--sync`.

Each list is keyed by the ontology's name for it (`Jurisdiction`,
`LineOfBusiness`, `DocumentType`, `QuantityKind`, `Unit`, …). An entry's
`notations` are the spellings a page may use for it — `CA-ON`,
`Auto-Personal`, `Study Note`, `trend`.

Read by `resource_lint.py` (a page's `Type`), `assumption_lint.py` (a set's
`Jurisdiction`, a row's kind and unit) and `timeline_lint.py` (a dated page's
`jurisdiction` and `lob`).

    python3 scripts/ontology_lists.py                    # what the copy holds
    python3 scripts/ontology_lists.py --check <source>   # exit 1 if the copy differs
    python3 scripts/ontology_lists.py --sync <source>    # take the source's lists

`<source>` is a path to the ontology's `lists/lists.json` or an https URL of
it; with none, the file on the ontology's main branch. Stdlib only.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.request

PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ontology_lists.json")
UPSTREAM = "https://raw.githubusercontent.com/Actuarial-Notes/Actuarial-Ontology/main/lists/lists.json"

with open(PATH, encoding="utf-8") as _fh:
    _DOC = json.load(_fh)

VERSION: str = _DOC["version"]
LISTS: dict[str, list[dict]] = _DOC["lists"]


def entries(name: str) -> list[dict]:
    """The entries of one list, in the ontology's order."""
    return LISTS[name]


def notations(name: str) -> tuple[str, ...]:
    """Every spelling a page may use for an entry of the list, in order, once each."""
    seen: dict[str, None] = {}
    for entry in LISTS[name]:
        for notation in entry["notations"]:
            seen.setdefault(notation)
    return tuple(seen)


def entry_for(name: str, notation: str) -> dict | None:
    """The first entry of the list that the spelling names."""
    for entry in LISTS[name]:
        if notation in entry["notations"]:
            return entry
    return None


def _read(source: str) -> str:
    if source.startswith("https://"):
        with urllib.request.urlopen(source, timeout=30) as resp:
            return resp.read().decode("utf-8")
    with open(source, encoding="utf-8") as fh:
        return fh.read()


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    group = ap.add_mutually_exclusive_group()
    group.add_argument("--check", nargs="?", const=UPSTREAM, metavar="SOURCE",
                       help="exit 1 if the copy differs from the ontology's lists.json")
    group.add_argument("--sync", nargs="?", const=UPSTREAM, metavar="SOURCE",
                       help="replace the copy with the ontology's lists.json")
    args = ap.parse_args(argv)

    source = args.check or args.sync
    if not source:
        print(f"Actuarial Ontology lists, version {VERSION}")
        for name, items in LISTS.items():
            print(f"  {name}: {len(items)}")
        return 0

    try:
        text = _read(source)
    except OSError as exc:  # no such file, or the ontology's repo can't be reached
        print(f"ontology-lists: can't read {source}: {exc}", file=sys.stderr)
        return 2
    upstream = json.loads(text)  # a source that isn't the lists file fails here
    if "lists" not in upstream or "version" not in upstream:
        print(f"ontology-lists: {source} is not the ontology's lists.json", file=sys.stderr)
        return 2
    with open(PATH, encoding="utf-8") as fh:
        current = fh.read()
    if text == current:
        print(f"ontology-lists: the copy is current (version {VERSION})")
        return 0
    if args.check:
        print(f"ontology-lists: scripts/ontology_lists.json (version {VERSION}) differs from {source} "
              f"(version {upstream['version']}); run `python3 scripts/ontology_lists.py --sync`")
        return 1
    with open(PATH, "w", encoding="utf-8") as fh:
        fh.write(text)
    print(f"ontology-lists: took version {upstream['version']} from {source}; "
          "run the lints, then `python3 -m unittest discover -s scripts`")
    return 0


if __name__ == "__main__":
    sys.exit(main())
