#!/usr/bin/env python3
"""Tests for the PDF → question-bank pipeline (`docs/pdf-question-pipeline.md`).

Run with the rest of the vault's tests:

    python3 -m unittest discover -s scripts

The PDF-reading tests build their own fixture PDFs with PyMuPDF and skip when
it is not installed, so CI without the dependency still runs everything else.
"""

from __future__ import annotations

import os
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import mdmath
import pdf_extract as px
import question_classify as qc
import question_write as qw


# ─── mdmath ───────────────────────────────────────────────────────────────────


class TestSpanSplitting(unittest.TestCase):
    def test_round_trips(self):
        for text in [
            "plain prose",
            "cost is $400 and change",
            "inline $x^2$ math",
            "block\n$$\n\\begin{align*}a &= b\\end{align*}\n$$\nafter",
            "escaped \\$40 then $y$",
            "```\n$$ not math $$\n```\ntail",
        ]:
            self.assertEqual(
                "".join(chunk for _kind, chunk in mdmath.split_math_spans(text)),
                text,
            )

    def test_lone_dollar_is_not_a_delimiter(self):
        spans = mdmath.split_math_spans("premium of $400.\n\nNext paragraph.")
        self.assertTrue(all(kind == "prose" for kind, _ in spans))

    def test_code_block_is_opaque(self):
        spans = mdmath.split_math_spans("```py\nx = 1\n```\n$z$")
        kinds = [kind for kind, _ in spans]
        self.assertIn("code", kinds)
        self.assertIn("math", kinds)


class TestCharNormalisation(unittest.TestCase):
    def test_math_gets_latex_prose_gets_ascii(self):
        out = mdmath.normalize_chars("about \u00bd of $2 \u00d7 \u00bd$ cases")
        self.assertIn("about 1/2 of", out)
        self.assertIn(r"\times", out)
        self.assertIn(r"\frac{1}{2}", out)

    def test_smart_quotes_and_ligatures_everywhere(self):
        out = mdmath.normalize_chars("the group\u2019s \ufb01rst")
        self.assertEqual(out, "the group's first")

    def test_unicode_minus_becomes_hyphen(self):
        self.assertEqual(mdmath.normalize_chars("$x \u2212 1$"), "$x - 1$")

    def test_greek_only_inside_math(self):
        out = mdmath.normalize_chars("$\u03bb$ and \u03bb")
        self.assertEqual(out, "$\\lambda$ and \u03bb")

    def test_idempotent(self):
        once = mdmath.normalize_chars("$\u00d7 \u2264$ \u201cq\u201d")
        self.assertEqual(mdmath.normalize_chars(once), once)


class TestLiteralEscapes(unittest.TestCase):
    def test_prose_escape_becomes_newline(self):
        self.assertEqual(mdmath.fix_literal_escapes("a\\nb"), "a\nb")

    def test_math_command_is_left_alone(self):
        text = "$\\nu + 1$"
        self.assertEqual(mdmath.fix_literal_escapes(text), text)
        self.assertFalse(mdmath.has_literal_escapes(text))

    def test_detected(self):
        self.assertTrue(mdmath.has_literal_escapes("line\\nline"))


