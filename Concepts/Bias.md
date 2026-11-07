---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:37a22a24c395da2f1dcc9d425afc27861190bf1b8bbaa67bfe710f5f9136a4da
  sources:
    - "Penn State STAT 501 Regression Methods, Lesson 10 §10.1 'What if the Regression Equation Contains \"Wrong\" Predictors?', Outcome 2 (underspecified model): biased coefficients and predictions; 'the mean square error MSE tends to overestimate σ², thereby yielding wider confidence intervals than it should'; Martian example MSE 0.653 vs 0.017, sha256:c5c4744b68f627609bd40ed82d3a571ed3aa6c2231469ddbac18d5b8cc94313c — https://online.stat.psu.edu/stat501/Lesson10"
    - "Penn State STAT 462 Applied Regression Analysis, §11.1 'What if the Regression Equation Contains \"Wrong\" Predictors?', underspecified model (outcome 2): same MSE-overestimates-σ² / wider confidence intervals sentence, sha256:4e75fc0fd87859ad788661398e41d98f592654b42642c523c849339b7fd56e4f — https://online.stat.psu.edu/stat462/node/195/"
    - "Penn State STAT 501 Regression Methods, Lesson 7 §7.2 Prediction Interval for a New Response: ŷ_h ± t(1−α/2, n−p) × √(MSE + se(ŷ_h)²); §7.1: as MSE decreases the interval width decreases, sha256:09f3e2de7b3b61cea327370053b219eb5c6b2d0981e0aca094fdd92178c2c631 — https://online.stat.psu.edu/stat501/Lesson07"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, ch.6 §6.1 Estimators: bias(U) = E(U) − θ; mse(U) = var(U) + bias²(U); asymptotic unbiasedness, sha256:10914ffca9034209da0111918cfb534d60982bde0bba142a11d61d43114c6e2a — https://www.randomservices.org/random/point/Estimators.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Bias.md
---

![[Media/Figures/Bias.svg|340]]

**Bias** is the systematic error of an [[Estimator|estimator]]. The bias of an estimator $\hat{\theta}$ of a parameter $\theta$ is

> $$\text{Bias}(\hat{\theta}) = E[\hat{\theta}] - \theta$$

- $E[\hat{\theta}]$ is the expected value of $\hat{\theta}$ over repeated samples.

An estimator whose bias is 0 for every value of $\theta$ is [[Unbiasedness|unbiased]]. The bias is one of the two parts of the [[Mean Square Error|mean square error]], and the variance of the estimator is the other.

> [!example]- An actuary estimates the mean claim size $\mu$ from three claims by dividing their total by 4. What is the bias of this estimator? {Example}
> - The estimator is $\hat{\theta} = (X_1 + X_2 + X_3)/4$.
> - Its expected value is $E[\hat{\theta}] = 3\mu/4$.
> - Its bias is $3\mu/4 - \mu = -\mu/4$, so it underestimates the mean claim size by a quarter.

## Bias of the variance estimator that divides by the sample size

The estimator of the variance $\sigma^2$ that divides the sum of squared deviations by $n$ is

> $$\hat{\sigma}^2 = \frac{1}{n}\sum_{i=1}^{n}(X_i - \bar{X})^2$$

