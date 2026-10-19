---
id: "astam-2026s-q6"
exam: "Exam ASTAM"
topic: "Generalized Pareto Distribution"
learning_objective: "Severity Models"
difficulty: hard
type: multi-part
year: 2026
session: Spring
wiki_link:
  - Concepts/Generalized+Pareto+Distribution
  - Concepts/Risk+Measure
  - Concepts/Tail+Weight
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Estimator
points: 11
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:08363beedd93646251fe06ea661d0c5390320a3dce3981c50623c47e16dbfe19
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-2026s-q6.md
---

A reinsurance company is analyzing the tail risk of cyber losses. The following table provides the largest 20 values from a sample of 500 cyber losses, in decreasing order.

| **Rank** | **500** | **499** | **498** | **497** | **496** | **495** | **494** | **493** | **492** | **491** |
|---|---|---|---|---|---|---|---|---|---|---|
| Loss $X$ | 21,355 | 12,495 | 10,751 | 8,450 | 7,548 | 7,530 | 6,354 | 5,668 | 5,617 | 5,498 |
| ln($X$) | 9.969 | 9.433 | 9.283 | 9.042 | 8.929 | 8.927 | 8.757 | 8.643 | 8.634 | 8.612 |
| **Rank** | **490** | **489** | **488** | **487** | **486** | **485** | **484** | **483** | **482** | **481** |
| Loss $X$ | 5,388 | 5,326 | 5,247 | 5,184 | 5,092 | 5,088 | 4,953 | 4,668 | 4,635 | 4,469 |
| ln($X$) | 8.592 | 8.580 | 8.565 | 8.553 | 8.535 | 8.535 | 8.508 | 8.448 | 8.441 | 8.405 |

You are given that the sum of the natural log values of the largest 20 losses is 175.391.

## Part a (2 points)

(i) Calculate the empirical 99% VaR.

(ii) Calculate the empirical 99% Expected Shortfall (ES).

### Explanation
Let $X_{(j)}$ denote the ranked losses.

(i) The 99% VaR is $X_{(0.99 \times 500)} = X_{(495)} = 7530$

(ii) The 99% ES is the average of the 5 largest values, i.e.

$$ES = \frac{7548 + \ldots + 21355}{5} = 12{,}119.8$$

### Examiner Report
1. Question 6 was omitted by a significant number of candidates.
2. Candidates who attempted this question generally did well on this part.

## Part b (3.5 points)

The data is fitted to the Generalized Pareto Distribution (GPD) with a threshold of $d = 4{,}953$. At this threshold, the maximum likelihood estimates (MLE) of the GPD parameters are $\hat{\xi} = 0.74$ and $\hat{\beta} = 1{,}100$.

(i) Show that the 99% VaR of the cyber losses using the fitted GPD is 7,000 to the nearest 100. You should calculate the value to the nearest 1.

(ii) Calculate the 99% ES of the cyber losses using the fitted GPD.

### Explanation
(i) From the formula sheet:

$$Q_{0.99} = d + \frac{\beta}{\xi}\left(\left(\frac{S(d)}{0.01}\right)^{\xi} - 1\right)$$

where $d = 4953$, and $S(d)$ is the empirical survival function at $d$, i.e.

$$S(d) = \frac{16}{500} = 0.032$$

$$\Rightarrow Q_{0.99} = 4953 + \frac{1100}{0.74}\left(\left(\frac{0.032}{0.01}\right)^{0.74} - 1\right) = 6981.89$$

(ii) From the formula sheet

$$\begin{align*}
ES_{0.99} &= \frac{1}{1 - \xi}\left(Q_{0.99} + \beta - \xi d\right) \\
&= \frac{1}{0.26}\left(6981.89 + 1100 - 0.74(4953)\right) \\
 &= 16{,}987.20
\end{align*}$$

### Examiner Report
1. This part was done well by the candidates who did not omit the question..

## Part c (1 point)

Show that the Hill estimator of $\alpha = \xi^{-1}$, denoted $\hat{\alpha}^H$, is 3.1 to the nearest 0.1. You should calculate the value to the nearest 0.01.

### Explanation
We have $d = X_{(464)}$. This means that in the Hill estimator formula from the formula sheet, we have $j = 484$, so that

$$\begin{align*}
\hat{\alpha}^H &= \left(\sum_{k=j}^{n} \frac{\log\left(x_{(k)}\right)}{n - j + 1} - \log\left(x_{(j)}\right)\right)^{-1} = \left(\sum_{k=484}^{500} \frac{\log\left(x_{(k)}\right)}{17} - \log(4953)\right)^{-1} \\
&= \left(\frac{175.391 - (8.405 + 8.441 + 8.448)}{17} - 8.508\right)^{-1} \\
 &= 3.1130
\end{align*}$$

### Examiner Report
1. Candidates performance was fair in part (c), on average. Many candidates correctly identified the given Hill estimator formula but missed the parameter inputs.
2. In particular, understanding that in this case, j = 484, was not recognized by a significant umber of the candidates..

## Part d (3.5 points)

The Hill estimator for the tail survival function has the form $\hat{S}^H(x) = 0.032\left(\dfrac{x}{d}\right)^{-\hat{\alpha}^H}$, where the threshold is $d = 4{,}953$.

