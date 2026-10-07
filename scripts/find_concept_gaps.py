#!/usr/bin/env python3
"""Find the concept pages the study guides link to that don't exist yet, and rank them.

The study guides are the root `Exam *.md` pages (plus the tip pages under
`Guides/`). Every `[[link]]` on them is read with the app's own regex
(`vault_links.iter_links`) and resolved the way Obsidian does:

  1. a page anywhere in the vault whose filename matches, case-insensitively
     (`vault_links.Vault.resolve` — it also says whether the *app* lands, which
     needs the exact case);
  2. a page whose frontmatter `aliases:` lists the target.

A target that neither resolves is **missing**. Missing targets are then:

  - **merged** where they are one concept spelled several ways — case, hyphens,
    plurals, a trailing `(ACRONYM)`, an `aliases` entry in
    `scripts/concept_aliases.json`. The most-linked spelling is the canonical
    name, the others its aliases;
  - **set aside as link fixes** where the variant matches a page that already
    exists (`Annuities` → `Annuity`): writing a page would make a duplicate;
  - **set aside as resource gaps** where they are linked only from a Source
    Material shelf (a missing `Resources/Books/` reading, not a concept);
  - **flagged as ambiguous** where a person has to decide: a bare acronym, a
    one-word generic term, a sentence-length target, a target with markup in it;
  - **scored** on what the rest of the vault says about them — how many guides
    and links point at them, how many questions name them (`wiki_link:`,
    `topic:`, and the question prose), the weight of the syllabus section
    linking them, the exam's stage, and how many other missing concepts are
    built on them — then tiered and cut into batches of related concepts,
    prerequisites first.

Existing concept pages that are stubs (a short body, or missing the definition →
formula → worked example shape the `actuarial-concept-definitions` skill sets)
are listed as a secondary worklist.

Usage (from the repo root; stdlib only):

    python3 scripts/find_concept_gaps.py                    # summary on stdout
    python3 scripts/find_concept_gaps.py --json out.json    # everything, machine-readable
    python3 scripts/find_concept_gaps.py --update-plan      # refresh CONCEPT_GAPS_PLAN.md
    python3 scripts/find_concept_gaps.py --exam "Exam FAM (SOA)"   # one guide only

`--update-plan` rewrites only the generated region of CONCEPT_GAPS_PLAN.md
(between the `<!-- gaps:begin -->` / `<!-- gaps:end -->` markers), so the
hand-written parts of the plan — decisions, notes, progress — survive a rerun.
Batch numbers are pinned in `scripts/concept_gaps_batches.json` once written, so
a rerun after a batch lands marks it done instead of renumbering every batch.
"""

from __future__ import annotations

import argparse
import json
import math
import os
import re
import sys
from collections import Counter, defaultdict
from dataclasses import dataclass, field

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import syllabus_lib  # noqa: E402
import vault_links   # noqa: E402

ROOT = vault_links.REPO_ROOT
PLAN = os.path.join(ROOT, "CONCEPT_GAPS_PLAN.md")
PINNED = os.path.join(ROOT, "scripts", "concept_gaps_batches.json")
BEGIN, END = "<!-- gaps:begin -->", "<!-- gaps:end -->"

BATCH_SIZE = 10
STUB_WORDS = 100

# How much an exam's syllabus counts toward a concept's priority. The studiable
# exams (`ready`/`beta`) are what readers use today; of the exams still in
# development, the ASA prelims are sat by far more candidates than any one FSA
# module, and the DISCs and 6U have no bank planned.
STAGE_FACTOR = {"ready": 1.0, "beta": 1.0}
ASA_PRELIMS = {"fam-1", "srm-1", "pa-1", "altam-1", "astam-1", "atpa-1"}
DEV_ASA, DEV_OTHER = 0.8, 0.45

# Words too generic to stand alone as a concept page without a person deciding
# what the link means on that exam.
GENERIC = {
    "risk", "data", "model", "models", "value", "return", "returns", "cost", "costs",
    "rate", "rates", "income", "capital", "benefit", "benefits", "policy", "plan",
    "plans", "product", "products", "price", "pricing", "strategy", "market",
    "markets", "framework", "process", "analysis", "method", "methods", "measure",
    "measures", "structure", "design", "management", "approach", "system", "issues",
    "factors", "results", "assumptions", "techniques", "tools", "considerations",
}
# Words that are not concepts. The development syllabi's noun-phrase linker
# linked whatever stood in a noun's place (`[[Cannot]]`, `[[Differ Compared]]`,
# `[[Common|common]] methods`). Two lists:
#   VAGUE  — verbs, function words and vague nouns: a target containing one,
#            and made only of these and the other lists' words, is noise
#            (`Business Context`, `Transform Data`, `Reduce Risk`);
#   PLAIN  — ordinary nouns that mean nothing standing alone (`Account`,
#            `Number`) but head a real term in a phrase (`Account Value`).
# Adjectives and participles (by suffix) are noise alone, never in a phrase.
VAGUE = {
    "ability", "acceptable", "action", "activity", "actual", "add", "address", "advantage", "affect",
    "appropriate", "appropriateness", "applicable",
    "apply", "arise", "aspect", "based", "cannot", "carry", "challenge", "clean", "clear",
    "common", "complete", "con", "pro", "consideration", "context", "corresponding", "defend",
    "depending", "differ", "compared", "difficulty", "disadvantage", "distinction", "establish",
    "existence", "extract", "fail", "flag", "good", "help", "ii", "iii", "interplay", "lack",
    "maintain", "manner", "meet", "meets", "merge", "nature", "next", "particular", "predict",
    "provide", "prune", "purpose", "reduce", "regard", "respect", "situation", "situational", "transform", "variety",
    "viewpoint", "yet", "classify", "collaborate", "synthesize", "analyze", "various", "different",
    "certain", "other", "main", "major", "relevant", "given", "including", "related", "specific",
    "overall", "potential", "possible", "way", "ways", "produced", "informed", "successful",
    "responsible", "evaluate", "describe", "explain", "calculate", "identify", "understand",
    "assess", "compare", "recommend", "interpret", "demonstrate", "analyse", "discuss",
    "construct", "determine", "select", "perform", "develop", "create", "manage", "use",
}
# Leading modifiers that don't change which concept is meant: `Applicable Best
# Practice` is `Best Practice`.
MODIFIERS = {"applicable", "appropriate", "key", "various", "relevant", "certain", "major", "typical", "basic", "principal"}

