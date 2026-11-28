#!/usr/bin/env python3
"""verify_repass.py — re-verify rewritten pages cheaply (`docs/verification-plan.md` §4a).

A page that was verified and then rewritten is `stale`. It already knows where its
facts were read: the last pass's `sources:` name each document, its sha256 and the
pages. So a re-pass searches for nothing. This builds one **packet** per source
document — every stale page that cites it — and does the mechanical half:

  * the source pages the last pass named, read once from the shared cache;
  * each page cut into **claims** (definition, formula, bullet, example, card),
    each tagged `carried` when the same words were in the page's last verified
    revision (read from git) and `new` otherwise;
  * each worked example's question on its own, to be solved before its answer is read.

A checker then reads only the claims against the excerpts. Nothing here verifies
anything: a page still reaches `verified` only through `verify_record.py`, with the
source cited (P1).

It also measures the checker. `seed` plants known errors in copies of a packet's
pages, and `score` says how many of them a checker's findings caught.

Usage:
  python3 scripts/verify_repass.py plan                       # the packets, largest first
  python3 scripts/verify_repass.py build --source dartmouth --out <dir> [--limit N]
  python3 scripts/verify_repass.py seed <dir> --out <dir2> [--per-page 3] [--seed 1]
  python3 scripts/verify_repass.py score <key.json> <findings dir>
  python3 scripts/verify_repass.py ops <findings dir> --packet <dir>   # verify_record batch ops

The packet and the seeded copies are written outside the repo. Stdlib only, plus
the source cache (`verify_sources.py`) for `build`.
"""
from __future__ import annotations

import argparse
import json
import random
import re
import subprocess
import sys
from collections import Counter, defaultdict
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import verify_lib as V  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
URL_RE = re.compile(r"https?://\S+")
PDF_PAGES_RE = re.compile(r"PDF\s+pp?\.?\s*(\d+)(?:\s*[-–]\s*(\d+))?")
NUM_RE = re.compile(r"(?<![\w.])\d[\d,]*\.?\d*%?")


# ─── The record: which pages are stale, and what each was read against ────────

def source_url(source: str) -> str:
    m = URL_RE.search(source)
    if not m:
        return ""
    url = m.group(0).rstrip('".,')
    while url.endswith(")") and url.count(")") > url.count("("):
        url = url[:-1]
    return url


def source_pages(source: str) -> list[int]:
    """The PDF pages a citation names: "PDF pp.26-32" → 26…32. None named → []."""
    pages: set[int] = set()
    for a, b in PDF_PAGES_RE.findall(source):
        lo, hi = int(a), int(b or a)
        if lo <= hi <= lo + 60:
            pages.update(range(lo, hi + 1))
    return sorted(pages)


def stale_pages(folder: str = "Concepts", root: Path = ROOT) -> list[dict]:
    out = []
    for path in sorted((root / folder).glob("*.md")):
        block = V.parse_verification(path.read_text(encoding="utf-8"))
        if block and block.get("status") == "stale":
            out.append({"path": f"{folder}/{path.name}", "sources": list(block.get("sources") or []),
                        "last_checked": str(block.get("last_checked") or "")})
    return out


def packets(pages: list[dict]) -> dict[str, list[dict]]:
    """One packet per source URL. A page goes to the packet of the source it cites
    that the most stale pages cite, so the big documents are loaded once."""
    weight = Counter(u for p in pages for u in {source_url(s) for s in p["sources"]} if u)
    out: dict[str, list[dict]] = defaultdict(list)
    for p in pages:
        urls = {source_url(s) for s in p["sources"]} - {""}
        anchor = max(urls, key=lambda u: (weight[u], u)) if urls else ""
        out[anchor].append(p)
    return dict(sorted(out.items(), key=lambda kv: -len(kv[1])))


# ─── Claims ───────────────────────────────────────────────────────────────────

def body_of(text: str) -> str:
    return V.split_frontmatter(V.hashable_content(text))[1]


