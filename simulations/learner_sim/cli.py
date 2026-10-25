"""Command line: `run-learner` and `compare-learners`."""

from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import sys
from concurrent.futures import ThreadPoolExecutor
from collections import defaultdict

from . import REPO_ROOT, SIM_DIR
from .analysis import analyze
from .backends import ClaudeCodeOneShot, ClaudeCodeSession, ScriptedSession
from .content_loader import ContentLoader
from .control import run_control
from .diagnostician import diagnose
from .exams import resolve_exam
from .grader import Grader
from .profiles import load_profile
from .report import comparison_report, run_report, write
from .scripted import ScriptedPolicy
from .session import RunConfig, SimulationRun
from .vault_parse import load_bank


def _run_one(profile_path: str, args, run_root: str, run_id: str) -> dict:
    profile = load_profile(profile_path)
    exam = resolve_exam(args.exam or profile.exam)
    out_dir = os.path.join(run_root, profile.slug)
    loader = ContentLoader(exam)
    bank = load_bank(REPO_ROOT, exam.bank)
    if args.backend == "scripted":
        factory = lambda: ScriptedSession(ScriptedPolicy())  # noqa: E731
        grading = auditor = analyst = None
    else:
        factory = lambda: ClaudeCodeSession(args.learner_model, args.effort)  # noqa: E731
        grading = ClaudeCodeOneShot(args.grader_model)
        auditor = None if args.no_audit else ClaudeCodeOneShot(args.grader_model)
        analyst = None if args.no_diagnose else ClaudeCodeOneShot(args.analyst_model)
    cfg = RunConfig(sessions=args.sessions, feedback=args.feedback, audit=not args.no_audit,
                    max_cost_usd=args.max_cost, written=not args.mc_only, seed=args.seed)
    run = SimulationRun(profile, exam, out_dir, cfg, factory, grading, auditor, loader, bank)
    print(f"[{profile.slug}] {exam.title}: {cfg.sessions} session(s), pool {len(run.pool)} questions …", flush=True)
    run.run()
    if not args.no_control and not run.stopped_reason:
        asked = run_control(run, factory, args.control_sample)
        print(f"[{profile.slug}] control learner: {asked} question(s) closed book", flush=True)
    analysis = analyze(out_dir, bank, loader, profile)
    solution_of = Grader(bank).solution_text
    analysis["diagnosis"] = diagnose(analyst, analysis, bank, loader, solution_of)
    if analyst is not None:
        analysis["cost_usd"] = round((analysis["cost_usd"] or 0) + analyst.usage.cost_usd, 4)
    with open(os.path.join(out_dir, "analysis.json"), "w", encoding="utf-8") as fh:
        json.dump(analysis, fh, indent=1, ensure_ascii=False, default=str)
    write(os.path.join(out_dir, "report.md"), run_report(analysis, run_id))
    print(f"[{profile.slug}] done: score {analysis['overall']}, cost ${analysis['cost_usd'] or 0:.2f} → "
          f"{os.path.join(out_dir, 'report.md')}", flush=True)
    return analysis


