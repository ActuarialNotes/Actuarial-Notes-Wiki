---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:974495f3bb13f52078da40ac5979cff2e99ed1f18e5d82e356b96f6075549988
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 5.1 geometric p.185 (PDF p.193), negative binomial pp.186-187 (PDF pp.194-195), hypergeometric p.193 (PDF p.201); 6.2 Exercise 11 p.264 (PDF p.272), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Tables for Exam C (Fall 2009), Appendix B.2 (a,b,0) class: B.2.1.1 Poisson (PDF p.14); B.2.1.2 geometric, B.2.1.3 binomial, B.2.1.4 negative binomial (PDF p.15, page image), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-10-30), §3.2.1 CDF: F_X(x_k) - F_X(x_k - eps) = P_X(x_k), sha256:1684aa6588e7d87737c1d625bd7a606c6f1a6954681ff1a3cd02b084eec1a151 — https://www.probabilitycourse.com/chapter3/3_2_1_cdf.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-10-30), §1.3.2 Axiom 3 (additivity over disjoint events), sha256:f8ea87ae887db4bef1c3ff1b41879371f1573edb8d70c80df361acd52f45fb1d — https://www.probabilitycourse.com/chapter1/1_3_2_probability.php"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §5.1 Geometric Distribution p.184 (PDF p.192: T = trials up to and including the first success, P(T=j) = q^{j-1}p, j = 1,2,...); Example 6.2 p.227 (PDF p.235: E(T) = 1/p); §5.1 Exercise 11 p.198-199 (PDF pp.206-207: calls in an interval of length t are Poisson with parameter lambda t), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist (randomservices.org), 2.7 Distribution and Quantile Functions: f(x) = F(x) - F(x^-) for a discrete distribution (the CDF steps by the pmf), HTML fetched 2026-11-04, sha256:50c869a04cf2c1fdbb4816de5a7a594436951d2e00cadfa069d12a10d6bd7173 — https://www.randomservices.org/random/dist/CDF.html"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 2 Univariate Random Variables, learning objective and outcomes (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Discrete Univariate Distributions.md
---

A **Discrete Univariate Distribution** describes the probability law of a single [[Random Variable]] $X$ that takes a countable set of values. Its [[Probability Mass Function (PMF)|probability mass function]] $f$ gives the probability of each value.

> $$P(X = k) = f(k), \quad k \in \{x_1, x_2, \ldots\}$$

> $$F(x) = P(X \leq x) = \sum_{k \leq x} f(k)$$

- A PMF satisfies $f(k) \geq 0$ for every $k$ and $\sum_k f(k) = 1$.
- The [[Cumulative Distribution Function (CDF)|cumulative distribution function]] $F$ adds the PMF up to $x$.
- Each named distribution describes one kind of count: the [[Binomial Distribution|binomial]], [[Hypergeometric Distribution|hypergeometric]], [[Geometric Distribution|geometric]], [[Negative Binomial Distribution|negative binomial]], [[Poisson Distribution|Poisson]] and [[Uniform Discrete|discrete uniform]].

> [!idea] The idea
> A count of claims can be 2 or 3 but never 2.5, so all the probability sits on separate points. The probability of any event is the sum of $f$ over the points it contains. So the CDF is a staircase that steps up by $f(k)$ at each possible value, and "at most 3" and "fewer than 3" are different events.

![[Media/Figures/Discrete_Univariate_Distributions.svg|340]]

## One policy's claims in a year

Take a policy whose number of claims $X$ in a year has this PMF.

| Claims $k$ | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| $f(k)$ | 0.50 | 0.30 | 0.15 | 0.05 |
| $F(k)$ | 0.50 | 0.80 | 0.95 | 1.00 |

- Every probability is nonnegative and the four add to 1, so $f$ is a valid PMF.
- When a PMF is given as a formula with an unknown constant, such as $f(k) = ck$, the condition $\sum_k f(k) = 1$ is the equation that finds $c$.

## From the PMF to the CDF and back

The CDF row is a running total of the PMF row. Going the other way, each step of the CDF is one probability of the PMF.

> $$f(k) = F(k) - F(k-1)$$

- For the policy, $f(2) = 0.95 - 0.80 = 0.15$.
- Tail probabilities $P(X \geq k)$ give the PMF the same way, as $f(k) = P(X \geq k) - P(X \geq k+1)$.
- At the largest possible value $m$, $f(m) = P(X \geq m)$. For a nonnegative count, $f(0) = 1 - P(X \geq 1)$.

The boundary matters because $X$ jumps at whole numbers. "Fewer than 2 claims" is $P(X \leq 1) = F(1) = 0.80$. "At least 2 claims" is its complement, $1 - F(1) = 0.20$.

> [!trap] At least 2 is not $1 - F(2)$
> $1 - F(2) = 0.05$ is the probability of more than 2 claims. It leaves out $f(2) = 0.15$. For "at least $k$", subtract $F(k-1)$.

## The mean and variance of the count

What is the expected number of claims on this policy? Weight each value by its probability.

> $$E[X] = \sum_k k\,f(k)$$

> $$\text{Var}(X) = E[X^2] - (E[X])^2$$

- For the policy, $E[X] = 0(0.50) + 1(0.30) + 2(0.15) + 3(0.05) = 0.75$.
- $E[X^2] = 0.30 + 4(0.15) + 9(0.05) = 1.35$, so $\text{Var}(X) = 1.35 - 0.75^2 = 0.7875$.

