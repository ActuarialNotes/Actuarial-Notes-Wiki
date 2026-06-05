#!/usr/bin/env python3
"""
fix_name_mismatches.py

Corrects category-2 dead links: cases where the wiki link text differs
slightly from the actual file name (missing hyphen, plural, apostrophe,
parenthetical suffix, underscore vs space).

Changes made:
  Inline [[wiki links]]
    Berquist Sherman Method       → Berquist-Sherman Method
    Bornhuetter Ferguson Method   → Bornhuetter-Ferguson Method
    Bond Price\|Price             → Bond Price|Price  (backslash escape)
    Claims-Made Coverage          → Claims Made Coverage
    Benefit Limits                → Benefit Limit
    Coinsurance Percentages       → Coinsurance Percentage
    Entropy (information theory)  → Entropy
    Frequency-Severity Models     → Frequency-Severity Method
    Generalized Linear Models     → Generalized Linear Model
    Hypergeometric Distribution   → Hypergeometric
    Life-Annuity                  → Life Annuity
    Linear Mixed Models           → Linear Mixed Model
    Maximum Likelihood Estimation (MLE) → Maximum Likelihood Estimation
    Maximum Likelihood Estimator  → Maximum Likelihood Estimation
    Percentiles                   → Percentile
    Sufficient Statistics         → Sufficient Statistic
    Survival Models               → Survival Model
    Bayes' Theorem (curly apostrophe variants) → Bayes Theorem

  Frontmatter wiki_link entries
    Concepts/Geometric            → Concepts/Geometric+Progression
    Concepts/Continuous+Probability → (removed; duplicate of existing link)
    Concepts/Deductibles          → Concepts/Deductible
    Concepts/Percentiles          → Concepts/Percentile
    Concepts/Marginal+Distribution → Concepts/Marginal+Probability+Function
    Concepts/Coinsurance+Percentages → Concepts/Coinsurance+Percentage
    Concepts/Hypergeometric+Distribution → Concepts/Hypergeometric

  File rename
    Concepts/Retrospective_Rating.md → Concepts/Retrospective Rating.md
"""

import re
import shutil
from pathlib import Path

REPO_ROOT = Path("/home/user/Actuarial-Notes-Wiki")

changes: dict[str, int] = {}  # description → count

# ── Inline wiki-link substitutions ───────────────────────────────────────────
# Each entry: (regex_pattern, replacement)
# Patterns use re.sub on the full file text.
INLINE_SUBS = [
    # Hyphen fixes
    (r"\[\[Berquist Sherman Method([|\]])", r"[[Berquist-Sherman Method\1"),
    (r"\[\[Bornhuetter Ferguson Method([|\]])", r"[[Bornhuetter-Ferguson Method\1"),
    # Backslash before pipe in table cell  [[Bond Price\|Price]]
    (r"\[\[Bond Price\\(\|[^\]]*)\]\]", r"[[Bond Price\1]]"),
    # Hyphen vs space
    (r"\[\[Claims-Made Coverage([|\]])", r"[[Claims Made Coverage\1"),
    (r"\[\[Life-Annuity([|\]])", r"[[Life Annuity\1"),
    # Plurals
    (r"\[\[Benefit Limits([|\]])", r"[[Benefit Limit\1"),
    (r"\[\[Coinsurance Percentages([|\]])", r"[[Coinsurance Percentage\1"),
    (r"\[\[Generalized Linear Models([|\]])", r"[[Generalized Linear Model\1"),
    (r"\[\[Linear Mixed Models([|\]])", r"[[Linear Mixed Model\1"),
    (r"\[\[Percentiles([|\]])", r"[[Percentile\1"),
    (r"\[\[Sufficient Statistics([|\]])", r"[[Sufficient Statistic\1"),
    (r"\[\[Survival Models([|\]])", r"[[Survival Model\1"),
    # Parenthetical suffix
    (r"\[\[Entropy \(information theory\)([|\]])", r"[[Entropy\1"),
    (r"\[\[Maximum Likelihood Estimation \(MLE\)([|\]])", r"[[Maximum Likelihood Estimation\1"),
    # Models vs Method
    (r"\[\[Frequency-Severity Models([|\]])", r"[[Frequency-Severity Method\1"),
    # Estimator vs Estimation
    (r"\[\[Maximum Likelihood Estimator([|\]])", r"[[Maximum Likelihood Estimation\1"),
    # Hypergeometric Distribution → Hypergeometric
    (r"\[\[Hypergeometric Distribution([|\]])", r"[[Hypergeometric\1"),
    # Bayes apostrophe variants (curly ' and straight ')
    (r"\[\[Bayes’ Theorem([|\]])", r"[[Bayes Theorem\1"),
    (r"\[\[Bayes' Theorem([|\]])", r"[[Bayes Theorem\1"),
]

