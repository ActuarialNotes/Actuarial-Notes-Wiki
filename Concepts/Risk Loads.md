---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:31ae5b87e0e8a3347379a1216c0b1bfff5316a14c987aff76cd1a2bfe6321c5f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Loads.md
---

**Risk Loads** are the amounts added to expected loss to pay an insurer's capital providers for bearing the risk of a contract. Expected loss plus the risk load is the **risk-loaded technical premium**: the price a pricing model indicates for the risk itself, before expenses and commercial adjustments.

> $$P = E[X] + R(X)$$

- $X$ is the loss to the contract (after its limits and attachment), $R(X) \geq 0$ the risk load. In Mildenhall and Major's notation the risk load is the **margin** $M = P - L$ — see [[Insurance Margin]].
- **Classical premium principles**, each a [[Risk Measure]] applied to $X$:
  - *expected value*: $P = (1 + \theta)\,E[X]$ — the load ignores variability, so a remote catastrophe layer and a stable working layer with the same mean pay the same load;
  - *standard deviation*: $P = E[X] + k\,\sigma(X)$ — the load scales with share, so a 50% share pays half;
  - *variance*: $P = E[X] + k\,\text{Var}(X)$ — the load scales with the *square* of share, so a 50% share pays a quarter and two 50% shares together pay half the load on 100%.
- **Cost-of-capital loads** set capital first, with a capital risk measure (VaR, TVaR or a regulatory standard), then charge the target return on it: $R = \iota\,Q = \delta\,(a - L)$, where $a$ is assets, $\iota$ the target [[Return on Capital|return]] and $\delta = \iota/(1+\iota)$. See [[Cost of Capital]] and [[Risk Capital]].
- **Distortion loads** $R = \rho_g(X) - E[X]$ weight remote layers more heavily than their probability. The distortion can be calibrated to observed market prices, for example of catastrophe bonds and reinsurance layers.
- **Loads are not additive.** Pooling reduces risk, so the load on a portfolio is less than the sum of the stand-alone loads. The portfolio load has to be set top-down and allocated to lines or policies — the problem of [[Risk-Adjusted Pricing]]. In Exam 5 ratemaking the same idea sits inside the [[Profit and Contingency Provision]].

> [!example]- Five Risk Loads for One Catastrophe Layer {Example}
> Losses (\$ millions) to a \$10M xs \$10M catastrophe layer are $0$ with probability $0.90$, $5$ with probability $0.06$ and $10$ (a full limit loss) with probability $0.04$. Compute the technical premium under (a) the expected value principle with $\theta = 0.5$, (b) the standard deviation principle with $k = 0.25$, (c) the variance principle with $k = 0.05$, (d) a proportional hazard distortion $g(s) = s^{0.7}$, and (e) a constant $15\%$ cost of capital with the layer fully collateralised ($a = 10$).
>
> > [!answer]-
> > $$
> > \begin{align*}
> > E[X] &= 0.06(5) + 0.04(10) \\
> > &= 0.70 \\
> > \text{Var}(X) &= 0.06(25) + 0.04(100) - 0.70^2 \\
> > &= 5.01 \\
> > \sigma(X) &= 2.238
> > \end{align*}
> > $$
> >
> > For (d), $S = 0.10$ on $[0, 5)$ and $0.04$ on $[5, 10)$. For (e), $\delta = 0.15/1.15 = 0.1304$.
> >
> > $$
> > \begin{align*}
> > P_{(a)} &= 1.5(0.70) = 1.050 \\
> > P_{(b)} &= 0.70 + 0.25(2.238) = 1.260 \\
> > P_{(c)} &= 0.70 + 0.05(5.01) = 0.951 \\
> > P_{(d)} &= 5(0.10^{0.7}) + 5(0.04^{0.7}) \\
> > &= 0.998 + 0.525 = 1.523 \\
> > P_{(e)} &= 0.70 + 0.1304(10 - 0.70) \\
> > &= 1.913
> > \end{align*}
> > $$
> >
> > The same loss distribution produces risk loads from $0.25$ to $1.21$ — the choice of measure and parameter, not the data, drives the price. The cost-of-capital price is the highest because the layer ties up \$10M of capital against \$0.7M of expected loss; its loss ratio is $0.70/1.913 = 37\%$, and its return is $1.213/(10 - 1.913) = 15\%$ as required.

> [!example]- The Diversification Problem {Example}
> Two independent lines each have expected loss $50$ and standard deviation $30$. The insurer loads premiums at $0.2$ standard deviations. Compare the stand-alone loads with the load on the combined portfolio.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Stand-alone} &= 0.2(30) + 0.2(30) \\
> > &= 12.0 \\
> > \sigma_{\text{pool}} &= \sqrt{30^2 + 30^2} \\
> > &= 42.43 \\
> > \text{Pooled load} &= 0.2(42.43) \\
> > &= 8.49
> > \end{align*}
> > $$
> >
> > Pooling saves $3.51$ of load. If each line is priced stand-alone the insurer over-charges by $41\%$ of the load it needs, and a competitor that passes the diversification benefit on will win the business. The pooled load has to be allocated — here symmetry gives $4.24$ each — and for unequal or correlated lines the allocation method determines each line's price.
