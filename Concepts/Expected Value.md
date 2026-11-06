---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:2c32e0aef4934e118b9daba0c498ff89607b70655e9719eef532cab7f6f67879
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 6.1 (sum converges absolutely), Def. 6.4 (integral of |x| f(x) finite), Theorems 6.2 and 6.10, sec. 10.3 (mu_n = E(X^n)), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, HTML fetched 2026-09-28), §6.1.3 Moment Functions (n-th moment E[X^n], n-th central moment E[(X-EX)^n], MGF exists if finite on [-a,a] for some a > 0), sha256:c0a7c6272c4e4f05d4a52ec1718dafa0e6420d9f0aed6e2898105f6de9144a4a — https://www.probabilitycourse.com/chapter6/6_1_3_moment_functions.php; SOA, Tables for Exam C (Fall 2009; Loss Models 3rd ed. Appendices A-B excerpts), A.2.3.1 Pareto (E[X^k] for -1 < k < alpha) (PDF p.8), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf; SOA Probability Exam syllabus, November 2026, Topic 2 (univariate random variables) learning outcomes c), d), e) (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.1 Definitions and Basic Properties: Symmetry (distribution symmetric about a with E(X) existing gives E(X) = a; density form f(a+x) = f(a-x)), Linearity, indicator E(1_A) = P(A), conditional density f(x|A) and its conditional expected values, HTML fetched 2026-10-30, sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html; Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.2 Additional Properties: N taking values in the naturals has E(N) = sum_{n>=0} P(N > n) = sum_{n>=1} P(N >= n), HTML fetched 2026-10-30, sha256:80150b157fee54ddfea427e726a32493121464235644d38eec5997fdd9ca7321 — https://www.randomservices.org/random/expect/Properties2.html; Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com), §5.2.3 Conditioning and Independence: f_{X|A}(x) = f_X(x)/P(A) on A, conditional expectation as the integral against f_{X|A}; independent X, Y have f_XY = f_X f_Y and E[g(X)h(Y)] = E[g(X)]E[h(Y)], HTML fetched 2026-10-30, sha256:b9e764e0b2adb7b888334dd58ee563d47c9c6cd66bd666fa4fa24c7d5e3b32a4 — https://www.probabilitycourse.com/chapter5/5_2_3_conditioning_independence.php"
    - "Siegrist, 4.1 Definitions and Basic Properties: Positive property (P(X >= 0) = 1 implies E(X) >= 0) and Increasing property (P(X <= Y) = 1 implies E(X) <= E(Y)) (HTML fetched 2026-10-30) — https://www.randomservices.org/random/expect/Properties.html"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Def. 6.1 p.225 (PDF p.233); p.229 (PDF p.237: Law of Large Numbers justifies expected value as the average in many experiments); Theorem 6.1 p.230 (PDF p.238: E(phi(X)) = sum phi(x) m(x)); Theorem 6.2 p.231 (PDF p.239: E(X+Y) = E(X)+E(Y) for any X, Y with finite means, proof uses the joint distribution only); Theorem 6.4 and Example 6.10 p.233-234 (PDF pp.241-242: E(XY) = E(X)E(Y) if independent, fails for Y = 1 - X), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org), 4.1 Definitions and Basic Properties: mean as the center of mass of the distribution; sample mean M_n converges to E(X) (law of large numbers); linearity in full generality; conditional expected value given A, HTML fetched 2026-11-04, sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html"
    - "Siegrist (randomservices.org), 4.2 Additional Properties: E(N) = sum_{n>=0} P(N > n), HTML fetched 2026-11-04, sha256:80150b157fee54ddfea427e726a32493121464235644d38eec5997fdd9ca7321 — https://www.randomservices.org/random/expect/Properties2.html"
    - "Siegrist (randomservices.org), 4.5 Covariance and Correlation: cov(X, Y) = E(XY) - E(X)E(Y), HTML fetched 2026-11-04, sha256:23ef4758146296b9865ca3f82f0e849934a667dcc8643afaa28147ad146feef7 — https://www.randomservices.org/random/expect/Covariance.html"
    - "Wikipedia, Actuarial present value (rank 3): 'The actuarial present value (APV) is the expected value of the present value of future payments whose timing or amount depends on uncertain events', HTML fetched 2026-11-04, sha256:a7a94e68e9325bbedc91196cfdafb0b63da40edea81761905dace1de20e7e1dd — https://en.wikipedia.org/wiki/Actuarial_present_value"
    - "SOA, Probability Exam (Exam P) syllabus, November 2026, Topic 2 learning outcomes c) and f) (PDF p.3); Topic 3 learning outcomes c), h) (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), Theorem 6.2 and the remark after it ('expectations add, whether or not the summands are mutually independent') pp.231-232 (PDF pp.239-240); §2.2 p.60 (PDF p.68: f(x) is not the probability of x, f(3/4) = 3/2); §5.1 Hypergeometric p.193 (PDF p.201: counts samples of size n; tends to binomial as N, k -> infinity), read 2026-11-04, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Expected Value.md
