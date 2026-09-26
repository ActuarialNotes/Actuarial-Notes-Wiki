---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:98917cfdb437590223b0555e522ebda16ecccccd4f41dddc5cc97a2ed80d035d
  sources: []
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
