---
id: "astam-014"
exam: "Exam ASTAM"
topic: "Mixture Distribution"
learning_objective: "Severity Models"
difficulty: hard
type: multi-part
wiki_link:
  - Concepts/Mixture+Distribution
  - Concepts/Spliced+Distribution
  - Concepts/Mean+Excess+Loss
  - Concepts/Risk+Measure
  - Concepts/Generalized+Extreme+Value+Distribution
  - Concepts/Tail+Weight
  - Concepts/Moment
  - Concepts/Severity+Distribution
  - Concepts/Probability+Distributions
points: 0
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-25
  last_checked_by: agent:validate-v1
  content_hash: sha256:e60aabe27053ca40e56e9383bc84e4890c8f50ab38d91ba3e6065e978dcb9a8f
  sources:
    - "SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q14, p.19, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf"
    - "SOA ASTAM Solutions to Sample Questions, Q14, pp.27-28, sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-014.md
---

Two severity models, denoted by $X_1$ and $X_2$, are created to estimate a ground-up loss. You are given the following information.

- (i) $X_1$ has a density function
  $$f_1(x) = 0.001\beta e^{-0.001x} + 0.002(1-\beta)e^{-0.002x}, \qquad x > 0,$$
  where $\beta$ is a constant between 0 and 1.
- (ii) The density of $X_2$ is proportional to the density of an exponential distribution with mean 500 in $(0,\ 500)$ and proportional to the density of a two-parameter Pareto distribution with $\alpha = 3$ and $\theta = 2000$ in $(500,\ \infty)$.
- (iii) The probability that the loss is no more than 500 is the same under both models.

You are given that the mean of the ground-up loss is 800, and $\beta$ is determined by matching the first moment.

## Part a

Show that $\beta = 0.6$.

### Explanation
$X_1$ is a mixture of two exponential distributions, i.e.

$X_1 = \beta Y_1 + (1-\beta) Y_2$ (as printed) where $Y_1 \sim \exp(1000)$ and $Y_2 \sim \exp(500)$

$$\operatorname{E}\left[X_1\right] = \beta \operatorname{E}\left[Y_1\right] + (1-\beta)\operatorname{E}\left[Y_2\right] = \beta(1000) + (1-\beta)500$$

Set equal to 800 $\Rightarrow \beta = 0.6$

## Part b

If $X_1$ is used to model the ground-up loss, calculate the mean excess loss over a deductible of 200.

### Explanation
$$E\left[X_1 - 200 \mid X_1 > 200\right] = \frac{1}{\Pr\left[X_1 > 200\right]} \int_{200}^{\infty} (x - 200)\left(\beta f_{Y_1}(x) + (1-\beta) f_{Y_2}(x)\right) dx$$

$$\Pr\left[X_1 > 200\right] = \beta S_{Y_1}(200) + (1-\beta) S_{Y_2}(200)$$

where $S_Y(x) = 1 - F_Y(x)$ is the survival function of $Y$.

$$\Rightarrow \Pr\left[X_1 > 200\right] = 0.6\left(e^{-200/1000}\right) + 0.4\left(e^{-200/500}\right) = 0.49124 + 0.26813 = 0.75934$$

Also, from the memoryless property of the exponential distribution:

$$\int_{200}^{\infty} (x - 200) f_Y(x)\, dx = \Pr\left[Y > 200\right] \times E\left[Y\right]$$

$$\Rightarrow E\left[X_1 - 200 \mid X_1 > 200\right] = \frac{0.49124(1000) + 0.26813(500)}{0.75934} = 823.46.$$

## Part c

If $X_1$ is used to model the ground-up loss, calculate the Value at Risk of the loss at the 90% security level.

### Explanation
Let $Q$ denote the 90% VaR of $X_1$. Then

$$
\begin{align*}
\Pr\left[X_1 > Q\right] &= 0.6 \Pr\left[Y_1 > Q\right] + 0.4 \Pr\left[Y_2 > Q\right] \\
                        &= 0.1 \\
\Rightarrow 0.6e^{-Q/1000} + 0.4e^{-Q/500} &= 0.1.
\end{align*}
$$

Let $Z = e^{-Q/1000}$, so that $Z^2 = e^{-Q/500}$. Then

$$Z = \frac{-0.6 \pm \sqrt{0.6^2 + 4(0.4)(0.1)}}{0.8} = 0.1514 \quad (\text{ignore } Z < 0 \text{ solution})$$

$$\Rightarrow Q = 1888.$$

## Part d

Determine the density function of $X_2$

### Explanation
$$
f_{X_2}(x) = \begin{cases} k(0.002)e^{-0.002x} & 0 < x \le 500 \\[4pt] c\,\dfrac{\alpha\theta^\alpha}{(\theta + x)^{\alpha+1}} & 500 < x \end{cases} \qquad \text{for constants } k \text{ and } c.
$$

$$F_{X_2}(500) = k\left(1 - e^{-1}\right) = F_{X_1}(500)0.6\left(1 - e^{-0.5}\right) + 0.4\left(1 - e^{-1}\right) = 0.48893 \text{ (as printed)}$$

$$\Rightarrow k = 0.77348$$

$$S_{X_2}(500) = c\left(\frac{2000}{2500}\right)^3 = 1 - 0.48893 = 0.51107 \Rightarrow c = 0.99818$$

## Part e

If $X_2$ is used to model the ground-up loss, calculate the Value at Risk of the loss at the 90% security level.

### Explanation
Let $Q$ denote the 90% VaR of $X_2$. Then

$$\Pr\left[X_2 > Q\right] = 0.1 \Rightarrow c\left(\frac{2000}{2000 + Q}\right)^3 = 0.1$$

$$\Rightarrow Q = 2306.3$$

## Part f

Compare the tails of the two severity models. Justify your answer.

### Explanation
The tail of $X_1$ will behave very similarly to the exp(1000) distribution. The exponential distribution is thin tailed; it is in the MDA of the Gumbel distribution, and it has a constant hazard function.

The tail of $X_2$ will behave very similarly to the Pareto(3,2000) distribution. This is much fatter tailed. It lies in the MDA of the Frechet distribution, which is the fattest tailed of the EV distributions. It has decreasing hazard function.
