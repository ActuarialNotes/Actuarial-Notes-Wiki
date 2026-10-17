---
Title: "Healthcare Risk Adjustment and Predictive Modeling"
Authors: "Ian Duncan"
Publisher: "ACTEX Learning"
Year: "2018"
date: "2018"
Edition: "2nd"
Type: "Textbook"
ISBN: "978-1-63588-413-5"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:344e6d0171d6fd9fd2be014b22b0e3102917b68bd5ae7522adb823e337a64438
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Healthcare Risk Adjustment and Predictive Modeling (Duncan - 2018).md
---
![[Healthcare Risk Adjustment and Predictive Modeling (Duncan - 2018) - Cover.svg]]

A guide for healthcare actuaries and other professionals interested in healthcare data and predictive modeling, in its second edition of 2018. Its publisher describes three parts: health risk, available data, identification algorithms and grouper models; data mining and common modeling approaches; and case studies from Medicaid, Medicare Advantage, ACA exchanges and other settings, including use outside the United States.

> [!info] On the syllabus
> - [[Exam GH-301 (SOA)|Exam GH-301]] — Risk Adjustment; Ch. 13: Medicaid Risk Adjustment (3a, 3b); Ch. 14: Risk Adjustment in Medicare, excluding Appendix 14.1 & 14.2 (3a, 3b); Ch. 21: Risk Adjustment on the ACA Exchanges (3a).

## Foreword to the Second Edition

## Foreword to the First Edition

## Preface

## Section One Introduction and Background

### 1 Introduction to Health Risk
- 1.1 What is Health Risk?
- 1.2 Health Risk Management
- 1.3 What Is the Difference between Risk Adjustment and Risk Prediction?
- Appendix: Clinical Risk – The Framingham Heart Study

### 2 Models for Predicting Health Costs
- 2.1 Introduction
- 2.2 Non-Condition Risk-Based Models
- 2.3 Age/Sex and Prior Cost Models: Summary
- 2.4 Risk Factor-Based Risk Models
- 2.5 Medical Condition-Based Risk
- 2.6 Lifestyle-Related Risk Factors
- 2.7 Exogenous Risk Factors

### 3 Data: The Raw Material of Modeling
- 3.1 Overview
- 3.2 Physician Referral, Medical Charts, and Electronic Medical Records
- 3.3 Enrollment (Eligibility) Data
- 3.4 Medical Claims
- 3.5 Claims Costs
- 3.6 Paid Claims vs. Allowed Charges
- 3.7 Facility and Physician Claim Forms
- 3.8 Interpretation of Claims Codes
- 3.9 Pharmacy Claims
- 3.10 The Anatomical Therapeutic Chemical Classification System
- 3.11 Clinical, Laboratory and EMR Data
- 3.12 Other Data Available from Non-Claims Sources
- 3.13 Survey Data
- 3.14 Conclusion
- Appendix 3.1: HCPCS Codes
- Appendix 3.2: CMS: Place of Service Codes
- Appendix 3.3 Type of Bill (TOB) Code
- Appendix 3.4 Revenue Code Categories
- Appendix 3.5 Type and Source of Admission Codes
- Appendix 3.6: Patient Status (at Discharge) Codes
- Appendix 3.7: Physician Specialty Codes
- Appendix 3.8: Mapping MS-Diagnosis Related Groups
- Appendix 3.9: Legislation Affecting the Use of Data
- Appendix 3.10: R Code for Grouping 2017 Medical and Surgical MS-DRG Codes

### 4 Clinical Identification Algorithms
- 4.1 Clinical Identification Algorithms
- 4.2 Sensitivity-Specificity Trade-Off
- 4.3 Constructing an Identification Algorithm
- 4.4 Sources of Algorithms

### 5 Grouper Models
- 5.1 Use of Grouper Models
- 5.2 Features of Grouper Models
- 5.3 Episode Grouper Models
- 5.4 Therapeutic Class Grouper Models
- 5.5 Drug-Based Risk Adjustment Models

