---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:883e5eebfcc05f7945d3c2512829cec7664fd02109813ee04ab4a5a8f726c37d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Multi-Dimensional Credibility.md
---

**Multi-Dimensional Credibility** estimates a vector of related quantities for a class. In Couret and Venter it is a [[Workers Compensation Classification|workers compensation class]]'s claim frequencies by injury type, as ratios to temporary total (TT) claims. Each component is estimated as a linear combination of *all* the class's observed components, with weights that minimize expected squared error given how the components co-vary. A rare, unstable component such as permanent total borrows strength from correlated, more common ones such as major permanent partial.

> $$\begin{aligned} \hat{w}_i = Ew &+ b\,(V_i - EV) + c\,(W_i - EW) \\ &+ d\,(X_i - EX) + e\,(Y_i - EY) \end{aligned}$$

> $$C \begin{pmatrix} b \\ c \\ d \\ e \end{pmatrix} = \begin{pmatrix} \text{Cov}(v_i, w_i) \\ \text{VHM}_W \\ \text{Cov}(x_i, w_i) \\ \text{Cov}(y_i, w_i) \end{pmatrix}$$

> $$C_{VV} = \frac{\text{EPV}_V}{m_i} + \text{VHM}_V$$

> $$C_{VW} = \text{Cov}(v_i, w_i)$$

- $V_i$, $W_i$, $X_i$ and $Y_i$ are class $i$'s observed ratios of fatal, permanent total (PT), major and minor permanent partial claims to TT claims, pooled over the years. $v_i$, $w_i$, $x_i$ and $y_i$ are its unobserved hypothetical means, and $m_i$ is its TT claim count, which serves as the exposure. The expectations run across the classes of a hazard group, so a class whose data gets no weight falls back to the hazard group ratio. The formula shown estimates PT with weights $b$, $c$, $d$ and $e$; each other injury type gets its own set of weights.
- $C$ is the covariance matrix of the class's sample means. Its diagonal is the [[Expected Value of Process Variance|EPV]] per TT claim divided by $m_i$, plus the [[Variance of Hypothetical Means|VHM]]. Each year's ratios are the class means plus independent random draws, so the off-diagonal terms are covariances between the hypothetical means. They are estimated by the exposure-weighted sample covariance $\sum_i m_i (V_i - \bar V)(W_i - \bar W)/m$, and the VHMs and EPVs by the usual [[Empirical Bayes Credibility|empirical Bayes]] estimators, with a negative VHM set to 0.
- **In one dimension** the equations reduce to $c = \text{VHM}_W / (\text{VHM}_W + \text{EPV}_W/m_i)$, the [[Bühlmann-Straub Credibility|Bühlmann–Straub]] $Z$. Because $C$ depends on $m_i$, every class gets its own weights.
- **Why it helps.** Fatal, PT and major injuries are too rare for stable class counts, but they arise from similar physical circumstances: a slightly different accident gives a different outcome. A class with many major claims is therefore likely to have high PT and fatal propensities too. This is one answer to a [[High Dimensional Variables|high-dimensional]] class variable.
- **The holdout test.** Relativities fitted to the even report years were used to predict the odd years ([[Holdout Sample]]). Over about 16,000 state-class cells, squared error fell only modestly against hazard-group averages (major: $1{,}405.6$ against $1{,}425.0$, with raw class data at $2{,}201.7$), because single cells are volatile. Ranked into quintiles ([[Quintiles Test]]), the gain was large: for PT in hazard group D the error was $0.0105$, against $0.5618$ for the hazard group and $0.7315$ for raw data. The exception was hazard group A, which appeared homogeneous.

