---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:238dbfb5cdd1f91ffe9dc49a1c1b18aca1d2471801271c35c934de65d10a1992
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.10 printed pp.173-185 (PDF 185-197); Ch.9 p.158 (PDF 170); Ch.12 p.236 (PDF 248); App. F pp.F-1 to F-7 (PDF 415-421), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., §2.5 pp.16-17 (PDF 26-27); §2.9 pp.27-28 (PDF 37-38); §4.1-4.2 pp.37-38 (PDF 47-48); §5.4.2-5.4.5 pp.50-55 (PDF 60-65); §5.6.2 Tables 10-12 pp.58-60 (PDF 68-70); §6.4 pp.73-74 (PDF 83-84); §9.1 incl. fn.19 pp.89-90 (PDF 99-100) ; §2.3.2 p.9 (PDF 19); §2.10 pp.28-29 (PDF 38-39); §7.2 pp.76-79 (PDF 86-89), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Holmes & Casotto, Penalized Regression and Lasso Credibility, CAS Monograph 13 (2025 revision), App. C.2 p.106 (PDF 116, penalized regression and near aliasing), sha256:f6978accbd2bcd43284ec939dd90966430a3e36fc126aab4584241a13d7a28cd — https://www.casact.org/sites/default/files/2025-08/CAS_Monograph_13_2025_revision.pdf"
    - "Rodriguez, Lecture Notes on GLMs (Princeton WWS 509), ch.2 §2.2.1 pp.6-7 (OLS = maximum likelihood estimator in the normal linear model), sha256:b9fae913696a54bb97a9a0f60cdddd8a5c72c9e9cf0451e503a0043d888edf1f — https://grodri.github.io/glms/notes/c2.pdf"
    - "Rodriguez, Lecture Notes on GLMs, App. B §B.1-B.2 pp.3-5 (normal errors with identity link; GLMs fitted by iteratively re-weighted least squares), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Generalized Linear Model.md
---

![[Media/Figures/Generalized_Linear_Model.svg|340]]

A **Generalized Linear Model** (GLM) is a regression model in which the responses $Y_1, \ldots, Y_n$ are independent, each has a distribution from the [[Exponential Family|exponential family]], and a [[Link Function|link function]] of each mean is a linear combination of the [[Predictor Variable|predictors]]. The mean of observation $i$, $\mu_i = E[Y_i]$, is related to its linear predictor $\eta_i$ by

> $$g(\mu_i) = \eta_i$$

and the linear predictor is

> $$\eta_i = \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip}$$

- $g$ is the link function, a monotonic and differentiable function.
- $x_{ij}$ is the value of predictor $j$ for observation $i$.
- $\beta_0, \ldots, \beta_p$ are the coefficients, estimated by [[Maximum Likelihood Estimation|maximum likelihood]].

The fitted mean is the inverse of the link function applied to the linear predictor, $\hat{\mu}_i = g^{-1}(\hat{\eta}_i)$. [[Linear Regression|Linear regression]] is the GLM with a [[Normal Distribution|normal]] response and the identity link, $g(\mu) = \mu$.

> [!example]- A Poisson GLM with a log link models claim frequency. The fitted coefficients are an intercept of $-2.30$, $0.25$ for territory B (territory A is the base level) and $-0.03$ per year of vehicle age. What is the expected frequency for a territory B vehicle that is 5 years old? {Example}
> - The base level, territory A, has no coefficient, so territory B adds $0.25$ to the linear predictor.
> - Vehicle age is continuous, so it adds its coefficient multiplied by its value, $-0.03 \times 5 = -0.15$.
> - The linear predictor is $\hat{\eta} = -2.30 + 0.25 - 0.15 = -2.20$.
> - The inverse of the log link is the exponential function, so the expected frequency is $e^{-2.20} = 0.1108$.

## Choosing the distribution and the link

The distribution of the response is chosen to match the values the [[Response Variable|response]] can take, and the link is chosen to keep the fitted mean in that range:

| Response | Distribution | Usual link |
| --- | --- | --- |
| Continuous and symmetric, constant variance | [[Normal Distribution|Normal]] | Identity, $\mu$ |
| Claim count | [[Poisson Distribution|Poisson]] | Log, $\ln \mu$ |
| Yes or no, such as a renewal | [[Binomial Distribution|Binomial]] | Logit, $\ln\frac{\mu}{1-\mu}$ |
| Claim severity, positive and right-skewed | [[Gamma]] | Log, $\ln \mu$ |
| Pure premium, with a mass at zero | [[Tweedie Distribution|Tweedie]], $1 < p < 2$ | Log, $\ln \mu$ |

