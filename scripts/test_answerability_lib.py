"""Tests for scripts/answerability_lib.py — G8, the answerability gate, and the record it reads.

Run: python3 -m unittest discover -s scripts
"""

import copy
import os
import shutil
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import answerability_lib as al  # noqa: E402
import vault_links as vl  # noqa: E402

PAGE = """---
verification:
  status: unverified
---
A **credibility weight** is $Z = \\frac{m}{m + k}$.

> [!example]- Worked example
> Multiply by next year's exposure to get the total.
"""

QUESTION = """---
id: "t-1"
off_syllabus: false
wiki_link:
  - Concepts/Credibility+Weight
answer: "A"
---
What is Z?

## Explanation
Z = m/(m+k).
"""

EXAM = """# Exam T

> [!question]- Prerequisite knowledge
>
> - All concepts from [[Exam S (CAS)|Exam S]].
> - [[Calculus]] at a thorough level.

> [!example]- A. Credibility {100%}
> 1. [[Credibility Weight]]
"""

EXAM_S = """# Exam S

> [!example]- A. Foundations {100%}
> 1. [[Expected Value]]
"""


class Vault:
    """A throwaway vault: two exam pages, a few concepts, one question."""

    def __init__(self):
        self.root = Path(tempfile.mkdtemp(prefix="answerability-lib-"))
        for rel, text in {
            "Exam T (CAS).md": EXAM,
            "Exam S (CAS).md": EXAM_S,
            "Concepts/Credibility Weight.md": PAGE + "\nSee [[Buhlmann Credibility]].\n",
            "Concepts/Buhlmann Credibility.md": "The **Bühlmann k** is the ratio EPV / VHM of the risks.\n",
            "Concepts/Expected Value.md": "The **expected value** is the probability-weighted mean of X.\n",
            "Concepts/Calculus.md": "An **integral** sums a function's values over an interval.\n",
            "Concepts/Unrelated.md": "A **pure premium** is losses divided by exposure units.\n",
            "Guides/How to Study.md": "Read the pages.\n",
            "questions/exam-t/t-1.md": QUESTION,
        }.items():
            path = self.root / rel
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(text, encoding="utf-8")
        self.exam = {"page": "Exam T (CAS).md", "wiki_id": "t-1", "bank": "exam-t"}

    def close(self):
        shutil.rmtree(self.root, ignore_errors=True)


def requirement(rid, status, places=(), **extra):
    return {"id": rid, "kind": "fact", "statement": f"statement {rid}", "concept": "", "status": status,
            "places": [{"page": p, "quote": q} for p, q in places], **extra}


class PageIndexTests(unittest.TestCase):
    def test_a_quote_matches_through_emphasis_and_whitespace(self):
        idx = al.PageIndex.build(PAGE)
        self.assertEqual(idx.find("A credibility   weight is"), (True, False))
        self.assertEqual(idx.find("Multiply by next year's exposure"), (True, True))
        self.assertEqual(idx.find("status: unverified"), (False, False), "frontmatter is not page text")
        self.assertEqual(idx.find("Z ="), (False, False), "too short to prove anything")

    def test_a_quote_cut_short_by_a_report_still_matches(self):
        self.assertTrue(al.PageIndex.build(PAGE).find("A **credibility weight** is $Z = \\frac{m}{…")[0])


class InputHashTests(unittest.TestCase):
    def test_a_retag_leaves_the_hash_and_a_reworded_stem_changes_it(self):
        retagged = QUESTION.replace("Credibility+Weight", "Buhlmann+Credibility")
        self.assertEqual(al.input_hash(QUESTION), al.input_hash(retagged))
        self.assertNotEqual(al.input_hash(QUESTION), al.input_hash(QUESTION.replace("What is Z?", "Find Z.")))


class QuestionFrontmatterTests(unittest.TestCase):
    def test_tags_id_and_served(self):
        self.assertEqual(al.question_tags(QUESTION), ["Credibility Weight"])
        self.assertEqual(al.question_id(QUESTION), "t-1")
        self.assertTrue(al.is_served(QUESTION))
        self.assertFalse(al.is_served(QUESTION.replace("off_syllabus: false", "off_syllabus: true")))


