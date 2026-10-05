---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:2478a671f9301b5fba77daba338ffc549bf770d40dff82d41eb6fc384309067d
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R (2nd ed., Springer 2021), §7.7 'Generalized Additive Models', eqs (7.15)-(7.19), footnote 6 and Figs 7.11-7.13, printed pp.306-311 (PDF pp.314-319), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Tibshirani, R., 'Additive Models' lecture notes, Advanced Methods for Data Analysis (CMU 36-402/36-608, Spring 2014), §2.1-2.2 pp.2-3 (additive model, identifiability E[rj(Xj)] = 0, backfitting with beta0-hat = ybar and partial residual y - beta0-hat - sum over l != j of rl-hat), sha256:008ff298d9d3c5103b58a5a417499e745348c6ead70fe96cdfa601f9ebf10d18 — https://www.stat.cmu.edu/~ryantibs/advmethods/notes/addmodels.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), reading list p.6 (James et al. Chapters 5, 6 and 7 assigned to tasks C1-C9), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Generalized Additive Model.md
---

A **Generalized Additive Model (GAM)** extends the multiple [[Linear Regression]] model by replacing each linear term $\beta_j x_{ij}$ with a smooth non-linear function $f_j(x_{ij})$, while keeping the model **additive**. A separate $f_j$ is fit for each $X_j$, and their contributions are added together. GAMs work for both quantitative and qualitative responses.

> $$y_i = \beta_0 + \sum_{j=1}^{p} f_j(x_{ij}) + \epsilon_i$$
>
> $$\log\left(\frac{p(X)}{1 - p(X)}\right) = \beta_0 + f_1(X_1) + \cdots + f_p(X_p)$$

- The second line is the **logistic regression GAM** for a binary $Y$, where $p(X) = \Pr(Y = 1 \mid X)$. It replaces the linear predictor of [[Logistic Regression]] with the same additive form, and it has the same pros and cons as the regression GAM.
- **Building blocks.** Each $f_j$ can be fit with any of the single-predictor methods: a [[Regression Spline]] (natural splines included), a [[Smoothing Spline]], [[Local Regression]], [[Polynomial Regression]], a [[Step Function]], or a mix. A qualitative predictor gets a separate constant for each level, using the usual dummy variables (see [[Categorical Predictor]]). A term can also stay linear. ISLR's logistic GAM for wage uses $\beta_1 \times \text{year} + f_2(\text{age}) + f_3(\text{education})$.
- **Fitting.** When the $f_j$ are natural splines, the whole model is one big least squares regression onto spline basis variables and dummy variables. Smoothing splines cannot be fit by least squares, so they use **backfitting**. Backfitting updates the fit for each predictor in turn while holding the others fixed, each time fitting that variable's method to a **partial residual**. For $X_3$, for example, the partial residual is $r_i = y_i - f_1(x_{i1}) - f_2(x_{i2})$. In most cases, GAMs fit with smoothing splines and with natural splines differ only a little.
- **Pros.** A GAM fits a non-linear $f_j$ to each $X_j$ automatically, so you don't have to try out many transformations of each variable by hand (see [[Variable Transformation]]). The non-linear fits can predict more accurately. Because the model is additive, you can examine the effect of each $X_j$ on $Y$ while holding all the other variables fixed. The smoothness of each $f_j$ can be summarized by its degrees of freedom.
- **The main limitation** is additivity: with many variables, important interactions can be missed. You can add them by hand, either as products $X_j \times X_k$ (see [[Interaction]]) or as low-dimensional interaction functions $f_{jk}(X_j, X_k)$ fit with two-dimensional smoothers. For fully general models there are more flexible approaches, such as a [[Random Forest]] and [[Boosting]]. GAMs are a useful compromise between linear and fully nonparametric models.

> [!example]- Claim Probability from a Logistic GAM {Example}
> A logistic GAM for the probability that an auto policy has a claim in the year is
> $$\begin{aligned} \log\left(\frac{p(X)}{1 - p(X)}\right) = -2.2 &+ f_1(\text{driver age}) \\ &+ f_2(\text{vehicle age}) \\ &+ f_3(\text{territory}) \end{aligned}$$
> From the fitted curves, $f_1(22) = 0.65$, $f_1(45) = -0.20$, $f_2(3) = -0.10$ and $f_3(\text{Urban}) = 0.30$.
>
> (a) Find the claim probability for a 22-year-old with a 3-year-old vehicle in the Urban territory.
> (b) Repeat for a 45-year-old with the same vehicle and territory, and find the odds ratio between the two drivers.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{(a)}\quad -2.2 + 0.65 - 0.10 + 0.30 &= -1.35 \\
> > p &= \frac{e^{-1.35}}{1 + e^{-1.35}} \\
> > &= 0.206 \\
> > \text{(b)}\quad -2.2 - 0.20 - 0.10 + 0.30 &= -2.20 \\
> > p &= \frac{e^{-2.20}}{1 + e^{-2.20}} \\
> > &= 0.100
> > \end{align*}
> > $$
> > The odds ratio is $e^{-1.35 - (-2.20)} = e^{0.85} = 2.34$. Additivity is what makes this clean. With vehicle age and territory held fixed, their terms cancel, so the comparison depends only on $f_1(22) - f_1(45)$. The same 2.34 holds in every territory and for every vehicle age, because the model contains no interaction.

> [!example]- Sizing a Natural-Spline GAM and a Backfitting Step {Example}
> A property severity GAM is
> $$\begin{aligned} \text{severity} = \beta_0 &+ f_1(\text{building age}) \\ &+ f_2(\text{square footage}) \\ &+ f_3(\text{construction}) + \epsilon \end{aligned}$$
> $f_1$ is a natural spline with 4 degrees of freedom, $f_2$ is a natural spline with 5, and $f_3$ is a step function over 4 construction classes.
>
> (a) How many coefficients does the least squares fit estimate?
> (b) $f_2$ is then switched to a smoothing spline, so the model is fit by backfitting. For one risk, $y = 42.0$, $\hat f_1 = 3.5$ and $\hat f_3 = -1.5$. What partial residual is used when $f_2$ is updated?
>
> > [!answer]-
> > (a) With natural splines, the model is one regression on basis and dummy variables. The intercept is $1$ coefficient, $f_1$ contributes $4$ basis variables and $f_2$ contributes $5$. Construction's 4 levels need $3$ dummies alongside the intercept. That is $1 + 4 + 5 + 3 = 13$ coefficients.
> >
> > (b) Subtract the other fitted functions from the response:
> > $$
> > \begin{align*}
> > r &= y - \hat f_1 - \hat f_3 \\
> > &= 42.0 - 3.5 - (-1.5) \\
> > &= 40.0
> > \end{align*}
> > $$
> > The smoothing spline for square footage is refit with these partial residuals as its response. Then $f_1$ and $f_3$ are updated the same way, one predictor at a time, and the cycle repeats.
