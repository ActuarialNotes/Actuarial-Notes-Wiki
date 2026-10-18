---
Title: "Penalized Regression and Lasso Credibility"
Authors: "Thomas Holmes and Mattia Casotto"
Publisher: "Casualty Actuarial Society"
Year: "2025"
date: "2025"
Type: "Monograph"
Code: "CAS Monograph No. 13"
ISBN: "978-1-7370028-6-4"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2025-08/CAS_Monograph_13_2025_revision.pdf)"
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-17
  last_checked_by: agent:validate-v1
  content_hash: sha256:1e9750c82151a554e8d6b337ad3f643c24cf646b1d2d9b016ac0be77fa0ababa
  sources:
    - "Holmes and Casotto, Penalized Regression and Lasso Credibility, CAS Monograph Series Number 13, 2025 Revision (Casualty Actuarial Society, copyright 2025; ISBN 978-1-7370028-6-4 print), 128 pp., PDF pp.1-11 read (cover, title, copyright, contents pp.5-7, editorial board, acknowledgments, about the authors, introduction), headings located in the body, References (PDF p.124) read, sha256:f6978accbd2bcd43284ec939dd90966430a3e36fc126aab4584241a13d7a28cd — https://www.casact.org/sites/default/files/2025-08/CAS_Monograph_13_2025_revision.pdf"
    - "CAS, Errata, Penalized Regression and Lasso Credibility (2025 Revision), approved 12/5/2025, sha256:642022832e3ec1a7a08b587ae70a0e0d0d710ee30ab96f55b7907288e3b8e906 — https://www.casact.org/sites/default/files/2025-12/Monograph_13_Errata_sheet.pdf"
    - "CAS, Exam Content Outline — Advanced Ratemaking – Exam 8, Fall 2026 (Exam_8_CO_2026_F v03 2026_6_22, 6 pp.), PDF pp.1-6 incl. link annotations, sha256:306e7a7b6351597e46fd82fd74c294fce3afc8b1f9227ea8c001f3b081964521 — https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Penalized Regression and Lasso Credibility (Holmes and Casotto - 2025).md
---
![[Penalized Regression and Lasso Credibility (Holmes and Casotto - 2025) - Cover.svg]]

A CAS monograph (2025 Revision) that reviews generalized linear models and introduces penalized regression and its connections to credibility. It explains why lasso is the preferred penalization for actuarial analysis and shows how lasso penalization can be used as lasso credibility through a new use of the offset, with the usage aligned to Actuarial Standard of Practice No. 25, Credibility Procedures.

> [!info] On the syllabus
> - [[Exam 8 (CAS)|Exam 8]] — objectives A1, A3–A5; CAS Monograph #13, 2025 revision, including errata.

## Acknowledgments

## About the Authors

## Introduction

## 1 A Review of GLMs
- 1.1 Definitions and Terminology
- 1.2 The Linear Predictor
- 1.3 Distributions and Link Functions
- 1.4 [[Offset Variable|The Offset]]
- 1.5 Table-Based Output: An Example
- 1.6 Likelihood Optimization: Full Credibility Assumption
    - 1.6.1 [[p-Value|P-Values]]
    - 1.6.2 Lack of Credibility in GLM Estimates

## 2 A Brief Review of Credibility
- 2.1 Incorporation of Credibility into GLM Estimates

## 3 Penalized Regression
- 3.1 Types of Penalized Regression
    - 3.1.1 Role of Penalty Parameter λ
    - 3.1.2 Ridge Regression
    - 3.1.3 Lasso
- 3.2 Lasso is Recommended for Actuarial Applications
- 3.3 Selecting the Penalty Parameter
- 3.4 Lasso and Variable Transformations
    - 3.4.1 Categorical Variables
    - 3.4.2 Continuous Variables
    - 3.4.3 Ordinal Variables
    - 3.4.4 Control Variables
- 3.5 Lasso for Variable Selection

## 4 The [[Bias-Variance Tradeoff|Bias–Variance Trade-Off]]
- 4.1 Introducing the Bias–Variance Trade-Off
- 4.2 Defining the Bias–Variance Trade-Off
- 4.3 Bias–Variance Trade-Off: A GLM Perspective
- 4.4 Evaluating the Bias–Variance Trade-Off
- 4.5 Bias–Variance Trade-Off and Credibility
- 4.6 Penalized Regression and Credibility
- 4.7 Conclusion: Benefits of Lasso Penalization

## 5 Lasso Credibility
- 5.1 The Offset: Applying a Complement in Lasso Credibility
- 5.2 Ordinal Variables
- 5.3 Lasso Credibility as a Credibility-Weighted GLM
- 5.4 Terminology and ASOP 25
- 5.5 Selecting and Evaluating a Penalty Parameter in Lasso Credibility
- 5.6 Calculating Indicated Rates in Lasso Credibility
- 5.7 Lasso Credibility Conclusions

