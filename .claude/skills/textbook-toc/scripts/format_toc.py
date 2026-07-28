#!/usr/bin/env python3
"""Format a raw table of contents into the vault's Resources/Books body shape.

Input is whatever you actually got from a source — pasted PDF contents pages, a
publisher page's TOC, or a flat MARC 505 catalogue note. Output is the markdown
this vault uses:

    ## 1 Combinatorial Analysis
      - 1.1 Introduction
      - 1.2 The Basic Principle of Counting
        - 1.2.1 A Sub-subsection

This does the mechanical pass only — stripping page numbers and dot leaders,
nesting by number depth, tidying whitespace. It never invents an entry and never
renumbers: whatever numbering the source used comes through unchanged, and lines
it cannot classify are emitted as plain bullets so nothing is silently dropped.
Read the output against the source before committing it.

Usage:
    python3 format_toc.py raw_toc.txt
    python3 format_toc.py < raw_toc.txt
    python3 format_toc.py --flat "Combinatorial analysis -- Axioms of probability"
    python3 format_toc.py raw_toc.txt --titlecase   # for lowercased catalogue notes

Exits non-zero if the input yields no entries.
"""

import argparse
import re
import sys

# "1.2.3 Title", "1.2 Title", "4 Title" — the leading number decides nesting depth.
NUMBERED_RE = re.compile(r"^(\d+(?:\.\d+)*)\.?\s+(.*)$")
# "Chapter 4 — Title", "Chapter 4. Title", "CHAPTER 4: Title"
CHAPTER_RE = re.compile(r"^chapter\s+(\d+)\s*[.:—–-]?\s*(.*)$", re.I)
# "Appendix A — Title", "Part II. Title", "Section 3 Title"
LABELLED_RE = re.compile(
    r"^(appendix|part|section|unit|module)\s+([A-Z]+|\d+)\s*[.:—–-]?\s*(.*)$", re.I
)
# Trailing page number, with or without dot/space leaders: "Introduction .... 12"
PAGE_TAIL_RE = re.compile(r"[\s.··_-]{2,}\s*(?:\d+|[ivxlcdm]+)\s*$", re.I)
BARE_PAGE_TAIL_RE = re.compile(r"\s+\d{1,4}\s*$")
# Front/back matter that carries no number but is a real top-level entry.
MATTER_RE = re.compile(
    r"^(preface|foreword|introduction|acknowledg(e)?ments|contents|index|"
    r"bibliography|references|glossary|appendix|appendices|"
    r"answers?(\s+to\s+.*)?|solutions?(\s+to\s+.*)?|about the authors?)\b",
    re.I,
)

FLAT_SEPARATORS = re.compile(r"\s+--\s+|\s+—\s+|\s*;\s*")


def strip_page_number(text: str) -> str:
    """Remove a trailing page number, keeping numbers that belong to the title.

    'Introduction .... 12' -> 'Introduction'
    'Chapter 4 Random Variables 87' -> 'Chapter 4 Random Variables'
    'The Number of Integer Solutions of Equations' -> unchanged
    """
    cleaned = PAGE_TAIL_RE.sub("", text).rstrip()
    if cleaned != text:
        return cleaned
    # A bare trailing number is only a page number if something precedes it that
    # doesn't read as part of the title (e.g. not "... Chapter 2").
    m = BARE_PAGE_TAIL_RE.search(text)
    if m and len(text[: m.start()].split()) >= 2:
        return text[: m.start()].rstrip()
    return text.rstrip()


def normalise(text: str) -> str:
    """Undo transcription noise. Deliberately does not touch wording."""
    text = text.replace(" ", " ")
    text = text.replace("’", "'").replace("‘", "'")
    text = text.replace("“", '"').replace("”", '"')
    text = re.sub(r"\s+", " ", text).strip()
    text = text.strip(".;,: \t")
    return text.strip()


