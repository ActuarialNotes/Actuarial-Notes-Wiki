---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:89830d8767023da18f86677aeae5e0b5b2f96de461144d1960c3f221897e85b4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Policy Limit.md
---

**Policy Limit** is the most an insurer will pay on a single loss. Under a limit $u$ and no other modification, the insurer pays the whole loss $X$ when it is below $u$ and pays $u$ when it is not, so the payment is the limited loss variable $X \wedge u$, whose mean is the [[Limited Expected Value|limited expected value]]. Together with the [[Deductible|deductible]] and [[Coinsurance|coinsurance]], the limit is one of the [[Coverage Modifications|coverage modifications]] that turn a ground-up loss into the insurer's payment.

> $$X \wedge u = \begin{cases} X, & X < u \\ u, & X \ge u \end{cases}$$

> $$E[X \wedge u] = \int_0^u S(x)\,dx$$

> $$Y^L = (X \wedge u) - (X \wedge d)$$

> $$E[Y^P] = \frac{E[X \wedge u] - E[X \wedge d]}{S(d)}$$

> $$E\big[(1+r)X \wedge u\big] = (1+r)\,E\!\left[X \wedge \tfrac{u}{1+r}\right]$$

- **Symbols:** Following Klugman, Panjer & Willmot (*Loss Models*, chapter 8), $X$ is the ground-up loss, $S(x) = 1 - F(x)$ is its survival function, $d$ is an ordinary deductible and $u$ is the maximum covered loss. $Y^L$ is the payment per loss, which is 0 whenever $X \le d$. $Y^P$ is the payment per payment, which counts only the losses above $d$, so its mean is divided by $S(d)$.
- **Policy limit and maximum covered loss:** *Loss Models* keeps these apart. The policy limit is the largest payment, while the maximum covered loss $u$ is the loss at which the payment stops growing. With a deductible $d$ and coinsurance $\alpha$, the payment is $\alpha\big[(X \wedge u) - (X \wedge d)\big]$ and the policy limit is $\alpha(u - d)$, so a limit $L$ stated with a deductible and no coinsurance means $u = d + L$.
- **Censoring:** A limit right-censors the loss. The variable $X \wedge u$ has a point mass of $S(u)$ at $u$, and a claim recorded at the limit says only that the loss was at least $u$, which is why such a claim enters a likelihood as $S(u)$ (see [[Censoring]]).
- **Inflation:** If losses grow to $(1+r)X$ and the limit stays fixed, the expected payment is $(1+r)$ times the limited expected value at the deflated limit $u/(1+r)$. A fixed limit damps [[Inflation|inflation]], because the part of the growth that falls above $u$ is never paid. A fixed deductible does the opposite, so a policy with both can move either way.

> [!example]- Per-Loss and Per-Payment Cost with a Deductible and a Limit {Example}
> Ground-up losses follow a [[Pareto Distribution|Pareto distribution]] with $\alpha = 2$ and $\theta = 3{,}000$, so $E[X \wedge x] = 3{,}000x/(3{,}000 + x)$. A policy has an ordinary deductible of \$1,000 and a policy limit of \$10,000, with no coinsurance. Find the expected payment per loss and per payment.
>
> > [!answer]-
> > The policy limit is the most the insurer pays, so the payment stops growing at a loss of $u = 1{,}000 + 10{,}000 = 11{,}000$.
> > $$
> > \begin{align*}
> > E[X \wedge 11{,}000] &= \frac{3{,}000(11{,}000)}{14{,}000} \\
> > &= 2{,}357.14 \\
> > E[X \wedge 1{,}000] &= \frac{3{,}000(1{,}000)}{4{,}000} \\
> > &= 750.00 \\
> > E[Y^L] &= 2{,}357.14 - 750.00 \\
> > &= 1{,}607.14
> > \end{align*}
> > $$
> > The probability that a loss produces a payment is $S(1{,}000) = (3{,}000/4{,}000)^2 = 0.5625$.
> > $$
> > \begin{align*}
> > E[Y^P] &= \frac{1{,}607.14}{0.5625} \\
> > &= 2{,}857.14
> > \end{align*}
> > $$
> > Capping the loss at $u = 10{,}000$ instead would give $E[Y^L] = 2{,}307.69 - 750.00 = 1{,}557.69$. That answer treats the limit as a maximum covered loss and understates the cost of the layer between \$10,000 and \$11,000.

> [!example]- A Fixed Limit Under 10% Inflation {Example}
> Losses follow the same Pareto distribution, and a policy pays each loss up to a limit of \$5,000 with no deductible. Next year all losses grow by 10% and the limit is unchanged. Find the expected payment per loss in each year and the percentage increase.
>
> > [!answer]-
> > This year the expected payment is $E[X \wedge 5{,}000] = 3{,}000(5{,}000)/8{,}000 = 1{,}875.00$. Next year, deflate the limit to $5{,}000/1.1 = 4{,}545.45$ and scale the result back up.
> > $$
> > \begin{align*}
> > E[X \wedge 4{,}545.45] &= \frac{3{,}000(4{,}545.45)}{7{,}545.45} \\
> > &= 1{,}807.23 \\
> > E[Y] &= 1.1(1{,}807.23) \\
> > &= 1{,}987.95
> > \end{align*}
> > $$
> > The expected payment rises by $1{,}987.95/1{,}875.00 - 1 = 6.0\%$, less than the 10% growth in losses. The same answer follows from scaling the Pareto $\theta$ to 3,300 and evaluating $E[X \wedge 5{,}000]$ directly. The rest of the growth falls above the limit and is borne by the insureds, and the share of losses that exceed \$5,000 rises from $S(5{,}000) = 14.1\%$ to $15.8\%$.

> [!tip]- How it appears on the exam
> - **ASTAM** asks candidates to evaluate the effect of deductibles, policy limits, a maximum covered loss and coinsurance together. A question gives a severity distribution and the policy terms and asks for the expected payment per loss or per payment. It can also ask for the variance of the payment, which needs $E\big[(X \wedge u)^2\big]$ as well.
> - **Inflation:** A question raises losses by a stated rate and asks how the expected payment changes. It can be answered by deflating the limit and the deductible, or by scaling the severity distribution's scale parameter, and the two give the same result.
> - **Limits factors:** The same limited expected values give [[Increased Limits|increased limits factors]], which compare $E[X \wedge u]$ at two limits, and the [[Loss Elimination Ratio|loss elimination ratio]], which uses $E[X \wedge d]$.

> [!warning]- Exam traps
> - **Limit read as a maximum covered loss:** With a deductible, a policy limit of $L$ caps the payment, so the loss is capped at $d + L$. Capping the loss at $L$ gives an expected payment that is too small, as the first example shows.
> - **Coinsurance and the limit:** When coinsurance applies, the largest payment is $\alpha(u - d)$. If the question states the policy limit, solve for $u$ before computing any limited expected value.
> - **Inflating the limit:** Under inflation, the limit stays fixed and the losses grow. Multiplying $E[X \wedge u]$ by $1 + r$ assumes that the limit grew too and overstates next year's cost.
> - **Per loss or per payment:** The per-payment mean divides by $S(d)$, and the per-loss mean does not. With no deductible the two are the same, so the distinction only matters once a deductible applies.
