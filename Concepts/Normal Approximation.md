---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:dacbd607a004fb0e369eefb1c08c3353596cc42015c57d398cc8f6e961404efa
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Thm 9.4 and Thm 9.6 Central Limit Theorem (PDF pp.351, 365), read 2026-11-06, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 6.4 The Central Limit Theorem: CLT for the standard score of a sum; the more abnormal the distribution the larger n must be; continuity correction for integer-valued sums; binomial rule of thumb np >= 5 and n(1-p) >= 5 (HTML fetched 2026-11-06), sha256:ee6dc9f8e9feb14f19f96a0206c3289a4aedfc014f5e3dabf79422e1dc29f9e3 — https://www.randomservices.org/random/sample/CLT.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 14.4 The Poisson Distribution: normal approximation N(a, a) for large a with continuity correction; Poisson infinitely divisible (HTML fetched 2026-11-06), sha256:cf3d0aacfdb40291bb729d32f6f7692b39e4c4a13a1e09f86ef8826bef61f688 — https://www.randomservices.org/random/poisson/Poisson.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes, 5.6 The Normal Distribution: sum of independent normals normal (HTML fetched 2026-11-06), sha256:f4e2fe70308bf064dc44f62716075c9be463a2de262cb0aca8de1d6a0c6ffc84 — https://www.randomservices.org/random/special/Normal.html"
    - "SOA, Exam P normal distribution table (rev. 4/29/21), standard normal table rows z=0.7-2.0 and selected-percentile row (0.90 1.2816, 0.95 1.6449, 0.975 1.9600, 0.99 2.3263), PDF p.2, read 2026-11-06, sha256:5dbd8a242813fe585c3eb085d32617ff14bcaa0517ca547b263e7b03541a8bcb — https://www.soa.org/globalassets/assets/files/edu/2021/p-1-table-rev-4-29-21.pdf"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 2 Univariate Random Variables (PDF p.3); Topic 3 outcome i) Central Limit Theorem (PDF p.4), read 2026-11-06, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Normal Approximation.md
---

The **Normal Approximation** replaces the distribution of a sum or average of many [[Independent and Identically Distributed|independent and identically distributed]] random variables by a [[Normal Distribution|normal]] distribution with the same mean and variance, as the [[Central Limit Theorem]] justifies. Probabilities are then read from the standard normal CDF $\Phi$.

> $$P(S_n \le s) \approx \Phi\!\left(\frac{s - n\mu}{\sigma\sqrt{n}}\right)$$

> $$P(\bar{X} \le x) \approx \Phi\!\left(\frac{x - \mu}{\sigma/\sqrt{n}}\right)$$

- $S_n = X_1 + \cdots + X_n$ and $\bar{X} = S_n/n$ is the [[Sample Mean|sample mean]]. $\mu$ and $\sigma^2$ are the mean and variance of **one** $X_i$.
- The recipe: identify $n$, compute $E[S_n] = n\mu$ and $\text{Var}(S_n) = n\sigma^2$ ([[Moments for Linear Combinations]]), standardise, look up $\Phi$.
- If the summands are themselves normal, nothing is approximate. The sum is exactly normal ([[Probabilities for Linear Combinations]]).

> [!idea] The idea
> The exact distribution of a sum of 400 claims is out of reach, but its mean and variance take one line each. The normal approximation keeps exactly those two numbers and borrows the bell shape the CLT promises. The price is a small error in the tails, and for a count, a half-unit adjustment to line a smooth curve up with whole numbers.

## The recipe on a portfolio

A portfolio has 400 independent policies. Each policy's annual claim amount has mean 250 and standard deviation 1,000. What is the probability that total claims exceed 130,000?

| Quantity | Value |
|---|---|
| $E[S]$ | $400 \times 250 = 100{,}000$ |
| $\text{Var}(S)$ | $400 \times 1{,}000^2$ |
| $\text{SD}(S)$ | $1{,}000\sqrt{400} = 20{,}000$ |
| $z$ for 130,000 | 1.5 |

> $$P(S > 130{,}000) \approx 1 - \Phi(1.5) = 0.0668$$

- The standard deviation of the total grows like $\sqrt{n}$, not $n$. The total is far less variable than 400 times one claim.
- An average works the same way, with mean $\mu$ and standard deviation $\sigma/\sqrt{n}$.

## Counts need a continuity correction

Each of the 400 policies has a claim with probability 0.1. The number of claims $N$ is [[Binomial Distribution|binomial]] with mean 40 and variance $400 \times 0.1 \times 0.9 = 36$. What is the probability of at least 50 claims?

$N$ takes only whole numbers, but the normal curve is smooth. Each whole number $k$ owns the interval from $k - 0.5$ to $k + 0.5$, so "at least 50" starts at 49.5.

> $$P(S_n \ge k) \approx 1 - \Phi\!\left(\frac{k - 0.5 - n\mu}{\sigma\sqrt{n}}\right)$$

> $$P(S_n \le k) \approx \Phi\!\left(\frac{k + 0.5 - n\mu}{\sigma\sqrt{n}}\right)$$

| Event | Corrected $z$ | Approximation | Exact binomial |
|---|---|---|---|
| $N \ge 50$ | 1.583 | 0.0567 | 0.0601 |
| $N \le 35$ | $-0.75$ | 0.2266 | 0.2296 |

- Without the correction, $P(N \ge 50)$ would standardize 50 to $z = 1.667$ and give 0.0478, further from the exact 0.0601.
- **Continuity correction.** When $S_n$ is integer-valued, such as a claim count, a binomial or a [[Poisson Distribution|Poisson]], widen the event by half a unit first. Never apply it to a continuous sum.

