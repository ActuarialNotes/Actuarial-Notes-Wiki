---
Title: "Duration Considerations for P&C Insurers"
Authors: "Canadian Institute of Actuaries"
Publisher: "Canadian Institute of Actuaries"
Year: "2023"
date: "2023"
Type: "Educational Note"
Code: "223126"
Available from: "[cia-ica.ca](https://www.cia-ica.ca/publications/223126e/)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7b756944d04a23e98e840a177bb7f4c7d10de8f2d2fc1a03d30db39f110c2b4f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/CIA Duration.md
---
![[CIA Duration - Cover.svg]]

A CIA educational note on the duration of a P&C insurer's interest rate sensitive insurance contract assets and liabilities, and of its other such assets. Prepared by the Committee on Property and Casualty Insurance Financial Reporting and dated August 10, 2023 (document 223126), it supersedes the 2017 note, adapting its content and illustrative examples to actuarial practice under IFRS 17. The examples, in an accompanying Excel file, calculate modified and effective durations for the interest rate risk margin in the P&C returns.

> [!info] On the syllabus
> - [[Exam 6C (CAS)|Exam 6C]] — objectives C1 and C5; the August 2023 note, with candidates responsible for the Excel illustrations attached to it.

## Preamble
- Process
- Your feedback

## 1 Introduction and scope
- Duration matters because the [[MCT]] Guideline requires it for the interest rate risk margin, it may be needed for the margin for investment return rates in valuation work not subject to IFRS 17, insurers [[Duration Matching|duration match]] liabilities to assets, and it is a consideration in modelling market risk.

## 2 Duration defined
- [[Macaulay Duration]] is the weighted average time to each cash flow, weighted by present value; [[Modified Duration|modified duration]] measures the sensitivity of the present value of fixed cash flows to changes in interest rates:

> $$\text{Macaulay Duration} = \frac{\sum_{t=0}^{n} t \times PVCF_t}{k \times \sum_{t=0}^{n} PVCF_t} \qquad \text{Modified Duration} = \frac{\text{Macaulay Duration}}{1+i}$$

- Effective duration also measures the fair value sensitivity of assets whose cash flows change with interest rates, such as callable bonds and interest rate derivatives:

> $$\text{Effective Duration} = \frac{V_- - V_+}{2 \times V_0 \times \Delta y}$$

- For the MCT, Macaulay duration is only an intermediate step and not a measure accepted by regulators; insurers may use modified or effective duration, applied to all assets and liabilities and consistently from year to year, and effective duration is required when rate changes may change the expected cash flows.
- Both measures are exact only for very small rate changes; considering the [[Convexity|convexity]] of the price-yield relationship gives a more accurate approximation.
- Matching the dollar-weighted durations of liabilities and assets is considered good practice, but cash flow shortfalls can still occur, so actuaries would consider future net cash flows as well.

## 3 Discounting under IFRS 17
- Under the GMA, insurance contract assets and liabilities are discounted; under the PAA the LIC is generally discounted unless claims are expected to be paid within a year, and the LRC generally is not unless a group has a significant financing component or is onerous.

## 4 Duration of interest rate sensitive insurance contract assets and liabilities
- The interest rate sensitive items for the interest rate risk margin are insurance contract assets and liabilities for incurred claims and for remaining coverage, and reinsurance contract held assets and liabilities.
- Duration assumptions are consistent with those underlying the discounting; durations by line of business may be weighted by the present value of future cash flows with risk adjustment.
- The [[Risk Adjustment for Non-Financial Risk|risk adjustment]] is generally interest rate sensitive if its technique uses discounting, and not if it relies on undiscounted amounts.
- Under the GMA the best estimate of future cash flows and the risk adjustment are generally interest rate sensitive and the [[Contractual Service Margin|CSM]] is not; under the PAA a [[Loss Component|loss component]] measured with the fulfilment cash flow approach is, and the rest of the PAA LRC is not.
- Items that are not interest rate sensitive, such as an undiscounted LIC for claims expected to be paid within a year, have a duration of 0; duration is net of salvage and subrogation.

## 5 Duration of interest rate sensitive assets
- For most insurers the main classes of interest rate sensitive assets are bonds and preferred shares; retractable and rate-reset preferred shares may be treated like bonds.
- Before using an investment specialist's estimates, the actuary reviews them for reasonableness and identifies the duration formula used, for consistency between asset and liability durations.

## 6 Appendices
- Appendix A Interest Rate Risk Requirement Calculation
- Appendix B
    - Sheet 1 Duration of Insurance Contract Issued – Liability for Incurred Claims
    - Sheet 2 Duration of Reinsurance Contract Held – Assets Incurred Claims
- Appendix C
    - Sheet 1 Duration of Insurance Contract Issued – Liability for Remaining Coverage (Onerous Group)
    - Sheet 2 Duration of Insurance Contract Issued – Liability for Remaining Coverage (Non-Onerous Group)
    - Sheet 3 Duration of Reinsurance Contract held – Asset for Remaining Coverage
- Appendix D
    - Sheet 1 Alternate Approach to Calculate Effective Duration for Onerous Group
- The examples calculate both modified and effective duration for the interest rate risk margin in the P&C returns, and are illustrative rather than prescriptive.

## Related readings
- [[OSFI MCT]] — the MCT Guideline, whose interest rate risk margin the durations are calculated for
- [[CIA IFRS 17 - LRC]] — the June 2022 LRC educational note whose considerations §4 applies to the LRC and ARC
- [[CIA Discount Rates]] — a later version of the June 2022 discount-rate educational note §§2–3 refer to

## Sources
- [Duration Considerations for P&C Insurers (CIA, 2023)](https://www.cia-ica.ca/publications/223126e/) — the landing page (publication date, accession no. 223126, the accompanying Excel file) and its PDF: title page, contents and the text of the preamble, Sections 1–6
- [CAS Exam 6C Content Outline, Fall 2026](https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf) — the citation and the assigned scope
