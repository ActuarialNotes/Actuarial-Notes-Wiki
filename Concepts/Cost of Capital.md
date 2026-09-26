---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:73f18af4fe56e0fd3447425b19b8fa0c4cfb8c084292ab646e0c07f4cc1a874e
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Cost of Capital.md
---

**The Cost of Capital** is the return investors require for supplying capital to an insurer — the hurdle rate $k$ that a [[Line of Business|line]], [[Business Unit|business unit]] or policy must earn on the [[Risk Capital]] allocated to it for the business to add value. For an insurer it has two layers: the market's required return for the risk borne, and the **frictional costs** of holding capital inside an insurance company, which arise from [[Insurance Market Imperfections]].

> $$k_E = r_f + \beta_E\,\bigl(E[r_m] - r_f\bigr)$$

> $$\text{Capital charge}_i = k \times C_i$$

- $k_E$ is the cost of equity by the capital asset pricing model: $r_f$ the risk-free rate, $\beta_E$ the equity beta, $E[r_m] - r_f$ the market risk premium. With debt in the [[Capital Structure]], the firm-wide rate is the weighted average cost of capital, $k_{\text{WACC}} = \frac{E}{D+E}\,k_E + \frac{D}{D+E}\,k_D(1-t)$.
- **Allocating the cost.** $C_i$ is the capital allocated to unit $i$, so the allocation method (see [[Risk Capital]]) decides each unit's charge. The charge is due for every year the capital is held, which is why long-tailed lines carry far more of it than their first-year capital suggests.
- **Line-specific rates.** One could instead estimate a beta for each line and charge each line its own CAPM rate. In practice underwriting betas are hard to estimate, and the CAPM prices only systematic risk, whereas an insurer's frictional costs depend on *total* risk — including the diversifiable risk the CAPM treats as free.
- **Frictional costs.** Capital inside an insurer costs more than the same capital held by investors directly: investment income on it is taxed at the corporate level before it reaches shareholders ([[Insurance Income Tax|double taxation]]), surplus capital invites agency costs, and replacing capital after a large loss is expensive. The part pricing must recover is the required return **less** what the capital earns while it is held.
- **Cost versus return.** The hurdle $k$ is compared with the unit's [[Return on Capital]] (RAROC), or subtracted from its income to give EVA — see [[Risk-Adjusted Performance]]. In Mildenhall and Major's notation the cost of capital $\iota$ is margin divided by capital, and it sets the premium in [[Risk-Adjusted Pricing]].

> [!example]- Cost of Equity and the Charge to Each Line {Example}
> The risk-free rate is $4\%$, the insurer's equity beta $0.9$ and the market risk premium $6\%$. Capital of $\$1{,}000$M is allocated: property $\$450$M, auto $\$350$M, workers compensation $\$200$M. Compute the cost of equity and each line's annual capital charge.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > k_E &= 0.04 + 0.9(0.06) \\
> > &= 9.4\%
> > \end{align*}
> > $$
> >
> > - Property: $0.094 \times 450 = \$42.3$M
> > - Auto: $0.094 \times 350 = \$32.9$M
> > - Workers compensation: $0.094 \times 200 = \$18.8$M
> >
> > The charges sum to $\$94.0$M, the cost of the whole $\$1{,}000$M. Each line's result must cover its charge; which line bears how much is entirely a product of the allocation.

> [!example]- The Tax Wedge and the Net Cost a Line Must Earn {Example}
> Investors require $10\%$ after tax. Capital held inside the insurer is invested in bonds yielding $5\%$ pre-tax, and the insurer pays tax at $21\%$. Commercial auto is allocated $\$200$M of capital. What after-tax and pre-tax underwriting profit must the line earn?
>
> > [!answer]-
> > After tax, the capital earns $5\% \times (1 - 0.21) = 3.95\%$ while held. Underwriting must supply the rest:
> >
> > $$
> > \begin{align*}
> > \text{After-tax UW profit} &= (0.10 - 0.0395) \times 200 \\
> > &= \$12.1\text{M} \\
> > \text{Pre-tax UW profit} &= \frac{12.1}{1 - 0.21} \\
> > &= \$15.3\text{M}
> > \end{align*}
> > $$
> >
> > An investor who pays no tax (a pension fund, say) would earn the full $5\%$ holding the same bonds directly; inside the insurer it earns $3.95\%$. The $1.05\%$ wedge — $\$2.1$M a year on this line — is a pure frictional cost of holding capital in an insurance company, and it is paid by the line's customers through the price.
