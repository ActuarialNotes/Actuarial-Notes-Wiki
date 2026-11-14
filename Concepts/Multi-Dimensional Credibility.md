---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:126467dd0c6af49e30dc006335b7a40aa2f5a4a381bd2ebf2439701afa870685
  sources:
    - "Couret & Venter, Using Multi-Dimensional Credibility to Estimate Class Frequency Vectors in Workers Compensation (ASTIN Bulletin 38(1), 2008), pp.75-83 (PDF pp.3-11), eqs (1)-(4), Tables C-D, sha256:ce50d8a0fbc395621d29dd153836b0303a269d94697bb1932b5f334b47ebba18 — https://www.casact.org/sites/default/files/2021-03/8_Couret_Venter.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Multi-Dimensional Credibility.md
---

**Multi-Dimensional Credibility** estimates several related means of one risk at once, each as a linear function of the risk's sample means for *all* of them, so that the correlation between them improves the estimate of each. Couret and Venter's case is a [[Workers Compensation Classification|workers compensation class]]'s vector of claim frequencies by injury type.

For class $i$ of a hazard group, the estimate of its permanent total (PT) ratio is

> $$\begin{aligned} \hat w_i = \mathrm{E}w_i &+ b(V_i - \mathrm{E}V_i) + c(W_i - \mathrm{E}W_i) \\ &+ d(X_i - \mathrm{E}X_i) + e(Y_i - \mathrm{E}Y_i) \end{aligned}$$

- $V_i$, $W_i$, $X_i$ and $Y_i$ are class $i$'s observed ratios of fatal, permanent total, major permanent partial and minor permanent partial claim counts to temporary total (TT) claim counts.
- $w_i$ is the class's unobserved (hypothetical) mean PT ratio, and $\hat w_i$ is its estimate.
- $b$, $c$, $d$ and $e$ are the credibility coefficients.
- The expectations are over all the classes in the hazard group, so they are the hazard group's ratios.

The estimate of a class's ratio for one injury type is the hazard group's ratio for that type plus, for every injury type including the one being estimated, its coefficient times the difference between the class's and the hazard group's ratio for that type. If the class's own data gets zero credibility, the hazard group ratio is used.

> [!idea] The idea
> The same physical circumstances produce fatal, permanent total and major claims, so a class with many major claims is likely to have more fatal and permanent total claims too.

A class has too few fatal and permanent total claims for its own counts to say much, and slight differences in an accident decide which type a claim is. The estimate of each type borrows strength from the others, the way a multiple regression weighs several variables.

## Pooling the years

Each injury-type ratio for a class is its sample mean over all the years of observation, weighted by the TT claim counts. For the PT ratio it is

> $$W_i = \frac{\sum_t m_{it} W_{it}}{\sum_t m_{it}}$$

- $m_{it}$ is the class's TT claims in year $t$.
- $W_{it}$ is the class's PT ratio in year $t$.

That equals the class's total PT claims over all the years divided by its total TT claims. Each TT claim is treated as an exposure that could produce a PT claim, so the more TT claims there are, the less the observed ratio fluctuates.

> [!example]- What is this class's multi-dimensional PT ratio, and how does it compare with the single-dimensional one? {Example}
> In a hazard group the PT-to-TT ratio is 0.006 and the major-to-TT ratio is 0.080. A class had 300, 500 and 700 TT claims over three years, with 2, 1 and 3 PT claims, and its pooled major-to-TT ratio is 0.120. The credibility coefficients for the PT ratio are 0.30 on the PT deviation and 0.02 on the major deviation. The single-dimensional credibility factor, fitted on the PT ratio alone, is also 0.30.
>
> > [!answer]-
> > - The pooled PT ratio is total PT claims over total TT claims, $6/1{,}500 = 0.0040$.
> > - The PT deviation adds $0.30 \times (0.0040 - 0.006) = -0.0006$.
> > - The major deviation adds $0.02 \times (0.120 - 0.080) = 0.0008$.
> > - The multi-dimensional estimate is $0.006 - 0.0006 + 0.0008 = 0.0062$.
> > - The single-dimensional estimate uses only the PT deviation, $0.006 - 0.0006 = 0.0054$.
> > - The multi-dimensional estimate is above the hazard group's, though the class's own PT ratio is below it, because its major ratio is 50% above the hazard group's.

## The coefficients

