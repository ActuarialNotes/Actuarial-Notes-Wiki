---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:checker-west-lmm
  content_hash: sha256:8eacb9e339573ab0c26b4fffc04d05dcdd725f73f0c248e475335829f210b21a
  sources:
    - "SAS/STAT 13.1 User's Guide, Ch.63 The MIXED Procedure, Mixed Models Theory and ODS Table Names, printed pp.5276-5277 (DDFM=KENWARDROGER: inflates the estimated variance-covariance matrix, then Satterthwaite-type df), 5318-5319 (GLS; ML and REML), 5320 (beta-hat = (X'V-hat^-1 X)^- X'V-hat^-1 y), 5321 (BLUE if G and R known; C-hat11 the estimated GLS formula; C-hat underestimates, no account made for the uncertainty in estimating G and R; inflation factors small for fairly well balanced data), 5322-5323 (Wald Z unreliable for small samples and variance components; LRT, mixture of chi-squares on the boundary; ML not REML for fixed-effects LRTs; t for single-row L, exact only for certain balance; F for rank L > 1), 5340-5341 (Type 1/Type 3 tests; CHISQ Wald chi-square tests, more liberal, infinite denominator df), 5357 (Example 63.1: REML corrects the downward bias of ML variance-component estimates), sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf"
    - "Kenward & Roger (1997), 'Small sample inference for fixed effects from restricted maximum likelihood', Biometrics 53:983-997, abstract (REML for mixed linear models; asymptotic inference inadequate for small samples; scaled Wald statistic with F approximation; adjusted covariance estimator with reduced small-sample bias) — https://pubmed.ncbi.nlm.nih.gov/9333350/"
    - "Halekoh & Hojsgaard (2014), 'A Kenward-Roger Approximation and Parametric Bootstrap Methods for Tests in Linear Mixed Models — The R Package pbkrtest', JSS 59(9), sec.4.1-4.2 (PDF pp.10-11: beta-hat = Phi(gamma-hat) X' Sigma(gamma-hat)^-1 Y; usual Wald F asymptotically chi2_d/d, the limit of F_{d,m} as m -> infinity; Phi underestimates Var(beta-hat); KR adjusted covariance and moment-matched denominator df), sha256:3d706a5b84b213b6b473b1ffa6455fdda230342b3b5195e127e098239b895b82 — https://www.jstatsoft.org/article/view/v059i09"
    - "Bates, Maechler, Bolker & Walker (2015), 'Fitting Linear Mixed-Effects Models Using lme4', JSS 67(1), sec.5 (PDF p.34: refit with ML when fixed effects differ; null distributions asymptotically normal, not t/F in finite samples; Satterthwaite / Kenward-Roger df), sha256:a9ae8934fbe46ac4c3a6d333a75c2c815f9d2ed7725d7613ddce1d5a5244bbff — https://www.jstatsoft.org/index.php/jss/article/view/v067i01/946"
    - "Rodriguez, GLM lecture notes (Princeton), Models for Longitudinal and Clustered Data, secs.2.2-2.3 (PDF pp.3-5: random intercepts, between/within variance, more than two levels, random slopes), sha256:59a9530438fb4812feeabbb9abdc8eb89551e1f8d457cd8e18faf77601e40ce3 — https://grodri.github.io/glms/notes/c8.pdf"
    - "Brazauskas & Dornheim, 'Credibility and Regression-Type Modeling', in Frees, Derrig & Meyers (eds.), Predictive Modeling Applications in Actuarial Science Vol. 1 (2014), secs.1.2-2.2 (GLS and BLUP 'correspond to the well-known pricing formulas of credibility theory'), sha256:0c13db291312096f4d1bb87f11944d85f436d16447e2e5d3520d064d2c45591d — https://bpb-us-w2.wpmucdn.com/sites.uwm.edu/dist/2/109/files/2016/04/2014_PMbook_final-1dnzm4q.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Linear Mixed Model.md
