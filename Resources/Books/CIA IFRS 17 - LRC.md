---
Title: "IFRS 17 – Actuarial Considerations Related to Liability for Remaining Coverage in P&C Insurance Contracts"
Authors: "Canadian Institute of Actuaries"
Publisher: "Canadian Institute of Actuaries"
Year: "2022"
date: "2022"
Type: "Educational Note"
Code: "222092"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2023-05/6C_CIA_Educational_Note_IFRS_17_Actuarial_Considerations_Related_to_Liability.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b533db1e105954aecea4c6806cd93b4f95d379216457293e1be5094a26de7737
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/CIA IFRS 17 - LRC.md
---
![[CIA IFRS 17 - LRC - Cover.svg]]

A CIA educational note giving practical guidance on the IFRS 17 liability for remaining coverage of P&C contracts, including onerous groups. It was prepared by the Committee on Property and Casualty Insurance Financial Reporting and published in June 2022 (document 222092); it covers the LRC under the general measurement and premium allocation approaches, reinsurance contracts issued and held, and the expected loss ratio for the MCT, and it neither prescribes a measurement method nor addresses the Appointed Actuary's opinion.

> [!info] On the syllabus
> - [[Exam 6C (CAS)|Exam 6C]] — objectives C1, C2; the whole note, and candidates are responsible for the Excel illustrations attached to it.

## 1 Introduction
- Insurance contract liabilities consist of the [[Liability for Incurred Claims|LIC]] and the [[Liability for Remaining Coverage|LRC]]; for an [[Onerous Contract|onerous]] group the LRC splits into the LRC excluding the loss component (LRC ex. LC) and the [[Loss Component|loss component]].
- Of the three measurement approaches, the variable fee approach is not expected to be used by most P&C entities and is not discussed.

## 2 Definitions
- Terms defined include the contractual service margin, contract boundary, coverage period, coverage units, date of initial recognition, fulfilment cash flows, group, investment component, issue date, loss component, loss-recovery component, onerous contract and the premium allocation approach.

## 3 Level of aggregation and financial statement presentation
- The LRC is recognized and measured at the group level, but presentation in the statement of financial position is by portfolio, combining its LIC and LRC ([[Level of Aggregation|level of aggregation]]).

## 4 LRC under the GMA – Insurance contracts issued
- 4.1 Definition
    - Under the [[General Measurement Model|GMA]], the LRC is the [[Fulfilment Cash Flows|fulfilment cash flows]] related to future service plus the [[Contractual Service Margin|CSM]].
- 4.2 Allocations
- 4.3 Estimates of future cash flows
    - For most P&C contracts the [[Contract Boundary|contract boundary]] runs from initial recognition to expiry; future claims and claim adjustment expenses are typically estimated by applying a selected expected loss ratio to the unexpired portion of total premium receipts.
- 4.4 Effect of discounting
    - The LRC payment pattern for claims is generally consistent with the LIC's, adjusted to the average accident date of the group; cash flows are discounted with a yield curve consistent with their timing, currency and liquidity.
- 4.5 Risk adjustment
- 4.6 Contractual service margin
    - At initial recognition the CSM is set so that no profit is recognized, with a floor of zero; it is rolled forward under IFRS 17.44 and released in proportion to [[Coverage Units|coverage units]].
- 4.7 Coverage units
    - The quantity of benefits relates to the amount the policyholder can claim, not the entity's expected costs; a contract with the same policy limit throughout its coverage period gives a uniform amortization pattern.
- 4.8 Loss component
    - A group onerous at initial recognition has its CSM floored at zero, a loss recognized and an LC established in the LRC; favourable changes reduce the LC to zero before a CSM may be re-established.

## 5 LRC under PAA – Insurance contracts issued
- The key simplification: a group that is not onerous needs no fulfilment cash flows and no CSM; for an onerous group the LC is measured on fulfilment cash flows.
- 5.1 Initial recognition
    - The LRC ex. LC at initial recognition is premiums received less [[Insurance Acquisition Cash Flows|acquisition cash flows]] paid, unless they are recognized as expenses when incurred.
- 5.2 Subsequent measurement
    - Premiums received less insurance revenue to date, equivalent to the [[Unearned Premium|unearned premium]] net of premiums receivable, less acquisition costs yet to be expensed, plus adjustments for financing and investment components.
- 5.3 Onerous groups of contracts
    - Under the [[Premium Allocation Approach|PAA]] a group is assumed not onerous unless facts and circumstances indicate otherwise; an LC then exists if the fulfilment cash flows for the remaining coverage exceed the PAA LRC ex. LC.
    - The LC may be remeasured by a full recalculation of fulfilment cash flows at each reporting date or, where assumptions do not vary significantly, by a simplified release on a pre-defined pattern.