# Verbs: a target containing one is a clause the linker cut, whatever else it holds.
VERBS = {
    "add", "address", "affect", "apply", "arise", "carry", "cannot", "classify", "collaborate",
    "defend", "differ", "establish", "extract", "fail", "flag", "help", "maintain", "meet", "meets",
    "merge", "predict", "provide", "prune", "reduce", "regard", "transform", "synthesize", "analyze",
    "evaluate", "describe", "explain", "calculate", "identify", "understand", "assess", "compare",
    "recommend", "interpret", "demonstrate", "analyse", "discuss", "construct", "determine",
    "select", "perform", "develop", "create", "manage", "use", "characterize", "compared", "produced",
}
PLAIN = {
    "account", "amount", "basis", "best", "bound", "business", "category", "closed", "component", "course",
    "creation", "development", "driver", "early", "effect", "entry", "feature", "form", "foundation",
    "frame", "future", "group", "input", "member", "multiple", "new", "number", "open", "order",
    "output", "party", "people", "period", "perspective", "power", "practical", "principle",
    "question", "range", "record", "report", "required", "requirement", "response", "short",
    "skill", "source", "special", "standard", "study", "subset", "sum", "term", "tool", "version",
    "vision", "weight", "year", "square", "type", "key", "impact", "role", "need", "issue", "level",
    "change", "concept", "item", "element", "factor", "goal", "objective", "outcome", "task",
    "estimate", "measure", "general", "internal", "external",
} | GENERIC
ADJECTIVE_SUFFIXES = ("al", "ive", "ous", "ible", "able", "ory", "ic", "ed")


# One-word targets that are terms of art and earn a page of their own. Every
# other one-word target (`Organization`, `Quality`, `Call` for a call option) goes
# to the one-word triage list: most are a phrase the linker cut short, and a page
# called `Quality` would have nothing exam-specific to say. Keys as concept_key.
TERMS_OF_ART = {
    "mortality", "longevity", "lapse", "underwriting", "reinsurer", "annuitization", "martingale",
    "swaption", "straddle", "strangle", "collar", "numeraire", "convolution", "splicing", "overfitting",
    "hyperparameter", "imputation", "telematics", "insolvency", "nonforfeiture", "surety", "peril",
    "lasso", "endowment", "valuation", "reserve", "liquidity", "volatility", "hedging", "delta",
    "resampling", "explainability", "interpretability", "stacking", "inforce", "insurtech",
    "medicaid", "medicare", "utilization", "reimbursement", "exposure", "vesting", "funding",
    "indexing", "rebalancing", "payoff", "estimator", "governance", "validation", "trending",
    "pooling", "layer", "floor", "forecasting", "underwriting", "insurable", "spinoff", "divestiture",
    "heterogeneity", "granularity", "segmentation", "terrorism", "negligence", "cashflow",
    "autocorrelation", "isometry", "counterparty", "decomposability", "commission", "endorsement",
    "filing", "jurisdiction", "retiree", "self insurer", "no arbitrage", "jump diffusion",
    "black schole", "black schole merton", "chain ladder", "bornhuetter ferguson", "bühlmann",
    "log normal", "kolmogorov smirnov", "multi employer", "post retirement", "wind up",
    "termination wind up", "termination windup", "mortality morbidity", "insurance reinsurance",
}


# The words that finish a technical name a link was cut short of:
# `[[Limited Fluctuation]]` means `Limited Fluctuation Credibility`, but
# `[[Market Risk]]` does not mean `Market Risk Margin`.
COMPLETIONS = {
    "method", "model", "test", "credibility", "function", "distribution", "process", "insurance",
    "ratio", "analysis", "clustering", "regression", "estimation", "technique", "rule", "theorem",
    "formula", "criterion", "curve", "table", "plot", "management", "of", "loss", "square", "least",
}


def _adjective(w: str) -> bool:
    return len(w) > 4 and w.endswith(ADJECTIVE_SUFFIXES) and not w.endswith(("ment", "ism"))


def is_noise(name: str) -> bool:
    """A target that names no concept (see VAGUE / PLAIN)."""
    if name.endswith("'"):
        return True                          # `[[Company']]s` — a possessive cut in half
    words = concept_key(name).split()
    if not words:
        return True
    if len(words) == 1:
        w = words[0]
        return w in VAGUE or w in PLAIN or _adjective(w)
    if any(w in VERBS for w in words):
        return True
    return any(w in VAGUE for w in words) and all(w in VAGUE or w in PLAIN or _adjective(w) for w in words)


SMALL_WORDS = {"a", "an", "the", "of", "and", "or", "for", "in", "on", "to", "with", "by", "vs", "at"}


# ── reading ────────────────────────────────────────────────────────────────

@dataclass
class Occurrence:
    guide: str            # the page the link sits on
    exam: str | None      # wiki id of the exam the guide belongs to
    stage: float          # STAGE_FACTOR of that exam
    section: str | None   # learning-objective callout title
    weight: float | None  # midpoint of that section's weight, as a fraction
    source: bool          # inside the Source Material shelf
    line: int
    shown: str = ""       # the text the reader sees for the link
    before: str = ""      # up to three plain words before it, on the same line
    after: str = ""       # …and after it


def read(path: str) -> str:
    with open(path, encoding="utf-8") as fh:
        return fh.read()


def stage_of(exam: dict | None) -> float:
    if not exam:
        return DEV_OTHER
    if exam["status"] in STAGE_FACTOR:
        return STAGE_FACTOR[exam["status"]]
    return DEV_ASA if exam["wiki_id"] in ASA_PRELIMS else DEV_OTHER


def guide_pages(only: str | None) -> list[str]:
    pages = sorted(n for n in os.listdir(ROOT) if n.startswith("Exam ") and n.endswith(".md"))
    for dirpath, dirnames, files in os.walk(os.path.join(ROOT, "Guides")):
        dirnames.sort()
        pages += sorted(os.path.relpath(os.path.join(dirpath, f), ROOT) for f in files if f.endswith(".md"))
    if only:
        want = only if only.endswith(".md") else only + ".md"
        pages = [p for p in pages if p == want or p.startswith(f"Guides/{want[:-3]}/")]
    return pages


