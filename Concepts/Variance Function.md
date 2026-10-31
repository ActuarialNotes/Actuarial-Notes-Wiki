---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:8f9d71826ddea11cdab13af24ef3243fd45ac27dcdce0b2d47447aaa2324a312
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph No. 5, 2nd ed., §2.2 eq. 3 and Table 1 (variance functions), §2.5 (weights: Var = phi V(mu)/w), §2.7.1-2.7.3 (gamma, inverse Gaussian, Tweedie p=0,1,2,3, 1<p<2 compound Poisson-gamma), pp.7-8, 16, 19-23, sha256:06f7c01d4c80af9a9c6672cb0ace7814c533499b4662b783218f23d12cc46318 — https://www.casact.org/sites/default/files/2021-03/8_GLM.pdf"
    - "Rodriguez, Generalized Linear Model Theory (GLM notes Appendix B), eqs. B.3, B.6-B.8 (var = phi b''(theta)/p_i; IRLS working variable and weights p_i/[b''(theta)(d eta/d mu)^2]), sha256:92bc67a6a2fc52a0ffa2babfd7a13e175b2babb52dd28f778d5e307cc65aa286 — https://grodri.github.io/glms/notes/a2.pdf"
    - "Rodriguez, GLM notes ch.3, §3.8.1 Pearson residuals (observed minus fitted divided by an estimate of the standard deviation), p.47, sha256:2243f2c49c0e15545740a0b4fb8d98ad8a5b3e37653c13feee545195801efedc — https://grodri.github.io/glms/notes/c3.pdf"
    - "Rodriguez, Models for Count Data With Overdispersion (GLM notes addendum), comparing variance functions by grouping on fitted values and plotting group means and variances, sha256:956c3ad4849787d3a60c6d0f42b8c7e60d23e80be1da988417f9e9a42c73121e — https://grodri.github.io/glms/notes/c4a.pdf"
    - "nlme (Pinheiro & Bates) documentation, varExp.Rd ('sigma^2(v) = exp(2 theta v)', default form ~fitted(.)), sha256:3723dae6e60e6caca06b252713a60b25dc350151de094a1aeae22339f2a3b2c5, varPower.Rd ('sigma^2(v) = |v|^(2 theta)'), sha256:41fd48607be59547248b415e127cbecb57f48da2707b2be6b74fd8da1f6c8890, varIdent.Rd, sha256:2660f855e58dfae76b497aced8c713b79bba9143b59a73c88152ab8503cce652 — https://github.com/cran/nlme/tree/master/man"
    - "SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation p.5236; Mixed Models Theory pp.5315-5316 (RANDOM intercept constrains the correlation to be positive, REPEATED CS leaves it unconstrained; Z is 3s x s, G is s x s), p.5322; Computational Issues pp.5352-5354 (boundary estimates, drop a zero variance component, Convergence Problems: PARMS initial values and grid search, rescaling); REPEATED GROUP= option; Example 63.5, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Variance Function.md
---

**The variance function** $V(\mu)$ specifies how the variance of a response depends on its mean. In a [[Generalized Linear Model]] it is fixed by the choice of [[Exponential Family|exponential-family]] distribution. In a [[Linear Mixed Model]] the residual variance is constant by default, and a variance function is added when the data say it is not.

> $$\mathrm{Var}(Y_i) = \frac{\phi\,V(\mu_i)}{w_i}$$

- $\phi$ is the [[Dispersion Parameter|dispersion parameter]] and $w_i$ the prior weight (exposure, claim count). The standard choices of $V(\mu)$:
  - normal: $1$ (constant variance)
  - Poisson: $\mu$
  - binomial: $\mu(1 - \mu)$
  - [[Gamma|gamma]]: $\mu^2$ (constant coefficient of variation)
  - inverse Gaussian: $\mu^3$
  - [[Tweedie Distribution|Tweedie]] with $1 < p < 2$: $\mu^p$
