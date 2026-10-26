"""Answerability: quotes are checked in code, tiers and collapsed callouts are read right, and a run reports."""

from __future__ import annotations

import json
import os
import shutil
import sys
import tempfile
import unittest

SIM_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, SIM_DIR)

import learner_sim  # noqa: E402
from learner_sim.answerability import (LOCATE_SYSTEM, REQUIREMENTS_SYSTEM, Candidates, PageIndex,  # noqa: E402
                                       check_question, home_page, input_hash, merge_found, read_results, report,
                                       run_check, served_questions, verdict, verify_locations)
from learner_sim.backends import BackendError, ScriptedOneShot  # noqa: E402
from learner_sim.content_loader import ContentLoader  # noqa: E402
from learner_sim.exams import resolve_exam  # noqa: E402
from learner_sim.vault_parse import load_bank  # noqa: E402

ROOT = learner_sim.REPO_ROOT

PAGE = """---
verification:
  status: unverified
---
**Thing** is defined as the **ratio** of two   variances.

> $$k = \\frac{v}{a}$$

> [!idea] The idea
> Larger $a$ means a larger $Z$.

> [!example]- Worked example {Example}
> A risk has three years of data, so $n = 3$.
>
> > [!answer]-
> > Multiply by next year's exposure to get the total.

After the callout, open text again.
"""


class PageIndexTests(unittest.TestCase):
    def setUp(self):
        self.idx = PageIndex.build(PAGE)

    def test_whitespace_markers_and_emphasis_are_ignored(self):
        self.assertEqual(self.idx.find("Thing is defined as the ratio of two variances."), (True, False))
        self.assertEqual(self.idx.find("$$k = \\frac{v}{a}$$"), (True, False))

    def test_frontmatter_is_not_page_text(self):
        self.assertFalse(self.idx.find("status: unverified")[0])

    def test_an_open_callout_is_visible_and_a_folded_one_is_collapsed(self):
        self.assertEqual(self.idx.find("Larger $a$ means a larger $Z$."), (True, False))
        self.assertEqual(self.idx.find("A risk has three years of data, so $n = 3$."), (True, True))
        self.assertEqual(self.idx.find("Multiply by next year's exposure to get the total."), (True, True))
        self.assertEqual(self.idx.find("After the callout, open text again."), (True, False))

    def test_a_callout_title_is_not_teaching_text_but_its_body_is(self):
        self.assertFalse(self.idx.find("[!example]- Worked example")[0])

    def test_pieces_joined_by_an_ellipsis_must_appear_in_order(self):
        self.assertTrue(self.idx.find("Thing is defined as … two variances")[0])
        self.assertFalse(self.idx.find("two variances … Thing is defined as")[0])

    def test_a_quote_that_isnt_there_or_is_too_short_fails(self):
        self.assertFalse(self.idx.find("Thing is defined as the product of two means.")[0])
        self.assertFalse(self.idx.find("ratio")[0], "too short to prove anything")
        self.assertFalse(self.idx.find("")[0])