class TestAlignChains(unittest.TestCase):
    CHAINED = (
        "$$\n\\begin{align*}\n"
        "Z(200) &= \\frac{200}{200 + 105.5} = 0.655 \\\\\n"
        "Z(1000) &= \\frac{1000}{1000 + 105.5} = 0.905\n"
        "\\end{align*}\n$$\n"
    )

    def test_detects_both_rows(self):
        self.assertEqual(len(mdmath.align_chain_lines(self.CHAINED)), 2)

    def test_split_puts_result_on_its_own_row(self):
        fixed = mdmath.split_align_chains(self.CHAINED)
        self.assertEqual(mdmath.align_chain_lines(fixed), [])
        self.assertIn("&= 0.655", fixed)
        self.assertIn("&= 0.905", fixed)
        self.assertEqual(fixed.count("\\\\"), 3)

    def test_short_numeric_pair_is_allowed(self):
        text = "$$\n\\begin{align*}\np &= 0.0453 = 4.53\\%\n\\end{align*}\n$$"
        self.assertEqual(mdmath.align_chain_lines(text), [])

    def test_equals_inside_braces_is_not_a_chain(self):
        text = (
            "$$\n\\begin{align*}\n"
            "E[X] &= \\int_0^1 f(x \\mid \\theta = 2)\\,dx\n"
            "\\end{align*}\n$$"
        )
        self.assertEqual(mdmath.align_chain_lines(text), [])

    def test_normalize_is_idempotent(self):
        once = mdmath.normalize_markdown(self.CHAINED)
        self.assertEqual(mdmath.normalize_markdown(once), once)

    def test_lint_reports_issues(self):
        issues = mdmath.lint_markdown(self.CHAINED + "trailing \u00d7 glyph\\ntail")
        self.assertTrue(any("literal" in i for i in issues))
        self.assertTrue(any("align*" in i for i in issues))


# ─── Segmentation ─────────────────────────────────────────────────────────────

SOA_TEXT = """1. A survey of a group's viewing habits revealed the following:
(i) 28% watched gymnastics
(ii) 29% watched baseball
Calculate the percentage that watched none of the three sports.
(A) 24
(B) 36
(C) 41
(D) 52
(E) 60

2. An urn contains 10 balls: 4 red and 6 blue.
Calculate the number of blue balls in the second urn.
(A) 4
(B) 20
(C) 24
(D) 44
(E) 64

3. A device runs until either of two components fails.
(A) 0.22
(B) 0.28
(C) 0.33
(D) 0.44
(E) 0.55
"""


class TestSegmentation(unittest.TestCase):
    def test_autodetects_numbered_questions(self):
        bounds = px.segment(SOA_TEXT)
        self.assertEqual([b.num for b in bounds], [1, 2, 3])

    def test_out_of_sequence_numbers_are_dropped(self):
        text = "1. first\n2. second\n1. a stray restart\n3. third\n"
        self.assertEqual([b.num for b in px.segment(text)], [1, 2, 3])

    def test_prefers_the_sequence_over_a_nested_list(self):
        text = (
            "Question 1\nGiven:\n1. alpha\n2. beta\n"
            "Question 2\nGiven:\n1. gamma\n2. delta\n"
            "Question 3\nDone.\n"
        )
        self.assertEqual([b.num for b in px.segment(text)], [1, 2, 3])

    def test_spans_cover_their_question(self):
        bounds = px.segment(SOA_TEXT)
        self.assertIn("urn contains 10 balls", SOA_TEXT[bounds[1].start : bounds[1].end])
        self.assertNotIn("urn contains", SOA_TEXT[bounds[0].start : bounds[0].end])

    def test_no_pattern_returns_nothing(self):
        self.assertEqual(px.segment("just prose, no numbering at all"), [])


class TestOptions(unittest.TestCase):
    def test_stacked_options(self):
        bounds = px.segment(SOA_TEXT)
        prompt, options = px.split_options(SOA_TEXT[bounds[1].start : bounds[1].end])
        self.assertEqual(sorted(options), list("ABCDE"))
        self.assertEqual(options["A"], "4")
        self.assertEqual(options["E"], "64")
        self.assertNotIn("(A)", prompt)
        self.assertIn("Calculate the number of blue balls", prompt)

    def test_inline_options(self):
        prompt, options = px.split_options(
            "Calculate the premium.\n(A) 24 (B) 36 (C) 41 (D) 52 (E) 60\n"
        )
        self.assertEqual(options["C"], "41")
        self.assertEqual(prompt, "Calculate the premium.")

    def test_no_options(self):
        prompt, options = px.split_options("Describe two advantages.")
        self.assertEqual(options, {})
        self.assertEqual(prompt, "Describe two advantages.")


