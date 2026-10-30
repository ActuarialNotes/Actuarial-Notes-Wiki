---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-30
  last_checked_by: agent:validate-v1
  content_hash: sha256:35d193a868e74597147a5a937f84bc57f2e78ea8ea1891093aa2aaedcd950942
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 5.1 negative binomial u(x,k,p) = C(x-1,k-1) p^k q^(x-k), trials until the k-th head, k = 1 geometric, pp.186-187 (PDF pp.194-195), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Tables for Exam C (Fall 2009), B.2.1.1 Poisson (PDF p.14); B.2.1.3 binomial, B.2.1.4 negative binomial (PDF p.15, page image), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), §5.1 negative binomial u(x,k,p) = C(x-1,k-1) p^k q^(x-k), pp.186-187 (PDF pp.194-195), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, HTML fetched 2026-10-30), §11.4 The Negative Binomial Distribution: V_k = n iff X_n = 1 and Y_(n-1) = k-1 (PDF of V_k); The Problem of Points, A wins n points before B wins m iff Y_(n+m-1) >= n, sha256:090f2543374cd589ff963f4addb35f897d0bd1c0c8ff5c08cc7086f659858916 — https://www.randomservices.org/random/bernoulli/NegativeBinomial.html"
    - "Siegrist, Probability, Mathematical Statistics, and Stochastic Processes (randomservices.org, HTML fetched 2026-10-30), §11.5 The Multinomial Distribution: multinomial coefficient n!/(j_1!...j_k!), each sequence probability p_1^j_1...p_k^j_k, sha256:eee1779c2c22be3a73f51f9149c846395c8ba2cbe8609433afd865b3c9a50e2e — https://www.randomservices.org/random/bernoulli/Multinomial.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Negative Binomial Distribution.md
---

The **Negative Binomial Distribution** $X \sim \text{NegBin}(r, p)$ counts the number of independent Bernoulli trials needed to achieve exactly $r$ successes. When $r = 1$ it reduces to the [[Geometric Distribution|Geometric]] distribution.

> $$P(X = k) = \binom{k-1}{r-1}p^r(1-p)^{k-r}$$
>
> $$k = r, r+1, r+2, \ldots$$
>
> $$\text{where } r = \text{number of successes required},\; p = \text{success probability}$$

> $$E[X] = \frac{r}{p}, \qquad \text{Var}(X) = \frac{r(1-p)}{p^2}$$

- **Check the parameterization first.** As written, $X$ counts *trials* and starts at $r$. The alternative counts *failures before the $r$-th success*, $Y = X - r \in \{0,1,2,\ldots\}$, with $P(Y=k) = \binom{k+r-1}{k}p^r(1-p)^k$ and $E[Y] = r(1-p)/p$. Same variance, means differing by $r$ — the same trap as the [[Geometric Distribution|geometric]].
- **The exam tables' form.** SOA's *Tables for Exam C* (the Loss Models appendix) write the failures count as $\text{NegBin}(r, \beta)$ with $p = 1/(1+\beta)$: $P(Y=k) = \dfrac{r(r+1)\cdots(r+k-1)\,\beta^k}{k!\,(1+\beta)^{r+k}}$, $E[Y] = r\beta$ and $\text{Var}(Y) = r\beta(1+\beta)$. Unlike the binomial's $m$, $r$ is not required to be a whole number there.
- **Overdispersion belongs to the failures form.** $\text{Var}(Y)/E[Y] = 1/p = 1+\beta > 1$ always, where the binomial's ratio is below 1 and the Poisson's is exactly 1 — which is what makes $Y$ the **overdispersed** alternative to the [[Poisson Distribution|Poisson]] for counts. The trials count $X$ does not share it: $\text{Var}(X)/E[X] = (1-p)/p$, below 1 whenever $p > 1/2$ (with $r = 3$, $p = 0.75$: $E[X] = 4$ but $\text{Var}(X) = 4/3$).
- **The last trial is fixed.** The $r$-th success ends the count on trial $k$, so only the first $k-1$ trials are arranged: they hold the other $r-1$ successes, which is why the coefficient is $\binom{k-1}{r-1}$. Using $\binom{k}{r}$ instead counts $r$ successes anywhere in $k$ trials, a different event.
- **More than two outcomes.** When the trials before the $r$-th success fall into several categories, with probabilities $q_1, \ldots, q_m$ and counts $n_1, \ldots, n_m$ (so $n_1 + \cdots + n_m + r - 1 = k - 1$), the first $k-1$ trials are arranged by a multinomial coefficient and each category's probability is raised to its count:

> $$P = \frac{(k-1)!}{n_1!\cdots n_m!\,(r-1)!}\;q_1^{n_1}\cdots q_m^{n_m}\,p^{r}$$

- **Successes before the $s$-th failure.** The event "at least $r$ successes occur before the $s$-th failure" is the same as "at least $r$ successes in the first $r+s-1$ trials" (otherwise the $s$-th failure has already occurred), so its probability is $P(\text{Bin}(r+s-1, p) \ge r)$. This is the classical problem of points.

![[Media/Negative_binomial_pmf.svg|500]]

![[Media/Figures/Negative_Binomial_Distribution.svg|340]]

> [!example]- Claims Until Third Large Loss {Example}
> Each claim has a 25% probability of being a large loss. Find the probability the 3rd large loss occurs on the 7th claim.
>
> > [!answer]-
> > $r=3$, $p=0.25$, $k=7$:
> > $$P(X=7) = \binom{6}{2}(0.25)^3(0.75)^4 = 15 \cdot 0.015625 \cdot 0.3164 \approx 0.0742$$
