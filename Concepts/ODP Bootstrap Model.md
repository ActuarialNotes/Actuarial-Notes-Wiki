---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:aae80f3bcfa57ae13c50baed1ed97eecd1d700e3446e01598e0fc2461f9d293c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/ODP Bootstrap Model.md
---

**ODP Bootstrap Model** is the simulation model of an [[Unpaid Claim Distribution|unpaid claim distribution]] that [[Using the ODP Bootstrap Model (Shapland - 2016)|Shapland (2016)]] sets out. It fits the [[Over-Dispersed Poisson Model|over-dispersed Poisson]] model to a triangle of incremental losses and resamples its [[Pearson Residual|Pearson residuals]] with replacement into thousands of pseudo triangles. It re-runs the [[Chain Ladder Method|chain ladder]] on each and adds process variance to every projected future payment. The result is a distribution of possible outcomes rather than a point estimate.

> $$q^{*}(w,d) = r^{*}\sqrt{m_{w,d}} + m_{w,d}$$

> $$q_{\text{future}}(w,d) \sim \mathrm{Gamma}\left(m^{*}_{w,d},\ \phi\, m^{*}_{w,d}\right)$$

- $m_{w,d}$ is the fitted incremental loss, $r^*$ a residual sampled from the pool, and $q^*$ the pseudo value. In the second block $m^*_{w,d}$ is a future incremental value projected from a pseudo triangle, drawn from a [[Gamma|gamma]] with that mean and variance $\phi\, m^*_{w,d}$, where $\phi$ is the scale parameter.
- **The algorithm.**
  - *Fit.* Compute volume-weighted factors and divide the latest diagonal backwards to get the fitted incremental values. This equals the ODP GLM fit without solving the GLM; Shapland calls it the "simplified GLM".
  - *Residuals.* Compute the unscaled Pearson residuals, the scale parameter $\phi = \sum r^2/(N-p)$ with $p = 2n - 1$, and the standardized residuals from the [[Hat Matrix|hat matrix]]. The zero residuals in the two corners are left out of the pool.
  - *Resample.* In each iteration, sample a residual for every cell, form the pseudo triangle, cumulate it and recompute the factors. Project the future incremental values from the pseudo triangle's own diagonal. The spread of these projections across iterations is the [[Parameter Risk|parameter variance]].
  - *Process variance.* Draw each future incremental value from the gamma above, and sum the draws by accident year and in total. Shapland's examples run $10{,}000$ iterations.
