---
Title: "From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges"
Authors: "Alan Chalk, David Deacon, Montserrat Guillen and Max Martinelli"
Publisher: "Casualty Actuarial Society"
Year: "2025"
date: "2025"
Type: "Monograph"
Code: "CAS Monograph No. 16"
ISBN: "978-1-7370028-8-8"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2026-02/CAS_Monograph-16_From_GLMs.pdf)"
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-17
  last_checked_by: agent:validate-v1
  content_hash: sha256:ce466f43e8fcc63384085bfbae61369bdab603929ea837b0e41b5146d1c12586
  sources:
    - "Chalk, Deacon, Guillen and Martinelli, From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges, CAS Monograph Series Number 16 (Casualty Actuarial Society, copyright 2025; commissioned by the Exam 8 Working Group), 189 pp., PDF pp.1-15 read (cover, title, copyright page with ISBN 978-1-7370028-8-8 print, contents, acknowledgments, about the authors, chapters 1-2 opening) and the 147-entry bookmark outline, sha256:0b293634c3d6320eac9aca5d2f8ba4ca7954f20db8a462b24771c60b5e046d74 — https://www.casact.org/sites/default/files/2026-02/CAS_Monograph-16_From_GLMs.pdf"
    - "CAS, Exam Content Outline — Advanced Ratemaking – Exam 8, Fall 2026 (Exam_8_CO_2026_F v03 2026_6_22, 6 pp.), PDF pp.1-6 incl. link annotations, sha256:306e7a7b6351597e46fd82fd74c294fce3afc8b1f9227ea8c001f3b081964521 — https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf"
  open_findings: 0
  open_critical: 0
  log: ".verify/Resources/Books/From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges (Chalk et al.).md"
---
![[From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges (Chalk et al.) - Cover.svg]]

A CAS monograph, commissioned by the Exam 8 Working Group, that uses case studies to work through practical challenges in building generalized linear models for insurance rating. It assumes the reader knows the CAS GLM monograph (Goldburd et al.) and expands on its solutions to high cardinality categorical variables, models combined with a GLM, variables that must be controlled for, and highly correlated variables, revisiting performance measurement and nonlinear effects along the way.

> [!info] On the syllabus
> - [[Exam 8 (CAS)|Exam 8]] — objectives A7–A8; CAS Monograph #16, 1st edition.

## Acknowledgments

## About the Authors

## 1 Introduction
- 1.1 Objectives

## 2 The Case Studies
- 2.1 FAA-NTSB Data for Aircraft Incident Frequency
- 2.2 Road Accident Frequency Model
- 2.3 Simulated Data—Auto Insurance
- 2.4 The Challenges
    - 2.4.1 High cardinality categorical variables (HCCVs)
    - 2.4.2 Combining other models with a GLM
    - 2.4.3 “Controlling” for certain features
    - 2.4.4 Highly correlated variables
- 2.5 Next Steps

## 3 Performance Measurement
- 3.1 Pseudo-R²
- 3.2 Train—Validate—Test
- 3.3 Generalization Error
- 3.4 Null Models
- 3.5 Baseline Models
- 3.6 Benchmark Models
- 3.7 Practically Speaking
    - 3.7.1 Typical values for pseudo-R²
    - 3.7.2 Weights
    - 3.7.3 Creating folds
    - 3.7.4 Rebasing predictions
- 3.8 Next Steps

## 4 Penalized Regression
- 4.1 Introduction
- 4.2 Types of Penalty
    - 4.2.1 Ridge regression
    - 4.2.2 LASSO
    - 4.2.3 Elastic net
- 4.3 Choosing 𝜆 Using k-Fold Cross-Validation
- 4.4 Case Study—Penalized Regression
- 4.5 The Relaxed LASSO
- 4.6 Practically Speaking
    - 4.6.1 Software
    - 4.6.2 How many models?
    - 4.6.3 Penalization parameter names—𝜆 and 𝛾
    - 4.6.4 Performance graphs—x-axis
    - 4.6.5 Choosing 𝜆
    - 4.6.6 Flavors of penalized regression
- 4.7 Technical Note
    - 4.7.1 Solving Ridge regression
    - 4.7.2 Standardization
    - 4.7.3 Solving the LASSO
- 4.8 Next Steps

## 5 Nonlinear Effects
- 5.1 Feature Engineering
- 5.2 Step Functions
- 5.3 Hinge Functions
- 5.4 Step Versus Hinge
- 5.5 Multivariate Adaptive Regression Splines (MARS)
- 5.6 Case Study—Piecewise Linear Functions
- 5.7 Practically Speaking
    - 5.7.1 Random features
    - 5.7.2 Ordinal categorical variables
    - 5.7.3 Surrogate GLMs