The sum of squared deviations has expected value $(n-1)\sigma^2$, as shown under [[Unbiasedness#Unbiasedness of the sample variance|unbiasedness of the sample variance]]. The expected value of $\hat{\sigma}^2$ is therefore $(n-1)\sigma^2/n$, and its bias is

> $$\text{Bias}(\hat{\sigma}^2) = -\frac{\sigma^2}{n}$$

The estimator underestimates $\sigma^2$. For a normal sample it is the [[Maximum Likelihood Estimation|maximum likelihood estimator]] of $\sigma^2$.

> [!example]- A sample of 4 is drawn from a population with variance 12. What are the expected value and the bias of $\hat{\sigma}^2$? {Example}
> - The expected value is $E[\hat{\sigma}^2] = \frac{3}{4} \times 12 = 9$.
> - The bias is $9 - 12 = -3$, which is $-\sigma^2/n = -12/4$.

## Bias of the sample maximum of a uniform sample

For a sample of $n$ from the uniform distribution on $(0, \theta)$, the expected value of the [[Order Statistics#The maximum and the minimum|sample maximum]] $X_{(n)}$ is

> $$E[X_{(n)}] = \frac{n\theta}{n+1}$$

The bias of $X_{(n)}$ as an estimator of $\theta$ is therefore

> $$\text{Bias}(X_{(n)}) = -\frac{\theta}{n+1}$$

The sample maximum can never exceed $\theta$, so it underestimates $\theta$. Multiplying it by $(n+1)/n$ removes the bias, and $\frac{n+1}{n}X_{(n)}$ is unbiased for $\theta$.

> [!example]- Losses are uniform on $(0, \theta)$. The largest of 4 losses is 800. What is the bias of the sample maximum, and what is the unbiased estimate of $\theta$? {Example}
> - With $n = 4$, the bias of $X_{(4)}$ is $-\theta/5$.
> - The unbiased estimator is $\frac{5}{4}X_{(4)}$.
> - The unbiased estimate is $\frac{5}{4} \times 800 = 1{,}000$.

## Asymptotic unbiasedness

An estimator $\hat{\theta}_n$ computed from a sample of size $n$ is asymptotically unbiased if its bias goes to 0 as $n$ grows:

> $$\lim_{n \to \infty} \text{Bias}(\hat{\theta}_n) = 0$$

The variance estimator with divisor $n$ and the sample maximum of a uniform sample are both biased for every $n$ and asymptotically unbiased. An asymptotically unbiased estimator whose variance also goes to 0 is [[Consistency#Consistency from vanishing bias and variance|consistent]].

## Bias of a function of an unbiased estimator

If $\hat{\theta}$ is unbiased for $\theta$, a function $g(\hat{\theta})$ is in general biased for $g(\theta)$ unless $g$ is linear. For the square of $\hat{\theta}$, the expected value is

> $$E[\hat{\theta}^2] = \theta^2 + \text{Var}(\hat{\theta})$$

The square therefore overestimates $\theta^2$ by $\text{Var}(\hat{\theta})$. In the same way, the sample variance $S^2$ is unbiased for $\sigma^2$, but the sample standard deviation $S$ underestimates $\sigma$, because the square root is concave.

> [!example]- A sample of 25 is drawn from a population with mean $\mu$ and variance 100. What is the bias of $\bar{X}^2$ as an estimator of $\mu^2$? {Example}
> - The sample mean is unbiased for $\mu$, with variance $\text{Var}(\bar{X}) = 100/25 = 4$.
> - The expected value of its square is $E[\bar{X}^2] = \mu^2 + 4$.
> - The bias of $\bar{X}^2$ is 4.

## Bias from an omitted variable in regression

Suppose the response follows $Y = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \varepsilon$, but the regression is fitted on $x_1$ alone. The expected value of the estimated coefficient of $x_1$ is

> $$E[\hat{\beta}_1] = \beta_1 + \beta_2\,\delta$$

- $\delta$ is the slope of the regression of $x_2$ on $x_1$.

Omitting a variable that belongs in the model biases the coefficients of the variables that remain, unless the omitted variable is uncorrelated with them, in which case $\delta = 0$.

> [!example]- The true model has $\beta_1 = 2$ and $\beta_2 = 3$. The variable $x_2$ is omitted, and the slope of $x_2$ on $x_1$ is 0.5. What is the bias of $\hat{\beta}_1$? {Example}
> - The expected value of $\hat{\beta}_1$ is $2 + 3 \times 0.5 = 3.5$.
> - The bias of $\hat{\beta}_1$ is $3.5 - 2 = 1.5$.

> [!trap] Treating the error of one estimate as bias
> The bias is an expected value over repeated samples. One estimate of 1.3 for a coefficient whose true value is 1.5 does not show a bias of $-0.2$. The difference is a sampling error, and the bias can only be found from the expected value of the estimator.
