"""Grader, loader rendering, profiles, strategies, analysis and reports."""

from __future__ import annotations

import glob
import json
import os
import shutil
import sys
import tempfile
import unittest

SIM_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, SIM_DIR)

import learner_sim  # noqa: E402
from learner_sim.analysis import analyze, read_events  # noqa: E402
from learner_sim.backends import ScriptedOneShot, ScriptedSession, extract_json  # noqa: E402
from learner_sim.content_loader import ContentLoader, skim, truncate_derivations  # noqa: E402
from learner_sim.exams import resolve_exam  # noqa: E402
from learner_sim.grader import Grader, normalize_choice, numeric_match  # noqa: E402
from learner_sim.analysis import control_summary  # noqa: E402
from learner_sim.auditor import beyond_knowledge, deterministic_flags, norm_text, unreached_concepts  # noqa: E402
from learner_sim.control import control_questions, run_control  # noqa: E402
from learner_sim.learner import ACTIONS, ARG_FIELDS, build_control_persona, build_persona, trim_reply  # noqa: E402
from learner_sim.profiles import ProfileError, load_profile, profile_from_dict  # noqa: E402
from learner_sim.report import comparison_report, run_report  # noqa: E402
from learner_sim.scripted import ScriptedPolicy  # noqa: E402
from learner_sim.session import RunConfig, SimulationRun  # noqa: E402
from learner_sim.vault_parse import load_bank  # noqa: E402

ROOT = learner_sim.REPO_ROOT


class GraderTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.fm = load_bank(ROOT, "exam-fm")
        cls.cas5 = load_bank(ROOT, "exam-5")
        cls.cas7 = load_bank(ROOT, "exam-7")

    def test_choice_normalisation(self):
        for raw in ("C", "c", "(C)", "C) 0.0396", "The answer is C.", " c "):
            self.assertEqual(normalize_choice(raw), "C", raw)
        self.assertEqual(normalize_choice("none"), "")

    def test_multiple_choice(self):
        g = Grader(self.fm, feedback_mode="score")
        self.assertEqual(g.grade("fm-001", "Q1", "C").verdict, "correct")
        fb = g.grade("fm-001", "Q1", "B")
        self.assertEqual(fb.verdict, "incorrect")
        self.assertIsNone(fb.solution)
        self.assertIsNone(fb.revealed)
        self.assertNotIn("Official solution", fb.render())
        self.assertNotIn("Answer key", fb.render())

    def test_solution_mode_reveals_after_the_attempt(self):
        fb = Grader(self.fm, feedback_mode="solution").grade("fm-001", "Q1", "B")
        self.assertIn("Answer key: C", fb.render())
        self.assertIn("1.0404", fb.render())
        self.assertEqual(fb.revealed["topic"], "Force of Interest")

    def test_numeric_key_is_marked_without_the_agent(self):
        self.assertTrue(numeric_match("\\$330,750,000", "CY2012 EP at current rates = 330,750,000"))
        self.assertFalse(numeric_match("\\$330,750,000", "331,900,000"))
        g = Grader(self.cas5)
        self.assertEqual(g.grade("cas5-2013f-q2", "Q1", "330,750,000").verdict, "correct")
        self.assertEqual(g.grading_calls, 0)

    def test_written_parts_go_to_the_grading_agent(self):
        agent = ScriptedOneShot(lambda s, p: json.dumps({"parts": [
            {"label": "a", "fraction": 1, "note": "all three methods right"},
            {"label": "b", "fraction": 0.4, "note": "set-up right, arithmetic wrong"}]}))
        g = Grader(self.cas7, agent, "solution")
        fb = g.grade("cas7-2012-q1", "Q1", {"a": "CL 1.75M, BF 1.825M, GB 1.795M", "b": "x = 500,000"})
        self.assertEqual([p.verdict for p in fb.parts], ["correct", "partial"])
        self.assertAlmostEqual(fb.awarded, 1.25 + 0.5 * 1.5)  # 0.4 snaps to 0.5
        self.assertEqual(fb.verdict, "partial")
        system, prompt = agent.calls[0]
        self.assertIn("OFFICIAL SAMPLE ANSWER", prompt)
        self.assertIn("Benktander", prompt)
        self.assertIn("marker:", fb.render())

    def test_no_agent_means_ungraded_not_wrong(self):
        fb = Grader(self.cas7).grade("cas7-2012-q1", "Q1", {"a": "x", "b": "y"})
        self.assertEqual(fb.verdict, "ungraded")

    def test_blank_part_scores_zero_without_the_agent(self):
        agent = ScriptedOneShot(lambda s, p: json.dumps({"parts": [{"label": "a", "fraction": 1}]}))
        fb = Grader(self.cas7, agent).grade("cas7-2012-q1", "Q1", {"a": "something"})
        self.assertEqual(fb.parts[1].verdict, "incorrect")
        self.assertNotIn("CANDIDATE RESPONSE:\n(blank)", agent.calls[0][1])


class LoaderTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.loader = ContentLoader(resolve_exam("FM"))

    def test_exam_resolution(self):
        for key, title in (("FM", "Exam FM-2 (SOA)"), ("P", "Exam P-1 (SOA)"), ("CAS 5", "Exam 5 (CAS)"),
                           ("5", "Exam 5 (CAS)"), ("mas-i", "Exam MAS-I (CAS)"), ("Exam 9", "Exam 9 (CAS)")):
            self.assertEqual(resolve_exam(key).title, title)
        with self.assertRaises(SystemExit):
            resolve_exam("PA")

    def test_skim_folds_collapsed_callouts(self):
        text = "First sentence here is long enough. Second sentence.\n\n> [!example]- Worked\n> body\n> > [!answer]-\n> > 42\n\nAfter."
        out = skim(text)
        self.assertIn("folded", out)
        self.assertNotIn("42", out)
        self.assertNotIn("Second sentence", out)

    def test_low_patience_cuts_long_derivations(self):
        block = "$$\n" + "\n".join(f"x_{i} = {i}" for i in range(12)) + "\n$$"
        out, n = truncate_derivations(block, 4)
        self.assertEqual(n, 1)
        self.assertIn("didn't work through", out)
        self.assertNotIn("x_11", out)
        self.assertEqual(truncate_derivations(block, 20)[1], 0)

    def test_titles_resolve_case_insensitively(self):
        self.assertEqual(self.loader.resolve_title("force of interest"), "Force of Interest")
        self.assertEqual(self.loader.resolve_title("[[Force of Interest|delta]]".split("|")[0]), "Force of Interest")
        self.assertEqual(self.loader.resolve_title("syllabus"), "Exam FM-2 (SOA)")
        self.assertIsNone(self.loader.resolve_title("Definitely Not A Page"))

    def test_link_statuses(self):
        self.assertEqual(self.loader.link_status("Force of Interest").status, "ok")
        self.assertEqual(self.loader.link_status("Nonexistent Concept Xyz").status, "missing")
        book = sorted(os.listdir(os.path.join(ROOT, "Resources", "Books")))[0][:-3]
        self.assertEqual(self.loader.link_status(book).status, "unavailable")

    def test_syllabus_lists_objectives(self):
        s = self.loader.syllabus()
        self.assertIn("Time Value of Money", s)
        self.assertIn("Force of Interest", s)

    def test_search_finds_pages(self):
        titles = [t for t, _ in self.loader.search("force of interest")]
        self.assertIn("Force of Interest", titles)


