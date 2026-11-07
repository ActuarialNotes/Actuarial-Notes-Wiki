---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:d606c4302fa0a396452eab8ddcc2d2ed7957de8a286cbfceed9c6fd03558cffe
  sources:
    - "Bates, Maechler, Bolker & Walker, Fitting Linear Mixed-Effects Models Using lme4, J. Stat. Softw. 67(1), 2015 (CC BY), Sections 1.1, 2.2-2.3 (Tables 2, 4), 3.4 (eqs. 30-41), 5.2, Appendix A.1 (unstructured 3x3 covariance of intercept and two slopes), pp.2-9, 16-17, 24-25, 34, 42, sha256:a9ae8934fbe46ac4c3a6d333a75c2c815f9d2ed7725d7613ddce1d5a5244bbff — https://www.jstatsoft.org/index.php/jss/article/view/v067i01/946"
    - "SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation p.5236; Mixed Models Theory pp.5315-5316 (RANDOM intercept constrains the correlation to be positive, REPEATED CS leaves it unconstrained; Z is 3s x s, G is s x s), p.5322; Computational Issues pp.5352-5354 (boundary estimates, drop a zero variance component, Convergence Problems: PARMS initial values and grid search, rescaling); REPEATED GROUP= option; Example 63.5, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf"
    - "Barr, Levy, Scheepers & Tily, Random effects structure for confirmatory hypothesis testing: Keep it maximal, J. Mem. Lang. 68(3):255-278 (2013), author manuscript PMC3881361 (PMC OAI record), section on between-subject manipulations ('a model with a by-subject random slope term would be unidentifiable'; 'if any one factor involved in the interaction is between-unit, then the random slope associated with that interaction cannot be estimated'), sha256:3e3f69846be230bde4dd9092a3700e66fded4ec14dc6cf51e3c109802f24be61 — https://pmc.ncbi.nlm.nih.gov/articles/PMC3881361/"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Random Intercept and Slope.md
---

![[Media/Figures/Random_Intercept_and_Slope.svg|340]]

**Random Intercept and Slope** are the two kinds of [[Random Effects|random effect]] in a [[Linear Mixed Model|linear mixed model]]. A **random intercept** is a cluster-specific random shift in the baseline level of the response. A **random slope** is a cluster-specific random change in the effect of a predictor. With both, observation $t$ of cluster $i$ is

> $$Y_{ti} = (\beta_0 + u_{0i}) + (\beta_1 + u_{1i})x_{ti} + \varepsilon_{ti}$$

> $$\begin{pmatrix} u_{0i} \\ u_{1i}\end{pmatrix} \sim N\!\left(\mathbf{0},\; \begin{pmatrix}\sigma_{u0}^{2} & \sigma_{u01} \\ \sigma_{u01} & \sigma_{u1}^{2}\end{pmatrix}\right)$$

- $\beta_0$ and $\beta_1$ are the [[Fixed Effects|fixed]] intercept and slope.
- $\sigma_{u01}$ is the intercept-slope covariance. A negative value means clusters that start high grow more slowly.

The predictor carrying a random slope also appears as a fixed effect. The random part is a mean-zero deviation from it.

> [!example]- In a profile plot of each subject's repeated measurements, what pattern does a random intercept alone give, and what does a random slope add? {Example}
> - A random intercept alone gives parallel lines, one per subject, at different heights. The vertical separation is the subject-to-subject difference in baseline level.
> - A random slope on the predictor lets the lines have different slopes, so they fan out or cross.

## Random intercept models

A random intercept alone gives parallel lines, one per cluster, at different heights. It implies a compound-symmetric [[Covariance Structure|covariance structure]]: every pair of observations of a cluster has the same correlation.

## Random slope models

A random intercept and slope give fanning lines, so the correlation between two observations depends on their $x$ values. A random slope costs two extra parameters, $\sigma_{u1}^2$ and $\sigma_{u01}$, and often fails to converge when clusters are small, so it is tested before it is kept.

A random slope needs its predictor to vary within the cluster. A characteristic that is constant for each subject, a between-subject variable such as a policyholder's territory, can enter as a fixed effect but not with a by-subject random slope. Each subject belongs to only one of its levels, so a model with that random slope is unidentifiable. The same holds for the interaction of a 0/1 between-subject indicator with a within-subject predictor $x_{ti}$: across one subject's rows it is either all zeros or a copy of $x_{ti}$.

> [!example]- Log paid losses are modelled against development age with a random intercept by accident year, giving $-2\,l = 812.4$ under REML. Adding a random slope on age gives $-2\,l = 803.1$. Is the random slope kept at the 5% level? {Example}
> - The random slope adds two parameters, $\sigma_{u1}^2$ and $\sigma_{u01}$.
> - The [[Likelihood Ratio Test|likelihood ratio]] statistic is $812.4 - 803.1 = 9.3$ on 2 degrees of freedom.
> - $9.3 > \chi^2_{0.95, 2} = 5.99$, so the random slope is kept. The boundary of $\sigma_{u1}^2 = 0$ makes the true p-value smaller still.