The coefficients $b$, $c$, $d$ and $e$ minimise the expected squared error $\mathrm{E}[(a + bV_i + cW_i + dX_i + eY_i - w_i)^2]$ across the classes of the hazard group. They solve a linear system whose matrix $C$ is the covariance matrix of the class sample means and whose right-hand side is each type's covariance with $w_i$:

- $\mathrm{Cov}(W_i, w_i)$ is the [[Variance of Hypothetical Means|VHM]] of $W$.
- The other types' covariances with $w_i$ are their sample covariances with $W_i$.
- The diagonal of $C$ for class $i$ is $\mathrm{EPV}/m_i + \mathrm{VHM}$ for each type.

The coefficient on the type's own deviation, $c$, is the traditional credibility factor $Z$. Using only the class's own sample mean, the estimator is $cW_i + (1 - c)\mathrm{E}W_i$, which is [[Bühlmann Credibility]]. Because the estimate uses the deviations of all the types, a positive coefficient times a class's positive deviation in another type raises the estimate above the hazard group's ratio. That can outweigh a negative deviation in the type being estimated, putting the multi-dimensional estimate above the single-dimensional one.

## Testing on a holdout

Couret and Venter calculated injury-type relativities from the even reports (2, 4 and 6) and used them to predict the [[Holdout Sample|hold-out sample]] of the odd reports (3, 5 and 7). The sum of squared prediction errors (SSE) is the sum of the squared differences between the predictions and the holdout values, and the predictor with the lower SSE is the better one. The predictions are compared with the holdout, not with the even-year data they were estimated from, which already contains the random noise that credibility is meant to discount.

On individual classes the credibility procedure yields only a modest reduction in the SSE. The individual class-state ratios are quite volatile and the holdout is only a proxy for the true mean, so improving the estimates of the means might produce only a small improvement in the total sum of squared errors.

## The quintiles test

The classes in a hazard group are ranked by their credibility-weighted relativity from the even years and grouped into five quintiles with about equal numbers of TT claims. Each quintile's holdout relativity to the hazard group is then predicted three ways, and the SSE of each set of predictions across the quintiles is compared:

1. The hazard-group average, 1.00 for every quintile.
2. The raw even-year relativity.
3. The credibility procedure.

Grouping classes into quintiles diversifies away most of the class-specific random variation, as portfolios do in tests of the CAPM, so the test can show an improvement that the noisy single-class comparison cannot.

The hazard-group prediction, which gives the class data no credibility, is too high for the low quintiles and too low for the high ones. The raw even-year prediction, which gives it full credibility, slopes upward too steeply, because the odd years regress toward the mean. Predictions that are too flat stay too close to the hazard-group average, and the ratio of predicted to holdout relativity falls from the first quintile to the fifth. That means the credibility is understated. Predictions that are too steep are too extreme, like the raw data, and that ratio rises across the quintiles. That means the credibility is overstated.

> [!example]- Which procedure predicts these quintiles better, and is each one's credibility overstated or understated? {Example}
> A hazard group's classes are sorted into quintiles.
>
> | Quintile | 1 | 2 | 3 | 4 | 5 |
> | :--- | ---: | ---: | ---: | ---: | ---: |
> | Holdout PT relativity | 0.60 | 0.85 | 1.00 | 1.15 | 1.40 |
> | Procedure A | 0.80 | 0.92 | 1.00 | 1.08 | 1.20 |
> | Procedure B | 0.45 | 0.80 | 1.00 | 1.20 | 1.60 |
>
> > [!answer]-
> > - Procedure A's SSE is $0.2^2 + 0.07^2 + 0 + 0.07^2 + 0.2^2 = 0.0898$.
> > - Procedure B's SSE is $0.15^2 + 0.05^2 + 0 + 0.05^2 + 0.2^2 = 0.0675$.
> > - The hazard-group average's SSE is $0.4^2 + 0.15^2 + 0 + 0.15^2 + 0.4^2 = 0.3650$.
> > - B has the lower SSE, and both beat the hazard-group average.
> > - A is too flat. Its predicted-to-holdout ratio falls from 1.33 to 0.86 across the quintiles, so A's credibility is understated.
> > - B is too steep. Its ratio rises from 0.75 to 1.14, so B's credibility is overstated.

> [!trap] Averaging the annual ratios
> Pool the counts, total claims of the type over total TT claims, rather than averaging each year's ratio. In the first example the average of the three annual PT ratios is 0.0043, not 0.0040, because it gives the small year as much weight as the large one.
