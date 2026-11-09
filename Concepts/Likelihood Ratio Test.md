---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:f98559a3fc68ddf6ed4cfca45250c50dc9473ba44d3d95eebdc543b1e50d08c9
  sources:
    - "Rodriguez, Generalized Linear Models (Princeton lecture notes), Appendix B §B.3.2 pp.6-7, eqs (B.11)-(B.13): -2 log lambda = D/phi (scaled deviance), nested models -2 log lambda = [D(omega1) - D(omega2)]/phi, phi known or estimated from the larger model, asymptotically chi^2 with p2 - p1 df; normal linear model: exact F(p2 - p1, n - p2); binomial/Poisson phi = 1, deviance = scaled deviance, sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
    - "Rodriguez, Generalized Linear Models, Appendix A §A.2 pp.5-9: -2 log lambda -> chi^2 with nu = dim difference under regularity conditions; Wald, score and LR tests asymptotically equivalent, 'small-sample properties are not known, but some simulation studies suggest that the likelihood ratio test may be better', sha256:bfcc766141f43095433287dcc61f127df49103be1dd31d71454c56aa6ed8f8a6 — https://grodri.github.io/glms/notes/a1.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 rev.), §6.1.3 and §6.2.1 eq.17, PDF pp.74-75: comparisons need identical data; F = (D_S - D_B)/(# added parameters x phi-hat_B) with D the unscaled deviance, F on (# added parameters, n - p_B) df, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Balakrishnan, CMU 36-705 Intermediate Statistics (Fall 2019), Lecture 21: generalized LRT, Wilks' phenomenon, -2 log lambda -> chi^2_nu with nu = dim(Theta) - dim(Theta0); Neyman-Pearson test optimal for simple vs simple, sha256:957e7c52577a6b3f0472bbcc14611653b64b7a934f07c5270e05228561c4df21 — https://www.stat.cmu.edu/~siva/teaching/705/lec21.pdf"
    - "NIST/SEMATECH e-Handbook §8.2.3.3 Likelihood ratio tests: restricted vs unrestricted (nested) models, -2 ln lambda approximately chi-square with df = number of parameters lost, sha256:b98f507c243e5f762477ab0311358633217b98a11251c19faf056044c3b4749b — https://www.itl.nist.gov/div898/handbook/apr/section2/apr233.htm"
    - "Siegrist, Random, ch.8 §5 Likelihood Ratio Tests: Neyman-Pearson lemma (most powerful, simple vs simple) and generalized likelihood ratio, sha256:60b047835a3f644cd2317c8ab984b8d41ae7669f53c1d32a79705942670b9b04 — https://www.randomservices.org/random/hypothesis/Likelihood.html"
    - "CAS Exam MAS-I Tables (version 01/15/2018), 'Lower-tail areas for Chi-square distributions' p.20 (0.950 column: df 1 = 3.84, df 2 = 5.99), sha256:cb5674138a67f7a498b8cc90357144fd121cbcbbc7487f214557b105611a69b4 — https://www.casact.org/sites/default/files/2021-03/masi_tables.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Likelihood Ratio Test.md
---

![[Media/Figures/Likelihood_Ratio_Test.svg|340]]

A **Likelihood Ratio Test** is a [[Hypothesis Testing|hypothesis test]] of a null hypothesis $H_0$ that restricts a parameter $\theta$ to a subset of its possible values, which rejects $H_0$ when the maximized likelihood under $H_0$ is small compared with the maximized likelihood without the restriction. The likelihood ratio is

> $$\Lambda = \frac{L(\hat{\theta}_0)}{L(\hat{\theta})}$$

- $L(\theta)$ is the likelihood of $\theta$.
- $\hat{\theta}_0$ is the [[Maximum Likelihood Estimation|maximum likelihood estimate]] under $H_0$, and $\hat{\theta}$ is the maximum likelihood estimate over all values of $\theta$.
- $0 \le \Lambda \le 1$, because the restricted maximum cannot exceed the unrestricted one.

The test statistic is

> $$-2 \ln \Lambda = 2\left[l(\hat{\theta}) - l(\hat{\theta}_0)\right]$$

- $l(\theta) = \ln L(\theta)$ is the log-likelihood.

For a large sample, under $H_0$, the statistic has approximately a [[Chi-Squared Distribution|chi-squared distribution]] with $r$ degrees of freedom, where $r$ is the number of free parameters without the restriction minus the number of free parameters under $H_0$.

The test rejects $H_0$ at significance level $\alpha$ when $-2 \ln \Lambda \ge \chi^2_{\alpha,r}$, the upper $\alpha$ point. A small $\Lambda$ leads to rejection, and the largest $\Lambda$ that is rejected is $e^{-\chi^2_{\alpha,r}/2}$.

