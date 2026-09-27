---
Title: "Comparison of IFRS 17 to Current CIA Standards of Practice"
Authors: "Canadian Institute of Actuaries"
Publisher: "Canadian Institute of Actuaries"
Year: "2022"
date: "2022"
Type: "Educational Note"
Code: "222094"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2023-05/6C_CIA_Educatitional_Note_Comparision_of_IFRS_17_to_CurrentCIA.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4075e3b7bb7cfa0f6ff2202fe9adff7b9fe3518a3d29b22e67099c4bb0d587aa
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/CIA IFRS 17 - Comparison.md
---
![[CIA IFRS 17 - Comparison - Cover.svg]]

A CIA educational note identifying the key differences between IFRS 17 and the CIA Standards of Practice in measuring insurance contract liabilities. It was prepared by the Committee on International Insurance Accounting and published in June 2022 (document 222094), covers life and health and P&C contracts but not workers' compensation, and describes itself as an overview of similarities and significant differences rather than a comprehensive guide to IFRS 17.

> [!info] On the syllabus
> - [[Exam 6C (CAS)|Exam 6C]] — objective C1; excluding 3.2, 5.3, 7.2, 8.1.2, Appendix A, Appendix B and Appendix D.

## 1 Introduction
- [[IFRS 17]] becomes effective in Canada on January 1, 2023; the note gives actuaries an overview of how IFRS 17 measurement of liabilities compares with current practice in Canada.

## 2 IFRS 17 overview and comparison to current practice
- IFRS 17 measures insurance contract liabilities with three building blocks: the present value of future cash flows (conceptually similar to the current CIA liability without [[Margin for Adverse Deviations|PfADs]]), the [[Risk Adjustment for Non-Financial Risk|risk adjustment for non-financial risk]] (similar to PfADs for non-economic risk), and the [[Contractual Service Margin|contractual service margin]].
- The first two together are the [[Fulfilment Cash Flows|fulfilment cash flows]]; the CSM offsets a negative FCF at inception so that no profit is front-ended, a new concept against current CIA standards, which allow front-ending of profit at issue.
- The [[General Measurement Model|general measurement approach]] is the default; the variable fee approach applies to contracts with direct participation features, and the simplified [[Premium Allocation Approach|premium allocation approach]] is an option for contracts meeting IFRS 17.53.

## 3 Classification of contracts
- 3.1 General
    - Classification under IFRS 17 is largely the same as under IFRS 4, with two differences: the transfer of all insurance risk to a reinsurer is deemed significant for the reinsurer (IFRS 17.B19), and the time value of money is considered in assessing whether insurance risk is significant.
- 3.2 Life and health insurance
- 3.3 P&C insurance
    - P&C contracts that satisfy the IFRS 4 definition of an insurance contract would generally continue to fall within the scope of IFRS 17.
- 3.4 Reinsurance
    - [[Reinsurance Contracts Held|Reinsurance contracts held]] are treated as separate contracts needing their own classification, rather than as cash flows of the underlying direct contract as under IFRS 4.

## 4 Separation of contract components
- 4.1 General
    - Distinct embedded derivatives and distinct investment components are measured under IFRS 9, distinct service components under IFRS 15; non-distinct investment components stay in IFRS 17 but are excluded from insurance revenue and insurance service expenses.
- 4.2 Embedded derivatives
- 4.3 Investment Components
- 4.4 Service components
    - A possible distinct service component is claims adjudication provided along with reinsurance protection; the reinsurer and the cedant each assess it, and their assessments need not agree.

## 5 Selection of measurement approach
- 5.1 Overview
    - Reinsurance contracts held are measured with the GMA or the PAA, never the VFA, and may use a different approach from the underlying direct contracts.
- 5.2 Premium allocation approach
    - The PAA may be used for any contract with a coverage period of one year or less, and for others where it would not differ materially from the GMA over the life of the contract; eligibility is assessed at inception of the group.
    - Under the PAA the [[Liability for Remaining Coverage|LRC]] at issue equals premiums received less, if applicable, deferred acquisition costs; for P&C, current practice books the higher of unearned premium less DAC and the explicit valuation.
    - The differences from current practice it lists: the criteria, deferral of acquisition costs, the amount of deferrable acquisition costs, recoverability of DAC, reflecting the time value of money in the LRC, and discounting of the [[Liability for Incurred Claims|LIC]].
- 5.3 Variable fee approach
- 5.4 Measurement Approach for Typical Canadian Products
    - The PAA would be an option (for the LRC) for most P&C contracts, many of which have a coverage period of one year or less and are therefore eligible automatically.

## 6 Measurement considerations
- 6.1 Level of aggregation
    - The group of contracts is the unit of account for measuring the CSM; with no CSM in current Canadian practice, there is no analogous requirement to identify groups ([[Level of Aggregation|level of aggregation]]).
    - IFRS 17 does not specify the level at which the risk adjustment is determined; it is set at the level that best represents the entity's view of the compensation required, and allocated to groups if set higher.
- 6.2 Contract boundary/coverage period
    - The [[Contract Boundary|contract boundary]] determines the coverage period; typical annually renewable P&C contracts have a coverage period that ends at the next renewal date.
    - Possible differences from current practice include the absence of a bias towards conservatism, consideration of the rights and obligations of both parties, and disregard of the entity's intent to reprice; title insurance, where IFRS 17 treats discovery of the defect as the insured event, has a coverage period lasting as long as the policyholder owns the property or holds the mortgage.

