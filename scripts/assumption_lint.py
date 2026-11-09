#!/usr/bin/env python3
"""The CI gate for the Assumptions Bank (`Assumptions/*.md`) — see docs/assumptions-bank.md.

An assumption set is one table, or one group of figures under one heading, of
one published document: the figures and facts it states, each with where in the
document it says so. Tools, Cowork and (later) the AI connector take a figure
from here, so the file has to be exactly the shape the readers parse
(`quiz/src/lib/assumptionBank.ts`), and every figure has to name where it came
from. This lint fails a set for:

  frontmatter  the canonical keys in the canonical order, every value
               double-quoted: Title, Source (a `[[link]]` to the document's
               resource page), Publisher, Edition, Effective (a date),
               Superseded by (optional, a `[[link]]` to the set that replaces
               it), Short name (optional, the tools' chip: "AIRB"),
               Jurisdiction (`CA`, `CA-ON`, `US` …), Line (optional, the line
               of business: "Private passenger auto"), Practice (optional),
               Extraction (`transcribed` or `extracted`), Document (the https
               link to the copy that was read), Source sha256 (the bytes that
               were read), Read (the date they were read), Page offset
               (optional: the PDF's page number less the printed one, so a
               locator's "p. 7" opens at the right page), Licence (optional),
               then the `verification:` block every content file carries
  table        one table, headed `| Assumption | Kind | Value | Unit | Locator |`,
               or with `| Basis | Meaning | Fits |` after it (a basis from the
               vocabulary's `bases`; a sentence saying what the figure is;
               `<tool id>#<tile>` for a figure that matches a tool's answer);
               every kind in the vocabulary (`assumption_vocab.json`) and every
               unit one its kind allows; a figure written as a plain number
               (`150`, `1.1189`, `-2.5` — no sign, comma or `%`, the unit says
               that) or left blank; a fact's value is the document's words and
               has no unit; every row a locator; no label twice
  shape        a lead paragraph before the table, and `## Sources` last, with
               the Document link among its entries
  links        Source lands on a page under `Resources/`; Superseded by on a
               set under `Assumptions/`

What no shape check can say is that a figure *is* the document's. That is what
`--against` is for: given the file that was read, it checks the bytes hash to
`Source sha256` and that every figure, and every fact's words, is printed in the
document's text. It reads a PDF's text layer (PyMuPDF, imported only here), an
HTML page's text, or plain text. A figure only an image of a page carries can't
pass it — note that in the set's lead, and leave it to VERIFY.

Usage:
    python3 scripts/assumption_lint.py                         # every set
    python3 scripts/assumption_lint.py "Assumptions/X.md"      # one set
    python3 scripts/assumption_lint.py --against doc.pdf "Assumptions/X.md"

Exits 1 on any error. Stdlib only, apart from `--against` on a PDF.
"""

from __future__ import annotations

import argparse
import glob
import hashlib
import html
import json
import os
import re
import sys
from dataclasses import dataclass, field

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import vault_links as vl  # noqa: E402
import verify_lib  # noqa: E402

ROOT = vl.REPO_ROOT
FOLDER = "Assumptions"

with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "assumption_vocab.json"), encoding="utf-8") as _fh:
    _VOCAB = json.load(_fh)
KINDS: dict[str, list[str]] = _VOCAB["kinds"]
BASES: list[str] = _VOCAB["bases"]

#: (key, required) in the order a set writes them, `verification` last.
KEYS: list[tuple[str, bool]] = [
    ("Title", True),
    ("Source", True),
    ("Publisher", True),
    ("Short name", False),
    ("Edition", True),
    ("Effective", True),
    ("Superseded by", False),
    ("Jurisdiction", True),
    ("Line", False),
    ("Practice", False),
    ("Extraction", True),
    ("Document", True),
    ("Source sha256", True),
    ("Read", True),
    ("Page offset", False),
    ("Licence", False),
]
EXTRACTIONS = ("transcribed", "extracted")
HEADER = ["Assumption", "Kind", "Value", "Unit", "Locator"]
#: The longer table (docs/tool-template-v2.md §4, D-TT1): each figure's basis,
#: what it is, and the tool answer it matches where it is one.
HEADER_EXPLAINED = HEADER + ["Basis", "Meaning", "Fits"]
FITS_RE = re.compile(r"^([a-z_]+\.[a-z0-9_]+)#[a-z0-9-]+$")
TOOLS_DIR = os.path.join(ROOT, "quiz", "src", "lib", "tools")

DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
JURISDICTION_RE = re.compile(r"^[A-Z]{2}(-[A-Z]{2})?$")
SHA_RE = re.compile(r"^[0-9a-f]{64}$")
NUMBER_RE = re.compile(r"^-?\d+(\.\d+)?$")
LINK_ONLY_RE = re.compile(r"^\[\[([^\]|#]+)\]\]$")
KEY_RE = re.compile(r'^([A-Za-z][A-Za-z0-9 ]*):\s*(.*)$')


@dataclass
class Row:
    label: str
    kind: str
    value: str
    unit: str
    locator: str
    line: int
    basis: str = ""
    meaning: str = ""
    fits: str = ""


@dataclass
class AssumptionSet:
    path: str
    meta: dict[str, str] = field(default_factory=dict)
    keys: list[str] = field(default_factory=list)
    rows: list[Row] = field(default_factory=list)
    errors: list[str] = field(default_factory=list)


def _cells(line: str) -> list[str]:
    inner = line.strip()
    if inner.startswith("|"):
        inner = inner[1:]
    if inner.endswith("|"):
        inner = inner[:-1]
    return [c.strip() for c in inner.split("|")]


def parse(path: str, text: str) -> AssumptionSet:
    """A set's frontmatter, keys in order, and rows — with the parse errors."""
    s = AssumptionSet(path=path)
    fm_text, body = verify_lib.split_frontmatter(text)
    if fm_text is None:
        s.errors.append("no frontmatter")
        return s
    for raw in fm_text.split("\n"):
        if raw.startswith((" ", "\t")) or not raw.strip():
            continue  # inside the verification block
        m = KEY_RE.match(raw)
        if not m:
            s.errors.append(f"frontmatter line not `Key: \"value\"`: {raw!r}")
            continue
        key, value = m.group(1), m.group(2).strip()
        s.keys.append(key)
        if key == "verification":
            continue
        if not (len(value) >= 2 and value.startswith('"') and value.endswith('"')):
            s.errors.append(f"{key}: value must be double-quoted")
            s.meta[key] = value
        else:
            s.meta[key] = value[1:-1].replace('\\"', '"')

    lines = body.split("\n")
    header_at = next((i for i, l in enumerate(lines) if l.strip().startswith("|")), None)
    if header_at is None:
        s.errors.append("no table")
        return s
    header = _cells(lines[header_at])
    if header not in (HEADER, HEADER_EXPLAINED):
        s.errors.append(f"table header must be | {' | '.join(HEADER)} | (or with | Basis | Meaning | Fits |)")
        return s
    if header_at + 1 >= len(lines) or not re.match(r"^\s*\|?\s*:?-{3,}", lines[header_at + 1]):
        s.errors.append("table header has no `|---|` separator row")
        return s
    i = header_at + 2
    while i < len(lines) and lines[i].strip().startswith("|"):
        cells = _cells(lines[i])
        if len(cells) != len(header):
            s.errors.append(f"table row {i + 1}: {len(cells)} cells, expected {len(header)}")
        else:
            label, kind, value, unit, locator, *rest = cells
            basis, meaning, fits = (rest + ["", "", ""])[:3]
            s.rows.append(Row(label, kind, value, unit, locator, line=i + 1, basis=basis, meaning=meaning, fits=fits))
        i += 1
    if any(l.strip().startswith("|") for l in lines[i:]):
        s.errors.append("more than one table: a set is one table (split it into two sets)")
    return s


_TOOL_IDS: set[str] | None = None


def tool_ids() -> set[str]:
    """Every tool's id, read off the engine's sources (`id: 'area.name'`)."""
    global _TOOL_IDS
    if _TOOL_IDS is None:
        found: set[str] = set()
        for dirpath, _dirs, files in os.walk(TOOLS_DIR):
            for name in files:
                if name.endswith(".ts") and not name.endswith(".test.ts"):
                    with open(os.path.join(dirpath, name), encoding="utf-8") as fh:
                        found.update(re.findall(r"\bid: '([a-z_]+\.[a-z0-9_]+)'", fh.read()))
        _TOOL_IDS = found
    return _TOOL_IDS


