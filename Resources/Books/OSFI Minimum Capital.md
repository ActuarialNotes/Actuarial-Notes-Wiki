---
Title: "P&C Minimum Capital Test and Branch Adequacy of Assets Test Quarterly Return (PC4)"
Author: "Office of the Superintendent of Financial Institutions Canada"
Year: "2023"
date: "2023"
Publisher: "Office of the Superintendent of Financial Institutions Canada"
Type: "Regulatory Return"
Code: "PC4"
Available from: "[osfi-bsif.gc.ca](https://www.osfi-bsif.gc.ca/sites/default/files/documents/mct24-rtrn_english-french-en.xlsx)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:56e9dba84146cb2758713cc840995e656f7972ab04a2b2bad107f5c7517d4431
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/OSFI Minimum Capital.md
---
![[OSFI Minimum Capital - Cover.svg]]

The **capital return** — the form on which a P&C insurer computes its **[[MCT]]** ratio (or, for a foreign branch, its **Branch Adequacy of Assets Test**). Read for [[Exam 6C (CAS)|Exam 6C]] objectives C1–C4. Reading the return alongside [[OSFI MCT]] is what turns the guideline into a calculation.

## The pages, and the calculation they trace

| Page | Exhibit | C | F |
|---|---|:-:|:-:|
| **10.00** | **MCT (BAAT) ratio — summary calculations** | ● | ● |
| **20.00** | MCT: **[[Capital Available\|capital available]]** | ● | |
| **30.00** | BAAT: net assets available | | ● |
| **40.00** | **[[Insurance Risk Margin\|Insurance risk]]** — capital (margin) required for **[[Liability for Incurred Claims\|liabilities for incurred claims]]** | ● | ● |
| **40.05** | Insurance risk — capital (margin) required for **unexpired coverage** | ● | ● |
| **40.11 / 40.21** | Reinsurance contracts held summary — **[[Unregistered Reinsurance\|unregistered reinsurance]]** (MCT / BAAT) | ● | ● |
| **40.40** | Insurance risk — accident and sickness business | ● | ● |
| **50.00** | **[[Market Risk Margin\|Market risk]]** — capital (margin) requirements | ● | ● |
| **60.00** | **[[Credit Risk Margin\|Credit risk]]** — balance sheet (vested) assets based on **external credit ratings** | ● | ● |
| **60.05** | Credit risk — balance sheet assets based on external credit ratings (**Quebec**) | ● | |
| **60.20 / 60.30** | Credit risk — selected balance sheet items and recoverables/receivables (MCT / BAAT) | ● | ● |
| **60.40** | Credit risk — **off-balance-sheet exposures** | ● | ● |
| **60.50** | Credit risk — **collateral held for unregistered reinsurance exposures** | ● | ● |
| **70.00** | **[[Operational Risk Margin\|Operational risk]]** — capital (margin) required | ● | ● |

## What the layout tells you

- **The two insurance risk pages are the two halves of underwriting risk**: 40.00 is reserve risk on claims already incurred, 40.05 is premium risk on coverage not yet expired. They are computed separately and receive a [[Diversification Credit|diversification credit]] against each other within insurance risk ([[OSFI MCT]] §4.1).
- **Unregistered reinsurance appears three times** — on 40.11/40.21 as a summary, and on 60.50 as the collateral held against it. That is the capital consequence of the registered/unregistered distinction: a cession to an unregistered reinsurer reduces the insurance risk margin only so far as it is collateralised, and the collateral itself then carries credit risk.
- **Operational risk is its own page (70.00) and is added after aggregation**, because operational risk is not treated as diversifying with the underwriting and market risks.
- **10.00 is the page to be able to reconstruct**: capital available over minimum capital required, with the [[Base Solvency Buffer|risk aggregation]] and diversification credit shown.
- A **Quebec-specific credit risk page (60.05)** exists because the [[Autorité des marchés financiers|AMF]] applies its own capital guideline to Quebec-chartered insurers; a national insurer must satisfy both.

## Related readings
- [[OSFI MCT]] — the guideline this return implements
- [[OSFI Memorandum]] Appendix II — the actuarial items feeding the MCT/BAAT
- [[CIA IFRS 17 - LRC]] §8 — the expected loss ratios behind the unexpired coverage margin

## Links
- [P&C MCT/BAAT Quarterly Return PC4 (OSFI)](https://www.osfi-bsif.gc.ca/sites/default/files/documents/mct24-rtrn_english-french-en.xlsx)
