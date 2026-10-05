"""Tests for the syllabus pipeline's extractor and renderer
(scripts/syllabus_extract.py, scripts/syllabus_write.py).

The extractor's parsers are tested on small pieces of laid-out syllabus text
(the PDFs themselves are not committed); the renderer on its naming rules and
on the pages it wrote, which must still say what their syllabus says.

Run: python3 -m unittest discover -s scripts
"""

import json
import os
import sys
import unittest

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import syllabus_extract as se  # noqa: E402
import syllabus_lib as sl  # noqa: E402
import syllabus_write as sw  # noqa: E402
import vault_links as vl  # noqa: E402

TOPIC = """\
2. Topic: Manual Rates (25%-40%)

Learning Objectives

The candidate will understand how to calculate and recommend a manual rate for each of the contracts
described in Learning Objective 1.

Learning Outcomes

The Candidate will be able to:
    a) Identify and evaluate sources of data needed for pricing, including the quality, appropriateness, and
       limitations of each data source
    b) Develop a medical cost trend experience analysis
The Candidate will be able to, for aggregate risk models:
    c) Explain aspects of explainability, in particular:
            •   The connection between ethics and explainability
            •   When a lack of explainability may be acceptable.

                                                                                            Learning
Resources
                                                                                            Outcomes

Group Insurance, Skwire, Daniel D., 8th Edition, 2021
    •   Ch. 20: Pricing of Group Insurance                                                  2a, 2c
    •   Ch. 21: Estimating Medical Claim Costs                                              2a, 2d

The Role of the Actuary in Self-Insurance, May 2018, Sections 4, 5 & Appendices              3a, 3d
(excluding 4.1.1-4.1.5)

                                                                                        1.1a, 1.2a, 1.2b,
CIA Practice Resource Document: Risk Appetite, Nov 2021
                                                                                        1.2d
"""


class ExtractTest(unittest.TestCase):
    def setUp(self):
        self.topic = se.parse_topics(TOPIC.split("\n"))[0]

    def test_topic_title_and_weight(self):
        self.assertEqual(self.topic["title"], "Manual Rates")
        self.assertEqual(self.topic["weight"], [25, 40])

    def test_objective_is_reflowed_verbatim(self):
        self.assertEqual(self.topic["objective"],
                         "The candidate will understand how to calculate and recommend a manual rate for "
                         "each of the contracts described in Learning Objective 1.")

    def test_outcomes_bullets_and_lead_ins(self):
        out = self.topic["outcomes"]
        self.assertEqual([o["letter"] for o in out], ["a", "b", "c"])
        self.assertTrue(out[0]["text"].endswith("limitations of each data source"))
        self.assertEqual(out[2]["group"], "The Candidate will be able to, for aggregate risk models:")
        self.assertEqual(out[2]["bullets"][1], "When a lack of explainability may be acceptable.")

    def test_resource_table(self):
        rows = self.topic["resources"]
        self.assertEqual(rows[0]["citation"], "Group Insurance, Skwire, Daniel D., 8th Edition, 2021")
        self.assertEqual(rows[0]["parts"][1], {"text": "Ch. 21: Estimating Medical Claim Costs", "codes": "2a, 2d"})
        # a wrapped citation, and codes centred on a tall cell
        self.assertTrue(rows[1]["citation"].endswith("(excluding 4.1.1-4.1.5)"))
        self.assertEqual(rows[1]["codes"], "3a, 3d")
        self.assertEqual(rows[2]["codes"], "1.1a, 1.2a, 1.2b, 1.2d")

    def test_weights_with_decimals_and_none(self):
        self.assertEqual(se._weight("12.5-17.5%"), [12.5, 17.5])
        self.assertEqual(se._weight("Included in Topics 2, 3, 5 & 6"), [0, 0])

    def test_wrapped_hyphen_is_kept(self):
        self.assertEqual(se.join_wrapped("a simple European-", "style derivative"), "a simple European-style derivative")


class NamingTest(unittest.TestCase):
    def test_exam_identity(self):
        ident = sw.exam_identity({"title": "GH 201-C – Valuation and Regulation, Canada", "wiki_id": "gh-201c"})
        self.assertEqual((ident["exam_id"], ident["name"]), ("GH-201C", "Valuation and Regulation, Canada"))
        ident = sw.exam_identity({"title": "Fundamentals of Actuarial Mathematics Exam", "wiki_id": "fam-1"})
        self.assertEqual((ident["exam_id"], ident["name"]), ("FAM", "Fundamentals of Actuarial Mathematics"))

    def test_concept_names(self):
        self.assertEqual(sw.title_case(sw.singular_phrase("risk assessment mechanisms")), "Risk Assessment Mechanism")
        self.assertEqual(sw.singular_phrase("liabilities"), "liability")
        self.assertEqual(sw.singular_phrase("loss analysis"), "loss analysis")
        self.assertEqual(sw.clean_name("A/B: 70% of"), "A-B - 70 percent of")

    def test_reading_names(self):
        shelf = sw.Shelf(vl.Vault())
        self.assertEqual(sw.reading_target("Group Insurance, Skwire, Daniel D., 8th Edition, 2021", shelf),
                         "Group Insurance (Skwire - 2021)")
        self.assertEqual(sw.reading_target("Regression Modeling with Actuarial and Financial Applications, "
                                           "Edward W. Frees, 2010, New York: Cambridge.", shelf),
                         "Regression Modeling with Actuarial and Financial Applications (Frees - 2010)")
        self.assertEqual(sw.reading_target("GH101-102-25: Types of COB and Impact on Medical Claim Data", shelf),
                         "GH101-102-25 - Types of COB and Impact on Medical Claim Data")
        # an existing Resources/Books page wins
        self.assertEqual(sw.reading_target("ASOP 12: Risk Classification (excluding Appendices)", shelf),
                         "ASOP 12 - Risk Classification (ASB - 2005)")


class VaultTest(unittest.TestCase):
    """Every page the pipeline wrote still says what its syllabus says."""

    def test_generated_pages_are_faithful(self):
        vault = vl.Vault()
        for exam in vl.load_catalog():
            path = os.path.join(vl.REPO_ROOT, exam["page"])
            page = sl.parse_exam_page(path)
            if "syllabus:" not in page.frontmatter:
                continue
            with self.subTest(page=exam["page"]):
                self.assertEqual(sw.fidelity_problems(exam["page"], page, vault), [])
                with open(os.path.join(sw.SYLLABUS_DIR, exam["wiki_id"], "syllabus.json"), encoding="utf-8") as fh:
                    data = json.load(fh)
                self.assertEqual(len(page.sections), len(data["topics"]))
                self.assertEqual(sum(len(s.objectives) for s in page.sections),
                                 sum(len(t["outcomes"]) for t in data["topics"]))


if __name__ == "__main__":
    unittest.main()
