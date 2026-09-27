---
Title: "An Introduction to Generalized Linear Models"
Authors: "Annette J. Dobson and Adrian G. Barnett"
Publisher: "CRC Press"
Year: "2018"
date: "2018"
Edition: "4th"
Type: "Textbook"
ISBN: "978-1-138-74151-5"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9c207bcb7715011e2afc6af8d5bd982b417e9b089955f0aa7d36d7f0926fa51a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/An Introduction to Generalized Linear Models (Dobson - 2018).md
---
![[An Introduction to Generalized Linear Models (Dobson - 2018) - Cover.svg]]

A textbook presenting generalized linear models as a unified framework for statistical modelling, accessible to undergraduates and researchers in other fields. It sets out the theoretical background — the Normal, Poisson and binomial distributions, estimation, model fitting and inference — before methods for particular kinds of data: multiple linear regression, analysis of variance, logistic regression, log-linear models, survival analysis, multilevel models, and Bayesian models fitted by Markov chain Monte Carlo, with code for Stata, R and WinBUGS. The fourth edition adds sections on model selection and non-linear associations and a Postface on good statistical practice.

> [!info] On the syllabus
> - [[Exam MAS-I (CAS)|Exam MAS-I]] — objectives C1–C9; Chapters 1–9, excluding 6.3.3, 6.7, 6.8 and 7.9.

## 1 Introduction
- 1.1 Background
- 1.2 Scope
- 1.3 Notation
- 1.4 Distributions related to the Normal distribution
    - 1.4.1 [[Normal Distribution|Normal distributions]]
    - 1.4.2 Chi-squared distribution
    - 1.4.3 t-distribution
    - 1.4.4 F-distribution
    - 1.4.5 Some relationships between distributions
- 1.5 Quadratic forms
- 1.6 Estimation
    - 1.6.1 [[Maximum Likelihood Estimation|Maximum likelihood estimation]]
    - 1.6.2 Example: Poisson distribution
    - 1.6.3 Least squares estimation
    - 1.6.4 Comments on estimation
    - 1.6.5 Example: Tropical cyclones
- 1.7 Exercises

## 2 Model Fitting
- 2.1 Introduction
- 2.2 Examples
    - 2.2.1 Chronic medical conditions
    - 2.2.2 Example: Birthweight and gestational age
- 2.3 Some principles of statistical modelling
    - 2.3.1 [[Exploratory Data Analysis|Exploratory data analysis]]
    - 2.3.2 Model formulation
    - 2.3.3 Parameter estimation
    - 2.3.4 Residuals and model checking
    - 2.3.5 Inference and interpretation
    - 2.3.6 Further reading
- 2.4 Notation and coding for explanatory variables
    - 2.4.1 Example: Means for two groups
    - 2.4.2 Example: Simple linear regression for two groups
    - 2.4.3 Example: Alternative formulations for comparing the means of two groups
    - 2.4.4 Example: Ordinal explanatory variables
- 2.5 Exercises

## 3 Exponential Family and Generalized Linear Models
- 3.1 Introduction
- 3.2 [[Exponential Family|Exponential family of distributions]]
    - 3.2.1 Poisson distribution
    - 3.2.2 Normal distribution
    - 3.2.3 Binomial distribution
- 3.3 Properties of distributions in the exponential family
- 3.4 [[Generalized Linear Model|Generalized linear models]]
- 3.5 Examples
    - 3.5.1 Normal linear model
    - 3.5.2 Historical linguistics
    - 3.5.3 Mortality rates
- 3.6 Exercises

## 4 Estimation
- 4.1 Introduction
- 4.2 Example: Failure times for pressure vessels
- 4.3 Maximum likelihood estimation
- 4.4 Poisson regression example
- 4.5 Exercises

## 5 Inference
- 5.1 Introduction
- 5.2 Sampling distribution for score statistics
    - 5.2.1 Example: Score statistic for the Normal distribution
    - 5.2.2 Example: Score statistic for the Binomial distribution
