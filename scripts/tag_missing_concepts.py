#!/usr/bin/env python3
"""
tag_missing_concepts.py

Adds missing concept tags to FM quiz questions so that update_wiki_links.py
can map them to the 41 FM syllabus concepts currently showing no linked questions.

Rules:
  1. SUBTOPIC_TAGS  — tags added to every question with a given subtopic
  2. CONDITIONAL_TAGS — tags added when a specific existing tag is present

Never removes or reorders existing tags. Writes only files that changed.
"""

import re
from pathlib import Path

REPO_ROOT = Path("/home/user/Actuarial-Notes-Wiki")
FM_DIR = REPO_ROOT / "questions" / "exam-fm"

FRONTMATTER_RE = re.compile(r"^---\n(.*?)\n---\n", re.DOTALL)

# ── 1. Tag rules ──────────────────────────────────────────────────────────────

# Applied to ALL questions whose subtopic matches the key.
SUBTOPIC_TAGS: dict[str, list[str]] = {
    "Bond Pricing": [
        "face-value", "coupon", "coupon-rate", "redemption-value", "market-value",
    ],
    "Bond Amortization": [
        "face-value", "coupon", "coupon-rate", "term-of-bond", "accumulation-of-discount",
    ],
    "Loan Amortization": ["principal", "term-of-loan"],
    "Loan Repayment Comparison": ["principal", "term-of-loan"],
    "Duration": ["1st-order-linear-approximation"],
    "Immunization": ["portfolio", "asset-liability-portfolio", "duration-matching"],
    "Spot Rates and Forward Rates": ["yield-curve", "cash-flow"],
    "Perpetuity": ["level-perpetuity"],
    "Increasing Annuity": ["non-level-annuities"],
    "Increasing Annuities": ["non-level-annuities"],
    "Decreasing Annuity": ["non-level-annuities"],
    "Geometrically Increasing Annuity": ["geometric-progression", "non-level-annuities"],
    "Geometrically Increasing Perpetuity": ["geometric-progression", "non-level-annuities"],
    "Continuous Annuity": ["payable-continuously"],
    "Nominal Interest Rate": [
        "convertible-m-thly", "nominal-interest-rate-convertible-m-thly",
    ],
    "Nominal Discount Rate": [
        "discount-rate", "effective-discount-rate", "convertible-m-thly",
    ],
    "Fund Accumulation": ["future-value"],
    "Accumulated Value": ["future-value"],
    "Annuities": ["annuity-immediate", "level-payment-annuity", "term-of-annuity"],
    "Annuity-Due": ["level-payment-annuity", "term-of-annuity"],
    "Net Present Value": ["cash-flow"],
}

# Applied when the question already carries a specific tag.
# Maps  existing_tag → list of tags to add.
CONDITIONAL_TAGS: dict[str, list[str]] = {
    "callable-bonds": ["call-price", "call-premium"],
    "reinvestment": ["reinvestment-of-coupons"],
    "full-immunization": ["duration-matching"],
}

# ── 2. YAML helpers ───────────────────────────────────────────────────────────

def parse_subtopic(fm: str) -> str:
    m = re.search(r"^subtopic:\s*(.+)$", fm, re.MULTILINE)
    return m.group(1).strip() if m else ""


def parse_tags(fm: str) -> list[str]:
    m = re.search(r"^tags:\n((?:[ \t]+-[ \t]+.+\n?)+)", fm, re.MULTILINE)
    if not m:
        return []
    return [
        line.strip().lstrip("-").strip()
        for line in m.group(1).splitlines()
        if line.strip()
    ]


def insert_tags(fm: str, new_tags: list[str]) -> str:
    """Append new_tags to the tags list block in the frontmatter string."""
    addition = "\n".join(f"  - {t}" for t in new_tags)
    # Find end of existing tags block and insert there
    m = re.search(r"(^tags:\n(?:[ \t]+-[ \t]+.+\n?)+)", fm, re.MULTILINE)
    if m:
        block_end = m.end()
        return fm[:block_end] + addition + "\n" + fm[block_end:]
    # Fallback: insert before answer:
    return re.sub(
        r"^(answer:)",
        f"tags:\n{addition}\n" + r"\1",
        fm,
        flags=re.MULTILINE,
        count=1,
    )


# ── 3. Process files ──────────────────────────────────────────────────────────

stats = {"total": 0, "updated": 0, "unchanged": 0, "skipped": 0}


def process_file(path: Path) -> None:
    text = path.read_text(encoding="utf-8")
    m = FRONTMATTER_RE.match(text)
    if not m:
        stats["skipped"] += 1
        return

    fm = m.group(1)
    body = text[m.end():]
    stats["total"] += 1

    existing_tags = set(parse_tags(fm))
    subtopic = parse_subtopic(fm)

    to_add: list[str] = []

    # Subtopic rules
    for tag in SUBTOPIC_TAGS.get(subtopic, []):
        if tag not in existing_tags:
            to_add.append(tag)

    # Conditional rules
    for trigger, additions in CONDITIONAL_TAGS.items():
        if trigger in existing_tags:
            for tag in additions:
                if tag not in existing_tags and tag not in to_add:
                    to_add.append(tag)

    if not to_add:
        stats["unchanged"] += 1
        return

    new_fm = insert_tags(fm, to_add)
    path.write_text(f"---\n{new_fm}\n---\n{body}", encoding="utf-8")
    stats["updated"] += 1
    print(f"  {path.name} [{subtopic}]: +{', '.join(to_add)}")


for qfile in sorted(FM_DIR.rglob("*.md")):
    process_file(qfile)

print(
    f"\nDone: {stats['total']} processed, "
    f"{stats['updated']} updated, "
    f"{stats['unchanged']} unchanged, "
    f"{stats['skipped']} skipped"
)
