"""Tests for scripts/osfi_extract.py, on real rows saved from the portal's API (fixtures/osfi_pc_sample.json)."""

import json
import tempfile
import unittest
from pathlib import Path

import osfi_extract as ox

SAMPLE = json.loads((Path(__file__).parent / "fixtures" / "osfi_pc_sample.json").read_text())


def pages(code: str, size: int = 2) -> list[dict]:
    """The sample's rows for one return, cut into pages the way the API serves them."""
    recs = SAMPLE["records"][code]
    return [
        {"total": len(recs), "fields": SAMPLE["fields"], "records": recs[i:i + size], "read_at": "2026-11-09T00:00:00+00:00"}
        for i in range(0, len(recs), size)
    ]


class Periods(unittest.TestCase):
    def test_round_trip(self):
        self.assertEqual(ox.api_period("2026Q2"), "Q2 - 2026")
        self.assertEqual(ox.our_period("Q2 - 2026"), "2026Q2")

    def test_rejects_other_spellings(self):
        for bad in ("2026-Q2", "Q2 2026", "2026Q5"):
            with self.assertRaises(ValueError):
                ox.api_period(bad)

    def test_quarters_cross_a_year(self):
        self.assertEqual(ox.quarters("2025Q3", "2026Q2"), ["2025Q3", "2025Q4", "2026Q1", "2026Q2"])


class Reading(unittest.TestCase):
    def test_finds_every_field_on_the_real_headers(self):
        fm = ox.field_map(SAMPLE["fields"])
        self.assertEqual(fm["value"], "Measure Value/Valeur de mesure")
        self.assertEqual(fm["name_en"], "Total P&C Companies/FIs")
        self.assertEqual(fm["label_fr"], "Libelle de l'adresse du point de donnees")

    def test_values_are_numbers_or_an_error(self):
        self.assertEqual(ox.parse_value("191.75"), 191.75)
        self.assertEqual(ox.parse_value(" -156.00 "), -156.0)
        for bad in ("", "n/a", "NaN", "1,000"):
            with self.assertRaises(ValueError):
                ox.parse_value(bad)

    def test_rows_must_belong_to_the_period_and_return(self):
        rows = ox.read_rows(pages("PC4"), "2026Q2", "PC4")
        self.assertEqual(len(rows), 6)
        with self.assertRaises(RuntimeError):
            ox.read_rows(pages("PC4"), "2026Q1", "PC4")
        with self.assertRaises(RuntimeError):
            ox.read_rows(pages("PC4"), "2026Q2", "PC1")

    def test_hash_ignores_order(self):
        rows = ox.read_rows(pages("PC4"), "2026Q2", "PC4")
        self.assertEqual(ox.content_hash(rows), ox.content_hash(list(reversed(rows))))
        changed = [dict(r) for r in rows]
        changed[0]["value_text"] = "0.01"
        self.assertNotEqual(ox.content_hash(rows), ox.content_hash(changed))

    def test_precision_is_read_off_the_text(self):
        self.assertEqual(ox.decimals("228.50"), 2)
        self.assertEqual(ox.decimals("228.5"), 1)
        self.assertEqual(ox.decimals("12"), 0)
        # The API pads to two places, so a whole number may have been filed whole.
        self.assertEqual(ox.decimals("7063.00"), 0)


