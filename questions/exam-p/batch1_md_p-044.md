---
id: p-044
topic: Univariate Random Variables
subtopic: Expected Value
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - exponential-distribution
  - expected-value
  - max-function
wiki_link: Concepts/Expected+Value
answer: D
points: 1
---

A device that continuously measures and records seismic activity is placed in a remote region. The time, $T$, to failure of this device is exponentially distributed with mean 3 years. Since the device will not be monitored during its first two years of service, the time to discovery of its failure is $X = \max(T, 2)$.

Calculate $E[X]$.

- A) $2 + \frac{1}{3}e^{-6}$
- B) $2 - 2e^{-2/3} + 5e^{-4/3}$
- C) 3
- D) $2 + 3e^{-2/3}$
- E) 5

## Explanation

The density function of $T$ is $f(t) = \frac{1}{3}e^{-t/3}$ for $t > 0$.

$$E[X] = E[\max(T, 2)] = \int_{0}^{2} 2 \left(\frac{1}{3}e^{-t/3}\right) dt + \int_{2}^{\infty} t \left(\frac{1}{3}e^{-t/3}\right) dt$$

The first integral:
$$\int_{0}^{2} \frac{2}{3}e^{-t/3} dt = -2e^{-t/3} \Big|_{0}^{2} = -2e^{-2/3} + 2$$

The second integral requires integration by parts ($u = t, dv = \frac{1}{3}e^{-t/3}dt \implies du = dt, v = -e^{-t/3}$):
$$\int_{2}^{\infty} t \left(\frac{1}{3}e^{-t/3}\right) dt = -te^{-t/3} \Big|_{2}^{\infty} + \int_{2}^{\infty} e^{-t/3} dt$$
$$= (0 - (-2e^{-2/3})) + \left( -3e^{-t/3} \Big|_{2}^{\infty} \right) = 2e^{-2/3} + 3e^{-2/3}$$

Summing the two parts:
$$E[X] = (-2e^{-2/3} + 2) + 2e^{-2/3} + 3e^{-2/3} = 2 + 3e^{-2/3}$$

*Alternative using memoryless property:* With probability $1 - e^{-2/3}$, it fails in the first 2 years contributing $2$ to the expectation. With probability $e^{-2/3}$, it fails after 2 years, expected value is $2 + 3 = 5$. $E[X] = 2(1-e^{-2/3}) + 5e^{-2/3} = 2 + 3e^{-2/3}$.