- **What it does in the fit.** A GLM's estimating equations weight each residual $y_i - \mu_i$ by $w_i/V(\mu_i)$, along with a factor from the link. Under a gamma model, a $\$3{,}000$ miss on a $\$50{,}000$ claim counts far less than the same miss on a $\$5{,}000$ claim. The Pearson residual $(y_i - \hat{\mu}_i)/\sqrt{V(\hat{\mu}_i)}$ puts all residuals on one scale. A fan shape in a [[Residual Plot|residual plot]] of such residuals means the wrong $V$ was chosen.
- **Choosing it.** Plot group variances against group means on log–log axes. The slope estimates $p$ in $V(\mu) = \mu^p$: $0$ for normal, $1$ for Poisson, $2$ for gamma, and between $1$ and $2$ for Tweedie.
- **In a linear mixed model.** The default residual covariance is $\mathbf{R}_i = \sigma^2\mathbf{I}$: constant variance. It can be relaxed in two ways:
  - **heterogeneous variances**, a separate $\sigma_g^2$ for each level of a factor (a treatment group, a region)
  - **variance as a function** of a covariate or of the fitted mean, e.g. the power form $\mathrm{Var}(\varepsilon_{ij}) = \sigma^2\lvert\mu_{ij}\rvert^{2\delta}$ (the `varPower` structure in R's `nlme`)
    - with a variance covariate $v_{ij}$ (a covariate such as development age, or the fitted value), the residual variance is $\sigma^2$ times the variance function: the **exponential** form $\mathrm{Var}(\varepsilon_{ij}) = \sigma^2\exp(2\delta v_{ij})$ (`nlme`'s `varExp`) and the **power** form $\mathrm{Var}(\varepsilon_{ij}) = \sigma^2\lvert v_{ij}\rvert^{2\delta}$ (`varPower`), where $\delta$ is the estimated variance-function coefficient
- **Testing it.** Unlike in a GLM, the LMM's mean–variance link is a modelling choice with its own estimated parameters. The competing models share their fixed effects, so they are compared by a [[Likelihood Ratio Test|likelihood ratio test]] on [[Restricted Maximum Likelihood|REML]] fits, or by AIC. The choice feeds the [[Covariance Structure|covariance structure]], and so the standard errors of every fixed effect.

> [!example]- Same Miss, Different Claims {Example}
> A gamma severity GLM has $\phi = 0.5$. Claim 1 has $\hat{\mu} = \$5{,}000$ and settles for $\$8{,}000$. Claim 2 has $\hat{\mu} = \$50{,}000$ and settles for $\$53{,}000$. Compare the claims' standard deviations and their Pearson residuals, each miss divided by the claim's estimated standard deviation.
>
> > [!answer]-
> > With $V(\mu) = \mu^2$, $\mathrm{SD} = \sqrt{\phi}\,\mu = 0.7071\mu$: $\$3{,}536$ for claim 1 and $\$35{,}355$ for claim 2.
> > $$
> > \begin{align*}
> > r_1 &= \frac{8{,}000 - 5{,}000}{\sqrt{0.5}\,(5{,}000)} \\
> > &= 0.849 \\
> > r_2 &= \frac{53{,}000 - 50{,}000}{\sqrt{0.5}\,(50{,}000)} \\
> > &= 0.085
> > \end{align*}
> > $$
> > The same $\$3{,}000$ miss is ten times as surprising on the small claim. A normal model with constant variance would have treated the two identically.

> [!example]- Reading a Mean–Variance Plot {Example}
> Pure premium data are grouped into three cells with means $200$, $400$ and $800$, and variances $60{,}000$, $180{,}000$ and $540{,}000$. Which variance function is indicated?
>
> > [!answer]-
> > Each doubling of the mean triples the variance, so on log–log axes:
> > $$
> > \begin{align*}
> > p &= \frac{\ln 3}{\ln 2} \\
> > &= 1.585
> > \end{align*}
> > $$
> > $V(\mu) \approx \mu^{1.6}$ lies between Poisson ($p = 1$) and gamma ($p = 2$). That is a **Tweedie** with $p \approx 1.6$, the compound Poisson–gamma shape expected of pure premium, with its point mass at zero.

> [!example]- Testing Heterogeneous Residual Variance in an LMM {Example}
> A random-intercept model of loss ratios by insured is fitted by REML twice, with identical fixed effects. With one common residual variance, $-2\ell_R = 1{,}254.6$. With a separate residual variance for each of three regions, $-2\ell_R = 1{,}241.2$. Test at $5\%$, given $\chi^2_{0.05,\,2} = 5.991$.
>
> > [!answer]-
> > The heterogeneous model has $2$ extra variance parameters.
> > $$
> > \begin{align*}
> > \text{LRT} &= 1{,}254.6 - 1{,}241.2 \\
> > &= 13.4
> > \end{align*}
> > $$
> > $13.4 > 5.991$, so **reject** a common residual variance. The regions differ in volatility, and a constant-variance model would give wrong standard errors for the fixed effects. REML fits are the right basis here because only the variance structure differs between the models. Equal variances is not a boundary hypothesis, so the plain $\chi^2_2$ applies.
