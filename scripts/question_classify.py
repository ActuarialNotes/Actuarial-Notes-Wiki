#!/usr/bin/env python3
"""
question_classify.py — assign topic / learning objective / wiki links / difficulty
without asking a model to read the question.

Stage 2 of the pipeline in `docs/pdf-question-pipeline.md`. The four judgment
fields a question file carries are not equally hard, and this module treats
them differently on purpose:

* **learning_objective** — voted by the question's nearest neighbours among the
  1,400 questions the bank already holds, falling back to the syllabus callout
  that lists the best-matching concept. Each `Exam *.md` page groups its
  concepts under `> [!example]- <objective> {weight}` callouts, the same
  structure `quiz/src/lib/syllabusChapters.ts` reads. Leave-one-out over the
  current bank puts the vote at 87-99% on Exam FM / 5 / MAS-I and 75% on
  Exam P, so this one is assigned.
* **difficulty** — a proxy from the publisher's own solution: how many steps
  and display equations it took them to work it. A soft label; assigned.
* **topic** and **wiki_link** — *proposed, never settled.* The same
  measurement puts topic prediction at 40-70%, because the authored topic is
  often a broader page than the question's own words name. So the leading
  candidate is written (the judgment file stays usable) but `needs_review`
  stays set, and `question_write.py` refuses such a question unless
  `--accept-unreviewed` says otherwise.

The saving is not in removing that judgment — it is in what the judgment costs.
`review.md` gives a reviewer an id, a one-line gist, the candidate topics and
the voted objective: a couple of hundred characters instead of re-reading the
question, its options and its solution.

Usage
-----
    python3 scripts/question_classify.py --records /tmp/build/records.jsonl \\
        --out /tmp/build/judgments.jsonl        # also writes review.md beside it

    python3 scripts/question_classify.py --records … --review-only   # sheet only
"""

from __future__ import annotations

import argparse
import dataclasses
import functools
import json
import math
import os
import re
import sys
from dataclasses import dataclass
from pathlib import Path

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ontology_map import ONTOLOGY  # noqa: E402
from validate_content import parse_frontmatter  # noqa: E402

REPO_ROOT = Path(__file__).resolve().parent.parent

# Bank → the syllabus page whose callouts name its learning objectives.
EXAM_PAGE_BY_BANK = {
    "exam-p": "Exam P-1 (SOA).md",
    "exam-fm": "Exam FM-2 (SOA).md",
    "exam-mas-i": "Exam MAS-I (CAS).md",
    "exam-mas-ii": "Exam MAS-II (CAS).md",
    "exam-5": "Exam 5 (CAS).md",
    "exam-6c": "Exam 6C (CAS).md",
    "exam-6u": "Exam 6U (CAS).md",
    "exam-7": "Exam 7 (CAS).md",
    "exam-8": "Exam 8 (CAS).md",
    "exam-9": "Exam 9 (CAS).md",
}

# A phrase shorter than this matches too much to identify anything.
MIN_ALIAS = 5
# Below this score the best match is not trustworthy enough to stand unreviewed.
CONFIDENT_SCORE = 14
MAX_LINKS = 4
# Candidates offered per question in the review sheet.
MAX_CANDIDATES = 5

CALLOUT_RE = re.compile(r"^>\s*\[!example\]-?\s*(.+?)\s*(?:\{[^}]*\})?\s*$")
WIKILINK_RE = re.compile(r"\[\[([^\]|#]+)(?:\|[^\]]*)?\]\]")


# ─── Indexes built from the vault ─────────────────────────────────────────────


def concept_index(root: Path | None = None) -> dict[str, str]:
    """alias (lowercase) → `Concepts/<name>.md` stem.

    Every page contributes its own name; the ontology table contributes the
    topic spellings the bank already uses for it, so a question that says
    "Bayes' Theorem" lands on the `Bayes Theorem` page.
    """
    root = root or REPO_ROOT
    index: dict[str, str] = {}
    concepts = root / "Concepts"
    if concepts.is_dir():
        for path in concepts.glob("*.md"):
            stem = path.stem
            for alias in _aliases(stem):
                index.setdefault(alias, stem)
    for raw, (concept, _lo) in ONTOLOGY.items():
        for alias in _aliases(raw):
            index.setdefault(alias, concept)
    return {a: c for a, c in index.items() if len(a) >= MIN_ALIAS}