## 6 Lasso Penalized Regression and Lasso Credibility Model Diagnostics
- 6.1 Review of the Lambda Penalty Parameter
- 6.2 Review of the Complement of Credibility
- 6.3 Relativity Plots
    - 6.3.1 Using Relativity Plots to Guide Model Review
    - 6.3.2 Full Credibility in the Complement
    - 6.3.3 Partial Credibility in the Complement
    - 6.3.4 Limited or No Credibility in the Complement
- 6.4 Review by Variable Type
    - 6.4.1 Categorical Variables
    - 6.4.2 Continuous Variables
    - 6.4.3 Ordinal Variables
    - 6.4.4 Control Variables
- 6.5 Model Validation Conclusions

## 7 Case Study
- 7.1 Countrywide Modeling and State Refits
- 7.2 Case Study Summary
    - 7.2.1 Data Description
    - 7.2.2 Predictor Variables
    - 7.2.3 Methodological Notes
    - 7.2.4 Prediction and Relativity Plots
- 7.3 Countrywide Model Results
    - 7.3.1 Large Data Approaches Full Credibility
    - 7.3.2 Additional Exercises—Full Data
    - 7.3.3 Full Data Conclusion—Lasso Penalization, but Not Lasso Credibility
- 7.4 “Large State” Modeling Results
    - 7.4.1 Low Significance Correlates with High Shrinkage
    - 7.4.2 Shrinkage Varies between Engineered Features
    - 7.4.3 Credibility and Feature Engineering
    - 7.4.4 Penalized Regression Benefits
- 7.5 “Large State”—Lasso Credibility Versus GLM
    - 7.5.1 Coefficients of Zero Show Confidence in the Complement of Credibility
    - 7.5.2 Partially Credible Categories Avoid Overreactions
    - 7.5.3 Credible Categories React Quickly
    - 7.5.4 Lasso Credibility Moves Toward Experienced Relativities
    - 7.5.5 Performance Comparison: Lasso Credibility Versus Lasso Versus GLM
    - 7.5.6 Large State Conclusion
- 7.6 “Medium State”—Lasso Credibility Versus GLM
    - 7.6.1 Evaluating the Assigned Credibility
    - 7.6.2 Some Credibility is Better Than None
    - 7.6.3 Medium State Conclusion
- 7.7 “Small States”—Lasso Credibility Versus GLM
    - 7.7.1 Lasso Credibility is Viable When GLM Fails
    - 7.7.2 A Good Complement Creates a Sparse Model
    - 7.7.3 Small-State Conclusion
- 7.8 Case Study Conclusion

## 8 Conclusion—Overall

## Appendix A Bayesian Interpretation of Credibility
- A.1 Why GLMs Give 100% Credibility to the Data
- A.2 Credibility: A Bayesian Interpretation
- A.3 Penalized Regression: A Bayesian Interpretation
- A.4 Practical Comparison
    - A.4.1 Comparison with Increasing Exposures (Fixed Observed Average)
    - A.4.2 Comparison with an Increasing Observed Average (Fixed Exposure)
    - A.4.3 Final Comparison
- A.5 Degrees of “Bayesian-ness”

## Appendix B Alignment of Lasso Credibility with ASOP 25
- B.1 Definitions: Default Complement of Lasso Credibility
- B.2 Considerations and Scope of ASOP 25
- B.3 Alternate Complements in Lasso Credibility
- B.4 Lasso Credibility and ASOP 25 Summary

## Appendix C Miscellaneous
- C.1 Rebasing Model Output
- C.2 Penalized Regression and Near Aliasing
- C.3 Penalized Regression and the [[AIC]]

## Appendix D Sparsity: A Convex Optimization Perspective
- D.1 Simplified Proof of the Lasso Problem
- D.2 General Proof of the Lasso Problem

## References

## Related readings
- [[ASOP 25 - Credibility Procedures (ASB - 2013)]] — the standard Chapter 5.4 and Appendix B align lasso credibility with
- [[Generalized Linear Models for Insurance Rating (Goldburd et al. - 2020)]] — the CAS GLM monograph this one builds on

## Sources
- [Penalized Regression and Lasso Credibility, 2025 Revision (CAS Monograph No. 13)](https://www.casact.org/sites/default/files/2025-08/CAS_Monograph_13_2025_revision.pdf) — the document: title page, copyright page and ISBN, the printed table of contents (chapter, section and subsection titles and numbers) and the Introduction
- [CAS Exam 8 Content Outline, Fall 2026](https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf) — the citation and the assigned scope (A1, A3–A5; 2025 revision, including errata)