def split_units(body: str) -> list[dict]:
    """A page as units a checker can tick off: blocks separated by blank lines,
    a callout kept whole, each top-level bullet of a plain list on its own."""
    units: list[dict] = []
    for block in re.split(r"\n[ \t]*\n", body.strip()):
        block = block.strip("\n")
        if not block.strip():
            continue
        first = block.lstrip().splitlines()[0]
        if first.startswith("![["):
            continue
        if first.startswith("#"):
            units.append({"kind": "heading", "text": block})
        elif first.startswith(">"):
            m = re.match(r">\s*\[!(\w+)\][-+]?\s*(.*)", first)
            if m and m.group(1) == "example" and "{Example}" in first:
                units.append({"kind": "example", "text": block,
                              "question": m.group(2).replace("{Example}", "").strip()})
            elif m:
                units.append({"kind": m.group(1).lower(), "text": block})
            elif "$$" in first:
                units.append({"kind": "formula", "text": block})
            else:
                units.append({"kind": "quote", "text": block})
        elif re.match(r"\s*[-*] ", first):
            for item in re.split(r"\n(?=[-*] )", block):
                units.append({"kind": "bullet", "text": item})
        elif first.startswith("|"):
            units.append({"kind": "table", "text": block})
        else:
            units.append({"kind": "prose", "text": block})
    for u in units:
        if u["kind"] == "prose":
            u["kind"] = "definition"
            break
    return units


def norm_unit(text: str) -> str:
    """What makes two units the same claim: the words and the math, not the markup."""
    t = re.sub(r"\[\[(?:[^\]|]*\|)?([^\]]*)\]\]", r"\1", text)
    t = re.sub(r"\\displaystyle|\\left|\\right|\\[,;!]|\{Example\}", "", t)
    t = re.sub(r"^[>\s]*", "", t, flags=re.M)
    t = re.sub(r"[*_`>]|\[![a-z]+\][-+]?", "", t)
    return re.sub(r"\s+", "", t).lower()


def tag_units(units: list[dict], old_body: str | None) -> list[dict]:
    old_units = split_units(old_body) if old_body else []
    seen = {norm_unit(u["text"]) for u in old_units}
    old_flat = norm_unit(old_body or "")
    old_nums = set(NUM_RE.findall(old_body or ""))
    for u in units:
        n = norm_unit(u["text"])
        u["carried"] = bool(old_body) and (n in seen or (len(n) > 30 and n in old_flat))
        u["new_numbers"] = sorted({x for x in NUM_RE.findall(u["text"]) if x not in old_nums}) if old_body else []
    return units


def last_verified_revision(path: str, root: Path = ROOT, depth: int = 40) -> str | None:
    """The page as it was the last time its block said `verified`, from git."""
    def git(*args: str) -> str:
        return subprocess.run(["git", *args], cwd=root, capture_output=True, text=True).stdout
    for commit in git("log", f"-{depth}", "--format=%H", "--", path).split():
        text = git("show", f"{commit}:{path}")
        block = V.parse_verification(text) if text else None
        if block and block.get("status") == "verified":
            return text
    return None


def slug(path: str) -> str:
    return re.sub(r"[^A-Za-z0-9]+", "-", Path(path).stem).strip("-")


def claims_markdown(path: str, units: list[dict]) -> str:
    lines = [f"# Claims: {path}", "",
             "`new` was not in the page's last verified revision. `carried` was, word for word;",
             "check it against the excerpt all the same, it is only less likely to be wrong.", ""]
    n = 0
    for u in units:
        if u["kind"] == "heading":
            lines += [u["text"], ""]
            continue
        n += 1
        tag = "carried" if u["carried"] else "new"
        extra = f" · numbers not in the verified revision: {', '.join(u['new_numbers'])}" if u["new_numbers"] and not u["carried"] else ""
        if u["kind"] == "example":
            lines += [f"**C{n}** · example · {tag} — solve it in `blind.md` before reading the page's answer{extra}", ""]
        else:
            lines += [f"**C{n}** · {u['kind']} · {tag}{extra}", "", u["text"], ""]
    return "\n".join(lines)


def blind_markdown(path: str, units: list[dict]) -> str:
    qs = [(i, u) for i, u in enumerate([x for x in units if x["kind"] != "heading"], 1) if u["kind"] == "example"]
    lines = [f"# Worked examples, questions only: {path}", "",
             "Solve each with code before opening the page (P5). Then compare every line of the page's working.", ""]
    for i, u in qs:
        lines += [f"- **C{i}** {u['question']}"]
    return "\n".join(lines) + "\n"


