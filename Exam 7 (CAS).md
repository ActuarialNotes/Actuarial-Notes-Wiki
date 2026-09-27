---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:518298b567edef1f3dabaef6ddd6205f68f492ec189cf07313c0171c20e2113c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Exam 7 (CAS).md
---

<div class="exam-nav"
     data-color="#65a30d"
     data-current="7|Advanced Estimation of Claims Liabilities"
     data-tracks="FCAS|Fellow of the Casualty Actuarial Society (FCAS).md">
</div>

# Exam 7

**Advanced Estimation of Claims Liabilities (Exam 7)** is a 4-hour computer-based exam (4.5-hour Pearson VUE appointment, with a 15-minute scheduled break) covering unpaid claim point estimates, unpaid claim distributions and their diagnostics, and reserving for reinsurance.

## Learning Objectives

> [!example]- A. Estimation of Claims Liabilities {100%}
> Candidates are expected to apply basic [[Actuarial Principles|Principles]] and [[Actuarial Standards of Practice|Standards of Practice]] for [[Unpaid Claims|unpaid claim estimation]], including evaluating [[Unpaid Claims|liabilities]] arising in complex [[Risk Transfer|risk transfer agreements]] common in [[Excess Insurance|excess insurance]] and [[Reinsurance|reinsurance contracts]].
>
> **Data Preparation, Organization, & Analysis**
>
> 1. Perform [[Data Diagnostic Analysis|data diagnostic analyses]] and adjust for [[Data Issues|data issues]].
>
> **Unpaid Claim Point Estimates**
>
> 2. Calculate [[Unpaid Claims|unpaid claims estimates]].
> 3. Test [[Unpaid Claims|unpaid claim estimates]] for [[Reasonableness Testing|reasonableness]].
> 4. Estimate [[Unpaid Claims|unpaid claims]] for various [[Layer of Insurance|layers of coverage]].
> 5. Forecast [[Premium Reserve|premium reserves]] (e.g., [[Retrospective Premium Reserve|reserves for retrospective premiums]]).
>
> **Unpaid Claim Stochastic Distributions**
>
> 6. Estimate [[Parameter Estimation|parameters]] of [[Unpaid Claim Distribution|unpaid claims distributions]].
> 7. Calculate the [[Moment|moments]] and [[Percentile|percentiles]] of [[Unpaid Claim Distribution|unpaid claim distributions]].
> 8. Simulate [[Parameter Risk|parameter percentiles]] and [[Unpaid Claim Distribution|unpaid claims percentiles]].
> 9. Calculate the [[Expected Value|mean]] and [[Prediction Error|prediction error]] of a [[Unpaid Claims|reserve]].
> 10. Derive [[Predictive Distribution|predictive distributions]] using [[Stochastic Reserving|stochastic methods]].
>
> **Unpaid Claim Output & Diagnostic Analysis**
>
> 11. Test [[Model Output|output]] of [[Unpaid Claim Distribution|unpaid claim distributions]] for [[Reasonableness Testing|reasonableness]].
> 12. Test [[Actuarial Assumptions|assumptions]] underlying [[Loss Reserving|reserving models]].
> 13. Develop a [[Range of Indications|range of indications]].
> 14. Calculate [[Risk Margin|risk margins]].
>
> **Reinsurance**
>
> 15. Adjust [[Loss Reserving|primary methods]] and [[Reserving Data Organization|data]] to be used for [[Reinsurance Reserving|reinsurance reserving]].
> 16. Calculate [[Ceded Loss Reserve|ceded loss reserves]].
> 17. Describe the [[Reinsurance|function]] and [[Types of Reinsurance|types of reinsurance]].
>
> **Readings:** Brosius · Clark · Friedland · Hurlimann · Mack – Chain Ladder · Mack – Benktander · Marshall et al. · Meyers · Sahasrabuddhe · Shapland · Siewert · Taylor · Teng and Perkins · Venter Factors · Verrall

## Source Material

>[!answer]- Source Material {15 Sources}
>
> - [[Loss Development Using Credibility (Brosius - 1993)]]
>      - A1-A3, A6, A11 — CAS Study Note, March 1993
> - [[LDF Curve-Fitting and Stochastic Reserving (Clark - 2003)]]
>      - A2-A3, A6-A8, A11 — Casualty Actuarial Society Forum, Fall 2003
> - [[Reserving for Reinsurance (Friedland - 2022)]]
>      - A15-A17 — CAS Study Note, 2022
> - [[Credible Loss Ratio Claims Reserves (Hurlimann - 2009)]]
>      - A1-A3, A6, A11 — ASTIN Bulletin 39(1), 2009, pp. 81-99, including errata; candidates are not responsible for mathematical proofs
> - [[Measuring the Variability of Chain Ladder Reserve Estimates (Mack - 1994)]]
>      - A2, A6-A8 — Casualty Actuarial Society Forum, Spring 1994
> - [[Credible Claims Reserves: The Benktander Method (Mack - 2000)]]
>      - A1-A3, A9, A11-A12 — ASTIN Bulletin, 2000, pp. 333-347^[The outline prints the page range as "pp. 333-337"; the paper, ASTIN Bulletin Vol. 30, No. 2, runs to page 347.]
> - [[A Framework for Assessing Risk Margins (Marshall et al. - 2008)]]
>      - A14 — Institute of Actuaries of Australia 16th General Insurance Seminar, November 2008
> - [[Stochastic Loss Reserving Using Bayesian MCMC Models (Meyers - 2019)]]
>      - A9-A11, A14 — CAS Monograph #8, 2nd edition, including errata
> - [[Claims Development by Layer (Sahasrabuddhe - 2010)]]
>      - A4 — Casualty Actuarial Society E-Forum, Fall 2010, Volume 1 (revised January 2, 2013), including errata
> - [[Using the ODP Bootstrap Model (Shapland - 2016)]]
>      - A1, A9-A11, A13 — CAS Monograph #4, including errata; the supplementary modeling files linked on pages 61-62 aid understanding of the method's application
> - [[A Model for Reserving Workers Compensation High Deductibles (Siewert - 1996)]]
>      - A4 — Casualty Actuarial Society Forum, Summer 1996, pp. 217-244
> - [[Stochastic Loss Reserving Using Generalized Linear Models (Taylor and McGuire - 2016)]]
>      - A9-A12 — CAS Monograph #3, Chapters 1-6, including errata
> - [[Estimating the Premium Asset on Retrospectively Rated Policies (Teng and Perkins - 1996)]]
>      - A5 — PCAS LXXXIII, 1996, pp. 611-647, excluding Section 5, including the discussion by Feldblum (PCAS LXXXV, 1998, pp. 274-315), Sections 1 and 2 only; candidates are not responsible for specific Annual Statement notation but are responsible for the concepts presented
> - [[Testing the Assumptions of Age-to-Age Factors (Venter - 1998)]]
>      - A2, A6, A12 — PCAS LXXXV, 1998, pp. 807-847, including errata and updated errata
> - [[Obtaining Predictive Distributions for Reserves Which Incorporate Expert Opinion (Verrall - 2007)]]
>      - A9, A13 — Variance, Vol. 1, Issue 1, 2007, including errata
