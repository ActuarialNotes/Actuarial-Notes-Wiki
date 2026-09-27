---
Title: "MSA Legend of P&C KPI's and Descriptions"
Authors: "Market-Security Analysis & Research Inc."
Publisher: "Market-Security Analysis & Research Inc."
Year: "2023"
date: "2023"
Type: "Glossary"
Available from: "[msaresearch.com](https://www.msaresearch.com/wp-content/uploads/2023/09/MSA-Legend-of-PC-KPI-descriptions-1.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1720091fffdc21c2f7a172a587d83788d5b0c6465eb880463e3fbd012c067524
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/MSA Legend.md
---
![[MSA Legend - Cover.svg]]

MSA Research's one-page legend of property and casualty key performance indicators, each given as a ratio formula in words and in CCIR datapoint format. Revised September 15, 2023 and marked subject to change, it defines net and gross expense, claims and combined ratios (partially and fully discounted), four insurance service and reinsurance ratios, investment yield and return on equity — the [[MSA Ratios]] — addressing each datapoint as Statement, Page, Row, Column.

> [!info] On the syllabus
> - [[Exam 6C (CAS)|Exam 6C]] — objective C4.

## Net Expense, Claims and Combined Ratios
- Net [[Expense Ratio]] — (amortization of [[Insurance Acquisition Cash Flows|insurance acquisition cash flows]] − amortization of reinsurance acquisition cash flows + general and operating expenses) ÷ (total [[Insurance Revenue|insurance revenue]] + allocation of reinsurance premiums); `(201422019-201813519+202242001)/(202209901+201811919)`
- Net Claims Ratio (Partially Discounted) — ((incurred claims and other insurance service expenses + adjustments to [[Liability for Incurred Claims|liabilities for incurred claims]] + losses and reversal of losses on [[Onerous Contract|onerous contracts]]) − (incurred claims recovered and other reinsurance service expenses + recovery of losses and reversal on recovery of losses + adjustments to assets for incurred claims + effect of changes in non-performance risk of reinsurers)) ÷ (total insurance revenue + allocation of reinsurance premiums); `((201421019+201423019+201424019)-(201813019+201814019+201814519+201816019))/(202209901+201811919)`
- Net [[Combined Ratio]] (Partially Discounted) — ([[Insurance Service Expenses|insurance service expense]] + general and operating expenses − amounts recoverable from reinsurers − effect of changes in non-performance risk of reinsurers) ÷ (total insurance revenue + allocation of reinsurance premiums); `(202211001+202242001-201814919-201816019)/(202209901+201811919)`
- Net Combined Ratio (Fully Discounted) — the partially discounted numerator less (net finance income from insurance contracts + net finance income from reinsurance contracts held), over the same denominator ([[Insurance Finance Income or Expenses|insurance finance income]]); `((202211001+202242001-201814919-201816019)-(202231001+202232001))/(202209901+201811919)`

## Gross Expense, Claims and Combined Ratios
- Gross Expense Ratio — (amortization of insurance acquisition cash flows + general and operating expenses) ÷ total insurance revenue; `(201422019+202242001)/(202209901)`
- Gross Claims Ratio (Partially Discounted) — (incurred claims and other insurance service expenses + adjustments to liabilities for incurred claims + losses and reversal of losses on onerous contracts) ÷ total insurance revenue; `((201421019+201423019+201424019)/(202209901)`
- Gross Combined Ratio (Partially Discounted) — (insurance service expense + general and operating expenses) ÷ total insurance revenue; `(202211001+202242001)/(202209901)`
- Gross Combined Ratio (Fully Discounted) — ((insurance service expense + general and operating expenses) − net finance income from insurance contracts) ÷ total insurance revenue; `((202211001+202242001)-(202231001))/(202209901)`

## Insurance Service and Reinsurance Ratios
- Gross Insurance Service Ratio (GISR) — insurance service expense ÷ total insurance revenue; `202211001/202209901`
- Reinsurance Impact Ratio (RIR) — net expenses from [[Reinsurance Contracts Held|reinsurance contracts held]] ÷ total insurance revenue; `202212001/202209901`
- Net Insurance Service Ratio (NISR) — (insurance service expense + net expenses from reinsurance contracts held) ÷ (total insurance revenue + allocation of reinsurance premiums); `(202211001+202212001)/(202209901+602559932)`
- Reinsurance Service Ratio (RSR) — amounts recoverable from reinsurers for incurred claims ÷ allocation for reinsurance premiums; `({2602559934}/{2602559932})*100`

## Investment Yield and Return on Equity
- Investment Yield — investment return ÷ average invested assets, the return annualized by Q (Q1 = 4, Q2 = 2, Q3 = 4/3, Q4 = 1), with average invested assets taken over twelve datapoints
- Return on Equity — net income ÷ average of total equity, annualized by Q; `({1202299901}*Q)/(({1201169901}+{1201169903}+{1201189901}+{1201189903})/2)*100`

## Related readings
- [[CCIR Instructions]] — the CCIR return whose datapoints (statement, page, row, column) the legend's formulas address

## Sources
- [MSA Legend of P&C KPI's and Descriptions (MSA Research, 2023)](https://www.msaresearch.com/wp-content/uploads/2023/09/MSA-Legend-of-PC-KPI-descriptions-1.pdf) — the document: title line, revision date, and each KPI's formula in words and in datapoint format, read from the text layer and the rendered page (whose colour bands group the KPIs)
- [CAS Exam 6C Content Outline, Fall 2026](https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf) — the citation and the assigned objective