- **Assumptions.** The model inherits the chain ladder's two: each accident year has the same development factors, and each has its own level, its latest cumulative value. The residuals must be independent and identically distributed, but need not be normal, so their skewness flows into the simulation ("semi-parametric"). Accident years are independent, so the total's coefficient of variation should be lower than any single year's.
- **Practical adjustments** (Shapland's Section 4). Negative incremental values use $\sqrt{|m|}$, and a negative future mean is simulated as $-\mathrm{Gamma}$ or as $\mathrm{Gamma} + 2m$. The section also adjusts for a non-zero mean of the residuals, $L$-year average factors, missing values, outliers and [[Heteroscedasticity|heteroscedasticity]]. It covers heteroecthesious data (partial first or last periods), exposure adjustment, a stochastic [[Tail Factor|tail factor]] and a parametric bootstrap from a distribution fitted to the residuals.
- **Variants.** An incurred triangle gives outcomes of IBNR, not unpaid; each iteration's ultimates are converted to payments with a parallel paid model's random pattern. [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] and [[Cape Cod Method|Cape Cod]] versions steady the most recent years, and the *GLM bootstrap* fits fewer parameters, including [[Calendar Year Effect|calendar-year]] trends.
- **Using the output.** Diagnostics are residual graphs, a normality test, box-whisker outliers and a review of the output. Standard errors should rise and CoVs fall from old to recent years; a CoV that turns up again for the latest year points to parameter uncertainty or a need for BF or Cape Cod. Several models are weighted by accident year into a best-estimate distribution, which is Shapland's answer to [[Model Risk|model risk]] and a basis for a [[Range of Indications|range]]. Segments are [[Correlation|correlated]] by location mapping or re-sorting.
- **Tested.** On artificial data built to satisfy each model's assumptions, the true outcome exceeded the ODP bootstrap's 99th percentile $2.6$–$3.1\%$ of the time, against $8$–$13\%$ for the [[Mack Chain Ladder Model|Mack]] model. See also [[Bootstrap]] and [[Stochastic Reserving]].

> [!example]- One Bootstrap Iteration {Example}
> A $4 \times 4$ triangle of incremental losses (\$000s) has these ODP fitted values (from factors $1.58788$, $1.17059$ and $1.05263$) and a chain ladder reserve of $1{,}780.3$:
>
> | AY | 1 | 2 | 3 | 4 |
> |---|---|---|---|---|
> | 1 | $1{,}022.2$ | $600.9$ | $276.9$ | $100.0$ |
> | 2 | $1{,}119.0$ | $657.9$ | $303.1$ | |
> | 3 | $1{,}158.8$ | $681.2$ | | |
> | 4 | $1{,}300.0$ | | | |
>
> Its eight non-zero standardized residuals are $-1.260$, $-1.059$, $2.471$, $-0.055$, $2.472$, $-2.471$, $2.079$ and $-2.079$. One iteration draws, cell by cell:
>
> | AY | 1 | 2 | 3 | 4 |
> |---|---|---|---|---|
> | 1 | $2.472$ | $-2.471$ | $-2.079$ | $-1.260$ |
> | 2 | $-1.260$ | $-1.059$ | $2.472$ | |
> | 3 | $-0.055$ | $2.471$ | | |
> | 4 | $2.079$ | | | |
>
> Build the pseudo triangle and find this iteration's reserve, before process variance.
>
> > [!answer]-
> > **Pseudo values** $q^* = r^*\sqrt{m} + m$. For cell $(1,1)$ that is $2.472\sqrt{1{,}022.2} + 1{,}022.2 = 79.0 + 1{,}022.2 = 1{,}101.2$.
> >
> > | AY | 1 | 2 | 3 | 4 |
> > |---|---|---|---|---|
> > | 1 | $1{,}101.2$ | $540.3$ | $242.3$ | $87.4$ |
> > | 2 | $1{,}076.9$ | $630.7$ | $346.1$ | |
> > | 3 | $1{,}156.9$ | $745.7$ | | |
> > | 4 | $1{,}375.0$ | | | |
> >
> > The corner cells get a sampled residual too. Only the *pool* excludes their zero residuals.
> >
> > **Cumulate and refit.** The cumulative diagonal is $1{,}971.2$, $2{,}053.7$, $1{,}902.6$ and $1{,}375.0$.
> >
> > $$
> > \begin{align*}
> > f_1^* &= \frac{1{,}641.5 + 1{,}707.6 + 1{,}902.6}{1{,}101.2 + 1{,}076.9 + 1{,}156.9} \\
> > &= \frac{5{,}251.7}{3{,}335.0} \\
> > &= 1.5747 \\
> > f_2^* &= \frac{1{,}883.8 + 2{,}053.7}{1{,}641.5 + 1{,}707.6} \\
> > &= 1.1757 \\
> > f_3^* &= \frac{1{,}971.2}{1{,}883.8} \\
> > &= 1.0464
> > \end{align*}
> > $$
> >
> > **Project from the pseudo diagonal.** AY 2 gives $2{,}053.7 \times 0.0464 = 95.3$. AY 3 gives $1{,}902.6 \times 0.1757 = 334.3$ and then $103.8$, a total of $438.1$. AY 4 gives $1{,}375.0 \times 0.5747 = 790.2$ in its second period, and $1{,}375.0 \times (1.5747 \times 1.1757 \times 1.0464 - 1) = 1{,}288.8$ in total.
> >
> > $$
> > \begin{align*}
> > R^* &= 95.3 + 438.1 + 1{,}288.8 \\
> > &= 1{,}822.2
> > \end{align*}
> > $$
> >
> > This iteration's point estimate is $1{,}822.2$, against $1{,}780.3$ from the data itself. Thousands of such iterations spread out the parameter variance. The gamma draws of the next example then add process variance to each future cell.

> [!example]- Adding Process Variance, Including a Negative Mean {Example}
> With $\phi = 3.720$ (\$000s), the iteration above projects a mean of $790.2$ for AY 4's second period. In another iteration an old accident year's final cell has a negative mean of $-12.0$, from a factor below $1.00$. Specify the gamma draws for both cells.
>
> > [!answer]-
> > **Positive mean.** A gamma with mean $790.2$ and variance $3.720 \times 790.2 = 2{,}939.5$ has shape $790.2/3.720 = 212.4$ and scale $3.720$. Its standard deviation is $54.2$, and it is nearly symmetric.
> >
> > **Negative mean.** A gamma needs positive parameters, so work with $|m| = 12.0$: variance $3.720 \times 12.0 = 44.6$, standard deviation $6.68$, shape $12.0/3.720 = 3.23$. Its skewness is $2/\sqrt{3.23} = 1.11$. Shapland gives two options:
> >
> > $$
> > \begin{align*}
> > \text{(4.6)}\quad q &= -\,\mathrm{Gamma}(12.0,\ 44.6) \\
> > \text{(4.7)}\quad q &= \mathrm{Gamma}(12.0,\ 44.6) + 2(-12.0)
> > \end{align*}
> > $$
> >
> > Both have mean $-12.0$ and standard deviation $6.68$. The first flips the gamma, so its skewness is $-1.11$: a long tail of large *recoveries*. The second shifts it and keeps the right skew of $+1.11$, the usual direction for claims, which Shapland finds the more logical choice.
> >
> > Negative values in the *early* cells of a pseudo triangle are a different problem. They can make a factor explode. The remedies there are to remove the extreme iterations, recalibrate the model, or floor the incremental values at zero.

> [!example]- Weighting Two Models as a Mixture {Example}
> For one accident year, a paid chain ladder bootstrap gives unpaid with mean $4{,}000$ and standard deviation $1{,}000$. A paid Bornhuetter-Ferguson bootstrap gives mean $3{,}600$ and standard deviation $600$. The actuary weights them $25\%$ and $75\%$. Using independent random variables, each iteration picks one model at random with those probabilities. Find the mean and standard deviation of the weighted result.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[R] &= 0.25(4{,}000) + 0.75(3{,}600) \\
> > &= 3{,}700 \\
> > E[R^2] &= 0.25(1{,}000^2 + 4{,}000^2) + 0.75(600^2 + 3{,}600^2) \\
> > &= 4{,}250{,}000 + 9{,}990{,}000 \\
> > &= 14{,}240{,}000 \\
> > \mathrm{Var}(R) &= 14{,}240{,}000 - 3{,}700^2 \\
> > &= 550{,}000 \\
> > \mathrm{SD}(R) &= 741.6
> > \end{align*}
> > $$
> >
> > The CoV is $741.6/3{,}700 = 20.0\%$. The variance splits into the models' own variances, $0.25(1{,}000{,}000) + 0.75(360{,}000) = 520{,}000$, plus $30{,}000$ for the difference between their means.
> >
> > Shapland's other method runs both models on the *same* random variables and weights each iteration's values. That gives the same mean, but a standard deviation of at most $0.25(1{,}000) + 0.75(600) = 700$, reached only if the two models move in lockstep. The mixture is wider because it keeps the disagreement between the models as part of the uncertainty.
