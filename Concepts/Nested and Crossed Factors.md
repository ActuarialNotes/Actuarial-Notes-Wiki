---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:a0cbcd5cddce388ed971c08f07aaa13cb64a72636ac0d412dc25870bc97c7933
  sources:
    - "Bates, Maechler, Bolker & Walker, Fitting Linear Mixed-Effects Models Using lme4, J. Stat. Softw. 67(1), 2015 (CC BY), Sections 1.1, 2.2 (Table 2), 3.4 (eqs. 30-41), 5.2 (anova refit with ML), pp.2-8, 16-17, 24-25, 34, sha256:a9ae8934fbe46ac4c3a6d333a75c2c815f9d2ed7725d7613ddce1d5a5244bbff — https://www.jstatsoft.org/index.php/jss/article/view/v067i01/946"
    - "Bolker et al., GLMM FAQ (author-hosted), Nested or crossed?; Testing hypotheses (boundary-conservative LRT), sha256:53ab8a0c586ae5893841de85a84585e1cb46e79852c7c349c9e5bedb5c63d231 — https://bbolker.github.io/mixedmodels-misc/glmmFAQ.html"
    - "SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation for the Mixed Model p.5236; Mixed Models Theory pp.5315-5322 (CS vs random intercept, ML/REML log-likelihoods, mixed model equations, BLUP/EBLUP, boundary mixture of chi-squares); Table 63.17 p.5303-5304, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Nested and Crossed Factors.md
---

**Nested and Crossed Factors** describe how two grouping factors in a [[Linear Mixed Model|linear mixed model]] relate to each other. Factor $B$ is **nested** in factor $A$ when every level of $B$ occurs within exactly one level of $A$, as with adjusters within claim offices. $A$ and $B$ are **crossed** when a level of one occurs with several levels of the other, as with territories observed in every accident year. For observation $t$ of adjuster $j$ in office $i$, the nested model is

> $$Y_{tji} = \beta_0 + u_i + v_{j(i)} + \varepsilon_{tji}$$

- $u_i \sim N(0, \sigma_u^2)$ is the office effect.
- $v_{j(i)} \sim N(0, \sigma_v^2)$ is the effect of adjuster $j$ within office $i$.
- $\varepsilon_{tji} \sim N(0, \sigma^2)$ is the residual, and all the terms are independent.

For observation $t$ of territory $i$ in year $j$, the crossed model is

> $$Y_{tij} = \beta_0 + u_i + v_j + \varepsilon_{tij}$$

- $u_i \sim N(0, \sigma_u^2)$ is the territory effect and $v_j \sim N(0, \sigma_v^2)$ the year effect.

Each grouping factor costs one [[Variance Components|variance component]]. A model can include several crossed random effects at once, each entering as its own independent term.

To decide between the two, ask whether level 7 of $B$ means the same thing under every level of $A$. Adjuster 7 in Toronto and adjuster 7 in Calgary are different people, so adjuster is nested in office. Accident year 2022 is the same year for every territory, so year and territory are crossed.

> [!example]- Are these nested or crossed: vehicles on multi-vehicle policies with effects for policy and vehicle; loss ratios of 200 territories in each of 10 accident years; claims each handled by one adjuster, each adjuster in one of 12 offices? {Example}
> - Vehicle is nested in policy, because a vehicle belongs to exactly one policy.
> - Territory and year are crossed, because every territory appears in every year and a year's shock hits all territories at once.
> - Claims are nested in adjusters, which are nested in offices: a three-level model.

## Correlation under nesting

Two claims of the same adjuster share $u_i + v_{j(i)}$, and two claims of the same office but different adjusters share only $u_i$. Their correlations are

> $$\rho_{\text{same adjuster}} = \frac{\sigma_u^2 + \sigma_v^2}{\sigma_u^2 + \sigma_v^2 + \sigma^2}$$

> $$\rho_{\text{same office}} = \frac{\sigma_u^2}{\sigma_u^2 + \sigma_v^2 + \sigma^2}$$

Each is an [[Intraclass Correlation|intraclass correlation]]. Claims from different offices share no random effect, so their correlation is $0$. A prediction for a subject includes the random effect at every level of the nesting.

> [!example]- A model of log claim-closing time has office variance $0.04$, adjuster-within-office variance $0.06$ and residual variance $0.30$. What is the correlation of two claims with the same adjuster, and of two from the same office with different adjusters? {Example}
> - The total variance is $0.04 + 0.06 + 0.30 = 0.40$.
> - Two claims of one adjuster have correlation $(0.04 + 0.06)/0.40 = 0.25$.
> - Two claims of one office and different adjusters have correlation $0.04/0.40 = 0.10$.

## Correlation under crossing

Two observations sharing only a territory have correlation $\sigma_u^2/(\sigma_u^2 + \sigma_v^2 + \sigma^2)$, and two sharing only a year have $\sigma_v^2/(\sigma_u^2 + \sigma_v^2 + \sigma^2)$. The crossed [[Covariance Structure|covariance structure]] is not block-diagonal by any one factor.

> [!example]- A crossed model of territory loss ratios has territory variance $0.012$, accident-year variance $0.008$ and residual variance $0.020$. What is the correlation of two observations sharing only a territory, and only a year? {Example}
> - The total variance is $0.012 + 0.008 + 0.020 = 0.040$.
> - Sharing only a territory, the correlation is $0.012/0.040 = 0.30$.
> - Sharing only a year, the correlation is $0.008/0.040 = 0.20$.

## Coding nested and crossed factors

In R's `lme4`, `(1 | office/adjuster)` expands to `(1 | office) + (1 | office:adjuster)`, while `(1 | territory) + (1 | year)` specifies crossed effects.

> [!trap] Recycled inner IDs
> When adjuster IDs restart in every office (an adjuster 7 in each) and the model is written as crossed, the software pools different people into one level. Give each inner unit a unique ID, or state the nesting.
