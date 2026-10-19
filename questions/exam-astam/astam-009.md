---
id: "astam-009"
exam: "Exam ASTAM"
topic: "Bühlmann-Straub Credibility"
learning_objective: "Credibility"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Bühlmann-Straub+Credibility
  - Concepts/Credibility
  - Concepts/Empirical+Bayes+Credibility
  - Concepts/Unbiasedness
points: 3
---

An insurer manages a portfolio of $r$ commercial insurance policies.

Let $X_{ij}$ denote the aggregate claims from insurance policy $i$ in year $j$, for $j = 1, 2, \ldots, n$.

You are given the following information.

- (i) Each $X_{ij}$ is the average loss from $m_{i,j}$ different risks, that is $X_{ij} = \dfrac{1}{m_{i,j}} \displaystyle\sum_{l=1}^{m_{ij}} Y_{ijl}$
- (ii) The individual risks, $Y_{i,j,l}$, are dependent on an unknown parameter, $\theta_i$.
- (iii) $Y_{i,j,l} \mid \theta_i$ are i.i.d for $l = 1, 2, \ldots, m_{i,j}$, and for $j = 1, 2, \ldots, n$.
- (iv) $E\left[Y_{i,j,l} \mid \theta_i\right] = \mu(\theta_i)$ and $\operatorname{Var}\left[Y_{i,j,l} \mid \theta_i\right] = v(\theta_i)$
- (v) $\theta_i$ are i.i.d, with $\mu = E\left[\mu(\theta_i)\right]$, $v = E\left[v(\theta_i)\right]$, for $i = 1, 2, \cdots, r$.

## Part a

- (i) Write down the assumptions of the Bühlmann-Straub model, in terms of $\mu(\theta_i)$ and $v(\theta_i)$.
- (ii) Show that the assumptions for the Bühlmann-Straub model are valid in this case.

### Explanation
The assumptions are

1. $E\left[X_{ij} \mid \theta_i\right] = \mu(\theta_i)$ independent of $j$
2. $Var\left[X_{i,j} \mid \theta_j\right] \times m_{i,j} = v(\theta_i)$ independent of $j$

In this case:

$$
\begin{align*}
E\left[X_{ij} \mid \theta_i\right] &= E\left[\frac{1}{m_{i,j}} \sum_{l=1}^{m_{i,j}} Y_{i,j,l} \,\middle|\, \theta_i\right] \\
                                   &= \frac{1}{m_{i,j}}\left(m_{i,j} E\left[Y_{i,j,l} \mid \theta_i\right]\right) \\
&= \mu(\theta_i) \\
Var\left[X_{ij} \mid \theta_i\right] &= Var\left[\frac{1}{m_{i,j}} \sum_{l=1}^{m_{i,j}} Y_{i,j,l} \,\middle|\, \theta_i\right] \\
                                     &= \frac{1}{m_{i,j}^2}\left(m_{i,j} Var\left[Y_{i,j,l} \mid \theta_i\right]\right) \\
&= \frac{v(\theta_i)}{m_{i,j}} \\
\Rightarrow Var\left[X_{i,j} \mid \theta_i\right] m_{i,j} &= v(\theta_i)
\end{align*}
$$

## Part b

- (i) Write down the formula for $Z_i$, the credibility factor for insurance policy $i$, defining all the terms.
- (ii) Explain why it is reasonable that a larger value of $\hat{a}$ generates a larger value for $Z_i$.
- (iii) Explain why it is reasonable that a larger value of $\hat{v}$ generates a smaller value for $Z_i$.
- (iv) Explain why it is reasonable that a larger value of $m_i$ generates a larger value for $Z_i$.

### Explanation
(i) $Z_i = \dfrac{m_i}{m_i + \frac{\hat{v}}{\hat{a}}}$, where $m_i = \displaystyle\sum_{j=1}^{n} m_{i,j}$, and $\hat{a}$ and $\hat{v}$ are estimates of $\operatorname{Var}\left[\mu(\theta_i)\right]$ and $\operatorname{E}\left[v(\theta_i)\right]$ respectively.

(ii) The parameter $a$ is a measure of the uncertainty in the estimation of $\mu = E\left[\mu(\theta_i)\right]$. Greater uncertainty in the prior mean estimate indicates that it should have less weight, and that the data, represented by $\bar{X}_i$, should have more weight. As $Z_i$ is the weight given to the data, a larger value of $a$ leads to a larger value of $Z_i$.

(iii) The parameter $v$ is a measure of the variability within the data from the individual risk. More variability means that there is more uncertainty associates with the accuracy of $\bar{X}_i$ as an estimate of the risk premium. That indicates that we should put more weight on the prior mean, and less weight on $\bar{X}_i$, which is achieved through a smaller value for $Z_i$.

(iv) The $m_i$ parameter is a measure of the volume of data available in the estimation of $\bar{X}_i$. If we have more data, then the estimate is more reliable, so we expect a larger value of $Z_i$.

## Part c

The estimator for $\mu$ is $\hat{\mu} = \dfrac{\sum_{i=1}^{r} Z_i \bar{X}_i}{\sum_{i=1}^{r} Z_i}$

- (i) Show that that the estimator for $\mu$ is unbiased.
- (ii) The weights used in the estimator for $\mu$ are proportional to $\operatorname{Var}[\bar{X}_i]$. Explain why this weighting is preferred to other possible weightings.

### Explanation
(i) From (a) we have $E\left[X_{ij} \mid \theta_i\right] = \mu(\theta_i)$

$$
\begin{align*}
\Rightarrow E\left[\bar{X}_i \mid \theta_i\right] &= \frac{\sum_{j=1}^{n} m_{ij} E\left[X_{ij} \mid \theta_i\right]}{\sum_{j=1}^{n} m_{ij}} \\
&= \mu(\theta_i) \\
\Rightarrow E\left[\hat{\mu}\right] &= \frac{\sum_{i=1}^{r} Z_i E\left[\mu(\theta_i)\right]}{\sum_{i=1}^{r} Z_i} \\
                                    &= E\left[\mu(\theta_i)\right] \\
&= \mu
\end{align*}
$$

(ii) Using a weighted average of unbiased estimates, where the weights are approximately equal to the variance of each estimate generates (approximately) the minimum variance unbiased estimator, compared with any other weighted average.