class TestAnswerKey(unittest.TestCase):
    def test_solution_header_form(self):
        text = "1. Solution: C\nwork\n\n2. Solution: E\nwork\n"
        self.assertEqual(px.answer_key(text), {1: "C", 2: "E"})

    def test_answer_table_form(self):
        text = "Answer Key\n1 B\n2 D\n3 A\n"
        self.assertEqual(px.answer_key(text), {1: "B", 2: "D", 3: "A"})

    def test_question_answer_prose_form(self):
        text = "Question #7 Answer: D\nblah"
        self.assertEqual(px.answer_key(text)[7], "D")

    def test_strip_solution_header(self):
        body, letter = px.strip_solution_header("Solution: B\nLet X be the loss.")
        self.assertEqual(letter, "B")
        self.assertNotIn("Solution", body)


CAS_REPORT = """QUESTION 3
TOTAL POINT VALUE: 2.5
LEARNING OBJECTIVE(S): A3, A4
SAMPLE ANSWERS
Part a: 0.5 point
Sample 1
0.5 x (2 + 3) = 2.5
Sample 2
Alternative tabular approach.
Part b: 2 points
Sample 1
Earned exposure is 1.75.
EXAMINER'S REPORT
Candidates were generally successful on this question.
Part a
Candidates were expected to apply the 0.5 factor.
Part b
A common error was ignoring the mid-year effective dates.

QUESTION 4
TOTAL POINT VALUE: 1
SAMPLE ANSWERS
Part a: 1 point
Sample 1
Trend is 4%.
EXAMINER'S REPORT
Well answered.
Part a
Most candidates identified the trend.
"""


class TestCasParsing(unittest.TestCase):
    def setUp(self):
        self.bounds = px.segment(CAS_REPORT, px.CAS_QUESTION_RE)
        self.q3 = px.parse_cas_question(
            CAS_REPORT[self.bounds[0].start : self.bounds[0].end]
        )

    def test_finds_both_questions(self):
        self.assertEqual([b.num for b in self.bounds], [3, 4])

    def test_total_points_and_codes(self):
        self.assertEqual(self.q3["points"], 2.5)
        self.assertEqual(self.q3["learning_objective_codes"], "A3, A4")

    def test_parts_carry_points_and_samples(self):
        labels = [p["label"] for p in self.q3["parts"]]
        self.assertEqual(labels, ["a", "b"])
        self.assertEqual(self.q3["parts"][0]["points"], 0.5)
        self.assertEqual(len(self.q3["parts"][0]["samples"]), 2)
        self.assertIn("Earned exposure", self.q3["parts"][1]["samples"][0])

    def test_per_part_report_is_separated_from_the_overall(self):
        self.assertIn("generally successful", self.q3["examiner_report"])
        self.assertIn("0.5 factor", self.q3["parts"][0]["report"])
        self.assertIn("mid-year", self.q3["parts"][1]["report"])
        self.assertNotIn("common error", self.q3["parts"][0]["report"])


class TestCasPartPrompts(unittest.TestCase):
    BOOKLET = (
        "1. (2.5 points)\n"
        "Given the following:\n\n"
        "| Policy | Vehicles |\n|---|---|\n| A | 2 |\n\n"
        "a. (0.25 points) Calculate the calendar year 2018 written exposures.\n"
        "b. (0.5 points) Calculate the calendar year 2018 earned exposures.\n"
    )

    def test_stem_keeps_the_exhibit(self):
        stem, prompts = px.split_part_prompts(self.BOOKLET)
        self.assertIn("| A | 2 |", stem)
        self.assertNotIn("written exposures", stem)
        self.assertEqual(sorted(prompts), ["a", "b"])
        self.assertEqual(prompts["a"]["points"], 0.25)
        self.assertIn("earned exposures", prompts["b"]["prompt"])

    def test_no_lettered_parts_leaves_the_body_alone(self):
        body = "Describe two advantages of a large deductible."
        self.assertEqual(px.split_part_prompts(body), (body, {}))

    def test_prompts_land_on_the_report_parts(self):
        parts = [
            {"label": "a", "points": 0.25, "samples": ["0.5 x 5"], "report": "r"},
            {"label": "b", "points": None, "samples": [], "report": ""},
        ]
        stem = px._attach_part_prompts(self.BOOKLET, parts)
        self.assertIn("Given the following:", stem)
        self.assertIn("written exposures", parts[0]["prompt"])
        self.assertEqual(parts[1]["points"], 0.5)

    def test_a_part_only_the_booklet_prices_is_added(self):
        parts = [{"label": "a", "points": 0.25, "samples": [], "report": ""}]
        px._attach_part_prompts(self.BOOKLET, parts)
        self.assertEqual([p["label"] for p in parts], ["a", "b"])


