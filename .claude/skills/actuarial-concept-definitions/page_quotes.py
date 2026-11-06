#!/usr/bin/env python3
"""List what the answerability record quotes from concept pages.

    python3 -I .claude/skills/actuarial-concept-definitions/page_quotes.py "Permutation" ["Event" ...]

For every requirement in simulations/answerability/<bank>.json whose place is
one of the named pages, prints OK (the quote is still on the page) or GONE (it
isn't — re-quote it with `scripts/answerability_lib.py resolve` once the page
is approved, or report that the page no longer teaches it). Read-only.
"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]


def main(pages: list[str]) -> int:
    if not pages:
        print(__doc__)
        return 2
    bodies = {}
    for page in pages:
        path = ROOT / "Concepts" / f"{page}.md"
        bodies[page] = path.read_text(encoding="utf-8") if path.exists() else None
    gone = 0
    for record in sorted((ROOT / "simulations" / "answerability").glob("*.json")):
        data = json.loads(record.read_text(encoding="utf-8"))
        for qid, question in sorted(data.get("questions", {}).items()):
            for req in question.get("requirements", []):
                for place in req.get("places") or []:
                    page = place.get("page")
                    if page not in bodies:
                        continue
                    body = bodies[page]
                    ok = body is not None and place.get("quote", "") in body
                    gone += not ok
                    print(f"{'OK  ' if ok else 'GONE'} {data.get('bank')} {qid}:{req.get('id')} "
                          f"[{page}] {req.get('statement', '')[:110]}")
    print(f"\n{gone} quote(s) no longer on their page")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