def occurrences(rel: str, catalog: list[dict]) -> list[tuple[vault_links.Link, Occurrence]]:
    """Every link on a guide, with the syllabus section and weight it sits under."""
    exam_page = rel.split("/")[1] + ".md" if rel.startswith("Guides/") and rel.count("/") >= 2 else rel
    exam = vault_links.exam_for_page(exam_page, catalog)
    stage = stage_of(exam)
    _, body = syllabus_lib.split_frontmatter(read(os.path.join(ROOT, rel)))
    offset = read(os.path.join(ROOT, rel)).count("\n") - body.count("\n")
    section = weight = None
    source = False
    out = []
    for i, line in enumerate(body.split("\n")):
        head = re.match(r"^#{1,6}\s+(.*?)\s*$", line)
        if head:
            section, weight = None, None
            source = head.group(1).strip().lower() == "source material"
        callout = syllabus_lib.CALLOUT_RE.match(line)
        if callout:
            kind, title = callout.group(1).lower(), callout.group(2)
            if kind == "example":
                w = syllabus_lib.WEIGHT_TAG_RE.search(title)
                section = (title[: w.start()] if w else title).strip()
                lohi = syllabus_lib.parse_weight(w.group(1)) if w else None
                weight = (lohi[0] + lohi[1]) / 200 if lohi else None
                source = False
            elif kind == "answer" and "source material" in title.lower():
                section, weight, source = None, None, True
        elif line.strip() and not line.startswith(">") and not head and section:
            section, weight = None, None
        for m in vault_links.LINK_RE.finditer(line):
            link = vault_links.Link(m.group(2), m.group(3), m.group(1) == "!", m.start())
            if link.embed or link.is_attachment:
                continue
            before = re.split(r"[.,;:()\[\]]", syllabus_lib.strip_links(line[: m.start()]))[-1].split()[-3:]
            after = re.split(r"[.,;:()\[\]]", syllabus_lib.strip_links(line[m.end():]))[0].split()[:3]
            out.append((link, Occurrence(rel, exam["wiki_id"] if exam else None, stage,
                                         section, weight, source, offset + i + 1,
                                         link.display or link.name, " ".join(before), " ".join(after))))
    return out


def frontmatter_aliases(vault: vault_links.Vault) -> dict[str, str]:
    """lower-cased alias → page name, from every page's `aliases:` frontmatter."""
    out: dict[str, str] = {}
    for name, rel in vault.by_name.items():
        fm, _ = syllabus_lib.split_frontmatter(read(os.path.join(ROOT, rel)))
        m = re.search(r"^aliases:[ \t]*(.*)$((?:\n[ \t]+-.*)*)", fm, re.M)
        if not m:
            continue
        items = []
        if m.group(1).strip().startswith("["):
            items = m.group(1).strip()[1:-1].split(",")
        elif m.group(1).strip():
            items = [m.group(1)]
        items += re.findall(r"^[ \t]+-[ \t]*(.*)$", m.group(2), re.M)
        for a in items:
            a = a.strip().strip("'\"")
            if a:
                out.setdefault(a.lower(), name)
    return out


# ── naming ─────────────────────────────────────────────────────────────────

def singular(word: str) -> str:
    if len(word) <= 3 or word.endswith(("ss", "us", "is", "ics", "sis")):
        return word
    if word.endswith("ies") and len(word) > 4:
        return word[:-3] + "y"
    if word.endswith(("ches", "shes", "xes", "sses")):
        return word[:-2]
    if word.endswith("s"):
        return word[:-1]
    return word


def concept_key(name: str) -> str:
    """The key two spellings of one concept share: case, hyphens, apostrophes,
    plurals and a trailing `(ACRONYM)` ignored."""
    t = re.sub(r"\s*\(([A-Z][A-Za-z0-9&/-]{1,9})\)\s*$", "", name.strip())
    t = vault_links.normalize_term(t).replace("'s ", " ").replace("'", "")
    t = re.sub(r"[^\w\s&]", " ", t)
    t = re.sub(r"\bmodell(ing|ed|er)\b", r"model\1", t)          # British spelling
    t = re.sub(r"\bspin off\b", "spinoff", t)
    return " ".join(singular(w) for w in t.split())


STEM_SUFFIXES = ("ation", "ator", "ing", "ion", "ate", "or", "ed", "er")


def _stem(w: str) -> str:
    for suf in STEM_SUFFIXES:
        if w.endswith(suf) and len(w) - len(suf) >= 4:
            return w[: -len(suf)]
    return w


def stem_key(name: str) -> str | None:
    """A looser key for multi-word names, each word's derivational suffix cut, so
    `Maximum Likelihood Estimator` meets `Maximum Likelihood Estimation` and
    `Predictive Modeling` meets `Predictive Model` (but `Insurable Risk` stays
    apart from `Insurance Risk`). None for one-word names, where it would join
    unrelated words."""
    words = concept_key(name).split()
    return " ".join(_stem(w) for w in words) if len(words) >= 2 else None


def acronym_of(name: str, *, initials: bool = True) -> str | None:
    """`Value at Risk (VaR)` → `VAR`; `Generalized Linear Model` → `GLM` (by initials)."""
    m = re.search(r"\(([A-Z][A-Za-z0-9&]{1,9})\)\s*$", name)
    if m:
        return m.group(1).upper()
    if not initials:
        return None
    words = [w for w in re.split(r"[\s-]+", re.sub(r"\(.*?\)", "", name)) if w and w.lower() not in SMALL_WORDS]
    return "".join(w[0] for w in words).upper() if len(words) >= 2 else None


def initials_all(name: str) -> str | None:
    """Initials counting the small words too: `Internal Rate of Return` → `IROR`,
    `Value at Risk` → `VAR`."""
    words = [w for w in re.split(r"[\s-]+", re.sub(r"\(.*?\)", "", name)) if w]
    return "".join(w[0] for w in words).upper() if len(words) >= 2 else None


def is_acronym(name: str) -> bool:
    return bool(re.fullmatch(r"[A-Z][A-Za-z0-9&]{1,7}", name)) and sum(c.isupper() for c in name) >= 2


def ambiguity(name: str) -> str | None:
    if "\\" in name or re.search(r"[*_`$<>]", name):
        return "markup in the target"
    if len(name.split()) > 7:
        return "sentence-length target"
    if is_acronym(name):
        return "bare acronym — which expansion does this exam mean?"
    if " " not in name and name.lower() in GENERIC:
        return "generic one-word term — needs an exam-specific meaning"
    return None


def depends_on(name: str, other: str) -> bool:
    """Is `other` named inside `name` (so a reader needs it first)?"""
    a, b = concept_key(name).split(), concept_key(other).split()
    if len(b) >= len(a) or not b:
        return False
    if len(b) == 1 and " ".join(b) not in TERMS_OF_ART:
        return False
    return any(a[i:i + len(b)] == b for i in range(len(a) - len(b) + 1))


# ── the analysis ───────────────────────────────────────────────────────────

@dataclass
class Gap:
    name: str
    spellings: Counter = field(default_factory=Counter)
    occ: list[Occurrence] = field(default_factory=list)
    questions: int = 0          # frontmatter: wiki_link / topic
    question_mentions: int = 0  # the term appears in a question's prose
    depends: list[str] = field(default_factory=list)
    dependents: list[str] = field(default_factory=list)
    score: float = 0.0
    tier: int = 3
    reason: str = ""

    @property
    def concept_occ(self) -> list[Occurrence]:
        return [o for o in self.occ if not o.source]

    @property
    def guides(self) -> list[str]:
        return sorted({o.guide for o in self.occ})

    @property
    def exams(self) -> list[str]:
        return sorted({o.exam for o in self.occ if o.exam})

    @property
    def aliases(self) -> list[str]:
        return [s for s, _ in self.spellings.most_common() if s != self.name]

    @property
    def weight(self) -> float:
        return max((o.weight or 0) * o.stage for o in self.occ) if self.occ else 0.0

    @property
    def stage(self) -> float:
        return max(o.stage for o in self.occ) if self.occ else 0.0

    @property
    def topic(self) -> tuple[str, str]:
        """(exam, section) of the heaviest place it is linked — what it is batched under."""
        best = max(self.occ, key=lambda o: ((o.weight or 0) * o.stage, o.stage, -o.line))
        return best.exam or best.guide, best.section or "(outside the objectives)"