---

**Expected Value** ($E[X]$, also called the mean $\mu$) is the probability-weighted average of all values a [[Random Variable]] $X$ can take, representing its long-run average outcome.

> $$E[X] = \begin{cases} \displaystyle\sum_{k} k\, f(k) & \text{(discrete)} \\[6pt] \displaystyle\int_{-\infty}^{\infty} x\, f(x)\, dx & \text{(continuous)} \end{cases}$$

- $f$ is the [[Probability Mass Function (PMF)|PMF]] in the discrete case and the [[Probability Density Function (PDF)|density]] in the continuous case.
- The sum or integral must converge absolutely, that is $\sum_k |k|\,f(k)$ or $\int |x|\,f(x)\,dx$ must be finite. Otherwise $X$ has no expected value. A [[Pareto Distribution|Pareto]] with shape $\alpha \le 1$ has none (see [[Moment]]).
- It is linear: $E[aX + b] = aE[X] + b$.
- The $n$-th moment of $X$ is $E[X^n]$. The $n$-th central moment is $E[(X-\mu)^n]$.

> [!idea] The idea
> A claim can cost $\$0$, $\$100$ or $\$500$, but the insurer needs one number for what it expects to pay. The expected value weights each value of a random variable by its probability. The result is the balance point of the distribution, the level that the average of many independent repetitions settles at. A rare but large value can therefore move the mean a long way. In the claim-size example below, the $\$500$ claim has probability 0.2 and supplies $\$100$ of the $\$130$ mean.

![[Media/Figures/Expected_Value.svg|340]]

## One claim, one number

A claim $X$ costs 0, 100 or 500 with probabilities 0.5, 0.3 and 0.2. What does the insurer expect to pay per claim?

| $x$ | $f(x)$ | $x\,f(x)$ |
|---|---|---|
| 0 | 0.5 | 0 |
| 100 | 0.3 | 30 |
| 500 | 0.2 | 100 |
| Total | 1 | 130 |

- $E[X] = 130$. On average, the insurer expects to pay \$130 per claim.
- No single claim costs 130. The mean is an average over many claims, not a likely value.

## Functions of the claim

The policy now has a deductible of 50, so it pays $g(X) = (X - 50)_+$. The payment on each claim is 0, 50 or 450. Average the *payments*, not the claims.

> $$E[g(X)] = \sum_x g(x)\,f(x)$$

- $E[(X - 50)_+] = 0(0.5) + 50(0.3) + 450(0.2) = 105$.
- Plugging the mean into the payment gives $(130 - 50)_+ = 80$. That is wrong. It assumes every claim costs 130.

> [!trap] $E[g(X)]$ is not $g(E[X])$
> Plugging the mean into a nonlinear function gives a wrong number, such as $(E[X])^2$ for $E[X^2]$ or $\max(E[X] - d, 0)$ for the expected payment after a deductible. Average $g$ over the distribution: $\sum g(k) f(k)$ or $\int g(x) f(x)\,dx$.

## Linearity

For a *linear* function, the shortcut does work. Scaling every claim by 1.1 for inflation and adding a handling fee of 20 gives $E[1.1X + 20] = 1.1(130) + 20 = 163$.

Because the expected value is a weighted sum, the expected value of a total is the total of the expected values, whether or not the pieces are independent.

- Two claims of this kind have expected total $130 + 130 = 260$, whether they are independent or not.
- Linearity is not a product rule. $E[XY] = E[X]\,E[Y]$ needs independence, or at least zero [[Covariance|covariance]].

Expected value is also monotone. If $X \le Y$ for every outcome (more generally, $P(X \le Y) = 1$), then $E[X] \le E[Y]$.

- A random variable that never exceeds a constant $c$ has a mean of at most $c$.
- A random variable that is never negative has a mean of at least 0. A proportion that always lies between 0 and 1 has a mean between 0 and 1.

## Per loss or per payment

The 105 above averages over every claim, including the half that pay nothing. Among claims that do pay, the average payment is larger. That is a mean given an event.

For an event $A$ with $P(A) > 0$, the conditional mean uses the conditional distribution $f(x)/P(A)$ on $A$ and 0 off it.

> $$E[X \mid A] = \frac{E[X \cdot 1_A]}{P(A)}$$

- $1_A$ is the indicator of $A$: 1 if $A$ occurs, 0 if not.
- The expected payment per payment is $105 / 0.5 = 210$.
- For $A = \{X < c\}$ and a continuous $X$, the numerator integrates $x f(x)$ over the restricted range only.

> $$E[X \mid X < c] = \frac{\int_{-\infty}^{c} x\, f(x)\, dx}{F(c)}$$

## Other ways to compute it

**Survival function.** For $X \ge 0$, the mean is the area under $S(x) = P(X > x)$. For the claim, $S(x) = 0.5$ on $[0, 100)$ and $0.2$ on $[100, 500)$. So $E[X] = 0.5(100) + 0.2(400) = 130$ again.

> $$E[X] = \int_0^\infty S(x)\,dx$$

