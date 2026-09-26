#!/usr/bin/env python3
"""Tests for the PDF → question-bank pipeline (`docs/pdf-question-pipeline.md`).

Run with the rest of the vault's tests:

    python3 -m unittest discover -s scripts

The PDF-reading tests build their own fixture PDFs with PyMuPDF and skip when
it is not installed, so CI without the dependency still runs everything else.
"""

from __future__ import annotations

import importlib.util
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
        stem = px.attach_part_prompts(self.BOOKLET, parts)
        self.assertIn("Given the following:", stem)
        self.assertIn("written exposures", parts[0]["prompt"])
        self.assertEqual(parts[1]["points"], 0.5)

    def test_a_part_only_the_booklet_prices_is_added(self):
        parts = [{"label": "a", "points": 0.25, "samples": [], "report": ""}]
        px.attach_part_prompts(self.BOOKLET, parts)
        self.assertEqual([p["label"] for p in parts], ["a", "b"])


class TestStructureGuards(unittest.TestCase):
    """A table candidate must never swallow the document's own headings."""

    def test_report_page_read_as_a_table_is_rejected(self):
        self.assertTrue(px.swallows_structure([
            ["", "QUESTION 1", ""],
            ["", "TOTAL POINT VALUE: 1.25", "LEARNING OBJECTIVE: A1"],
            ["Part a: 0.5 point", "", ""],
        ]))

    def test_a_real_exhibit_is_not_rejected(self):
        self.assertFalse(px.swallows_structure([
            ["Policy", "Vehicles"], ["A", "2"], ["B", "3"],
        ]))

    def test_a_sample_answer_heading_does_not_reject_its_table(self):
        # A worked solution's table sits right beside its `Sample Answer 2`
        # heading; rejecting on that loses the table the solution *is*.
        self.assertFalse(px.swallows_structure([
            ["Sample Answer 2", "", ""],
            ["Accident Year", "12", "24"],
            ["2013", "300", "300"],
        ]))

    def test_the_question_scaffolding_still_rejects(self):
        self.assertTrue(px.swallows_structure([
            ["QUESTION 16", ""], ["SAMPLE ANSWERS", ""], ["a", "b"]]))

    def test_block_outside_the_cells_is_kept(self):
        table = "| AY | Loss |\n|---|---|\n| 2013 | 100 |"
        self.assertFalse(px._inside_table("QUESTION 5", table))
        self.assertTrue(px._inside_table("2013 100", table))

    def test_exhibit_detection(self):
        self.assertTrue(px._has_exhibit("| a | b |\n|---|---|\n| 1 | 2 |"))
        self.assertTrue(px._has_exhibit("AY    Loss    Trend"))
        self.assertFalse(px._has_exhibit("Calculate the written exposures."))


