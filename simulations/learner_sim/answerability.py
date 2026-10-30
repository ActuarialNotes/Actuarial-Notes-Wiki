"""Answerability: can a question be answered from the pages the vault gives for it?

The simulated learner showed that a model playing a student mostly measures what
the model already knows. Where it found real gaps, it found them by comparing an
official solution with the page the student read. This module does that
comparison directly, for every question an exam serves, with no student in the
loop.

Two isolated model calls per question, and a check in code between them:

1. **Requirements.** The question and its official solution, and no study page,
   go to a model that lists the knowledge the solution uses: definitions,
   formulas, procedure steps, facts. It never sees the pages, so it can't shape
   the list to what they happen to say.
2. **Location.** The requirements and the candidate pages (the concepts the
   question is tagged with, the pages they link to, and the pages a search for
   each requirement turns up) go to a second call, which must copy the passage
   that teaches each one, character for character.
3. **Verification, in code.** A quote counts only if it is on the page it names
   (or, misattributed, on another candidate page). A model saying "the page
   covers this" is not evidence; a quote that is there is. Same rule as VERIFY's
   P1: a claim stands on a citable source or not at all.

Each requirement ends as `tagged` (taught on a page the question is tagged
with), `linked` (one link away), `elsewhere` (in the vault, but neither tagged
nor linked — a tagging or linking gap), or `missing` (no page teaches it). A
quote inside a collapsed callout is marked `collapsed`: a skimming reader never
sees it. A requirement taught on a page of an exam this one assumes (its
*Prerequisite knowledge* callout: MAS-II's names MAS-I) is `prerequisite`, and
counts as in reach. Results are written per question to `results.jsonl`, so a
run can be continued, and rolled up into a markdown report ranked by how many
questions each gap costs; the CLI also merges them into the bank's committed
record, `simulations/answerability/<bank>.json`, which the publication gate G8
re-reads against the vault in CI (`scripts/answerability_lib.py`).

It reads solutions, so it is trusted code like the grader and the
diagnostician. It never edits the vault.
"""

from __future__ import annotations

import difflib
import json
import os
import re
import threading
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor
from dataclasses import dataclass, field
from typing import Callable

from answerability_lib import MIN_QUOTE_CHARS, PageIndex, Pages, input_hash  # noqa: F401  (re-exported)
from vault_links import iter_links

from .backends import OneShot, Usage, extract_json
from .content_loader import ContentLoader, scrub
from .exams import ExamSpec
from .grader import Grader
from .textmatch import tokens
from .vault_parse import RawQuestion, split_frontmatter

STATUSES = ("tagged", "linked", "syllabus", "prerequisite", "elsewhere", "missing")
KINDS = ("definition", "formula", "procedure", "fact")
MAX_LINKED_PAGES = 8          # one-link-away pages shown to the locator, most relevant first
SEARCH_HITS = 2               # vault pages a search for each requirement adds
PAGE_CHAR_BUDGET = 120_000    # all candidate pages together

REQUIREMENTS_SYSTEM = """You audit an actuarial study wiki. You get one exam question and its official \
solution. List the knowledge a student must bring to the exam to produce that solution — what they would have \
had to learn beforehand:
- definition: what a term means
- formula: a formula or estimator the solution applies
- procedure: a step of a method that is not plain arithmetic (e.g. "scale the per-exposure estimate by next \
period's exposure")
- fact: a rule, property or result the solution relies on (e.g. "a larger VHM raises Z")
Leave out: data the question gives; arithmetic, algebra and calculus manipulation (a substitution, solving an \
equation, iterating a recursion); how to pick among the options (e.g. choosing "none of the above" when no option \
fits) — that is test-taking, not course content. Leave out, too, the plan of this particular solution: which \
unknown it solves for first, what it substitutes where, the order of its steps, when each step only applies \
knowledge already on your list; reading the question's own wording ("at least", "exactly", "no more than"); and \
counting the question's own setup (two dice give 36 outcomes). List what a study page on the concept would \
teach, not the moves of this solution. Write \
each item in general form, without the question's numbers, as one sentence a study page could contain. Give \
the concept it belongs to — the most basic concept page that would define it, titled as such a page would be \
(e.g. "Uniform Distribution", not "uniform prior") — and 3-6 search words. Split \
compound items; merge duplicates. Usually 2-8 items. Reply with ONE JSON object and nothing else:
{"requirements": [{"id": "r1", "kind": "definition|formula|procedure|fact", "statement": "...", \
"concept": "...", "search": ["...", "..."]}]}"""

