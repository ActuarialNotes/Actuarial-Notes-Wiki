---
Title: "IFRS 17 Risk Adjustment for Non-Financial Risk for Property and Casualty Insurance Contracts"
Authors: "Canadian Institute of Actuaries"
Publisher: "Canadian Institute of Actuaries"
Year: "2024"
date: "2024"
Type: "Educational Note"
Code: "224090"
Available from: "[cia-ica.ca](https://www.cia-ica.ca/publications/224090e/)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:eee42a180a8c5895e91e68d3fcb2187595907b85682de2f0bdafb2d864417af0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/CIA IFRS 2.md
---
![[CIA IFRS 2 - Cover.svg]]

A CIA educational note giving practical guidance on Canadian-specific issues in the IFRS 17 risk adjustment for non-financial risk for P&C insurers. It was prepared by the Committee on Property and Casualty Insurance Financial Reporting and dated August 14, 2024 (document 224090), and revises the note issued in June 2022, chiefly in Appendix 3; it does not prescribe an approach or method, give the statistical detail of the methods, or address the Appointed Actuary's expression of opinion.

> [!info] On the syllabus
> - [[Exam 6C (CAS)|Exam 6C]] — objectives C1–C3; the whole note, and candidates are responsible for the Excel illustrations attached to it.

## Preamble
- This is the revised version of the June 2022 note; the main change is to Appendix 3, where references to OSFI documents no longer available online were replaced by the relevant content from them.

## 1 Introduction
- The [[Risk Adjustment for Non-Financial Risk|risk adjustment]] (RA) is required by IFRS 17.37: the compensation the entity requires for bearing the uncertainty about the amount and timing of the cash flows that arises from non-financial risk; insurance, lapse and expense risk are included, operational and market risks excluded.
- IFRS 17.B91 prescribes no estimation technique but lists five characteristics the RA would have, such as a higher RA for low-frequency, high-severity risks and for longer durations.

## 2 Transition from IFRS 4 to IFRS 17
- IFRS 17 requires the RA to reflect the compensation the entity requires for taking on risk, as opposed to margins that cover adverse deviations ([[Margin for Adverse Deviations|MfADs]]); an actuary starting from IFRS 4 MfADs would assess the questions in subsection 9.2 of the educational note comparing IFRS 17 with the CIA standards.

## 3 General considerations
- 3.1 Measurement approach
    - The RA is determined and reported for each group, while most presentation and disclosure requirements, including the confidence level required by IFRS 17.119, are met at a more aggregated level.
    - Some entities might not require compensation; where a zero RA is selected, the rationale would be documented.
- 3.2 Diversification, allocation, and aggregation
    - The entity's view of diversification affects both the amount of the RA and its confidence level; two common tools are [[Correlation|correlation]] matrices and copulas, and an aggregate RA may be allocated proportionally or by marginal impact.
- 3.3 Reinsurance held
    - The ceded RA represents the non-financial risk transferred to the reinsurer and would not be negative; reinsurer non-performance risk is reflected in the present value of future cash flows, not the RA.
- 3.4 Discount rate
    - IFRS 17 gives no direction on discounting the RA; whether and how to discount is at the entity's discretion, applied consistently between reporting periods.
- 3.5 Time horizon
    - The time horizon is the lifetime of the uncertainty in the contract cash flows, so the RA is not comparable with an internal model calibrated at VaR 99.5 over one year without recalibration.
- 3.6 Disclosure requirements
- 3.7 Risk adjustment under premium allocation approach
    - Under the [[Premium Allocation Approach|PAA]] the LRC carries no RA unless the group is onerous, but the [[Liability for Incurred Claims|LIC]] always requires one; the RA for the LRC of onerous groups may be approximated from the RA derived for the LIC.

## 4 Quantile methods
- 4.1 Introduction
    - Quantile methods, VaR and conditional tail expectation (CTE), use distributions of the fulfilment cash flows; used at an aggregate level they directly satisfy the confidence level disclosure, but VaR may not capture the risk of a particularly skewed distribution.
- 4.2 Generating a distribution
    - Methods include a suitably skewed distribution (e.g., lognormal or gamma), Monte Carlo simulation, [[Bootstrap|bootstrapping]] and scenario modelling, of which [[FCT]] is one example.
