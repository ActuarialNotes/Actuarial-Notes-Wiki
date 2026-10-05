---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:431b7a664ccb31ee4853797a4b353cf89915ea3117cdb7f1f069e79aab4edd78
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R (2nd ed., Springer 2021), §7.2 'Step Functions', eqs (7.4)-(7.6) and footnote 2, printed pp.292-294 (PDF pp.300-302); §7.3 eq (7.7), printed p.294; §7.4.1 'piecewise polynomials of degree 0', printed p.295 (PDF p.303); §7.7.1 Fig 7.11 caption (education as a step function), printed p.308 (PDF p.316), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list p.6 (James et al. Chapters 5, 6 and 7 assigned to tasks C1-C9), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Step Function.md
---

A **step function** fit cuts the range of a predictor $X$ into bins at cutpoints $c_1, c_2, \dots, c_K$ and fits a different constant in each bin. This converts a continuous variable into an ordered categorical variable, and the fitted curve is piecewise constant.

> $$\begin{aligned} C_0(X) &= I(X < c_1) \\ C_k(X) &= I(c_k \le X < c_{k+1}) \\ C_K(X) &= I(c_K \le X) \end{aligned}$$
>
> $$\begin{aligned} y_i = \beta_0 &+ \beta_1 C_1(x_i) + \beta_2 C_2(x_i) \\ &+ \cdots + \beta_K C_K(x_i) + \epsilon_i \end{aligned}$$

- $k = 1, \dots, K-1$ in the middle line, which gives $K + 1$ new variables. $I(\cdot)$ is the indicator function: $1$ if the condition is true and $0$ otherwise. These are dummy variables. For any $X$, $C_0(X) + C_1(X) + \cdots + C_K(X) = 1$, because $X$ falls in exactly one of the $K + 1$ intervals.
- **$C_0$ is left out** because it is redundant with the intercept, just as a qualitative variable with three levels needs only two dummy variables when the model has an intercept (see [[Categorical Predictor]]). Dropping $C_0$ rather than another $C_k$ is an arbitrary choice. Alternatively, you can keep all $K + 1$ variables and drop the intercept.
- **Interpretation.** At most one of $C_1, \dots, C_K$ is non-zero. When $X < c_1$ all of them are zero, so $\beta_0$ is the mean value of $Y$ for $X < c_1$. For $c_j \le X < c_{j+1}$ the model predicts $\beta_0 + \beta_j$, so $\beta_j$ is the average increase in the response for that bin relative to $X < c_1$.
- The model is fit by least squares (see [[Ordinary Least Squares]]). For a binary response, the same $C_k(x_i)$ become the predictors of a [[Logistic Regression]].
- **Strengths and weaknesses.** A step function avoids the global structure that [[Polynomial Regression]] imposes. But unless the predictor has natural breakpoints, a piecewise-constant fit can miss the action. In ISLR's wage example, the first age bin misses the increasing trend of wage with age. Step functions are still popular in biostatistics and epidemiology, where 5-year age groups are a common choice of bins.
- A step function is a basis-function model with $b_j(x_i) = I(c_j \le x_i < c_{j+1})$. It is also a piecewise polynomial of degree 0, the simplest case of the piecewise polynomials behind a [[Regression Spline]]. In a [[Generalized Additive Model]], a qualitative predictor enters as a step function.

> [!example]- Reading a Step-Function Frequency Model {Example}
> Claim frequency is fit as a step function of driver age with cutpoints $c_1 = 25$, $c_2 = 40$ and $c_3 = 65$. The estimates are $\hat\beta_0 = 0.18$, $\hat\beta_1 = -0.07$, $\hat\beta_2 = -0.09$ and $\hat\beta_3 = -0.05$.
>
> (a) How many indicator variables does the binning create, and how many enter the regression?
> (b) Find the predicted frequency for drivers aged 22, 33, 50 and 70.
> (c) Interpret $\hat\beta_2$.
>
> > [!answer]-
> > (a) $K = 3$ cutpoints create $K + 1 = 4$ indicators, $C_0$ to $C_3$. Three of them ($C_1$, $C_2$, $C_3$) enter alongside the intercept.
> >
> > (b) Each driver is in exactly one bin:
> > $$
> > \begin{align*}
> > \text{Age 22 } (X < 25):&\quad 0.18 \\
> > \text{Age 33 } (25 \le X < 40):&\quad 0.18 - 0.07 = 0.11 \\
> > \text{Age 50 } (40 \le X < 65):&\quad 0.18 - 0.09 = 0.09 \\
> > \text{Age 70 } (65 \le X):&\quad 0.18 - 0.05 = 0.13
> > \end{align*}
> > $$
> > (c) Drivers aged 40 to 64 average $0.09$ fewer claims per exposure than drivers under 25, the reference bin.

> [!example]- Least Squares Fits the Bin Means {Example}
> Nine property claims (severity in \$000) are fit with a step function of building age $x$, with cutpoints $c_1 = 10$ and $c_2 = 30$:
>
> | $x$ | 4 | 7 | 9 | 15 | 22 | 31 | 38 | 45 | 52 |
> |---|---|---|---|---|---|---|---|---|---|
> | $y$ | 4 | 6 | 5 | 7 | 9 | 12 | 10 | 14 | 12 |
>
> Find $\hat\beta_0$, $\hat\beta_1$ and $\hat\beta_2$.
>
> > [!answer]-
> > With only the intercept and two indicators, each bin's fitted value is just the mean of the claims in that bin:
> > $$
> > \begin{align*}
> > X < 10:&\quad \frac{4 + 6 + 5}{3} = 5 \\
> > 10 \le X < 30:&\quad \frac{7 + 9}{2} = 8 \\
> > 30 \le X:&\quad \frac{12 + 10 + 14 + 12}{4} = 12
> > \end{align*}
> > $$
> > So $\hat\beta_0 = 5$, the mean severity of the reference bin. Each other coefficient is that bin's mean minus 5: $\hat\beta_1 = 8 - 5 = 3$ and $\hat\beta_2 = 12 - 5 = 7$. A least squares fit on the design matrix $[1, C_1, C_2]$ gives the same $(5, 3, 7)$.