LOCATE_SYSTEM = """You check whether an actuarial study wiki teaches what a question needs. You get the full \
text of some study pages, then a question and a list of requirements. For each requirement, find the passages that teach it and \
copy each EXACTLY, character for character from the page text (LaTeX included): the shortest complete \
sentence, formula or table row that does the teaching, at most about 300 characters. Give up to three places \
for an item, on different pages, earliest-listed page first. It teaches the item only if a student who had not \
met the item could learn it from the passage: a mention of the concept's name, a link, or a learning-objective \
line is not teaching. The same formula in different notation counts. Use "…" to join two short pieces of one \
passage when the teaching is split by an aside. If no page teaches it, give an empty list. Never paraphrase; \
never invent a quote. Reply with ONE JSON object and nothing else:
{"found": [{"id": "r1", "places": [{"page": "<page title exactly as given>", "quote": "<exact text>"}]}, \
{"id": "r2", "places": []}]}"""


RECHECK_NOTE = ("A first reading found no passage for the requirements below. Read every page again, worked "
                "examples and tables included, before concluding that none teaches them.\n\n")
# The same, as a follow-up turn of the conversation whose first turn held the pages: they aren't sent again.
RECHECK_FOLLOW_UP = ("A first reading found no passage for the requirements below. Read every page above again, "
                     "worked examples and tables included, before concluding that none teaches them. Reply in the "
                     "same JSON shape, for these requirements only.\n\nREQUIREMENTS:\n")


# ── matching a quote against a page ────────────────────────────────────────
# `PageIndex` lives in scripts/answerability_lib.py, so the CI gate (G8) re-reads a quote exactly as the check
# accepted it.


# ── one question ───────────────────────────────────────────────────────────


@dataclass
class Candidates:
    tagged: list[str]          # pages the question's concepts open
    linked: set[str]           # every page one link from a tagged page
    shown: list[str]           # the pages the locator is given, in order
    prerequisite: set[str] = field(default_factory=set)   # pages of the exams this exam assumes
    syllabus: set[str] = field(default_factory=set)       # pages this exam's own learning objectives link


_PREREQUISITES: dict[tuple[str, str], set[str]] = {}
_SYLLABUS: dict[tuple[str, str], set[str]] = {}


def prerequisites(loader: ContentLoader) -> set[str]:
    """The pages the exam's *Prerequisite knowledge* callout puts in reach (`Pages.prerequisite_pages`)."""
    key = (loader.root, loader.exam.page)
    if key not in _PREREQUISITES:
        exam = {"page": loader.exam.page, "wiki_id": loader.exam.wiki_id}
        _PREREQUISITES[key] = Pages(exam, loader.root).prerequisite_pages()
    return _PREREQUISITES[key]


def syllabus(loader: ContentLoader) -> set[str]:
    """The concept pages the exam page's own learning objectives link (`Pages.objective_concepts`, D30)."""
    key = (loader.root, loader.exam.page)
    if key not in _SYLLABUS:
        exam = {"page": loader.exam.page, "wiki_id": loader.exam.wiki_id}
        _SYLLABUS[key] = set(Pages(exam, loader.root).objective_concepts(loader.exam.title))
    return _SYLLABUS[key]


def _question_text(q: RawQuestion) -> str:
    out = [scrub(q.stem)]
    for p in q.parts:
        out.append(f"Part {p.label} ({p.points:g} points): {scrub(p.stem)}")
    return "\n\n".join(out).strip()


