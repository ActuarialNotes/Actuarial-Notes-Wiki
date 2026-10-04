---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:23bf574bdd42b517fcaa771bbc3263ca13a0290a7d9d15d717d1fad3658edeb9
  sources:
    - "CAS Exam MAS-I Sample Questions (as of 11/21/2017), Q1 and official solution: inversion method, exponential draws -ln(0.2) - ln(0.8) = 1.833; item note 'when simulating exponential random variables using either U or (1-U) as values is valid (example 11.3)'; text reference Ross 11.2.1, PDF pp.1-2, sha256:6f146ad2b2d0fd72746c551376572045246c317ae0ca8e189e3ffeffa79670de - https://www.casact.org/sites/default/files/2021-04/MASI_Sample_Questions.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06): Ross Sections 11.1, 11.2.1, 11.2.2 assigned (Domain A), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed - https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Siegrist, Random, 'Transformations of Variables', section 'Simulations': X = F^{-1}(U) has distribution function F for any type of distribution, via F^{-1}(p) <= x iff p <= F(x); exponential X = -(1/r)ln(1-U) or -(1/r)ln U since 1-U is also uniform; Pareto by the random quantile method, sha256:827bba81a7f85933f2ba982a09155f5277f5ec19838e2ffe70ac0563a56aca69 - https://www.randomservices.org/random/dist/Transformations.html"
    - "Siegrist, Random, 'Distribution and Quantile Functions': quantile function F^{-1}(p) = min{x : F(x) >= p}; F^{-1}(p) is a quantile of order p; mixed distributions, sha256:50c869a04cf2c1fdbb4816de5a7a594436951d2e00cadfa069d12a10d6bd7173 - https://www.randomservices.org/random/dist/CDF.html"
    - "Siegrist, Random, 'The Weibull Distribution': closed-form quantile function F^{-1}(p) = b[-ln(1-p)]^{1/k}, simulated by the random quantile method, sha256:d673ebeb4242d5daa56d213fd6245374f7ead872173ad01ad58e5e74ee4bc57f - https://www.randomservices.org/random/special/Weibull.html"
    - "Sigman, 'Inverse Transform Method', Columbia IEOR 4404 notes (2010): Proposition 1.1 for any cdf (continuous or not); exponential X = -(1/lambda)ln(1-U), replaceable by ln U; discrete inverse transform X = k if sum_{i<k} p(i) < U <= sum_{i<=k} p(i) (the boundary convention opposite to the page's displayed rule); Poisson process by cumulating -(1/alpha)ln U_i interarrival times, PDF pp.1-3, sha256:51a440a9dd4a5cdf573d996ab79883449e7a0a36155f9f25e0dd1b9ef8b362aa - http://www.columbia.edu/~ks20/4404-Sigman/4404-Notes-ITM.pdf"
    - "Devroye, Non-Uniform Random Variate Generation (Springer 1986; author's free edition), Ch. II Sec. 2.1 Theorem 2.1 inversion principle, table of explicit inverses incl. exponential and Pareto, '1-U is distributed as U'; Sec. 2.2 inversion by numerical solution of F(X) = U, PDF pp.1-5, sha256:66244ccc9faf5c1e6ed7dd8a9f9208e02d482c0fbec4862d60735ccda7019f8a - http://luc.devroye.org/chapter_two.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Inversion Method.md
---

The **Inversion Method** (inverse transform method) simulates a draw from a distribution with [[Cumulative Distribution Function (CDF)|CDF]] $F$ by generating $U$ from a [[Uniform Continuous Distribution|Uniform]]$(0, 1)$ distribution and returning the value $x$ at which the CDF reaches $U$.

> $$X = F^{-1}(U), \quad U \sim \text{Unif}(0, 1)$$

> $$X = x_j \quad \text{if} \quad F(x_{j-1}) \leq U < F(x_j)$$