### 6 Development and Construction of DRGs, DCGs, and ETGs
- 6.1 History, Development, and Use of Diagnosis-Related Groups (DRGs)
- 6.2 DxCG's Clinical Classification System
- 6.3 Development of Relative Risk Scores
- 6.4 Concurrent and Prospective Models
- 6.5 Episode Groupers: Symmetry's Episode Treatment Groups (ETGS)
- Appendix: Examples of DRGs

## Section Two Model Construction

### 7 Introduction to Modeling
- 7.1 What is a Model?
- 7.2 Example of a Model Application
- 7.3 Modeling Tools
- 7.4 The Sample Database
- 7.5 Modeling
- 7.6 Testing a Model's Reproducibility
- 7.7 Selecting Between Models
- 7.8 Variable Transformation
- 7.9 Implementation and Computation
- Appendix: List of Variables Available in the Test Dataset

### 8 Linear Regression Models
- 8.1 Model Specification and Assumptions
- 8.2 Least Squares Estimation
- 8.3 ANOVA
- 8.4 Statistical Inference
- 8.5 Prediction
- 8.6 Model Diagnostics
- 8.7 Example of Linear Regression
- 8.8 Flexibility of Linearity
- 8.9 Summary
- Appendix 1: Sample Data Set
- Appendix 2: R Code for Linear Regression Model

### 9 The Generalized Linear Model
- 9.1 Components of GLM
- 9.2 Maximum Likelihood Estimation (MLE)
- 9.3 Statistical Inference in GLM: LRT, Wald, and Score Tests
- 9.4 Model Selection in GLM
- 9.5 Summary

### 10 Logistic Regression Models
- 10.1 Odds and Odds Ratio
- 10.2 Estimation
- 10.3 Example of Logistic Regression
- 10.4 Predictive Accuracy
- 10.5 Optimal Cutoff Point
- 10.6 ROC Curve
- 10.7 Summary
- Appendix: R Code for Logistic Regression Models

### 11 Tree-Based Methods
- 11.1 Introduction
- 11.2 Tree Terminology
- 11.3 Finding the Best Split
- 11.4 Pruning and Tree Size Determination
- 11.5 Use and Advantages of Tree-Based Methods
- 11.6 Decision Tree: Example
- 11.7 Summary
- Appendix: R Code

### 12 Artificial Neural Networks
- 12.1 Multilayer Perceptron (MLP)
- 12.2 Radial Basis Function (RBF) Networks
- 12.3 Fitting Neural Networks
- 12.4 Example of Artificial Neural Networks
- 12.5 Summary

## Section Three Applications

### 13 Medicaid Risk Adjustment
- 13.1 Background
- 13.2 Methodology
- 13.3 Newborn Model
- 13.4 Application of the Methodology to Capitation Rate Adjustment
- Appendix: Acronyms and Other Regulatory References Used in this Chapter

### 14 Risk Adjustment in Medicare
- 14.1 Introduction
- 14.2 Medicare Risk Adjuster Methodology
- 14.3 Illustrative Examples of 2017 Medicare Risk Score Calculations
- 14.4 Use of the Projected Medicare Risk Score in the Part C Medicare Bid
- 14.5 Medicare vs. ACA Health Insurance Exchange Risk Adjustment
- 14.6 Part D Risk Adjustment
- 14.7 Conclusion
- Appendix 14.1: Medicare's STARS Rating System
- Appendix 14.2: Medicare Advantage Bid Process
- Appendix 14.3: Revisions and Updates to HCC Models

### 15 Risk Adjustment and Health Care Reform: The Example of Massachusetts
- 15.1 Background
- 15.2 Risk Adjustment in the Commonwealth Care Program
- 15.3 Choice and Calibration of the Risk Adjustment Model
- 15.4 Practical Application of Adjustment in the Exchange
- 15.5 Postscript

### 16 Developing and Using Predictive Models for Care Management Programs
- 16.1 The Risk Management Economic Model
- 16.2 Identification, Stratification, and Prediction
- 16.3 What Is Opportunity Analysis?
- 16.4 Member Stratification for Opportunity Analysis
- 16.5 Designing a Program
- 16.6 Implementing a Program
- 16.7 The Value of Opportunity Analysis
- 16.8 Conclusion

