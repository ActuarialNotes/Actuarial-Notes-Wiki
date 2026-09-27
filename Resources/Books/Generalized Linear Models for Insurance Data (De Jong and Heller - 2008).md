---
Title: "Generalized Linear Models for Insurance Data"
Authors: "Piet de Jong and Gillian Z. Heller"
Publisher: "Cambridge University Press"
Year: "2008"
date: "2008"
Type: "Textbook"
ISBN: "978-0-521-87914-9"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ea6ae4e4c0a33d19de4b84837f3f58740468de395f2dc6366d36cb451fff4b50
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Generalized Linear Models for Insurance Data (De Jong and Heller - 2008).md
---
![[Generalized Linear Models for Insurance Data (De Jong and Heller - 2008) - Cover.svg]]

A textbook on generalized linear models (GLMs) for insurance applications, with its analyses based on real insurance data sets. In the publisher's description it treats GLMs, covers all standard exponential family distributions, extends the methodology to correlated data structures and discusses developments beyond the GLM, focusing on issues specific to insurance data such as model selection with large data sets and varying exposure times. Computations are illustrated in SAS, and in R where SAS is not convenient; code and output for every example are in Appendix 1. It is part of the International Series on Actuarial Science.

> [!info] On the syllabus
> - [[Exam PCPA (CAS)|Exam PCPA]] — objectives B1–B2; Chapters 5, 6 and 8 and the related code in the Appendix.

## Preface
- The authors wrote it because the uptake and understanding of GLMs had been slow in insurance compared with other disciplines, partly for lack of a textbook geared to an actuarial audience.
- Remarks on computer implementation are confined to paragraphs headed "SAS notes" and "Implementation", which can be skipped without loss of continuity.

## 1 Insurance data
- 1.1 Introduction
- 1.2 Types of variables
- 1.3 Data transformations
- 1.4 Data exploration
- 1.5 Grouping and runoff triangles
- 1.6 Assessing distributions
- 1.7 Data issues and biases
- 1.8 Data sets used
- 1.9 Outline of rest of book

## 2 Response distributions
- 2.1 Discrete and continuous random variables
- 2.2 Bernoulli
- 2.3 [[Binomial Distribution|Binomial]]
- 2.4 [[Poisson Distribution|Poisson]]
- 2.5 [[Negative Binomial Distribution|Negative binomial]]
- 2.6 [[Normal Distribution|Normal]]
- 2.7 Chi-square and [[Gamma|gamma]]
- 2.8 Inverse Gaussian
- 2.9 Overdispersion
- Exercises

## 3 Exponential family responses and estimation
- 3.1 [[Exponential Family|Exponential family]]
- 3.2 The variance function
- 3.3 Proof of the mean and variance expressions
- 3.4 Standard distributions in the exponential family form
- 3.5 Fitting probability functions to data
- Exercises

## 4 Linear modeling
- 4.1 History and terminology of linear modeling
- 4.2 What does "linear" in linear model mean?
- 4.3 Simple linear modeling
- 4.4 Multiple linear modeling
- 4.5 The classical linear model
- 4.6 Least squares properties under the classical linear model
- 4.7 Weighted least squares
- 4.8 Grouped and ungrouped data
- 4.9 Transformations to normality and linearity
- 4.10 Categorical explanatory variables
- 4.11 Polynomial regression
- 4.12 Banding continuous explanatory variables
- 4.13 [[Interaction]]
- 4.14 Collinearity
- 4.15 [[Hypothesis Testing|Hypothesis testing]]
- 4.16 Checks using the residuals
- 4.17 Checking explanatory variable specifications
- 4.18 [[Outlier|Outliers]]
- 4.19 [[Model Selection|Model selection]]

## 5 Generalized linear models
- Generalized linear modeling differs from ordinary regression in two respects: the response distribution is chosen from the exponential family, so it need not be normal, and a transformation of the mean of the response is linearly related to the explanatory variables.
- The response can be, and usually is, heteroskedastic: its variance varies with the mean, which may in turn vary with the explanatory variables.
- GLMs matter for insurance data because claim sizes, claim frequencies and the occurrence of a claim on a policy are not normal, and outcomes are often related to drivers of risk multiplicatively rather than additively.
- 5.1 The [[Generalized Linear Model|generalized linear model]]
    - $f(y) = c(y,\phi)\exp\{[y\theta - a(\theta)]/\phi\}$ with $g(\mu) = x'\beta$: the response is in the exponential family, and a transformation of its mean is linear in the explanatory variables.
