---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:1cc885d754310654676e021b9ced55c04d1a845f33f9772ec0a57a676194895d
  sources:
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §5.1.1 Joint PMF: P((X,Y) in A) = sum of P_XY over A; marginal PMFs by summing, HTML fetched 2026-11-06, sha256:25ee67175334059751c65c27c7c49c0d7bbd0d30063358dd957815fe58fa6779 — https://www.probabilitycourse.com/chapter5/5_1_1_joint_pmf.php"
    - "Orloff & Bloom, MIT OCW 18.05 (Spring 2022), Reading 7a: Joint Distributions, Independence, §3.1 joint pmf properties p.2; §3.7 marginal pmf by summing rows/columns p.7; §4 independence cell by cell, Ex. 12 pp.9-10, sha256:12cf136bbcbef819e1a2530cbfcf15ea06ae83ec4f9ce6c0f6186c87b01d09f4 — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class07-prep-a.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 4.4 independence: joint = product of marginals for any choice of values (PDF p.151), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 3.5 Conditional Distributions: g(x|y) = f(x,y)/h(y) for fixed y; the denominator is the normalizing constant, HTML fetched 2026-11-06, sha256:ad76250f09b0c4438869894ebb75a07a5cf0465944d7b5ff2b3c270fcc3b369e — https://www.randomservices.org/random/dist/Conditional.html"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §5.2.2 Joint CDF: F_X(x) = F(x,inf); F(inf,inf) = 1; F(-inf,y) = F(x,-inf) = 0; rectangle rule F(x2,y2) - F(x1,y2) - F(x2,y1) + F(x1,y1); independence gives F = F_X F_Y; f = d2F/dxdy, HTML fetched 2026-11-06, sha256:e13e9b9b4648413fda67c6474c945f7a80b9cbced541aae04663da2c8af8829e — https://www.probabilitycourse.com/chapter5/5_2_2_joint_cdf.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), Multinomial Distribution: joint PMF with multinomial coefficient; each Y_i ~ Binomial(n, p_i), HTML fetched 2026-11-06, sha256:eee1779c2c22be3a73f51f9149c846395c8ba2cbe8609433afd865b3c9a50e2e — https://www.randomservices.org/random/bernoulli/Multinomial.html"
    - "SOA Probability Exam (Exam P) syllabus, November 2026, Topic 3 outcomes a-b (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
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
