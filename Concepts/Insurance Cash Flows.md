---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b0c31025ec831cfc993c36b81d43f4a9236b6f55079605d00c9ee6c1cc457b5a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Cash Flows.md
---

**Insurance Cash Flows** are the amounts and timing of money moving through an insurance contract: premium in, up front or in instalments; commissions and other expenses out, mostly at the start; claim and LAE payments out over the settlement period; reinsurance premiums and recoveries; taxes; and investment income on the funds held in between. From the owners' side they also include the capital committed at inception and released as the liabilities run off.

> $$\text{PV(losses)} = L \sum_{t} p_t\, v^{t}$$

- $L$ is the nominal (undiscounted) expected loss, $p_t$ the **payout pattern** — the share of $L$ paid at time $t$, summing to $1$ — and $v = 1/(1+r)$ the [[Discount Factor|discount factor]] at a risk-free rate $r$. The sum is the **discount factor for the line**.
- Premium is mostly collected before losses are paid. The gap earns investment income, and its length separates [[Short Tail Insurance|short-tail]] property, paid within about a year, from [[Long Tail Lines|long-tail]] liability and workers compensation, paid over many years.
- **Capital is a cash flow too.** It must be held from inception until the liability is settled, so a long-tail line pays the [[Cost of Capital|cost of capital]] for more years. The investment-income credit and the longer capital commitment pull in opposite directions, and pricing has to reflect both — see [[Economic Value]].
- The same patterns drive [[Loss Reserve Discounting]], asset–liability [[Duration|duration]] matching and the management of [[Interest Rate Risk]].
- Pricing theory built on a one-period model, as in Mildenhall and Major, collapses the multi-year flows into one period by working with losses discounted to inception; the [[Insurance Pricing|premium]], [[Insurance Margin|margin]] and capital it produces are then present values.

> [!example]- Present Value of Losses: Property Versus Liability {Example}
> Two lines each have nominal expected losses of $70$ per $100$ of premium. Property pays $90\%$ at the end of year 1 and $10\%$ at the end of year 2. Liability pays $10\%$, $20\%$, $25\%$, $25\%$ and $20\%$ at the ends of years 1 to 5. Discount at $4\%$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Property factor} &= \frac{0.90}{1.04} + \frac{0.10}{1.04^2} \\
> > &= 0.9578 \\
> > \text{PV}_{\text{prop}} &= 70(0.9578) \\
> > &= 67.05 \\
> > \text{Liability factor} &= \frac{0.10}{1.04} + \frac{0.20}{1.04^2} + \frac{0.25}{1.04^3} \\
> > &\quad + \frac{0.25}{1.04^4} + \frac{0.20}{1.04^5} \\
> > &= 0.8814 \\
> > \text{PV}_{\text{liab}} &= 70(0.8814) \\
> > &= 61.70
> > \end{align*}
> > $$
> >
> > The same nominal $70\%$ loss ratio is a $67\%$ discounted loss ratio for property and $62\%$ for liability, whose average payment is made after $3.25$ years rather than $1.1$.

> [!example]- Premium Needed for the Same Economic Margin {Example}
> For the two lines above, expenses are $25\%$ of premium, paid at inception, and the insurer wants a margin of $5\%$ of premium in present-value terms. What premium does each line need, compared with a nominal calculation that ignores timing?
>
> > [!answer]-
> > The premium must fund expenses, the margin and the discounted losses, so $P(1 - 0.25 - 0.05) = \text{PV(losses)}$:
> >
> > $$
> > \begin{align*}
> > P_{\text{nominal}} &= \frac{70}{0.70} \\
> > &= 100.00 \\
> > P_{\text{prop}} &= \frac{67.05}{0.70} \\
> > &= 95.78 \\
> > P_{\text{liab}} &= \frac{61.70}{0.70} \\
> > &= 88.14
> > \end{align*}
> > $$
> >
> > Timing is worth about $4\%$ of premium on property and $12\%$ on liability. The liability line holds capital for years longer, though, so the $5\%$ margin is a smaller return per year of capital; a full analysis charges the cost of capital for each year it is held, which recovers part of the apparent discount.
