"""The vault's vocabularies against the Actuarial Ontology's lists.

    python3 -m unittest scripts/test_ontology_lists.py
"""

import os
import sys
import unittest

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import assumption_lint as al  # noqa: E402
import ontology_lists as ol  # noqa: E402
import resource_folders as rf  # noqa: E402
import resource_lint as rl  # noqa: E402
import timeline_lint as tl  # noqa: E402
import verify_lib  # noqa: E402


class ListsTest(unittest.TestCase):
    def test_every_entry_has_an_id_and_a_label(self):
        for name, items in ol.LISTS.items():
            self.assertTrue(items, name)
            for entry in items:
                self.assertTrue(entry["id"] and entry["label"], f"{name}: {entry}")

    def test_a_spelling_names_one_entry(self):
        # Quantity kinds are left out: the bank's `Kind` is coarser than the
        # ontology's, so `capital-ratio` is three of them.
        for name in ("Jurisdiction", "LineOfBusiness", "DocumentType", "Unit", "FactCheckStatus"):
            seen = [n for entry in ol.entries(name) for n in entry["notations"]]
            self.assertEqual(len(seen), len(set(seen)), name)

    def test_entry_for(self):
        self.assertEqual(ol.entry_for("Jurisdiction", "CA-ON")["label"], "Ontario")
        self.assertEqual(ol.entry_for("Jurisdiction", "UK")["id"], "GB")
        self.assertEqual(ol.entry_for("LineOfBusiness", "Auto-Personal")["id"], "PersonalAuto")
        self.assertIsNone(ol.entry_for("LineOfBusiness", "Personal Auto"))


class VaultVocabularyTest(unittest.TestCase):
    def test_resource_types_are_the_document_types(self):
        self.assertEqual(set(rl.TYPES), set(ol.notations("DocumentType")))
        self.assertEqual(set(rl.TYPES), set(rf.TYPE_FOLDER))

    def test_every_assumption_kind_is_a_quantity_kind(self):
        kinds = set(al.KINDS) - {"fact"}
        self.assertLessEqual(kinds, set(ol.notations("QuantityKind")))

    def test_every_assumption_unit_is_a_unit(self):
        units = {u for allowed in al.KINDS.values() for u in allowed} - {""}
        self.assertLessEqual(units, set(ol.notations("Unit")))

    def test_fact_check_statuses_are_the_ontologys(self):
        self.assertEqual(set(verify_lib.STATUSES), set(ol.notations("FactCheckStatus")))


class TimelineLintTest(unittest.TestCase):
    PAGE = '---\nid: reg-ca-on-2010-x\ntype: regulation\njurisdiction: "{j}"\nlob: {lob}\n---\n\nBody.\n'

    def test_listed_values_pass(self):
        text = self.PAGE.format(j="CA-ON", lob='["Auto-Personal", "Auto-Commercial"]')
        self.assertEqual(tl.lint_text("x.md", text), [])

    def test_an_unlisted_jurisdiction_fails(self):
        errors = tl.lint_text("x.md", self.PAGE.format(j="Ontario", lob='["P&C"]'))
        self.assertEqual(len(errors), 1)
        self.assertIn("jurisdiction 'Ontario'", errors[0])

    def test_an_unlisted_line_fails(self):
        errors = tl.lint_text("x.md", self.PAGE.format(j="CA", lob='["P&C", "personal auto"]'))
        self.assertEqual(len(errors), 1)
        self.assertIn("lob 'personal auto'", errors[0])

    def test_lob_must_be_a_list(self):
        errors = tl.lint_text("x.md", self.PAGE.format(j="CA", lob='"P&C"'))
        self.assertEqual(len(errors), 1)

    def test_a_resource_page_is_not_a_dated_page(self):
        text = '---\nTitle: "X"\nType: "Guideline"\njurisdiction: "Nowhere"\n---\n'
        self.assertEqual(tl.lint_text("x.md", text), [])

    def test_every_dated_page_lints_clean(self):
        errors = []
        for rel in tl.dated_pages():
            with open(os.path.join(tl.ROOT, rel), encoding="utf-8") as fh:
                errors += tl.lint_text(rel, fh.read())
        self.assertEqual(errors, [])


class AssumptionJurisdictionTest(unittest.TestCase):
    def test_the_lint_reads_the_ontologys_jurisdictions(self):
        self.assertIn("CA-AB", al.JURISDICTIONS)
        self.assertNotIn("CA-XX", al.JURISDICTIONS)


if __name__ == "__main__":
    unittest.main()
