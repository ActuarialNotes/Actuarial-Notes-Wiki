---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:91ac8d2ebde11eec168e5ef02c3939a9ef52ec67da0e77885ba6cde404258890
  sources:
    - "Shapland, Using the ODP Bootstrap Model: A Practitioner's Guide (CAS Monograph No. 4, 2016), §4.1 eq. 4.1-4.3 and §4.1.1 (PDF pp.28-30), §4.2 (PDF p.31), §4.5 (PDF pp.32-33), §4.7-4.7.2 (PDF pp.35-37), §5.5.1 (PDF pp.49-50); printed = PDF - 8, sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/ODP Bootstrap Model.md
---

The **ODP Bootstrap Model** is the simulation model of an [[Unpaid Claim Distribution|unpaid claim distribution]] that [[Using the ODP Bootstrap Model (Shapland - 2016)|Shapland (2016)]] sets out. It fits the [[Over-Dispersed Poisson Model|over-dispersed Poisson]] model to a triangle of incremental losses, resamples its [[Pearson Residual|Pearson residuals]] with replacement into thousands of pseudo triangles, re-runs the [[Chain Ladder Method|chain ladder]] on each and adds process variance to every projected future payment. The result is a distribution of possible outcomes rather than a point estimate.

Each cell of a pseudo triangle, its pseudo value, is

> $$q^{*}(w,d) = r^{*}\sqrt{m_{w,d}} + m_{w,d}$$

- $m_{w,d}$ is the fitted incremental loss of accident year $w$ at development age $d$.
- $r^*$ is a residual sampled from the pool.

Each future incremental value projected from a pseudo triangle is drawn as

> $$q_{\text{future}}(w,d) \sim \mathrm{Gamma}\left(m^{*}_{w,d},\ \phi\, m^{*}_{w,d}\right)$$

- $m^*_{w,d}$ is the future incremental value projected from the pseudo triangle, the [[Gamma|gamma]]'s mean.
- $\phi\, m^*_{w,d}$ is its variance, where $\phi$ is the scale parameter.

## The algorithm

1. **Fit.** Compute volume-weighted factors and divide the latest diagonal backwards to get the fitted incremental values. This equals the ODP GLM fit without solving the GLM, and Shapland calls it the "simplified GLM".
2. **Residuals.** Compute the unscaled Pearson residuals, the scale parameter $\phi = \sum r^2/(N-p)$ with $p = 2n - 1$, and the standardized residuals from the [[Hat Matrix|hat matrix]]. The zero residuals in the two corners are left out of the pool.
3. **Resample.** In each iteration, sample a residual for every cell, form the pseudo triangle, cumulate it and recompute the factors. Project the future incremental values from the pseudo triangle's own diagonal. The spread of these projections across iterations is the [[Parameter Risk|parameter variance]].
4. **Process variance.** Draw each future incremental value from the gamma above, and sum the draws by accident year and in total. Shapland's examples run 10,000 iterations.

In step 2, $N$ is the number of cells in the triangle and $n$ the number of accident years.

> [!example]- What is this bootstrap iteration's reserve, before process variance? {Example}
> A $4 \times 4$ triangle of incremental losses ($\$000$s) has these ODP fitted values, from factors 1.58788, 1.17059 and 1.05263, and a chain ladder reserve of 1,780.3:
>
> | AY | 1 | 2 | 3 | 4 |
> | :--- | ---: | ---: | ---: | ---: |
> | 1 | 1,022.2 | 600.9 | 276.9 | 100.0 |
> | 2 | 1,119.0 | 657.9 | 303.1 | |
> | 3 | 1,158.8 | 681.2 | | |
> | 4 | 1,300.0 | | | |
>
> One iteration draws these standardized residuals from the pool, cell by cell:
>
> | AY | 1 | 2 | 3 | 4 |
> | :--- | ---: | ---: | ---: | ---: |
> | 1 | 2.472 | -2.471 | -2.079 | -1.260 |
> | 2 | -1.260 | -1.059 | 2.472 | |
> | 3 | -0.055 | 2.471 | | |
> | 4 | 2.079 | | | |
>
> > [!answer]-
> > - Cell $(1,1)$'s pseudo value is $2.472\sqrt{1{,}022.2} + 1{,}022.2 = 1{,}101.2$, and the other cells follow the same way.
> > - The corner cells get a sampled residual too. Only the pool excludes their zero residuals.
> >
> > | AY | 1 | 2 | 3 | 4 |
> > | :--- | ---: | ---: | ---: | ---: |
> > | 1 | 1,101.2 | 540.3 | 242.3 | 87.4 |
> > | 2 | 1,076.9 | 630.7 | 346.1 | |
> > | 3 | 1,156.9 | 745.7 | | |
> > | 4 | 1,375.0 | | | |
> >
> > - Cumulated, the pseudo diagonal is 1,971.2, 2,053.7, 1,902.6 and 1,375.0.
> > - The first factor is $5{,}251.7/3{,}335.0 = 1.5747$.
> > - The second is $3{,}937.5/3{,}349.1 = 1.1757$, and the third is $1{,}971.2/1{,}883.8 = 1.0464$.
> > - AY 2 projects $2{,}053.7 \times 0.0464 = 95.3$.
> > - AY 3 projects $1{,}902.6 \times 0.1757 = 334.3$ and then 103.8, a total of 438.1.
> > - AY 4 projects $1{,}375.0 \times (1.5747 \times 1.1757 \times 1.0464 - 1) = 1{,}288.8$, of which 790.2 is in its second period.
> > - This iteration's reserve is $95.3 + 438.1 + 1{,}288.8 = 1{,}822.2$, against 1,780.3 from the data itself.

