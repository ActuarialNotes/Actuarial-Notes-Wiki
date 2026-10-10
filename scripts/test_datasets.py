"""Tests for scripts/dataset_extract.py: the parsers, on saved samples of each publisher's format."""

import io
import unittest
import zipfile

import dataset_extract as dx

CU_SERIES = "series_id\tarea_code\titem_code\tseries_title\tbegin_year\nCUUR0000SAM \t0000\tSAM\tMedical care in U.S. city average, all urban consumers, not seasonally adjusted\t1947\n"
CU_DATA = (
    "series_id                     \tyear\tperiod\t       value\tfootnote_codes\n"
    "CUUR0000SAM                   \t2025\tM09\t     580.1\t\n"
    "CUUR0000SAM                   \t2025\tM10\t         -\t\n"
    "CUUR0000SAM                   \t2025\tM13\t     575.0\t\n"
    "CUUR0000SA0                   \t2025\tM09\t     320.0\t\n"
    "CIU2020000000000I             \t2025\tQ02\t     178.0\t\n"
)


class Bls(unittest.TestCase):
    def test_titles(self):
        self.assertEqual(dx.bls_titles(CU_SERIES)["CUUR0000SAM"][:12], "Medical care")

    def test_points_skip_annual_averages_and_gaps(self):
        pts = dx.bls_points(CU_DATA, {"CUUR0000SAM", "CIU2020000000000I"})
        self.assertEqual(pts["CUUR0000SAM"], {"2025-09": 580.1})
        self.assertEqual(pts["CIU2020000000000I"], {"2025-Q2": 178.0})


class Shapes(unittest.TestCase):
    def test_months(self):
        self.assertEqual(dx.months_from("2024-11", "2025-02"), ["2024-11", "2024-12", "2025-01", "2025-02"])

    def test_aligned_leaves_gaps(self):
        self.assertEqual(dx.aligned(["2025-09", "2025-10"], {"2025-09": 1.0}), [1.0, None])


class StatCan(unittest.TestCase):
    def test_reads_the_table_csv_from_its_zip(self):
        buf = io.BytesIO()
        with zipfile.ZipFile(buf, "w") as z:
            z.writestr("18100004.csv", '﻿"REF_DATE","GEO","Products and product groups","UOM","VALUE"\n"2025-01","Canada","All-items","2002=100","161.3"\n')
            z.writestr("18100004_MetaData.csv", "x")
        rows = dx.read_statcan_zip(buf.getvalue(), "18100004")
        self.assertEqual(rows[0]["REF_DATE"], "2025-01")
        self.assertEqual(rows[0]["VALUE"], "161.3")


class Fetcher(unittest.TestCase):
    def test_offline_refuses_what_is_not_cached(self):
        import tempfile
        from pathlib import Path

        with tempfile.TemporaryDirectory() as d:
            f = dx.Fetcher(Path(d), offline=True)
            with self.assertRaises(SystemExit):
                f.get("https://example.invalid/none")


if __name__ == "__main__":
    unittest.main()