class Checks(unittest.TestCase):
    def setUp(self):
        rows = {code: ox.read_rows(pages(code), "2026Q2", code) for code in ("PC1", "PC4")}
        self.inst, self.labels, self.values, self.findings, self.tallies = ox.build(rows)

    def test_institutions_carry_both_languages(self):
        intact = self.inst["27906"]
        self.assertEqual(intact["name"], {"en": "Intact Insurance Company", "fr": "Intact Compagnie d'assurance"})
        self.assertIsNone(intact["inactive"])
        self.assertFalse(intact["aggregate"])

    def test_filed_mct_ratios_reproduce(self):
        # Intact: 5,076,308 / 2,647,415.49 = 191.75 % exactly. Wausau files 7,063 over 228.50
        # → 3,091.03 against a filed 3,090.97, which the inputs' precision allows.
        self.assertEqual(self.tallies["mct_ratio"], {"filed": 2, "exact": 1, "within_rounding": 1, "mismatch": 0, "incomplete": 0})

    def test_a_branch_is_tested_on_line_25(self):
        # Europ Assistance, Q1 2024, as filed: line 10 is 2,742, line 25 28,354, line 130 1.11.
        # Its ratio (2,562,031 %) is line 25's, within what a 1.11 minimum's rounding allows.
        texts = {"220818": {"P100001001": "2742.00", "P100002501": "28354.00",
                            "P100013001": "1.11", "P100014001": "2562031.00"}}
        _, tally = ox.check_mct(texts, self.labels["PC4"])
        self.assertEqual(tally["within_rounding"], 1)

    def test_a_ratio_filed_to_a_whole_percent(self):
        # N.V. Hagelunie, Q4 2023: "5020.00" filed (a whole percent), 5,019.92 % recomputed.
        self.assertEqual(ox.decimals("5020.00"), 0)
        self.assertGreaterEqual(ox.rounding_band(1.0, 2, 1.0, 2, ratio_dp=0), 0.5)

    def test_a_ratio_beyond_rounding_is_a_finding(self):
        texts = {"x": {"P100001001": "1000.00", "P100013001": "500.00", "P100014001": "210.00"}}
        findings, tally = ox.check_mct(texts, self.labels["PC4"])
        self.assertEqual(tally["mismatch"], 1)
        self.assertEqual(findings[0]["recomputed"], 200.0)

    def test_a_branch_balances_on_its_own_total_line(self):
        # AXIS (a branch) files both 799 (705,384) and 999 (1,057,909); 999 is its total, and it
        # is $3k off total assets as filed. A finding, never a correction.
        self.assertEqual(self.tallies["balance_sheet"]["unbalanced"], 1)
        f = next(f for f in self.findings if f["check"] == "balance")
        self.assertEqual((f["total_assets"], f["total_liabilities_and_equity"]), (1057912.0, 1057909.0))
        self.assertEqual(self.values["PC1"]["28117"]["P20108901"], 1057912.0)

    def test_a_label_two_versions_of_the_form_disagree_on_is_one_finding(self):
        rows = ox.read_rows(pages("PC4"), "2026Q2", "PC4")
        ratio = [r for r in rows if r["address"] == "P100014001"]
        ratio[1]["label_en"] = "Ratio, restated form"
        _, labels, _, findings, _ = ox.build({"PC4": rows})
        conflicts = [f for f in findings if f["check"] == "label"]
        self.assertEqual(len(conflicts), 1)
        self.assertEqual([v["rows"] for v in conflicts[0]["variants"]], [1, 1])
        self.assertEqual(labels["PC4"]["P100014001"]["en"], "Ratio (Line 10 or line 25 as a % of line 130)")

    def test_aggregate_rows_are_marked(self):
        self.assertTrue(ox.is_aggregate({"name_en": "Total Canadian Property & Casualty"}))
        self.assertFalse(ox.is_aggregate({"name_en": "Intact Insurance Company"}))


class FakeApi(ox.Api):
    """Serves the sample's PC4 rows two to a page, as the datastore would."""

    def __init__(self, cache, **kw):
        super().__init__(cache, log=lambda *_: None, **kw)
        self.calls = 0

    def _get(self, action, params):
        self.calls += 1
        recs = SAMPLE["records"]["PC4"]
        off, lim = int(params["offset"]), min(int(params["limit"]), 2)
        return {"total": len(recs), "fields": [{"id": f} for f in SAMPLE["fields"]], "records": recs[off:off + lim]}


class Paging(unittest.TestCase):
    def test_reads_every_page_then_the_cache(self):
        with tempfile.TemporaryDirectory() as d:
            ox.PAGE, saved = 2, ox.PAGE
            try:
                api = FakeApi(Path(d))
                got = api.all_pages("r", {"Fiscal Quarter": "Q2 - 2026"}, Path(d) / "c")
                self.assertEqual(sum(len(p["records"]) for p in got), 6)
                self.assertEqual(api.calls, 3)
                again = FakeApi(Path(d), offline=True)
                again.all_pages("r", {"Fiscal Quarter": "Q2 - 2026"}, Path(d) / "c")
                self.assertEqual(again.calls, 0)
            finally:
                ox.PAGE = saved

    def test_offline_refuses_what_is_not_cached(self):
        with tempfile.TemporaryDirectory() as d:
            with self.assertRaises(FileNotFoundError):
                FakeApi(Path(d), offline=True).page("r", {}, 0, Path(d) / "none.json")


