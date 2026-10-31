---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:fc74473f86423e578f63f5810a91d6cb255db7fe987bb027fe73d5ca31cf7d00
  sources:
    - "Couret & Venter, Using Multi-Dimensional Credibility to Estimate Class Frequency Vectors in Workers Compensation (ASTIN Bulletin 38(1), 2008), pp.75-83 (PDF pp.3-11), eqs (1)-(4), Tables C-D, sha256:ce50d8a0fbc395621d29dd153836b0303a269d94697bb1932b5f334b47ebba18 — https://www.casact.org/sites/default/files/2021-03/8_Couret_Venter.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Multi-Dimensional Credibility.md
---

**Multi-Dimensional Credibility** estimates several related means of one risk at once — Couret and Venter's case is a [[Workers Compensation Classification|workers compensation class]]'s vector of claim frequencies by injury type — each as a linear function of the class's sample means for *all* the types, so that the correlation between the types improves the estimate of each.

> $$\hat w_i = \mathrm{E}w_i + b(V_i - \mathrm{E}V_i) + c(W_i - \mathrm{E}W_i) + d(X_i - \mathrm{E}X_i) + e(Y_i - \mathrm{E}Y_i)$$

> $$W_i = \frac{\sum_t m_{it} W_{it}}{\sum_t m_{it}} = \frac{\text{class } i\text{'s PT claims, all years}}{\text{class } i\text{'s TT claims, all years}}$$

- where $V_i$, $W_i$, $X_i$ and $Y_i$ are class $i$'s observed ratios of fatal (F), permanent total (PT), major permanent partial and minor permanent partial claim counts to temporary total (TT) claim counts; $w_i$ is the class's unobserved (hypothetical) mean PT ratio, $\hat w_i$ its estimate, and $m_{it}$ the class's TT claims in year $t$.
- **The estimator.** The estimate of a class's ratio for one injury type is the hazard group's ratio for that type plus, for every injury type including the one being estimated, its coefficient times the difference between the class's and the hazard group's ratio for that type. The expectations are over all the classes in the hazard group, so if the class's own data gets zero credibility, the hazard group ratio is used.
- **Pooling the years.** Each injury-type ratio for a class is its sample mean over all the years of observation, weighted by the TT claim counts. That equals the class's total claims of that type over all the years divided by its total TT claims. Each TT claim is treated as an exposure that could produce a PT claim, so the more TT claims there are, the less the observed ratio fluctuates.
- **The coefficients.** $b$, $c$, $d$ and $e$ minimise the expected squared error $\mathrm{E}[(a + bV_i + cW_i + dX_i + eY_i - w_i)^2]$ across the classes of the hazard group. They solve $C\,(b, c, d, e)' = (\mathrm{Cov}(V_i, w_i), \mathrm{Cov}(W_i, w_i), \mathrm{Cov}(X_i, w_i), \mathrm{Cov}(Y_i, w_i))'$, where $C$ is the covariance matrix of the class sample means. $\mathrm{Cov}(W_i, w_i)$ is the [[Variance of Hypothetical Means|VHM]] of $W$, the other types' covariances with $w_i$ are their sample covariances with $W_i$, and the diagonal of $C$ for class $i$ is $\mathrm{EPV}/m_i + \mathrm{VHM}$ for each type.
- **The single-dimension case.** $c$, the coefficient on the type's own deviation, is the traditional credibility factor $Z$. Using only the class's own sample mean, the estimator is $cW_i + (1 - c)\mathrm{E}W_i$ — [[Bühlmann Credibility]].
- **How the other types move the estimate.** Because the estimate uses the deviations of all the types, a positive coefficient times a class's positive deviation in another type raises the estimate above the hazard group's ratio. That can outweigh a negative deviation in the type being estimated, putting the multi-dimensional estimate above the single-dimensional one.
- **Testing on a holdout.** Couret and Venter calculated injury-type relativities from the even reports (2, 4 and 6) and used them to predict the [[Holdout Sample|hold-out sample]] of the odd reports (3, 5 and 7). The predictions are compared with the holdout, not with the even-year data they were estimated from. The sum of squared prediction errors (SSE) is the sum of the squared differences between the predictions and the holdout values; the predictor with the lower SSE is the better one.
- **Why single classes are a weak test.** On individual classes the credibility procedure yields only a modest reduction in the SSE. The individual class-state ratios are quite volatile and the holdout is only a proxy for the true mean, so improving the estimates of the means might produce only a small improvement in the total sum of squared errors.
- **The quintiles test.** The classes in a hazard group are ranked by their credibility-weighted relativity from the even years and grouped into five quintiles with about equal numbers of TT claims. Each quintile's holdout relativity to the hazard group is then predicted three ways — by the hazard-group average (1.00 for every quintile), by the raw even-year relativity, and by the credibility procedure — and the SSE of each set of predictions across the quintiles is compared. Grouping classes into quintiles diversifies away most of the class-specific random variation, as portfolios do in tests of the CAPM, so the test can show an improvement that the noisy single-class comparison cannot.
- **Reading the quintiles.** The hazard-group prediction, which gives the class data no credibility, is too high for the low quintiles and too low for the high ones. The raw even-year prediction, which gives it full credibility, slopes upward too steeply, because the odd years regress toward the mean. So predictions that are too flat — staying too close to the hazard-group average, with the ratio of predicted to holdout relativity falling from the first quintile to the fifth — mean the credibility is understated. Predictions that are too steep — too extreme, like the raw data, with that ratio rising across the quintiles — mean the credibility is overstated.

