---
verification:
  status: stale
  confidence: null
  last_checked: 2026-11-06
  last_checked_by: agent:validate-v1
  content_hash: sha256:27c0853e984964a1ea1fcdec77fa2173df222ea52e1b25ada8bc5e64a3aff9dc
  sources:
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, fetched 2026-11-06), §3.1.1 Random Variables: X: S -> R; range, sha256:b32e2b938c896a7fd05d6e213fb7a8442da6c352279ab627e62ef6d093e8a46b — https://www.probabilitycourse.com/chapter3/3_1_1_random_variables.php"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL version), Def. 1.1 p.18 (PDF p.26): discrete = finite or countably infinite sample space, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "MIT OCW 18.05 (Orloff & Bloom, Spring 2022), Reading 5b, Definition of a continuous random variable by a pdf (PDF p.2), sha256:3b4e14112eca532d9d03de273fdc40d27e6cf241681aabf012a49837640c2e5b — https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/mit18_05_s22_class05-prep-b.pdf"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, fetched 2026-11-06), §4.1.0: continuous CDF has no jumps; P(X=x)=0; < and <= agree, sha256:c2345faca7920d0c2971d4cc039c129b803ecb6d3f121ea89683da5cab5ece5b — https://www.probabilitycourse.com/chapter4/4_1_0_continuous_random_vars_distributions.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, fetched 2026-11-06), §3.2.1 CDF: F_X(x)=P(X<=x), defined for discrete, continuous and mixed; discrete CDF a staircase, jump = P(X=x), sha256:ddcdb7ea63d9e918e1d8e69af197212e089af8cf665730306927c861bd3f5f6f — https://www.probabilitycourse.com/chapter3/3_2_1_cdf.php"
    - "Pishro-Nik, Introduction to Probability, Statistics, and Random Processes (probabilitycourse.com, fetched 2026-11-06), §4.3.1 Mixed random variables: neither discrete nor continuous; jump = P(Y=y); int c + sum P(Y=y_k)=1; EY = int y c(y) dy + sum y_k P(Y=y_k), sha256:2abab6d01f448078588fa3991835c49223be0e6c433904a165147ddf6a2dd0d7 — https://www.probabilitycourse.com/chapter4/4_3_1_mixed.php"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 2.7 Distribution and quantile functions: F increasing, right-continuous, F(x^-)=P(X<x), limits 0 and 1; right-tail function; quantiles, sha256:50c869a04cf2c1fdbb4816de5a7a594436951d2e00cadfa069d12a10d6bd7173 — https://www.randomservices.org/random/dist/CDF.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, fetched 2026-11-06), 4.1 Expected value: definitions (discrete, continuous, mixed), may not exist, change of variables, increasing property P(X<=Y)=1, symmetry -> E(X)=a, independence E(XY)=E(X)E(Y), E(X|A) via conditional density, sha256:3228c869ff2a03804690236fc072d1cf7bd9b040855c67156791b50e7d3cfba9 — https://www.randomservices.org/random/expect/Properties.html"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., GNU FDL version), §2.2 p.60 (PDF p.68): f(x) is not the probability of x; f(3/4)=3/2 > 1 cannot be a probability, sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA Exam C tables (Loss Models 3rd ed. Appendix A excerpts), A.2.3.1 Pareto (E[X^k] for -1<k<alpha, no M(t)) PDF p.8; A.3.2.1 Gamma (M(t)=(1-theta t)^-alpha, t<1/theta; E[X^k]) PDF p.9; A.3.3.1 Exponential (M(t), E[X^k]=theta^k k!, E[X^x]=theta(1-e^{-x/theta})) and A.5.1.1 Lognormal (E[X^k]=exp(k mu + k^2 sigma^2/2), no M(t)) PDF p.11, sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "SOA, Exam P syllabus, November 2026, Topic 2 Univariate Random Variables, LOs a)-f) (PDF p.3), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf"
    - "CAS, Exam MAS-I Content Outline (2026), Domain A tasks 1-3 (Poisson processes; expected values, variances; limited expected value) p.3; Domain B tasks 1, 5, 6, 9 (sample mean and variance; frequency and severity; aggregate; censoring and truncation) p.4, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "SOA, Exam FAM syllabus, February 2027, Topic 1 coverage modifications (p.2); Topic 2 severity moments, existence of moments, aggregate mean and variance (p.3); Topic 9 present value random variables, means and variances, notation for their expected values (p.7); Topic 10 future loss random variable, sha256:da98474b74b0a9e9153b8ce198f30195dfbe394b3e300e785e58f12663b447e4 — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-2-fam-syllabus.pdf"
    - "SOA, Exam ALTAM syllabus, October 2026, Topic 2 a): state-dependent insurance and annuity present value random variables and their expected values (p.3), sha256:44b64a78219337f43387cb52837c7c2ce590ae2b97321d6e8e4e29ab2cd38c5e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-altam-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Random Variable.md