## Assumptions

The model inherits the chain ladder's two: each accident year has the same development factors, and each has its own level, its latest cumulative value. The residuals must be independent and identically distributed, but need not be normal, so their skewness flows into the simulation ("semi-parametric"). Accident years are independent, so the total's coefficient of variation should be lower than any single year's.

## Practical adjustments

Shapland's Section 4 adjusts for negative incremental values, a non-zero mean of the residuals, $L$-year average factors, missing values, outliers and [[Heteroscedasticity|heteroscedasticity]]. It covers heteroecthesious data (partial first or last periods), exposure adjustment, a stochastic [[Tail Factor|tail factor]] and a parametric bootstrap from a distribution fitted to the residuals.

Negative incremental values use $\sqrt{|m|}$ in the pseudo value. A negative future mean is simulated as $-\mathrm{Gamma}$ or as $\mathrm{Gamma} + 2m$. When a whole development column sums negative, the GLM has no solution even with Shapland's modified log link, which takes $-\ln|q|$ for a negative value. Subtract the largest negative value $\psi$ from every incremental value so they are all positive, fit the GLM to the shifted triangle, then add $\psi$ back to each fitted value, which reduces it by $|\psi|$. Negative values in the early cells of a pseudo triangle can make a factor explode. The remedies there are to remove the extreme iterations, recalibrate the model, or floor the incremental values at zero.

> [!example]- How is a future cell with a mean of $-12.0$ simulated, with $\phi = 3.720$? {Example}
> - A gamma needs positive parameters, so work with $|m| = 12.0$.
> - Its variance is $3.720 \times 12.0 = 44.6$, its standard deviation 6.68 and its shape $12.0/3.720 = 3.23$.
> - Its skewness is $2/\sqrt{3.23} = 1.11$.
> - Shapland's first option, $q = -\mathrm{Gamma}(12.0,\ 44.6)$, has mean $-12.0$ and skewness $-1.11$, a long tail of large recoveries.
> - The second, $q = \mathrm{Gamma}(12.0,\ 44.6) - 24.0$, has the same mean and standard deviation and keeps the right skew of $+1.11$.
> - Shapland finds the second the more logical choice, because right skew is the usual direction for claims.

An average of the residuals far from zero questions the model's fit. If it is close to zero and a zero average is wanted, add a single constant to all the non-zero residuals so that the shifted residuals sum to zero. An outlier is removed and treated as a missing value, or excluded from the average factors (numerator, denominator or both) and from the residuals while its cell is still resampled. The second removes its extreme effect but keeps a non-extreme variability in that cell. Skewed residuals are expected, so outliers are removed with caution and only once the data behind them is understood. An accident year with sparse data and negative incremental values, such as the first year the product was written, can be removed from the triangle if it causes extreme results and does not improve the model's parameterization.

## Variants

An incurred triangle gives outcomes of IBNR, not unpaid, and each iteration's ultimates are converted to payments with a parallel paid model's random pattern. [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] and [[Cape Cod Method|Cape Cod]] versions steady the most recent years. The *GLM bootstrap* fits fewer parameters, including [[Calendar Year Effect|calendar-year]] trends.

## Using the output

Diagnostics are residual graphs, a normality test, box-whisker outliers and a review of the output. Standard errors should rise from old to recent years, because they follow the size of the mean unpaid, which grows from the oldest accident year, typically with only a few incremental payments left, to the most recent. CoVs should fall from old to recent years. A CoV that turns up again for the latest year points to parameter uncertainty or a need for BF or Cape Cod.

Several models are weighted by accident year into a best-estimate distribution, which is Shapland's answer to [[Model Risk|model risk]] and a basis for a [[Range of Indications|range]]. Segments are [[Correlation|correlated]] by location mapping or re-sorting. On artificial data built to satisfy each model's assumptions, the true outcome exceeded the ODP bootstrap's 99th percentile 2.6–3.1% of the time, against 8–13% for the [[Mack Chain Ladder Model|Mack]] model. See also [[Bootstrap]] and [[Stochastic Reserving]].

> [!trap] Leaving the corner cells out of the pseudo triangle
> The two corner cells have zero residuals, so those residuals are left out of the pool. The cells themselves still get a sampled residual in every iteration, like every other cell of the triangle.