def _clip(text: str, n: int) -> str:
    return text if len(text) <= n else text[:n] + " …[cut]"


def _ask_json(one_shot: OneShot, system: str, prompt: str, key: str) -> list[dict]:
    for _ in range(2):
        try:
            obj = extract_json(one_shot(system, prompt))
        except ValueError:
            continue
        items = obj.get(key)
        if isinstance(items, list):
            return [x for x in items if isinstance(x, dict)]
    raise ValueError(f"no usable {key!r} list in the reply")


def requirements_prompt(q: RawQuestion, solution: str) -> str:
    return "\n".join([
        f"QUESTION ({q.exam}, {q.difficulty or 'unrated'}, {q.points:g} points):",
        _clip(_question_text(q), 6000),
        "",
        "OFFICIAL SOLUTION:",
        _clip(solution, 8000),
    ])


def clean_requirements(items: list[dict]) -> list[dict]:
    out = []
    for i, r in enumerate(items, 1):
        statement = str(r.get("statement") or "").strip()
        if not statement:
            continue
        kind = str(r.get("kind") or "").strip().lower()
        search = r.get("search") if isinstance(r.get("search"), list) else []
        out.append({"id": f"r{len(out) + 1}", "kind": kind if kind in KINDS else "fact",
                    "statement": statement[:500], "concept": str(r.get("concept") or "").strip()[:120],
                    "search": [str(s)[:60] for s in search][:8]})
    return out


def candidate_pages(q: RawQuestion, reqs: list[dict], loader: ContentLoader) -> Candidates:
    """Tagged pages, then search hits for each requirement, then the most relevant linked pages —
    the exam page itself is never a candidate (an objective line names a concept, it doesn't teach it)."""
    exam_page = loader.exam.title
    tagged: list[str] = []
    for c in q.concepts:
        t = loader.resolve_title(c)
        if t and t != exam_page and t not in tagged:
            tagged.append(t)
    linked: set[str] = set()
    for t in tagged:
        for link in iter_links(scrub(loader.source(t))):
            st = loader.link_status(link.target)
            if st.resolved and st.resolved != exam_page and st.resolved not in tagged:
                linked.add(st.resolved)
    searched: list[str] = []
    for r in reqs:
        query = " ".join([r["concept"], *r["search"]]).strip() or r["statement"]
        hits = [t for t, _ in loader.search(query, k=SEARCH_HITS + 4)
                if loader.pages[t][1] != "exam" and t not in tagged]
        for title in hits[:SEARCH_HITS]:
            if title not in searched:
                searched.append(title)
        home = loader.resolve_title(r["concept"]) if r["concept"] else None
        if home and home != exam_page and home not in tagged and home not in searched:
            searched.append(home)
    want = set(tokens(" ".join(r["statement"] + " " + " ".join(r["search"]) for r in reqs)))

    def overlap(title: str) -> int:
        return len(want & set(tokens(scrub(loader.source(title)))))

    near = sorted((t for t in linked if t not in searched), key=lambda t: (-overlap(t), t))[:MAX_LINKED_PAGES]
    shown, budget = [], PAGE_CHAR_BUDGET
    for t in tagged + searched + near:
        n = len(loader.source(t))
        if t in shown or (shown and n > budget):
            continue
        shown.append(t)
        budget -= n
    return Candidates(tagged, linked, shown, prerequisites(loader), syllabus(loader))


def requirement_lines(reqs: list[dict]) -> list[str]:
    return [f"- {r['id']} ({r['kind']}): {r['statement']}" for r in reqs]


def locate_prompt(q: RawQuestion, reqs: list[dict], pages: list[str], loader: ContentLoader, note: str = "") -> str:
    """The pages first, then the question and its requirements: questions shown the same pages, and a second
    look at the same question, share the prompt's long, cacheable opening."""
    out: list[str] = []
    for t in pages:
        _, body = split_frontmatter(loader.source(t))
        out += [f"=== PAGE: {t} ===", body.strip(), ""]
    out += ["=== END OF PAGES ===", ""]
    if note:
        out += [note.strip(), ""]
    out += ["QUESTION (for context only — do not quote it):", _clip(_question_text(q), 2000), "", "REQUIREMENTS:"]
    out += requirement_lines(reqs)
    return "\n".join(out)


