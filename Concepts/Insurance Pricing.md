---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5e3455cfff86518ce6d40988975f6af9b64a01ecb7e5dfd04b365712e324f12e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Pricing.md
---

**Insurance Pricing** is setting the premium for a policy or a portfolio so that it covers the expected loss, the expenses of writing and servicing it, and a margin that pays the capital providers for the risk they bear. Exam 9 asks for it on a *risk-adjusted* basis: business that consumes more capital pays more margin.

> $$P = L + \iota\, Q$$
>
> $$P = \nu L + \delta a$$

- In Mildenhall and Major's notation, $L$ is expected loss (strictly $E[X \wedge a]$, the loss the insurer can actually pay), $P$ premium, $M = P - L$ the [[Insurance Margin|margin]], $a$ assets, $Q = a - P$ capital, $\iota = M/Q$ the target [[Return on Capital|return]], $\nu = 1/(1+\iota)$ and $\delta = \iota/(1+\iota)$. The second form says premium is a weighted average of expected loss and assets, so given $\iota$, $L$ and $a$ the premium is fixed.
- **Three ingredients** make a risk-adjusted pricing model: the total capital (assets set by a capital [[Risk Measure|risk measure]] such as VaR or TVaR, or by a regulatory or rating-agency standard); the cost of that capital; and the allocation of that cost to lines or policies ([[Cost of Capital]], [[Risk Capital]]).
- **Actuarial and financial pricing.** Once product design fixes the loss and the capital standard fixes the assets, one degree of freedom remains. Actuarial pricing works it through a [[Target Loss Ratio|target loss ratio]]; financial pricing through a target return on capital. They are the same decision seen from two sides — see [[Insurance Profitability]].
- **Portfolio first.** [[Risk Loads]] are not additive, so the portfolio premium is set top-down and then allocated. A policy's price depends on the portfolio it joins: its marginal effect on expected loss and on required capital, which is the subject of [[Risk-Adjusted Pricing]].
- **Expenses and time.** The theory produces a risk premium with no expenses, taxes or investment income. Practice grosses it up for expenses, much as Exam 5 does with [[Expense Provisions]] and the [[Profit and Contingency Provision]], and works with discounted losses — see [[Insurance Cash Flows]] and [[Economic Value]].

> [!example]- Portfolio Premium With a TVaR Capital Standard {Example}
> A portfolio has expected loss $L = 80$. Assets are set at $\text{TVaR}_{0.99} = 150$, and investors require a $12\%$ return. Find the risk premium, margin, capital, loss ratio and leverage, then gross the premium up for fixed expenses of $3$ and variable expenses of $20\%$ of gross premium.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \delta &= \frac{0.12}{1.12} \\
> > &= 0.10714 \\
> > P &= L + \delta\,(a - L) \\
> > &= 80 + 0.10714(70) \\
> > &= 87.50 \\
> > M &= 87.50 - 80 \\
> > &= 7.50 \\
> > Q &= 150 - 87.50 \\
> > &= 62.50
> > \end{align*}
> > $$
> >
> > Check: $M/Q = 7.50/62.50 = 12\%$. The loss ratio is $80/87.5 = 91.4\%$ and premium-to-capital leverage $87.5/62.5 = 1.40$.
> >
> > $$
> > \begin{align*}
> > \text{Gross premium} &= \frac{87.50 + 3}{1 - 0.20} \\
> > &= 113.13
> > \end{align*}
> > $$
> >
> > The \$7.50 margin is what the owners need for putting \$62.50 of capital at risk; expenses are passed through on top of it.

> [!example]- Marginal Versus Stand-Alone Price of a New Policy {Example}
> For the portfolio above, a new policy has expected loss $1.0$. Written alone it would need assets of $12$; added to the portfolio it raises TVaR-based assets by only $4$, because its large losses rarely coincide with the portfolio's. Price it both ways at the same $12\%$ return.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > P_{\text{stand-alone}} &= 1.0 + 0.10714(12 - 1.0) \\
> > &= 2.18 \\
> > P_{\text{marginal}} &= 1.0 + 0.10714(4 - 1.0) \\
> > &= 1.32
> > \end{align*}
> > $$
> >
> > Stand-alone the policy needs a $46\%$ loss ratio; priced at its effect on the portfolio, $76\%$. The difference is the diversification the portfolio supplies. An insurer whose book diversifies the risk can quote well below one that would carry it alone and still earn its target return — which is why the same risk has different technical prices at different insurers.
