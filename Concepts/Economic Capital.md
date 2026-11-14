---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8d891cf7c91ea95a49d8246302977a42f45a540333a904983c55251e0a11d492
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Economic Capital.md
---

**Economic Capital** (EC) is the capital an insurer itself estimates it needs to stay solvent, at a confidence level and over a time horizon it chooses, measured on an economic balance sheet with its own model of its risks. It is the [[Risk Capital|risk capital]] that management allocates, prices with and measures performance against, as opposed to the supervisor's figure given by [[Regulatory Capital|regulatory capital]].

Measured by [[Risk Measure|value at risk]] at confidence level $\alpha$, economic capital is

> $$\text{EC} = \text{VaR}_{\alpha}(\Delta)$$

- $\Delta$ is the fall in the insurer's economic net worth, its assets less its liabilities at market-consistent values, over the horizon.

Measured by tail value at risk, it is

> $$\text{EC} = \text{TVaR}_{\alpha}(\Delta)$$

- $\text{TVaR}_{\alpha}$ is the tail value at risk, the average of the worst $1 - \alpha$ of outcomes.

At the same confidence level, TVaR is larger than VaR. The insurer's capital against its EC is its coverage ratio, which is

> $$\text{Coverage} = \frac{\text{Available economic capital}}{\text{EC}}$$

- Available economic capital is the economic net worth the insurer holds today.

> [!example]- What is this insurer's EC as a 99.5% VaR, its coverage ratio, and its EC as a 99.5% and a 99% TVaR? {Example}
> An insurer models the change in its economic net worth over one year as normal, with a mean gain of $\$40$ million and a standard deviation of $\$150$ million. Its available economic capital is $\$500$ million.
>
> > [!answer]-
> > - The loss is normal with mean $-40$ and standard deviation $150$, and $z_{0.995} = 2.5758$.
> > - The 99.5% VaR is $2.5758(150) - 40 = 346.4$, so the EC is $\$346.4$ million.
> > - The coverage ratio is $500/346.4 = 144\%$.
> > - For a normal loss, $\text{TVaR}_{\alpha} = \mu + \sigma\,\phi(z_{\alpha})/(1 - \alpha)$, with $\phi(2.5758) = 0.014460$ and $\phi(2.3263) = 0.026652$.
> > - The 99.5% TVaR is $150(0.014460)/0.005 - 40 = 393.8$, and the coverage falls to $127\%$.
> > - The 99% TVaR is $150(0.026652)/0.01 - 40 = 359.8$.
> > - A 99% TVaR gives about the same capital as a 99.5% VaR for this distribution. The two differ more for a skewed loss with a heavy tail, where the TVaR also sees how bad the losses beyond the quantile are.

## Design of an economic capital model

An EC model fixes a risk measure, a confidence level, a horizon and a valuation basis. The confidence level sets the probability of ruin the insurer accepts, and it is often chosen to match the default probability of a target credit rating. The horizon is usually one year, with the liabilities valued at its end, or the run-off of the liabilities. Each choice changes the number, so EC figures from two insurers are comparable only when the definitions match.

The model values assets and liabilities at market-consistent values. Using statutory reserves, which carry their own margins, counts prudence twice.

## Risks covered and internal models

A full model covers market, credit, insurance, operational and business risk. It can include risks a regulatory formula leaves out, such as a concentration of reinsurers, a policyholder behaviour assumption or a strategic risk, which is one reason to build it.

The losses come from stress tests for each risk, from simulating the whole balance sheet, or from a mix of the two. Factor approaches are cheaper but blunt, while stochastic models capture options and guarantees and non-linear liabilities at the cost of model risk and validation work.

## Aggregation and diversification

The risks are combined by a correlation matrix, by a copula, or by simulating them together. The risks don't all reach their worst at once, so the total is less than the sum of the parts. The gap is the [[Risk Diversification|diversification benefit]].

## Uses of economic capital

EC tests capital adequacy against the insurer's own view, sets [[Risk Appetite|risk appetite]] and limits, and supports the [[ORSA]]. Allocated to units, it is the denominator of [[Risk-Adjusted Performance|risk-adjusted performance]] measures such as RAROC and EVA. It also prices business and tests reinsurance, acquisitions and investment strategy by the capital each consumes or frees.

> [!example]- Which of these two units creates value at a 10% hurdle rate? {Example}
> An insurer allocates EC of $\$200$ million to its individual life unit and $\$500$ million to its annuity unit. Their after-tax operating incomes are $\$30$ million and $\$45$ million.
>
> > [!answer]-
> > - The life unit's RAROC is $30/200 = 15\%$, and its EVA is $30 - 0.10(200) = 10$.
> > - The annuity unit's RAROC is $45/500 = 9\%$, and its EVA is $45 - 0.10(500) = -5$.
> > - The annuity unit earns more income but less than the hurdle on the capital it ties up, so it destroys $\$5$ million of value a year at this allocation.
> > - The verdict depends on the allocation. If the annuities' longevity risk offsets the life unit's mortality risk, a method that credits that offset would give the annuity unit less EC.

A unit's RAROC changes with the method used to allocate EC, especially how the diversification benefit is shared, so a conclusion about a unit should name the allocation it rests on.

## Economic capital and regulatory capital

Regulatory capital is a uniform formula that sets a floor and is public. EC is specific to the insurer, recognizes its own diversification and is used to run the business. Where EC exceeds the formula, the insurer's [[Internal Target Capital Ratio|internal target]] should reflect the excess. Where it is far below, the insurer should ask what its model misses.

> [!trap] Ignoring the expected gain
> EC measures the fall in net worth, so an expected gain reduces it. Taking $z\,\sigma$ alone, or adding the mean, misstates the capital. In the example, $2.5758(150) = 386.4$ overstates the 99.5% VaR by the $\$40$ million mean gain.