class TestBookletAlignment(unittest.TestCase):
    """Aligning a scanned booklet to the report on printed point values."""

    BOOKLET = (
        "(1.25 points)\nGiven the following policies:\n"
        "a.\n(0.5 point)\nCalculate the written car-years.\n"
        "b.\n(0.75 point)\nCalculate the earned car-years.\n"
        "(2 points)\nGiven the following premium:\n"
        "a.\n(1 point)\nCalculate the on-level factor.\n"
        "b.\n(1 point)\nIdentify a weakness.\n"
    )

    def test_aligns_both_questions(self):
        spans = px.align_booklet(self.BOOKLET, [(1, 1.25, [0.5, 0.75]), (2, 2.0, [1.0, 1.0])])
        self.assertEqual(sorted(spans), [1, 2])
        first = self.BOOKLET[spans[1][0] : spans[1][1]]
        self.assertIn("written car-years", first)
        self.assertNotIn("on-level factor", first)

    def test_question_with_no_parts_takes_only_its_total(self):
        booklet = "(2.25 points)\nDescribe the trend.\n(1 point)\nCalculate x.\n"
        spans = px.align_booklet(booklet, [(5, 2.25, []), (6, 1.0, [])])
        self.assertIn("Describe the trend", booklet[spans[5][0] : spans[5][1]])
        self.assertNotIn("Calculate x", booklet[spans[5][0] : spans[5][1]])

    def test_total_need_not_be_printed_when_parts_sum_to_it(self):
        booklet = "a.\n(2.5 points)\nFirst.\nb.\n(0.5 point)\nSecond.\n"
        spans = px.align_booklet(booklet, [(4, 3.0, [2.5, 0.5])])
        self.assertIn("First.", booklet[spans[4][0] : spans[4][1]])

    def test_a_question_the_report_skips_is_stepped_over(self):
        # Fall 2016 has no QUESTION 8, but the booklet still prints its points.
        booklet = "(1 point)\nSeven.\n(3.5 points)\nEight.\n(1 point)\nNine.\n"
        spans = px.align_booklet(booklet, [(7, 1.0, []), (9, 1.0, [])])
        self.assertEqual(sorted(spans), [7, 9])
        self.assertIn("Nine.", booklet[spans[9][0] : spans[9][1]])
        self.assertNotIn("Eight.", booklet[spans[9][0] : spans[9][1]])

    def test_an_unmatchable_question_is_left_out_not_guessed(self):
        booklet = "(1 point)\nOne.\n(0.75 point)\nTwo-ish.\n(1 point)\nThree.\n"
        spans = px.align_booklet(booklet, [(1, 1.0, []), (2, 1.75, []), (3, 1.0, [])])
        self.assertEqual(sorted(spans), [1, 3])

    def test_a_span_never_absorbs_the_question_after_it(self):
        booklet = "(1 point)\nOne.\n(0.75 point)\nUnmatched.\n(1 point)\nThree.\n"
        spans = px.align_booklet(booklet, [(1, 1.0, []), (2, 1.75, []), (3, 1.0, [])])
        self.assertNotIn("Unmatched", booklet[spans[1][0] : spans[1][1]])

    def test_nothing_to_align_returns_none(self):
        self.assertIsNone(px.align_booklet("no point values here", [(1, 1.0, [])]))
        self.assertIsNone(px.align_booklet("(1 point)\nx", []))

    def test_a_missing_total_is_not_aligned(self):
        self.assertIsNone(px.align_booklet("(1 point)\nx\n", [(1, None, [])]))


class TestLocatingUnplacedQuestions(unittest.TestCase):
    @staticmethod
    def _rec(num, pages):
        return {"num": num, "pages": {"question": list(pages)}, "warnings": []}

    def test_a_gap_takes_the_pages_between_its_neighbours(self):
        records = [self._rec(14, [17, 18, 19]), self._rec(15, []), self._rec(16, [19, 20])]
        px._locate_unplaced(records)
        self.assertEqual(records[1]["pages"]["question"], [19])
        self.assertIn("not located", records[1]["warnings"][0])

    def test_consecutive_gaps_share_the_span(self):
        records = [self._rec(16, [20, 21]), self._rec(17, []), self._rec(18, []),
                   self._rec(19, [22, 23])]
        px._locate_unplaced(records)
        self.assertEqual(records[1]["pages"]["question"], [21, 22])
        self.assertEqual(records[2]["pages"]["question"], [21, 22])

    def test_a_gap_at_the_end_uses_the_last_known_page(self):
        records = [self._rec(26, [29, 30]), self._rec(27, [])]
        px._locate_unplaced(records)
        self.assertEqual(records[1]["pages"]["question"], [30])

    def test_nothing_placed_leaves_it_alone(self):
        records = [self._rec(1, []), self._rec(2, [])]
        px._locate_unplaced(records)
        self.assertEqual(records[0]["pages"]["question"], [])
        self.assertEqual(records[0]["warnings"], [])