> [!trap] Correcting in the wrong direction
> Widen the event, never narrow it. "At least 50" includes 50, so it starts at 49.5. "More than 50" excludes 50, so it starts at 50.5.

## Binomial and Poisson counts

A binomial$(n, p)$ is approximately $N\big(np,\ np(1-p)\big)$ and a Poisson$(\lambda)$ approximately $N(\lambda, \lambda)$ for large $n$ or $\lambda$. Each is a sum of i.i.d. pieces.

- How large $n$ must be depends on the summands. For a binomial, the usual rule of thumb is that $np$ and $n(1-p)$ are both at least 5. The portfolio has $np = 40$ and $n(1-p) = 360$.
- A Poisson count with a large mean, such as 6,400 accidents over 1,600 days, is a sum of many daily Poisson counts. Its standard deviation is $\sqrt{6{,}400} = 80$.

## Setting a fund

How much money covers the portfolio's total claims with 95% probability?

Inverted, the approximation sets a fund: the total exceeded with probability $\alpha$ is about $n\mu + z_{1-\alpha}\,\sigma\sqrt{n}$, where $z_{1-\alpha}$ is the standard normal [[Percentile|percentile]].

> $$\text{Fund} = n\mu + z_{1-\alpha}\,\sigma\sqrt{n}$$

- For the portfolio, $100{,}000 + 1.645 \times 20{,}000 = 132{,}900$.
- That is \$332.25 per policy, a loading of \$82.25 (33%) over the expected claim. The loading pays for the uncertainty in a 400-policy pool.

## How many policies?

How large must the portfolio be for total claims to exceed 110% of expected with probability at most 5%?

The excess over the mean is $0.1n\mu$, and the standard deviation is $\sigma\sqrt{n}$. Their ratio grows like $\sqrt{n}$.

> $$\frac{0.1\,n\mu}{\sigma\sqrt{n}} \geq 1.645$$

- Each policy here has a coefficient of variation $\sigma/\mu = 4$. The condition becomes $0.1\sqrt{n}/4 \ge 1.645$, so $\sqrt{n} \ge 65.8$.
- That gives $n \ge 4{,}329.6$, so at least 4,330 policies.
- The answer scales with the square of the coefficient of variation. Halving the CV cuts the policies needed by a factor of 4.

## Try it

> [!example]- Sizing a Claim Fund at the 99th Percentile {Example}
> A plan covers 900 independent members. Each member's annual claim has mean \$300 and standard deviation \$1,200. How large must the fund be for a 99% chance of covering total claims?
>
> > [!answer]-
> > **Plan:** find the mean and standard deviation of the total, then go 2.326 standard deviations above the mean.
> > $$
> > \begin{align*}
> > E[S] &= 900(300) \\
> >      &= 270{,}000 \\
> > \text{SD}(S) &= 1{,}200\sqrt{900} \\
> >              &= 36{,}000 \\
> > \text{Fund} &= 270{,}000 + 2.326(36{,}000) \\
> >             &= 353{,}736
> > \end{align*}
> > $$
> > The fund is about \$393 per member. A 99% standard costs more than a 95% one, because $z_{0.99} = 2.326$ is larger than $z_{0.95} = 1.645$.

> [!example]- Claim Count with a Continuity Correction {Example}
> Each of 1,000 independent policies has a claim with probability 0.05. Approximate the probability of at least 60 claims.
>
> > [!answer]-
> > **Plan:** the count is binomial and integer-valued, so standardize 59.5.
> >
> > $N$ is binomial with $E[N] = 50$ and $\text{Var}(N) = 1{,}000(0.05)(0.95) = 47.5$, so $\text{SD}(N) = 6.892$. $N$ is integer-valued, so $P(N \ge 60)$ becomes $P(N > 59.5)$:
> > $$
> > \begin{align*}
> > P(N \ge 60) &\approx 1 - \Phi\!\left(\frac{59.5 - 50}{6.892}\right) \\
> >             &= 1 - \Phi(1.38) \\
> >             &= 1 - 0.9162 \\
> >             &= 0.0838
> > \end{align*}
> > $$
> > The exact binomial answer is $0.0867$. Standardising 60 without the correction gives $1 - \Phi(1.45) = 0.0735$, noticeably further off.

> [!example]- How Many Policies for a Stable Loss Ratio {Example}
> Each policy's loss has coefficient of variation $\sigma/\mu = 2$. How many i.i.d. policies are needed so that total losses exceed 110% of expected with probability at most 5%?
>
> > [!answer]-
> > **Plan:** standardize the excess $0.1n\mu$ and require it to be at least $z_{0.95}$ standard deviations.
> > $$
> > \begin{align*}
> > P(S_n > 1.1n\mu) &\approx P\!\left(Z > \frac{0.1n\mu}{\sigma\sqrt{n}}\right) \\
> >                  &= P\!\left(Z > \frac{0.1\sqrt{n}}{2}\right)
> > \end{align*}
> > $$
> > This is at most $0.05$ when $0.05\sqrt{n} \ge 1.645$:
> > $$
> > \begin{align*}
> > \sqrt{n} &\ge 32.9 \\
> > n &\ge 1{,}082.4
> > \end{align*}
> > $$
> > At least $1{,}083$ policies. With a CV of 2 instead of 4, a quarter as many policies suffice.

> [!warning]- Exam traps
> - **Correcting a continuous sum.** The half unit belongs only to integer-valued totals.
> - **Correcting the wrong way.** "At least $k$" starts at $k - 0.5$, and "at most $k$" ends at $k + 0.5$.
> - **$n\sigma$ for the standard deviation of a sum.** It is $\sigma\sqrt{n}$.
> - **A variance used as a standard deviation.** A Poisson with mean 6,400 has standard deviation 80.
> - **Rounding the policy count down.** "At least 1,082.4 policies" means 1,083.
