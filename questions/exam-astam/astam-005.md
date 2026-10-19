---
id: "astam-005"
exam: "Exam ASTAM"
topic: "Risk Measure"
learning_objective: "Severity Models"
difficulty: hard
type: multi-part
wiki_link:
  - Concepts/Risk+Measure
  - Concepts/Generalized+Extreme+Value+Distribution
  - Concepts/Exponential+Distribution
points: 5
---

You are given that $X_1, X_2, \ldots, X_n$ are independent and identically distributed copies of a continuous loss random variable $X$, where $X$ represents a firm's aggregate daily losses from operational risks. Let $M_n = \max\left(X_1, X_2, \ldots, X_n\right)$.

The *n-day Expected Maximum* (*nDEM*) risk measure is defined as $\rho(X) = \mathrm{E}\left[M_n\right]$.

Currently, the firm uses the 95% VaR risk measure, denoted $Q_{0.95}(X)$. A colleague suggests changing to the *nDEM* risk measure, using $n = 20$ for consistency with the current 1-in-20-day standard.

## Part a

Show that $\Pr\left[M_{20} > Q_{0.95}(X)\right] = 0.64$ to the nearest 0.01. You should calculate the probability to the nearest 0.001.

### Explanation

$$\begin{aligned}
\Pr[M_{20} > Q_{0.95}(X)] &= 1 - \Pr[M_{20} \le Q_{0.95}(X)] \\
&= 1 - F_X\big(Q_{0.95}(X)\big)^{20} \\
&= 1 - (0.95)^{20} \\
&= 1 - 0.35849 \\
&= 0.64151
\end{aligned}$$

## Part b

Now suppose that $X$ is exponentially distributed with mean 1. Let $\alpha(n) = \dfrac{n-1}{n}$.

Show that the $\alpha(n)$-VaR of $X$ is $Q_{\alpha(n)}(X) = \log n$.

### Explanation

$$\alpha(n) = 1 - \frac{1}{n} = \Pr\big[X \le Q_{\alpha(n)}(X)\big] = 1 - e^{-Q_{\alpha(n)}(X)}$$

$$\Rightarrow \frac{1}{n} = e^{-Q_{\alpha(n)}(X)} \Rightarrow n = e^{Q_{\alpha(n)}(X)}$$

$$\Rightarrow \log n = Q_{\alpha(n)}(X)$$

## Part c

Show that the $\alpha(n)$-Expected Shortfall of $X$ is $ES_\alpha(X) = 1 + \log n$. You may use without proof the memoryless property of the exponential distribution.

### Explanation

$$\begin{aligned}
\mathrm{ES}_{\alpha(n)}(X) &= \mathrm{E}[X \mid X > Q_{\alpha(n)}(X)] \quad \text{as } X \text{ is continuous} \\
&= Q_{\alpha(n)}(X) + E[X - Q_{\alpha(n)}(X) \mid X > Q_{\alpha(n)}(X)] \\
&= Q_{\alpha(n)}(X) + E[X] \quad \text{from the memoryless property} \\
&= \log n + 1
\end{aligned}$$

## Part d

You are given that

- The exponential distribution is in the Maximum Domain of Attraction (MDA) of the Gumbel distribution.
- The mean of the standard Gumbel distribution is 0.5772.
- The normalizing functions for the exp(1) distribution, under the Fisher-Tippett-Gnedenko theorem, are $c_n = 1$ and $d_n = \log n$.

- (i) Explain what it means to say that the exponential distribution is in the MDA of the Gumbel distribution.
- (ii) Assume that $n$ is sufficiently large that the normalized $n$-day maximum loss can be approximated by the standard Gumbel distribution. Show that

$$Q_{\alpha(n)}(X) < E[M_n] < ES_{\alpha(n)}(X)$$

### Explanation

The exponential distribution is in the MDA of the Gumbel EV distribution means that there exist deterministic functions $c_n$ and $d_n$, such that as $n \to \infty$, the distribution of $\dfrac{M_n - d_n}{c_n}$ converges to the standard Gumbel distribution.

Let $H(x)$ denote the d.f. of the Gumbel distribution.

$$\begin{aligned}
\Pr\left[\frac{M_n - d_n}{c_n} \le x\right] \approx H(x) &\Rightarrow E\left[\frac{M_n - d_n}{c_n}\right] \approx 0.5772 \\
&\Rightarrow E\big[M_n - \log n\big] \approx 0.5772 \\
&\Rightarrow E[M_n] \approx 0.5772 + \log n
\end{aligned}$$

So we have

$$\big(Q_{\alpha(n)} = \log n\big) < \big(\mathrm{E}[M_n] = \log n + 0.5772\big) < \big(\mathrm{ES}_{\alpha(n)} = \log n + 1\big)$$

## Part e

Explain why the ordering in (d) is likely to hold more generally.

### Explanation

Suppose we have a sample of $20N$ values of $X_i$, split into $N$ blocks of 20, where $N$ is a large number.

We would approximate $\mathrm{E}[M_{20}]$ by taking the average of the $N$ block maxima. As $N \to \infty$ this approximation will converge to the true value.

We would approximate $\mathrm{ES}_{0.95}$ by taking the average of the largest $N$ values. As $N \to \infty$ this approximation will converge to the true value. This cannot be smaller than the $\mathrm{E}[M_{20}]$ estimate, (as the boundary case is that the $N$ largest values are also block maxima) but it could be bigger, if one or more blocks have several values that are larger than the smallest block maximum. Hence, $\mathrm{ES}_{0.95}$ must be greater than $\mathrm{E}[M_{20}]$, unless both are equal to the maximum possible value of $X$.

Also, for each block, the estimated 95% quantile of $X$ lies between the 19th and 20th values (the smoothed empirical estimate would be the 19.95th value, estimated by linear interpolation). That means that the expected value of the 95% quantile is less than or equal to the expected value of the block maximum, with a block size of 20, i.e. that $\mathrm{E}[M_{20}]$, must be greater than $Q_{0.95}$, unless both are equal to the maximum possible value of $X$.
