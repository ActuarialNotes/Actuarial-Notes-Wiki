---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:50c584f6653f35eba3d28b442795937709355070353fa780ccd532bcb8e9225d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Price Optimization.md
---
**Price Optimization** is the practice of adjusting cost-based rates using models of **customer demand**, the likelihood that a customer buys or renews at a given price, so that the final premium serves a business objective such as profit, volume or retention. U.S. regulators accept judgement in selecting rates, but treat demand-based differences between customers with the same expected cost as [[Unfair Discrimination|unfair discrimination]].

For one customer, the optimized price $P^{*}$ is the price $P$ that maximizes expected profit:

> $$P^{*} = \arg\max_{P} \; (P - C)\,\rho(P)$$

- $C$ is the policy's expected cost: losses, LAE and expenses.
- $\rho(P)$ is the probability that the customer buys or renews at price $P$ (a conversion or retention model).
- $(P - C)\,\rho(P)$ is expected profit.

Real optimizers solve this across a whole book, subject to constraints on volume, loss ratio and the size of any change.

> [!example]- Which price does an optimizer charge each of these two identical risks, and is it permissible? {Example}
> Two renewing homeowners are in the same rating class, each with expected cost $C = \$950$. The insurer can offer $\$1{,}000$ or $\$1{,}100$. Its retention model gives:
>
> | Customer | $\rho(1{,}000)$ | $\rho(1{,}100)$ |
> | :--- | ---: | ---: |
> | A (price-sensitive) | 0.90 | 0.25 |
> | B (inert) | 0.95 | 0.90 |
>
> > [!answer]-
> > - For A, expected profit is $0.90 \times 50 = 45.0$ at $\$1{,}000$ and $0.25 \times 150 = 37.5$ at $\$1{,}100$.
> > - For B, expected profit is $0.95 \times 50 = 47.5$ at $\$1{,}000$ and $0.90 \times 150 = 135.0$ at $\$1{,}100$.
> > - The optimizer charges A $\$1{,}000$ and B $\$1{,}100$, a $10\%$ surcharge on B for being unlikely to leave.
> > - The two customers have the same expected cost, so the difference is not cost-based.
> > - It rests on price elasticity and individual retention, which the NAIC white paper lists as inconsistent with "not unfairly discriminatory". It is prohibited outright in states with price optimization bulletins.

## Definitions of price optimization

Definitions vary. The CAS describes it as supplementing loss cost models with quantitative customer demand models, producing adjustments to cost-based prices by customer segment. The NAIC's Casualty Actuarial and Statistical Task Force white paper (2015) deliberately declined to define it. It instead applied the statutory test, that rates are *not excessive, inadequate or unfairly discriminatory*, to whatever the practice is called.

## The NAIC white paper's recommendations

For personal lines, the white paper recommends:

1. Rating plans should be derived from sound actuarial analysis and be **cost-based**.
2. Two customers with the same risk profile should pay the same premium for the same coverage, except for temporary differences from capping or transition rules.
3. Selecting a rate between the current and the indicated rate on reasonable, cost-related grounds is acceptable. One outside that range may be, if disclosed and justified.
4. Adjustments based on **price elasticity of demand**, **propensity to shop**, **retention at an individual level** or a **propensity to ask questions or complain** are, at a minimum, inconsistent with "not unfairly discriminatory".
5. Very granular rating cells are not a violation in themselves, provided they are cost-based and statistically reliable.

Maryland issued the first prohibiting bulletin in October 2014, and California, Ohio and many other states followed.

> [!example]- Is each of these four pricing practices acceptable judgement or objectionable optimization? {Example}
> 1. The indicated overall change is $+14\%$, and the insurer files $+9\%$ because a larger increase would cost it market share.
> 2. Renewal increases on a new rating plan are capped at $15\%$ a year until policies reach the new rate.
> 3. Renewal discounts are withdrawn from policyholders a model predicts will not shop.
> 4. A GLM produces 40,000 rating cells, each priced from fitted loss costs.
>
> > [!answer]-
> > - (1) Acceptable judgement. Selecting a rate between current and indicated is within the white paper's tolerance, provided the insurer can justify it, and the whole class moves together.
> > - (2) Acceptable, with limits. Capping is a recognised transition device. Regulators look at how long it lasts, how wide the caps are, and whether the capped policies' shortfall is recovered from others.
> > - (3) Unfairly discriminatory. It is an individual retention adjustment based on propensity to shop, price optimization in its objectionable form.
> > - (4) Not a violation in itself. Granularity is permitted if the rating factors are cost-based, and the regulator's concern is whether cells so fine are statistically reliable.

## Why price optimization is contested

Customers who shop least, often older or lower-income, pay most, and the difference has nothing to do with their risk. Defenders reply that every rate selection involves judgement and competitive considerations. The regulatory line sits between judgement applied to **cost-based** rates and prices set from an **individual's** willingness to pay. [[Principles of Ratemaking]] and [[Emerging Regulatory Issues]] cover the wider setting.

> [!trap] Treating the profit-maximizing rate as an actuarially sound rate
> A rate chosen because a retention model says it maximizes profit has not been shown to reflect expected costs. The cost-based indication comes first, and any departure from it needs a cost-related reason.
