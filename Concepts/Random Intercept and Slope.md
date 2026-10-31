---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:0e7e8beea45f485bfa73cf260fb7783186294a450601ff2da982e783eace8c10
  sources:
    - "Bates, Maechler, Bolker & Walker, Fitting Linear Mixed-Effects Models Using lme4, J. Stat. Softw. 67(1), 2015 (CC BY), Sections 1.1, 2.2-2.3 (Tables 2, 4), 3.4 (eqs. 30-41), 5.2, Appendix A.1 (unstructured 3x3 covariance of intercept and two slopes), pp.2-9, 16-17, 24-25, 34, 42, sha256:a9ae8934fbe46ac4c3a6d333a75c2c815f9d2ed7725d7613ddce1d5a5244bbff — https://www.jstatsoft.org/index.php/jss/article/view/v067i01/946"
    - "SAS/STAT 13.1 User's Guide, Chapter 63: The MIXED Procedure (SAS Institute), Notation p.5236; Mixed Models Theory pp.5315-5316 (RANDOM intercept constrains the correlation to be positive, REPEATED CS leaves it unconstrained; Z is 3s x s, G is s x s), p.5322; Computational Issues pp.5352-5354 (boundary estimates, drop a zero variance component, Convergence Problems: PARMS initial values and grid search, rescaling); REPEATED GROUP= option; Example 63.5, sha256:bbde853def15e236149d167e1b35f191c5b2d002efd59792b75f5d22449a72a1 — https://support.sas.com/documentation/onlinedoc/stat/131/mixed.pdf"
    - "Barr, Levy, Scheepers & Tily, Random effects structure for confirmatory hypothesis testing: Keep it maximal, J. Mem. Lang. 68(3):255-278 (2013), author manuscript PMC3881361 (PMC OAI record), section on between-subject manipulations ('a model with a by-subject random slope term would be unidentifiable'; 'if any one factor involved in the interaction is between-unit, then the random slope associated with that interaction cannot be estimated'), sha256:3e3f69846be230bde4dd9092a3700e66fded4ec14dc6cf51e3c109802f24be61 — https://pmc.ncbi.nlm.nih.gov/articles/PMC3881361/"
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
- **A random slope needs its predictor to vary within the group.** A characteristic that is constant for each subject (a between-subject variable, such as a policyholder's territory) can enter as a fixed effect but not with a by-subject random slope: each subject belongs to only one of its levels, so a model with that random slope is unidentifiable. Between-subject variables get only the by-subject random intercept; within-subject variables can carry both a random intercept and a random slope.
- The same goes for the interaction of a 0/1 between-subject indicator $z_i$ with a within-subject predictor $x_{ij}$: across one subject's rows $z_i x_{ij}$ is either all zeros or an exact copy of $x_{ij}$, so a random coefficient on it duplicates the random slope on $x_{ij}$ and cannot be identified.

![[Media/Figures/Random_Intercept_and_Slope.svg|340]]

> [!example]- Does the Development Slope Vary by Accident Year? {Example}
> Log paid losses are modelled against development age with a random effect by accident year. A random-intercept fit has $-2\ell = 812.4$; adding a random slope gives $-2\ell = 803.1$. At the 5% level, keep the random slope?
>
> > [!answer]-
> > Adding a random slope adds two parameters ($\sigma_1^2$ and $\sigma_{01}$), so the [[Likelihood Ratio Test]] statistic is
> > $$\chi^{2} = 812.4 - 803.1 = 9.3 \quad \text{on } 2 \text{ df}$$
> > $\chi^2_{0.95, 2} = 5.99 < 9.3$, so **reject** — accident years genuinely develop at different rates, not just from different levels. (The boundary problem makes the true $p$-value smaller still, so the conclusion is safe.)