---

![[Media/Figures/Linear_Mixed_Model.svg|340]]

A **Linear Mixed Model (LMM)** is a linear regression model for [[Clustered Data|clustered data]] that includes both **[[Fixed Effects|fixed effects]]** (parameters that apply to the entire population) and **[[Random Effects|random effects]]** (parameters that vary across groups or subjects). For the $n_i$ observations of cluster $i$, the model is

> $$\mathbf{Y}_i = \mathbf{X}_i\boldsymbol{\beta} + \mathbf{Z}_i\mathbf{u}_i + \boldsymbol{\varepsilon}_i$$

- $\boldsymbol{\beta}$ is the vector of fixed effects, one entry per column of the fixed-effects design matrix $\mathbf{X}_i$.
- $\mathbf{u}_i \sim N(\mathbf{0}, \mathbf{D})$ is the vector of random effects for cluster $i$, one entry per column of the random-effects design matrix $\mathbf{Z}_i$.
- $\boldsymbol{\varepsilon}_i \sim N(\mathbf{0}, \mathbf{R}_i)$ is the vector of residuals, independent of $\mathbf{u}_i$.
- $\mathbf{D}$ and $\mathbf{R}_i$ hold the [[Variance Components|variance components]], the covariance parameters $\boldsymbol{\theta}$.

A fixed-effect coefficient is the same for every cluster. A random effect is a cluster's departure from it, with mean zero. The residual $\boldsymbol{\varepsilon}_i$ is unobservable and has mean zero, so it does not appear in a fitted value.

> [!example]- Claims from 50 policyholders are observed over 4 years, and the model is $Y_{ti} = \beta_0 + \beta_1 \text{age}_i + u_i + \varepsilon_{ti}$ with $u_i \sim N(0, \sigma_u^2)$ and $\varepsilon_{ti} \sim N(0, \sigma^2)$. What are the fixed effects and the random effect, and what does $\sigma_u^2$ measure? {Example}
> - $\beta_0$ and $\beta_1$ are fixed effects: the intercept and the age effect shared by every policyholder.
> - $u_i$ is a random intercept: policyholder $i$'s departure from the shared intercept.
> - $\sigma_u^2$ is the between-policyholder variance, how much policyholders differ in their baseline claim level after age.
> - $\sigma^2$ is the within-policyholder variance, how much one policyholder's years differ from each other.

## The implied marginal model

Integrating the random effects out of the model gives the implied marginal model, with marginal mean and marginal covariance

> $$E[\mathbf{Y}_i] = \mathbf{X}_i\boldsymbol{\beta}$$

> $$\mathbf{V}_i = \text{Var}(\mathbf{Y}_i) = \mathbf{Z}_i\mathbf{D}\mathbf{Z}_i^T + \mathbf{R}_i$$

The marginal model still describes the population mean $\mathbf{X}_i\boldsymbol{\beta}$, but it no longer gives each cluster its own effect. It yields only marginal (population-averaged) predictions, while the mixed model also yields the conditional predictions of the [[Best Linear Unbiased Predictor|BLUP]].

> [!example]- In a random intercept model, $\sigma_u^2 = 0.04$ and $\sigma^2 = 0.16$. What are the marginal variance of one observation and the covariance of two observations of the same cluster? {Example}
> - With a random intercept, $\mathbf{Z}_i$ is a column of ones and $\mathbf{D} = \sigma_u^2$, so every entry of $\mathbf{Z}_i\mathbf{D}\mathbf{Z}_i^T$ is $0.04$.
> - With $\mathbf{R}_i = \sigma^2\mathbf{I}$, the diagonal of $\mathbf{V}_i$ is $0.04 + 0.16 = 0.20$.
> - The off-diagonal entries of $\mathbf{V}_i$ are $0.04$, the covariance of two observations of one cluster.

## Estimating the fixed effects

Given the marginal covariance, the fixed effects are estimated by generalized least squares:

> $$\hat{\boldsymbol{\beta}} = \left(\sum_i \mathbf{X}_i^T\mathbf{V}_i^{-1}\mathbf{X}_i\right)^{-1}\sum_i \mathbf{X}_i^T\mathbf{V}_i^{-1}\mathbf{Y}_i$$

If $\mathbf{V}_i$ is known, $\hat{\boldsymbol{\beta}}$ is the best linear unbiased estimator (BLUE) of $\boldsymbol{\beta}$. In practice $\mathbf{D}$ and $\mathbf{R}_i$ are estimated by [[Maximum Likelihood Estimation|ML]] or [[Restricted Maximum Likelihood|REML]] and substituted. The estimated variance of $\hat{\boldsymbol{\beta}}$ is then $(\sum_i \mathbf{X}_i^T\hat{\mathbf{V}}_i^{-1}\mathbf{X}_i)^{-1}$, with $\hat{\mathbf{V}}_i$ treated as if it were the true $\mathbf{V}_i$. It tends to underestimate the true sampling variability of $\hat{\boldsymbol{\beta}}$, because it ignores the uncertainty in estimating $\mathbf{D}$ and $\mathbf{R}_i$. REML corrects the bias of the variance components, not this one.

## Tests of fixed effects

A hypothesis about the fixed effects is written $H_0\colon \mathbf{L}\boldsymbol{\beta} = \mathbf{0}$.

1. A single fixed-effect parameter (one row of $\mathbf{L}$) is tested with a $t$ statistic.
2. A linear hypothesis on several fixed effects (rank of $\mathbf{L}$ above 1) is tested with an $F$ statistic, built from Type 1 (sequential) or Type 3 (partial) $\mathbf{L}$ matrices.
3. The omnibus Wald test compares the numerator of that $F$ statistic with a $\chi^2$ distribution whose degrees of freedom are the rank of $\mathbf{L}$. It is more liberal than the $F$ test because it effectively assumes infinite denominator degrees of freedom.
4. A [[Likelihood Ratio Test|likelihood ratio test]] compares nested models fitted by ML.

The $t$ and $F$ statistics follow exact $t$ and $F$ distributions only for data with certain types of balance. In general they are approximate, and their denominator degrees of freedom must be estimated. The Kenward–Roger method, built for REML fits in small samples, inflates the estimated covariance matrix of the fixed effects to reduce its small-sample bias and then computes Satterthwaite-type denominator degrees of freedom. It matters most in small samples.

## Tests of covariance parameters

Likelihood ratio tests can test both fixed-effect parameters and covariance parameters. Two covariance structures with the same fixed effects can be compared by a likelihood ratio test on either fit, but models that differ in their fixed effects must be compared with ML fits.

The Wald $Z$ statistic for a covariance parameter (the estimate divided by its asymptotic standard error) is valid for large samples. It can be unreliable for small data sets and for variance components, whose sampling distributions are skewed or bounded. A likelihood ratio test is the better choice. When the null value, such as a variance of 0, is on the boundary of the parameter space, its statistic is referred to a mixture of $\chi^2$ distributions.

> [!example]- Removing a random intercept raises $-2\,l$ from $812.4$ to $818.0$ under REML, with the fixed effects unchanged. Is the random intercept needed at the 5% level? {Example}
> - The statistic is $818.0 - 812.4 = 5.6$.
> - The null value $\sigma_u^2 = 0$ is on the boundary, so the statistic is referred to a 50:50 mixture of $\chi^2_0$ and $\chi^2_1$.
> - The p-value is half the $\chi^2_1$ p-value: $0.5 \times P(\chi^2_1 > 5.6) = 0.5 \times 0.018 = 0.009$.
> - The p-value is below $0.05$, so the random intercept is kept.

The model connects to credibility: the BLUP of a random intercept is a [[Bühlmann-Straub Credibility|Bühlmann-Straub]] credibility estimate.