- 5.8 Technical Note
    - 5.8.1 Step functions and the fused LASSO
- 5.9 Next Steps

## 6 High Cardinality Categorical Variables (HCCVs)
- 6.1 Introduction
- 6.2 Target Encoding
- 6.3 Leakage
- 6.4 Some Other Encoding Approaches
    - 6.4.1 Grouping rare categories
    - 6.4.2 Frequency encoding
    - 6.4.3 Hierarchical grouping
    - 6.4.4 Feature creation and word embeddings
- 6.5 Generalized Linear Mixed Models
- 6.6 Case Study—HCCVs
- 6.7 Practically Speaking
    - 6.7.1 Sense-checking the results and ad-hoc adjustments
    - 6.7.2 Target encoding using GLM predictions
    - 6.7.3 Novel categories in the future
    - 6.7.4 What does zero mean?
    - 6.7.5 Keeping up with other ideas
    - 6.7.6 Read the documentation
    - 6.7.7 Are HCCVs really predictive?
    - 6.7.8 Sense-checking the data
- 6.8 Technical Note
    - 6.8.1 HCCV estimates using Ridge regression
    - 6.8.2 Link to the Bayesian approach
- 6.9 Next Steps

## 7 Highly Correlated Variables
- 7.1 How Do Highly Correlated Variables Arise?
    - 7.1.1 Naturally
    - 7.1.2 As a result of data enrichment
    - 7.1.3 As a result of feature engineering
- 7.2 Why Do They Matter?
    - 7.2.1 Computational issues
    - 7.2.2 Performance
    - 7.2.3 Interpretability and communication
    - 7.2.4 Cost
- 7.3 Introducing a Case Study
- 7.4 Dealing with Highly Correlated Variables
    - 7.4.1 Common sense
    - 7.4.2 Removing some features before model training
    - 7.4.3 Ridge regression
    - 7.4.4 LASSO
    - 7.4.5 Principal component analysis
- 7.5 Practically Speaking
    - 7.5.1 Fold variable in time series data
    - 7.5.2 Hinges and splines with correlated features
    - 7.5.3 LASSO in the presence of highly correlated features
    - 7.5.4 High coefficients in later principal components

## 8 Modeling in Two Stages
- 8.1 Fixing Coefficients With an Offset
- 8.2 The Hypothesis Space of GLMs
- 8.3 Two-Stage Models Using Offsets
- 8.4 Two-Stage Models Using Residuals
- 8.5 Two-Stage Models Using Preadjustment
- 8.6 Recombining the Two Models
- 8.7 Combining Parts of Multiplicative Models
- 8.8 Further Examples
    - 8.8.1 Credit scores
    - 8.8.2 Usage-based insurance
    - 8.8.3 Use of proxy variables
- 8.9 Practically Speaking
    - 8.9.1 Leakage in two-stage models
    - 8.9.2 Rating groups

## 9 Learning From Black-Box Models
- 9.1 Model Variance Revisited
- 9.2 Variable Selection and Importance
- 9.3 Nonlinear Effects
- 9.4 Interactions
- 9.5 Practically Speaking
    - 9.5.1 Feature importance—train or test data
- 9.6 Technical Note
    - 9.6.1 Reasons that certain model types include all features

## 10 Challenges and Considerations in Ratemaking Models
- 10.1 Understanding the Data
- 10.2 Technical Errors
- 10.3 Data Does Not Meet Model Assumptions
- 10.4 Stability Over Time
    - 10.4.1 Coefficients can change over time
    - 10.4.2 The meaning of data can change over time
    - 10.4.3 Business mix can change over time
    - 10.4.4 When cross-validation will fail
- 10.5 Regulation
- 10.6 Outliers and Model Stability
- 10.7 Data Quality
- 10.8 Conclusion

## Bibliography

## Sources
- [From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges (CAS Monograph No. 16)](https://www.casact.org/sites/default/files/2026-02/CAS_Monograph-16_From_GLMs.pdf) — the document: title page, copyright page and ISBN, the printed table of contents (chapter, section and subsection titles and numbers) and the Introduction (1.1 Objectives)
- [CAS Exam 8 Content Outline, Fall 2026](https://www.casact.org/sites/default/files/2026-03/Exam_8_CO_2026_Fall.pdf) — the citation and the assigned scope (A7–A8; 1st edition)
