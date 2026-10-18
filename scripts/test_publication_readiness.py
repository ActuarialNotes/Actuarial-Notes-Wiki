"""Tests for scripts/publication_readiness.py — the gates an exam passes to leave Beta.

Run: python3 -m unittest discover -s scripts
"""

import os
import sys
import unittest

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import publication_readiness as pr  # noqa: E402
import vault_links as vl  # noqa: E402


def link(text: str) -> vl.Link:
    return next(vl.iter_links(text))


class RenamedTest(unittest.TestCase):
    def test_bare_link_is_not_renamed(self):
        self.assertFalse(pr.renamed(link("[[Premium Audit]]"), "Premium Audit"))

    def test_text_naming_the_page_with_a_facet_is_not_renamed(self):
        self.assertFalse(pr.renamed(link("[[Premium Audit|Premium Auditing Process]]"), "Premium Audit"))
        self.assertFalse(pr.renamed(link("[[Data Visualization|Plots]]"), "Plot"))
        self.assertFalse(pr.renamed(link("[[Intentional Tort|Intentional Torts Part 1]]"), "Intentional Tort"))

    def test_text_shortening_the_page_name_is_not_renamed(self):
        self.assertFalse(pr.renamed(link("[[Probability Distributions|distributions]]"), "Probability Distributions"))

    def test_text_naming_something_else_is_renamed(self):
        self.assertTrue(pr.renamed(link("[[Commercial General Liability|CGL Coverage B]]"), "Commercial General Liability"))
        self.assertTrue(pr.renamed(link("[[Tidy Data|Dataframes]]"), "Tidy Data"))

    def test_an_acronym_of_the_page_name_is_not_renamed(self):
        self.assertFalse(pr.renamed(link("[[Defined Benefit Plan|DB plan]]"), "Defined Benefit Plan"))
        self.assertFalse(pr.renamed(link("[[Defined Benefit Plan|DB]]"), "Defined Benefit Plan"))
        self.assertTrue(pr.renamed(link("[[Defined Benefit Plan|DB funding]]"), "Defined Benefit Plan"))

    def test_lives_names_a_life(self):
        self.assertFalse(pr.renamed(link("[[Joint Life|joint lives]]"), "Joint Life"))

    def test_parenthetical_in_the_page_name_is_ignored(self):
        self.assertFalse(pr.renamed(link("[[Central Limit Theorem (CLT)|central limit theorem]]"), "Central Limit Theorem (CLT)"))


class AssessTest(unittest.TestCase):
    """Smoke test against the real vault: every gate is reported for every CAS exam."""

    @classmethod
    def setUpClass(cls):
        cls.vault, cls.tables, cls.catalog = vl.Vault(), vl.load_aliases(), vl.load_catalog()

    def test_every_cas_exam_reports_every_gate(self):
        for exam in self.catalog:
            if exam["body"] != "CAS":
                continue
            with self.subTest(exam=exam["page"]):
                r = pr.assess(exam, self.vault, self.tables)
                self.assertEqual(set(r["failing"]), set(pr.GATES))
                self.assertEqual(r["ready"], not any(r["failing"].values()))
                self.assertGreater(r["concepts"], 0)

    def test_an_exam_with_no_bank_cannot_cover_its_concepts(self):
        exam = dict(vl.exam_for_id("6u-1", self.catalog), bank=None)
        r = pr.assess(exam, self.vault, self.tables)
        self.assertEqual(len(r["no_question"]), r["concepts"])
        self.assertTrue(r["failing"]["questions"])

    def test_ready_exams_are_not_assessed_as_failing_the_written_gate(self):
        # Exam P and FM are `ready`: every link on their pages lands and no concept is a stub.
        for key in ("p-1", "fm-2"):
            with self.subTest(exam=key):
                r = pr.assess(vl.exam_for_id(key, self.catalog), self.vault, self.tables)
                self.assertFalse(r["failing"]["written"], r["stubs"])





def result(status: str, *failing: str) -> dict:
    return {"exam": f"Exam X ({status})", "wiki_id": "x-1", "status": status,
            "failing": {g: g in failing for g in pr.GATES}}


class HoldTest(unittest.TestCase):
    def test_a_ready_exam_failing_a_structural_gate_is_an_error(self):
        for gate in pr.STRUCTURAL:
            with self.subTest(gate=gate):
                errors, warnings = pr.hold([result("ready", gate)])
                self.assertEqual(len(errors), 1)
                self.assertEqual(warnings, [])

    def test_a_ready_exam_owed_a_fact_check_is_a_warning(self):
        errors, warnings = pr.hold([result("ready", "page", "checked", "sources", "bank")])
        self.assertEqual(errors, [])
        self.assertEqual(len(warnings), 4)

    def test_a_beta_exam_below_the_beta_bar_only_warns(self):
        errors, warnings = pr.hold([result("beta", "specific", "questions", "checked")])
        self.assertEqual(errors, [])
        self.assertEqual(len(warnings), 2)

    def test_a_development_exam_is_not_held(self):
        self.assertEqual(pr.hold([result("development", *pr.GATES)]), ([], []))

    def test_a_ready_exam_passing_every_gate_is_silent(self):
        self.assertEqual(pr.hold([result("ready")]), ([], []))


if __name__ == "__main__":
    unittest.main()
