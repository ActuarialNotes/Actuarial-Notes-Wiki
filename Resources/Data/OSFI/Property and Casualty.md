---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:79d04ddbb89c8d04701bf9d161ff333399cf9fa6206f2b022dbad27ae665fff1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Data/OSFI/Property and Casualty.md
---

# Property and Casualty (OSFI)

The Office of the Superintendent of Financial Institutions' dataset **Property and casualty companies** on the Open Government Portal: the financial data federally regulated property and casualty insurers file with OSFI, as filed, updated quarterly. Each return is a resource of its own, as CSV files and through the portal's datastore API, with OSFI's English and French label on every cell. Before the portal, the same filings were published on OSFI's Beyond 20/20 site ([[Historical OSFI Data]]).

> [!info] In Actuarial Tools
> The **Insurer Return** data source reads what each insurer filed on page 10.00 of PC4, the Minimum Capital Test summary, for every quarter from Q1 2023 to Q2 2026, and hands its lines to **MCT Ratio**, which recomputes the ratio from them and sets it beside the filed one. See [[MCT]] and [[Capital Available]].

## Returns

- PC1 – P&C Core Financial Statement Return (active)
- PC2 – P&C Supervisory Quarterly Return (active)
- PC3 – P&C Supervisory Annual Return (active)
- PC4 – P&C Minimum Capital Test and Branch Adequacy of Assets Test (active)
- MI, MI3, MI4, MI5 – the mortgage insurers' capital adequacy test and returns (active)
- 1Q – PC Quarterly (inactive Q1 2024)
- 1 – PC-1 Canadian Annual and 3 – PC-1i Canadian Interim (inactive Q3 2014)
- 2 – PC-2 Foreign Annual (inactive Q4 2013) and 4 – PC-2i Foreign Interim (inactive Q3 2014)
- MI1 – Mortgage Insurance Quarterly (inactive Q4 2022)

The dataset also carries a data dictionary, a user manual, a list of property and casualty company subsidiaries, a guide to reading it with Power BI and Excel, and a mapping of the legacy FINDAT reports to these datasets.

## What the dataset says about its figures

- To determine total industry data, the totals "Total Canadian P&C", "Total Foreign P&C" and "Total Canadian Mortgage Insurers" must be added.
- Data aggregated under "Total Canadian P&C Companies" do not include data reported by companies that are subsidiaries of other P&C companies, since the parents' consolidated data already include them.
- Insurers with a December year-end filed the IFRS 17 returns from Q1 2023, and those with an October year-end from Q1 2024, so total industry data for the 2023 transition year may not be available.

## Licence

Open Government Licence – Canada: <https://open.canada.ca/en/open-government-licence-canada>. Its attribution statement is "Contains information licensed under the Open Government Licence – Canada."

## Sources

- Dataset page: <https://open.canada.ca/data/en/dataset/4c6c515f-7c44-4bb6-ab56-c5f79f75f705> — its description, resources and licence, read through the portal's `package_show` API on 2026-11-09 (sha256 `0362e316078b10cc…`)
- PC4 – P&C Minimum Capital Test and Branch Adequacy of Assets Test, Q1 2023 to Q2 2026 — read through the portal's `datastore_search` API on 2026-11-09 by `scripts/osfi_extract.py`, each quarter's content hash recorded in `.osfi/pc/<quarter>/manifest.json`