> [!idea] The idea
> A class has too few fatal and permanent total claims for its own counts to say much, but the same physical circumstances produce fatal, permanent total and major claims — slight differences in an accident decide which. So a class with many major claims is likely to have more fatal and permanent total claims too, and the estimate of each type borrows strength from the others, the way a multiple regression weighs several variables.

> [!example]- Estimating a Class's PT Ratio from Two Injury Types {Example}
> In a hazard group the PT-to-TT ratio is $0.006$ and the major-to-TT ratio is $0.080$. A class had $300$, $500$ and $700$ TT claims over three years, with $2$, $1$ and $3$ PT claims, and its pooled major-to-TT ratio is $0.120$. The credibility coefficients for estimating the PT ratio are $0.30$ on the PT deviation and $0.02$ on the major deviation, and the single-dimensional credibility factor, fitted on the PT ratio alone, is also $0.30$. Estimate the class's PT ratio, and compare it with the single-dimensional estimate.
>
> > [!answer]-
> > Pool the class's PT ratio over the years first, then add each type's coefficient times its deviation to the hazard group's PT ratio.
> >
> > The pooled PT ratio, total PT claims over total TT claims:
> >
> > $$W = \frac{2 + 1 + 3}{300 + 500 + 700} = 0.0040$$
> >
> > The multi-dimensional estimate:
> >
> > $$
> > \begin{align*}
> > \hat w &= 0.006 + 0.30(0.0040 - 0.006) + 0.02(0.120 - 0.080) \\
> > &= 0.006 - 0.0006 + 0.0008 \\
> > &= 0.0062
> > \end{align*}
> > $$
> >
> > The single-dimensional estimate uses only the PT deviation, with its own factor $0.30$: $0.006 - 0.0006 = 0.0054$.
> >
> > *Why is the multi-dimensional estimate above the hazard group's, when the class's own PT ratio is below it?* Its major ratio is $50\%$ above the hazard group's, and major claims arise from the same kinds of accident. Averaging the three annual ratios instead ($0.0043$) would give the small year as much weight as the large one.

> [!example]- Reading a Quintiles Test {Example}
> A hazard group's classes are sorted into quintiles. Their holdout PT relativities are $0.60, 0.85, 1.00, 1.15, 1.40$. Procedure A predicts $0.80, 0.92, 1.00, 1.08, 1.20$ and procedure B predicts $0.45, 0.80, 1.00, 1.20, 1.60$. Which predicts better, and is each one's credibility overstated or understated?
>
> > [!answer]-
> > Compare each set of predictions with the holdout by SSE, then look at the slope of the predictions against the holdout.
> >
> > $$
> > \begin{align*}
> > \text{SSE}_A &= 0.2^2 + 0.07^2 + 0 + 0.07^2 + 0.2^2 = 0.0898 \\[4pt]
> > \text{SSE}_B &= 0.15^2 + 0.05^2 + 0 + 0.05^2 + 0.2^2 = 0.0675 \\[4pt]
> > \text{SSE}_{\text{HG}} &= 0.4^2 + 0.15^2 + 0 + 0.15^2 + 0.4^2 = 0.3650
> > \end{align*}
> > $$
> >
> > - B has the lower SSE; both beat the hazard-group average.
> > - A is too flat: its predicted-to-holdout ratio falls from $1.33$ to $0.86$ across the quintiles, so A's credibility is understated.
> > - B is too steep: its ratio rises from $0.75$ to $1.14$, so B's credibility is overstated.
> >
> > *Why judge against the holdout?* The even-year data the predictions were built from already contains the random noise that credibility is meant to discount; only fresh data shows whether it was discounted by the right amount.

> [!tip]- How it appears on the exam
> - **Exam 8** gives a hazard group's (or a zone's) ratios and a class's (or a sector's), with the credibility coefficients, and asks for the multi-dimensional estimate — sometimes after pooling several years of claim counts into the ratios.
> - A follow-up asks to *explain* why the multi-dimensional estimate differs from the single-dimensional one, from the signs of the other types' deviations.
> - A quintiles-test table asks which prediction is best by SSE, whether the credibility is overstated or understated, or why quintiles are used instead of individual classes.

> [!warning]- Exam traps
> - **Leaving out the type being estimated.** The sum runs over every type, including the target type's own deviation, whose coefficient is the traditional $Z$.
> - **Averaging annual ratios.** Pool the counts — total claims of the type over total TT claims — rather than averaging each year's ratio.
> - **Reading the slope backwards.** Predictions too close to the hazard group (a falling predicted-to-actual ratio) mean understated credibility; too extreme (a rising ratio) means overstated.
> - **Scoring against the wrong data.** The SSE compares the predictions with the holdout, not with the experience period that produced them.