### 17 Provider Efficiency Assessment and Reimbursement Using Risk Adjustment
- 17.1 Provider Efficiency Assessment
- 17.2 Impact of Provider Practice and Care Management on Risk Adjustment
- 17.3 An Empirical Study of Provider Reimbursement and Independence of Outcomes
- 17.4 Risk Adjustment Issues in Provider Contracting
- 17.5 Conclusions

### 18 Developing a Predictive Model for Depression Severity
- 18.1 Background
- 18.2 The Study
- 18.3 Conclusion

### 19 A Predictive Model for Disability Underwriting Profitability
- 19.1 Background
- 19.2 The Model
- 19.3 Choice of Decision Tree
- 19.4 Choice of Variables and Development of Final Model
- 19.5 Model Evaluation
- 19.6 Using the Model for Underwriting

### 20 Predicting Hospital Readmissions
- 20.1 Why Are Hospital Readmissions Important?
- 20.2 Readmission Adjustment Penalty Calculation
- 20.3 Existing Readmission Predictive Models
- 20.4 Data
- 20.5 The Model
- 20.6 Practical Application
- 20.7 An Economic Model for Readmission Intervention
- Appendix: R Code for Running the Model

### 21 Risk Adjustment on the ACA Exchanges
- 21.1 The Affordable Care Act and the State Exchanges
- 21.2 History and Operation of Exchanges
- 21.3 Risk Adjustment in Exchanges
- 21.4 Revenue Transfer Process
- 21.5 Underlying Theory of Risk Adjustment
- 21.6 A Problem with Non-Linear Cost Relationships
- 21.7 Empirical Analysis of Cost-Risk Relationship
- 21.8 Some Other Practical Risk Adjustment Issues
- 21.9 Conclusion

### 22 Accountable Care Organizations
- 22.1 Accountable Care Organizations
- 22.2 Structure and Organization of Medicare ACOs
- 22.3 ACO Assignment Process
- 22.4 ACO Per Capita Costs
- 22.5 ACO Risk Adjustment
- 22.6 ACO Savings Calculation
- Appendix 22.1: Providers of Primary Care Services (for Determination of Assignment)

### 23 Predictive Modeling and Risk Adjustment outside the United States
- 23.1 Predictive Modeling in the United Kingdom
- 23.2 Risk Adjustment in the Netherlands
- 23.3 Risk Adjustment in Israel
- 23.4 Risk Adjustment in Colombia
- 23.5 Risk Adjustment in South Africa
- 23.6 Conclusion

### 24 Communicating Results
- 24.1 Background
- 24.2 Persuasion: The Purpose of Communication
- 24.3 What Constitutes Good Writing?
- 24.4 Communicating Technical Topics
- 24.5 A Word about Powerpoint Presentations
- 24.6 Report Structure
- 24.7 Actuarial Reporting Requirements
- 24.8 Conclusion

## A Statistical Appendix
- A.1 Random Variables and Distributions
- A.2 Confidence Intervals and Hypothesis Testing
- A.3 Two-Sample Inference
- A.4 Analysis of Variance (ANOVA)
- A.5 Appendix: Statistical Tables

## Bibliography

## Index

## Sources
- [Healthcare Risk Adjustment and Predictive Modeling, 2nd Edition, sample pages (ACTEX Learning)](https://www.actexmadriver.com/samples/HealthcareRisk-2nd%20Ed_SAMPLE_4-26-18.pdf) — the book itself: title page, copyright page (ACTEX Learning, 2018, ISBN 978-1-63588-413-5) and the table of contents by section, chapter and section (read from the PDF; sha256 f29a3f9a292b8ef7…)
- [Healthcare Risk Adjustment & Predictive Modeling (ACTEX Learning)](https://actexlearning.com/fellowship-textbooks/healthcare-risk-adjustment) — the publisher's record: author, edition, the ISBNs and the description of the three parts for the lead
- [GH-301 Syllabus, Nov 2026/Mar 2027/Jul 2027 (SOA)](https://www.soa.org/globalassets/assets/files/edu/2026/gh-301/2026-2027-gh-301-syllabus.pdf) — the citation (2nd Edition, 2018) and the chapters and outcomes assigned
