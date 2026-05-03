---
id: p-068
topic: Multivariate Random Variables
subtopic: Linear Combinations of Random Variables
difficulty: hard
type: multiple-choice
tags:
  - exam-p
  - normal-distribution
  - central-limit-theorem
wiki_link: Concepts/Linear+Combinations+of+Random+Variables
answer: B
points: 1
---

A company manufactures a brand of light bulb with a lifetime in months that is normally distributed with mean 3 and variance 1. A consumer buys a number of these bulbs with the intention of replacing them successively as they burn out. The light bulbs have mutually independent lifetimes.

Calculate the smallest number of bulbs to be purchased so that the succession of light bulbs produces light for at least 40 months with probability at least 0.9772.

- A) 14
- B) 16
- C) 20
- D) 40
- E) 55

## Explanation

Let $n$ be the number of bulbs purchased. The total lifetime $S_n$ is normally distributed because it's a sum of independent normal random variables.

Mean: $\mu = 3n$
Variance: $\sigma^2 = n \implies \sigma = \sqrt{n}$

We want $P(S_n \ge 40) \ge 0.9772$.
$$P\left(Z \ge \frac{40 - 3n}{\sqrt{n}}\right) \ge 0.9772$$
From standard normal tables, $P(Z \le 2) = 0.9772$, so $P(Z \ge -2) = 0.9772$. Thus, we need:
$$\frac{40 - 3n}{\sqrt{n}} \le -2$$
$$40 - 3n \le -2\sqrt{n}$$
$$3n - 2\sqrt{n} - 40 \ge 0$$
Let $x = \sqrt{n}$:
$$3x^2 - 2x - 40 \ge 0$$
Solving the quadratic equation $3x^2 - 2x - 40 = 0$:
$$x = \frac{2 \pm \sqrt{4 - 4(3)(-40)}}{6} = \frac{2 \pm \sqrt{484}}{6} = \frac{2 \pm 22}{6}$$
The positive root is $x = \frac{24}{6} = 4$.
So $\sqrt{n} \ge 4 \implies n \ge 16$.
