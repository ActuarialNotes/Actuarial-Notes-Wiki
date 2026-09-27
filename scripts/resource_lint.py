#!/usr/bin/env python3
"""The CI gate for resource pages (`Resources/Books/*.md`) — see docs/resource-pages.md.

A resource page describes one real document: a textbook, a study note, a
standard, a guideline, a return. It is read in the wiki, in the concept popup,
on an exam page's Source Material shelf, in Cowork and through the AI
connector, and every one of those surfaces trusts it to say what the document
says. This lint holds each page to the one shape the standard defines, and
fails it for:

  frontmatter  the canonical keys in the canonical order, every value
               double-quoted, no deprecated key (`Author`, `Find at your local
               library at`, the lower-case timeline keys), `Type` from the
               vocabulary, a four-digit `Year` with `date` equal to it, an
               ordinal `Edition`, an ISBN whose check digit holds, and an
               `Available from` written `"[host](url)"` with the label naming
               the link's own host
  shape        the cover embed first (an image that exists), then one lead
               paragraph, then — for a syllabus reading — the `> [!info] On the
               syllabus` callout, then the document's own divisions as `##`
               headings with lists beneath them, then `## Related readings`
               (optional), then `## Sources` last
  syllabus     the callout names exactly the exams whose Source Material
               callout lists the page, one bullet each, each saying what that
               exam assigns
  provenance   `## Sources` lists at least the document itself, each entry a
               link with a ` — ` note of what was taken from it, and includes
               the `Available from` link when there is one
  editorial    no heading of the commentary kind the standard retired ("Why it
               is on the syllabus", "The exam angles", …): a page describes the
               document, and study notes belong on concept pages
  links        every `[[link]]` lands exactly (vault_links.Vault — Obsidian
               forgives case, the app does not)

A page the vault wrote itself (`Publisher: "Actuarial Notes"`, e.g. the
distribution reference sheet) describes no external document, so it is exempt
from the provenance, editorial and year rules.

What no lint can check is that a heading *is* the document's own or that a
bullet says what the document says — that is what the extraction step and
VERIFY are for (docs/resource-pages.md, "The pipeline").

Usage:
    python3 scripts/resource_lint.py                      # every page
    python3 scripts/resource_lint.py "Resources/Books/OSFI MCT.md"
    python3 scripts/resource_lint.py --quiet              # errors only
    python3 scripts/resource_lint.py --fix                # canonicalise the frontmatter

`--fix` only does what is mechanical: key order, quoting, `Author` → `Authors`,
`date` set to `Year`. It never chooses a `Type` or writes a value.

Exits 1 on any error. Stdlib only.
"""

from __future__ import annotations

import argparse
import glob
import os
import re
import sys
import urllib.parse
from dataclasses import dataclass, field

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import syllabus_lib as sl  # noqa: E402
import vault_links as vl  # noqa: E402
import verify_lib  # noqa: E402

ROOT = vl.REPO_ROOT
BOOKS = "Resources/Books"
ATTACHMENTS = "Media/Attachments"

# ── the standard, as data ────────────────────────────────────────────────────

# Canonical order. `verification:` is always last and owned by verify_check.py.
KEY_ORDER = (
    "Title", "Authors", "Publisher", "Year", "date", "Edition", "Type", "Code", "ISBN",
    "Available from", "description",
)
REQUIRED = ("Title", "Authors", "Publisher", "Type")
DEPRECATED = {
    "Author": "use `Authors` (one key, however many authors)",
    "Find at your local library at": "drop it — the card builds its library search from `ISBN`",
}