# ─── Tables, furniture, reflow ────────────────────────────────────────────────


class TestTables(unittest.TestCase):
    def test_rows_to_markdown(self):
        md = px.rows_to_markdown([["Policy", "Vehicles"], ["A", "2"], ["B", "3"]])
        self.assertEqual(md.splitlines()[0], "| Policy | Vehicles |")
        self.assertEqual(md.splitlines()[1], "|---|---|")
        self.assertIn("| B | 3 |", md)

    def test_ragged_rows_are_padded(self):
        md = px.rows_to_markdown([["a", "b", "c"], ["1"]])
        self.assertIn("| 1 |  |  |", md)

    def test_exhibit_with_letter_labels_is_plausible(self):
        self.assertTrue(px.plausible_table([
            ["Policy", "Vehicles", "Effective Date"],
            ["A", "2", "January 1, 2018"],
            ["B", "3", "March 1, 2018"],
        ]))

    def test_option_list_is_not_a_table(self):
        self.assertFalse(px.plausible_table([
            ["1. Calculate x", ""], ["(A)", "1"], ["(B)", "2"], ["(C)", "3"],
        ]))

    def test_prose_is_not_a_table(self):
        self.assertFalse(px.plausible_table([
            ["A survey of a group's viewing habits over the last year revealed"],
            ["the following information about the three sports they watched"],
            ["and the overlap between them, which the candidate must combine"],
        ]))

    def test_single_row_is_not_a_table(self):
        self.assertEqual(px.rows_to_markdown([["only"]]), "")


class TestFurnitureAndReflow(unittest.TestCase):
    def test_repeated_footer_is_found(self):
        pages = [
            px.Page(number=i, text=f"Exam P Sample Questions\nbody {i}\nPage {i} of 3")
            for i in (1, 2, 3)
        ]
        drop = px.furniture_lines(pages)
        self.assertIn("Exam P Sample Questions", drop)
        self.assertIn("Page 2 of 3", drop)
        self.assertNotIn("body 2", drop)

    def test_reflow_joins_wrapped_lines(self):
        out = px.reflow_block("Calculate the percentage of the\ngroup that watched none.")
        self.assertEqual(out, "Calculate the percentage of the group that watched none.")

    def test_reflow_keeps_list_items_apart(self):
        out = px.reflow_block("Given:\n(i) 28% watched\ngymnastics\n(ii) 29% watched")
        self.assertEqual(
            out.splitlines(),
            ["Given:", "(i) 28% watched gymnastics", "(ii) 29% watched"],
        )

    def test_reflow_dehyphenates(self):
        self.assertEqual(px.reflow_block("expo-\nsure"), "exposure")

    def test_columnar_lines_become_a_table(self):
        md = px.columnar_table([
            "Policy   Number of Vehicles   Effective Date",
            "A        2                    January 1, 2018",
            "B        3                    March 1, 2018",
        ])
        self.assertIsNotNone(md)
        self.assertIn("| Policy | Number of Vehicles | Effective Date |", md)
        self.assertIn("| B | 3 | March 1, 2018 |", md)

    def test_columnar_rejects_prose(self):
        self.assertIsNone(px.columnar_table([
            "A survey of a group revealed the following.",
            "Calculate the percentage that watched none.",
            "All policies are semi-annual.",
        ]))

    def test_split_columnar_keeps_prose_runs_together(self):
        segments = px.split_columnar([
            "Given the following information about the",
            "policies in force during the year:",
            "Policy   Vehicles   Term",
            "A        2          6 months",
            "B        3          6 months",
            "Calculate the written exposures for the",
            "calendar year.",
        ])
        kinds = [kind for kind, _ in segments]
        self.assertEqual(kinds, ["prose", "table", "prose"])
        self.assertIn("| A | 2 | 6 months |", segments[1][1])
        self.assertEqual(
            px.reflow_block(segments[0][1]),
            "Given the following information about the policies in force during the year:",
        )

    def test_page_markdown_drops_furniture_and_keeps_tables(self):
        page = px.Page(
            number=1,
            text="",
            blocks=[(0.0, 0.0, "Page 1 of 3\nGiven the following:"), (10.0, 0.0, "\x00TABLE\x00| a | b |\n|---|---|\n| 1 | 2 |")],
        )
        md = px.page_markdown(page, {"Page 1 of 3"})
        self.assertNotIn("Page 1", md)
        self.assertIn("Given the following:", md)
        self.assertIn("| 1 | 2 |", md)


