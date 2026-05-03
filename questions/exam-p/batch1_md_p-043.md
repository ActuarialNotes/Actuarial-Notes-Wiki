---
id: p-043
topic: Univariate Random Variables
subtopic: Expected Value
difficulty: easy
type: multiple-choice
tags:
  - exam-p
  - expected-value
  - continuous-distributions
wiki_link: Concepts/Expected+Value
answer: D
points: 1
---

Let $X$ be a continuous random variable with density function
$$f(x) = \begin{cases} \frac{|x|}{10}, & -2 \le x \le 4 \\ 0, & \text{otherwise.} \end{cases}$$

Calculate the expected value of $X$.

- A) 1/5
- B) 3/5
- C) 1
- D) 28/15
- E) 12/5

## Explanation

The expected value $E[X]$ is given by $\int x f(x) dx$. Split the integral at 0 because of the absolute value:
$$E[X] = \int_{-2}^{0} x\left(\frac{-x}{10}\right)dx + \int_{0}^{4} x\left(\frac{x}{10}\right)dx$$
$$= \int_{-2}^{0} \frac{-x^2}{10} dx + \int_{0}^{4} \frac{x^2}{10} dx$$
$$= \left( \frac{-x^3}{30} \right)\Big|_{-2}^{0} + \left( \frac{x^3}{30} \right)\Big|_{0}^{4}$$
$$= \left( 0 - \frac{-(-8)}{30} \right) + \left( \frac{64}{30} - 0 \right) = -\frac{8}{30} + \frac{64}{30} = \frac{56}{30} = \frac{28}{15}$$
