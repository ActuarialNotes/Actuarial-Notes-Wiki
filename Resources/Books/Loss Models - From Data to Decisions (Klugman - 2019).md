---
Title: "Loss Models: From Data to Decisions"
Authors: "Stuart A. Klugman, Harry H. Panjer and Gordon E. Willmot"
Publisher: "Wiley"
Year: "2019"
date: "2019"
Edition: "5th"
Type: "Textbook"
ISBN: "978-1-119-52378-9"
---
![[Loss Models - From Data to Decisions (Klugman - 2019) - Cover.svg]]

A guide to the modeling techniques used throughout many branches of actuarial science, from random variables and distributions to estimation, model selection, credibility and simulation. Wiley's description says this fifth edition puts the focus on the material tested in the Society of Actuaries' Exams STAM and LTAM, with a wealth of examples, exercises taken from previous exams, and an emphasis on calculations and spreadsheet implementation. It covers parametric, non-parametric and Bayesian estimation methods and offers practical advice for choosing an appropriate model.

> [!info] On the syllabus
> - [[Exam FAM (SOA)|Exam FAM]] — Chapter 3 (Sections 1, 2, 4.1, 5); Chapter 4; Chapter 5 (Sections 3, 4); Chapter 6; Chapter 8 (Sections 1-5); Chapter 9 (Sections 1, 2, 3.1, 3.2, 7, 8.1, 8.2); Chapter 11 (Sections 1-4); Chapter 12 (Sections 1-3); Chapter 16. The syllabus also lists Corrections and Comments for Loss Models, Fifth Edition.
> - [[Exam ASTAM (SOA)|Exam ASTAM]] — Chapter 3: Sections 3.3, 3.4.2-3.4.6; Chapter 5: Sections 5.1, 5.2; Chapter 7: Sections 7.1, 7.2; Chapter 8; Chapter 9: Sections 9.3.1, 9.3.2, 9.4 (Theorem 9.7 & Example 9.9 only), 9.5, 9.6 (except 9.6.1), 9.7; Chapter 11: Sections 11.5-11.7; Chapter 12: Section 12.4; Chapter 13; Chapter 15 (except Section 15.4.2); Chapter 17; Chapter 18.

## Preface

## About the Companion Website

## Part I Introduction

### 1 Modeling
- 1.1 The Model-Based Approach
    - 1.1.1 The Modeling Process
    - 1.1.2 The Modeling Advantage
- 1.2 The Organization of This Book

### 2 Random Variables
- 2.1 Introduction
- 2.2 Key Functions and Four Models
    - 2.2.1 Exercises

### 3 Basic Distributional Quantities
- 3.1 [[Moment|Moments]]
    - 3.1.1 Exercises
- 3.2 [[Percentile|Percentiles]]
    - 3.2.1 Exercises
- 3.3 Generating Functions and Sums of Random Variables
    - 3.3.1 Exercises
- 3.4 Tails of Distributions
    - 3.4.1 Classification Based on Moments
    - 3.4.2 Comparison Based on Limiting Tail Behavior
    - 3.4.3 Classification Based on the Hazard Rate Function
    - 3.4.4 Classification Based on the Mean Excess Loss Function
    - 3.4.5 Equilibrium Distributions and Tail Behavior
    - 3.4.6 Exercises
- 3.5 [[Risk Measure|Measures of Risk]]
    - 3.5.1 Introduction
    - 3.5.2 Risk Measures and Coherence
    - 3.5.3 Value at Risk
    - 3.5.4 Tail Value at Risk
    - 3.5.5 Exercises

## Part II Actuarial Models

### 4 Characteristics of Actuarial Models
- 4.1 Introduction
- 4.2 The Role of Parameters
    - 4.2.1 Parametric and Scale Distributions
    - 4.2.2 Parametric Distribution Families
    - 4.2.3 [[Mixture Distribution|Finite Mixture Distributions]]
    - 4.2.4 Data-Dependent Distributions
    - 4.2.5 Exercises