- 5.3 Taylor series approximations
- 5.4 Sampling distribution for maximum likelihood estimators
    - 5.4.1 Example: Maximum likelihood estimators for the Normal linear model
- 5.5 Log-likelihood ratio statistic
- 5.6 Sampling distribution for the [[Deviance|deviance]]
    - 5.6.1 Example: Deviance for a Binomial model
    - 5.6.2 Example: Deviance for a Normal linear model
    - 5.6.3 Example: Deviance for a Poisson model
- 5.7 [[Hypothesis Testing|Hypothesis testing]]
    - 5.7.1 Example: Hypothesis testing for a Normal linear model
- 5.8 Exercises

## 6 Normal Linear Models
- 6.1 Introduction
- 6.2 Basic results
    - 6.2.1 Maximum likelihood estimation
    - 6.2.2 Least squares estimation
    - 6.2.3 Deviance
    - 6.2.4 Hypothesis testing
    - 6.2.5 Orthogonality
    - 6.2.6 [[Residual|Residuals]]
    - 6.2.7 Other diagnostics
- 6.3 Multiple [[Linear Regression|linear regression]]
    - 6.3.1 Example: Carbohydrate diet
    - 6.3.2 [[R-Squared|Coefficient of determination, R²]]
    - 6.3.3 [[Model Selection|Model selection]]
    - 6.3.4 [[Multicollinearity|Collinearity]]
- 6.4 [[ANOVA|Analysis of variance]]
    - 6.4.1 One-factor analysis of variance
    - 6.4.2 Two-factor analysis of variance
- 6.5 Analysis of covariance
- 6.6 General linear models
- 6.7 Non-linear associations
    - 6.7.1 PLOS Medicine journal data
- 6.8 Fractional polynomials
- 6.9 Exercises

## 7 Binary Variables and Logistic Regression
- 7.1 Probability distributions
- 7.2 Generalized linear models
- 7.3 Dose response models
    - 7.3.1 Example: Beetle mortality
- 7.4 General [[Logistic Regression|logistic regression]] model
    - 7.4.1 Example: Embryogenic anthers
- 7.5 Goodness of fit statistics
- 7.6 Residuals
- 7.7 Other diagnostics
- 7.8 Example: Senility and WAIS
- 7.9 Odds ratios and prevalence ratios
- 7.10 Exercises

## 8 Nominal and Ordinal Logistic Regression
- 8.1 Introduction
- 8.2 Multinomial distribution
- 8.3 Nominal logistic regression
    - 8.3.1 Example: Car preferences
- 8.4 Ordinal logistic regression
    - 8.4.1 Cumulative logit model
    - 8.4.2 Proportional odds model
    - 8.4.3 Adjacent categories logit model
    - 8.4.4 Continuation ratio logit model
    - 8.4.5 Comments
    - 8.4.6 Example: Car preferences
- 8.5 General comments
- 8.6 Exercises

## 9 Poisson Regression and Log-Linear Models
- 9.1 Introduction
- 9.2 [[Poisson Regression|Poisson regression]]
    - 9.2.1 Example of Poisson regression: British doctors' smoking and coronary death
- 9.3 Examples of contingency tables
    - 9.3.1 Example: Cross-sectional study of malignant melanoma
    - 9.3.2 Example: Randomized controlled trial of influenza vaccine
    - 9.3.3 Example: Case–control study of gastric and duodenal ulcers and aspirin use
- 9.4 Probability models for contingency tables
    - 9.4.1 Poisson model
    - 9.4.2 Multinomial model
    - 9.4.3 Product multinomial models
- 9.5 Log-linear models
- 9.6 Inference for log-linear models
- 9.7 Numerical examples
    - 9.7.1 Cross-sectional study of malignant melanoma
    - 9.7.2 Case–control study of gastric and duodenal ulcer and aspirin use
- 9.8 Remarks
- 9.9 Exercises

## 10 Survival Analysis
- 10.1 Introduction
- 10.2 Survivor functions and [[Hazard Rate|hazard functions]]
    - 10.2.1 Exponential distribution
    - 10.2.2 Proportional hazards models
    - 10.2.3 Weibull distribution