class TestPublisherTextDefects(unittest.TestCase):
    """Shapes a real CAS report turned out to have."""

    def test_dropped_leading_glyph_in_a_field_label(self):
        # Fall 2016 extracts `OTAL POINT VALUE: 3.25` — the T is absent from
        # the PDF's own text layer.
        parsed = px.parse_cas_question(
            "\nOTAL POINT VALUE: 3.25\nLEARNING OBJECTIVE: A8\n"
            "SAMPLE ANSWERS\nPart a: 3.25 points\nSample Answer 1\nLAS = 1.591\n"
        )
        self.assertEqual(parsed["points"], 3.25)
        self.assertEqual(parsed["parts"][0]["points"], 3.25)

    def test_single_part_answer_is_kept_as_the_solution(self):
        parsed = px.parse_cas_question(
            "TOTAL POINT VALUE: 2.25\nSAMPLE ANSWER\n"
            "Calculate the severity trend and select a rate.\n"
            "EXAMINER'S REPORT\nWell answered.\n"
        )
        self.assertEqual(parsed["parts"], [])
        self.assertIn("severity trend", parsed["solution"])

    def test_curly_apostrophe_splits_the_report_off(self):
        parsed = px.parse_cas_question(
            "TOTAL POINT VALUE: 1\nSAMPLE ANSWERS\nPart a: 1 point\n"
            "Sample Answer 1\nThe answer is 4.5\n"
            "EXAMINER\u2019S REPORT\nPart a\nCandidates were expected to round.\n"
        )
        part = parsed["parts"][0]
        self.assertIn("4.5", part["samples"][0])
        self.assertNotIn("expected to round", part["samples"][0])
        self.assertIn("expected to round", part["report"])


def _page(number: int, text: str) -> "px.Page":
    """A Page carrying one text block, the way `read_pages` builds one."""
    return px.Page(number=number, text=text, blocks=[(0.0, 0.0, text)])


