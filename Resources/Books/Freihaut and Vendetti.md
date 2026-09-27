---
Title: "Common Pitfalls and Practical Considerations in Risk Transfer Analysis"
Authors: "Derek Freihaut and Paul Vendetti"
Publisher: "Casualty Actuarial Society"
Year: "2009"
date: "2009"
Type: "Paper"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-03/6C_Freihaut_and_Vendetti.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:18c95421d9985c09c13748c84eb0090085ca092ecdc0a48b4112272201b87ef6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Freihaut and Vendetti.md
---
![[Freihaut and Vendetti - Cover.svg]]

A CAS E-Forum paper (Spring 2009) on the nuances that can trip up an actuary testing a reinsurance contract for risk transfer. It discusses several of these pitfalls and gives direction on addressing them from material published by the accounting boards, the American Academy of Actuaries and the CAS, raises practical considerations that have no easy answers, and illustrates both with two example contracts for which an Expected Reinsurer Deficit (ERD) is calculated.

> [!info] On the syllabus
> - [[Exam 6C (CAS)|Exam 6C]] — objectives C1 and C3; Appendices A and B are for information only and will not be directly tested.

## 1 Introduction
- 1.1 Risk Transfer in Current Literature
    - The discussion draws on the AAA's Reinsurance Attestation Supplement 20-1 practice note, the CAS Research Working Party's paper on risk transfer testing, FAS 113 and SSAP 62.
- 1.2 Objective
- 1.3 Outline

## 2 Brief History of Risk Transfer
- For reinsurance accounting, FAS 113 (under [[GAAP]]) and SSAP 62 (under [[Statutory Accounting Principles|SAP]]) generally require that the reinsurer assume significant insurance risk under the reinsured portion of the underlying agreement, and that it be reasonably possible that the reinsurer realize a significant loss; neither standard defines those terms.
- After abuses in the use of [[Finite Reinsurance|finite reinsurance]], the Reinsurance Attestation Supplement in the 2005 NAIC Annual Statement required the CEO and CFO to confirm that there are no separate agreements with the reinsurer, that contracts whose [[Risk Transfer|risk transfer]] is not reasonably self-evident are documented, that SSAP 62 is complied with, and that controls monitor the use of reinsurance.
- Insurance risk has two components, underwriting risk and timing risk; if both are not present, insurance risk has not been transferred.
- 2.1 One Exemption from Risk Transfer Requirements – "Substantially All"
    - A reinsurer that assumes substantially all of the insurance risk in the reinsured portions — most commonly a straight quota share or individual risk contract with no loss ratio caps or other risk-limiting features — is exempt from the significant-loss requirement.
- 2.2 Required Risk Transfer Documentation and Reasonably Self-Evident
    - The authors find it dangerous to codify "reasonably self-evident" with explicit criteria, and recommend keeping documentation on all contracts reviewed for risk transfer.
- 2.3 Selected Risk Measuring Method – Expected Reinsurer Deficit (ERD)
    - The "10-10" rule finds risk transfer if there is at least a 10% chance of a 10% or greater loss to the reinsurer; ERD, the probability of a [[Net Present Value|net present value]] underwriting loss to the reinsurer times the NPV of the average severity of that loss, is typically taken to show risk transfer above 1%, consistent with 10-10.
- 2.4 Risk Transfer Thresholds
    - The authors recommend keeping the 1% ERD threshold until more thorough analysis suggests otherwise, and not adding requirements such as a maximum loss.

## 3 Common Pitfalls and Practical Considerations
- Two workers compensation contracts illustrate the analysis — a [[Quota Share|quota share]] with a 100% loss ratio cap and a profit commission, and a swing-rated [[Excess of Loss|excess of loss]] contract with a fee to avoid commutation after five years; simulated cash flows give ERDs of 2.85% and 2.09%.
- 3.1 Analyzing Risk Transfer
- 3.2 Common Pitfalls
    - 3.2.1 Profit Commissions
        - [[Profit Commission|Profit commissions]] generally should not be considered, as they are usually not triggered during a reinsurer loss, though they can affect risk transfer indirectly through the premium, and carryforwards that affect a reinsurer loss must be modelled.
    - 3.2.2 Reinsurer Expenses
        - Only cash flows between the ceding company and the reinsurer count, so broker expenses, operating expenses, letter-of-credit fees and taxes bear no impact.
    - 3.2.3 Interest Rates and Discount Factors
        - SSAP 62 requires one constant interest rate across all scenarios; the AAA practice note recommends the risk-free rate, and the authors select it by the [[Duration|duration]] of the net cash flows to the reinsurer.
    - 3.2.4 Premiums
        - Use gross premium, discounted at the same rate as the losses, and develop the actual premium in each scenario rather than a deposit or expected premium; fees the cedant pays count as premium.
    - 3.2.5 Evaluation Date
        - Risk transfer is assessed at inception on the facts known then; retesting is needed only after an amendment that materially changes the risk transferred.
    - 3.2.6 Commutations and Timing of Payments
        - A prescribed payment pattern removes the timing risk risk transfer requires; [[Commutations|commutation]] clauses must be modelled to the extent they affect the cash flows.
- 3.3 Practical Considerations
    - 3.3.1 Parameter Selection
    - 3.3.2 Interest Rate
        - The risk-free rate is a floor; the reinsurer's expected investment return is an intuitive but flawed alternative, and a constant [[Yield Curve|yield curve]], though generally more stringent, does not appear consistent with the standards' single interest rate.
    - 3.3.3 Payment Pattern
    - 3.3.4 Loss Distribution
    - 3.3.5 Parameter Risk
        - [[Parameter Risk|Parameter risk]] should be included at least implicitly, and its possible effect documented; the interest rate should contribute no risk to the analysis.
    - 3.3.6 Use of Pricing Assumptions
    - 3.3.7 Commutation Clauses

## 4 Conclusions
- No method of testing risk transfer gives a "bright line"; the final decision belongs to the company's CEO or CFO, and a borderline ERD such as 0.95% or 1.05% needs further consideration and documentation.
- Risk transfer testing is a principle-based exercise, resting on a "reasonable chance of a significant loss" to the reinsurer.

## 5 References

## Appendix A Quota Share
- Risk Transfer – Simulation Analysis

## Appendix B Excess of Loss
- Risk Transfer – Simulation Analysis

## Sources
- [Common Pitfalls and Practical Considerations in Risk Transfer Analysis (CAS, 2009)](https://www.casact.org/sites/default/files/2021-03/6C_Freihaut_and_Vendetti.pdf) — the document: title, authors, abstract, section headings and the text of Sections 1–4
- [CAS Exam 6C Content Outline, Fall 2026](https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf) — the citation (which names the Fall 2009 E-Forum; the paper's own running head reads Spring 2009) and the assigned scope
