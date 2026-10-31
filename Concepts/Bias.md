---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:5e0f51573113c7711272e27293420942f593c381ba02ba25aa57ea8d9b74b227
  sources:
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, ch.6 Point Estimation, §6.1 Estimators: bias(U) = E(U) − θ; mse(U) = var(U) + bias²(U); unbiased iff E(U) = θ; asymptotically unbiased if bias(U_n) → 0, sha256:10914ffca9034209da0111918cfb534d60982bde0bba142a11d61d43114c6e2a — https://www.randomservices.org/random/point/Estimators.html"
    - "J. Brunner (U. Toronto), STA302 Fall 2014 'Omitted Variables' lecture (CC BY-SA 3.0), omitted X2, X3 'absorbed by the intercept and error term'; β̂1 → β1 + c/σ²_x, biased and inconsistent; 'When a regression model fails to include all the independent variables that contribute to the dependent variable, and those omitted independent variables have non-zero covariance with variables that are in the model, the regression coefficients are biased and inconsistent' (slide 10/12), sha256:39fc11245b068613cea22ff8fa1a934ae4429d13a8b968387851cf7c74a72d49 — https://utstat.utoronto.ca/~brunner/oldclass/302f14/lectures/302f14OmittedVariables.pdf"
    - "R. Williams (Notre Dame), 'Specification Error: Omitted and Extraneous Variables' (rev. 15 Feb 2015), pp.1–2: E(b1*) = β1 + β2σ12/σ1² when X2 is omitted; b1* biased and inconsistent unless β2 = 0 or σ12 = 0, sha256:ce84ec1a5c97a644fff151a33d7a13976a4f5c1014e444d51109d464fc75d716 — https://academicweb.nd.edu/~rwilliam/stats2/L41.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), eq.(3.17) TSS = Σ(y_i − ȳ)², 'the amount of variability inherent in the response before the regression is performed' (PDF p.80); §3.2.2 'adding another variable always results in a decrease in the residual sum of squares on the training data… R² must increase' (PDF p.90); §4.4 'When there is substantial separation… parameter estimates for the logistic regression model are surprisingly unstable' (PDF p.151), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Frees (2010), Regression Modeling with Actuarial and Financial Applications — publisher's index (Cambridge), index entries 'double smoothing, 274', 'exponential smoothed estimate, 276', 'lag k autocorrelation, 253', explanatory variable 'omitted, 197, 201' — locates the syllabus text's treatment (the book itself is commercial and was not read), sha256:1b66298471851d67b5963ff635a7aea743e34afb4ed76006e0b99fc77ad379de — https://assets.cambridge.org/97805217/60119/index/9780521760119_index.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Bias.md
---

**Bias** is the systematic error of an estimator: the difference between its expected value and the parameter it estimates. An estimator with zero bias is [[Unbiasedness|unbiased]]; bias is one of the two components of [[Mean Square Error]], the other being variance.

> $$\text{Bias}(\hat\theta) = E[\hat\theta] - \theta$$

> $$\text{MSE}(\hat\theta) = \text{Var}(\hat\theta) + \left[\text{Bias}(\hat\theta)\right]^{2}$$

- Bias is about the *centre* of the estimator's [[Sampling Distribution]], variance about its *spread* — an estimator can be unbiased and useless (huge variance) or biased and excellent (tiny variance)
- **Asymptotic unbiasedness** is weaker: $\text{Bias}(\hat\theta) \to 0$ as $n \to \infty$. The [[Maximum Likelihood Estimation|MLE]] is often biased in finite samples but asymptotically unbiased and [[Consistency|consistent]]
- Standard examples: the [[Sample Variance]] with divisor $n$ is biased low by $\sigma^2/n$; the MLE $\hat\theta = X_{(n)}$ for $\text{Uniform}(0,\theta)$ is biased low by $\theta/(n+1)$
- Bias does **not** invert through nonlinear functions: if $\hat\theta$ is unbiased for $\theta$, $g(\hat\theta)$ is generally biased for $g(\theta)$ (by Jensen's inequality)
- Accepting a little bias to remove a lot of variance is the whole point of shrinkage, credibility weighting, and the [[Bias-Variance Tradeoff]] that governs model complexity
- In modelling, bias also arises from the *model* rather than the estimator — an omitted predictor, an ignored [[Interaction]], or fitting a straight line to a curved relationship all bias the fitted values regardless of sample size
- **Omitting an important explanatory variable** underfits the regression (Frees 2010, Ch. 6, on the effects of model misspecification). The fitted values are biased, and so are the coefficients of the included variables that are correlated with the omitted one. The variation the omitted variable would have explained stays in the residuals, so the residual sum of squares is larger. The error variance estimate $s^2$ (the MSE) therefore tends to overestimate $\sigma^2$, and the confidence intervals built from it are wider than they should be (Penn State STAT 501, Lesson 10.1, on an underspecified model). The total sum of squares depends only on the response, so it does not change; the larger residual share simply lowers $R^2$

![[Media/Figures/Bias.svg|340]]

> [!example]- Bias of the Uniform MLE {Example}
> For $X_1, \ldots, X_n \stackrel{\text{iid}}{\sim} \text{Uniform}(0,\theta)$, the MLE is $\hat\theta = X_{(n)}$ with $E[X_{(n)}] = \frac{n}{n+1}\theta$. Find its bias and construct an unbiased alternative.
>
> > [!answer]-
> > $$\text{Bias} = \frac{n}{n+1}\theta - \theta = -\frac{\theta}{n+1}$$
> > The MLE understates $\theta$, which makes sense — the largest observation can never exceed the true maximum. Rescaling removes it:
> > $$\tilde\theta = \frac{n+1}{n}X_{(n)}, \qquad E[\tilde\theta] = \theta$$

> [!example]- Choosing a Biased Estimator on MSE {Example}
> Estimator A is unbiased with variance $100$. Estimator B has bias $-4$ and variance $50$. Which has the smaller mean square error?
>
> > [!answer]-
> > $$\text{MSE}_A = 100 + 0^2 = 100$$
> > $$\text{MSE}_B = 50 + (-4)^2 = 66$$
> > **B is preferred on MSE**, despite being biased — its variance reduction more than pays for the squared bias. This is the trade every shrinkage method makes.
