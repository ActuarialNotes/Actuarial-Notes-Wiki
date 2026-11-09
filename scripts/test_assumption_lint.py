"""Tests for scripts/assumption_lint.py — the Assumptions Bank's gate.

Run: python3 -m unittest scripts.test_assumption_lint  (or discover -s scripts)
"""

from __future__ import annotations

import glob
import hashlib
import re
import os
import sys
import tempfile
import unittest

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import assumption_lint as al  # noqa: E402
import vault_links as vl  # noqa: E402
import verify_lib  # noqa: E402

DOC_TEXT = "Section 1.2. The minimum is 100% and the target 150%. Capital is divided by 1.5. The Minimum Capital Test applies."
DOC_SHA = hashlib.sha256(DOC_TEXT.encode()).hexdigest()

GOOD = f'''---
Title: "Capital ratios"
Source: "[[OSFI MCT]]"
Publisher: "Office of the Superintendent of Financial Institutions"
Edition: "2024"
Effective: "2024-01-01"
Jurisdiction: "CA"
Extraction: "transcribed"
Document: "https://example.org/mct"
Source sha256: "{DOC_SHA}"
Read: "2026-11-08"
---

The ratios.

| Assumption | Kind | Value | Unit | Locator |
|---|---|---|---|---|
| Capital test | fact | Minimum Capital Test | | Title |
| Minimum ratio | capital-ratio | 100 | % | s. 1.2 |
| Target ratio | capital-ratio | 150 | % | s. 1.2 |
| Divisor | capital-factor | 1.5 | factor | s. 1.1 |
| Internal target | capital-ratio | | % | s. 1.2 |

## Sources
- [The guideline](https://example.org/mct) — the ratios
'''


class LintTest(unittest.TestCase):
    vault = vl.Vault(al.ROOT)

    def errors(self, text: str) -> list[str]:
        s = al.parse("Assumptions/T.md", text)
        _, body = verify_lib.split_frontmatter(text)
        return al.lint(s, self.vault, body)

    def test_good_set_passes(self):
        self.assertEqual(self.errors(GOOD), [])

    def explained(self) -> str:
        table = GOOD.split("| Assumption |", 1)[1].split("\n\n", 1)[0]
        return GOOD.replace("| Assumption |" + table, """| Assumption | Kind | Value | Unit | Locator | Basis | Meaning | Fits |
|---|---|---|---|---|---|---|---|
| Capital test | fact | Minimum Capital Test | | Title | | | |
| Minimum ratio | capital-ratio | 100 | % | s. 1.2 | minimum | | |
| Target ratio | capital-ratio | 150 | % | s. 1.2 | target | The supervisory target. | |
| Divisor | capital-factor | 1.5 | factor | s. 1.1 | | | |
| Internal target | capital-ratio | | % | s. 1.2 | target | | |""")

    def test_explained_table_passes(self):
        text = self.explained()
        self.assertIn("| target | The supervisory target. |", text)
        self.assertEqual(self.errors(text), [])

    def test_basis_from_the_vocabulary(self):
        errs = self.errors(self.explained().replace("| target |", "| guessed |"))
        self.assertTrue(any("basis 'guessed'" in e for e in errs), errs)

    def test_fits_names_a_real_tool(self):
        good = self.explained().replace("| The supervisory target. | |", "| The supervisory target. | ratemaking.expense_ratios#total |")
        self.assertEqual(self.errors(good), [])
        errs = self.errors(good.replace("ratemaking.expense_ratios", "ratemaking.no_such_tool"))
        self.assertTrue(any("not a tool" in e for e in errs), errs)
        errs = self.errors(good.replace("#total", ""))
        self.assertTrue(any("Fits is" in e for e in errs), errs)

    def test_page_offset_is_a_number(self):
        text = GOOD.replace('Read: "2026-11-08"', 'Read: "2026-11-08"\nPage offset: "two"')
        errs = self.errors(text)
        self.assertTrue(any("Page offset" in e for e in errs), errs)

    def test_figure_must_be_a_plain_number(self):
        errs = self.errors(GOOD.replace("| 150 | % |", "| 150% | % |"))
        self.assertTrue(any("plain number" in e for e in errs), errs)

    def test_unit_must_fit_the_kind(self):
        errs = self.errors(GOOD.replace("| Divisor | capital-factor | 1.5 | factor |", "| Divisor | capital-factor | 1.5 | years |"))
        self.assertTrue(any("unit 'years'" in e for e in errs), errs)

    def test_unknown_kind(self):
        errs = self.errors(GOOD.replace("capital-factor", "fudge-factor"))
        self.assertTrue(any("not in assumption_vocab.json" in e for e in errs), errs)

    def test_fact_has_no_unit(self):
        errs = self.errors(GOOD.replace("| fact | Minimum Capital Test | |", "| fact | Minimum Capital Test | % |"))
        self.assertTrue(any("unit '%'" in e for e in errs), errs)

    def test_every_row_has_a_locator(self):
        errs = self.errors(GOOD.replace("| 150 | % | s. 1.2 |", "| 150 | % | |"))
        self.assertTrue(any("no locator" in e for e in errs), errs)

    def test_label_used_twice(self):
        errs = self.errors(GOOD.replace("| Target ratio |", "| Minimum ratio |"))
        self.assertTrue(any("label used twice" in e for e in errs), errs)

    def test_source_must_be_a_resource_page(self):
        errs = self.errors(GOOD.replace("[[OSFI MCT]]", "[[No Such Page At All]]"))
        self.assertTrue(any("not a resource page" in e for e in errs), errs)

    def test_key_order_and_quoting(self):
        swapped = GOOD.replace('Edition: "2024"\nEffective: "2024-01-01"', 'Effective: "2024-01-01"\nEdition: "2024"')
        self.assertTrue(any("out of order" in e for e in self.errors(swapped)))
        unquoted = GOOD.replace('Edition: "2024"', "Edition: 2024")
        self.assertTrue(any("double-quoted" in e for e in self.errors(unquoted)))

    def test_dates_and_hash(self):
        errs = self.errors(GOOD.replace('"2024-01-01"', '"January 2024"').replace(DOC_SHA, "abc"))
        self.assertTrue(any("Effective must be a date" in e for e in errs), errs)
        self.assertTrue(any("sha256" in e for e in errs), errs)

    def test_sources_last_and_lists_the_document(self):
        errs = self.errors(GOOD.replace("(https://example.org/mct) — the ratios", "(https://example.org/other) — x"))
        self.assertTrue(any("must list the Document" in e for e in errs), errs)
        errs = self.errors(GOOD + "\n## Notes\nmore\n")
        self.assertTrue(any("must be the last section" in e for e in errs), errs)

    def test_one_table_only(self):
        errs = self.errors(GOOD.replace("## Sources", "| A | B |\n|---|---|\n| 1 | 2 |\n\n## Sources"))
        self.assertTrue(any("more than one table" in e for e in errs), errs)