- **Why it works:** $F$ is nondecreasing, so $F^{-1}(U) \leq x$ exactly when $U \leq F(x)$, and a uniform falls below $F(x)$ with probability $F(x)$. Hence $P(X \leq x) = F(x)$.
- **Continuous case:** solve $F(x) = u$ for $x$. For an [[Exponential Distribution|exponential]] with mean $\theta$, $x = -\theta \ln(1-u)$; Pareto and Weibull also invert in closed form, others need numerical root-finding.
- **Discrete case** (second block): lay the probabilities end to end on $(0, 1)$ and return the value whose interval contains $u$. A jump in a mixed CDF — a point mass at a policy limit, say — catches every $u$ in the jump. Conventions differ on which value a $u$ landing exactly on a cumulative probability maps to, so follow the problem's rule.
- Because $1 - U$ is also uniform, some texts invert the survival function instead, $X = S^{-1}(U)$. The two give different draws from the same $u$ — read which one a question wants.
- $F^{-1}(0.99)$ is the 99th [[Percentile|percentile]], so inversion is also how simulated quantiles are read. Applied to exponential [[Interarrival Time|interarrival times]] and cumulated, it simulates a [[Poisson Process]].

> [!example]- Simulating Severities {Example}
> (a) Losses are exponential with mean $\$1{,}000$. Simulate a loss from $u = 0.70$.
>
> (b) Losses are Pareto with $F(x) = 1 - \left(\frac{2{,}000}{x + 2{,}000}\right)^3$. Simulate a loss from $u = 0.875$.
>
> > [!answer]-
> > (a) $x = -1{,}000 \ln(1 - 0.70) = -1{,}000 \ln(0.30) = \$1{,}203.97$.
> >
> > (b) Set $F(x) = 0.875$:
> >
> > $$
> > \begin{align*}
> > \left(\frac{2{,}000}{x + 2{,}000}\right)^3 &= 1 - 0.875 \\
> > \frac{2{,}000}{x + 2{,}000} &= 0.125^{1/3} \\
> > &= 0.5 \\
> > x &= 2{,}000
> > \end{align*}
> > $$
> >
> > The simulated loss is $\$2{,}000$, the $87.5$th percentile of the Pareto.

> [!example]- Simulating Annual Claim Counts {Example}
> A policy's annual claim count has $P(0) = 0.50$, $P(1) = 0.30$, $P(2) = 0.15$, $P(3) = 0.05$. Using the rule $X = x_j$ if $F(x_{j-1}) \leq u < F(x_j)$, simulate four years from $u = 0.62,\ 0.97,\ 0.18,\ 0.83$.
>
> > [!answer]-
> > The cumulative probabilities are $0.50,\ 0.80,\ 0.95,\ 1.00$, giving intervals $[0, 0.50) \to 0$, $[0.50, 0.80) \to 1$, $[0.80, 0.95) \to 2$, $[0.95, 1) \to 3$.
> >
> > - $0.62 \to 1$
> > - $0.97 \to 3$
> > - $0.18 \to 0$
> > - $0.83 \to 2$
> >
> > The simulated counts are $1, 3, 0, 2$: six claims in four years, against an expected $4 \times 0.75 = 3$.

> [!example]- Simulating Claim Arrival Times {Example}
> Claims arrive as a Poisson process at $\lambda = 2$ per month. Using $T = -\ln(1 - u)/\lambda$ with $u_1 = 0.40$ and $u_2 = 0.80$, simulate the first two arrival times. How many claims fall in the first month?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > T_1 &= -\ln(0.60)/2 \\
> > &= 0.2554 \\
> > T_2 &= -\ln(0.20)/2 \\
> > &= 0.8047 \\
> > S_2 &= T_1 + T_2 \\
> > &= 1.0601
> > \end{align*}
> > $$
> >
> > The first claim arrives at $0.26$ months and the second after the month ends, so this path has exactly one claim in month 1.