# What kind of document it is — the kicker on the card and the cover. One
# value per kind, not per publisher's name for it: the lead says "a CIA
# research paper"; the Type says `Paper`.
TYPES = (
    "Textbook",               # a published book
    "Casebook",               # a book of cases with commentary
    "Study Note",             # a CAS/SOA study note
    "Monograph",              # the CAS monograph series
    "Paper",                  # a journal, E-Forum, research or working-party paper; an article
    "Report",                 # a government, committee, consultant or research report
    "Educational Note",       # CIA educational notes
    "Standard of Practice",   # ASB ASOPs, the CIA's Standards of Practice
    "Statement of Principles",
    "Guideline",              # a regulator's guideline or guidance
    "Regulatory Return",      # a return's forms (a workbook, usually)
    "Instructions",           # filing instructions, a return's instructions, filing guidelines
    "Legislation",            # a statute or regulation
    "Case Law",               # court decisions, compiled
    "Code of Conduct",
    "Guide",                  # a guide to a plan or program, for policyholders or insurers
    "Glossary",
    "Reference Sheet",        # the vault's own reference pages
)

VAULT_PUBLISHER = "Actuarial Notes"
SYLLABUS_CALLOUT = "> [!info] On the syllabus"
SOURCES_HEADING = "Sources"
RELATED_HEADING = "Related readings"
MIN_LEAD, MAX_LEAD = 60, 700     # MIN_LEAD is quiz/src/lib/seo.ts's: shorter and SEO ignores it

# Headings of the commentary kind the standard retired — the phrasings the
# review found (docs/resource-pages.md §1), not every heading that opens with
# "Why" or "What": a document's own divisions do that too ("What do the terms
# mean?", "How Charts Work", "Where We Are Now"). What they said that the
# document supports now lives under the division that says it.
EDITORIAL_HEADING = re.compile(
    r"^(why (it|a life|the design|the instructions|the exam|eligibility)\b|"
    r"what (it covers|the syllabus|the paper covers|chapters|is in the assigned|to take|"
    r"the risk adjustment|\"standards|the guideline sets)|"
    r"where it\b|how (the exam|to read it)|the exam\b|exam angles?|points worth|"
    r"the mechanics|mechanics\b|reading note|reading a |the argument|the subject$|the principle$|"
    r"the comparison|the organi[sz]ing|the problem the|the answer$|the asymmetr|the judge?ments|"
    r"the technical points|the full return|the two assigned|the assigned|the three families|"
    r"the ratio$|historical significance|strategic impact|syllabus scope|scope on the syllabus|"
    r"key takeaways|fct versus orsa|links?$|contents$)",
    re.I,
)

# A document no one could read (a study-kit text with no copy online) says so
# instead of growing divisions from memory — the page then has none.
UNAVAILABLE_CALLOUT = "> [!note] Contents unavailable"

ISBN_RE = re.compile(r"^(?:97[89][- ]?)?(?:\d[- ]?){9}[\dX]$", re.I)
ORDINAL_RE = re.compile(r"^\d+(?:st|nd|rd|th)$")
LINK_VALUE_RE = re.compile(r"^\[([^\]]+)\]\((https?://[^)\s]+)\)$")
MD_LINK_RE = re.compile(r"\[[^\]]+\]\((https?://[^)\s]+)\)")
IMAGE_EMBED_RE = re.compile(r"^!\[\[([^\]|]+\.(?:png|jpe?g|gif|svg|webp|avif))(?:\|[^\]]*)?\]\]\s*$", re.I)
HEADING_RE = re.compile(r"^(#{1,6})\s+(.*?)\s*$")


# ── parsing ──────────────────────────────────────────────────────────────────

@dataclass
class Field:
    key: str
    value: str
    quoted: bool
    line: int


@dataclass
class Page:
    rel: str
    text: str
    fields: list[Field]
    has_verification: bool
    body: str
    body_offset: int                     # 1-based line number of the body's first line
    fm_errors: list[tuple[int, str]] = field(default_factory=list)

    def get(self, key: str) -> str | None:
        for f in self.fields:
            if f.key == key:
                return f.value
        return None