class TestExam7Layouts(unittest.TestCase):
    """The two report layouts the Exam 7 papers added.

    Spring 2018 names the sitting in front of every question heading, and the
    May 2012 and Spring 2013 reports predate `QUESTION N` / `TOTAL POINT VALUE`
    altogether. Each segmented to nothing — or to two stray hits inside a
    prompt — while reporting a run that had merely found few questions.
    """

    LEGACY = (
        "Question 1 Sample Answer\nSolution 1\n"
        "a) Chain ladder = 700,000 x 2.5 = 1,750,000\n"
        "b) x = 550,000\n"
        "Sample 2\na) 700k x 2.5 = 1.75M\nb) x = 1250k - 700k = 550k\n"
        "Examiner Comment\nThe a. part of this question was fairly straightforward.\n"
        "The b. part involved solving a system of equations.\n"
        "Question 2 Sample Answer\nSolution 1\n"
        "Stable earnings reduce the cost of financial distress.\n"
        "Solution 2\nLower taxes on smoothed income.\n"
        "Examiner Comment\nMost candidates listed two reasons.\n"
    )

    def test_a_heading_that_names_the_sitting_still_segments(self):
        report = (
            "SPRING 2018 EXAM 7, QUESTION 1\nTOTAL POINT VALUE: 2\n"
            "SAMPLE ANSWERS\nPart a: 2 points\nSample 1\nIBNR = 400\n"
            "SPRING 2018 EXAM 7, QUESTION 2\nTOTAL POINT VALUE: 1\n"
            "SAMPLE ANSWERS\nPart a: 1 point\nSample 1\nCV = 0.16\n"
        )
        bounds = px.segment(report, px.CAS_QUESTION_RE)
        self.assertEqual([b.num for b in bounds], [1, 2])

    def test_legacy_samples_are_gathered_per_part(self):
        bounds = px.segment(self.LEGACY, px.LEGACY_QUESTION_RE)
        self.assertEqual([b.num for b in bounds], [1, 2])
        parsed = px.parse_legacy_question(self.LEGACY[bounds[0].start : bounds[0].end])
        parts = {p["label"]: p for p in parsed["parts"]}
        self.assertEqual(sorted(parts), ["a", "b"])
        self.assertEqual(len(parts["a"]["samples"]), 2)
        self.assertIn("1,750,000", parts["a"]["samples"][0])
        self.assertIn("1.75M", parts["a"]["samples"][1])
        self.assertIsNone(parsed["points"])

    def test_legacy_commentary_that_names_its_part_is_split(self):
        bounds = px.segment(self.LEGACY, px.LEGACY_QUESTION_RE)
        parsed = px.parse_legacy_question(self.LEGACY[bounds[0].start : bounds[0].end])
        parts = {p["label"]: p for p in parsed["parts"]}
        # The label is the subject of its sentence, so it stays.
        self.assertTrue(parts["a"]["report"].startswith("The a. part"))
        self.assertIn("system of equations", parts["b"]["report"])
        self.assertNotIn("system of equations", parts["a"]["report"])

    def test_legacy_question_without_parts_is_single_part(self):
        bounds = px.segment(self.LEGACY, px.LEGACY_QUESTION_RE)
        parsed = px.parse_legacy_question(self.LEGACY[bounds[1].start : bounds[1].end])
        self.assertEqual(parsed["parts"], [])
        self.assertIn("financial distress", parsed["solution"])
        self.assertIn("smoothed income", parsed["alternatives"][0])
        self.assertIn("two reasons", parsed["examiner_report"])

    def test_a_lettered_list_inside_a_part_is_not_a_new_part(self):
        parsed = px.parse_legacy_question(
            "Solution 1\na) Two reasons:\nb) first\nc) second\n"
            "Solution 2\na) One reason\nb) Another answer\n"
            "a) nested\n"
        )
        labels = [p["label"] for p in parsed["parts"]]
        self.assertEqual(labels, ["a", "b", "c"])

    def test_legacy_points_come_from_the_booklet(self):
        booklet = (
            "1.\n(2.75 points)\nGiven the following:\n"
            "a.\n(1.25 points)\nCalculate the chain ladder estimate.\n"
            "b.\n(1.5 points)\nDetermine the incremental paid loss.\n"
            "2.\n(1 point)\nDescribe two reasons to smooth earnings.\n"
        )
        report = self.LEGACY
        records = px.cas_records("7", 2012, None, [_page(1, booklet)], [_page(2, report)])
        self.assertEqual([r["points"] for r in records], [2.75, 1.0])
        self.assertEqual([p["points"] for p in records[0]["parts"]], [1.25, 1.5])
        self.assertIn("chain ladder estimate", records[0]["parts"][0]["prompt"])
        self.assertEqual(records[0]["id"], "cas7-2012-q1")

    def test_the_legacy_cover_page_splits_the_combined_pdf(self):
        pages = [
            _page(1, "1.\n(2 points)\nGiven the following"),
            _page(2, "Exam 7\nMay 2012\nExaminers’ Report\nwith Sample Solutions"),
            _page(3, "Question 1 Sample Answer\nSolution 1\na) 1,750,000"),
        ]
        self.assertEqual(px._split_combined(pages), 1)

    def test_a_number_alone_on_its_line_starts_a_booklet_question(self):
        booklet = (
            "1.\n(2.75 points)\nGiven the following:\n"
            "The 80.\n2.\n(1 point)\nDescribe it.\n10. (2 points)\nCalculate it.\n"
        )
        self.assertEqual([b.num for b in px.segment(booklet)], [1, 2, 10])