- 10.3 Empirical survivor function
    - 10.3.1 Example: Remission times
- 10.4 Estimation
    - 10.4.1 Example: Exponential model
    - 10.4.2 Example: Weibull model
- 10.5 Inference
- 10.6 Model checking
- 10.7 Example: Remission times
- 10.8 Exercises

## 11 Clustered and Longitudinal Data
- 11.1 Introduction
- 11.2 Example: Recovery from stroke
- 11.3 Repeated measures models for Normal data
- 11.4 Repeated measures models for non-Normal data
- 11.5 [[Hierarchical Model|Multilevel models]]
- 11.6 Stroke example continued
- 11.7 Comments
- 11.8 Exercises

## 12 Bayesian Analysis
- 12.1 Frequentist and Bayesian paradigms
    - 12.1.1 Alternative definitions of p-values and confidence intervals
    - 12.1.2 Bayes' equation
    - 12.1.3 Parameter space
    - 12.1.4 Example: Schistosoma japonicum
- 12.2 Priors
    - 12.2.1 Informative priors
    - 12.2.2 Example: Sceptical prior
    - 12.2.3 Example: Overdoses amongst released prisoners
- 12.3 Distributions and hierarchies in Bayesian analysis
- 12.4 WinBUGS software for Bayesian analysis
- 12.5 Exercises

## 13 Markov Chain Monte Carlo Methods
- 13.1 Why standard inference fails
- 13.2 Monte Carlo integration
- 13.3 [[Markov Chain|Markov chains]]
    - 13.3.1 The Metropolis–Hastings sampler
    - 13.3.2 The Gibbs sampler
    - 13.3.3 Comparing a Markov chain to classical maximum likelihood estimation
    - 13.3.4 Importance of parameterization
- 13.4 Bayesian inference
- 13.5 Diagnostics of chain convergence
    - 13.5.1 Chain history
    - 13.5.2 Chain autocorrelation
    - 13.5.3 Multiple chains
- 13.6 Bayesian model fit: the deviance information criterion
- 13.7 Exercises

## 14 Example Bayesian Analyses
- 14.1 Introduction
- 14.2 Binary variables and logistic regression
    - 14.2.1 Prevalence ratios for logistic regression
- 14.3 Nominal logistic regression
- 14.4 Latent variable model
- 14.5 Survival analysis
- 14.6 Random effects
- 14.7 Longitudinal data analysis
- 14.8 Bayesian model averaging
    - 14.8.1 Example: Stroke recovery
    - 14.8.2 Example: PLOS Medicine journal data
- 14.9 Some practical tips for WinBUGS
- 14.10 Exercises

## Postface

## Appendix

## Software

## Related readings
- [[Generalized Linear Models (Larsen - 2015)]] — assigned with it for Domain C (Extended Linear Models) of the MAS-I outline; the note supplements this book's Sections 3.2, 7.7 and 9.8
- [[An Introduction to Statistical Learning (James et al. - 2021)]] — assigned with it for Domain C of the MAS-I outline
- [[Introduction to Mathematical Statistics (Hogg et al. - 2018)]] — assigned with it for Domain C of the MAS-I outline

## Sources
- [An Introduction to Generalized Linear Models, Fourth Edition — publisher's preview (CRC Press, 2018)](https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf) — the book's opening pages as distributed in the eBook preview: title page, copyright page (edition, ISBNs), the full table of contents and the preface
- [An Introduction to Generalized Linear Models, 4th Edition (Routledge)](https://www.routledge.com/An-Introduction-to-Generalized-Linear-Models/Dobson-Barnett/p/book/9781138741515) — the publisher's description, and its chapter list, which agrees with the contents on 14 chapters, the Postface and the Appendix
- [CAS Exam MAS-I Content Outline (2025)](https://www.casact.org/sites/default/files/2023-06/MASI_Content_Outline.pdf) — the citation (4th edition, Chapman and Hall/CRC Press, 2018) and the assigned scope
