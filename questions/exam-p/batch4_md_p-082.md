---
id: p-082
topic: Multivariate Random Variables
subtopic: Conditional Probability Function
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - conditional-variance
  - discrete-distributions
wiki_link: Concepts/Conditional+Probability+Function
answer: C
points: 1
---

A diagnostic test for the presence of a disease has two possible outcomes: 1 for disease present and 0 for disease not present. Let $X$ denote the disease state (0 or 1) of a patient, and let $Y$ denote the outcome of the diagnostic test.

The joint probability function of $X$ and $Y$ is given by:
* $P[X=0, Y=0] = 0.800$
* $P[X=1, Y=0] = 0.050$
* $P[X=0, Y=1] = 0.025$
* $P[X=1, Y=1] = 0.125$

Calculate $Var(Y \mid X=1)$.

- A) 0.13
- B) 0.15
- C) 0.20
- D) 0.51
- E) 0.71

## Explanation

We need the conditional distribution of $Y$ given $X=1$.
First, calculate the marginal probability $P(X=1)$:
$$P(X=1) = P[X=1, Y=0] + P[X=1, Y=1] = 0.050 + 0.125 = 0.175$$

Now find the conditional probabilities:
$$P(Y=0 \mid X=1) = \frac{P(X=1, Y=0)}{P(X=1)} = \frac{0.050}{0.175} = \frac{50}{175} = \frac{2}{7} \approx 0.286$$
$$P(Y=1 \mid X=1) = \frac{P(X=1, Y=1)}{P(X=1)} = \frac{0.125}{0.175} = \frac{125}{175} = \frac{5}{7} \approx 0.714$$

Given $X=1$, $Y$ is a Bernoulli random variable with probability of success $p = 5/7$.
The variance of a Bernoulli random variable is $p(1-p)$:
$$Var(Y \mid X=1) = \left(\frac{5}{7}\right)\left(\frac{2}{7}\right) = \frac{10}{49} \approx 0.204$$
