---
id: p-045
topic: Univariate Random Variables
subtopic: Expected Value
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - expected-value
  - exponential-distribution
  - continuous-distributions
wiki_link: Concepts/Expected+Value
answer: D
points: 1
---

A piece of equipment is being insured against early failure. The time from purchase until failure of the equipment is exponentially distributed with mean 10 years.

The insurance will pay an amount $x$ if the equipment fails during the first year, and it will pay $0.5x$ if failure occurs during the second or third year. If failure occurs after the first three years, no payment will be made.

Calculate $x$ such that the expected payment made under this insurance is 1000.

- A) 3858
- B) 4449
- C) 5382
- D) 5644
- E) 7235

## Explanation

Let $T$ be the time to failure. $T \sim \text{Exp}(\lambda = 0.1)$. The density is $f(t) = 0.1e^{-t/10}$.
The expected payment is:
$$E[P] = x \int_{0}^{1} 0.1e^{-t/10} dt + 0.5x \int_{1}^{3} 0.1e^{-t/10} dt$$

Evaluating the integrals:
$$\int_{0}^{1} 0.1e^{-t/10} dt = -e^{-t/10} \Big|_{0}^{1} = 1 - e^{-0.1}$$
$$\int_{1}^{3} 0.1e^{-t/10} dt = -e^{-t/10} \Big|_{1}^{3} = e^{-0.1} - e^{-0.3}$$

Substitute into the equation:
$$1000 = x(1 - e^{-0.1}) + 0.5x(e^{-0.1} - e^{-0.3})$$
$$1000 = x(1 - e^{-0.1} + 0.5e^{-0.1} - 0.5e^{-0.3}) = x(1 - 0.5e^{-0.1} - 0.5e^{-0.3})$$
$$1000 = x(1 - 0.5(0.9048) - 0.5(0.7408)) = x(1 - 0.4524 - 0.3704) = x(0.1772)$$
$$x = \frac{1000}{0.1772} \approx 5643.34$$

The closest value is 5644.