class TestSpring2016Faults(unittest.TestCase):
    """Four faults the CAS Exam 5 Spring 2016 paper exposed.

    Each one silently cost content the documents actually contained: prompts,
    or a question's sample answers. None of them raised, and the run before
    the fix reported 25 clean questions with no prompt text in any of them —
    so each is pinned here by its own failure shape rather than by the fix.
    """

    def test_a_text_layer_set_in_non_breaking_spaces_still_parses(self):
        # Every space in the Spring 2016 text layer is U+00A0, which `[ \t]`
        # does not match: no structural regex fired and the whole paper read
        # as one report half.
        nbsp = (
            "EXAM\u00a05\u00a0SPRING\u00a02016\u00a0SAMPLE\u00a0ANSWERS\u00a0AND\u00a0"
            "EXAMINER\u2019S\u00a0REPORT\nQUESTION\u00a01\u00a0\n"
            "TOTAL\u00a0POINT\u00a0VALUE:\u00a02.5\u00a0\n"
        )
        flat = mdmath.normalize_spaces(nbsp)
        self.assertEqual(len(flat), len(nbsp))  # length-preserving
        self.assertTrue(px.CAS_QUESTION_RE.search(flat))
        self.assertTrue(px.CAS_POINTS_RE.search(flat))
        self.assertRegex(flat, r"(?i)sample answers and examiner")

    def test_normalize_spaces_leaves_everything_else_alone(self):
        text = "a \u2019quoted\u2019 On\u2010Level \u00d7 value\u00a0here"
        self.assertEqual(
            mdmath.normalize_spaces(text), "a \u2019quoted\u2019 On\u2010Level \u00d7 value here"
        )

    def test_ocr_is_read_at_its_own_resolution_not_the_render_budget(self):
        # At the 110 dpi render budget Tesseract reads "Eamed", "Abenefit",
        # "ofone" and drops an exhibit column. OCR costs CPU, not tokens.
        self.assertGreater(px.OCR_DPI, px.DEFAULT_DPI)

    def test_numbering_and_alignment_are_merged_not_chosen_between(self):
        # Good OCR recovered the booklet's `2.` but not its `1.`, and the
        # numbered path used to replace alignment wholesale — losing every
        # prompt whose number the scan had eaten.
        booklet = (
            "(1.5 points)\nGiven the exposures:\nCalculate the written car-years.\n"
            "2. (2 points)\nGiven the premium:\nCalculate the on-level factor.\n"
        )
        report = (
            "QUESTION 1\nTOTAL POINT VALUE: 1.5\nSAMPLE ANSWERS\n2 x 0.75\n"
            "QUESTION 2\nTOTAL POINT VALUE: 2\nSAMPLE ANSWERS\n1.05 / 1.02\n"
        )
        records = px.cas_records(
            "5", 2016, "Spring", [_page(1, booklet)], [_page(2, report)]
        )
        self.assertEqual([r["num"] for r in records], [1, 2])
        self.assertIn("written car-years", records[0]["body"])
        self.assertIn("on-level factor", records[1]["body"])
        self.assertEqual(records[0]["prompt_source"], "aligned")
        self.assertEqual(records[1]["prompt_source"], "numbered")

    def test_an_aligned_span_never_overlaps_one_numbering_already_owns(self):
        booklet = "2. (2 points)\nGiven the premium:\nCalculate the factor.\n"
        report = (
            "QUESTION 1\nTOTAL POINT VALUE: 2\nSAMPLE ANSWERS\nx\n"
            "QUESTION 2\nTOTAL POINT VALUE: 2\nSAMPLE ANSWERS\ny\n"
        )
        records = px.cas_records(
            "5", 2016, "Spring", [_page(1, booklet)], [_page(2, report)]
        )
        bodies = [r["body"] for r in records]
        self.assertEqual(sum(1 for b in bodies if "Calculate the factor" in b), 1)

    def test_a_heading_with_a_typographic_apostrophe_is_structural(self):
        # Unrecognised, `EXAMINER’S REPORT` folds into the bullet above it,
        # the sample/commentary split never happens, and every part takes the
        # commentary as its answer.
        self.assertTrue(px.is_structural("EXAMINER\u2019S REPORT"))
        self.assertTrue(px.is_structural("SAMPLE ANSWERS"))
        lines = ["- Policy year losses develop to ult", "EXAMINER\u2019S REPORT"]
        self.assertEqual(px.reflow_block("\n".join(lines)).splitlines(), lines)

    def test_boxed_sample_markers_are_not_read_as_a_table(self):
        # A report that boxes its samples puts `Part b:` and `Sample 1` inside
        # the box; read as a table they stop being line-initial and every part
        # after the first loses its sample answer.
        self.assertTrue(px.swallows_structure([
            ["Part b: 0.5 point", ""],
            ["Sample 1 Select the all-year average of 2.01", ""],
        ]))
        self.assertFalse(px.swallows_structure([
            ["Accident Year", "12", "24"], ["2013", "1.44", "1.12"],
        ]))


    def test_the_next_questions_label_is_not_left_on_the_prompt(self):
        booklet = "(2 points)\nCalculate the large deductible premium.\n\n10.\n"
        report = "QUESTION 9\nTOTAL POINT VALUE: 2\nSAMPLE ANSWERS\n619,207\n"
        records = px.cas_records(
            "5", 2016, "Spring", [_page(1, booklet)], [_page(2, report)]
        )
        self.assertTrue(records[0]["body"].endswith("premium."))