def _unquote(raw: str) -> tuple[str, bool]:
    raw = raw.strip()
    if len(raw) >= 2 and raw[0] == raw[-1] == '"':
        return raw[1:-1].replace('\\"', '"').replace("\\\\", "\\"), True
    if len(raw) >= 2 and raw[0] == raw[-1] == "'":
        return raw[1:-1].replace("''", "'"), True
    return raw, False


def parse_page(rel: str, text: str | None = None) -> Page:
    if text is None:
        with open(os.path.join(ROOT, rel), encoding="utf-8") as fh:
            text = fh.read()
    fm, body = verify_lib.split_frontmatter(text)
    fields: list[Field] = []
    errors: list[tuple[int, str]] = []
    has_verification = False
    if fm is None:
        return Page(rel, text, [], False, text, 1, [(1, "no frontmatter")])
    fm_lines = fm.split("\n")
    other, ver = verify_lib.split_verification_lines(fm)
    has_verification = bool(ver)
    for i, line in enumerate(fm_lines, start=2):
        if not line.strip() or line.startswith((" ", "\t", "-")):
            continue
        if line.startswith("verification:"):
            continue
        m = re.match(r"^([^:]+):\s*(.*)$", line)
        if not m:
            errors.append((i, f"unparseable frontmatter line `{line}`"))
            continue
        value, quoted = _unquote(m.group(2))
        fields.append(Field(m.group(1), value, quoted, i))
    body_offset = len(fm_lines) + 3
    return Page(rel, text, fields, has_verification, body, body_offset, errors)


def render_frontmatter(fields: list[tuple[str, str]]) -> str:
    """`Key: "value"` lines in the canonical order (verification excluded)."""
    rank = {k: i for i, k in enumerate(KEY_ORDER)}
    ordered = sorted(fields, key=lambda kv: rank.get(kv[0], len(rank)))
    out = []
    for k, v in ordered:
        v = v.replace("\\", "\\\\").replace('"', '\\"')
        out.append(f'{k}: "{v}"')
    return "\n".join(out)


def isbn_ok(isbn: str) -> bool:
    digits = re.sub(r"[\s-]", "", isbn).upper()
    if len(digits) == 13 and digits.isdigit():
        total = sum(int(d) * (1 if i % 2 == 0 else 3) for i, d in enumerate(digits[:12]))
        return (10 - total % 10) % 10 == int(digits[12])
    if len(digits) == 10 and digits[:9].isdigit() and (digits[9].isdigit() or digits[9] == "X"):
        total = sum(int(d) * (10 - i) for i, d in enumerate(digits[:9]))
        check = 10 if digits[9] == "X" else int(digits[9])
        return (total + check) % 11 == 0
    return False


def host_label(url: str) -> str:
    host = urllib.parse.urlparse(url).hostname or ""
    return host[4:] if host.startswith("www.") else host


def exam_listings(root: str = ROOT) -> dict[str, list[str]]:
    """resource page name → the exam pages whose Source Material callout lists it."""
    out: dict[str, list[str]] = {}
    for path in sorted(glob.glob(os.path.join(root, "Exam *.md"))):
        page = sl.parse_exam_page(path)
        exam = os.path.splitext(os.path.basename(path))[0]
        for _, link, _ in sl.source_entries(page):
            name = vl.link_basename(link.target)
            if exam not in out.setdefault(name, []):
                out[name].append(exam)
    return out


# ── the report ───────────────────────────────────────────────────────────────

class Report:
    def __init__(self) -> None:
        self.items: list[tuple[str, str, int, str, str]] = []

    def add(self, severity: str, path: str, line: int, code: str, msg: str) -> None:
        self.items.append((severity, path, line, code, msg))

    def error(self, *a) -> None:
        self.add("error", *a)

    def warn(self, *a) -> None:
        self.add("warning", *a)

    def by(self, severity: str) -> list:
        return [i for i in self.items if i[0] == severity]


# ── the checks ───────────────────────────────────────────────────────────────