class TestTokenEstimate(unittest.TestCase):
    def test_residual_is_far_below_baseline(self):
        rec = {
            "body": "x" * 800,
            "options": {"A": "1", "B": "2"},
            "solution": "y" * 600,
            "parts": [],
            "examiner_report": "",
            "pages": {"question": [1]},
            "needs_vision": False,
        }
        est = px.token_estimate([rec] * 10)
        self.assertLess(est["residual_in"] + est["residual_out"],
                        est["baseline_in"] + est["baseline_out"])


# ─── Classification ───────────────────────────────────────────────────────────


class TestClassifier(unittest.TestCase):
    def test_ontology_hit_is_confident(self):
        judgment = qc.classify(
            {
                "bank": "exam-p",
                "body": "Calculate the conditional probability that the loss exceeds 2.",
                "solution": "Use Bayes' theorem with the law of total probability.",
                "options": {},
                "parts": [],
            },
            qc.concept_index(Path(".")),
        )
        self.assertTrue(judgment["topic"])
        self.assertEqual(judgment["learning_objective"], "General Probability")

    def test_unmatched_question_is_flagged_for_review(self):
        judgment = qc.classify(
            {"bank": "exam-p", "body": "qqqq zzzz", "solution": "", "options": {}, "parts": []},
            {},
        )
        self.assertTrue(judgment["needs_review"])

    def test_difficulty_scales_with_solution_length(self):
        index = qc.concept_index(Path("."))
        easy = qc.classify(
            {"bank": "exam-p", "body": "Calculate E[X].", "solution": "E[X] = 2.",
             "options": {}, "parts": []}, index)
        hard = qc.classify(
            {"bank": "exam-p", "body": "Calculate E[X].",
             "solution": "step\n" * 40 + "$$x$$\n" * 6, "options": {}, "parts": []}, index)
        self.assertEqual(easy["difficulty"], "easy")
        self.assertEqual(hard["difficulty"], "hard")

    def test_wiki_links_are_plus_encoded_and_deduped(self):
        judgment = qc.classify(
            {"bank": "exam-p", "body": "Bayes theorem and conditional probability",
             "solution": "", "options": {}, "parts": []},
            qc.concept_index(Path(".")),
        )
        self.assertTrue(all(link.startswith("Concepts/") for link in judgment["wiki_link"]))
        self.assertTrue(all(" " not in link for link in judgment["wiki_link"]))
        self.assertEqual(len(judgment["wiki_link"]), len(set(judgment["wiki_link"])))


# ─── File writing ─────────────────────────────────────────────────────────────


