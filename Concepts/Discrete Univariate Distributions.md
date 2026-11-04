---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:abb510d0c1229d4bb6f720de293af7534dc69b44dd9e277ee36e06102144557a
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

A **Discrete Univariate Distribution** describes the probability law of a single [[Random Variable]] $X$ that takes on a countable set of values.

> $$P(X = k) = f(k), \quad k \in \{x_1, x_2, \ldots\}$$

- The probability mass function (PMF) $f(k)$ specifies the probability that the variable takes a particular distinct value $k$.
- The PMF must satisfy $f(k) \geq 0$ for all $k$ and $\sum_{k} f(k) = 1$:
- The cumulative distribution function (CDF) specifies the probability that the variable is at most $x$:

> $$F(x) = P(X \leq x)$$

> $$= \sum_{k \leq x} f(k)$$

- **Back from tail or cumulative probabilities.** For an integer-valued $X$ the PMF is recovered by differencing:

> $$f(k) = P(X \geq k) - P(X \geq k+1) = F(k) - F(k-1)$$

- At the largest possible value $m$, $f(m) = P(X \geq m)$, and for a non-negative $X$, $f(0) = 1 - P(X \geq 1)$.
- Each named distribution below describes a particular kind of count. Once the count is identified, its PMF, mean and variance follow.

> [!idea] The idea
> A count of claims can be 2 or 3 but never 2.5, so all the probability sits on separate points. A discrete univariate distribution gives each point its probability $f(k)$. The probability of any event is the sum of $f$ over the points it contains, so the CDF is a staircase that steps up by $f(k)$ at each possible value. Differencing the CDF therefore gives the PMF back, and "at most 3" and "fewer than 3" are different events.

## Choosing the right one

Most of the difficulty is identification, not computation. Read the question for **what is being counted** and **whether the trial count is fixed**:

- Successes in a **fixed** number of independent trials → [[Binomial Distribution]] $(n,p)$, with $E[X] = np$
- Successes in a **fixed** number of draws taken **without replacement** from a finite pool → [[Hypergeometric Distribution]] $(N,K,n)$, with $E[X] = nK/N$
- **Trials until** the first success, the trial count not fixed in advance → [[Geometric Distribution]] $(p)$, with $E[X] = 1/p$
- **Trials until** the $r$-th success → [[Negative Binomial Distribution]] $(r,p)$, with $E[X] = r/p$
- Events occurring over a fixed interval of **time or space**, with no trial count at all → [[Poisson Distribution]] $(\lambda)$, with $E[X] = \lambda$
- One of the integers $1, \ldots, n$, each equally likely → [[Uniform Discrete|Discrete Uniform]], with $E[X] = (n+1)/2$ (on $a, \ldots, b$ the mean is $(a+b)/2$)

- **Binomial vs. hypergeometric** turns entirely on replacement. When the population is large relative to the sample the two nearly agree, and the binomial is the intended shortcut.
- **Binomial vs. Poisson**: a fixed number of trials points to binomial. A rate such as "per year", "per hour" or "per 100 policies", with no trial count, points to Poisson.
- The **variance-to-mean ratio** is a fast identification check: it is $< 1$ for binomial, $= 1$ for Poisson, and $> 1$ for the negative binomial counted as *failures* before the $r$-th success ($\text{Var}/E = 1/p$). The trials count above has ratio $(1-p)/p$, which is below 1 whenever $p > 1/2$. Apply the test to the failures form.
- For "at least one", reach for the complement $1 - P(X=0)$ rather than summing the tail.

![[Media/Figures/Discrete_Univariate_Distributions.svg|340]]

> [!example]- PMF Verification for a Simple Discrete Distribution {Example}
> A random variable $X$ has PMF $f(k) = c \cdot k$ for $k = 1, 2, 3, 4$. Find $c$ and compute $P(X \leq 3)$.
>
> > [!answer]-
> > For $f$ to be a valid PMF we need $\sum_{k=1}^{4} c \cdot k = 1$, so
> > $$c(1 + 2 + 3 + 4) = 10c = 1 \implies c = \frac{1}{10}$$
> > Then
> > $$P(X \leq 3) = F(3) = \frac{1}{10}(1+2+3) = \frac{6}{10} = 0.6$$

> [!tip]- How it appears on the exam
> - **Exam P** (Univariate Random Variables): a short story, such as claims in a year, policies with errors in a sample or calls until the first sale, with a probability, mean or variance to calculate. The work is naming the distribution and its parameters. The arithmetic is then one PMF or a complement.
> - **Exam P**: a PMF given as a table, or as a formula with an unknown constant or a relationship between probabilities ("no accidents is three times as likely as one"). Solve for the constant first, then compute.
> - **Exam P**: a payment that is a function of a count, such as nothing for the first event and a fixed amount for each one after. Its expected value is a sum over the PMF. A count also appears inside a [[Conditional Probability|conditional probability]] or a joint table.

> [!warning]- Exam traps
> - **Off by one at the boundary.** For an integer count, $P(X < 3) = F(2)$ and $P(X \geq 3) = 1 - F(2)$. Writing $1 - F(3)$ for "at least 3" leaves out $P(X = 3)$.
> - **Two geometric conventions.** Counting *trials* until the first success gives mean $1/p$ and support $1, 2, \ldots$. Counting *failures* before it gives mean $(1-p)/p$ and support $0, 1, \ldots$. Check which one the question's wording and any given formula use. Mixing them shifts every answer by one trial.
> - **A Poisson rate on the wrong interval.** A mean of $\lambda$ per year is $\lambda/2$ for six months and $n\lambda$ for $n$ independent years. Using the annual $\lambda$ for a different period gives a probability for the wrong count.