- 5.2 Steps in generalized linear modeling
- 5.3 Links and canonical links
- 5.4 [[Offset Variable|Offsets]]
- 5.5 [[Maximum Likelihood Estimation|Maximum likelihood estimation]]
- 5.6 Confidence intervals and prediction
- 5.7 Assessing fits and the [[Deviance|deviance]]
- 5.8 Testing the significance of explanatory variables
- 5.9 [[Residual|Residuals]]
- 5.10 Further diagnostic tools
- 5.11 [[Model Selection|Model selection]]
- Exercises

## 6 Models for count data
- The chapter deals with GLMs whose response is a count: deaths in mortality studies, claims by individuals or groups in health insurance, and claims made on vehicle insurance policies.
- 6.1 [[Poisson Regression|Poisson regression]]
    - $y \sim \mathrm{P}(\mu)$ with $g(\mu) = x'\beta$; popular links are the identity and the log, and only the log link guarantees a positive fitted mean.
- 6.2 Poisson overdispersion and [[Negative Binomial Distribution|negative binomial]] regression
- 6.3 Quasi-likelihood
- 6.4 Counts and frequencies
- Exercises

## 7 Categorical responses
- 7.1 Binary responses
- 7.2 [[Logistic Regression|Logistic regression]]
- 7.3 Application of logistic regression to vehicle insurance
- 7.4 Correcting for exposure
- 7.5 Grouped binary data
- 7.6 Goodness of fit for logistic regression
- 7.7 Categorical responses with more than two categories
- 7.8 Ordinal responses
- 7.9 Nominal responses
- Exercises

## 8 Continuous responses
- Continuous responses such as claim size, or the time between reporting a claim and settlement, are usually non-negative and right-skewed; they can be transformed to normality and fitted with the normal linear model of Chapter 4, or fitted with a GLM whose response distribution is concentrated on the non-negative axis, the subject of this chapter.
- 8.1 Gamma regression
    - $y \sim \mathrm{G}(\mu,\nu)$ with $g(\mu) = x'\beta$; the canonical link is the inverse, but the log link is usually regarded as more useful because inverse-link parameters are hard to interpret.
- 8.2 Inverse Gaussian regression
- 8.3 [[Tweedie Distribution|Tweedie]] regression
- Exercises

## 9 Correlated data
- 9.1 Random effects
- 9.2 Specification of within-cluster correlation
- 9.3 Generalized estimating equations
- Exercise

## 10 Extensions to the generalized linear model
- 10.1 Generalized additive models
- 10.2 Double generalized linear models
- 10.3 Generalized additive models for location, scale and shape
- 10.4 Zero-adjusted inverse Gaussian regression
- 10.5 A mean and dispersion model for total claim size
- Exercises

## Appendix 1 Computer code and output
- Computations use SAS/STAT (version 9.1), and R (version 2.4.1) where SAS is not convenient; in SAS, `proc genmod` estimates GLMs, with the response distribution and link set by its `dist=` and `link=` options.
- A1.1 Poisson regression
- A1.2 Negative binomial regression
- A1.3 Quasi-likelihood regression
- A1.4 Logistic regression
- A1.5 Ordinal regression
- A1.6 Nominal regression
- A1.7 Gamma regression
- A1.8 Inverse Gaussian regression
- A1.9 Logistic regression GLMM
- A1.10 Logistic regression GEE
- A1.11 Logistic regression GAM
- A1.12 GAMLSS
- A1.13 Zero-adjusted inverse Gaussian regression

## Bibliography

## Index

## Sources
- [Generalized Linear Models for Insurance Data (Cambridge University Press, 2008)](https://www.cambridge.org/core/books/generalized-linear-models-for-insurance-data/851EB0898C6C7DB4FEA2D542371145C2) — the publisher's record on Cambridge Core: the chapter list with page ranges, print publication date, ISBN, series and book description; the preface's opening, and the first-page images of the contents, Chapters 5, 6 and 8 and Appendix 1
- [Generalized Linear Models for Insurance Data, Google Books preview (Cambridge University Press, 2008)](https://books.google.com/books?id=QzIIY6_S_LYC) — the printed contents, pp. v–vii (every section title), and the copyright page (ISBN 978-0-521-87914-9, first published 2008); agrees with Cambridge Core on ten chapters and Appendix 1
- [CAS PCPA Exam & Project Content Outline, v.8 (September 2026)](https://www.casact.org/sites/default/files/2024-05/Exam_PCPA_2025_F_Content_Outlines.pdf) — the citation and the assigned chapters
