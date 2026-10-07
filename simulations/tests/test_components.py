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
from learner_sim.learner import build_persona  # noqa: E402
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


if __name__ == "__main__":
    unittest.main()