The log link makes the effects of the predictors multiplicative, which matches a multiplicative rating plan.

> [!example]- Which distribution and link should model whether each policy renews? {Example}
> - The response is 1 if the policy renews and 0 if it does not, so it is binary.
> - A binary response has a binomial distribution, whose mean is the probability of renewal.
> - The logit link maps that probability, which lies between 0 and 1, to the whole real line, so the fitted probabilities stay between 0 and 1.
> - The model is a binomial GLM with a logit link, which is [[Logistic Regression|logistic regression]].

## Advantages over one-way analysis

A GLM estimates the effects of all the predictors at the same time, so each coefficient is the effect of its predictor with the other predictors held fixed. Compared with a one-way analysis of each [[Rating Variable|rating variable]] on its own, a GLM

1. accounts for the correlation among rating variables, so an effect shared by two correlated variables is not counted twice,
2. separates the systematic effect of each variable from random noise,
3. provides diagnostics for the model and for each variable, such as standard errors and significance tests,
4. can include an [[Interaction|interaction]], where the effect of one variable depends on the level of another.

Because a one-way analysis mixes the effects of correlated variables, its relativity for a variable can differ in size, or even in sign, from the GLM's.

> [!example]- Young drivers are concentrated in the urban territory. A one-way analysis gives the urban territory a frequency relativity of 1.40, and a GLM with driver age and territory gives it 1.15. Why do they differ, and which relativity should be used with the driver age relativities? {Example}
> - The one-way relativity compares urban and rural frequencies without regard to age, so part of the higher frequency of young drivers shows up as a territory effect.
> - The GLM estimates territory with driver age held fixed, so its relativity of 1.15 is the effect of territory alone.
> - Multiplying the one-way relativity of 1.40 by an age relativity would count the young-driver effect twice.
> - The GLM relativity of 1.15 is the one to use with the GLM's driver age relativities.

## Evaluating a rating variable from GLM output

Each level of a categorical rating variable is reported as a relativity to the base level, whose relativity is 1.00. The base level is usually the level with the most exposure. A rating variable is worth adding to the model when

1. its relativities follow a sensible pattern, such as a steady increase across ordered levels with no reversals,
2. the band of plus and minus two standard errors around each relativity, which is roughly a 95% confidence interval, is narrow, so that each level can be told apart from its neighbours and from the base level,
3. the relativities are consistent when the model is fitted to each year of data separately, which shows that the effect is stable over time rather than the noise of one year,
4. the model with the variable predicts better on a [[Holdout Sample|holdout sample]] that was not used to fit it.

A level with little exposure has wide standard errors because of its small volume, so its relativity is unreliable. Such a level may be combined with an adjacent level. A level whose band includes 1.00 cannot be distinguished from the base level.

> [!example]- A GLM for frequency gives these results for a rating variable with four ordered levels. Is the variable worth keeping, and how should level 4 be handled? {Example}
> The coefficients are on the log scale, and the base level is level 1:
>
> | Level | Exposure | $\hat{\beta}$ | Standard error |
> | --- | --- | --- | --- |
> | 1 | 50,000 | 0 | |
> | 2 | 30,000 | 0.10 | 0.03 |
> | 3 | 15,000 | 0.22 | 0.04 |
> | 4 | 800 | 0.12 | 0.20 |
>
> - The relativity of each level is $e^{\hat{\beta}}$, and its band is $e^{\hat{\beta} - 2\text{SE}}$ to $e^{\hat{\beta} + 2\text{SE}}$.
> - Level 2 has relativity $1.105$ with band $1.041$ to $1.174$, and level 3 has relativity $1.246$ with band $1.150$ to $1.350$.
> - Levels 1 to 3 increase steadily, and the bands of levels 2 and 3 exclude 1.00, so the variable separates risk where most of the exposure is.
> - Level 4 has relativity $1.127$, a reversal from level 3, with band $0.756$ to $1.682$, which includes 1.00.
> - Level 4 has only 800 exposures, so its wide band reflects thin data. The variable is worth keeping, and level 4 should be combined with level 3.