class ProfileTests(unittest.TestCase):
    def test_examples_load(self):
        paths = sorted(glob.glob(os.path.join(SIM_DIR, "profiles", "*.yaml")))
        self.assertGreaterEqual(len(paths), 4)
        strategies = set()
        for p in paths:
            prof = load_profile(p)
            strategies.add(prof.study_strategy)
            resolve_exam(prof.exam)
            persona = build_persona(prof, "Exam FM-2 (SOA)")
            self.assertIn("knowledge boundary", persona)
            for gap in prof.gaps:
                self.assertIn(gap, persona)
        self.assertGreaterEqual(len(strategies), 3)

    def test_validation(self):
        with self.assertRaises(ProfileError):
            profile_from_dict({"name": "x"})
        with self.assertRaises(ProfileError):
            profile_from_dict({"name": "x", "exam": "FM", "traits": {"skim_tendency": 3}})
        with self.assertRaises(ProfileError):
            profile_from_dict({"name": "x", "exam": "FM", "traits": {"telepathy": 0.5}})
        with self.assertRaises(ProfileError):
            profile_from_dict({"name": "x", "exam": "FM", "study_strategy": "osmosis"})

    def test_extract_json(self):
        self.assertEqual(extract_json('sure:\n```json\n{"a": {"b": 1}}\n```'), {"a": {"b": 1}})
        with self.assertRaises(ValueError):
            extract_json("no json")


class RunAndReportTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tmp = tempfile.mkdtemp(prefix="learner-run-")
        cls.exam = resolve_exam("FM")
        cls.loader = ContentLoader(cls.exam)
        cls.bank = load_bank(ROOT, cls.exam.bank)
        cls.analyses = []
        for name, strategy in (("a", "read-then-practice"), ("b", "spaced-review")):
            prof = profile_from_dict({"name": name.upper(), "exam": "FM", "study_strategy": strategy, "seed": 5,
                                      "time_budget": {"steps_per_session": 16, "questions_per_session": 4}})
            out = os.path.join(cls.tmp, name)
            SimulationRun(prof, cls.exam, out, RunConfig(sessions=2), lambda: ScriptedSession(ScriptedPolicy()),
                          loader=cls.loader, bank=cls.bank).run()
            cls.analyses.append(analyze(out, cls.bank, cls.loader, prof))

    @classmethod
    def tearDownClass(cls):
        shutil.rmtree(cls.tmp, ignore_errors=True)

    def test_logs_and_state(self):
        events = read_events(os.path.join(self.tmp, "a", "events.jsonl"))
        types = {e["type"] for e in events}
        for t in ("run_start", "session_start", "page_read", "question_served", "attempt", "graded", "session_end",
                  "audit", "run_end"):
            self.assertIn(t, types)
        self.assertTrue(os.path.exists(os.path.join(self.tmp, "a", "notes", "session-2.md")))
        times = [e["t"] for e in events]
        self.assertEqual(times, sorted(times), "the simulated clock only moves forward")

    def test_analysis_counts_agree(self):
        a = self.analyses[0]
        self.assertEqual(sum(s["n"] for s in a["by_session"]), a["attempts_scored"])
        self.assertEqual(len(a["cumulative"]), a["attempts_scored"])
        self.assertEqual(a["sessions"], 2)
        self.assertTrue(a["pages"])

    def test_spaced_review_brings_misses_back(self):
        events = read_events(os.path.join(self.tmp, "b", "events.jsonl"))
        missed_concepts = set()
        for e in events:
            if e["type"] == "graded" and e["session"] == 1 and e["score"] < 1:
                missed_concepts |= set(self.bank[e["source_id"]].concepts)
        served2 = [self.bank[e["source_id"]] for e in events if e["type"] == "question_served" and e["session"] == 2]
        if missed_concepts:
            self.assertTrue(any(set(q.concepts) & missed_concepts for q in served2))

    def test_reports_render(self):
        md = run_report(self.analyses[0], "test")
        for heading in ("## Score over time", "## Score by concept and tag", "## Where the learner got stuck",
                        "## Likely root causes", "## Questions that look miscalibrated", "## Suggested edits",
                        "## Reading log"):
            self.assertIn(heading, md)
        cmp = comparison_report(self.analyses, "test")
        self.assertIn("## Which pages fail which learners", cmp)
        self.assertIn("| A |", cmp)