def lint(s: AssumptionSet, vault: vl.Vault, body: str) -> list[str]:
    errors = list(s.errors)
    # Frontmatter: order, presence, values.
    known = [k for k, _ in KEYS]
    for key in s.keys:
        if key not in known and key != "verification":
            errors.append(f"unknown key {key!r}")
    in_order = [k for k in s.keys if k in known]
    if in_order != [k for k in known if k in in_order]:
        errors.append("keys out of order: " + ", ".join(k for k, _ in KEYS))
    if "verification" in s.keys and s.keys[-1] != "verification":
        errors.append("`verification:` must be the last key")
    for key, required in KEYS:
        if required and not s.meta.get(key):
            errors.append(f"missing {key}")
    m = s.meta

    src = LINK_ONLY_RE.match(m.get("Source", ""))
    if m.get("Source") and not src:
        errors.append('Source must be one link, "[[Resource page]]"')
    elif src:
        state, rel = vault.resolve(src.group(1))
        if state != "exact" or not rel or not rel.startswith("Resources/"):
            errors.append(f"Source [[{src.group(1)}]] is not a resource page")
    if m.get("Superseded by"):
        sup = LINK_ONLY_RE.match(m["Superseded by"])
        target = sup and os.path.join(ROOT, FOLDER, sup.group(1) + ".md")
        if not target or not os.path.isfile(target):
            errors.append("Superseded by must link a set under Assumptions/")
    for key in ("Effective", "Read"):
        if m.get(key) and not DATE_RE.match(m[key]):
            errors.append(f"{key} must be a date, YYYY-MM-DD")
    if m.get("Jurisdiction") and not JURISDICTION_RE.match(m["Jurisdiction"]):
        errors.append("Jurisdiction must be a country code, optionally with a region (CA, CA-ON)")
    if m.get("Extraction") and m["Extraction"] not in EXTRACTIONS:
        errors.append(f"Extraction must be one of {', '.join(EXTRACTIONS)}")
    if m.get("Document") and not m["Document"].startswith("https://"):
        errors.append("Document must be an https link")
    if m.get("Page offset") and not re.match(r"^-?\d+$", m["Page offset"]):
        errors.append("Page offset is a whole number: the PDF's page number less the page number the document prints")
    if m.get("Source sha256") and not SHA_RE.match(m["Source sha256"]):
        errors.append("Source sha256 must be 64 lower-case hex digits")

    # Rows.
    if not s.rows and not s.errors:
        errors.append("the table has no rows")
    seen: set[str] = set()
    for r in s.rows:
        where = f"row {r.line} ({r.label or '?'})"
        if not r.label:
            errors.append(f"{where}: no label")
        if r.label in seen:
            errors.append(f"{where}: label used twice")
        seen.add(r.label)
        if r.kind not in KINDS:
            errors.append(f"{where}: kind {r.kind!r} is not in assumption_vocab.json")
            continue
        if r.unit not in KINDS[r.kind]:
            allowed = ", ".join(u or "(none)" for u in KINDS[r.kind])
            errors.append(f"{where}: unit {r.unit!r} is not one a {r.kind} row takes ({allowed})")
        if r.kind != "fact" and r.value and not NUMBER_RE.match(r.value):
            errors.append(f"{where}: a figure is a plain number (`150`, `1.1189`), not {r.value!r}")
        if not r.locator:
            errors.append(f"{where}: no locator")
        if r.basis and r.basis not in BASES:
            errors.append(f"{where}: basis {r.basis!r} is not in assumption_vocab.json ({', '.join(BASES)})")
        if r.fits:
            fm = FITS_RE.match(r.fits)
            if not fm:
                errors.append(f"{where}: Fits is `<tool id>#<tile>`, not {r.fits!r}")
            elif fm.group(1) not in tool_ids():
                errors.append(f"{where}: Fits names {fm.group(1)!r}, which is not a tool")
            if r.kind == "fact" or not r.value:
                errors.append(f"{where}: only a figure can fit a tool's answer")

    # Shape: a lead, then the table, then ## Sources last with the Document.
    pre = body.split("|", 1)[0]
    if not any(l.strip() and not l.startswith("#") for l in pre.split("\n")):
        errors.append("no lead paragraph before the table")
    headings = re.findall(r"^## (.+)$", body, flags=re.M)
    if not headings or headings[-1].strip() != "Sources":
        errors.append("`## Sources` must be the last section")
    else:
        sources = body[body.rfind("## Sources"):]
        if m.get("Document") and m["Document"] not in sources:
            errors.append("`## Sources` must list the Document link")
    return errors