### 5 Continuous Models
- 5.1 Introduction
- 5.2 Creating New Distributions
    - 5.2.1 Multiplication by a Constant
    - 5.2.2 Raising to a Power
    - 5.2.3 Exponentiation
    - 5.2.4 Mixing
    - 5.2.5 Frailty Models
    - 5.2.6 Splicing
    - 5.2.7 Exercises
- 5.3 Selected Distributions and Their Relationships
    - 5.3.1 Introduction
    - 5.3.2 Two Parametric Families
    - 5.3.3 Limiting Distributions
    - 5.3.4 Two Heavy-Tailed Distributions
    - 5.3.5 Exercises
- 5.4 The Linear Exponential Family
    - 5.4.1 Exercises

### 6 Discrete Distributions
- 6.1 Introduction
    - 6.1.1 Exercise
- 6.2 [[Poisson Distribution|The Poisson Distribution]]
- 6.3 [[Negative Binomial Distribution|The Negative Binomial Distribution]]
- 6.4 [[Binomial Distribution|The Binomial Distribution]]
- 6.5 The (a, b, 0) Class
    - 6.5.1 Exercises
- 6.6 Truncation and Modification at Zero
    - 6.6.1 Exercises

### 7 Advanced Discrete Distributions
- 7.1 Compound Frequency Distributions
    - 7.1.1 Exercises
- 7.2 Further Properties of the Compound Poisson Class
    - 7.2.1 Exercises
- 7.3 Mixed-Frequency Distributions
    - 7.3.1 The General Mixed-Frequency Distribution
    - 7.3.2 Mixed Poisson Distributions
    - 7.3.3 Exercises
- 7.4 The Effect of Exposure on Frequency
- 7.5 An Inventory of Discrete Distributions
    - 7.5.1 Exercises

### 8 Frequency and Severity with Coverage Modifications
- 8.1 Introduction
- 8.2 [[Deductible|Deductibles]]
    - 8.2.1 Exercises
- 8.3 The Loss Elimination Ratio and the Effect of Inflation for Ordinary Deductibles
    - 8.3.1 Exercises
- 8.4 [[Policy Limit|Policy Limits]]
    - 8.4.1 Exercises
- 8.5 Coinsurance, Deductibles, and Limits
    - 8.5.1 Exercises
- 8.6 The Impact of Deductibles on Claim Frequency
    - 8.6.1 Exercises

### 9 Aggregate Loss Models
- 9.1 Introduction
    - 9.1.1 Exercises
- 9.2 Model Choices
    - 9.2.1 Exercises
- 9.3 The Compound Model for Aggregate Claims
    - 9.3.1 Probabilities and Moments
    - 9.3.2 Stop-Loss Insurance
    - 9.3.3 [[Tweedie Distribution|The Tweedie Distribution]]
    - 9.3.4 Exercises
- 9.4 Analytic Results
    - 9.4.1 Exercises
- 9.5 Computing the Aggregate Claims Distribution
- 9.6 The Recursive Method
    - 9.6.1 Applications to Compound Frequency Models
    - 9.6.2 Underflow/Overflow Problems
    - 9.6.3 Numerical Stability
    - 9.6.4 Continuous Severity
    - 9.6.5 Constructing Arithmetic Distributions
    - 9.6.6 Exercises
- 9.7 The Impact of Individual Policy Modifications on Aggregate Payments
    - 9.7.1 Exercises
- 9.8 The Individual Risk Model
    - 9.8.1 The Model
    - 9.8.2 Parametric Approximation
    - 9.8.3 Compound Poisson Approximation
    - 9.8.4 Exercises

## Part III Mathematical Statistics

### 10 Introduction to Mathematical Statistics
- 10.1 Introduction and Four Data Sets
- 10.2 Point Estimation
    - 10.2.1 Introduction
    - 10.2.2 Measures of Quality
    - 10.2.3 Exercises