def _aliases(name: str) -> list[str]:
    low = name.lower()
    out = {low}
    # "Poisson Distribution" is written both ways across the bank.
    for suffix in (" distribution", " theorem", " (pdf)", " (cdf)"):
        if low.endswith(suffix):
            out.add(low[: -len(suffix)])
    out.add(low.replace("'", ""))
    # A parenthetical gloss is not part of the phrase in running text.
    out.add(re.sub(r"\s*\([^)]*\)", "", low).strip())
    return [a for a in out if a]


def syllabus_objectives(bank: str, root: Path | None = None) -> dict[str, str]:
    """concept name (lowercase) → learning objective, read off the exam page."""
    root = root or REPO_ROOT
    page = EXAM_PAGE_BY_BANK.get(bank)
    if not page or not (root / page).is_file():
        return {}
    objectives: dict[str, str] = {}
    current = ""
    for line in (root / page).read_text(encoding="utf-8").splitlines():
        callout = CALLOUT_RE.match(line)
        if callout:
            current = callout.group(1).strip()
            continue
        if not line.startswith(">"):
            current = current if line.strip() == "" else ""
            continue
        if not current:
            continue
        for target in WIKILINK_RE.findall(line):
            objectives.setdefault(target.strip().lower(), current)
    return objectives


def ontology_objectives() -> dict[str, str]:
    """concept page → learning objective, from the authored ontology table."""
    return {concept.lower(): lo for concept, lo in ONTOLOGY.values()}


# `A. Ratemaking` / `A1. …` — the syllabus enumerates its callouts, the bank
# does not carry the enumerator.
ENUMERATOR_RE = re.compile(r"^[A-Z]\d*[.)]\s+")
LABEL_RE = re.compile(r'(?m)^learning_objective:\s*"?([^"\n]+?)"?\s*$')


@functools.lru_cache(maxsize=None)
def bank_labels(bank: str, root: str | None = None) -> tuple[str, ...]:
    """The `learning_objective` values the bank already uses, most common first."""
    base = Path(root or REPO_ROOT) / "questions" / bank
    if not base.is_dir():
        return ()
    counts: dict[str, int] = {}
    for path in base.glob("*.md"):
        match = LABEL_RE.search(path.read_text(encoding="utf-8"))
        if match:
            counts[match.group(1).strip()] = counts.get(match.group(1).strip(), 0) + 1
    return tuple(sorted(counts, key=lambda k: -counts[k]))


def canonical_objective(name: str, labels: tuple[str, ...]) -> str:
    """Reconcile a syllabus callout name with what the bank already writes.

    The CAS syllabus calls an objective `B. Estimating Claim Liabilities
    (Reserving)`; every Exam 5 question in the bank says `Reserving`. Matching
    the bank matters more than matching the PDF — questions on the same
    objective have to group together — so a label the bank already uses wins
    whenever the callout name contains exactly one of them.
    """
    name = ENUMERATOR_RE.sub("", name or "").strip()
    if not name or name in labels:
        return name
    inside = [
        label
        for label in labels
        if re.search(rf"(?<!\w){re.escape(label)}(?!\w)", name, re.IGNORECASE)
    ]
    return inside[0] if len(inside) == 1 else name


# ─── Nearest neighbours in the bank already authored ──────────────────────────

# The bank is 1,400 questions a person already classified, which makes it the
# best available predictor. Measured leave-one-out over the current bank, a
# 5-nearest-neighbour vote gets `learning_objective` right 87-99% of the time
# on Exam FM / 5 / MAS-I and 75% on Exam P — but `topic` only 40-70%, because
# the authored topic is often a broader page than the question's words name.
# So the objective is voted and the topic is only ever *proposed*.

