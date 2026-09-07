---
Title: "MSA Legend of P&C KPI's and Descriptions"
Author: "Market-Security Analysis & Research Inc."
Year: "2023"
date: "2023"
Publisher: "Market-Security Analysis & Research Inc."
Type: "Reference Sheet"
Available from: "[msaresearch.com](https://www.msaresearch.com/wp-content/uploads/2023/09/MSA-Legend-of-PC-KPI-descriptions-1.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:83d3ca2e0d034a956b364a34849f37f5c45eed44f94f0ba12f92cdab244744d0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/MSA Legend.md
---
![[MSA Legend - Cover.svg]]

MSA Research's legend of Canadian P&C **key performance indicators** (revised 15 September 2023) — the definitions behind the **[[MSA Ratios]]** that analysts, regulators and [[Rating Agency|rating agencies]] use to compare Canadian insurers. Read for [[Exam 6C (CAS)|Exam 6C]] objective C4.

## How the document is built

Each ratio is given twice: once **in words**, and once as a formula in **CCIR datapoint format — `StatementPageRowColumn`**. So the *Gross Expense Ratio* is

> (Amortization of insurance acquisition cash flows + General and operating expenses) ÷ (Total insurance revenue)

and, in datapoints, `(201422019+202242001)/(202209901)`.

That addressing is the point of the document: every KPI is defined as arithmetic on specific cells of the [[Canadian Annual Return]], so two insurers' ratios are computed identically. The addressing is the one specified in [[CCIR Instructions]], which is why the two readings belong together.

## The ratios, post-IFRS 17

The definitions were rebuilt for [[IFRS 17]] and no longer resemble their IFRS 4 predecessors — the exam's favourite point about them.

| Ratio | Numerator (in words) | Denominator |
|---|---|---|
| **Net expense ratio** | Amortization of [[Insurance Acquisition Cash Flows\|insurance acquisition cash flows]] − amortization of reinsurance acquisition cash flows + general and operating expenses | Total [[Insurance Revenue\|insurance revenue]] + allocation of reinsurance premiums |
| **Net claims ratio (partially discounted)** | Incurred claims and other [[Insurance Service Expenses\|insurance service expenses]] + adjustments to liabilities for incurred claims + losses and reversals on [[Onerous Contract\|onerous contracts]], **less** the corresponding reinsurance recoveries, recoveries of losses, adjustments to reinsurance assets, and the effect of changes in **non-performance risk of reinsurers** | Insurance revenue + allocation of reinsurance premiums |
| **Net combined ratio (partially discounted)** | Insurance service expense + general and operating expenses − amounts recoverable from reinsurers − effect of changes in non-performance risk of reinsurers | Insurance revenue + allocation of reinsurance premiums |
| **Net combined ratio (fully discounted)** | The above, **less** net finance income from insurance contracts and from reinsurance contracts held | Insurance revenue + allocation of reinsurance premiums |
| **Gross expense ratio / gross claims ratio** | The same constructions before reinsurance | Total insurance revenue |

## What to take from it

- **"Premium" is gone.** The denominator is **insurance revenue**, which is not earned premium: it excludes any investment component and is recognised as coverage is provided under IFRS 17.
- **Partially versus fully discounted.** IFRS 17 splits the result between the [[Insurance Service Result|insurance service result]] and [[Insurance Finance Income or Expenses|insurance finance income or expenses]] (the unwinding of the discount). A *partially discounted* combined ratio leaves the unwinding out; the *fully discounted* version puts it back. **The two can differ materially for a long-tailed insurer, and neither is comparable to a pre-2023 combined ratio.**
- **Reinsurer non-performance risk enters the claims ratio** — a purely IFRS 17 artefact, and a reason a ratio can move without any change in underwriting.
- The **loss component** on onerous contracts sits in the claims ratio, so a mispriced book shows up there rather than being deferred.

## Related readings
- [[CCIR Instructions]] — the datapoint addressing these formulas use
- [[OSFI Core Return]] · [[OSFI Quarterly Return]] — the pages the datapoints refer to
- [[Feldblum]] — how an external analyst uses ratios like these
- [[CAS Financial Reporting]] ch. 21 — measurement tools

## Links
- [MSA Legend of P&C KPI's and Descriptions (MSA Research)](https://www.msaresearch.com/wp-content/uploads/2023/09/MSA-Legend-of-PC-KPI-descriptions-1.pdf)