class TestSurplusBookletParts(unittest.TestCase):
    """A booklet part the report never prices, from a span that over-ran."""

    BOOKLET = (
        "1. (2.5 points)\nGiven the following:\n"
        "a. (2 points)\nCalculate the indicated change.\n"
        "b. (0.5 points)\nDiscuss two benefits.\n"
        "c. (0.5 points)\nThis one belongs to question 2.\n"
    )

    def test_a_part_that_breaks_the_report_total_is_dropped(self):
        parts = [
            {"label": "a", "points": 2.0, "samples": ["x"], "report": ""},
            {"label": "b", "points": 0.5, "samples": ["y"], "report": ""},
        ]
        warnings: list[str] = []
        px.attach_part_prompts(self.BOOKLET, parts, 2.5, warnings)
        self.assertEqual([p["label"] for p in parts], ["a", "b"])
        self.assertEqual(sum(p["points"] for p in parts), 2.5)
        self.assertIn("booklet part c", warnings[0])

    def test_a_part_the_total_has_room_for_is_still_added(self):
        parts = [
            {"label": "a", "points": 2.0, "samples": ["x"], "report": ""},
            {"label": "b", "points": 0.5, "samples": ["y"], "report": ""},
        ]
        warnings: list[str] = []
        px.attach_part_prompts(self.BOOKLET, parts, 3.0, warnings)
        self.assertEqual([p["label"] for p in parts], ["a", "b", "c"])
        self.assertEqual(warnings, [])

    def test_with_no_total_known_nothing_is_dropped(self):
        parts = [{"label": "a", "points": 2.0, "samples": ["x"], "report": ""}]
        px.attach_part_prompts(self.BOOKLET, parts, None, [])
        self.assertEqual([p["label"] for p in parts], ["a", "b", "c"])

    def test_a_single_part_question_loses_its_redundant_total(self):
        stem = px.attach_part_prompts("(2.5 points)\n\nCalculate the premium.\n", [])
        self.assertEqual(stem.strip(), "Calculate the premium.")


class TestUnreadableSamples(unittest.TestCase):
    """Naming the sample answers that will not ship as explanations."""

    def test_a_flattened_triangle(self):
        self.assertIsNotNone(px.unreadable_sample(
            "AY 12 - 24\n24 - 36\n1.118\n2.053\n1.256\n3.143\n"
        ))

    def test_a_row_holding_a_whole_column(self):
        self.assertIsNotNone(px.unreadable_sample(
            "| Class | Loss Ratio |\n|---|---|\n| A B C | 76.7% 71.9% 79.0% |\n"
        ))

    def test_space_aligned_columns_that_never_became_a_table(self):
        self.assertIsNotNone(px.unreadable_sample(
            "2013      .917         .92            1\n"
            "2014      .889         .887\n"
            "2015      .867         .12\n"
        ))

    def test_calculation_steps_run_onto_one_line(self):
        self.assertIsNotNone(px.unreadable_sample(
            "2013 EP x On-Level Factor = 1500 x 1.0484 = 1572.54 = On-Level EP "
            "2013 Loss x On-Level Factor x Loss Trend = 800 x 1.0164 = 888.9\n"
        ))

    def test_characters_from_an_unmappable_font(self):
        self.assertIsNotNone(px.unreadable_sample(
            "Average fixed expenses = 137.7\n600 \u072b137.7\n"
            "1 \u0d241593 \u072b1023.59\n"
        ))

    def test_a_readable_sample_is_left_alone(self):
        for good in [
            "Credibility = sqrt(109/683) = 39.95%\n"
            "Complement = 8.5% (countrywide indication)\n"
            "Weighted = 41.99% x 39.95% + 60.05% x 8.5% = 21.88%\n",
            "Insured A = 1000+2000+3000+4000 = 10,000\n",
            "| Territory | Indicated |\n|---|---|\n| A | 1.275 |\n| B | 0.919 |\n",
            "",
        ]:
            self.assertIsNone(px.unreadable_sample(good), good[:40])

    def test_flags_name_the_part_they_belong_to(self):
        record = {
            "solution": "",
            "parts": [
                {"label": "a", "samples": ["1.118\n2.053\n1.256\n3.143\n"]},
                {"label": "b", "samples": ["Select the industry average and justify it."]},
            ],
        }
        flags = px.rewrite_flags(record)
        self.assertEqual(len(flags), 1)
        self.assertTrue(flags[0].startswith("part a:"))