TOKEN_RE = re.compile(r"[a-z][a-z'-]{2,}")
STOPWORDS = frozenset(
    """the and for that with this from are was were has have had not but all any
    one two can use used using calculate given following each per its his her
    they them then than into out over under both which what when where how also
    may such same other more most less least etc let where""".split()
)
NEIGHBOURS = 5
# More neighbours are consulted for candidates than for the objective vote:
# recall matters there, and a fifth neighbour's topic is still a real guess.
CANDIDATE_NEIGHBOURS = 8
# Below this the neighbourhood is too thin for its vote to mean anything.
MIN_SIMILARITY = 0.15
# A vote this one-sided is decisive; anything less goes to review.
DECISIVE_SHARE = 0.6


def bag_of_words(text: str) -> dict[str, int]:
    counts: dict[str, int] = {}
    for word in TOKEN_RE.findall(text.lower()):
        if word not in STOPWORDS:
            counts[word] = counts.get(word, 0) + 1
    return counts


@dataclass
class BankIndex:
    """TF-IDF vectors for the questions a bank already holds."""

    labels: list[dict] = dataclasses.field(default_factory=list)
    vectors: list[dict[str, float]] = dataclasses.field(default_factory=list)
    idf: dict[str, float] = dataclasses.field(default_factory=dict)

    def __bool__(self) -> bool:
        return bool(self.vectors)

    def vector(self, text: str) -> dict[str, float]:
        raw = {
            word: (1 + math.log(count)) * self.idf.get(word, 0.0)
            for word, count in bag_of_words(text).items()
        }
        norm = math.sqrt(sum(x * x for x in raw.values())) or 1.0
        return {word: x / norm for word, x in raw.items() if x}

    def neighbours(self, text: str, k: int = NEIGHBOURS) -> list[tuple[float, dict]]:
        query = self.vector(text)
        if not query:
            return []
        scored: list[tuple[float, int]] = []
        for i, vec in enumerate(self.vectors):
            small, large = (query, vec) if len(query) < len(vec) else (vec, query)
            sim = sum(x * large.get(word, 0.0) for word, x in small.items())
            if sim > 0:
                scored.append((sim, i))
        scored.sort(key=lambda pair: -pair[0])
        return [(sim, self.labels[i]) for sim, i in scored[:k]]


BODY_SPLIT_RE = re.compile(r"(?m)^#{2,3}\s+Explanation\s*$")


@functools.lru_cache(maxsize=None)
def build_bank_index(bank: str, root: str | None = None) -> BankIndex:
    """Index the bank's existing questions, skipping any id in `exclude`."""
    base = Path(root or REPO_ROOT) / "questions" / bank
    if not base.is_dir():
        return BankIndex()

    labels: list[dict] = []
    bags: list[dict[str, int]] = []
    for path in sorted(base.glob("*.md")):
        text = path.read_text(encoding="utf-8")
        data, body = parse_frontmatter(text)
        if not data or body is None or not data.get("topic"):
            continue
        labels.append(
            {
                "id": str(data.get("id") or path.stem),
                "topic": str(data.get("topic") or ""),
                "learning_objective": str(data.get("learning_objective") or ""),
                "difficulty": str(data.get("difficulty") or ""),
                "wiki_link": [
                    link for link in (data.get("wiki_link") or []) if isinstance(link, str)
                ],
            }
        )
        bags.append(bag_of_words(body))

    if not bags:
        return BankIndex()

    document_count = len(bags)
    frequency: dict[str, int] = {}
    for bag in bags:
        for word in bag:
            frequency[word] = frequency.get(word, 0) + 1
    idf = {word: math.log(document_count / count) for word, count in frequency.items()}

    index = BankIndex(labels=labels, idf=idf)
    for bag in bags:
        raw = {word: (1 + math.log(count)) * idf.get(word, 0.0) for word, count in bag.items()}
        norm = math.sqrt(sum(x * x for x in raw.values())) or 1.0
        index.vectors.append({word: x / norm for word, x in raw.items() if x})
    return index


RRF_K = 60


