"""Markdown reports: one per learner run, and a comparison across profiles."""

from __future__ import annotations

import json
import os
from collections import defaultdict

BLOCKS = "▁▂▃▄▅▆▇█"


def spark(values: list[float]) -> str:
    return "".join(BLOCKS[min(7, int(v * 7.999))] for v in values if v is not None)


def pct(x) -> str:
    return "—" if x is None else f"{100 * x:.0f}%"


def _table(headers: list[str], rows: list[list]) -> list[str]:
    out = ["| " + " | ".join(headers) + " |", "|" + "|".join("---" for _ in headers) + "|"]
    for r in rows:
        out.append("| " + " | ".join(str(c).replace("|", "\\|").replace("\n", " ") for c in r) + " |")
    return out


def _cut(text: str, n: int = 400) -> str:
    text = " ".join(str(text or "").split())
    return text if len(text) <= n else text[:n] + " …"


def run_report(a: dict, run_id: str) -> str:
    L = [f"# Simulated learner: {a['profile']} on {a['exam_title']}", ""]
    L += [f"Run `{run_id}` · strategy **{a['strategy']}** · feedback **{a['feedback']}** · "
          f"{a['sessions']} session(s) · {a['attempts_total']} questions attempted · overall **{pct(a['overall'])}** · "
          f"{a['minutes']:.0f} simulated minutes · cost ${a['cost_usd'] or 0:.2f}", ""]
    if a.get("profile_description"):
        L += [f"> {a['profile_description']}", ""]
    if a.get("stopped"):
        L += [f"**Run stopped early:** {a['stopped']}", ""]
    if a["ungraded"]:
        L += [f"{a['ungraded']} attempt(s) could not be marked (no grading agent) and are left out of the scores.", ""]

    L += ["## Score over time", ""]
    L += _table(["Session", "Questions", "Score"], [[s["session"], s["n"], pct(s["score"])] for s in a["by_session"]])
    if a["cumulative"]:
        L += ["", f"Running average, attempt by attempt: `{spark(a['cumulative'])}` "
                  f"({pct(a['cumulative'][0])} → {pct(a['cumulative'][-1])})"]
    L += [""]

    L += ["## Score by concept and tag", ""]
    L += ["**By concept** (weakest first)", ""]
    L += _table(["Concept", "Attempts", "Score"], [[r["key"], r["n"], pct(r["score"])] for r in a["by_concept"][:30]])
    for title, key in (("By learning objective", "by_objective"), ("By topic", "by_topic"),
                       ("By difficulty", "by_difficulty"), ("By question type", "by_kind")):
        L += ["", f"**{title}**", ""]
        L += _table(["", "Attempts", "Score"], [[r["key"], r["n"], pct(r["score"])] for r in a[key]])
    L += [""]

    if a["calibration"]:
        L += ["## Confidence vs accuracy", ""]
        L += _table(["Stated confidence", "Attempts", "Mean confidence", "Accuracy"],
                    [[c["range"], c["n"], f"{c['confidence']:.0f}%", f"{c['accuracy']:.0f}%"] for c in a["calibration"]])
        L += [""]

    L += ["## Where the learner got stuck", ""]
    if not a["stuck"]:
        L += ["No concept met the stuck threshold (mean score under 50% over two or more attempts, or a miss "
              "after reading its page).", ""]
    for s in a["stuck"]:
        page = f"`{s['page_path']}`" if s["page_path"] else "**no page**"
        L += [f"### {s['concept']} — {pct(s['score'])} over {s['n']} attempt(s)", "",
              f"- Page: {page}",
              f"- Pages read before the misses: {', '.join(s['pages_before_misses']) or 'none'}",
              f"- Attempts: " + ", ".join(f"{x['qid']} (`{x['source_id']}`, {pct(x['score'])}, conf {x['confidence']})"
                                          for x in s["attempts"])]
        if s["signals"]:
            L += [f"- Signals: {'; '.join(s['signals'])}"]
        L += [""]

    d = a.get("diagnosis")
    L += ["## Likely root causes", ""]
    if d and d.get("root_causes"):
        L += _table(["Concept", "Cause", "Confidence", "Evidence"],
                    [[r.get("concept", ""), r.get("category", ""), r.get("confidence", ""), _cut(r.get("evidence"), 500)]
                     for r in d["root_causes"]])
    else:
        L += ["No model diagnosis for this run (diagnosis off, or nothing to diagnose). The deterministic signals "
              "above are the evidence."]
    L += [""]

    L += ["## Questions that look miscalibrated", ""]
    qd = {r.get("source_id"): r for r in (d or {}).get("question_issues") or []}
    if not a["question_issues"] and not qd:
        L += ["None flagged.", ""]
    else:
        rows = []
        for i in a["question_issues"]:
            m = qd.pop(i["source_id"], None)
            rows.append([f"`{i['path']}`", i["difficulty"], "; ".join(i["why"]),
                         f"{m.get('issue')}: {_cut(m.get('evidence'), 300)}" if m else ""])
        for sid, m in qd.items():
            rows.append([f"`{sid}`", "", "", f"{m.get('issue')}: {_cut(m.get('evidence'), 300)}"])
        L += _table(["Question", "Difficulty", "Signal", "Diagnosis"], rows) + [""]

    L += ["## Broken links and missing pages", ""]
    if a["broken_links"]:
        L += _table(["Link", "Found on"], [[f"[[{t}]]", ", ".join(v)] for t, v in a["broken_links"].items()])
    else:
        L += ["No broken links on the pages read."]
    if a["case_links"]:
        L += ["", "Links that only resolve case-insensitively (work in Obsidian, not in the app): " +
              "; ".join(f"[[{t}]] on {', '.join(v)}" for t, v in a["case_links"].items())]
    if a["missing_requests"]:
        L += ["", "Pages the learner looked for by name that don't exist: " +
              ", ".join(f"“{t}”" for t in a["missing_requests"])]
    L += [""]

    L += ["## Suggested edits", ""]
    if d and d.get("edits"):
        for e in d["edits"]:
            flag = "" if e.get("exists") else " *(file doesn't exist — a new page)*"
            L += [f"- **`{e.get('file')}`**{flag} — {e.get('section', '')}",
                  f"  - Change: {_cut(e.get('change'), 900)}",
                  f"  - Why: {_cut(e.get('rationale'), 400)}"]
    else:
        L += ["No model-written edits for this run."]
    L += ["", "These are suggestions only; the simulation never edits the vault.", ""]

    L += ["## Reading log", ""]
    L += _table(["Page", "Kind", "Reads", "Full / skim (forced)", "Sim. minutes", "Words"],
                [[p["title"], p["kind"], p["reads"], f"{p['full']} / {p['skim']} ({p['forced_skim']})",
                  f"{p['minutes']:.1f}", p["words"]] for p in a["pages"]])
    L += [""]

    L += ["## Staying in character", ""]
    if a["out_of_character"]:
        L += ["These attempts used knowledge the auditor could not trace to the profile, the pages read or the notes. "
              "They are scored like the rest; read their results with that in mind.", ""]
        L += _table(["Attempt", "Question", "What was flagged"],
                    [[o["qid"], f"`{o['source_id']}`", _cut("; ".join(o["flags"]), 400)] for o in a["out_of_character"]])
    else:
        L += ["No attempt was flagged as out of character."]
    L += [""]

    if a["reflections"]:
        L += ["## The learner's own words", ""]
        L += [f"- Session {r['session']}: {_cut(r['text'], 600)}" for r in a["reflections"]]
        L += [""]

    L += ["## Attempts", ""]
    for x in a["attempts"]:
        L += [f"<details><summary>S{x['session']} {x['qid']} · <code>{x['source_id']}</code> · {x['verdict']} · "
              f"confidence {x['confidence']}</summary>", "",
              f"Concepts: {', '.join(x['concepts']) or '—'}. Pages read this session before it: "
              f"{', '.join(x['pages_before'] or []) or 'none'}. Looked up while answering: "
              f"{', '.join(x['pages_during'] or []) or 'nothing'}.", "",
              f"Answer: `{_cut(json.dumps(x['answer']) if not isinstance(x['answer'], str) else x['answer'], 300)}`", "",
              f"Sources it listed: {', '.join(str(s) for s in x['sources'] or []) or 'none'}.", "", "</details>", ""]

    L += ["## Run details", "",
          f"- Question pool: {a['pool']} questions; left out: " +
          (", ".join(f"{n} {why}" for why, n in (a['excluded'] or {}).items()) or "none"),
          f"- Isolation: every message to the learner passed the context guard; "
          f"{a.get('near_misses') or 0} near-miss(es) below the blocking threshold.", ""]
    return "\n".join(L)