- 5.4 Premium
    - [[Insurance Revenue|Revenue]] is recognized with the passage of time unless the pattern of release of risk differs significantly from it, in which case on the pattern of expected insurance service expenses.
- 5.5 Acquisition costs
    - The IFRS 17.59(a) election to expense acquisition costs, available when each contract's coverage period is no more than one year, reduces the likelihood of onerous classification but front-ends the recognition of expenses.
- 5.6 Financing and investment components
    - No adjustment for the time value of money is required unless there is a significant financing component, which is deemed absent when the time between service and the related premium due date is no more than one year.

## 6 Considerations for reinsurance contracts issued and held
- 6.1 Grouping of reinsurance contracts held
- 6.2 Recognition of reinsurance contracts held
    - A group of [[Reinsurance Contracts Held|reinsurance contracts held]] is recognized at the earlier of the start of its coverage period and the date an onerous underlying group is recognized, if the reinsurance was entered into by then.
- 6.3 Boundary of reinsurance contracts issued and held
- 6.4 Risk of non-performance for reinsurance contracts held
    - A probability-weighted provision for the reinsurer's non-performance, including default and disputes, is included in the estimates of future cash flows; changes in it do not adjust the CSM.
- 6.5 CSM and loss-recovery component
    - The CSM on reinsurance held can be positive or negative; the loss-recovery component is the underlying LC times the percentage of claims expected to be recovered, whether the reinsurance is a net gain or a net cost.
- 6.6 Investment components

## 7 Illustrative example – Loss component calculation
- Exhibits 1 and 2 of the accompanying Excel file estimate the LC of PAA groups by applying a selected ELR and a ULAE factor to the unearned premium, discounting, adding the risk adjustment, acquisition costs and attributable expenses, and comparing the result with the PAA LRC.
- For one-year policies written uniformly through the year, the average accident date of the unexpired coverage at year-end is one-third of a year (May 1).

> $$\text{AAD} = \frac{\int_0^1 x\,f(x)\,dx}{\int_0^1 f(x)\,dx} = \frac{1}{3}, \qquad f(x) = 1 - x$$

## 8 MCT considerations
- 8.1 Introduction
    - For P&C entities using the PAA, the expected loss ratio feeds the [[MCT]] insurance risk margin for unexpired coverage; an entity using the GMA derives that margin directly from its LRC.
- 8.2 Expected loss ratios for MCT
    - A best estimate of future losses and loss adjustment expenses on the revenue for the remaining coverage period, reflecting the time value of money but not the risk adjustment.
- 8.3 Expected losses
- 8.4 Loss adjustment expenses and other directly attributable costs

## Appendix 1 Premium received
- Premium received is total expected premium receipts less premium receivable; where it cannot be tracked at the required granularity without undue cost or effort, the actuary may allocate it, as IFRS 17.24 permits.

## Related readings
- [[CIA IFRS 17 - Comparison]] — cited (document 222094) among the educational notes the commentary references
- [[CIA PAA]] — cited as the PAA Eligibility EN (document 222091), for PAA eligibility and, in §4.3.1, for its Section 3 on contract boundary topics
- [[CIA IFRS 2]] — §4.5 refers to the PCFRC Risk Adjustment EN for the risk adjustment, cited in its June 2022 version (document 222089), which the 2024 edition revises
- [[CIA Discount Rates]] — cited as the PCFRC Discounting EN in its June 2022 version (document 222098), for LIC payment patterns and the yield curve (§4.4)
- [[OSFI MCT]] — the capital guideline whose insurance risk margin for unexpired coverage §8's expected loss ratio is used in

## Sources
- [IFRS 17 – Actuarial Considerations Related to Liability for Remaining Coverage in P&C Insurance Contracts (CIA, 2022)](https://www.casact.org/sites/default/files/2023-05/6C_CIA_Educational_Note_IFRS_17_Actuarial_Considerations_Related_to_Liability.pdf) — the document: title page, memorandum, table of contents, and the text of Sections 1–8 and Appendix 1
- [CAS Exam 6C Content Outline, Fall 2026](https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf) — the citation and the assigned scope, including the Excel illustrations
- [IFRS 17 Risk Adjustment for Non-Financial Risk for Property and Casualty Insurance Contracts (CIA, 2024)](https://www.cia-ica.ca/publications/224090e/) — its preamble, stating that it revises the June 2022 note
- [IFRS 17 Discount Rates and Cash Flow Considerations for Property and Casualty Insurance Contracts (CIA, 2025)](https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=628504&fid=628505) — its preamble, stating that it was originally published in June 2022
