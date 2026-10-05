---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-04
  last_checked_by: agent:validate-v1
  content_hash: sha256:98917cfdb437590223b0555e522ebda16ecccccd4f41dddc5cc97a2ed80d035d
  sources:
    - "Frees & Johnson (eds.), Loss Data Analytics, Version 1.1 (Aug 2020, open textbook), Ch.3 Modeling Loss Severity: §3.4.1 Y^L, Y^P = Y^L | X > d, E(Y^P) = E(Y^L)/(1 - F(d)), LER = [E(X) - E(Y^L)]/E(X), franchise deductible; §3.4.3 Y^L = alpha[(X^u) - (X^d)], maximum payment alpha(u - d) with u the maximum covered loss, and E(Y^L) = alpha(1+r)[E(X^(u/(1+r))) - E(X^(d/(1+r)))], sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "Frees & Johnson (eds.), Loss Data Analytics, Version 1.1 (Aug 2020), Ch.5 §5.5.2 P_{N^P}(z) = P_{N^L}(1 + v(z-1)), v = Pr(X > d): N^P ~ Poi(lambda v), NB(beta v, r); §5.5.3 E(S) = E(N^L)E(X^L) = E(N^P)E(X^P), sha256:09489050a45e6eb2ee0d96804458eb22c936a61716227e08ad0398b9cba870d4 — https://openacttexts.github.io/Loss-Data-Analytics/ChapAggLossModels.html"
    - "SOA, Tables for Exam C (Fall 2009), Pareto F(x) and E[X^x] = theta/(alpha-1)[1 - (theta/(x+theta))^(alpha-1)] (PDF p.8); binomial P(z) = [1 + q(z-1)]^m and negative binomial P(z) = [1 - beta(z-1)]^(-r) (PDF p.15), sha256:cefc3286baa0150b6520455e76104589f1187622212efe05a600926d0bf14e0f — https://www.soa.org/globalassets/assets/files/edu/edu-2009-fall-exam-c-table.pdf"
    - "Tse, Nonlife Actuarial Models (Cambridge UP, 2009), publisher preview: contents §2.5 Effects of coverage modifications, p.66-79 (PDF p.10); Theorem 1.2 Poisson decomposition X_i ~ PN(lambda p_i) (PDF p.31); BN(n, theta) and NB(r, theta) parameterisation (PDF p.25, 27-28), sha256:f6d009afdd1776907db090b41b72dd5a76d0b5ba3f0ee42e8b07279d5763b404 — https://api.pageplace.de/preview/DT0400.9780511630231_A24404031/preview-9780511630231_A24404031.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06, 2026-06-29), Domain B task 5 (PDF p.4), Tse §§2.2-2.5 assigned (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Coverage Modifications.md
---

**Coverage modifications** are the policy provisions — a [[Deductible|deductible]], a policy limit, [[Coinsurance|coinsurance]] — that turn a ground-up [[Loss Random Variable|loss]] $X$ into the amount the insurer pays. Together with [[Inflation|inflation]] they decide how loss severity becomes insurer cost, and they change both the payment [[Severity|severity]] and the number of payments.

> $$Y^L = \alpha\big[(X \wedge u) - (X \wedge d)\big]$$

> $$E[Y^L] = \alpha\big(E[X \wedge u] - E[X \wedge d]\big)$$

> $$E[Y^P] = \frac{E[Y^L]}{1 - F_X(d)}$$

- $d$ is an ordinary deductible, $u$ the **maximum covered loss** (the loss above which the payment stops growing) and $\alpha$ the coinsurance share, so the largest payment is $\alpha(u - d)$. Some pages, such as [[Benefit Limit]], write $u$ for the maximum *payment* instead — check which one a question means. $E[X \wedge u]$ is the [[Limited Expected Value|limited expected value]].
- **Per loss vs per payment.** $Y^L$, the *per-loss* variable, is $0$ whenever $X \le d$ and averages over every loss. $Y^P = Y^L \mid Y^L > 0$, the *per-payment* variable, averages only over losses that produce a payment — hence the division by $S(d) = 1 - F_X(d)$. See [[Payment Random Variable]].
- **Franchise deductible.** Once $X > d$ it pays the whole loss, so with no limit or coinsurance $E[Y^L] = E[(X-d)_+] + d\,S(d)$. The share of expected loss an ordinary deductible removes is the [[Loss Elimination Ratio]], $E[X \wedge d]/E[X]$.
- **Inflation.** If losses grow to $(1+r)X$ while $d$ and $u$ stay fixed, deflate the limits instead of inflating the losses (for $E[Y^P]$, divide by $1 - F_X\big(\frac{d}{1+r}\big)$):