# ── --against ────────────────────────────────────────────────────────────────

def document_text(path: str, data: bytes) -> str:
    if data[:5] == b"%PDF-":
        import pymupdf  # lazily: only `--against` on a PDF needs it

        with pymupdf.open(stream=data, filetype="pdf") as doc:
            return "\n".join(page.get_text() for page in doc)
    text = data.decode("utf-8", errors="replace")
    if re.search(r"<html|<body|<div", text, flags=re.I):
        text = re.sub(r"<(script|style)\b.*?</\1>", " ", text, flags=re.S | re.I)
        text = html.unescape(re.sub(r"<[^>]+>", " ", text))
    return text


def number_tokens(text: str) -> set[str]:
    """Every number printed in the text, as a set's figure would write it."""
    out: set[str] = set()
    for tok in re.findall(r"\d[\d,]*(?:\.\d+)?", text):
        out.add(tok.replace(",", ""))
    return out


def _words(text: str) -> str:
    return re.sub(r"\s+", " ", text.replace("’", "'")).strip().lower()


def check_against(s: AssumptionSet, path: str) -> list[str]:
    with open(path, "rb") as fh:
        data = fh.read()
    errors: list[str] = []
    digest = hashlib.sha256(data).hexdigest()
    if digest != s.meta.get("Source sha256"):
        errors.append(f"{path} hashes to {digest}, not the set's Source sha256")
    text = document_text(path, data)
    numbers, words = number_tokens(text), _words(text)
    for r in s.rows:
        if not r.value:
            continue
        if r.kind == "fact":
            if _words(r.value) not in words:
                errors.append(f"row {r.line} ({r.label}): {r.value!r} is not in the document's text")
        elif r.value.lstrip("-") not in numbers:
            errors.append(f"row {r.line} ({r.label}): {r.value} is not printed in the document's text")
    return errors


# ── main ─────────────────────────────────────────────────────────────────────

def set_paths(args: list[str]) -> list[str]:
    if args:
        return [os.path.relpath(os.path.abspath(a), ROOT).replace(os.sep, "/") for a in args]
    return sorted(os.path.relpath(p, ROOT).replace(os.sep, "/") for p in glob.glob(os.path.join(ROOT, FOLDER, "*.md")))


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("paths", nargs="*", help="sets to lint (default: every Assumptions/*.md)")
    ap.add_argument("--against", metavar="FILE", help="the document that was read: check the hash and that every figure is printed in it")
    ap.add_argument("--quiet", action="store_true")
    args = ap.parse_args(argv)

    vault = vl.Vault(ROOT)
    paths = set_paths(args.paths)
    if args.against and len(paths) != 1:
        ap.error("--against checks one set at a time")
    failed = 0
    names: dict[str, str] = {}
    for rel in paths:
        with open(os.path.join(ROOT, rel), encoding="utf-8") as fh:
            text = fh.read()
        s = parse(rel, text)
        _, body = verify_lib.split_frontmatter(text)
        errors = lint(s, vault, body)
        name = os.path.splitext(os.path.basename(rel))[0].lower()
        if name in names:
            errors.append(f"same name as {names[name]}: a set is addressed by its name")
        names[name] = rel
        if args.against:
            errors += check_against(s, args.against)
        if errors:
            failed += 1
            print(f"✗ {rel}")
            for e in errors:
                print(f"    {e}")
        elif not args.quiet:
            note = f" — {len([r for r in s.rows if r.value])} values found in {os.path.basename(args.against)}" if args.against else ""
            print(f"✓ {rel} ({len(s.rows)} rows){note}")
    if not args.quiet:
        print(f"{len(paths) - failed}/{len(paths)} sets pass")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
