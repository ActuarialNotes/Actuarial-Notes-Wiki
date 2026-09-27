"""Tests for the resource-page standard (docs/resource-pages.md): the lint, the
frontmatter fixer, the extractor's pure parts — and every page in Resources/Books/
held to zero lint errors.

Run: python3 -m unittest discover -s scripts
"""

import glob
import os
import sys
import unittest

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import resource_extract as rx  # noqa: E402
import resource_lint as rl  # noqa: E402
import vault_links as vl  # noqa: E402

VERIFICATION = """verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0000000000000000000000000000000000000000000000000000000000000000
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Fixture.md"""

# A page that meets the standard. The cover and the links are real vault files,
# so the fixture exercises the same resolution a real page gets.
GOOD = f"""---
Title: "Minimum Capital Test (MCT) for Federally Regulated Property and Casualty Insurance Companies"
Authors: "Office of the Superintendent of Financial Institutions"
Publisher: "Office of the Superintendent of Financial Institutions"
Year: "2024"
date: "2024"
Type: "Guideline"
Code: "MCT"
Available from: "[osfi-bsif.gc.ca](https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024)"
{VERIFICATION}
---
![[OSFI MCT - Cover.svg]]

OSFI's guideline setting out the capital adequacy test for federally regulated property and casualty insurers, effective 1 January 2024.

> [!info] On the syllabus
> - [[Exam 6C (CAS)|Exam 6C]] — objectives C2–C4, excluding the risk factors.

## 1 Overview and General Requirements
- 1.1 Overview
    - Insurers maintain at least 100% of [[Capital Available|capital available]] to minimum capital required.
- 1.2 General requirements

## 2 Definition of Capital Available

## Related readings
- [[OSFI Target Capital]] — the guideline the MCT refers to for target levels

## Sources
- [Minimum Capital Test Guideline (OSFI, 2024)](https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024) — the document: title, effective date, section headings
- [CAS Exam 6C Content Outline](https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf) — the assigned scope
"""

LISTED = {"Fixture": ["Exam 6C (CAS)"]}


def lint(text: str, listings=None) -> list[tuple[str, str]]:
    page = rl.parse_page("Resources/Books/Fixture.md", text)
    report = rl.Report()
    rl.lint_frontmatter(page, report)
    rl.lint_body(page, report, LISTED if listings is None else listings, VAULT)
    return [(code, msg) for sev, _, _, code, msg in report.items if sev == "error"]


def codes(text: str, listings=None) -> set[str]:
    return {c for c, _ in lint(text, listings)}


VAULT = vl.Vault(rl.ROOT)


class LintTest(unittest.TestCase):
    def test_a_page_to_the_standard_passes(self):
        self.assertEqual(lint(GOOD), [])

    def test_commentary_headings_are_refused(self):
        bad = GOOD.replace("## 2 Definition of Capital Available", "## Why it is on the syllabus\n- it is examined")
        self.assertIn("editorial", codes(bad))

    def test_a_documents_own_question_heading_is_not_commentary(self):
        for heading in ("What do the terms mean?", "How Charts Work", "Where We Are Now – Diagnosis"):
            ok = GOOD.replace("## 2 Definition of Capital Available", f"## {heading}")
            self.assertNotIn("editorial", codes(ok), heading)
        for heading in ("The exam angles", "Where it fits on the syllabus", "Links"):
            bad = GOOD.replace("## 2 Definition of Capital Available", f"## {heading}")
            self.assertIn("editorial", codes(bad), heading)

    def test_an_unreadable_document_says_so_instead_of_growing_contents(self):
        no_contents = GOOD.split("## 1 Overview")[0] + "## Sources" + GOOD.split("## Sources")[1]
        self.assertIn("shape", codes(no_contents))
        said = no_contents.replace("## Sources", "> [!note] Contents unavailable\n"
                                   "> No copy is published; the CAS supplies it in the study kit.\n\n## Sources")
        self.assertEqual(lint(said), [])
        both = GOOD.replace("## 1 Overview", "> [!note] Contents unavailable\n> Not published.\n\n## 1 Overview")
        self.assertIn("unavailable", codes(both))

    def test_prose_under_a_division_is_refused(self):
        bad = GOOD.replace("## 2 Definition of Capital Available",
                           "## 2 Definition of Capital Available\n\nCapital available is the sum of three tiers.")
        self.assertIn("prose", codes(bad))

    def test_sources_are_required_last_and_annotated(self):
        self.assertIn("sources", codes(GOOD.split("## Sources")[0]))
        unannotated = GOOD.replace(" — the assigned scope", "")
        self.assertIn("sources", codes(unannotated))
        head, sources = GOOD.split("## Sources")
        before, related = head.split("## Related readings")
        moved = f"{before}## Sources{sources}\n## Related readings{related}"
        self.assertIn("sources", codes(moved))

    def test_the_callout_must_match_the_exam_pages_both_ways(self):
        self.assertIn("syllabus", codes(GOOD, {"Fixture": ["Exam 6C (CAS)", "Exam 5 (CAS)"]}))
        self.assertIn("syllabus", codes(GOOD, {}))
        missing = GOOD.replace("> [!info] On the syllabus\n> - [[Exam 6C (CAS)|Exam 6C]] — objectives C2–C4, excluding the risk factors.\n\n", "")
        self.assertIn("syllabus", codes(missing))
        no_scope = GOOD.replace(" — objectives C2–C4, excluding the risk factors.", "")
        self.assertIn("syllabus", codes(no_scope))

    def test_the_cover_comes_first_and_exists(self):
        self.assertIn("cover", codes(GOOD.replace("![[OSFI MCT - Cover.svg]]", "![[No Such Cover.svg]]")))
        self.assertIn("cover", codes(GOOD.replace("![[OSFI MCT - Cover.svg]]\n", "")))

    def test_the_lead_is_long_enough_to_describe_the_page(self):
        self.assertIn("lead", codes(GOOD.replace(
            "OSFI's guideline setting out the capital adequacy test for federally regulated property and casualty insurers, effective 1 January 2024.",
            "The MCT.")))

    def test_frontmatter_rules(self):
        self.assertIn("key-deprecated", codes(GOOD.replace('Authors: "', 'Author: "')))
        self.assertIn("type", codes(GOOD.replace('Type: "Guideline"', 'Type: "Regulatory Guideline"')))
        self.assertIn("key-quoting", codes(GOOD.replace('Year: "2024"', "Year: 2024")))
        self.assertIn("year", codes(GOOD.replace('date: "2024"', 'date: "2023"')))
        self.assertIn("key-order", codes(GOOD.replace('Year: "2024"\ndate: "2024"\n', "").replace(
            'Type: "Guideline"', 'Type: "Guideline"\nYear: "2024"\ndate: "2024"')))
        self.assertIn("available-from", codes(GOOD.replace("[osfi-bsif.gc.ca]", "[OSFI]")))
        self.assertIn("edition", codes(GOOD.replace('Type: "Guideline"', 'Edition: "Fifth"\nType: "Guideline"')))
        self.assertIn("isbn", codes(GOOD.replace('Code: "MCT"', 'Code: "MCT"\nISBN: "978-0-306-40615-8"')))
        self.assertNotIn("isbn", codes(GOOD.replace('Code: "MCT"', 'Code: "MCT"\nISBN: "978-0-306-40615-7"')))

    def test_a_related_reading_is_a_resource_page(self):
        self.assertIn("related", codes(GOOD.replace("- [[OSFI Target Capital]]", "- [[Capital Available]]")))

    def test_tables_are_refused(self):
        self.assertIn("table", codes(GOOD.replace("## 2 Definition of Capital Available",
                                                  "## 2 Definition of Capital Available\n| a | b |\n|---|---|\n| 1 | 2 |")))

    def test_links_must_land_exactly(self):
        self.assertIn("link", codes(GOOD.replace("[[Capital Available|", "[[capital available|")))

    def test_a_vault_authored_page_needs_no_sources(self):
        own = GOOD.replace('Publisher: "Office of the Superintendent of Financial Institutions"',
                           'Publisher: "Actuarial Notes"').split("## Related readings")[0]
        self.assertNotIn("sources", codes(own))


