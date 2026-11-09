---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:d51f14b232c7060b2b474190f15796e65ec7275ebc3273f956a27e43998e7e2f
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C description and tasks 1-9, PDF p.5; reading list PDF p.6 (Dobson & Barnett Ch 1-9 excl. 6.3.3, 6.7, 6.8, 7.9; James et al. Ch 1-7; Larsen), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf; CAS Exam MAS-II Content Outline 2026, Domain B Linear Mixed Models description and tasks 1-4, PDF p.2, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf; CAS Exam 9 Content Outline (Fall 2026), Domain D ERM description ('including model selection') and Task 5, PDF p.6; Brehm et al. citation PDF p.7, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf; Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018) — publisher eBook preview, §1.2 Scope printed p.3 (PDF p.20: independence dropped in Chapter 11); contents PDF p.12 (Ch 11 Clustered and Longitudinal Data, 11.5 Multilevel models), sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf; James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), §6.1.3 printed pp.234-235 (PDF pp.242-243: log n > 2 for n > 7, BIC heavier penalty; RSS always decreases as variables are added; CV a direct estimate of test error usable in a wider range of selection tasks), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; R Core Team, R documentation 'AIC {stats}' (R-devel manual), Description and Details: -2 log-likelihood + k n_par, k = 2 AIC, k = log(n) BIC, sha256:f55c97cef5d53ab762953509b4e5c4da1e8891b8263ce021ef04dcb27c81b8df — https://stat.ethz.ch/R-manual/R-devel/library/stats/html/AIC.html; Pinheiro & Bates, nlme documentation 'anova.lme' (R-devel manual), Note: likelihood comparisons not meaningful for REML fits with different fixed effects, sha256:508e9e3f590825aa2248bbb4fde038face9289698f57248738401421bd9a00e0 — https://stat.ethz.ch/R-manual/R-devel/library/nlme/html/anova.lme.html; Bolker et al., GLMM FAQ, 'Testing significance of random effects' (null on the boundary; single variance: p-value approximately twice as large as it should be), sha256:53ab8a0c586ae5893841de85a84585e1cb46e79852c7c349c9e5bedb5c63d231 — https://bbolker.github.io/mixedmodels-misc/glmmFAQ.html; Embrechts, McNeil & Straumann, 'Correlation and Dependency in Risk Management: Properties and Pitfalls' (ETH preprint), PDF p.2 (same marginals and correlation, Gaussian vs Gumbel; Gumbel more dangerous for an insurer), §4.4 PDF pp.18-19 (Gaussian copula asymptotically independent for rho < 1), Example 2 PDF pp.22-23 (more large outcomes of X + Y under Gumbel), PDF p.35, sha256:2705fc20f5bad0de8bf45ab6325cee27fe86f119b9919438a455c3393e6653cd — https://people.math.ethz.ch/~embrecht/ftp/pitfalls.pdf; Larsen, 'Generalized Linear Models', CAS Study Note (rev. June 2016), PDF p.2 (Tweedie variance power: Normal 0, Poisson 1, Gamma 2), sha256:5c4ed4e8eacf72624f38c5313eb6903f57d627b6ac81ce52e0a5a69404af90bd — https://www.casact.org/sites/default/files/2021-03/MAS-I_Larsen.pdf; Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §2.6 offsets (ln exposures, Poisson/log) PDF pp.27-29; §2.7.2 Poisson, overdispersion, negative binomial PDF pp.31-32; §4.3.4 cross validation PDF pp.51-52; §6.2.1-6.2.2 nested F-test, penalized measures, AIC/BIC PDF pp.75-77, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Goldburd, Khare, Tevet & Guller, CAS Monograph 5, 2nd ed., §6.1.3 printed p.64 (comparison valid only on identical datasets), §6.2.1 printed pp.64-65 (nested model = subset of the predictors of a larger model; F-statistic with numerator d.f. = # of added parameters, eq.17), §6.2.2 printed p.66 (non-nested: one does not contain a subset of the variables of the other), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Model Selection.md
---

**Model Selection** is the choice, among candidate models fitted to the same data, of the model to use. For a model with maximized log-likelihood $l$ and $k$ estimated parameters, fitted to $n$ observations, the Akaike information criterion is

> $$\text{AIC} = -2l + 2k$$

and the Bayesian information criterion is

> $$\text{BIC} = -2l + k \ln n$$

The model with the lower [[AIC]] or the lower [[BIC]] is preferred. BIC charges $\ln n$ for each parameter, which is more than AIC's 2 when $n \ge 8$, so BIC prefers smaller models than AIC does. Models with the same number of parameters are ranked the same way by both criteria.

