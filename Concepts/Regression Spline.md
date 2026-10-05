---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:83435c14a3a05fba10766efa1945b3d637fdffdfcd2d1005375b77ca3eb796fc
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R (2nd ed., Springer 2021), §7.3-7.4 'Basis Functions' / 'Regression Splines', eqs (7.7)-(7.10) and footnotes 3-4, printed pp.294-300 (PDF pp.302-308); §7.5.1 smoothing-spline knots, printed p.302 (PDF p.310); §7.7.1 GAMs with natural splines, printed p.308 (PDF p.316), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Tibshirani, R., 'Splines' lecture notes, Advanced Methods for Data Analysis (CMU 36-402/36-608, Spring 2014), §1.1-1.4 pp.1-3 (kth-order spline with m knots: truncated power basis g1..g_{m+k+1}; natural spline of order k with knots t1..tm spanned by m basis functions; smoothing spline = penalised regression on the natural-spline basis with knots at every xi), sha256:c13ed5ee6e5dd83ac887822c8d3382780013343effeaacf09ccdebf620b6958b — https://www.stat.cmu.edu/~ryantibs/advmethods/notes/smoothspline.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list p.6 (James et al. Chapters 5, 6 and 7 assigned to tasks C1-C9), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Regression Spline.md
---

A **regression spline** fits separate low-degree polynomials over regions of $X$ separated by **knots**, constrained so that they join smoothly at the knots. It is a basis-function model, so it is fit by least squares. A cubic spline with $K$ knots regresses $y$ on an intercept and $K + 3$ basis functions.

> $$\begin{aligned} y_i = \beta_0 &+ \beta_1 b_1(x_i) + \beta_2 b_2(x_i) \\ &+ \cdots + \beta_{K+3}\, b_{K+3}(x_i) + \epsilon_i \end{aligned}$$
>
> $$h(x, \xi) = (x - \xi)_+^3 = \begin{cases} (x - \xi)^3 & \text{if } x > \xi \\ 0 & \text{otherwise} \end{cases}$$

- **Basis functions** $b_1(X), \dots, b_K(X)$ are fixed and chosen ahead of time. The model is then a standard linear model in them, so least squares fits it, and all the linear-model inference tools are available: standard errors, F-statistics (see [[Linear Regression]]). [[Polynomial Regression]] ($b_j(x_i) = x_i^j$) and the [[Step Function]] ($b_j(x_i) = I(c_j \le x_i < c_{j+1})$) are special cases.
- **Piecewise polynomials.** Placing $K$ knots in the range of $X$ means fitting $K + 1$ polynomials. With no constraints they need not meet, and a piecewise cubic with one knot uses $4 + 4 = 8$ degrees of freedom. Each constraint imposed at a knot frees up one degree of freedom.
- **Splines.** A degree-$d$ spline is a piecewise degree-$d$ polynomial whose derivatives up to degree $d - 1$ are continuous at each knot. A **cubic spline** is continuous, with continuous first and second derivatives, so it uses $K + 4$ degrees of freedom. A **linear spline** is a line in each region, continuous at each knot.
- **Truncated power basis.** One way to represent a cubic spline is to start from $X, X^2, X^3$ and add one $h(X, \xi_k)$ for each knot $\xi_1, \dots, \xi_K$. Adding $\beta\,h(x, \xi)$ to a cubic creates a discontinuity only in the *third* derivative at $\xi$; the function and its first two derivatives stay continuous. That gives an intercept plus $3 + K$ predictors, or $K + 4$ coefficients.
- **Natural spline.** A regression spline can have high variance at the outer range of $X$. A natural spline adds boundary constraints: the function must be linear below the smallest knot and above the largest. This gives more stable estimates and narrower confidence bands there. These are two extra constraints at each boundary. In ISLR's count, three interior knots plus two boundary knots make 5 knots. The cubic spline with those knots has 9 degrees of freedom, and the natural cubic spline has $9 - 4 = 5$. ISLR counts that as 4 once the constant is absorbed into the intercept.
- **Choosing knots.** A spline is most flexible where knots are dense. You can place more knots where the function seems to change fastest, but in practice knots are usually spaced uniformly. You specify the degrees of freedom, and software places knots at uniform quantiles of $X$. For example, a natural spline with 4 degrees of freedom gets 3 interior knots, at the 25th, 50th and 75th percentiles. Choose the number of knots by [[Cross-Validation]], picking the $K$ with the smallest cross-validated RSS.
- **Against polynomials.** Splines add flexibility by adding knots while keeping the degree fixed, which generally gives more stable estimates than raising a polynomial's degree. A [[Smoothing Spline]] is a different route to a spline: a knot at every $x_i$, with a roughness penalty instead of knot selection.
- **In a [[Generalized Additive Model]].** Natural splines make each term a set of basis variables, so the whole GAM is one least squares regression. When splines are fit to several variables at once, a pragmatic choice is the same fixed degrees of freedom, say four, for every term.