def question_index() -> tuple[Counter, list[str]]:
    """concept key → questions naming it in frontmatter; and each question's prose."""
    tagged: Counter = Counter()
    prose: list[str] = []
    base = os.path.join(ROOT, "questions")
    for dirpath, _, files in os.walk(base):
        for fn in files:
            if not fn.endswith(".md"):
                continue
            fm, body = syllabus_lib.split_frontmatter(read(os.path.join(dirpath, fn)))
            keys = set()
            for entry in re.findall(r"^\s+-\s+(.+)$", fm.split("verification:")[0], re.M):
                slug = vault_links.question_link_slug(entry.strip().strip("'\"").replace("+", " "))
                if slug:
                    keys.add(concept_key(slug))
            t = re.search(r"^topic:\s*\"?(.*?)\"?\s*$", fm, re.M)
            if t:
                keys.add(concept_key(t.group(1)))
            tagged.update(keys)
            prose.append(" " + re.sub(r"\s+", " ", body.lower()) + " ")
    return tagged, prose


def analyse(only: str | None = None) -> dict:
    vault = vault_links.Vault()
    catalog = vault_links.load_catalog()
    tables = vault_links.load_aliases()
    fm_alias = frontmatter_aliases(vault)
    existing_keys: dict[str, str] = {}
    existing_stems: dict[str, str] = {}
    for name in vault.by_name:
        existing_keys.setdefault(concept_key(name), name)
        if vault.is_concept(name) and stem_key(name):
            existing_stems.setdefault(stem_key(name), name)

    total = resolved_exact = resolved_case = resolved_alias = 0
    case_only: dict[str, set] = defaultdict(set)
    missing: dict[str, list[tuple[str, Occurrence]]] = defaultdict(list)   # concept key → (spelling, occ)
    link_fixes: dict[str, dict] = {}
    guides = guide_pages(only)

    for rel in guides:
        for link, occ in occurrences(rel, catalog):
            total += 1
            name = link.name
            how, _ = vault.resolve(link.target)
            if how == "exact":
                resolved_exact += 1
                continue
            if how == "case":
                resolved_case += 1
                case_only[name].add(rel)
                continue
            if name.lower() in fm_alias:
                resolved_alias += 1
                continue
            key = concept_key(name)
            existing = (existing_keys.get(key) or tables["aliases"].get(vault_links.normalize_term(name))
                        or existing_stems.get(stem_key(name) or ""))
            if existing and vault.exists(existing):
                fix = link_fixes.setdefault(name, {"target": name, "page": existing, "count": 0, "guides": set()})
                fix["count"] += 1
                fix["guides"].add(rel)
                continue
            missing[key].append((name, occ))

    by_stem: dict[str, str] = {}
    for key in sorted(missing, key=lambda k: -len(missing[k])):
        st = stem_key(missing[key][0][0])
        if st and st in by_stem and by_stem[st] != key:
            missing[by_stem[st]] += missing.pop(key)
        elif st:
            by_stem[st] = key
    gaps: dict[str, Gap] = {}
    for key, rows in missing.items():
        spellings = Counter(n for n, _ in rows)
        # canonical: most-linked spelling, ties to the one in Title Case, then the shortest
        name = sorted(spellings, key=lambda s: (-spellings[s], s[:1].islower(), len(s), s))[0]
        gaps[key] = Gap(name, spellings, [o for _, o in rows])

    # a link whose shown text, read with the words around it, names a page that exists
    # (`[[Generalized Linear|generalized linear]] models`) is cut short: a link fix
    truncated: list[dict] = []
    def windows(o: Occurrence) -> list[str]:
        b, m_, a = o.before.split(), o.shown.split(), o.after.split()
        out = []
        for i in range(len(b) + 1):
            for j in range(len(a) + 1):
                if i or j:
                    out.append(" ".join(b[len(b) - i:] + m_ + a[:j]))
        return sorted(out, key=len, reverse=True)
    def existing_for(text: str) -> str | None:
        k = concept_key(text)
        page = existing_keys.get(k) or tables["aliases"].get(vault_links.normalize_term(text))
        return page if page and vault.is_concept(page) else None
    for key in list(gaps):
        g = gaps[key]
        hits = Counter()
        for o in g.occ:
            for w in windows(o):
                page = existing_for(w)
                if page:
                    hits[page] += 1
                    break
        if hits and sum(hits.values()) * 2 >= len(g.occ):
            page = hits.most_common(1)[0][0]
            truncated.append({"target": g.name, "page": page, "count": len(g.occ),
                              "guides": g.guides, "example": f"{g.occ[0].before} [[{g.name}]] {g.occ[0].after}".strip()})
            del gaps[key]

    # a multi-word target that is the start of exactly one existing page's name
    # (`Limited Fluctuation` → `Limited Fluctuation Credibility`) is that page cut
    # short; with several such pages it is a decision (see the ambiguity pass)
    concept_keys = [(concept_key(n), n) for n in vault.concept_names()]
    prefix_of: dict[str, list[str]] = {}
    for key in list(gaps):
        g = gaps[key]
        words = key.split()
        if len(words) < 2:
            continue
        cands = [n for k, n in concept_keys if k.startswith(key + " ")
                 and set(k.split()[len(words):]) <= COMPLETIONS and len(k.split()) - len(words) <= 2]
        if len(cands) == 1:
            truncated.append({"target": g.name, "page": cands[0], "count": len(g.occ), "guides": g.guides,
                              "example": f"{g.occ[0].before} [[{g.name}]] {g.occ[0].after}".strip()})
            del gaps[key]
        elif cands:
            prefix_of[key] = cands

    # a fragment of a missing multi-word concept (`[[Ordinary|ordinary]] least squares`)
    # or a bare acronym spelled out as `Name (ACR)` elsewhere is that concept
    acronym_merges, fragments = [], []
    full_by_acronym: dict[str, list[str]] = defaultdict(list)
    for key, g in gaps.items():
        for sp in g.spellings:
            ac = acronym_of(sp, initials=False)
            if ac:
                full_by_acronym[ac].append(key)
    for key in list(gaps):
        g = gaps.get(key)
        if g is None:
            continue
        if is_acronym(g.name) and len(set(full_by_acronym.get(g.name.upper(), []))) == 1:
            target = gaps[full_by_acronym[g.name.upper()][0]]
            target.spellings.update(g.spellings)
            target.occ += g.occ
            acronym_merges.append((g.name, target.name))
            del gaps[key]
            continue
        words = key.split()
        lead = 0
        while lead < len(words) - 1 and (words[lead] in VAGUE or words[lead] in MODIFIERS):
            lead += 1
        core = " ".join(words[lead:])
        if lead and core in gaps and core != key:
            gaps[core].occ += g.occ
            gaps[core].spellings.update(g.spellings)
            fragments.append({"target": g.name, "concept": gaps[core].name, "count": len(g.occ)})
            del gaps[key]
            continue
        if len(key.split()) > 1 and not is_noise(g.name):
            continue
        hits = Counter()
        for o in g.occ:
            for w in windows(o):
                k = concept_key(w)
                if k != key and len(k.split()) > len(key.split()) and k in gaps:
                    hits[k] += 1
                    break
        if hits and sum(hits.values()) * 2 >= len(g.occ):
            target = gaps[hits.most_common(1)[0][0]]
            target.occ += g.occ
            fragments.append({"target": g.name, "concept": target.name, "count": len(g.occ)})
            del gaps[key]

    # link noise: targets that name no concept
    noise = []
    for key in list(gaps):
        g = gaps[key]
        if g.concept_occ and is_noise(g.name) and not is_acronym(g.name):
            noise.append({"target": g.name, "count": len(g.occ), "guides": g.guides,
                          "example": f"{g.occ[0].before} [[{g.name}]] {g.occ[0].after}".strip()})
            del gaps[key]

    # what is a link fix to an existing page via its acronym? (`GLM` → `Generalized Linear Model`)
    existing_acronyms: dict[str, list[str]] = defaultdict(list)
    for n in vault.concept_names():
        if is_acronym(n):
            continue
        for ac in {acronym_of(n), initials_all(n)} - {None}:
            existing_acronyms[ac].append(n)
    missing_acronyms: dict[str, list[str]] = defaultdict(list)
    for g in gaps.values():
        if is_acronym(g.name):
            continue
        for ac in {acronym_of(g.name), initials_all(g.name)} - {None}:
            missing_acronyms[ac].append(g.name)

    # split off resource-only gaps and ambiguous ones
    resource_gaps, ambiguous = [], []
    for key in list(gaps):
        g = gaps[key]
        if not g.concept_occ:
            resource_gaps.append(g)
            del gaps[key]
            continue
        why = ambiguity(g.name)
        cands: list[str] = []
        if is_acronym(g.name):
            cands = existing_acronyms.get(g.name.upper(), []) + [f"{m} (new)" for m in missing_acronyms.get(g.name.upper(), [])]
        elif key in prefix_of:
            cands = prefix_of[key][:4]
            why = why or "begins the names of several existing pages"
        elif " " not in g.name.strip():
            k = concept_key(g.name)
            cands = [n for n in vault.concept_names()
                     if concept_key(n).startswith(k + " ") or (len(k) > 6 and concept_key(n).startswith(k))]
            if len(cands) == 1 and not why:
                why = "one word — the one existing page it begins is probably what is meant"
            cands = cands[:4]
        if why:
            proposal = ""
            if len(cands) == 1:
                proposal = f"link `{cands[0].removesuffix(' (new)')}`" + (" (planned page)" if cands[0].endswith("(new)") else "")
            ambiguous.append({"name": g.name, "why": why, "links": len(g.occ),
                              "guides": g.guides, "candidates": cands, "proposal": proposal,
                              "example": f"{g.occ[0].before} [[{g.name}]] {g.occ[0].after}".strip()})
            del gaps[key]

    # one-word targets that aren't terms of art: triage, not batches
    one_word = []
    for key in list(gaps):
        g = gaps[key]
        if len(key.split()) == 1 and " " not in g.name.strip() and key not in TERMS_OF_ART \
                or ("-" in g.name and " " not in g.name.strip() and key not in TERMS_OF_ART):
            one_word.append({"target": g.name, "count": len(g.occ), "guides": g.guides,
                             "example": f"{g.occ[0].before} [[{g.name}]] {g.occ[0].after}".strip()})
            del gaps[key]

    # questions
    tagged, prose = question_index()
    for key, g in gaps.items():
        g.questions = tagged.get(key, 0)
        needles = {f" {s.lower()} " for s in g.spellings} | {f" {s.lower()}s " for s in g.spellings}
        if len(concept_key(g.name).split()) >= 2:
            g.question_mentions = sum(1 for p in prose if any(n in p for n in needles))

    # prerequisites among the missing concepts
    names = {g.name: k for k, g in gaps.items()}
    by_first: dict[str, list[str]] = defaultdict(list)
    for n in names:
        for w in set(concept_key(n).split()):
            by_first[w].append(n)
    for k, g in gaps.items():
        cands = {c for w in set(concept_key(g.name).split()) for c in by_first[w]}
        for other in cands:
            if other != g.name and depends_on(g.name, other):
                g.depends.append(other)
                gaps[names[other]].dependents.append(g.name)
    # keep only the most specific prerequisite chain: drop a dep the other deps already contain
    for g in gaps.values():
        g.depends = sorted(d for d in g.depends if not any(d != e and depends_on(e, d) for e in g.depends))

    # score
    for g in gaps.values():
        occ = g.concept_occ
        g.score = round(
            2.0 * math.log1p(len({o.guide for o in occ}))
            + 1.0 * math.log1p(len(occ))
            + 3.0 * math.log1p(g.questions)
            + 1.0 * math.log1p(g.question_mentions)
            + 6.0 * g.weight
            + 2.0 * g.stage
            + 1.5 * math.log1p(len(g.dependents)),
            2,
        )

    # tiers
    for g in gaps.values():
        n_guides = len({o.guide for o in g.concept_occ})
        n_links = len(g.concept_occ)
        if g.questions or n_guides >= 4 or len(g.dependents) >= 3 or (g.stage >= DEV_ASA and n_guides >= 2):
            g.tier, g.reason = 1, "high-traffic foundation"
        elif n_guides >= 2 or n_links >= 3 or g.dependents or g.question_mentions >= 3 or g.stage >= DEV_ASA:
            g.tier, g.reason = 2, "frequently linked / exam-relevant"
        else:
            g.tier, g.reason = 3, "niche or single-link"
    # a prerequisite is never in a later tier than what is built on it
    changed = True
    while changed:
        changed = False
        for g in gaps.values():
            for d in g.depends:
                dg = gaps[names[d]]
                if dg.tier > g.tier:
                    dg.tier, dg.reason, changed = g.tier, f"prerequisite of {g.name}", True

    ordered = sorted(gaps.values(), key=lambda g: (g.tier, -g.score, g.name))
    batches = make_batches(ordered, names, gaps)

    stubs = find_stubs(vault, guides, catalog)

    return {
        "guides": guides,
        "counts": {
            "guides": len(guides),
            "links": total,
            "resolved_exact": resolved_exact,
            "resolved_case_only": resolved_case,
            "resolved_frontmatter_alias": resolved_alias,
            "link_fix_occurrences": sum(f["count"] for f in link_fixes.values()),
            "missing_occurrences": sum(len(g.occ) for g in gaps.values())
            + sum(len(g.occ) for g in resource_gaps)
            + sum(a["links"] for a in ambiguous)
            + sum(t["count"] for t in truncated) + sum(n["count"] for n in noise)
            + sum(o["count"] for o in one_word),
            "missing_concepts": len(gaps),
            "spellings_merged": sum(len(g.spellings) - 1 for g in gaps.values()),
            "acronyms_merged": len(acronym_merges),
            "fragments_merged": len(fragments),
            "truncated": len(truncated),
            "truncated_occurrences": sum(t["count"] for t in truncated),
            "one_word": len(one_word),
            "noise": len(noise),
            "noise_occurrences": sum(n["count"] for n in noise),
            "link_fixes": len(link_fixes),
            "resource_gaps": len(resource_gaps),
            "ambiguous": len(ambiguous),
            "stubs": len(stubs),
            "tiers": dict(Counter(g.tier for g in gaps.values())),
        },
        "gaps": ordered,
        "batches": batches,
        "link_fixes": sorted(link_fixes.values(), key=lambda f: -f["count"]),
        "case_only": {k: sorted(v) for k, v in case_only.items()},
        "acronym_merges": acronym_merges,
        "fragments": fragments,
        "truncated": sorted(truncated, key=lambda t: -t["count"]),
        "noise": sorted(noise, key=lambda n: -n["count"]),
        "one_word": sorted(one_word, key=lambda n: -n["count"]),
        "resource_gaps": sorted(resource_gaps, key=lambda g: -len(g.occ)),
        "ambiguous": sorted(ambiguous, key=lambda a: -a["links"]),
        "stubs": stubs,
    }


