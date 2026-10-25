"""Turn a run's event log into findings. Trusted code: it reads the answer key
and the official solutions to explain what went wrong, after the run is over.

Everything here is deterministic. The model-written root causes and edit
suggestions are added on top by diagnostician.py.
"""

from __future__ import annotations

import json
import os
import re
from collections import defaultdict

from .auditor import beyond_knowledge, norm_text, unreached_concepts
from .content_loader import ContentLoader
from .vault_parse import RawQuestion

CONTROL_LOG = "control.jsonl"
STUCK_SCORE = 0.5
HIGH_CONF = 70
LOW_CONF = 30


def read_events(path: str) -> list[dict]:
    with open(path, encoding="utf-8") as fh:
        return [json.loads(line) for line in fh if line.strip()]


def _agg(rows: list[tuple[str, float]]) -> list[dict]:
    acc: dict[str, list[float]] = defaultdict(list)
    for key, score in rows:
        acc[key or "(none)"].append(score)
    out = [{"key": k, "n": len(v), "score": round(sum(v) / len(v), 3)} for k, v in acc.items()]
    return sorted(out, key=lambda r: (r["score"], -r["n"], r["key"]))


def _norm(s: str) -> str:
    return re.sub(r"\s+", " ", s.lower().replace("-", " ")).strip()


class _KnownText:
    """What a learner could have met by an attempt, as normalised text for `unreached_concepts`:
    the pages it had opened, its notes, its prior knowledge, and the concepts of
    questions whose solutions it was shown earlier in the same session."""

    def __init__(self, run_dir: str, loader: ContentLoader, profile):
        self.run_dir, self.loader = run_dir, loader
        prior = [profile.description, *profile.mastered]
        for v in profile.prior_knowledge.values():
            prior += [str(x) for x in v] if isinstance(v, list) else [str(v)]
        self.prior = norm_text(" ".join(prior))
        self._pages: dict[str, str] = {}
        self._notes: dict[int, str] = {}
        self.shown: dict[int, set[str]] = defaultdict(set)

    def page(self, title: str) -> str:
        if title not in self._pages:
            try:
                self._pages[title] = norm_text(self.loader.source(title))
            except (KeyError, OSError):
                self._pages[title] = ""
        return self._pages[title]

    def notes(self, session: int) -> str:
        if session not in self._notes:
            # The notes as the session left them: lenient, like the rest of the check.
            path = os.path.join(self.run_dir, "notes", f"session-{session}.md")
            text = ""
            if os.path.exists(path):
                with open(path, encoding="utf-8") as fh:
                    text = fh.read()
            self._notes[session] = norm_text(text)
        return self._notes[session]

    def text(self, session: int, pages: set[str]) -> str:
        return " | ".join([self.prior, self.notes(session), *sorted(self.shown[session]),
                           *(self.page(t) for t in sorted(pages))])