def titlecase(text: str) -> str:
    """Title-case a lowercased catalogue note, leaving acronyms and roman numerals.

    Catalogue records store 'Conditional probability and independence'; the book
    prints title case. Restoring it is normalisation, not rewriting.
    """
    small = {
        "a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "into",
        "nor", "of", "on", "or", "the", "to", "up", "vs", "via", "with",
    }
    words = text.split()
    out = []
    for i, w in enumerate(words):
        core = w.strip("()[],:;.")
        if core.isupper() and len(core) > 1:  # acronym / roman numeral already set
            out.append(w)
        elif i != 0 and core.lower() in small:
            out.append(w.lower())
        elif core and core[0].isalpha():
            out.append(w[0].upper() + w[1:])
        else:
            out.append(w)
    return " ".join(out)


def parse_line(line: str, unnumbered_depth: int = 1):
    """Classify one line -> (depth, rendered_text) or None to skip.

    depth 0 renders as '## ', deeper levels as indented bullets.

    `unnumbered_depth` decides where a line with no number lands. In a full TOC an
    unnumbered line is usually a subsection under the chapter above it (depth 1);
    in a flat catalogue note every entry is a chapter (depth 0). A source that
    indents its own subsections overrides both — that indentation is real
    information about the hierarchy, so honour it.
    """
    expanded = line.expandtabs(4)
    indent_level = min(3, (len(expanded) - len(expanded.lstrip())) // 2)

    text = normalise(strip_page_number(line))
    if not text:
        return None

    m = CHAPTER_RE.match(text)
    if m:
        title = normalise(m.group(2))
        return 0, f"{m.group(1)} {title}".strip()

    m = NUMBERED_RE.match(text)
    if m:
        number, title = m.group(1), normalise(m.group(2))
        if not title:
            return None
        depth = number.count(".")
        return depth, f"{number} {title}"

    m = LABELLED_RE.match(text)
    if m:
        label, ident, title = m.group(1).capitalize(), m.group(2), normalise(m.group(3))
        head = f"{label} {ident}"
        return 0, f"{head} — {title}" if title else head

    if MATTER_RE.match(text):
        return indent_level, text

    # Unnumbered and unrecognised: keep it rather than dropping it. Losing a real
    # entry is worse than an odd-looking one.
    return max(unnumbered_depth, indent_level), text


def render(entries, titlecase_on: bool) -> str:
    lines = []
    for depth, text in entries:
        if titlecase_on:
            # Only re-case lines that are mostly lowercase; leave good input alone.
            letters = [c for c in text if c.isalpha()]
            if letters and sum(c.islower() for c in letters) / len(letters) > 0.85:
                text = titlecase(text)
        if depth == 0:
            if lines and lines[-1] != "":
                lines.append("")
            lines.append(f"## {text}")
        else:
            indent = "  " * depth
            lines.append(f"{indent}- {text}")
    return "\n".join(lines).strip() + "\n"


def main() -> int:
    ap = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    ap.add_argument("file", nargs="?", help="raw TOC text file (default: stdin)")
    ap.add_argument(
        "--flat",
        metavar="TEXT",
        help="a flat catalogue note ('A -- B -- C') to split on -- / ; separators",
    )
    ap.add_argument(
        "--titlecase",
        action="store_true",
        help="title-case lines that arrived all-lowercase (catalogue records)",
    )
    args = ap.parse_args()

    # In a flat catalogue note every entry is a chapter; in a full TOC an
    # unnumbered line sits under the chapter above it.
    unnumbered_depth = 0 if args.flat else 1

    if args.flat:
        raw_lines = [p for p in FLAT_SEPARATORS.split(args.flat) if p.strip()]
    elif args.file:
        with open(args.file, encoding="utf-8") as fh:
            raw_lines = fh.read().splitlines()
    else:
        raw_lines = sys.stdin.read().splitlines()

    entries = [e for e in (parse_line(l, unnumbered_depth) for l in raw_lines) if e]
    if not entries:
        print("No TOC entries found in input.", file=sys.stderr)
        return 1

    sys.stdout.write(render(entries, args.titlecase))
    return 0


if __name__ == "__main__":
    sys.exit(main())
