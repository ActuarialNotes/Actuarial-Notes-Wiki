---
id: "masi-an-172"
exam: "Exam MAS-I"
topic: "Noncentral Chi-Squared Distribution"
learning_objective: "Extended Linear Models"
difficulty: hard
type: multi-part
bloom: analyze
wiki_link:
  - Concepts/Noncentral+Chi-Squared+Distribution
  - Concepts/Power+of+a+Test
  - Concepts/ANOVA
  - Concepts/F-Distribution
points: 2
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:401e432ed533aa4660b26794d2213d63db2d3fbdf42849c693eeef233dbf3a56
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-172.md
---

An actuary plans a one-way ANOVA at the 5% level to test whether mean log-severity differs across three territories, with $n = 5$ claims from each. Log-severity is normal with standard deviation $\sigma = 0.5$ in every territory, and the true territory means are 8.1, 8.1 and 8.7. Under these true means the F statistic has a noncentral F-distribution with 2 and 12 degrees of freedom.

## Part a (1 point)
Calculate the noncentrality parameter $\theta$ of the F statistic's distribution. Give your answer to two decimal places.

### Answer
4.80

### Explanation
With $k$ groups of $n$ observations, the between-groups sum of squares over $\sigma^2$ is noncentral chi-squared with

$$
\theta = \frac{n\sum_j (\mu_j - \bar\mu)^2}{\sigma^2}
$$

Here $\bar\mu = (8.1 + 8.1 + 8.7)/3 = 8.3$:

$$
\begin{align*}
\sum_j (\mu_j - \bar\mu)^2 &= (-0.2)^2 + (-0.2)^2 + (0.4)^2 \\
&= 0.24 \\[4pt]
\theta &= \frac{5(0.24)}{0.5^2} \\
&= \mathbf{4.80}
\end{align*}
$$

**Common wrong entries**

- **0.96** — leaves out the factor $n = 5$; each group mean is estimated from 5 claims, which is what makes the spread detectable.
- **2.40** — divides by $\sigma = 0.5$ instead of $\sigma^2 = 0.25$.

## Part b (1 point)
The number of territories and the number of claims per territory stay fixed, so the F statistic keeps 2 and 12 degrees of freedom and the same critical value. Which of the following changes to the situation above would give the test the **highest** power?

- A) Every true territory mean is 0.3 higher: 8.4, 8.4 and 9.0
- B) The standard deviation falls from 0.5 to 0.45, with the true means unchanged
- C) The true means are 7.9, 8.3 and 8.7, with $\sigma = 0.5$
- D) The true means are 8.0, 8.6 and 8.6, with $\sigma = 0.5$

### Answer
C

### Explanation
With the degrees of freedom and the critical value fixed, the power $P\big(F(2, 12, \theta) > c\big)$ increases with $\theta$, so compare the noncentrality parameters:

| Scenario | $\sum(\mu_j - \bar\mu)^2$ | $\sigma^2$ | $\theta$ | Power |
| :--- | ---: | ---: | ---: | ---: |
| Original | 0.24 | 0.25 | 4.80 | 0.391 |
| A | 0.24 | 0.25 | 4.80 | 0.391 |
| B | 0.24 | 0.2025 | 5.93 | 0.470 |
| C | 0.32 | 0.25 | 6.40 | 0.501 |
| D | 0.24 | 0.25 | 4.80 | 0.391 |

(The power column is from software; the critical value is $F_{0.05;\,2,\,12} = 3.885$.) Scenario C has the largest $\theta$ and so the highest power. Widening the range of means from 0.6 to 0.8 raises the sum of squared deviations from 0.24 to 0.32, a gain of a third, which beats the 23% gain from the smaller $\sigma$. The answer is **C**.

- **A** — shifting every mean by the same amount leaves every deviation from $\bar\mu$ unchanged, so $\theta$ and the power are unchanged. The test detects differences, not levels.
- **B** — a smaller $\sigma$ does raise $\theta$, by the factor 0.25/0.2025 = 1.23 to 5.93, but not as far as scenario C.
- **D** — the mirror image of the original (one territory 0.4 below the mean, two 0.2 above), so $\sum(\mu_j - \bar\mu)^2$ and $\theta$ are unchanged.