def lint_frontmatter(page: Page, report: Report) -> None:
    rel = page.rel
    for ln, msg in page.fm_errors:
        report.error(rel, ln, "frontmatter", msg)
    if not page.has_verification:
        report.error(rel, 1, "frontmatter", "no `verification:` block — run `python3 scripts/verify_check.py --sync`")
    seen: list[str] = []
    for f in page.fields:
        if f.key in DEPRECATED:
            report.error(rel, f.line, "key-deprecated", f"`{f.key}` — {DEPRECATED[f.key]}")
        elif f.key not in KEY_ORDER:
            report.error(rel, f.line, "key-unknown", f"`{f.key}` is not a resource-page key ({', '.join(KEY_ORDER)})")
        if f.key in seen:
            report.error(rel, f.line, "key-duplicate", f"`{f.key}` appears twice")
        seen.append(f.key)
        if not f.quoted:
            report.error(rel, f.line, "key-quoting", f'`{f.key}` — write every value double-quoted: {f.key}: "…"')
        if not f.value.strip():
            report.error(rel, f.line, "key-empty", f"`{f.key}` is empty — omit an optional key rather than leave it blank")
    known = [k for k in seen if k in KEY_ORDER]
    if known != sorted(known, key=KEY_ORDER.index):
        report.error(rel, page.fields[0].line if page.fields else 1, "key-order",
                     f"keys out of order — expected {', '.join(k for k in KEY_ORDER if k in known)} (`--fix` reorders)")

    vault_page = page.get("Publisher") == VAULT_PUBLISHER
    required = REQUIRED if vault_page else REQUIRED + ("Year", "date")
    for key in required:
        if not page.get(key):
            report.error(rel, 1, "key-missing", f"`{key}` is required")

    year, date = page.get("Year"), page.get("date")
    if year and not re.fullmatch(r"\d{4}", year):
        report.error(rel, 1, "year", f"`Year` must be the four-digit year of this edition, not `{year}`")
    if (year or date) and date != year:
        report.error(rel, 1, "year", f"`date` must equal `Year` (`{date}` ≠ `{year}`) — it is what places the page on the timeline")

    type_ = page.get("Type")
    if type_ and type_ not in TYPES:
        report.error(rel, 1, "type", f"`Type: {type_}` is not in the vocabulary: {', '.join(TYPES)}")

    edition = page.get("Edition")
    if edition and not ORDINAL_RE.match(edition):
        report.error(rel, 1, "edition", f"`Edition` is an ordinal (`5th`), not `{edition}`")

    isbn = page.get("ISBN")
    if isbn and not (ISBN_RE.match(isbn) and isbn_ok(isbn)):
        report.error(rel, 1, "isbn", f"`ISBN {isbn}` is malformed or fails its check digit")

    avail = page.get("Available from")
    if avail:
        m = LINK_VALUE_RE.match(avail)
        if not m:
            report.error(rel, 1, "available-from",
                         f'`Available from` must be "[host](https://…)" — a link to the document, not `{avail}`')
        elif m.group(1) != host_label(m.group(2)):
            report.error(rel, 1, "available-from",
                         f"`Available from` label `{m.group(1)}` should name the link's host, `{host_label(m.group(2))}`")