class TestWriter(unittest.TestCase):
    RECORD = {
        "num": 4,
        "id": "p-004",
        "bank": "exam-p",
        "type": "multiple-choice",
        "body": "An urn contains 10 balls.\n\nCalculate the number of blue balls.",
        "options": {"A": "4", "B": "20", "C": "24", "D": "44", "E": "64"},
        "answer": "A",
        "points": 1,
        "parts": [],
        "solution": "Let x be the count. Then x = 4.",
        "pages": {"question": [1], "solution": [2]},
        "needs_vision": False,
        "warnings": [],
    }
    JUDGMENT = {
        "id": "p-004",
        "topic": "Combinatorics",
        "learning_objective": "General Probability",
        "difficulty": "easy",
        "wiki_link": ["Concepts/Combinatorics", "Concepts/Conditional+Probability"],
    }

    def test_multiple_choice_file(self):
        md = qw.render(self.RECORD, self.JUDGMENT)
        self.assertTrue(md.startswith("---\n"))
        self.assertIn('id: "p-004"\n', md)
        self.assertIn('exam: "Probability"\n', md)
        self.assertIn('answer: "A"\n', md)
        self.assertIn("- A) 4\n", md)
        self.assertIn("- E) 64\n", md)
        self.assertIn("## Explanation\n", md)
        self.assertLess(md.index("wiki_link:"), md.index("answer:"))
        self.assertNotIn("verification:", md)  # verify_check.py --sync owns it

    def test_options_are_not_duplicated_in_the_explanation(self):
        md = qw.render(self.RECORD, self.JUDGMENT)
        self.assertEqual(md.count("- A) 4"), 1)

    def test_multi_part_file(self):
        record = {
            "num": 3,
            "id": "cas5-2019s-q3",
            "bank": "exam-5",
            "type": "multi-part",
            "body": "Given the following:\n\n| Policy | Vehicles |\n|---|---|\n| A | 2 |",
            "options": {},
            "answer": None,
            "points": 2.5,
            "year": 2019,
            "session": "Spring",
            "parts": [
                {"label": "a", "points": 0.5, "samples": ["0.5 x (2 + 3) = 2.5"],
                 "report": "Apply the 0.5 factor."},
                {"label": "b", "points": 2.0, "samples": ["Earned exposure is 1.75."],
                 "report": "Watch the effective dates."},
            ],
            "solution": "",
            "examiner_report": "Generally well answered.",
            "pages": {"question": [4], "solution": [20]},
            "needs_vision": False,
            "warnings": [],
        }
        md = qw.render(record, {
            "id": "cas5-2019s-q3",
            "topic": "Exposure Base",
            "learning_objective": "Ratemaking",
            "difficulty": "medium",
            "wiki_link": ["Concepts/Exposure+Base"],
        })
        self.assertIn('type: multi-part\n', md)
        self.assertIn("year: 2019\n", md)
        self.assertIn("session: Spring\n", md)
        self.assertIn("## Part a (0.5 points)\n", md)
        self.assertIn("## Part b (2 points)\n", md)
        self.assertIn("### Explanation\n", md)
        self.assertIn("### Examiner Report\n", md)
        self.assertIn("Apply the 0.5 factor.", md)
        self.assertNotIn("answer:", md.split("---")[1])

    def test_explanation_override_wins(self):
        md = qw.render(self.RECORD, self.JUDGMENT, explanation="Rewritten by hand.")
        self.assertIn("Rewritten by hand.", md)
        self.assertNotIn("Let x be the count", md)

    def test_body_is_normalised(self):
        record = dict(self.RECORD, body="cost \u00d7 rate for the group\u2019s policy")
        md = qw.render(record, self.JUDGMENT)
        self.assertIn("group's", md)

    def test_frontmatter_quoting_escapes_quotes(self):
        judgment = dict(self.JUDGMENT, topic='Bayes "Theorem"')
        md = qw.render(self.RECORD, judgment)
        self.assertIn('topic: "Bayes \\"Theorem\\""', md)


# ─── End-to-end over a synthetic PDF ──────────────────────────────────────────


