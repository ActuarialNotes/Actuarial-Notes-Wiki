---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:695c7ea5a16a54f7dfa2135f0856b31a80ac23e6b5c8e1c5563296d102d40217
  sources:
    - "Rodriguez, GLM lecture notes (Princeton), Models for Longitudinal and Clustered Data (2008, rev. 2012), secs.2.1-2.4 (fixed effects as one dummy per group; random intercept; intra-class correlation sigma_a^2/(sigma_a^2+sigma_e^2); OLS consistent but SEs biased unless corrected for clustering; random slopes) (PDF pp.2-6), sha256:59a9530438fb4812feeabbb9abdc8eb89551e1f8d457cd8e18faf77601e40ce3 — https://grodri.github.io/glms/notes/c8.pdf"
    - "Cameron & Miller, 'A Practitioner's Guide to Cluster-Robust Inference', J. Human Resources (2015), sec.II.B eq.6 (variance inflation 1 + rho_x rho_u (N_g - 1), exact for rho_x = 1; PDF p.6), sha256:a2d6ef5622b5597ef2c18dd53d700c6b2ffbadaa4c202af0e21ddc0520072214 — https://cameron.econ.ucdavis.edu/research/Cameron_Miller_JHR_2015_February.pdf"
    - "Killip, Mahfoud & Pearce, 'What Is an Intracluster Correlation Coefficient?', Ann. Fam. Med. 2004 (design effect and effective sample size; 4 x 32 patients, rho = 0.017 -> DE 1.527, ESS 84), sha256:92acf427f75183acf22e8e38dffff5671017c775a125ea449e56aa360c72cd98 — https://pmc.ncbi.nlm.nih.gov/articles/PMC1466680/"
    - "Bates, Maechler, Bolker & Walker, 'Fitting Linear Mixed-Effects Models Using lme4', JSS 2015 (nested vs crossed grouping factors, PDF pp.6-7), sha256:60474d07bdb3a511f804a6cd2e73494fd8eb5713f532e2382f69c5dea2e8782e — https://cran.r-project.org/web/packages/lme4/vignettes/lmer.pdf"
    - "UCLA OARC, 'Introduction to Linear Mixed Models' (R structures: compound symmetry, autoregressive), sha256:21bdef6434fa5b9d63320bab41d4b03d6b8214f67989dffb6dde19237997956f — https://stats.oarc.ucla.edu/other/mult-pkg/introduction-to-linear-mixed-models/"
    - "scikit-learn User Guide sec.3.1.2.3 'Cross-validation iterators for grouped data', sha256:78d7587fa92ba3b3e480c9d841b50fedc14ac29d571ccb319d4068235154f0e2 — https://scikit-learn.org/stable/modules/cross_validation.html"
    - "West, 'Additional Notes on Shrinkage Means' (MAS-II reading), sha256:a843104b0090e1e7c305be0b4a83064c2fe5620f7570937eac321e425aba57f9 — http://www-personal.umich.edu/~bwest/shrinkage.doc; Brazauskas & Dornheim (2014) secs.1.2-2.2, sha256:0c13db291312096f4d1bb87f11944d85f436d16447e2e5d3520d064d2c45591d — https://bpb-us-w2.wpmucdn.com/sites.uwm.edu/dist/2/109/files/2016/04/2014_PMbook_final-1dnzm4q.pdf"
    - "CAS Exam MAS-II Content Outline 2026, Domain B (correlated observations; non-constant variance), PDF p.4, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
    - "Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018; MAS-I reading) — publisher eBook preview, sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf, sec.1.2 Scope (GEE and multilevel models for clustered/longitudinal data, Ch.11; PDF p.22)"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Clustered Data.md
---

**Clustered data** are observations that come in groups, such as policies within agencies, claims within adjusters, or several years of experience on one policyholder, so that observations in the same cluster are more alike than observations in different clusters. They break the independence assumption of [[Linear Regression|linear regression]] and the [[Generalized Linear Model|generalized linear model]], and they are what the [[Linear Mixed Model|linear mixed model]] is built for. For observation $t$ of cluster $i$, a random intercept model is

