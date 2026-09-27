---
Title: "Evaluation of the Runoff of P&C Claim Liabilities when the Liabilities are Discounted in Accordance with Accepted Actuarial Practice"
Authors: "Canadian Institute of Actuaries"
Publisher: "Canadian Institute of Actuaries"
Year: "2011"
date: "2011"
Type: "Educational Note"
Code: "211064"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-03/6C_CIA_Runoff.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:71e398637faf222e1fa8bd62cbd11029e8e49f887c36e456f363768929794e49
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/CIA Runoff.md
---
![[CIA Runoff - Cover.svg]]

A CIA educational note on evaluating the runoff of P&C claim liabilities when the liabilities are discounted in accordance with accepted actuarial practice. Revised by the Committee on Property and Casualty Insurance Financial Reporting as a minor amendment dated June 2011 (document 211064) and approved for distribution by the Practice Council on June 9, 2011, it is divided into three sections: the basic approaches to evaluating runoff, an accident year runoff model, and the allocation of investment income between liabilities and surplus.

> [!info] On the syllabus
> - [[Exam 6C (CAS)|Exam 6C]] — objectives C1 and C5; the whole note.

## Introduction
- The note guides P&C actuaries who prepare a comprehensive report on the valuation of the policy liabilities and an evaluation of the [[Runoff|runoff]] of the claim liabilities.
- The usual undiscounted approaches — comparing estimated ultimate incurred amounts at successive valuation dates, or payments plus the change in outstanding amounts — must be modified or replaced when claim liabilities are discounted in accordance with [[Accepted Actuarial Practice|accepted actuarial practice]].
- The guidance may be appropriate for the runoff of other liabilities, including [[Self-Insured Retention|self-insured retention]].

## 1 Basic Approaches to the Evaluation of Runoff of Claim Liabilities
- 1.1 Undiscounted Basis
    - The runoff, or calendar year emergence in *t* for [[Accident Year|accident years]] *t*−1 and prior, is computed in one of two ways that should produce the same result; either can be done on a policy or underwriting year basis with the portion of policy year *t*−1 earned in *t* excluded.

> $$\text{(a)}\quad \text{Emergence}_t = \text{Ultimate estimated at } t-1 \;-\; \text{Ultimate estimated at } t$$
> $$\text{(b)}\quad \text{Emergence}_t = \text{Claim liabilities at } t-1 \;-\; \text{Paid during } t \;-\; \text{Claim liabilities at } t$$

- 1.2 Discounted Basis
    - Comparing ultimates is not readily adjusted for the [[Time Value of Money|time value of money]] and the provision for adverse deviations; equation (b) is instead modified by discounting its second and third terms to *t*−1, or by subtracting the investment income earned during *t* on assets supporting the liabilities.
    - The two adjustments should produce equivalent results, but the second is simpler to calculate and present, and Sections 2 and 3 are based on it.
    - For the [[Appointed Actuary's Report|Appointed Actuary's report]] it is useful to identify the components of the runoff: the undiscounted claim liabilities, changes in the discount rate, and changes in the [[Margin for Adverse Deviations|provision for adverse deviations]].

## 2 Accident Year Runoff Model
- Illustrated by a calendar-year example: the excess (deficiency) during CY 6 for each accident year is the discounted claim liabilities at the prior year-end plus the investment income on unpaid claims, less the losses paid and the discounted claim liabilities at the current year-end.
- The investment income on unpaid claims is the annual yield times the average of the opening and closing discounted claim liabilities (for accident year 5, 6% × 36,500 = 2,190).
- The model may be expanded to monitor the runoff over a period of time (Tables 5 and 6).

## 3 Allocation of Investment Income Between Liabilities and Surplus
- The investment income attributable to policy liabilities should be determined, consistently with any allocation of assets, the company's investment policy and the basis used in [[Loss Reserve Discounting|discounting]] the policy liabilities, and the basis documented.
- With no formal allocation, the default yield rate is the calculation used in exhibit 10.60 of the P&C-1 or P&C-2; the note refers to Educational Note 210079 (Discounting, November 2010) for approaches to selecting a discount rate.
- The income is the selected yield times the average of the starting and ending net unpaid claims, net [[Unearned Premium|unearned premium]], premium deficiency provisions and unearned commissions, less gross DPAC, agents', brokers' and policyholders' receivables and instalment premiums.
- On the default yield, the investment income on policy liabilities is capped at the total investment income; if overall investment income is negative, the negative yield is used, so the runoff is penalized.
- A simple approach for the assets backing net unpaid claims multiplies the investment yield by the mean net claim liabilities.

## Exhibits
- Table 1—Paid Losses During the Calendar Year (CY)
- Table 2—Discounted Claim Liabilities
- Table 3—Investment Income on Unpaid Claims
- Table 4—Excess (Deficiency)
- Table 5—Cumulative Excess
- Table 6—Cumulative % Excess Ratio

## Sources
- [Evaluation of the Runoff of P&C Claim Liabilities when the Liabilities are Discounted in Accordance with Accepted Actuarial Practice (CIA, 2011)](https://www.casact.org/sites/default/files/2021-03/6C_CIA_Runoff.pdf) — the document (CAS-hosted copy of the June 2011 minor amendment): title page, covering memorandum, Introduction, Sections 1–3 and the exhibits
- [CAS Exam 6C Content Outline, Fall 2026](https://www.casact.org/sites/default/files/2026-03/Exam_6C_CO_2026_Fall.pdf) — the citation and the assigned scope
