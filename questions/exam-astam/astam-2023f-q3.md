---
id: "astam-2023f-q3"
exam: "Exam ASTAM"
topic: "Maximum Likelihood Estimation"
learning_objective: "Construction and Selection of Parametric Models"
difficulty: medium
type: multi-part
year: 2023
session: Fall
wiki_link:
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Kolmogorov-Smirnov+Test
  - Concepts/AIC
  - Concepts/BIC
  - Concepts/Likelihood+Ratio+Test
  - Concepts/Hypothesis+Testing
points: 12
---

An actuary is analyzing a sample of 1000 claims, as part of a review of pricing assumptions. Claims are assumed to be independent and identically distributed. Let $x_i$ denote the amount of the $i^{th}$ claim in the sample.

You are given that the sample mean is $\bar{x} = 1015.92$.

## Part a (3 points)

The actuary first fits an exponential distribution to the claims data using maximum likelihood estimation. You are given that the maximum likelihood estimate of the exponential distribution parameter $\theta$ is $\hat{\theta} = \bar{x}$.

(i) Show that the maximum value of the log-likelihood function under the exponential distribution is -7925 to the nearest 5. You should calculate the value to the nearest 0.1.

(ii) The actuary creates the following plot of the difference between the empirical distribution function and the fitted exponential distribution function for each data point, where the observations are sorted from low to high.

![Line plot of the empirical minus the fitted exponential distribution function at each observation, observations sorted from low to high, vertical axis from -0.040 to 0.030 in steps of 0.005. The line starts at 0, falls through the first half of the sample to its lowest point just below -0.025, climbs back to between -0.010 and 0 through the second half, peaks just above 0.015 near the top of the sample, and ends just below 0.](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/astam-2023f-q3-exponential-ks.png)

You are given that the critical value for the Kolmogorov-Smirnov test at the 5% significance level is $\dfrac{1.36}{\sqrt{n}}$.

Conduct a Kolmogorov-Smirnov goodness of fit test at the 5% significance level. You should state clearly your conclusion.

### Explanation
**(i)** The loglikelihood function is

$$
l(\theta) = \log\left(\prod_{i=1}^{n}\frac{1}{\theta}e^{-\frac{x_i}{\theta}}\right) = -n\log\theta - \frac{1}{\theta}\sum_{i=1}^{n}x_i = -n\left(\log\theta + \frac{\bar{x}}{\theta}\right)
$$

The maximum is achieved when $\theta$ is the MLE, i.e. when $\hat{\theta} = \bar{x} = 1015.92$, so

$$
l_{max} = l\left(\hat{\theta}\right) = -1000\left(\log\hat{\theta} + 1\right) = -7923.55
$$

**(ii)** The K-S test statistic can be read off the graph as

$$
D = \max_i\left|F_n(x_i) - F^*(x_i)\right| = 0.0275
$$

where $F_n(x_i)$ is the empirical CDF and $F^*(x_i)$ is the CDF of the fitted distribution.

The critical value of the K-S test at significance level 5%, with sample size $n = 1000$ is $\dfrac{1.36}{\sqrt{1000}} = 0.043$

Since $D < 0.043$, we do not reject the null hypothesis, $H_0: X \sim \text{Exp}(1015.92)$ at the 5% significance level.

### Examiner Report
Overall, candidates did this question very well.

In (a) (ii), some candidates did not realize that the graph itself has already represented the difference between the empirical distribution function and the fitted exponential distribution function for each data point.

## Part b (4 points)

The actuary next fits a gamma distribution to the same claims data. You are given that:

- The maximum likelihood estimate of the $\alpha$ parameter is $\hat{\alpha} = 0.92463$.
- $\sum_{i=1}^{1000}\ln x_i = 6293.4$.

(i) Show that the maximum likelihood estimate of the gamma distribution parameter $\theta$ is $\hat{\theta} = 1100$ to the nearest 1. You should calculate the value to the nearest 0.01.

(ii) Show that the maximum value of the log-likelihood function under the gamma distribution is -7920 to the nearest 5. You should calculate the value to the nearest 0.1. (Hint: You can use the GAMMA function in Excel.)

(iii) The actuary creates the following plot of the difference between the empirical distribution function and the fitted gamma distribution function for each data point, where the observations are sorted from low to high.

