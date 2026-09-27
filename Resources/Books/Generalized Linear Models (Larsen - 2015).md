---
Title: "Generalized Linear Models: Study Note for Exam S"
Authors: "Michael Larsen"
Publisher: "Casualty Actuarial Society"
Year: "2015"
date: "2015"
Type: "Study Note"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf)"
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2c98dc28d3cdc22d8610d38d56007ddb526b886576fdb58bd49ade4515678e75
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Generalized Linear Models (Larsen - 2015).md
---
![[Generalized Linear Models (Larsen - 2015) - Cover.svg]]

A three-page CAS study note adding six topics to the textbook treatment of generalized linear models, from quasi-likelihood to exponential-family formulas. Written by Michael Larsen as a study note for Exam S and marked "Revised 6/29/2016", it works alongside Dobson & Barnett and Hogg, McKean and Craig, pointing to the sections of each that it supplements.

> [!info] On the syllabus
> - [[Exam MAS-I (CAS)|Exam MAS-I]] — objectives C1–C9; the whole note (cited as December 2015, revised June 2016; an online publication).

## Quasi-Likelihood
- Quasi-likelihood solves for the parameters of a [[Generalized Linear Model]] when the assumption that the distribution belongs to the [[Exponential Family|exponential family]] is not supported: it assumes a relationship between the mean and the variance, but the underlying distribution need not be known.
- Its equations start from a variation on the derivative of the likelihood equations, which gives the method its name.
- The example is over dispersion — variance larger than the mean — in [[Poisson Regression|Poisson regression]] (Dobson & Barnett §§3.2 and 9.8) and in the binomial (§7.7): quasi-likelihood solves for a constant of proportionality between the mean and the variance at the same time as the betas.

## Regression Through the Origin
- Regression through the origin leaves the intercept out of the linear equation, which a modeler may choose when the test of significance shows the intercept is not significantly different from zero.
- Dropping it can give non-intuitive results: in a general linear model it implies the dependent variable is zero whenever every explanatory variable is zero.

## QQ and Box Plots to test distribution assumptions
- The Normal probability plot the Dobson text uses to test Normality of the residuals is an example of a [[QQ Plot|QQ plot]], built from [[Order Statistics|order statistics]]; the algorithm is in Section 4.4.1 of Hogg, McKean and Craig (7th edition).
- [[Box Plot|Box plots]], described in the same section, use order statistics to describe how the observations behave, as an aid to evaluating how well a model fits the data.

## Tweedie Distributions
- The [[Tweedie Distribution|Tweedie distributions]] are a family whose variance is a power function of the mean, $\text{Var}[Y] = a\,[E(Y)]^{p}$: Normal $p = 0$, Poisson $p = 1$, compound Poisson–gamma $1 < p < 2$, gamma $p = 2$, inverse Gaussian $p = 3$.
- The Tweedie is useful for a data set that combines zero observations of the dependent variable with continuous non-zero values, viewed as a compound Poisson–gamma distribution.
- Some software packages accept a Tweedie specification and find the best value of $p$ while solving for the betas.

## Canonical Link Function
- The inverse of the [[Link Function|link function]] transforms the linear formula for the mean back to the scale of the original data; the canonical form of the link varies with the distribution selected.
- The note states that with the canonical link the GLM's estimates are unbiased — for example the log link with the Poisson — and that a non-canonical link does not give an unbiased estimate of the mean.
- Common canonical links: Normal — identity; binomial — logit; Poisson — natural logarithm; gamma — inverse.

## Exponential Family Formulas
- A random variable $Y$ whose distribution depends on a single parameter $\theta$ (all other parameters treated as known) is a member of the [[Exponential Family|exponential family]] if its density can be written in the form below.
- A table gives $\theta$, $a(y)$, $b(\theta)$, $c(\theta)$ and $d(y)$ for the binomial, Normal, Poisson, exponential, gamma, inverse Gaussian and negative binomial distributions, supplementing the table in Section 3.2 of Dobson & Barnett.

> $$f(y;\theta) = \exp\left[a(y)\,b(\theta) + c(\theta) + d(y)\right]$$

## Related readings
- [[An Introduction to Generalized Linear Models (Dobson - 2018)]] — the text the note supplements, citing its Sections 3.2, 7.7 and 9.8 and the Chapter 3 exercises
- [[Introduction to Mathematical Statistics (Hogg et al. - 2018)]] — cited (in its 7th edition, Section 4.4.1) for the QQ-plot algorithm and box plots

## Sources
- [Generalized Linear Models: Study Note for Exam S (CAS, revised 2016)](https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf) — the document, read in full: title, author, revision date and its six headed sections
- [CAS Exam MAS-I Content Outline (2025)](https://www.casact.org/sites/default/files/2023-06/MASI_Content_Outline.pdf) — the citation (December 2015, revised June 2016), the link to the CAS copy and the assignment