def _places(f: dict) -> list[tuple[str | None, str]]:
    places = f.get("places") if isinstance(f.get("places"), list) else [f]
    out = []
    for p in places[:8]:
        if isinstance(p, dict) and isinstance(p.get("quote"), str) and p["quote"].strip():
            out.append((p.get("page") if isinstance(p.get("page"), str) else None, p["quote"]))
    return out


def merge_found(*passes: list[dict]) -> list[dict]:
    """Several locator replies as one: every place any pass gave, per requirement."""
    merged: dict[str, list] = {}
    for found in passes:
        for f in found:
            merged.setdefault(str(f.get("id")), []).extend(
                {"page": p, "quote": q} for p, q in _places(f))
    return [{"id": k, "places": v} for k, v in merged.items()]


def verify_locations(reqs: list[dict], found: list[dict], cands: Candidates, indexes: dict[str, PageIndex]) -> list[dict]:
    """Each requirement with its status, checked in code. A quote counts only where it is really on a shown
    page; of the places that check out, the nearest tier wins (tagged, then linked, then the exam's own syllabus,
    then a prerequisite exam's
    page, then elsewhere), and the item is `collapsed` only if every verified place sits in a folded callout.
    Every verified place keeps its quote: the record G8 re-reads is built from them."""
    rank = {"tagged": 0, "linked": 1, "syllabus": 2, "prerequisite": 3, "elsewhere": 4}

    def tier(page: str) -> str:
        if page in cands.tagged:
            return "tagged"
        if page in cands.linked:
            return "linked"
        if page in cands.syllabus:
            return "syllabus"
        return "prerequisite" if page in cands.prerequisite else "elsewhere"

    by_id = {str(f.get("id")): f for f in found}
    out = []
    for r in reqs:
        verified, unverified = [], []
        for claimed, quote in _places(by_id.get(r["id"]) or {}):
            order = ([claimed] if claimed in indexes else []) + [t for t in cands.shown if t != claimed]
            hit = next(((t, hid) for t in order for ok, hid in [indexes[t].find(quote)] if ok), None)
            if hit:
                verified.append((hit[0], hit[1], quote))
            else:
                unverified.append(quote)
        if verified:
            verified.sort(key=lambda v: (rank[tier(v[0])], v[1]))
            page, _, quote = verified[0]
            status = tier(page)
            hidden = all(v[1] for v in verified)
        else:
            page, quote, status, hidden = None, None, "missing", False
        out.append({**r, "status": status, "page": page, "quote": quote,
                    "claimed_quote": unverified[0] if (unverified and not verified) else None,
                    "collapsed": hidden, "places": [{"page": v[0], "collapsed": v[1], "quote": v[2]} for v in verified]})
    return out


def verdict(reqs: list[dict]) -> str:
    statuses = {r["status"] for r in reqs}
    if not reqs:
        return "no requirements"
    if "missing" in statuses:
        return "gap"
    if "elsewhere" in statuses:
        return "untagged"
    return "answerable"