- 10.3 Interval Estimation
    - 10.3.1 Exercises
- 10.4 The Construction of Parametric Estimators
    - 10.4.1 The Method of Moments and Percentile Matching
    - 10.4.2 Exercises
- 10.5 Tests of Hypotheses
    - 10.5.1 Exercise

### 11 Maximum Likelihood Estimation
- 11.1 Introduction
- 11.2 Individual Data
    - 11.2.1 Exercises
- 11.3 Grouped Data
    - 11.3.1 Exercises
- 11.4 Truncated or Censored Data
    - 11.4.1 Exercises
- 11.5 Variance and Interval Estimation for Maximum Likelihood Estimators
    - 11.5.1 Exercises
- 11.6 Functions of Asymptotically Normal Estimators
    - 11.6.1 Exercises
- 11.7 Nonnormal Confidence Intervals
    - 11.7.1 Exercise

### 12 Frequentist Estimation for Discrete Distributions
- 12.1 [[Poisson Distribution|The Poisson Distribution]]
- 12.2 [[Negative Binomial Distribution|The Negative Binomial Distribution]]
- 12.3 [[Binomial Distribution|The Binomial Distribution]]
- 12.4 The (a, b, 1) Class
- 12.5 Compound Models
- 12.6 The Effect of Exposure on Maximum Likelihood Estimation
- 12.7 Exercises

### 13 Bayesian Estimation
- 13.1 Definitions and Bayes' Theorem
- 13.2 Inference and Prediction
    - 13.2.1 Exercises
- 13.3 Conjugate Prior Distributions and the Linear Exponential Family
    - 13.3.1 Exercises
- 13.4 Computational Issues

## Part IV Construction of Models

### 14 Construction of Empirical Models
- 14.1 The Empirical Distribution
- 14.2 Empirical Distributions for Grouped Data
    - 14.2.1 Exercises
- 14.3 Empirical Estimation with Right Censored Data
    - 14.3.1 Exercises
- 14.4 Empirical Estimation of Moments
    - 14.4.1 Exercises
- 14.5 Empirical Estimation with Left Truncated Data
    - 14.5.1 Exercises
- 14.6 [[Kernel Density Estimation|Kernel Density Models]]
    - 14.6.1 Exercises
- 14.7 Approximations for Large Data Sets
    - 14.7.1 Introduction
    - 14.7.2 Using Individual Data Points
    - 14.7.3 Interval-Based Methods
    - 14.7.4 Exercises
- 14.8 Maximum Likelihood Estimation of Decrement Probabilities
    - 14.8.1 Exercise
- 14.9 Estimation of Transition Intensities

### 15 Model Selection
- 15.1 Introduction
- 15.2 Representations of the Data and Model
- 15.3 Graphical Comparison of the Density and Distribution Functions
    - 15.3.1 Exercises
- 15.4 Hypothesis Tests
    - 15.4.1 [[Kolmogorov-Smirnov Test|The Kolmogorov–Smirnov Test]]
    - 15.4.2 The Anderson–Darling Test
    - 15.4.3 [[Chi-Square Goodness-of-Fit Test|The Chi-Square Goodness-of-Fit Test]]
    - 15.4.4 [[Likelihood Ratio Test|The Likelihood Ratio Test]]
    - 15.4.5 Exercises
- 15.5 Selecting a Model
    - 15.5.1 Introduction
    - 15.5.2 Judgment-Based Approaches
    - 15.5.3 Score-Based Approaches
    - 15.5.4 Exercises

## Part V Credibility

### 16 Introduction to Limited Fluctuation Credibility
- 16.1 Introduction
- 16.2 Limited Fluctuation Credibility Theory
- 16.3 Full Credibility
- 16.4 [[Partial Credibility|Partial Credibility]]
- 16.5 Problems with the Approach
- 16.6 Notes and References
- 16.7 Exercises