def _blocks(body: str, offset: int) -> list[tuple[int, str, list[str]]]:
    """(line number, kind, lines) — kind is cover|heading|callout|list|paragraph|math|other."""
    blocks: list[tuple[int, str, list[str]]] = []
    lines = body.split("\n")
    i = 0
    while i < len(lines):
        line = lines[i]
        ln = offset + i
        if not line.strip():
            i += 1
            continue
        if HEADING_RE.match(line):
            blocks.append((ln, "heading", [line]))
            i += 1
            continue
        if IMAGE_EMBED_RE.match(line.strip()):
            blocks.append((ln, "cover", [line]))
            i += 1
            continue
        kind = ("callout" if line.startswith(">") else
                "list" if re.match(r"^\s*(?:[-*+]|\d+[.)])\s", line) else
                "math" if line.strip().startswith("$$") else
                "table" if line.lstrip().startswith("|") else "paragraph")
        chunk = []
        while i < len(lines) and lines[i].strip() and not HEADING_RE.match(lines[i]):
            nxt = lines[i]
            if kind == "list" and not re.match(r"^\s*(?:[-*+]|\d+[.)])\s|^\s+\S", nxt):
                break
            if kind == "callout" and not nxt.startswith(">"):
                break
            if kind == "paragraph" and re.match(r"^(>|\s*[-*+]\s|\s*\d+[.)]\s)", nxt):
                break
            chunk.append(nxt)
            i += 1
        blocks.append((ln, kind, chunk))
    return blocks