# Batches are cut within a subject domain, so the concepts written together
# share notation and readings. FAM is split by section: its first half is
# short-term insurance, its second long-term.
DOMAINS = [
    ("Long-term insurance (life, annuities)", ("altam-1", "ila-", "cp-341", "cp-312")),
    ("Short-term insurance (P&C, general)", ("astam-1", "gi-", "disc-rm", "disc-ia", "6u-1")),
    ("Statistics and predictive analytics", ("srm-1", "pa-1", "atpa-1", "disc-da")),
    ("Financial economics and investments", ("inv-", "cp-351")),
    ("Retirement", ("ret-",)),
    ("Health", ("gh-", "cp-321")),
    ("ERM and corporate finance", ("cfe-", "cp-311")),
]
FAM_LONG = ("long-term", "mortality", "present value random", "premium and policy value")


def domain_of(exam: str | None, section: str | None) -> str:
    if exam == "fam-1":
        sec = (section or "").lower()
        if "option" in sec:
            return DOMAINS[3][0]
        return DOMAINS[0][0] if any(k in sec for k in FAM_LONG) else DOMAINS[1][0]
    for name, prefixes in DOMAINS:
        if exam and exam.startswith(prefixes):
            return name
    return "Other"


def make_batches(ordered: list[Gap], names: dict, gaps: dict) -> list[dict]:
    """~BATCH_SIZE concepts each, one subject domain at a time, prerequisites never later.

    Within a tier, domains come in the order of their best concept; within a
    domain, concepts are ordered by exam and syllabus section so a batch reads as
    one topic. Pinned batches (scripts/concept_gaps_batches.json) keep their
    numbers and members across reruns; only concepts not yet pinned are cut.
    """
    pinned = load_pinned()
    placed: set[str] = set()
    batches: list[dict] = []
    for b in pinned:
        placed.update(b["concepts"])
        batches.append({"n": b["n"], "tier": b.get("tier"), "topic": b["topic"],
                        "concepts": list(b["concepts"]), "pinned": True})

    by_domain: dict[tuple, list[Gap]] = defaultdict(list)
    for g in ordered:
        if g.name not in placed:
            exam, section = g.topic
            by_domain[(g.tier, domain_of(exam, section))].append(g)
    order = sorted(by_domain, key=lambda t: (t[0], -max(g.score for g in by_domain[t])))
    n = max((b["n"] for b in batches), default=0)
    for t in order:
        group = sorted(by_domain[t], key=lambda g: (g.topic[0], g.topic[1], -g.score))
        queue = topo(group, names, gaps, placed)
        chunks = [queue[i:i + BATCH_SIZE] for i in range(0, len(queue), BATCH_SIZE)]
        if len(chunks) > 1 and len(chunks[-1]) < 4:
            tail = chunks.pop()
            chunks[-1] += tail                  # don't leave a 1–3 concept tail
        for chunk in chunks:
            n += 1
            secs = Counter(f"{g.topic[0]}|{g.topic[1]}" for g in chunk).most_common(2)
            batches.append({"n": n, "tier": t[0], "topic": [t[1], "; ".join(s for s, _ in secs)],
                            "concepts": [g.name for g in chunk]})
            placed.update(g.name for g in chunk)
    return batches


