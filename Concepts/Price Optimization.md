---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c906fa31c61d2d2544acac98fcb8a8845e572315cd5d26937459f63f87f5d7cb
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Price Optimization.md
---

**Price Optimization** is the practice of adjusting cost-based rates using models of **customer demand** — how likely a customer is to buy or renew at a given price — so that the final premium serves a business objective such as profit, volume or retention. U.S. regulators accept judgement in selecting rates, but treat demand-based differences between customers with the same expected cost as **unfair discrimination**.

> $$P^{*} = \arg\max_{P} \; (P - C)\,\rho(P)$$

- $C$ is the policy's expected cost — losses, LAE and expenses; $\rho(P)$ is the probability that the customer buys or renews at price $P$ (a conversion or retention model); $(P - C)\,\rho(P)$ is expected profit. Real optimizers solve this across a whole book, subject to constraints on volume, loss ratio and the size of any change.
- **Definitions vary.** The CAS describes it as supplementing loss cost models with quantitative customer demand models, producing adjustments to cost-based prices by customer segment. The NAIC's Casualty Actuarial and Statistical Task Force white paper (2015) deliberately declined to define it and instead applied the statutory test — rates *not excessive, inadequate or unfairly discriminatory* — to whatever the practice is called.
- **The white paper's recommendations** (personal lines):
  - rating plans should be derived from sound actuarial analysis and be **cost-based**;
  - two customers with the same risk profile should pay the same premium for the same coverage — temporary differences from capping or transition rules excepted;
  - selecting a rate between the current and the indicated rate on reasonable, cost-related grounds is acceptable, and one outside that range may be if disclosed and justified;
  - adjustments based on **price elasticity of demand**, **propensity to shop**, **retention at an individual level** or a **propensity to ask questions or complain** are, at a minimum, inconsistent with "not unfairly discriminatory";
  - very granular rating cells are not a violation in themselves, provided they are cost-based and statistically reliable.
- **State action.** Maryland issued the first prohibiting bulletin in October 2014; California, Ohio and many others followed.
- **Why it is contested.** Customers who shop least — often older or lower-income — pay most, and the difference has nothing to do with their risk. Defenders reply that every rate selection involves judgement and competitive considerations. The regulatory line sits between judgement applied to **cost-based** rates and prices set from an **individual's** willingness to pay. See [[Unfair Discrimination]], [[Principles of Ratemaking]] and [[Emerging Regulatory Issues]].

> [!example]- Two Identical Risks, Two Prices {Example}
> Two renewing homeowners are in the same rating class, each with expected cost $C = \$950$. The insurer can offer $\$1{,}000$ or $\$1{,}100$. Its retention model gives: customer A (price-sensitive) $\rho(1{,}000) = 0.90$, $\rho(1{,}100) = 0.25$; customer B (inert) $\rho(1{,}000) = 0.95$, $\rho(1{,}100) = 0.90$. What does an optimizer charge, and is it permissible?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{A, } \$1{,}000\text{: } 0.90 \times 50 &= 45.0 \\
> > \text{A, } \$1{,}100\text{: } 0.25 \times 150 &= 37.5 \\
> > \text{B, } \$1{,}000\text{: } 0.95 \times 50 &= 47.5 \\
> > \text{B, } \$1{,}100\text{: } 0.90 \times 150 &= 135.0
> > \end{align*}
> > $$
> > The optimizer charges A $\$1{,}000$ and B $\$1{,}100$ — a $10\%$ surcharge on B for being unlikely to leave.
> >
> > The two customers have the **same expected cost**, so the difference is not cost-based. It rests on price elasticity and individual retention — the practices the NAIC white paper lists as inconsistent with "not unfairly discriminatory" — and it is prohibited outright in states with price optimization bulletins.

> [!example]- Judgement or Optimization? {Example}
> Classify each pricing practice:
>
> 1. The indicated overall change is $+14\%$; the insurer files $+9\%$ because a larger increase would cost it market share.
> 2. Renewal increases on a new rating plan are capped at $15\%$ a year until policies reach the new rate.
> 3. Renewal discounts are withdrawn from policyholders a model predicts will not shop.
> 4. A GLM produces 40,000 rating cells, each priced from fitted loss costs.
>
> > [!answer]-
> > 1. **Acceptable judgement.** Selecting a rate between current and indicated is within the white paper's tolerance, provided the insurer can justify it; the whole class moves together.
> > 2. **Acceptable, with limits.** Capping is a recognised transition device; regulators look at how long it lasts and how wide the caps are, and at whether the capped policies' shortfall is recovered from others.
> > 3. **Unfairly discriminatory.** An individual retention adjustment based on propensity to shop — price optimization in its objectionable form.
> > 4. **Not a violation in itself.** Granularity is permitted if the rating factors are cost-based; the regulator's concern is whether cells so fine are statistically reliable.