class GateTests(unittest.TestCase):
    def setUp(self):
        self.v = Vault()
        self.text = (self.v.root / "questions/exam-t/t-1.md").read_text(encoding="utf-8")
        self.record = al.new_record(self.v.exam)
        self.record["questions"]["t-1"] = {
            "path": "questions/exam-t/t-1.md", "run": "test", "input_hash": al.input_hash(self.text),
            "verdict": "gap", "requirements": [
                requirement("r1", "tagged", [("Credibility Weight", "A credibility weight is $Z")]),
                requirement("r2", "linked", [("Buhlmann Credibility", "is the ratio EPV / VHM")]),
                requirement("r3", "prerequisite", [("Expected Value", "probability-weighted mean of X")]),
                requirement("r4", "elsewhere", [("Unrelated", "losses divided by exposure units")]),
                requirement("r5", "missing"),
            ]}

    def tearDown(self):
        self.v.close()

    def assess(self, record=None):
        return al.assess_bank(self.v.exam, self.v.root, record or self.record)

    def test_prerequisites_are_read_off_the_callout_transitively(self):
        pages = al.Pages(self.v.exam, self.v.root)
        self.assertEqual(pages.prerequisite_pages(), {"Expected Value", "Calculus"})
        self.assertEqual(pages.objective_concepts("Exam T (CAS)"), ["Credibility Weight"])

    def test_items_in_reach_pass_and_the_rest_stay_open(self):
        r = self.assess()
        self.assertFalse(r["passes"])
        self.assertEqual(r["checked"], 1)
        self.assertEqual({i["item"]: i["state"] for i in r["open"]}, {"t-1:r4": "elsewhere", "t-1:r5": "missing"})
        self.assertEqual(next(i for i in r["open"] if i["state"] == "elsewhere")["pages"], ["Unrelated"])

    def test_resolving_every_item_passes_the_gate(self):
        with self.assertRaises(ValueError):
            al.resolve(self.record, self.v.exam, "t-1:r5", page="Credibility Weight", quote="not on the page at all",
                       note="x", root=self.v.root)
        with self.assertRaises(ValueError):
            al.resolve(self.record, self.v.exam, "t-1:r5", page="Exam T (CAS)", quote="Prerequisite knowledge",
                       note="x", root=self.v.root)
        with self.assertRaises(ValueError):
            al.resolve(self.record, self.v.exam, "t-1:r5", not_required=True, note=" ", root=self.v.root)
        al.resolve(self.record, self.v.exam, "t-1:r5", page="Credibility Weight",
                   quote="Multiply by next year's exposure", note="written from the reading", root=self.v.root)
        al.resolve(self.record, self.v.exam, "t-1:r4", not_required=True, note="data the question gives",
                   root=self.v.root)
        self.assertTrue(self.assess()["passes"])

    def test_a_retag_closes_an_untagged_item(self):
        path = self.v.root / "questions/exam-t/t-1.md"
        path.write_text(self.text.replace("  - Concepts/Credibility+Weight\n",
                                          "  - Concepts/Credibility+Weight\n  - Concepts/Unrelated\n"), encoding="utf-8")
        self.assertEqual([i["item"] for i in self.assess()["open"]], ["t-1:r5"])

    def test_a_deleted_passage_reopens_its_item(self):
        (self.v.root / "Concepts/Buhlmann Credibility.md").write_text("Rewritten.\n", encoding="utf-8")
        self.assertIn(("t-1:r2", "gone"), {(i["item"], i["state"]) for i in self.assess()["open"]})

    def test_a_dropped_link_takes_the_page_out_of_reach(self):
        (self.v.root / "Concepts/Credibility Weight.md").write_text(PAGE, encoding="utf-8")
        self.assertIn(("t-1:r2", "elsewhere"), {(i["item"], i["state"]) for i in self.assess()["open"]})

    def test_a_reworded_question_goes_back_to_the_check(self):
        path = self.v.root / "questions/exam-t/t-1.md"
        path.write_text(self.text.replace("What is Z?", "Find Z."), encoding="utf-8")
        r = self.assess()
        self.assertEqual((r["changed"], r["checked"], r["open"]), (["t-1"], 0, []))
        self.assertFalse(r["passes"])

    def test_a_served_question_with_no_entry_fails_and_no_record_fails(self):
        record = copy.deepcopy(self.record)
        del record["questions"]["t-1"]
        self.assertEqual(self.assess(record)["not_checked"], ["t-1"])
        r = al.assess_bank(self.v.exam, self.v.root, None)
        self.assertEqual((r["recorded"], r["not_checked"], r["passes"]), (False, ["t-1"], False))

    def test_an_exam_with_no_bank_passes_vacuously(self):
        self.assertTrue(al.assess_bank(dict(self.v.exam, bank=None), self.v.root)["passes"])

    def test_merge_replaces_an_entry_and_keeps_a_not_required_call(self):
        al.resolve(self.record, self.v.exam, "t-1:r4", not_required=True, note="data the question gives",
                   root=self.v.root)
        result = {"path": "questions/exam-t/t-1.md", "verdict": "gap", "requirements": [
            {**requirement("r1", "elsewhere"), "statement": "statement r4",
             "places": [{"page": "Unrelated", "collapsed": False, "quote": "losses divided by exposure units"}]},
            requirement("r2", "missing")]}
        al.merge_results(self.record, {"t-1": result}, "run-2", {"t-1": "sha256:x"})
        entry = self.record["questions"]["t-1"]
        self.assertEqual((entry["run"], entry["input_hash"]), ("run-2", "sha256:x"))
        self.assertEqual(entry["requirements"][0]["resolution"]["kind"], "not-required")
        self.assertNotIn("resolution", entry["requirements"][1])
        self.assertEqual(entry["requirements"][0]["places"], [{"page": "Unrelated",
                                                               "quote": "losses divided by exposure units"}])