def analyze(run_dir: str, bank: dict[str, RawQuestion], loader: ContentLoader, profile) -> dict:
    events = read_events(os.path.join(run_dir, "events.jsonl"))
    start = next((e for e in events if e["type"] == "run_start"), {})
    end = [e for e in events if e["type"] == "run_end"]
    graded = {(e["session"], e["qid"]): e for e in events if e["type"] == "graded"}
    audits = {(e["session"], e["qid"]): e for e in events if e["type"] == "audit"}
    known = _KnownText(run_dir, loader, profile)
    attempts = []
    for e in events:
        if e["type"] != "attempt":
            continue
        g = graded.get((e["session"], e["qid"]), {})
        q = bank.get(e["source_id"])
        if q is None:
            continue
        au = audits.get((e["session"], e["qid"]), {})
        row = {
            **{k: e.get(k) for k in ("session", "qid", "source_id", "answer", "confidence", "sources",
                                     "pages_before", "pages_during", "minutes", "pressed_to_guess", "repeat",
                                     "seen_in_guide")},
            "verdict": g.get("verdict"), "score": g.get("score", 0.0), "parts": g.get("parts", []),
            "concepts": list(q.concepts), "topic": q.topic, "objective": q.objective,
            "difficulty": q.difficulty, "kind": "multiple-choice" if q.type == "multiple-choice" else "written",
            "path": q.path, "in_character": au.get("in_character", True),
            "audit_flags": (au.get("deterministic") or []) + [v.get("claim", "") for v in au.get("violations") or []],
        }
        pages = set(e.get("pages_ever_at_attempt") or []) | set(e.get("pages_during") or [])
        unreached = unreached_concepts(row["concepts"], pages, known.text(e["session"], pages))
        flag = beyond_knowledge(row, unreached)
        if flag:
            row["audit_flags"].append(flag)
            row["in_character"] = False
        if start.get("feedback") == "solution":
            known.shown[e["session"]] |= {norm_text(c) for c in row["concepts"]}
        attempts.append(row)
    scored = [a for a in attempts if a["verdict"] != "ungraded"]
    control = control_summary(run_dir, scored)

    # score over time
    sessions = sorted({a["session"] for a in attempts} | {e["session"] for e in events if e["type"] == "session_end"})
    by_session = []
    for s in sessions:
        rows = [a["score"] for a in scored if a["session"] == s]
        by_session.append({"session": s, "n": len(rows), "score": round(sum(rows) / len(rows), 3) if rows else None})
    cumulative, run = [], 0.0
    for i, a in enumerate(scored, 1):
        run += a["score"]
        cumulative.append(round(run / i, 3))

    # by tag
    by_concept = _agg([(c, a["score"]) for a in scored for c in (a["concepts"] or ["(untagged)"])])
    by_topic = _agg([(a["topic"], a["score"]) for a in scored])
    by_objective = _agg([(a["objective"], a["score"]) for a in scored])
    by_difficulty = _agg([(a["difficulty"], a["score"]) for a in scored])
    by_kind = _agg([(a["kind"], a["score"]) for a in scored])

    # calibration
    bins = [(0, 20), (20, 40), (40, 60), (60, 80), (80, 101)]
    calibration = []
    for lo, hi in bins:
        rows = [a for a in scored if a["confidence"] is not None and lo <= a["confidence"] < hi]
        if rows:
            calibration.append({"range": f"{lo}–{min(hi, 100)}", "n": len(rows),
                                "confidence": round(sum(a["confidence"] for a in rows) / len(rows), 1),
                                "accuracy": round(100 * sum(a["score"] for a in rows) / len(rows), 1)})

    # pages
    reads = [e for e in events if e["type"] == "page_read"]
    page_time: dict[str, dict] = {}
    for e in reads:
        pt = page_time.setdefault(e["title"], {"title": e["title"], "kind": e["kind"], "reads": 0, "full": 0,
                                               "skim": 0, "forced_skim": 0, "minutes": 0.0, "words": e["words"],
                                               "truncated_derivations": 0})
        pt["reads"] += 1
        pt[e["mode"]] += 1
        pt["forced_skim"] += int(bool(e.get("forced_skim")))
        pt["minutes"] = round(pt["minutes"] + e["minutes"], 2)
        pt["truncated_derivations"] = max(pt["truncated_derivations"], e.get("truncated_derivations", 0))
    broken: dict[str, set] = defaultdict(set)
    case_links: dict[str, set] = defaultdict(set)
    for e in reads:
        for t in e.get("links_missing") or []:
            broken[t].add(e["title"])
        for t in e.get("links_case") or []:
            case_links[t].add(e["title"])
    missing_requests = sorted({e["requested"] for e in events if e["type"] == "page_missing"})

    # stuck concepts
    reach = loader.reachable_from_exam(2)
    mastered = {_norm(m) for m in profile.mastered}
    gaps = [_norm(g) for g in profile.gaps]
    concept_rows: dict[str, list[dict]] = defaultdict(list)
    for a in scored:
        for c in a["concepts"]:
            concept_rows[c].append(a)
    stuck = []
    for c, rows in concept_rows.items():
        mean = sum(r["score"] for r in rows) / len(rows)
        misses = [r for r in rows if r["score"] < STUCK_SCORE]
        if not misses:
            continue
        title = loader.resolve_title(c)
        read_before = [m for m in misses if title and title in (m["pages_before"] or []) + (m["pages_during"] or [])]
        if not (mean < STUCK_SCORE and (len(rows) >= 2 or read_before)):
            continue
        signals = []
        raw = loader.source(title) if title else ""
        if not title:
            signals.append("no concept page exists for this concept")
        else:
            if title not in reach:
                signals.append("the exam page doesn't reach this page within two links")
            if "[!example]" not in raw:
                signals.append("the page has no worked example")
            if not read_before:
                signals.append("the learner never opened this page before missing it")
            elif page_time.get(title, {}).get("full", 0) == 0:
                signals.append("the learner only ever skimmed this page")
            if page_time.get(title, {}).get("truncated_derivations"):
                signals.append("a derivation on the page was longer than this learner follows")
        hit_gaps = [g for g in gaps if g and (g in _norm(c) or _norm(c) in g
                                              or (raw and g in _norm(raw)))]
        if hit_gaps:
            signals.append("touches a gap in the profile: " + ", ".join(hit_gaps))
        stuck.append({
            "concept": c, "page": title, "page_path": loader.pages[title][0] if title else None,
            "n": len(rows), "score": round(mean, 3), "misses": len(misses),
            "attempts": [{"qid": r["qid"], "source_id": r["source_id"], "session": r["session"],
                          "score": r["score"], "confidence": r["confidence"]} for r in rows],
            "pages_before_misses": sorted({p for m in misses for p in (m["pages_before"] or []) + (m["pages_during"] or [])}),
            "signals": signals,
        })
    stuck.sort(key=lambda s: (-s["misses"], s["score"], s["concept"]))

    # question issues
    flags = defaultdict(list)
    for e in events:
        if e["type"] == "flag" and e.get("source_id"):
            flags[e["source_id"]].append(e.get("reason", ""))
    issues: dict[str, dict] = {}

    def issue(a, why):
        it = issues.setdefault(a["source_id"], {"source_id": a["source_id"], "qid": a["qid"], "path": a["path"],
                                                "topic": a["topic"], "difficulty": a["difficulty"], "why": []})
        if why not in it["why"]:
            it["why"].append(why)

    for a in scored:
        conf = a["confidence"]
        if a["score"] < STUCK_SCORE and conf is not None and conf >= HIGH_CONF:
            issue(a, f"missed with {conf}% confidence")
        if a["score"] >= 1 and ((conf is not None and conf <= LOW_CONF) or a["pressed_to_guess"]):
            issue(a, "right, but by a guess" if a["pressed_to_guess"] else f"right with only {conf}% confidence")
        if a["score"] < STUCK_SCORE and any(_norm(c) in mastered for c in a["concepts"]):
            issue(a, "missed although the profile has its concept mastered")
        if a["seen_in_guide"]:
            issue(a, f"reproduced as a worked example on [[{a['seen_in_guide']}]]")
    for sid, reasons in flags.items():
        a = next((x for x in attempts if x["source_id"] == sid), None)
        if a:
            for r in reasons:
                issue(a, f"flagged by the learner: {r}")
    ooc = [{"qid": a["qid"], "source_id": a["source_id"], "flags": a["audit_flags"]}
           for a in attempts if not a["in_character"]]

    return {
        "profile": profile.name, "profile_slug": profile.slug, "profile_description": profile.description,
        "strategy": start.get("strategy"), "feedback": start.get("feedback"), "exam": start.get("exam"),
        "exam_title": start.get("exam_title"), "pool": start.get("pool"), "excluded": start.get("excluded_reasons"),
        "cost_usd": (round((end[-1].get("cost_usd") or 0) + (control or {}).get("cost_usd", 0), 4)
                     if end else None), "stopped": end[-1].get("stopped") if end else None,
        "near_misses": end[-1].get("near_misses") if end else None,
        "sessions": len(sessions), "attempts_total": len(attempts), "attempts_scored": len(scored),
        "ungraded": len(attempts) - len(scored),
        "overall": round(sum(a["score"] for a in scored) / len(scored), 3) if scored else None,
        "minutes": events[-1]["t"] if events else 0,
        "by_session": by_session, "cumulative": cumulative, "by_concept": by_concept, "by_topic": by_topic,
        "by_objective": by_objective, "by_difficulty": by_difficulty, "by_kind": by_kind,
        "calibration": calibration, "pages": sorted(page_time.values(), key=lambda r: -r["minutes"]),
        "broken_links": {t: sorted(v) for t, v in sorted(broken.items())},
        "case_links": {t: sorted(v) for t, v in sorted(case_links.items())},
        "missing_requests": missing_requests, "stuck": stuck,
        "question_issues": sorted(issues.values(), key=lambda i: (-len(i["why"]), i["source_id"])),
        "out_of_character": ooc, "control": control, "attempts": attempts,
        "reflections": [{"session": e["session"], "text": e.get("reflection", "")}
                        for e in events if e["type"] == "end_session" and e.get("reflection")],
    }


