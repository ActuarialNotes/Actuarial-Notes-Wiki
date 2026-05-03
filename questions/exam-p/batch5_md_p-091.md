---
id: p-091
topic: Univariate Random Variables
subtopic: Expected Value
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - conditional-probability
  - expected-value
wiki_link: Concepts/Expected+Value
answer: B
points: 1
---

A man purchases a life insurance policy on his $40^{\text{th}}$ birthday. The policy will pay 5000 if he dies before his $50^{\text{th}}$ birthday and will pay 0 otherwise.

The length of lifetime, in years from birth, of a male born the same year as the insured has the cumulative distribution function
$$F(t) = \begin{cases} 0, & t \le 0 \\ 1 - \exp\left(\frac{1 - 1.1^t}{1000}\right), & t > 0 \end{cases}$$

Calculate the expected payment under this policy.

- A) 333
- B) 348
- C) 421
- D) 549
- E) 574

## Explanation

We need to find the probability that a 40-year-old man dies before age 50.
$$P(\text{dies before 50} \mid \text{alive at 40}) = P(T < 50 \mid T > 40) = \frac{P(40 < T < 50)}{P(T > 40)} = \frac{F(50) - F(40)}{1 - F(40)}$$

$$1 - F(t) = \exp\left(\frac{1 - 1.1^t}{1000}\right)$$

$$1 - F(40) = \exp\left(\frac{1 - 1.1^{40}}{1000}\right) = \exp\left(\frac{1 - 45.259}{1000}\right) = \exp(-0.044259) \approx 0.9567$$
$$1 - F(50) = \exp\left(\frac{1 - 1.1^{50}}{1000}\right) = \exp\left(\frac{1 - 117.39}{1000}\right) = \exp(-0.11639) \approx 0.8901$$

$$F(50) - F(40) = (1 - F(40)) - (1 - F(50)) = 0.9567 - 0.8901 = 0.0666$$

$$P(T < 50 \mid T > 40) = \frac{0.0666}{0.9567} = 0.0696$$

The expected payment is $5000 \times 0.0696 = 348$.