def check_question(q: RawQuestion, loader: ContentLoader, solution: str,
                   one_shot_factory: Callable[[], OneShot],
                   locate_factory: Callable[[], OneShot] | None = None,
                   recheck_factory: Callable[[], OneShot] | None = None) -> dict:
    """One question. `one_shot_factory` makes the requirements call, `locate_factory` the locator (default: the
    same) and `recheck_factory` the second look at items with nothing found (default: the locator again). A
    locator that `continues` its conversation takes the second look as a follow-up turn, with the pages already
    in its context, instead of being sent them again."""
    extract, locate = one_shot_factory(), (locate_factory or one_shot_factory)()
    recheck = recheck_factory() if recheck_factory else locate
    record = {"source_id": q.source_id, "path": q.path, "type": q.type, "difficulty": q.difficulty,
              "objective": q.objective, "concepts": list(q.concepts)}
    path = os.path.join(loader.root, q.path)
    if q.path and os.path.exists(path):
        with open(path, encoding="utf-8") as fh:
            record["input_hash"] = input_hash(fh.read())
    try:
        reqs = clean_requirements(_ask_json(extract, REQUIREMENTS_SYSTEM, requirements_prompt(q, solution),
                                            "requirements"))
        cands = candidate_pages(q, reqs, loader)
        found = _ask_json(locate, LOCATE_SYSTEM, locate_prompt(q, reqs, cands.shown, loader), "found") if reqs else []
        indexes = {t: PageIndex.build(loader.source(t)) for t in cands.shown}
        checked = verify_locations(reqs, found, cands, indexes)
        # The locator misses passages it finds on another run; a missing item is the costly error (it becomes
        # backlog), so items with nothing verified get one more, targeted look before they are called missing.
        missing = [r for r in reqs if next(c for c in checked if c["id"] == r["id"])["status"] == "missing"]
        if missing:
            if recheck is locate and getattr(locate, "continues", False):
                prompt = RECHECK_FOLLOW_UP + "\n".join(requirement_lines(missing))
            else:
                prompt = locate_prompt(q, missing, cands.shown, loader, note=RECHECK_NOTE)
            again = _ask_json(recheck, LOCATE_SYSTEM, prompt, "found")
            checked = verify_locations(reqs, merge_found(found, again), cands, indexes)
        record.update(tagged_pages=cands.tagged, pages_shown=cands.shown, requirements=checked,
                      verdict=verdict(checked))
    except Exception as e:  # one question's failure is recorded, not fatal to the run
        record.update(verdict="error", error=f"{type(e).__name__}: {e}")
    agents = [extract, locate] + ([recheck] if recheck is not locate else [])
    for agent in agents:
        if hasattr(agent, "close"):
            agent.close()
    usage = Usage()
    for agent in agents:
        if getattr(agent, "usage", None):
            usage.add(agent.usage)
    record["cost_usd"] = round(usage.cost_usd, 5)
    return record


# ── a run ──────────────────────────────────────────────────────────────────


def served_questions(bank: dict[str, RawQuestion]) -> tuple[dict[str, RawQuestion], dict[str, str]]:
    """What a quiz can draw: not off-syllabus, no open critical finding. Questions with a figure stay in —
    the figure is data; the method a solution applies is what the pages must teach."""
    keep, left_out = {}, {}
    for sid, q in bank.items():
        if q.off_syllabus:
            left_out[sid] = "off syllabus"
        elif q.open_critical:
            left_out[sid] = "open critical fact-check finding"
        elif not (q.explanation or q.examiner_report or q.answer_text or any(
                p.explanation or p.examiner_report or p.answer_text for p in q.parts)):
            left_out[sid] = "no solution to check against"
        else:
            keep[sid] = q
    return keep, left_out


def read_results(path: str) -> dict[str, dict]:
    out: dict[str, dict] = {}
    if os.path.exists(path):
        with open(path, encoding="utf-8") as fh:
            for line in fh:
                line = line.strip()
                if line:
                    rec = json.loads(line)
                    out[rec["source_id"]] = rec
    return out


def warm(loader: ContentLoader) -> None:
    """Fill the loader's caches before threads share it: its page cache and search index are built lazily,
    and two threads filling one dict at once break each other."""
    for title in loader.pages:
        loader.source(title)
    loader.search("credibility")


# A usage or rate limit fails every call that follows it at no cost, so a run that kept going would race
# through its whole list marking each question an error. It stops at the first one instead.
USAGE_LIMIT = re.compile(r"hit your (?:\w+ )?limit|(?:session|usage|rate) limit|rate_limit|overloaded", re.I)


