---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:4229263093b2dcbfa00e879ef2928e6117f30af8b64fe3e9e6b15c4fc9fd3adf
  sources:
    - "SAS/STAT 9.3 User's Guide, PROC MIXED 'Mixed Models Theory' (mixed model, 'The variance of y is, therefore, V = ZGZ' + R'; ML and REML; LRTs for covariance vs fixed-effects models; BLUP), sha256:00898035ad108f69d9ec64c3803312516f8413b9ed5e4970fa25d816fbe40edd — https://support.sas.com/documentation/cdl/en/statug/63962/HTML/default/statug_mixed_sect025.htm"
    - "Bates, Maechler, Bolker & Walker, 'Fitting Linear Mixed-Effects Models Using lme4' (JSS 2015 vignette), secs.3.4 and 5 (PDF pp.16-17, 35), sha256:60474d07bdb3a511f804a6cd2e73494fd8eb5713f532e2382f69c5dea2e8782e — https://cran.r-project.org/web/packages/lme4/vignettes/lmer.pdf"
    - "UCLA OARC, 'Introduction to Linear Mixed Models' (y = X beta + Z u + e, u ~ N(0,G), G the covariance of the random effects, R), sha256:21bdef6434fa5b9d63320bab41d4b03d6b8214f67989dffb6dde19237997956f — https://stats.oarc.ucla.edu/other/mult-pkg/introduction-to-linear-mixed-models/"
    - "Brazauskas & Dornheim, 'Credibility and Regression-Type Modeling', in Frees, Derrig & Meyers (eds.), Predictive Modeling Applications in Actuarial Science Vol. 1 (2014), secs.1.2-2.2 (PDF pp.3-6: GLS and BLUP 'correspond to the well-known pricing formulas of credibility theory'; Buhlmann-Straub as an LMM), sha256:0c13db291312096f4d1bb87f11944d85f436d16447e2e5d3520d064d2c45591d — https://bpb-us-w2.wpmucdn.com/sites.uwm.edu/dist/2/109/files/2016/04/2014_PMbook_final-1dnzm4q.pdf"
    - "Rodriguez, GLM lecture notes (Princeton), Models for Longitudinal and Clustered Data, secs.2.2-2.3 (PDF pp.3-5), sha256:59a9530438fb4812feeabbb9abdc8eb89551e1f8d457cd8e18faf77601e40ce3 — https://grodri.github.io/glms/notes/c8.pdf"
    - "CAS Exam MAS-II Content Outline 2026, Domain B Linear Mixed Models (PDF pp.4-5), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
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

![[Media/Figures/Linear_Mixed_Model.svg|340]]

> [!example]- Random Intercept Model for Repeated Claims {Example}
> Claims from $i = 1, \ldots, 50$ policyholders are observed over $t = 1, \ldots, 4$ years. An actuary fits: $Y_{it} = \beta_0 + \beta_1 \text{age}_i + u_i + \varepsilon_{it}$, where $u_i \sim N(0, \sigma_u^2)$ is a policyholder random intercept. Interpret $\sigma_u^2$.
>
> > [!answer]-
> > $\sigma_u^2$ is the **between-policyholder variance** — how much policyholders differ in their baseline claim levels after accounting for age. A large $\sigma_u^2$ relative to $\sigma_\varepsilon^2$ indicates substantial policyholder heterogeneity not explained by age.
