---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:checker-west-lmm
  content_hash: sha256:97eb8b06920eae27d94a8ca9628b3eaea682dedd2cd6b4033ac24a40277f971e
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

A **Linear Mixed Model (LMM)** extends ordinary linear regression by including both **fixed effects** (parameters that apply to the entire population) and **random effects** (parameters that vary across groups or subjects). This accommodates correlated observations, repeated measures, and grouped data.

> $$\mathbf{y} = \mathbf{X}\boldsymbol{\beta} + \mathbf{Z}\mathbf{u} + \boldsymbol{\varepsilon}$$
>
> $$\mathbf{u} \sim N(\mathbf{0}, \mathbf{G})$$
>
> $$\boldsymbol{\varepsilon} \sim N(\mathbf{0}, \mathbf{R})$$
>
> $$\mathbf{u} \perp \boldsymbol{\varepsilon}$$

**Model components:**

| Symbol | Name | Description |
| :--- | :--- | :--- |
| $\boldsymbol{\beta}$ | Fixed effects | Population-level coefficients |
| $\mathbf{u}$ | Random effects | Group-level deviations |
| $\mathbf{X}$, $\mathbf{Z}$ | Design matrices | For fixed and random effects |
| $\mathbf{G}$ | Random effect covariance | Variance of group-level deviations |
| $\mathbf{R}$ | Residual covariance | Within-group error structure |

- **Marginal mean**: $E[\mathbf{y}] = \mathbf{X}\boldsymbol{\beta}$; **marginal covariance**: $\text{Cov}(\mathbf{y}) = \mathbf{Z}\mathbf{G}\mathbf{Z}^\top + \mathbf{R}$
- Parameters are estimated by **ML** or **REML** (Restricted Maximum Likelihood). Two covariance structures with the same fixed effects can be compared by a likelihood ratio test on either fit, but models that differ in their **fixed effects** must be compared with **ML** fits — the REML likelihood depends on the fixed-effects specification
- **[[Hierarchical Model]]s** are a special case of LMMs with nested random effects
- LMMs connect to [[Bühlmann-Straub Credibility]]: the BLUP (Best Linear Unbiased Predictor) for a random effect corresponds to the credibility estimate

**Estimating and testing the fixed effects:**

- The fixed effects are estimated by generalized least squares, $\hat{\boldsymbol\beta} = (\mathbf{X}^\top\mathbf{V}^{-1}\mathbf{X})^{-1}\mathbf{X}^\top\mathbf{V}^{-1}\mathbf{y}$ with $\mathbf{V} = \mathbf{Z}\mathbf{G}\mathbf{Z}^\top + \mathbf{R}$. If $\mathbf{G}$ and $\mathbf{R}$ are known, $\hat{\boldsymbol\beta}$ is the best linear unbiased estimator (BLUE) of $\boldsymbol\beta$.
- In practice $\mathbf{G}$ and $\mathbf{R}$ are estimated (by ML or REML) and simply substituted, so the estimated variance of $\hat{\boldsymbol\beta}$ is the GLS formula $(\mathbf{X}^\top\hat{\mathbf{V}}^{-1}\mathbf{X})^{-1}$ with $\hat{\mathbf{V}}$ treated as if it were the true $\mathbf{V}$. It tends to underestimate the true sampling variability of $\hat{\boldsymbol\beta}$ because no account is made for the uncertainty in estimating $\mathbf{G}$ and $\mathbf{R}$, and that is so whichever method estimated them: REML corrects the bias of the variance components, not this one.
- A single fixed-effect parameter (one row of $\mathbf{L}$ in $H_0\colon \mathbf{L}\boldsymbol\beta = 0$) is tested with a $t$ statistic; a linear hypothesis on several fixed effects (rank of $\mathbf{L}$ above 1) with an $F$ statistic, built from Type 1 (sequential) or Type 3 (partial) $\mathbf{L}$ matrices.
- The **omnibus Wald test** of $H_0\colon \mathbf{L}\boldsymbol\beta = 0$ compares the numerator of that $F$ statistic with a $\chi^2$ distribution whose degrees of freedom are the rank of $\mathbf{L}$. It is more liberal than the $F$ test because it effectively assumes infinite denominator degrees of freedom.
- These $t$ and $F$ statistics follow exact $t$ and $F$ distributions only for data with certain types of balance and some special unbalanced cases; in general they are approximate and their denominator degrees of freedom must be estimated. The **Kenward–Roger** method, built for REML fits of mixed models in small samples, inflates the estimated covariance matrix of the fixed effects to reduce its small-sample bias and then computes Satterthwaite-type denominator degrees of freedom for the $F$ test. It matters most in small samples: with large samples the statistics are close to their asymptotic normal and $\chi^2$ distributions, and for fairly well-balanced data the inflation tends to be small.
- For a **covariance parameter**, the Wald $Z$ (the estimate divided by its asymptotic standard error) is valid for large samples, but it can be unreliable for small data sets and for parameters such as variance components, which have a skewed or bounded sampling distribution. A [[Likelihood Ratio Test]] is the better alternative, referred to a mixture of $\chi^2$ distributions when the null value, such as a variance of 0, is on the boundary of the parameter space.

![[Media/Figures/Linear_Mixed_Model.svg|340]]

> [!example]- Random Intercept Model for Repeated Claims {Example}
> Claims from $i = 1, \ldots, 50$ policyholders are observed over $t = 1, \ldots, 4$ years. An actuary fits: $Y_{it} = \beta_0 + \beta_1 \text{age}_i + u_i + \varepsilon_{it}$, where $u_i \sim N(0, \sigma_u^2)$ is a policyholder random intercept. Interpret $\sigma_u^2$.
>
> > [!answer]-
> > $\sigma_u^2$ is the **between-policyholder variance** — how much policyholders differ in their baseline claim levels after accounting for age. A large $\sigma_u^2$ relative to $\sigma_\varepsilon^2$ indicates substantial policyholder heterogeneity not explained by age.
