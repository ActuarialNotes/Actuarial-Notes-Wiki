---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:61980ce1af050f74dcceee9345e68f7fc1bb853275684eb99c4a82373d8bf923
  sources:
    - "UCLA OARC, Introduction to Linear Mixed Models, introduction; G and R matrices, sha256:5ec104acf92fbd13cb9affc0a67a509ea1b6f2d6bab6c7c3bf1aa57f8cf4df55 — https://stats.oarc.ucla.edu/other/mult-pkg/introduction-to-linear-mixed-models/"
    - "Bates, Maechler, Bolker & Walker, Fitting Linear Mixed-Effects Models Using lme4, J. Stat. Softw. 67(1), 2015 (CC BY), Sections 1.1, 2.2 (Table 2), 3.4 (eqs. 30-41), 5.2 (anova refit with ML), pp.2-8, 16-17, 24-25, 34, sha256:a9ae8934fbe46ac4c3a6d333a75c2c815f9d2ed7725d7613ddce1d5a5244bbff — https://www.jstatsoft.org/index.php/jss/article/view/v067i01/946"
    - "SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation for the Mixed Model p.5236; Mixed Models Theory pp.5315-5322 (CS vs random intercept, ML/REML log-likelihoods, mixed model equations, BLUP/EBLUP, boundary mixture of chi-squares); Table 63.17 p.5303-5304, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf"
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

![[Media/Figures/Hierarchical_Model.svg|340]]

> [!example]- ICC in a Claims Hierarchical Model {Example}
> An actuary fits a hierarchical model to claims data from 200 territories, each with multiple policyholders. The estimated variance components are $\hat{\sigma}_u^2 = 0.04$ (between territories) and $\hat{\sigma}_\varepsilon^2 = 0.16$ (within territories). Calculate the ICC.
>
> > [!answer]-
> > $$\text{ICC} = \frac{0.04}{0.04 + 0.16} = \frac{0.04}{0.20} = 0.20$$
> > 20% of the total variance in claims is attributable to territory-level differences. Territory membership explains a meaningful but not dominant share of claim variability.