(i) Show that the 99% VaR of the cyber losses using the Hill estimator of the survival function is 7,200 to the nearest 100. You should calculate the value to the nearest 1.

(ii) Calculate the 99% ES of the cyber losses, using the Hill estimator of the survival function.

### Explanation
(i) The $q$-VaR for the distribution is $Q_q$, say where $\hat{S}^H\left(Q_q\right) = 1 - q$, so

$$\begin{align*}
\hat{S}^H\left(Q_q\right) = 1 - q &\Rightarrow 0.032\left(\frac{Q_{0.99}}{d}\right)^{-\hat{\alpha}^H} = 0.01 \\
&\Rightarrow Q_{0.99} = \left(\frac{0.032}{0.01}\right)^{1/\hat{\alpha}^H} \times d = 7196.81
\end{align*}$$

(ii) There are several ways to calculate the ES.

For simplicity, let $\hat{\alpha} = \hat{\alpha}^H = 3.113$, so that $S(x) = kx^{-\hat{\alpha}}$ where $k = 0.032d^{\hat{\alpha}}$.

Also let $Q = Q_{0.99} = 7196.81$ from (i) above, so that $S(Q) = 0.01$.

**Method 1:** As the random variable is continuous, we have

$$\begin{align*}
ES = E\left[X \mid X > Q\right] &= \frac{1}{S(Q)}\int_Q^\infty x\, f(x)\, dx \\
&= \frac{1}{S(Q)}\left(\left[-xS(x)\right]_Q^\infty + \int_Q^\infty S(x)\, dx\right) \qquad \text{(by parts)} \\
&= Q + \frac{1}{S(Q)}\int_Q^\infty S(x)\, dx \\
 &= Q + \frac{k}{0.01}\int_Q^\infty x^{-\hat{\alpha}}\, dx \\
&= Q + \frac{k}{0.01}\frac{1}{(\hat{\alpha} - 1)}Q^{-(\hat{\alpha} - 1)} \\
 &= Q + \frac{0.032\, d^{3.113}}{0.01(2.113)Q^{2.113}} \\
&= 10{,}602.81
\end{align*}$$

**Method 2:** As above, but using the density function

$$ES = \frac{1}{S(Q)}\int_Q^\infty x\, f(x)\, dx \quad \text{where} \quad f(x) = -\frac{d}{dx}S^H(x) = \hat{\alpha}k\, x^{-\hat{\alpha} - 1}$$

$$\begin{align*}
\Rightarrow ES &= \frac{1}{S(Q)}\int_Q^\infty \hat{\alpha}k\, x^{-\hat{\alpha}}\, dx \\
&= \frac{\hat{\alpha}k}{0.01}\left[\frac{1}{\hat{\alpha} - 1}Q^{-(\hat{\alpha} - 1)}\right] \\
&= \frac{3.113\,(0.032)d^{3.113}}{(0.01)(2.113)Q^{2.113}} \\
&= 10{,}602.81
\end{align*}$$

**Method 3:**

Another definition for ES is $ES_q = \dfrac{1}{1 - q}\displaystyle\int_q^1 Q_p\, dp$

From (i) we see that $Q_p = d\left(0.032\right)^{1/\hat{\alpha}}(1 - p)^{-(1/\hat{\alpha})}$

$$\begin{align*}
\Rightarrow ES_{0.99} &= \frac{d(0.032)^{1/\hat{\alpha}}}{0.01}\int_{0.99}^1 (1 - p)^{-1/\hat{\alpha}}\, dp \\
                      &= \frac{d(0.032)^{1/\hat{\alpha}}}{0.01\left(1 - \tfrac{1}{\hat{\alpha}}\right)}\left[-(1 - p)^{1 - 1/\hat{\alpha}}\right]_{0.99}^1 \\
&= \frac{4953\left(0.33098\right)(0.99)^{0.678765}}{0.01\left(0.678765\right)} \\
 &= 10{,}602.81
\end{align*}$$

### Examiner Report
1. Although a substantial number of candidates achieved full credit on part (i), only a handful were able to apply first principles to determine the ES in part (ii).

## Part e (1 point)

State with reasons whether you would recommend using the empirical estimate from part (a)(ii), the MLE GPD estimate from part (b)(ii), or the Hill estimator of the survival function estimate from part (d)(ii) for evaluating the 99% Expected Shortfall.

### Explanation
I would recommend the MLE approach

- The MLE approach utilizes the full specification of GPD assumptions, while the Hill estimator is a semi-parametric approach that estimates the tail index only.
- The MLE approach is likely to be more stable for small data size. In this case, only about 17 extreme values are used for the MLE and the Hill estimators.
- The generated ES from Hill estimator is less conservative (smaller than the empirical ES).
- The empirical ES is constrained by the range of the data. The MLE and Hill can extrapolate the distribution beyond the data.

### Examiner Report
1. Although the MLE method is generally preferred, for the reasons stated, appropriate credit was also given if candidates chose one of the alternatives with sensible justification.
2. No credit was awarded for picking the Hill estimator "because it's the smallest". That's bad risk management.
