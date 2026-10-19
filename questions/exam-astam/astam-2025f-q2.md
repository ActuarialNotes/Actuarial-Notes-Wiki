---
id: "astam-2025f-q2"
exam: "Exam ASTAM"
topic: "Maximum Likelihood Estimation"
learning_objective: "Construction and Selection of Parametric Models"
difficulty: medium
type: multi-part
year: 2025
session: Fall
wiki_link:
  - Concepts/Chi-Square+Goodness-of-Fit+Test
  - Concepts/Likelihood+Ratio+Test
  - Concepts/AIC
  - Concepts/BIC
  - Concepts/Negative+Binomial+Distribution
  - Concepts/Maximum+Likelihood+Estimation
points: 9
---

You are analyzing the distribution of the number of claims during a one-year period for a portfolio of 2000 property insurance policies. The number of claims for each policy are assumed to be independent and identically distributed. You are given the following observed data:

| Number of Claims | Number of Policies |
|---|---|
| 0 | 1325 |
| 1 | 516 |
| 2 | 120 |
| 3 | 39 |
| 4 or more | 0 |

You first fit the data using a negative binomial distribution with $r = 2$, and unknown $\beta$.

You are given that the maximum likelihood estimate of $\beta$ is $\hat{\beta} = 0.21825$.

## Part a (2.5 points)

Show that the maximum value of the log-likelihood function under this model is $-1747$ to the nearest 1. You should calculate the value to the nearest 0.01.

### Explanation

The log-likelihood (LL) is $l(r, \beta) = \sum_{k=0}^{3} n_k \log p_k$.

The maximum value of the LL is the LL evaluated using the MLE parameter. That is, given $r = 2$ and $\hat{\beta} = 0.21825$, we have:

$$p_0 = \left(\frac{1}{1 + \hat{\beta}}\right)^r = 0.67379; \qquad p_1 = r\left(\frac{1}{1 + \hat{\beta}}\right)^r \left(\frac{\hat{\beta}}{1 + \hat{\beta}}\right) = 0.24142$$

$$p_2 = \frac{r(r+1)}{2}\left(\frac{1}{1 + \hat{\beta}}\right)^r \left(\frac{\hat{\beta}}{1 + \hat{\beta}}\right)^2 = 0.06488$$

$$p_3 = \frac{r(r+1)(r+2)}{6}\left(\frac{1}{1 + \hat{\beta}}\right)^r \left(\frac{\hat{\beta}}{1 + \hat{\beta}}\right)^3 = 0.01550$$

$$\Rightarrow \max \text{LL} = 1325 \times \log 0.67379 + \cdots + 39 \times \log 0.01550 = \mathbf{-1747.25}$$

### Examiner Report

Examiners' Comments

1. The examiners expected this question to be high scoring. Most candidates did achieve a passing score on the question, but overall the performance was below expectations.
2. In part (a), candidates were expected to plug the given parameter values into the LL equation to find the maximum, since the MLE, by definition, is the value that maximizes the LL. Instead, many candidates started by finding $\hat{\beta}$ even though it was given in the question. This made the question much longer than it needed to be, and led to more mathematical errors. Candidates are advised that they should re-read the question as they work through it, to ensure that they have followed instructions and used all the given information appropriately.

## Part b (2.5 points)

You conduct a chi-square goodness of fit test with 5 cells at the 5% significance level.

(i) Show that the test statistic for this test is 14 to the nearest 1. You should calculate the value to the nearest 0.1.

(ii) Determine the critical value for this test.

(iii) State the conclusion of this test.

### Explanation

The table for calculating the test statistic is

| $k$ | $p_k$ | O | E | (O-E)²/E |
|---|---|---|---|---|
| 0 | 0.67379 | 1325 | 1347.59 | 0.379 |
| 1 | 0.24142 | 516 | 482.84 | 2.277 |
| 2 | 0.06488 | 120 | 129.75 | 0.732 |
| 3 | 0.01550 | 39 | 30.99 | 2.068 |
| ≥4 | 0.00441 | 0 | 8.82 | 8.824 |

(i) The test statistic is $T = 0.379 + \cdots + 8.824 = \mathbf{14.2814}$.