![Line plot of the empirical minus the fitted gamma distribution function at each observation, observations sorted from low to high, on the same axis from -0.040 to 0.030. The line wanders around 0 throughout, its lowest point a little below -0.010 and its highest, near the top of the sample, a little above 0.010.](https://raw.githubusercontent.com/ActuarialNotes/Actuarial-Notes-Wiki/main/Media/Attachments/astam-2023f-q3-gamma-ks.png)

Conduct a Kolmogorov-Smirnov goodness of fit test at the 5% significance level. You should state clearly your conclusion.

### Explanation
**(i)** The likelihood function is

$$
L(\alpha, \theta) = \prod_{i=1}^{n}\frac{x_i^{\alpha-1}e^{-\left(\frac{x_i}{\theta}\right)}}{\theta^\alpha\Gamma(\alpha)} = \frac{1}{\theta^{\alpha n}\Gamma(\alpha)^n}\left(\prod_{i=1}^{n}x_i^{\alpha-1}\right)e^{-\sum_{i=1}^{n}\frac{x_i}{\theta}}
$$

$$
\Rightarrow l(\alpha, \theta) = -\alpha n\log\theta - n\log\Gamma(\alpha) + (\alpha - 1)\sum_{i=1}^{n}\log x_i - \frac{1}{\theta}n\bar{x}
$$

$$
\Rightarrow \frac{\partial l}{\partial\theta} = -\frac{\alpha n}{\theta} + \frac{n\bar{x}}{\theta^2}
$$

Set the derivative equal to 0, and $\alpha$ to $\hat{\alpha}$ for the MLE:

$$
\frac{n\bar{x}}{\hat{\theta}^2} - \frac{\hat{\alpha}n}{\hat{\theta}} = 0 \Rightarrow \bar{x} - \hat{\alpha}\hat{\theta} = 0
$$

$$
\Rightarrow \hat{\theta} = \frac{\bar{x}}{\hat{\alpha}} = \frac{1015.92}{0.92463} = 1098.73
$$

**(ii)** The maximum value of the loglikelihood function is therefore

$$
l_{max} = -\hat{\alpha}n\log\hat{\theta} - n\log\Gamma(\hat{\alpha}) + (\hat{\alpha} - 1)\sum_{i=1}^{n}\log x_i - \frac{1}{\hat{\theta}}n\bar{x}
$$

where $\Gamma(\hat{\alpha}) = 1.04955$ from Excel

$$
\Rightarrow l_{max} = -7921.5
$$

**(iii)** The K-S statistic is approximately $D = |-0.014| = 0.014 < 0.043$.

Thus, we do not reject $H_0: X \sim Gamma(0.92463,\ 1098.73)$ at the 5% significance level.

### Examiner Report
In (b)(ii), some candidates were unable to compute the GAMMA function in Excel.

## Part c (3 points)

State with reasons which of the two distributions is preferred based on each of the following criteria:

- (i) The Akaike Information Criterion (AIC).
- (ii) The Schwartz Bayes Criterion (SBC/BIC).
- (iii) The likelihood ratio test at the 5% significance level.

### Explanation
The AIC and SBC are calculated as follows:

| Fitted Distribution | Number of Parameters $r$ | AIC $(l - r)$ | SBC $\left(l - \frac{r}{2}\ln n\right)$ |
|---|---|---|---|
| Exponential | 1 | -7924.55 | -7927.0 |
| Gamma | 2 | -7923.5 | -7928.4 |

**(i)** Based on AIC, Gamma is preferred

**(ii)** Based on SBC, Exponential is preferred

**(iii)** For the Likelihood Ratio Test of $H_0: X \sim Exp$ vs $H_1: X \sim Gamma$:

The test statistic is

$$
T = 2(l_1 - l_0) = 2\big(-7921.5 - (-7923.55)\big) = 4.10
$$

Under the null hypothesis, $T \sim \chi^2$ with 1 degree of freedom (difference between the number of parameters.

The $p$ value for this test is

$$
p = 1 - F_{\chi^2}(4.1) = 1 - 0.957 = 0.043 < 5\%
$$

Therefore, we reject $H_0$ at the 5% significance level. Gamma is preferred under this test.

## Part d (1 point)

The actuary is concerned about the risk of claims over 6000.

- (i) Calculate the probability that a randomly selected claim exceeds 6000 using the fitted exponential distribution.
- (ii) Calculate the probability that a randomly selected claim exceeds 6000 using the fitted gamma distribution.

### Explanation
Under Exponential,

$$
P(X > 6000) = e^{-\frac{6000}{1015.92}} = 0.002723
$$

Under Gamma,

$$
P(X > 6000) = 1 - F_{Gamma}(6000) = 0.003521 \quad \text{(using Excel function GAMMA.DIST)}
$$

## Part e (1 point)

For the task of determining margins for solvency in reserve calculations, it is important to adequately reflect the tail risk of losses. State with reasons which of the two distributions you would recommend for this task.

### Explanation
For solvency in reserve calculations, it is important to capture the tail risk of losses (i.e., large claims).

- The gamma distribution passes the K-S goodness of fit test, and is preferred under the AIC and LRT methods.
- We see from (d) that the fitted Gamma distribution assigns a higher probability to claims over 6000 than the exponential and may therefore be a more suitable distribution for capturing tail risk.
- In general, the Gamma distribution with $\hat{\alpha} < 1$ has a relatively heavier tail than the Exponential with the same mean.

### Examiner Report
Candidates did relatively poor in (e). Many candidates stated that the Gamma distribution fitted the data better but failed to explain that the fitted Gamma had a heavier tail based on (d) and worked better for determining margins for solvency.