class ImportReportTests(unittest.TestCase):
    REPORT = """# Answerability: Exam T

## Gaps, by the page that should teach them

### `Concepts/Credibility Weight.md` — 1 question(s)

- `t-1` (procedure): Multiply the per-exposure estimate by next period's exposure to get the total estimate.

## Every question

<details><summary><code>t-1</code> · gap</summary>

Tagged pages: Credibility Weight

| Item | Kind | Status | Where |
|---|---|---|---|
| Z = m/(m+k) | formula | tagged | Credibility Weight: “A **credibility weight** is $Z = \\\\| m…” |
| Multiply the per-exposure estimate by next period's exposure… | procedure | missing |  |

</details>
"""

    def test_a_report_rebuilds_the_record(self):
        v = Vault()
        try:
            rec = al.import_report(self.REPORT, v.exam, "run-1", v.root)
            entry = rec["questions"]["t-1"]
            self.assertEqual(entry["verdict"], "gap")
            self.assertEqual(entry["input_hash"], al.input_hash(QUESTION))
            r1, r2 = entry["requirements"]
            self.assertEqual(r1["places"], [{"page": "Credibility Weight",
                                             "quote": "A **credibility weight** is $Z = | m"}])
            self.assertEqual(r2["statement"], "Multiply the per-exposure estimate by next period's exposure to get "
                                              "the total estimate.")
            self.assertEqual(r2["concept"], "Credibility Weight")
        finally:
            v.close()


class RealRecordTests(unittest.TestCase):
    """Every committed record holds up against the vault: each place it cites names a page that exists."""

    def test_committed_records_name_real_banks_and_pages(self):
        catalog = vl.load_catalog()
        for path in sorted(al.RECORD_DIR.glob("*.json")):
            with self.subTest(record=path.name):
                rec = al.load_record(path.stem)
                exam = vl.exam_for_id(rec["bank"], catalog)
                self.assertIsNotNone(exam, f"{rec['bank']} is not a bank in the catalog")
                self.assertEqual(exam["page"][:-3], rec["exam"])
                pages = al.Pages(exam)
                for sid, entry in rec["questions"].items():
                    for req in entry.get("requirements") or []:
                        self.assertIn(req["status"], al.TIERS, f"{sid}:{req['id']}")
                        for p in req.get("places") or []:
                            self.assertIn(p["page"], pages.paths, f"{sid}:{req['id']} cites {p['page']!r}")

    def test_mas_ii_assumes_mas_i_and_its_prerequisites(self):
        exam = vl.exam_for_id("MAS-II", vl.load_catalog())
        pre = al.Pages(exam).prerequisite_pages()
        for page in ("Generalized Linear Model", "Linear Algebra", "Bayes Theorem", "Present Value"):
            self.assertIn(page, pre)


if __name__ == "__main__":
    unittest.main()
