#!/usr/bin/env python3
"""
update_wiki_links.py

1. Build a concept index from Concepts/*.md
2. For each question file, expand wiki_link to up to 3 entries using tag matching
3. Write "Concepts Without Review Questions.md" listing all unlinked concepts
"""

import re
from pathlib import Path
from datetime import date
from collections import defaultdict

REPO_ROOT = Path("/home/user/Actuarial-Notes-Wiki")
CONCEPTS_DIR = REPO_ROOT / "Concepts"
QUESTIONS_DIRS = [
    REPO_ROOT / "questions" / "exam-fm",
    REPO_ROOT / "questions" / "exam-p",
]
GAP_REPORT = REPO_ROOT / "Concepts Without Review Questions.md"

# Tags that are exam/format labels, not concepts
SKIP_TAGS = {
    "examfm", "examp", "multiplechoice", "easyfm", "easyp",
    "exam", "hard", "medium", "easy",
}
MIN_WORD_LEN = 4  # min chars for a word to be "significant"


# ─── Helpers ──────────────────────────────────────────────────────────────────

def norm(s: str) -> str:
    """Lowercase + strip non-alphanumeric."""
    return re.sub(r"[^a-z0-9]", "", s.lower())


def stem_to_link(stem: str) -> str:
    return "Concepts/" + stem.replace(" ", "+")


def link_to_stem(link: str) -> str:
    return link.replace("Concepts/", "").replace("+", " ")


# ─── 1. Build concept index ───────────────────────────────────────────────────
# Maps normalised_stem → (original_stem, wiki_link)

concept_index: dict[str, tuple[str, str]] = {}

for cf in sorted(CONCEPTS_DIR.glob("*.md")):
    stem = cf.stem
    n = norm(stem)
    link = stem_to_link(stem)
    if n not in concept_index:
        concept_index[n] = (stem, link)
    else:
        existing_stem, _ = concept_index[n]
        # Prefer names without parentheses (cleaner display)
        if "(" in existing_stem and "(" not in stem:
            concept_index[n] = (stem, link)

print(f"Concept index: {len(concept_index)} entries from {CONCEPTS_DIR.name}/")


# ─── 2. Tag → concept matching ────────────────────────────────────────────────

def tag_to_link(tag: str) -> str | None:
    """Map a tag string to a wiki_link, or None if no unambiguous match."""
    n_tag = norm(tag)
    if n_tag in SKIP_TAGS or len(n_tag) < 3:
        return None

    # Step 1: Exact normalised match
    if n_tag in concept_index:
        return concept_index[n_tag][1]

    # Step 2: Concept key starts with tag norm (concept is more specific)
    #   e.g.  tag="nominal-interest"  → concept="Nominal Interest Rate"
    if len(n_tag) >= 4:
        matches = [v for k, v in concept_index.items() if k.startswith(n_tag)]
        if len(matches) == 1:
            return matches[0][1]

    # Step 3: Tag norm starts with concept key, verified at a word boundary
    #   e.g.  tag="normal-distribution"  → concept="Normal"
    #   e.g.  tag="spot-rates"           → concept="Spot Rate"  (trailing 's' allowed)
    #   Rejects: tag="geometrically-increasing-annuity" → NOT "Geometric" (different word)
    tag_word_norms = [norm(w) for w in re.split(r"[-\s]+", tag)]

    def _at_word_boundary(concept_key: str) -> bool:
        word_concat = ""
        for part in tag_word_norms:
            word_concat += part
            if word_concat == concept_key:
                return True
            # Allow one trailing 's' or 'es' (pluralisation)
            for suffix in ("es", "s"):
                if word_concat.endswith(suffix) and word_concat[: -len(suffix)] == concept_key:
                    return True
        return False

    step3 = [v for k, v in concept_index.items() if n_tag.startswith(k) and len(k) >= 5 and _at_word_boundary(k)]
    if len(step3) == 1:
        return step3[0][1]

    # Step 4: All significant words of the tag appear in the concept stem
    #   e.g.  tag="discrete-distributions"  → concept="Discrete Univariate Distributions"
    sig_words = [w for w in re.split(r"[-\s]+", tag.lower()) if len(w) >= MIN_WORD_LEN]
    if sig_words:
        word_matches = [
            link
            for _n, (stem, link) in concept_index.items()
            if all(w in stem.lower() for w in sig_words)
        ]
        if len(word_matches) == 1:
            return word_matches[0]

    return None


