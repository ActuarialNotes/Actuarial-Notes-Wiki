---
Title: "Outstanding Claims Reserves"
Authors: "Mary R. Hardy"
Publisher: "Society of Actuaries"
Year: "2022"
date: "2022"
Type: "Study Note"
Code: "ASTAM-21-26"
Available from: "[soa.org](https://www.soa.org/globalassets/assets/files/edu/2026/astam/2026-astam-21-26-study-note.pdf)"
---
![[ASTAM-21-26 - Outstanding Claims Reserves - Cover.svg]]

A study note, Version 1.4, written to support students preparing for the Advanced Short-Term Actuarial Mathematics (ASTAM) exam of the Society of Actuaries. Its author's aim is to present both deterministic and some stochastic methods and models for estimating outstanding claims liabilities, in a form suitable for classroom teaching and self-study, balancing rigour and accessibility. It uses the R package ChainLadder extensively in Chapters 4 and 5.

> [!info] On the syllabus
> - [[Exam ASTAM (SOA)|Exam ASTAM]] — ASTAM-21-26: Outstanding Claims Reserves, Version 1.4, 2022, Hardy, M.R. (excluding Appendix).

## Preface

## 1 Introduction
- Outstanding Claims Reserves (OCR) represent the provision made by an insurer for losses that have been incurred but not yet settled; the delays come from reporting, claims processing and legal proceedings.
- Short-tail lines have losses reported promptly, with the longest delays no more than around five years; long-tail lines take well over five years to settle all the claims of one year.
- The reserve may be subdivided into claims that are reported but not (fully) settled (RBNS) and claims that have been incurred but not yet reported, called [[IBNR]] or pure IBNR; most methods in the note estimate the total outstanding claims, with IBNR implicitly included.
- The Unearned Premium Reserve (UPR) is separate: it is the provision made for future potential claims, the unearned part of premiums paid in advance.
- OCR categories: case-based estimation, the expected loss ratio method, aggregate run-off triangle methods, credibility methods, frequency-severity methods and parametric models.
- The note focuses on data-driven aggregate claims estimation approaches that use run-off triangle data to project future payments, starting from the deterministic [[Chain Ladder Method|chain ladder]].

## 2 Run-off triangles
- 2.1 Notation
- 2.2 The deterministic chain ladder approach
- 2.3 Inflation-adjusted chain ladder

## 3 $\hat{C}_{i,J}$ as an expected value
- 3.1 The chain ladder method
- 3.2 Testing the chain ladder assumptions
- 3.3 The [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] (BF) method
- 3.4 The [[Bühlmann-Straub Credibility|Bühlmann-Straub]] credibility model
- 3.5 The Poisson model

## 4 Mack's model
- 4.1 Introduction and assumptions
- 4.2 Uncertainty measures in Mack's model
    - 4.2.1 Process variance
    - 4.2.2 Estimation error, individual AY
    - 4.2.3 MSEP for aggregate outstanding claims
- 4.3 Mack's Model in R

## 5 The overdispersed Poisson model
- The Poisson and overdispersed Poisson (ODP) models, with maximum likelihood estimated parameters, give the same estimated outstanding claims as the chain ladder method; the ODP, formulated as a generalized linear model with a log link, gives an alternative to Mack's formulas for estimating standard errors.

## 6 Frequency-severity models
- 6.1 Claim frequency
- 6.2 Claim severity

## A Proof of Theorem 3

## Sources
- [ASTAM-21-26: Outstanding Claims Reserves, Version 1.4 (SOA, 2026 ASTAM Study Note 21-26)](https://www.soa.org/globalassets/assets/files/edu/2026/astam/2026-astam-21-26-study-note.pdf) — the document: title page (Version 1.4, copyright 2022 M. R. Hardy), contents, preface and the opening of Chapters 1, 2, 3, 5 and 6
- [SOA Exam ASTAM syllabus, Fall 2026](https://www.soa.org/globalassets/assets/files/edu/2026/astam/2026-fall-exam-astam-syllabus.pdf) — the citation and the assignment, excluding the Appendix