def comparison_report(analyses: list[dict], run_id: str) -> str:
    exam = analyses[0]["exam_title"]
    names = [x["profile"] for x in analyses]
    L = [f"# Simulated learners compared: {exam}", "", f"Run `{run_id}` · {len(analyses)} profiles", ""]
    L += ["## Overall", ""]
    L += _table(["Profile", "Strategy", "Sessions", "Attempts", "Score", "Out of character", "Cost"],
                [[x["profile"], x["strategy"], x["sessions"], x["attempts_total"], pct(x["overall"]),
                  len(x["out_of_character"]), f"${x['cost_usd'] or 0:.2f}"] for x in analyses])
    L += [""]

    def matrix(key: str, min_profiles: int):
        cells: dict[str, dict[str, dict]] = defaultdict(dict)
        for x in analyses:
            for r in x[key]:
                cells[r["key"]][x["profile"]] = r
        rows = []
        for k, by in cells.items():
            if len(by) < min_profiles:
                continue
            scores = [r["score"] for r in by.values()]
            rows.append((sum(scores) / len(scores), k,
                         [f"{pct(by[n]['score'])} ({by[n]['n']})" if n in by else "·" for n in names]))
        rows.sort()
        return [[k, *c] for _, k, c in rows]

    L += ["## By learning objective", ""]
    L += _table(["Objective", *names], matrix("by_objective", 1)) + [""]
    L += ["## By concept (tried by two or more profiles, weakest first)", ""]
    m = matrix("by_concept", 2)
    L += (_table(["Concept", *names], m[:40]) if m else ["No concept was attempted by two profiles."]) + [""]

    L += ["## Which pages fail which learners", "",
          "A page counts against a profile when that profile read it and then missed a question on its concept.", ""]
    fails: dict[str, set] = defaultdict(set)
    reads: dict[str, set] = defaultdict(set)
    for x in analyses:
        for p in x["pages"]:
            reads[p["title"]].add(x["profile"])
        for s in x["stuck"]:
            if s["page"] and s["page"] in s["pages_before_misses"]:
                fails[s["page"]].add(x["profile"])
    if fails:
        L += _table(["Page", "Failed", "Read but didn't fail", "Pattern"],
                    [[p, ", ".join(sorted(f)), ", ".join(sorted(reads[p] - f)) or "—",
                      "everyone who read it" if f == reads[p] else "some learners"]
                     for p, f in sorted(fails.items(), key=lambda kv: (-len(kv[1]), kv[0]))])
    else:
        L += ["No page preceded a miss on its own concept."]
    L += [""]

    L += ["## Questions every learner who tried them missed", ""]
    tried: dict[str, dict] = defaultdict(dict)
    for x in analyses:
        for a in x["attempts"]:
            if a["verdict"] != "ungraded":
                tried[a["source_id"]].setdefault(x["profile"], []).append(a["score"])
    allmiss = [(sid, by) for sid, by in tried.items() if len(by) >= 2 and all(max(v) < 0.5 for v in by.values())]
    L += (_table(["Question", "Missed by"], [[f"`{sid}`", ", ".join(sorted(by))] for sid, by in sorted(allmiss)])
          if allmiss else ["None (no question was missed by every profile that tried it)."]) + [""]

    L += ["## Root causes by concept", ""]
    causes: dict[str, list] = defaultdict(list)
    for x in analyses:
        for r in ((x.get("diagnosis") or {}).get("root_causes") or []):
            causes[r.get("concept", "?")].append(f"{x['profile']}: {r.get('category')}")
    L += (_table(["Concept", "Diagnoses"], [[c, "; ".join(v)] for c, v in sorted(causes.items())])
          if causes else ["No model diagnoses in these runs."]) + [""]

    L += ["## Broken links any learner hit", ""]
    links: dict[str, set] = defaultdict(set)
    for x in analyses:
        for t, pages in x["broken_links"].items():
            links[t] |= set(pages)
    L += (_table(["Link", "On"], [[f"[[{t}]]", ", ".join(sorted(v))] for t, v in sorted(links.items())])
          if links else ["None."]) + [""]
    L += ["Per-profile detail is in each profile's `report.md`.", ""]
    return "\n".join(L)


def write(path: str, text: str) -> None:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(text)
