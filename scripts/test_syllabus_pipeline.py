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


LEAD_IN_TOPIC = """\
2. Topic: Actuarial Assumptions (15%-25%)

Learning Objectives

The candidate will understand how to analyze/synthesize the factors that go into selection of actuarial
assumptions used in pension valuations

Learning Outcomes

Given a context, including valuations for specific purposes (funding, accounting, termination/windup) and for
different types of plans (single employer, multi-employer, open, closed, public), the Candidate will be able
to:
    a) Evaluate appropriateness of current assumptions

                                                                                            Learning
Resources
                                                                                            Outcomes

Economic Scenario Generators: A Practical Guide, SOA, Jul 2016, Ch. 1, 2, 4.1-4.3, 5, 6,
7.1-7.3, 8                                                                                  2a. 2b

IAA Risk Book: Reinsurance, Insurance Regulation Committee, International Actuarial          6a, c-d, f
Association, May 2023, section 9
"""


class ExtractQuirksTest(unittest.TestCase):
    """Three syllabi the parser once misread (RET 201, CP 312, GI 201)."""

    def setUp(self):
        self.topic = se.parse_topics(LEAD_IN_TOPIC.split("\n"))[0]

    def test_a_long_lead_in_heads_the_outcomes_not_the_objective(self):
        self.assertTrue(self.topic["objective"].endswith("used in pension valuations"))
        self.assertTrue(self.topic["outcomes"][0]["group"].startswith("Given a context"))
        self.assertTrue(self.topic["outcomes"][0]["group"].endswith("the Candidate will be able to:"))

    def test_codes_with_a_full_stop_or_bare_letters_stay_out_of_the_citation(self):
        rows = self.topic["resources"]
        self.assertEqual(rows[0]["citation"],
                         "Economic Scenario Generators: A Practical Guide, SOA, Jul 2016, Ch. 1, 2, 4.1-4.3, 5, 6, 7.1-7.3, 8")
        self.assertEqual(rows[0]["codes"], "2a. 2b")
        self.assertEqual(rows[1]["citation"], "IAA Risk Book: Reinsurance, Insurance Regulation Committee, "
                                              "International Actuarial Association, May 2023, section 9")
        self.assertEqual(rows[1]["codes"], "6a, c-d, f")


def _line(x, text, size=9, bold=False, page=5, y=0):
    return {"x": x, "y": y, "size": size, "bold": bold, "text": text, "page": page}


class CiaTest(unittest.TestCase):
    """The CIA's syllabi, read by type and column (the PDFs aren't committed)."""

    def test_exam_topics(self):
        lines = [
            _line(72, "The aim of this exam is for candidates to develop the following skills:"),
            _line(72, "Understand the main principles and techniques of pricing that are relevant to P&C insurance,"),
            _line(72, "including techniques to estimate a technical price."),
            _line(78, "1. Principal terms", bold=True),
            _line(96, "1."),
            _line(114, "Define the principal terms used in pricing P&C insurance products. (A1)"),
            _line(78, "3. Reporting of pension, post-employment benefits, and post-retirement benefits for financial statem", bold=True),
            _line(78, "and proxy circular purposes (25%)", bold=True),
            _line(96, "4."),
            _line(114, "Calculate and evaluate estimates of unpaid claims using the following"),
            _line(114, "techniques: (C5)"),
            _line(132, "a."),
            _line(150, "Development;"),
            _line(132, "c."),
            _line(150, "Describe the following types of stochastic techniques: (B2)"),
            _line(170, "i. Analytic; and"),
            _line(96, "10. Create appropriate data-validation processes. (C6)"),
        ]
        aim, topics = se._cia_exam_topics(lines)
        self.assertEqual(aim, ["The aim of this exam is for candidates to develop the following skills:",
                               "- Understand the main principles and techniques of pricing that are relevant to "
                               "P&C insurance, including techniques to estimate a technical price."])
        self.assertEqual([(t["title"], t["weight_raw"]) for t in topics], [
            ("Principal terms", None),
            ("Reporting of pension, post-employment benefits, and post-retirement benefits for financial "
             "statem and proxy circular purposes", "25%"),
        ])
        self.assertEqual(topics[0]["weight"], [0, 0])     # examined inside the other topics: {0%}
        obj = topics[1]["outcomes"]
        self.assertEqual(obj[0]["text"], "Calculate and evaluate estimates of unpaid claims using the following techniques: (C5)")
        self.assertEqual(obj[0]["bullets"], ["a. Development;", "c. Describe the following types of stochastic "
                                             "techniques: (B2)", "\ti. Analytic; and"])
        self.assertEqual((obj[1]["num"], obj[1]["text"]), (10, "Create appropriate data-validation processes. (C6)"))

    def test_acia_module_topics(self):
        lines = [
            _line(72, "A. Introduction and actuarial communications", size=12),
            _line(72, "Description: The first portion of the module introduces the profession;", bold=True),
            _line(72, "it explains the history of the profession."),
            _line(72, "Content and learning objectives:", bold=True),
            _line(90, "1."),
            _line(108, "What it means to be an actuary in Canada"),
            _line(122, "a."),
            _line(140, "Define the word “actuary” and what it means to be an actuary in"),
            _line(140, "Canada."),
        ]
        [topic] = se._acia_module_topics(lines)
        self.assertEqual(topic["objective"], "The first portion of the module introduces the profession; "
                                             "it explains the history of the profession.")
        [o] = topic["outcomes"]
        self.assertEqual((o["letter"], o["group"]), ("a", "1. What it means to be an actuary in Canada"))
        self.assertEqual(o["text"], "Define the word “actuary” and what it means to be an actuary in Canada.")

    def test_reading_cell(self):
        cell = se._reading_cell("Loss Models: From Data to Decisions, 5th Edition Authors: Stuart A. Klugman, "
                                "Harry H. Panjer, Gordon E. Willmot ISBN: 978-1-119-52378-9 Chapter 6")
        self.assertEqual(cell, {"title": "Loss Models: From Data to Decisions, 5th Edition",
                                "authors": "Stuart A. Klugman, Harry H. Panjer, Gordon E. Willmot",
                                "isbn": "978-1-119-52378-9", "assign": "Chapter 6"})
        self.assertIsNone(se._reading_cell("Background"))
        self.assertIsNone(se._reading_cell("N/A"))

    def test_naming(self):
        exam = {"body": "CIA", "code": "F1PC", "name": "Pricing", "title": "Exam F1PC: Pricing"}
        module = {"body": "CIA", "code": "PC-M1", "name": "Principles and practice of insurance", "title": ""}
        self.assertEqual(sw.page_name(exam), "Exam F1PC (CIA).md")
        self.assertEqual(sw.exam_identity(module)["code"], "PC Module 1")
        self.assertEqual(sw.cia_source_page({"source_title": "FCIA Syllabus – Property and casualty track",
                                             "source_date": "2025-10-30"}),
                         "FCIA Syllabus – Property and casualty track (CIA - 2025)")

    def test_reading_targets(self):
        isbns = {"9781119523789": "Loss Models - From Data to Decisions (Klugman - 2019)"}
        self.assertEqual(sw.cia_reading_target({"citation": "Loss Models", "isbn": "978-1-119-52378-9"}, isbns),
                         "Loss Models - From Data to Decisions (Klugman - 2019)")
        self.assertEqual(sw.cia_reading_target({"citation": "ACIA Module 2", "isbn": None}, isbns), "")
        self.assertEqual(sw.cia_reading_target({"citation": "Derivatives Markets, 3rd Edition",
                                                "authors": "Robert L. McDonald", "isbn": None}, isbns),
                         "Derivatives Markets (McDonald)")


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


