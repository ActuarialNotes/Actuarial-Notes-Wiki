---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:8be09bab6d613a8134ced53816808289741c160ec57a82b2740cbec8379bb38f
  sources:
    - "Penn State STAT 501 Regression Methods, Lesson 10 §10.1 'What if the Regression Equation Contains \"Wrong\" Predictors?', Outcome 2 (underspecified model): biased coefficients and predictions; 'the mean square error MSE tends to overestimate σ², thereby yielding wider confidence intervals than it should'; Martian example MSE 0.653 vs 0.017, sha256:c5c4744b68f627609bd40ed82d3a571ed3aa6c2231469ddbac18d5b8cc94313c — https://online.stat.psu.edu/stat501/Lesson10"
    - "Penn State STAT 462 Applied Regression Analysis, §11.1 'What if the Regression Equation Contains \"Wrong\" Predictors?', underspecified model (outcome 2): same MSE-overestimates-σ² / wider confidence intervals sentence, sha256:4e75fc0fd87859ad788661398e41d98f592654b42642c523c849339b7fd56e4f — https://online.stat.psu.edu/stat462/node/195/"
    - "Penn State STAT 501 Regression Methods, Lesson 7 §7.2 Prediction Interval for a New Response: ŷ_h ± t(1−α/2, n−p) × √(MSE + se(ŷ_h)²); §7.1: as MSE decreases the interval width decreases, sha256:09f3e2de7b3b61cea327370053b219eb5c6b2d0981e0aca094fdd92178c2c631 — https://online.stat.psu.edu/stat501/Lesson07"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, ch.6 §6.1 Estimators: bias(U) = E(U) − θ; mse(U) = var(U) + bias²(U); asymptotic unbiasedness, sha256:10914ffca9034209da0111918cfb534d60982bde0bba142a11d61d43114c6e2a — https://www.randomservices.org/random/point/Estimators.html"
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
- **Omitting an important explanatory variable** underfits the regression (Frees 2010, Ch. 6, on the effects of model misspecification). The fitted values are biased, and so are the coefficients of the included variables that are correlated with the omitted one. The variation the omitted variable would have explained stays in the residuals, so the residual sum of squares is larger. The error variance estimate $s^2$ (the MSE) therefore tends to overestimate $\sigma^2$, and the confidence and prediction intervals built from it are wider than they should be (Penn State STAT 501, Lesson 10.1, on an underspecified model; §7.2 for the MSE inside the prediction interval). The total sum of squares depends only on the response, so it does not change; the larger residual share simply lowers $R^2$

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