### 17 Greatest Accuracy Credibility
- 17.1 Introduction
- 17.2 Conditional Distributions and Expectation
- 17.3 The Bayesian Methodology
- 17.4 The Credibility Premium
- 17.5 [[Bühlmann Credibility|The Bühlmann Model]]
- 17.6 [[Bühlmann-Straub Credibility|The Bühlmann–Straub Model]]
- 17.7 Exact Credibility
- 17.8 Notes and References
- 17.9 Exercises

### 18 Empirical Bayes Parameter Estimation
- 18.1 Introduction
- 18.2 Nonparametric Estimation
- 18.3 Semiparametric Estimation
- 18.4 Notes and References
- 18.5 Exercises

## Part VI Simulation

### 19 Simulation
- 19.1 Basics of Simulation
    - 19.1.1 The Simulation Approach
    - 19.1.2 Exercises
- 19.2 Simulation for Specific Distributions
    - 19.2.1 Discrete Mixtures
    - 19.2.2 Time or Age of Death from a Life Table
    - 19.2.3 Simulating from the (a, b, 0) Class
    - 19.2.4 Normal and Lognormal Distributions
    - 19.2.5 Exercises
- 19.3 Determining the Sample Size
    - 19.3.1 Exercises
- 19.4 Examples of Simulation in Actuarial Modeling
    - 19.4.1 Aggregate Loss Calculations
    - 19.4.2 Examples of Lack of Independence
    - 19.4.3 Simulation Analysis of the Two Examples
    - 19.4.4 The Use of Simulation to Determine Risk Measures
    - 19.4.5 Statistical Analyses
    - 19.4.6 Exercises

## A An Inventory of Continuous Distributions
- A.1 Introduction
- A.2 The Transformed Beta Family
    - A.2.1 The Four-Parameter Distribution
    - A.2.2 Three-Parameter Distributions
    - A.2.3 Two-Parameter Distributions
- A.3 The Transformed Gamma Family
    - A.3.1 Three-Parameter Distributions
    - A.3.2 Two-Parameter Distributions
    - A.3.3 One-Parameter Distributions
- A.4 Distributions for Large Losses
    - A.4.1 Extreme Value Distributions
    - A.4.2 Generalized Pareto Distributions
- A.5 Other Distributions
- A.6 Distributions with Finite Support

## B An Inventory of Discrete Distributions
- B.1 Introduction
- B.2 The (a, b, 0) Class
- B.3 The (a, b, 1) Class
    - B.3.1 The Zero-Truncated Subclass
    - B.3.2 The Zero-Modified Subclass
- B.4 The Compound Class
    - B.4.1 Some Compound Distributions
- B.5 A Hierarchy of Discrete Distributions

## C Frequency and Severity Relationships

## D The Recursive Formula

## E Discretization of the Severity Distribution
- E.1 The Method of Rounding
- E.2 Mean Preserving
- E.3 Undiscretization of a Discretized Distribution

## References

## Index

## Sources
- [Loss Models: From Data to Decisions, 5th Edition — Table of Contents (PDF) (Wiley)](https://media.wiley.com/product_data/excerpt/88/11195237/1119523788-8.pdf) — the book's printed contents: every part, chapter, section and subsection, with the preface, companion website, references and index
- [Loss Models: From Data to Decisions, 5th Edition (Wiley)](https://www.wiley.com/en-us/Loss+Models%3A+From+Data+to+Decisions%2C+5th+Edition-p-9781119523789) — the authors, hardcover ISBN 978-1-119-52378-9, May 2019 publication, 560 pages and the publisher's description
- [SOA Exam FAM syllabus, October 2026](https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf) — the citation (Fifth Edition, 2019, Wiley) and the assigned chapters and sections for FAM
- [SOA Exam ASTAM syllabus, Fall 2026](https://www.soa.org/globalassets/assets/files/edu/2026/astam/2026-fall-exam-astam-syllabus.pdf) — the assigned chapters and sections for ASTAM