def lint_body(page: Page, report: Report, listings: dict[str, list[str]], vault: vl.Vault) -> None:
    rel = page.rel
    name = os.path.splitext(os.path.basename(rel))[0]
    vault_page = page.get("Publisher") == VAULT_PUBLISHER
    blocks = _blocks(page.body, page.body_offset)
    if not blocks:
        report.error(rel, page.body_offset, "cover", "empty page")
        return

    # 1. the cover
    ln, kind, lines = blocks[0]
    if kind != "cover":
        report.error(rel, ln, "cover", "the body must open with the cover embed `![[… - Cover.svg]]` "
                     "(run scripts/generate_resource_covers.py)")
    else:
        target = IMAGE_EMBED_RE.match(lines[0].strip()).group(1).strip()
        path = target if "/" in target else f"{ATTACHMENTS}/{target}"
        if not os.path.exists(os.path.join(ROOT, path)):
            report.error(rel, ln, "cover", f"cover `{target}` does not exist in {ATTACHMENTS}/")
    rest = blocks[1:] if kind == "cover" else blocks

    # 2. the lead
    if not rest or rest[0][1] != "paragraph":
        report.error(rel, rest[0][0] if rest else ln, "lead",
                     "a lead paragraph must follow the cover — what the document is, in its own terms")
    else:
        lead = " ".join(rest[0][2])
        if len(lead) < MIN_LEAD:
            report.error(rel, rest[0][0], "lead", f"lead is {len(lead)} characters; at least {MIN_LEAD}")
        if len(lead) > MAX_LEAD:
            report.error(rel, rest[0][0], "lead", f"lead is {len(lead)} characters; at most {MAX_LEAD} — "
                         "the rest belongs under the division it describes")
        rest = rest[1:]

    # 3. the syllabus callout
    exams = listings.get(name, [])
    if rest and rest[0][1] == "callout" and rest[0][2][0].strip() == SYLLABUS_CALLOUT:
        cln, _, clines = rest[0]
        named: list[str] = []
        for line in clines[1:]:
            inner = line[1:].strip()
            if not inner:
                continue
            if not inner.startswith("- "):
                report.error(rel, cln, "syllabus", f"the syllabus callout holds one `- ` bullet per exam, not `{inner[:50]}`")
                continue
            links = [vl.link_basename(lk.target) for lk in vl.iter_links(inner)]
            exam_links = [x for x in links if x.startswith("Exam ")]
            if not exam_links or not links or links[0] != exam_links[0]:
                report.error(rel, cln, "syllabus", f"each bullet opens with the exam's link: `{inner[:60]}`")
                continue
            if " — " not in inner:
                report.error(rel, cln, "syllabus", f"say what {exam_links[0]} assigns after ` — `: `{inner[:60]}`")
            named.append(exam_links[0])
        if exams and sorted(set(named)) != sorted(exams):
            report.error(rel, cln, "syllabus",
                         f"the callout names {sorted(set(named)) or 'no exam'}, but the exam pages that list "
                         f"this reading are {sorted(exams)}")
        if not exams:
            report.error(rel, cln, "syllabus", "no exam page's Source Material lists this page — drop the callout")
        rest = rest[1:]
    elif exams:
        report.error(rel, rest[0][0] if rest else ln, "syllabus",
                     f"listed by {', '.join(exams)} — add `{SYLLABUS_CALLOUT}` after the lead")

    # 3b. a document that could not be read
    unavailable = bool(rest and rest[0][1] == "callout" and rest[0][2][0].strip() == UNAVAILABLE_CALLOUT)
    if unavailable:
        if len(rest[0][2]) < 2:
            report.error(rel, rest[0][0], "unavailable", "say why the document could not be read, and where it is held")
        rest = rest[1:]

    # 4. divisions, related readings, sources
    headings = [(b[0], HEADING_RE.match(b[2][0])) for b in rest if b[1] == "heading"]
    if rest and rest[0][1] != "heading":
        report.error(rel, rest[0][0], "shape", "only the lead and the syllabus callout come before the first heading "
                     f"(found a {rest[0][1]})")
    for hln, m in headings:
        level, title = len(m.group(1)), m.group(2)
        if level == 1:
            report.error(rel, hln, "h1", "no `#` title — the card above the page already carries it")
        if not vault_page and level == 2 and EDITORIAL_HEADING.match(title) and title not in (SOURCES_HEADING, RELATED_HEADING):
            report.error(rel, hln, "editorial",
                         f"`## {title}` is commentary, not one of the document's divisions — move what the document "
                         "supports under the division that says it and drop the rest")
    h2 = [(hln, m.group(2)) for hln, m in headings if len(m.group(1)) == 2]
    titles = [t for _, t in h2]
    if not vault_page:
        if SOURCES_HEADING not in titles:
            report.error(rel, h2[-1][0] if h2 else page.body_offset, "sources", "`## Sources` is required, last")
        elif titles[-1] != SOURCES_HEADING:
            report.error(rel, h2[-1][0], "sources", "`## Sources` must be the last section")
        if RELATED_HEADING in titles and titles.index(RELATED_HEADING) != len(titles) - 2:
            report.error(rel, h2[titles.index(RELATED_HEADING)][0], "related",
                         "`## Related readings` comes immediately before `## Sources`")
        divisions = [t for t in titles if t not in (SOURCES_HEADING, RELATED_HEADING)]
        if not divisions and not unavailable:
            report.error(rel, page.body_offset, "shape", "no division of the document — write its contents, or, "
                         f"if no copy can be read, say so with `{UNAVAILABLE_CALLOUT}`")
        if divisions and unavailable:
            report.error(rel, page.body_offset, "unavailable",
                         "the page has divisions, so its contents are not unavailable — drop the callout")

    # section bodies
    section = None
    for b in rest:
        bln, kind, lines = b
        if kind == "heading":
            m = HEADING_RE.match(lines[0])
            section = m.group(2) if len(m.group(1)) == 2 else section
            continue
        if kind == "table":
            report.error(rel, bln, "table", "no tables on a resource page — a `|` inside a table cell breaks "
                         "`[[Target|Alias]]` links; use a list")
        if section == SOURCES_HEADING:
            if kind != "list":
                report.error(rel, bln, "sources", "`## Sources` holds a list, one source per bullet")
                continue
            for line in lines:
                if not re.match(r"^-\s", line):
                    continue
                if not MD_LINK_RE.search(line):
                    report.error(rel, bln, "sources", f"each source is a link to where it was read: `{line[:60]}`")
                elif " — " not in line:
                    report.error(rel, bln, "sources", f"say what was taken from it after ` — `: `{line[:60]}`")
        elif section == RELATED_HEADING:
            for line in lines:
                if not re.match(r"^-\s", line):
                    continue
                links = list(vl.iter_links(line))
                ok = links and line.startswith("- [[") and (vault.resolve(links[0].target)[1] or "").startswith(BOOKS + "/")
                if not ok:
                    report.error(rel, bln, "related", f"a related reading is another resource page: `{line[:60]}`")
        elif section is not None and kind == "paragraph" and not vault_page:
            report.error(rel, bln, "prose", f"under `## {section}` write a list — the division's own "
                         "sub-divisions, or what it says, one point per bullet")

    if not vault_page:
        avail = page.get("Available from")
        m = LINK_VALUE_RE.match(avail) if avail else None
        if m and SOURCES_HEADING in titles:
            src = page.body.split(f"## {SOURCES_HEADING}", 1)[1]
            if m.group(2) not in src:
                report.error(rel, page.body_offset, "sources", "the `Available from` link must be among the sources")

    # 5. links
    for lk in vl.iter_links(page.body):
        status, _ = vault.resolve(lk.target)
        if lk.embed:
            continue
        if status != "exact":
            line = page.body_offset + page.body.count("\n", 0, lk.start)
            report.error(rel, line, "link", f"[[{lk.target}]] — {'wrong case' if status == 'case' else 'no such page'}")


