"""Tests for scripts/vault_links.py — the shared link resolver.

Run: python3 -m unittest discover -s scripts
"""

import json
import os
import sys
import unittest

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import vault_links as vl  # noqa: E402

FIXTURE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fixtures", "link_resolution.json")


class SharedFixtureTest(unittest.TestCase):
    """The cases quiz/src/lib/examCatalog.test.ts asserts against slugForLink."""

    def setUp(self):
        with open(FIXTURE, encoding="utf-8") as fh:
            self.cases = json.load(fh)

    def test_question_link_slugs(self):
        for case in self.cases["question_links"]:
            with self.subTest(link=case["link"]):
                self.assertEqual(vl.question_link_slug(case["link"]), case["slug"])

    def test_wiki_link_names(self):
        for case in self.cases["wiki_links"]:
            with self.subTest(link=case["link"]):
                links = list(vl.iter_links(case["link"]))
                self.assertEqual([l.name for l in links], [case["name"]])


class ResolveTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.vault = vl.Vault()

    def test_exact_case_and_missing(self):
        self.assertEqual(self.vault.resolve("Deductible")[0], "exact")
        self.assertEqual(self.vault.resolve("deductible")[0], "case")
        self.assertEqual(self.vault.resolve("Stress Testing\\")[0], "missing")
        self.assertEqual(self.vault.resolve("Resources/Books/Risk and Insurance (SOA)")[0], "exact")

    def test_embeds_and_attachments_are_not_links(self):
        text = "![[Media/x.png]] [[Media/y.svg]] ![[Some Note]] [[Real]]"
        self.assertEqual([l.name for l in vl.iter_links(text)], ["Real"])

    def test_namesakes_follow_the_exam(self):
        self.assertEqual(vl.canonical_page("deductibles", self.vault, "5-1"), "Deductible Rating")
        self.assertEqual(vl.canonical_page("Deductible", self.vault, "p-1"), "Deductible")
        self.assertEqual(
            vl.namesake_conflicts(["Deductible", "Loss Ratio"], "5-1"),
            [("Deductible", "Deductible Rating")],
        )
        self.assertEqual(vl.namesake_conflicts(["Deductible"], "p-1"), [])

    def test_aliases_and_page_names(self):
        self.assertEqual(vl.canonical_page("GLM", self.vault), "Generalized Linear Model")
        self.assertEqual(vl.canonical_page("exposure base", self.vault), "Exposure Base")
        self.assertIsNone(vl.canonical_page("no such concept at all", self.vault))

    def test_every_alias_and_namesake_lands_exactly(self):
        tables = vl.load_aliases()
        targets = set(tables["aliases"].values())
        for ns in tables["namesakes"].values():
            targets.update(ns.values())
        for t in sorted(targets):
            with self.subTest(target=t):
                self.assertEqual(self.vault.resolve(t)[0], "exact")
                self.assertTrue(self.vault.is_concept(t))


class CatalogTest(unittest.TestCase):
    def test_every_exam_page_is_catalogued(self):
        pages = sorted(f for f in os.listdir(vl.REPO_ROOT) if f.startswith("Exam ") and f.endswith(".md"))
        self.assertEqual(sorted(e["page"] for e in vl.load_catalog()), pages)

    def test_lookup_by_any_key(self):
        for key in ("5-1", "5", "exam-5", "Exam 5 (CAS)", "Exam 5 (CAS).md"):
            with self.subTest(key=key):
                self.assertEqual(vl.exam_for_id(key)["page"], "Exam 5 (CAS).md")

    def test_banks_exist(self):
        for e in vl.load_catalog():
            if e["bank"]:
                self.assertTrue(os.path.isdir(os.path.join(vl.REPO_ROOT, "questions", e["bank"])), e["bank"])


if __name__ == "__main__":
    unittest.main()
