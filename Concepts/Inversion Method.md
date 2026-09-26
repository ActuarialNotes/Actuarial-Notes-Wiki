---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:23bf574bdd42b517fcaa771bbc3263ca13a0290a7d9d15d717d1fad3658edeb9
  sources: []
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