def topo(group: list[Gap], names: dict, gaps: dict, placed: set) -> list[Gap]:
    """Order a topic's concepts so each comes after its unplaced prerequisites —
    pulling a prerequisite from another topic forward into this one."""
    out: list[Gap] = []
    seen: set[str] = set(placed)

    def visit(g: Gap) -> None:
        if g.name in seen:
            return
        seen.add(g.name)
        for d in g.depends:
            visit(gaps[names[d]])
        out.append(g)

    for g in group:
        visit(g)
    return out


def load_pinned() -> list[dict]:
    if not os.path.exists(PINNED):
        return []
    with open(PINNED, encoding="utf-8") as fh:
        return json.load(fh).get("batches", [])


# ── stubs ──────────────────────────────────────────────────────────────────

def find_stubs(vault: vault_links.Vault, guides: list[str], catalog: list[dict]) -> list[dict]:
    inbound: Counter = Counter()
    for rel in guides:
        for link, _ in occurrences(rel, catalog):
            how, path = vault.resolve(link.target)
            if path and path.startswith("Concepts/"):
                inbound[path] += 1
    out = []
    for name in vault.concept_names():
        rel = vault.by_name[name]
        _, body = syllabus_lib.split_frontmatter(read(os.path.join(ROOT, rel)))
        prose = re.sub(r"!\[\[[^\]]*\]\]", " ", body)
        words = len(re.findall(r"[A-Za-z][A-Za-z'-]*", re.sub(r"\$[^$]*\$", " x ", prose)))
        has_def = bool(re.search(r"\*\*[^*]+\*\*", body[:600]))
        has_formula = "$$" in body
        has_example = bool(re.search(r"\[!example\]", body))
        missing = [s for s, ok in (("definition", has_def), ("formula", has_formula), ("example", has_example)) if not ok]
        if words < 40 or (missing and words < STUB_WORDS) or (inbound[rel] and "example" in missing and words < 250):
            out.append({"name": name, "words": words, "missing": missing, "inbound": inbound[rel]})
    return sorted(out, key=lambda s: (-s["inbound"], s["words"]))