# ─── 3. YAML frontmatter helpers ──────────────────────────────────────────────

FRONTMATTER_RE = re.compile(r"^---\n(.*?)\n---\n", re.DOTALL)


def parse_tags(fm_text: str) -> list[str]:
    m = re.search(r"^tags:\n((?:[ \t]+-[ \t]+.+\n?)+)", fm_text, re.MULTILINE)
    if not m:
        return []
    return [
        line.strip().lstrip("-").strip()
        for line in m.group(1).splitlines()
        if line.strip()
    ]


def parse_wiki_links(fm_text: str) -> list[str]:
    # List format: wiki_link:\n  - ...\n  - ...
    block = re.search(r"^wiki_link:\s*\n((?:[ \t]+-[ \t]+\S.+\n?)+)", fm_text, re.MULTILINE)
    if block:
        return [
            line.strip().lstrip("-").strip()
            for line in block.group(1).splitlines()
            if line.strip()
        ]
    # Single-string format: wiki_link: Concepts/...
    single = re.search(r"^wiki_link:[ \t]+(\S.+)$", fm_text, re.MULTILINE)
    if single:
        return [single.group(1).strip()]
    return []


def make_wiki_link_yaml(links: list[str]) -> str:
    if len(links) == 1:
        return f"wiki_link: {links[0]}"
    return "wiki_link:\n" + "\n".join(f"  - {l}" for l in links)


def replace_wiki_link_in_fm(fm_text: str, new_yaml: str) -> str:
    """Remove existing wiki_link block and insert new_yaml before answer:."""
    # Remove single-string or list form of wiki_link
    cleaned = re.sub(
        r"^wiki_link:[ \t]*(?:[^\n]*\n)?(?:[ \t]+-[ \t]+[^\n]*\n)*",
        "",
        fm_text,
        flags=re.MULTILINE,
    )
    if "answer:" in cleaned:
        return re.sub(
            r"^(answer:)",
            new_yaml + "\n" + r"\1",
            cleaned,
            flags=re.MULTILINE,
            count=1,
        )
    # Fallback: append at end
    return cleaned.rstrip("\n") + "\n" + new_yaml


# ─── 4. Process question files ─────────────────────────────────────────────────

referenced_concepts: set[str] = set()  # stem form of every linked concept
stats: dict[str, int] = {"total": 0, "updated": 0, "unchanged": 0, "skipped": 0}
tag_match_log: list[str] = []


def process_file(path: Path) -> None:
    text = path.read_text(encoding="utf-8")
    m = FRONTMATTER_RE.match(text)
    if not m:
        stats["skipped"] += 1
        return

    fm_text = m.group(1)
    body = text[m.end():]

    existing = parse_wiki_links(fm_text)
    tags = parse_tags(fm_text)

    # Build link list: keep existing first, add from tags up to 3 total
    links: list[str] = list(existing)
    added: list[str] = []
    for tag in tags:
        if len(links) >= 3:
            break
        candidate = tag_to_link(tag)
        if candidate and candidate not in links:
            links.append(candidate)
            added.append(f"{tag} → {candidate}")

    # Track referenced concept stems
    for l in links:
        referenced_concepts.add(link_to_stem(l))

    stats["total"] += 1

    if links == existing:
        stats["unchanged"] += 1
        return

    if added:
        tag_match_log.append(f"  {path.name}: {'; '.join(added)}")

    new_yaml = make_wiki_link_yaml(links)
    new_fm = replace_wiki_link_in_fm(fm_text, new_yaml)
    path.write_text(f"---\n{new_fm}\n---\n{body}", encoding="utf-8")
    stats["updated"] += 1


for qdir in QUESTIONS_DIRS:
    for qfile in sorted(qdir.rglob("*.md")):
        process_file(qfile)

print(
    f"Questions: {stats['total']} processed, "
    f"{stats['updated']} updated, "
    f"{stats['unchanged']} unchanged, "
    f"{stats['skipped']} skipped"
)
if tag_match_log:
    print(f"\nTag → concept matches (first 30 shown):")
    for line in tag_match_log[:30]:
        print(line)
    if len(tag_match_log) > 30:
        print(f"  ... and {len(tag_match_log) - 30} more")


