---
Title: "Variable Annuity Guarantees"
Authors: "Mary R. Hardy"
Publisher: "Society of Actuaries"
Year: "2022"
date: "2022"
Type: "Study Note"
Code: "ALTAM-21-23"
Available from: "[soa.org](https://www.soa.org/globalassets/assets/files/edu/2023/2023-07-altam-21-23.pdf)"
---
![[ALTAM-21-23 - Variable Annuity Guarantees - Cover.svg]]

A study note for the Advanced Long-Term Actuarial Mathematics exam, intended to be read with Chapter 15 of Actuarial Mathematics for Life Contingent Risks. Variable annuities (also known as segregated funds in Canada) are listed there as a type of equity-linked insurance, typically offering more extensive and more complex guaranteed benefits than other equity-linked insurance, and these guarantees are the topic of the note. Its objective is to describe the payouts under different benefit design features.

> [!info] On the syllabus
> - [[Exam ALTAM (SOA)|Exam ALTAM]] — ALTAM-21-23: Variable Annuity Guarantees.

## 1 Introduction
- Variable annuities (VAs) are a type of [[Equity-Linked Insurance|equity-linked insurance]]; the note is to be read with Chapter 15 of Actuarial Mathematics for Life Contingent Risks.
- Section 3 focuses on [[Guaranteed Minimum Death Benefit|guaranteed minimum death benefits]] (GMDBs) and [[Guaranteed Minimum Maturity Benefit|guaranteed minimum maturity benefits]] (GMMBs), which are cash payouts on death or maturity.
- Section 4 extends the discussion to [[Guaranteed Minimum Income Benefit|guaranteed minimum income benefits]] (GMIBs) and [[Guaranteed Minimum Withdrawal Benefit|guaranteed minimum withdrawal benefits]] (GMWBs), typically offered as riders to standard VA contracts for an additional fee.
- For accurate valuation and risk management it is necessary to adapt heavy duty mathematical and computational tools from quantitative and computational finance, which are beyond the scope of the note.

## 2 Notation and Terminology
- The terms defined are the policyholder's fund $F_t$, the premium $P$, the maturity date $n$, the management charge rate $MC_t$, the guaranteed minimum maturity benefit $GM_t$, the guaranteed minimum death benefit $GD_t$, the cash value $CV_t$, the benefit base $BB_t$ and the annuitization rate $\gamma_y$.
- 2.1 Some assumptions
    - The examples assume single premium contracts, a fixed maturity date $n$, no elective withdrawals before maturity unless there is a GMWB, management charges deducted at the start of each year and income or withdrawal payments made annually in advance.

## 3 GMMBs and GMDBs
- The standard GMMB and GMDB are usually a fixed percentage of the premium investment; the section describes three types of increasing guarantees: the reset option, the step-up (or lookback) option, and the rollover (or guaranteed accumulation) option.
- 3.1 Reset option
    - The policyholder may reset the guarantee from time to time to match the fund value, which mitigates lapse and re-entry risk.
- 3.2 Step-up Guarantees
    - At each step-up date the guarantee is increased to the level of the policyholder's fund, if that is larger than the guarantee immediately before the step-up date; in financial mathematics this is a discrete lookback option.
- 3.3 Guaranteed Rollover
    - At each rollover date the guarantee is increased as in a step-up, but if the fund value is less than the guarantee the insurer deposits additional cash into the fund to bring it up to the guaranteed amount.
- 3.4 Comments and Example
    - Example 3.1 takes a VA issued to (50) with a premium of 100,000 and a management charge of 2.5% a year, and calculates the cash payments and the insurer's guarantee payouts under five contract designs.

## 4 Income Benefits
- A GMIB provides a specified guaranteed annuitization rate for the VA proceeds, and a GMWB allows the policyholder to withdraw a specified minimum annual sum from the fund after an initial waiting period.
- 4.1 The Benefit Base
    - The benefit base cannot be withdrawn as a cash value; it is only used to determine the income amount under a GMIB or GMWB, and its initial value is usually a specified percentage (typically 100%) of the premium.
- 4.2 Guarantee Minimum Income Benefit
    - A GMIB rider offers a guaranteed annuitization rate that, if exercised, is applied at the maturity date to annuitize the value of the benefit base.
- 4.3 Guaranteed Minimum Withdrawal Benefits
    - After an initial waiting period the policyholder can withdraw a specified minimum amount each year, even if the withdrawals exceed the available funds; it is expressed as a percentage of the premium or of the benefit base, and typically ranges from 4% to 7%.

## 5 Notes
- Other design features of VAs include the investment options offered and the fee structure, which may be more complex than the annual management charges assumed in the note.

## Bibliography

## Related readings
- [[Actuarial Mathematics for Life Contingent Risks (Dickson - 2020)]] — the note is intended to be read with its Chapter 15

## Sources
- [ALTAM-21-23: Variable Annuity Guarantees (SOA)](https://www.soa.org/globalassets/assets/files/edu/2023/2023-07-altam-21-23.pdf) — the document: title page (M. R. Hardy, copyright 2022, posted with permission), all section headings and the points under them
- [SOA Exam ALTAM syllabus, October 2026](https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-altam-syllabus.pdf) — the citation and the reading's place in the syllabus
