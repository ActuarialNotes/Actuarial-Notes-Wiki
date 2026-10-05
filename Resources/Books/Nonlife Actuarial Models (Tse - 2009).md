---
Title: "Nonlife Actuarial Models: Theory, Methods and Evaluation"
Authors: "Yiu-Kuen Tse"
Publisher: "Cambridge University Press"
Year: "2009"
date: "2009"
Type: "Textbook"
ISBN: "978-0-521-76465-0"
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:124309734e7b6755e5ddf6449b0750b33c71bae854158d9cab91f7679c88e270
  sources:
    - "Tse, Nonlife Actuarial Models: Theory, Methods and Evaluation (Cambridge University Press, 2009), publisher eBook preview: title page (PDF p.5), copyright page (PDF p.6: (c) Y.-K. Tse 2009, hardback ISBN-13 978-0-521-76465-0), full printed Contents pp. vii-xii (PDF pp.9-14, text layer), Preface (PDF pp.15-16), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "Cambridge Core book record: series International Series on Actuarial Science, ISBN 9780521764650, print publication date 17 September 2009, fetched 2026-10-05, sha256:87f03cc238550bce65ef555ceb2af5e55a37f26a1d1adde3bdf4ef99a1a8c8d0 — https://www.cambridge.org/core/books/nonlife-actuarial-models/41EF4E4BB9E3A31F63DDCC18C245C271"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06 2026_6_29), Complete Text References p.6 (and Domain readings pp.3-5), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "CAS Exam MAS-II Content Outline 2026, Complete Text References p.4 (Tse: Chapters 6.1-6.3, 7.1-7.4, 8.1-8.2, and 9.1-9.2; A1-A2) and Domain A readings p.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Nonlife Actuarial Models (Tse - 2009).md
---
![[Nonlife Actuarial Models (Tse - 2009) - Cover.svg]]

A textbook for senior undergraduates on the theory, methods and empirical implementation of nonlife actuarial models. Its preface says it covers all the topics of Exam C of the Society of Actuaries (Exam 4 of the Casualty Actuarial Society) as per the 2007 Basic Education Catalog, and some beyond them, such as risk measures and ruin theory. It is in four parts — loss models, risk and ruin, credibility, and model construction and evaluation — with an appendix reviewing statistics, many worked examples, and Excel computation notes in several chapters.

> [!info] On the syllabus
> - [[Exam MAS-I (CAS)|Exam MAS-I]] — objectives B1–B4 and B7–B9; Sections 1.1, 2.2, 2.3, 2.4, 2.5, 10.1, 10.2, 11.1, 12.1, 12.3 and 13.2.
> - [[Exam MAS-II (CAS)|Exam MAS-II]] — objectives A1–A2; Chapters 6.1–6.3, 7.1–7.4, 8.1–8.2 and 9.1–9.2.

## Preface

## Notation and convention

## Part I Loss models

### 1 Claim-frequency distribution
- 1.1 Claim frequency, claim severity, and aggregate claim
- 1.2 Review of statistics
- 1.3 Some discrete distributions for claim frequency
    - 1.3.1 [[Binomial Distribution|Binomial distribution]]
    - 1.3.2 [[Geometric Distribution|Geometric distribution]]
    - 1.3.3 [[Negative Binomial Distribution|Negative binomial distribution]]
    - 1.3.4 [[Poisson Distribution|Poisson distribution]]
- 1.4 The (a, b, 0) class of distributions
- 1.5 Some methods for creating new distributions
    - 1.5.1 Compound distribution
    - 1.5.2 Mixture distribution
- 1.6 Excel computation notes
- 1.7 Summary and conclusions
- Exercises

### 2 Claim-severity distribution
- 2.1 Review of statistics
    - 2.1.1 Survival function and hazard function
    - 2.1.2 Mixed distribution
    - 2.1.3 Expected value of function of random variable
    - 2.1.4 Distribution of function of random variable
- 2.2 Some continuous distributions for claim severity
    - 2.2.1 [[Exponential Distribution|Exponential distribution]]
    - 2.2.2 [[Gamma|Gamma distribution]]
    - 2.2.3 Weibull distribution
    - 2.2.4 Pareto distribution
- 2.3 Some methods for creating new distributions
    - 2.3.1 [[Transformations of Random Variables|Transformation of random variable]]
    - 2.3.2 Mixture distribution
    - 2.3.3 Splicing
- 2.4 Tail properties of claim severity
- 2.5 Effects of coverage modifications
    - 2.5.1 Deductible
    - 2.5.2 Policy limit
    - 2.5.3 Coinsurance
    - 2.5.4 Effects of inflation
    - 2.5.5 Effects of deductible on claim frequency
