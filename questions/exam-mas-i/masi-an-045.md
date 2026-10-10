---
id: "masi-an-045"
exam: "Exam MAS-I"
topic: "Percentile Matching"
learning_objective: "Statistics"
difficulty: medium
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Percentile+Matching
  - Concepts/Percentile
  - Concepts/Order+Statistics
answer: "1.27"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a0c54b227eb818ee6b5b7402bd14ea9516ecea47975a607f548158610afa0665
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-045.md
---

Nine losses are observed:

$$
85,\quad 130,\quad 210,\quad 340,\quad 400,\quad 560,\quad 780,\quad 1{,}150,\quad 1{,}900
$$

A loglogistic distribution, with CDF

$$
F(x) = \frac{(x/\theta)^{\gamma}}{1 + (x/\theta)^{\gamma}}, \qquad x > 0,
$$

is fitted by percentile matching at the 25th and 75th smoothed empirical percentiles.

Calculate the estimate of $\gamma$. Give your answer to two decimal places.

## Explanation

**Smoothed empirical percentiles.** With $n + 1 = 10$, the 25th percentile sits at position $(n+1)g = 10(0.25) = 2.5$ and the 75th at $(n+1)g = 10(0.75) = 7.5$, each halfway between two order statistics:

$$
\hat\pi_{0.25} = 0.5(130) + 0.5(210) = 170
$$

$$
\hat\pi_{0.75} = 0.5(780) + 0.5(1{,}150) = 965
$$

**Match the percentiles.** Setting $F(x) = g$ and solving gives $(x/\theta)^{\gamma} = g/(1 - g)$, the odds of $g$:

$$
\left(\frac{170}{\theta}\right)^{\gamma} = \frac{0.25}{0.75} = \frac{1}{3}, \qquad \left(\frac{965}{\theta}\right)^{\gamma} = \frac{0.75}{0.25} = 3
$$

Dividing the second equation by the first eliminates $\theta$:

$$
\left(\frac{965}{170}\right)^{\gamma} = 9
$$

$$
\hat\gamma = \frac{\ln 9}{\ln(965/170)} = \frac{2.1972}{1.7363} = 1.2654
$$

The answer is **1.27**. (Multiplying the two equations instead gives $\hat\theta = \sqrt{170 \times 965} = 405.0$.)

**Common wrong entries**

- **1.67** — matching unsmoothed percentiles: the 3rd and 7th order statistics, 210 and 780, instead of interpolating at positions 2.5 and 7.5.
- **1.39** — locating the percentiles at positions $ng = 2.25$ and $ng = 6.75$ instead of $(n+1)g$, which gives 150 and 725.
- **0.79** — dividing the logarithms the wrong way round, $\ln(965/170)/\ln 9$.
