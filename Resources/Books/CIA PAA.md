---
Title: "Assessing Eligibility for the Premium Allocation Approach Under IFRS 17 for Property & Casualty and Life & Health Insurance Contracts"
Authors: "Canadian Institute of Actuaries"
Publisher: "Canadian Institute of Actuaries"
Year: "2022"
date: "2022"
Type: "Educational Note"
Code: "222091"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2023-05/6C_CIA_Educational_Note_Assessing_Eligibility_for_the_Premium_Allocation_Approach.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:021e2b046a077d282796986c3285d0c44da437ebebb61ee5a0d9f55eafd464ac
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/CIA PAA.md
---
![[CIA PAA - Cover.svg]]

A CIA educational note on assessing whether a group of insurance contracts is eligible for the IFRS 17 premium allocation approach to the LRC. It was prepared jointly by the Committee on Property and Casualty Insurance Financial Reporting and the Committee on Life Insurance Financial Reporting and published in June 2022 (document 222091), and applies to all P&C and life and health groups potentially eligible for the PAA; the PAA's simplification of the LIC is outside its scope.

> [!info] On the syllabus
> - [[Exam 6C (CAS)|Exam 6C]] — objectives C1, C2; the whole note.

## 1 Introduction
- Under the [[Premium Allocation Approach|PAA]] there is no need to estimate fulfilment cash flows or to identify and amortize a [[Contractual Service Margin|CSM]]: per IFRS 17.55, the [[Liability for Remaining Coverage|LRC]] at initial recognition is the premiums received, less insurance acquisition cash flows unless they are expensed, plus or minus certain derecognized amounts.

## 2 Decision points
- A group is automatically eligible if the coverage period of each contract in it is one year or less (IFRS 17.53(b)); otherwise the entity must reasonably expect, at inception, that the PAA LRC would not differ materially from the [[General Measurement Model|GMA]] LRC at all reporting dates in the coverage period (IFRS 17.53(a)).
- An expectation of significant variability in the fulfilment cash flows would not by itself make a group ineligible, but disqualifies it if that variability is expected to create a material difference between the two estimates (IFRS 17.54).
- It may be efficient to test first on expected future cash flows: a group whose PAA and GMA estimates differ materially is ineligible, with no need to assess variability.

## 3 Coverage period considerations
- The coverage period follows the [[Contract Boundary|contract boundary]] of IFRS 17.34; restrictions on repricing that extend beyond a year, such as rate guarantees or caps on rate action, would likely extend it past one year, while a termination provision with commercial substance could shorten it.
- Consequential coverage, such as the disability payments of P&C automobile coverage, extends the coverage period only if the payments are a continuation of insurance coverage (LRC) rather than the settlement of a claim (LIC).

## 4 Assessing "would not differ materially"
- 4.1 Background
- 4.2 Determination of thresholds
    - Materiality is entity-specific; the actuary sets an internal policy with thresholds, such as a percentage and a dollar threshold, in consultation with management, and may assess some groups qualitatively.
- 4.3 Assessment of differences in the LRC
    - At inception, the expected PAA and GMA LRC are compared at each future reporting date for the group in its entirety; differences generally increase with the length of the coverage period, and a non-zero time value of money creates a difference that is unlikely to be significant if premiums and their claims are close in time (Appendix B).

## 5 Significant variability in the fulfilment cash flows
- Variability is significant if it is reasonably expected to result in significant differences between the PAA and GMA measurement of the LRC at any point during the coverage period; embedded derivatives are not typically found in Canadian P&C products and are not discussed.
- Changes in the probability-weighted cash flows may be largely offset by changes in the CSM, but changes in discount rates do not adjust the CSM (IFRS 17.B97(a)), which matters for coverages with long claim settlement periods such as P&C auto.
- Longer-term multi-year products, such as commercial construction policies, extended warranty and title insurance, may experience significant variability and require quantitative assessment.

## 6 Onerous contracts
- The PAA LRC of an [[Onerous Contract|onerous]] group is increased to reflect a [[Loss Component|loss component]], so it equals the GMA estimate at inception and the IFRS 17.53(a) test is always passed.

## 7 Reinsurance
- The eligibility of [[Reinsurance Contracts Held|reinsurance contracts held]] is assessed separately from that of the underlying contracts (IFRS 17.69–70); reinsurance held on a one-year risk-attaching basis could have a contract boundary of up to two years and so is not automatically eligible.

## 8 Subsequent assessments of similar contracts in new groups
- A quantitative test may not be needed for a new group with substantially the same characteristics as one already tested, but a new assessment may be required if market conditions change significantly.

## Appendix A Case study (Illustrative)
- An entity with $100 million of annual insurance revenue assesses five groups of 12-month and 24-month contracts against three thresholds.

## Appendix B Measurement differences due to time value of money

## Appendix C Variability in fulfilment cash flows

## Related readings
- [[CIA IFRS 17 - LRC]] — cites this note as the PAA Eligibility EN, for PAA eligibility and, in its §4.3.1, for this note's Section 3 on contract boundary topics
- [[CIA IFRS 17 - Comparison]] — cites this note in its §5.2 for the considerations in assessing whether the PAA is a reasonable approximation to the GMA

## Sources
- [Assessing Eligibility for the Premium Allocation Approach Under IFRS 17 for Property & Casualty and Life & Health Insurance Contracts (CIA, 2022)](https://www.casact.org/sites/default/files/2023-05/6C_CIA_Educational_Note_Assessing_Eligibility_for_the_Premium_Allocation_Approach.pdf) — the document: title page, memorandum, table of contents, the text of Sections 1–8 and the opening of each appendix
- [CAS Exam 6C Content Outline, Fall 2026](https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf) — the citation and the assigned scope
- [IFRS 17 – Actuarial Considerations Related to Liability for Remaining Coverage in P&C Insurance Contracts (CIA, 2022)](https://www.casact.org/sites/default/files/2023-05/6C_CIA_Educational_Note_IFRS_17_Actuarial_Considerations_Related_to_Liability.pdf) — its citations of this note
- [Comparison of IFRS 17 to Current CIA Standards of Practice (CIA, 2022)](https://www.casact.org/sites/default/files/2023-05/6C_CIA_Educatitional_Note_Comparision_of_IFRS_17_to_CurrentCIA.pdf) — its citation of this note in §5.2