- 2.6 Excel computation notes
- 2.7 Summary and conclusions
- Exercises

### 3 Aggregate-loss models
- 3.1 Individual risk and collective risk models
- 3.2 Individual risk model
    - 3.2.1 Exact distribution using convolution
    - 3.2.2 Exact distribution using the De Pril recursion
    - 3.2.3 Approximations of the individual risk model
- 3.3 Collective risk model
    - 3.3.1 Properties of compound distributions
    - 3.3.2 Panjer recursion
    - 3.3.3 Approximations of the collective risk model
    - 3.3.4 Compound Poisson distribution and individual risk model
- 3.4 Coverage modifications and stop-loss reinsurance
- 3.5 Summary and conclusions
- Exercises

## Part II Risk and ruin

### 4 Risk measures
- 4.1 Uses of risk measures
- 4.2 Some premium-based risk measures
- 4.3 Axioms of coherent risk measures
- 4.4 Some capital-based risk measures
    - 4.4.1 Value-at-Risk (VaR)
    - 4.4.2 Conditional tail expectation and related measures
- 4.5 More premium-based risk measures
    - 4.5.1 Proportional hazard transform and risk-adjusted premium
    - 4.5.2 Esscher transform and risk-adjusted premium
- 4.6 Distortion-function approach
- 4.7 Wang transform
- 4.8 Summary and conclusions
- Exercises

### 5 Ruin theory
- 5.1 Discrete-time surplus and events of ruin
- 5.2 Discrete-time ruin theory
    - 5.2.1 Ultimate ruin in discrete time
    - 5.2.2 Finite-time ruin in discrete time
    - 5.2.3 Lundberg’s inequality in discrete time
- 5.3 Continuous-time surplus function
- 5.4 Continuous-time ruin theory
    - 5.4.1 Lundberg’s inequality in continuous time
    - 5.4.2 Distribution of deficit
- 5.5 Summary and conclusions
- Exercises

## Part III Credibility

### 6 Classical credibility
- 6.1 Framework and notations
- 6.2 Full credibility
    - 6.2.1 Full credibility for claim frequency
    - 6.2.2 Full credibility for claim severity
    - 6.2.3 Full credibility for aggregate loss
    - 6.2.4 Full credibility for pure premium
- 6.3 [[Partial Credibility|Partial credibility]]
- 6.4 Variation of assumptions
- 6.5 Summary and discussions
- Exercises

### 7 Bühlmann credibility
- 7.1 Framework and notations
- 7.2 Variance components
- 7.3 [[Bühlmann Credibility|Bühlmann credibility]]
- 7.4 [[Bühlmann-Straub Credibility|Bühlmann–Straub credibility]]
- 7.5 Summary and discussions
- Exercises

### 8 Bayesian approach
- 8.1 Bayesian inference and estimation
    - 8.1.1 Posterior distribution of parameter
    - 8.1.2 Loss function and Bayesian estimation
    - 8.1.3 Some examples of Bayesian credibility
- 8.2 Conjugate distributions
    - 8.2.1 The gamma–Poisson conjugate distribution
    - 8.2.2 The beta–geometric conjugate distribution
    - 8.2.3 The gamma–exponential conjugate distribution
- 8.3 Bayesian versus Bühlmann credibility
- 8.4 Linear exponential family and [[Exact Credibility|exact credibility]]
- 8.5 Summary and discussions
- Exercises

### 9 Empirical implementation of credibility
- 9.1 [[Empirical Bayes Credibility|Empirical Bayes method]]
- 9.2 Nonparametric estimation
- 9.3 Semiparametric estimation
- 9.4 Parametric estimation
- 9.5 Summary and discussions
- Exercises

## Part IV Model construction and evaluation

### 10 Model estimation and types of data
- 10.1 Estimation
    - 10.1.1 Parametric and nonparametric estimation
    - 10.1.2 Point and interval estimation
    - 10.1.3 Properties of estimators
- 10.2 Types of data
    - 10.2.1 Duration data and loss data
    - 10.2.2 Complete individual data
    - 10.2.3 Incomplete individual data
    - 10.2.4 Grouped data
- 10.3 Summary and discussions
- Exercises

### 11 Nonparametric model estimation
- 11.1 Estimation with complete individual data
    - 11.1.1 Empirical distribution
    - 11.1.2 Kernel estimation of probability density function