class VerifyLocationsTests(unittest.TestCase):
    def setUp(self):
        self.idx = {"A": PageIndex.build("Alpha teaches the estimator for k completely.\n"),
                    "B": PageIndex.build("Beta also teaches the estimator for k here.\n"),
                    "C": PageIndex.build("> [!example]-\n> Gamma hides the estimator for k inside.\n")}
        self.cands = Candidates(tagged=["A"], linked={"B"}, shown=["A", "B", "C"])
        self.reqs = [{"id": "r1", "kind": "formula", "statement": "s1", "concept": "K", "search": []},
                     {"id": "r2", "kind": "fact", "statement": "s2", "concept": "K", "search": []},
                     {"id": "r3", "kind": "fact", "statement": "s3", "concept": "K", "search": []}]

    def test_the_nearest_verified_tier_wins(self):
        found = [{"id": "r1", "places": [{"page": "B", "quote": "Beta also teaches the estimator for k here."},
                                         {"page": "A", "quote": "Alpha teaches the estimator for k completely."}]}]
        r1 = verify_locations(self.reqs, found, self.cands, self.idx)[0]
        self.assertEqual((r1["status"], r1["page"]), ("tagged", "A"))

    def test_an_invented_quote_is_missing_and_kept_for_review(self):
        found = [{"id": "r2", "places": [{"page": "A", "quote": "Alpha teaches something it never says at all."}]}]
        r2 = verify_locations(self.reqs, found, self.cands, self.idx)[1]
        self.assertEqual(r2["status"], "missing")
        self.assertIsNone(r2["page"])
        self.assertIn("never says", r2["claimed_quote"])

    def test_a_misattributed_quote_counts_on_the_page_it_is_on(self):
        found = [{"id": "r3", "page": "A", "quote": "Gamma hides the estimator for k inside."}]
        r3 = verify_locations(self.reqs, found, self.cands, self.idx)[2]
        self.assertEqual((r3["status"], r3["page"], r3["collapsed"]), ("elsewhere", "C", True))

    def test_a_prerequisite_exams_page_is_in_reach_and_every_place_keeps_its_quote(self):
        cands = Candidates(tagged=["A"], linked={"B"}, shown=["A", "B", "C"], prerequisite={"C"})
        found = [{"id": "r3", "page": "C", "quote": "Gamma hides the estimator for k inside."}]
        r3 = verify_locations(self.reqs, found, cands, self.idx)[2]
        self.assertEqual(r3["status"], "prerequisite")
        self.assertEqual(verdict([r3]), "answerable")
        self.assertEqual(r3["places"], [{"page": "C", "collapsed": True,
                                         "quote": "Gamma hides the estimator for k inside."}])

    def test_collapsed_only_if_every_verified_place_is_folded(self):
        found = [{"id": "r1", "places": [{"page": "C", "quote": "Gamma hides the estimator for k inside."},
                                         {"page": "B", "quote": "Beta also teaches the estimator for k here."}]}]
        r1 = verify_locations(self.reqs, found, self.cands, self.idx)[0]
        self.assertEqual((r1["status"], r1["collapsed"]), ("linked", False))

    def test_merge_found_unions_the_passes(self):
        merged = merge_found([{"id": "r1", "places": [{"page": "A", "quote": "x"}]}],
                             [{"id": "r1", "places": [{"page": "B", "quote": "y"}]}, {"id": "r2", "places": []}])
        self.assertEqual({m["id"]: len(m["places"]) for m in merged}, {"r1": 2, "r2": 0})

    def test_verdicts(self):
        self.assertEqual(verdict([{"status": "tagged"}, {"status": "linked"}]), "answerable")
        self.assertEqual(verdict([{"status": "tagged"}, {"status": "elsewhere"}]), "untagged")
        self.assertEqual(verdict([{"status": "elsewhere"}, {"status": "missing"}]), "gap")
        self.assertEqual(verdict([]), "no requirements")


