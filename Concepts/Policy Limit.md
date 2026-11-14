---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:eb2bacf6ce3be2d1e9168b603cc2af9df49a47be0a39e3220be0c259d3afe91d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Policy Limit.md
---
A **Policy Limit** is the most an insurer will pay on a single loss. Under a limit $u$ and no other modification, the insurer pays the whole loss $X$ when it is below $u$ and pays $u$ when it is not, so the payment is the limited loss variable $X \wedge u$, whose mean is the [[Limited Expected Value|limited expected value]]. Written out, the limited loss variable is

> $$X \wedge u = \begin{cases} X, & X < u \\ u, & X \ge u \end{cases}$$

- $X$ is the ground-up loss.

Together with the [[Deductible|deductible]] and [[Coinsurance|coinsurance]], the limit is one of the [[Coverage Modifications|coverage modifications]] that turn a ground-up loss into the insurer's payment.

The expected payment per loss under a limit $u$ is

> $$E[X \wedge u] = \int_0^u S(x)\,dx$$

> $$E[X \wedge u] = \int_0^u x\,f(x)\,dx + u\,S(u)$$

- $S(x) = 1 - F(x)$ is the survival function of $X$, and $f(x)$ is its density.

The variance of the payment needs $E\big[(X \wedge u)^2\big]$ as well.

> [!example]- Losses follow a Pareto distribution with $\alpha = 2$ and $\theta = 3{,}000$. What is the expected payment per loss under a limit of $\$5{,}000$? {Example}
> - For this Pareto, $E[X \wedge x] = 3{,}000x/(3{,}000 + x)$.
> - The expected payment is $E[X \wedge 5{,}000] = 3{,}000(5{,}000)/8{,}000$.
> - It is $\$1{,}875$ per loss.

## Policy limit and maximum covered loss

*Loss Models* keeps these apart. The policy limit is the largest payment, while the maximum covered loss $u$ is the loss at which the payment stops growing. With an ordinary deductible $d$ and a maximum covered loss $u$, the payment per loss is

> $$Y^L = (X \wedge u) - (X \wedge d)$$

- $Y^L$ is the payment per loss, which is 0 whenever $X \le d$.

The payment per payment counts only the losses above $d$, and its mean is

> $$E[Y^P] = \frac{E[X \wedge u] - E[X \wedge d]}{S(d)}$$

- $Y^P$ is the payment per payment, which counts only the losses above $d$, so its mean is divided by $S(d)$.

With a deductible $d$ and coinsurance $\alpha$, the payment is $\alpha\big[(X \wedge u) - (X \wedge d)\big]$ and the policy limit is $\alpha(u - d)$, so a limit $L$ stated with a deductible and no coinsurance means $u = d + L$. If the question states the policy limit, solve for $u$ before computing any limited expected value.

> [!example]- What are the expected payment per loss and per payment? {Example}
> Ground-up losses follow a [[Pareto Distribution|Pareto distribution]] with $\alpha = 2$ and $\theta = 3{,}000$, so $E[X \wedge x] = 3{,}000x/(3{,}000 + x)$. A policy has an ordinary deductible of $\$1{,}000$ and a policy limit of $\$10{,}000$, with no coinsurance.
>
> > [!answer]-
> > - The policy limit is the most the insurer pays, so the payment stops growing at a loss of $u = 1{,}000 + 10{,}000 = 11{,}000$.
> > - $E[X \wedge 11{,}000] = 3{,}000(11{,}000)/14{,}000 = 2{,}357.14$.
> > - $E[X \wedge 1{,}000] = 3{,}000(1{,}000)/4{,}000 = 750.00$.
> > - The expected payment per loss is $2{,}357.14 - 750.00 = \$1{,}607.14$.
> > - The probability that a loss produces a payment is $S(1{,}000) = (3{,}000/4{,}000)^2 = 0.5625$.
> > - The expected payment per payment is $1{,}607.14/0.5625 = \$2{,}857.14$.

## Inflation

If losses grow to $(1+r)X$ and the limit stays fixed, the expected payment is $(1+r)$ times the limited expected value at the deflated limit $u/(1+r)$. The expected payment under inflation is

> $$E\big[(1+r)X \wedge u\big] = (1+r)\,E\!\left[X \wedge \tfrac{u}{1+r}\right]$$

A fixed limit damps [[Inflation|inflation]], because the part of the growth that falls above $u$ is never paid. A fixed deductible does the opposite, so a policy with both can move either way. Scaling the severity distribution's scale parameter by $1 + r$ gives the same result.

> [!example]- If all losses grow by 10% and the $\$5{,}000$ limit is unchanged, by what percentage does the expected payment rise? {Example}
> - Losses follow the Pareto distribution above, and this year the expected payment is $E[X \wedge 5{,}000] = 1{,}875.00$.
> - Next year, deflate the limit to $5{,}000/1.1 = 4{,}545.45$.
> - $E[X \wedge 4{,}545.45] = 3{,}000(4{,}545.45)/7{,}545.45 = 1{,}807.23$.
> - Scaled back up, the expected payment is $1.1(1{,}807.23) = 1{,}987.95$.
> - The expected payment rises by $1{,}987.95/1{,}875.00 - 1 = 6.0\%$, less than the 10% growth in losses.

## Censored data

A limit right-censors the loss. The variable $X \wedge u$ has a point mass of $S(u)$ at $u$, and a claim recorded at the limit says only that the loss was at least $u$, which is why such a claim enters a likelihood as $S(u)$ (see [[Censoring]]).

> [!trap] Limit read as a maximum covered loss
> With a deductible, a policy limit of $L$ caps the payment, so the loss is capped at $d + L$. In the example above, capping the loss at $u = 10{,}000$ instead gives $E[Y^L] = 2{,}307.69 - 750.00 = 1{,}557.69$, which is too small.