- 4.3 Measuring risk
    - Under VaR the RA is the VaR at the target percentile less the mean present value of probability-weighted cash flows; under CTE it is the conditional mean beyond the target percentile less that mean ([[Risk Measure|risk measure]]).
- 4.4 Aggregation and allocation

## 5 Cost of capital method
- 5.1 Introduction
    - The RA is based on the compensation the entity requires to meet a target return on capital, built from projected capital amounts, cost of capital rates and discount rates.
- 5.2 General formula
    - The RA sums the compensation $r_t \times C_t$ for each period, discounted at $d_t$ (below).
- 5.3 Capital (Ct)
    - A practical approach uses the capital model used for pricing; a regulatory model such as the MCT, or an internal model, is used with caution, adjusted to remove capital for risks outside the RA's scope.
- 5.4 Cost of capital rate (rt)
    - Traditionally the weighted average rate of return on capital less the investment rate on the assets supporting it ([[Cost of Capital|cost of capital]]); the RA is pre-tax, while target returns are often stated after tax.

> $$\text{RA} = \sum_t \frac{r_t \times C_t}{(1+d_t)^t}$$

## 6 Margin method
- Margins are selected at the unit-of-account level to reflect the compensation the entity requires; the confidence level for disclosure is an output of the process, not an input.

## 7 Reinsurance held methods
- 7.1 Quantile methods
    - The ceded RA may be modelled directly from ceded data or taken as the difference between gross and net estimates; for non-proportional covers triggered far in the tail, VaR can give a zero ceded RA.
- 7.2 Catastrophe models
- 7.3 Proportional scaling
- 7.4 Cost of capital

## 8 Catastrophe reinsurance
- A quantile method may not generate a significant RA for a catastrophe treaty unless it is a working layer; a target profit margin method is one alternative.

## 9 Combining approaches and methods
- 9.1 Aggregate/entity-level approach
- 9.2 Hybrid approach
    - In the example given, risk management policy sets a target range for the confidence level of the aggregate RA, and portfolio margins are recalibrated until the entity-level RA falls within it.

## 10 Quantification of the confidence level
- 10.1 Quantile method as primary method
    - The confidence level is directly available, satisfying IFRS 17.119.
- 10.2 Quantile method as secondary method
    - Otherwise a secondary method is needed; the illustration assumes a [[Lognormal Distribution|lognormal]] distribution with the best estimate liability as its mean and a standard deviation derived from the MCT insurance risk factors.

## Appendix 1 Margins – Brief summary of IFRS 4 and CIA Standards of Practice
- Under subsections 2250 through 2270 of the pre-IFRS 17 standards, the range of margins for claims development was 2.5% to 20% of the best-estimate assumption.

## Appendix 2 Simplified calculation of risk adjustment based on cost of capital method

## Appendix 3 Quantification of the confidence level using minimum capital test

## Appendix 4 Illustrative example on risk adjustment calculations
- Ten scenarios apply three methods, quantile (confidence level), cost of capital and margin, each estimating the RA by one method and backing out comparable assumptions for the other two, on long-tail, short-tail and total worksheets of the Excel workbook.

## Related readings
- [[CIA IFRS 17 - Comparison]] — §2 quotes its Section 9 and lists the questions of its subsection 9.2
- [[CIA IFRS 17 - LRC]] — §3.3 refers to its subsection 6.4 for reinsurance non-performance risk
- [[OSFI MCT]] — Appendix 3 calibrates the confidence level to the MCT insurance risk factors from OSFI's 2013 review
- [[CIA CSOP]] — the CIA Standards of Practice, whose former subsections 2250–2270 on margins for adverse deviations Appendix 1 summarizes

## Sources
- [IFRS 17 Risk Adjustment for Non-Financial Risk for Property and Casualty Insurance Contracts (CIA, 2024)](https://www.cia-ica.ca/publications/224090e/) — the publication page and the PDF it links: title page, contents, preamble, the text of Sections 1–10 and the opening of each appendix
- [CAS Exam 6C Content Outline, Fall 2026](https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf) — the citation and the assigned scope, including the Excel illustrations
