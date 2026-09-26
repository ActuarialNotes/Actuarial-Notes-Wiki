---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:463c7445142bcd6c195610f5e38d83e88ab7c8ba05296449913a238679778cb4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Clustered Data.md
---

**Clustered data** are observations that arrive in groups — policies within agencies, claims within adjusters, several years of experience on the same policyholder — so that observations in the same cluster are more alike than observations in different ones. They break the independence assumption of [[Linear Regression]] and the [[Generalized Linear Model]], and they are the reason the [[Linear Mixed Model]] exists.

> $$y_{ij} = \mathbf{x}_{ij}^\top\boldsymbol\beta + b_i + \varepsilon_{ij}$$

> $$\mathrm{Corr}(y_{ij}, y_{ik}) = \frac{\sigma_b^{2}}{\sigma_b^{2} + \sigma^{2}}$$

- $i$ indexes clusters and $j$ the observations within one. $b_i \sim N(0, \sigma_b^2)$ is a [[Random Effects|random effect]] shared by everything in cluster $i$, and $\varepsilon_{ij} \sim N(0, \sigma^2)$ is independent noise. The shared $b_i$ is what correlates two different observations $j \neq k$ of the same cluster, by the [[Intraclass Correlation|intraclass correlation]] in the second block
- **Grouped (nested) data**: each unit belongs to one group at each level — policies in agencies in regions — the setting of a [[Hierarchical Model|hierarchical model]]. **Crossed** data: each observation is classified by two groupings at once, such as the adjuster and the repair shop on a claim ([[Nested and Crossed Factors]])
- **Repeated measures (longitudinal) data**: the same unit observed several times. The correlation often weakens as the time between observations grows, which calls for an AR(1) or similar [[Covariance Structure|covariance structure]] rather than one common correlation
- **Ignoring the clustering** typically leaves the coefficient estimates unbiased but makes their standard errors too small: $m$ correlated observations in a cluster carry only as much information as $m / [1 + (m - 1)\rho]$ independent ones. Predictors that vary only *between* clusters are hit hardest, and effects that are not real look significant
- **Remedies**: a random intercept (and perhaps a [[Random Intercept and Slope|random slope]]) for each cluster; a marginal model that specifies the correlation of the residuals directly; or one fixed-effect indicator per cluster, which spends a parameter per cluster and does no shrinkage. The random-effect route predicts each cluster's effect by its [[Best Linear Unbiased Predictor|BLUP]], a [[Credibility|credibility]]-weighted estimate
- A mixed model can also let the residual variance differ by group instead of assuming it constant. And in [[Cross-Validation|cross-validation]], a cluster must be held out whole — otherwise its correlated rows left in training leak its information into the test

> [!example]- A Significant Effect That Is Not {Example}
> A fleet-level indicator (telematics installed) is tested in a regression on $1{,}000$ observations: $200$ commercial fleets, each observed for $5$ years. Fitted as if independent, its $t$-statistic is $2.5$. The intraclass correlation of the residuals within a fleet is $0.30$. Correct the test.
>
> > [!answer]-
> > The indicator is constant within each fleet, so the full design effect applies to it:
> > $$
> > \begin{align*}
> > \text{Design effect} &= 1 + (5 - 1)(0.30) \\
> > &= 2.2 \\
> > n_{\text{eff}} &= \frac{1{,}000}{2.2} \\
> > &= 455 \\
> > t_{\text{corrected}} &= \frac{2.5}{\sqrt{2.2}} \\
> > &= 1.69
> > \end{align*}
> > $$
> > The standard error was understated by a factor of $\sqrt{2.2} = 1.48$. At $1.69$ the effect is no longer significant at the $5\%$ level (two-sided critical value $1.96$). The $1{,}000$ rows hold about as much information as $455$ independent ones — and on a fleet-level question, really only $200$ fleets' worth.

> [!example]- Recognizing the Clustering in a Claims File {Example}
> A workers compensation file has one row per claim for $6$ years, recording the employer (the policyholder, most with claims in several years), the adjuster (each handles claims from many employers), and the claim's incurred loss. Describe the clustering and a mixed-model structure for it.
>
> > [!answer]-
> > - **Employer** is a cluster observed repeatedly: claims from the same employer share its safety culture and payroll mix, and its year-to-year results form **longitudinal** data
> > - **Adjuster** is a second cluster: claims handled by the same adjuster share that adjuster's reserving and settlement habits
> > - The two are **crossed**, not nested: an adjuster works claims from many employers, and an employer's claims go to many adjusters
> >
> > A reasonable start is crossed random intercepts for employer and adjuster, with the rating variables as fixed effects. If an employer's residuals correlate more strongly in adjacent years than in distant ones, add an AR(1) structure over years within employer. Treating the rows as independent would overstate how much is known about every employer-level variable.