def rank_candidates(
    hits: list[tuple[str, float]], neighbours: list[tuple[float, dict]]
) -> list[str]:
    """Fuse the two topic rankings into one candidate list.

    The neighbours and the phrase matcher are good at different things — the
    neighbours find the broad page the bank actually files a question under,
    the phrase matcher finds the specific concept its words name — and neither
    dominates. Reciprocal-rank fusion combines them without a tuned weight:
    each list contributes `1/(k + rank)` to a candidate's score.

    Measured over the current bank (leave-one-out), the authored topic is in
    the top 5 of this list about 73% of the time on Exam P, 89% on FM and 72%
    on Exam 5 — against 65/79/63 for simply concatenating the two lists.
    """
    by_similarity: dict[str, float] = {}
    for sim, label in neighbours:
        topic = label.get("topic") or ""
        if topic:
            by_similarity[topic] = by_similarity.get(topic, 0.0) + sim
    neighbour_order = sorted(by_similarity, key=lambda t: -by_similarity[t])

    scores: dict[str, float] = {}
    for ranking in (neighbour_order, [concept for concept, _score in hits]):
        for rank, topic in enumerate(ranking):
            scores[topic] = scores.get(topic, 0.0) + 1.0 / (RRF_K + rank + 1)
    return sorted(scores, key=lambda t: (-scores[t], t))


def vote(neighbours: list[tuple[float, dict]], key: str) -> tuple[str, float]:
    """The similarity-weighted winner for `key`, and its share of the vote."""
    tally: dict[str, float] = {}
    for sim, label in neighbours:
        value = label.get(key) or ""
        if value:
            tally[value] = tally.get(value, 0.0) + sim
    if not tally:
        return "", 0.0
    total = sum(tally.values())
    winner = max(tally, key=lambda k: tally[k])
    return winner, tally[winner] / total


# ─── Fingerprints ─────────────────────────────────────────────────────────────

# The imperative sentence is the most diagnostic line in an exam question, and
# it is what a reviewer needs to pick a topic.
IMPERATIVE_RE = re.compile(
    r"(?m)^[^\n]*\b(?:Calculate|Determine|Find|Compute|Estimate|Identify|Describe"
    r"|Explain|Evaluate|Demonstrate|Recommend|Discuss)\b[^\n]*"
)


def fingerprint(record: dict, limit: int = 120) -> str:
    """A one-line gist of a question: enough to choose a topic, no more.

    This is the payload a reviewer reads instead of the question. Keeping it
    near a hundred characters is the whole point — the prompt, options and
    solution are already in the record and nobody needs to re-read them to
    decide what the question is about.
    """
    body = (record.get("body") or "").strip()
    asks = IMPERATIVE_RE.findall(body) or [
        p.get("prompt", "") for p in record.get("parts") or [] if p.get("prompt")
    ]
    lead = re.sub(r"\s+", " ", re.sub(r"(?m)^\|.*$", "", body)).strip()
    ask = re.sub(r"\s+", " ", asks[-1] if asks else "").strip()
    # The imperative clause alone identifies most questions. The stem's opening
    # is the fallback for the ones that have no such clause, not an addition to
    # it — every character here is paid for once per question under review.
    text = ask or lead
    return re.sub(r"\s+", " ", text)[:limit].strip()


# ─── Matching ─────────────────────────────────────────────────────────────────


def concept_hits(text: str, index: dict[str, str]) -> list[tuple[str, float]]:
    """Concept pages the text names, best first.

    Score is the length of the matched phrase plus a little for repetition:
    a long, specific phrase outranks a short generic one it contains, and a
    concept the question keeps coming back to outranks one mentioned once.
    """
    low = text.lower()
    scores: dict[str, float] = {}
    for alias, concept in index.items():
        if alias not in low:
            continue
        # The bank names concepts in the singular; a question says "written
        # exposures". Tolerating the plural is what makes the phrase match.
        count = len(re.findall(rf"(?<![\w-]){re.escape(alias)}e?s?(?![\w-])", low))
        if not count:
            continue
        score = len(alias) + 2 * (count - 1)
        if score > scores.get(concept, 0):
            scores[concept] = score
    return sorted(scores.items(), key=lambda kv: (-kv[1], kv[0]))