class LinkerTest(unittest.TestCase):
    """The linker grows a phrase the chunker cut short to the page it names, and
    links nothing for the sake of it on a sub-item or a preamble (C17's sequel)."""

    @classmethod
    def setUpClass(cls):
        cls.linker = sw.Linker(vl.Vault(), "srm-1")

    def test_a_cut_short_phrase_grows_to_its_page(self):
        self.assertEqual(self.linker.link("Apply principal components analysis to transform data"),
                         "Apply [[Principal Components Analysis|principal components analysis]] to transform data")
        self.assertEqual(self.linker.link("Fit and validate a generalized linear model."),
                         "Fit and validate a [[Generalized Linear Model|generalized linear model]].")
        self.assertIn("[[Ordinary Least Squares|ordinary least squares]]",
                      self.linker.link("Fit an ordinary least squares model"))

    def test_growth_never_cuts_into_the_next_phrase_or_crosses_a_verb(self):
        line = self.linker.link("basic forms of proportional and excess of loss reinsurance")
        self.assertNotIn("[[Excess of Loss|excess of loss]] reinsurance", line)

    def test_a_sub_item_links_only_what_names_a_concept(self):
        self.assertEqual(self.linker.link("Graphical procedures", fallback=False), "Graphical procedures")
        # …while an objective with nothing else to link still names something
        self.assertIn("[[", self.linker.link("Graphical procedures"))

    def test_verbs_the_chunker_missed_cut_a_phrase(self):
        self.assertEqual([p for _, _, p in sl.noun_phrases("describe how changes in the parameters affect the distributions")],
                         ["parameters", "distributions"])   # "changes" is generic


class ChosenTest(unittest.TestCase):
    """A re-render keeps the Source Material links a page already carries (C17)."""

    PAGE = """## Source Material
> [!answer]- Source Material
>
> - [[Centralization (TMP - 2019)|Centralization, Part 1, Nov 2019]]
>      - Outcomes 3a
> - [[Centralization (TMP - 2020)|Centralization, Part 2, Apr 2020]]
> - 1 A footnote the extractor read as a reading.
"""

    def test_reads_the_page_as_a_table(self):
        chosen = sw.Chosen(self.PAGE)
        self.assertEqual(chosen.target["Centralization, Part 1, Nov 2019"], "Centralization (TMP - 2019)")
        self.assertEqual(chosen.target["Centralization, Part 2, Apr 2020"], "Centralization (TMP - 2020)")
        self.assertEqual(chosen.plain, {"1 A footnote the extractor read as a reading."})

    def test_a_key_concepts_line_survives_a_re_render(self):
        page = (
            "## Learning Objectives\n\n"
            "> [!example]- Profit Analysis {10%}\n"
            "> 2. Analyze and interpret gains by [[Source|source]].\n"
            ">    - *Key concepts:* [[Analysis of Surplus]]\n"
        )
        chosen = sw.Chosen(page)
        self.assertEqual(chosen.key_concepts, {"Analyze and interpret gains by source.":
                                               ["   - *Key concepts:* [[Analysis of Surplus]]"]})

    def test_every_generated_page_re_renders_unchanged(self):
        """`syllabus_write.py --all --check` is clean: rendering a page over itself
        changes nothing, so a new sitting's render shows only the sitting's changes."""
        vault = vl.Vault()
        for wiki_id in sorted(os.listdir(sw.SYLLABUS_DIR)):
            json_path = os.path.join(sw.SYLLABUS_DIR, wiki_id, "syllabus.json")
            if not os.path.exists(json_path):
                continue
            with self.subTest(exam=wiki_id):
                self.assertFalse(sw.write(wiki_id, vault, check=True))


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