def run_check(exam: ExamSpec, loader: ContentLoader, bank: dict[str, RawQuestion], out_dir: str,
              one_shot_factory: Callable[[], OneShot], ids: list[str] | None = None, limit: int | None = None,
              locate_factory: Callable[[], OneShot] | None = None, recheck_factory: Callable[[], OneShot] | None = None,
              parallel: int = 1, max_cost: float | None = None, retry_errors: bool = True,
              progress: Callable[[str], None] = print) -> dict[str, dict]:
    os.makedirs(out_dir, exist_ok=True)
    path = os.path.join(out_dir, "results.jsonl")
    done = read_results(path)
    served, _ = served_questions(bank)
    todo = [sid for sid in sorted(served) if not ids or sid in ids]
    todo = [sid for sid in todo if sid not in done or (retry_errors and done[sid].get("verdict") == "error")]
    if limit is not None:
        todo = todo[:limit]
    solution_of = Grader(bank).solution_text
    warm(loader)
    lock = threading.Lock()
    spent = [sum(r.get("cost_usd") or 0 for r in done.values())]
    progress(f"{exam.title}: {len(served)} served questions, {len(done)} already checked, {len(todo)} to check")

    limited: list[str] = []

    def one(sid: str) -> None:
        if limited or (max_cost is not None and spent[0] >= max_cost):
            return
        rec = check_question(served[sid], loader, solution_of(served[sid]), one_shot_factory,
                             locate_factory, recheck_factory)
        with lock:
            if rec.get("verdict") == "error" and USAGE_LIMIT.search(rec.get("error") or ""):
                if not limited:
                    progress(f"  stopped at {sid}: {rec['error']} — continue the run with --run-id once it resets")
                limited.append(sid)
                return
            spent[0] += rec.get("cost_usd") or 0
            done[sid] = rec
            with open(path, "a", encoding="utf-8") as fh:
                fh.write(json.dumps(rec, ensure_ascii=False) + "\n")
            progress(f"  {sid}: {rec['verdict']}  (${spent[0]:.2f} so far)")

    with ThreadPoolExecutor(max_workers=max(1, parallel)) as pool:
        list(pool.map(one, todo))
    return {sid: done[sid] for sid in served if sid in done}


# ── the report ─────────────────────────────────────────────────────────────


def _pct(n: int, d: int) -> str:
    return f"{100 * n / d:.0f}%" if d else "—"


def _cell(text: str, n: int = 160) -> str:
    text = re.sub(r"\s+", " ", str(text or "")).replace("|", "\\|")
    return text if len(text) <= n else text[: n - 1] + "…"


def home_page(concept: str, tagged: list[str], loader: ContentLoader) -> str | None:
    """The page a missing item belongs on. The extractor names concepts freely ("Linear Mixed Models",
    "Linear Mixed Model Fixed Effects"), so: the name as a page, its singular, a near-identical page title,
    then the question's tagged page sharing most words with it — or None for a concept the vault has no
    page for."""
    name = re.sub(r"\s*\([^)]*\)", "", concept or "").strip()
    if not name:
        return tagged[0] if tagged else None
    for cand in (name, re.sub(r"s$", "", name), re.sub(r"(\w)s\b", r"\1", name)):
        t = loader.resolve_title(cand)
        if t and loader.pages[t][1] != "exam":
            return t
    titles = [t for t, (_, kind) in loader.pages.items() if kind == "concept"]
    close = difflib.get_close_matches(name, titles, n=1, cutoff=0.88)
    if close:
        return close[0]
    words = set(tokens(re.sub(r"(\w)s\b", r"\1", name)))
    best = max(tagged, key=lambda t: (len(words & set(tokens(t))), -tagged.index(t)), default=None)
    if best and len(words & set(tokens(best))) >= max(1, min(2, len(set(tokens(best))))):
        return best
    return None