def _make_pdf(path: Path, pages: list[str]) -> None:
    import pymupdf

    doc = pymupdf.open()
    for body in pages:
        page = doc.new_page()
        page.insert_textbox(pymupdf.Rect(56, 56, 556, 736), body, fontsize=11)
    doc.save(path)
    doc.close()


@unittest.skipUnless(
    __import__("importlib").util.find_spec("pymupdf"), "PyMuPDF not installed"
)
class TestEndToEnd(unittest.TestCase):
    def test_soa_booklets_become_records(self):
        with tempfile.TemporaryDirectory() as tmp:
            tmp = Path(tmp)
            _make_pdf(
                tmp / "q.pdf",
                [
                    "Exam P Sample Questions\n\n"
                    "1. A survey revealed the following information.\n"
                    "Calculate the percentage that watched none.\n"
                    "(A) 24\n(B) 36\n(C) 41\n(D) 52\n(E) 60\n\nPage 1 of 2",
                    "Exam P Sample Questions\n\n"
                    "2. An urn contains 10 balls: 4 red and 6 blue.\n"
                    "Calculate the number of blue balls.\n"
                    "(A) 4\n(B) 20\n(C) 24\n(D) 44\n(E) 64\n\nPage 2 of 2",
                ],
            )
            _make_pdf(
                tmp / "s.pdf",
                [
                    "1. Solution: C\nUse the inclusion-exclusion rule.\n\n"
                    "2. Solution: A\nLet x be the number of blue balls; x = 4."
                ],
            )

            q = px.read_pages(str(tmp / "q.pdf"))
            s = px.read_pages(str(tmp / "s.pdf"))
            records = px.soa_records("p", q, s)

            self.assertEqual([r["num"] for r in records], [1, 2])
            self.assertEqual(records[0]["id"], "p-001")
            self.assertEqual(records[0]["answer"], "C")
            self.assertEqual(records[1]["answer"], "A")
            self.assertEqual(records[1]["options"]["D"], "44")
            self.assertIn("urn contains 10 balls", records[1]["body"])
            self.assertNotIn("Sample Questions", records[1]["body"])
            self.assertNotIn("Page 2 of 2", records[1]["body"])
            self.assertIn("blue balls; x = 4", records[1]["solution"])
            self.assertFalse(records[1]["needs_vision"])
            self.assertEqual(records[1]["warnings"], [])

    def test_report_and_jsonl_are_written(self):
        with tempfile.TemporaryDirectory() as tmp:
            tmp = Path(tmp)
            _make_pdf(
                tmp / "q.pdf",
                ["1. Calculate x.\n(A) 1\n(B) 2\n(C) 3\n(D) 4\n(E) 5"],
            )
            _make_pdf(tmp / "s.pdf", ["1. Solution: B\nx = 2."])
            out = tmp / "build"
            rc = px.main(
                [
                    "--exam", "p",
                    "--questions", str(tmp / "q.pdf"),
                    "--solutions", str(tmp / "s.pdf"),
                    "--out", str(out),
                    "--no-render",
                ]
            )
            self.assertEqual(rc, 0)
            self.assertTrue((out / "records.jsonl").exists())
            report = (out / "report.md").read_text(encoding="utf-8")
            self.assertIn("questions segmented", report)
            self.assertIn("Token estimate", report)

    def test_cropped_render_is_smaller_than_the_full_page(self):
        import pymupdf

        with tempfile.TemporaryDirectory() as tmp:
            tmp = Path(tmp)
            _make_pdf(tmp / "q.pdf", ["1. A short question near the top."])
            doc = pymupdf.open(tmp / "q.pdf")
            w, h = px.render_page(doc, 0, tmp / "page.png", dpi=110)
            full = doc[0].get_pixmap(dpi=110)
            doc.close()
            self.assertTrue((tmp / "page.png").exists())
            self.assertLess(w * h, full.width * full.height)


if __name__ == "__main__":
    unittest.main()
