---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:8e615d76417fb728460c5c6986f7b43fc300f2e2123e31a67c78cdebc77c357a
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R (2nd ed., Springer 2021), §7.6 'Local Regression', Algorithm 7.1, eq (7.14), Figs 7.9-7.10, printed pp.304-307 (PDF pp.312-315); §7.7.1 two-dimensional smoothers for f_jk, printed p.310 (PDF p.318), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list p.6 (James et al. Chapters 5, 6 and 7 assigned to tasks C1-C9), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Local Regression.md
---

**Local regression** fits a flexible non-linear function point by point. To get the fit at a target point $x_0$, it uses only the training observations near $x_0$, in a weighted least squares regression whose weights fall to zero with distance from $x_0$.

> $$s = \frac{k}{n}$$
>
> $$\sum_{i=1}^{n} K_{i0}\,(y_i - \beta_0 - \beta_1 x_i)^2$$
>
> $$\hat f(x_0) = \hat\beta_0 + \hat\beta_1 x_0$$

- **The algorithm at $X = x_0$:**
  1. Gather the fraction $s = k/n$ of training points whose $x_i$ are closest to $x_0$.
  2. Give each point in this neighborhood a weight $K_{i0} = K(x_i, x_0)$. The point furthest from $x_0$ gets weight zero and the closest gets the highest weight. Every point outside the $k$ nearest neighbors also gets weight zero.
  3. Fit a weighted least squares regression of $y_i$ on $x_i$ by finding the $\hat\beta_0$ and $\hat\beta_1$ that minimize the weighted sum above.
  4. The fitted value is $\hat f(x_0) = \hat\beta_0 + \hat\beta_1 x_0$.
- **A new fit at every target point.** The weights $K_{i0}$ change with $x_0$, so each prediction needs its own weighted regression. Local regression is a *memory-based* procedure: like nearest neighbors (see [[K-Nearest Neighbors]]), it needs all the training data every time it makes a prediction.
- **The span matters most.** You also choose the weighting function $K$, and whether step 3 fits a constant, a line (as above) or a quadratic. The most important choice, though, is the span $s$. It plays the role that $\lambda$ plays for a [[Smoothing Spline]]. The smaller $s$ is, the more local and wiggly the fit. A very large $s$ gives a global fit that uses all the training observations. Choose $s$ by [[Cross-Validation]] or set it directly. On ISLR's Wage data, a span of $0.2$ gave $16.4$ degrees of freedom and a span of $0.7$ gave $5.3$.
- **Generalizations.** A multiple regression can be global in some variables but local in one, such as time. These *varying coefficient models* help a model adapt to the most recent data. Local regression extends naturally to two-dimensional neighborhoods in $X_1$ and $X_2$. But it can perform poorly when $p$ is much larger than about 3 or 4, because few training observations will be close to $x_0$. Nearest-neighbors regression has the same problem.
- Local regression can serve as one building block of a [[Generalized Additive Model]]. A two-dimensional local regression can also fit an interaction function $f_{jk}(X_j, X_k)$ there.

> [!example]- A Local Linear Fit at One Target Point {Example}
> Claim frequency (per 100 drivers) is smoothed against driver age for $n = 50$ age groups, using a local linear regression with span $s = 0.1$. To estimate frequency at $x_0 = 40$, the neighborhood and the weights assigned by the weighting function are:
>
> | Age $x_i$ | 36 | 38 | 41 | 43 | 45 |
> |---|---|---|---|---|---|
> | Frequency $y_i$ | 6.0 | 5.6 | 5.0 | 4.9 | 4.0 |
> | Weight $K_{i0}$ | 0.1 | 0.7 | 0.9 | 0.4 | 0 |
>
> Confirm the size of the neighborhood, then find $\hat f(40)$.
>
> > [!answer]-
> > $k = sn = 0.1(50) = 5$ points. The weights follow the rule: the closest age (41) gets the most weight, and the furthest (45) gets zero.
> >
> > Minimizing $\sum K_{i0}(y_i - \beta_0 - \beta_1 x_i)^2$ is a least squares fit with weights. Its solution centres on the weighted means, where $\sum K_{i0} = 2.1$:
> > $$
> > \begin{align*}
> > \bar x_w &= \frac{3.6 + 26.6 + 36.9 + 17.2}{2.1} \\
> > &= 40.1429 \\
> > \bar y_w &= \frac{0.60 + 3.92 + 4.50 + 1.96}{2.1} \\
> > &= 5.2286
> > \end{align*}
> > $$
> > The slope is
> > $$
> > \begin{align*}
> > \hat\beta_1 &= \frac{\sum K_{i0}(x_i - \bar x_w)(y_i - \bar y_w)}{\sum K_{i0}(x_i - \bar x_w)^2} \\
> > &= \frac{-1.4286}{8.8571} \\
> > &= -0.1613
> > \end{align*}
> > $$
> > and the fit at the target is
> > $$
> > \begin{align*}
> > \hat f(40) &= \bar y_w + \hat\beta_1(40 - \bar x_w) \\
> > &= 5.2286 + (-0.1613)(-0.1429) \\
> > &= 5.25
> > \end{align*}
> > $$
> > This is about 5.25 claims per 100 drivers. To estimate age 41, you would gather a new neighborhood, assign new weights and fit again.

> [!example]- Span, Neighborhood and Wiggliness {Example}
> An actuary smooths loss ratio against policy tenure for $n = 400$ policies, trying spans $s = 0.2$ and $s = 0.7$.
>
> (a) How many observations get non-zero weight at each target point?
> (b) Which span gives the wigglier curve, and which gives more degrees of freedom?
> (c) The $s = 0.2$ curve chases local noise. What should change?
>
> > [!answer]-
> > (a) $k = sn$: $0.2(400) = 80$ neighbors for $s = 0.2$ and $0.7(400) = 280$ for $s = 0.7$. In each case the furthest neighbor gets weight zero, so slightly fewer points actually count.
> >
> > (b) $s = 0.2$. A smaller span makes each fit more local, which gives a wigglier, more flexible curve with more degrees of freedom. On ISLR's Wage data, $s = 0.2$ gave $16.4$ degrees of freedom against $5.3$ for $s = 0.7$.
> >
> > (c) Increase the span, choosing it by cross-validation. Knots and boundary constraints belong to [[Regression Spline|splines]]; local regression has none to adjust.