def summarize(results: dict[str, dict], loader: ContentLoader) -> dict:
    checked = [r for r in results.values() if r.get("verdict") not in ("error", None)]
    verdicts = defaultdict(int)
    for r in results.values():
        verdicts[r.get("verdict")] += 1
    statuses = defaultdict(int)
    gaps: dict[str, dict] = {}          # home page (or concept with no page) → what it lacks
    untagged: dict[str, dict] = {}      # question → pages that teach what it needs but aren't tagged or linked
    buried: dict[str, dict] = {}        # page → requirements taught only in a collapsed callout
    for r in checked:
        for req in r.get("requirements") or []:
            statuses[req["status"]] += 1
            if req["status"] == "missing":
                home = home_page(req.get("concept") or "", r.get("tagged_pages") or [], loader)
                key = home or f"(no page) {req.get('concept') or 'unnamed'}"
                g = gaps.setdefault(key, {"page": home, "concept": req.get("concept"), "questions": set(), "items": []})
                g["questions"].add(r["source_id"])
                g["items"].append((r["source_id"], req))
            elif req["status"] == "elsewhere":
                u = untagged.setdefault(r["source_id"], {"path": r["path"], "pages": set()})
                u["pages"].add(req["page"])
            if req["page"] and req.get("collapsed"):
                b = buried.setdefault(req["page"], {"questions": set(), "items": []})
                b["questions"].add(r["source_id"])
                b["items"].append((r["source_id"], req))
    return {"checked": len(checked), "total": len(results), "verdicts": dict(verdicts), "statuses": dict(statuses),
            "gaps": gaps, "untagged": untagged, "buried": buried,
            "cost_usd": round(sum(r.get("cost_usd") or 0 for r in results.values()), 4)}


