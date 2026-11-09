---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:655b0f0214d7792f6140a93e892c82b612643d78c7327d9e623bdbbd46d34410
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

![[Media/Figures/Expected_Value.svg|340]]

An **Expected Value** is the probability-weighted average of the values a [[Random Variable|random variable]] $X$ can take. For a [[Discrete Random Variable|discrete]] $X$ with probability function $f(x)$, the expected value $E[X]$, also called the mean $\mu$, is

> $$E[X] = \sum_x x\,f(x)$$

For a [[Continuous Random Variable|continuous]] $X$ with [[Probability Density Function (PDF)|density]] $f(x)$, it is

> $$E[X] = \int_{-\infty}^{\infty} x\,f(x)\,dx$$

- The integral runs over the support of $X$, where $f(x) > 0$.

The sum or integral must converge, or $X$ has no expected value.

> [!idea] The idea
> The expected value is the balance point of a distribution, the level the average of many independent repetitions settles at.

> [!example]- A claim costs 0, 100 or 500 with probabilities 0.5, 0.3 and 0.2. What is the expected cost of a claim? {Example}
>
> | $x$ | $f(x)$ | $x\,f(x)$ |
> | --- | --- | --- |
> | 0 | 0.5 | 0 |
> | 100 | 0.3 | 30 |
> | 500 | 0.2 | 100 |
>
> - Each value is weighted by its probability, and the products are added.
> - The expected cost is $E[X] = 0 + 30 + 100 = 130$.
> - No single claim costs 130. It is the average over many claims.

> [!example]- A loss ratio $X$ has density $f(x) = 3x^2$ for $0 \leq x \leq 1$. What is $E[X]$? {Example}
> - The support is $[0, 1]$, so the integral runs from 0 to 1.
> - $E[X] = \int_0^1 x \cdot 3x^2\,dx = \int_0^1 3x^3\,dx$.
> - $E[X] = \frac{3}{4} = 0.75$.

## The expected value of a function

The expected value of a function $g(X)$ weights each value of $g$ by the probability of the $x$ that gives it:

> $$E[g(X)] = \sum_x g(x)\,f(x)$$

- For a continuous $X$, the sum is the integral $\int g(x)\,f(x)\,dx$.

> [!example]- A claim costs 0, 100 or 500 with probabilities 0.5, 0.3 and 0.2. A policy pays the claim less a deductible of 50, or nothing. What is the expected payment? {Example}
> - The payment $g(X) = \max(X - 50, 0)$ is 0, 50 or 450.
> - Each payment is weighted by the probability of its claim: $0(0.5) + 50(0.3) + 450(0.2)$.
> - The expected payment is $15 + 90 = 105$.

> [!trap] $E[g(X)]$ is not $g(E[X])$
> Putting the mean into the payment gives $\max(130 - 50, 0) = 80$, not 105. It treats every claim as costing 130. Average $g$ over the distribution, unless $g$ is linear.

## Linearity of expected value

For constants $a$, $b$ and $c$ and any random variables $X$ and $Y$, the expected value of a linear combination is

> $$E[aX + bY + c] = aE[X] + bE[Y] + c$$

- $X$ and $Y$ need not be [[Independent Random Variables|independent]].

The expected value of a total is the total of the expected values. If $X \leq Y$ for every outcome, then $E[X] \leq E[Y]$.

> [!example]- A claim has mean 130. Next year every claim rises 10% and a handling fee of 20 is added. What is the expected cost of a claim, and of two such claims? {Example}
> - The cost of a claim is $1.1X + 20$.
> - Its expected cost is $1.1(130) + 20 = 163$.
> - Two claims have expected total $163 + 163 = 326$, whether or not they are independent.

## The expected value given an event

The expected value of $X$ given that $X$ exceeds a value $d$ averages over those values only, each weighted by its [[Conditional Probability|conditional probability]]:

> $$E[X \mid X > d] = \frac{\sum_{x > d} x\,f(x)}{P(X > d)}$$

- For a continuous $X$, the sum is the integral of $x\,f(x)$ from $d$ up.

> [!example]- A payment is 0, 50 or 450 with probabilities 0.5, 0.3 and 0.2. What is the expected payment, given that a payment is made? {Example}
> - The payments above 0 contribute $50(0.3) + 450(0.2) = 105$.
> - The probability of a payment above 0 is $0.3 + 0.2 = 0.5$.
> - The expected payment given a payment is $\frac{105}{0.5} = 210$.

## The expected value from the survival function

For a random variable $X \geq 0$, the expected value is the area under the survival function $1 - F(x)$:

> $$E[X] = \int_0^{\infty} \big[1 - F(x)\big]\,dx$$

- $F$ is the [[Cumulative Distribution Function (CDF)|CDF]] of $X$.

For a count $N$ on $0, 1, 2, \ldots$, the integral becomes a sum:

> $$E[N] = \sum_{k=0}^{\infty} P(N > k)$$

> [!example]- A claim costs 0, 100 or 500 with probabilities 0.5, 0.3 and 0.2. What is its expected value from the survival function? {Example}
> - $1 - F(x) = 0.5$ for $0 \leq x < 100$, because only claims of 100 or 500 exceed $x$.
> - $1 - F(x) = 0.2$ for $100 \leq x < 500$, and 0 from 500 on.
> - The area is $0.5(100) + 0.2(400) = 130$, the same as before.
