---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ec1ef54f7da34b85e31451b0735c055cc18c62c73201cedd884f32c084fc031a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Return on Capital.md
---

**Return on Capital** — Mildenhall and Major's $\iota$ — is the expected margin earned per unit of capital. Seen from the investor's side it is the expected return on the capital they put up; from the policyholder's side it is the cost of capital built into the premium.

> $$\iota = \frac{M}{Q}$$
>
> $$\nu = \frac{1}{1+\iota}$$
>
> $$\delta = \frac{\iota}{1+\iota}$$

- $M = P - L$ is the [[Insurance Margin|margin]] and $Q = a - P$ the capital. $\nu$ and $\delta$ are the **risk discount factor** and **risk discount rate**, the analogues of $v$ and $d$ in interest theory ([[Discount Factor]], [[Discount Rate]]): capital is paid in at the start and the margin, like interest, is earned at the end. The same identities hold — $\delta = \iota\nu$ and $\nu + \delta = 1$.
- Capital is the present value, at the risk discount factor, of what investors expect back: $Q = \nu(a - L)$. Premium follows as $P = L + \iota Q = \nu L + \delta a$ — see [[Insurance Pricing]].
- **Return is margin times leverage**: $\iota = (M/P)(P/Q)$. A return target can be met by pricing (margin) or by capital management ([[Insurance Leverage|leverage]]).
- **The target** comes from the [[Cost of Capital|cost of capital]] — the return investors need to support the firm's market value — often blended with the cheaper, fixed costs of debt and reinsurance into a weighted average ([[Capital Structure]]).
- **Expected is not reported.** Pricing uses the expected return on allocated capital. Reported return on equity is net income over book surplus, including investment income, realised gains and reserve development on prior years; the two answer different questions.
- **Constant or varying?** A constant cost of capital charges the same $\iota$ on every layer of capital. Pricing with a distortion $g$ instead implies a return of $(g(s) - s)/(1 - g(s))$ on the layer of assets whose attachment probability is $s$, falling as layers become more remote — as in bond markets, where safer layers of capital earn lower spreads. See [[Risk-Adjusted Performance]] for return by line.

> [!example]- Return, Risk Discount Factor and Rate {Example}
> A portfolio is written at premium $105$ with expected loss $95$ and is supported by assets of $180$. Find $\iota$, $\nu$ and $\delta$, and confirm $P = \nu L + \delta a$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > M &= 105 - 95 \\
> > &= 10 \\
> > Q &= 180 - 105 \\
> > &= 75 \\
> > \iota &= \frac{10}{75} \\
> > &= 13.33\% \\
> > \nu &= \frac{1}{1.1333} \\
> > &= 0.88235 \\
> > \delta &= \frac{0.1333}{1.1333} \\
> > &= 0.11765
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > \nu L + \delta a &= 0.88235(95) + 0.11765(180) \\
> > &= 83.82 + 21.18 \\
> > &= 105.00
> > \end{align*}
> > $$
> >
> > Equivalently $\delta = M/(a - L) = 10/85 = 0.11765$: premium funds $11.8\%$ of the $85$ of assets above expected loss, and investors fund the other $88.2\%$.

> [!example]- Layer Returns Under a Distortion {Example}
> A pricing model uses the proportional hazard distortion $g(s) = s^{0.6}$. Find the loss ratio and the return on capital for layers of assets with attachment probabilities $s = 0.20$, $0.05$ and $0.01$.
>
> > [!answer]-
> > Per unit of layer, expected loss is $s$, premium $g(s)$ and capital $1 - g(s)$.
> >
> > $$
> > \begin{align*}
> > g(0.20) &= 0.3807 \\
> > \iota(0.20) &= \frac{0.3807 - 0.20}{1 - 0.3807} \\
> > &= 29.2\% \\
> > g(0.05) &= 0.1657 \\
> > \iota(0.05) &= \frac{0.1657 - 0.05}{1 - 0.1657} \\
> > &= 13.9\% \\
> > g(0.01) &= 0.0631 \\
> > \iota(0.01) &= \frac{0.0631 - 0.01}{1 - 0.0631} \\
> > &= 5.7\%
> > \end{align*}
> > $$
> >
> > Loss ratios $s/g(s)$ are $52.5\%$, $30.2\%$ and $15.8\%$. The remote layer has the lowest loss ratio yet earns the lowest return, because it is almost all capital. A constant $15\%$ cost of capital would instead price the $s = 0.01$ layer at $g = 0.8696(0.01) + 0.1304 = 0.139$, more than double the distortion's $0.063$, because it demands the full $15\%$ on capital that is very unlikely to be used.