> [!example]- Two models are fitted to 200 observations. Model 1 has 4 parameters and maximized log-likelihood $-612.4$. Model 2 has 6 parameters and $-608.1$. Which model does each criterion prefer? {Example}
> - For Model 1, $-2l = 1{,}224.8$, so $\text{AIC} = 1{,}224.8 + 8 = 1{,}232.8$ and $\text{BIC} = 1{,}224.8 + 4 \ln 200 = 1{,}246.0$.
> - For Model 2, $-2l = 1{,}216.2$, so $\text{AIC} = 1{,}216.2 + 12 = 1{,}228.2$ and $\text{BIC} = 1{,}216.2 + 6 \ln 200 = 1{,}248.0$.
> - AIC prefers Model 2, and BIC prefers Model 1.

## Fit and the number of parameters

Adding a parameter to a model never increases its [[Deviance|deviance]] and never decreases its maximized log-likelihood, so a measure of fit to the same data alone always prefers the larger model and does not account for overfitting. AIC and BIC add a penalty for each parameter. For a model whose deviance is $-2l$ plus a constant, such as a Poisson GLM, dropping one parameter lowers AIC when the deviance rises by less than 2.

Models are compared in one of three ways:

| Models | Compared with |
| --- | --- |
| Nested, one obtained by fixing parameters of the other | [[Likelihood Ratio Test]], or AIC and BIC |
| Not nested, including models with different response distributions | AIC and BIC |
| Any models, by their predictions on data not used to fit them | [[Cross-Validation]] |

## Choosing the model family

The family of an [[Extended Linear Model|extended linear model]] is chosen from the response being modelled:

| Response | Model |
| --- | --- |
| Continuous, roughly symmetric, with constant variance | [[Linear Regression]] |
| Claim counts | [[Poisson Regression|Poisson GLM]] with a log link |
| Positive, skewed amounts whose standard deviation grows in proportion to the mean | Gamma [[Generalized Linear Model|GLM]] with a log link |
| Binary outcome | [[Logistic Regression]] |

> [!example]- Average repair costs per claim are modelled by vehicle class. The costs are positive, and their standard deviation grows in proportion to their mean. Which model family fits? {Example}
> - A constant ratio of standard deviation to mean means that the variance is proportional to $\mu^2$.
> - That is the variance function of the gamma distribution, so a gamma GLM fits.
> - A log link keeps the fitted means positive.

## Testing a variance component

In a [[Linear Mixed Model|linear mixed model]], whether a random effect is needed is tested with $H_0$ that its variance is 0. A variance cannot be negative, so the null value lies on the boundary of the parameter space, and the likelihood ratio statistic $w$ does not have the usual chi-squared distribution. For one variance component, it has a 50:50 mixture of a chi-squared distribution with 0 degrees of freedom and one with 1, and its p-value is

> $$p = \tfrac{1}{2} P(\chi^2_1 \ge w)$$

- $\chi^2_1$ is a chi-squared random variable with 1 degree of freedom.

The test rejects $H_0$, and selects the model with the random effect, when this p-value is below the significance level. The mixture applies only to a parameter on the boundary. Models whose fixed effects differ are compared with ML log-likelihoods, and models that differ only in their random effects or covariance structure may be compared with [[Restricted Maximum Likelihood|REML]] log-likelihoods.

> [!example]- Adding a random intercept to a linear mixed model lowers $-2l$ by 2.9. Does the random intercept improve the model at significance level 0.05? {Example}
> - The statistic is $w = 2.9$, and $P(\chi^2_1 \ge 2.9) = 0.0886$.
> - The variance of the random intercept is on the boundary under $H_0$, so the p-value is $0.0886 / 2 = 0.0443$.
> - Because $0.0443 < 0.05$, the test rejects $H_0$ and keeps the random intercept.

## Choosing a copula

In an enterprise risk model, a [[Copula|copula]] joins the marginal distributions of several lines of business into a joint distribution and describes their dependence separately from the marginals. Copulas with the same correlation differ in where the dependence is strongest, and the dependence in the right tail is measured by the right-tail concentration function, which is

> $$R(z) = P(U > z \mid V > z)$$

- $U$ and $V$ are the percentiles of the two variables in their own distributions.

If $R(z)$ stays above 0 as $z$ approaches 1, the copula has right-tail dependence, and extreme losses in the two variables tend to occur together. The Gumbel and heavy right tail (HRT) copulas have right-tail dependence, and the normal and Frank copulas have none in the limit. A copula with right-tail dependence fits lines that are mostly unrelated but can be hit together by one catastrophe, such as an earthquake affecting property and workers compensation, and loss and ALAE, where large losses come with large ALAE. Candidate copulas are tested against the data, and the copula chosen is combined with the marginals.

> [!example]- A normal copula and a Gumbel copula with the same rank correlation fit the joint losses of two property lines about equally well, but the Gumbel copula gives a higher 1-in-200 combined loss. Which should set capital? {Example}
> - Capital is set in the tail, where fit to the body of the data cannot tell the two copulas apart.
> - The normal copula has no right-tail dependence, so it treats the lines' extreme losses as nearly independent.
> - Both lines can be hit by the same catastrophe, which is evidence for right-tail dependence, so the Gumbel copula should set capital.
