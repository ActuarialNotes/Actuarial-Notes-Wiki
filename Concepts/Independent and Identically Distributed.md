---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:2e158f028dd917dcf132b16486e3ac37507d032c5ed4d77aa398d911f33e103f
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 4.5 independent trials process: mutually independent with the same distribution (PDF p.151); Thm 6.7 V(cX) = c^2 V(X) and Thm 6.9 E(S_n) = n mu, V(S_n) = n sigma^2 (PDF pp.267-268); §9.2 Central Limit Theorem (PDF p.348), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), Order Statistics: F_1(x) = 1 - [1 - F(x)]^n and F_n(x) = [F(x)]^n for an i.i.d. sample, HTML fetched 2026-11-06, sha256:19ff485c600d4294e888c1b3d05ff7eb9196449f958d3325fd72b416aca56d63 — https://www.randomservices.org/random/sample/OrderStatistics.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), The Poisson Distribution: independent Poisson N, M with parameters a, b: N + M is Poisson(a + b), HTML fetched 2026-11-06, sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), The Gamma Distribution (Poisson process): T_n, the sum of n independent exponential inter-arrival times, has the gamma distribution, HTML fetched 2026-11-06, sha256:bbea5da3e0577d07d2670905b5727657c25b044f8382e17cee3bdfdd723bbe16 — https://www.randomservices.org/random/poisson/Gamma.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), The Central Limit Theorem: the sum or average of many i.i.d. variables is approximately normal, HTML fetched 2026-11-06, sha256:ee6dc9f8e9feb14f19f96a0206c3289a4aedfc014f5e3dabf79422e1dc29f9e3 — https://www.randomservices.org/random/sample/CLT.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 2.5 Independence: functions g_i(X_i) of independent variables are independent; the indicator sequence is exchangeable, HTML fetched 2026-11-06, sha256:5f47788c1c3a1a7a6b7b916b9d339bb59184c723dc6d2ccd05fd1a11639054c9 — https://www.randomservices.org/random/prob/Independence.html"
    - "SOA Probability Exam (Exam P) syllabus, November 2026, Topic 3 objective (order statistics, linear combinations of independent variables) and outcomes f, h, i (Central Limit Theorem for i.i.d. sums) (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Independent and Identically Distributed.md
---

Random variables $X_1, \ldots, X_n$ are **Independent and Identically Distributed** (i.i.d.) when they are [[Independent Random Variables|independent]] and have the same distribution. If each has probability function or density $f$, their joint probability function or density is

> $$f(x_1, \ldots, x_n) = f(x_1)\,f(x_2) \cdots f(x_n)$$

The product is the independence, and the same $f$ in every factor is the identical distribution. I.i.d. random variables model a [[Random Sample|random sample]] or a book of similar, unrelated policies.

> [!example]- Each policy has 0, 1 or 2 claims with probabilities 0.50, 0.35 and 0.15, independently of the other policies. What is the probability that two policies have 2 claims in total? {Example}
> - The totals of 2 are $(2, 0)$, $(0, 2)$ and $(1, 1)$.
> - Each joint probability is a product: $(0.15)(0.50)$, $(0.50)(0.15)$ and $(0.35)(0.35)$.
> - The probability is $0.075 + 0.075 + 0.1225$, which is 0.2725.

## Sums of i.i.d. random variables

If each $X_i$ has mean $\mu$ and variance $\sigma^2$, their sum $S_n = X_1 + \cdots + X_n$ has

> $$E[S_n] = n\mu$$

> $$\text{Var}(S_n) = n\sigma^2$$

The average $\bar{X} = S_n / n$ has mean $\mu$ and variance $\sigma^2 / n$. For large $n$, the [[Central Limit Theorem]] makes $S_n$ approximately normal.

> [!example]- For the policies above, what are the mean and standard deviation of the total number of claims on 100 policies? {Example}
> - One policy has $\mu = 0.35 + 2(0.15) = 0.65$.
> - Its second moment is $0.35 + 4(0.15) = 0.95$, so $\sigma^2 = 0.95 - 0.65^2 = 0.5275$.
> - The total has mean $100(0.65) = 65$.
> - Its variance is $100(0.5275) = 52.75$, so its standard deviation is 7.26.

> [!trap] $n\sigma^2$ or $n^2\sigma^2$
> A sum of $n$ i.i.d. terms has variance $n\sigma^2$. A single term multiplied by $n$ has variance $n^2\sigma^2$. Two policies with independent claims are less risky than one policy written twice as large.

## The largest and smallest of $n$

The largest of $n$ i.i.d. random variables is at most $x$ only if every one of them is, and the smallest is above $x$ only if every one of them is:

> $$P(X_{(n)} \le x) = F(x)^n$$

> $$P(X_{(1)} > x) = \big(1 - F(x)\big)^n$$

- $F$ is the common cumulative distribution function.
- $X_{(n)}$ and $X_{(1)}$ are the largest and smallest of the $X_i$, the extreme [[Order Statistics|order statistics]].

> [!example]- For three of the policies above, what is the probability that no policy has 2 claims? {Example}
> - No policy has 2 claims exactly when the largest count is at most 1.
> - Each policy has at most 1 claim with probability $F(1) = 0.85$.
> - The probability is $0.85^3 = 0.6141$.

## Symmetry

Swapping two i.i.d. random variables doesn't change their joint distribution. So an event and its mirror image, with the roles of the variables swapped, have the same probability. For $n$ i.i.d. continuous random variables, each is equally likely to be the smallest:

> $$P\big(X_1 = X_{(1)}\big) = \frac{1}{n}$$

> [!example]- Three people have i.i.d. continuous future lifetimes. What is the probability that the first person dies first? {Example}
> - The three lifetimes are i.i.d. and continuous, so ties have probability 0.
> - Each of the three is equally likely to be the smallest.
> - The probability is $\frac{1}{3}$.

The symmetry holds after conditioning on an event $G$ that treats the items alike, such as "at least one item is of a given type". Every item then has the same conditional probability of having a property. Writing the number of items with the property as a sum of indicators, linearity gives its conditional mean:

> $$E[N \mid G] = n \cdot P(\text{item 1 has the property} \mid G)$$

- $N$ is the number of the $n$ items with the property.