CHECKER = """# Checking a re-pass packet

You are fact checking rewritten study pages against the sources their last check
read. Work only from this packet and the source cache. Do not edit any file in the
repository and do not record anything: you write one JSON file per page, and the
caller records.

The rules that decide the outcome:

- **Only a source verifies.** A claim is confirmed when you have read it in a source
  excerpt this session. Your own reasoning can show a claim is wrong; it cannot show
  one is right.
- **Compute before you look.** Solve every worked example yourself, with code, before
  you open the page.
- **Report, don't repair.** A problem is a finding with the page's exact words quoted.

For each page folder you are given, in this order:

1. `blind.md`: each worked example's question. Solve each one with Python (run it) and
   keep your answers.
2. `claims.md`: the page cut into numbered claims. `page.md` is the page as a reader
   sees it. `log.md` is everything earlier checks found: read it all; an open finding
   there is to be confirmed or reported fixed, not found again.
3. `sources.md`: the sources the last check read, each with where its excerpt is:
   `source/<key>/pNNNN.txt`, one file per PDF page. Read the pages it names. Where it
   names no page (a web page kept whole), grep the file for the claim's terms and read
   around the hits; don't read it end to end.
4. Check every claim:
   - a **formula**: find it in a source. A difference of notation is noted, not an error.
     A missing condition, a wrong sign, bound, exponent or index is an error.
   - a **definition or statement**: the source says it, with the same conditions.
   - a **worked example**: your answer against every line of the page's working,
     and the method against the source's.
   - a statement about what **an exam** covers or how it writes something: only a
     syllabus or that exam's reading confirms it.
5. A claim the excerpts don't cover: look further in the same documents
   (`python3 scripts/verify_sources.py search <url> "term" "other term"`, then
   `python3 scripts/verify_sources.py text <url> --pages 12-14`). If no source you can
   reach covers it, list its claim number under `unsourced` and file a `minor` finding.

Severity: `critical` a student who trusts the page gets a question wrong (a wrong
formula, a wrong number or step in an example); `major` materially misleading (a
definition that contradicts the source, a condition left off); `minor` wrong but of
little consequence, or a fact no source supports; `nit` cosmetic.

Write `<findings dir>/<page folder name>.json`:

```json
{
 "path": "Concepts/<page>.md",
 "verdict": "clean | findings | unreachable",
 "confidence": "high | medium",
 "checks": "what you checked against what, claim by claim, so a reviewer can re-check it without redoing it",
 "sources": ["one citation per source you actually read, from `python3 scripts/verify_sources.py cite <url> --locator \"§4.1, PDF pp.153-154\"`"],
 "findings": [
  {"severity": "critical", "title": "short", "locus": "C7, the variance formula",
   "quote": "the page's exact line, copied from page.md",
   "claim": "what the page says", "evidence": "what the source says and where; what the numbers do",
   "source_rank": 2, "proposed_action": "the exact replacement text, where one can be transcribed"}
 ],
 "unsourced": ["C12"],
 "examples_recomputed": 4
}
```

`source_rank`: 1 official exam material or syllabus, 2 a syllabus reading, 3 another
reputable reference, 5 your own computation. `verdict` is `unreachable` when you could
not read a source for the page at all. Write findings in plain words a student could
follow: what is wrong, where, and what the source says.
"""


# ─── Build a packet ───────────────────────────────────────────────────────────

