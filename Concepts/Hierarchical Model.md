---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:699b7c4929e573151af43cbd3cf13633ea1a1571fcd1de33e3820cb8f1f3eedc
  sources:
    - "Adolph, Introduction to Multilevel Models, POLS/CSSS 510 slides, Univ. of Washington, slides 22, 75-78 (Level 1 / Level 2; level-two equations for the intercept and coefficient; substituting gives random intercepts and coefficients with a cross-level interaction), sha256:e0c944aba79c236b63f19c8399b52842c14fcbe3d68d380176bb874b3dafdd2f — https://faculty.washington.edu/cadolph/mle/topic7.pw.pdf"
    - "Rodriguez, Models for Longitudinal and Clustered Data (2008, rev. 2012), §2.2-2.3 (a_i and e_ij as error terms at the group and individual levels; random slopes as an individual covariate interacting with group characteristics), sha256:59a9530438fb4812feeabbb9abdc8eb89551e1f8d457cd8e18faf77601e40ce3 — https://grodri.github.io/glms/notes/c8.pdf"
    - "SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation p.5236; Mixed Models Theory pp.5315-5316 (RANDOM intercept constrains the correlation to be positive, REPEATED CS leaves it unconstrained; Z is 3s x s, G is s x s), p.5322; Computational Issues pp.5352-5354 (boundary estimates, drop a zero variance component, Convergence Problems: PARMS initial values and grid search, rescaling); REPEATED GROUP= option; Example 63.5, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf"
    - "Bates, Maechler, Bolker & Walker, Fitting Linear Mixed-Effects Models Using lme4, J. Stat. Softw. 67(1), 2015 (CC BY), Sections 1.1, 2.2-2.3 (Tables 2, 4), 3.4 (eqs. 30-41), 5.2, Appendix A.1 (unstructured 3x3 covariance of intercept and two slopes), pp.2-9, 16-17, 24-25, 34, 42, sha256:a9ae8934fbe46ac4c3a6d333a75c2c815f9d2ed7725d7613ddce1d5a5244bbff — https://www.jstatsoft.org/index.php/jss/article/view/v067i01/946"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Hierarchical Model.md
---

A **Hierarchical Model** (also called a **multilevel model**) organizes data and parameters into levels, where units at a lower level are nested within units at a higher level. It is a special case of the [[Linear Mixed Model]] with nested random effects.

> **Two-level hierarchical model:**
> $$Y_{ij} = \beta_0 + \beta_1 x_{ij} + u_j + \varepsilon_{ij}$$
>
> $$u_j \sim N(0, \sigma_u^2)$$
>
> $$\varepsilon_{ij} \sim N(0, \sigma_\varepsilon^2)$$

- **Level 1**: individual observations $i$ within group $j$ (e.g., claims within a policyholder)
- **Level 2**: groups $j$ (e.g., policyholders within a territory)
- $u_j$ is the **random intercept** for group $j$ — the group-level deviation from the population mean
- The **intraclass correlation coefficient (ICC)** measures how much of the total variance is between groups:
$$\text{ICC} = \frac{\sigma_u^2}{\sigma_u^2 + \sigma_\varepsilon^2}$$
- A high ICC indicates that knowing one observation's group provides substantial information about other observations in the same group
- Hierarchical models can also include **random slopes**, where the effect of a predictor $x_{ij}$ varies across groups $j$
- **Level 1 / Level 2 notation.** The same model can be written one level at a time. The **Level 1** equation describes an observation with group-specific coefficients, and it holds only the observation-level covariates and the residual: $Y_{ij} = b_{0j} + b_{1j}x_{ij} + \varepsilon_{ij}$. The **Level 2** equations describe each coefficient with the group-level covariates and the group random effects: $b_{0j} = \beta_0 + \beta_2 z_j + u_{0j}$ and $b_{1j} = \beta_1 + \beta_3 z_j + u_{1j}$. Group-level variables thus help determine the Level 1 relationships.
- **Converting to one equation.** Substitute the Level 2 equations for the coefficients in the Level 1 equation and collect terms: $Y_{ij} = \beta_0 + \beta_1 x_{ij} + \beta_2 z_j + \beta_3 z_j x_{ij} + u_{0j} + u_{1j}x_{ij} + \varepsilon_{ij}$. A random effect in a slope's equation comes out multiplied by that slope's covariate (a random slope, not a second random intercept), and a group-level covariate in a slope's equation becomes a cross-level interaction.

![[Media/Figures/Hierarchical_Model.svg|340]]

> [!example]- ICC in a Claims Hierarchical Model {Example}
> An actuary fits a hierarchical model to claims data from 200 territories, each with multiple policyholders. The estimated variance components are $\hat{\sigma}_u^2 = 0.04$ (between territories) and $\hat{\sigma}_\varepsilon^2 = 0.16$ (within territories). Calculate the ICC.
>
> > [!answer]-
> > $$\text{ICC} = \frac{0.04}{0.04 + 0.16} = \frac{0.04}{0.20} = 0.20$$
> > 20% of the total variance in claims is attributable to territory-level differences. Territory membership explains a meaningful but not dominant share of claim variability.