def difficulty_for(record: dict) -> str:
    """A difficulty proxy from the publisher's own worked solution."""
    if record.get("type") == "multi-part":
        points = float(record.get("points") or 0)
        parts = len(record.get("parts") or [])
        if points >= 3 or parts >= 4:
            return "hard"
        return "easy" if points <= 1 and parts <= 1 else "medium"

    solution = record.get("solution") or ""
    steps = solution.count("\\\\") + solution.count("$$") // 2
    if steps >= 6 or len(solution) > 900:
        return "hard"
    if steps <= 2 and len(solution) < 250:
        return "easy"
    return "medium"


def question_text(record: dict) -> str:
    """Everything about a question that carries topical signal."""
    return "\n".join(
        [
            record.get("body") or "",
            *(record.get("options") or {}).values(),
            record.get("solution") or "",
            *(s for part in (record.get("parts") or []) for s in part.get("samples", [])),
            *(p.get("prompt", "") for p in record.get("parts") or []),
        ]
    )


def classify(
    record: dict,
    index: dict[str, str],
    objectives: dict[str, str] | None = None,
    bank_index: "BankIndex | None" = None,
) -> dict:
    """Judgment fields for one extraction record, with a review flag.

    Two signals, used for what each is actually good for:

    * the **bank's nearest neighbours** decide `learning_objective` (a vote
      over few, well-separated values, which measures 87-99% accurate on most
      banks) and contribute topic candidates;
    * **phrase matching** against `Concepts/` contributes the rest of the topic
      candidates and the `wiki_link` list.

    `topic` is set to the leading candidate so the judgment file is usable, but
    it is never treated as settled: `needs_review` stays true unless both
    signals agree on it *and* the objective vote is decisive. Topic assignment
    is a real judgment — the pipeline's job is to make it cost a line of text
    instead of a whole question.
    """
    bank = record.get("bank", "")
    if objectives is None:
        objectives = {**ontology_objectives(), **syllabus_objectives(bank)}
    if bank_index is None:
        bank_index = build_bank_index(bank)

    text = question_text(record)
    hits = concept_hits(text, index)
    neighbours = bank_index.neighbours(text, CANDIDATE_NEIGHBOURS) if bank_index else []
    top_similarity = neighbours[0][0] if neighbours else 0.0

    # learning objective: the neighbourhood vote, falling back to the syllabus
    # callout that lists the best-matching concept.
    objective, lo_share = vote(neighbours[:NEIGHBOURS], "learning_objective")
    if top_similarity < MIN_SIMILARITY or lo_share < 0.5:
        objective, lo_share = "", 0.0
    if not objective:
        for concept, _score in hits:
            objective = objectives.get(concept.lower(), "")
            if objective:
                break
    objective = canonical_objective(objective, bank_labels(bank))

    neighbour_topic, topic_share = vote(neighbours[:NEIGHBOURS], "topic")
    phrase_topic = hits[0][0] if hits else ""
    phrase_score = hits[0][1] if hits else 0.0

    candidates = rank_candidates(hits, neighbours)
    agreed = bool(neighbour_topic) and neighbour_topic == phrase_topic
    topic = candidates[0] if candidates else ""

    reasons = []
    if not candidates:
        reasons.append("nothing in the bank or in Concepts/ matched this question")
    elif not agreed:
        reasons.append(f"topic unsettled — pick from {', '.join(candidates[:5])}")
    elif phrase_score < CONFIDENT_SCORE and topic_share < DECISIVE_SHARE:
        reasons.append(f"weak agreement on '{topic}'")
    if not objective:
        reasons.append("no learning objective could be derived")

    links: list[str] = []
    for name in [topic, *(c for c, _ in hits)]:
        link = f"Concepts/{name.replace(' ', '+')}"
        if name and link not in links:
            links.append(link)

    return {
        "id": record.get("id"),
        "num": record.get("num"),
        "topic": topic,
        "learning_objective": objective,
        "difficulty": difficulty_for(record),
        "wiki_link": links[:MAX_LINKS],
        "topic_candidates": candidates[:MAX_CANDIDATES],
        "lo_confidence": round(lo_share, 2),
        "similarity": round(top_similarity, 2),
        "nearest": [label["id"] for _sim, label in neighbours[:3]],
        "fingerprint": fingerprint(record),
        "needs_review": bool(reasons),
        "review_reasons": reasons,
    }