---

![[Media/Figures/Random_Variable.svg|340]]

A **Random Variable** is a function that assigns a real number to each outcome in a [[Sample Space|sample space]]. A random variable $X$ on the sample space $S$ is written

> $$X : S \to \mathbb{R}$$

- $\mathbb{R}$ is the set of real numbers.

> [!example]- Two fair coins are flipped and $X$ is the number of heads. What values can $X$ take, and with what probabilities? {Example}
> - The sample space is $S = \{TT, TH, HT, HH\}$, and each outcome has probability $\frac{1}{4}$.
> - $X(TT) = 0$, $X(TH) = X(HT) = 1$ and $X(HH) = 2$.
> - Two outcomes give the value 1, so $P(X = 0) = \frac{1}{4}$, $P(X = 1) = \frac{1}{2}$ and $P(X = 2) = \frac{1}{4}$.

## Types of random variables

- A **[[Discrete Random Variable|discrete random variable]]** takes a finite or countably infinite set of values, each with its own probability, like a number of claims.
- A **[[Continuous Random Variable|continuous random variable]]** has a density, so every single value has probability 0, like the size of a loss.
- A **mixed random variable** has a continuous part and at least one single value with positive probability, like a payment under a [[Deductible|deductible]] or a [[Benefit Limit|limit]].

## Mixed random variables

A single value $x$ with positive probability is a **point mass**. It shows as a jump in the [[Cumulative Distribution Function (CDF)|CDF]] $F(x) = P(X \le x)$, and its probability is the size of the jump:

> $$P(X = x) = F(x) - F(x^-)$$

- $F(x^-) = P(X < x)$ is the limit of $F$ from the left at $x$.

> [!example]- A payment $Y$ has CDF $F(y) = 0$ for $y < 0$, $F(y) = 0.4 + 0.001y$ for $0 \le y < 400$, and $F(y) = 1$ for $y \ge 400$. What are its point masses? {Example}
> - At 0, $F$ jumps from 0 to 0.4, so $P(Y = 0) = 0.4$.
> - Just below 400, $F$ reaches $0.4 + 0.001(400) = 0.8$, and at 400 it is 1, so $P(Y = 400) = 0.2$.
> - Between the jumps $F$ rises at the rate $0.001$, which is the density of the continuous part.

## Expected value of a mixed random variable

The [[Expected Value|expected value]] of a function $g$ of a mixed random variable $X$ adds the point masses to the integral over the continuous part:

> $$E[g(X)] = \sum_i g(x_i)\,P(X = x_i) + \int g(x)\,f(x)\,dx$$

- $x_i$ are the point masses.
- $f(x)$ is the density of the continuous part. It integrates to $1 - \sum_i P(X = x_i)$, not to 1.

> [!example]- A loss $X$ is exponential with mean 1,000, and the policy pays $Y = \min(X, 1{,}500)$. What is the expected payment? {Example}
> - Every loss above 1,500 pays exactly 1,500, so $Y$ has a point mass at 1,500.
> - Its probability is $P(X > 1{,}500)$, which is $e^{-1.5} = 0.2231$.
> - Below 1,500, $Y$ follows the density of $X$, $f(x) = \frac{e^{-x/1000}}{1000}$.
> - The expected payment adds the point mass to the integral:
>
> $$
> \begin{aligned}
> E[Y] &= \int_0^{1500} x\,f(x)\,dx \\
> &\quad + 1{,}500\,e^{-1.5} \\
> &= 1{,}000\left(1 - e^{-1.5}\right) \\
> &= 776.87
> \end{aligned}
> $$

> [!trap] Calling a payment continuous
> A payment $Y = \max(X - 200, 0)$ on a continuous loss takes every value from 0 up, yet $P(Y = 0) = P(X \le 200) > 0$. It is mixed. Integrating only the density misses the point mass, so check the CDF for jumps first.