class RealQuestionTests(unittest.TestCase):
    """The whole check on a real MAS-II question, with scripted model replies."""

    SID = "masii-2019s-q4"
    TAUGHT = "$$Z = \\frac{m}{m + k}$$"

    @classmethod
    def setUpClass(cls):
        cls.exam = resolve_exam("MAS-II")
        cls.loader = ContentLoader(cls.exam)
        cls.bank = load_bank(ROOT, cls.exam.bank)

    def reply(self, system: str, prompt: str) -> str:
        if system == REQUIREMENTS_SYSTEM:
            self.assertNotIn("=== PAGE:", prompt, "requirements are listed without seeing any page")
            return json.dumps({"requirements": [
                {"id": "r1", "kind": "formula", "statement": "Z = m/(m+k) for a risk with exposure m.",
                 "concept": "Bühlmann-Straub Credibility", "search": ["credibility", "exposure"]},
                {"id": "r2", "kind": "procedure", "statement": "Multiply the per-exposure estimate by next "
                 "period's exposure.", "concept": "Bühlmann-Straub Credibility", "search": ["exposure"]}]})
        self.assertEqual(system, LOCATE_SYSTEM)
        self.assertIn("=== PAGE: Bühlmann-Straub Credibility ===", prompt)
        self.locates += 1
        return json.dumps({"found": [
            {"id": "r1", "places": [{"page": "Bühlmann-Straub Credibility", "quote": self.TAUGHT}]},
            {"id": "r2", "places": [{"page": "Bühlmann-Straub Credibility",
                                     "quote": "Multiply by the future exposure to get the aggregate estimate."}]}]})

    def test_check_question(self):
        self.locates = 0
        q = self.bank[self.SID]
        rec = check_question(q, self.loader, "solution text", lambda: ScriptedOneShot(self.reply))
        self.assertEqual(rec["verdict"], "gap")
        with open(os.path.join(ROOT, q.path), encoding="utf-8") as fh:
            self.assertEqual(rec["input_hash"], input_hash(fh.read()), "G8 knows what text the check read")
        r1, r2 = rec["requirements"]
        self.assertEqual((r1["status"], r1["page"]), ("tagged", "Bühlmann-Straub Credibility"))
        self.assertEqual(r2["status"], "missing")
        self.assertEqual(self.locates, 2, "a missing item gets one more look")
        self.assertNotIn(self.loader.exam.title, rec["pages_shown"], "the exam page is never a candidate")

    def test_run_and_report(self):
        tmp = tempfile.mkdtemp(prefix="answerability-")
        try:
            self.locates = 0
            results = run_check(self.exam, self.loader, self.bank, tmp, lambda: ScriptedOneShot(self.reply),
                                ids=[self.SID], progress=lambda _: None)
            self.assertEqual(set(results), {self.SID})
            self.assertEqual(read_results(os.path.join(tmp, "results.jsonl"))[self.SID]["verdict"], "gap")
            again = run_check(self.exam, self.loader, self.bank, tmp, lambda: ScriptedOneShot(self.reply),
                              ids=[self.SID], progress=lambda _: None)
            self.assertEqual(self.locates, 2, "a continued run skips questions already checked")
            md = report(self.exam, again, self.loader, "test", served_questions(self.bank)[1])
            for heading in ("# Answerability: Exam MAS-II", "## Gaps, by the page that should teach them",
                            "## Tagging and linking gaps", "## Taught only in a collapsed section",
                            "## Every question"):
                self.assertIn(heading, md)
            self.assertIn("Bühlmann-Straub Credibility.md` — 1 question(s)", md)
        finally:
            shutil.rmtree(tmp, ignore_errors=True)

    def test_a_usage_limit_stops_the_run(self):
        tmp = tempfile.mkdtemp(prefix="answerability-")
        try:
            def limited(system, prompt):
                raise BackendError("You've hit your session limit · resets 12am (UTC)")
            served = sorted(served_questions(self.bank)[0])[:3]
            calls = []
            results = run_check(self.exam, self.loader, self.bank, tmp,
                                lambda: calls.append(1) or ScriptedOneShot(limited), ids=served,
                                progress=lambda _: None)
            self.assertEqual(results, {}, "a question the limit stopped is not recorded as checked")
            self.assertEqual(len(calls), 2, "no question is started after the limit is hit")
            self.assertEqual(read_results(os.path.join(tmp, "results.jsonl")), {})
        finally:
            shutil.rmtree(tmp, ignore_errors=True)

    def test_a_freely_named_concept_lands_on_its_page(self):
        tagged = ["Hierarchical Model", "Linear Mixed Model"]
        self.assertEqual(home_page("Linear Mixed Models", tagged, self.loader), "Linear Mixed Model")
        self.assertEqual(home_page("Bühlmann-Straub Credibility (empirical)", [], self.loader),
                         "Bühlmann-Straub Credibility")
        self.assertEqual(home_page("Linear Mixed Model Fixed Effects Testing", tagged, self.loader),
                         "Linear Mixed Model")
        self.assertIsNone(home_page("Hamiltonian Quux Sampler", tagged, self.loader))

    def test_the_report_counts_verdicts_by_sitting(self):
        results = {self.SID: {"source_id": self.SID, "path": "p", "verdict": "gap", "requirements": [],
                              "tagged_pages": []}}
        md = report(self.exam, results, self.loader, "test", None, {self.SID: "Spring 2019"})
        self.assertIn("## By sitting", md)
        self.assertIn("| Spring 2019 | 1 | 0 | 0 | 1 (100%) |", md)

    def test_served_questions_leave_out_what_a_quiz_never_draws(self):
        served, left_out = served_questions(self.bank)
        self.assertTrue(all(not q.off_syllabus and not q.open_critical for q in served.values()))
        self.assertTrue(any(why == "off syllabus" for why in left_out.values()))


if __name__ == "__main__":
    unittest.main()