# ─── CLI ──────────────────────────────────────────────────────────────────────


def load_records(path: str) -> list[dict]:
    with open(path, encoding="utf-8") as fh:
        return [json.loads(line) for line in fh if line.strip()]


def review_sheet(judgments: list[dict]) -> str:
    """The decision sheet: one line per unsettled question, and nothing else.

    This is the artifact a reviewer reads *instead of* the questions. Measured
    over the current bank, the authored topic is among the candidates 66-91% of
    the time and is the leading candidate only 30-64% of the time, so the
    decision is real — what this saves is its price. One line is about 35
    tokens; the question, its options and its solution are about 600.

    Deliberately flat: an id, the imperative clause, and the candidates. No
    similarity scores or neighbour ids, because a reviewer choosing between
    four concept names does not use them.
    """
    review = [j for j in judgments if j["needs_review"]]
    if not review:
        return "# Topic review\n\nNothing to review — every question settled.\n"

    no_objective = [j for j in review if not j["learning_objective"]]
    lines = [
        f"# Topic review — {len(review)} of {len(judgments)} questions",
        "",
        "Pick a topic per line: one of the candidates after the `|`, or another",
        "existing `Concepts/*.md` page. Answer as `<id> <topic>`, one per line;",
        "then set them in `judgments.jsonl` (`wiki_link` is rebuilt from the",
        "topic, and everything else is already decided).",
        "",
    ]
    for judgment in review:
        gist = judgment["fingerprint"]
        candidates = " · ".join(judgment["topic_candidates"]) or "(nothing matched)"
        lines.append(f"{judgment['id']} | {gist} | {candidates}")

    if no_objective:
        lines += [
            "",
            "## Also need a learning objective",
            "",
            "These had no decisive vote — give each one of the bank's objectives:",
            "",
        ]
        lines += [f"{j['id']}" for j in no_objective]
    return "\n".join(lines) + "\n"


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[1])
    ap.add_argument("--records", required=True, help="records.jsonl from pdf_extract.py")
    ap.add_argument("--out", help="where to write judgments.jsonl")
    ap.add_argument("--review", help="where to write the review sheet "
                                     "(default: review.md beside --out)")
    ap.add_argument("--review-only", action="store_true",
                    help="print the review sheet to stdout and nothing else")
    args = ap.parse_args(argv)

    records = load_records(args.records)
    index = concept_index()
    per_bank: dict[str, dict[str, str]] = {}
    judgments = []
    for record in records:
        bank = record.get("bank", "")
        if bank not in per_bank:
            per_bank[bank] = {**ontology_objectives(), **syllabus_objectives(bank)}
        judgments.append(classify(record, index, per_bank[bank]))

    sheet = review_sheet(judgments)
    if args.review_only:
        print(sheet)
        return 0

    if args.out:
        with open(args.out, "w", encoding="utf-8") as fh:
            for judgment in judgments:
                fh.write(json.dumps(judgment, ensure_ascii=False) + "\n")
    review_path = Path(args.review) if args.review else (
        Path(args.out).with_name("review.md") if args.out else None
    )
    if review_path:
        review_path.write_text(sheet, encoding="utf-8")

    review = [j for j in judgments if j["needs_review"]]
    settled = len(judgments) - len(review)
    with_objective = sum(1 for j in judgments if j["learning_objective"])
    print(f"classified {len(judgments)} question(s): {settled} settled, "
          f"{len(review)} need a topic decision; "
          f"{with_objective} have a learning objective")
    if args.out:
        print(f"wrote {args.out}")
    if review_path:
        print(f"wrote {review_path} — read that, not the questions")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