## A payment that depends on the count

Suppose the policy pays nothing on the first claim and 100 on each claim after it. The payment is $g(X) = 100\,(X - 1)_+$, a function of the count. Its expected value is a sum over the same PMF.

> $$E[g(X)] = \sum_k g(k)\,f(k)$$

| Claims $k$ | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Payment $g(k)$ | 0 | 0 | 100 | 200 |

- $E[g(X)] = 100(0.15) + 200(0.05) = 25$.
- The same sum handles a payment that appears inside a [[Conditional Probability|conditional probability]] or a joint table. Restrict the PMF to the condition first.

## Choosing the right distribution

Most of the difficulty is identification, not computation. Read the question for what is counted and whether the number of trials is fixed.

| What is counted | Distribution | Mean |
|---|---|---|
| Successes in $n$ independent trials | Binomial $(n, p)$ | $np$ |
| Successes in $n$ draws without replacement | Hypergeometric $(N, K, n)$ | $nK/N$ |
| Trials until the first success | Geometric $(p)$ | $1/p$ |
| Trials until the $r$-th success | Negative binomial $(r, p)$ | $r/p$ |
| Events in a period, at a rate | Poisson $(\lambda)$ | $\lambda$ |
| One of $1, \ldots, n$, equally likely | Discrete uniform | $(n+1)/2$ |

- **Binomial or hypergeometric** turns on replacement. When the population is large relative to the sample, the two nearly agree, and the binomial is the intended shortcut.
- **Binomial or Poisson** turns on the trial count. A fixed number of trials points to the binomial. A rate such as "per year" or "per 100 policies", with no trial count, points to the Poisson.
- On $a, \ldots, b$ the discrete uniform mean is $(a+b)/2$.
- The **variance-to-mean ratio** is a quick check. It is below 1 for the binomial and exactly 1 for the Poisson. It is $1/p > 1$ for the negative binomial counted as *failures* before the $r$-th success. The trials form has ratio $(1-p)/p$, which is below 1 whenever $p > 1/2$, so apply the test to the failures form.
- For "at least one", use the complement $1 - P(X = 0)$ rather than summing the tail.

## Try it

> [!example]- A PMF with an unknown constant {Example}
> A policy's number of claims $X$ has PMF $f(k) = ck$ for $k = 1, 2, 3, 4$. Find $c$ and $P(X \leq 3)$.
>
> > [!answer]-
> > **Plan:** the probabilities must add to 1, which fixes $c$.
> > $$c(1 + 2 + 3 + 4) = 10c = 1$$
> > So $c = 0.1$.
> > $$P(X \leq 3) = 0.1(1 + 2 + 3) = 0.6$$

> [!example]- The PMF from tail probabilities {Example}
> The number of accidents $N$ on a fleet in a month is at most 3. You are given $P(N \geq 1) = 0.6$, $P(N \geq 2) = 0.25$ and $P(N \geq 3) = 0.1$. Find the PMF of $N$ and $E[N]$.
>
> > [!answer]-
> > **Plan:** difference neighbouring tail probabilities, then weight the values.
> >
> > | $k$ | 0 | 1 | 2 | 3 |
> > |---|---|---|---|---|
> > | $f(k)$ | 0.40 | 0.35 | 0.15 | 0.10 |
> >
> > $f(0) = 1 - 0.6$, $f(1) = 0.6 - 0.25$, $f(2) = 0.25 - 0.1$, and $f(3) = P(N \geq 3)$ because 3 is the largest value.
> > $$E[N] = 0.35 + 2(0.15) + 3(0.10) = 0.95$$

> [!example]- Name the distribution {Example}
> For each count, name the distribution and give its mean.
> 1. Of 30 claim files, 5 are fraudulent. An auditor reviews 8 of them, chosen without replacement. $X$ is the number of fraudulent files reviewed.
> 2. An agent makes calls until the second sale. Each call independently ends in a sale with probability 0.1. $Y$ is the number of calls.
> 3. A portfolio has claims at a rate of 4 per month. $Z$ is the number of claims in a month.
>
> > [!answer]-
> > **Plan:** ask what is counted and whether the number of trials is fixed.
> > 1. A fixed sample drawn without replacement is hypergeometric. $E[X] = 8 \times 5/30 \approx 1.33$.
> > 2. Trials until the second success is negative binomial with $r = 2$. $E[Y] = 2/0.1 = 20$.
> > 3. A rate with no trial count is Poisson. $E[Z] = 4$.

> [!warning]- Exam traps
> - **Off by one at the boundary.** For an integer count, $P(X < 3) = F(2)$ and $P(X \geq 3) = 1 - F(2)$. Writing $1 - F(3)$ for "at least 3" leaves out $P(X = 3)$.
> - **Two geometric conventions.** Counting *trials* until the first success gives mean $1/p$ and support $1, 2, \ldots$. Counting *failures* before it gives mean $(1-p)/p$ and support $0, 1, \ldots$. Check which one the wording and any given formula use. Mixing them shifts every answer by one trial.
> - **A Poisson rate on the wrong interval.** A mean of $\lambda$ per year is $\lambda/2$ for six months and $n\lambda$ for $n$ independent years. Using the annual $\lambda$ for a different period gives a probability for the wrong count.
