---
verification:
  status: verified
  confidence: high
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:91b17a6109c978efa117222f42e8ef6101086a8e9ffdfbc7fcab94babc7b7efd
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL version), Def. 6.1 p.226 (PDF p.234, absolute convergence; no expected value otherwise); Thm 6.2 linearity, expectations add whether or not independent; Def. 6.3 variance and standard deviation p.257; Thms 6.6 Var=E(X^2)-mu^2, 6.7 V(cX)=c^2V(X), V(X+c)=V(X), 6.8 V(X+Y)=V(X)+V(Y) independent, 6.9 sigma(S_n)=sigma sqrt(n) (pp.258-260, PDF pp.265-268), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.1 Expected value: definitions (discrete, continuous, mixed), may not exist, change of variables, increasing property P(X<=Y)=1, symmetry -> E(X)=a, independence E(XY)=E(X)E(Y), E(X|A) via conditional density, sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.9 Expected value as an integral: E(X)=int_0^inf P(X>x)dx for X>=0; E(X)=sum_{k>=1} P(X>=k) on N; E(X;A)=E(X 1_A), sha256:13db7b0f6f791843abcef65cf16e1214b8e745e3f9eeac74e01cc96fa3a032bc — https://www.randomservices.org/random/expect/Integral.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.6 Generating functions: M^(n)(0)=E(X^n) when M finite on an open interval about 0; Pareto E(X^n)=inf for n>=a, M(t)=inf for t>0; lognormal has all moments but infinite MGF; odd standard normal moments 0; sum of independent normals normal, sha256:40fa48baaa2d9caa1ce28569da70af31c2cf65cd86f0fe091974481ad6a2b625 — https://www.randomservices.org/random/expect/Generating.html"
    - "SOA Exam C tables (Loss Models 3rd ed. Appendix A excerpts), A.2.3.1 Pareto (E[X^k] for -1<k<alpha, no M(t)) PDF p.8; A.3.2.1 Gamma (M(t)=(1-theta t)^-alpha, t<1/theta; E[X^k]) PDF p.9; A.3.3.1 Exponential (M(t), E[X^k]=theta^k k!, E[X^x]=theta(1-e^{-x/theta})) and A.5.1.1 Lognormal (E[X^k]=exp(k mu + k^2 sigma^2/2), no M(t)) PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "SOA, Exam P syllabus, November 2026, Topic 2 Univariate Random Variables, LOs a)-f) (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "CAS, Exam MAS-I Content Outline (2026), Domain A tasks 1-3 (Poisson processes; expected values, variances; limited expected value) p.3; Domain B tasks 1, 5, 6, 9 (sample mean and variance; frequency and severity; aggregate; censoring and truncation) p.4, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "CAS, Exam MAS-II Content Outlines (2026), Domain A Introduction to Credibility, tasks 1-2: classical (limited fluctuation), Bühlmann, Bühlmann-Straub and Bayesian credibility; reading Tse (p.2), sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
    - "Frees et al., Loss Data Analytics (open text), Ch. 9 Credibility: §9.2 full credibility standards, n_X = lambda_kp (sigma_X/mu_X)^2 (eq. 9.6), n_PP = lambda_kp[sigma_N^2/mu_N + (sigma_X/mu_X)^2], lambda_kp=(y_p/k)^2; §9.3 Bühlmann EPV and VHM, sha256:35a840449990c8fda61687ebde4646508b6296ffac3daba18f0181eb2511fa36 — https://openacttexts.github.io/Loss-Data-Analytics/ChapCredibility.html"
    - "SOA, Exam FAM syllabus, February 2027, Topic 1 coverage modifications (p.2); Topic 2 severity moments, existence of moments, aggregate mean and variance (p.3); Topic 9 present value random variables, means and variances, notation for their expected values (p.7); Topic 10 future loss random variable, sha256:da98474b74b0a9e9153b8ce198f30195dfbe394b3e300e785e58f12663b447e4 — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-2-fam-syllabus.pdf"
    - "SOA, Exam ALTAM syllabus, October 2026, Topic 2 a): state-dependent insurance and annuity present value random variables and their expected values (p.3), sha256:44b64a78219337f43387cb52837c7c2ce590ae2b97321d6e8e4e29ab2cd38c5e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-altam-syllabus.pdf"
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