class TestBookletCoverageReport(unittest.TestCase):
    """The report has to say when the booklet was not read at all."""

    @staticmethod
    def _records(sources):
        return [
            {
                "num": i + 1, "id": f"cas5-2016s-q{i + 1}", "needs_vision": not src,
                "ocr": False, "warnings": [], "rewrite_flags": [], "prompt_source": src,
                "solution": "x", "parts": [], "pages": {"question": [], "solution": []},
                "body": "", "options": {}, "answer": None,
            }
            for i, src in enumerate(sources)
        ]

    def _report(self, sources, split):
        with tempfile.TemporaryDirectory() as tmp:
            return px.write_report(
                Path(tmp) / "report.md", self._records(sources), 110, 0, split
            )

    def test_a_booklet_that_yielded_nothing_is_called_out(self):
        text = self._report(["", "", ""], px.SplitInfo(97, 30))
        self.assertIn("cut at page **31** of 97", text)
        self.assertIn("prompts placed: **0 of 3**", text)
        self.assertIn("No prompt came out of the booklet at all", text)

    def test_a_split_that_found_no_booklet_is_called_out(self):
        text = self._report(["", ""], px.SplitInfo(97, 0))
        self.assertIn("every page in the report half", text)

    def test_a_healthy_run_gets_the_routes_and_no_banner(self):
        text = self._report(["numbered", "aligned", "aligned"], px.SplitInfo(97, 30))
        self.assertIn("prompts placed: **3 of 3**", text)
        self.assertIn("1 by the booklet's own numbering", text)
        self.assertIn("2 by point-value alignment", text)
        self.assertNotIn("No prompt came out", text)

    def test_two_documents_report_their_halves_without_a_cut(self):
        text = self._report(["numbered"], px.SplitInfo(40, 12, combined=False))
        self.assertIn("booklet: **12** page(s)", text)
        self.assertNotIn("cut at page", text)


# ─── Tables, furniture, reflow ────────────────────────────────────────────────


