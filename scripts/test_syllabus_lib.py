"""Tests for the noun-phrase rule in scripts/syllabus_lib.py and syllabus_lint.py.

Run: python3 -m unittest discover -s scripts
"""

import os
import sys
import unittest

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import syllabus_lib as sl  # noqa: E402
import syllabus_lint  # noqa: E402
import vault_links as vl  # noqa: E402


def phrases(text: str) -> list[str]:
    return [p for _, _, p in sl.noun_phrases(text)]


class NounPhraseTest(unittest.TestCase):
    def test_cuts_at_verbs_function_words_and_punctuation(self):
        self.assertEqual(phrases("Calculate the cost of the layer, given the loss cost"),
                         ["cost", "layer", "loss cost"])

    def test_generic_words_are_trimmed_off_the_edges(self):
        # "calculations" names nothing: the chunk is what a note could be about
        self.assertEqual(phrases("Perform Hazard Rate calculations"), ["Hazard Rate"])
        self.assertEqual(phrases("Select an appropriate complement"), ["complement"])
        # trimming never exempts a phrase that names something: an unlinked
        # "Time Series" is still reported, as what's left of it
        self.assertEqual(phrases("the time value"), [])
        self.assertEqual(phrases("Time Series"), ["Series"])

    def test_a_wholly_generic_phrase_is_exempt(self):
        self.assertEqual(phrases("the role and purpose of the key concepts"), [])

    def test_inline_math_is_notation_not_a_noun(self):
        self.assertEqual(phrases(r"a rate $\lambda(t)$ that changes over time"), ["rate"])
        self.assertEqual(phrases(r"the hat matrix $H = X(X^TX)^{-1}X^T$, and fitted values"),
                         ["hat matrix", "fitted values"])

    def test_hyphenated_function_words_break_a_phrase(self):
        self.assertEqual(phrases(r"a $k$-out-of-$n$ system"), ["system"])

    def test_unicode_words_are_whole_words(self):
        self.assertEqual(phrases("the Bühlmann credibility premium"), ["Bühlmann credibility premium"])


class ChunkerEdgeTest(unittest.TestCase):
    def test_a_trailing_participle_or_adjective_is_the_clause_not_the_name(self):
        self.assertEqual(phrases("the capital buffer required"), ["capital buffer"])
        self.assertEqual(phrases("the insurer's strategic plan"), ["insurer's strategic plan"])
        self.assertEqual(phrases("aligned with the insurer's strategic"), ["insurer's"])

    def test_adverbs_and_verbs_cut_a_phrase(self):
        self.assertEqual(phrases("losses actuarially adjusted"), ["losses"])
        self.assertEqual(phrases("an adjusted rate"), ["adjusted rate"])   # leading, it is part of the name
        self.assertEqual(phrases("risk once aggregated"), ["risk"])
        self.assertEqual(phrases("Provide advice on early retirement"), ["advice", "early retirement"])

    def test_defined_benefit_is_a_name(self):
        self.assertEqual(phrases("Traditional defined benefit plans"), ["Traditional defined benefit plans"])
        self.assertEqual(phrases("the losses defined above"), ["losses"])


class NeedsNoteTest(unittest.TestCase):
    def test_a_single_word_needs_a_note_only_when_it_has_a_page(self):
        has = {"Credibility"}.__contains__
        self.assertTrue(sl.needs_note("Credibility", has))
        self.assertFalse(sl.needs_note("structure", has))
        self.assertTrue(sl.needs_note("benefit subsidies", has))   # two words: a page to write

    def test_the_lint_skips_a_lone_word_with_no_page(self):
        has = {"IBNR"}.__contains__
        self.assertEqual(sl.unlinked_noun_phrases("the structure of IBNR", has), ["IBNR"])
        self.assertEqual(sl.unlinked_noun_phrases("the structure of IBNR"), ["structure", "IBNR"])


class UnlinkedNounPhraseTest(unittest.TestCase):
    def test_a_link_covers_its_phrase(self):
        self.assertEqual(sl.unlinked_noun_phrases("Perform [[Hazard Rate]] calculations"), [])
        self.assertEqual(sl.unlinked_noun_phrases("determine indicated [[Rate Change]]"), [])

    def test_an_unlinked_phrase_is_reported(self):
        self.assertEqual(sl.unlinked_noun_phrases("Estimate [[IBNR]] and ultimate losses"),
                         ["ultimate losses"])

    def test_a_link_must_cover_most_of_its_phrase(self):
        self.assertEqual(sl.unlinked_noun_phrases("the [[Bayesian Credibility|Bayesian]] credibility procedures"),
                         ["Bayesian credibility"])


PAGE = """\
## Learning Objectives

> [!example]- A. Things {100%}
> Candidates should understand loss reserves.
>
> 1. Calculate [[IBNR]].
>    - using the development triangle
>    - *Key concepts:* anything at all
> 2. Estimate [[Tail Factor|tail factors]].
>
> ### A heading about stuff
> - [[Chain Ladder Method]] — its age-to-age development factors and its structure
>
> **Readings:** Friedland

## Source Material
"""


class LintSubItemsTest(unittest.TestCase):
    """The lint reads an objective's sub-items as objective text — but not its
    headings, `*Key concepts:*` line or `**Readings:**` line."""

    def test_sub_items_are_checked_and_labels_are_not(self):
        page = sl.parse_exam_page("Exam X.md", PAGE)
        report = syllabus_lint.Report()
        exam = {"wiki_id": "x-1", "status": "development"}
        syllabus_lint._lint_links("Exam X.md", page, vl.Vault(), report, report.warn, exam)
        found = {(line, msg.split(": ", 1)[1]) for _, _, line, code, msg in report.items
                 if code == "unlinked-noun"}
        lines = PAGE.split("\n")
        self.assertEqual(found, {
            (lines.index("> Candidates should understand loss reserves.") + 1, "`loss reserves`"),
            (lines.index(">    - using the development triangle") + 1, "`development triangle`"),
            # "structure", one word with no page of its own, need not be a link
            (lines.index("> - [[Chain Ladder Method]] — its age-to-age development factors and its structure") + 1,
             "`age-to-age development`"),
        })


class VaultTest(unittest.TestCase):
    """Every exam page links every noun phrase its objectives name."""

    def test_no_exam_page_leaves_a_noun_phrase_unlinked(self):
        vault = vl.Vault()
        for exam in vl.load_catalog():
            with self.subTest(page=exam["page"]):
                page = sl.parse_exam_page(os.path.join(vl.REPO_ROOT, exam["page"]))
                report = syllabus_lint.Report()
                syllabus_lint._lint_links(exam["page"], page, vault, report, report.warn, exam)
                unlinked = [f"{line}: {msg}" for _, _, line, code, msg in report.items if code == "unlinked-noun"]
                self.assertEqual(unlinked, [])


if __name__ == "__main__":
    unittest.main()