def control_summary(run_dir: str, scored: list[dict]) -> dict | None:
    """What studying added: the learner's score on each question beside the control
    learner's (control.py), overall and by concept. None when no control ran.

    Sets `control_score` on each scored attempt whose question the control answered."""
    path = os.path.join(run_dir, CONTROL_LOG)
    if not os.path.exists(path):
        return None
    events = read_events(path)
    ctl = {e["source_id"]: e for e in events if e["type"] == "control_attempt" and e.get("verdict") != "ungraded"}
    studied: dict[str, list[float]] = defaultdict(list)
    concepts: dict[str, list[str]] = {}
    qids: dict[str, str] = {}
    for a in scored:
        c = ctl.get(a["source_id"])
        a["control_score"] = c["score"] if c else None
        if c:
            studied[a["source_id"]].append(a["score"])
            concepts[a["source_id"]] = a["concepts"] or ["(untagged)"]
            qids.setdefault(a["source_id"], a["qid"])
    pairs = {sid: (sum(v) / len(v), ctl[sid]["score"]) for sid, v in studied.items()}

    def compare(rows: list[tuple[float, float]]) -> dict:
        s, k = sum(r[0] for r in rows) / len(rows), sum(r[1] for r in rows) / len(rows)
        return {"studied": round(s, 3), "control": round(k, 3), "added": round(s - k, 3)}

    by: dict[str, list[tuple[float, float]]] = defaultdict(list)
    for sid, pair in pairs.items():
        for c in concepts[sid]:
            by[c].append(pair)
    by_concept = [{"key": c, "n": len(v), **compare(v)} for c, v in by.items()]
    by_concept.sort(key=lambda r: (r["added"], -r["n"], r["key"]))
    overall = compare(list(pairs.values())) if pairs else {"studied": None, "control": None, "added": None}
    return {
        "questions": len(pairs), "asked": sum(1 for e in events if e["type"] == "control_attempt"),
        "unanswered": sum(1 for e in events if e["type"] == "control_attempt" and not e.get("answered")),
        **overall,
        "known_without_study": [{"qid": qids[sid], "source_id": sid, "studied": round(st, 3)}
                                for sid, (st, kn) in sorted(pairs.items()) if kn >= 1],
        "by_concept": by_concept,
        "cost_usd": round(sum(e.get("cost_usd") or 0 for e in events if e["type"] == "control_end"), 4),
    }