(ii) Degrees of freedom = 5-1-1 = 3.

$$\Rightarrow \text{critical value} = Q_{5\%} : \Pr\left[\chi^2_3 > Q_{5\%}\right] = 0.05$$

$$\Rightarrow Q_{5\%} = \mathbf{7.81} \quad \text{(Excel: CHISQ.INV.RT(0.05,3))}$$

(iii) The null hypothesis is that the data are consistent with the $\text{NB}(r, \hat{\beta})$ distribution. As $T > Q$ we reject the null hypothesis and conclude that the data are not consistent with the $\text{NB}(r, \hat{\beta})$ distribution.

### Examiner Report

3. Part (b) was done well.

## Part c (3 points)

You next consider an alternative negative binomial model with both $r$ and $\beta$ estimated by maximum likelihood. You are given the following information.

- The maximum likelihood estimates are $\hat{r} = 3.814$, $\hat{\beta} = 0.114$.
- The value of the log-likelihood function with these parameters is $-1744.43$.
- The test statistic for a chi-square goodness of fit test with 5 cells is 12.982.

State with reasons which of the two models is preferred based on each of the following criteria:

(i) The Akaike Information Criterion (AIC).

(ii) The Schwartz Bayes Criterion (SBC/BIC).

(iii) The likelihood ratio test at the 5% significance level.

(iv) The chi-square goodness of fit test.

### Explanation

(i) The AIC statistic is $LL_{\max} - k$ where $LL_{\max}$ is the max log likelihood, and $k$ is the number of parameters.

$$\text{Model 1: } -1747.25 - 1 = -1748.25$$

$$\text{Model 2: } -1744.43 - 2 = -1746.43$$

Model 2 is preferred as the AIC statistic is higher.

(ii) The SBC statistic is $LL_{\max} - \dfrac{k \log n}{2}$ where $n = 2000$ is the sample size.

$$\text{Model 1: } -1747.25 - 0.5(\log 2000) = -1751.05$$

$$\text{Model 2: } -1744.43 - 1(\log 2000) = -1752.03$$

Model 1 is preferred as the SBC statistic is higher.

(iii) The LRT tests the null hypothesis that the more parsimonious model (Model 1) is preferred. The test statistic is

$$Q = 2\big(LL_{\max}(\text{model 2}) - LL_{\max}(\text{model 1})\big) = 5.636$$

$$p\text{-value is } \Pr\left[\chi^2_{\nu=1} > Q\right] = 0.018$$

At 5% significance level we reject the null hypothesis and select Model 2.

(iv) The p-value for the Model 1 GOF test is $\Pr\left[\chi^2_3 > 14.28\right] = 0.25\%$

The p-value for the Model 2 GOF test is $\Pr\left[\chi^2_{\nu=2} > 12.98\right] = 0.15\%$

Model 1 is preferred based on a slightly higher p-value.

### Examiner Report

4. In part (c), most candidates correctly applied the AIC and SBC criteria. The Likelihood Ratio test was also fairly well done, although a significant number of candidates used the wrong distribution for the critical value. In part (c)(iv), only a few candidates recognized that a direct comparison of the test statistics was not valid for ranking the two cases, as the difference in degrees of freedom needed to be allowed for.

## Part d (1 point)

Your colleague suggests using a zero-modified negative binomial instead of either of the models used above. Explain why this suggestion is unlikely to significantly improve the chi-square goodness of fit of the negative binomial distribution for these data.

### Explanation

A zero modified (ZM) distribution might improve the fit of observed vs expected for the zero claims category, but the fit for both sets of NB parameters is already pretty good in that cell, and so improving it will not reduce the test statistic very much, and will add a parameter and therefore reduce the degrees of freedom.

### Examiner Report

5. In part (d), the examiners were looking for a recognition from the $\chi^2$ table that the problem with the fit was at the right tail of the distribution, not the left tail. Using a ZM distribution will reduce the degrees of freedom, without much reducing the test statistic. Many candidates omitted this part completely. Those that attempted it largely identified that the fit at 0 claims was quite good. Only a few also mentioned the reduced degrees of freedom.
