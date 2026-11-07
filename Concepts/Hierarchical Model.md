---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:332ef05f6975753ba974e7a6aa397dc11dfee9493a68133967b147c53b209435
  sources:
    - "Adolph, Introduction to Multilevel Models, POLS/CSSS 510 slides, Univ. of Washington, slides 22, 75-78 (Level 1 / Level 2; level-two equations for the intercept and coefficient; substituting gives random intercepts and coefficients with a cross-level interaction), sha256:e0c944aba79c236b63f19c8399b52842c14fcbe3d68d380176bb874b3dafdd2f — https://faculty.washington.edu/cadolph/mle/topic7.pw.pdf"
    - "Rodriguez, Models for Longitudinal and Clustered Data (2008, rev. 2012), §2.2-2.3 (a_i and e_ij as error terms at the group and individual levels; random slopes as an individual covariate interacting with group characteristics), sha256:59a9530438fb4812feeabbb9abdc8eb89551e1f8d457cd8e18faf77601e40ce3 — https://grodri.github.io/glms/notes/c8.pdf"
    - "SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation p.5236; Mixed Models Theory pp.5315-5316 (RANDOM intercept constrains the correlation to be positive, REPEATED CS leaves it unconstrained; Z is 3s x s, G is s x s), p.5322; Computational Issues pp.5352-5354 (boundary estimates, drop a zero variance component, Convergence Problems: PARMS initial values and grid search, rescaling); REPEATED GROUP= option; Example 63.5, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf"
    - "Bates, Maechler, Bolker & Walker, Fitting Linear Mixed-Effects Models Using lme4, J. Stat. Softw. 67(1), 2015 (CC BY), Sections 1.1, 2.2-2.3 (Tables 2, 4), 3.4 (eqs. 30-41), 5.2, Appendix A.1 (unstructured 3x3 covariance of intercept and two slopes), pp.2-9, 16-17, 24-25, 34, 42, sha256:a9ae8934fbe46ac4c3a6d333a75c2c815f9d2ed7725d7613ddce1d5a5244bbff — https://www.jstatsoft.org/index.php/jss/article/view/v067i01/946"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Hierarchical Model.md
---

![[Media/Figures/Hierarchical_Model.svg|340]]

A **Hierarchical Model**, also called a **multilevel model**, is a [[Linear Mixed Model|linear mixed model]] for data in levels, where units at a lower level are nested within units at a higher level. A two-level dataset has level-1 units, such as individual observations, nested within level-2 clusters, which may carry covariates of their own. With a random intercept for each cluster $i$, the model for observation $t$ is

> $$Y_{ti} = \beta_0 + \beta_1 x_{ti} + u_i + \varepsilon_{ti}$$

- $u_i \sim N(0, \sigma_u^2)$ is the random intercept, the cluster-level deviation from the population mean.
- $\varepsilon_{ti} \sim N(0, \sigma^2)$ is the residual.

Each cluster gets its own intercept $\beta_0 + u_i$, while the slope $\beta_1$ is shared. The share of the total variance between clusters is the [[Intraclass Correlation|intraclass correlation]]:

> $$\text{ICC} = \frac{\sigma_u^2}{\sigma_u^2 + \sigma^2}$$

A high ICC means that knowing one observation's cluster says a lot about the other observations of that cluster.

> [!example]- A hierarchical model of claims in 200 territories has $\sigma_u^2 = 0.04$ between territories and $\sigma^2 = 0.16$ within them. What is the ICC? {Example}
> - $\text{ICC} = 0.04/(0.04 + 0.16) = 0.20$.
> - 20% of the total variance in claims is between territories.

## Level 1 and Level 2 equations

The same model can be written one level at a time. The **Level 1** equation describes an observation with cluster-specific coefficients, and holds only the observation-level covariates and the residual:

> $$Y_{ti} = b_{0i} + b_{1i}x_{ti} + \varepsilon_{ti}$$

The **Level 2** equations describe each coefficient with the cluster-level covariate $w_i$ and the cluster random effects:

> $$b_{0i} = \beta_0 + \beta_2 w_i + u_{0i}$$

> $$b_{1i} = \beta_1 + \beta_3 w_i + u_{1i}$$

Substituting the Level 2 equations into the Level 1 equation gives one equation:

> $$Y_{ti} = \beta_0 + \beta_1 x_{ti} + \beta_2 w_i + \beta_3 w_i x_{ti} + u_{0i} + u_{1i}x_{ti} + \varepsilon_{ti}$$

A random effect in a slope's equation comes out multiplied by that slope's covariate, so it is a [[Random Intercept and Slope|random slope]], not a second random intercept. A cluster-level covariate in a slope's equation becomes a cross-level interaction.

> [!example]- Policyholder $i$'s claim cost in year $t$ has Level 1 equation $Y_{ti} = b_{0i} + b_{1i}\,\text{year}_{ti} + \varepsilon_{ti}$, with $b_{0i} = \beta_0 + \beta_2\,\text{urban}_i + u_{0i}$ and $b_{1i} = \beta_1 + u_{1i}$. What is the single equation? {Example}
> - Substituting gives $Y_{ti} = \beta_0 + \beta_1\,\text{year}_{ti} + \beta_2\,\text{urban}_i + u_{0i} + u_{1i}\,\text{year}_{ti} + \varepsilon_{ti}$.
> - $u_{0i}$ is a random intercept and $u_{1i}$ a random slope on year.
> - Urban enters only the intercept's equation, so it is a main effect with no cross-level interaction.

## Bayesian hierarchical model

In a Bayesian hierarchical model the cluster effects are given a prior distribution, typically $N(0, \sigma_u^2)$, whose variance is itself estimated. A smaller $\sigma_u^2$ shrinks the cluster effects further toward the overall mean.
