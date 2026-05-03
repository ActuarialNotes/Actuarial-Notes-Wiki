---
id: p-048
topic: Univariate Random Variables
subtopic: Continuous Univariate Distributions
difficulty: hard
type: multiple-choice
tags:
  - exam-p
  - deductibles
  - expected-value
wiki_link: Concepts/Expected+Value
answer: C
points: 1
---

A manufacturer's annual losses follow a distribution with density function
$$f(x) = \begin{cases} \frac{2.5(0.6)^{2.5}}{x^{3.5}}, & x > 0.6 \\ 0, & \text{otherwise.} \end{cases}$$

To cover its losses, the manufacturer purchases an insurance policy with an annual deductible of 2.

Calculate the mean of the manufacturer's annual losses not paid by the insurance policy.

- A) 0.84
- B) 0.88
- C) 0.93
- D) 0.95
- E) 1.00

## Explanation

Let $X$ be the annual loss. The loss not paid by the insurance policy (i.e., the unreimbursed loss) is $X$ if $X \le 2$ and $2$ if $X > 2$. We need to find $E[X \wedge 2]$.

$$E[X \wedge 2] = \int_{0.6}^{2} x f(x) dx + \int_{2}^{\infty} 2 f(x) dx$$
$$= \int_{0.6}^{2} x \frac{2.5(0.6)^{2.5}}{x^{3.5}} dx + 2 \int_{2}^{\infty} \frac{2.5(0.6)^{2.5}}{x^{3.5}} dx$$
$$= 2.5(0.6)^{2.5} \int_{0.6}^{2} x^{-2.5} dx + 2.5(0.6)^{2.5} \left( 2 \int_{2}^{\infty} x^{-3.5} dx \right)$$
$$= 2.5(0.6)^{2.5} \left( \frac{x^{-1.5}}{-1.5} \Big|_{0.6}^{2} \right) + 2(2.5)(0.6)^{2.5} \left( \frac{x^{-2.5}}{-2.5} \Big|_{2}^{\infty} \right)$$
$$= 2.5(0.6)^{2.5} \left( \frac{0.6^{-1.5} - 2^{-1.5}}{1.5} \right) + 2(0.6)^{2.5} (2^{-2.5})$$
$$= \frac{2.5}{1.5}(0.6)^{2.5}(0.6^{-1.5}) - \frac{2.5}{1.5}(0.6)^{2.5}(2^{-1.5}) + 2(0.6)^{2.5}(2^{-2.5})$$
$$= \frac{2.5}{1.5}(0.6) - \frac{2.5}{1.5}(0.6)^{2.5}(2^{-1.5}) + 2(0.6)^{2.5}(2^{-2.5}) \approx 0.9343$$