# ── output ─────────────────────────────────────────────────────────────────

def exam_label(wiki_id: str, catalog: list[dict]) -> str:
    e = vault_links.exam_for_id(wiki_id, catalog)
    return e["page"][:-3].replace("Exam ", "") if e else wiki_id


def cell(s: str) -> str:
    return s.replace("|", "\\|")


def render(r: dict) -> str:
    catalog = vault_links.load_catalog()
    c = r["counts"]
    done = [b for b in r["batches"] if b.get("pinned") and not any(n in {g.name for g in r["gaps"]} for n in b["concepts"])]
    L = [BEGIN, "",
         "_Generated by `python3 scripts/find_concept_gaps.py --update-plan`. Do not edit between the markers._", "",
         "### Summary — where every link on the study guides goes", "",
         "| Bucket | Distinct targets | Links |", "|---|---|---|",
         f"| Resolve exactly (Obsidian and the app) | | {c['resolved_exact']:,} |",
         f"| Resolve only case-insensitively (Obsidian yes, app no) | | {c['resolved_case_only']} |",
         f"| Resolve through a frontmatter `aliases:` | | {c['resolved_frontmatter_alias']} |",
         f"| **Concepts to write** (tiered and batched below) | **{c['missing_concepts']:,}** | {sum(len(g.concept_occ) for g in r['gaps']):,} |",
         f"| Variant spelling of an existing page — link fix | {c['link_fixes']} | {c['link_fix_occurrences']} |",
         f"| Cut short — the link plus its next words names an existing page | {c['truncated']} | {c['truncated_occurrences']} |",
         f"| Link noise — names no concept (`Cannot`, `Differ Compared`) | {c['noise']} | {c['noise_occurrences']:,} |",
         f"| One-word target, not a term of art — triage | {c['one_word']} | {sum(o['count'] for o in r['one_word'])} |",
         f"| Ambiguous — needs your decision | {c['ambiguous']} | {sum(a['links'] for a in r['ambiguous'])} |",
         f"| Missing reading — `Resources/Books/`, Source Material only | {c['resource_gaps']} | {sum(len(g.occ) for g in r['resource_gaps'])} |",
         f"| **Total** | | **{c['links']:,}** |",
         "",
         f"Within the concepts to write: {c['spellings_merged']} duplicate spellings merged "
         f"(+{c['acronyms_merged']} acronyms, +{c['fragments_merged']} fragments). "
         f"Tier 1 / 2 / 3: **{c['tiers'].get(1, 0)} / {c['tiers'].get(2, 0)} / {c['tiers'].get(3, 0)}**, "
         f"in **{len(r['batches'])} batches** ({len(done)} done). "
         f"Existing concept pages that are stubs: **{c['stubs']}**.",
         ""]

    by_exam: dict[str, Counter] = defaultdict(Counter)
    for g in r["gaps"]:
        for e in g.exams or ["(guide)"]:
            by_exam[e][g.tier] += 1
    L += ["### Missing concepts by exam", "",
          "A concept linked from several exams counts once under each.", "",
          "| Exam | Stage | Tier 1 | Tier 2 | Tier 3 | Total |", "|---|---|---|---|---|---|"]
    for e, t in sorted(by_exam.items(), key=lambda kv: -sum(kv[1].values())):
        ex = vault_links.exam_for_id(e, catalog)
        L.append(f"| {exam_label(e, catalog)} | {ex['status'] if ex else ''} | {t[1]} | {t[2]} | {t[3]} | {sum(t.values())} |")
    L.append("")

    gap_by_name = {g.name: g for g in r["gaps"]}
    L += ["### Batches", "",
          "In order. Each batch is one topic (the exam and syllabus section it is most heavily linked from); "
          "a prerequisite from another topic is pulled forward into the batch that needs it.", ""]
    for b in r["batches"]:
        status = "done" if b in done else "to do"
        names = ", ".join(f"`{n}`" + ("" if n in gap_by_name or status == "done" else " ✓") for n in b["concepts"])
        secs = "; ".join(f"{exam_label(x.split('|')[0], catalog)} › {x.split('|')[1]}" for x in b["topic"][1].split("; "))
        topic = f"{b['topic'][0]} ({secs})"
        L.append(f"- **Batch {b['n']}** (Tier {b['tier']}, {status}) · {cell(topic)} · {len(b['concepts'])} concepts: {names}")
    L.append("")

    for tier in (1, 2, 3):
        rows = [g for g in r["gaps"] if g.tier == tier]
        if not rows:
            continue
        title = {1: "Tier 1 — high-traffic foundations", 2: "Tier 2 — frequently linked, exam-relevant",
                 3: "Tier 3 — niche or single-link"}[tier]
        L += [f"### {title} ({len(rows)})", ""]
        if tier == 3:
            L += ["<details><summary>Show the table</summary>", ""]
        L += ["| # | Concept (canonical filename) | Aliases | Links (guides) | Qs tagged / mentioned | Weight | Exam(s) | Linked from | Depends on | Score |",
              "|---|---|---|---|---|---|---|---|---|---|"]
        for i, g in enumerate(rows, 1):
            occ = g.concept_occ
            secs = sorted({f"{exam_label(o.exam, catalog) if o.exam else o.guide} › {o.section}" for o in occ if o.section})
            secs_s = "; ".join(secs[:3]) + (f"; +{len(secs) - 3}" if len(secs) > 3 else "")
            L.append("| {} | `Concepts/{}.md` | {} | {} ({}) | {} / {} | {} | {} | {} | {} | {} |".format(
                i, cell(g.name), cell(", ".join(g.aliases)) or "—", len(occ), len({o.guide for o in occ}),
                g.questions, g.question_mentions, f"{g.weight:.0%}" if g.weight else "—",
                ", ".join(exam_label(e, catalog) for e in g.exams), cell(secs_s) or "—",
                cell(", ".join(g.depends)) or "—", g.score))
        if tier == 3:
            L += ["", "</details>"]
        L.append("")

    L += ["### Link fixes — the target is a variant of a page that exists", "",
          "Writing a page would duplicate one. Each of these wants its guide link changed to the page "
          "(not done here: the task leaves the study guides alone). Top 60 by link count.", "",
          "| Link target | Existing page | Links | Guides |", "|---|---|---|---|"]
    for f in r["link_fixes"][:60]:
        L.append(f"| `{cell(f['target'])}` | `{cell(f['page'])}` | {f['count']} | {len(f['guides'])} |")
    if len(r["link_fixes"]) > 60:
        L.append(f"| … {len(r['link_fixes']) - 60} more (see `--json`) | | | |")
    L.append("")

    L += ["### Cut-short links — the shown text plus its neighbours names an existing page", "",
          "| Link target | Existing page | Links | In context |", "|---|---|---|---|"]
    for t in r["truncated"]:
        L.append(f"| `{cell(t['target'])}` | `{cell(t['page'])}` | {t['count']} | `{cell(t['example'])}` |")
    L.append("")

    L += ["### Ambiguous targets — for you to decide", "",
          "| Target | Why | Links | Guides | Candidates | Proposed |", "|---|---|---|---|---|---|"]
    for a in r["ambiguous"]:
        gs = ", ".join(os.path.basename(x)[:-3].replace("Exam ", "") for x in a["guides"][:4])
        L.append(f"| `{cell(a['name'])}` | {a['why']} | {a['links']} | {cell(gs)} | {cell(', '.join(a['candidates'])) or '—'} | {cell(a.get('proposal', '')) or '—'} |")
    L.append("")

    L += [f"### One-word targets that aren't terms of art ({len(r['one_word'])})", "",
          "Not batched. Most are a phrase cut short (`Call` for *call option*); a page named after the bare word "
          "would have nothing exam-specific to say. Promote one by adding it to `TERMS_OF_ART` in the script.", "",
          "<details><summary>Show the list</summary>", "",
          ", ".join(f"`{o['target']}` ({o['count']})" for o in r["one_word"]), "", "</details>", ""]
    L += [f"### Link noise ({len(r['noise'])})", "",
          "Targets that name no concept. The fix is to unlink them (in `scripts/syllabus_write.py`'s linker), not to write pages.", "",
          "<details><summary>Show the list</summary>", "",
          ", ".join(f"`{n['target']}` ({n['count']})" for n in r["noise"]), "", "</details>", ""]

    if r["acronym_merges"]:
        L += ["### Acronyms merged into their spelled-out concept", "",
              ", ".join(f"`{a}` → `{b}`" for a, b in r["acronym_merges"]), ""]

    L += [f"### Missing resource pages ({len(r['resource_gaps'])})", "",
          "Linked only from a Source Material shelf — a `Resources/Books/` reading, written to "
          "`docs/resource-pages.md` from the real document, not a concept page. Out of scope for this plan.", "",
          "<details><summary>Show the list</summary>", ""]
    for g in r["resource_gaps"]:
        L.append(f"- `{g.name}` — {', '.join(exam_label(e, catalog) for e in g.exams)}")
    L += ["", "</details>", ""]

    stubs = r["stubs"]
    L += [f"### Secondary list — stub concept pages ({len(stubs)})", "",
          f"Nearly empty (under 40 words of prose); or under {STUB_WORDS} words and missing a part of the "
          "definition → formula → worked example shape; or linked from a guide, under 250 words and with no worked example. "
          "Sorted by inbound guide links.", "",
          "| Page | Words | Missing | Inbound guide links |", "|---|---|---|---|"]
    for s in stubs:
        L.append(f"| `{cell(s['name'])}` | {s['words']} | {', '.join(s['missing']) or '—'} | {s['inbound']} |")
    L += ["", END]
    return "\n".join(L)