# ─── 5. Categorise concepts for gap report ────────────────────────────────────

def extract_syllabus_concepts(path: Path) -> set[str]:
    """Extract [[Concept Name]] wiki links from a syllabus file."""
    text = path.read_text(encoding="utf-8")
    # Capture target of wiki link (before | or # if present)
    return {
        m.split("|")[0].split("#")[0].strip()
        for m in re.findall(r"\[\[([^\]]+)\]\]", text)
    }


p_concepts = extract_syllabus_concepts(REPO_ROOT / "Exam P-1 (SOA).md")
fm_concepts = extract_syllabus_concepts(REPO_ROOT / "Exam FM-2 (SOA).md")

print(f"\nSyllabus concepts: {len(p_concepts)} Exam P, {len(fm_concepts)} Exam FM")


def categorise(stem: str) -> str:
    if stem in p_concepts:
        return "exam-p"
    if stem in fm_concepts:
        return "exam-fm"
    return "other"


all_stems: set[str] = {v[0] for v in concept_index.values()}
unreferenced = sorted(all_stems - referenced_concepts)
covered = sorted(all_stems & referenced_concepts)

by_cat: dict[str, list[str]] = defaultdict(list)
for s in unreferenced:
    by_cat[categorise(s)].append(s)

all_by_cat: dict[str, list[str]] = defaultdict(list)
for s in all_stems:
    all_by_cat[categorise(s)].append(s)

covered_by_cat: dict[str, list[str]] = defaultdict(list)
for s in covered:
    covered_by_cat[categorise(s)].append(s)


# ─── 6. Write gap report ──────────────────────────────────────────────────────

total = len(all_stems)
n_covered = len(covered)
pct = round(100 * n_covered / total, 1)
today = date.today().isoformat()


def cat_counts(cat: str) -> tuple[int, int]:
    w = len(covered_by_cat[cat])
    a = len(all_by_cat[cat])
    return w, a - w


def section(heading: str, note: str, stems: list[str]) -> list[str]:
    out = [f"## {heading}", "", f"*{note}*", ""]
    if stems:
        for s in sorted(stems):
            out.append(f"- {s}")
    else:
        out.append("*All concepts in this category have at least one linked question.*")
    return out + [""]


p_with, p_without = cat_counts("exam-p")
fm_with, fm_without = cat_counts("exam-fm")
ot_with, ot_without = cat_counts("other")

lines = [
    "# Concepts Without Review Questions",
    "",
    f"> Generated {today}. **{n_covered} of {total} concepts ({pct}%)** have at least one linked question.",
    "",
    "## Summary",
    "",
    "| Category | With Questions | Without Questions | Total |",
    "|---|---|---|---|",
    f"| Exam P | {p_with} | {p_without} | {p_with + p_without} |",
    f"| Exam FM | {fm_with} | {fm_without} | {fm_with + fm_without} |",
    f"| Other Exams & Topics | {ot_with} | {ot_without} | {ot_with + ot_without} |",
    f"| **Total** | **{n_covered}** | **{total - n_covered}** | **{total}** |",
    "",
    "---",
    "",
]

lines += section(
    "Exam P — Missing Coverage",
    "Concepts in the Exam P syllabus with no linked questions",
    by_cat.get("exam-p", []),
)
lines += section(
    "Exam FM — Missing Coverage",
    "Concepts in the Exam FM syllabus with no linked questions",
    by_cat.get("exam-fm", []),
)
lines += section(
    "Other Exams & Topics — Not Yet Covered",
    (
        "Concepts for CAS exams (5, 6, 7, 8, 9), MAS exams, and general actuarial topics. "
        "No question bank exists for these exams yet."
    ),
    by_cat.get("other", []),
)

GAP_REPORT.write_text("\n".join(lines), encoding="utf-8")
print(f"\nGap report written: {GAP_REPORT.name}")
print(f"  {total - n_covered} concepts without questions / {total} total ({100 - pct}% uncovered)")
print(f"  Exam P: {p_without} missing | Exam FM: {fm_without} missing | Other: {ot_without} missing")