> [!example]- Estimating a Class's PT Ratio from Two Injury Types {Example}
> In one hazard group, the mean ratios to TT claims are $0.0060$ for PT and $0.0850$ for major permanent partial. Per TT claim, the expected process variances are $\text{EPV}_W = 0.0060$ for PT and $\text{EPV}_X = 0.0780$ for major. Across the group's classes, $\text{VHM}_W = 0.000005$, $\text{VHM}_X = 0.000370$ and $\text{Cov}(w_i, x_i) = 0.000030$.
>
> A class has $600$ TT claims, $6$ PT claims and $66$ major claims over the experience period.
>
> (a) Estimate its PT ratio from its PT experience alone.
>
> (b) Estimate it from both its PT and major experience.
>
> (c) Explain the difference.
>
> > [!answer]-
> > The observed ratios are $W_i = 6/600 = 0.0100$ and $X_i = 66/600 = 0.1100$. Work in units of $10^{-6}$. Then $\text{EPV}_W/600 = 10$, $\text{EPV}_X/600 = 130$, $\text{VHM}_W = 5$, $\text{VHM}_X = 370$ and the covariance is $30$.
> >
> > **(a)**
> >
> > $$
> > \begin{align*}
> > Z &= \frac{5}{5 + 10} \\
> > &= 0.3333 \\[4pt]
> > \hat{w}_i &= 0.0060 + 0.3333(0.0040) \\
> > &= 0.00733
> > \end{align*}
> > $$
> >
> > **(b)** The diagonal of $C$ is $5 + 10 = 15$ and $370 + 130 = 500$. The right-hand side is $(\text{VHM}_W, \text{Cov}) = (5, 30)$:
> >
> > $$
> > \begin{align*}
> > 15c + 30d &= 5 \\
> > 30c + 500d &= 30
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \det C &= 15(500) - 30^2 \\
> > &= 6{,}600 \\[4pt]
> > c &= \frac{5(500) - 30(30)}{6{,}600} \\
> > &= 0.2424 \\[4pt]
> > d &= \frac{15(30) - 30(5)}{6{,}600} \\
> > &= 0.04545
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \hat{w}_i &= 0.0060 + 0.2424(0.0040) + 0.04545(0.0250) \\
> > &= 0.0060 + 0.00097 + 0.00114 \\
> > &= 0.00811
> > \end{align*}
> > $$
> >
> > **(c)** The class's major ratio is $0.110$ against the group's $0.085$, based on eleven times as many claims as its PT ratio. Major and PT means are positively correlated: $30/\sqrt{5 \times 370} = 0.70$. So the major experience corroborates the high PT ratio and lifts the estimate from $0.00733$ to $0.00811$.
> >
> > The weight on the class's own PT ratio falls from $0.333$ to $0.242$, because the more stable major data now carries part of the signal. Had the class's major ratio equalled the group mean, the estimate would have been $0.0060 + 0.00097 = 0.00697$, below the one-dimensional answer: without that corroboration, more of the high PT count is read as noise.

> [!example]- Quintiles Test on the Holdout Years {Example}
> Classes in a hazard group are sorted by their credibility-weighted PT relativity from the even report years. They are grouped into quintiles with roughly equal TT claims. Each quintile's PT:TT ratio in the odd (holdout) years, relative to the hazard group, is compared with three predictions:
>
> | Quintile | Odd-year actual | Hazard group | Raw even-year | Credibility |
> |---|---|---|---|---|
> | 1 | $0.60$ | $1.00$ | $0.40$ | $0.65$ |
> | 2 | $0.85$ | $1.00$ | $0.70$ | $0.88$ |
> | 3 | $1.00$ | $1.00$ | $0.95$ | $0.99$ |
> | 4 | $1.15$ | $1.00$ | $1.30$ | $1.12$ |
> | 5 | $1.40$ | $1.00$ | $1.65$ | $1.36$ |
>
> (a) Compute each predictor's sum of squared prediction errors.
>
> (b) Interpret the results.
>
> (c) Over all the individual state-class cells, the credibility procedure's squared error was only slightly below the hazard group's. Why does the quintiles test tell a different story?
>
> > [!answer]-
> > **(a)**
> >
> > $$
> > \begin{align*}
> > \text{SSE}_{\text{HG}} &= 0.40^2 + 0.15^2 + 0 + 0.15^2 + 0.40^2 \\
> > &= 0.3650 \\[4pt]
> > \text{SSE}_{\text{raw}} &= 0.20^2 + 0.15^2 + 0.05^2 + 0.15^2 + 0.25^2 \\
> > &= 0.1500 \\[4pt]
> > \text{SSE}_{\text{cred}} &= 0.05^2 + 0.03^2 + 0.01^2 + 0.03^2 + 0.04^2 \\
> > &= 0.0060
> > \end{align*}
> > $$
> >
> > **(b)** The actuals rise across the quintiles, so the credibility ranking identifies real class differences in PT frequency. The hazard group average is too high for the low quintiles and too low for the high ones. The raw even-year relativities slope too steeply, because the holdout years regress toward the mean. The credibility estimates track the actuals. In $R^2$ terms they "explain" $1 - 0.0060/0.3650 = 98\%$ of the between-quintile variation, as in Couret and Venter's hazard group D.
> >
> > **(c)** A single class-state ratio is very volatile. Even a perfect estimate of each class's mean leaves most of each cell's squared error in place. The holdout is also only a proxy for the true mean, and unknown covariates and a class's changing mix of policies add noise. Grouping into quintiles averages away the cell-level noise, much as ranked portfolios did in tests of CAPM, and shows whether the estimates order and scale the classes correctly.
