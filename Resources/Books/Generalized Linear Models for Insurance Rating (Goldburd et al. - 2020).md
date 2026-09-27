---
Title: "Generalized Linear Models for Insurance Rating"
Authors: "Mark Goldburd, Anand Khare, Dan Tevet and Dmitriy Guller"
Publisher: "Casualty Actuarial Society"
Year: "2020"
date: "2020"
Edition: "2nd"
Type: "Monograph"
Code: "CAS Monograph No. 5"
ISBN: "978-1-7333294-3-9"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f470cd369ca7b24b436bf98c56ebb68a117ca961c8cc992af0265333a5156497
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Generalized Linear Models for Insurance Rating (Goldburd et al. - 2020).md
---
![[Generalized Linear Models for Insurance Rating (Goldburd et al. - 2020) - Cover.svg]]

A comprehensive guide to creating an insurance rating plan using generalized linear models (GLMs), with an emphasis on application over theory. Written for actuaries practising in property/casualty insurance, it presents the technical foundations through insurance examples, then covers the model-building process, data preparation, selection of model form, model refinement and model validation, and briefly discusses extensions to the GLM. It is number 5 in the CAS Monograph Series; the copy CAS now hosts is the second edition's 2025 revision, whose contents and Chapter 7 match the 2020 printing page for page.

> [!info] On the syllabus
> - [[Exam MAS-II (CAS)|Exam MAS-II]] — objectives C10–C11; Chapter 7.
> - [[Exam PCPA (CAS)|Exam PCPA]] — objectives B1–B2; Chapter 7.
> - [[Exam 8 (CAS)|Exam 8]] — objectives A1, A4–A8.

## 1 Introduction
- The authors know of no single text for the practising actuary that serves as a definitive reference for the use of GLMs in [[Classification Ratemaking|classification ratemaking]]; the monograph aims to give the reader the tools to build a market-ready classification plan from raw premium and loss data.
- It assumes familiarity with the earlier CAS exams, including the Actuarial Standards of Practice and Werner and Modlin's *Basic Ratemaking* (2010).

## 2 Overview of Technical Foundations
- 2.1 The Components of the GLM
    - 2.1.1 The Random Component: The [[Exponential Family]]
    - 2.1.2 The Systematic Component
    - 2.1.3 An Example
- 2.2 Exponential Family Variance
- 2.3 Variable Significance
    - 2.3.1 Standard Error
    - 2.3.2 [[p-Value|p-value]]
    - 2.3.3 [[Confidence Interval]]
- 2.4 Types of Predictor Variables
    - 2.4.1 Treatment of Continuous Variables
    - 2.4.2 Treatment of Categorical Variables
    - 2.4.3 Choose Your Base Level Wisely!
- 2.5 Weights
- 2.6 [[Offset Variable|Offsets]]
- 2.7 An Inventory of Distributions
    - 2.7.1 Distributions for Severity
    - 2.7.2 Distributions for Frequency
    - 2.7.3 A Distribution for Pure Premium: the [[Tweedie Distribution]]
- 2.8 [[Logistic Regression]]
- 2.9 Correlation Among Predictors, [[Multicollinearity]] and Aliasing
- 2.10 Limitations of GLMs

## 3 The Model-Building Process
- 3.1 Setting Objectives and Goals
- 3.2 Communicating with Key Stakeholders
- 3.3 Collecting and Processing Data
- 3.4 Conducting [[Exploratory Data Analysis]]
- 3.5 Specifying Model Form
- 3.6 Evaluating Model Output
- 3.7 Validating the Model
- 3.8 Translating the Model into a Product
- 3.9 Maintaining and Rebuilding the Model

## 4 Data Preparation and Considerations
- 4.1 Combining Policy and Claim Data
- 4.2 Modifying the Data
- 4.3 Splitting the Data
    - 4.3.1 Train and Test
    - 4.3.2 Train, Validation and Test
    - 4.3.3 Use Your Data Wisely!
    - 4.3.4 [[Cross-Validation|Cross Validation]]

## 5 Selection of Model Form
- 5.1 Choosing the Target Variable
    - 5.1.1 Frequency/Severity versus Pure Premium
    - 5.1.2 Policies with Multiple Coverages and Perils
    - 5.1.3 Transforming the Target Variable
- 5.2 Choosing the Distribution
- 5.3 [[Variable Selection]]
- 5.4 [[Variable Transformation|Transformation of Variables]]
    - 5.4.1 Detecting Non-Linearity with Partial Residual Plots
    - 5.4.2 Binning Continuous Predictors
    - 5.4.3 Adding Polynomial Terms
    - 5.4.4 Using Piecewise Linear Functions
    - 5.4.5 Natural Cubic Splines
- 5.5 Grouping Categorical Variables
- 5.6 [[Interaction|Interactions]]
    - 5.6.1 Interacting Two Categorical Variables
    - 5.6.2 Interacting a Categorical Variable with a Continuous Variable
    - 5.6.3 Interacting Two Continuous Variables

## 6 Model Refinement
- 6.1 Some Measures of Model Fit
    - 6.1.1 Log-Likelihood
    - 6.1.2 [[Deviance]]
    - 6.1.3 Limitations on the Use of Log-Likelihood and Deviance
- 6.2 Comparing Candidate Models
    - 6.2.1 Nested Models and the F-Test
    - 6.2.2 Penalized Measures of Fit