**Tail sum.** For a count $N$ taking values $0, 1, 2, \ldots$, the same idea is a sum.

> $$E[N] = \sum_{k=0}^{\infty} P(N > k)$$

- Equivalently, $E[N] = \sum_{k=1}^{\infty} P(N \ge k)$.
- For a count capped at $m$, $P(\min(N, m) > k)$ is $P(N > k)$ for $k < m$ and $0$ for $k \ge m$, so the tail sum stops at $m - 1$: $E[\min(N, m)] = \sum_{k=0}^{m-1} P(N > k)$.

**Expected excess of a count.** For an integer $c \ge 1$, $E[N - c]$ would subtract $c - n$ for each $n < c$, where the excess is really 0. Adding those amounts back gives the expected excess.

> $$E[\max(N - c, 0)] = E[N] - c + \sum_{n=0}^{c-1} (c - n)\, P(N = n)$$

- For $c = 1$ this is $E[\max(N - 1, 0)] = E[N] - 1 + P(N = 0)$.

**Symmetry.** If a density is symmetric about a point $c$, that is $f(c + t) = f(c - t)$ for all $t$, and $E[X]$ exists, then $E[X] = c$.

## On other exams

- **Exam P** also asks for the expected value of a function of two variables, a sum, or a conditional mean, from a joint distribution. See [[Moments for Joint Distributions]].
- **MAS-I** asks for expected counts and waiting times in Poisson processes, and moments of loss distributions and their transformations.
- **MAS-II** uses expected values inside credibility, such as the [[Expected Value of Process Variance|expected value of the process variance]], the [[Variance of Hypothetical Means|variance of the hypothetical means]] and the prior mean.
- **FAM** and **ALTAM**: an actuarial present value is the expected value of a present value random variable. Insurance and annuity questions are therefore expected-value questions in life-contingency notation.

## Try it

> [!example]- Expected Payout on a Simple Policy {Example}
> A claim size $X$ has PMF $P(X=0)=0.6$, $P(X=200)=0.3$, $P(X=1000)=0.1$. The policy has a deductible of 100. Find the expected claim, the expected payment per loss and the expected payment per payment.
>
> > [!answer]-
> > **Plan:** weight each value by its probability, then repeat for the payment, then divide by the probability of a payment.
> > $$
> > \begin{align*}
> > E[X] &= 200(0.3) + 1000(0.1) \\
> >      &= 160 \\
> > E[(X - 100)_+] &= 100(0.3) + 900(0.1) \\
> >                &= 120
> > \end{align*}
> > $$
> > A payment is made with probability 0.4, so the expected payment per payment is $120 / 0.4 = 300$.
> >
> > Why isn't the payment $160 - 100 = 60$? The deductible removes only 100 from the claims that exceed it, and nothing is paid on the rest.

> [!example]- A tail sum {Example}
> The number of claims $N$ on a policy has $P(N > k) = 0.6^{k+1}$ for $k = 0, 1, 2, \ldots$. Find $E[N]$ and $E[\min(N, 2)]$.
>
> > [!answer]-
> > **Plan:** add the survival probabilities, stopping at $k = 1$ for the capped count.
> > $$
> > \begin{align*}
> > E[N] &= 0.6 + 0.6^2 + 0.6^3 + \cdots \\
> >      &= \frac{0.6}{1 - 0.6} \\
> >      &= 1.5 \\
> > E[\min(N, 2)] &= 0.6 + 0.36 \\
> >               &= 0.96
> > \end{align*}
> > $$

> [!example]- Mean of a continuous loss below a threshold {Example}
> A loss $X$ is uniform on $(0, 1000)$. Find $E[X \mid X < 400]$.
>
> > [!answer]-
> > **Plan:** integrate $x f(x)$ over the restricted range, then divide by the probability of the range.
> > $$
> > \begin{align*}
> > E[X \mid X < 400] &= \frac{\int_0^{400} x \cdot \tfrac{1}{1000}\,dx}{0.4} \\
> >                   &= \frac{80}{0.4} \\
> >                   &= 200
> > \end{align*}
> > $$
> > Given the condition, the loss is uniform on $(0, 400)$, so its mean is the midpoint.

> [!warning]- Exam traps
> - **$E[g(X)]$ for $g(E[X])$.** Average the payment, not the payment of the average.
> - **Per loss or per payment.** The expected payment per *loss* averages over every loss, zeros included. The expected payment per *payment* is the conditional mean given that a payment is made, so it divides by the probability of a payment. Read which one the question asks for.
> - **The tail sum's first term.** $E[N] = \sum_{k=0}^{\infty} P(N > k)$ starts at $k = 0$. Starting the $P(N > k)$ sum at $k = 1$ drops $P(N > 0)$ and understates the mean.
> - **Linearity is not a product rule.** $E[X + Y] = E[X] + E[Y]$ always holds, but $E[XY] = E[X]\,E[Y]$ needs independence, or at least zero covariance. With dependent variables, compute $E[XY]$ from the joint distribution.