def report(exam: ExamSpec, results: dict[str, dict], loader: ContentLoader, run_id: str,
           left_out: dict[str, str] | None = None, sittings: dict[str, str | None] | None = None) -> str:
    s = summarize(results, loader)
    n = s["checked"]
    v = s["verdicts"]
    out = [f"# Answerability: {exam.title}", "",
           f"Run `{run_id}` · {n} questions checked of {s['total']} attempted · cost ${s['cost_usd']:.2f}", "",
           "Each question's official solution was broken into the knowledge it uses (by a model that saw no "
           "study page), and each item was looked for on the pages the vault gives for the question. An item "
           "counts as taught only if a quote of the teaching passage is really on the page; the check is done "
           "in code. *Answerable* is necessary, not sufficient: a page can hold the formula and still not "
           "teach it well.", "",
           "| Verdict | Questions | Share |", "|---|---|---|",
           f"| **Answerable** — everything taught on a tagged page, one link away, on the exam's syllabus or on a prerequisite exam's page | {v.get('answerable', 0)} | "
           f"{_pct(v.get('answerable', 0), n)} |",
           f"| **Untagged** — everything is in the vault, but some of it on a page neither tagged nor linked | "
           f"{v.get('untagged', 0)} | {_pct(v.get('untagged', 0), n)} |",
           f"| **Gap** — something the solution uses is taught on no page | {v.get('gap', 0)} | "
           f"{_pct(v.get('gap', 0), n)} |"]
    if v.get("error"):
        out.append(f"| Error — the check itself failed (re-run to retry) | {v['error']} | |")
    if v.get("no requirements"):
        out.append(f"| No requirements listed | {v['no requirements']} | |")
    st = s["statuses"]
    total_req = sum(st.values())
    out += ["", f"Requirements: {total_req} — " + ", ".join(f"{k} {st.get(k, 0)} ({_pct(st.get(k, 0), total_req)})"
                                                            for k in STATUSES)]
    if left_out:
        reasons = defaultdict(int)
        for why in left_out.values():
            reasons[why] += 1
        out.append("Not checked: " + ", ".join(f"{c} {w}" for w, c in sorted(reasons.items())) + ".")

    if sittings:
        rows: dict[str, dict[str, int]] = defaultdict(lambda: defaultdict(int))
        for sid, r in results.items():
            rows[sittings.get(sid) or "Undated (samples and the vault's own)"][r.get("verdict")] += 1
        out += ["", "## By sitting", "",
                "A paper whose gaps far outrun the rest may test a reading the syllabus has since dropped.", "",
                "| Sitting | Questions | Answerable | Untagged | Gap |", "|---|---|---|---|---|"]
        for sit, c in sorted(rows.items(), key=lambda kv: kv[0]):
            tot = sum(c.values())
            out.append(f"| {sit} | {tot} | {c.get('answerable', 0)} | {c.get('untagged', 0)} | "
                       f"{c.get('gap', 0)} ({_pct(c.get('gap', 0), tot)}) |")

    out += ["", "## Gaps, by the page that should teach them", "",
            "Ranked by how many questions each page's gaps cost. The page is the one named for the item's concept; "
            "\"no page\" means the vault has no page by that name.", ""]
    if not s["gaps"]:
        out.append("No gaps found.")
    for key, g in sorted(s["gaps"].items(), key=lambda kv: (-len(kv[1]["questions"]), kv[0])):
        where = f"`Concepts/{g['page']}.md`" if g["page"] and loader.pages.get(g["page"], ("", ""))[1] == "concept" \
            else (f"**{g['page']}**" if g["page"] else f"**no page for {g['concept']}**")
        out += [f"### {where} — {len(g['questions'])} question(s)", ""]
        for sid, req in g["items"]:
            line = f"- `{sid}` ({req['kind']}): {_cell(req['statement'], 300)}"
            if req.get("claimed_quote"):
                line += f" — *the locator quoted text that isn't on the page:* “{_cell(req['claimed_quote'], 120)}”"
            out.append(line)
        out.append("")

    out += ["## Tagging and linking gaps", "",
            "The vault teaches what these questions need, but on a page the question isn't tagged with and its "
            "tagged pages don't link to. Adding the page to the question's `wiki_link` (or linking it from the "
            "tagged page) puts it in reach.", ""]
    if not s["untagged"]:
        out.append("None.")
    else:
        out += ["| Question | Pages that teach what it needs |", "|---|---|"]
        for sid, u in sorted(s["untagged"].items()):
            out.append(f"| `{sid}` | {', '.join(sorted(u['pages']))} |")
    out += ["", "## Taught only in a collapsed section", "",
            "The passage that teaches these items sits inside a folded callout (a worked example, a table "
            "behind a toggle). A reader who skims never opens it.", ""]
    if not s["buried"]:
        out.append("None.")
    else:
        out += ["| Page | Questions | Items |", "|---|---|---|"]
        for page, b in sorted(s["buried"].items(), key=lambda kv: (-len(kv[1]["questions"]), kv[0])):
            items = "; ".join(_cell(req["statement"], 80) for _, req in b["items"][:3])
            out.append(f"| {page} | {len(b['questions'])} | {items} |")

    out += ["", "## Every question", ""]
    for sid, r in sorted(results.items()):
        head = f"<details><summary><code>{sid}</code> · {r.get('verdict')}</summary>"
        out += [head, ""]
        if r.get("error"):
            out += [f"Error: {_cell(r['error'], 300)}", "", "</details>", ""]
            continue
        out.append(f"Tagged pages: {', '.join(r.get('tagged_pages') or []) or 'none'}")
        out.append("")
        out += ["| Item | Kind | Status | Where |", "|---|---|---|---|"]
        for req in r.get("requirements") or []:
            where = req["page"] or ""
            if req.get("collapsed"):
                where += " (collapsed)"
            if req.get("quote"):
                where += f": “{_cell(req['quote'], 100)}”"
            out.append(f"| {_cell(req['statement'], 140)} | {req['kind']} | {req['status']} | {_cell(where, 200)} |")
        out += ["", "</details>", ""]
    out.append("Nothing here edits the vault. A gap is fixed from the syllabus reading, in general form — "
               "never by copying the question's own numbers onto the page — and the edited page is fact checked "
               "again (docs/verification.md).")
    return "\n".join(out) + "\n"