def build(anchor: str, pages: list[dict], out: Path, fetch: bool = True, root: Path = ROOT) -> dict:
    import verify_sources as S

    out.mkdir(parents=True, exist_ok=True)
    wanted: dict[str, set[int]] = defaultdict(set)
    manifest = {"anchor": anchor, "pages": []}
    for p in pages:
        text = (root / p["path"]).read_text(encoding="utf-8")
        old = last_verified_revision(p["path"], root)
        units = tag_units(split_units(body_of(text)), body_of(old) if old else None)
        d = out / "pages" / slug(p["path"])
        d.mkdir(parents=True, exist_ok=True)
        (d / "page.md").write_text(body_of(text), encoding="utf-8")
        (d / "claims.md").write_text(claims_markdown(p["path"], units), encoding="utf-8")
        (d / "blind.md").write_text(blind_markdown(p["path"], units), encoding="utf-8")
        log = root / V.log_rel_for(p["path"])
        (d / "log.md").write_text(log.read_text(encoding="utf-8") if log.exists() else "", encoding="utf-8")
        src_lines = [f"# Sources the last pass read: {p['path']}", ""]
        for s in p["sources"]:
            url, pp = source_url(s), source_pages(s)
            if url:
                wanted[url].update(pp)
                where = f"`source/{S.cache_key(url)}/` pages {S.ranges(pp)}" if pp else f"`source/{S.cache_key(url)}/` (no page named: search it)"
                src_lines += [f"- {s}", f"  - excerpt: {where}"]
            else:
                src_lines += [f"- {s}", "  - no URL recorded"]
        (d / "sources.md").write_text("\n".join(src_lines) + "\n", encoding="utf-8")
        claims = [u for u in units if u["kind"] != "heading"]
        manifest["pages"].append({"path": p["path"], "dir": str(d.relative_to(out)),
                                  "claims": len(claims), "new": sum(not u["carried"] for u in claims),
                                  "examples": sum(u["kind"] == "example" for u in claims),
                                  "had_verified_revision": old is not None})
    sources = {}
    for url, pp in sorted(wanted.items()):
        key = S.cache_key(url)
        entry = {"url": url, "key": key, "pages": sorted(pp)}
        if fetch:
            try:
                meta = S.fetch(url, root=None)
                entry.update(sha256=meta.get("sha256", ""), total_pages=meta.get("pages"), title=meta.get("title", ""))
                sd = out / "source" / key
                sd.mkdir(parents=True, exist_ok=True)
                spec = S.ranges(sorted(pp)) if pp and meta.get("pages", 1) > 1 else None
                if pp or meta.get("pages", 1) == 1:
                    for n, txt in S.read_pages(url, spec):
                        (sd / f"p{n:04d}.txt").write_text(txt, encoding="utf-8")
            except Exception as exc:  # a dead link is the checker's to report, not a crash
                entry["error"] = str(exc)[:200]
        sources[key] = entry
    manifest["sources"] = sources
    (out / "manifest.json").write_text(json.dumps(manifest, indent=1), encoding="utf-8")
    (out / "CHECKER.md").write_text(CHECKER, encoding="utf-8")
    return manifest


# ─── Seeded errors: measuring the checker ─────────────────────────────────────

WORD_SWAPS = [("at most", "at least"), ("at least", "at most"), ("increases", "decreases"),
              ("decreases", "increases"), ("above", "below"), ("below", "above"),
              ("larger", "smaller"), ("smaller", "larger"), ("independent", "dependent"),
              ("sum", "product"), ("divided by", "multiplied by")]
MATH_SWAPS = [(" + ", " - "), (" - ", " + "), ("1-", "1+"), ("1 -", "1 +"), (r"\le ", "< "),
              (r"\ge ", "> "), ("^2", "^3"), (r"\sqrt", ""), ("n-1", "n"), (r"\cdot", "+")]


def _bump(num: str, rng: random.Random) -> str:
    digits = [c for c in num if c.isdigit()]
    if len(digits) >= 3 and rng.random() < 0.5:           # transpose two unlike digits
        idx = [i for i, c in enumerate(num) if c.isdigit()]
        for a, b in zip(idx, idx[1:]):
            if num[a] != num[b] and b == a + 1:
                return num[:a] + num[b] + num[a] + num[b + 1:]
    i = max(i for i, c in enumerate(num) if c.isdigit())
    return num[:i] + str((int(num[i]) + rng.choice([1, 2, 3])) % 10) + num[i + 1:]