def lint_page(rel: str, report: Report, listings: dict[str, list[str]], vault: vl.Vault) -> None:
    page = parse_page(rel)
    lint_frontmatter(page, report)
    lint_body(page, report, listings, vault)


def fix_text(text: str) -> str:
    """The same file with its frontmatter canonicalised; unchanged if it can't be parsed."""
    page = parse_page("", text)
    if page.fm_errors or not page.fields:
        return text
    fm, body = verify_lib.split_frontmatter(text)
    _, ver = verify_lib.split_verification_lines(fm)
    pairs: list[tuple[str, str]] = []
    for f in page.fields:
        key = "Authors" if f.key == "Author" else f.key
        if any(k == key for k, _ in pairs):
            continue
        pairs.append((key, f.value.strip()))
    year = dict(pairs).get("Year")
    if year:
        pairs = [(k, v) for k, v in pairs if k != "date"] + [("date", year)]
    new_fm = render_frontmatter(pairs) + ("\n" + "\n".join(ver).rstrip("\n") if ver else "")
    return f"---\n{new_fm}\n---\n{body}"


def fix_page(rel: str) -> bool:
    """Canonicalise a page's frontmatter in place. Returns whether the file changed."""
    path = os.path.join(ROOT, rel)
    with open(path, encoding="utf-8") as fh:
        text = fh.read()
    new_text = fix_text(text)
    if new_text != text:
        with open(path, "w", encoding="utf-8") as fh:
            fh.write(new_text)
        return True
    return False


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("pages", nargs="*", help=f"pages to lint (default: every page in {BOOKS}/)")
    ap.add_argument("--quiet", action="store_true", help="print errors only")
    ap.add_argument("--fix", action="store_true", help="canonicalise the frontmatter before linting")
    args = ap.parse_args(argv)

    pages = [os.path.relpath(os.path.abspath(p), ROOT).replace(os.sep, "/") for p in args.pages] or sorted(
        os.path.relpath(p, ROOT).replace(os.sep, "/") for p in glob.glob(os.path.join(ROOT, BOOKS, "*.md")))
    if args.fix:
        changed = [rel for rel in pages if fix_page(rel)]
        print(f"resource-lint --fix: rewrote the frontmatter of {len(changed)} page(s)")
    listings = exam_listings()
    vault = vl.Vault(ROOT)
    report = Report()
    for rel in pages:
        lint_page(rel, report, listings, vault)

    shown = report.items if not args.quiet else report.by("error")
    for severity, path, line, code, msg in shown:
        print(f"{path}:{line}: {severity}: [{code}] {msg}")
    errors, warnings = len(report.by("error")), len(report.by("warning"))
    print(f"\nresource-lint: {len(pages)} page(s), {errors} error(s), {warnings} warning(s)")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