- 11.2 Estimation with incomplete individual data
    - 11.2.1 Kaplan–Meier (product-limit) estimator
    - 11.2.2 Nelson–Aalen estimator
- 11.3 Estimation with grouped data
- 11.4 Excel computation notes
- 11.5 Summary and discussions
- Exercises

### 12 Parametric model estimation
- 12.1 Methods of moments and percentile matching
    - 12.1.1 [[Method of Moments|Method of moments]]
    - 12.1.2 Method of percentile matching
- 12.2 Bayesian estimation method
- 12.3 [[Maximum Likelihood Estimation|Maximum likelihood estimation method]]
    - 12.3.1 Complete individual data
    - 12.3.2 Grouped and incomplete data
- 12.4 Models with covariates
    - 12.4.1 Proportional hazards model
    - 12.4.2 [[Generalized Linear Model|Generalized linear model]]
    - 12.4.3 Accelerated failure-time model
- 12.5 Modeling joint distribution using copula
- 12.6 Excel computation notes
- 12.7 Summary and discussions
- Exercises

### 13 Model evaluation and selection
- 13.1 Graphical methods
- 13.2 Misspecification tests and diagnostic checks
    - 13.2.1 Kolmogorov–Smirnov test
    - 13.2.2 Anderson–Darling test
    - 13.2.3 Chi-square goodness-of-fit test
    - 13.2.4 [[Likelihood Ratio Test|Likelihood ratio test]]
- 13.3 Information criteria for model selection
- 13.4 Summary and discussions
- Exercises

### 14 Basic Monte Carlo methods
- 14.1 Monte Carlo simulation
- 14.2 Uniform random number generators
- 14.3 General random number generators
    - 14.3.1 [[Inversion Method|Inversion method]]
    - 14.3.2 Acceptance–rejection method
    - 14.3.3 Generation of correlated random variables
- 14.4 Specific random number generators
    - 14.4.1 Some continuous distributions
    - 14.4.2 Some discrete distributions
- 14.5 Accuracy and Monte Carlo sample size
- 14.6 Variance reduction techniques
    - 14.6.1 Antithetic variable
    - 14.6.2 Control variable
    - 14.6.3 Importance sampling
- 14.7 Excel computation notes
- 14.8 Summary and discussions
- Exercises

### 15 Applications of Monte Carlo methods
- 15.1 Monte Carlo simulation for hypothesis test
    - 15.1.1 Kolmogorov–Smirnov test
    - 15.1.2 Chi-square goodness-of-fit test
- 15.2 Bootstrap estimation of p-value
- 15.3 Bootstrap estimation of bias and mean squared error
- 15.4 A general framework of bootstrap
- 15.5 Monte Carlo simulation of asset prices
    - 15.5.1 Wiener process and generalized Wiener process
    - 15.5.2 Diffusion process and lognormal distribution
    - 15.5.3 Jump–diffusion process
- 15.6 Summary and discussions
- Exercises

## Appendix: Review of statistics

## Answers to exercises

## References

## Index

## Related readings
- [[Introduction to Mathematical Statistics (Hogg et al. - 2018)]] — assigned with it for Domain B (Statistics) of the MAS-I outline

## Sources
- [Nonlife Actuarial Models: Theory, Methods and Evaluation (Cambridge University Press, 2009)](https://www.cambridge.org/core/books/nonlife-actuarial-models/41EF4E4BB9E3A31F63DDCC18C245C271) — the publisher's record on Cambridge Core: title, author, series (International Series on Actuarial Science), hardback ISBN and publication date (17 September 2009), the book description, and the contents — parts, chapters, appendix and back matter
- [Nonlife Actuarial Models — publisher's eBook preview (Cambridge University Press, 2009)](https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf) — the book's opening pages: the copyright page (© 2009, hardback ISBN 978-0-521-76465-0) and the full printed contents, pp. vii–xii, from which every part, chapter, section, subsection and Exercises entry above, and the front and back matter, are transcribed
- [Preface (Cambridge Core)](https://www.cambridge.org/core/books/nonlife-actuarial-models/preface/113E9D17410E3DAD5DB7C32CDD9EB567) — the preface's opening: the book's purpose, readership, Exam C coverage and four-part structure
- [Nonlife Actuarial Models (Google Books)](https://books.google.com/books?vid=ISBN9780521764650) — corroborates the chapter list, publisher, year and ISBN
- [CAS Exam MAS-I Content Outline (2026)](https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf) — the citation (Cambridge University Press, 2009) and the MAS-I sections
- [CAS Exam MAS-II Content Outline (2026)](https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf) — the MAS-II sections