def mutate(body: str, per_page: int, rng: random.Random) -> tuple[str, list[dict]]:
    """Plant up to `per_page` errors, one per line, of different kinds where it can."""
    lines = body.split("\n")
    in_example = False
    cands: dict[str, list[tuple[int, str]]] = {"formula": [], "example": [], "prose": []}
    for i, line in enumerate(lines):
        if re.match(r">\s*\[!", line):
            in_example = "{Example}" in line
            continue
        if not line.startswith(">"):
            in_example = False
        if line.startswith("> $$") and not in_example:
            for a, b in MATH_SWAPS:
                if a in line and line.replace(a, b, 1) != line:
                    cands["formula"].append((i, line.replace(a, b, 1)))
                    break
        elif in_example and "=" in line:
            nums = list(NUM_RE.finditer(line))
            if nums:
                m = nums[-1]
                cands["example"].append((i, line[:m.start()] + _bump(m.group(0), rng) + line[m.end():]))
        elif line and not line.startswith(("#", "!", "|")) and not in_example:
            for a, b in WORD_SWAPS:
                if re.search(rf"\b{a}\b", line):
                    cands["prose"].append((i, re.sub(rf"\b{a}\b", b, line, count=1)))
                    break
    planted: list[dict] = []
    kinds = [k for k in ("formula", "example", "prose") if cands[k]]
    while kinds and len(planted) < per_page:
        for k in list(kinds):
            if len(planted) >= per_page:
                break
            if not cands[k]:
                kinds.remove(k)
                continue
            i, new = cands[k].pop(rng.randrange(len(cands[k])))
            if new == lines[i] or any(p["line"] == i + 1 for p in planted):
                continue
            planted.append({"kind": k, "line": i + 1, "was": lines[i], "now": new})
            lines[i] = new
    return "\n".join(lines), planted


def seed_packet(src: Path, out: Path, per_page: int, seed: int) -> dict:
    import shutil
    if out.exists():
        shutil.rmtree(out)
    shutil.copytree(src, out)
    rng = random.Random(seed)
    key = {}
    manifest = json.loads((out / "manifest.json").read_text())
    for p in manifest["pages"]:
        d = out / p["dir"]
        body, planted = mutate((d / "page.md").read_text(encoding="utf-8"), per_page, rng)
        (d / "page.md").write_text(body, encoding="utf-8")
        units = split_units(body)
        for u in units:                      # a seeded copy shows no carried/new tags: they would give the plant away
            u["carried"], u["new_numbers"] = False, []
        (d / "claims.md").write_text(claims_markdown(p["path"], units).replace(" · new", ""), encoding="utf-8")
        key[p["path"]] = planted
    return key


def _digits(s: str) -> str:
    return re.sub(r"\s+", "", s)


def score(key: dict, findings_dir: Path) -> dict:
    """A plant is caught when some finding on its page quotes the planted line
    (or the part of it that changed)."""
    rows, caught = [], 0
    for path, planted in key.items():
        f = findings_dir / f"{slug(path)}.json"
        found = json.loads(f.read_text()).get("findings", []) if f.exists() else []
        blob = _digits(" ".join(json.dumps(x, ensure_ascii=False) for x in found))
        blob = blob.replace("\\\\", "\\")
        for p in planted:
            now = _digits(p["now"].lstrip("> -"))
            hit = bool(found) and (now[:60] in blob or _changed(p) in blob)
            caught += hit
            rows.append({"page": path, **p, "caught": hit})
    total = sum(len(v) for v in key.values())
    return {"planted": total, "caught": caught, "rows": rows}


def _changed(p: dict) -> str:
    """The 24 characters around where the planted line departs from the original."""
    a, b = _digits(p["was"]), _digits(p["now"])
    i = next((k for k, (x, y) in enumerate(zip(a, b)) if x != y), min(len(a), len(b)))
    return b[max(0, i - 12): i + 12]


# ─── Findings → verify_record batch ops ───────────────────────────────────────