- 6.3 Residual Analysis
    - 6.3.1 Deviance Residuals
    - 6.3.2 Working Residuals
- 6.4 Assessing Model Stability

## 7 Model Validation and Selection
- The chapter's techniques choose between final candidate models, including proprietary rating plans whose data and form are unavailable: they need only historical observations scored with each model's predictions, and they compare models in a way accessible to the business decision-makers who often choose between them.
- 7.1 Assessing Fit with Plots of Actual vs. Predicted
    - Plot the actual target against the predicted target for each model, on [[Holdout Sample|holdout data]]; large datasets are often grouped into percentiles (100 buckets of equal model weight) and plotted on a log scale.
- 7.2 Measuring Lift
    - [[Lift]] is a model's economic value: its ability to charge each insured an actuarially fair rate and so prevent [[Adverse Selection|adverse selection]]. It is relative, the lift of one model over another, and is always measured on holdout data.
    - 7.2.1 Simple [[Quantile Plot|Quantile Plots]]
        - Sort by predicted loss cost, bucket into quantiles of equal exposure, and plot actual against predicted pure premium; the winner is judged on predictive accuracy, monotonicity, and the vertical distance between the first and last quantiles.
    - 7.2.2 [[Double Lift Chart|Double Lift Charts]]
        - Sort on the ratio of Model A's to Model B's predicted loss cost, so the first and last quantiles hold the risks the two models disagree on most; the winner more closely matches the actual pure premium in each quantile.
    - 7.2.3 Loss Ratio Charts
        - Sort on predicted [[Loss Ratio|loss ratio]] and plot the actual loss ratio of each quantile; they are simple to understand and explain, since loss ratios are the most commonly used measure of profitability.
    - 7.2.4 The [[Gini Index]]
        - Sort by predicted loss cost and plot the cumulative percentage of losses against the cumulative percentage of exposures (the Lorenz curve); the Gini index is twice the area between that curve and the line of equality.
        - It quantifies a rating plan's ability to separate the best and worst risks, not its profitability.
- 7.3 Validation of Logistic Regression Models
    - Quantile plots, Lorenz curves and the Gini index carry over to [[Logistic Regression|logistic regression]] models by sorting on predicted probability.
    - 7.3.1 Receiver Operating Characteristic (ROC) Curves
        - A discrimination threshold turns a predicted probability into a yes/no prediction; the four outcomes on a test set form a [[Confusion Matrix|confusion matrix]], giving the sensitivity (true positive rate) and the specificity.
        - The ROC curve plots the true positive rate against the false positive rate over all thresholds; the area under it, the [[AUROC]], is 0.500 for a model with no predictive power and 1.000 for a perfect one.
        - AUROC $= 0.5 \times$ normalized Gini $+ 0.5$, so the AUROC and the Gini index are not separate validation metrics.

## 8 Model Documentation
- 8.1 The Importance of Documenting Your Model
- 8.2 Check Yourself
- 8.3 Stakeholder Management
- 8.4 Code as Documentation

## 9 Other Topics
- 9.1 Modeling Coverage Options with GLMs (Why You Probably Shouldn't)
- 9.2 Territory Modeling
- 9.3 Ensembling

## 10 Variations on the Generalized Linear Model
- 10.1 Generalized Linear Mixed Models (GLMMs)
- 10.2 GLMs with Dispersion Modeling (DGLMs)
- 10.3 Generalized Additive Models (GAMs)
- 10.4 MARS Models
- 10.5 Elastic Net GLMs

## Bibliography

## Appendix

## Related readings
- [[Predictive Modeling Applications in Actuarial Science Volume 1 (Frees, Derrig and Meyers - 2014)]] — the Bibliography cites four of its chapters (5, 6, 15 and 16) for fuller technical treatment of GLMs and the other models discussed
- [[Generalized Linear Models for Insurance Data (De Jong and Heller - 2008)]] — cited in the Bibliography
- [[Basic Ratemaking (Werner - 2016)]] — Chapter 1 assumes the reader knows its ratemaking material; the monograph cites the 2010 edition

## Sources
- [Generalized Linear Models for Insurance Rating, 2nd ed., 2025 revision (Casualty Actuarial Society, 2025)](https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf) — the document at the address both content outlines link: title page, abstract, contents, Chapter 1, Chapter 7 and the Bibliography
- [Generalized Linear Models for Insurance Rating, 2nd ed. (Casualty Actuarial Society, 2020)](https://www.casact.org/sites/default/files/database/monographs_papers_05-goldburd-khare-tevet.pdf) — the 2020 printing the outlines cite: the copyright page and ISBNs; its contents and Chapter 7 compared with the 2025 revision and found identical
- [CAS Monograph No. 5 (Casualty Actuarial Society)](https://www.casact.org/monograph/cas-monograph-no-5) — the series number, the 2025 revision's description and its errata sheet link
- [CAS Exam MAS-II Content Outline, v04 (December 2024)](https://www.casact.org/sites/default/files/2023-06/MASII_Content_Outline.pdf) — the citation (2nd edition, 2020) and Chapter 7 for objectives C10–C11
- [CAS PCPA Exam & Project Content Outline, v.8 (September 2026)](https://www.casact.org/sites/default/files/2024-05/Exam_PCPA_2025_F_Content_Outlines.pdf) — the citation and Chapter 7 for Domain B