| Fit with $K$ knots | Degrees of freedom |
|---|---|
| Piecewise cubic, no constraints | $4(K + 1)$ |
| Cubic spline | $K + 4$ |
| Degree-$d$ spline | $(d + 1)(K + 1) - dK = K + d + 1$ |
| Natural cubic spline | $(K + 4) - 4 = K$, counting the two boundary knots among the $K$ |

The degree-$d$ row applies the same count to any degree: $d + 1$ coefficients in each of the $K + 1$ regions, minus $d$ continuity constraints at each knot.

> [!example]- Degrees of Freedom with Five Knots {Example}
> A frequency model uses driver age with knots at $25, 35, 45, 55, 65$. Rank these fits by the degrees of freedom they use: piecewise cubic, continuous piecewise cubic, cubic spline, piecewise linear, linear spline, and a natural cubic spline required to be linear below 25 and above 65.
>
> > [!answer]-
> > There are $K = 5$ knots, so $6$ regions:
> > $$
> > \begin{align*}
> > \text{Piecewise cubic:}\quad 4(6) &= 24 \\
> > \text{Continuous piecewise cubic:}\quad 24 - 5 &= 19 \\
> > \text{Piecewise linear:}\quad 2(6) &= 12 \\
> > \text{Cubic spline:}\quad 24 - 3(5) &= 9 \\
> > \text{Linear spline:}\quad 12 - 5 &= 7 \\
> > \text{Natural cubic spline:}\quad 9 - 2 - 2 &= 5
> > \end{align*}
> > $$
> > Order: piecewise cubic (24) > continuous piecewise cubic (19) > piecewise linear (12) > cubic spline (9) > linear spline (7) > natural cubic spline (5). The cubic spline count is $K + 4 = 9$. The natural spline loses two more degrees of freedom at each end, where its quadratic and cubic terms are forced to zero.

> [!example]- Evaluating a Cubic Spline from Its Truncated Power Basis {Example}
> Claim severity (in \$000) is fit as a cubic spline in vehicle age $x$, with knots at $\xi_1 = 3$ and $\xi_2 = 8$:
> $$\begin{aligned} \hat f(x) = 2.0 &+ 0.50x - 0.10x^2 + 0.010x^3 \\ &- 0.012(x - 3)_+^3 + 0.006(x - 8)_+^3 \end{aligned}$$
> (a) Find $\hat f(2)$, $\hat f(6)$ and $\hat f(10)$.
> (b) Show that $\hat f$ is continuous at $x = 3$, and find the jump in $\hat f'''$ there.
>
> > [!answer]-
> > (a) A truncated term is zero to the left of its knot:
> > $$
> > \begin{align*}
> > \hat f(2) &= 2.0 + 1.0 - 0.4 + 0.08 \\
> > &= 2.68 \\
> > \hat f(6) &= 2.0 + 3.0 - 3.6 + 2.16 - 0.012(27) \\
> > &= 3.236 \\
> > \hat f(10) &= 2.0 + 5.0 - 10.0 + 10.0 - 0.012(343) + 0.006(8) \\
> > &= 2.932
> > \end{align*}
> > $$
> > (b) At $x = 3$ the term $-0.012(x - 3)^3$ is $0$, and so are its first derivative $-0.036(x - 3)^2$ and second derivative $-0.072(x - 3)$. The left and right pieces therefore agree in value, slope and curvature, with $\hat f(3) = 2.87$. Only the third derivative changes: it is $6(0.010) = 0.06$ to the left and $6(0.010 - 0.012) = -0.012$ to the right, a jump of $6(-0.012) = -0.072$.