# ── Frontmatter wiki_link substitutions ──────────────────────────────────────
# Applied only within YAML frontmatter blocks
FM_SUBS = [
    ("Concepts/Geometric\n", "Concepts/Geometric+Progression\n"),
    ("Concepts/Deductibles", "Concepts/Deductible"),
    ("Concepts/Percentiles", "Concepts/Percentile"),
    ("Concepts/Marginal+Distribution", "Concepts/Marginal+Probability+Function"),
    ("Concepts/Coinsurance+Percentages", "Concepts/Coinsurance+Percentage"),
    ("Concepts/Hypergeometric+Distribution", "Concepts/Hypergeometric"),
]

# Lines to remove from frontmatter (duplicate/orphaned links)
FM_REMOVE_LINES = {
    "  - Concepts/Continuous+Probability",
}

FRONTMATTER_RE = re.compile(r"^(---\n)(.*?)(\n---)", re.DOTALL)


def fix_frontmatter(fm_block: str) -> tuple[str, list[str]]:
    """Apply FM_SUBS and FM_REMOVE_LINES to a frontmatter string."""
    fixed = fm_block
    applied = []

    for old, new in FM_SUBS:
        if old in fixed:
            fixed = fixed.replace(old, new)
            applied.append(f"FM: {old!r} → {new!r}")

    lines = fixed.splitlines(keepends=True)
    kept = []
    for line in lines:
        stripped = line.rstrip("\n")
        if stripped in FM_REMOVE_LINES:
            applied.append(f"FM: removed {stripped!r}")
        else:
            kept.append(line)
    fixed = "".join(kept)

    return fixed, applied


def fix_file(path: Path) -> int:
    """Return number of changes made to the file."""
    text = path.read_text(encoding="utf-8")
    original = text
    applied_changes = []

    # ── Frontmatter ──────────────────────────────────────────────────────────
    m = FRONTMATTER_RE.match(text)
    if m:
        open_fence, fm_body, close_fence = m.group(1), m.group(2), m.group(3)
        fixed_fm, fm_applied = fix_frontmatter(fm_body)
        if fixed_fm != fm_body:
            text = open_fence + fixed_fm + close_fence + text[m.end():]
            applied_changes.extend(fm_applied)

    # ── Inline wiki links ────────────────────────────────────────────────────
    for pattern, replacement in INLINE_SUBS:
        new_text = re.sub(pattern, replacement, text)
        if new_text != text:
            applied_changes.append(f"Inline: {pattern!r}")
            text = new_text

    if text != original:
        path.write_text(text, encoding="utf-8")
        rel = path.relative_to(REPO_ROOT)
        print(f"  {rel}")
        for c in applied_changes:
            print(f"    {c}")
        return len(applied_changes)
    return 0


# ── 1. Rename Retrospective_Rating.md ────────────────────────────────────────
old_path = REPO_ROOT / "Concepts" / "Retrospective_Rating.md"
new_path = REPO_ROOT / "Concepts" / "Retrospective Rating.md"
if old_path.exists() and not new_path.exists():
    shutil.move(str(old_path), str(new_path))
    print(f"Renamed: Concepts/Retrospective_Rating.md → Concepts/Retrospective Rating.md")
    changes["file_rename"] = 1
elif new_path.exists():
    print("Retrospective Rating.md already exists — no rename needed.")
else:
    print("WARNING: Retrospective_Rating.md not found.")

# ── 2. Scan & fix all markdown files ─────────────────────────────────────────
SKIP_DIRS = {".git", "node_modules", ".venv", "quiz"}
total_files_changed = 0
total_changes = 0

all_md = [
    p for p in REPO_ROOT.rglob("*.md")
    if not any(part in SKIP_DIRS for part in p.parts)
]

print(f"\nScanning {len(all_md)} markdown files...\n")

for md_file in sorted(all_md):
    n = fix_file(md_file)
    if n:
        total_files_changed += 1
        total_changes += n

print(f"\nDone. {total_changes} change(s) across {total_files_changed} file(s).")