> [!example]- Claim sizes are exponential with mean $\theta$. A sample of 50 claims has mean 1,200. Does the likelihood ratio test reject $H_0: \theta = 1{,}000$ against $H_1: \theta \ne 1{,}000$ at significance level 0.05? {Example}
> - The log-likelihood is $l(\theta) = -n \ln \theta - n\bar{x}/\theta$, and the unrestricted estimate is $\hat{\theta} = \bar{x} = 1{,}200$.
> - Substituting $\hat{\theta} = 1{,}200$ and $\theta_0 = 1{,}000$ gives the statistic:
>
> $$
> \begin{aligned}
> -2 \ln \Lambda &= 2n\left[\frac{\bar{x}}{\theta_0} - 1 - \ln\frac{\bar{x}}{\theta_0}\right] \\
> &= 100\,(1.2 - 1 - \ln 1.2) \\
> &= 1.768
> \end{aligned}
> $$
>
> - $H_0$ fixes one parameter, so $r = 1$ and $\chi^2_{0.05,1} = 3.841$.
> - Because $1.768 < 3.841$, the test does not reject $H_0$.
> - The test would reject only for $\Lambda \le e^{-3.841/2} = 0.1465$.

## Comparing nested models

A model is nested in a larger model when it is obtained by fixing some of the larger model's parameters, both models being fitted to the same data. The likelihood ratio test compares nested models with the statistic

> $$2\left[l_{\text{full}} - l_{\text{reduced}}\right]$$

- $l_{\text{full}}$ and $l_{\text{reduced}}$ are the maximized log-likelihoods of the larger model and the nested model.

Under $H_0$ that the nested model is adequate, the statistic is approximately chi-squared with degrees of freedom equal to the difference in the numbers of parameters. The test is valid only for nested models. Models that are not nested are compared with [[AIC]] or [[BIC]] in [[Model Selection|model selection]].

> [!example]- A gamma model fitted to claim sizes has maximized log-likelihood $-2{,}401.2$, and its exponential special case, with shape parameter 1, has $-2{,}403.4$. At what significance levels does the test reject the exponential model? {Example}
> - The exponential model fixes one parameter of the gamma model, so it is nested, with 1 degree of freedom.
> - The statistic is $2\left[-2{,}401.2 - (-2{,}403.4)\right] = 4.4$.
> - The critical values with 1 degree of freedom are $\chi^2_{0.05,1} = 3.841$ and $\chi^2_{0.025,1} = 5.024$.
> - Because $3.841 < 4.4 < 5.024$, the test rejects the exponential model at 5% but not at 2.5%.

## Analysis of deviance for generalized linear models

For two nested [[Generalized Linear Model|generalized linear models]], the likelihood ratio statistic is the drop in [[Deviance|deviance]] divided by the [[Dispersion Parameter|dispersion parameter]]:

> $$-2 \ln \Lambda = \frac{D_{\text{reduced}} - D_{\text{full}}}{\phi}$$

- $D_{\text{reduced}}$ and $D_{\text{full}}$ are the deviances of the nested model and the larger model.
- $\phi = 1$ for the Poisson and binomial distributions, so the statistic is the drop in deviance.

Under $H_0$ it is approximately chi-squared with $r$ degrees of freedom, the number of parameters the larger model adds. The difference in residual degrees of freedom of the two models equals $r$.

> [!example]- A Poisson GLM with 4 parameters has maximized log-likelihood $-412.6$. Adding a territory variable with 3 levels gives $-407.1$. Does territory belong in the model at significance level 0.05? {Example}
> - A variable with 3 levels adds $3 - 1 = 2$ parameters, so $r = 2$.
> - The statistic is $2\left[-407.1 - (-412.6)\right] = 11.0$, which is also the drop in deviance.
> - Because $11.0 > \chi^2_{0.05,2} = 5.991$, the test rejects the model without territory.

## F test for nested models

When $\phi$ is unknown, it is estimated from the larger model, and the test uses the statistic

> $$F = \frac{(D_{\text{reduced}} - D_{\text{full}})/r}{D_{\text{full}}/(n - k)}$$

- $k$ is the number of parameters in the larger model, so $n - k$ is its residual degrees of freedom.

Under $H_0$, $F$ has approximately an [[F-Distribution|$F$ distribution]] with $r$ and $n - k$ degrees of freedom. For a normal response with the identity link, the deviance is the [[Residual Sum of Squares|residual sum of squares]], and the distribution is exact.

> [!example]- A linear model with residual sum of squares 520 on 46 degrees of freedom gains two predictors, and its residual sum of squares falls to 460 on 44 degrees of freedom. Do the two predictors improve the model at significance level 0.05? {Example}
> - The improvement is $520 - 460 = 60$ on $r = 2$ degrees of freedom.
> - The statistic is $F = \frac{60/2}{460/44} = \frac{30}{10.455} = 2.870$.
> - With 2 and 44 degrees of freedom, $F_{0.05,2,44} = 3.209$.
> - Because $2.870 < 3.209$, the test does not reject the smaller model.

> [!trap] Counting all the parameters as the degrees of freedom
> The degrees of freedom are the number of parameters the larger model adds, not its total number of parameters. Adding a 3-level variable to a 4-parameter model is a test on 2 degrees of freedom, not 6.
