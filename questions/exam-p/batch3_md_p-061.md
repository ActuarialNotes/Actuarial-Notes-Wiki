---
id: p-061
topic: Univariate Random Variables
subtopic: Percentiles
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - exponential-distribution
  - percentiles
  - policy-limits
wiki_link: Concepts/Percentiles
answer: C
points: 1
---

An insurance policy reimburses dental expense, $X$, up to a maximum benefit of 250. The probability density function for $X$ is:
$$f(x) = \begin{cases} ce^{-0.004x}, & x \ge 0 \\ 0, & \text{otherwise} \end{cases}$$
where $c$ is a constant.

Calculate the median benefit for this policy.

- A) 161
- B) 165
- C) 173
- D) 182
- E) 250

## Explanation

$X$ has an exponential distribution. Therefore, $c=0.004$ and the distribution function is $F(x) = 1 - e^{-0.004x}$.

The benefit is $Y = X \wedge 250$. We need to find the median of $Y$. First, ignore the maximum benefit and find the median $m$ of $X$:
$$0.5 = F(m) = 1 - e^{-0.004m} \implies e^{-0.004m} = 0.5$$
$$m = \frac{-\ln(0.5)}{0.004} \approx \frac{0.6931}{0.004} \approx 173.29$$

Because this median (173.29) is strictly less than the maximum benefit of 250, it is also the median of the benefit amount $Y$.
