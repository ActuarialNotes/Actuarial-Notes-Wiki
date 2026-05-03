---
id: p-063
topic: Univariate Random Variables
subtopic: Conditional Probability
difficulty: hard
type: multiple-choice
tags:
  - exam-p
  - exponential-distribution
  - percentiles
  - deductibles
wiki_link: Concepts/Conditional+Probability
answer: E
points: 1
---

An insurance company sells an auto insurance policy that covers losses incurred by a policyholder, subject to a deductible of 100. Losses incurred follow an exponential distribution with mean 300.

Calculate the $95^{\text{th}}$ percentile of losses that exceed the deductible.

- A) 600
- B) 700
- C) 800
- D) 900
- E) 1000

## Explanation

Let $X \sim \text{Exp}(\theta = 300)$. We are seeking the 95th percentile of the conditional distribution of $X$ given $X > 100$.
Due to the memoryless property of the exponential distribution, the excess loss $Y = X - 100 \mid X > 100$ is also exponentially distributed with the same mean $\theta = 300$.

We need to find the 95th percentile of this excess loss $Y$:
$$P[Y \le p] = 0.95 \implies 1 - e^{-p/300} = 0.95 \implies e^{-p/300} = 0.05$$
$$p = -300 \ln(0.05) \approx 898.7$$

The question asks for the 95th percentile of the *loss* $X$ that exceeds the deductible, which is $p + 100$:
$$x_{0.95} = 898.7 + 100 = 998.7 \approx 1000$$

*(Alternatively, solving $P(X \le x \mid X > 100) = 0.95$ yields the same result: $\frac{F(x) - F(100)}{1 - F(100)} = 0.95 \implies x \approx 1000$)*