class TestTables(unittest.TestCase):
    def test_rows_to_markdown(self):
        md = px.rows_to_markdown([["Policy", "Vehicles"], ["A", "2"], ["B", "3"]])
        self.assertEqual(md.splitlines()[0], "| Policy | Vehicles |")
        self.assertEqual(md.splitlines()[1], "|---|---|")
        self.assertIn("| B | 3 |", md)

    def test_empty_columns_are_dropped(self):
        md = px.rows_to_markdown([
            ["", "AY", "", "Frequency", ""],
            ["", "2013", "", "0.100", ""],
            ["", "2014", "", "0.100", ""],
        ])
        self.assertEqual(md.splitlines()[0], "| AY | Frequency |")
        self.assertEqual(md.splitlines()[1], "|---|---|")

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

    def test_a_repeated_structural_marker_is_not_furniture(self):
        # `Sample Answer 1` heads an answer on most pages of a CAS report.
        pages = [
            px.Page(number=i, text=f"EXAM 5 FALL 2016 REPORT\nSample Answer 1\nwork {i}")
            for i in range(1, 6)
        ]
        drop = px.furniture_lines(pages)
        self.assertIn("EXAM 5 FALL 2016 REPORT", drop)
        self.assertNotIn("Sample Answer 1", drop)

    def test_reflow_joins_wrapped_lines(self):
        out = px.reflow_block("Calculate the percentage of the\ngroup that watched none.")
        self.assertEqual(out, "Calculate the percentage of the group that watched none.")

    def test_calculation_steps_stay_on_their_own_lines(self):
        out = px.reflow_block(
            "AY 2013: (7,500 - 1,000) * 0.25 / 0.7 = 2,321\n"
            "AY 2014: (8,600 - 600) * 0.22 / 0.92 = 1,913\n"
            "Total Expected Emergence = 4,234"
        )
        self.assertEqual(len(out.splitlines()), 3)

    def test_reflow_keeps_list_items_apart(self):
        out = px.reflow_block("Given:\n(i) 28% watched\ngymnastics\n(ii) 29% watched")
        self.assertEqual(
            out.splitlines(),
            ["Given:", "(i) 28% watched gymnastics", "(ii) 29% watched"],
        )

    def test_a_bullet_on_its_own_line_joins_its_text(self):
        out = px.reflow_block(
            "Common mistakes included:\n\u2022\nNot taking half of the exposures\n"
            "\u2022\nNot including all the policies\n\u2022\nCalculating earned instead"
        )
        self.assertEqual(
            out.splitlines(),
            [
                "Common mistakes included:",
                "- Not taking half of the exposures",
                "- Not including all the policies",
                "- Calculating earned instead",
            ],
        )

    def test_a_bullet_line_keeps_its_trailing_space(self):
        # PDF text lines carry trailing spaces; the real report extracts "\u2022 ".
        self.assertEqual(
            px.merge_lone_bullets(["\u2022 ", "Not taking half", "\u2022 ", "Not including"]),
            ["- Not taking half", "- Not including"],
        )

    def test_merge_lone_bullets_leaves_normal_lines_alone(self):
        self.assertEqual(
            px.merge_lone_bullets(["- already a bullet", "plain text"]),
            ["- already a bullet", "plain text"],
        )

    def test_reflow_dehyphenates(self):
        self.assertEqual(px.reflow_block("expo-\nsure"), "exposure")

    def test_reflow_keeps_a_compound_hyphen(self):
        # `age-\nto-age` is one compound broken at a real hyphen, not a wrap.
        self.assertEqual(px.reflow_block("age-\nto-age factors"), "age-to-age factors")

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

    def test_point_label_is_singular_only_at_one(self):
        self.assertEqual(px.points_label(1), "1 point")
        self.assertEqual(px.points_label(0.5), "0.5 points")
        self.assertEqual(px.points_label(2.25), "2.25 points")
        self.assertEqual(px.points_label(2.0), "2 points")

    def test_per_part_explanation_override(self):
        record = {
            "num": 16, "id": "cas5-2016f-q16", "bank": "exam-5", "type": "multi-part",
            "body": "Given the following:", "options": {}, "answer": None, "points": 1.5,
            "parts": [
                {"label": "a", "points": 0.75, "samples": ["garbled 100 150"], "report": "r"},
                {"label": "b", "points": 0.75, "samples": ["fine as is"], "report": "r"},
            ],
            "solution": "", "pages": {"question": [1], "solution": [2]},
            "needs_vision": False, "warnings": [],
        }
        md = qw.render(record, {"topic": "T", "learning_objective": "L",
                                "difficulty": "medium", "wiki_link": ["Concepts/T"]},
                       explanation="## Part a\n\nA proper triangle.")
        self.assertIn("A proper triangle.", md)
        self.assertNotIn("garbled", md)
        self.assertIn("fine as is", md)  # the part not named keeps the publisher's

    def test_split_explanation_override(self):
        out = qw.split_explanation_override("## Part a\nfirst\n## Part b\nsecond")
        self.assertEqual(out, {"a": "first", "b": "second"})
        self.assertEqual(qw.split_explanation_override("no headings"), {"": "no headings"})

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


# `import importlib` alone does not bring in `importlib.util`, so the submodule
# is imported explicitly above: without it this guard raises AttributeError on a
# cold interpreter and takes the whole module down instead of skipping.
@unittest.skipUnless(
    importlib.util.find_spec("pymupdf") is not None, "PyMuPDF not installed"
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
