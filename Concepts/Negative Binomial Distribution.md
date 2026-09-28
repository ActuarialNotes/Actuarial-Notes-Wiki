---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:7129bd5bdac1aaa9478a3369620cef8b11410f37405c9920a4b45e8de890a530
  sources:
    - "Grinstead & Snell, Introduction to Probability (2nd rev. ed., 2006 GNU FDL version), 5.1 negative binomial u(x,k,p) = C(x-1,k-1) p^k q^(x-k), trials until the k-th head, k = 1 geometric, pp.186-187 (PDF pp.194-195), sha256:763eab9894983ddfd6cd7f84685548d1515a9326a2d9fd015474534460551a5e — https://math.dartmouth.edu/~prob/prob/prob.pdf"
    - "SOA, Tables for Exam C (Fall 2009), B.2.1.1 Poisson (PDF p.14); B.2.1.3 binomial, B.2.1.4 negative binomial (PDF p.15, page image), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
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

![[Media/Negative_binomial_pmf.svg|500]]

![[Media/Figures/Negative_Binomial_Distribution.svg|340]]

> [!example]- Claims Until Third Large Loss {Example}
> Each claim has a 25% probability of being a large loss. Find the probability the 3rd large loss occurs on the 7th claim.
>
> > [!answer]-
> > $r=3$, $p=0.25$, $k=7$:
> > $$P(X=7) = \binom{6}{2}(0.25)^3(0.75)^4 = 15 \cdot 0.015625 \cdot 0.3164 \approx 0.0742$$