def ops_from_findings(findings_dir: Path, packet: Path) -> list[dict]:
    """Each checker result as recorder ops. A page with nothing open and a cited
    source passes; a page with a finding is recorded with the finding and left
    `in_review` until it is fixed and re-read."""
    manifest = json.loads((packet / "manifest.json").read_text())
    ops: list[dict] = []
    for p in manifest["pages"]:
        f = findings_dir / f"{slug(p['path'])}.json"
        if not f.exists():
            continue
        r = json.loads(f.read_text())
        for x in r.get("findings", []):
            ops.append({"op": "finding", "path": p["path"], "severity": x["severity"], "title": x.get("title", ""),
                        "locus": x["locus"], "claim": x["claim"], "evidence": x["evidence"],
                        "proposed_action": x.get("proposed_action", ""), "source_rank": x.get("source_rank")})
        sources = r.get("sources") or []
        blocking = [x for x in r.get("findings", []) if x["severity"] in ("critical", "major", "minor")]
        status = "verified" if sources and not blocking and r.get("verdict") != "unreachable" else "in_review"
        ops.append({"op": "pass", "path": p["path"], "status": status,
                    "confidence": r.get("confidence", "high") if status == "verified" else None,
                    "source": sources, "checks": r.get("checks", ""), "note": r.get("note", "")})
    return ops


# ─── CLI ──────────────────────────────────────────────────────────────────────

def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    p = sub.add_parser("plan")
    p.add_argument("--folder", default="Concepts")
    p.add_argument("--json", action="store_true")
    p = sub.add_parser("build")
    p.add_argument("--source", required=True, help="substring of the packet's source URL")
    p.add_argument("--out", required=True)
    p.add_argument("--folder", default="Concepts")
    p.add_argument("--limit", type=int)
    p.add_argument("--only", nargs="*", help="page names to keep")
    p.add_argument("--no-fetch", action="store_true")
    p = sub.add_parser("seed")
    p.add_argument("packet")
    p.add_argument("--out", required=True)
    p.add_argument("--key", required=True, help="where to write the answer key (keep it out of the packet)")
    p.add_argument("--per-page", type=int, default=3)
    p.add_argument("--seed", type=int, default=1)
    p = sub.add_parser("score")
    p.add_argument("key")
    p.add_argument("findings")
    p = sub.add_parser("ops")
    p.add_argument("findings")
    p.add_argument("--packet", required=True)
    args = ap.parse_args(argv)

    if args.cmd == "plan":
        pk = packets(stale_pages(args.folder))
        if args.json:
            print(json.dumps({u: [p["path"] for p in ps] for u, ps in pk.items()}, indent=1))
        else:
            print(f"{sum(len(v) for v in pk.values())} stale page(s) in {len(pk)} packet(s)")
            for url, ps in pk.items():
                print(f"{len(ps):4d}  {url or '(no source recorded)'}")
        return 0
    if args.cmd == "build":
        pk = packets(stale_pages(args.folder))
        hits = [u for u in pk if args.source in u]
        if len(hits) != 1:
            raise SystemExit(f"--source matches {len(hits)} packets: {hits[:5]}")
        pages = pk[hits[0]]
        if args.only:
            pages = [p for p in pages if Path(p["path"]).stem in args.only]
        if args.limit:
            pages = pages[: args.limit]
        m = build(hits[0], pages, Path(args.out), fetch=not args.no_fetch)
        claims = sum(p["claims"] for p in m["pages"])
        print(f"{len(m['pages'])} page(s), {claims} claim(s), {sum(p['new'] for p in m['pages'])} new, "
              f"{sum(p['examples'] for p in m['pages'])} example(s), {len(m['sources'])} source(s) → {args.out}")
        bad = [s["url"] for s in m["sources"].values() if s.get("error")]
        if bad:
            print("could not fetch:", *bad, sep="\n  ")
        return 0
    if args.cmd == "seed":
        key = seed_packet(Path(args.packet), Path(args.out), args.per_page, args.seed)
        Path(args.key).write_text(json.dumps(key, indent=1, ensure_ascii=False), encoding="utf-8")
        print(f"{sum(len(v) for v in key.values())} error(s) planted on {len(key)} page(s); key → {args.key}")
        return 0
    if args.cmd == "score":
        r = score(json.loads(Path(args.key).read_text()), Path(args.findings))
        for row in r["rows"]:
            print(("caught " if row["caught"] else "MISSED ") + f"{row['kind']:8s} {row['page']}:{row['line']}  {row['now'][:90]}")
        print(f"{r['caught']} of {r['planted']} caught")
        return 0
    if args.cmd == "ops":
        print(json.dumps(ops_from_findings(Path(args.findings), Path(args.packet)), indent=1, ensure_ascii=False))
        return 0
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