class HelpersTest(unittest.TestCase):
    def test_isbn_check_digits(self):
        self.assertTrue(rl.isbn_ok("978-0-306-40615-7"))
        self.assertTrue(rl.isbn_ok("0-306-40615-2"))
        self.assertFalse(rl.isbn_ok("978-0-306-40615-8"))
        self.assertFalse(rl.isbn_ok("12345"))

    def test_host_label_drops_www(self):
        self.assertEqual(rl.host_label("https://www.casact.org/x.pdf"), "casact.org")
        self.assertEqual(rl.host_label("https://open.alberta.ca/x"), "open.alberta.ca")

    def test_fix_canonicalises_without_choosing_values(self):
        messy = f"""---
Year: 2019
Title: A First Course in Probability
Author: Sheldon Ross
Publisher: Pearson
Edition: 10th
{VERIFICATION}
---
body
"""
        fixed = rl.fix_text(messy)
        self.assertEqual(fixed.split(VERIFICATION)[0], '---\nTitle: "A First Course in Probability"\n'
                         'Authors: "Sheldon Ross"\nPublisher: "Pearson"\nYear: "2019"\ndate: "2019"\n'
                         'Edition: "10th"\n')
        self.assertTrue(fixed.endswith(f"{VERIFICATION}\n---\nbody\n"))
        self.assertEqual(rl.fix_text(fixed), fixed)


class ExtractTest(unittest.TestCase):
    def test_bookmarks_become_the_vault_outline(self):
        toc = [[1, "1 Introduction", 3], [2, "1.1 Purpose", 3], [3, "1.1.1 Scope", 4], [1, "Appendix  A", 9]]
        self.assertEqual(rx.outline_markdown(toc),
                         "## 1 Introduction\n- 1.1 Purpose\n    - 1.1.1 Scope\n\n## Appendix A\n")

    def test_kinds_are_read_off_the_bytes(self):
        self.assertEqual(rx.kind_of(b"%PDF-1.7 ...", "", "x"), "pdf")
        self.assertEqual(rx.kind_of(b"<!DOCTYPE html><html>", "text/html", "x"), "html")
        self.assertEqual(rx.kind_of(b"PK\x03\x04", "", "return.xlsx"), "xlsx")

    def test_page_ranges(self):
        self.assertEqual(rx.parse_range("1-3,9", 5), [1, 2, 3])
        self.assertEqual(rx.parse_range(None, 5), [])


class VaultTest(unittest.TestCase):
    """Every resource page meets the standard — the lint's zero is held here, too."""

    def test_every_resource_page_lints_clean(self):
        listings = rl.exam_listings()
        report = rl.Report()
        for path in sorted(glob.glob(os.path.join(rl.ROOT, rl.BOOKS, "*.md"))):
            rl.lint_page(os.path.relpath(path, rl.ROOT), report, listings, VAULT)
        errors = [f"{p}:{ln}: [{c}] {m}" for sev, p, ln, c, m in report.items if sev == "error"]
        self.assertEqual(errors, [], f"{len(errors)} resource-lint error(s); run scripts/resource_lint.py")


if __name__ == "__main__":
    unittest.main()