> $$
> \begin{aligned}
> E[Y^L] = \alpha(1+r)\Big(&E\big[X \wedge \tfrac{u}{1+r}\big] \\
> -\ &E\big[X \wedge \tfrac{d}{1+r}\big]\Big)
> \end{aligned}
> $$

- **Frequency.** Only losses above $d$ become payments, so each loss becomes a payment with probability $v = S(d)$. A [[Poisson Distribution|Poisson]]$(\lambda)$ loss count gives a Poisson$(\lambda v)$ payment count — see [[Poisson Thinning]]. Negative binomial $\beta$ becomes $\beta v$, and binomial $q$ becomes $qv$. Expected aggregate payments are the same either way, $E[N^L]\,E[Y^L] = E[N^P]\,E[Y^P]$ — see [[Aggregate Loss Model]].

> [!example]- Per-Loss and Per-Payment Cost of a Layer {Example}
> Ground-up losses are Pareto with $\alpha = 3$, $\theta = 2{,}000$ (mean 1,000), so $E[X \wedge x] = 1{,}000\left[1 - \left(\frac{2000}{2000+x}\right)^2\right]$. A policy has an ordinary deductible of 500, a maximum covered loss of 5,000 and 80% coinsurance. Losses per policy are Poisson with mean 0.3. Find $E[Y^L]$, $E[Y^P]$ and the expected number of payments.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[X \wedge 500] &= 1{,}000(1 - 0.64) \\
> > &= 360 \\
> > E[X \wedge 5000] &= 1{,}000(1 - 0.081633) \\
> > &= 918.367 \\
> > E[Y^L] &= 0.8\,(918.367 - 360) \\
> > &= 446.694
> > \end{align*}
> > $$
> >
> > With $S(500) = (2000/2500)^3 = 0.512$:
> >
> > $$
> > \begin{align*}
> > E[Y^P] &= \frac{446.694}{0.512} \\
> > &= 872.45 \\
> > E[N^P] &= 0.3 \times 0.512 \\
> > &= 0.1536
> > \end{align*}
> > $$
> >
> > Expected payments per policy come to $134.01$ whichever way they are counted: $0.3 \times 446.694$ per loss, or $0.1536 \times 872.45$ per payment.

> [!example]- Leveraged Effect of 10% Inflation {Example}
> In the example above, losses inflate by 10% while the deductible and limit stay fixed. Recompute $E[Y^L]$ and $E[Y^P]$.
>
> > [!answer]-
> > A Pareto scales by its $\theta$, so inflated losses are Pareto with $\alpha = 3$, $\theta = 2{,}200$, and $E[X' \wedge x] = 1{,}100\left[1 - \left(\frac{2200}{2200+x}\right)^2\right]$.
> >
> > $$
> > \begin{align*}
> > E[X' \wedge 500] &= 369.684 \\
> > E[X' \wedge 5000] &= 997.299 \\
> > E[Y^L] &= 0.8\,(997.299 - 369.684) \\
> > &= 502.09
> > \end{align*}
> > $$
> >
> > With $S'(500) = (2200/2700)^3 = 0.54097$:
> >
> > $$
> > \begin{align*}
> > E[Y^P] &= \frac{502.09}{0.54097} \\
> > &= 928.13
> > \end{align*}
> > $$
> >
> > Ground-up severity rose 10%, but the cost per loss rose **12.4%**: the fixed deductible leverages inflation more than the limit dampens it. The cost per payment rose only 6.4%, because 5.7% more losses now pierce the deductible. Those new small payments pull the per-payment average down.