class AgainstTest(unittest.TestCase):
    def check(self, text: str, doc: str) -> list[str]:
        with tempfile.NamedTemporaryFile("w", suffix=".txt", delete=False) as fh:
            fh.write(doc)
        try:
            return al.check_against(al.parse("Assumptions/T.md", text), fh.name)
        finally:
            os.unlink(fh.name)

    def test_every_figure_printed_passes(self):
        self.assertEqual(self.check(GOOD, DOC_TEXT), [])

    def test_a_figure_not_printed_fails(self):
        errs = self.check(GOOD.replace("| 150 |", "| 175 |"), DOC_TEXT)
        self.assertTrue(any("175 is not printed" in e for e in errs), errs)

    def test_a_fact_not_in_the_text_fails(self):
        errs = self.check(GOOD.replace("Minimum Capital Test | |", "Life Insurance Capital Adequacy Test | |"), DOC_TEXT)
        self.assertTrue(any("not in the document's text" in e for e in errs), errs)

    def test_other_bytes_fail_the_hash(self):
        errs = self.check(GOOD, DOC_TEXT + " ")
        self.assertTrue(any("hashes to" in e for e in errs), errs)

    def test_html_text_is_read(self):
        self.assertEqual(al.number_tokens(al.document_text("x.html", b"<html><body><td>+27.8%</td><td>1,094.5</td></body></html>")), {"27.8", "1094.5"})


class VaultTest(unittest.TestCase):
    def test_every_set_in_the_vault_passes(self):
        paths = sorted(glob.glob(os.path.join(al.ROOT, al.FOLDER, "*.md")))
        self.assertTrue(paths, "the bank has no sets")
        vault = vl.Vault(al.ROOT)
        for path in paths:
            with open(path, encoding="utf-8") as fh:
                text = fh.read()
            s = al.parse(path, text)
            _, body = verify_lib.split_frontmatter(text)
            self.assertEqual(al.lint(s, vault, body), [], os.path.relpath(path, al.ROOT))


if __name__ == "__main__":
    unittest.main()
