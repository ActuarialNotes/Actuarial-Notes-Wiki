---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d83d8ab56b52f1bc6bc33dab2634e2aaba9ccaa3233dfe49efa7d123dd6989a1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Leverage.md
---

**Insurance Leverage** is the volume of business written per unit of capital supporting it — in Mildenhall and Major, the premium-to-capital ratio $P/Q$. It is the lever that turns a thin [[Insurance Margin|margin]] into an adequate [[Return on Capital|return]], paid for with a thinner cushion against bad outcomes.

> $$\text{Leverage} = \frac{P}{Q}$$
>
> $$\iota = \frac{M}{P} \cdot \frac{P}{Q}$$

- $P$ is premium, $Q = a - P$ capital, $a$ assets, $M$ margin and $\iota$ return. Leverage can equally be stated as premium to assets, $P/a$; since $Q = a - P$, the two are linked by $P/Q = (P/a)/(1 - P/a)$.
- **Return versus safety.** For a given margin ratio, doubling leverage doubles the return — but halves the capital behind each dollar of premium, so a smaller adverse deviation exhausts it. Regulators and rating agencies watch leverage for exactly that reason; statutory screens include premium-to-surplus tests ([[IRIS Ratios]]), alongside risk-based capital requirements ([[Risk-Based Capital]]).
- **Leverage follows risk.** Diversified, low-volatility business such as personal auto supports high leverage at thin margins. Business whose losses do not diversify — [[Catastrophe Risk|catastrophe]] layers above all — supports little, and needs a high margin ratio to earn the same return. Under distortion pricing a layer whose attachment probability is $s$ has leverage $g(s)/(1 - g(s))$: remote layers are funded almost entirely by capital.
- **Other capital raises equity leverage.** Debt and [[Reinsurance|reinsurance]] are forms of risk capital with a fixed cost; replacing part of the equity with them raises premium-to-equity leverage and, if they cost less than equity, the return on what equity remains ([[Capital Structure]]).
- The industry measures leverage from the statutory balance sheet — written premium, and reserves, relative to policyholders' surplus ([[Capital and Surplus]]). Pricing uses capital allocated to the business being priced. See [[Insurance Profitability]].

> [!example]- Same Margin, Different Leverage {Example}
> Two insurers write premium of $100$ with expected loss $94$, a $6\%$ margin ratio. Insurer A holds capital of $66.67$; insurer B holds $33.33$. Compare their leverage, return, and how far losses can exceed expectation before capital is gone.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \iota_A &= 0.06 \times \frac{100}{66.67} \\
> > &= 0.06 \times 1.5 \\
> > &= 9\% \\
> > \iota_B &= 0.06 \times \frac{100}{33.33} \\
> > &= 0.06 \times 3.0 \\
> > &= 18\%
> > \end{align*}
> > $$
> >
> > Assets are $166.67$ for A and $133.33$ for B, so losses would have to exceed expectation by $166.67 - 94 = 72.67$ to exhaust A but by only $39.33$ to exhaust B. B's doubled return is bought with a much higher chance of default — which is why a return comparison means nothing without the leverage behind it.

> [!example]- Buying Security Lowers Leverage and Raises the Price {Example}
> A portfolio has expected loss $80$ and investors require $12\%$. Compare the premium, capital and leverage if the capital standard sets assets at $120$ and at $150$.
>
> > [!answer]-
> > With $\delta = 0.12/1.12 = 0.10714$ and $P = L + \delta(a - L)$:
> >
> > $$
> > \begin{align*}
> > P_{120} &= 80 + 0.10714(40) \\
> > &= 84.29 \\
> > Q_{120} &= 120 - 84.29 \\
> > &= 35.71 \\
> > P_{150} &= 80 + 0.10714(70) \\
> > &= 87.50 \\
> > Q_{150} &= 150 - 87.50 \\
> > &= 62.50
> > \end{align*}
> > $$
> >
> > Leverage falls from $84.29/35.71 = 2.36$ to $87.50/62.50 = 1.40$ and the loss ratio from $94.9\%$ to $91.4\%$. Policyholders pay $3.21$ more for an insurer that can absorb $30$ more of adverse loss; both prices earn exactly $12\%$.
