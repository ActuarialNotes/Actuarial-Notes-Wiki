---
Title: "Calibrating Interest Rate Models"
Authors: "Rohana Ambagaspitiya and Charles Ford"
Publisher: "Society of Actuaries Research Institute"
Year: "2023"
date: "2023"
Type: "Report"
Available from: "[soa.org](https://www.soa.org/globalassets/assets/files/resources/research-report/2023/interest-rate-model-calibration-study.pdf)"
---
![[Calibrating Interest Rate Models (SOA Research - 2023) - Cover.svg]]

A research report, dated October 2023 and sponsored by the SOA's Quantitative Finance and Investment Curriculum Committee, that introduces practitioners to the selection and calibration of stochastic interest rate models. It presents six continuous-time interest rate models and their calibration, with R code and data examples, and is aimed at the investment and valuation actuary who must choose a model for a purpose, use real-world or risk-neutral scenarios correctly, and calibrate and validate the result. Its scope is narrow: default-free bond yields in a single economy.

> [!info] On the syllabus
> - [[Exam INV-201 (SOA)|Exam INV-201]] — Sections 1.1-4.3, excluding 4.1.2; outcomes 2g-2i.

## Executive Summary

## 1 Introduction
- 1.1 R Setup
- 1.2 Introduction to Scenarios
- 1.3 Interest Rate Markets
- 1.4 Market-Consistent Models
- 1.5 The Market Price of Risk
- 1.6 Parameter Uncertainty

## 2 Three Continuous-Time Interest Rate Models
- 2.1 The Vasicek Model
    - 2.1.1 Simulating paths of the Vasicek model: Euler-Maruyama discretization
    - 2.1.2 Simulating paths of the Vasicek model: Transition Density Method
- 2.2 Cox-Ingersoll-Ross (CIR) Model
    - 2.2.1 Simulating paths of the CIR Model: Euler-Maruyama discretization
    - 2.2.2 Simulating paths of the CIR model: Transition density method
- 2.3 The Two-Factor Vasicek model with correlated factors
    - 2.3.1 Simulating paths of the two-factor Vasicek model: Transition density method

## 3 Calibration Techniques
- 3.1 The Vasicek model: real-world calibration
    - 3.1.1 Maximum Likelihood Estimator Method
    - 3.1.2 Long Term Quantile Method
- 3.2 The Vasicek model: risk-neutral calibration
- 3.3 The CIR model: real-world calibration
    - 3.3.1 Euler method
    - 3.3.2 Maximum likelihood estimate
- 3.4 The generalized method of moments
- 3.5 The CIR model: risk-neutral calibration
- 3.6 The two-factor Vasicek model calibration

## 4 No-Arbitrage Models
- 4.1 Hull-white models
    - 4.1.1 One factor Hull-white model
    - 4.1.2 The two-factor Hull-white model
    - 4.1.3 Hull-white model calibration
- 4.2 Yield curve interpolation: one-factor model
    - 4.2.1 Fitting an n degree polynomial for $r_{0,t}$
    - 4.2.2 Fitting a Nelson-Siegel Curve to $r_{0,t}$
- 4.3 Calibration of the One-Factor Hull-White Model
- 4.4 Calibration of the Two-Factor Hull-White Model

## 5 Model Validation
- 5.1 Data and Assumptions
- 5.2 Investigate the Data
- 5.3 Recalibrate
- 5.4 Validate
- 5.5 Model Governance

## 6 Conclusion

## 7 Acknowledgments

## References

## Appendix A Zero coupon bond prices under one-factor Vasicek model

## Appendix B Zero coupon bond prices under the two-factor Vasicek model

## Sources
- [Calibrating Interest Rate Models (SOA Research Institute, October 2023)](https://www.soa.org/globalassets/assets/files/resources/research-report/2023/interest-rate-model-calibration-study.pdf) — the document: title page, authors and sponsor, the table of contents and bookmarks for the divisions, and the executive summary for the lead
- [Calibrating Interest Rate Models, research report page (SOA)](https://www.soa.org/resources/research-reports/2023/interest-rate-model-calibration-study/) — the page the syllabus links to for the report
- [INV 201 Syllabus, Nov 2026/Mar 2027/Jul 2027 (SOA)](https://www.soa.org/globalassets/assets/files/edu/2026/inv-201/2026-2027-inv-201-syllabus.pdf) — the sections assigned and the learning outcomes
