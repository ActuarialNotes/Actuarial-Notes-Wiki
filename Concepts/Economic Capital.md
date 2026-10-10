---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:944b314b00b85c0b18589462300db44fe47dbe14d5dcbf6ab479ab98e4864284
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Economic Capital.md
---

**Economic capital** (EC) is the capital an insurer itself estimates it needs to stay solvent, at a confidence level and over a time horizon it chooses, measured on an economic balance sheet with its own model of its risks. It is the insurer's answer to how much capital its risks require, as opposed to the supervisor's answer given by [[Regulatory Capital|regulatory capital]], and it is the [[Risk Capital|risk capital]] that management allocates, prices with and measures performance against.

> $$\text{EC} = \text{VaR}_{\alpha}(\Delta)$$

> $$\text{EC} = \text{TVaR}_{\alpha}(\Delta)$$

> $$\text{Coverage} = \frac{\text{Available economic capital}}{\text{EC}}$$

- **Symbols:** $\Delta$ is the fall in the insurer's economic net worth, its assets less its liabilities at market-consistent values, over the horizon. $\text{VaR}_{\alpha}$ is the [[Risk Measure|value at risk]] at confidence level $\alpha$, and $\text{TVaR}_{\alpha}$ is the tail value at risk, the average of the worst $1 - \alpha$ of outcomes. Available economic capital is the economic net worth the insurer holds today.
- **The design choices:** An EC model fixes a risk measure, a confidence level, a horizon and a valuation basis. The confidence level is often chosen to match the default probability of a target credit rating. The horizon is usually one year, with the liabilities valued at its end, or the run-off of the liabilities. Each choice changes the number, so EC figures from two insurers are comparable only when the definitions match.
- **The risks covered:** A full model covers market, credit, insurance, operational and business risk. It can include risks a regulatory formula leaves out, such as a concentration of reinsurers, a policyholder behaviour assumption or a strategic risk, which is one reason to build it.
- **Internal models:** The losses come from stress tests for each risk, from simulating the whole balance sheet, or from a mix of the two. Factor approaches are cheaper but blunt, while stochastic models capture options and guarantees and non-linear liabilities at the cost of model risk and validation work.
- **Aggregation:** The risks are combined by a correlation matrix, by a copula, or by simulating them together. Because they don't all reach their worst at once, the total is less than the sum of the parts, and the gap is the diversification benefit. See [[Risk Diversification]].
- **Uses:** EC tests capital adequacy against the insurer's own view, sets [[Risk Appetite|risk appetite]] and limits, and supports the [[ORSA]]. Allocated to units, it is the denominator of [[Risk-Adjusted Performance|risk-adjusted performance]] measures such as RAROC and EVA, and it prices business and tests reinsurance, acquisitions and investment strategy by the capital each consumes or frees.
- **Against regulatory capital:** Regulatory capital is a uniform formula that sets a floor and is public. EC is specific to the insurer, recognizes its own diversification and is used to run the business. Where EC exceeds the formula, the insurer's [[Internal Target Capital Ratio|internal target]] should reflect the excess, and where it is far below, the insurer should ask what its model misses.

> [!example]- Economic Capital at 99.5% and Its Coverage {Example}
> An insurer models the change in its economic net worth over one year as normal, with a mean gain of \$40 million and a standard deviation of \$150 million. Its available economic capital is \$500 million.
>
> (a) Find the EC as a one-year 99.5% VaR, and the coverage ratio.
>
> (b) Find the EC as a 99.5% TVaR and as a 99% TVaR.
>
> > [!answer]-
> > **(a)** The loss is normal with mean $-40$ and standard deviation $150$, and $z_{0.995} = 2.5758$.
> > $$
> > \begin{align*}
> > \text{VaR}_{0.995} &= 2.5758(150) - 40 \\
> > &= 346.4 \\
> > \text{Coverage} &= 500 / 346.4 \\
> > &= 144\%
> > \end{align*}
> > $$
> > **(b)** For a normal loss, $\text{TVaR}_{\alpha} = \mu + \sigma\,\phi(z_{\alpha})/(1 - \alpha)$, with $\phi(2.5758) = 0.014460$ and $\phi(2.3263) = 0.026652$.
> > $$
> > \begin{align*}
> > \text{TVaR}_{0.995} &= 150 \times \frac{0.014460}{0.005} - 40 \\
> > &= 393.8 \\
> > \text{TVaR}_{0.99} &= 150 \times \frac{0.026652}{0.01} - 40 \\
> > &= 359.8
> > \end{align*}
> > $$
> > The coverage falls to 127% under the 99.5% TVaR. A 99% TVaR gives about the same capital as a 99.5% VaR for this distribution, but the two differ more for a skewed loss with a heavy tail, where the TVaR also sees how bad the losses beyond the quantile are.

> [!example]- Allocated Economic Capital and Unit Performance {Example}
> An insurer allocates EC of \$200 million to its individual life unit and \$500 million to its annuity unit, whose after-tax operating incomes are \$30 million and \$45 million. Its hurdle rate is 10%. Which unit creates value?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{RAROC}_{\text{life}} &= 30 / 200 \\
> > &= 15\% \\
> > \text{EVA}_{\text{life}} &= 30 - 0.10(200) \\
> > &= 10 \\
> > \text{RAROC}_{\text{ann}} &= 45 / 500 \\
> > &= 9\% \\
> > \text{EVA}_{\text{ann}} &= 45 - 0.10(500) \\
> > &= -5
> > \end{align*}
> > $$
> > The annuity unit earns more income, but less than the 10% hurdle on the capital it ties up, so it destroys \$5 million of value a year at this allocation. The verdict depends on the allocation: if the annuities' longevity risk offsets the life unit's mortality risk, a method that credits that offset would give the annuity unit less EC.

> [!tip]- How it appears on the exam
> - **ILA-201I and ILA-201U:** The objective asks candidates to describe the purpose and application of economic capital. Expect written questions on how an EC model is defined and built, how it differs from regulatory capital, and how it is used in capital management, pricing and performance measurement.
> - **CFE-101:** Candidates compare economic capital with regulatory, accounting and value measures such as embedded value and EVA, and explain how each supports decisions. A calculation may give a loss distribution or allocated capital and ask for the EC, RAROC or EVA.

> [!warning]- Exam traps
> - **Subtracting the mean:** EC measures the fall in net worth, so an expected gain reduces it. Taking $z\,\sigma$ alone, or adding the mean, misstates the capital.
> - **VaR and TVaR at one level:** At the same confidence level, TVaR is larger than VaR. Comparing a VaR-based EC with a TVaR-based one without matching the levels mixes two measures.
> - **Economic, not statutory:** The model values assets and liabilities at market-consistent values. Using statutory reserves, which carry their own margins, counts prudence twice.
> - **Allocation decides the verdict:** A unit's RAROC changes with the method used to allocate EC, especially how the diversification benefit is shared. A conclusion about a unit should name the allocation it rests on.
