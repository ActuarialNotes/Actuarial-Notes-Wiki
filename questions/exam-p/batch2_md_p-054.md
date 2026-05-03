---
id: p-054
topic: Univariate Random Variables
subtopic: Percentiles
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - continuous-distributions
  - percentiles
wiki_link: Concepts/Percentiles
answer: B
points: 1
---

An insurer's annual weather-related loss, $X$, is a random variable with density function
$$f(x) = \begin{cases} \frac{2.5(200)^{2.5}}{x^{3.5}}, & x > 200 \\ 0, & \text{otherwise.} \end{cases}$$

Calculate the difference between the $30^{\text{th}}$ and $70^{\text{th}}$ percentiles of $X$.

- A) 35
- B) 93
- C) 124
- D) 231
- E) 298

## Explanation

First, find the cumulative distribution function $F(x)$:
$$F(x) = \int_{200}^{x} \frac{2.5(200)^{2.5}}{t^{3.5}} dt = \left[ -\frac{(200)^{2.5}}{t^{2.5}} \right]_{200}^{x} = 1 - \left(\frac{200}{x}\right)^{2.5}$$

For a given percentile $p$, we set $F(x_p) = p$:
$$p = 1 - \left(\frac{200}{x_p}\right)^{2.5} \implies \left(\frac{200}{x_p}\right)^{2.5} = 1 - p \implies x_p = \frac{200}{(1-p)^{0.4}}$$

Calculate the $70^{\text{th}}$ percentile ($p=0.7$) and $30^{\text{th}}$ percentile ($p=0.3$):
$$x_{0.7} = \frac{200}{(1-0.7)^{0.4}} = \frac{200}{0.3^{0.4}} \approx \frac{200}{0.6178} \approx 323.73$$
$$x_{0.3} = \frac{200}{(1-0.3)^{0.4}} = \frac{200}{0.7^{0.4}} \approx \frac{200}{0.8671} \approx 230.66$$

Difference $= 323.73 - 230.66 = 93.07$.
