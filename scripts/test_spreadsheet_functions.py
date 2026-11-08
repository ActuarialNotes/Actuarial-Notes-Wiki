"""Tests for scripts/spreadsheet_functions.py — the column reading, not the download."""

import unittest

from spreadsheet_functions import extract

HEADER = (
    "Function type", None, "Pearson VUE test driver spreadsheet (2023)", None,
    "Description", "Microsoft Excel  (Office 365, Oct 2023)", "Google Sheets",
)


class ExtractTest(unittest.TestCase):
    def test_reads_the_pearson_column(self):
        rows = [
            HEADER,
            ("Math & Trig", None, "ABS", None, "…", "ABS", "ABS"),
            ("Logical", None, True, None, "…", True, True),
            ("Statistical", None, " -------", None, "…", "FORECAST.LINEAR", "FORECAST.LINEAR"),
            ("Operator", None, " -------", None, "…", " -------", "ADD"),
            (None,) * 7,
        ]
        out = extract(rows)
        self.assertEqual(out["functions"], ["ABS", "TRUE"])
        self.assertEqual(out["categories"]["ABS"], "Math & Trig")
        self.assertEqual(out["notInPearsonButInExcel"], ["FORECAST.LINEAR"])
        self.assertTrue(out["column"].startswith("Pearson VUE test driver spreadsheet"))

    def test_fails_loudly_without_the_column(self):
        with self.assertRaises(SystemExit):
            extract([("Function type", "Excel")])


if __name__ == "__main__":
    unittest.main()