def to_json(r: dict) -> dict:
    def g2d(g: Gap) -> dict:
        return {"name": g.name, "aliases": g.aliases, "tier": g.tier, "reason": g.reason, "score": g.score,
                "links": len(g.concept_occ), "guides": g.guides, "exams": g.exams,
                "questions_tagged": g.questions, "questions_mentioning": g.question_mentions,
                "weight": g.weight, "topic": list(g.topic), "depends_on": g.depends, "dependents": g.dependents,
                "occurrences": [o.__dict__ for o in g.occ]}
    out = dict(r)
    out["gaps"] = [g2d(g) for g in r["gaps"]]
    out["resource_gaps"] = [{"name": g.name, "exams": g.exams, "guides": g.guides} for g in r["resource_gaps"]]
    out["link_fixes"] = [{**f, "guides": sorted(f["guides"])} for f in r["link_fixes"]]
    return out


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--exam", help="one study guide, e.g. 'Exam FAM (SOA)'")
    ap.add_argument("--json", metavar="PATH", help="write the full analysis as JSON")
    ap.add_argument("--update-plan", action="store_true", help="refresh the generated region of CONCEPT_GAPS_PLAN.md")
    ap.add_argument("--pin", action="store_true", help="pin the current batch list (scripts/concept_gaps_batches.json)")
    ap.add_argument("--check", nargs="*", metavar="CONCEPT",
                    help="exit 1 if any named concept (or, with no names, any pinned-batch concept) is still missing")
    args = ap.parse_args()

    r = analyse(args.exam)
    c = r["counts"]
    print(f"{c['links']:,} links on {c['guides']} study guides: {c['resolved_exact']:,} resolve, "
          f"{c['missing_concepts']:,} concepts missing (tiers {c['tiers']}), {c['link_fixes']} link fixes, "
          f"{c['ambiguous']} ambiguous, {c['resource_gaps']} missing resources, {c['stubs']} stubs, "
          f"{len(r['batches'])} batches")

    if args.json:
        with open(args.json, "w", encoding="utf-8") as fh:
            json.dump(to_json(r), fh, indent=1, default=list)
    if args.pin:
        with open(PINNED, "w", encoding="utf-8") as fh:
            json.dump({"_comment": "Batch membership pinned by scripts/find_concept_gaps.py --pin. "
                                   "Edit by hand to reorder or move concepts between batches.",
                       "batches": [{k: b[k] for k in ("n", "tier", "topic", "concepts")} for b in r["batches"]]},
                      fh, indent=1, ensure_ascii=False)
            fh.write("\n")
    if args.update_plan:
        text = read(PLAN) if os.path.exists(PLAN) else f"# Concept gaps plan\n\n{BEGIN}\n{END}\n"
        if BEGIN not in text or END not in text:
            text = text.rstrip() + f"\n\n{BEGIN}\n{END}\n"
        a, b = text.index(BEGIN), text.index(END) + len(END)
        with open(PLAN, "w", encoding="utf-8") as fh:
            fh.write(text[:a] + render(r) + text[b:])
    if args.check is not None:
        missing = {g.name for g in r["gaps"]}
        want = args.check or [n for b in load_pinned() for n in b["concepts"]]
        still = [n for n in want if n in missing]
        for n in still:
            print(f"still missing: {n}")
        return 1 if still else 0
    return 0


if __name__ == "__main__":
    sys.exit(main())