class WorkingIsNotRecordedTests(unittest.TestCase):
    """The learner's working is never asked for, and never kept."""

    def test_no_action_asks_for_reasoning_or_thoughts(self):
        for name, spec in ACTIONS.items():
            self.assertNotIn("reasoning", spec, name)
            self.assertNotIn("thought", spec, name)

    def test_persona_asks_for_sources_not_working(self):
        from learner_sim.profiles import profile_from_dict
        prof = profile_from_dict({"name": "T", "exam": "FM", "description": "d"})
        persona = build_persona(prof, "Exam FM")
        self.assertIn('"sources"', persona)
        self.assertIn("`guess`", persona)
        self.assertNotIn("reasoning", persona.lower())
        self.assertNotIn("thought", persona.lower())

    def test_trim_reply_keeps_only_the_action_and_its_own_fields(self):
        reply = ('Let me think about the Poisson step first. '
                 '{"action": "answer", "args": {"answer": "B", "confidence": 60, '
                 '"sources": ["notes"], "reasoning": "full working here", "thought": "hm"}} done')
        kept = json.loads(trim_reply(reply))
        self.assertEqual(kept, {"action": "answer",
                                "args": {"answer": "B", "confidence": 60, "sources": ["notes"]}})
        self.assertNotIn("working", trim_reply(reply))
        self.assertNotIn("Poisson", trim_reply(reply))

    def test_trim_reply_without_an_action_stores_no_text(self):
        self.assertEqual(trim_reply("I would rather just explain it in prose."),
                         "(no action in reply; text not kept)")

    def test_every_action_has_its_kept_fields(self):
        self.assertEqual(set(ARG_FIELDS), set(ACTIONS))

    def test_an_answer_with_no_sources_is_flagged(self):
        self.assertIn("no sources listed", deterministic_flags({"sources": []}, set()))
        self.assertNotIn("no sources listed", deterministic_flags({"sources": ["notes"]}, set()))


class BeyondKnowledgeTests(unittest.TestCase):
    """A confident right answer on concepts the learner had no way to meet is flagged."""

    ATTEMPT = {"concepts": ["Macaulay Duration"], "score": 1.0, "confidence": 90, "pressed_to_guess": False}

    def test_unreached_unless_opened_or_named(self):
        self.assertEqual(unreached_concepts(["Macaulay Duration"], set(), norm_text("compound interest")),
                         ["Macaulay Duration"])
        self.assertEqual(unreached_concepts(["Macaulay Duration"], {"Macaulay Duration"}, ""), [])
        self.assertEqual(unreached_concepts(["Macaulay Duration"], set(), norm_text("See [[Macaulay-Duration]].")),
                         [])

    def test_flags_only_the_clear_case(self):
        self.assertIn("Macaulay Duration", beyond_knowledge(self.ATTEMPT, ["Macaulay Duration"]))
        for change in ({"score": 0.5}, {"confidence": 60}, {"confidence": None}, {"pressed_to_guess": True},
                       {"concepts": []}):
            self.assertIsNone(beyond_knowledge({**self.ATTEMPT, **change}, ["Macaulay Duration"]), change)

    def test_one_reachable_concept_is_enough(self):
        attempt = {**self.ATTEMPT, "concepts": ["Macaulay Duration", "Present Value"]}
        self.assertIsNone(beyond_knowledge(attempt, ["Macaulay Duration"]))