## 7 Probability-weighted cash flows
- 7.1 Comparison to current practice
    - The concept of probability-weighted cash flows is broadly aligned with current practice for best estimate cash flows, and major process changes are unlikely.
    - Examples of differences: IFRS 17 excludes income taxes not chargeable to the policyholder; for P&C, more expenses might be included than under current practice; and the provision for reinsurer non-performance is part of the estimates of future cash flows, not the risk adjustment.
- 7.2 Cash flows that vary with assumptions related to financial risk
    - 7.2.1 Universal life contracts
    - 7.2.2 Segregated fund guarantees
    - 7.2.3 Index-linked payments
    - 7.2.4 Expense inflation
    - 7.2.5 Participating insurance
- 7.3 Deferrable acquisition expenses
    - Only [[Insurance Acquisition Cash Flows|acquisition cash flows]] directly attributable to a portfolio are included; they reduce the CSM and are recognized through its release, rather than held as a separate DAC asset as for some products under IFRS 4.

## 8 Discounting
- 8.1 Comparison to current practice
    - 8.1.1 Current practice: P&C
        - Current CIA standards discount at the expected investment return (portfolio yield) on the assets chosen to support the policy liabilities, with a PfAD for uncertainty in the selected discount rate, claims development patterns and reinsurance collectability.
    - 8.1.2 Current practice: life and health
- 8.2 Cash flows that do not vary with returns on underlying items
    - Under IFRS 17 the [[IFRS 17 Discount Rates|discount rates]] do not depend on the assets supporting the liabilities and use no reinvestment/disinvestment assumptions; the curve reflects the characteristics of the liability cash flows only.
    - 8.2.1 Bottom-up approach
        - A risk-free curve adjusted by adding an illiquidity premium that reflects the characteristics of the liabilities.
    - 8.2.2 Top-down approach
        - The current yields on a reference portfolio of assets, adjusted to remove characteristics not relevant to the liability, primarily credit risk and market risk.
- 8.3 Reflecting financial risk
    - 8.3.1 Cash flows that vary with returns on underlying items
    - 8.3.2 Cash flows that vary with assumptions related to financial risk

## 9 Risk adjustment for non-financial risk
- The IFRS 17 risk adjustment provides for non-financial risk only, whereas PfADs cover uncertainty in both economic and non-economic assumptions; it depends on the entity's own compensation requirements, and IFRS 17 requires disclosure of its confidence level, an entirely new requirement.
- 9.1 Reflecting uncertainty in the risk adjustment for non-financial risk
- 9.2 Considerations for using PfADs to determine risk adjustment for non-financial risk
    - Current PfADs for non-economic assumptions may be a good starting point, subject to questions on the compensation the entity requires, diversification, the confidence level, the split between direct and ceded contracts, and pass-through features.
    - 9.2.1 Current level of PfAD versus the compensation the entity requires
    - 9.2.2 Diversification benefits
    - 9.2.3 Confidence level disclosure
    - 9.2.4 Reinsurance contracts held
        - The risk adjustment on a reinsurance contract held represents the risk transferred to the reinsurer, so it reduces the liability (or increases the asset).
    - 9.2.5 Effect of pass-through features

## Appendix A Contract classification for Canadian life and health products

## Appendix B Examples of investment components in Canadian life and health contracts

## Appendix C Examples of service components in Canadian products
- Policy and contract administration and claims adjudication are separated and measured under IFRS 15 if distinct (readily available to the contract holder through other means), and are not separated otherwise.

## Appendix D Measurement approaches for typical Canadian products

## Related readings
- [[CIA PAA]] — cited in §5.2 for the considerations in assessing whether the PAA is a reasonable approximation to the GMA
- [[CIA IFRS 2]] — cited in §9 for approaches to setting the risk adjustment; the syllabus edition (2024) revises the June 2022 note cited here
- [[CIA Discount Rates]] — cited in §7.1 and §8.1 for P&C cash flows and discount rates; the syllabus edition (2025) updates the note first published in June 2022
- [[CIA CSOP]] — the CIA Standards of Practice, in the pre-IFRS 17 form the note compares against (it cites subsections 2240 and 2330 for discounting)

## Sources
- [Comparison of IFRS 17 to Current CIA Standards of Practice (CIA, 2022)](https://www.casact.org/sites/default/files/2023-05/6C_CIA_Educatitional_Note_Comparision_of_IFRS_17_to_CurrentCIA.pdf) — the document: title page, memorandum, table of contents, and the text of Sections 1–9 and Appendix C
- [CAS Exam 6C Content Outline, Fall 2026](https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf) — the citation and the assigned scope, with its exclusions
- [IFRS 17 Risk Adjustment for Non-Financial Risk for Property and Casualty Insurance Contracts (CIA, 2024)](https://www.cia-ica.ca/publications/224090e/) — its preamble, stating that it revises the June 2022 note
- [IFRS 17 Discount Rates and Cash Flow Considerations for Property and Casualty Insurance Contracts (CIA, 2025)](https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=628504&fid=628505) — its preamble, stating that it was originally published in June 2022
