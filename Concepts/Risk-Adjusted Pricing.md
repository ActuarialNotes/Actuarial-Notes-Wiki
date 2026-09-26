---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:df2318bb68030fd7d444880aae7229f36a19baf5660de78c1627f1874ecd6a0a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk-Adjusted Pricing.md
---

**Risk-Adjusted Pricing** sets an insurance premium that covers expected losses and expenses plus a margin paying the [[Cost of Capital]] on the [[Risk Capital]] the business consumes — with that capital, and so the margin, measured by the risk's contribution to the insurer's *total* risk rather than by its standalone volatility. It is the capital-based derivation of the profit and risk provision in a rate.

> $$P = E[X \wedge a] + \iota\,(a - P)$$

> $$P = \nu\,E[X \wedge a] + \delta\,a$$

- In Mildenhall and Major's notation: $X$ is the loss, $a$ the assets held (set by a [[Risk Measure]] such as VaR or TVaR), $E[X \wedge a]$ the expected loss the insurer can actually pay, $Q = a - P$ the capital investors supply, $M = P - E[X \wedge a]$ the margin, and $\iota = M/Q$ the cost of capital. Solving the first line for $P$ gives the second, with $\nu = 1/(1+\iota)$ and $\delta = \iota/(1+\iota)$, so $\nu + \delta = 1$. This is **constant cost of capital (CCoC)** pricing; expenses and the time value of money are added on top.
- **From portfolio to policy.** The formula prices the whole portfolio; each [[Line of Business|line]] or policy then needs its share of the margin. Allocating capital (see [[Risk Capital]]) and charging every unit the same $\iota$ is one choice. Mildenhall and Major instead allocate the margin directly, which lets units earn different implied returns on capital.
- **RAROC-target form.** With allocated capital $C_i$ held for one period and invested at yield $y$, the premium that earns hurdle $k$ is $P_i = \text{PV}(E[L_i]) + \text{PV}(\text{expenses}_i) + (k - y)\,C_i$ — the capital earns $y$ while held, so pricing supplies only the spread.
- **Price to the margin, not the standalone risk.** A policy that diversifies the book needs less capital and so less margin. Pricing on standalone capital overprices diversifying risks, which competitors pricing on the portfolio then take away.
- **Relation to classic loads.** [[Risk Loads]] based on variance or standard deviation, and the [[Profit and Contingency Provision]] of ratemaking, are the same idea expressed without an explicit capital model; [[Insurance Pricing]] with a capital model makes the load traceable to a cost.

> [!example]- Constant Cost of Capital Price for a Portfolio {Example}
> A portfolio has $E[X \wedge a] = \$1{,}000$M. The insurer holds assets $a = \$1{,}600$M, set by its risk measure, and targets a cost of capital $\iota = 12.5\%$. Find the premium, margin, capital, loss ratio and premium-to-capital leverage.
>
> > [!answer]-
> > $\nu = 1/1.125 = 0.8889$ and $\delta = 0.125/1.125 = 0.1111$.
> >
> > $$
> > \begin{align*}
> > P &= 0.8889(1{,}000) + 0.1111(1{,}600) \\
> > &= \$1{,}066.7\text{M} \\
> > M &= 1{,}066.7 - 1{,}000 \\
> > &= \$66.7\text{M} \\
> > Q &= 1{,}600 - 1{,}066.7 \\
> > &= \$533.3\text{M}
> > \end{align*}
> > $$
> >
> > Check: $M/Q = 66.7/533.3 = 12.5\%$. The loss ratio is $1{,}000/1{,}066.7 = 93.75\%$ and premium-to-capital leverage is $1{,}066.7/533.3 = 2.0$. Premium funds part of the assets, so investors supply only $\$533$M of the $\$600$M above expected loss.

> [!example]- Pricing on Allocated versus Standalone Capital {Example}
> A large commercial account has present value of expected loss $\$800$K and expenses $\$150$K. Its marginal (Euler) allocated capital is $\$1{,}000$K; standalone it would need $\$2{,}500$K. The hurdle is $12\%$, capital is invested at $4\%$, and capital is held for one year. Ignore taxes. Price the account both ways.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > P_{\text{allocated}} &= 800 + 150 + (0.12 - 0.04)(1{,}000) \\
> > &= \$1{,}030\text{K} \\
> > P_{\text{standalone}} &= 800 + 150 + (0.08)(2{,}500) \\
> > &= \$1{,}150\text{K}
> > \end{align*}
> > $$
> >
> > The standalone price is $\$120$K ($11.7\%$) higher. The account diversifies the book — it adds only $\$1.0$M to the firm's capital need — so the standalone quote charges it for risk the firm never holds. A competitor pricing on its portfolio would write the account at about $\$1{,}030$K and still earn $12\%$ on the capital it actually uses.