> $$Y_{ti} = \beta_0 + \beta_1 x_{ti} + u_i + \varepsilon_{ti}$$

- $u_i \sim N(0, \sigma_u^2)$ is a [[Random Effects|random effect]] shared by every observation of cluster $i$.
- $\varepsilon_{ti} \sim N(0, \sigma^2)$ is independent noise.

The shared $u_i$ is what correlates two observations of the same cluster. Their correlation is the [[Intraclass Correlation|intraclass correlation]] $\sigma_u^2/(\sigma_u^2 + \sigma^2)$.

> [!example]- In a random intercept model of loss ratios by agency, $\sigma_u^2 = 0.01$ and $\sigma^2 = 0.04$. What is the correlation between two loss ratios from the same agency, and from different agencies? {Example}
> - Two loss ratios of one agency share $u_i$, so their correlation is $0.01/(0.01 + 0.04) = 0.20$.
> - Loss ratios of different agencies share no random effect, so their correlation is $0$.

## Types of clustered data

1. **Grouped (nested) data**: each unit belongs to one group at each level, such as policies in agencies in regions. This is the setting of a [[Hierarchical Model|hierarchical model]].
2. **Crossed data**: each observation is classified by two groupings at once, such as the adjuster and the repair shop on a claim ([[Nested and Crossed Factors|nested and crossed factors]]).
3. **Repeated measures (longitudinal) data**: the same unit is observed several times. The correlation often weakens as the time between observations grows, which calls for an AR(1) or similar [[Covariance Structure|covariance structure]] rather than one common correlation.

> [!example]- A workers compensation file has one row per claim over 6 years, recording the employer (most with claims in several years), the adjuster (each handles claims from many employers) and the incurred loss. What clustering does it have? {Example}
> - Employer is a cluster observed repeatedly. Claims of one employer share its safety culture, and its year-to-year results are longitudinal data.
> - Adjuster is a second cluster. Claims handled by one adjuster share that adjuster's reserving and settlement habits.
> - The two are crossed, not nested, because an adjuster works claims from many employers and an employer's claims go to many adjusters.
> - A reasonable start is crossed random intercepts for employer and adjuster, with the rating variables as fixed effects.

## Effect of ignoring the clustering

Ignoring the clustering typically leaves the coefficient estimates unbiased but makes their standard errors too small. The $m$ correlated observations of a cluster carry only as much information as

> $$\frac{m}{1 + (m - 1)\rho}$$

independent observations.

- $\rho$ is the intraclass correlation.
- $1 + (m - 1)\rho$ is the design effect.

Predictors that vary only between clusters are hit hardest, and effects that are not real look significant.

> [!example]- A fleet-level indicator is tested on 1,000 observations, 200 fleets each observed for 5 years. Fitted as if independent, its $t$ statistic is $2.5$, and the intraclass correlation within a fleet is $0.30$. Is the effect significant at the 5% level? {Example}
> - The indicator is constant within each fleet, so the full design effect applies: $1 + (5 - 1)(0.30) = 2.2$.
> - The 1,000 rows carry as much information as $1{,}000/2.2 = 455$ independent ones.
> - The standard error was understated by $\sqrt{2.2} = 1.48$, so the corrected statistic is $2.5/1.48 = 1.69$.
> - $1.69 < 1.96$, so the effect is not significant.

## Remedies for clustering

1. A random intercept for each cluster, and perhaps a [[Random Intercept and Slope|random slope]]. Each cluster's effect is predicted by its [[Best Linear Unbiased Predictor|BLUP]], a [[Credibility|credibility]]-weighted estimate.
2. A marginal model that specifies the correlation of the residuals directly.
3. One fixed-effect indicator per cluster, which spends a parameter per cluster and does no shrinkage.

A mixed model can also let the residual variance differ by group ([[Variance Function|variance function]]). In [[Cross-Validation|cross-validation]], a cluster is held out whole, because its correlated rows left in training would leak its information into the test.
