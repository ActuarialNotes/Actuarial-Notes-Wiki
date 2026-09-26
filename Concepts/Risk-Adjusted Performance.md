---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:86e79f985e8be91301affe1ad37cb50b8aba593e8cc0586e475a7b76996fe6c4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk-Adjusted Performance.md
---

**Risk-Adjusted Performance** measures the economic result of a [[Business Unit|business unit]] or [[Line of Business|line of business]] relative to the [[Risk Capital]] it uses, so that units carrying very different risk can be compared and each is judged on whether it earns its [[Cost of Capital]]. The two standard measures are the risk-adjusted return on capital (**RAROC**) and economic value added (**EVA**).

> $$\text{RAROC}_i = \frac{\text{NOI}_i}{C_i}$$

> $$\text{EVA}_i = \text{NOI}_i - k\,C_i$$

- $\text{NOI}_i$ is the unit's after-tax net operating income — underwriting result plus investment income on the funds it generates, including the capital allocated to it; $C_i$ is its allocated capital; $k$ the hurdle rate. Since $\text{EVA}_i = (\text{RAROC}_i - k)\,C_i$, a unit creates value exactly when its RAROC exceeds the hurdle.
- **RAROC ranks, EVA sizes.** RAROC is a ratio and flatters small, high-margin units; EVA is in dollars and adds across units (when the allocation is complete), so it is the measure to use when deciding where to grow. Maximising RAROC can shrink the firm below the size that maximises value.
- **Measure economics, not accounting.** Reserves should be at present value and the investment income on them credited to the line. A long-tailed line holds capital for several years, so its charge must cover every year the capital is tied up — a single year's capital understates its cost.
- **The verdict depends on the allocation.** RAROC and EVA inherit whatever capital allocation feeds them (see the example on [[Business Unit]]). Use the same allocation for [[Risk-Adjusted Pricing]] and for performance measurement.
- **Acting on it.** A unit below its hurdle can be repriced, reinsured (lowering its capital), re-underwritten or shrunk; one comfortably above it is a candidate for growth. This is the "evaluate economic performance" step of [[Financial Risk Management]].

> [!example]- RAROC and EVA Across Three Lines {Example}
> The hurdle rate is $10\%$. After-tax NOI and allocated capital ($\$$M):
>
> - Personal auto: NOI $45$, capital $300$
> - Commercial property: NOI $30$, capital $400$
> - Workers compensation: NOI $12$, capital $80$
>
> Compute RAROC and EVA for each line and for the firm.
>
> > [!answer]-
> > - Personal auto: RAROC $= 45/300 = 15.0\%$; EVA $= 45 - 30 = +15$
> > - Commercial property: RAROC $= 30/400 = 7.5\%$; EVA $= 30 - 40 = -10$
> > - Workers compensation: RAROC $= 12/80 = 15.0\%$; EVA $= 12 - 8 = +4$
> >
> > $$
> > \begin{align*}
> > \text{RAROC}_{\text{firm}} &= \frac{87}{780} \\
> > &= 11.2\% \\
> > \text{EVA}_{\text{firm}} &= 87 - 0.10(780) \\
> > &= 9
> > \end{align*}
> > $$
> >
> > The line EVAs add to the firm's: $15 - 10 + 4 = 9$. Auto and workers compensation earn the same RAROC, but auto creates almost four times the value. Property destroys $\$10$M — before cutting it, check whether its tail-driven capital allocation is right and whether catastrophe reinsurance would lower its capital by more than it costs.

> [!example]- Long-Tailed Capital and the One-Year Illusion {Example}
> A commercial liability accident year ties up capital of $\$100$M in year 1, $\$60$M in year 2 and $\$30$M in year 3 as claims settle. The present value of its NOI over its life is $\$14$M. An analyst reports RAROC $= 14/100 = 14\%$ against a $10\%$ hurdle. Evaluate the line with a charge of $10\%$ on each year's capital, paid at year-end and discounted at $10\%$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{PV(charges)} &= \frac{10}{1.1} + \frac{6}{1.1^2} + \frac{3}{1.1^3} \\
> > &= 9.09 + 4.96 + 2.25 \\
> > &= 16.30 \\
> > \text{EVA} &= 14 - 16.30 \\
> > &= -\$2.30\text{M}
> > \end{align*}
> > $$
> >
> > Dividing lifetime profit by first-year capital ignores the two further years the capital is held. Charged for all three, the line falls short of its cost of capital by $\$2.3$M in present value — it looks profitable only because its capital consumption is understated.