def run_learner(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(prog="run-learner", description="Run simulated learners over the study wiki.")
    ap.add_argument("--profile", action="append", required=True, help="profile YAML (repeat for several)")
    ap.add_argument("--exam", help="exam to study (P, FM, MAS-I, MAS-II, 5, 6C, 7, 8, 9); default: the profile's")
    ap.add_argument("--sessions", type=int, default=3)
    ap.add_argument("--feedback", choices=("score", "solution"), help="override the profiles' feedback mode")
    ap.add_argument("--backend", choices=("claude", "scripted"), default="claude",
                    help="claude: headless Claude Code (default). scripted: a no-model dry run")
    ap.add_argument("--learner-model", default="sonnet")
    ap.add_argument("--grader-model", default="sonnet", help="grading agent and character auditor")
    ap.add_argument("--analyst-model", default="opus", help="the diagnostician that writes root causes and edits")
    ap.add_argument("--effort", choices=("low", "medium", "high", "xhigh", "max"))
    ap.add_argument("--max-cost", type=float, help="stop each learner once its run has cost this many USD")
    ap.add_argument("--mc-only", action="store_true", help="multiple-choice questions only")
    ap.add_argument("--no-audit", action="store_true", help="skip the model half of the character audit")
    ap.add_argument("--no-diagnose", action="store_true", help="skip the model-written diagnosis and edits")
    ap.add_argument("--no-control", action="store_true",
                    help="skip the control learner (the same student, unstudied) that measures what studying added")
    ap.add_argument("--control-sample", type=int,
                    help="put at most this many of the learner's questions to the control learner")
    ap.add_argument("--seed", type=int)
    ap.add_argument("--parallel", type=int, default=1, help="profiles to run at once")
    ap.add_argument("--out", default=os.path.join(SIM_DIR, "runs"))
    ap.add_argument("--run-id", help="run directory name (reuse one to continue its learners' sessions)")
    args = ap.parse_args(argv)

    groups: dict[str, list[str]] = defaultdict(list)
    for p in args.profile:
        groups[resolve_exam(args.exam or load_profile(p).exam).key].append(p)
    stamp = dt.datetime.now().strftime("%Y%m%d-%H%M%S")
    for exam_key, paths in groups.items():
        run_id = args.run_id or f"{stamp}-{exam_key.lower()}"
        run_root = os.path.join(args.out, run_id)
        os.makedirs(run_root, exist_ok=True)
        with ThreadPoolExecutor(max_workers=max(1, args.parallel)) as ex:
            analyses = list(ex.map(lambda p: _run_one(p, args, run_root, run_id), paths))
        if len(analyses) > 1:
            path = os.path.join(run_root, "comparison.md")
            write(path, comparison_report(analyses, run_id))
            print(f"comparison → {path}")
    return 0


def compare_learners(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(prog="compare-learners",
                                 description="Compare learner runs (a run directory, or profile directories).")
    ap.add_argument("dirs", nargs="+")
    ap.add_argument("--out", help="where to write comparison.md (default: alongside the runs)")
    args = ap.parse_args(argv)
    found = []
    for d in args.dirs:
        if os.path.exists(os.path.join(d, "analysis.json")):
            found.append(os.path.join(d, "analysis.json"))
        else:
            for sub in sorted(os.listdir(d)):
                f = os.path.join(d, sub, "analysis.json")
                if os.path.exists(f):
                    found.append(f)
    if len(found) < 2:
        print("compare-learners needs at least two profile runs with an analysis.json", file=sys.stderr)
        return 1
    by_exam: dict[str, list[dict]] = defaultdict(list)
    for f in found:
        with open(f, encoding="utf-8") as fh:
            a = json.load(fh)
        by_exam[a["exam"]].append(a)
    for exam, analyses in by_exam.items():
        if len(analyses) < 2:
            print(f"skipping {exam}: only one profile", file=sys.stderr)
            continue
        out = args.out or os.path.join(os.path.dirname(os.path.dirname(found[0])), "comparison.md")
        if len(by_exam) > 1:
            out = out.replace(".md", f"-{exam.lower()}.md")
        write(out, comparison_report(analyses, os.path.basename(os.path.dirname(out))))
        print(f"comparison → {out}")
    return 0


def check_answerable(argv: list[str] | None = None) -> int:
    from .answerability import read_results, report, run_check, served_questions

    ap = argparse.ArgumentParser(prog="check-answerable",
                                 description="Check that each question can be answered from the pages the vault "
                                             "gives for it.")
    ap.add_argument("--exam", required=True, help="exam whose bank to check (P, FM, MAS-I, MAS-II, 5, 6C, 7, 8, 9 …)")
    ap.add_argument("--ids", help="comma-separated question ids (default: every served question)")
    ap.add_argument("--limit", type=int, help="check at most this many questions this time")
    ap.add_argument("--model", default="sonnet", help="model for both calls")
    ap.add_argument("--parallel", type=int, default=4, help="questions checked at once")
    ap.add_argument("--max-cost", type=float, help="stop starting new questions once the run has cost this many USD")
    ap.add_argument("--out", default=os.path.join(SIM_DIR, "runs"))
    ap.add_argument("--run-id", help="run directory name (reuse one to continue it)")
    ap.add_argument("--report-only", action="store_true", help="rewrite report.md from results.jsonl, no model calls")
    args = ap.parse_args(argv)

    exam = resolve_exam(args.exam)
    run_id = args.run_id or f"answerability-{dt.datetime.now().strftime('%Y%m%d-%H%M%S')}-{exam.key.lower()}"
    out_dir = os.path.join(args.out, run_id)
    loader = ContentLoader(exam)
    bank = load_bank(REPO_ROOT, exam.bank)
    _, left_out = served_questions(bank)
    if args.report_only:
        results = read_results(os.path.join(out_dir, "results.jsonl"))
    else:
        ids = [s.strip() for s in args.ids.split(",")] if args.ids else None
        results = run_check(exam, loader, bank, out_dir, lambda: ClaudeCodeOneShot(args.model), ids=ids,
                            limit=args.limit, parallel=args.parallel, max_cost=args.max_cost)
    path = os.path.join(out_dir, "report.md")
    write(path, report(exam, results, loader, run_id, left_out))
    print(f"report → {path}")
    return 0


def main() -> int:
    return run_learner()