class Summary(unittest.TestCase):
    """The PC4 page 10.00 file the Actuarial Tools read (export-summary)."""

    def test_addresses_split_into_page_line_and_column(self):
        self.assertEqual(ox.address_parts("P100014001"), ("10.00", "140", "01"))
        self.assertEqual(ox.address_parts("P602017510"), ("60.20", "175", "10"))
        with self.assertRaises(ValueError):
            ox.address_parts("100014001")

    def test_keeps_page_10_only_and_leaves_out_the_total_rows(self):
        rows = ox.read_rows(pages("PC4"), "2026Q2", "PC4")
        institutions, dictionary, values, _, _ = ox.build({"PC4": rows})
        source = {"resource_last_modified": None, "read_at": "x", "content_sha256": ox.content_hash(rows)}
        s = ox.build_summary({"2026Q2": (institutions, dictionary["PC4"], values["PC4"], source)})
        self.assertTrue(all(line["address"].startswith("P1000") for line in s["lines"]))
        self.assertTrue(all(not institutions[i]["aggregate"] for i in s["institutions"]))
        ratio = next(k for k, line in enumerate(s["lines"]) if line["address"] == ox.MCT_RATIO)
        for inst, row in s["periods"][0]["values"].items():
            self.assertEqual(len(row), len(s["lines"]))
            self.assertEqual(row[ratio], ox.number(values["PC4"][inst][ox.MCT_RATIO]))

    def test_a_line_relabelled_between_quarters_stops_the_export(self):
        labels = {ox.MCT_RATIO: {"en": "Ratio", "fr": "Ratio"}}
        inst = {"1": {"aggregate": False, "name": {"en": "A", "fr": "A"}, "group": {"en": "g", "fr": "g"}}}
        src = {"resource_last_modified": None, "read_at": "x", "content_sha256": "sha256:0"}
        with self.assertRaises(RuntimeError):
            ox.build_summary({
                "2026Q1": (inst, labels, {"1": {ox.MCT_RATIO: 150.0}}, src),
                "2026Q2": (inst, {ox.MCT_RATIO: {"en": "Other", "fr": "Autre"}}, {"1": {ox.MCT_RATIO: 151.0}}, src),
            })


class CommittedSummary(unittest.TestCase):
    """The committed file against the committed manifests: same PC4 content, and its own hashes hold."""

    def setUp(self):
        if not ox.SUMMARY_OUT.exists():
            self.skipTest("no summary file")
        self.summary = json.loads(ox.SUMMARY_OUT.read_text())

    def test_every_quarter_is_the_pc4_its_manifest_hashed(self):
        for p in self.summary["periods"]:
            manifest = ox.OUT / "pc" / p["period"] / "manifest.json"
            self.assertTrue(manifest.exists(), p["period"])
            recorded = json.loads(manifest.read_text())["returns"]["PC4"]["content_sha256"]
            self.assertEqual(p["pc4_sha256"], recorded, p["period"])

    def test_each_quarter_hashes_to_what_it_records(self):
        for p in self.summary["periods"]:
            rows = {inst: {"_cells": cells} for inst, cells in p["values"].items()}
            self.assertEqual(ox.summary_hash(p["period"], rows), p["sha256"], p["period"])

    def test_every_filed_ratio_reproduces_from_its_own_lines(self):
        at = {line["address"]: k for k, line in enumerate(self.summary["lines"])}
        n = 0
        for p in self.summary["periods"]:
            for inst, row in p["values"].items():
                ratio = row[at[ox.MCT_RATIO]]
                if ratio is None:
                    continue
                num = row[at["P100002501"]] or row[at["P100001001"]]
                den = row[at[ox.MCT_DENOMINATOR]]
                # Held to what the filed precision allows, as the extract's own check is.
                band = ox.rounding_band(num, ox.decimals(str(num)), den, ox.decimals(str(den)), ox.decimals(str(ratio)))
                self.assertLessEqual(abs(100 * num / den - ratio), band + 0.005, f"{p['period']} {inst}")
                n += 1
        self.assertGreater(n, 1900)


if __name__ == "__main__":
    unittest.main()
