---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-11-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:1cc885d754310654676e021b9ced55c04d1a845f33f9772ec0a57a676194895d
  sources:
    - "Joint Probability Mass Function | Marginal PMF | PMF, §5.1.1 Joint PMF, PDF text, sha256:d6a9c8a66c037dfcf2c92c95772b3063f6cc3c28bef0493f0eee8003b4496274 — https://www.probabilitycourse.com/chapter5/5_1_1_joint_pmf.php"
    - "Conditional Distributions, §3.5 Conditional Probability Density Functions, sha256:ad76250f09b0c4438869894ebb75a07a5cf0465944d7b5ff2b3c270fcc3b369e — https://www.randomservices.org/random/dist/Conditional.html"
    - "The Multinomial Distribution, §11.5 Distributions, sha256:eee1779c2c22be3a73f51f9149c846395c8ba2cbe8609433afd865b3c9a50e2e — https://www.randomservices.org/random/bernoulli/Multinomial.html"
    - "https://math.dartmouth.edu/~prob/prob/prob.pdf, §4.2 Def. 4.4, PDF p.151, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf, Topic 3 Multivariate Random Variables, outcomes a-b, PDF p.4, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Joint Probability Function.md
---

![[Media/Figures/Joint_Probability_Function.svg|340]]

A **Joint Probability Function** of discrete [[Random Variable|random variables]] $X$ and $Y$ gives the probability that $X = x$ and $Y = y$ at the same time:

> $$f(x, y) = P(X = x, Y = y)$$

Every value of $f(x, y)$ is at least 0, and the values over all pairs add to 1:

> $$\sum_x \sum_y f(x, y) = 1$$

The continuous counterpart is the [[Joint Probability Density Function|joint density]].

> [!idea] The idea
> Every probability about $X$ and $Y$ is a sum of values of their joint probability function.

Adding a row of the table gives a [[Marginal Probability Function|marginal probability]]. Dividing a row by its total gives a [[Conditional Probability Function|conditional probability function]].

> [!example]- $X$ and $Y$ are each 0 or 1, with $f(0, 0) = 0.5$, $f(0, 1) = 0.2$ and $f(1, 0) = 0.2$. What is $f(1, 1)$? {Example}
> - The four values add to 1.
> - $f(1, 1) = 1 - 0.5 - 0.2 - 0.2 = 0.1$.

## The probability of an event

The probability of an event about $X$ and $Y$ is

> $$P\big((X, Y) \in R\big) = \sum_{(x, y) \in R} f(x, y)$$

- $R$ is the set of pairs $(x, y)$ for which the event holds.

> [!example]- $X$ and $Y$ are the numbers of auto and home claims, with the joint probability function below. What is the probability of at least two claims in total? {Example}
> The joint probability function:
>
> | | $Y = 0$ | $Y = 1$ | $Y = 2$ |
> | --- | --- | --- | --- |
> | $X = 0$ | 0.30 | 0.15 | 0.05 |
> | $X = 1$ | 0.20 | 0.20 | 0.10 |
>
> - At least two claims in total means $x + y \ge 2$.
> - The pairs are $(0, 2)$, $(1, 1)$ and $(1, 2)$.
> - The probability is $0.05 + 0.20 + 0.10 = 0.35$.

## The distribution of a sum

The probability that $X + Y$ equals $s$ adds the pairs whose values add to $s$:

> $$P(X + Y = s) = \sum_x f(x, s - x)$$

An [[Aggregate Loss Model|aggregate loss]] is such a sum, with one term for each claim.

> [!example]- For the auto and home claims above, what is the probability of exactly two claims in total? {Example}
> - The pairs that add to 2 are $(0, 2)$ and $(1, 1)$.
> - $P(X + Y = 2) = 0.05 + 0.20 = 0.25$.

The distribution of a difference is found the same way: list every pair, and add the probabilities of the pairs whose values differ by $d$. For independent $X$ and $Y$, each pair's probability is the product $f(x, y) = P(X = x)\,P(Y = y)$.

## A joint probability function given by a formula

When $f(x, y)$ is a formula with an unknown constant, the constant makes the values over the support add to 1. Only the pairs in the support are added.

> [!example]- $f(x, y) = c(x + y)$ for $x$ and $y$ in $\{0, 1, 2\}$ with $x \le y$. What is $c$? {Example}
> - The pairs with $x \le y$ are $(0, 0)$, $(0, 1)$, $(0, 2)$, $(1, 1)$, $(1, 2)$ and $(2, 2)$.
> - Their values of $x + y$ add to $0 + 1 + 2 + 2 + 3 + 4 = 12$.
> - So $12c = 1$ and $c = \frac{1}{12}$.

> [!trap] Summing over the wrong support
> Summing $x + y$ over all nine pairs in the example gives 18 and the wrong $c = \frac{1}{18}$. Add only the pairs the support allows.

Counts of several categories, such as claims by type, have a joint probability function of their own, the [[Multivariate Distribution#The multinomial distribution|multinomial distribution]].