class ControlLearnerTests(unittest.TestCase):
    """The same student, unstudied, answers the learner's questions; the difference is the guide's."""

    @classmethod
    def setUpClass(cls):
        cls.tmp = tempfile.mkdtemp(prefix="learner-control-")
        cls.exam = resolve_exam("FM")
        cls.loader = ContentLoader(cls.exam)
        cls.bank = load_bank(ROOT, cls.exam.bank)
        cls.prof = profile_from_dict({"name": "C", "exam": "FM", "seed": 3,
                                      "time_budget": {"steps_per_session": 16, "questions_per_session": 4}})

    @classmethod
    def tearDownClass(cls):
        shutil.rmtree(cls.tmp, ignore_errors=True)

    def _run(self, name: str, sessions: int = 1) -> SimulationRun:
        run = SimulationRun(self.prof, self.exam, os.path.join(self.tmp, name), RunConfig(sessions=sessions),
                            lambda: ScriptedSession(ScriptedPolicy()), loader=self.loader, bank=self.bank)
        run.run()
        return run

    def test_persona_has_no_pages_notes_or_working(self):
        persona = build_control_persona(self.prof, "Exam FM")
        self.assertIn("no study pages and no notes", persona)
        self.assertIn('"action": "answer"', persona)
        for word in ("read_page", "update_notes", "reasoning", "thought"):
            self.assertNotIn(word, persona)

    def test_asks_each_attempted_question_once_and_resumes(self):
        run = self._run("resume")
        attempted = set(run.state["attempts"])
        self.assertEqual(run_control(run, lambda: ScriptedSession(ScriptedPolicy())), len(attempted))
        events = read_events(os.path.join(run.out_dir, "control.jsonl"))
        self.assertEqual(sorted(e["source_id"] for e in events if e["type"] == "control_attempt"), sorted(attempted))
        self.assertEqual(control_questions(run), [])
        self.assertEqual(run_control(run, lambda: ScriptedSession(ScriptedPolicy())), 0)

    def test_sample_caps_the_control(self):
        run = self._run("sample")
        self.assertEqual(len(control_questions(run, sample=2)), 2)
        self.assertEqual(control_questions(run, sample=2), control_questions(run, sample=2))

    def test_summary_is_studied_minus_control(self):
        out = os.path.join(self.tmp, "summary")
        os.makedirs(out)
        rows = [("q1", "Q1", 1.0, 1.0, ["Present Value"]), ("q2", "Q2", 1.0, 0.0, ["Duration"]),
                ("q3", "Q3", 0.0, 0.0, ["Duration"])]
        with open(os.path.join(out, "control.jsonl"), "w") as fh:
            for sid, qid, _, ctl, _ in rows:
                fh.write(json.dumps({"type": "control_attempt", "source_id": sid, "qid": qid, "answered": True,
                                     "verdict": "correct" if ctl else "incorrect", "score": ctl}) + "\n")
            fh.write(json.dumps({"type": "control_end", "cost_usd": 0.25}) + "\n")
        scored = [{"source_id": sid, "qid": qid, "score": s, "concepts": c} for sid, qid, s, _, c in rows]
        c = control_summary(out, scored)
        self.assertEqual((c["questions"], c["studied"], c["control"], c["added"]), (3, 0.667, 0.333, 0.333))
        self.assertEqual([k["source_id"] for k in c["known_without_study"]], ["q1"])
        self.assertEqual({r["key"]: r["added"] for r in c["by_concept"]}, {"Present Value": 0.0, "Duration": 0.5})
        self.assertEqual(c["cost_usd"], 0.25)
        self.assertEqual([a["control_score"] for a in scored], [1.0, 0.0, 0.0])
        self.assertIsNone(control_summary(os.path.join(self.tmp, "nowhere"), []))

    def test_report_shows_what_studying_added(self):
        run = self._run("report")
        run_control(run, lambda: ScriptedSession(ScriptedPolicy()))
        a = analyze(run.out_dir, self.bank, self.loader, self.prof)
        self.assertIsNotNone(a["control"]["added"])
        self.assertIn("## What studying added", run_report(a, "t"))


if __name__ == "__main__":
    unittest.main()
