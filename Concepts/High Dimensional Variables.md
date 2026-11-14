---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:cb8b9c43458ff70ffc6a59ec325fa09d5bd8b1f8766632e262ebff710e9e2620
  sources:
    - "Holmes & Casotto, Penalized Regression and Lasso Credibility, CAS Monograph 13 (2025 revision), §3.1.2 p.16 (PDF 26); App. A.1-A.2 pp.86-91 (PDF 96-101, eq. A.1), sha256:f6978accbd2bcd43284ec939dd90966430a3e36fc126aab4584241a13d7a28cd — https://www.casact.org/sites/default/files/2025-08/CAS_Monograph_13_2025_revision.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §5.5, §9.2, §10.1, PDF pp.65, 100-101, 103-106, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Chalk et al., From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges, CAS Monograph 16, 1st ed., Ch.6 §6.1-6.7, Ch.8 §8.2, PDF pp.85-105, 143, sha256:0b293634c3d6320eac9aca5d2f8ba4ca7954f20db8a462b24771c60b5e046d74 — https://www.casact.org/sites/default/files/2026-02/CAS_Monograph-16_From_GLMs.pdf"
    - "Couret & Venter, Using Multi-Dimensional Credibility to Estimate Class Frequency Vectors in Workers Compensation (ASTIN Bulletin 38(1), 2008), abstract, §2, PDF pp.1-2, 7-11, sha256:ce50d8a0fbc395621d29dd153836b0303a269d94697bb1932b5f334b47ebba18 — https://www.casact.org/sites/default/files/2021-03/8_Couret_Venter.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/High Dimensional Variables.md
---

A **High Dimensional Variable** is a categorical rating variable with so many levels that most levels have too little data to be estimated reliably on their own. The standard cases are hundreds or thousands of [[Territorial Rating|territories]], tens of thousands of [[Vehicle Make and Model|vehicle make, model and year]] combinations, and hundreds of [[Workers Compensation Classification|workers compensation class codes]].

Dummy-coded straight into a [[Generalized Linear Model|GLM]], such a variable either fails to fit or gives every thin level full credibility. A GLM gives each level the estimate that best fits its own data, whatever the volume, so thin levels get extreme coefficients with wide standard errors. The levels use up degrees of freedom, and a new level (a new vehicle model, a new class) has no coefficient at all. Merging levels crudely throws signal away.

## Grouping the levels

Levels can be grouped by banding their indicated relativities or by clustering them on loss characteristics. Workers compensation classes are grouped into hazard groups this way for excess pricing. Grouping on the response itself overfits unless it is checked on holdout data.

## Modelling the level's characteristics

The level's identity can be replaced with its characteristics: a vehicle's weight, price and safety features, or a territory's density and weather. A model on characteristics extends to thin and brand-new levels.

## Shrinkage toward a complement

Each level's own indication can be credibility-weighted with a complement. The relativity for level $j$ is then

> $$\hat{R}_j = Z_j\,\bar{R}_j + (1 - Z_j)\,C_j$$

- $\bar{R}_j$ is level $j$'s own indicated relativity, net of the other rating variables.
- $C_j$ is its complement: the grand mean, or better, a prediction built from the level's characteristics.
- $Z_j$ is the credibility of level $j$.

In [[Bühlmann-Straub Credibility|Bühlmann-Straub credibility]], the credibility is

> $$Z_j = \frac{E_j}{E_j + K}$$

- $E_j$ is the level's exposure.
- $K$ is the expected process variance divided by the variance of the hypothetical means.

> [!example]- What is each territory's credibility-weighted relativity? {Example}
> Two territories each show an indicated relativity of $1.36$ against a statewide complement of $1.00$. Territory 1 has $500$ exposures and Territory 2 has $18{,}000$. The credibility constant is $K = 2{,}000$.
>
> > [!answer]-
> > - Territory 1's credibility is $Z_1 = 500/(500 + 2{,}000) = 0.20$.
> > - Its relativity is $\hat{R}_1 = 0.20(1.36) + 0.80(1.00) = 1.072$.
> > - Territory 2's credibility is $Z_2 = 18{,}000/(18{,}000 + 2{,}000) = 0.90$.
> > - Its relativity is $\hat{R}_2 = 0.90(1.36) + 0.10(1.00) = 1.324$.
> > - A plain GLM would charge both territories $1.36$. Shrinkage keeps 90% of the large territory's indication but only 20% of the small one's, where a $+36\%$ reading on 500 exposures could easily be noise.

A GLMM treats the variable as a [[Random Effects|random effect]]. The [[Generalized Linear Models for Insurance Rating (Goldburd et al. - 2020)|GLM monograph]] notes that its estimates land between the GLM's full-credibility value and the grand mean, as in Bühlmann-Straub. Elastic net and ridge penalties ([[Regularization]]) shrink in a similar way.

## Ridge regression as credibility

[[Penalized Regression and Lasso Credibility (Holmes and Casotto - 2025)|Holmes and Casotto]] show that the ridge penalty is [[Bühlmann Credibility|Bühlmann credibility]] in another form. Take one categorical feature (a workers compensation class code), a normal distribution with the identity link, and as the target each observation's deviation from the grand average, $y_i = Y_i - \bar{Y}$. The ridge estimate for level $j$ is

> $$\hat{\beta}_j = \frac{n_j}{n_j + \lambda}\,\bar{y}_j$$

- $n_j$ is the number of observations in level $j$.
- $\bar{y}_j$ is the average deviation in level $j$.
- $\lambda$ is the ridge penalty.

This is the Bühlmann estimator, with $\lambda$ in the place of Bühlmann's $k = \sigma^2/\tau^2$, the within-class variance over the between-class variance. The fewer the observations in a level, the more its coefficient is shrunk toward zero, that is, toward the grand average. The unpenalized GLM ($\lambda = 0$) returns $\bar{y}_j$ itself, full credibility.

## A separate model entered as an offset

This is the GLM monograph's approach for territories. A standalone territory model (for example, spatial smoothing) supplies loss costs, which enter the classification GLM as an [[Offset Variable|offset]]. The territory model is in turn offset for the class plan, and the two are iterated toward convergence.

> [!example]- Should a personal auto GLM take ZIP code, with $2{,}400$ levels, as an ordinary categorical variable? {Example}
> - No. There would be $2{,}399$ parameters, most of them estimated from a handful of claims and each given full credibility, so the relativities for small ZIPs are mostly noise.
> - The fit may not converge or may be unstable, and ZIPs with no data in the training period get no estimate.
> - Collapsing the ZIPs to a few groups instead would discard much of the real geographic signal.
> - A territory model built separately, smoothing loss costs spatially and using ZIP characteristics, lets neighbours and similar areas lend each other credibility.
> - Its indicated loss cost enters the classification GLM as an offset, so the class variables are fitted net of geography and cannot proxy for it.

## Multi-dimensional credibility

Couret and Venter estimate each workers compensation class's vector of claim frequencies by injury type with multi-dimensional credibility, so each injury type's estimate draws on the class's other injury counts. On holdout data this added information beyond the standard seven hazard groups.
