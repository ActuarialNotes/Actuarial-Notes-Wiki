---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:5c7f41ff9a9d84a4ad19cb22874aa5e23d2f21b8bca11d3eff62706134cdc027
  sources:
    - "Bates, Maechler, Bolker & Walker, Fitting Linear Mixed-Effects Models Using lme4, J. Stat. Softw. 67(1), 2015 (CC BY), Sections 1.1, 2.2 (Table 2), 3.4 (eqs. 30-41), 5.2 (anova refit with ML), pp.2-8, 16-17, 24-25, 34, sha256:a9ae8934fbe46ac4c3a6d333a75c2c815f9d2ed7725d7613ddce1d5a5244bbff — https://www.jstatsoft.org/index.php/jss/article/view/v067i01/946"
    - "SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation for the Mixed Model p.5236; Mixed Models Theory pp.5315-5322 (CS vs random intercept, ML/REML log-likelihoods, mixed model equations, BLUP/EBLUP, boundary mixture of chi-squares); Table 63.17 p.5303-5304, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf"
    - "Bolker et al., GLMM FAQ (author-hosted), Nested or crossed?; Testing hypotheses (boundary-conservative LRT), sha256:53ab8a0c586ae5893841de85a84585e1cb46e79852c7c349c9e5bedb5c63d231 — https://bbolker.github.io/mixedmodels-misc/glmmFAQ.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Random Intercept and Slope.md
---

A **random intercept** lets each group have its own baseline; a **random slope** lets each group have its own response to a predictor. Together they are the two building blocks of a [[Linear Mixed Model]]'s [[Random Effects|random part]].

> $$y_{ij} = (\beta_0 + b_{0i}) + (\beta_1 + b_{1i})x_{ij} + \varepsilon_{ij}$$
>
> $$\begin{pmatrix} b_{0i} \\ b_{1i}\end{pmatrix} \sim N\!\left(\mathbf{0},\; \mathbf{D} = \begin{pmatrix}\sigma_0^{2} & \sigma_{01} \\ \sigma_{01} & \sigma_1^{2}\end{pmatrix}\right)$$

- **Random intercept only**: parallel lines, one per group, at different heights — implies a compound-symmetric [[Covariance Structure|covariance structure]]
- **Random intercept and slope**: fanning lines, so the correlation between two observations depends on their $x$ values
- $\sigma_{01}$ is the intercept-slope covariance: negative means groups that start high grow more slowly (a common convergence pattern)
- A random slope costs two extra parameters ($\sigma_1^2$, $\sigma_{01}$) and often fails to converge when groups are small — test it before keeping it
- The predictor carrying a random slope must also appear as a [[Fixed Effects|fixed effect]]; the random part is a mean-zero deviation from it

![[Media/Figures/Random_Intercept_and_Slope.svg|340]]

> [!example]- Does the Development Slope Vary by Accident Year? {Example}
> Log paid losses are modelled against development age with a random effect by accident year. A random-intercept fit has $-2\ell = 812.4$; adding a random slope gives $-2\ell = 803.1$. At the 5% level, keep the random slope?
>
> > [!answer]-
> > Adding a random slope adds two parameters ($\sigma_1^2$ and $\sigma_{01}$), so the [[Likelihood Ratio Test]] statistic is
> > $$\chi^{2} = 812.4 - 803.1 = 9.3 \quad \text{on } 2 \text{ df}$$
> > $\chi^2_{0.95, 2} = 5.99 < 9.3$, so **reject** — accident years genuinely develop at different rates, not just from different levels. (The boundary problem makes the true $p$-value smaller still, so the conclusion is safe.)
